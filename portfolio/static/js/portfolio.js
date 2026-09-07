/**
 * SHM ACADEMY - STUDENT PORTFOLIO SCRIPT
 * Handles form persistence, photo upload, validation, automated dashboard sync on send & print.
 * NOTE: Students have zero access to teacher dashboard or pins.
 */

(function () {
  const STORAGE_KEY = 'shm_portfolio_draft';
  const STUDENT_ID_KEY = 'shm_student_id';

  let currentPhotoBase64 = '';

  document.addEventListener('DOMContentLoaded', () => {
    initPhotoUpload();
    initClassSync();
    initDraftPersistence();
    initActionHandlers();
  });

  // 1. Photograph Upload & Preview
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

      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file (JPG, PNG, WebP).');
        return;
      }

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

  // 2. Sync Class & Section selection into "ABOUT ME" sentence
  function initClassSync() {
    const classSelect = document.getElementById('profile_class_section');
    const aboutClassSpan = document.getElementById('about_study_class');
    const studentNameInput = document.getElementById('profile_student_name');
    const aboutNameInput = document.getElementById('about_name');
    const declNameInput = document.getElementById('decl_student_name');

    if (classSelect && aboutClassSpan) {
      classSelect.addEventListener('change', () => {
        aboutClassSpan.textContent = classSelect.value || '__________';
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

  // 3. Collect all data from form inputs
  function getFormData(source = 'send') {
    const studentId = localStorage.getItem(STUDENT_ID_KEY) || '';

    // Collect goals checklist
    const goalsChecked = [];
    document.querySelectorAll('input[name="goal_checkbox"]:checked').forEach((cb) => {
      goalsChecked.push(cb.value);
    });

    // Collect school participation checklist
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
        teacher_remark: '' // Teacher filled
      });
    }

    // Collect Achievements 3 rows
    const achievements = [];
    for (let i = 1; i <= 3; i++) {
      achievements.push({
        achievement: (document.getElementById(`ach_item_${i}`) || {}).value || '',
        event: (document.getElementById(`ach_event_${i}`) || {}).value || '',
        date: (document.getElementById(`ach_date_${i}`) || {}).value || '',
        award: (document.getElementById(`ach_award_${i}`) || {}).value || ''
      });
    }

    // Collect Personal Improvement Plan 3 rows
    const pip = [];
    for (let i = 1; i <= 3; i++) {
      pip.push({
        area: (document.getElementById(`pip_area_${i}`) || {}).value || '',
        action_plan: (document.getElementById(`pip_plan_${i}`) || {}).value || '',
        target_date: (document.getElementById(`pip_target_${i}`) || {}).value || '',
        progress: (document.getElementById(`pip_prog_${i}`) || {}).value || ''
      });
    }

    const payload = {
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
      certificates_evidence: (document.getElementById('certificates_evidence') || {}).value || '',
      projects: {
        proj1_title: (document.getElementById('proj1_title') || {}).value || '',
        proj1_did: (document.getElementById('proj1_did') || {}).value || '',
        proj1_learned: (document.getElementById('proj1_learned') || {}).value || '',
        proj2_title: (document.getElementById('proj2_title') || {}).value || '',
        proj2_learned: (document.getElementById('proj2_learned') || {}).value || '',
        evidence: (document.getElementById('project_evidence') || {}).value || ''
      },
      participation: {
        activities: partChecked,
        other: (document.getElementById('part_other_text') || {}).value || '',
        memorable_activity: (document.getElementById('part_memorable') || {}).value || ''
      },
      reflection: {
        learned: (document.getElementById('ref_learned') || {}).value || '',
        achievement: (document.getElementById('ref_achievement') || {}).value || '',
        challenge: (document.getElementById('ref_challenge') || {}).value || '',
        overcome: (document.getElementById('ref_overcome') || {}).value || '',
        next_year: (document.getElementById('ref_next_year') || {}).value || ''
      },
      best_work: {
        description: (document.getElementById('best_work_content') || {}).value || ''
      },
      parent_feedback: {
        child_strengths: (document.getElementById('parent_strengths') || {}).value || '',
        child_improve: (document.getElementById('parent_improve') || {}).value || '',
        parent_suggestions: (document.getElementById('parent_suggestions') || {}).value || '',
        parent_signature: (document.getElementById('parent_signature') || {}).value || '',
        parent_date: (document.getElementById('parent_date') || {}).value || ''
      },
      personal_improvement_plan: pip,
      year_in_one_page: {
        best_achievement: (document.getElementById('year_achievement') || {}).value || '',
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

    return payload;
  }

  // 4. Draft persistence in LocalStorage
  function saveDraft() {
    try {
      const data = getFormData('draft');
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      updateStatusBadge('Draft saved');
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  function initDraftPersistence() {
    // Auto-load draft if exists
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        populateForm(data);
        updateStatusBadge('Draft restored');
      }
    } catch (e) {
      console.warn('Draft load failed:', e);
    }

    // Attach change listeners to save draft
    const form = document.getElementById('portfolioForm');
    if (form) {
      form.addEventListener('input', debounce(saveDraft, 600));
      form.addEventListener('change', saveDraft);
    }
  }

  function populateForm(d) {
    if (!d) return;

    if (d.header && d.header.academic_session) {
      setVal('academic_session_input', d.header.academic_session);
    }

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
    setVal('certificates_evidence', d.certificates_evidence);

    if (d.projects) {
      setVal('proj1_title', d.projects.proj1_title);
      setVal('proj1_did', d.projects.proj1_did);
      setVal('proj1_learned', d.projects.proj1_learned);
      setVal('proj2_title', d.projects.proj2_title);
      setVal('proj2_learned', d.projects.proj2_learned);
      setVal('project_evidence', d.projects.evidence);
    }

    if (d.participation) {
      if (Array.isArray(d.participation.activities)) {
        document.querySelectorAll('input[name="part_checkbox"]').forEach((cb) => {
          cb.checked = d.participation.activities.includes(cb.value);
        });
      }
      setVal('part_other_text', d.participation.other);
      setVal('part_memorable', d.participation.memorable_activity);
    }

    if (d.reflection) {
      setVal('ref_learned', d.reflection.learned);
      setVal('ref_achievement', d.reflection.achievement);
      setVal('ref_challenge', d.reflection.challenge);
      setVal('ref_overcome', d.reflection.overcome);
      setVal('ref_next_year', d.reflection.next_year);
    }

    if (d.best_work) {
      setVal('best_work_content', d.best_work.description);
    }

    if (d.parent_feedback) {
      setVal('parent_strengths', d.parent_feedback.child_strengths);
      setVal('parent_improve', d.parent_feedback.child_improve);
      setVal('parent_suggestions', d.parent_feedback.parent_suggestions);
      setVal('parent_signature', d.parent_feedback.parent_signature);
      setVal('parent_date', d.parent_feedback.parent_date);
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

    if (d.year_in_one_page) {
      setVal('year_achievement', d.year_in_one_page.best_achievement);
      setVal('year_subject', d.year_in_one_page.favourite_subject);
      setVal('year_activity', d.year_in_one_page.favourite_activity);
      setVal('year_award', d.year_in_one_page.award_received);
      setVal('year_learned', d.year_in_one_page.new_learned);
      setVal('year_proud', d.year_in_one_page.proud_of);
      setVal('year_goal', d.year_in_one_page.goal_next_year);
    }

    if (d.student_declaration) {
      setVal('decl_student_name', d.student_declaration.student_name);
      setVal('decl_signature', d.student_declaration.signature);
      setVal('decl_date', d.student_declaration.date);
    }
  }

  function setVal(id, val) {
    const el = document.getElementById(id);
    if (el && val !== undefined && val !== null) {
      el.value = val;
    }
  }

  // 5. Send & Print Handlers
  function initActionHandlers() {
    const sendBtn = document.getElementById('btnSendPortfolio');
    const printBtn = document.getElementById('btnPrintPortfolio');

    if (sendBtn) {
      sendBtn.addEventListener('click', () => handleStudentSend());
    }

    if (printBtn) {
      printBtn.addEventListener('click', () => handleStudentPrint());
    }
  }

  async function submitToServer(source = 'send') {
    const payload = getFormData(source);

    // Basic validation
    const studentName = (payload.profile.student_name || '').trim();
    const classSection = (payload.profile.class_section || '').trim();

    if (!studentName) {
      alert('Please enter Student’s Name in the Student Profile section.');
      document.getElementById('profile_student_name')?.focus();
      return null;
    }

    if (!classSection) {
      alert('Please select Class & Section from the dropdown menu.');
      document.getElementById('profile_class_section')?.focus();
      return null;
    }

    updateStatusBadge('Saving and sending to Teacher Dashboard...');

    // Save to master roster in localStorage for instantaneous cross-tab/static dashboard visibility
    try {
      const rosterRaw = localStorage.getItem('shm_student_submissions');
      let roster = rosterRaw ? JSON.parse(rosterRaw) : [];
      if (!Array.isArray(roster)) roster = [];
      
      const existingIdx = roster.findIndex(item => item.id === payload.id);
      const studentRecord = {
        id: payload.id || ('stu_' + Date.now()),
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
        certificates_evidence: payload.certificates_evidence,
        projects: payload.projects,
        participation: payload.participation,
        reflection: payload.reflection,
        best_work: payload.best_work,
        parent_feedback: payload.parent_feedback,
        personal_improvement_plan: payload.personal_improvement_plan,
        year_in_one_page: payload.year_in_one_page,
        student_declaration: payload.student_declaration,
        header: payload.header
      };

      // Preserve existing teacher evaluations if present
      if (existingIdx !== -1) {
        if (roster[existingIdx].academic_progress) studentRecord.academic_progress = roster[existingIdx].academic_progress;
        if (roster[existingIdx].skills) studentRecord.skills = roster[existingIdx].skills;
        if (roster[existingIdx].teacher_assessment) studentRecord.teacher_assessment = roster[existingIdx].teacher_assessment;
        if (roster[existingIdx].teacher_final_remark) studentRecord.teacher_final_remark = roster[existingIdx].teacher_final_remark;
        roster[existingIdx] = studentRecord;
      } else {
        roster.unshift(studentRecord);
      }
      localStorage.setItem('shm_student_submissions', JSON.stringify(roster));
    } catch (e) {
      console.warn('LocalStorage master roster sync failed:', e);
    }


    try {
      const resp = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const res = await resp.json();
      if (res.success && res.student_id) {
        localStorage.setItem(STUDENT_ID_KEY, res.student_id);
        updateStatusBadge(`Sent to Teacher Dashboard (${res.timestamp || 'Just now'})`);
        return res;
      } else {
        throw new Error(res.error || 'Submission failed');
      }
    } catch (err) {
      console.warn('Network submission failed, saved locally:', err);
      // Fallback local persistence if offline
      saveDraft();
      updateStatusBadge('Saved locally (Offline)');
      return { success: true, localOnly: true, timestamp: new Date().toLocaleTimeString() };
    }
  }

  async function handleStudentSend() {
    const sendBtn = document.getElementById('btnSendPortfolio');
    if (sendBtn) sendBtn.disabled = true;

    const result = await submitToServer('send');
    if (sendBtn) sendBtn.disabled = false;

    if (result && result.success) {
      showSuccessModal(
        'Portfolio Sent to Teacher!',
        'Your portfolio has been successfully recorded and sent to the Teacher’s Dashboard. Your teacher will now be able to view your details and fill the Academic Progress and Skills Evaluation.'
      );
    }
  }

  async function handleStudentPrint() {
    // "If any student click on send or print portfolio button the record should automatically be saved and send to teachers dashboard."
    updateStatusBadge('Automatically saving to Teacher Dashboard before printing...');
    
    // Automatically submit to teacher dashboard first
    await submitToServer('print');

    // Trigger standard document print
    setTimeout(() => {
      window.print();
    }, 400);
  }

  // Helper UI Modals & Badges
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
    if (el) {
      el.textContent = msg;
    }
  }

  function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }
})();
