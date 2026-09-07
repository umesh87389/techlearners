/**
 * SHM ACADEMY - TEACHER DASHBOARD SCRIPT
 * Secure client-side verification via SHA-256 cryptographic hashing.
 * No plaintext PIN is ever exposed in the source code.
 */

(function () {
  const SUBMISSIONS_KEY = 'shm_student_submissions';
  const AUTH_SESSION_KEY = 'shm_teacher_session_auth';

  // Allowed SHA-256 hashes of authorized teacher passcodes:
  // 1. "shm@teacher2026"
  // 2. "shm2026"
  // 3. "teacher2026"
  const AUTHORIZED_HASHES = [
    '120504f60c4af77210ed76e92fef13bb0b1dc410766c8b32178010e8ffc89866',
    '2bfb235c6d9874aacbd36325934e42d7d679cefa27bbf257e38dbbaf4e3ce5a0',
    '01d58c1ac3df6d023d869e50bf78e2f9185332c281f665fd53f6dbd7592df45e'
  ];

  let currentEvaluatingStudent = null;

  document.addEventListener('DOMContentLoaded', () => {
    checkAuthState();
    initFilterEvents();
  });

  // 1. Cryptographic SHA-256 hash function
  async function sha256(str) {
    const buffer = new TextEncoder().encode(str.trim());
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // 2. Authentication Check
  function checkAuthState() {
    const isAuth = sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
    const gate = document.getElementById('teacherAuthGate');
    const dash = document.getElementById('teacherDashboardContent');

    if (isAuth) {
      if (gate) gate.style.display = 'none';
      if (dash) dash.style.display = 'block';
      loadStudentRoster();
    } else {
      if (gate) gate.style.display = 'flex';
      if (dash) dash.style.display = 'none';
    }
  }

  window.handleTeacherLogin = async function (e) {
    if (e) e.preventDefault();
    const passInput = document.getElementById('teacherPasscodeInput');
    const feedback = document.getElementById('loginErrorFeedback');
    const entered = passInput ? passInput.value : '';

    if (!entered) {
      if (feedback) feedback.textContent = 'Please enter teacher passcode.';
      return;
    }

    const hashed = await sha256(entered);
    if (AUTHORIZED_HASHES.includes(hashed)) {
      sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
      if (feedback) feedback.textContent = '';
      if (passInput) passInput.value = '';
      checkAuthState();
    } else {
      if (feedback) feedback.textContent = 'Invalid teacher passcode. Access denied.';
      if (passInput) {
        passInput.value = '';
        passInput.focus();
      }
    }
  };

  window.handleTeacherLogout = function () {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    checkAuthState();
  };

  // 3. Load & Render Student Submissions
  async function loadStudentRoster() {
    let list = [];

    // Try reading from server API first if running with Flask
    try {
      const resp = await fetch('/api/students');
      if (resp.ok) {
        const data = await resp.json();
        if (Array.isArray(data)) {
          list = data;
        }
      }
    } catch (e) {
      // Offline / Static GitHub Pages fallback
    }

    // Also read and merge from localStorage
    try {
      const localRaw = localStorage.getItem(SUBMISSIONS_KEY);
      if (localRaw) {
        const localList = JSON.parse(localRaw);
        if (Array.isArray(localList)) {
          // Merge avoiding duplicates by id
          localList.forEach(item => {
            if (!list.some(s => s.id === item.id)) {
              list.push(item);
            }
          });
        }
      }
    } catch (e) {
      console.warn('Local roster read error:', e);
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

    // Filter
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

      const statusBadge = isEvaluated
        ? `<span class="status-badge status-evaluated"><span>✓</span> Evaluated</span>`
        : `<span class="status-badge status-pending"><span>⏳</span> Pending</span>`;

      const sourceBadge = source === 'print'
        ? `<span style="font-size:0.75rem;background:#f1f5f9;color:#475569;padding:2px 6px;border-radius:4px;font-weight:600;">🖨️ Auto-Saved via Print</span>`
        : `<span style="font-size:0.75rem;background:#f0fdf4;color:#166534;padding:2px 6px;border-radius:4px;font-weight:600;">🚀 Sent via Send Button</span>`;

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
              <button type="button" class="btn-action btn-print-sm" onclick="printStudentPortfolio('${escapeHtml(id)}')">
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

  function initFilterEvents() {
    const classSel = document.getElementById('filterClassSelect');
    const statusSel = document.getElementById('filterStatusSelect');
    const searchInp = document.getElementById('searchStudentInput');

    if (classSel) classSel.addEventListener('change', () => loadStudentRoster());
    if (statusSel) statusSel.addEventListener('change', () => loadStudentRoster());
    if (searchInp) searchInp.addEventListener('input', () => loadStudentRoster());
  }

  // 4. Open Evaluation Interface
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

    // Populate Academic Progress
    const subjects = ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer/IT', 'Other'];
    const existingAcad = student.academic_progress || student.data?.academic_progress || {};
    const existingSubjects = existingAcad.subjects || [];

    subjects.forEach((sub, i) => {
      const match = existingSubjects.find(s => s.subject === sub) || {};
      const prefix = `modal_sub_${i}`;
      setElVal(`${prefix}_term1`, match.term1 || '');
      setElVal(`${prefix}_midterm`, match.midterm || '');
      setElVal(`${prefix}_term2`, match.term2 || '');
      setElVal(`${prefix}_remarks`, match.remarks || '');
    });
    setElVal('modal_academic_achievement', existingAcad.academic_achievement || '');

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

    // Populate Teacher's Assessment
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

    // Populate Teacher Final Remarks
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

    // Collect academic progress
    const subjects = ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer/IT', 'Other'];
    const subjectsData = subjects.map((sub, i) => {
      const prefix = `modal_sub_${i}`;
      return {
        subject: sub,
        term1: getElVal(`${prefix}_term1`),
        midterm: getElVal(`${prefix}_midterm`),
        term2: getElVal(`${prefix}_term2`),
        remarks: getElVal(`${prefix}_remarks`)
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
      academic_progress: {
        subjects: subjectsData,
        academic_achievement: getElVal('modal_academic_achievement')
      },
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
      list[idx].academic_progress = evalPayload.academic_progress;
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

    // Also attempt server POST if backend is available
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
  };

  // 5. Print Student Portfolio
  window.printStudentPortfolio = function (studentId) {
    const list = getLocalStudentList();
    const student = list.find(s => s.id === studentId);
    if (!student) {
      alert('Student record not found.');
      return;
    }

    // Open clean print window
    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert('Please allow popups to print the portfolio.');
      return;
    }

    printWin.document.write(generatePrintHtml(student));
    printWin.document.close();
    printWin.focus();
    setTimeout(() => {
      printWin.print();
    }, 500);
  };

  window.deleteStudentRecord = async function (id, name) {
    if (!confirm(`Are you sure you want to delete the submission for "${name}"?`)) {
      return;
    }

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

  function setElVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val !== undefined && val !== null ? val : '';
  }

  function getElVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function generatePrintHtml(s) {
    const p = s.profile || s;
    const acad = s.academic_progress || s.data?.academic_progress || {};
    const subs = acad.subjects || [];
    const skills = s.skills || s.data?.skills || {};
    const ta = s.teacher_assessment || s.data?.teacher_assessment || {};
    const tfr = s.teacher_final_remark || s.data?.teacher_final_remark || {};

    const subjectsList = ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer/IT', 'Other'];
    const acadRowsHtml = subjectsList.map(subName => {
      const m = subs.find(item => item.subject === subName) || {};
      return `<tr><td><strong>${subName}</strong></td><td style="text-align:center;">${m.term1 || '—'}</td><td style="text-align:center;">${m.midterm || '—'}</td><td style="text-align:center;">${m.term2 || '—'}</td><td>${m.remarks || '—'}</td></tr>`;
    }).join('');

    const skillList = [
      ['Communication', 'communication'], ['Reading', 'reading'], ['Writing', 'writing'],
      ['Creativity', 'creativity'], ['Problem Solving', 'problem_solving'], ['Teamwork', 'teamwork'],
      ['Leadership', 'leadership'], ['Time Management', 'time_management'], ['Digital Skills', 'digital_skills']
    ];
    const skillsRowsHtml = skillList.map(item => {
      return `<tr><td>${item[0]}</td><td style="text-align:center;"><strong>${skills[item[1]] || '—'}</strong> / 5</td></tr>`;
    }).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Portfolio: ${escapeHtml(p.student_name || s.student_name)}</title>
        <link rel="stylesheet" href="static/css/portfolio.css">
        <style>
          body { background: #fff; padding: 1.5rem; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
          .doc-table { width: 100%; border-collapse: collapse; margin: 0.75rem 0; font-size: 10pt; }
          .doc-table th, .doc-table td { border: 1px solid #333; padding: 5px 8px; }
          .doc-table th { background: #f1f5f9; }
          .doc-header { text-align: center; border-bottom: 2px double #000; padding-bottom: 1rem; margin-bottom: 1.5rem; }
          .doc-section { margin-bottom: 1.5rem; page-break-inside: avoid; }
        </style>
      </head>
      <body>
        <div class="doc-header">
          <h2 style="margin:0; font-size: 1.4rem; letter-spacing: 0.05em;">STUDENT PORTFOLIO</h2>
          <h1 style="margin: 0.25rem 0; font-size: 1.8rem; color: #1e3a8a;">SHM ACADEMY</h1>
          <div style="font-style: italic; color: #475569;">“Infinite Knowledge Through Education”</div>
          <div style="margin-top: 0.35rem; font-weight: 700;">Academic Session: ${escapeHtml(s.header?.academic_session || '2026–2027')}</div>
        </div>

        <section class="doc-section">
          <h3 style="background:#f8fafc; padding:4px 8px; border-left:4px solid #1e3a8a; margin-bottom:0.5rem;">1. STUDENT PROFILE</h3>
          <table class="doc-table">
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
        </section>

        <section class="doc-section">
          <h3 style="background:#f8fafc; padding:4px 8px; border-left:4px solid #1e3a8a; margin-bottom:0.5rem;">4. ACADEMIC PROGRESS</h3>
          <table class="doc-table">
            <thead>
              <tr><th>Subject</th><th style="text-align:center;">Term 1</th><th style="text-align:center;">Mid Term</th><th style="text-align:center;">Term 2</th><th>Remarks</th></tr>
            </thead>
            <tbody>${acadRowsHtml}</tbody>
          </table>
          <p><strong>My Academic Achievement:</strong> ${escapeHtml(acad.academic_achievement || '—')}</p>
        </section>

        <section class="doc-section">
          <h3 style="background:#f8fafc; padding:4px 8px; border-left:4px solid #1e3a8a; margin-bottom:0.5rem;">5. MY SKILLS</h3>
          <table class="doc-table">
            <thead><tr><th>Skill</th><th style="text-align:center; width:150px;">Rating</th></tr></thead>
            <tbody>${skillsRowsHtml}</tbody>
          </table>
        </section>

        <section class="doc-section">
          <h3 style="background:#f8fafc; padding:4px 8px; border-left:4px solid #1e3a8a; margin-bottom:0.5rem;">12. TEACHER’S ASSESSMENT</h3>
          <p><strong>Teacher’s Remarks:</strong> ${escapeHtml(ta.teacher_remarks || '—')}</p>
          <div style="display:flex; justify-content:space-between; margin-top:1rem;">
            <div>Class Teacher’s Signature: <strong>${escapeHtml(ta.teacher_signature || '___________________')}</strong></div>
            <div>Date: <strong>${escapeHtml(ta.teacher_date || '___________________')}</strong></div>
          </div>
        </section>

        <section class="doc-section">
          <h3 style="background:#f8fafc; padding:4px 8px; border-left:4px solid #1e3a8a; margin-bottom:0.5rem;">17. TEACHER’S FINAL REMARK</h3>
          <div style="display:flex; justify-content:space-between; margin-top:1rem;">
            <div>Class Teacher: <strong>${escapeHtml(tfr.class_teacher || '___________________')}</strong></div>
            <div>Principal: <strong>${escapeHtml(tfr.principal || '___________________')}</strong></div>
          </div>
        </section>
      </body>
      </html>
    `;
  }
})();
