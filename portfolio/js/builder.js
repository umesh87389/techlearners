/**
 * Student Portfolio Builder & 1-Page Print Controller
 * Matches 100% of portfolio.docx (SHM Academy)
 */

const SAMPLE_SHM_STUDENT = {
  schoolName: "SHM ACADEMY",
  schoolMotto: "“Infinite Knowledge Through Education”",
  academicSession: "2026–2027",
  
  // Profile
  studentName: "Aarav Gupta",
  classSection: "Class VIII - A",
  rollNo: "14",
  admissionNo: "SHM-2024-089",
  dob: "2012-08-15",
  fatherName: "Mr. Rajesh Gupta",
  motherName: "Mrs. Akansha Gupta",
  contactNo: "+91 98765 43210",
  house: "Newton (Yellow)",
  classTeacher: "Mrs. Sunita Roy",
  photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",

  // About Me
  aboutSentence: "My name is Aarav Gupta. I study in Class VIII at SHM Academy. I consider myself a curious, dedicated and innovative student. My favourite subjects are Mathematics and Computer/IT.",
  interests: "Robotics, Microcontroller Circuits, Artificial Intelligence & Web Apps",
  hobbies: "Reading Sci-Fi, Playing Chess & Building DIY Electronics",
  strength1: "Logical reasoning & algorithmic problem solving",
  strength2: "Hands-on hardware assembly and rapid prototyping",
  strength3: "Team collaboration and motivating project partners",
  improveOne: "Developing greater stage poise during inter-school debate finals",

  // Goals
  shortGoal: "Score 95%+ in final exams and win 1st prize at Inter-School STEM Expo.",
  longGoal: "Pursue AI & Robotics Engineering and build smart assistive educational tools.",
  goalsChecked: [true, true, true, true, true, true],

  // Academic Progress
  academics: [
    { subject: "English", t1: "91", mid: "92", t2: "94", remarks: "Exemplary essay writing" },
    { subject: "Hindi", t1: "88", mid: "89", t2: "90", remarks: "Fluent & consistent" },
    { subject: "Mathematics", t1: "96", mid: "98", t2: "99", remarks: "Outstanding analytical skill" },
    { subject: "Science", t1: "94", mid: "95", t2: "97", remarks: "Mastered practical labs" },
    { subject: "Social Science", t1: "90", mid: "91", t2: "93", remarks: "Great historical inquiry" },
    { subject: "Computer / IT", t1: "98", mid: "99", t2: "100", remarks: "Class topper in Coding & AI" },
    { subject: "Other / Arts", t1: "92", mid: "94", t2: "95", remarks: "Creative model designs" }
  ],
  academicAchievement: "Ranked 1st in Class VIII Annual Academic Honors & STEM Scholar distinction.",

  // Skills (1-5)
  skills: {
    communication: "4.5",
    reading: "5.0",
    writing: "4.5",
    creativity: "5.0",
    problemSolving: "5.0",
    teamwork: "4.8",
    leadership: "4.6",
    timeManagement: "4.3",
    digitalSkills: "5.0"
  },

  // Co-Curricular Activities
  activities: [
    { event: "Inter-School STEM & Robotics Expo", date: "Nov 2026", participation: "Lead Hardware Demonstrator", remarks: "First Prize Trophy" },
    { event: "Annual Inter-House Debate", date: "Oct 2026", participation: "Speaker (AI in Education)", remarks: "Second Runner Up" },
    { event: "District Chess Championship", date: "Dec 2026", participation: "Board 1 Captain", remarks: "Gold Medalist" }
  ],

  // Achievements
  achievements: [
    { title: "1st Prize in Junior Hackathon", event: "TechFest 2026", date: "Oct 2026", award: "Gold Trophy & 5k Prize" },
    { title: "National Science Olympiad Distinction", event: "SOF NSO 2026", date: "Nov 2026", award: "Gold Medal & Merit Certificate" },
    { title: "Best Innovation Award", event: "SHM Annual Expo", date: "Jan 2027", award: "Principal's Honor Badge" }
  ],

  // Projects
  proj1Title: "Automated Soil Moisture & Plant Irrigation Bot",
  proj1Did: "Assembled Arduino Uno with capacitive moisture sensors, 5V mini water pump relay, and status LEDs.",
  proj1Learned: "Analog-to-digital sensor calibration, circuit troubleshooting, and embedded C++ programming.",
  proj2Title: "AI-Powered Interactive Study Portal",
  proj2Did: "Developed responsive web pages with chapter notes, flashcard quizzes, and instant scoring.",
  proj2Learned: "Modern CSS Grid/Flexbox layouts, JSON data structures, and GitHub Pages deployment.",

  // School Participation
  participationChecks: [true, true, true, true, true, true, true, true, true, false],
  memorableActivity: "Demonstrating the working automated irrigation bot to 200+ visiting parents and judges.",

  // Reflection
  refLearn: "Learned embedded programming, circuit design, and structured peer collaboration.",
  refAchieve: "Building our working robotics prototype and earning 1st position at the STEM Expo.",
  refChallenge: "Balancing revision for mid-term exams alongside hackathon build deadlines.",
  refOvercome: "Designed a daily Pomodoro timetable with dedicated 1-hour build sprints.",
  refBetter: "Practice public presentations early to build effortless stage presence.",

  // Best Work
  bestWorkNote: "Working Arduino prototype demonstrated live; circuit schematics and 1-minute video demo verified.",

  // Teacher Assessment
  teacherRatings: {
    academic: "Excellent",
    discipline: "Excellent",
    regularity: "Excellent",
    communication: "Very Good",
    participation: "Excellent",
    teamwork: "Excellent",
    leadership: "Very Good",
    creativity: "Excellent"
  },
  teacherRemarks: "Aarav is an exceptional, disciplined, and proactive learner who consistently pushes beyond the syllabus to build meaningful real-world projects.",
  teacherSignDate: "15 March 2027",

  // Parent Feedback
  parentStrengths: "High curiosity, self-driven learning habits, and respectful collaboration.",
  parentImprove: "Could remember to step away from screens and take regular physical rest.",
  parentSuggestions: "Support his participation in state and national innovation fairs.",
  parentSignDate: "18 March 2027",

  // Personal Improvement Plan
  improvementPlans: [
    { area: "Stage Presentation Confidence", plan: "Speak once every week during school assembly", target: "Term 2", progress: "90% Achieved" },
    { area: "Touch Typing Speed", plan: "Practice 15 minutes daily on Keybr.com", target: "Mid Term", progress: "Completed (65 WPM)" },
    { area: "Hardware Circuit Soldering", plan: "Complete safety soldering workshop in makerspace", target: "Nov 2026", progress: "Certified" }
  ],

  // My Year in One Page
  yearAchievement: "1st Rank in Annual STEM Exhibition & Coding Sprint",
  yearFavSubject: "Mathematics & Computer Science / AI",
  yearFavActivity: "Robotics Lab Sessions & Circuit Building",
  yearAward: "Gold Medal in Science Olympiad (NSO)",
  yearNewLearned: "Arduino Embedded C++ & Sensor Interfacing",
  yearProudOf: "Mentored 4 junior classmates in their first robotics project",
  yearGoalNext: "Publish an open-source AI study tool for CBSE students",

  // Declarations
  studentSignDate: "15 March 2027",
  principalRemarks: "Approved • Exceptional Year of Academic & Co-Curricular Growth"
};

let currentData = Object.assign({}, SAMPLE_SHM_STUDENT);
let currentStepIndex = 0;
let currentViewMode = "form";
let currentDisplayMode = "tabs";
let currentZoom = "fit";

const STEP_META = [
  { id: "paneProfile", name: "1. School Information & Student Profile", short: "1. Profile" },
  { id: "paneAbout", name: "2. About Me & Self Reflection", short: "2. About" },
  { id: "paneGoals", name: "3. My Goals & Focus", short: "3. Goals" },
  { id: "paneAcademics", name: "4. Academic Progress & Marks", short: "4. Academics" },
  { id: "paneSkills", name: "5. My Skills & Competencies (1–5)", short: "5. Skills" },
  { id: "paneActivities", name: "6. Co-Curricular Activities & Awards", short: "6. Activities" },
  { id: "paneProjects", name: "7. Projects & School Participation", short: "7. Projects" },
  { id: "paneReflection", name: "8. Reflection & Best Work Evidence", short: "8. Reflection" },
  { id: "paneAssessment", name: "9. Teacher's Assessment & Parent Feedback", short: "9. Assessment" },
  { id: "paneYear", name: "10. My Year in One Page (Highlights)", short: "10. Highlights" }
];

// Initialize application
document.addEventListener("DOMContentLoaded", function() {
  loadSavedData();
  bindTabNavigation();
  bindFormInputs();
  renderPreview(currentData);
  goToStep(0);

  // Responsive default: Desktop widescreen >= 1200 gets split view; smaller screens get form focus
  if (window.innerWidth >= 1200) {
    setViewMode("split");
  } else {
    setViewMode("form");
  }

  // Initial scale calibration
  requestAnimationFrame(applySheetScale);

  // Recalibrate scale on resize/orientation change
  let resizeTimer;
  window.addEventListener("resize", function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      applySheetScale();
    }, 120);
  });
});

// Load from LocalStorage
function loadSavedData() {
  try {
    const saved = localStorage.getItem("tl_shm_portfolio_data");
    if (saved) {
      currentData = JSON.parse(saved);
    }
  } catch(e) {
    console.warn("LocalStorage load failed:", e);
  }
}

function saveToLocalStorage() {
  try {
    localStorage.setItem("tl_shm_portfolio_data", JSON.stringify(currentData));
  } catch(e) {
    console.warn("LocalStorage save failed:", e);
  }
}

// Tab navigation for form sections
function bindTabNavigation() {
  const tabs = document.querySelectorAll(".section-tab-btn");
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", function() {
      goToStep(index);
    });
  });
}

// Step navigation
function goToStep(stepIndex) {
  if (stepIndex < 0) stepIndex = 0;
  if (stepIndex >= STEP_META.length) stepIndex = STEP_META.length - 1;
  currentStepIndex = stepIndex;

  const meta = STEP_META[stepIndex];

  // Update tab buttons
  const tabs = document.querySelectorAll(".section-tab-btn");
  tabs.forEach(t => {
    t.classList.remove("active");
    if (t.getAttribute("data-target") === meta.id) {
      t.classList.add("active");
      t.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  });

  // Update step panes
  document.querySelectorAll(".form-step-pane").forEach(p => p.classList.remove("active"));
  const pane = document.getElementById(meta.id);
  if (pane) pane.classList.add("active");

  // Update step progress indicator
  const progText = document.getElementById("stepProgressText");
  const progPercent = document.getElementById("stepProgressPercent");
  const progFill = document.getElementById("stepProgressFill");
  const pct = Math.round(((stepIndex + 1) / STEP_META.length) * 100);

  if (progText) progText.textContent = `Step ${stepIndex + 1} of 10 • ${meta.name}`;
  if (progPercent) progPercent.textContent = `${pct}% Complete`;
  if (progFill) progFill.style.width = `${pct}%`;

  // Update jump select dropdown
  const jumpSel = document.getElementById("jumpSectionSelect");
  if (jumpSel) jumpSel.value = meta.id;

  // Smooth scroll form card to top
  const formCard = document.getElementById("builderFormCard");
  if (formCard && window.innerWidth <= 1100) {
    const cardRect = formCard.getBoundingClientRect();
    if (cardRect.top < 0 || cardRect.top > 200) {
      formCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  } else if (formCard) {
    formCard.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function nextStep() {
  goToStep(currentStepIndex + 1);
}

function prevStep() {
  goToStep(currentStepIndex - 1);
}

// Section display mode: 'tabs' or 'all'
function setSectionDisplayMode(mode) {
  currentDisplayMode = mode;
  const formCard = document.getElementById("builderFormCard");
  const btnTabs = document.getElementById("btnDisplayTabs");
  const btnAll = document.getElementById("btnDisplayAll");

  if (mode === "all") {
    if (formCard) formCard.classList.add("show-all-sections");
    if (btnTabs) btnTabs.classList.remove("active");
    if (btnAll) btnAll.classList.add("active");
  } else {
    if (formCard) formCard.classList.remove("show-all-sections");
    if (btnTabs) btnTabs.classList.add("active");
    if (btnAll) btnAll.classList.remove("active");
    goToStep(currentStepIndex);
  }
}

function jumpToSection(targetId) {
  if (currentDisplayMode === "all") {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    const idx = STEP_META.findIndex(m => m.id === targetId);
    if (idx !== -1) goToStep(idx);
  }
}

// View mode switcher: 'form', 'preview', or 'split'
function setViewMode(mode) {
  if (!["form", "preview", "split"].includes(mode)) mode = "form";
  currentViewMode = mode;

  const layout = document.getElementById("builderLayout");
  if (layout) {
    layout.classList.remove("mode-form", "mode-preview", "mode-split");
    layout.classList.add(`mode-${mode}`);
  }

  // Update mode buttons in topbar
  ["form", "preview", "split"].forEach(m => {
    const btn = document.getElementById("btnMode" + m.charAt(0).toUpperCase() + m.slice(1));
    if (btn) {
      if (m === mode) btn.classList.add("active");
      else btn.classList.remove("active");
    }
  });

  // Update mobile FAB
  const fab = document.getElementById("mobilePreviewFab");
  if (fab) {
    if (mode === "preview") {
      fab.innerHTML = "<span>📝</span> <span>Back to Form</span>";
    } else {
      fab.innerHTML = "<span>👁️</span> <span>View A4 Sheet</span>";
    }
  }

  if (mode === "preview" || mode === "split") {
    requestAnimationFrame(applySheetScale);
  }
}

function toggleMobilePreview() {
  if (currentViewMode === "form") {
    setViewMode("preview");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    setViewMode("form");
  }
}

// A4 Preview Zoom Controls
function setPreviewZoom(zoom) {
  currentZoom = zoom;

  document.querySelectorAll(".zoom-btn").forEach(btn => {
    btn.classList.remove("active");
    const val = btn.getAttribute("data-zoom");
    if (val === String(zoom)) {
      btn.classList.add("active");
    }
  });

  applySheetScale();
}

// Apply responsive scale to #singlePageSheet without blowout
function applySheetScale() {
  const viewport = document.getElementById("sheetViewport");
  const scaler = document.getElementById("sheetScaler");
  const sheet = document.getElementById("singlePageSheet");
  if (!viewport || !scaler || !sheet) return;

  const viewportWidth = viewport.clientWidth;
  if (viewportWidth <= 0) return;

  const sheetPxWidth = 794; // 210mm in px at 96dpi
  const sheetPxHeight = 1123; // 297mm in px at 96dpi

  let scale = 1;
  if (currentZoom === "fit") {
    const availableWidth = Math.max(260, viewportWidth - 24);
    scale = Math.min(1.05, Math.max(0.32, availableWidth / sheetPxWidth));
  } else {
    scale = parseFloat(currentZoom) || 1;
  }

  scaler.style.transform = `scale(${scale})`;
  scaler.style.transformOrigin = "top center";
  scaler.style.width = `${sheetPxWidth}px`;
  scaler.style.height = `${sheetPxHeight * scale}px`;
  scaler.style.marginBottom = `${Math.max(16, 20 * scale)}px`;
}
// Bind all inputs
function bindFormInputs() {
  syncDataToForm(currentData);

  const formCard = document.querySelector(".builder-form-card");
  if (formCard) {
    formCard.addEventListener("input", function() {
      readFormToData();
      renderPreview(currentData);
      saveToLocalStorage();
    });
    formCard.addEventListener("change", function() {
      readFormToData();
      renderPreview(currentData);
      saveToLocalStorage();
    });
  }

  const photoInput = document.getElementById("inputStudentPhotoFile");
  if (photoInput) {
    photoInput.addEventListener("change", function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          currentData.photoUrl = evt.target.result;
          const urlInput = document.getElementById("f_photoUrl");
          if (urlInput) urlInput.value = "";
          renderPreview(currentData);
          saveToLocalStorage();
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

// Sync currentData into form inputs
function syncDataToForm(d) {
  setVal("f_schoolName", d.schoolName);
  setVal("f_schoolMotto", d.schoolMotto);
  setVal("f_academicSession", d.academicSession);
  
  setVal("f_studentName", d.studentName);
  setVal("f_classSection", d.classSection);
  setVal("f_rollNo", d.rollNo);
  setVal("f_admissionNo", d.admissionNo);
  setVal("f_dob", d.dob);
  setVal("f_fatherName", d.fatherName);
  setVal("f_motherName", d.motherName);
  setVal("f_contactNo", d.contactNo);
  setVal("f_house", d.house);
  setVal("f_classTeacher", d.classTeacher);
  setVal("f_photoUrl", d.photoUrl);

  setVal("f_aboutSentence", d.aboutSentence);
  setVal("f_interests", d.interests);
  setVal("f_hobbies", d.hobbies);
  setVal("f_strength1", d.strength1);
  setVal("f_strength2", d.strength2);
  setVal("f_strength3", d.strength3);
  setVal("f_improveOne", d.improveOne);

  setVal("f_shortGoal", d.shortGoal);
  setVal("f_longGoal", d.longGoal);

  // Year in One Page
  setVal("f_yearAchievement", d.yearAchievement);
  setVal("f_yearFavSubject", d.yearFavSubject);
  setVal("f_yearFavActivity", d.yearFavActivity);
  setVal("f_yearAward", d.yearAward);
  setVal("f_yearNewLearned", d.yearNewLearned);
  setVal("f_yearProudOf", d.yearProudOf);
  setVal("f_yearGoalNext", d.yearGoalNext);

  // Projects
  setVal("f_proj1Title", d.proj1Title);
  setVal("f_proj1Did", d.proj1Did);
  setVal("f_proj1Learned", d.proj1Learned);
  setVal("f_proj2Title", d.proj2Title);
  setVal("f_proj2Did", d.proj2Did);
  setVal("f_proj2Learned", d.proj2Learned);

  // Reflection
  setVal("f_refLearn", d.refLearn);
  setVal("f_refAchieve", d.refAchieve);
  setVal("f_refChallenge", d.refChallenge);
  setVal("f_refOvercome", d.refOvercome);
  setVal("f_refBetter", d.refBetter);

  // Teachers & Parents
  setVal("f_teacherRemarks", d.teacherRemarks);
  setVal("f_teacherSignDate", d.teacherSignDate);
  setVal("f_parentStrengths", d.parentStrengths);
  setVal("f_parentImprove", d.parentImprove);
  setVal("f_parentSuggestions", d.parentSuggestions);
  setVal("f_parentSignDate", d.parentSignDate);
  setVal("f_studentSignDate", d.studentSignDate);
  setVal("f_academicAchievement", d.academicAchievement);
  setVal("f_memorableActivity", d.memorableActivity);
  setVal("f_bestWorkNote", d.bestWorkNote);

  // Teacher Ratings
  if (d.teacherRatings) {
    for (let k in d.teacherRatings) {
      setVal("f_tr_" + k, d.teacherRatings[k]);
    }
  }

  // Skills
  if (d.skills) {
    for (let k in d.skills) {
      setVal("f_skill_" + k, d.skills[k]);
    }
  }

  renderAcademicsTable();
  renderActivitiesInputs();
  renderAchievementsInputs();
  renderImprovementInputs();
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = (val !== undefined && val !== null) ? val : "";
}

function getVal(id, fallback = "") {
  const el = document.getElementById(id);
  return el ? el.value.trim() : fallback;
}

// Read form to currentData
function readFormToData() {
  currentData.schoolName = getVal("f_schoolName", "SHM ACADEMY");
  currentData.schoolMotto = getVal("f_schoolMotto", "“Infinite Knowledge Through Education”");
  currentData.academicSession = getVal("f_academicSession", "2026–2027");

  currentData.studentName = getVal("f_studentName");
  currentData.classSection = getVal("f_classSection");
  currentData.rollNo = getVal("f_rollNo");
  currentData.admissionNo = getVal("f_admissionNo");
  currentData.dob = getVal("f_dob");
  currentData.fatherName = getVal("f_fatherName");
  currentData.motherName = getVal("f_motherName");
  currentData.contactNo = getVal("f_contactNo");
  currentData.house = getVal("f_house");
  currentData.classTeacher = getVal("f_classTeacher");
  const photoUrlInput = getVal("f_photoUrl");
  if (photoUrlInput) currentData.photoUrl = photoUrlInput;

  currentData.aboutSentence = getVal("f_aboutSentence");
  currentData.interests = getVal("f_interests");
  currentData.hobbies = getVal("f_hobbies");
  currentData.strength1 = getVal("f_strength1");
  currentData.strength2 = getVal("f_strength2");
  currentData.strength3 = getVal("f_strength3");
  currentData.improveOne = getVal("f_improveOne");

  currentData.shortGoal = getVal("f_shortGoal");
  currentData.longGoal = getVal("f_longGoal");

  currentData.yearAchievement = getVal("f_yearAchievement");
  currentData.yearFavSubject = getVal("f_yearFavSubject");
  currentData.yearFavActivity = getVal("f_yearFavActivity");
  currentData.yearAward = getVal("f_yearAward");
  currentData.yearNewLearned = getVal("f_yearNewLearned");
  currentData.yearProudOf = getVal("f_yearProudOf");
  currentData.yearGoalNext = getVal("f_yearGoalNext");

  currentData.proj1Title = getVal("f_proj1Title");
  currentData.proj1Did = getVal("f_proj1Did");
  currentData.proj1Learned = getVal("f_proj1Learned");
  currentData.proj2Title = getVal("f_proj2Title");
  currentData.proj2Did = getVal("f_proj2Did");
  currentData.proj2Learned = getVal("f_proj2Learned");

  currentData.refLearn = getVal("f_refLearn");
  currentData.refAchieve = getVal("f_refAchieve");
  currentData.refChallenge = getVal("f_refChallenge");
  currentData.refOvercome = getVal("f_refOvercome");
  currentData.refBetter = getVal("f_refBetter");

  currentData.teacherRemarks = getVal("f_teacherRemarks");
  currentData.teacherSignDate = getVal("f_teacherSignDate");
  currentData.parentStrengths = getVal("f_parentStrengths");
  currentData.parentImprove = getVal("f_parentImprove");
  currentData.parentSuggestions = getVal("f_parentSuggestions");
  currentData.parentSignDate = getVal("f_parentSignDate");
  currentData.studentSignDate = getVal("f_studentSignDate");
  currentData.academicAchievement = getVal("f_academicAchievement");
  currentData.memorableActivity = getVal("f_memorableActivity");
  currentData.bestWorkNote = getVal("f_bestWorkNote");

  // Read Teacher Ratings
  const trKeys = ["academic", "discipline", "regularity", "communication", "participation", "teamwork", "leadership", "creativity"];
  currentData.teacherRatings = currentData.teacherRatings || {};
  trKeys.forEach(k => {
    currentData.teacherRatings[k] = getVal("f_tr_" + k, "Excellent");
  });

  // Read skills
  const skillKeys = ["communication", "reading", "writing", "creativity", "problemSolving", "teamwork", "leadership", "timeManagement", "digitalSkills"];
  currentData.skills = currentData.skills || {};
  skillKeys.forEach(k => {
    currentData.skills[k] = getVal("f_skill_" + k, "5.0");
  });

  // Read Academics Table
  const rows = document.querySelectorAll("#academicsInputBody tr");
  const newAcademics = [];
  rows.forEach(tr => {
    const subj = tr.querySelector(".subj-name")?.value.trim();
    const t1 = tr.querySelector(".subj-t1")?.value.trim();
    const mid = tr.querySelector(".subj-mid")?.value.trim();
    const t2 = tr.querySelector(".subj-t2")?.value.trim();
    const rem = tr.querySelector(".subj-rem")?.value.trim();
    if (subj) {
      newAcademics.push({ subject: subj, t1: t1, mid: mid, t2: t2, remarks: rem });
    }
  });
  if (newAcademics.length > 0) currentData.academics = newAcademics;
}

// Render Academics inputs
function renderAcademicsTable() {
  const tbody = document.getElementById("academicsInputBody");
  if (!tbody) return;
  tbody.innerHTML = "";
  (currentData.academics || []).forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input type="text" class="subj-name" value="${escapeHtml(row.subject)}"></td>
      <td><input type="text" class="subj-t1" value="${escapeHtml(row.t1 || "")}" style="width: 60px; text-align: center;"></td>
      <td><input type="text" class="subj-mid" value="${escapeHtml(row.mid || "")}" style="width: 60px; text-align: center;"></td>
      <td><input type="text" class="subj-t2" value="${escapeHtml(row.t2 || "")}" style="width: 60px; text-align: center;"></td>
      <td><input type="text" class="subj-rem" value="${escapeHtml(row.remarks || "")}"></td>
    `;
    tbody.appendChild(tr);
  });
}

// Render Activities inputs
function renderActivitiesInputs() {
  const container = document.getElementById("activitiesInputRows");
  if (!container) return;
  container.innerHTML = "";
  (currentData.activities || []).forEach((act, idx) => {
    const div = document.createElement("div");
    div.className = "field-grid-2";
    div.style.cssText = "background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.6rem; margin-bottom: 0.5rem;";
    div.innerHTML = `
      <div class="form-field">
        <label>Activity / Event</label>
        <input type="text" value="${escapeHtml(act.event)}" oninput="updateActivity(${idx}, 'event', this.value)">
      </div>
      <div class="form-field">
        <label>Date</label>
        <input type="text" value="${escapeHtml(act.date)}" oninput="updateActivity(${idx}, 'date', this.value)">
      </div>
      <div class="form-field">
        <label>My Participation</label>
        <input type="text" value="${escapeHtml(act.participation)}" oninput="updateActivity(${idx}, 'participation', this.value)">
      </div>
      <div class="form-field">
        <label>Teacher Remark / Award</label>
        <input type="text" value="${escapeHtml(act.remarks)}" oninput="updateActivity(${idx}, 'remarks', this.value)">
      </div>
    `;
    container.appendChild(div);
  });
}

function updateActivity(idx, field, val) {
  if (currentData.activities[idx]) {
    currentData.activities[idx][field] = val;
    renderPreview(currentData);
    saveToLocalStorage();
  }
}

function addActivityRow() {
  currentData.activities.push({ event: "New Event", date: "2026-2027", participation: "Participant", remarks: "Good" });
  renderActivitiesInputs();
  renderPreview(currentData);
  saveToLocalStorage();
}

// Render Achievements inputs
function renderAchievementsInputs() {
  const container = document.getElementById("achievementsInputRows");
  if (!container) return;
  container.innerHTML = "";
  (currentData.achievements || []).forEach((ach, idx) => {
    const div = document.createElement("div");
    div.className = "field-grid-2";
    div.style.cssText = "background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.6rem; margin-bottom: 0.5rem;";
    div.innerHTML = `
      <div class="form-field">
        <label>Achievement Title</label>
        <input type="text" value="${escapeHtml(ach.title)}" oninput="updateAchievement(${idx}, 'title', this.value)">
      </div>
      <div class="form-field">
        <label>Event / Competition</label>
        <input type="text" value="${escapeHtml(ach.event)}" oninput="updateAchievement(${idx}, 'event', this.value)">
      </div>
      <div class="form-field">
        <label>Date</label>
        <input type="text" value="${escapeHtml(ach.date)}" oninput="updateAchievement(${idx}, 'date', this.value)">
      </div>
      <div class="form-field">
        <label>Position / Award</label>
        <input type="text" value="${escapeHtml(ach.award)}" oninput="updateAchievement(${idx}, 'award', this.value)">
      </div>
    `;
    container.appendChild(div);
  });
}

function updateAchievement(idx, field, val) {
  if (currentData.achievements[idx]) {
    currentData.achievements[idx][field] = val;
    renderPreview(currentData);
    saveToLocalStorage();
  }
}

function addAchievementRow() {
  currentData.achievements.push({ title: "Distinction Award", event: "Competition", date: "2026-2027", award: "Certificate" });
  renderAchievementsInputs();
  renderPreview(currentData);
  saveToLocalStorage();
}

// Render Improvement inputs
function renderImprovementInputs() {
  const container = document.getElementById("improvementInputRows");
  if (!container) return;
  container.innerHTML = "";
  (currentData.improvementPlans || []).forEach((plan, idx) => {
    const div = document.createElement("div");
    div.className = "field-grid-2";
    div.style.cssText = "background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.6rem; margin-bottom: 0.5rem;";
    div.innerHTML = `
      <div class="form-field">
        <label>Area to Improve</label>
        <input type="text" value="${escapeHtml(plan.area)}" oninput="updatePlan(${idx}, 'area', this.value)">
      </div>
      <div class="form-field">
        <label>My Action Plan</label>
        <input type="text" value="${escapeHtml(plan.plan)}" oninput="updatePlan(${idx}, 'plan', this.value)">
      </div>
      <div class="form-field">
        <label>Target Date</label>
        <input type="text" value="${escapeHtml(plan.target)}" oninput="updatePlan(${idx}, 'target', this.value)">
      </div>
      <div class="form-field">
        <label>Progress</label>
        <input type="text" value="${escapeHtml(plan.progress)}" oninput="updatePlan(${idx}, 'progress', this.value)">
      </div>
    `;
    container.appendChild(div);
  });
}

function updatePlan(idx, field, val) {
  if (currentData.improvementPlans[idx]) {
    currentData.improvementPlans[idx][field] = val;
    renderPreview(currentData);
    saveToLocalStorage();
  }
}

function addPlanRow() {
  currentData.improvementPlans.push({ area: "New Target Area", plan: "Action steps", target: "Term 2", progress: "Initiated" });
  renderImprovementInputs();
  renderPreview(currentData);
  saveToLocalStorage();
}

// =============================================================
// RENDER SINGLE-PAGE A4 PREVIEW CANVAS
// =============================================================
function renderPreview(d) {
  const sheet = document.getElementById("singlePageSheet");
  if (!sheet) return;

  const school = escapeHtml(d.schoolName || "SHM ACADEMY");
  const motto = escapeHtml(d.schoolMotto || "“Infinite Knowledge Through Education”");
  const session = escapeHtml(d.academicSession || "2026–2027");
  const name = escapeHtml(d.studentName || "Student Name");
  const cls = escapeHtml(d.classSection || "Class VIII");
  const roll = escapeHtml(d.rollNo || "--");
  const adm = escapeHtml(d.admissionNo || "--");
  const dob = escapeHtml(d.dob || "--");
  const father = escapeHtml(d.fatherName || "--");
  const mother = escapeHtml(d.motherName || "--");
  const house = escapeHtml(d.house || "--");
  const teacher = escapeHtml(d.classTeacher || "Class Teacher");
  const photo = d.photoUrl || "assets/logo.svg";

  sheet.innerHTML = `
    <!-- 1. Header & Student Meta -->
    <div class="sp-header">
      <div class="sp-school-block">
        <div class="sp-school-title">${school}</div>
        <div class="sp-school-motto">${motto}</div>
        <div class="sp-doc-title-row">
          <span class="sp-doc-title-badge">STUDENT PORTFOLIO</span>
          <span class="sp-doc-session-text">Academic Session: ${session}</span>
        </div>
      </div>
      <div class="sp-photo-wrapper">
        <img src="${photo}" alt="Student Photograph" class="sp-photo-img" onerror="this.src='assets/logo.svg'">
      </div>
    </div>

    <!-- Student Profile Strip -->
    <div class="sp-profile-meta-grid">
      <div class="sp-meta-item"><strong>Student:</strong> <span>${name}</span></div>
      <div class="sp-meta-item"><strong>Class & Sec:</strong> <span>${cls}</span></div>
      <div class="sp-meta-item"><strong>Roll No:</strong> <span>${roll}</span></div>
      <div class="sp-meta-item"><strong>Adm No:</strong> <span>${adm}</span></div>
      <div class="sp-meta-item"><strong>DOB:</strong> <span>${dob}</span></div>
      <div class="sp-meta-item"><strong>Father:</strong> <span>${father}</span></div>
      <div class="sp-meta-item"><strong>Mother:</strong> <span>${mother}</span></div>
      <div class="sp-meta-item"><strong>House / Mentor:</strong> <span>${house}</span></div>
    </div>

    <!-- 2. Ribbon: MY YEAR IN ONE PAGE -->
    <div class="sp-year-ribbon">
      <div class="sp-ribbon-title">
        <span>⭐ MY YEAR IN ONE PAGE</span>
        <span style="font-size: 6.2pt; color: #b45309; text-transform: none; font-weight: 600;">Official Annual Portfolio Summary</span>
      </div>
      <div class="sp-ribbon-grid">
        <div class="sp-ribbon-pill"><strong>⭐ Achievement:</strong> ${escapeHtml(d.yearAchievement || "Top Honors")}</div>
        <div class="sp-ribbon-pill"><strong>📚 Fav Subject:</strong> ${escapeHtml(d.yearFavSubject || "Mathematics & IT")}</div>
        <div class="sp-ribbon-pill"><strong>🎨 Fav Activity:</strong> ${escapeHtml(d.yearFavActivity || "Robotics & Circuits")}</div>
        <div class="sp-ribbon-pill"><strong>🏆 Award:</strong> ${escapeHtml(d.yearAward || "Olympiad Distinction")}</div>
        <div class="sp-ribbon-pill"><strong>💡 New Learned:</strong> ${escapeHtml(d.yearNewLearned || "AI Tools & Python")}</div>
        <div class="sp-ribbon-pill"><strong>❤️ Proud Of:</strong> ${escapeHtml(d.yearProudOf || "Team Demo")}</div>
        <div class="sp-ribbon-pill" style="grid-column: span 2;"><strong>🚀 Goal Next Year:</strong> ${escapeHtml(d.yearGoalNext || "Excellence in AI & STEM")}</div>
      </div>
    </div>

    <!-- 3. Main Split Body -->
    <div class="sp-body-split">
      
      <!-- LEFT COLUMN -->
      <div class="sp-col">
        
        <!-- About Me & Strengths -->
        <div class="sp-card">
          <div class="sp-card-title"><span>👤 About Me & Strengths</span></div>
          <div style="font-size: 6.7pt; line-height: 1.25; margin-bottom: 2px;">
            ${escapeHtml(d.aboutSentence || "Dedicated and curious student at SHM Academy.")}
          </div>
          <div style="font-size: 6.4pt; color: #334155; line-height: 1.2;">
            <strong>Strengths:</strong> 1. ${escapeHtml(d.strength1 || "Problem solving")}; 2. ${escapeHtml(d.strength2 || "Teamwork")}; 3. ${escapeHtml(d.strength3 || "Dedication")}.
            <br><strong>Focus:</strong> ${escapeHtml(d.improveOne || "Continuous self-improvement")}
          </div>
        </div>

        <!-- Goals & Aspirations -->
        <div class="sp-card">
          <div class="sp-card-title"><span>🎯 Goals & Roadmap</span></div>
          <div style="font-size: 6.5pt; line-height: 1.2;">
            <strong>Short-Term:</strong> ${escapeHtml(d.shortGoal || "Achieve 95%+ and excel in STEM competitions.")}
            <br><strong>Long-Term:</strong> ${escapeHtml(d.longGoal || "Pursue Computer Science & Technology Innovation.")}
          </div>
        </div>

        <!-- 360 Skills Matrix -->
        <div class="sp-card">
          <div class="sp-card-title"><span>⚡ Core Competency Matrix (Rate 1-5)</span></div>
          <div class="sp-skills-grid">
            <div class="sp-skill-badge"><span>Communication</span><span class="score">${(d.skills && d.skills.communication) || "5.0"}/5</span></div>
            <div class="sp-skill-badge"><span>Reading</span><span class="score">${(d.skills && d.skills.reading) || "5.0"}/5</span></div>
            <div class="sp-skill-badge"><span>Writing</span><span class="score">${(d.skills && d.skills.writing) || "5.0"}/5</span></div>
            <div class="sp-skill-badge"><span>Creativity</span><span class="score">${(d.skills && d.skills.creativity) || "5.0"}/5</span></div>
            <div class="sp-skill-badge"><span>Problem Solving</span><span class="score">${(d.skills && d.skills.problemSolving) || "5.0"}/5</span></div>
            <div class="sp-skill-badge"><span>Teamwork</span><span class="score">${(d.skills && d.skills.teamwork) || "5.0"}/5</span></div>
            <div class="sp-skill-badge"><span>Leadership</span><span class="score">${(d.skills && d.skills.leadership) || "5.0"}/5</span></div>
            <div class="sp-skill-badge"><span>Time Mgmt</span><span class="score">${(d.skills && d.skills.timeManagement) || "5.0"}/5</span></div>
            <div class="sp-skill-badge"><span>Digital Skills</span><span class="score">${(d.skills && d.skills.digitalSkills) || "5.0"}/5</span></div>
          </div>
        </div>

        <!-- Academic Progress Table -->
        <div class="sp-card">
          <div class="sp-card-title">
            <span>📊 Academic Progress</span>
            <span style="font-size: 6pt; color: #4338ca; text-transform: none;">${escapeHtml(d.academicAchievement || "Academic Honors")}</span>
          </div>
          <table class="sp-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th class="center" style="width: 28px;">T1</th>
                <th class="center" style="width: 28px;">Mid</th>
                <th class="center" style="width: 28px;">T2</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              ${(d.academics || []).slice(0, 7).map(a => `
                <tr>
                  <td><strong>${escapeHtml(a.subject)}</strong></td>
                  <td class="center">${escapeHtml(a.t1)}</td>
                  <td class="center">${escapeHtml(a.mid)}</td>
                  <td class="center">${escapeHtml(a.t2)}</td>
                  <td>${escapeHtml(a.remarks)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>

        <!-- Improvement Plan -->
        <div class="sp-card">
          <div class="sp-card-title"><span>🌱 Personal Improvement Plan</span></div>
          <table class="sp-table">
            <thead>
              <tr>
                <th>Area to Improve</th>
                <th>Action Plan</th>
                <th class="center" style="width: 45px;">Target</th>
                <th class="center" style="width: 45px;">Status</th>
              </tr>
            </thead>
            <tbody>
              ${(d.improvementPlans || []).slice(0, 2).map(p => `
                <tr>
                  <td>${escapeHtml(p.area)}</td>
                  <td>${escapeHtml(p.plan)}</td>
                  <td class="center">${escapeHtml(p.target)}</td>
                  <td class="center"><strong>${escapeHtml(p.progress)}</strong></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>

      </div>

      <!-- RIGHT COLUMN -->
      <div class="sp-col">
        
        <!-- Projects & Deliverables -->
        <div class="sp-card">
          <div class="sp-card-title"><span>💡 Projects & Creative Work</span></div>
          <div style="font-size: 6.5pt; line-height: 1.25; margin-bottom: 3px;">
            <strong>1. ${escapeHtml(d.proj1Title || "Project 1")}:</strong>
            ${escapeHtml(d.proj1Did || "")}. <em>Learned:</em> ${escapeHtml(d.proj1Learned || "")}
          </div>
          <div style="font-size: 6.5pt; line-height: 1.25;">
            <strong>2. ${escapeHtml(d.proj2Title || "Project 2")}:</strong>
            ${escapeHtml(d.proj2Did || "")}. <em>Learned:</em> ${escapeHtml(d.proj2Learned || "")}
          </div>
        </div>

        <!-- Co-Curricular & Achievements -->
        <div class="sp-card">
          <div class="sp-card-title"><span>🏆 Achievements & Co-Curricular</span></div>
          <table class="sp-table">
            <thead>
              <tr>
                <th>Event / Achievement</th>
                <th style="width: 45px;">Date</th>
                <th>Role / Award</th>
              </tr>
            </thead>
            <tbody>
              ${(d.achievements || []).slice(0, 2).map(ach => `
                <tr>
                  <td><strong>${escapeHtml(ach.title)}</strong> (${escapeHtml(ach.event)})</td>
                  <td>${escapeHtml(ach.date)}</td>
                  <td>${escapeHtml(ach.award)}</td>
                </tr>
              `).join("")}
              ${(d.activities || []).slice(0, 2).map(act => `
                <tr>
                  <td>${escapeHtml(act.event)}</td>
                  <td>${escapeHtml(act.date)}</td>
                  <td>${escapeHtml(act.remarks)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>

        <!-- School Participation & Reflection -->
        <div class="sp-card">
          <div class="sp-card-title"><span>🏫 Participation & Reflection</span></div>
          <div class="sp-mini-check-list" style="margin-bottom: 2px;">
            <span>☑ Sports & Athletics</span>
            <span>☑ Cultural & Arts</span>
            <span>☑ Debate & Speech</span>
            <span>☑ Science & Maths</span>
            <span>☑ Quiz & Olympiads</span>
            <span>☑ School Assembly</span>
          </div>
          <div style="font-size: 6.3pt; line-height: 1.2; color: #334155; margin-top: 1.5px;">
            <strong>Memorable:</strong> ${escapeHtml(d.memorableActivity || "Demonstrating project at exhibition")}<br>
            <strong>Key Learning:</strong> ${escapeHtml(d.refLearn || "Advanced technology logic & team collaboration")}
          </div>
        </div>

        <!-- Teacher's Assessment -->
        <div class="sp-card">
          <div class="sp-card-title">
            <span>👩‍🏫 Teacher’s Assessment</span>
            <span style="font-size: 6pt; color: #16a34a;">Exemplary Rating</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5px 3px; font-size: 6.2pt; background: #f8fafc; padding: 2px 4px; border-radius: 3px; margin-bottom: 2px;">
            <div>Acad: <strong>${(d.teacherRatings && d.teacherRatings.academic) || "Excellent"}</strong></div>
            <div>Discipline: <strong>${(d.teacherRatings && d.teacherRatings.discipline) || "Excellent"}</strong></div>
            <div>Regularity: <strong>${(d.teacherRatings && d.teacherRatings.regularity) || "Excellent"}</strong></div>
            <div>Teamwork: <strong>${(d.teacherRatings && d.teacherRatings.teamwork) || "Excellent"}</strong></div>
          </div>
          <div style="font-size: 6.4pt; font-style: italic; color: #1e293b; line-height: 1.2;">
            “${escapeHtml(d.teacherRemarks || "Demonstrates remarkable growth and innovative spirit.")}”
          </div>
        </div>

        <!-- Parent's Feedback -->
        <div class="sp-card">
          <div class="sp-card-title"><span>👨‍👩‍👦 Parent’s Feedback</span></div>
          <div style="font-size: 6.4pt; line-height: 1.2; color: #334155;">
            <strong>Strengths:</strong> ${escapeHtml(d.parentStrengths || "Curious, disciplined, and hard working")}.<br>
            <strong>Suggestions:</strong> ${escapeHtml(d.parentSuggestions || "Encourage further competitive participation")}.
          </div>
        </div>

      </div>

    </div>

    <!-- 4. Bottom Signatures Strip -->
    <div class="sp-footer">
      <div class="sp-declaration-quote">
        “I have completed this portfolio with honesty and have reflected upon my learning, achievements, strengths and areas for improvement.”
      </div>
      <div class="sp-signatures-grid">
        <div class="sp-sig-col">
          <div class="sp-sig-line"></div>
          <strong>${name}</strong>
          <p>Student Signature • ${escapeHtml(d.studentSignDate || "2027")}</p>
        </div>
        <div class="sp-sig-col">
          <div class="sp-sig-line"></div>
          <strong>${teacher}</strong>
          <p>Class Teacher • ${escapeHtml(d.teacherSignDate || "2027")}</p>
        </div>
        <div class="sp-sig-col">
          <div class="sp-sig-line"></div>
          <strong>Principal / Seal</strong>
          <p>${school} • Verified Record</p>
        </div>
      </div>
    </div>
  `;
  requestAnimationFrame(applySheetScale);
}

// Print Single Page Function
function printSinglePage() {
  readFormToData();
  renderPreview(currentData);
  window.print();
}

// Window print event listeners for clean centered printing and smooth screen restoration
window.addEventListener("beforeprint", function() {
  const scaler = document.getElementById("sheetScaler");
  if (scaler) {
    scaler.dataset.prevTransform = scaler.style.transform || "";
    scaler.dataset.prevWidth = scaler.style.width || "";
    scaler.dataset.prevHeight = scaler.style.height || "";
    scaler.style.transform = "none";
    scaler.style.width = "100%";
    scaler.style.height = "auto";
    scaler.style.margin = "0 auto";
  }
});

window.addEventListener("afterprint", function() {
  const scaler = document.getElementById("sheetScaler");
  if (scaler) {
    if (scaler.dataset.prevTransform) scaler.style.transform = scaler.dataset.prevTransform;
    if (scaler.dataset.prevWidth) scaler.style.width = scaler.dataset.prevWidth;
    if (scaler.dataset.prevHeight) scaler.style.height = scaler.dataset.prevHeight;
    delete scaler.dataset.prevTransform;
    delete scaler.dataset.prevWidth;
    delete scaler.dataset.prevHeight;
  }
  applySheetScale();
});

// Reset / Load Sample
function loadSampleData() {
  if (confirm("Load official sample data from portfolio.docx (SHM Academy)? Current unsaved edits will be replaced.")) {
    currentData = Object.assign({}, SAMPLE_SHM_STUDENT);
    syncDataToForm(currentData);
    renderPreview(currentData);
    saveToLocalStorage();
  }
}

function clearForm() {
  if (confirm("Are you sure you want to clear the form?")) {
    currentData = {
      schoolName: "SHM ACADEMY",
      schoolMotto: "“Infinite Knowledge Through Education”",
      academicSession: "2026–2027",
      studentName: "",
      classSection: "",
      rollNo: "",
      admissionNo: "",
      dob: "",
      fatherName: "",
      motherName: "",
      contactNo: "",
      house: "",
      classTeacher: "",
      photoUrl: "assets/logo.svg",
      aboutSentence: "",
      interests: "",
      hobbies: "",
      strength1: "",
      strength2: "",
      strength3: "",
      improveOne: "",
      shortGoal: "",
      longGoal: "",
      goalsChecked: [false, false, false, false, false, false],
      academics: [
        { subject: "English", t1: "", mid: "", t2: "", remarks: "" },
        { subject: "Hindi", t1: "", mid: "", t2: "", remarks: "" },
        { subject: "Mathematics", t1: "", mid: "", t2: "", remarks: "" },
        { subject: "Science", t1: "", mid: "", t2: "", remarks: "" },
        { subject: "Social Science", t1: "", mid: "", t2: "", remarks: "" },
        { subject: "Computer / IT", t1: "", mid: "", t2: "", remarks: "" },
        { subject: "Other", t1: "", mid: "", t2: "", remarks: "" }
      ],
      academicAchievement: "",
      skills: {
        communication: "5.0", reading: "5.0", writing: "5.0", creativity: "5.0",
        problemSolving: "5.0", teamwork: "5.0", leadership: "5.0", timeManagement: "5.0", digitalSkills: "5.0"
      },
      activities: [],
      achievements: [],
      proj1Title: "", proj1Did: "", proj1Learned: "",
      proj2Title: "", proj2Did: "", proj2Learned: "",
      participationChecks: [], memorableActivity: "",
      refLearn: "", refAchieve: "", refChallenge: "", refOvercome: "", refBetter: "",
      bestWorkNote: "",
      teacherRatings: {
        academic: "Good", discipline: "Good", regularity: "Good", communication: "Good",
        participation: "Good", teamwork: "Good", leadership: "Good", creativity: "Good"
      },
      teacherRemarks: "", teacherSignDate: "",
      parentStrengths: "", parentImprove: "", parentSuggestions: "", parentSignDate: "",
      improvementPlans: [],
      yearAchievement: "", yearFavSubject: "", yearFavActivity: "", yearAward: "",
      yearNewLearned: "", yearProudOf: "", yearGoalNext: "",
      studentSignDate: "", principalRemarks: ""
    };
    syncDataToForm(currentData);
    renderPreview(currentData);
    saveToLocalStorage();
  }
}

// Export JSON
function exportJson() {
  readFormToData();
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentData, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `${currentData.studentName || "student"}_portfolio.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

// Import JSON
function importJson(inputEl) {
  const file = inputEl.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        currentData = JSON.parse(e.target.result);
        syncDataToForm(currentData);
        renderPreview(currentData);
        saveToLocalStorage();
        alert("Portfolio data imported successfully!");
      } catch(err) {
        alert("Invalid JSON file format.");
      }
    };
    reader.readAsText(file);
  }
}

// Helper: Escape HTML
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Global hooks
window.printSinglePage = printSinglePage;
window.loadSampleData = loadSampleData;
window.clearForm = clearForm;
window.exportJson = exportJson;
window.importJson = importJson;
window.addActivityRow = addActivityRow;
window.addAchievementRow = addAchievementRow;
window.addPlanRow = addPlanRow;
window.updateActivity = updateActivity;
window.updateAchievement = updateAchievement;
window.updatePlan = updatePlan;
window.goToStep = goToStep;
window.nextStep = nextStep;
window.prevStep = prevStep;
window.setSectionDisplayMode = setSectionDisplayMode;
window.jumpToSection = jumpToSection;
window.setViewMode = setViewMode;
window.toggleMobilePreview = toggleMobilePreview;
window.setPreviewZoom = setPreviewZoom;
window.applySheetScale = applySheetScale;
