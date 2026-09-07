/**
 * Student Digital Portfolio Dynamic Renderer & Interactivity
 * Integrated with 3 Technology Teams & The Activity Cycle (Learn -> Make -> Show -> Record)
 */

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const studentId = urlParams.get("id");
  const schoolConfig = DataStore.getSchoolConfig();
  const student = DataStore.getStudentById(studentId);

  if (!student) {
    alert("Student record not found!");
    window.location.href = "index.html";
    return;
  }

  // Populate School Brand
  document.querySelectorAll(".school-name-text").forEach(el => el.textContent = schoolConfig.schoolName);
  document.querySelectorAll(".school-year-text").forEach(el => el.textContent = schoolConfig.academicYear);

  // Update Page Title
  document.title = `${student.name} - Digital Portfolio | ${schoolConfig.schoolName}`;

  // =============================================================
  // CHILD OVERALL PERFORMANCE GRAPH & INDIVIDUAL SUBJECT PORTFOLIOS
  // =============================================================
  const DEFAULT_SUBJECTS_LIST = [
    { id: "mathematics", name: "Mathematics", code: "041", icon: "📐", teacher: "Mrs. Sunita Roy", role: "PGT Mathematics & Subject Mentor" },
    { id: "science", name: "Science", code: "086", icon: "🔬", teacher: "Dr. Amit Saxena", role: "PGT Science & Practical Head" },
    { id: "computer_it", name: "Computer / IT", code: "402", icon: "💻", teacher: "Mr. Umesh Tripathi", role: "Faculty - Computer Science & AI" },
    { id: "english", name: "English", code: "184", icon: "📖", teacher: "Mrs. Ritu Verma", role: "TGT English Language & Literature" },
    { id: "social_science", name: "Social Science", code: "087", icon: "🌍", teacher: "Mr. Rajeshwar Pandey", role: "PGT Social Science & History" },
    { id: "hindi", name: "Hindi", code: "002", icon: "🇮🇳", teacher: "Mrs. Shashi Prabha", role: "TGT Hindi Literature & Language" },
    { id: "ai", name: "Artificial Intelligence", code: "417", icon: "🤖", teacher: "Mr. Umesh Tripathi", role: "Faculty - AI & Emerging Technologies" }
  ];

  const DEFAULT_SUBJECT_PORTFOLIOS_MAP = {
    "mathematics": {
      subject: "Mathematics",
      subjectCode: "041",
      subjectIcon: "📐",
      subjectTeacher: "Mrs. Sunita Roy",
      subjectTeacherRole: "PGT Mathematics & Subject Mentor",
      evalPhases: [
        { phase: "Term 1 Exam", maxMarks: "100", marksScored: "96", remarks: "Fast analytical reasoning" },
        { phase: "Mid Term Exam", maxMarks: "100", marksScored: "98", remarks: "Outstanding problem solving" },
        { phase: "Term 2 Exam", maxMarks: "100", marksScored: "99", remarks: "Near perfect score in geometry" },
        { phase: "Portfolio / Notebook", maxMarks: "20", marksScored: "20", remarks: "Exemplary neatness" },
        { phase: "Math Lab Practical", maxMarks: "10", marksScored: "10", remarks: "Active participation in geometry labs" }
      ],
      totalScore: "98.0",
      grade: "A1",
      teacherRemarks: "Exhibits extraordinary mathematical intuition and analytical clarity. Consistently excels in problem-solving competitions.",
      teacherSignDate: "15 March 2027",
      favTopic: "Coordinate Geometry, Quadratic Equations & Heights",
      subjectGoal: "Score 100% in CBSE Mathematics Board Exam and clear Math Olympiad.",
      proj1Title: "Geometric Proofs & 3D Polyhedron Construction",
      proj1Desc: "Constructed precise 3D geometric polyhedrons to physically demonstrate surface area and volume equations.",
      proj2Title: "Statistical Survey & Cumulative Frequency Ogive Curves",
      proj2Desc: "Gathered school demographic and attendance datasets, computing mean, median, mode, and ogives."
    },
    "science": {
      subject: "Science",
      subjectCode: "086",
      subjectIcon: "🔬",
      subjectTeacher: "Dr. Amit Saxena",
      subjectTeacherRole: "PGT Science & Practical Head",
      evalPhases: [
        { phase: "Term 1 Exam", maxMarks: "100", marksScored: "94", remarks: "Solid physics laws understanding" },
        { phase: "Mid Term Exam", maxMarks: "100", marksScored: "95", remarks: "Excellent chemistry recall" },
        { phase: "Term 2 Exam", maxMarks: "100", marksScored: "97", remarks: "Outstanding practical lab application" },
        { phase: "Portfolio / Notebook", maxMarks: "20", marksScored: "20", remarks: "Complete verified diagrams" },
        { phase: "Science Lab Practical", maxMarks: "10", marksScored: "10", remarks: "Distinction in circuit and optics labs" }
      ],
      totalScore: "95.3",
      grade: "A1",
      teacherRemarks: "Exceptional scientific inquiry and dedication in the laboratory. Demonstrates great maturity in scientific prototyping.",
      teacherSignDate: "15 March 2027",
      favTopic: "Ohm's Law, Electrical Resistance & Plant Biology",
      subjectGoal: "Achieve Gold Medal in National Science Olympiad and develop assistive agricultural IoT sensors.",
      proj1Title: "Automated Soil Moisture Sensor & Irrigation System",
      proj1Desc: "Assembled capacitive moisture sensors with Arduino Uno and 5V mini relay water pump.",
      proj2Title: "Plant Cell Osmosis & Diffusion Microscopic Study",
      proj2Desc: "Observed onion epidermal cells under 400x magnification across hypertonic and hypotonic solutions."
    },
    "computer_it": {
      subject: "Computer / IT",
      subjectCode: "402",
      subjectIcon: "💻",
      subjectTeacher: "Mr. Umesh Tripathi",
      subjectTeacherRole: "Faculty - Computer Science & AI",
      evalPhases: [
        { phase: "Term 1 Exam", maxMarks: "100", marksScored: "98", remarks: "Class topper in coding" },
        { phase: "Mid Term Exam", maxMarks: "100", marksScored: "99", remarks: "Flawless practical exam" },
        { phase: "Term 2 Exam", maxMarks: "100", marksScored: "100", remarks: "Perfect 100/100 in programming & database" },
        { phase: "Portfolio / Practical File", maxMarks: "20", marksScored: "20", remarks: "Verified lab code" },
        { phase: "Hands-on Lab Exam & Viva", maxMarks: "10", marksScored: "10", remarks: "Outstanding viva voce" }
      ],
      totalScore: "99.0",
      grade: "A1",
      teacherRemarks: "Exemplary coder and top technology achiever. Leads peer workshops and builds real-world applications.",
      teacherSignDate: "15 March 2027",
      favTopic: "Relational Databases, Python Automation & Web Layouts",
      subjectGoal: "Publish an open-source CBSE study portal and represent school in national hackathons.",
      proj1Title: "Interactive CBSE Study Portal & Flashcard Quiz",
      proj1Desc: "Built responsive study portal with chapter notes, timed MCQ practice tests, and instant score charts.",
      proj2Title: "Automated Student Digital Portfolio Engine",
      proj2Desc: "Engineered single-page A4 printing system with dynamic SVG child performance graphs and teacher review sync."
    },
    "english": {
      subject: "English",
      subjectCode: "184",
      subjectIcon: "📖",
      subjectTeacher: "Mrs. Ritu Verma",
      subjectTeacherRole: "TGT English Language & Literature",
      evalPhases: [
        { phase: "Term 1 Exam", maxMarks: "100", marksScored: "91", remarks: "Strong comprehension" },
        { phase: "Mid Term Exam", maxMarks: "100", marksScored: "92", remarks: "Insightful literary analysis" },
        { phase: "Term 2 Exam", maxMarks: "100", marksScored: "94", remarks: "Exemplary essay writing" },
        { phase: "Portfolio / Notebook", maxMarks: "20", marksScored: "19", remarks: "Neat assignments and reading logs" },
        { phase: "ASL / Speaking & Listening", maxMarks: "10", marksScored: "10", remarks: "Flawless speech delivery" }
      ],
      totalScore: "92.3",
      grade: "A1",
      teacherRemarks: "Articulate, expressive speaker and thoughtful writer with rich vocabulary. Demonstrates remarkable sensitivity in literary analysis.",
      teacherSignDate: "15 March 2027",
      favTopic: "Analytical Essay Writing & Classic Literary Dramas",
      subjectGoal: "Represent school in National Debate Championship and publish articles in student journals.",
      proj1Title: "Creative Writing Anthology & Thematic Essays",
      proj1Desc: "Authored original short stories and reflective character sketches exploring ethical dilemmas.",
      proj2Title: "Inter-School Debate Speech on AI in Education",
      proj2Desc: "Formulated constructive arguments with empirical evidence analyzing the societal impact of AI tools."
    },
    "social_science": {
      subject: "Social Science",
      subjectCode: "087",
      subjectIcon: "🌍",
      subjectTeacher: "Mr. Rajeshwar Pandey",
      subjectTeacherRole: "PGT Social Science & History",
      evalPhases: [
        { phase: "Term 1 Exam", maxMarks: "100", marksScored: "90", remarks: "Accurate historical recall" },
        { phase: "Mid Term Exam", maxMarks: "100", marksScored: "91", remarks: "Great cartographic and map work" },
        { phase: "Term 2 Exam", maxMarks: "100", marksScored: "93", remarks: "Detailed answers with citations" },
        { phase: "Portfolio / Notebook", maxMarks: "20", marksScored: "19", remarks: "Complete notes and project files" },
        { phase: "Project & Map Activity", maxMarks: "10", marksScored: "10", remarks: "Distinction in water conservation survey" }
      ],
      totalScore: "91.3",
      grade: "A1",
      teacherRemarks: "Inquisitive learner with keen interest in constitutional governance and historical cause-effect relationships.",
      teacherSignDate: "15 March 2027",
      favTopic: "Indian National Movement & Water Harvesting Systems",
      subjectGoal: "Score 95%+ in Social Science and present a research monograph on local heritage conservation.",
      proj1Title: "Comparative Survey of Traditional Indian Water Harvesting",
      proj1Desc: "Investigated traditional Stepwells (Baolis), Johads, and Kunds in semi-arid regions of India.",
      proj2Title: "Chronological Interactive Map of Indian Freedom Struggle",
      proj2Desc: "Mapped historic pathways of the Dandi Salt March, Champaran Satyagraha, and Non-Cooperation movement."
    },
    "hindi": {
      subject: "Hindi",
      subjectCode: "002",
      subjectIcon: "🇮🇳",
      subjectTeacher: "Mrs. Shashi Prabha",
      subjectTeacherRole: "TGT Hindi Literature & Language",
      evalPhases: [
        { phase: "Term 1 Exam", maxMarks: "100", marksScored: "88", remarks: "व्याकरण में संतोषजनक" },
        { phase: "Mid Term Exam", maxMarks: "100", marksScored: "89", remarks: "सुंदर सुलेख एवं अभिव्यक्ति" },
        { phase: "Term 2 Exam", maxMarks: "100", marksScored: "90", remarks: "निबंध लेखन में श्रेष्ठता" },
        { phase: "Portfolio / Notebook", maxMarks: "20", marksScored: "18", remarks: "नियमित गृहकार्य" },
        { phase: "वाचन एवं श्रवण कौशल", maxMarks: "10", marksScored: "10", remarks: "स्पष्ट उच्चारण एवं वाचन" }
      ],
      totalScore: "89.0",
      grade: "A2",
      teacherRemarks: "सदा अनुशासित, अध्ययनशील एवं भाषा के प्रति निष्ठावान। रचनात्मक लेखन में निरंतर सराहनीय प्रगति।",
      teacherSignDate: "15 March 2027",
      favTopic: "हिंदी व्याकरण, मुहावरे एवं प्रेरक कविता पाठ",
      subjectGoal: "हिंदी निबंध एवं कविता वाचन प्रतियोगिता में विद्यालय का प्रतिनिधित्व करना।",
      proj1Title: "हिंदी निबंध एवं मौलिक कविता संकलन",
      proj1Desc: "पर्यावरण संरक्षण तथा आधुनिक विज्ञान के लाभ पर स्वरचित कविताओं एवं निबंधों का संग्रह तैयार किया।",
      proj2Title: "पत्र लेखन एवं संवाद कार्यशाला संचिका",
      proj2Desc: "दैनिक जीवन तथा सामाजिक विषयों पर औपचारिक पत्र एवं संवाद संकलित किए।"
    },
    "ai": {
      subject: "Artificial Intelligence",
      subjectCode: "417",
      subjectIcon: "🤖",
      subjectTeacher: "Mr. Umesh Tripathi",
      subjectTeacherRole: "Faculty - AI & Emerging Technologies",
      evalPhases: [
        { phase: "Term 1 Exam", maxMarks: "100", marksScored: "97", remarks: "Strong foundation in AI" },
        { phase: "Mid Term Exam", maxMarks: "100", marksScored: "99", remarks: "Outstanding model training" },
        { phase: "Term 2 Exam", maxMarks: "100", marksScored: "100", remarks: "Perfect score in computer vision" },
        { phase: "Portfolio / AI Project Log", maxMarks: "20", marksScored: "20", remarks: "Verified working model demo" },
        { phase: "Interactive Demo & Viva", maxMarks: "10", marksScored: "10", remarks: "Exceptional explanation of weights" }
      ],
      totalScore: "98.7",
      grade: "A1",
      teacherRemarks: "A visionary young AI builder with profound appreciation for societal ethics and responsible AI guardrails.",
      teacherSignDate: "15 March 2027",
      favTopic: "Computer Vision, Neural Networks & Generative AI Ethics",
      subjectGoal: "Deploy a computer vision recycling classifier for smart waste management in our school.",
      proj1Title: "Teachable Machine Interactive Recycling Classifier",
      proj1Desc: "Curated 1,200 labeled images to train a browser-based computer vision model detecting plastic vs paper.",
      proj2Title: "AI Ethics & Algorithmic Fairness Monograph",
      proj2Desc: "Researched ethical guardrails against algorithmic bias in automated facial and voice recognition."
    }
  };

  const OVERALL_PERF_DATA = {
    term1Avg: 92.4,
    midTermAvg: 94.6,
    term2Avg: 96.8,
    targetAvg: 98.5,
    cumulative: 94.8,
    attendance: student.attendance || "98.2%",
    rank: "1st in Class (STEM Scholar)",
    subjectScores: [
      { id: "mathematics", name: "Mathematics", short: "Math", score: 98 },
      { id: "science", name: "Science", short: "Sci", score: 95 },
      { id: "computer_it", name: "Computer / IT", short: "IT", score: 99 },
      { id: "english", name: "English", short: "Eng", score: 92 },
      { id: "social_science", name: "Social Science", short: "SST", score: 91 },
      { id: "hindi", name: "Hindi", short: "Hin", score: 89 }
    ]
  };

  function renderPortfolioPerformanceGraph(activeSubName) {
    const container = document.getElementById("portfolioPerfGraphContainer");
    if (!container) return;

    if (window.generateOverallPerformanceSvg) {
      container.innerHTML = window.generateOverallPerformanceSvg(OVERALL_PERF_DATA, activeSubName);
    } else {
      // Inline SVG generator
      const t1 = 92.4, mid = 94.6, t2 = 96.8, tgt = 98.5, cum = 94.8;
      const chartBottom = 135, chartTop = 45, chartHeight = chartBottom - chartTop;
      const getY = (val) => chartBottom - ((Math.max(70, Math.min(100, val)) - 70) / 30) * chartHeight;

      const p1 = { x: 42, y: getY(t1) };
      const p2 = { x: 92, y: getY(mid) };
      const p3 = { x: 142, y: getY(t2) };
      const p4 = { x: 192, y: getY(tgt) };

      const barChartBottom = 135, barMaxHeight = 85, avgLineY = barChartBottom - (cum / 100) * barMaxHeight;
      const barStartX = 238, barWidth = 24, barGap = 9;

      const activeNorm = String(activeSubName || "").toLowerCase().replace(/[^a-z0-9]/g, "");

      let barsSvg = "";
      OVERALL_PERF_DATA.subjectScores.forEach((s, idx) => {
        const bx = barStartX + idx * (barWidth + barGap);
        const scoreVal = Number(s.score) || 80;
        const bHeight = Math.max(8, (scoreVal / 100) * barMaxHeight);
        const by = barChartBottom - bHeight;
        const sNorm = String(s.name).toLowerCase().replace(/[^a-z0-9]/g, "");
        const isActive = activeNorm && (sNorm.includes(activeNorm) || activeNorm.includes(sNorm));

        const fill = isActive ? "url(#pActiveBarGrad)" : "#94a3b8";
        const stroke = isActive ? "#312e81" : "#64748b";
        const textColor = isActive ? "#312e81" : "#475569";
        const textWeight = isActive ? "900" : "700";

        barsSvg += `
          <g class="bar-group ${isActive ? "active-bar" : ""}">
            ${isActive ? `<text x="${bx + barWidth/2}" y="${by - 12}" text-anchor="middle" font-size="8pt" fill="#4338ca">★</text>` : ""}
            <text x="${bx + barWidth/2}" y="${by - 3}" text-anchor="middle" font-size="${isActive ? '8pt' : '7.2pt'}" font-weight="${textWeight}" fill="${textColor}">${scoreVal}%</text>
            <rect x="${bx}" y="${by}" width="${barWidth}" height="${bHeight}" rx="3" fill="${fill}" stroke="${stroke}" stroke-width="${isActive ? '1.5' : '0.8'}"/>
            <text x="${bx + barWidth/2}" y="${barChartBottom + 12}" text-anchor="middle" font-size="7pt" font-weight="${isActive ? '800' : '600'}" fill="${isActive ? '#1e1b4b' : '#64748b'}">${s.short}</text>
          </g>
        `;
      });

      container.innerHTML = `
        <svg viewBox="0 0 458 165" xmlns="http://www.w3.org/2000/svg" class="perf-graph-svg" style="width:100%; height:auto; display:block;">
          <defs>
            <linearGradient id="pTermAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#4f46e5" stop-opacity="0.32"/>
              <stop offset="100%" stop-color="#4f46e5" stop-opacity="0.02"/>
            </linearGradient>
            <linearGradient id="pActiveBarGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#4f46e5"/>
              <stop offset="100%" stop-color="#06b6d4"/>
            </linearGradient>
          </defs>
          <rect x="1" y="1" width="456" height="163" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
          <path d="M 1,1 L 457,1 L 457,25 L 1,25 Z" fill="#f8fafc"/>
          <line x1="1" y1="25" x2="457" y2="25" stroke="#e2e8f0" stroke-width="1"/>
          <text x="10" y="16.5" font-size="8.8pt" font-weight="800" fill="#0f172a">📈 CHILD OVERALL PERFORMANCE GRAPH</text>

          <rect x="235" y="5" width="70" height="15" rx="3" fill="#dcfce7" stroke="#86efac" stroke-width="0.8"/>
          <text x="270" y="15.5" text-anchor="middle" font-size="7.2pt" font-weight="800" fill="#166534">Avg: ${cum}%</text>
          <rect x="310" y="5" width="68" height="15" rx="3" fill="#e0e7ff" stroke="#a5b4fc" stroke-width="0.8"/>
          <text x="344" y="15.5" text-anchor="middle" font-size="7.2pt" font-weight="800" fill="#3730a3">Rank: 1st</text>
          <rect x="383" y="5" width="68" height="15" rx="3" fill="#fef3c7" stroke="#fcd34d" stroke-width="0.8"/>
          <text x="417" y="15.5" text-anchor="middle" font-size="7.2pt" font-weight="800" fill="#92400e">Trend: ↗ +4.4%</text>

          <text x="10" y="38" font-size="7.2pt" font-weight="700" fill="#475569">TERM PROGRESSION</text>
          <line x1="36" y1="${getY(80)}" x2="200" y2="${getY(80)}" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="2,2"/>
          <line x1="36" y1="${getY(90)}" x2="200" y2="${getY(90)}" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="2,2"/>
          <line x1="36" y1="${getY(100)}" x2="200" y2="${getY(100)}" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="2,2"/>

          <path d="M ${p1.x},${p1.y} L ${p2.x},${p2.y} L ${p3.x},${p3.y} L ${p4.x},${p4.y} L ${p4.x},${chartBottom} L ${p1.x},${chartBottom} Z" fill="url(#pTermAreaGrad)"/>
          <path d="M ${p1.x},${p1.y} L ${p2.x},${p2.y} L ${p3.x},${p3.y}" fill="none" stroke="#4338ca" stroke-width="2.2" stroke-linecap="round"/>
          <path d="M ${p3.x},${p3.y} L ${p4.x},${p4.y}" fill="none" stroke="#059669" stroke-width="1.8" stroke-dasharray="3,3"/>

          <circle cx="${p1.x}" cy="${p1.y}" r="3.2" fill="#ffffff" stroke="#4338ca" stroke-width="2"/>
          <text x="${p1.x}" y="${p1.y - 5}" text-anchor="middle" font-size="7.2pt" font-weight="800" fill="#1e1b4b">${t1}%</text>
          <text x="${p1.x}" y="${chartBottom + 12}" text-anchor="middle" font-size="6.8pt" font-weight="600" fill="#64748b">Term 1</text>

          <circle cx="${p2.x}" cy="${p2.y}" r="3.2" fill="#ffffff" stroke="#4338ca" stroke-width="2"/>
          <text x="${p2.x}" y="${p2.y - 5}" text-anchor="middle" font-size="7.2pt" font-weight="800" fill="#1e1b4b">${mid}%</text>
          <text x="${p2.x}" y="${chartBottom + 12}" text-anchor="middle" font-size="6.8pt" font-weight="600" fill="#64748b">Mid Term</text>

          <circle cx="${p3.x}" cy="${p3.y}" r="3.2" fill="#ffffff" stroke="#4338ca" stroke-width="2"/>
          <text x="${p3.x}" y="${p3.y - 5}" text-anchor="middle" font-size="7.2pt" font-weight="800" fill="#1e1b4b">${t2}%</text>
          <text x="${p3.x}" y="${chartBottom + 12}" text-anchor="middle" font-size="6.8pt" font-weight="600" fill="#64748b">Term 2</text>

          <circle cx="${p4.x}" cy="${p4.y}" r="3.2" fill="#ffffff" stroke="#059669" stroke-width="2"/>
          <text x="${p4.x}" y="${p4.y - 5}" text-anchor="middle" font-size="7.2pt" font-weight="800" fill="#059669">${tgt}%</text>
          <text x="${p4.x}" y="${chartBottom + 12}" text-anchor="middle" font-size="6.8pt" font-weight="600" fill="#059669">Target</text>

          <line x1="218" y1="30" x2="218" y2="152" stroke="#e2e8f0" stroke-width="1"/>
          <text x="228" y="38" font-size="7.2pt" font-weight="700" fill="#475569">SUBJECT BENCHMARKS</text>
          <line x1="234" y1="${avgLineY}" x2="445" y2="${avgLineY}" stroke="#b45309" stroke-width="1" stroke-dasharray="2,2"/>
          <text x="448" y="${avgLineY + 2}" text-anchor="start" font-size="6.2pt" font-weight="700" fill="#b45309">Avg</text>

          ${barsSvg}
        </svg>
      `;
    }
  }

  let currentActiveSubjectId = "mathematics";

  function renderPortfolioSubjectTabs() {
    const tabsContainer = document.getElementById("portfolioSubjectTabs");
    if (!tabsContainer) return;

    tabsContainer.innerHTML = "";
    DEFAULT_SUBJECTS_LIST.forEach(subj => {
      const subData = DEFAULT_SUBJECT_PORTFOLIOS_MAP[subj.id] || {};
      const isActive = subj.id === currentActiveSubjectId;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `subject-tab-btn ${isActive ? "active" : ""}`;
      btn.onclick = () => selectPortfolioSubject(subj.id);
      btn.innerHTML = `
        <span>${subj.icon || "📚"}</span>
        <span>${subj.name}</span>
        <span class="subject-pill-badge">${subData.grade || "A1"}</span>
      `;
      tabsContainer.appendChild(btn);
    });
  }

  function selectPortfolioSubject(subId) {
    currentActiveSubjectId = subId;
    renderPortfolioSubjectTabs();
    renderPortfolioSubjectDetails();
    const subData = DEFAULT_SUBJECT_PORTFOLIOS_MAP[subId];
    renderPortfolioPerformanceGraph(subData ? subData.subject : "Mathematics");
  }

  function renderPortfolioSubjectDetails() {
    const card = document.getElementById("portfolioSubjectDetailsCard");
    if (!card) return;

    const sub = DEFAULT_SUBJECT_PORTFOLIOS_MAP[currentActiveSubjectId] || DEFAULT_SUBJECT_PORTFOLIOS_MAP["mathematics"];
    const evalRows = (sub.evalPhases || []).map(p => `
      <tr>
        <td style="padding: 6px 10px; border-bottom: 1px solid #e2e8f0;"><strong>${p.phase}</strong></td>
        <td style="padding: 6px 10px; text-align: center; border-bottom: 1px solid #e2e8f0;">${p.maxMarks}</td>
        <td style="padding: 6px 10px; text-align: center; border-bottom: 1px solid #e2e8f0; font-weight: 700; color: #4338ca;">${p.marksScored}</td>
        <td style="padding: 6px 10px; text-align: center; border-bottom: 1px solid #e2e8f0; font-weight: 800;">${Math.round((Number(p.marksScored)/Number(p.maxMarks))*100)}%</td>
        <td style="padding: 6px 10px; border-bottom: 1px solid #e2e8f0; color: #475569;">${p.remarks}</td>
      </tr>
    `).join("");

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.25rem; padding-bottom: 0.85rem; border-bottom: 1.5px solid #e2e8f0;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span style="font-size: 2rem;">${sub.subjectIcon || "📚"}</span>
          <div>
            <h3 style="margin: 0; font-size: 1.4rem; font-weight: 900; color: #0f172a;">${sub.subject} Individual Portfolio</h3>
            <span style="font-size: 0.82rem; color: #475569;">Subject Code: <strong>${sub.subjectCode}</strong> • Teacher: <strong>${sub.subjectTeacher}</strong> (${sub.subjectTeacherRole})</span>
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <span class="badge badge-success" style="font-size: 0.85rem; padding: 0.4rem 0.8rem;">Final Grade: ${sub.grade} (${sub.totalScore}%)</span>
          <a href="builder.html" class="btn btn-primary btn-sm" style="background: #1e1b4b; border-color: #1e1b4b; font-weight: 700;">
            🖨️ Print 1-Page ${sub.subject} Portfolio
          </a>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.25rem; margin-bottom: 1.25rem;">
        <!-- Left: Academic Marks Table -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1rem;">
          <h4 style="margin: 0 0 0.75rem; font-size: 0.95rem; font-weight: 800; color: #1e1b4b;">📊 1-1 Subject Evaluation Record</h4>
          <table style="width: 100%; border-collapse: collapse; font-size: 0.82rem; background: #ffffff; border-radius: 6px; overflow: hidden;">
            <thead>
              <tr style="background: #eef2ff; color: #312e81; text-align: left;">
                <th style="padding: 6px 10px;">Phase</th>
                <th style="padding: 6px 10px; text-align: center;">Max</th>
                <th style="padding: 6px 10px; text-align: center;">Scored</th>
                <th style="padding: 6px 10px; text-align: center;">%</th>
                <th style="padding: 6px 10px;">Teacher Remarks</th>
              </tr>
            </thead>
            <tbody>
              ${evalRows}
            </tbody>
          </table>
          <div style="margin-top: 0.75rem; font-size: 0.78rem; color: #475569; display: flex; justify-content: space-between;">
            <span>Evaluated by: <strong>${sub.subjectTeacher}</strong></span>
            <span>Date: <strong>${sub.teacherSignDate || "15 March 2027"}</strong></span>
          </div>
        </div>

        <!-- Right: Projects & Learning Reflections -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1rem;">
          <h4 style="margin: 0 0 0.75rem; font-size: 0.95rem; font-weight: 800; color: #1e1b4b;">💡 Subject Projects & Practical Lab Work</h4>
          <div style="margin-bottom: 0.85rem; padding: 0.65rem; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px;">
            <strong style="color: #4338ca; font-size: 0.88rem; display: block;">1. ${sub.proj1Title}</strong>
            <p style="margin: 0.2rem 0 0; font-size: 0.8rem; color: #334155; line-height: 1.4;">${sub.proj1Desc}</p>
          </div>
          <div style="margin-bottom: 0.85rem; padding: 0.65rem; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px;">
            <strong style="color: #4338ca; font-size: 0.88rem; display: block;">2. ${sub.proj2Title}</strong>
            <p style="margin: 0.2rem 0 0; font-size: 0.8rem; color: #334155; line-height: 1.4;">${sub.proj2Desc}</p>
          </div>
          <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; padding: 0.65rem; font-size: 0.8rem; color: #065f46;">
            <strong>👩‍🏫 Subject Teacher Observation:</strong>
            <p style="margin: 0.2rem 0 0; font-style: italic;">“${sub.teacherRemarks}”</p>
          </div>
        </div>
      </div>
    `;
  }

  // Initialize Performance Graph & Subject Showcase
  renderPortfolioPerformanceGraph("Mathematics");
  renderPortfolioSubjectTabs();
  renderPortfolioSubjectDetails();


  // 1. HERO SECTION & TEAM BADGE
  const heroCover = document.getElementById("heroCover");
  if (heroCover && student.coverImage) heroCover.src = student.coverImage;

  const heroAvatar = document.getElementById("heroAvatar");
  if (heroAvatar && student.avatar) heroAvatar.src = student.avatar;

  const studentNameEl = document.getElementById("studentName");
  if (studentNameEl) studentNameEl.textContent = student.name;

  const teamBadgeHero = document.getElementById("teamBadgeHero");
  if (teamBadgeHero) {
    const team = (student.team || "it").toLowerCase();
    if (team === "it") {
      teamBadgeHero.innerHTML = `<span class="team-badge team-badge-it" style="font-size: 0.85rem; padding: 0.35rem 0.85rem;">💻 IT Team</span>`;
    } else if (team === "robotics") {
      teamBadgeHero.innerHTML = `<span class="team-badge team-badge-robotics" style="font-size: 0.85rem; padding: 0.35rem 0.85rem;">🤖 Robotics Team</span>`;
    } else if (team === "ai") {
      teamBadgeHero.innerHTML = `<span class="team-badge team-badge-ai" style="font-size: 0.85rem; padding: 0.35rem 0.85rem;">🧠 AI Team</span>`;
    }
  }

  const studentTeamRoleEl = document.getElementById("studentTeamRole");
  if (studentTeamRoleEl) {
    studentTeamRoleEl.textContent = student.teamRole || "Technology Team Contributor";
  }

  const studentClassTagEl = document.getElementById("studentClassTag");
  if (studentClassTagEl) {
    studentClassTagEl.textContent = `${student.class} — Section ${student.section} (Roll No. ${student.rollNo})`;
  }

  const studentTaglineEl = document.getElementById("studentTagline");
  if (studentTaglineEl) studentTaglineEl.textContent = student.tagline || "";

  const studentMottoEl = document.getElementById("studentMotto");
  if (studentMottoEl) studentMottoEl.textContent = student.motto || "";

  const studentBioEl = document.getElementById("studentBio");
  if (studentBioEl) studentBioEl.textContent = student.bio || "";

  const attendanceBadge = document.getElementById("attendanceBadge");
  if (attendanceBadge && student.attendance) {
    attendanceBadge.textContent = `Attendance: ${student.attendance}`;
  }

  const academicScoreBadge = document.getElementById("academicScoreBadge");
  if (academicScoreBadge && student.academicScore) {
    academicScoreBadge.textContent = `Academic: ${student.academicScore}`;
  }

  // 2. ACTIVITY CYCLE (Learn -> Make -> Show -> Record)
  const timelineGrid = document.getElementById("activityTimelineGrid");
  const activityProjectTitle = document.getElementById("activityProjectTitle");
  const activityProjectIcon = document.getElementById("activityProjectIcon");
  const activityCycleSub = document.getElementById("activityCycleSub");

  if (student.activityCycle && timelineGrid) {
    const ac = student.activityCycle;
    if (activityProjectTitle) activityProjectTitle.textContent = ac.projectName || "Core Activity Deliverable";
    
    const team = (student.team || "it").toLowerCase();
    if (activityProjectIcon) {
      activityProjectIcon.textContent = team === "robotics" ? "🤖" : (team === "ai" ? "🧠" : "💻");
    }

    if (activityCycleSub) {
      if (team === "it") {
        activityCycleSub.textContent = "IT Team Workflow: Learn Design/Formulas → Create 3-5 Digital Works → Present to School → Record 1-Min Video";
      } else if (team === "robotics") {
        activityCycleSub.textContent = "Robotics Team Workflow: Learn Circuit/Sensors → Build Working Robot → Live Demonstration → Record 1-Min Video";
      } else if (team === "ai") {
        activityCycleSub.textContent = "AI Team Workflow: Learn Machine Learning → Train AI Model → Live Interactive Demo → Record 1-Min Video";
      }
    }

    timelineGrid.innerHTML = `
      <!-- Step 1: Learn -->
      <div class="timeline-step">
        <div class="step-badge">1️⃣ LEARN</div>
        <h4 class="step-title">${ac.learn?.title || "Concept & Fundamentals"}</h4>
        <p class="step-desc">${ac.learn?.desc || "Explored key principles, studied tools and reviewed guidelines."}</p>
      </div>

      <!-- Step 2: Make -->
      <div class="timeline-step">
        <div class="step-badge">2️⃣ MAKE</div>
        <h4 class="step-title">${ac.make?.title || "Build Project"}</h4>
        <p class="step-desc">${ac.make?.desc || "Assembled circuits, created digital content, or trained models."}</p>
      </div>

      <!-- Step 3: Show -->
      <div class="timeline-step">
        <div class="step-badge">3️⃣ SHOW</div>
        <h4 class="step-title">${ac.show?.title || "Live Presentation"}</h4>
        <p class="step-desc">${ac.show?.desc || "Demonstrated live in front of class, teachers, or science expo."}</p>
      </div>

      <!-- Step 4: Record -->
      <div class="timeline-step">
        <div class="step-badge">4️⃣ RECORD</div>
        <h4 class="step-title">${ac.record?.title || "Record 1-Min Video"}</h4>
        <p class="step-desc">${ac.record?.desc || "Filmed concise video demo and collected evidence for digital portfolio."}</p>
      </div>
    `;
  }

  // 3. FINAL OUTPUT DELIVERABLES CHECKLIST
  const deliverablesBox = document.getElementById("deliverablesBox");
  if (deliverablesBox && student.outputDeliverables) {
    const out = student.outputDeliverables;
    const checklistHtml = (out.checklist || []).map(item => `
      <div class="checklist-item ${item.verified ? "verified" : ""}">
        <span class="checklist-icon">${item.icon || "✅"}</span>
        <div style="flex: 1;">
          <div style="font-weight: 700; font-size: 0.95rem;">${item.item}</div>
          <small style="color: var(--text-muted); font-size: 0.75rem;">Type: ${item.type}</small>
        </div>
        <span class="badge badge-success" style="font-size: 0.72rem;">${item.verified ? "Verified ✓" : "In Progress"}</span>
      </div>
    `).join("");

    deliverablesBox.innerHTML = `
      <div class="deliverables-header">
        <div>
          <span class="badge badge-warning" style="color: #78350f; margin-bottom: 0.35rem;">Track Target</span>
          <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-main);">${out.target}</h4>
        </div>
        <div class="badge badge-primary" style="font-size: 0.85rem; padding: 0.4rem 0.9rem;">
          ${out.status}
        </div>
      </div>
      <div class="checklist-grid">
        ${checklistHtml}
      </div>
    `;
  }

  // 4. 1-MINUTE INTRO VIDEO SECTION
  const videoSection = document.getElementById("videoSection");
  if (student.introVideo) {
    const v = student.introVideo;
    const videoTitleEl = document.getElementById("videoTitle");
    const videoDescEl = document.getElementById("videoDesc");
    const iframe = document.getElementById("videoIframe");

    if (videoTitleEl) videoTitleEl.textContent = v.title || "1-Minute Demonstration & Reflection";
    if (videoDescEl) videoDescEl.textContent = v.description || "";
    if (iframe && v.videoUrl) iframe.src = v.videoUrl;
  }

  // 5. PROJECTS SHOWCASE
  const projectsContainer = document.getElementById("projectsContainer");
  if (projectsContainer && student.projects) {
    projectsContainer.innerHTML = "";
    student.projects.forEach(proj => {
      const card = document.createElement("div");
      card.className = "project-card";
      
      const techTags = (proj.techStack || []).map(t => `<span class="tech-tag">${t}</span>`).join("");
      
      card.innerHTML = `
        <div class="project-thumb-wrap">
          <img src="${proj.image}" alt="${proj.title}" class="project-thumb" onerror="this.src='https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600'">
          <span class="project-category-chip">${proj.category || "Deliverable"}</span>
        </div>
        <div class="project-body">
          <h4 class="project-title">${proj.icon || "🚀"} ${proj.title}</h4>
          <p class="project-summary">${proj.summary}</p>
          
          <div class="project-tags">${techTags}</div>
          
          ${proj.impact ? `<div class="project-impact">⭐ ${proj.impact}</div>` : ""}

          <div class="project-footer">
            ${proj.liveDemoUrl ? `<a href="${proj.liveDemoUrl}" target="_blank" class="btn btn-primary btn-sm" style="flex: 1;">Live Demo 🔗</a>` : ""}
            ${proj.repoUrl ? `<a href="${proj.repoUrl}" target="_blank" class="btn btn-secondary btn-sm">Code / Source 💻</a>` : ""}
          </div>
        </div>
      `;
      projectsContainer.appendChild(card);
    });
  }

  // 6. BEFORE -> AFTER GROWTH RECORDS
  const growthContainer = document.getElementById("growthContainer");
  if (growthContainer && student.growthRecords) {
    growthContainer.innerHTML = "";
    student.growthRecords.forEach(record => {
      const card = document.createElement("div");
      card.className = "growth-card";
      card.innerHTML = `
        <div class="growth-skill-title">
          <span>${record.icon || "📈"}</span>
          <span>${record.skill}</span>
        </div>
        <div class="before-after-container">
          <div class="state-box state-before">
            <small style="font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 0.2rem;">⏳ Beginning of Year</small>
            ${record.before}
          </div>
          <div class="state-arrow">↓</div>
          <div class="state-box state-after">
            <small style="font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 0.2rem;">🚀 End of Year Progress</small>
            ${record.after}
          </div>
        </div>
      `;
      growthContainer.appendChild(card);
    });
  }

  // 7. 360° SCORECARD & COMPETENCY MATRIX
  const scorecardContainer = document.getElementById("scorecardContainer");
  if (scorecardContainer && student.scorecard) {
    scorecardContainer.innerHTML = "";
    student.scorecard.forEach(item => {
      const percentage = (item.level / 5) * 100;
      const fullStars = Math.floor(item.level);
      const hasHalf = item.level % 1 !== 0;
      let starStr = "★".repeat(fullStars) + (hasHalf ? "½" : "") + "☆".repeat(5 - Math.ceil(item.level));

      const card = document.createElement("div");
      card.className = "scorecard-item";
      card.innerHTML = `
        <div class="score-header">
          <span class="score-name">${item.area}</span>
          <span class="score-stars" title="${item.level} / 5">${starStr}</span>
        </div>
        <div class="score-bar-bg">
          <div class="score-bar-fill" style="width: ${percentage}%;"></div>
        </div>
        <p class="score-desc">${item.description || ""}</p>
      `;
      scorecardContainer.appendChild(card);
    });
  }

  // 8. ACHIEVEMENTS & CERTIFICATES
  const achievementsContainer = document.getElementById("achievementsContainer");
  if (achievementsContainer && student.achievements) {
    achievementsContainer.innerHTML = "";
    student.achievements.forEach(ach => {
      const card = document.createElement("div");
      card.className = "achievement-card";
      card.innerHTML = `
        <div class="achievement-badge-icon">${ach.badge || "🏆"}</div>
        <div class="achievement-info">
          <h4>${ach.title}</h4>
          <p>${ach.issuer} • <strong>${ach.year}</strong></p>
        </div>
      `;
      achievementsContainer.appendChild(card);
    });
  }

  // 9. CO-CURRICULAR & MEDIA GALLERY
  const galleryContainer = document.getElementById("galleryContainer");
  if (galleryContainer && student.gallery) {
    galleryContainer.innerHTML = "";
    student.gallery.forEach(item => {
      const el = document.createElement("div");
      el.className = "gallery-item";
      el.onclick = () => openImageModal(item.url, item.title);
      el.innerHTML = `
        <img src="${item.url}" alt="${item.title}" class="gallery-img" loading="lazy">
        <div class="gallery-overlay">
          <span class="gallery-tag">${item.category || "Gallery"}</span>
          <div class="gallery-title">${item.title}</div>
        </div>
      `;
      galleryContainer.appendChild(el);
    });
  }

  // 10. OBSERVATIONS & REMARKS
  if (student.teacherObservation) {
    const t = student.teacherObservation;
    const teacherRemarkText = document.getElementById("teacherRemarkText");
    const teacherNameEl = document.getElementById("teacherName");
    const teacherRoleEl = document.getElementById("teacherRole");
    const teacherAvatar = document.getElementById("teacherAvatar");
    const teacherRatingBadge = document.getElementById("teacherRatingBadge");

    if (teacherRemarkText) teacherRemarkText.textContent = `“${t.remark}”`;
    if (teacherNameEl) teacherNameEl.textContent = t.teacherName;
    if (teacherRoleEl) teacherRoleEl.textContent = `${t.role} • ${t.date || ""}`;
    if (teacherAvatar && t.avatar) teacherAvatar.src = t.avatar;
    if (teacherRatingBadge && t.rating) teacherRatingBadge.textContent = `Grade: ${t.rating}`;
  }

  if (student.parentNote) {
    const p = student.parentNote;
    const parentNoteText = document.getElementById("parentNoteText");
    const parentNameEl = document.getElementById("parentName");
    const parentDateEl = document.getElementById("parentDate");

    if (parentNoteText) parentNoteText.textContent = `“${p.note}”`;
    if (parentNameEl) parentNameEl.textContent = p.parentsName;
    if (parentDateEl) parentDateEl.textContent = `Parent Note • ${p.date || ""}`;
  }

  // 11. FUTURE GOALS
  const goalsContainer = document.getElementById("goalsContainer");
  if (goalsContainer && student.futureGoals) {
    goalsContainer.innerHTML = "";
    student.futureGoals.forEach(g => {
      const goalEl = document.createElement("div");
      goalEl.className = "goal-item";
      goalEl.innerHTML = `<span>🎯</span> <span>${g}</span>`;
      goalsContainer.appendChild(goalEl);
    });
  }

  // Set ID card link
  const idCardLink = document.getElementById("idCardLink");
  if (idCardLink) {
    idCardLink.href = `id-card.html?id=${encodeURIComponent(student.id)}`;
  }

  // Setup QR Code Modal
  const qrModalBtn = document.getElementById("qrModalBtn");
  const qrModal = document.getElementById("qrModal");
  const closeQrModal = document.getElementById("closeQrModal");
  const qrCodeBox = document.getElementById("qrCodeBox");

  if (qrModalBtn && qrModal && qrCodeBox) {
    let qrGenerated = false;
    qrModalBtn.addEventListener("click", () => {
      qrModal.classList.add("active");
      if (!qrGenerated) {
        qrCodeBox.innerHTML = "";
        new QRCode(qrCodeBox, {
          text: window.location.href,
          width: 200,
          height: 200,
          colorDark: "#0f172a",
          colorLight: "#ffffff"
        });
        qrGenerated = true;
      }
    });

    if (closeQrModal) {
      closeQrModal.addEventListener("click", () => qrModal.classList.remove("active"));
    }
    qrModal.addEventListener("click", (e) => {
      if (e.target === qrModal) qrModal.classList.remove("active");
    });
  }

  // Share Portfolio Button
  const shareBtn = document.getElementById("shareBtn");
  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      if (navigator.share) {
        navigator.share({
          title: `${student.name}'s Digital Portfolio`,
          text: `Check out ${student.name}'s verified school portfolio for academic year ${schoolConfig.academicYear}!`,
          url: window.location.href
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
          const originalText = shareBtn.innerHTML;
          shareBtn.innerHTML = "Copied Link! ✅";
          setTimeout(() => shareBtn.innerHTML = originalText, 2000);
        });
      }
    });
  }

  // Lightbox Image Viewer
  window.openImageModal = function(url, title) {
    const modal = document.getElementById("imageLightboxModal");
    const img = document.getElementById("lightboxImage");
    const caption = document.getElementById("lightboxCaption");
    if (modal && img) {
      img.src = url;
      if (caption) caption.textContent = title || "";
      modal.classList.add("active");
    }
  };

  const closeLightbox = document.getElementById("closeLightbox");
  const imageLightboxModal = document.getElementById("imageLightboxModal");
  if (closeLightbox && imageLightboxModal) {
    closeLightbox.addEventListener("click", () => imageLightboxModal.classList.remove("active"));
    imageLightboxModal.addEventListener("click", (e) => {
      if (e.target === imageLightboxModal) imageLightboxModal.classList.remove("active");
    });
  }

  // Portfolio Review Status & Submission
  function updatePortfolioReviewBadge() {
    const badge = document.getElementById("reviewStatusHeroBadge");
    const sendBtn = document.getElementById("btnSendPortfolioReview");
    if (!badge) return;

    let sub = null;
    if (window.PortfolioReviewStore) {
      sub = window.PortfolioReviewStore.getByStudent(student.name, `${student.class} - ${student.section}`) || window.PortfolioReviewStore.getByStudent(student.name);
    }

    if (sub && sub.status === "approved") {
      badge.style.display = "inline-block";
      badge.className = "badge badge-success";
      badge.innerHTML = `🟢 Verified by ${sub.reviewedBy || "Teacher"}`;
      if (sendBtn) {
        sendBtn.innerHTML = `<span>✅</span> <span>Review Approved</span>`;
        sendBtn.style.background = "#16a34a";
        sendBtn.style.borderColor = "#16a34a";
      }
    } else if (sub && sub.status === "pending") {
      badge.style.display = "inline-block";
      badge.className = "badge badge-warning";
      badge.style.color = "#78350f";
      badge.innerHTML = `🟡 Review Pending (${sub.submittedAtFormatted ? sub.submittedAtFormatted.split(',')[0] : 'Submitted'})`;
      if (sendBtn) {
        sendBtn.innerHTML = `<span>⌛</span> <span>Review Pending</span>`;
        sendBtn.style.background = "#d97706";
        sendBtn.style.borderColor = "#d97706";
      }
    } else {
      badge.style.display = "none";
    }
  }
  updatePortfolioReviewBadge();

  window.sendActivePortfolioForReview = function() {
    if (!window.PortfolioReviewStore) return;

    const teacherName = (student.teacherObservation && student.teacherObservation.teacherName) || "Class Teacher";
    const note = prompt(`Send ${student.name}'s portfolio profile for Teacher Review?\n\nEnter optional note for teacher:`, "Please review my digital portfolio deliverables and project evidence.");
    if (note === null) return; // User cancelled

    window.PortfolioReviewStore.submitReview({
      studentName: student.name,
      classSection: `${student.class} - ${student.section}`,
      rollNo: student.rollNo,
      admissionNo: student.id,
      targetTeacher: teacherName,
      studentNote: note.trim(),
      data: student
    });

    updatePortfolioReviewBadge();
    alert(`✅ Portfolio profile for ${student.name} successfully saved and sent for teacher review!\n\nStatus: Pending Teacher Review\nAssigned: ${teacherName}\n\nYour portfolio is now queued for teacher assessment.`);
  };

  window.addEventListener("portfolio-review-submitted", updatePortfolioReviewBadge);
  window.addEventListener("portfolio-review-updated", updatePortfolioReviewBadge);
});

