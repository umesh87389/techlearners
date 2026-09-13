/**
 * SHM Academy Portfolio — Firestore cloud sync layer (GitHub Pages compatible).
 *
 * Why this exists:
 *  The Flask backend (portfolio/app.py, /api/*) cannot run on GitHub Pages,
 *  so student submissions were stored only in each browser's localStorage
 *  (key: shm_student_submissions) and never reached teacher/admin devices.
 *  This module syncs the same records to Cloud Firestore collection
 *  `portfolioSubmissions` so every device sees the same roster.
 *
 *  Security model (see firebase/firestore.rules):
 *   - create: public (students submit without signing in), strictly validated.
 *   - read / update / delete: requires Firebase Auth sign-in (teacher/admin
 *     signs in with Google once). Tighten to faculty UIDs in rules for
 *     production (instructions in firestore.rules).
 *
 *  Photo guard: Firestore documents are limited to 1 MiB. Photos are stored
 *  as base64 data URLs and can exceed that, so records sent to the cloud are
 *  capped — oversized photos are omitted from the cloud copy (kept locally).
 *
 *  All methods never throw; they resolve { ok:true,... } / { ok:false,... }
 *  so the localStorage flow keeps working offline.
 */
(function () {
  var COLLECTION = 'portfolioSubmissions';
  var PHOTO_CLOUD_BUDGET = 400000; // chars of base64 kept in cloud copy
  var FIREBASE_VERSION = '12.7.0';

  var servicesPromise = null;
  var authListenersAttached = false;

  function getConfig() {
    return (window.TechLearnersFirebaseConfig || {});
  }

  function isConfigured() {
    var c = getConfig();
    return Boolean(c.apiKey && c.projectId && String(c.apiKey).indexOf('REPLACE_') !== 0);
  }

  function services() {
    if (!isConfigured()) return Promise.resolve(null);
    if (!servicesPromise) {
      servicesPromise = Promise.all([
        import('https://www.gstatic.com/firebasejs/' + FIREBASE_VERSION + '/firebase-app.js'),
        import('https://www.gstatic.com/firebasejs/' + FIREBASE_VERSION + '/firebase-auth.js'),
        import('https://www.gstatic.com/firebasejs/' + FIREBASE_VERSION + '/firebase-firestore.js')
      ]).then(function (mods) {
        var appApi = mods[0], authApi = mods[1], fsApi = mods[2];
        var app;
        try {
          app = appApi.getApp();
        } catch (e) {
          app = appApi.initializeApp(getConfig());
        }
        return {
          auth: authApi.getAuth(app),
          authApi: authApi,
          db: fsApi.getFirestore(app),
          fsApi: fsApi
        };
      }).catch(function (err) {
        servicesPromise = null;
        throw err;
      });
    }
    return servicesPromise;
  }

  function str(v, max) {
    var s = (v === undefined || v === null) ? '' : String(v);
    return s.length > max ? s.slice(0, max) : s;
  }

  // Build a Firestore-safe copy of a local roster record.
  function toCloudDoc(rec) {
    var src = rec || {};
    var profile = Object.assign({}, src.profile || {});
    var photo = src.photo_url || profile.photo_data || '';
    if (photo && photo.length > PHOTO_CLOUD_BUDGET) {
      // Keep the record syncable; full photo stays in the student's browser.
      photo = '';
      if (profile.photo_data) profile.photo_data = '';
    }
    var doc = {
      id: str(src.id || '', 80),
      student_name: str(src.student_name || profile.student_name || '', 100),
      class_section: str(src.class_section || profile.class_section || '', 60),
      roll_no: str(src.roll_no || profile.roll_no || '', 30),
      admission_no: str(src.admission_no || profile.admission_no || '', 40),
      status: (src.status === 'evaluated') ? 'evaluated' : 'pending_evaluation',
      submission_source: str(src.submission_source || 'send', 20),
      updated_at: str(src.updated_at || '', 60),
      created_at: str(src.created_at || '', 60),
      released_for_download: src.released_for_download === true ||
        Boolean(src.data && src.data.released_for_download),
      released_at: str(src.released_at || (src.data && src.data.released_at) || '', 60),
      photo_url: str(photo, PHOTO_CLOUD_BUDGET),
      profile: profile,
      about_me: src.about_me || (src.data && src.data.about_me) || {},
      goals: src.goals || (src.data && src.data.goals) || {},
      co_curricular: src.co_curricular || (src.data && src.data.co_curricular) || [],
      achievements: src.achievements || (src.data && src.data.achievements) || [],
      achievements_evidence: str(
        src.achievements_evidence || (src.data && src.data.achievements_evidence) || '', 2000),
      projects: src.projects || (src.data && src.data.projects) || [],
      reading_log: src.reading_log || (src.data && src.data.reading_log) || [],
      school_participation: src.school_participation ||
        (src.data && src.data.school_participation) || {},
      best_work: src.best_work || (src.data && src.data.best_work) || {},
      parent_feedback: src.parent_feedback || (src.data && src.data.parent_feedback) || {},
      self_reflection: src.self_reflection || (src.data && src.data.self_reflection) || {},
      personal_improvement_plan: src.personal_improvement_plan ||
        (src.data && src.data.personal_improvement_plan) || [],
      year_review: src.year_review || (src.data && src.data.year_review) || {},
      student_declaration: src.student_declaration ||
        (src.data && src.data.student_declaration) || {},
      header: src.header || (src.data && src.data.header) || {},
      subject_evaluations: src.subject_evaluations ||
        (src.data && src.data.subject_evaluations) || {},
      skills: src.skills || (src.data && src.data.skills) || {},
      teacher_assessment: src.teacher_assessment ||
        (src.data && src.data.teacher_assessment) || {},
      teacher_final_remark: src.teacher_final_remark ||
        (src.data && src.data.teacher_final_remark) || {}
    };
    return doc;
  }

  // Convert a Firestore doc back to the local roster shape portfolio.js renders.
  function fromCloudDoc(id, d) {
    var data = d || {};
    return {
      id: id,
      student_name: data.student_name || (data.profile && data.profile.student_name) || '',
      class_section: data.class_section || (data.profile && data.profile.class_section) || '',
      roll_no: data.roll_no || (data.profile && data.profile.roll_no) || '',
      admission_no: data.admission_no || '',
      created_at: data.created_at || '',
      updated_at: data.updated_at || '',
      submission_source: data.submission_source || 'send',
      status: data.status || 'pending_evaluation',
      released_for_download: data.released_for_download === true,
      released_at: data.released_at || '',
      photo_url: data.photo_url || (data.profile && data.profile.photo_data) || '',
      profile: data.profile || {},
      about_me: data.about_me || {},
      goals: data.goals || {},
      co_curricular: data.co_curricular || [],
      achievements: data.achievements || [],
      achievements_evidence: data.achievements_evidence || '',
      projects: data.projects || [],
      reading_log: data.reading_log || [],
      school_participation: data.school_participation || {},
      best_work: data.best_work || {},
      parent_feedback: data.parent_feedback || {},
      self_reflection: data.self_reflection || {},
      personal_improvement_plan: data.personal_improvement_plan || [],
      year_review: data.year_review || {},
      student_declaration: data.student_declaration || {},
      header: data.header || {},
      subject_evaluations: data.subject_evaluations || {},
      skills: data.skills || {},
      teacher_assessment: data.teacher_assessment || {},
      teacher_final_remark: data.teacher_final_remark || {},
      _fromCloud: true
    };
  }

  function errInfo(err) {
    var code = (err && err.code) || '';
    var msg = (err && err.message) || String(err || 'unknown error');
    return { code: code, message: msg };
  }

  // Student-only field set: omits status / teacher sections / release flags
  // so a public re-submit merges without wiping faculty evaluations
  // (Firestore merge keeps the existing teacher sections -> rules pass).
  function toStudentOnlyDoc(rec) {
    var src = rec || {};
    var profile = Object.assign({}, src.profile || {});
    var photo = src.photo_url || profile.photo_data || '';
    if (photo && photo.length > PHOTO_CLOUD_BUDGET) {
      photo = '';
      if (profile.photo_data) profile.photo_data = '';
    }
    return {
      student_name: str(src.student_name || profile.student_name || '', 100),
      class_section: str(src.class_section || profile.class_section || '', 60),
      roll_no: str(src.roll_no || profile.roll_no || '', 30),
      admission_no: str(src.admission_no || profile.admission_no || '', 40),
      submission_source: str(src.submission_source || 'send', 20),
      updated_at: str(src.updated_at || '', 60),
      created_at: str(src.created_at || '', 60),
      photo_url: str(photo, PHOTO_CLOUD_BUDGET),
      profile: profile,
      about_me: src.about_me || (src.data && src.data.about_me) || {},
      goals: src.goals || (src.data && src.data.goals) || {},
      achievements: src.achievements || (src.data && src.data.achievements) || [],
      achievements_evidence: str(
        src.achievements_evidence || (src.data && src.data.achievements_evidence) || '', 2000),
      projects: src.projects || (src.data && src.data.projects) || [],
      reading_log: src.reading_log || (src.data && src.data.reading_log) || [],
      school_participation: src.school_participation ||
        (src.data && src.data.school_participation) || {},
      best_work: src.best_work || (src.data && src.data.best_work) || {},
      parent_feedback: src.parent_feedback || (src.data && src.data.parent_feedback) || {},
      self_reflection: src.self_reflection || (src.data && src.data.self_reflection) || {},
      personal_improvement_plan: src.personal_improvement_plan ||
        (src.data && src.data.personal_improvement_plan) || [],
      year_review: src.year_review || (src.data && src.data.year_review) || {},
      student_declaration: src.student_declaration ||
        (src.data && src.data.student_declaration) || {},
      header: src.header || (src.data && src.data.header) || {}
    };
  }

  function writeStudentOnly(s, id, record) {
    var u = toStudentOnlyDoc(record);
    if (!u.student_name || !u.class_section) {
      return Promise.resolve({ ok: false, error: 'missing name/class' });
    }
    // Do not send co_curricular here; faculty remarks live in faculty
    // updates and merge keeps them. Text sections above still sync.
    var payload = {
      student_name: u.student_name,
      class_section: u.class_section,
      roll_no: u.roll_no,
      admission_no: u.admission_no,
      submission_source: u.submission_source,
      updated_at: u.updated_at,
      photo_url: u.photo_url,
      profile: u.profile,
      about_me: u.about_me,
      goals: u.goals,
      achievements: u.achievements,
      achievements_evidence: u.achievements_evidence,
      projects: u.projects,
      reading_log: u.reading_log,
      school_participation: u.school_participation,
      best_work: u.best_work,
      parent_feedback: u.parent_feedback,
      self_reflection: u.self_reflection,
      personal_improvement_plan: u.personal_improvement_plan,
      year_review: u.year_review,
      student_declaration: u.student_declaration,
      header: u.header,
      cloudUpdatedAt: s.fsApi.serverTimestamp()
    };
    if (u.created_at) payload.created_at = u.created_at;
    return s.fsApi.setDoc(s.fsApi.doc(s.db, COLLECTION, String(id)), payload, { merge: true })
      .then(function () { return { ok: true, partial: true }; });
  }

  var api = {
    collection: COLLECTION,
    isConfigured: isConfigured,

    getCurrentUser: function () {
      return services().then(function (s) {
        if (!s) return null;
        return s.auth.currentUser || null;
      }).catch(function () { return null; });
    },

    onAuthStateChanged: function (cb) {
      services().then(function (s) {
        if (!s) { try { cb(null); } catch (e) {} return; }
        s.authApi.onAuthStateChanged(s.auth, function (u) {
          try { cb(u); } catch (e) {}
        });
      }).catch(function () { try { cb(null); } catch (e) {} });
      return function () {};
    },

    signInWithGoogle: function () {
      return services().then(function (s) {
        if (!s) throw new Error('Firebase is not configured.');
        return s.authApi.setPersistence(s.auth, s.authApi.browserLocalPersistence).then(function () {
          var provider = new s.authApi.GoogleAuthProvider();
          provider.setCustomParameters({ prompt: 'select_account' });
          return s.authApi.signInWithPopup(s.auth, provider);
        }).catch(function (error) {
          if (error && (error.code === 'auth/popup-blocked' ||
              error.code === 'auth/cancelled-popup-request')) {
            var provider2 = new s.authApi.GoogleAuthProvider();
            return s.authApi.signInWithRedirect(s.auth, provider2);
          }
          throw error;
        });
      });
    },

    signOut: function () {
      return services().then(function (s) {
        if (s) return s.authApi.signOut(s.auth);
      }).catch(function () {});
    },

    // Student submit: public create per firestore.rules (no sign-in required).
    // Falls back to student-only merge when the record is already evaluated
    // (public full overwrite would be denied to protect faculty sections).
    saveRecord: function (record) {
      if (!record || !record.id) return Promise.resolve({ ok: false, error: 'missing id' });
      return services().then(function (s) {
        if (!s) return { ok: false, error: 'firebase-not-configured' };
        var doc = toCloudDoc(record);
        if (!doc.student_name || !doc.class_section) {
          return { ok: false, error: 'missing name/class' };
        }
        doc.cloudUpdatedAt = s.fsApi.serverTimestamp();
        return s.fsApi.setDoc(
          s.fsApi.doc(s.db, COLLECTION, String(record.id)), doc, { merge: true }
        ).then(function () { return { ok: true }; }).catch(function (e) {
          var i = errInfo(e);
          var code = String(i.code || i.message || '');
          if (code.indexOf('permission-denied') !== -1) {
            return writeStudentOnly(s, record.id, record).catch(function (e2) {
              var j = errInfo(e2); return { ok: false, error: j.code || j.message };
            });
          }
          return { ok: false, error: i.code || i.message };
        });
      }).catch(function (e) { var i = errInfo(e); return { ok: false, error: i.code || i.message }; });
    },

    // Student-only merge used when a full save is denied on evaluated docs.
    saveStudentFields: function (record) {
      if (!record || !record.id) return Promise.resolve({ ok: false, error: 'missing id' });
      return services().then(function (s) {
        if (!s) return { ok: false, error: 'firebase-not-configured' };
        return writeStudentOnly(s, record.id, record);
      }).catch(function (e) { var i = errInfo(e); return { ok: false, error: i.code || i.message }; });
    },

    fetchOne: function (id) {
      if (!id) return Promise.resolve({ ok: false, error: 'missing id' });
      return services().then(function (s) {
        if (!s) return { ok: false, error: 'firebase-not-configured' };
        return s.fsApi.getDoc(s.fsApi.doc(s.db, COLLECTION, String(id))).then(function (snap) {
          if (!snap || !snap.exists()) return { ok: false, error: 'not-found' };
          try { return { ok: true, record: fromCloudDoc(snap.id, snap.data()) }; }
          catch (e) { return { ok: false, error: String((e && e.message) || e) }; }
        });
      }).catch(function (e) { var i = errInfo(e); return { ok: false, error: i.code || i.message }; });
    },

    // Teacher/admin roster read: requires Firebase Auth sign-in per rules.
    fetchAll: function () {
      return services().then(function (s) {
        if (!s) return { ok: false, error: 'firebase-not-configured' };
        return s.fsApi.getDocs(s.fsApi.collection(s.db, COLLECTION)).then(function (snap) {
          var list = [];
          snap.forEach(function (docSnap) {
            try { list.push(fromCloudDoc(docSnap.id, docSnap.data())); } catch (e) {}
          });
          return { ok: true, list: list };
        });
      }).catch(function (e) { var i = errInfo(e); return { ok: false, error: i.code || i.message }; });
    },

    updateRecord: function (id, patch) {
      if (!id) return Promise.resolve({ ok: false, error: 'missing id' });
      return services().then(function (s) {
        if (!s) return { ok: false, error: 'firebase-not-configured' };
        // Faculty writes require student_name/class_section to satisfy
        // portfolioBaseValid. Patches often carry only teacher sections, so
        // merge over the existing cloud doc first (faculty can read it).
        return s.fsApi.getDoc(s.fsApi.doc(s.db, COLLECTION, String(id))).then(function (snap) {
          var existing = {};
          try { existing = (snap && snap.exists() && snap.data()) || {}; } catch (e) { existing = {}; }
          var mergedSrc = Object.assign({}, existing, patch || {}, { id: id });
          // Preserve nested student sections when patch omits them.
          ['profile', 'about_me', 'goals', 'achievements', 'projects', 'reading_log',
           'school_participation', 'best_work', 'parent_feedback', 'self_reflection',
           'personal_improvement_plan', 'year_review', 'student_declaration', 'header',
           'co_curricular', 'subject_evaluations', 'skills', 'teacher_assessment',
           'teacher_final_remark'].forEach(function (k) {
            if (mergedSrc[k] === undefined && existing[k] !== undefined) mergedSrc[k] = existing[k];
          });
          if (!mergedSrc.student_name && existing.student_name) mergedSrc.student_name = existing.student_name;
          if (!mergedSrc.class_section && existing.class_section) mergedSrc.class_section = existing.class_section;
          var safe = toCloudDoc(mergedSrc);
          if (!safe.student_name || !safe.class_section) {
            // Last resort: keep the write minimal but valid — caller must
            // supply name/class; without them rules reject the write.
            return { ok: false, error: 'missing name/class' };
          }
          var update = {
            student_name: safe.student_name,
            class_section: safe.class_section,
            roll_no: safe.roll_no,
            admission_no: safe.admission_no,
            status: safe.status,
            submission_source: safe.submission_source,
            updated_at: safe.updated_at,
            created_at: safe.created_at,
            released_for_download: safe.released_for_download,
            released_at: safe.released_at,
            photo_url: safe.photo_url,
            profile: safe.profile,
            subject_evaluations: safe.subject_evaluations,
            skills: safe.skills,
            teacher_assessment: safe.teacher_assessment,
            teacher_final_remark: safe.teacher_final_remark,
            co_curricular: safe.co_curricular,
            about_me: safe.about_me,
            goals: safe.goals,
            achievements: safe.achievements,
            achievements_evidence: safe.achievements_evidence,
            projects: safe.projects,
            reading_log: safe.reading_log,
            school_participation: safe.school_participation,
            best_work: safe.best_work,
            parent_feedback: safe.parent_feedback,
            self_reflection: safe.self_reflection,
            personal_improvement_plan: safe.personal_improvement_plan,
            year_review: safe.year_review,
            student_declaration: safe.student_declaration,
            header: safe.header,
            cloudUpdatedAt: s.fsApi.serverTimestamp()
          };
          return s.fsApi.setDoc(s.fsApi.doc(s.db, COLLECTION, String(id)), update, { merge: true })
            .then(function () { return { ok: true }; });
        });
      }).catch(function (e) { var i = errInfo(e); return { ok: false, error: i.code || i.message }; });
    },

    deleteRecord: function (id) {
      if (!id) return Promise.resolve({ ok: false, error: 'missing id' });
      return services().then(function (s) {
        if (!s) return { ok: false, error: 'firebase-not-configured' };
        return s.fsApi.deleteDoc(s.fsApi.doc(s.db, COLLECTION, String(id)))
          .then(function () { return { ok: true }; });
      }).catch(function (e) { var i = errInfo(e); return { ok: false, error: i.code || i.message }; });
    }
  };

  window.PortfolioCloud = api;
  void authListenersAttached;
})();
