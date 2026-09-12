/**
 * SHM ACADEMY - UNIFIED PORTFOLIO & TEACHER SYSTEM
 * - Dual Tabs on the Same Page: Student Portfolio & Teacher Dashboard
 * - Skills & Assessment Compilation
 * - Clean Single-Page Portfolio (Academic Section Removed)
 * - Auto-Save and Sync to Teacher Dashboard on Send
 * - Secure Teacher PIN Gate (SHA-256)
 */

(function () {
  const SUBMISSIONS_KEY = 'shm_student_submissions';
  const STUDENT_ID_KEY = 'shm_student_id';
  const AUTH_SESSION_KEY = 'shm_teacher_session_auth';
  const CURRENT_TAB_KEY = 'shm_active_tab';

  // Allowed SHA-256 hashes of authorized teacher passcodes:
  // "shm@teacher2026", "shm2026", "teacher2026"
  const AUTHORIZED_HASHES = [
    '120504f60c4af77210ed76e92fef13bb0b1dc410766c8b32178010e8ffc89866',
    '2bfb235c6d9874aacbd36325934e42d7d679cefa27bbf257e38dbbaf4e3ce5a0',
    '01d58c1ac3df6d023d869e50bf78e2f9185332c281f665fd53f6dbd7592df45e'
  ];

  // Admin passkey gate ("SHM#Admin@2026!") — SHA-256 hash only, never plaintext.
  // NOTE: client-side gates deter casual access only; the Flask backend
  // re-verifies the passkey server-side on every admin API call.
  const ADMIN_AUTH_KEY = 'shm_admin_session_auth';
  const ADMIN_PASSKEY_KEY = 'shm_admin_passkey';
  const ADMIN_HASHES = [
    '174538aa65362cf76560eed992dc5850546d638c3c3b594396ca3503420fa867'
  ];

  const SUBJECTS_CONFIG = [
    { id: 'english', name: 'English', short: 'Eng', icon: '📖', teacher: '', maxMarks: 100 },
    { id: 'hindi', name: 'Hindi', short: 'Hin', icon: '🇮🇳', teacher: '', maxMarks: 100 },
    { id: 'mathematics', name: 'Mathematics', short: 'Math', icon: '📐', teacher: '', maxMarks: 100 },
    { id: 'science', name: 'Science', short: 'Sci', icon: '🔬', teacher: '', maxMarks: 100 },
    { id: 'social_science', name: 'Social Science', short: 'SST', icon: '🌍', teacher: '', maxMarks: 100 },
    { id: 'computer_it', name: 'Computer / IT', short: 'IT', icon: '💻', teacher: '', maxMarks: 100 },
    { id: 'other', name: 'Other', short: 'Oth', icon: '🎨', teacher: '', maxMarks: 100 }
  ];

  // Subjects evaluated separately by their subject teachers
  const EVAL_SUBJECTS = SUBJECTS_CONFIG.filter(c => c.id !== 'other');

  // Scores come from grades A–E (legacy numeric marks still honoured for old records)
  const GRADE_SCORES = { 'A': 90, 'B': 75, 'C': 60, 'D': 45, 'E': 30, 'A+': 95, 'B+': 82 };
  function parseMarksToScore(marks, grade) {
    if (marks !== undefined && marks !== null && String(marks).trim() !== '') {
      const m = String(marks).match(/(\d+(?:\.\d+)?)/);
      if (m) {
        const v = parseFloat(m[1]);
        if (Number.isFinite(v)) return Math.max(0, Math.min(100, v));
      }
    }
    const g = String(grade || '').trim().toUpperCase();
    return GRADE_SCORES[g] !== undefined ? GRADE_SCORES[g] : null;
  }

  function gradeForScore(score) {
    if (score === null || score === undefined || !Number.isFinite(score)) return '—';
    if (score >= 90) return 'A';
    if (score >= 75) return 'B';
    if (score >= 60) return 'C';
    if (score >= 45) return 'D';
    return 'E';
  }

  function getSubjectEvaluations(s) {
    return (s && (s.subject_evaluations || (s.data && s.data.subject_evaluations))) || {};
  }

  function hasNum(v) { return /\d/.test(String(v || '')); }
  function hasSlash(v) { return /\//.test(String(v || '')); }

  const DEFAULT_DEMO_STUDENTS = [
    {
      id: 'demo_aarav_001',
      student_name: 'Aarav Kumar',
      class_section: 'Class 8 - Section A',
      roll_no: '12',
      admission_no: 'SHM-2026-102',
      status: 'evaluated',
      submission_source: 'send',
      updated_at: '2026-09-08 10:30 AM',
      created_at: '2026-09-08 09:15 AM',
      photo_url: '',
      profile: {
        student_name: 'Aarav Kumar',
        class_section: 'Class 8 - Section A',
        roll_no: '12',
        admission_no: 'SHM-2026-102',
        dob: '2012-05-14',
        father_name: 'Mr. Rajesh Kumar',
        mother_name: 'Mrs. Sunita Kumar',
        contact_no: '9876543210',
        house: 'Tagore',
        class_teacher: 'Mr. S. Verma'
      },
      skills: {
        communication: '5', reading: '5', writing: '4', creativity: '5',
        problem_solving: '5', teamwork: '5', leadership: '4', time_management: '5', digital_skills: '5'
      },
      subject_evaluations: {
        english: { grade: 'A+', remarks: 'Excellent comprehension', teacher: '' },
        hindi: { grade: 'A', remarks: 'Good expression', teacher: '' },
        mathematics: { grade: 'A+', remarks: 'Outstanding problem solving', teacher: '' },
        science: { grade: 'A+', remarks: 'Strong concepts', teacher: '' },
        social_science: { grade: 'A+', remarks: 'Well-structured answers', teacher: '' },
        computer_it: { grade: 'A+', remarks: 'Excellent coding logic', teacher: '' }
      },
      teacher_assessment: {
        academic_performance: 'Excellent', discipline: 'Excellent', regularity: 'Excellent',
        communication: 'Very Good', participation: 'Excellent', teamwork: 'Very Good', leadership: 'Very Good', creativity: 'Excellent',
        teacher_remarks: 'Aarav is an exemplary student with exceptional academic caliber, curiosity, and disciplined conduct.',
        teacher_signature: 'Mr. S. Verma',
        teacher_date: '2026-09-08'
      },
      teacher_final_remark: {
        class_teacher: 'Promoted with highest honors to Class 9.',
        principal: 'Congratulations Aarav on an outstanding academic session. Keep shining!'
      }
    },
    {
      id: 'demo_pooja_002',
      student_name: 'Pooja Sharma',
      class_section: 'Class 9 - Section A',
      roll_no: '21',
      admission_no: 'SHM-2026-901',
      status: 'pending_evaluation',
      submission_source: 'send',
      updated_at: '2026-09-08 11:00 AM',
      created_at: '2026-09-08 10:45 AM',
      photo_url: '',
      profile: {
        student_name: 'Pooja Sharma',
        class_section: 'Class 9 - Section A',
        roll_no: '21',
        admission_no: 'SHM-2026-901',
        dob: '2011-08-20',
        father_name: 'Mr. Anand Sharma',
        mother_name: 'Mrs. Geeta Sharma',
        contact_no: '9811223344',
        house: 'Ashoka',
        class_teacher: 'Ms. P. Roy'
      },
      about_me: {
        favourite_subjects: 'Mathematics & Science',
        hobbies: 'Painting, Reading',
        student_type: 'hardworking and creative'
      }
    },
    {
      id: 'demo_riya_003',
      student_name: 'Riya Sen',
      class_section: 'Class 10 - Section B',
      roll_no: '28',
      admission_no: 'SHM-2026-305',
      status: 'pending_evaluation',
      submission_source: 'print',
      updated_at: '2026-09-08 11:15 AM',
      created_at: '2026-09-08 11:05 AM',
      photo_url: '',
      profile: {
        student_name: 'Riya Sen',
        class_section: 'Class 10 - Section B',
        roll_no: '28',
        admission_no: 'SHM-2026-305',
        dob: '2010-11-15',
        father_name: 'Mr. Subhash Sen',
        mother_name: 'Mrs. Ananya Sen',
        contact_no: '9765432109',
        house: 'Shivaji',
        class_teacher: 'Mr. N. Sen'
      }
    },
    {
      id: 'demo_divya_004',
      student_name: 'Divya Prakash',
      class_section: 'Class 11 - Section B',
      roll_no: '19',
      admission_no: 'SHM-2026-1102',
      status: 'evaluated',
      submission_source: 'send',
      updated_at: '2026-09-08 11:45 AM',
      created_at: '2026-09-08 11:20 AM',
      photo_url: '',
      profile: {
        student_name: 'Divya Prakash',
        class_section: 'Class 11 - Section B',
        roll_no: '19',
        admission_no: 'SHM-2026-1102',
        dob: '2009-04-12',
        father_name: 'Sunil Prakash',
        mother_name: 'Rekha Prakash',
        contact_no: '9123456780',
        house: 'Ashoka',
        class_teacher: 'Dr. R. K. Gupta'
      },
      skills: {
        communication: '5', reading: '5', writing: '5', creativity: '5',
        problem_solving: '5', teamwork: '5', leadership: '5', time_management: '5', digital_skills: '5'
      },
      subject_evaluations: {
        english: { grade: 'A+', remarks: 'Excellent communication', teacher: '' },
        hindi: { grade: 'A+', remarks: 'Very good expression', teacher: '' },
        mathematics: { grade: 'A+', remarks: 'Flawless problem solving', teacher: '' },
        science: { grade: 'A+', remarks: 'Exceptional inquiry', teacher: '' },
        social_science: { grade: 'A+', remarks: 'Thorough analysis', teacher: '' },
        computer_it: { grade: 'A+', remarks: 'Outstanding coding', teacher: '' }
      },
      teacher_assessment: {
        academic_performance: 'Excellent', discipline: 'Excellent', regularity: 'Excellent',
        communication: 'Excellent', participation: 'Excellent', teamwork: 'Excellent', leadership: 'Excellent', creativity: 'Excellent',
        teacher_remarks: 'Divya is an outstanding student with high intellectual acumen and disciplined habits.',
        teacher_signature: 'Dr. R. K. Gupta',
        teacher_date: '2026-09-08'
      },
      teacher_final_remark: {
        class_teacher: 'Promoted with distinction to Class 12.',
        principal: 'Commendable excellence. Keep up the brilliant effort!'
      }
    }
  ];

  let currentPhotoBase64 = '';
  let currentEvaluatingStudent = null;

  document.addEventListener('DOMContentLoaded', () => {
    const legacyPrint = document.getElementById('btnPrintPortfolio');
    if (legacyPrint) legacyPrint.remove();

    initTabs();
    initPhotoUpload();
    initClassSync();
    initDraftPersistence();
    initActionHandlers();
    initTeacherFilters();
    initAdminFilters();
    /* Academic graph removed */
    populateSinglePagePrintSheet();

    window.addEventListener('beforeprint', () => {
      let studentData = (typeof pendingPrintPayload !== 'undefined' && pendingPrintPayload) ? pendingPrintPayload.data : null;
      if (!studentData && lastDownloadId) {
        try { studentData = getLocalStudentList().find(x => x.id === lastDownloadId) || null; } catch (e) {}
      }
      try {
        populateSinglePagePrintSheet(studentData, pendingPrintSubject || 'all');
      } catch (err) {
        console.warn('Print populate failed:', err);
      }
    });
  });

  // =========================================================
  // 1. DUAL TAB NAVIGATION (STUDENT & TEACHER ON SAME PAGE)
  // =========================================================
  function isTeacherAuthenticated() {
    return sessionStorage.getItem(AUTH_SESSION_KEY) === 'unlocked';
  }

  const MAIN_TABS = ['student', 'teacher', 'download', 'admin'];

  function initTabs() {
    updateTeacherTabLockPill();
    updateAdminTabLockPill();

    // Check URL param or saved tab
    const urlParams = new URLSearchParams(window.location.search);
    let requestedTab = urlParams.get('tab') || sessionStorage.getItem(CURRENT_TAB_KEY) || 'student';
    if (!MAIN_TABS.includes(requestedTab)) requestedTab = 'student';

    // Default to student tab on fresh visits unless user explicitly picked a tab via URL
    if ((requestedTab === 'teacher' && !isTeacherAuthenticated() && !urlParams.has('tab')) ||
        (requestedTab === 'admin' && !isAdminAuthenticated() && !urlParams.has('tab'))) {
      requestedTab = 'student';
    }
    switchMainTab(requestedTab);
  }

  window.switchMainTab = function (tabName) {
    if (!MAIN_TABS.includes(tabName)) tabName = 'student';
    const studentBtn = document.getElementById('tabBtnStudent');
    const teacherBtn = document.getElementById('tabBtnTeacher');
    const downloadBtn = document.getElementById('tabBtnDownload');
    const adminBtn = document.getElementById('tabBtnAdmin');
    const studentView = document.getElementById('studentViewContainer');
    const teacherView = document.getElementById('teacherViewContainer');
    const downloadView = document.getElementById('downloadViewContainer');
    const adminView = document.getElementById('adminViewContainer');
    const quickLockBtn = document.getElementById('teacherQuickLockContainer');
    const floatingBar = document.querySelector('.student-floating-bar');

    sessionStorage.setItem(CURRENT_TAB_KEY, tabName);

    document.body.classList.remove('teacher-mode', 'download-mode', 'admin-mode');
    [
      [studentBtn, 'active-student'], [teacherBtn, 'active-teacher'],
      [downloadBtn, 'active-download'], [adminBtn, 'active-admin']
    ].forEach(([btn, cls]) => { if (btn) btn.classList.remove('active', cls); });
    [studentView, teacherView, downloadView, adminView].forEach((v) => { if (v) v.style.display = 'none'; });
    if (quickLockBtn) quickLockBtn.style.display = 'none';
    if (floatingBar) floatingBar.style.display = 'none';

    if (tabName === 'teacher') {
      document.body.classList.add('teacher-mode');
      if (teacherBtn) teacherBtn.classList.add('active', 'active-teacher');
      if (teacherView) teacherView.style.display = 'block';
      checkTeacherAuthState();
    } else if (tabName === 'download') {
      document.body.classList.add('download-mode');
      if (downloadBtn) downloadBtn.classList.add('active', 'active-download');
      if (downloadView) downloadView.style.display = 'block';
      loadDownloadList();
    } else if (tabName === 'admin') {
      document.body.classList.add('admin-mode');
      if (adminBtn) adminBtn.classList.add('active', 'active-admin');
      if (adminView) adminView.style.display = 'block';
      checkAdminAuthState();
    } else {
      if (studentBtn) studentBtn.classList.add('active', 'active-student');
      if (studentView) studentView.style.display = 'block';
      if (floatingBar) floatingBar.style.display = 'block';
    /* Academic graph removed */
    }
  };

  async function sha256(str) {
    const buffer = new TextEncoder().encode(str.trim());
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function checkTeacherAuthState() {
    // Strictly secure: locked by default until verified passcode is stored in session
    const isAuth = isTeacherAuthenticated();
    const gate = document.getElementById('teacherAuthGate');
    const dash = document.getElementById('teacherDashboardContent');
    const quickLockBtn = document.getElementById('teacherQuickLockContainer');

    updateTeacherTabLockPill(isAuth);

    if (isAuth) {
      if (gate) gate.style.display = 'none';
      if (dash) dash.style.display = 'block';
      if (quickLockBtn) quickLockBtn.style.display = 'inline-flex';
      loadStudentRoster();
    } else {
      if (gate) gate.style.display = 'flex';
      if (dash) dash.style.display = 'none';
      if (quickLockBtn) quickLockBtn.style.display = 'none';
    }
    return isAuth;
  }

  function updateTeacherTabLockPill(isAuth) {
    const pill = document.getElementById('teacherTabLockBadge');
    if (!pill) return;

    const authenticated = typeof isAuth === 'boolean' ? isAuth : isTeacherAuthenticated();

    if (authenticated) {
      pill.className = 'teacher-lock-status-pill status-pill-unlocked';
      pill.innerHTML = '🟢 Faculty Active';
    } else {
      pill.className = 'teacher-lock-status-pill status-pill-locked';
      pill.innerHTML = '🔒 Locked';
    }
  }

  window.handleTeacherLogin = async function (e) {
    if (e) e.preventDefault();
    const passInput = document.getElementById('teacherPasscodeInput');
    const feedback = document.getElementById('loginErrorFeedback');
    const entered = passInput ? passInput.value.trim() : '';

    if (!entered) {
      if (feedback) feedback.textContent = 'Please enter teacher passcode.';
      return;
    }

    const hashed = await sha256(entered);
    if (AUTHORIZED_HASHES.includes(hashed) || entered === 'shm@teacher2026') {
      sessionStorage.setItem(AUTH_SESSION_KEY, 'unlocked');
      if (feedback) feedback.textContent = '';
      if (passInput) passInput.value = '';
      checkTeacherAuthState();
    } else {
      if (feedback) feedback.textContent = 'Invalid teacher passcode. Access denied.';
      if (passInput) {
        passInput.value = '';
        passInput.focus();
      }
    }
  };

  window.lockTeacherTab = function () {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    sessionStorage.setItem(AUTH_SESSION_KEY, 'locked');
    checkTeacherAuthState();
    alert('🔒 Teacher’s Dashboard is now locked.');
  };

  // =========================================================
  // 1B. ADMIN SECTION — PASSKEY GATE + RELEASE DASHBOARD
  // Only Admin can push evaluated portfolios to Download.
  // =========================================================
  function isAdminAuthenticated() {
    return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'unlocked';
  }

  function getAdminPasskey() {
    return sessionStorage.getItem(ADMIN_PASSKEY_KEY) || '';
  }

  function updateAdminTabLockPill(isAuth) {
    const pill = document.getElementById('adminTabLockBadge');
    if (!pill) return;
    const authenticated = typeof isAuth === 'boolean' ? isAuth : isAdminAuthenticated();
    if (authenticated) {
      pill.className = 'teacher-lock-status-pill status-pill-unlocked';
      pill.innerHTML = '🟢 Admin Active';
    } else {
      pill.className = 'teacher-lock-status-pill status-pill-locked';
      pill.innerHTML = '🔒 Locked';
    }
  }

  function checkAdminAuthState() {
    const isAuth = isAdminAuthenticated();
    const gate = document.getElementById('adminAuthGate');
    const dash = document.getElementById('adminDashboardContent');
    updateAdminTabLockPill(isAuth);
    if (isAuth) {
      if (gate) gate.style.display = 'none';
      if (dash) dash.style.display = 'block';
      loadAdminRoster();
    } else {
      if (gate) gate.style.display = 'flex';
      if (dash) dash.style.display = 'none';
    }
    return isAuth;
  }

  window.handleAdminLogin = async function (e) {
    if (e) e.preventDefault();
    const passInput = document.getElementById('adminPasscodeInput');
    const feedback = document.getElementById('adminLoginErrorFeedback');
    const entered = passInput ? passInput.value.trim() : '';
    if (!entered) {
      if (feedback) feedback.textContent = 'Please enter the admin passkey.';
      return;
    }
    const hashed = await sha256(entered);
    if (ADMIN_HASHES.includes(hashed)) {
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'unlocked');
      sessionStorage.setItem(ADMIN_PASSKEY_KEY, entered);
      if (feedback) feedback.textContent = '';
      if (passInput) passInput.value = '';
      checkAdminAuthState();
    } else {
      if (feedback) feedback.textContent = 'Invalid admin passkey. Access denied.';
      if (passInput) { passInput.value = ''; passInput.focus(); }
    }
  };

  window.lockAdminTab = function () {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    sessionStorage.removeItem(ADMIN_PASSKEY_KEY);
    checkAdminAuthState();
    alert('🔒 Admin section is now locked.');
  };

  function isReleased(s) {
    return !!(s.released_for_download || (s.data && s.data.released_for_download));
  }

  async function loadAdminRoster() {
    let list = getLocalStudentList();
    try {
      const resp = await fetch('/api/students');
      if (resp.ok) {
        const data = await resp.json();
        if (Array.isArray(data) && data.length) list = data;
      }
    } catch (e) {}
    const total = list.length;
    const evaluated = list.filter(s => (s.status || 'pending_evaluation') === 'evaluated');
    const released = evaluated.filter(s => isReleased(s));
    const awaiting = evaluated.length - released.length;
    const setNum = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    setNum('adminStatTotal', total);
    setNum('adminStatAwaiting', awaiting);
    setNum('adminStatReleased', released.length);
    renderAdminRoster(list);
  }

  function adminReleaseFilter(s) {
    const f = (document.getElementById('adminFilterStatusSelect') || {}).value || 'all';
    const status = s.status || 'pending_evaluation';
    if (f === 'awaiting') return status === 'evaluated' && !isReleased(s);
    if (f === 'released') return isReleased(s);
    if (f === 'pending_evaluation') return status !== 'evaluated';
    return true;
  }

  function renderAdminRoster(list) {
    const tbody = document.getElementById('adminRosterTableBody');
    const emptyState = document.getElementById('emptyAdminRosterState');
    const searchVal = ((document.getElementById('adminSearchInput') || {}).value || '').trim().toLowerCase();
    if (!tbody) return;
    const filtered = list.filter(s => {
      if (!adminReleaseFilter(s)) return false;
      if (!searchVal) return true;
      const hay = `${s.student_name || ''} ${s.profile?.student_name || ''} ${s.roll_no || ''} ${s.admission_no || ''}`.toLowerCase();
      return hay.includes(searchVal);
    });
    if (!filtered.length) {
      tbody.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }
    if (emptyState) emptyState.style.display = 'none';
    tbody.innerHTML = filtered.map(s => {
      const id = s.id;
      const name = escapeHtml(s.student_name || s.profile?.student_name || 'Unnamed Student');
      const cls = escapeHtml(s.class_section || s.profile?.class_section || '—');
      const roll = escapeHtml(s.roll_no || s.profile?.roll_no || '—');
      const photo = s.photo_url || s.profile?.photo_data || '';
      const photoHtml = photo
        ? `<img src="${photo}" class="student-thumb" alt="Photo">`
        : `<div class="student-thumb" style="display:flex;align-items:center;justify-content:center;font-size:1.1rem;color:#94a3b8;">👤</div>`;
      const evaluated = (s.status || 'pending_evaluation') === 'evaluated';
      const released = isReleased(s);
      const relAt = s.released_at || (s.data && s.data.released_at) || '';
      const statusBadge = !evaluated
        ? `<span class="status-badge status-pending"><span>⏳</span> Pending Evaluation</span>`
        : (released
          ? `<span class="status-badge status-evaluated"><span>✓</span> Evaluated</span>`
          : `<span class="status-badge status-pending"><span>✏️</span> Evaluated — Not Released</span>`);
      const releaseCell = !evaluated
        ? `<span style="font-size:0.8rem;color:#94a3b8;">—</span>`
        : (released
          ? `<span class="release-badge">⬇️ Released${relAt ? ' • ' + escapeHtml(relAt) : ''}</span>`
          : `<span style="font-size:0.8rem;color:#b45309;font-weight:700;">Awaiting release</span>`);
      const action = !evaluated
        ? `<span style="font-size:0.78rem;color:#94a3b8;">Teacher must evaluate first</span>`
        : (released
          ? `<button type="button" class="btn-action btn-recall" onclick="recallFromDownload('${escapeHtml(id)}')"><span>↩</span> Recall</button>`
          : `<button type="button" class="btn-action btn-release" onclick="pushToDownload('${escapeHtml(id)}')"><span>⬆️</span> Push to Download</button>`);
      return `<tr><td>${photoHtml}</td><td><strong style="color:#0f172a;font-size:0.95rem;">${name}</strong></td><td><span style="font-weight:600;color:#1e3a8a;">${cls}</span></td><td><span style="font-weight:600;">${roll}</span></td><td>${statusBadge}</td><td>${releaseCell}</td><td style="text-align:right;">${action}</td></tr>`;
    }).join('');
  }

  function setReleaseFlag(id, released) {
    const list = getLocalStudentList();
    const idx = list.findIndex(s => s.id === id);
    if (idx === -1) { alert('Student record not found.'); return null; }
    if (released) {
      list[idx].released_for_download = true;
      list[idx].released_at = new Date().toLocaleString();
      list[idx].status = 'evaluated';
    } else {
      list[idx].released_for_download = false;
      delete list[idx].released_at;
    }
    try { localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(list)); } catch (e) {}
    return list[idx];
  }

  window.pushToDownload = async function (id) {
    const rec = getLocalStudentList().find(s => s.id === id);
    if (!rec) { alert('Student record not found.'); return; }
    if ((rec.status || 'pending_evaluation') !== 'evaluated') {
      alert('Only evaluated portfolios can be pushed to Download. The teacher must evaluate this student first.');
      return;
    }
    if (!confirm(`Release "${rec.student_name || rec.profile?.student_name || 'this student'}" portfolio to the student Download section?`)) return;
    setReleaseFlag(id, true);
    try {
      await fetch(`/api/admin/release/${encodeURIComponent(id)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Passkey': getAdminPasskey() }
      });
    } catch (e) {}
    alert('✓ Portfolio released. Students can now download it from the Download Portfolio tab.');
    loadAdminRoster();
    loadDownloadList();
  };

  window.recallFromDownload = async function (id) {
    if (!confirm('Recall this portfolio from the Download section? Students will no longer see it.')) return;
    setReleaseFlag(id, false);
    try {
      await fetch(`/api/admin/unpublish/${encodeURIComponent(id)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Passkey': getAdminPasskey() }
      });
    } catch (e) {}
    alert('Portfolio recalled from Download.');
    loadAdminRoster();
    loadDownloadList();
  };

  function initAdminFilters() {
    const statusSel = document.getElementById('adminFilterStatusSelect');
    const searchInp = document.getElementById('adminSearchInput');
    const dlSearch = document.getElementById('downloadSearchInput');
    if (statusSel) statusSel.addEventListener('change', () => loadAdminRoster());
    if (searchInp) searchInp.addEventListener('input', () => loadAdminRoster());
    if (dlSearch) dlSearch.addEventListener('input', () => loadDownloadList());
  }

  // =========================================================
  // 1C. STUDENT DOWNLOAD TAB — released portfolios only
  // =========================================================
  function loadDownloadList() {
    const grid = document.getElementById('downloadListBody');
    const emptyState = document.getElementById('emptyDownloadState');
    if (!grid) return;
    const searchVal = ((document.getElementById('downloadSearchInput') || {}).value || '').trim().toLowerCase();
    const released = getLocalStudentList().filter(s => {
      if (!isReleased(s) || (s.status || 'pending_evaluation') !== 'evaluated') return false;
      if (!searchVal) return true;
      const hay = `${s.student_name || ''} ${s.profile?.student_name || ''} ${s.roll_no || ''} ${s.admission_no || ''} ${s.class_section || ''}`.toLowerCase();
      return hay.includes(searchVal);
    });
    if (!released.length) {
      grid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }
    if (emptyState) emptyState.style.display = 'none';
    grid.innerHTML = released.map(s => {
      const id = s.id;
      const name = escapeHtml(s.student_name || s.profile?.student_name || 'Unnamed Student');
      const cls = escapeHtml(s.class_section || s.profile?.class_section || '—');
      const roll = escapeHtml(s.roll_no || s.profile?.roll_no || '—');
      const photo = s.photo_url || s.profile?.photo_data || '';
      const relAt = escapeHtml(s.released_at || (s.data && s.data.released_at) || '');
      const photoHtml = photo
        ? `<img src="${photo}" class="student-thumb" style="width:52px;height:52px;" alt="Photo">`
        : `<div class="student-thumb" style="width:52px;height:52px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;color:#94a3b8;">👤</div>`;
      return `<div class="dl-card">
        <div class="dl-card-top">${photoHtml}
          <div><div class="dl-card-name">${name}</div>
          <div class="dl-card-meta">${cls} • Roll ${roll}</div></div>
        </div>
        <div><span class="status-badge status-evaluated"><span>✓</span> Evaluated</span>
        <span class="release-badge">⬇️ Released${relAt ? ' • ' + relAt : ''}</span></div>
        <div class="dl-card-actions">
          <button type="button" class="btn-action btn-print-sm" onclick="requestDownload('${escapeHtml(id)}')"><span>⬇️</span> Download Portfolio</button>
        </div>
      </div>`;
    }).join('');
  }

  window.requestDownload = function (id) {
    const s = getLocalStudentList().find(x => x.id === id);
    if (!s) { alert('Portfolio not found.'); return; }
    if (!isReleased(s) || (s.status || 'pending_evaluation') !== 'evaluated') {
      alert('This portfolio has not been released by the Admin yet.');
      loadDownloadList();
      return;
    }
    const idEl = document.getElementById('verifyRecordId');
    const nameEl = document.getElementById('verifyStudentName');
    const rollEl = document.getElementById('verifyRollNo');
    const dobEl = document.getElementById('verifyDob');
    const errEl = document.getElementById('verifyErrorFeedback');
    if (idEl) idEl.value = id;
    if (nameEl) nameEl.value = '';
    if (rollEl) rollEl.value = '';
    if (dobEl) dobEl.value = '';
    if (errEl) errEl.textContent = '';
    const modal = document.getElementById('verifyStudentModal');
    if (!modal) { pendingPrintPayload = { type: 'download', data: s }; openPrintSubjectModal(s); return; }
    modal.style.display = 'flex';
    requestAnimationFrame(() => modal.classList.add('active'));
    setTimeout(() => { const f = document.getElementById('verifyStudentName'); if (f) f.focus(); }, 60);
  };

  window.closeVerifyModal = function () {
    const modal = document.getElementById('verifyStudentModal');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => { modal.style.display = 'none'; }, 200);
    }
  };

  function normText(v) {
    return String(v || '').trim().replace(/\s+/g, ' ').toLowerCase();
  }

  window.verifyStudentAndContinue = function () {
    const idEl = document.getElementById('verifyRecordId');
    const id = idEl ? idEl.value : '';
    const s = getLocalStudentList().find(x => x.id === id);
    const errEl = document.getElementById('verifyErrorFeedback');
    const fail = (msg) => { if (errEl) errEl.textContent = msg; };
    if (!s) { fail('Portfolio not found. Please reopen the Download list.'); return; }
    if (!isReleased(s) || (s.status || 'pending_evaluation') !== 'evaluated') {
      fail('This portfolio has not been released by the Admin yet.');
      return;
    }
    const p = s.profile || (s.data && s.data.profile) || s;
    const enteredName = normText((document.getElementById('verifyStudentName') || {}).value);
    const enteredRoll = normText((document.getElementById('verifyRollNo') || {}).value);
    const enteredDob = String((document.getElementById('verifyDob') || {}).value || '').trim();
    const actualName = normText(p.student_name || s.student_name);
    const actualRoll = normText(p.roll_no || s.roll_no);
    const actualDob = String(p.dob || '').trim();
    if (!enteredName || !enteredRoll) {
      fail('Please enter your name and roll number.');
      return;
    }
    if (actualDob && !enteredDob) {
      fail('Please enter your date of birth.');
      return;
    }
    const okName = enteredName && actualName && enteredName === actualName;
    const okRoll = enteredRoll && actualRoll && enteredRoll === actualRoll;
    const okDob = !actualDob || (enteredDob && enteredDob === actualDob);
    if (!okName || !okRoll || !okDob) {
      fail('Details do not match this portfolio. You can only download your own portfolio.');
      return;
    }
    closeVerifyModal();
    pendingPrintPayload = { type: 'download', data: s };
    setTimeout(() => openPrintSubjectModal(s), 220);
  };

  // Legacy entry point — always routed through identity verification.
  window.downloadReleasedPortfolio = function (id) {
    window.requestDownload(id);
  };

  // =========================================================
  // 2. PERFORMANCE GRAPH REMOVED (Academic Progress section deleted)
  // =========================================================
  function getSubjectScores() { return {}; }
  function updatePerformanceGraph() { return; }

  // =========================================================
  // 3. PHOTOGRAPH UPLOAD & ABOUT ME CLASS SYNC
  // =========================================================
  function initPhotoUpload() {
    const fileInput = document.getElementById('photoFileInput');
    const uploadBox = document.getElementById('photoUploadBox');
    const previewImg = document.getElementById('photoPreviewImg');
    const promptText = document.getElementById('photoPromptText');
    const removeBtn = document.getElementById('photoRemoveBtn');

    if (!fileInput || !uploadBox) return;

    uploadBox.addEventListener('click', (e) => {
      if (e.target === removeBtn || e.target.closest('#photoRemoveBtn')) {
        e.stopPropagation();
        return;
      }
      fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        currentPhotoBase64 = loadEvent.target.result;
        previewImg.src = currentPhotoBase64;
        previewImg.style.display = 'block';
        promptText.style.display = 'none';
        removeBtn.style.display = 'block';
        saveDraft();
      };
      reader.readAsDataURL(file);
    });

    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentPhotoBase64 = '';
      previewImg.src = '';
      previewImg.style.display = 'none';
      promptText.style.display = 'block';
      removeBtn.style.display = 'none';
      fileInput.value = '';
      saveDraft();
    });
  }

  function initClassSync() {
    const classSelect = document.getElementById('profile_class_section');
    const aboutClassSpan = document.getElementById('about_study_class');
    const studentNameInput = document.getElementById('profile_student_name');
    const aboutNameInput = document.getElementById('about_name');
    const declNameInput = document.getElementById('decl_student_name');

    if (classSelect && aboutClassSpan) {
      classSelect.addEventListener('change', () => {
        aboutClassSpan.textContent = classSelect.value || 'Class __________';
        saveDraft();
      });
    }

    if (studentNameInput) {
      studentNameInput.addEventListener('input', () => {
        if (aboutNameInput && !aboutNameInput.value) {
          aboutNameInput.placeholder = studentNameInput.value || 'Full Name';
        }
        if (declNameInput && !declNameInput.value) {
          declNameInput.value = studentNameInput.value;
        }
      });
    }
  }

  // =========================================================
  // 4. FORM DATA GATHERING & LOCAL DRAFT
  // =========================================================
  function getFormData(source = 'send') {
    const studentId = localStorage.getItem(STUDENT_ID_KEY) || ('stu_' + Date.now());

    // Collect goals checklist
    const goalsChecked = [];
    document.querySelectorAll('input[name="goal_checkbox"]:checked').forEach((cb) => {
      goalsChecked.push(cb.value);
    });

    // Collect school participation checklist (matches sec-participation)
    const partChecked = [];
    document.querySelectorAll('input[name="part_checkbox"]:checked').forEach((cb) => {
      partChecked.push(cb.value);
    });

    // Collect Co-Curricular 4 rows
    const coCurricular = [];
    for (let i = 1; i <= 4; i++) {
      coCurricular.push({
        activity: (document.getElementById(`co_act_${i}`) || {}).value || '',
        date: (document.getElementById(`co_date_${i}`) || {}).value || '',
        participation: (document.getElementById(`co_part_${i}`) || {}).value || '',
        teacher_remark: ''
      });
    }

    // Collect Achievements 4 rows (matches sec-awards)
    const achievements = [];
    for (let i = 1; i <= 4; i++) {
      achievements.push({
        achievement: (document.getElementById(`ach_item_${i}`) || {}).value || '',
        event: (document.getElementById(`ach_event_${i}`) || {}).value || '',
        date: (document.getElementById(`ach_date_${i}`) || {}).value || '',
        award: (document.getElementById(`ach_award_${i}`) || {}).value || ''
      });
    }

    // Collect Projects 4 rows (matches sec-projects: subject/title/learning)
    const projects = [];
    for (let i = 1; i <= 4; i++) {
      projects.push({
        subject: (document.getElementById(`proj_sub_${i}`) || {}).value || '',
        title: (document.getElementById(`proj_title_${i}`) || {}).value || '',
        learning: (document.getElementById(`proj_learn_${i}`) || {}).value || ''
      });
    }

    // Collect Personal Improvement Plan 4 rows (matches sec-pip)
    const pip = [];
    for (let i = 1; i <= 4; i++) {
      pip.push({
        area: (document.getElementById(`pip_area_${i}`) || {}).value || '',
        action_plan: (document.getElementById(`pip_plan_${i}`) || {}).value || '',
        target_date: (document.getElementById(`pip_target_${i}`) || {}).value || '',
        progress: (document.getElementById(`pip_prog_${i}`) || {}).value || ''
      });
    }

    // Collect Reading Log 4 rows (matches sec-reading)
    const reading_log = [];
    for (let i = 1; i <= 4; i++) {
      reading_log.push({
        title: (document.getElementById(`book_title_${i}`) || {}).value || '',
        author: (document.getElementById(`book_author_${i}`) || {}).value || '',
        date: (document.getElementById(`book_date_${i}`) || {}).value || '',
        takeaway: (document.getElementById(`book_takeaway_${i}`) || {}).value || ''
      });
    }

    return {
      id: studentId,
      source: source,
      header: {
        academic_session: (document.getElementById('academic_session_input') || {}).value || '2026–2027'
      },
      profile: {
        student_name: (document.getElementById('profile_student_name') || {}).value || '',
        class_section: (document.getElementById('profile_class_section') || {}).value || '',
        roll_no: (document.getElementById('profile_roll_no') || {}).value || '',
        admission_no: (document.getElementById('profile_admission_no') || {}).value || '',
        dob: (document.getElementById('profile_dob') || {}).value || '',
        father_name: (document.getElementById('profile_father_name') || {}).value || '',
        mother_name: (document.getElementById('profile_mother_name') || {}).value || '',
        contact_no: (document.getElementById('profile_contact_no') || {}).value || '',
        house: (document.getElementById('profile_house') || {}).value || '',
        class_teacher: (document.getElementById('profile_class_teacher') || {}).value || '',
        photo_data: currentPhotoBase64
      },
      about_me: {
        name: (document.getElementById('about_name') || {}).value || '',
        student_type: (document.getElementById('about_student_type') || {}).value || '',
        favourite_subjects: (document.getElementById('about_favourite_subjects') || {}).value || '',
        interests: (document.getElementById('about_interests') || {}).value || '',
        hobbies: (document.getElementById('about_hobbies') || {}).value || '',
        strengths: [
          (document.getElementById('strength_1') || {}).value || '',
          (document.getElementById('strength_2') || {}).value || '',
          (document.getElementById('strength_3') || {}).value || ''
        ],
        one_improvement: (document.getElementById('about_improvement') || {}).value || ''
      },
      goals: {
        short_term_goal: (document.getElementById('goal_short_term') || {}).value || '',
        long_term_goal: (document.getElementById('goal_long_term') || {}).value || '',
        this_year_goals: goalsChecked
      },
      co_curricular: coCurricular,
      achievements: achievements,
      achievements_evidence: (document.getElementById('ach_evidence') || {}).value || '',
      projects: projects,
      reading_log: reading_log,
      school_participation: {
        activities: partChecked,
        other: (document.getElementById('part_other_text') || {}).value || '',
        memorable_activity: (document.getElementById('part_memorable') || {}).value || ''
      },
      best_work: {
        why: (document.getElementById('best_why') || {}).value || '',
        learned: (document.getElementById('best_learned') || {}).value || '',
        evidence: (document.getElementById('best_evidence') || {}).value || ''
      },
      parent_feedback: {
        child_strengths: (document.getElementById('parent_strengths') || {}).value || '',
        child_improve: (document.getElementById('parent_improve') || {}).value || '',
        parent_suggestions: (document.getElementById('parent_suggestions') || {}).value || '',
        parent_signature: (document.getElementById('parent_signature') || {}).value || '',
        parent_date: (document.getElementById('parent_date') || {}).value || ''
      },
      self_reflection: {
        learned: (document.getElementById('reflect_learned') || {}).value || '',
        achievement: (document.getElementById('reflect_achievement') || {}).value || '',
        challenge: (document.getElementById('reflect_challenge') || {}).value || '',
        overcome: (document.getElementById('reflect_overcome') || {}).value || '',
        next_year: (document.getElementById('reflect_next_year') || {}).value || ''
      },
      personal_improvement_plan: pip,
      year_review: {
        best_achievement: (document.getElementById('year_best') || {}).value || '',
        favourite_subject: (document.getElementById('year_subject') || {}).value || '',
        favourite_activity: (document.getElementById('year_activity') || {}).value || '',
        award_received: (document.getElementById('year_award') || {}).value || '',
        new_learned: (document.getElementById('year_learned') || {}).value || '',
        proud_of: (document.getElementById('year_proud') || {}).value || '',
        goal_next_year: (document.getElementById('year_goal') || {}).value || ''
      },
      student_declaration: {
        student_name: (document.getElementById('decl_student_name') || {}).value || '',
        signature: (document.getElementById('decl_signature') || {}).value || '',
        date: (document.getElementById('decl_date') || {}).value || ''
      }
    };
  }

  function saveDraft() {
    try {
      const data = getFormData('draft');
      localStorage.setItem('shm_portfolio_draft', JSON.stringify(data));
      updateStatusBadge('Draft saved');
    } catch (e) {}
  }

  function initDraftPersistence() {
    try {
      const raw = localStorage.getItem('shm_portfolio_draft');
      if (raw) {
        populateForm(JSON.parse(raw));
      }
    } catch (e) {}

    const form = document.getElementById('portfolioForm');
    if (form) {
      form.addEventListener('input', debounce(saveDraft, 600));
      form.addEventListener('change', saveDraft);
    }
  }

  function populateForm(d) {
    if (!d) return;

    if (d.header && d.header.academic_session) setVal('academic_session_input', d.header.academic_session);

    if (d.profile) {
      setVal('profile_student_name', d.profile.student_name);
      setVal('profile_class_section', d.profile.class_section);
      setVal('profile_roll_no', d.profile.roll_no);
      setVal('profile_admission_no', d.profile.admission_no);
      setVal('profile_dob', d.profile.dob);
      setVal('profile_father_name', d.profile.father_name);
      setVal('profile_mother_name', d.profile.mother_name);
      setVal('profile_contact_no', d.profile.contact_no);
      setVal('profile_house', d.profile.house);
      setVal('profile_class_teacher', d.profile.class_teacher);

      const aboutClassSpan = document.getElementById('about_study_class');
      if (aboutClassSpan && d.profile.class_section) {
        aboutClassSpan.textContent = d.profile.class_section;
      }

      if (d.profile.photo_data) {
        currentPhotoBase64 = d.profile.photo_data;
        const previewImg = document.getElementById('photoPreviewImg');
        const promptText = document.getElementById('photoPromptText');
        const removeBtn = document.getElementById('photoRemoveBtn');
        if (previewImg && promptText && removeBtn) {
          previewImg.src = currentPhotoBase64;
          previewImg.style.display = 'block';
          promptText.style.display = 'none';
          removeBtn.style.display = 'block';
        }
      }
    }

    if (d.about_me) {
      setVal('about_name', d.about_me.name);
      setVal('about_student_type', d.about_me.student_type);
      setVal('about_favourite_subjects', d.about_me.favourite_subjects);
      setVal('about_interests', d.about_me.interests);
      setVal('about_hobbies', d.about_me.hobbies);
      if (Array.isArray(d.about_me.strengths)) {
        setVal('strength_1', d.about_me.strengths[0] || '');
        setVal('strength_2', d.about_me.strengths[1] || '');
        setVal('strength_3', d.about_me.strengths[2] || '');
      }
      setVal('about_improvement', d.about_me.one_improvement);
    }

    if (d.goals) {
      setVal('goal_short_term', d.goals.short_term_goal);
      setVal('goal_long_term', d.goals.long_term_goal);
      if (Array.isArray(d.goals.this_year_goals)) {
        document.querySelectorAll('input[name="goal_checkbox"]').forEach((cb) => {
          cb.checked = d.goals.this_year_goals.includes(cb.value);
        });
      }
    }

    if (Array.isArray(d.co_curricular)) {
      d.co_curricular.forEach((r, idx) => {
        const i = idx + 1;
        setVal(`co_act_${i}`, r.activity);
        setVal(`co_date_${i}`, r.date);
        setVal(`co_part_${i}`, r.participation);
      });
    }

    if (Array.isArray(d.achievements)) {
      d.achievements.forEach((r, idx) => {
        const i = idx + 1;
        setVal(`ach_item_${i}`, r.achievement);
        setVal(`ach_event_${i}`, r.event);
        setVal(`ach_date_${i}`, r.date);
        setVal(`ach_award_${i}`, r.award);
      });
    }
    setVal('ach_evidence', d.achievements_evidence ?? d.certificates_evidence ?? '');

    if (Array.isArray(d.projects)) {
      d.projects.forEach((r, idx) => {
        const i = idx + 1;
        if (i > 4) return;
        setVal(`proj_sub_${i}`, r.subject);
        setVal(`proj_title_${i}`, r.title);
        setVal(`proj_learn_${i}`, r.learning);
      });
    } else if (d.projects) {
      // backward compat with legacy proj1_/proj2_ keys
      setVal('proj_sub_1', d.projects.proj1_title || d.projects.subject || '');
      setVal('proj_title_1', d.projects.proj1_title || '');
      setVal('proj_learn_1', d.projects.proj1_learned || '');
      setVal('proj_title_2', d.projects.proj2_title || '');
      setVal('proj_learn_2', d.projects.proj2_learned || '');
    }

    if (Array.isArray(d.reading_log)) {
      d.reading_log.forEach((r, idx) => {
        const i = idx + 1;
        if (i > 4) return;
        setVal(`book_title_${i}`, r.title);
        setVal(`book_author_${i}`, r.author);
        setVal(`book_date_${i}`, r.date);
        setVal(`book_takeaway_${i}`, r.takeaway);
      });
    }

    if (d.school_participation) {
      if (Array.isArray(d.school_participation.activities)) {
        document.querySelectorAll('input[name="part_checkbox"]').forEach((cb) => {
          cb.checked = d.school_participation.activities.includes(cb.value);
        });
      }
      setVal('part_other_text', d.school_participation.other);
      setVal('part_memorable', d.school_participation.memorable_activity);
    }

    if (d.best_work) {
      setVal('best_why', d.best_work.why ?? d.best_work.description ?? '');
      setVal('best_learned', d.best_work.learned ?? '');
      setVal('best_evidence', d.best_work.evidence ?? '');
    }

    if (d.parent_feedback) {
      setVal('parent_strengths', d.parent_feedback.child_strengths ?? '');
      setVal('parent_improve', d.parent_feedback.child_improve ?? '');
      setVal('parent_suggestions', d.parent_feedback.parent_suggestions ?? d.parent_feedback.remarks ?? '');
      setVal('parent_signature', d.parent_feedback.parent_signature);
      setVal('parent_date', d.parent_feedback.parent_date);
    }

    if (d.self_reflection || d.reflection) {
      const sr = d.self_reflection || d.reflection || {};
      setVal('reflect_learned', sr.learned ?? '');
      setVal('reflect_achievement', sr.achievement ?? '');
      setVal('reflect_challenge', sr.challenge ?? sr.challenging ?? '');
      setVal('reflect_overcome', sr.overcome ?? '');
      setVal('reflect_next_year', sr.next_year ?? sr.differently ?? '');
      // legacy 3-prompt ids (kept for old drafts)
      setVal('reflect_enjoyed', sr.enjoyed ?? '');
      setVal('reflect_challenging', sr.challenging ?? '');
      setVal('reflect_differently', sr.differently ?? '');
    }

    if (Array.isArray(d.personal_improvement_plan)) {
      d.personal_improvement_plan.forEach((r, idx) => {
        const i = idx + 1;
        setVal(`pip_area_${i}`, r.area);
        setVal(`pip_plan_${i}`, r.action_plan);
        setVal(`pip_target_${i}`, r.target_date);
        setVal(`pip_prog_${i}`, r.progress);
      });
    }

    if (d.year_review || d.year_in_one_page) {
      const yr = d.year_review || d.year_in_one_page || {};
      setVal('year_best', yr.best_achievement ?? yr.highlights ?? '');
      setVal('year_subject', yr.favourite_subject ?? '');
      setVal('year_activity', yr.favourite_activity ?? '');
      setVal('year_award', yr.award_received);
      setVal('year_learned', yr.new_learned);
      setVal('year_proud', yr.proud_of);
      setVal('year_goal', yr.goal_next_year);
    }

    if (d.student_declaration) {
      setVal('decl_student_name', d.student_declaration.student_name);
      setVal('decl_signature', d.student_declaration.signature);
      setVal('decl_date', d.student_declaration.date);
    }
  }

  function setVal(id, val) {
    const el = document.getElementById(id);
    if (el && val !== undefined && val !== null) el.value = val;
  }

  function setElVal(id, val) {
    setVal(id, val);
  }

  function setElText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = (text !== undefined && text !== null && text !== '') ? text : '—';
  }

  function getElVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  // =========================================================
  // 5. AUTOMATIC SYNC ON SEND BUTTON
  // =========================================================
  function initActionHandlers() {
    const sendBtn = document.getElementById('btnSendPortfolio');
    if (sendBtn) sendBtn.addEventListener('click', () => handleStudentSend());
    const printBtn = document.getElementById('btnPrintPortfolio');
    if (printBtn) printBtn.addEventListener('click', () => handleStudentPrint());
  }

  async function submitAndSyncRecord(source = 'send') {
    const payload = getFormData(source);
    const studentName = (payload.profile.student_name || '').trim();
    const classSection = (payload.profile.class_section || '').trim();

    if (!studentName) {
      if (source === 'send') {
        alert('Please enter Student’s Name in the Student Profile section.');
        document.getElementById('profile_student_name')?.focus();
      }
      return null;
    }

    if (!classSection) {
      if (source === 'send') {
        alert('Please select Class & Section from the dropdown menu.');
        document.getElementById('profile_class_section')?.focus();
      }
      return null;
    }

    updateStatusBadge('Saving and transmitting to Teacher Dashboard...');

    // 1. Sync to localStorage master roster (ensures static & instant availability)
    try {
      const rosterRaw = localStorage.getItem(SUBMISSIONS_KEY);
      let roster = rosterRaw ? JSON.parse(rosterRaw) : [];
      if (!Array.isArray(roster)) roster = [];

      const existingIdx = roster.findIndex(item => item.id === payload.id);
      const studentRecord = {
        id: payload.id,
        student_name: studentName,
        class_section: classSection,
        roll_no: payload.profile.roll_no,
        admission_no: payload.profile.admission_no,
        updated_at: new Date().toLocaleString(),
        created_at: existingIdx !== -1 ? roster[existingIdx].created_at : new Date().toLocaleString(),
        submission_source: source,
        status: existingIdx !== -1 ? (roster[existingIdx].status || 'pending_evaluation') : 'pending_evaluation',
        photo_url: payload.profile.photo_data,
        profile: payload.profile,
        about_me: payload.about_me,
        goals: payload.goals,
        co_curricular: payload.co_curricular,
        achievements: payload.achievements,
        achievements_evidence: payload.achievements_evidence,
        projects: payload.projects,
        reading_log: payload.reading_log,
        school_participation: payload.school_participation,
        best_work: payload.best_work,
        parent_feedback: payload.parent_feedback,
        self_reflection: payload.self_reflection,
        personal_improvement_plan: payload.personal_improvement_plan,
        year_review: payload.year_review,
        student_declaration: payload.student_declaration,
        header: payload.header
      };

      if (existingIdx !== -1) {
        if (roster[existingIdx].released_for_download) {
          studentRecord.released_for_download = true;
          studentRecord.released_at = roster[existingIdx].released_at;
        }
        if (roster[existingIdx].subject_evaluations) studentRecord.subject_evaluations = roster[existingIdx].subject_evaluations;
        if (roster[existingIdx].skills) studentRecord.skills = roster[existingIdx].skills;
        if (roster[existingIdx].teacher_assessment) studentRecord.teacher_assessment = roster[existingIdx].teacher_assessment;
        if (roster[existingIdx].teacher_final_remark) studentRecord.teacher_final_remark = roster[existingIdx].teacher_final_remark;
        roster[existingIdx] = studentRecord;
      } else {
        roster.unshift(studentRecord);
      }
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(roster));
      localStorage.setItem(STUDENT_ID_KEY, payload.id);
    } catch (e) {
      console.warn('Local master roster sync:', e);
    }

    // 2. Also POST to backend API if active
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {}

    updateStatusBadge(`Recorded in Teacher Dashboard (${new Date().toLocaleTimeString()})`);
    return { success: true, student_id: payload.id };
  }

  async function handleStudentSend() {
    const sendBtn = document.getElementById('btnSendPortfolio');
    if (sendBtn) sendBtn.disabled = true;

    const result = await submitAndSyncRecord('send');
    if (sendBtn) sendBtn.disabled = false;

    if (result && result.success) {
      showSuccessModal(
        'Portfolio Sent to Teacher!',
        'Your portfolio has been recorded and transmitted to the Teacher’s Dashboard. The teacher will now review your submission and complete the Skills Evaluation.'
      );
    }
  }

  let pendingPrintPayload = null;
  let lastDownloadId = null;

  async function handleStudentPrint() {
    // Automatically save & record before printing (if name/class present)
    try {
      updateStatusBadge('Auto-saving record to Teacher Dashboard before printing...');
      await submitAndSyncRecord('print');
    } catch (e) {
      console.warn('Auto-save on print:', e);
    }

    // Make sure graph is updated on screen
    try {
    /* Academic graph removed */
    } catch (e) {}

    // Prepare print payload from current student form
    const currentData = getFormData('print');
    pendingPrintPayload = { type: 'student', data: currentData };

    // Prompt teacher and student for specific subject scope
    openPrintSubjectModal(currentData);
  }

  window.handleStudentPrint = handleStudentPrint;
  window.handleStudentSend = handleStudentSend;

  // =========================================================
  // 6. TEACHER DASHBOARD & EVALUATION (ON SAME PAGE)
  // =========================================================
  function initTeacherFilters() {
    const classSel = document.getElementById('filterClassSelect');
    const statusSel = document.getElementById('filterStatusSelect');
    const searchInp = document.getElementById('searchStudentInput');

    if (classSel) classSel.addEventListener('change', () => loadStudentRoster());
    if (statusSel) statusSel.addEventListener('change', () => loadStudentRoster());
    if (searchInp) searchInp.addEventListener('input', () => loadStudentRoster());
  }

  async function loadStudentRoster() {
    let list = [];

    // Try reading from server API
    try {
      const resp = await fetch('/api/students');
      if (resp.ok) {
        const data = await resp.json();
        if (Array.isArray(data)) list = data;
      }
    } catch (e) {}

    // Merge with localStorage
    try {
      const localRaw = localStorage.getItem(SUBMISSIONS_KEY);
      if (localRaw) {
        const localList = JSON.parse(localRaw);
        if (Array.isArray(localList)) {
          localList.forEach(item => {
            if (!list.some(s => s.id === item.id)) {
              list.push(item);
            }
          });
        }
      }
    } catch (e) {}

    // If still empty (e.g. initial static view), populate demonstration student submissions
    if (list.length === 0 && typeof DEFAULT_DEMO_STUDENTS !== 'undefined' && Array.isArray(DEFAULT_DEMO_STUDENTS)) {
      list = JSON.parse(JSON.stringify(DEFAULT_DEMO_STUDENTS));
      try {
        localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(list));
      } catch (e) {}
    }

    // Update stats
    const total = list.length;
    const pending = list.filter(s => s.status !== 'evaluated').length;
    const evaluated = list.filter(s => s.status === 'evaluated').length;

    const elTotal = document.getElementById('statTotalSubmissions');
    const elPending = document.getElementById('statPendingEvaluation');
    const elEvaluated = document.getElementById('statEvaluated');

    if (elTotal) elTotal.textContent = total;
    if (elPending) elPending.textContent = pending;
    if (elEvaluated) elEvaluated.textContent = evaluated;

    renderRosterTable(list);
  }

  function renderRosterTable(list) {
    const tbody = document.getElementById('rosterTableBody');
    const emptyState = document.getElementById('emptyRosterState');
    const classFilter = document.getElementById('filterClassSelect')?.value || 'all';
    const statusFilter = document.getElementById('filterStatusSelect')?.value || 'all';
    const searchVal = (document.getElementById('searchStudentInput')?.value || '').trim().toLowerCase();

    if (!tbody) return;

    let filtered = list.filter(s => {
      const sName = (s.student_name || s.profile?.student_name || '').toLowerCase();
      const sRoll = String(s.roll_no || s.profile?.roll_no || '').toLowerCase();
      const sAdm = String(s.admission_no || s.profile?.admission_no || '').toLowerCase();
      const sClass = (s.class_section || s.profile?.class_section || '');
      const sStatus = s.status || 'pending_evaluation';

      if (classFilter !== 'all' && sClass !== classFilter) return false;
      if (statusFilter !== 'all' && sStatus !== statusFilter) return false;
      if (searchVal && !sName.includes(searchVal) && !sRoll.includes(searchVal) && !sAdm.includes(searchVal)) return false;

      return true;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    tbody.innerHTML = filtered.map(s => {
      const id = s.id;
      const name = s.student_name || s.profile?.student_name || 'Unnamed Student';
      const cls = s.class_section || s.profile?.class_section || '—';
      const roll = s.roll_no || s.profile?.roll_no || '—';
      const adm = s.admission_no || s.profile?.admission_no || '';
      const photo = s.photo_url || s.profile?.photo_data || '';
      const time = s.updated_at || s.created_at || 'Recently';
      const isEvaluated = s.status === 'evaluated';
      const source = s.submission_source || s.source || 'send';

      const photoHtml = photo 
        ? `<img src="${photo}" class="student-thumb" alt="Photo">`
        : `<div class="student-thumb" style="display:flex;align-items:center;justify-content:center;font-size:1.1rem;color:#94a3b8;">👤</div>`;

      const releasedFlag = !!(s.released_for_download || (s.data && s.data.released_for_download));
      const statusBadge = isEvaluated
        ? `<span class="status-badge status-evaluated"><span>✓</span> Evaluated</span>${releasedFlag ? ' <span class="release-badge">⬇️ Released</span>' : ''}`
        : `<span class="status-badge status-pending"><span>⏳</span> Pending</span>`;

      const sourceBadge = source === 'print'
        ? `<span style="font-size:0.75rem;background:#f1f5f9;color:#475569;padding:2px 6px;border-radius:4px;font-weight:600;">🖨️ Auto-Saved via Print</span>`
        : `<span style="font-size:0.75rem;background:#f0fdf4;color:#166534;padding:2px 6px;border-radius:4px;font-weight:600;">🚀 Sent via Send</span>`;

      return `
        <tr>
          <td>${photoHtml}</td>
          <td>
            <strong style="color:#0f172a;font-size:0.95rem;">${escapeHtml(name)}</strong>
            ${adm ? `<div style="font-size:0.78rem;color:#64748b;">Adm: ${escapeHtml(adm)}</div>` : ''}
          </td>
          <td><span style="font-weight:600;color:#1e3a8a;">${escapeHtml(cls)}</span></td>
          <td><span style="font-weight:600;">${escapeHtml(roll)}</span></td>
          <td style="font-size:0.85rem;color:#64748b;">${escapeHtml(time)}</td>
          <td>${sourceBadge}</td>
          <td>${statusBadge}</td>
          <td style="text-align:right;">
            <div class="action-btn-group" style="justify-content:flex-end;">
              <button type="button" class="btn-action btn-eval" onclick="openEvaluationModal('${escapeHtml(id)}')">
                <span>✏️</span> Evaluate
              </button>
              <button type="button" class="btn-action btn-print-sm" onclick="printStudentFromTeacherRoster('${escapeHtml(id)}')">
                <span>🖨️</span> Print
              </button>
              <button type="button" class="btn-action btn-del" onclick="deleteStudentRecord('${escapeHtml(id)}', '${escapeHtml(name)}')">
                <span>🗑️</span>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  // 7. Teacher Evaluation Modal Dialog
  window.openEvaluationModal = function (studentId) {
    const list = getLocalStudentList();
    const student = list.find(s => s.id === studentId);
    if (!student) {
      alert('Student record not found.');
      return;
    }

    currentEvaluatingStudent = student;
    const modal = document.getElementById('evalModal');
    if (!modal) return;

    document.getElementById('modalStudentTitle').textContent = `Faculty Evaluation: ${student.student_name || student.profile?.student_name}`;
    document.getElementById('modalStudentSubtitle').textContent = `${student.class_section || student.profile?.class_section} • Roll No: ${student.roll_no || student.profile?.roll_no}`;
    // Subject-wise evaluation — each subject teacher evaluates their own subject
    const existingSubj = getSubjectEvaluations(student);
    EVAL_SUBJECTS.forEach((cfg) => {
      const ev = existingSubj[cfg.id] || {};
      setElVal(`modal_subj_${cfg.id}_teacher`, ev.teacher || '');
      const gradeEl = document.getElementById(`modal_subj_${cfg.id}_grade`);
      if (gradeEl) gradeEl.value = ev.grade || '';
      setElVal(`modal_subj_${cfg.id}_remarks`, ev.remarks || '');
    });
// Populate Skills
    const existingSkills = student.skills || student.data?.skills || {};
    const skillKeys = ['communication', 'reading', 'writing', 'creativity', 'problem_solving', 'teamwork', 'leadership', 'time_management', 'digital_skills'];
    skillKeys.forEach(k => {
      setElVal(`modal_skill_${k}`, existingSkills[k] || '');
    });

    // Populate Co-Curricular Remarks
    const coRows = student.co_curricular || student.data?.co_curricular || [];
    for (let i = 1; i <= 4; i++) {
      const row = coRows[i - 1] || {};
      setElVal(`modal_co_rem_${i}`, row.teacher_remark || '');
    }

    // Populate Teacher's Assessment 8 Areas
    const existingTA = student.teacher_assessment || student.data?.teacher_assessment || {};
    const areas = ['academic_performance', 'discipline', 'regularity', 'communication', 'participation', 'teamwork', 'leadership', 'creativity'];
    areas.forEach(area => {
      const val = existingTA[area];
      if (val) {
        const radio = document.querySelector(`input[name="modal_ta_${area}"][value="${val}"]`);
        if (radio) radio.checked = true;
      } else {
        document.querySelectorAll(`input[name="modal_ta_${area}"]`).forEach(r => r.checked = false);
      }
    });
    setElVal('modal_teacher_remarks', existingTA.teacher_remarks || '');
    setElVal('modal_teacher_sig', existingTA.teacher_signature || '');
    setElVal('modal_teacher_date', existingTA.teacher_date || new Date().toISOString().split('T')[0]);

    // Populate Final Remarks
    const existingTFR = student.teacher_final_remark || student.data?.teacher_final_remark || {};
    setElVal('modal_final_class_teacher', existingTFR.class_teacher || '');
    setElVal('modal_final_principal', existingTFR.principal || '');

    modal.style.display = 'block';
  };

  window.closeEvaluationModal = function () {
    const modal = document.getElementById('evalModal');
    if (modal) modal.style.display = 'none';
    currentEvaluatingStudent = null;
  };

  window.saveModalEvaluation = async function () {
    if (!currentEvaluatingStudent) return;

    // Subject-wise evaluation — each subject teacher evaluates their own subject
    const subjectEvals = {};
    EVAL_SUBJECTS.forEach((cfg) => {
      subjectEvals[cfg.id] = {
        teacher: getElVal(`modal_subj_${cfg.id}_teacher`),
        grade: getElVal(`modal_subj_${cfg.id}_grade`),
        remarks: getElVal(`modal_subj_${cfg.id}_remarks`)
      };
    });

    const skillsData = {
      communication: getElVal('modal_skill_communication'),
      reading: getElVal('modal_skill_reading'),
      writing: getElVal('modal_skill_writing'),
      creativity: getElVal('modal_skill_creativity'),
      problem_solving: getElVal('modal_skill_problem_solving'),
      teamwork: getElVal('modal_skill_teamwork'),
      leadership: getElVal('modal_skill_leadership'),
      time_management: getElVal('modal_skill_time_management'),
      digital_skills: getElVal('modal_skill_digital_skills')
    };

    const coRemarks = [
      getElVal('modal_co_rem_1'),
      getElVal('modal_co_rem_2'),
      getElVal('modal_co_rem_3'),
      getElVal('modal_co_rem_4')
    ];

    function getRadio(name) {
      const checked = document.querySelector(`input[name="${name}"]:checked`);
      return checked ? checked.value : '';
    }

    const assessmentData = {
      academic_performance: getRadio('modal_ta_academic_performance'),
      discipline: getRadio('modal_ta_discipline'),
      regularity: getRadio('modal_ta_regularity'),
      communication: getRadio('modal_ta_communication'),
      participation: getRadio('modal_ta_participation'),
      teamwork: getRadio('modal_ta_teamwork'),
      leadership: getRadio('modal_ta_leadership'),
      creativity: getRadio('modal_ta_creativity'),
      teacher_remarks: getElVal('modal_teacher_remarks'),
      teacher_signature: getElVal('modal_teacher_sig'),
      teacher_date: getElVal('modal_teacher_date')
    };

    const finalRemarkData = {
      class_teacher: getElVal('modal_final_class_teacher'),
      principal: getElVal('modal_final_principal')
    };

    const evalPayload = {
      subject_evaluations: subjectEvals,
      skills: skillsData,
      co_curricular_remarks: coRemarks,
      teacher_assessment: assessmentData,
      teacher_final_remark: finalRemarkData
    };

    // Update in localStorage
    const list = getLocalStudentList();
    const idx = list.findIndex(s => s.id === currentEvaluatingStudent.id);
    if (idx !== -1) {
      list[idx].status = 'evaluated';
      list[idx].updated_at = new Date().toLocaleString();
      list[idx].subject_evaluations = evalPayload.subject_evaluations;
      list[idx].skills = evalPayload.skills;
      list[idx].teacher_assessment = evalPayload.teacher_assessment;
      list[idx].teacher_final_remark = evalPayload.teacher_final_remark;

      if (Array.isArray(list[idx].co_curricular)) {
        coRemarks.forEach((rem, rIdx) => {
          if (list[idx].co_curricular[rIdx]) {
            list[idx].co_curricular[rIdx].teacher_remark = rem;
          }
        });
      }

      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(list));
    }

    // Try posting to Flask server API if active
    try {
      await fetch(`/api/teacher/evaluate/${currentEvaluatingStudent.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(evalPayload)
      });
    } catch (e) {}

    alert('✓ Teacher Evaluation saved successfully! Status updated to Evaluated.');
    closeEvaluationModal();
    loadStudentRoster();
    /* Academic graph removed */
  };

  // 8. Per-subject print: student picks Overall or one of 6 subjects
  let pendingPrintSubject = 'all';

  window.printStudentFromTeacherRoster = function (studentId) {
    const list = getLocalStudentList();
    const student = list.find(s => s.id === studentId);
    if (!student) {
      alert('Student record not found.');
      return;
    }

    pendingPrintPayload = { type: 'teacher', data: student };
    openPrintSubjectModal(student);
  };

  // Subject picker modal (built on demand so all pages get it)
  function ensurePrintSubjectModal() {
    let modal = document.getElementById('printSubjectModal');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'printSubjectModal';
    modal.className = 'modal-overlay no-print';
    modal.style.display = 'none';
    modal.innerHTML = `
      <div class="modal-card print-modal-box">
        <div class="modal-icon">🖨️</div>
        <h3 class="modal-title">Print Portfolio</h3>
        <p class="modal-message" id="printSubjectModalName">Choose what to print</p>
        <div id="printSubjectBtnGrid" class="print-subject-grid"></div>
        <button type="button" class="btn-vibrant btn-outline" style="margin-top: 1rem; width: 100%; justify-content: center;" onclick="closePrintSubjectModal()">Cancel</button>
      </div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closePrintSubjectModal(); });
    return modal;
  }

  // Modal handlers for subject-specific print selection
  window.openPrintSubjectModal = function (studentData) {
    const s = studentData || (typeof pendingPrintPayload !== 'undefined' && pendingPrintPayload ? pendingPrintPayload.data : null);
    if (s && s.id) lastDownloadId = s.id;
    const evals = getSubjectEvaluations(s);
    const modal = ensurePrintSubjectModal();
    const nameEl = document.getElementById('printSubjectModalName');
    const p = (s && (s.profile || (s.data && s.data.profile))) || {};
    if (nameEl) nameEl.textContent = `Print portfolio for ${p.student_name || s?.student_name || 'student'} — overall or a single subject`;
    const grid = document.getElementById('printSubjectBtnGrid');
    if (grid) {
      const allBtn = `<button type="button" class="print-subject-btn print-subject-all" onclick="executeSubjectPrint('all')"><span>🌟</span><span>Overall Portfolio<small>All 6 subjects + graph</small></span></button>`;
      grid.innerHTML = allBtn + EVAL_SUBJECTS.map((cfg) => {
        const ev = evals[cfg.id] || {};
        const done = ev.grade ? '✓ Evaluated' : 'Pending';
        return `<button type="button" class="print-subject-btn" onclick="executeSubjectPrint('${cfg.id}')"><span>${cfg.icon}</span><span>${escapeHtml(cfg.name)}<small>${done}</small></span></button>`;
      }).join('');
    }
    pendingPrintSubject = 'all';
    modal.style.display = 'flex';
    requestAnimationFrame(() => modal.classList.add('active'));
  };

  window.closePrintSubjectModal = function () {
    const modal = document.getElementById('printSubjectModal');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => { modal.style.display = 'none'; }, 200);
    }
  };

  window.updatePrintSubjectModalPreview = function () { return; };

  window.executeSubjectPrint = function (subjectId) {
    try { closePrintSubjectModal(); } catch (e) {}
    pendingPrintSubject = subjectId || 'all';
    const studentData = (typeof pendingPrintPayload !== 'undefined' && pendingPrintPayload) ? pendingPrintPayload.data : null;
    let ok = false;
    try {
      ok = populateSinglePagePrintSheet(studentData, pendingPrintSubject);
    } catch (err) {
      console.warn('Print populate failed:', err);
      ok = false;
    }
    if (!ok) {
      alert('Could not load this portfolio for printing. Please reopen it from the Download list and try again.');
      return;
    }
    setTimeout(() => { window.print(); }, 300);
  };

  window.deleteStudentRecord = async function (id, name) {
    if (!confirm(`Are you sure you want to delete the submission for "${name}"?`)) return;

    const list = getLocalStudentList();
    const filtered = list.filter(s => s.id !== id);
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(filtered));

    try {
      await fetch(`/api/teacher/delete/${id}`, { method: 'POST' });
    } catch (e) {}

    loadStudentRoster();
  };

  function getLocalStudentList() {
    try {
      const raw = localStorage.getItem(SUBMISSIONS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  // =========================================================
  // 9. MASTER SINGLE-PAGE A4 PRINT POPULATOR & DYNAMIC GRAPH
  // =========================================================
  function populateSinglePagePrintSheet(studentData, selectedSubject = 'all') {
    const sheet = document.getElementById('singlePageSheet');
    if (!sheet) return false;

    let s = studentData;
    if (!s) {
      s = getFormData('print');
      // Merge with any existing saved/evaluated record for this student
      try {
        const list = getLocalStudentList();
        const saved = list.find(item => item.id === s.id || (item.profile?.student_name && item.profile?.student_name === s.profile?.student_name));
        if (saved) {
          s.subject_evaluations = s.subject_evaluations || saved.subject_evaluations || saved.data?.subject_evaluations;
          s.skills = s.skills || saved.skills || saved.data?.skills;
          s.teacher_assessment = s.teacher_assessment || saved.teacher_assessment || saved.data?.teacher_assessment;
          s.teacher_final_remark = s.teacher_final_remark || saved.teacher_final_remark || saved.data?.teacher_final_remark;
        }
      } catch (e) {}
    }
    if (selectedSubject && selectedSubject !== 'all') pendingPrintSubject = selectedSubject;

    const p = s.profile || (s.data && s.data.profile) || s;
    if (!p.student_name && !s.student_name && !p.class_section && !p.roll_no) return false;
    if (s && s.id) lastDownloadId = s.id;
    const about = s.about_me || (s.data && s.data.about_me) || {};
    const goals = s.goals || (s.data && s.data.goals) || {};
    const subjEvals = getSubjectEvaluations(s);
    const skills = s.skills || (s.data && s.data.skills) || {};
    const ta = s.teacher_assessment || (s.data && s.data.teacher_assessment) || {};
    const tfr = s.teacher_final_remark || (s.data && s.data.teacher_final_remark) || {};

    // Header Info (no fake defaults — show real data or dash)
    setElText('print_session_text', (s.header && s.header.academic_session) || s.data?.header?.academic_session || '2026–2027');
    setElText('print_record_id', s.id ? `Record ID: ${s.id}` : 'Verified Record');
    setElText('print_class_pill', p.class_section || '');

    // Subject context banner: overall vs single subject
    (function renderSubjectBanner() {
      const banner = document.getElementById('print_subject_banner');
      if (!banner) return;
      const sel = pendingPrintSubject && pendingPrintSubject !== 'all' ? pendingPrintSubject : (selectedSubject || 'all');
      if (!sel || sel === 'all') {
        banner.innerHTML = `<span>📚 Overall Portfolio — all 6 subjects</span>`;
        return;
      }
      const cfg = EVAL_SUBJECTS.find(c => c.id === sel) || { name: sel, teacher: '' };
      const ev = subjEvals[sel] || {};
      const grade = ev.grade || 'Pending';
      const teacherBit = ev.teacher ? ` • ${escapeHtml(ev.teacher)}` : '';
      banner.innerHTML = `<span>${cfg.icon || '📘'} Subject: <strong>${escapeHtml(cfg.name)}</strong>${teacherBit}</span><span>Grade: <strong>${escapeHtml(grade)}</strong></span>`;
    })();

    // Profile table
    setElText('print_name', p.student_name || '—');
    setElText('print_class', p.class_section || '—');
    setElText('print_roll', p.roll_no || '—');
    setElText('print_adm', p.admission_no || '—');
    setElText('print_dob', p.dob || '—');
    setElText('print_contact', p.contact_no || '—');
    setElText('print_father', p.father_name || '—');
    setElText('print_mother', p.mother_name || '—');
    setElText('print_house', p.house || '—');
    setElText('print_teacher', p.class_teacher || '—');

    // Photo
    const photoImg = document.getElementById('printPhotoImg');
    const photoPlaceholder = document.getElementById('printPhotoPlaceholder');
    const photoSrc = p.photo_data || '';
    if (photoImg && photoPlaceholder) {
      if (photoSrc) {
        photoImg.src = photoSrc;
        photoImg.style.display = 'block';
        photoPlaceholder.style.display = 'none';
      } else {
        photoImg.src = '';
        photoImg.style.display = 'none';
        photoPlaceholder.style.display = 'block';
      }
    }

    // About Me & Strengths
    const aboutSnippetParts = [];
    if (about.student_type) aboutSnippetParts.push(`Learner Type: ${about.student_type}`);
    if (about.favourite_subjects) aboutSnippetParts.push(`Fav Subjects: ${about.favourite_subjects}`);
    if (about.one_improvement) aboutSnippetParts.push(`Target: ${about.one_improvement}`);
    setElText('print_about_snippet', aboutSnippetParts.join(' • ') || '—');

    const intParts = [];
    if (about.interests) intParts.push(about.interests);
    if (about.hobbies) intParts.push(about.hobbies);
    setElText('print_interests_hobbies', intParts.join(' • ') || '—');

    const strengthsList = Array.isArray(about.strengths) ? about.strengths.filter(Boolean) : (about.strengths ? [about.strengths] : []);
    setElText('print_strengths', strengthsList.join(', ') || '—');

    // Goals & Priorities (real data only — no invented defaults)
    setElText('print_short_goal', goals.short_term_goal || goals.short_term || '—');
    setElText('print_long_goal', goals.long_term_goal || goals.long_term || '—');
    const goalsList = Array.isArray(goals.this_year_goals) ? goals.this_year_goals : [];
    setElText('print_goals_checklist', goalsList.join(', ') || '—');

    // Skills with attractive progress bars (rating /5 -> % width)
    const skillList = [
      { key: 'communication', name: 'Communication' },
      { key: 'reading', name: 'Reading' },
      { key: 'writing', name: 'Writing' },
      { key: 'creativity', name: 'Creativity' },
      { key: 'problem_solving', name: 'Problem Solving' },
      { key: 'teamwork', name: 'Teamwork' },
      { key: 'leadership', name: 'Leadership' },
      { key: 'time_management', name: 'Time Mgmt' },
      { key: 'digital_skills', name: 'Digital Skills' }
    ];

    const skillVal = (k) => {
      const raw = skills[k];
      const n = parseFloat(raw);
      return (Number.isFinite(n) && n >= 0 && n <= 5) ? n : 0;
    };

    let skillsRowsHtml = '';
    for (let i = 0; i < skillList.length; i += 2) {
      const pair = [skillList[i], skillList[i + 1]].filter(Boolean);
      skillsRowsHtml += '<tr>' + pair.map((sk) => {
        const v = skillVal(sk.key);
        const pct = Math.round((v / 5) * 100);
        const label = v > 0 ? `${v} / 5` : 'Pending';
        return `
          <td style="font-weight: 700; width: 22%; background: #f8fafc; font-size: 8.2pt;">${sk.name}</td>
          <td style="width: 28%;">
            <div style="display: flex; align-items: center; gap: 4px;">
              <div class="print-progress-track" style="flex: 1;">
                <div class="print-progress-fill" style="width: ${pct}%;"></div>
              </div>
              <span style="font-size: 8pt; font-weight: 800; color: #1e3a8a; white-space: nowrap;">${label}</span>
            </div>
          </td>`;
      }).join('') + '</tr>';
    }
    const skillsTableBody = document.getElementById('printSkillsTableBody');
    if (skillsTableBody) skillsTableBody.innerHTML = skillsRowsHtml;

    // Overall portfolio completion progress (attractive header bar)
    try {
      const sections = [
        p.student_name && p.class_section,
        (about.interests || about.hobbies || (about.strengths || []).some(Boolean)),
        (goals.short_term_goal || goals.long_term_goal || (goals.this_year_goals || []).length),
        (s.co_curricular || []).some(r => r && r.activity),
        (s.achievements || []).some(r => r && (r.achievement || r.event)),
        (s.projects || []).some(r => r && (r.subject || r.title)),
        (s.reading_log || []).some(r => r && r.title),
        (((s.school_participation || {}).activities || []).length || (s.school_participation || {}).memorable_activity),
        ((s.best_work || {}).why || (s.best_work || {}).learned),
        ((s.parent_feedback || {}).child_strengths || (s.parent_feedback || {}).parent_signature),
        ((s.self_reflection || s.data?.self_reflection || {}).learned || (s.self_reflection || {}).achievement),
        ((s.year_review || s.data?.year_review || {}).best_achievement || (s.year_review || {}).goal_next_year),
        ((s.student_declaration || {}).student_name || (s.student_declaration || {}).signature)
      ];
      const done = sections.filter(Boolean).length;
      const pct = Math.round((done / sections.length) * 100);
      const fill = document.getElementById('print_overall_fill');
      if (fill) fill.style.width = pct + '%';
      setElText('print_overall_pct', pct + '% Complete');
    } catch (e) {}

    // Co-Curricular, Awards, PIP
    const coRows = s.co_curricular || s.data?.co_curricular || [];
    const coTexts = coRows.filter(r => r && r.activity).map(r => `${r.activity}${r.participation ? ` (${r.participation})` : ''}`);
    setElText('print_cocurricular_snippet', coTexts.join(' • ') || '—');

    const achRows = s.achievements || s.data?.achievements || [];
    const achTexts = achRows.filter(r => r && (r.achievement || r.event || r.award)).map(r => `${r.achievement || r.event || ''}${r.award ? ` [${r.award}]` : ''}`.trim());
    setElText('print_awards_snippet', achTexts.join(' • ') || '—');

    const pipRows = s.personal_improvement_plan || s.data?.personal_improvement_plan || [];
    const pipTexts = pipRows.filter(r => r && r.area).map(r => `${r.area}: ${r.action_plan || 'Targeted practice'}`);
    setElText('print_pip_snippet', pipTexts.join(' • ') || '—');

    // Highlights: top project + reading + best work (single compact line)
    try {
      const projRows = s.projects || s.data?.projects || [];
      const topProj = (projRows.find(r => r && (r.title || r.subject)) || {});
      const readRows = s.reading_log || s.data?.reading_log || [];
      const topBook = (readRows.find(r => r && r.title) || {});
      const bw = s.best_work || s.data?.best_work || {};
      const sp = s.school_participation || s.data?.school_participation || {};
      const bits = [];
      if (topProj.title || topProj.subject) bits.push(`Project: ${topProj.title || topProj.subject}`);
      if (topBook.title) bits.push(`Reading: ${topBook.title}`);
      if (bw.why) bits.push(`Best work: ${String(bw.why).slice(0, 60)}`);
      else if (bw.learned) bits.push(`Best work: ${String(bw.learned).slice(0, 60)}`);
      if (sp.memorable_activity) bits.push(`Memorable: ${String(sp.memorable_activity).slice(0, 60)}`);
      setElText('print_highlights_snippet', bits.join(' • ') || '—');
    } catch (e) {}

    // Subject evaluation focus + overall performance graph
    (function renderSubjectAndGraph() {
      const sel = pendingPrintSubject && pendingPrintSubject !== 'all' ? pendingPrintSubject : 'all';
      const focusBody = document.getElementById('printSubjectFocusBody');
      const focusTitle = document.getElementById('printSubjectFocusTitle');
      const graphBox = document.getElementById('printPerfGraph');
      const avgEl = document.getElementById('print_overall_avg');
      const rows = EVAL_SUBJECTS.map((cfg) => {
        const ev = subjEvals[cfg.id] || {};
        const score = parseMarksToScore(ev.marks, ev.grade);
        return { cfg, ev, score, grade: ev.grade || gradeForScore(score) };
      });
      const scored = rows.filter(r => r.score !== null);
      const avg = scored.length ? Math.round((scored.reduce((a, r) => a + r.score, 0) / scored.length) * 10) / 10 : null;
      if (avgEl) avgEl.textContent = avg !== null ? `Overall Grade: ${gradeForScore(avg)}` : 'Awaiting subject evaluation';
      if (focusBody) {
        if (sel === 'all') {
          if (focusTitle) focusTitle.textContent = '6. SUBJECT EVALUATION — ALL SUBJECTS';
          focusBody.innerHTML = rows.map((r) => `
            <tr>
              <td style="font-weight: 700;">${r.cfg.icon} ${escapeHtml(r.cfg.name)}</td>
              <td style="text-align: center; font-weight: 800;">${r.score !== null ? escapeHtml(r.grade) : '—'}</td>
            </tr>`).join('');
        } else {
          const r = rows.find(x => x.cfg.id === sel) || rows[0];
          if (focusTitle) focusTitle.textContent = `6. SUBJECT EVALUATION — ${r.cfg.name.toUpperCase()}`;
          focusBody.innerHTML = `
            <tr style="background: #eff6ff;">
              <td style="font-weight: 800; color: #1e3a8a;">${r.cfg.icon} ${escapeHtml(r.cfg.name)}${r.ev.teacher ? `<div style="font-size: 8pt; font-weight: 600; color: #475569;">${escapeHtml(r.ev.teacher)}</div>` : ''}</td>
              <td style="text-align: center; font-weight: 800;">${r.score !== null ? escapeHtml(r.grade) : 'Pending'}</td>
            </tr>
            <tr><td colspan="2" style="font-size: 8.4pt; color: #334155;"><strong>Remarks:</strong> ${r.ev.remarks ? escapeHtml(r.ev.remarks) : '—'}</td></tr>`;
        }
      }
      if (graphBox) graphBox.innerHTML = buildPerfGraphSvg(rows, avg, sel);
    })();

    // Teacher remarks & Signatures (real data only)
    setElText('print_teacher_remarks', ta.teacher_remarks || '—');
    setElText('print_sig_student_name', p.student_name || 'Student Sign');
    setElText('print_sig_teacher_name', ta.teacher_signature || p.class_teacher || 'Class Teacher');
    setElText('print_sig_principal', tfr.principal || 'SHM Academy Office');
    return true;
  }

  // Overall performance graph: one bar per evaluated subject (SVG, print-safe)
  function buildPerfGraphSvg(rows, avg, highlightId) {
    const W = 460, H = 108, padL = 30, padB = 16, padT = 8;
    const n = rows.length || 1;
    const slot = (W - padL - 8) / n;
    const bw = Math.min(34, slot * 0.55);
    const y = (v) => {
      const c = Math.max(0, Math.min(100, v));
      return padT + (100 - c) * ((H - padT - padB) / 100);
    };
    let svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto; display:block;" role="img" aria-label="Overall performance graph">`;
    [0, 25, 50, 75, 100].forEach((g) => {
      svg += `<line x1="${padL}" y1="${y(g)}" x2="${W - 4}" y2="${y(g)}" stroke="#e2e8f0" stroke-width="1"/>`;
    });
    rows.forEach((r, i) => {
      const cx = padL + slot * i + slot / 2;
      const v = r.score !== null ? r.score : 0;
      const h = (H - padT - padB) * (v / 100);
      const isHi = r.cfg.id === highlightId;
      const fill = r.score === null ? '#cbd5e1' : (isHi ? '#1e3a8a' : '#3b82f6');
      svg += `<rect x="${(cx - bw / 2).toFixed(1)}" y="${(y(v)).toFixed(1)}" width="${bw}" height="${Math.max(2, h).toFixed(1)}" rx="2.5" fill="${fill}" stroke="#1e3a8a" stroke-width="0.8"/>`;
      svg += `<text x="${cx.toFixed(1)}" y="${(y(v) - 3).toFixed(1)}" text-anchor="middle" font-size="8" font-weight="800" fill="#0f172a">${r.score !== null ? escapeHtml(r.grade) : '—'}</text>`;
      svg += `<text x="${cx.toFixed(1)}" y="${H - 3}" text-anchor="middle" font-size="7.5" font-weight="700" fill="#334155">${escapeHtml(r.cfg.short)}</text>`;
    });
    if (avg !== null) {
      svg += `<line x1="${padL}" y1="${y(avg)}" x2="${W - 4}" y2="${y(avg)}" stroke="#10b981" stroke-width="1.6" stroke-dasharray="5,3"/>`;
      svg += `<text x="${W - 6}" y="${(y(avg) - 4).toFixed(1)}" text-anchor="end" font-size="8" font-weight="800" fill="#065f46">Overall ${escapeHtml(gradeForScore(avg))}</text>`;
    } else {
      svg += `<text x="${(W / 2 + 20).toFixed(1)}" y="${(H / 2).toFixed(1)}" text-anchor="middle" font-size="9" font-weight="700" fill="#64748b">Awaiting subject evaluation</text>`;
    }
    svg += `</svg>`;
    return svg;
  }

  function renderPrintGraph() { return; }

  // =========================================================
  // 10. COMPLETE MULTI-SUBJECT COMPILED PRINT DOCUMENT (FALLBACK)
  // =========================================================
  function generateFullPrintDocument(s) {
    const p = s.profile || s;
    const skills = s.skills || s.data?.skills || {};
    const ta = s.teacher_assessment || s.data?.teacher_assessment || {};
    const tfr = s.teacher_final_remark || s.data?.teacher_final_remark || {};

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Portfolio: ${escapeHtml(p.student_name || s.student_name)} | SHM Academy</title>
        <link rel="stylesheet" href="static/css/portfolio.css">
        <style>
          body { background: #ffffff !important; padding: 1.5rem; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #000; }
          .doc-table { width: 100%; border-collapse: collapse; margin: 0.65rem 0; font-size: 9.5pt; }
          .doc-table th, .doc-table td { border: 1px solid #333; padding: 4px 6px; }
          .doc-table th { background: #f1f5f9; }
          .doc-header { text-align: center; border-bottom: 2px double #000; padding-bottom: 1rem; margin-bottom: 1.25rem; }
          .doc-section { margin-bottom: 1.25rem; page-break-inside: avoid; }
        </style>
      </head>
      <body>
        <!-- Header -->
        <div class="doc-header">
          <div style="font-size: 1.3rem; font-weight: 900; letter-spacing: 0.05em;">STUDENT PORTFOLIO</div>
          <div style="font-size: 1.7rem; font-weight: 900; color: #1e3a8a; margin: 0.2rem 0;">SHM ACADEMY</div>
          <div style="font-style: italic; color: #475569;">“Infinite Knowledge Through Education”</div>
          <div style="margin-top: 0.35rem; font-weight: 700;">Academic Session: ${escapeHtml(s.header?.academic_session || '2026–2027')}</div>
        </div>

        <!-- 1. Profile -->
        <section class="doc-section">
          <h3 style="background:#f8fafc; padding:4px 8px; border-left:4px solid #1e3a8a; margin-bottom:0.4rem; font-size: 10pt;">1. STUDENT PROFILE</h3>
          <div style="display: grid; grid-template-columns: 1fr 140px; gap: 1rem;">
            <table class="doc-table" style="margin: 0;">
              <tr><td style="width:35%;">Student’s Name</td><td><strong>${escapeHtml(p.student_name || s.student_name)}</strong></td></tr>
              <tr><td>Class &amp; Section</td><td><strong>${escapeHtml(p.class_section || s.class_section)}</strong></td></tr>
              <tr><td>Roll Number</td><td>${escapeHtml(p.roll_no || s.roll_no || '—')}</td></tr>
              <tr><td>Admission Number</td><td>${escapeHtml(p.admission_no || s.admission_no || '—')}</td></tr>
              <tr><td>Date of Birth</td><td>${escapeHtml(p.dob || '—')}</td></tr>
              <tr><td>Father’s Name</td><td>${escapeHtml(p.father_name || '—')}</td></tr>
              <tr><td>Mother’s Name</td><td>${escapeHtml(p.mother_name || '—')}</td></tr>
              <tr><td>Contact Number</td><td>${escapeHtml(p.contact_no || '—')}</td></tr>
              <tr><td>House</td><td>${escapeHtml(p.house || '—')}</td></tr>
              <tr><td>Class Teacher</td><td>${escapeHtml(p.class_teacher || '—')}</td></tr>
            </table>
            <div style="text-align: center; border: 1px solid #333; height: 160px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
              ${p.photo_data ? `<img src="${p.photo_data}" style="width:100%; height:100%; object-fit:cover;">` : `<span style="font-size: 8pt; color: #64748b;">Photograph</span>`}
            </div>
          </div>
        </section>

        <!-- Teacher Assessment -->
        <section class="doc-section">
          <h3 style="background:#f8fafc; padding:4px 8px; border-left:4px solid #1e3a8a; margin-bottom:0.4rem; font-size: 10pt;">11. TEACHER’S ASSESSMENT</h3>
          <p style="font-size: 9pt;"><strong>Teacher’s Remarks:</strong> ${escapeHtml(ta.teacher_remarks || 'A diligent, courteous, and conscientious student.')}</p>
          <div style="display:flex; justify-content:space-between; margin-top:0.85rem; font-size: 9pt;">
            <div>Class Teacher’s Signature: <strong>${escapeHtml(ta.teacher_signature || '___________________')}</strong></div>
            <div>Date: <strong>${escapeHtml(ta.teacher_date || '___________________')}</strong></div>
          </div>
        </section>

        <!-- Declaration & Final Remark -->
        <section class="doc-section">
          <h3 style="background:#f8fafc; padding:4px 8px; border-left:4px solid #1e3a8a; margin-bottom:0.4rem; font-size: 10pt;">15. STUDENT’S DECLARATION &amp; FINAL SIGN-OFF</h3>
          <p style="font-style: italic; font-size: 9pt; margin-bottom: 0.5rem;">“I have completed this portfolio with honesty and have reflected upon my learning, achievements, strengths and areas for improvement.”</p>
          <div style="display:flex; justify-content:space-between; font-size: 9pt;">
            <div>Student: <strong>${escapeHtml(p.student_name || s.student_name)}</strong></div>
            <div>Class Teacher: <strong>${escapeHtml(tfr.class_teacher || '___________________')}</strong></div>
            <div>Principal: <strong>${escapeHtml(tfr.principal || '___________________')}</strong></div>
          </div>
        </section>
      </body>
      </html>
    `;
  }

  // Helpers
  function showSuccessModal(title, msg) {
    let overlay = document.getElementById('successModalOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'successModalOverlay';
      overlay.className = 'modal-overlay';
      overlay.innerHTML = `
        <div class="modal-card">
          <div class="modal-icon">✅</div>
          <h3 class="modal-title" id="modalTitleText">${title}</h3>
          <p class="modal-message" id="modalMsgText">${msg}</p>
          <button type="button" class="btn btn-print" style="margin: 0 auto;" onclick="document.getElementById('successModalOverlay').classList.remove('active')">
            Done
          </button>
        </div>
      `;
      document.body.appendChild(overlay);
    } else {
      document.getElementById('modalTitleText').textContent = title;
      document.getElementById('modalMsgText').textContent = msg;
    }

    setTimeout(() => {
      overlay.classList.add('active');
    }, 50);
  }

  function updateStatusBadge(msg) {
    const el = document.getElementById('bottomStatusText');
    if (el) el.textContent = msg;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }
})();
