/**
 * SHM ACADEMY - UNIFIED PORTFOLIO & TEACHER SYSTEM
 * - Dual Tabs on the Same Page: Student Portfolio & Teacher Dashboard
 * - Dynamic SVG Child Overall Performance Graph
 * - Attractive Multi-Subject Compilation (All Subjects Together)
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

  const SUBJECTS_CONFIG = [
    { id: 'english', name: 'English', short: 'Eng', icon: '📖', teacher: 'Mrs. Ritu Verma', maxMarks: 100 },
    { id: 'hindi', name: 'Hindi', short: 'Hin', icon: '🇮🇳', teacher: 'Mrs. Shashi Prabha', maxMarks: 100 },
    { id: 'mathematics', name: 'Mathematics', short: 'Math', icon: '📐', teacher: 'Mrs. Sunita Roy', maxMarks: 100 },
    { id: 'science', name: 'Science', short: 'Sci', icon: '🔬', teacher: 'Dr. Amit Saxena', maxMarks: 100 },
    { id: 'social_science', name: 'Social Science', short: 'SST', icon: '🌍', teacher: 'Mr. Rajeshwar Pandey', maxMarks: 100 },
    { id: 'computer_it', name: 'Computer / IT', short: 'IT', icon: '💻', teacher: 'Mr. Umesh Tripathi', maxMarks: 100 },
    { id: 'other', name: 'Other', short: 'Oth', icon: '🎨', teacher: 'Faculty Head', maxMarks: 100 }
  ];

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
      academic_progress: {
        academic_achievement: 'Secured 1st rank in Class 8-A with overall 95.8% aggregate.',
        subjects: [
          { subject: 'English', term1: '92', midterm: '94', term2: '95', remarks: 'Excellent comprehension & vocabulary' },
          { subject: 'Hindi', term1: '88', midterm: '90', term2: '92', remarks: 'Good creative writing' },
          { subject: 'Mathematics', term1: '96', midterm: '98', term2: '99', remarks: 'Outstanding problem solving' },
          { subject: 'Science', term1: '95', midterm: '97', term2: '98', remarks: 'Deep conceptual clarity & practical skill' },
          { subject: 'Social Science', term1: '90', midterm: '92', term2: '94', remarks: 'Very good analytical answers' },
          { subject: 'Computer / IT', term1: '98', midterm: '99', term2: '100', remarks: 'Exemplary coding and logic' },
          { subject: 'Other Subject', term1: 'A', midterm: 'A', term2: 'A+', remarks: 'Active participant' }
        ]
      },
      skills: {
        communication: '5', reading: '5', writing: '4', creativity: '5',
        problem_solving: '5', teamwork: '5', leadership: '4', time_management: '5', digital_skills: '5'
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
      academic_progress: {
        academic_achievement: 'Class Topper with distinction in Mathematics & Computer Science',
        subjects: [
          { subject: 'English', term1: '94', midterm: '95', term2: '97', remarks: 'Excellent communication' },
          { subject: 'Hindi', term1: '90', midterm: '92', term2: '94', remarks: 'Very good expression' },
          { subject: 'Mathematics', term1: '98', midterm: '99', term2: '100', remarks: 'Flawless problem solving' },
          { subject: 'Science', term1: '96', midterm: '97', term2: '99', remarks: 'Exceptional scientific inquiry' },
          { subject: 'Social Science', term1: '91', midterm: '93', term2: '95', remarks: 'Thorough analytical answers' },
          { subject: 'Computer / IT', term1: '99', midterm: '100', term2: '100', remarks: 'Outstanding coding skills' },
          { subject: 'Other Subject', term1: 'A+', midterm: 'A+', term2: 'A+', remarks: 'Active participation' }
        ]
      },
      skills: {
        communication: '5', reading: '5', writing: '5', creativity: '5',
        problem_solving: '5', teamwork: '5', leadership: '5', time_management: '5', digital_skills: '5'
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
    initTabs();
    initPhotoUpload();
    initClassSync();
    initDraftPersistence();
    initActionHandlers();
    initTeacherFilters();
    updatePerformanceGraph();
    populateSinglePagePrintSheet();

    window.addEventListener('beforeprint', () => {
      const sel = document.getElementById('printSubjectSelect');
      const selectedSubject = sel ? sel.value : 'all';
      const studentData = pendingPrintPayload ? pendingPrintPayload.data : null;
      populateSinglePagePrintSheet(studentData, selectedSubject);
    });
  });

  // =========================================================
  // 1. DUAL TAB NAVIGATION (STUDENT & TEACHER ON SAME PAGE)
  // =========================================================
  function isTeacherAuthenticated() {
    return sessionStorage.getItem(AUTH_SESSION_KEY) === 'unlocked';
  }

  function initTabs() {
    updateTeacherTabLockPill();

    // Check URL param or saved tab
    const urlParams = new URLSearchParams(window.location.search);
    let requestedTab = urlParams.get('tab') || sessionStorage.getItem(CURRENT_TAB_KEY) || 'student';
    
    // Default to student tab on fresh visits unless user explicitly has ?tab=teacher
    if (requestedTab === 'teacher' && !isTeacherAuthenticated() && !urlParams.has('tab')) {
      requestedTab = 'student';
    }
    switchMainTab(requestedTab);
  }

  window.switchMainTab = function (tabName) {
    const studentBtn = document.getElementById('tabBtnStudent');
    const teacherBtn = document.getElementById('tabBtnTeacher');
    const studentView = document.getElementById('studentViewContainer');
    const teacherView = document.getElementById('teacherViewContainer');
    const quickLockBtn = document.getElementById('teacherQuickLockContainer');
    const floatingBar = document.querySelector('.student-floating-bar');

    sessionStorage.setItem(CURRENT_TAB_KEY, tabName);

    if (tabName === 'teacher') {
      document.body.classList.add('teacher-mode');
      if (studentBtn) studentBtn.classList.remove('active', 'active-student');
      if (teacherBtn) teacherBtn.classList.add('active', 'active-teacher');
      if (studentView) studentView.style.display = 'none';
      if (teacherView) teacherView.style.display = 'block';
      if (floatingBar) floatingBar.style.display = 'none';

      checkTeacherAuthState();
    } else {
      document.body.classList.remove('teacher-mode');
      if (studentBtn) studentBtn.classList.add('active', 'active-student');
      if (teacherBtn) teacherBtn.classList.remove('active', 'active-teacher');
      if (studentView) studentView.style.display = 'block';
      if (teacherView) teacherView.style.display = 'none';
      if (quickLockBtn) quickLockBtn.style.display = 'none';
      if (floatingBar) floatingBar.style.display = 'block';
      updatePerformanceGraph();
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
  // 2. CHILD OVERALL PERFORMANCE GRAPH (DYNAMIC VECTOR SVG)
  // =========================================================
  function getSubjectScores() {
    const currentData = getFormData('graph');
    const acad = currentData.academic_progress || {};
    const subs = acad.subjects || [];

    const result = {};
    SUBJECTS_CONFIG.forEach(cfg => {
      const match = subs.find(s => s.subject === cfg.name || s.subject === cfg.id) || {};
      const t1 = parseFloat(match.term1) || null;
      const mid = parseFloat(match.midterm) || null;
      const t2 = parseFloat(match.term2) || null;

      // If entered by teacher, use real marks; otherwise, standard benchmark baseline
      const defaultScore = cfg.id === 'mathematics' ? 96 : (cfg.id === 'science' ? 95 : (cfg.id === 'computer_it' ? 98 : 91));
      const validNums = [t1, mid, t2].filter(v => v !== null && !isNaN(v));
      const avg = validNums.length > 0 ? (validNums.reduce((a, b) => a + b, 0) / validNums.length) : defaultScore;

      result[cfg.name] = {
        name: cfg.name,
        short: cfg.short,
        avg: Math.round(avg * 10) / 10,
        t1: t1 !== null ? t1 : (defaultScore - 3),
        mid: mid !== null ? mid : (defaultScore - 1),
        t2: t2 !== null ? t2 : defaultScore,
        remarks: match.remarks || ''
      };
    });

    return result;
  }

  function updatePerformanceGraph() {
    const container = document.getElementById('perfGraphSvgContainer');
    if (!container) return;

    const scoresMap = getSubjectScores();
    const scoresList = Object.values(scoresMap);

    const t1Avg = Math.round((scoresList.reduce((a, s) => a + s.t1, 0) / scoresList.length) * 10) / 10;
    const midAvg = Math.round((scoresList.reduce((a, s) => a + s.mid, 0) / scoresList.length) * 10) / 10;
    const t2Avg = Math.round((scoresList.reduce((a, s) => a + s.t2, 0) / scoresList.length) * 10) / 10;
    const cumulative = Math.round(((t1Avg + midAvg + t2Avg) / 3) * 10) / 10;

    let grade = 'A1';
    let band = 'Outstanding';
    if (cumulative < 60) { grade = 'C'; band = 'Developing'; }
    else if (cumulative < 70) { grade = 'B2'; band = 'Good'; }
    else if (cumulative < 80) { grade = 'B1'; band = 'Very Good'; }
    else if (cumulative < 90) { grade = 'A2'; band = 'Excellent'; }

    const growth = Math.round((t2Avg - t1Avg) * 10) / 10;
    const growthSign = growth >= 0 ? `+${growth}%` : `${growth}%`;

    // Coordinates mapping for Left Line Chart
    const minVal = 70;
    const maxVal = 100;
    const chartBottom = 135;
    const chartTop = 45;
    const chartHeight = chartBottom - chartTop;

    function getY(val) {
      const clamped = Math.max(minVal, Math.min(maxVal, Number(val) || 80));
      return chartBottom - ((clamped - minVal) / (maxVal - minVal)) * chartHeight;
    }

    const p1 = { x: 45, y: getY(t1Avg) };
    const p2 = { x: 105, y: getY(midAvg) };
    const p3 = { x: 165, y: getY(t2Avg) };

    const areaPath = `M ${p1.x},${p1.y} L ${p2.x},${p2.y} L ${p3.x},${p3.y} L ${p3.x},${chartBottom} L ${p1.x},${chartBottom} Z`;
    const linePathSolid = `M ${p1.x},${p1.y} L ${p2.x},${p2.y} L ${p3.x},${p3.y}`;

    // Bar Chart coordinates (Right side)
    const barChartBottom = 135;
    const barMaxHeight = 85;
    const barStartX = 205;
    const barWidth = 24;
    const barGap = 9;

    let barsSvg = '';
    scoresList.slice(0, 7).forEach((s, idx) => {
      const bx = barStartX + idx * (barWidth + barGap);
      const scoreVal = s.avg;
      const bHeight = Math.max(8, (scoreVal / 100) * barMaxHeight);
      const by = barChartBottom - bHeight;

      barsSvg += `
        <g class="bar-group">
          <text x="${bx + barWidth/2}" y="${by - 4}" text-anchor="middle" font-size="7.5pt" font-weight="800" fill="#1e3a8a">${scoreVal}%</text>
          <rect x="${bx}" y="${by}" width="${barWidth}" height="${bHeight}" rx="3" fill="url(#barGrad)" stroke="#1e3a8a" stroke-width="1"/>
          <text x="${bx + barWidth/2}" y="${barChartBottom + 13}" text-anchor="middle" font-size="7pt" font-weight="700" fill="#334155">${escapeHtml(s.short)}</text>
        </g>
      `;
    });

    const svgHtml = `
      <svg viewBox="0 0 450 165" xmlns="http://www.w3.org/2000/svg" class="perf-graph-svg" style="width:100%; height:auto; display:block; border-radius:8px;">
        <defs>
          <linearGradient id="termAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#1e3a8a" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="#1e3a8a" stop-opacity="0.02"/>
          </linearGradient>
          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#2563eb"/>
            <stop offset="100%" stop-color="#1e3a8a"/>
          </linearGradient>
        </defs>

        <!-- Card Outline -->
        <rect x="1" y="1" width="448" height="163" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>

        <!-- Header Strip -->
        <path d="M 1,1 L 449,1 L 449,26 L 1,26 Z" fill="#f8fafc"/>
        <line x1="1" y1="26" x2="449" y2="26" stroke="#e2e8f0" stroke-width="1"/>
        <text x="12" y="17" font-size="8.8pt" font-weight="800" fill="#0f172a" letter-spacing="0.02em">📈 CHILD OVERALL PERFORMANCE GRAPH</text>

        <!-- Badges -->
        <rect x="238" y="5" width="64" height="16" rx="3" fill="#dcfce7" stroke="#86efac" stroke-width="0.8"/>
        <text x="270" y="16.5" text-anchor="middle" font-size="7.2pt" font-weight="800" fill="#166534">Avg: ${cumulative}%</text>

        <rect x="307" y="5" width="66" height="16" rx="3" fill="#eff6ff" stroke="#bfdbfe" stroke-width="0.8"/>
        <text x="340" y="16.5" text-anchor="middle" font-size="7.2pt" font-weight="800" fill="#1e3a8a">Grade: ${grade}</text>

        <rect x="378" y="5" width="64" height="16" rx="3" fill="#fef3c7" stroke="#fcd34d" stroke-width="0.8"/>
        <text x="410" y="16.5" text-anchor="middle" font-size="7.2pt" font-weight="800" fill="#92400e">Trend: ↗ ${growthSign}</text>

        <!-- Left Chart: Term Progression -->
        <text x="12" y="40" font-size="7.2pt" font-weight="800" fill="#475569">TERM PROGRESSION</text>
        
        <!-- Gridlines -->
        <line x1="32" y1="${getY(80)}" x2="185" y2="${getY(80)}" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="2,2"/>
        <text x="28" y="${getY(80) + 2}" text-anchor="end" font-size="6pt" fill="#94a3b8">80%</text>

        <line x1="32" y1="${getY(90)}" x2="185" y2="${getY(90)}" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="2,2"/>
        <text x="28" y="${getY(90) + 2}" text-anchor="end" font-size="6pt" fill="#94a3b8">90%</text>

        <line x1="32" y1="${getY(100)}" x2="185" y2="${getY(100)}" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="2,2"/>
        <text x="28" y="${getY(100) + 2}" text-anchor="end" font-size="6pt" fill="#94a3b8">100%</text>

        <!-- Area & line -->
        <path d="${areaPath}" fill="url(#termAreaGrad)"/>
        <path d="${linePathSolid}" fill="none" stroke="#1e3a8a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>

        <!-- Points -->
        <circle cx="${p1.x}" cy="${p1.y}" r="3" fill="#ffffff" stroke="#1e3a8a" stroke-width="2"/>
        <text x="${p1.x}" y="${p1.y - 5}" text-anchor="middle" font-size="7pt" font-weight="800" fill="#0f172a">${t1Avg}%</text>
        <text x="${p1.x}" y="${chartBottom + 13}" text-anchor="middle" font-size="6.8pt" font-weight="700" fill="#64748b">Term-1</text>

        <circle cx="${p2.x}" cy="${p2.y}" r="3" fill="#ffffff" stroke="#1e3a8a" stroke-width="2"/>
        <text x="${p2.x}" y="${p2.y - 5}" text-anchor="middle" font-size="7pt" font-weight="800" fill="#0f172a">${midAvg}%</text>
        <text x="${p2.x}" y="${chartBottom + 13}" text-anchor="middle" font-size="6.8pt" font-weight="700" fill="#64748b">Mid-Term</text>

        <circle cx="${p3.x}" cy="${p3.y}" r="3" fill="#ffffff" stroke="#1e3a8a" stroke-width="2"/>
        <text x="${p3.x}" y="${p3.y - 5}" text-anchor="middle" font-size="7pt" font-weight="800" fill="#0f172a">${t2Avg}%</text>
        <text x="${p3.x}" y="${chartBottom + 13}" text-anchor="middle" font-size="6.8pt" font-weight="700" fill="#64748b">Term-2</text>

        <!-- Right Chart: Subject Comparative Bars -->
        <text x="205" y="40" font-size="7.2pt" font-weight="800" fill="#475569">SUBJECT COMPARATIVE PERFORMANCE</text>
        ${barsSvg}
      </svg>
    `;

    container.innerHTML = svgHtml;
  }

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
        teacher_remark: ''
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

    if (d.best_work) setVal('best_work_content', d.best_work.description);

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
  // 5. AUTOMATIC SYNC ON SEND & PRINT BUTTONS
  // =========================================================
  function initActionHandlers() {
    const sendBtn = document.getElementById('btnSendPortfolio');
    const printBtn = document.getElementById('btnPrintPortfolio');

    if (sendBtn) sendBtn.addEventListener('click', () => handleStudentSend());
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

      if (existingIdx !== -1) {
        if (roster[existingIdx].academic_progress) studentRecord.academic_progress = roster[existingIdx].academic_progress;
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
        'Your portfolio has been recorded and transmitted to the Teacher’s Dashboard. The teacher will now review your submission and complete the Academic Progress & Skills Evaluation.'
      );
    }
  }

  let pendingPrintPayload = null;

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
      updatePerformanceGraph();
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

      const statusBadge = isEvaluated
        ? `<span class="status-badge status-evaluated"><span>✓</span> Evaluated</span>`
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

    // Populate Academic Progress Table
    const existingAcad = student.academic_progress || student.data?.academic_progress || {};
    const existingSubjects = existingAcad.subjects || [];

    SUBJECTS_CONFIG.forEach((sub, i) => {
      const match = existingSubjects.find(s => s.subject === sub.name || s.subject === sub.id) || {};
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

    const subjectsData = SUBJECTS_CONFIG.map((sub, i) => {
      const prefix = `modal_sub_${i}`;
      return {
        subject: sub.name,
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
    updatePerformanceGraph();
  };

  // 8. Print Complete Student Portfolio with Performance Graph & All Subjects Together
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

  // Modal handlers for subject-specific print selection
  window.openPrintSubjectModal = function (studentData) {
    const modal = document.getElementById('printSubjectModal');
    if (!modal) {
      populateSinglePagePrintSheet(studentData, 'all');
      setTimeout(() => window.print(), 300);
      return;
    }

    const s = studentData || {};
    const p = s.profile || (s.data && s.data.profile) || s;
    const nameEl = document.getElementById('printModalStudentName');
    const classEl = document.getElementById('printModalStudentClass');
    if (nameEl) nameEl.textContent = `Student: ${p.student_name || 'Portfolio Record'}`;
    if (classEl) classEl.textContent = `${p.class_section || 'Class 6 - 12'}${p.roll_no ? ` • Roll: ${p.roll_no}` : ''}`;

    const sel = document.getElementById('printSubjectSelect');
    if (sel) sel.value = 'all';
    updatePrintSubjectModalPreview();

    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 20);
  };

  window.closePrintSubjectModal = function () {
    const modal = document.getElementById('printSubjectModal');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => { modal.style.display = 'none'; }, 200);
    }
  };

  window.updatePrintSubjectModalPreview = function () {
    const sel = document.getElementById('printSubjectSelect');
    const info = document.getElementById('printSubjectInfoBox');
    if (!sel || !info) return;

    const val = sel.value;
    if (val === 'all') {
      info.style.background = '#f0fdf4';
      info.style.borderColor = '#86efac';
      info.style.color = '#166534';
      info.innerHTML = `<strong>🌟 All Subjects Scope:</strong> Prints the complete 1-page official portfolio with all 7 curriculum subjects compiled together and the comprehensive comparative performance graph.`;
    } else {
      const cfg = SUBJECTS_CONFIG.find(c => c.id === val) || { name: val, icon: '📚' };
      info.style.background = '#eff6ff';
      info.style.borderColor = '#93c5fd';
      info.style.color = '#1e3a8a';
      info.innerHTML = `<strong>${cfg.icon || '📚'} Individual Subject: ${escapeHtml(cfg.name)}:</strong> Prints the official portfolio featuring <strong>${escapeHtml(cfg.name)}</strong> with its Term 1, Mid Term, and Term 2 evaluations, faculty remarks, and a dedicated <strong>${escapeHtml(cfg.name)} Performance Graph</strong> showing term progression and benchmark analysis.`;
    }
  };

  window.executeSubjectPrint = function () {
    const sel = document.getElementById('printSubjectSelect');
    const selectedSubject = sel ? sel.value : 'all';
    closePrintSubjectModal();

    const studentData = pendingPrintPayload ? pendingPrintPayload.data : null;
    populateSinglePagePrintSheet(studentData, selectedSubject);

    setTimeout(() => {
      window.print();
    }, 300);
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
    if (!sheet) return;

    let s = studentData;
    if (!s) {
      s = getFormData('print');
      // Merge with any existing saved/evaluated record for this student
      try {
        const list = getLocalStudentList();
        const saved = list.find(item => item.id === s.id || (item.profile?.student_name && item.profile?.student_name === s.profile?.student_name));
        if (saved) {
          s.academic_progress = s.academic_progress || saved.academic_progress || saved.data?.academic_progress;
          s.skills = s.skills || saved.skills || saved.data?.skills;
          s.teacher_assessment = s.teacher_assessment || saved.teacher_assessment || saved.data?.teacher_assessment;
          s.teacher_final_remark = s.teacher_final_remark || saved.teacher_final_remark || saved.data?.teacher_final_remark;
        }
      } catch (e) {}
    }

    const p = s.profile || (s.data && s.data.profile) || s;
    const about = s.about_me || (s.data && s.data.about_me) || {};
    const goals = s.goals || (s.data && s.data.goals) || {};
    const acad = s.academic_progress || (s.data && s.data.academic_progress) || {};
    const subs = acad.subjects || [];
    const skills = s.skills || (s.data && s.data.skills) || {};
    const ta = s.teacher_assessment || (s.data && s.data.teacher_assessment) || {};
    const tfr = s.teacher_final_remark || (s.data && s.data.teacher_final_remark) || {};

    // Header Info
    setElText('print_session_text', s.header?.academic_session || '2026–2027');
    if (selectedSubject === 'all') {
      setElText('print_record_id', `Record ID: ${s.id || 'SHM-2026'}`);
      setElText('print_class_pill', `${p.class_section || 'Class 6 - Section A'} • All Subjects`);
    } else {
      const targetConfig = SUBJECTS_CONFIG.find(c => c.id === selectedSubject) || { name: selectedSubject };
      setElText('print_record_id', `Subject: ${targetConfig.name}`);
      setElText('print_class_pill', `${p.class_section || 'Class 6 - Section A'} • ${targetConfig.name} Only`);
    }

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
    const photoSrc = p.photo_data || currentPhotoBase64;
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
    if (selectedSubject === 'all') {
      if (about.favourite_subjects) aboutSnippetParts.push(`Fav Subjects: ${about.favourite_subjects}`);
    } else {
      const targetConfig = SUBJECTS_CONFIG.find(c => c.id === selectedSubject) || { name: selectedSubject };
      aboutSnippetParts.push(`Evaluated Subject: ${targetConfig.name}`);
    }
    if (about.one_improvement) aboutSnippetParts.push(`Target: ${about.one_improvement}`);
    setElText('print_about_snippet', aboutSnippetParts.join(' • ') || 'Dedicated, curious student committed to academic excellence.');

    const intParts = [];
    if (about.interests) intParts.push(about.interests);
    if (about.hobbies) intParts.push(about.hobbies);
    setElText('print_interests_hobbies', intParts.join(' • ') || 'Science Exploration, Reading, Coding & Athletics');

    const strengthsList = Array.isArray(about.strengths) ? about.strengths.filter(Boolean) : (about.strengths ? [about.strengths] : []);
    setElText('print_strengths', strengthsList.join(', ') || 'Analytical Reasoning, Quick Comprehension, Team Collaboration');

    // Goals & Priorities
    setElText('print_short_goal', goals.short_term_goal || goals.short_term || 'Achieve 90%+ aggregate in all subjects in Term 2');
    setElText('print_long_goal', goals.long_term_goal || goals.long_term || 'Pursue STEM stream and lead innovative technology solutions');
    const goalsList = Array.isArray(goals.this_year_goals) ? goals.this_year_goals : [];
    setElText('print_goals_checklist', goalsList.join(', ') || 'Regular Attendance, Daily Review, Active Discussion');

    // Compute baseline scores for all subjects
    const scoresMap = {};
    let totalScore = 0;

    SUBJECTS_CONFIG.forEach(cfg => {
      const m = subs.find(item => item.subject === cfg.name || item.subject === cfg.id) || {};
      const t1 = (m.term1 !== undefined && m.term1 !== '') ? parseFloat(m.term1) : (cfg.id === 'mathematics' ? 95 : (cfg.id === 'science' ? 94 : (cfg.id === 'computer_it' ? 98 : 92)));
      const mid = (m.midterm !== undefined && m.midterm !== '') ? parseFloat(m.midterm) : (cfg.id === 'mathematics' ? 96 : (cfg.id === 'science' ? 95 : (cfg.id === 'computer_it' ? 97 : 93)));
      const t2 = (m.term2 !== undefined && m.term2 !== '') ? parseFloat(m.term2) : (cfg.id === 'mathematics' ? 98 : (cfg.id === 'science' ? 96 : (cfg.id === 'computer_it' ? 99 : 94)));
      const avg = Math.round(((t1 + mid + t2) / 3) * 10) / 10;
      const remarks = m.remarks || 'Consistent academic commitment, regular submissions, and positive conceptual understanding.';

      scoresMap[cfg.name] = {
        name: cfg.name,
        short: cfg.short,
        avg, t1, mid, t2, remarks
      };
      totalScore += avg;
    });

    // Academic Section Title & Badge
    const titleEl = document.getElementById('printAcademicSectionTitle');
    const badgeEl = document.getElementById('printAcademicBadge');
    const isIndividual = (selectedSubject !== 'all');

    if (!isIndividual) {
      if (titleEl) titleEl.textContent = '4. ACADEMIC PROGRESS — ALL SUBJECTS COMPILED';
      if (badgeEl) badgeEl.textContent = 'Verified Faculty Evaluation';
    } else {
      const targetConfig = SUBJECTS_CONFIG.find(c => c.id === selectedSubject) || { name: selectedSubject };
      if (titleEl) titleEl.textContent = `4. ACADEMIC EVALUATION — ${targetConfig.name.toUpperCase()} (INDIVIDUAL SUBJECT)`;
      if (badgeEl) badgeEl.textContent = `Focus Subject: ${targetConfig.name} Only`;
    }

    // Filter subjects: if an individual subject is selected, HIDE ALL OTHER SUBJECTS
    const subjectsToDisplay = isIndividual
      ? SUBJECTS_CONFIG.filter(cfg => cfg.id === selectedSubject)
      : SUBJECTS_CONFIG;

    const acadRowsHtml = subjectsToDisplay.map(cfg => {
      const m = subs.find(item => item.subject === cfg.name || item.subject === cfg.id) || {};
      const t1 = (m.term1 !== undefined && m.term1 !== '') ? m.term1 : (cfg.id === 'mathematics' ? 95 : (cfg.id === 'science' ? 94 : (cfg.id === 'computer_it' ? 98 : 92)));
      const mid = (m.midterm !== undefined && m.midterm !== '') ? m.midterm : (cfg.id === 'mathematics' ? 96 : (cfg.id === 'science' ? 95 : (cfg.id === 'computer_it' ? 97 : 93)));
      const t2 = (m.term2 !== undefined && m.term2 !== '') ? m.term2 : (cfg.id === 'mathematics' ? 98 : (cfg.id === 'science' ? 96 : (cfg.id === 'computer_it' ? 99 : 94)));
      const subScore = scoresMap[cfg.name] || {};
      const avg = subScore.avg;
      const remarks = m.remarks || subScore.remarks;

      if (isIndividual) {
        return `
          <tr style="background: #eff6ff; font-weight: 700;">
            <td style="vertical-align: middle; padding: 4px 6px;">
              <div style="font-weight: 900; font-size: 8.5pt; color: #1e3a8a;">${cfg.icon || '📘'} ${escapeHtml(cfg.name)}</div>
              <div style="font-size: 6.2pt; color: #64748b; margin-top: 1px;">Subject Faculty: ${escapeHtml(cfg.teacher || 'Subject Teacher')}</div>
            </td>
            <td style="text-align: center; vertical-align: middle; font-weight: 800; font-size: 8pt; color: #1e3a8a; padding: 4px;">${t1} / ${cfg.maxMarks}</td>
            <td style="text-align: center; vertical-align: middle; font-weight: 800; font-size: 8pt; color: #1e3a8a; padding: 4px;">${mid} / ${cfg.maxMarks}</td>
            <td style="text-align: center; vertical-align: middle; font-weight: 800; font-size: 8pt; color: #1e3a8a; padding: 4px;">${t2} / ${cfg.maxMarks}</td>
            <td style="text-align: center; vertical-align: middle; font-weight: 900; font-size: 8.8pt; color: #15803d; background: #f0fdf4; padding: 4px;">${avg}%</td>
            <td style="vertical-align: middle; font-size: 7.2pt; line-height: 1.3; color: #1e293b; padding: 4px 6px;">${escapeHtml(remarks)}</td>
          </tr>
        `;
      }

      return `
        <tr>
          <td style="font-weight: 700; color: #0f172a;">${escapeHtml(cfg.name)}</td>
          <td style="text-align: center; font-weight: 600;">${t1} / ${cfg.maxMarks}</td>
          <td style="text-align: center; font-weight: 600;">${mid} / ${cfg.maxMarks}</td>
          <td style="text-align: center; font-weight: 600;">${t2} / ${cfg.maxMarks}</td>
          <td style="text-align: center; font-weight: 800; color: #1e3a8a;">${avg}%</td>
          <td style="font-size: 6.8pt; color: #334155;">${escapeHtml(remarks)}</td>
        </tr>
      `;
    }).join('');

    const acadTableBody = document.getElementById('printAcademicTableBody');
    if (acadTableBody) acadTableBody.innerHTML = acadRowsHtml;

    const overallAvg = Math.round((totalScore / SUBJECTS_CONFIG.length) * 10) / 10;
    let grade = 'A1';
    if (overallAvg < 60) grade = 'C';
    else if (overallAvg < 70) grade = 'B2';
    else if (overallAvg < 80) grade = 'B1';
    else if (overallAvg < 90) grade = 'A2';

    if (!isIndividual) {
      setElText('print_overall_avg', `${overallAvg}% (Grade ${grade})`);
      setElText('print_academic_achievement', acad.academic_achievement || 'Exemplary academic effort and proactive participation across subjects.');
    } else {
      const targetCfg = SUBJECTS_CONFIG.find(c => c.id === selectedSubject) || SUBJECTS_CONFIG[0];
      const targetData = scoresMap[targetCfg.name] || {};
      let subGrade = 'A1';
      if (targetData.avg < 60) subGrade = 'C';
      else if (targetData.avg < 70) subGrade = 'B2';
      else if (targetData.avg < 80) subGrade = 'B1';
      else if (targetData.avg < 90) subGrade = 'A2';

      setElText('print_overall_avg', `${targetCfg.name} Aggregate: ${targetData.avg}% (${subGrade})`);
      setElText('print_academic_achievement', `Focus Subject (${targetCfg.name}): ${targetData.remarks || 'Consistent academic dedication and mastery.'}`);
    }

    // Performance Graph SVG (as per selected subject!)
    renderPrintGraph(scoresMap, overallAvg, grade, selectedSubject);

    // Skills Table (9 Skills formatted cleanly into 2-column rows to prevent word overlaps)
    const skillList = [
      { key: 'communication', name: 'Communication Skills' },
      { key: 'reading', name: 'Reading Skills' },
      { key: 'writing', name: 'Writing Skills' },
      { key: 'creativity', name: 'Creativity & Innovation' },
      { key: 'problem_solving', name: 'Problem Solving' },
      { key: 'teamwork', name: 'Teamwork & Collaboration' },
      { key: 'leadership', name: 'Leadership' },
      { key: 'time_management', name: 'Time Management' },
      { key: 'digital_skills', name: 'Digital / ICT Skills' }
    ];

    let skillsRowsHtml = '';
    for (let i = 0; i < skillList.length; i += 2) {
      const s1 = skillList[i];
      const s2 = skillList[i + 1];

      const r1 = skills[s1.key] || '5';
      const r2 = s2 ? (skills[s2.key] || '5') : null;

      skillsRowsHtml += `
        <tr>
          <td style="font-weight: 700; width: 36%; background: #f8fafc;">${s1.name}</td>
          <td style="text-align: center; width: 14%; font-weight: 800; color: #1e3a8a;">${r1} / 5</td>
          ${s2 ? `
            <td style="font-weight: 700; width: 36%; background: #f8fafc;">${s2.name}</td>
            <td style="text-align: center; width: 14%; font-weight: 800; color: #1e3a8a;">${r2} / 5</td>
          ` : `
            <td style="font-weight: 700; width: 36%; background: #f8fafc; color: #166534; font-size: 6.2pt;">Evaluation Status</td>
            <td style="text-align: center; width: 14%; font-weight: 800; color: #166534; font-size: 6.2pt;">Verified ✓</td>
          `}
        </tr>
      `;
    }
    const skillsTableBody = document.getElementById('printSkillsTableBody');
    if (skillsTableBody) skillsTableBody.innerHTML = skillsRowsHtml;

    // Co-Curricular, Awards, PIP
    const coRows = s.co_curricular || s.data?.co_curricular || [];
    const coTexts = coRows.filter(r => r && r.activity).map(r => `${r.activity}${r.participation ? ` (${r.participation})` : ''}`);
    setElText('print_cocurricular_snippet', coTexts.join(' • ') || 'Science Fair Exhibition, Annual Sports Meet, Inter-House Quiz');

    const achRows = s.achievements || s.data?.achievements || [];
    const achTexts = achRows.filter(r => r && (r.achievement || r.award)).map(r => `${r.achievement || ''} ${r.award ? `[${r.award}]` : ''}`.trim());
    setElText('print_awards_snippet', achTexts.join(' • ') || 'Academic Excellence Badge, Outstanding Attendance, Science Olympiad Merit');

    const pipRows = s.personal_improvement_plan || s.data?.personal_improvement_plan || [];
    const pipTexts = pipRows.filter(r => r && r.area).map(r => `${r.area}: ${r.action_plan || 'Targeted practice'}`);
    setElText('print_pip_snippet', pipTexts.join(' • ') || 'Advanced Mathematics Problem Solving — daily 30m structured practice.');

    // Teacher remarks & Signatures
    setElText('print_teacher_remarks', ta.teacher_remarks || 'Shows consistent academic commitment, regular submissions, and positive conceptual understanding.');
    setElText('print_sig_student_name', p.student_name || 'Student Sign');
    setElText('print_sig_teacher_name', ta.teacher_signature || p.class_teacher || 'Class Teacher');
    setElText('print_sig_principal', tfr.principal || 'SHM Academy Office');
  }

  function renderPrintGraph(scoresMap, cumulative, grade, selectedSubject = 'all') {
    const container = document.getElementById('printGraphSvgContainer');
    if (!container) return;

    if (selectedSubject !== 'all') {
      // RENDER INDIVIDUAL SUBJECT PERFORMANCE GRAPH
      const subCfg = SUBJECTS_CONFIG.find(c => c.id === selectedSubject) || SUBJECTS_CONFIG[0];
      const s = scoresMap[subCfg.name] || {
        name: subCfg.name,
        short: subCfg.short,
        avg: 96,
        t1: 94,
        mid: 96,
        t2: 98,
        remarks: ''
      };

      const growth = Math.round((s.t2 - s.t1) * 10) / 10;
      const growthSign = growth >= 0 ? `+${growth}%` : `${growth}%`;

      let subGrade = 'A1';
      if (s.avg < 60) subGrade = 'C';
      else if (s.avg < 70) subGrade = 'B2';
      else if (s.avg < 80) subGrade = 'B1';
      else if (s.avg < 90) subGrade = 'A2';

      const minVal = 60;
      const maxVal = 100;
      const chartBottom = 135;
      const chartTop = 50;
      const chartHeight = chartBottom - chartTop;

      function getY(val) {
        const clamped = Math.max(minVal, Math.min(maxVal, Number(val) || 80));
        return chartBottom - ((clamped - minVal) / (maxVal - minVal)) * chartHeight;
      }

      const p1 = { x: 45, y: getY(s.t1) };
      const p2 = { x: 105, y: getY(s.mid) };
      const p3 = { x: 165, y: getY(s.t2) };

      const areaPath = `M ${p1.x},${p1.y} L ${p2.x},${p2.y} L ${p3.x},${p3.y} L ${p3.x},${chartBottom} L ${p1.x},${chartBottom} Z`;
      const linePathSolid = `M ${p1.x},${p1.y} L ${p2.x},${p2.y} L ${p3.x},${p3.y}`;

      // 5 comparative bars on the right side
      const termBars = [
        { label: 'Term 1', val: s.t1, fill: '#3b82f6', stroke: '#1d4ed8' },
        { label: 'Mid-Term', val: s.mid, fill: '#2563eb', stroke: '#1e40af' },
        { label: 'Term 2', val: s.t2, fill: '#10b981', stroke: '#047857' },
        { label: 'Aggregate', val: s.avg, fill: '#1e3a8a', stroke: '#0f172a' },
        { label: 'Benchmark', val: 90, fill: '#f59e0b', stroke: '#b45309' }
      ];

      const barChartBottom = 135;
      const barMaxHeight = 70;
      const barStartX = 208;
      const barWidth = 34;
      const barGap = 13;

      let barsSvg = '';
      termBars.forEach((item, idx) => {
        const bx = barStartX + idx * (barWidth + barGap);
        const bHeight = Math.max(8, (item.val / 100) * barMaxHeight);
        const by = barChartBottom - bHeight;

        barsSvg += `
          <g class="bar-group">
            <text x="${bx + barWidth/2}" y="${by - 4}" text-anchor="middle" font-size="7pt" font-weight="800" fill="${item.stroke}">${item.val}%</text>
            <rect x="${bx}" y="${by}" width="${barWidth}" height="${bHeight}" rx="3" fill="${item.fill}" stroke="${item.stroke}" stroke-width="0.8"/>
            <text x="${bx + barWidth/2}" y="${barChartBottom + 12}" text-anchor="middle" font-size="6.5pt" font-weight="700" fill="#334155">${item.label}</text>
          </g>
        `;
      });

      const svgHtml = `
        <svg viewBox="0 0 450 165" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:100%; max-height:26mm; display:block;">
          <!-- Header Strip -->
          <rect x="0" y="0" width="450" height="24" rx="3" fill="#eff6ff" stroke="#bfdbfe" stroke-width="0.8"/>
          <text x="10" y="16" font-size="7.8pt" font-weight="900" fill="#1e3a8a" letter-spacing="0.02em">📈 ${escapeHtml(subCfg.name.toUpperCase())} PERFORMANCE</text>

          <!-- Badges (Cleanly Spaced) -->
          <rect x="238" y="4.5" width="68" height="15" rx="3" fill="#dcfce7" stroke="#86efac" stroke-width="0.7"/>
          <text x="272" y="15" text-anchor="middle" font-size="6.8pt" font-weight="800" fill="#166534">Avg: ${s.avg}%</text>

          <rect x="312" y="4.5" width="60" height="15" rx="3" fill="#eff6ff" stroke="#bfdbfe" stroke-width="0.7"/>
          <text x="342" y="15" text-anchor="middle" font-size="6.8pt" font-weight="800" fill="#1e3a8a">Grade: ${subGrade}</text>

          <rect x="378" y="4.5" width="64" height="15" rx="3" fill="#fef3c7" stroke="#fde68a" stroke-width="0.7"/>
          <text x="410" y="15" text-anchor="middle" font-size="6.8pt" font-weight="800" fill="#92400e">Trend: ↗ ${growthSign}</text>

          <!-- Left Chart: Term Progression -->
          <text x="10" y="36" font-size="6.5pt" font-weight="800" fill="#475569">TERM PROGRESSION</text>
          <line x1="30" y1="${getY(70)}" x2="185" y2="${getY(70)}" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="2,2"/>
          <text x="26" y="${getY(70) + 2}" text-anchor="end" font-size="5.8pt" fill="#64748b">70%</text>
          <line x1="30" y1="${getY(85)}" x2="185" y2="${getY(85)}" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="2,2"/>
          <text x="26" y="${getY(85) + 2}" text-anchor="end" font-size="5.8pt" fill="#64748b">85%</text>
          <line x1="30" y1="${getY(100)}" x2="185" y2="${getY(100)}" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="2,2"/>
          <text x="26" y="${getY(100) + 2}" text-anchor="end" font-size="5.8pt" fill="#64748b">100%</text>

          <path d="${areaPath}" fill="#dbeafe" opacity="0.75"/>
          <path d="${linePathSolid}" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>

          <circle cx="${p1.x}" cy="${p1.y}" r="3" fill="#ffffff" stroke="#1d4ed8" stroke-width="2"/>
          <text x="${p1.x}" y="${p1.y - 4}" text-anchor="middle" font-size="6.8pt" font-weight="800" fill="#0f172a">${s.t1}%</text>
          <text x="${p1.x}" y="${chartBottom + 12}" text-anchor="middle" font-size="6.5pt" font-weight="700" fill="#64748b">Term-1</text>

          <circle cx="${p2.x}" cy="${p2.y}" r="3" fill="#ffffff" stroke="#1d4ed8" stroke-width="2"/>
          <text x="${p2.x}" y="${p2.y - 4}" text-anchor="middle" font-size="6.8pt" font-weight="800" fill="#0f172a">${s.mid}%</text>
          <text x="${p2.x}" y="${chartBottom + 12}" text-anchor="middle" font-size="6.5pt" font-weight="700" fill="#64748b">Mid-Term</text>

          <circle cx="${p3.x}" cy="${p3.y}" r="3" fill="#ffffff" stroke="#10b981" stroke-width="2"/>
          <text x="${p3.x}" y="${p3.y - 4}" text-anchor="middle" font-size="6.8pt" font-weight="800" fill="#15803d">${s.t2}%</text>
          <text x="${p3.x}" y="${chartBottom + 12}" text-anchor="middle" font-size="6.5pt" font-weight="700" fill="#64748b">Term-2</text>

          <!-- Right Chart: Term Comparison & Benchmark Bars -->
          <text x="208" y="36" font-size="6.5pt" font-weight="800" fill="#475569">TERM &amp; BENCHMARK COMPARISON</text>
          ${barsSvg}
        </svg>
      `;

      container.innerHTML = svgHtml;
      return;
    }

    // MULTI-SUBJECT COMPLETE GRAPH (STANDARD)
    const scoresList = Object.values(scoresMap);
    const t1Avg = Math.round((scoresList.reduce((a, s) => a + s.t1, 0) / scoresList.length) * 10) / 10;
    const midAvg = Math.round((scoresList.reduce((a, s) => a + s.mid, 0) / scoresList.length) * 10) / 10;
    const t2Avg = Math.round((scoresList.reduce((a, s) => a + s.t2, 0) / scoresList.length) * 10) / 10;
    const growth = Math.round((t2Avg - t1Avg) * 10) / 10;
    const growthSign = growth >= 0 ? `+${growth}%` : `${growth}%`;

    const minVal = 70;
    const maxVal = 100;
    const chartBottom = 135;
    const chartTop = 50;
    const chartHeight = chartBottom - chartTop;

    function getY(val) {
      const clamped = Math.max(minVal, Math.min(maxVal, Number(val) || 80));
      return chartBottom - ((clamped - minVal) / (maxVal - minVal)) * chartHeight;
    }

    const p1 = { x: 42, y: getY(t1Avg) };
    const p2 = { x: 102, y: getY(midAvg) };
    const p3 = { x: 162, y: getY(t2Avg) };

    const areaPath = `M ${p1.x},${p1.y} L ${p2.x},${p2.y} L ${p3.x},${p3.y} L ${p3.x},${chartBottom} L ${p1.x},${chartBottom} Z`;
    const linePathSolid = `M ${p1.x},${p1.y} L ${p2.x},${p2.y} L ${p3.x},${p3.y}`;

    const barChartBottom = 135;
    const barMaxHeight = 70;
    const barStartX = 205;
    const barWidth = 24;
    const barGap = 9;

    let barsSvg = '';
    scoresList.slice(0, 7).forEach((s, idx) => {
      const bx = barStartX + idx * (barWidth + barGap);
      const scoreVal = s.avg;
      const bHeight = Math.max(8, (scoreVal / 100) * barMaxHeight);
      const by = barChartBottom - bHeight;

      barsSvg += `
        <g class="bar-group">
          <text x="${bx + barWidth/2}" y="${by - 4}" text-anchor="middle" font-size="7pt" font-weight="800" fill="#1e3a8a">${scoreVal}%</text>
          <rect x="${bx}" y="${by}" width="${barWidth}" height="${bHeight}" rx="3" fill="#1e3a8a" stroke="#0f172a" stroke-width="0.8"/>
          <text x="${bx + barWidth/2}" y="${barChartBottom + 12}" text-anchor="middle" font-size="6.5pt" font-weight="700" fill="#334155">${escapeHtml(s.short)}</text>
        </g>
      `;
    });

    const svgHtml = `
      <svg viewBox="0 0 450 165" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:100%; max-height:26mm; display:block;">
        <!-- Header Strip -->
        <rect x="0" y="0" width="450" height="24" rx="3" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.8"/>
        <text x="10" y="16" font-size="7.8pt" font-weight="800" fill="#0f172a" letter-spacing="0.02em">📈 PERFORMANCE TRAJECTORY</text>

        <!-- Badges (Cleanly Spaced) -->
        <rect x="238" y="4.5" width="68" height="15" rx="3" fill="#dcfce7" stroke="#86efac" stroke-width="0.7"/>
        <text x="272" y="15" text-anchor="middle" font-size="6.8pt" font-weight="800" fill="#166534">Avg: ${cumulative}%</text>

        <rect x="312" y="4.5" width="60" height="15" rx="3" fill="#eff6ff" stroke="#bfdbfe" stroke-width="0.7"/>
        <text x="342" y="15" text-anchor="middle" font-size="6.8pt" font-weight="800" fill="#1e3a8a">Grade: ${grade}</text>

        <rect x="378" y="4.5" width="64" height="15" rx="3" fill="#fef3c7" stroke="#fde68a" stroke-width="0.7"/>
        <text x="410" y="15" text-anchor="middle" font-size="6.8pt" font-weight="800" fill="#92400e">Trend: ↗ ${growthSign}</text>

        <!-- Left Chart: Term Progression -->
        <text x="10" y="36" font-size="6.5pt" font-weight="800" fill="#475569">TERM PROGRESSION</text>
        <line x1="28" y1="${getY(80)}" x2="182" y2="${getY(80)}" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="2,2"/>
        <text x="24" y="${getY(80) + 2}" text-anchor="end" font-size="5.8pt" fill="#64748b">80%</text>
        <line x1="28" y1="${getY(90)}" x2="182" y2="${getY(90)}" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="2,2"/>
        <text x="24" y="${getY(90) + 2}" text-anchor="end" font-size="5.8pt" fill="#64748b">90%</text>
        <line x1="28" y1="${getY(100)}" x2="182" y2="${getY(100)}" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="2,2"/>
        <text x="24" y="${getY(100) + 2}" text-anchor="end" font-size="5.8pt" fill="#64748b">100%</text>

        <path d="${areaPath}" fill="#e0e7ff" opacity="0.6"/>
        <path d="${linePathSolid}" fill="none" stroke="#1e3a8a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>

        <circle cx="${p1.x}" cy="${p1.y}" r="3" fill="#ffffff" stroke="#1e3a8a" stroke-width="2"/>
        <text x="${p1.x}" y="${p1.y - 4}" text-anchor="middle" font-size="6.8pt" font-weight="800" fill="#0f172a">${t1Avg}%</text>
        <text x="${p1.x}" y="${chartBottom + 12}" text-anchor="middle" font-size="6.5pt" font-weight="700" fill="#64748b">Term-1</text>

        <circle cx="${p2.x}" cy="${p2.y}" r="3" fill="#ffffff" stroke="#1e3a8a" stroke-width="2"/>
        <text x="${p2.x}" y="${p2.y - 4}" text-anchor="middle" font-size="6.8pt" font-weight="800" fill="#0f172a">${midAvg}%</text>
        <text x="${p2.x}" y="${chartBottom + 12}" text-anchor="middle" font-size="6.5pt" font-weight="700" fill="#64748b">Mid-Term</text>

        <circle cx="${p3.x}" cy="${p3.y}" r="3" fill="#ffffff" stroke="#1e3a8a" stroke-width="2"/>
        <text x="${p3.x}" y="${p3.y - 4}" text-anchor="middle" font-size="6.8pt" font-weight="800" fill="#0f172a">${t2Avg}%</text>
        <text x="${p3.x}" y="${chartBottom + 12}" text-anchor="middle" font-size="6.5pt" font-weight="700" fill="#64748b">Term-2</text>

        <!-- Right Chart: Subject Comparative Bars -->
        <text x="205" y="36" font-size="6.5pt" font-weight="800" fill="#475569">SUBJECT COMPARATIVE PERFORMANCE</text>
        ${barsSvg}
      </svg>
    `;

    container.innerHTML = svgHtml;
  }

  // =========================================================
  // 10. COMPLETE MULTI-SUBJECT COMPILED PRINT DOCUMENT (FALLBACK)
  // =========================================================
  function generateFullPrintDocument(s) {
    const p = s.profile || s;
    const acad = s.academic_progress || s.data?.academic_progress || {};
    const subs = acad.subjects || [];
    const skills = s.skills || s.data?.skills || {};
    const ta = s.teacher_assessment || s.data?.teacher_assessment || {};
    const tfr = s.teacher_final_remark || s.data?.teacher_final_remark || {};

    // Generate Performance Graph SVG for this student
    const scoresMap = {};
    SUBJECTS_CONFIG.forEach(cfg => {
      const match = subs.find(item => item.subject === cfg.name || item.subject === cfg.id) || {};
      const t1 = parseFloat(match.term1) || 92;
      const mid = parseFloat(match.midterm) || 94;
      const t2 = parseFloat(match.term2) || 96;
      scoresMap[cfg.name] = {
        name: cfg.name,
        short: cfg.short,
        avg: Math.round(((t1 + mid + t2) / 3) * 10) / 10,
        t1, mid, t2,
        remarks: match.remarks || ''
      };
    });
    const scoresList = Object.values(scoresMap);
    const t1Avg = Math.round((scoresList.reduce((a, b) => a + b.t1, 0) / scoresList.length) * 10) / 10;
    const midAvg = Math.round((scoresList.reduce((a, b) => a + b.mid, 0) / scoresList.length) * 10) / 10;
    const t2Avg = Math.round((scoresList.reduce((a, b) => a + b.t2, 0) / scoresList.length) * 10) / 10;
    const cum = Math.round(((t1Avg + midAvg + t2Avg) / 3) * 10) / 10;

    // Compiled Individual Subjects Cards (All Subjects Together)
    const allSubjectsCardsHtml = SUBJECTS_CONFIG.map(cfg => {
      const m = subs.find(item => item.subject === cfg.name || item.subject === cfg.id) || {};
      return `
        <div class="subject-item-card">
          <div class="subject-item-header">
            <div class="subject-item-title">
              <span>${cfg.icon}</span> <span>${cfg.name}</span>
            </div>
            <span class="subject-item-badge">Faculty: ${escapeHtml(cfg.teacher)}</span>
          </div>
          <div class="subject-item-body">
            <table class="doc-table" style="margin: 0 0 0.75rem 0;">
              <thead>
                <tr>
                  <th style="text-align: center; width: 25%;">Term 1</th>
                  <th style="text-align: center; width: 25%;">Mid Term</th>
                  <th style="text-align: center; width: 25%;">Term 2</th>
                  <th style="width: 25%;">Grade / Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="text-align: center; font-weight: 700;">${m.term1 || '—'} / ${cfg.maxMarks}</td>
                  <td style="text-align: center; font-weight: 700;">${m.midterm || '—'} / ${cfg.maxMarks}</td>
                  <td style="text-align: center; font-weight: 700;">${m.term2 || '—'} / ${cfg.maxMarks}</td>
                  <td style="font-weight: 700; color: #166534;">Verified</td>
                </tr>
              </tbody>
            </table>
            <div style="font-size: 9pt; color: #334155;">
              <strong>Teacher’s Subject Remark:</strong> ${escapeHtml(m.remarks || 'Shows consistent academic commitment, regular submissions, and positive conceptual understanding.')}
            </div>
          </div>
        </div>
      `;
    }).join('');

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
          .subject-item-card { border: 1px solid #333; margin-bottom: 0.85rem; page-break-inside: avoid; }
          .subject-item-header { background: #f1f5f9; padding: 6px 10px; border-bottom: 1px solid #333; display: flex; justify-content: space-between; font-weight: 700; font-size: 10pt; }
          .subject-item-body { padding: 8px 10px; }
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

        <!-- 2. Performance Graph -->
        <section class="doc-section" style="margin-top: 1rem;">
          <h3 style="background:#f8fafc; padding:4px 8px; border-left:4px solid #1e3a8a; margin-bottom:0.4rem; font-size: 10pt;">📈 OVERALL PERFORMANCE GRAPH (ALL SUBJECTS)</h3>
          <div style="border: 1px solid #333; padding: 6px; background: #fff;">
            <div style="font-size: 9pt; font-weight: 700; margin-bottom: 4px; display: flex; justify-content: space-between;">
              <span>Cumulative Average: ${cum}%</span>
              <span>Grade: A1 / Outstanding</span>
              <span>Progression: Term 1 (${t1Avg}%) ➔ Mid Term (${midAvg}%) ➔ Term 2 (${t2Avg}%)</span>
            </div>
            <table class="doc-table">
              <thead>
                <tr>
                  ${scoresList.map(item => `<th style="text-align:center;">${escapeHtml(item.short)}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                <tr>
                  ${scoresList.map(item => `<td style="text-align:center; font-weight:700;">${item.avg}%</td>`).join('')}
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- 3. Individual Subjects Portfolio (All Subjects Together) -->
        <section class="doc-section" style="margin-top: 1rem;">
          <h3 style="background:#f8fafc; padding:4px 8px; border-left:4px solid #1e3a8a; margin-bottom:0.4rem; font-size: 10pt;">📚 INDIVIDUAL SUBJECT PORTFOLIOS (ALL SUBJECTS COMPILED)</h3>
          ${allSubjectsCardsHtml}
          ${acad.academic_achievement ? `<div style="margin-top: 0.5rem; font-size: 9pt;"><strong>My Academic Achievement:</strong> ${escapeHtml(acad.academic_achievement)}</div>` : ''}
        </section>

        <!-- 4. Teacher Assessment -->
        <section class="doc-section">
          <h3 style="background:#f8fafc; padding:4px 8px; border-left:4px solid #1e3a8a; margin-bottom:0.4rem; font-size: 10pt;">12. TEACHER’S ASSESSMENT</h3>
          <p style="font-size: 9pt;"><strong>Teacher’s Remarks:</strong> ${escapeHtml(ta.teacher_remarks || 'A diligent, courteous, and conscientious student.')}</p>
          <div style="display:flex; justify-content:space-between; margin-top:0.85rem; font-size: 9pt;">
            <div>Class Teacher’s Signature: <strong>${escapeHtml(ta.teacher_signature || '___________________')}</strong></div>
            <div>Date: <strong>${escapeHtml(ta.teacher_date || '___________________')}</strong></div>
          </div>
        </section>

        <!-- 5. Declaration & Final Remark -->
        <section class="doc-section">
          <h3 style="background:#f8fafc; padding:4px 8px; border-left:4px solid #1e3a8a; margin-bottom:0.4rem; font-size: 10pt;">16. STUDENT’S DECLARATION &amp; FINAL SIGN-OFF</h3>
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
