/**
 * Student Portfolio Builder & 1-Page Print Controller
 * Matches 100% of portfolio.docx (SHM Academy)
 */


// =============================================================
// INDIVIDUAL SUBJECT PORTFOLIOS MASTER CONFIGURATION
// 1-1 Subject and Teacher Focus & Child Overall Performance Graph
// =============================================================
const DEFAULT_SUBJECTS = [
  { id: "mathematics", name: "Mathematics", code: "041", icon: "📐", teacher: "Mrs. Sunita Roy", role: "PGT Mathematics & Subject Mentor" },
  { id: "science", name: "Science", code: "086", icon: "🔬", teacher: "Dr. Amit Saxena", role: "PGT Science & Practical Head" },
  { id: "computer_it", name: "Computer / IT", code: "402", icon: "💻", teacher: "Mr. Umesh Tripathi", role: "Faculty - Computer Science & AI" },
  { id: "english", name: "English", code: "184", icon: "📖", teacher: "Mrs. Ritu Verma", role: "TGT English Language & Literature" },
  { id: "social_science", name: "Social Science", code: "087", icon: "🌍", teacher: "Mr. Rajeshwar Pandey", role: "PGT Social Science & History" },
  { id: "hindi", name: "Hindi", code: "002", icon: "🇮🇳", teacher: "Mrs. Shashi Prabha", role: "TGT Hindi Literature & Language" },
  { id: "ai", name: "Artificial Intelligence", code: "417", icon: "🤖", teacher: "Mr. Umesh Tripathi", role: "Faculty - AI & Emerging Technologies" }
];

const DEFAULT_SUBJECT_PORTFOLIOS = {
  "mathematics": {
    id: "mathematics",
    subject: "Mathematics",
    subjectCode: "041",
    subjectIcon: "📐",
    subjectTeacher: "Mrs. Sunita Roy",
    subjectTeacherRole: "PGT Mathematics & Subject Mentor",
    evalPhases: [
      { phase: "Term 1 Examination", maxMarks: "100", marksScored: "96", remarks: "Fast analytical reasoning and precision" },
      { phase: "Mid Term Examination", maxMarks: "100", marksScored: "98", remarks: "Outstanding problem solving in algebra" },
      { phase: "Term 2 Examination", maxMarks: "100", marksScored: "99", remarks: "Near perfect score in geometry theorems" },
      { phase: "Portfolio / Notebook Submission", maxMarks: "20", marksScored: "20", remarks: "Exemplary neatness, on-time submission" },
      { phase: "Practical / Math Lab Assessment", maxMarks: "10", marksScored: "10", remarks: "Active participation in geometry labs" }
    ],
    totalScore: "98.0",
    grade: "A1",
    teacherRemarks: "Aarav exhibits extraordinary mathematical intuition, consistently applying algebraic concepts to complex real-world models with remarkable clarity.",
    teacherSignDate: "15 March 2027",
    favTopic: "Coordinate Geometry, Quadratic Equations & Heights",
    subjectGoal: "Attain 100% in CBSE Mathematics Board Examination and clear National Math Olympiad.",
    subjectReflection: "Mastered multi-step proofs, reduced calculation errors, and learned to visualize theorems using 3D models.",
    proj1Title: "Geometric Proofs & 3D Polyhedron Construction",
    proj1Did: "Constructed precise 3D geometric polyhedrons to physically demonstrate surface area and volume equations.",
    proj1Learned: "Applied theoretical spatial geometry formulas to tangible scaled models.",
    proj2Title: "Statistical Survey & Cumulative Frequency Ogive Curves",
    proj2Did: "Gathered school demographic and attendance datasets, computing mean, median, mode, and ogives.",
    proj2Learned: "Data classification, cumulative frequency curves, and statistical variance.",
    competencies: {
      conceptClarity: "5.0",
      problemSolving: "5.0",
      practicalLabWork: "4.8",
      portfolioRegularity: "5.0",
      regularityHomework: "4.9",
      vivaCommunication: "4.7"
    },
    improvementPlan: {
      area: "Speed in Advanced Trigonometric Identity Proofs",
      plan: "Solve 5 theorem questions daily from NCERT Exemplar",
      target: "Term 2",
      progress: "95% Achieved"
    }
  },

  "science": {
    id: "science",
    subject: "Science",
    subjectCode: "086",
    subjectIcon: "🔬",
    subjectTeacher: "Dr. Amit Saxena",
    subjectTeacherRole: "PGT Science & Practical Head",
    evalPhases: [
      { phase: "Term 1 Examination", maxMarks: "100", marksScored: "94", remarks: "Solid understanding of physics laws" },
      { phase: "Mid Term Examination", maxMarks: "100", marksScored: "95", remarks: "Excellent chemistry reactions recall" },
      { phase: "Term 2 Examination", maxMarks: "100", marksScored: "97", remarks: "Outstanding practical lab application" },
      { phase: "Portfolio / Notebook Submission", maxMarks: "20", marksScored: "20", remarks: "Complete diagrams, verified records" },
      { phase: "Practical / Lab Assessment", maxMarks: "10", marksScored: "10", remarks: "Distinction in circuit and optics labs" }
    ],
    totalScore: "95.3",
    grade: "A1",
    teacherRemarks: "Exceptional scientific inquiry and dedication in the laboratory. Demonstrates great maturity in scientific prototyping.",
    teacherSignDate: "15 March 2027",
    favTopic: "Ohm's Law, Electrical Resistance & Plant Biology",
    subjectGoal: "Achieve Gold Medal in National Science Olympiad and develop assistive agricultural IoT sensors.",
    subjectReflection: "Gained immense confidence in circuit breadboarding, sensor probe calibration, and hypothesis testing.",
    proj1Title: "Automated Soil Moisture Sensor & Irrigation System",
    proj1Did: "Assembled capacitive moisture sensors with Arduino Uno and 5V mini relay water pump.",
    proj1Learned: "Analog-to-digital signal conversion, circuit safety, and plant water conservation.",
    proj2Title: "Plant Cell Osmosis & Diffusion Microscopic Study",
    proj2Did: "Observed onion epidermal cells under 400x magnification across hypertonic and hypotonic solutions.",
    proj2Learned: "Cell wall permeability, vacuole turgidity, and biological staining procedures.",
    competencies: {
      conceptClarity: "4.9",
      problemSolving: "4.8",
      practicalLabWork: "5.0",
      portfolioRegularity: "5.0",
      regularityHomework: "4.8",
      vivaCommunication: "4.6"
    },
    improvementPlan: {
      area: "Chemical Equation Balancing Speed",
      plan: "Practice redox and precipitation reactions weekly",
      target: "Mid Term",
      progress: "Completed"
    }
  },

  "computer_it": {
    id: "computer_it",
    subject: "Computer / IT",
    subjectCode: "402",
    subjectIcon: "💻",
    subjectTeacher: "Mr. Umesh Tripathi",
    subjectTeacherRole: "Faculty - Computer Science & AI",
    evalPhases: [
      { phase: "Term 1 Examination", maxMarks: "100", marksScored: "98", remarks: "Class topper in coding fundamentals" },
      { phase: "Mid Term Examination", maxMarks: "100", marksScored: "99", remarks: "Flawless practical exam execution" },
      { phase: "Term 2 Examination", maxMarks: "100", marksScored: "100", remarks: "Perfect 100/100 in programming & database" },
      { phase: "Portfolio / Practical File", maxMarks: "20", marksScored: "20", remarks: "Verified lab code with clean documentation" },
      { phase: "Hands-on Lab Exam & Viva", maxMarks: "10", marksScored: "10", remarks: "Outstanding viva voce performance" }
    ],
    totalScore: "99.0",
    grade: "A1",
    teacherRemarks: "Exemplary coder and top technology achiever. Leads peer workshops, builds real-world web applications, and demonstrates mastery.",
    teacherSignDate: "15 March 2027",
    favTopic: "Relational Databases, Python Automation & Web Layouts",
    subjectGoal: "Publish an open-source CBSE study portal and represent school in national hackathons.",
    subjectReflection: "Mastered responsive layouts, JSON structures, Git version control, and database query optimization.",
    proj1Title: "Interactive CBSE Study Portal & Flashcard Quiz",
    proj1Did: "Built responsive study portal with chapter notes, timed MCQ practice tests, and instant score charts.",
    proj1Learned: "CSS Grid & Flexbox, DOM manipulation, LocalStorage caching, and automated testing.",
    proj2Title: "Automated Student Digital Portfolio Engine",
    proj2Did: "Engineered single-page A4 printing system with dynamic SVG child performance graphs and teacher review sync.",
    proj2Learned: "Vector SVG coordinate mathematics, print CSS media queries, and responsive web typography.",
    competencies: {
      conceptClarity: "5.0",
      problemSolving: "5.0",
      practicalLabWork: "5.0",
      portfolioRegularity: "5.0",
      regularityHomework: "5.0",
      vivaCommunication: "4.9"
    },
    improvementPlan: {
      area: "Object-Oriented Design in Python",
      plan: "Build 3 modular CLI applications using classes and inheritance",
      target: "Term 2",
      progress: "Certified"
    }
  },

  "english": {
    id: "english",
    subject: "English",
    subjectCode: "184",
    subjectIcon: "📖",
    subjectTeacher: "Mrs. Ritu Verma",
    subjectTeacherRole: "TGT English Language & Literature",
    evalPhases: [
      { phase: "Term 1 Examination", maxMarks: "100", marksScored: "91", remarks: "Strong comprehension & vocabulary" },
      { phase: "Mid Term Examination", maxMarks: "100", marksScored: "92", remarks: "Insightful literary analysis" },
      { phase: "Term 2 Examination", maxMarks: "100", marksScored: "94", remarks: "Exemplary formal letter and essay writing" },
      { phase: "Portfolio / Notebook Submission", maxMarks: "20", marksScored: "19", remarks: "Neat assignments and reading logs" },
      { phase: "ASL / Speaking & Listening Test", maxMarks: "10", marksScored: "10", remarks: "Flawless speech delivery and diction" }
    ],
    totalScore: "92.3",
    grade: "A1",
    teacherRemarks: "Articulate, expressive speaker and thoughtful writer with rich vocabulary. Demonstrates remarkable sensitivity in literary analysis.",
    teacherSignDate: "15 March 2027",
    favTopic: "Analytical Essay Writing & Classic Literary Dramas",
    subjectGoal: "Represent school in National Debate Championship and publish articles in student journals.",
    subjectReflection: "Developed great stage poise, learned to construct structured rhetorical arguments, and widened literary reading.",
    proj1Title: "Creative Writing Anthology & Thematic Essays",
    proj1Did: "Authored original short stories and reflective character sketches exploring ethical dilemmas.",
    proj1Learned: "Narrative pacing, tone modulation, and thematic coherence.",
    proj2Title: "Inter-School Debate Speech on AI in Education",
    proj2Did: "Formulated constructive arguments with empirical evidence analyzing the societal impact of AI tools.",
    proj2Learned: "Rebuttal strategy, impromptu speaking, and persuasive rhetoric.",
    competencies: {
      conceptClarity: "4.7",
      problemSolving: "4.6",
      practicalLabWork: "4.8",
      portfolioRegularity: "4.9",
      regularityHomework: "4.8",
      vivaCommunication: "5.0"
    },
    improvementPlan: {
      area: "Formal Precis Writing Under Timed Conditions",
      plan: "Write one editorial precis every weekend",
      target: "Term 2",
      progress: "85% Achieved"
    }
  },

  "social_science": {
    id: "social_science",
    subject: "Social Science",
    subjectCode: "087",
    subjectIcon: "🌍",
    subjectTeacher: "Mr. Rajeshwar Pandey",
    subjectTeacherRole: "PGT Social Science & History",
    evalPhases: [
      { phase: "Term 1 Examination", maxMarks: "100", marksScored: "90", remarks: "Accurate historical recall" },
      { phase: "Mid Term Examination", maxMarks: "100", marksScored: "91", remarks: "Great cartographic and map work" },
      { phase: "Term 2 Examination", maxMarks: "100", marksScored: "93", remarks: "Detailed answers with historical citations" },
      { phase: "Portfolio / Notebook Submission", maxMarks: "20", marksScored: "19", remarks: "Complete notes and project files" },
      { phase: "Project & Map Activity", maxMarks: "10", marksScored: "10", remarks: "Distinction in water conservation survey" }
    ],
    totalScore: "91.3",
    grade: "A1",
    teacherRemarks: "Inquisitive learner with keen interest in constitutional governance and historical cause-effect relationships.",
    teacherSignDate: "15 March 2027",
    favTopic: "Indian National Movement & Water Harvesting Systems",
    subjectGoal: "Score 95%+ in Social Science and present a research monograph on local heritage conservation.",
    subjectReflection: "Deepened appreciation for constitutional values, civil rights, and sustainable geographic resource management.",
    proj1Title: "Comparative Survey of Traditional Indian Water Harvesting",
    proj1Did: "Investigated traditional Stepwells (Baolis), Johads, and Kunds in semi-arid regions of India.",
    proj1Learned: "Ecological history, community resource stewardship, and geographical analysis.",
    proj2Title: "Chronological Interactive Map of Indian Freedom Struggle",
    proj2Did: "Mapped historic pathways of the Dandi Salt March, Champaran Satyagraha, and Non-Cooperation movement.",
    proj2Learned: "Cartographic accuracy, archival research, and chronology mapping.",
    competencies: {
      conceptClarity: "4.8",
      problemSolving: "4.7",
      practicalLabWork: "4.6",
      portfolioRegularity: "4.9",
      regularityHomework: "4.8",
      vivaCommunication: "4.7"
    },
    improvementPlan: {
      area: "Topographical Contour Map Interpretation",
      plan: "Practice survey sheet exercises with teacher twice weekly",
      target: "Mid Term",
      progress: "Completed"
    }
  },

  "hindi": {
    id: "hindi",
    subject: "Hindi",
    subjectCode: "002",
    subjectIcon: "🇮🇳",
    subjectTeacher: "Mrs. Shashi Prabha",
    subjectTeacherRole: "TGT Hindi Literature & Language",
    evalPhases: [
      { phase: "Term 1 Examination", maxMarks: "100", marksScored: "88", remarks: "व्याकरण एवं वर्तनी में संतोषजनक" },
      { phase: "Mid Term Examination", maxMarks: "100", marksScored: "89", remarks: "सुंदर सुलेख एवं प्रभावशाली अभिव्यक्ति" },
      { phase: "Term 2 Examination", maxMarks: "100", marksScored: "90", remarks: "निबंध लेखन एवं उत्तरों में श्रेष्ठता" },
      { phase: "Portfolio / Notebook Submission", maxMarks: "20", marksScored: "18", remarks: "नियमित गृहकार्य एवं सुव्यवस्थित संचिका" },
      { phase: "वाचन एवं श्रवण कौशल (ASL)", maxMarks: "10", marksScored: "10", remarks: "स्पष्ट उच्चारण एवं कविता वाचन" }
    ],
    totalScore: "89.0",
    grade: "A2",
    teacherRemarks: "सदा अनुशासित, अध्ययनशील एवं भाषा के प्रति निष्ठावान। हिंदी साहित्य एवं रचनात्मक लेखन में सराहनीय प्रगति।",
    teacherSignDate: "15 March 2027",
    favTopic: "हिंदी व्याकरण, मुहावरे एवं प्रेरक कविता पाठ",
    subjectGoal: "हिंदी निबंध एवं कविता वाचन प्रतियोगिता में विद्यालय का प्रतिनिधित्व करना।",
    subjectReflection: "शब्दावली में विस्तार हुआ, मानक वर्तनी सीखी और विचारों को शुद्ध हिंदी में अभिव्यक्त करने का आत्मविश्वास बढ़ा।",
    proj1Title: "हिंदी निबंध एवं मौलिक कविता संकलन",
    proj1Did: "पर्यावरण संरक्षण तथा आधुनिक विज्ञान के लाभ पर स्वरचित कविताओं एवं निबंधों का संग्रह तैयार किया।",
    proj1Learned: "काव्य रस, अलंकार, भाषा सौंदर्य एवं सटीक शब्द चयन।",
    proj2Title: "पत्र लेखन एवं संवाद कार्यशाला संचिका",
    proj2Did: "दैनिक जीवन तथा सामाजिक विषयों पर औपचारिक पत्र एवं संवाद संकलित किए।",
    proj2Learned: "मानक हिंदी प्रारूप, औपचारिक पत्र शैली एवं विराम चिह्नों का प्रयोग।",
    competencies: {
      conceptClarity: "4.6",
      problemSolving: "4.5",
      practicalLabWork: "4.7",
      portfolioRegularity: "4.8",
      regularityHomework: "4.7",
      vivaCommunication: "4.6"
    },
    improvementPlan: {
      area: "संधि एवं समास के नियमों का शुद्ध अभ्यास",
      plan: "प्रतिदिन 15 मिनट व्याकरण अभ्यास पुस्तिका हल करना",
      target: "Term 2",
      progress: "90% Achieved"
    }
  },

  "ai": {
    id: "ai",
    subject: "Artificial Intelligence",
    subjectCode: "417",
    subjectIcon: "🤖",
    subjectTeacher: "Mr. Umesh Tripathi",
    subjectTeacherRole: "Faculty - AI & Emerging Technologies",
    evalPhases: [
      { phase: "Term 1 Examination", maxMarks: "100", marksScored: "97", remarks: "Strong foundation in AI concepts" },
      { phase: "Mid Term Examination", maxMarks: "100", marksScored: "99", remarks: "Outstanding model training and testing" },
      { phase: "Term 2 Examination", maxMarks: "100", marksScored: "100", remarks: "Perfect score in computer vision & ethics" },
      { phase: "Portfolio / AI Project Log", maxMarks: "20", marksScored: "20", remarks: "Verified working model demonstrations" },
      { phase: "Interactive Demo & Viva", maxMarks: "10", marksScored: "10", remarks: "Exceptional explanation of neural weights" }
    ],
    totalScore: "98.7",
    grade: "A1",
    teacherRemarks: "A true visionary young AI builder. Understands not just how to build models, but the societal responsibility and ethical guardrails required in AI.",
    teacherSignDate: "15 March 2027",
    favTopic: "Computer Vision, Neural Networks & Generative AI Ethics",
    subjectGoal: "Deploy a computer vision recycling classifier for smart waste management in our school.",
    subjectReflection: "Understood data preprocessing, training vs testing splits, confusion matrices, and responsible algorithmic fairness.",
    proj1Title: "Teachable Machine Interactive Recycling Classifier",
    proj1Did: "Curated 1,200 labeled images to train a browser-based computer vision model detecting plastic vs paper.",
    proj1Learned: "Inference latency, confidence score thresholds, and camera stream processing.",
    proj2Title: "AI Ethics & Algorithmic Fairness Monograph",
    proj2Did: "Researched ethical guardrails against algorithmic bias in automated facial and voice recognition.",
    proj2Learned: "Ethical auditing frameworks, demographic fairness, and transparent model documentation.",
    competencies: {
      conceptClarity: "5.0",
      problemSolving: "5.0",
      practicalLabWork: "5.0",
      portfolioRegularity: "5.0",
      regularityHomework: "5.0",
      vivaCommunication: "4.8"
    },
    improvementPlan: {
      area: "Deep Learning Tensor Operations in Python",
      plan: "Complete introductory PyTorch matrix operations tutorial",
      target: "Term 2",
      progress: "In Progress"
    }
  }
};

const DEFAULT_OVERALL_PERFORMANCE = {
  term1Avg: 92.4,
  midTermAvg: 94.6,
  term2Avg: 96.8,
  targetAvg: 98.5,
  cumulative: 94.8,
  attendance: "98.2%",
  rank: "1st in Class (STEM Scholar)",
  subjectScores: [
    { id: "mathematics", name: "Mathematics", short: "Math", score: 98, t1: 96, mid: 98, t2: 99, remarks: "Top in class" },
    { id: "science", name: "Science", short: "Sci", score: 95, t1: 94, mid: 95, t2: 97, remarks: "Lab distinction" },
    { id: "computer_it", name: "Computer / IT", short: "IT", score: 99, t1: 98, mid: 99, t2: 100, remarks: "Coding topper" },
    { id: "english", name: "English", short: "Eng", score: 92, t1: 91, mid: 92, t2: 94, remarks: "Fluent speaker" },
    { id: "social_science", name: "Social Science", short: "SST", score: 91, t1: 90, mid: 91, t2: 93, remarks: "Great inquiry" },
    { id: "hindi", name: "Hindi", short: "Hin", score: 89, t1: 88, mid: 89, t2: 90, remarks: "Creative writing" }
  ]
};

// =============================================================
// CHILD OVERALL PERFORMANCE GRAPH GENERATOR (Vector SVG)
// High-resolution, zero-dependency, ultra-crisp in A4 print & screen
// =============================================================
function generateOverallPerformanceSvg(overallData, activeSubjectName) {
  const avg = (overallData && overallData.term1Avg !== undefined) ? overallData : DEFAULT_OVERALL_PERFORMANCE;
  const scores = (overallData && Array.isArray(overallData.subjectScores)) ? overallData.subjectScores : DEFAULT_OVERALL_PERFORMANCE.subjectScores;

  const t1 = Number(avg.term1Avg || 92.4);
  const mid = Number(avg.midTermAvg || 94.6);
  const t2 = Number(avg.term2Avg || 96.8);
  const tgt = Number(avg.targetAvg || 98.5);
  const cum = Number(avg.cumulative || 94.8);

  const activeNorm = String(activeSubjectName || "").toLowerCase().replace(/[^a-z0-9]/g, "");

  // Left chart coordinates: Y maps 70% -> 135px, 100% -> 45px
  const minVal = 70;
  const maxVal = 100;
  const chartBottom = 135;
  const chartTop = 45;
  const chartHeight = chartBottom - chartTop;

  function getY(val) {
    const clamped = Math.max(minVal, Math.min(maxVal, Number(val) || 80));
    return chartBottom - ((clamped - minVal) / (maxVal - minVal)) * chartHeight;
  }

  const p1 = { x: 42, y: getY(t1) };
  const p2 = { x: 92, y: getY(mid) };
  const p3 = { x: 142, y: getY(t2) };
  const p4 = { x: 192, y: getY(tgt) };

  const areaPath = `M ${p1.x},${p1.y} L ${p2.x},${p2.y} L ${p3.x},${p3.y} L ${p4.x},${p4.y} L ${p4.x},${chartBottom} L ${p1.x},${chartBottom} Z`;
  const linePathSolid = `M ${p1.x},${p1.y} L ${p2.x},${p2.y} L ${p3.x},${p3.y}`;
  const linePathDash = `M ${p3.x},${p3.y} L ${p4.x},${p4.y}`;

  // Right chart: Bars
  const barChartBottom = 135;
  const barMaxHeight = 85;
  const avgLineY = barChartBottom - (cum / 100) * barMaxHeight;
  const barStartX = 238;
  const barWidth = 24;
  const barGap = 9;

  let barsSvg = "";
  scores.slice(0, 6).forEach((s, idx) => {
    const bx = barStartX + idx * (barWidth + barGap);
    const scoreVal = Number(s.score) || 80;
    const bHeight = Math.max(8, (scoreVal / 100) * barMaxHeight);
    const by = barChartBottom - bHeight;
    const sNorm = String(s.name || s.short).toLowerCase().replace(/[^a-z0-9]/g, "");
    const isActive = activeNorm && (sNorm.includes(activeNorm) || activeNorm.includes(sNorm));

    const fill = isActive ? "url(#activeBarGrad)" : "#94a3b8";
    const stroke = isActive ? "#312e81" : "#64748b";
    const textColor = isActive ? "#312e81" : "#475569";
    const textWeight = isActive ? "900" : "700";

    barsSvg += `
      <g class="bar-group ${isActive ? "active-bar" : ""}">
        ${isActive ? `<text x="${bx + barWidth/2}" y="${by - 12}" text-anchor="middle" font-size="8pt" fill="#4338ca">★</text>` : ""}
        <text x="${bx + barWidth/2}" y="${by - 3}" text-anchor="middle" font-size="${isActive ? '8pt' : '7.2pt'}" font-weight="${textWeight}" fill="${textColor}">${scoreVal}%</text>
        <rect x="${bx}" y="${by}" width="${barWidth}" height="${bHeight}" rx="3" fill="${fill}" stroke="${stroke}" stroke-width="${isActive ? '1.5' : '0.8'}"/>
        <text x="${bx + barWidth/2}" y="${barChartBottom + 12}" text-anchor="middle" font-size="7pt" font-weight="${isActive ? '800' : '600'}" fill="${isActive ? '#1e1b4b' : '#64748b'}">${escapeHtml(s.short || s.name)}</text>
      </g>
    `;
  });

  return `
    <svg viewBox="0 0 458 165" xmlns="http://www.w3.org/2000/svg" class="perf-graph-svg" style="width:100%; height:auto; display:block;">
      <defs>
        <linearGradient id="termAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4f46e5" stop-opacity="0.32"/>
          <stop offset="100%" stop-color="#4f46e5" stop-opacity="0.02"/>
        </linearGradient>
        <linearGradient id="activeBarGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4f46e5"/>
          <stop offset="100%" stop-color="#06b6d4"/>
        </linearGradient>
      </defs>

      <!-- Outer Card -->
      <rect x="1" y="1" width="456" height="163" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>

      <!-- Header Strip -->
      <path d="M 1,1 L 457,1 L 457,25 L 1,25 Z" fill="#f8fafc"/>
      <line x1="1" y1="25" x2="457" y2="25" stroke="#e2e8f0" stroke-width="1"/>
      <text x="10" y="16.5" font-size="8.8pt" font-weight="800" fill="#0f172a" letter-spacing="0.02em">📈 CHILD OVERALL PERFORMANCE GRAPH</text>

      <!-- Header KPI Badges -->
      <rect x="235" y="5" width="70" height="15" rx="3" fill="#dcfce7" stroke="#86efac" stroke-width="0.8"/>
      <text x="270" y="15.5" text-anchor="middle" font-size="7.2pt" font-weight="800" fill="#166534">Avg: ${cum}%</text>

      <rect x="310" y="5" width="68" height="15" rx="3" fill="#e0e7ff" stroke="#a5b4fc" stroke-width="0.8"/>
      <text x="344" y="15.5" text-anchor="middle" font-size="7.2pt" font-weight="800" fill="#3730a3">Rank: ${escapeHtml(avg.rank || "1st")}</text>

      <rect x="383" y="5" width="68" height="15" rx="3" fill="#fef3c7" stroke="#fcd34d" stroke-width="0.8"/>
      <text x="417" y="15.5" text-anchor="middle" font-size="7.2pt" font-weight="800" fill="#92400e">Trend: ↗ +4.4%</text>

      <!-- Left Chart: Term Progression -->
      <text x="10" y="38" font-size="7.2pt" font-weight="700" fill="#475569">TERM PROGRESSION</text>
      
      <!-- Gridlines -->
      <line x1="36" y1="${getY(80)}" x2="200" y2="${getY(80)}" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="2,2"/>
      <text x="32" y="${getY(80) + 2}" text-anchor="end" font-size="6.2pt" fill="#94a3b8">80%</text>

      <line x1="36" y1="${getY(90)}" x2="200" y2="${getY(90)}" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="2,2"/>
      <text x="32" y="${getY(90) + 2}" text-anchor="end" font-size="6.2pt" fill="#94a3b8">90%</text>

      <line x1="36" y1="${getY(100)}" x2="200" y2="${getY(100)}" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="2,2"/>
      <text x="32" y="${getY(100) + 2}" text-anchor="end" font-size="6.2pt" fill="#94a3b8">100%</text>

      <!-- Area fill & lines -->
      <path d="${areaPath}" fill="url(#termAreaGrad)"/>
      <path d="${linePathSolid}" fill="none" stroke="#4338ca" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="${linePathDash}" fill="none" stroke="#059669" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="3,3"/>

      <!-- P1: Term 1 -->
      <circle cx="${p1.x}" cy="${p1.y}" r="3.2" fill="#ffffff" stroke="#4338ca" stroke-width="2"/>
      <text x="${p1.x}" y="${p1.y - 5}" text-anchor="middle" font-size="7.2pt" font-weight="800" fill="#1e1b4b">${t1}%</text>
      <text x="${p1.x}" y="${chartBottom + 12}" text-anchor="middle" font-size="6.8pt" font-weight="600" fill="#64748b">Term 1</text>

      <!-- P2: Mid Term -->
      <circle cx="${p2.x}" cy="${p2.y}" r="3.2" fill="#ffffff" stroke="#4338ca" stroke-width="2"/>
      <text x="${p2.x}" y="${p2.y - 5}" text-anchor="middle" font-size="7.2pt" font-weight="800" fill="#1e1b4b">${mid}%</text>
      <text x="${p2.x}" y="${chartBottom + 12}" text-anchor="middle" font-size="6.8pt" font-weight="600" fill="#64748b">Mid Term</text>

      <!-- P3: Term 2 -->
      <circle cx="${p3.x}" cy="${p3.y}" r="3.2" fill="#ffffff" stroke="#4338ca" stroke-width="2"/>
      <text x="${p3.x}" y="${p3.y - 5}" text-anchor="middle" font-size="7.2pt" font-weight="800" fill="#1e1b4b">${t2}%</text>
      <text x="${p3.x}" y="${chartBottom + 12}" text-anchor="middle" font-size="6.8pt" font-weight="600" fill="#64748b">Term 2</text>

      <!-- P4: Target -->
      <circle cx="${p4.x}" cy="${p4.y}" r="3.2" fill="#ffffff" stroke="#059669" stroke-width="2"/>
      <text x="${p4.x}" y="${p4.y - 5}" text-anchor="middle" font-size="7.2pt" font-weight="800" fill="#059669">${tgt}%</text>
      <text x="${p4.x}" y="${chartBottom + 12}" text-anchor="middle" font-size="6.8pt" font-weight="600" fill="#059669">Target</text>

      <!-- Divider -->
      <line x1="218" y1="30" x2="218" y2="152" stroke="#e2e8f0" stroke-width="1"/>

      <!-- Right Chart: Subject Benchmarks -->
      <text x="228" y="38" font-size="7.2pt" font-weight="700" fill="#475569">SUBJECT BENCHMARKS</text>

      <!-- Average line across bars -->
      <line x1="234" y1="${avgLineY}" x2="445" y2="${avgLineY}" stroke="#b45309" stroke-width="1" stroke-dasharray="2,2"/>
      <text x="448" y="${avgLineY + 2}" text-anchor="start" font-size="6.2pt" font-weight="700" fill="#b45309">Avg</text>

      <!-- Rendered Bars -->
      ${barsSvg}
    </svg>
  `;
}

const SAMPLE_SHM_STUDENT = {
  schoolName: "SHM ACADEMY",
  schoolMotto: "“Infinite Knowledge Through Education”",
  academicSession: "2026–2027",
  
  // Individual Subject Portfolios & Child Overall Performance
  selectedSubjectId: "mathematics",
  subjectsList: DEFAULT_SUBJECTS,
  subjectPortfolios: JSON.parse(JSON.stringify(DEFAULT_SUBJECT_PORTFOLIOS)),
  overallPerformance: JSON.parse(JSON.stringify(DEFAULT_OVERALL_PERFORMANCE)),
  
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
  ensureSubjectPortfoliosData();
  renderSubjectSwitcher();
  populateActiveSubjectForm();
  bindTabNavigation();
  bindFormInputs();
  renderPreview(currentData);
  initTeacherMode();
  initReviewStatus();
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

// =============================================================
// TEACHER-ONLY SECTIONS PROTECTION & AUTHENTICATION
// Academics, Skills Matrix & Assessment are to be filled by teacher only
// =============================================================
let isTeacherMode = false;

function initTeacherMode() {
  if (sessionStorage.getItem("portfolio_teacher_unlocked") === "true") {
    isTeacherMode = true;
  } else if (window.TechLearnersContent && typeof window.TechLearnersContent.requireAdmin === "function") {
    window.TechLearnersContent.requireAdmin().then(function(isAdmin) {
      if (isAdmin) {
        isTeacherMode = true;
        sessionStorage.setItem("portfolio_teacher_unlocked", "true");
        sessionStorage.setItem("portfolio_is_master_admin", "true");
        sessionStorage.setItem("portfolio_teacher_role", "Master Administrator");
        updateTeacherLockUI();
      }
    }).catch(function() {});
  }
  updateTeacherLockUI();
}

function updateTeacherLockUI() {
  const statusPill = document.getElementById("teacherModeStatusPill");
  const statusLabel = document.getElementById("teacherStatusLabel");
  const authTrigger = document.getElementById("btnTeacherAuthTrigger");

  const academicsBanner = document.getElementById("bannerAcademicsLock");
  const skillsBanner = document.getElementById("bannerSkillsLock");
  const assessmentBanner = document.getElementById("bannerAssessmentLock");

  const tagAcademics = document.getElementById("tagAcademicsLock");
  const tagSkills = document.getElementById("tagSkillsLock");
  const tagAssessment = document.getElementById("tagAssessmentLock");

  // Inputs list for Academics
  const academicsInputs = document.querySelectorAll("#academicsInputBody input, #subject1to1TableBody input, #allSubjectBenchmarkTableBody input, #f_activeSubjectTeacher, #f_activeSubjectTeacherRole, #f_activeSubjectCode, #f_activeSubjectTeacherRemarks, #f_academicAchievement");
  
  // Inputs list for Skills
  const skillsInputs = document.querySelectorAll("#paneSkills input");

  // Inputs list for Teacher Assessment
  const assessmentInputs = document.querySelectorAll("#f_tr_academic, #f_tr_discipline, #f_tr_regularity, #f_tr_teamwork, #f_teacherRemarks, #f_teacherSignDate, #improvementInputRows input");
  const addPlanBtn = document.querySelector('button[onclick="addPlanRow()"]');

  const verifiedRole = sessionStorage.getItem("portfolio_teacher_role") || "Teacher Mode";

  if (isTeacherMode) {
    // UNLOCKED: Teacher Mode Active
    if (statusPill) {
      statusPill.className = "teacher-status-pill teacher-mode";
      if (statusLabel) statusLabel.textContent = `👩‍🏫 ${verifiedRole} Active`;
      if (authTrigger) {
        authTrigger.textContent = "🔒 Switch to Student Mode";
        authTrigger.onclick = lockTeacherMode;
      }
    }

    [academicsBanner, skillsBanner, assessmentBanner].forEach(function(b) {
      if (b) {
        b.classList.add("unlocked");
        const strong = b.querySelector(".lock-banner-text strong");
        const p = b.querySelector(".lock-banner-text p");
        const btn = b.querySelector(".teacher-mode-btn");
        const icon = b.querySelector(".lock-banner-icon");
        if (icon) icon.textContent = "🔓";
        if (strong) strong.textContent = `${verifiedRole} • Editing Enabled`;
        if (p) p.textContent = `You are authenticated as ${verifiedRole}. Official student marks, skills matrix, and teacher assessment rubrics are unlocked for editing.`;
        if (btn) {
          btn.textContent = "🔒 Switch to Student Mode";
          btn.onclick = lockTeacherMode;
        }
      }
    });

    [tagAcademics, tagSkills, tagAssessment].forEach(function(t) {
      if (t) t.textContent = "🔓";
    });

    // Enable inputs
    academicsInputs.forEach(function(el) {
      el.disabled = false;
      el.removeAttribute("readonly");
      el.classList.remove("field-locked");
      el.removeAttribute("title");
    });
    skillsInputs.forEach(function(el) {
      el.disabled = false;
      el.removeAttribute("readonly");
      el.classList.remove("field-locked");
      el.removeAttribute("title");
    });
    assessmentInputs.forEach(function(el) {
      el.disabled = false;
      el.removeAttribute("readonly");
      el.classList.remove("field-locked");
      el.removeAttribute("title");
    });
    if (addPlanBtn) {
      addPlanBtn.style.display = "inline-flex";
    }
  } else {
    // LOCKED: Student & Regular User Mode (Default)
    if (statusPill) {
      statusPill.className = "teacher-status-pill student-mode";
      if (statusLabel) statusLabel.textContent = "Student Mode (Academics & Skills Locked)";
      if (authTrigger) {
        authTrigger.textContent = "🔑 Teacher Unlock";
        authTrigger.onclick = openTeacherAuthModal;
      }
    }

    [academicsBanner, skillsBanner, assessmentBanner].forEach(function(b) {
      if (b) {
        b.classList.remove("unlocked");
        const strong = b.querySelector(".lock-banner-text strong");
        const p = b.querySelector(".lock-banner-text p");
        const btn = b.querySelector(".teacher-mode-btn");
        const icon = b.querySelector(".lock-banner-icon");
        if (icon) icon.textContent = "🔒";
        if (strong) {
          if (b.id === "bannerAcademicsLock") strong.textContent = "Official Teacher-Only Section • Academic Marks & Grades";
          else if (b.id === "bannerSkillsLock") strong.textContent = "Official Teacher-Only Section • 360° Skills Matrix";
          else strong.textContent = "Official Teacher-Only Section • Evaluation & Assessment Rubrics";
        }
        if (p) {
          if (b.id === "bannerAcademicsLock") p.textContent = "Subject marks and academic honors are officially evaluated by the Class Teacher. Students and unauthorized users cannot edit these entries.";
          else if (b.id === "bannerSkillsLock") p.textContent = "Core skill competency ratings (1.0 to 5.0) are certified by the Class Teacher. Students are not permitted to change these scores.";
          else p.textContent = "Conduct rubrics, teacher remarks, and improvement plans are certified by the Class Teacher. Unauthorized student edits are prohibited.";
        }
        if (btn) {
          btn.textContent = "🔑 Teacher Unlock";
          btn.onclick = openTeacherAuthModal;
        }
      }
    });

    [tagAcademics, tagSkills, tagAssessment].forEach(function(t) {
      if (t) t.textContent = "🔒";
    });

    // Lock and disable inputs
    academicsInputs.forEach(function(el) {
      el.disabled = true;
      el.setAttribute("readonly", "true");
      el.classList.add("field-locked");
      el.title = "🔒 Filled by Class Teacher only. Students cannot edit.";
    });
    skillsInputs.forEach(function(el) {
      el.disabled = true;
      el.setAttribute("readonly", "true");
      el.classList.add("field-locked");
      el.title = "🔒 Filled by Class Teacher only. Students cannot edit.";
    });
    assessmentInputs.forEach(function(el) {
      el.disabled = true;
      el.setAttribute("readonly", "true");
      el.classList.add("field-locked");
      el.title = "🔒 Filled by Class Teacher only. Students cannot edit.";
    });
    if (addPlanBtn) {
      addPlanBtn.style.display = "none";
    }
  }

  if (typeof updateReviewStatusUI === "function") {
    updateReviewStatusUI();
  }
}

function openTeacherAuthModal() {
  const modal = document.getElementById("teacherAuthModal");
  if (modal) {
    modal.style.display = "flex";
    const input = document.getElementById("inputTeacherCode");
    if (input) {
      input.value = "";
      input.focus();
    }
    const feedback = document.getElementById("teacherAuthFeedback");
    if (feedback) feedback.textContent = "";
  }
}

function closeTeacherAuthModal() {
  const modal = document.getElementById("teacherAuthModal");
  if (modal) modal.style.display = "none";
}

function toggleTeacherAuth() {
  if (isTeacherMode) {
    lockTeacherMode();
  } else {
    openTeacherAuthModal();
  }
}

function handleTeacherPasscodeSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();
  const input = document.getElementById("inputTeacherCode");
  const feedback = document.getElementById("teacherAuthFeedback");
  const code = (input && input.value ? input.value : "").trim();

  let verification = null;
  const studentCls = (currentData && currentData.classSection) || (document.getElementById("f_classSection") ? document.getElementById("f_classSection").value : "") || "";

  if (window.TeacherPINStore && typeof window.TeacherPINStore.verify === "function") {
    verification = window.TeacherPINStore.verify(code, studentCls);
  } else {
    // Fallback if script not loaded
    const validCodes = ["shm2026", "shm", "teacher2026", "teacher", "admin", "techlearners", "shm@2026"];
    if (validCodes.includes(code.toLowerCase())) {
      verification = { valid: true, role: "Teacher/Staff", isMaster: true, message: "Verified as School Teacher" };
    } else {
      verification = { valid: false, message: "Incorrect teacher passcode. Please verify or ask school admin." };
    }
  }

  if (verification && verification.valid) {
    isTeacherMode = true;
    sessionStorage.setItem("portfolio_teacher_unlocked", "true");
    if (verification.isMaster) {
      sessionStorage.setItem("portfolio_is_master_admin", "true");
    }
    sessionStorage.setItem("portfolio_teacher_role", verification.role || "Teacher");

    if (feedback) {
      feedback.style.color = "#16a34a";
      feedback.textContent = `✅ ${verification.message || "Teacher verified!"} Unlocking official sections...`;
    }
    setTimeout(function() {
      closeTeacherAuthModal();
      updateTeacherLockUI();
      renderPreview(currentData);
    }, 450);
  } else {
    if (feedback) {
      feedback.style.color = "#dc2626";
      feedback.textContent = `❌ ${verification && verification.message ? verification.message : "Incorrect teacher passcode. Please verify or ask school admin."}`;
    }
    if (input) input.select();
  }
  return false;
}

function lockTeacherMode() {
  isTeacherMode = false;
  sessionStorage.removeItem("portfolio_teacher_unlocked");
  sessionStorage.removeItem("portfolio_is_master_admin");
  sessionStorage.removeItem("portfolio_teacher_role");
  updateTeacherLockUI();
  renderPreview(currentData);
}

// Re-render lock UI if PIN settings change
window.addEventListener("teacher-pins-updated", function() {
  if (isTeacherMode) {
    updateTeacherLockUI();
  }
});

// Load from LocalStorage or URL student ID
function loadSavedData() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get("id");
    const reviewId = urlParams.get("reviewId");

    if (studentId && window.DataStore) {
      const dbStudent = window.DataStore.getStudentById(studentId);
      if (dbStudent) {
        if (dbStudent.portfolioBuilderData) {
          currentData = Object.assign({}, SAMPLE_SHM_STUDENT, dbStudent.portfolioBuilderData);
        } else {
          // Map dbStudent fields to builder currentData
          currentData = Object.assign({}, SAMPLE_SHM_STUDENT, {
            id: dbStudent.id,
            studentName: dbStudent.name || "",
            classSection: `${dbStudent.class || "Class VIII"}${dbStudent.section ? " - " + dbStudent.section : ""}`,
            rollNo: dbStudent.rollNo || "",
            admissionNo: dbStudent.admissionNo || dbStudent.id || "",
            dob: dbStudent.dob || "",
            photoUrl: dbStudent.avatar || SAMPLE_SHM_STUDENT.photoUrl,
            aboutSentence: dbStudent.bio || "",
            interests: dbStudent.tagline || "",
            classTeacher: (dbStudent.teacherObservation && dbStudent.teacherObservation.teacherName) || "",
            teacherRemarks: (dbStudent.teacherObservation && dbStudent.teacherObservation.remark) || "",
            reviewStatus: dbStudent.reviewStatus || "pending"
          });
        }
        return;
      }
    }

    if (reviewId && window.PortfolioReviewStore) {
      const sub = window.PortfolioReviewStore.getById(reviewId);
      if (sub && sub.portfolioData) {
        currentData = Object.assign({}, SAMPLE_SHM_STUDENT, sub.portfolioData);
        return;
      }
    }

    const saved = localStorage.getItem("tl_shm_portfolio_data");
    if (saved) {
      currentData = JSON.parse(saved);
    }
  } catch(e) {
    console.warn("LocalStorage load failed:", e);
  }
}

let syncDbDebounceTimer = null;
function debouncedSyncStudentToDatabase() {
  clearTimeout(syncDbDebounceTimer);
  syncDbDebounceTimer = setTimeout(() => {
    if (currentData && currentData.studentName && currentData.studentName.trim()) {
      syncStudentToDatabase({ source: "auto_save" });
    }
  }, 1200);
}

function saveToLocalStorage() {
  try {
    localStorage.setItem("tl_shm_portfolio_data", JSON.stringify(currentData));
    debouncedSyncStudentToDatabase();
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

  ensureSubjectPortfoliosData();
  renderSubjectSwitcher();
  populateActiveSubjectForm();
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
  readActiveSubjectForm();
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
  currentData.memorableActivity = getVal("f_memorableActivity");
  currentData.bestWorkNote = getVal("f_bestWorkNote");

  // =========================================================
  // TEACHER-ONLY FIELDS PROTECTION:
  // If not in teacher mode, DO NOT read or overwrite:
  // - Academics table and academic achievement
  // - Skills matrix ratings
  // - Teacher ratings, teacher remarks, teacher sign date
  // =========================================================
  if (isTeacherMode) {
    currentData.academicAchievement = getVal("f_academicAchievement");
    currentData.teacherRemarks = getVal("f_teacherRemarks");
    currentData.teacherSignDate = getVal("f_teacherSignDate");

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
  updateTeacherLockUI();
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
  updateTeacherLockUI();
}

function updatePlan(idx, field, val) {
  if (!isTeacherMode) return; // Protected: Teacher only
  if (currentData.improvementPlans[idx]) {
    currentData.improvementPlans[idx][field] = val;
    renderPreview(currentData);
    saveToLocalStorage();
  }
}

function addPlanRow() {
  if (!isTeacherMode) {
    openTeacherAuthModal();
    return;
  }
  currentData.improvementPlans.push({ area: "New Target Area", plan: "Action steps", target: "Term 2", progress: "Initiated" });
  renderImprovementInputs();
  renderPreview(currentData);
  saveToLocalStorage();
}


// =============================================================
// INDIVIDUAL SUBJECT PORTFOLIOS CONTROLLER & SWITCHER
// =============================================================

function ensureSubjectPortfoliosData() {
  if (!currentData.subjectsList || !Array.isArray(currentData.subjectsList) || currentData.subjectsList.length === 0) {
    currentData.subjectsList = JSON.parse(JSON.stringify(DEFAULT_SUBJECTS));
  }
  if (!currentData.subjectPortfolios || typeof currentData.subjectPortfolios !== "object") {
    currentData.subjectPortfolios = JSON.parse(JSON.stringify(DEFAULT_SUBJECT_PORTFOLIOS));
  }
  if (!currentData.selectedSubjectId) {
    currentData.selectedSubjectId = currentData.subjectsList[0].id;
  }
  if (!currentData.overallPerformance || !Array.isArray(currentData.overallPerformance.subjectScores)) {
    currentData.overallPerformance = JSON.parse(JSON.stringify(DEFAULT_OVERALL_PERFORMANCE));
  }

  // Ensure active subject exists in dictionary
  const activeId = currentData.selectedSubjectId;
  if (!currentData.subjectPortfolios[activeId]) {
    const meta = currentData.subjectsList.find(s => s.id === activeId) || { name: activeId, code: "--", icon: "📚" };
    currentData.subjectPortfolios[activeId] = {
      id: activeId,
      subject: meta.name || activeId,
      subjectCode: meta.code || "--",
      subjectIcon: meta.icon || "📚",
      subjectTeacher: meta.teacher || (currentData.classTeacher || "Class Teacher"),
      subjectTeacherRole: meta.role || "Subject Faculty",
      evalPhases: [
        { phase: "Term 1 Examination", maxMarks: "100", marksScored: "90", remarks: "Good conceptual understanding" },
        { phase: "Mid Term Examination", maxMarks: "100", marksScored: "92", remarks: "Consistent performance" },
        { phase: "Term 2 Examination", maxMarks: "100", marksScored: "94", remarks: "Exemplary subject mastery" },
        { phase: "Portfolio / Notebook Submission", maxMarks: "20", marksScored: "19", remarks: "Verified and complete" },
        { phase: "Practical / Lab Assessment", maxMarks: "10", marksScored: "10", remarks: "Active demonstration and participation" }
      ],
      totalScore: "92.0",
      grade: "A1",
      teacherRemarks: `Demonstrates commendable dedication and intellectual curiosity in ${meta.name}.`,
      teacherSignDate: currentData.teacherSignDate || "15 March 2027",
      favTopic: "Key curriculum topics",
      subjectGoal: `Score 95%+ in ${meta.name} and represent school in academic symposiums.`,
      subjectReflection: `Deepened subject concepts, applied practical methodologies, and mastered key problem types.`,
      proj1Title: `${meta.name} Practical Project 1`,
      proj1Did: "Completed hands-on practical assignment and investigative study.",
      proj1Learned: "Applied subject principles to practical problem solving.",
      proj2Title: `${meta.name} Project / Lab Work 2`,
      proj2Did: "Formulated data models and conducted laboratory experiments.",
      proj2Learned: "Analytical synthesis, documentation, and error reduction.",
      competencies: {
        conceptClarity: "4.8",
        problemSolving: "4.8",
        practicalLabWork: "4.8",
        portfolioRegularity: "5.0",
        regularityHomework: "4.9",
        vivaCommunication: "4.7"
      },
      improvementPlan: {
        area: "Timed Practice and Complex Problem Speed",
        plan: "Practice weekly past exam questions",
        target: "Term 2",
        progress: "In Progress"
      }
    };
  }
}

function getActiveSubjectData() {
  ensureSubjectPortfoliosData();
  const id = currentData.selectedSubjectId;
  return currentData.subjectPortfolios[id] || currentData.subjectPortfolios["mathematics"];
}

function renderSubjectSwitcher() {
  ensureSubjectPortfoliosData();
  const container = document.getElementById("subjectTabsContainer");
  if (!container) return;

  container.innerHTML = "";
  const activeId = currentData.selectedSubjectId;

  currentData.subjectsList.forEach(subj => {
    const subData = currentData.subjectPortfolios[subj.id] || {};
    const isActive = subj.id === activeId;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `subject-tab-btn ${isActive ? "active" : ""}`;
    btn.setAttribute("data-subject-id", subj.id);
    btn.onclick = () => switchSubject(subj.id);
    btn.innerHTML = `
      <span>${subj.icon || "📚"}</span>
      <span>${escapeHtml(subj.name)}</span>
      <span class="subject-pill-badge">${escapeHtml(subData.grade || "A1")}</span>
    `;
    container.appendChild(btn);
  });

  updateSubjectIndicator();
}

function updateSubjectIndicator() {
  const activeSub = getActiveSubjectData();
  const topbarName = document.getElementById("topbarSubjectName");
  if (topbarName && activeSub) {
    topbarName.textContent = `${activeSub.subjectIcon || "📚"} ${activeSub.subject}`;
  }
}

function switchSubject(subjectId) {
  readActiveSubjectForm();
  currentData.selectedSubjectId = subjectId;
  ensureSubjectPortfoliosData();
  renderSubjectSwitcher();
  populateActiveSubjectForm();
  renderBuilderPerformanceGraph();
  renderPreview(currentData);
  saveToLocalStorage();
}

function updateActiveSubjectField(field, val) {
  const sub = getActiveSubjectData();
  if (!sub) return;
  sub[field] = val;

  if (field === "subjectTeacher") {
    const badge = document.getElementById("activeSubjectTeacherBadge");
    if (badge) badge.textContent = `Teacher: ${val || "Not assigned"}`;
  }

  renderPreview(currentData);
  saveToLocalStorage();
}

function readActiveSubjectForm() {
  const sub = getActiveSubjectData();
  if (!sub) return;

  const tName = document.getElementById("f_activeSubjectTeacher");
  if (tName) sub.subjectTeacher = tName.value.trim();

  const tRole = document.getElementById("f_activeSubjectTeacherRole");
  if (tRole) sub.subjectTeacherRole = tRole.value.trim();

  const sCode = document.getElementById("f_activeSubjectCode");
  if (sCode) sub.subjectCode = sCode.value.trim();

  const tRemarks = document.getElementById("f_activeSubjectTeacherRemarks");
  if (tRemarks) sub.teacherRemarks = tRemarks.value.trim();
}

function populateActiveSubjectForm() {
  const sub = getActiveSubjectData();
  if (!sub) return;

  const heading = document.getElementById("activeSubjectCardHeading");
  if (heading) {
    heading.textContent = `${sub.subjectIcon || "📚"} ${sub.subject} (Code: ${sub.subjectCode || "--"})`;
  }

  const badge = document.getElementById("activeSubjectTeacherBadge");
  if (badge) {
    badge.textContent = `Teacher: ${sub.subjectTeacher || "Not assigned"}`;
  }

  const gradeBadge = document.getElementById("activeSubjectCalculatedGrade");
  if (gradeBadge) {
    gradeBadge.textContent = `Final Grade: ${sub.grade || "A1"} (${sub.totalScore || "98"}%)`;
  }

  setVal("f_activeSubjectTeacher", sub.subjectTeacher);
  setVal("f_activeSubjectTeacherRole", sub.subjectTeacherRole);
  setVal("f_activeSubjectCode", sub.subjectCode);
  setVal("f_activeSubjectTeacherRemarks", sub.teacherRemarks);

  renderSubject1to1Table();
  renderAllSubjectBenchmarkTable();
  renderBuilderPerformanceGraph();
}

function renderSubject1to1Table() {
  const tbody = document.getElementById("subject1to1TableBody");
  if (!tbody) return;

  const sub = getActiveSubjectData();
  if (!sub || !Array.isArray(sub.evalPhases)) return;

  tbody.innerHTML = "";
  sub.evalPhases.forEach((p, idx) => {
    const maxVal = Number(p.maxMarks) || 100;
    const scoredVal = Number(p.marksScored) || 0;
    const pct = Math.round((scoredVal / maxVal) * 100);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${escapeHtml(p.phase)}</strong></td>
      <td><input type="number" class="subj-max" value="${escapeHtml(p.maxMarks)}" style="width: 70px; text-align: center;" oninput="updateSubjectEvalPhase(${idx}, 'maxMarks', this.value)"></td>
      <td><input type="number" class="subj-scored" value="${escapeHtml(p.marksScored)}" style="width: 70px; text-align: center; font-weight: 700;" oninput="updateSubjectEvalPhase(${idx}, 'marksScored', this.value)"></td>
      <td style="text-align: center; font-weight: 800; color: #4338ca;">${pct}%</td>
      <td><input type="text" class="subj-rem" value="${escapeHtml(p.remarks || "")}" style="width: 100%;" oninput="updateSubjectEvalPhase(${idx}, 'remarks', this.value)"></td>
    `;
    tbody.appendChild(tr);
  });

  updateTeacherLockUI();
}

function updateSubjectEvalPhase(idx, field, val) {
  const sub = getActiveSubjectData();
  if (!sub || !sub.evalPhases || !sub.evalPhases[idx]) return;

  sub.evalPhases[idx][field] = val;
  calculateSubjectGrade(sub);

  const gradeBadge = document.getElementById("activeSubjectCalculatedGrade");
  if (gradeBadge) {
    gradeBadge.textContent = `Final Grade: ${sub.grade} (${sub.totalScore}%)`;
  }

  // Update benchmark score for this subject
  if (currentData.overallPerformance && Array.isArray(currentData.overallPerformance.subjectScores)) {
    const match = currentData.overallPerformance.subjectScores.find(s => s.id === sub.id || s.name === sub.subject);
    if (match) {
      match.score = Math.round(Number(sub.totalScore) || 90);
    }
    recalculateOverallAverages();
  }

  renderSubject1to1Table();
  renderBuilderPerformanceGraph();
  renderPreview(currentData);
  saveToLocalStorage();
}

function calculateSubjectGrade(subData) {
  let scoredTotal = 0;
  let maxTotal = 0;

  (subData.evalPhases || []).forEach(p => {
    scoredTotal += Number(p.marksScored) || 0;
    maxTotal += Number(p.maxMarks) || 100;
  });

  const pct = maxTotal > 0 ? (scoredTotal / maxTotal) * 100 : 90;
  subData.totalScore = pct.toFixed(1);

  if (pct >= 91) subData.grade = "A1";
  else if (pct >= 81) subData.grade = "A2";
  else if (pct >= 71) subData.grade = "B1";
  else if (pct >= 61) subData.grade = "B2";
  else if (pct >= 51) subData.grade = "C1";
  else subData.grade = "C2";

  return subData.grade;
}

function recalculateOverallAverages() {
  if (!currentData.overallPerformance) return;
  const scores = currentData.overallPerformance.subjectScores || [];
  if (scores.length === 0) return;

  let sum = 0;
  scores.forEach(s => {
    sum += Number(s.score) || 85;
  });
  const avg = (sum / scores.length).toFixed(1);
  currentData.overallPerformance.cumulative = avg;
}

function renderAllSubjectBenchmarkTable() {
  const tbody = document.getElementById("allSubjectBenchmarkTableBody");
  if (!tbody) return;

  ensureSubjectPortfoliosData();
  const scores = currentData.overallPerformance.subjectScores || [];

  tbody.innerHTML = "";
  scores.forEach((s, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${escapeHtml(s.name)}</strong></td>
      <td><input type="number" value="${escapeHtml(s.t1 || 90)}" style="width: 55px; text-align: center;" oninput="updateSubjectBenchmarkScore('${s.id || s.name}', 't1', this.value)"></td>
      <td><input type="number" value="${escapeHtml(s.mid || 92)}" style="width: 55px; text-align: center;" oninput="updateSubjectBenchmarkScore('${s.id || s.name}', 'mid', this.value)"></td>
      <td><input type="number" value="${escapeHtml(s.t2 || 95)}" style="width: 55px; text-align: center;" oninput="updateSubjectBenchmarkScore('${s.id || s.name}', 't2', this.value)"></td>
      <td><input type="number" value="${escapeHtml(s.score || 95)}" style="width: 55px; text-align: center; font-weight: 700; color: #4338ca;" oninput="updateSubjectBenchmarkScore('${s.id || s.name}', 'score', this.value)"></td>
      <td><input type="text" value="${escapeHtml(s.remarks || '')}" placeholder="Evaluation remark" style="width: 100%;" oninput="updateSubjectBenchmarkScore('${s.id || s.name}', 'remarks', this.value)"></td>
    `;
    tbody.appendChild(tr);
  });

  updateTeacherLockUI();
}

function updateSubjectBenchmarkScore(subId, field, val) {
  if (!currentData.overallPerformance || !Array.isArray(currentData.overallPerformance.subjectScores)) return;
  const match = currentData.overallPerformance.subjectScores.find(s => s.id === subId || s.name === subId);
  if (match) {
    match[field] = val;
    recalculateOverallAverages();
    renderBuilderPerformanceGraph();
    renderPreview(currentData);
    saveToLocalStorage();
  }
}

function renderBuilderPerformanceGraph() {
  const container = document.getElementById("builderPerfGraphContainer");
  if (!container) return;

  ensureSubjectPortfoliosData();
  const activeSub = getActiveSubjectData();
  container.innerHTML = generateOverallPerformanceSvg(currentData.overallPerformance, activeSub.subject);
}

function toggleAllSubjectBenchmarkEditor() {
  const el = document.getElementById("allSubjectBenchmarkEditor");
  if (el) {
    el.style.display = (el.style.display === "none" || !el.style.display) ? "block" : "none";
  }
}

function openAddSubjectModal() {
  const m = document.getElementById("addSubjectModal");
  if (m) {
    m.style.display = "flex";
    const inp = document.getElementById("inputNewSubjectName");
    if (inp) {
      inp.value = "";
      setTimeout(() => inp.focus(), 100);
    }
  }
}

function closeAddSubjectModal() {
  const m = document.getElementById("addSubjectModal");
  if (m) m.style.display = "none";
}

function handleAddSubjectSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();

  const name = document.getElementById("inputNewSubjectName")?.value.trim();
  const code = document.getElementById("inputNewSubjectCode")?.value.trim() || "--";
  const icon = document.getElementById("inputNewSubjectIcon")?.value.trim() || "📚";
  const teacher = document.getElementById("inputNewSubjectTeacher")?.value.trim() || (currentData.classTeacher || "Class Teacher");
  const role = document.getElementById("inputNewSubjectTeacherRole")?.value.trim() || "Subject Faculty";

  if (!name) return false;

  ensureSubjectPortfoliosData();
  const id = name.toLowerCase().replace(/[^a-z0-9]/g, "_") + "_" + Date.now().toString(36).slice(-3);

  const newSubMeta = { id: id, name: name, code: code, icon: icon, teacher: teacher, role: role };
  currentData.subjectsList.push(newSubMeta);

  currentData.subjectPortfolios[id] = {
    id: id,
    subject: name,
    subjectCode: code,
    subjectIcon: icon,
    subjectTeacher: teacher,
    subjectTeacherRole: role,
    evalPhases: [
      { phase: "Term 1 Examination", maxMarks: "100", marksScored: "90", remarks: "Good conceptual start" },
      { phase: "Mid Term Examination", maxMarks: "100", marksScored: "92", remarks: "Active participation" },
      { phase: "Term 2 Examination", maxMarks: "100", marksScored: "95", remarks: "Demonstrated subject clarity" },
      { phase: "Portfolio / Notebook Submission", maxMarks: "20", marksScored: "20", remarks: "Verified and neat" },
      { phase: "Practical / Lab Assessment", maxMarks: "10", marksScored: "10", remarks: "Practical activities verified" }
    ],
    totalScore: "93.0",
    grade: "A1",
    teacherRemarks: `Diligent and inquisitive student in ${name}. Shows strong academic potential.`,
    teacherSignDate: currentData.teacherSignDate || "15 March 2027",
    favTopic: `${name} Core Studies`,
    subjectGoal: `Attain distinction in ${name} and master practical assignments.`,
    subjectReflection: `Expanded knowledge base and gained confidence in answering complex analytical questions.`,
    proj1Title: `${name} Practical Project`,
    proj1Did: "Researched and documented comprehensive practical case study.",
    proj1Learned: "Systematic investigation, data analysis, and documentation.",
    proj2Title: `${name} Application / Lab Study`,
    proj2Did: "Executed practical demonstrations and laboratory exercises.",
    proj2Learned: "Hypothesis testing and structured reporting.",
    competencies: {
      conceptClarity: "4.8",
      problemSolving: "4.8",
      practicalLabWork: "4.8",
      portfolioRegularity: "5.0",
      regularityHomework: "4.9",
      vivaCommunication: "4.7"
    },
    improvementPlan: {
      area: "Analytical Speed and Exam Timing",
      plan: "Regular past paper practice under timer",
      target: "Term 2",
      progress: "In Progress"
    }
  };

  closeAddSubjectModal();
  switchSubject(id);
  showSaveToast(`📚 Created individual portfolio for "${name}"!`);
  return false;
}


// =============================================================
// GENERATE 1-1 SUBJECT SINGLE-PAGE A4 PORTFOLIO CANVAS HTML
// Only shows 1-1 subject as per teacher and subject + Child Performance Graph
// =============================================================
function generateSinglePageSheetHtml(d, subjectId) {
  ensureSubjectPortfoliosData();
  const sub = (d.subjectPortfolios && d.subjectPortfolios[subjectId]) || (d.subjectPortfolios && d.subjectPortfolios["mathematics"]) || getActiveSubjectData();

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
  const photo = d.photoUrl || "assets/logo.svg";

  const subjectName = sub.subject || "Mathematics";
  const subjectCode = sub.subjectCode || "041";
  const subjectIcon = sub.subjectIcon || "📚";
  const subjectTeacher = sub.subjectTeacher || (d.classTeacher || "Class Teacher");
  const subjectTeacherRole = sub.subjectTeacherRole || "Subject Faculty & Mentor";

  const evalRowsHtml = (sub.evalPhases || []).map(p => {
    const maxVal = Number(p.maxMarks) || 100;
    const scoredVal = Number(p.marksScored) || 0;
    const pct = Math.round((scoredVal / maxVal) * 100);
    return `
      <tr>
        <td><strong>${escapeHtml(p.phase)}</strong></td>
        <td class="center">${escapeHtml(p.maxMarks)}</td>
        <td class="center"><strong>${escapeHtml(p.marksScored)}</strong></td>
        <td class="center">${pct}%</td>
        <td>${escapeHtml(p.remarks || "Certified")}</td>
      </tr>
    `;
  }).join("");

  const comp = sub.competencies || {
    conceptClarity: "5.0",
    problemSolving: "5.0",
    practicalLabWork: "4.8",
    portfolioRegularity: "5.0",
    regularityHomework: "4.9",
    vivaCommunication: "4.7"
  };

  const perfSvg = generateOverallPerformanceSvg(d.overallPerformance, subjectName);

  return `
    <!-- 1. Header & Student Meta -->
    <div class="sp-header">
      <div class="sp-brand-header-col">
        <img src="assets/logo.svg" alt="TechLearners" class="sp-techlearners-logo">
        <span class="sp-techlearners-label">TechLearners</span>
      </div>
      <div class="sp-school-block">
        <div class="sp-school-title">${school}</div>
        <div class="sp-school-motto">${motto}</div>
        <div class="sp-doc-title-row" style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
          <span class="sp-doc-title-badge">STUDENT PORTFOLIO</span>
          <span class="sp-doc-subject-banner">${subjectIcon} ${escapeHtml(subjectName.toUpperCase())} <span class="sp-subject-code-tag">CODE: ${escapeHtml(subjectCode)}</span></span>
          <span class="sp-doc-session-text">Session: ${session}</span>
        </div>
      </div>
      <div class="sp-photo-wrapper">
        <img src="${photo}" alt="Student Photograph" class="sp-photo-img" onerror="this.src='assets/logo.svg'">
      </div>
    </div>

    <!-- Student Profile Strip & Subject Teacher -->
    <div class="sp-profile-meta-grid">
      <div class="sp-meta-item"><strong>Student:</strong> <span>${name}</span></div>
      <div class="sp-meta-item"><strong>Class & Sec:</strong> <span>${cls}</span></div>
      <div class="sp-meta-item"><strong>Roll No:</strong> <span>${roll}</span></div>
      <div class="sp-meta-item"><strong>Adm No:</strong> <span>${adm}</span></div>
      <div class="sp-meta-item"><strong>DOB:</strong> <span>${dob}</span></div>
      <div class="sp-meta-item"><strong>Parents:</strong> <span>${father} / ${mother}</span></div>
      <div class="sp-meta-item" style="grid-column: span 2;"><strong>Subject Teacher:</strong> <span class="sp-teacher-badge">👩‍🏫 ${escapeHtml(subjectTeacher)} (${escapeHtml(subjectTeacherRole)})</span></div>
    </div>

    <!-- 2. Ribbon: MY SUBJECT PORTFOLIO IN ONE PAGE -->
    <div class="sp-year-ribbon">
      <div class="sp-ribbon-title">
        <span>⭐ MY ${escapeHtml(subjectName.toUpperCase())} PORTFOLIO IN ONE PAGE</span>
        <span style="font-size: 7.8pt; color: #b45309; text-transform: none; font-weight: 700;">Official Individual Subject Record • Evaluated by ${escapeHtml(subjectTeacher)}</span>
      </div>
      <div class="sp-ribbon-grid">
        <div class="sp-ribbon-pill"><strong>📚 Subject Target:</strong> ${escapeHtml(sub.subjectGoal || "Academic Excellence & Distinction")}</div>
        <div class="sp-ribbon-pill"><strong>💡 Key Topic:</strong> ${escapeHtml(sub.favTopic || "Core Theorems & Concepts")}</div>
        <div class="sp-ribbon-pill"><strong>🔬 Practical/Lab:</strong> ${escapeHtml(sub.proj1Title || "Practical Project Completed")}</div>
        <div class="sp-ribbon-pill"><strong>⭐ Subject Grade:</strong> <strong>${escapeHtml(sub.grade || "A1")} (${escapeHtml(sub.totalScore || "98")}%)</strong></div>
      </div>
    </div>

    <!-- 3. Main Split Body -->
    <div class="sp-body-split">
      
      <!-- LEFT COLUMN -->
      <div class="sp-col">
        
        <!-- 1-1 Subject Academic Progress Table -->
        <div class="sp-card">
          <div class="sp-card-title">
            <span>📊 1-1 Subject Evaluation: ${escapeHtml(subjectName)}</span>
            <span style="font-size: 7.8pt; color: #16a34a; font-weight: 800;">Grade: ${escapeHtml(sub.grade || "A1")} (${escapeHtml(sub.totalScore || "98")}%)</span>
          </div>
          <table class="sp-table">
            <thead>
              <tr>
                <th>Evaluation Phase</th>
                <th class="center" style="width: 28px;">Max</th>
                <th class="center" style="width: 28px;">Scored</th>
                <th class="center" style="width: 32px;">Score %</th>
                <th>Teacher Remark / Verification</th>
              </tr>
            </thead>
            <tbody>
              ${evalRowsHtml}
            </tbody>
          </table>
          <div style="font-size: 7.8pt; color: #334155; margin-top: 2px; padding: 2px 4px; background: #f8fafc; border-radius: 3px; display: flex; justify-content: space-between;">
            <span><strong>Final Subject Score:</strong> ${escapeHtml(sub.totalScore || "98")}% (Grade ${escapeHtml(sub.grade || "A1")})</span>
            <span><strong>Certified By:</strong> ${escapeHtml(subjectTeacher)}</span>
          </div>
        </div>

        <!-- Child Overall Performance Graph -->
        <div class="sp-card sp-perf-graph-card">
          <div class="sp-card-title">
            <span>📈 Child Overall Academic Performance Graph</span>
            <span style="font-size: 7.5pt; color: #4338ca; font-weight: 700;">Trajectory & Benchmark</span>
          </div>
          <div class="sp-perf-graph-wrapper">
            ${perfSvg}
          </div>
        </div>

        <!-- Subject Core Competency Matrix -->
        <div class="sp-card">
          <div class="sp-card-title"><span>⚡ ${escapeHtml(subjectName)} Competency Matrix (Rate 1–5)</span></div>
          <div class="sp-skills-grid">
            <div class="sp-skill-badge"><span>Concept Clarity</span><span class="score">${comp.conceptClarity || "5.0"}/5</span></div>
            <div class="sp-skill-badge"><span>Problem Solving</span><span class="score">${comp.problemSolving || "5.0"}/5</span></div>
            <div class="sp-skill-badge"><span>Practical/Lab</span><span class="score">${comp.practicalLabWork || "4.8"}/5</span></div>
            <div class="sp-skill-badge"><span>Portfolio Sub</span><span class="score">${comp.portfolioRegularity || "5.0"}/5</span></div>
            <div class="sp-skill-badge"><span>Class Regularity</span><span class="score">${comp.regularityHomework || "4.9"}/5</span></div>
            <div class="sp-skill-badge"><span>Viva/Oral</span><span class="score">${comp.vivaCommunication || "4.7"}/5</span></div>
          </div>
        </div>

        <!-- Subject Improvement Roadmap -->
        <div class="sp-card">
          <div class="sp-card-title"><span>🌱 ${escapeHtml(subjectName)} Target & Action Plan</span></div>
          <div style="font-size: 8pt; line-height: 1.35;">
            <strong>Focus Area:</strong> ${escapeHtml(sub.improvementPlan?.area || "Advanced problem speed and proofs")}<br>
            <strong>Action Plan:</strong> ${escapeHtml(sub.improvementPlan?.plan || "Daily exemplar practice under timer")}<br>
            <div style="display: flex; justify-content: space-between; margin-top: 1px;">
              <span><strong>Target:</strong> ${escapeHtml(sub.improvementPlan?.target || "Term 2")}</span>
              <span><strong>Status:</strong> <strong style="color: #16a34a;">${escapeHtml(sub.improvementPlan?.progress || "In Progress")}</strong></span>
            </div>
          </div>
        </div>

      </div>

      <!-- RIGHT COLUMN -->
      <div class="sp-col">
        
        <!-- Subject Projects & Practical Work -->
        <div class="sp-card">
          <div class="sp-card-title"><span>💡 ${escapeHtml(subjectName)} Projects & Practical Work</span></div>
          <div style="font-size: 8.2pt; line-height: 1.35; margin-bottom: 2.5px;">
            <strong>1. ${escapeHtml(sub.proj1Title || "Subject Practical Project 1")}:</strong>
            ${escapeHtml(sub.proj1Did || "")}. <em>Learned:</em> ${escapeHtml(sub.proj1Learned || "")}
          </div>
          <div style="font-size: 8.2pt; line-height: 1.35;">
            <strong>2. ${escapeHtml(sub.proj2Title || "Lab Experiment / Project 2")}:</strong>
            ${escapeHtml(sub.proj2Did || "")}. <em>Learned:</em> ${escapeHtml(sub.proj2Learned || "")}
          </div>
        </div>

        <!-- Subject Achievements & Honors -->
        <div class="sp-card">
          <div class="sp-card-title"><span>🏆 ${escapeHtml(subjectName)} Honors & Achievements</span></div>
          <div style="font-size: 8.2pt; line-height: 1.35;">
            <strong>Olympiad / Competition:</strong> ${escapeHtml(d.achievements && d.achievements[0] ? d.achievements[0].title : "Subject Olympiad Distinction")}<br>
            <strong>Award / Distinction:</strong> ${escapeHtml(d.academicAchievement || "Ranked 1st in Annual Honors & STEM Distinction")}
          </div>
        </div>

        <!-- Student Subject Self-Reflection -->
        <div class="sp-card">
          <div class="sp-card-title"><span>✍️ Student Reflection on ${escapeHtml(subjectName)}</span></div>
          <div style="font-size: 8.2pt; line-height: 1.35; color: #334155;">
            <strong>Learning:</strong> ${escapeHtml(sub.subjectReflection || "Mastered curriculum concepts and applied logical principles.")}<br>
            <strong>Challenge Overcome:</strong> ${escapeHtml(d.refChallenge || "Balanced examination revision alongside practical project work.")}
          </div>
        </div>

        <!-- Subject Teacher's Assessment -->
        <div class="sp-card">
          <div class="sp-card-title">
            <span>👩‍🏫 Subject Teacher's Assessment (${escapeHtml(subjectName)})</span>
            <span style="font-size: 7.8pt; color: #16a34a; font-weight: 800;">Official Certified ✓</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px 4px; font-size: 7.8pt; background: #f8fafc; padding: 2.5px 4px; border-radius: 3px; margin-bottom: 2px;">
            <div>Concept: <strong>Excellent</strong></div>
            <div>Practical: <strong>Excellent</strong></div>
            <div>Regularity: <strong>Excellent</strong></div>
            <div>Portfolio: <strong>Excellent</strong></div>
          </div>
          <div style="font-size: 8.2pt; font-style: italic; color: #1e293b; line-height: 1.3; margin-bottom: 2px;">
            “${escapeHtml(sub.teacherRemarks || "Demonstrates remarkable conceptual clarity, diligence, and intellectual curiosity.")}”
          </div>
          <div style="font-size: 7.8pt; color: #475569; display: flex; justify-content: space-between;">
            <span><strong>Evaluator:</strong> ${escapeHtml(subjectTeacher)} (${escapeHtml(subjectTeacherRole)})</span>
            <span><strong>Date:</strong> ${escapeHtml(sub.teacherSignDate || "15 March 2027")}</span>
          </div>
        </div>

      </div>

    </div>

    <!-- 4. Bottom Signatures Strip -->
    <div class="sp-footer">
      <div class="sp-declaration-quote">
        “I have completed this ${escapeHtml(subjectName)} portfolio with sincere effort, recording all practical activities, lab evidence, and learning reflections.”
      </div>
      <div class="sp-signatures-grid">
        <div class="sp-sig-col">
          <div class="sp-sig-line"></div>
          <strong>${name}</strong>
          <p>Student Signature • ${escapeHtml(d.studentSignDate || "2027")}</p>
        </div>
        <div class="sp-sig-col">
          <div class="sp-sig-line"></div>
          <strong>${escapeHtml(subjectTeacher)}</strong>
          <p>Subject Teacher (${escapeHtml(subjectName)}) • ${escapeHtml(sub.teacherSignDate || "2027")}</p>
        </div>
        <div class="sp-sig-col">
          <div class="sp-sig-line"></div>
          <strong>Principal / Seal</strong>
          <p>${school} • Verified Academic Record</p>
        </div>
      </div>
      <div class="sp-watermark-strip">
        <img src="assets/logo.svg" alt="TechLearners" class="sp-footer-logo">
        <span>Powered by <strong>TechLearners</strong> Student Digital Portfolio Platform • Individual Subject Portfolio Engine</span>
      </div>
    </div>
  `;
}

function renderPreview(d) {
  const sheet = document.getElementById("singlePageSheet");
  if (!sheet) return;
  ensureSubjectPortfoliosData();
  const activeSubId = d.selectedSubjectId || (d.subjectsList && d.subjectsList[0] ? d.subjectsList[0].id : "mathematics");
  sheet.innerHTML = generateSinglePageSheetHtml(d, activeSubId);
  requestAnimationFrame(applySheetScale);
}

function printSinglePage() {
  readFormToData();
  renderPreview(currentData);

  // Automatically add & sync student to the database for teacher/admin review
  if (currentData.studentName && currentData.studentName.trim()) {
    try {
      const activeSub = getActiveSubjectData();
      syncStudentToDatabase({
        source: "print",
        forceReviewSubmit: true,
        studentNote: `Student printed individual subject portfolio for ${activeSub.subject} (Code: ${activeSub.subjectCode}). Submitted for teacher evaluation.`
      });
      showSaveToast(`📄 ${activeSub.subject} Portfolio for "${currentData.studentName}" submitted for teacher review!`);
    } catch (err) {
      console.warn("Auto-sync on print:", err);
    }
  }

  window.print();
}

function printAllSubjectPortfolios() {
  readFormToData();
  saveToLocalStorage();

  ensureSubjectPortfoliosData();
  const subjects = currentData.subjectsList || DEFAULT_SUBJECTS;
  const originalSubjectId = currentData.selectedSubjectId;

  // Render all subject sheets in printable multi-page wrapper
  let multiHtml = "";
  subjects.forEach(s => {
    multiHtml += `
      <div class="multi-subject-print-page" style="page-break-after: always; break-after: page;">
        <div class="single-page-sheet-print" style="width: 194mm; height: 281mm; max-height: 281mm; margin: 0 auto; padding: 5mm 6mm; border: 1.5px solid #000000; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden; background: #ffffff;">
          ${generateSinglePageSheetHtml(currentData, s.id)}
        </div>
      </div>
    `;
  });

  const printDiv = document.createElement("div");
  printDiv.id = "allSubjectsPrintWrapper";
  printDiv.innerHTML = multiHtml;
  document.body.appendChild(printDiv);

  const styleEl = document.createElement("style");
  styleEl.id = "allSubjectsPrintStyle";
  styleEl.innerHTML = `
    @media print {
      #builderLayout, .navbar, .footer, .builder-topbar, .mobile-preview-fab {
        display: none !important;
      }
      #allSubjectsPrintWrapper {
        display: block !important;
      }
      .multi-subject-print-page {
        page-break-after: always !important;
        break-after: page !important;
        height: 281mm !important;
        max-height: 281mm !important;
        overflow: hidden !important;
      }
    }
  `;
  document.head.appendChild(styleEl);

  const prevTitle = document.title;
  document.title = `${currentData.studentName || "Student"} - All Subject Portfolios (A4 Print)`;

  window.print();

  setTimeout(() => {
    document.title = prevTitle;
    if (printDiv.parentNode) printDiv.parentNode.removeChild(printDiv);
    if (styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
    switchSubject(originalSubjectId);
  }, 1000);
}


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
    const prevAcademics = currentData.academics;
    const prevAchievement = currentData.academicAchievement;
    const prevSkills = currentData.skills;
    const prevTeacherRatings = currentData.teacherRatings;
    const prevTeacherRemarks = currentData.teacherRemarks;
    const prevTeacherSignDate = currentData.teacherSignDate;
    const prevImprovementPlans = currentData.improvementPlans;

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
      academics: isTeacherMode ? [
        { subject: "English", t1: "", mid: "", t2: "", remarks: "" },
        { subject: "Hindi", t1: "", mid: "", t2: "", remarks: "" },
        { subject: "Mathematics", t1: "", mid: "", t2: "", remarks: "" },
        { subject: "Science", t1: "", mid: "", t2: "", remarks: "" },
        { subject: "Social Science", t1: "", mid: "", t2: "", remarks: "" },
        { subject: "Computer / IT", t1: "", mid: "", t2: "", remarks: "" },
        { subject: "Other", t1: "", mid: "", t2: "", remarks: "" }
      ] : (prevAcademics || []),
      academicAchievement: isTeacherMode ? "" : (prevAchievement || ""),
      skills: isTeacherMode ? {
        communication: "5.0", reading: "5.0", writing: "5.0", creativity: "5.0",
        problemSolving: "5.0", teamwork: "5.0", leadership: "5.0", timeManagement: "5.0", digitalSkills: "5.0"
      } : (prevSkills || {}),
      activities: [],
      achievements: [],
      proj1Title: "", proj1Did: "", proj1Learned: "",
      proj2Title: "", proj2Did: "", proj2Learned: "",
      participationChecks: [], memorableActivity: "",
      refLearn: "", refAchieve: "", refChallenge: "", refOvercome: "", refBetter: "",
      bestWorkNote: "",
      teacherRatings: isTeacherMode ? {
        academic: "Good", discipline: "Good", regularity: "Good", communication: "Good",
        participation: "Good", teamwork: "Good", leadership: "Good", creativity: "Good"
      } : (prevTeacherRatings || {}),
      teacherRemarks: isTeacherMode ? "" : (prevTeacherRemarks || ""),
      teacherSignDate: isTeacherMode ? "" : (prevTeacherSignDate || ""),
      parentStrengths: "", parentImprove: "", parentSuggestions: "", parentSignDate: "",
      improvementPlans: isTeacherMode ? [] : (prevImprovementPlans || []),
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
function importJson(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (typeof data === "object" && data !== null) {
        currentData = Object.assign({}, SAMPLE_SHM_STUDENT, data);
        syncDataToForm(currentData);
        renderPreview(currentData);
        saveToLocalStorage();
        alert("Portfolio data imported successfully!");
      } else {
        alert("Invalid portfolio JSON format.");
      }
    } catch(err) {
      alert("Error reading JSON file: " + err.message);
    }
  };
  reader.readAsText(file);
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

// =============================================================
// PORTFOLIO REVIEW & SUBMISSION WORKFLOW
// =============================================================

function initReviewStatus() {
  window.addEventListener("portfolio-review-submitted", function() {
    updateReviewStatusUI();
  });
  window.addEventListener("portfolio-review-updated", function() {
    updateReviewStatusUI();
  });
  updateReviewStatusUI();
}

function getActiveSubmission() {
  if (window.PortfolioReviewStore) {
    if (currentData && currentData.reviewSubmissionId) {
      const byId = window.PortfolioReviewStore.getById(currentData.reviewSubmissionId);
      if (byId) return byId;
    }
    if (currentData && currentData.studentName) {
      return window.PortfolioReviewStore.getByStudent(currentData.studentName, currentData.classSection);
    }
  }
  return null;
}

function updateReviewStatusUI() {
  const statusPill = document.getElementById("portfolioReviewStatusPill");
  const dot = document.getElementById("reviewStatusDot");
  const label = document.getElementById("reviewStatusText");
  const actionBtn = document.getElementById("btnReviewActionTrigger");
  const actionBox = document.getElementById("teacherReviewActionBox");
  const actionBoxTitle = document.getElementById("teacherReviewBoxTitle");
  const actionBoxMeta = document.getElementById("teacherReviewBoxMeta");
  const actionBoxIcon = document.getElementById("teacherReviewBoxIcon");
  const approveBtn = document.getElementById("btnTeacherReviewApprove");

  const sub = getActiveSubmission();
  const status = (sub && sub.status) || (currentData && currentData.reviewStatus) || "draft";

  if (!statusPill) return;

  statusPill.classList.remove("review-pill-draft", "review-pill-pending", "review-pill-approved");
  if (dot) dot.classList.remove("blue", "yellow", "green");

  if (status === "approved") {
    statusPill.classList.add("review-pill-approved");
    if (dot) dot.classList.add("green");
    const reviewer = (sub && sub.reviewedBy) || (currentData && currentData.reviewedBy) || "Teacher";
    if (label) label.textContent = `Review: 🟢 Approved (${reviewer})`;
    if (actionBtn) {
      actionBtn.textContent = "✅ Receipt";
      actionBtn.title = "View Teacher Review Approval Details";
    }

    if (actionBox) {
      actionBox.style.display = "flex";
      actionBox.classList.remove("pending-review");
      if (actionBoxIcon) actionBoxIcon.textContent = "✅";
      if (actionBoxTitle) actionBoxTitle.textContent = "Student Portfolio Profile Reviewed & Approved";
      const signDate = (sub && sub.reviewedAtFormatted) || (currentData && currentData.reviewedAtFormatted) || (currentData && currentData.teacherSignDate) || "Verified";
      if (actionBoxMeta) actionBoxMeta.textContent = `Verified by ${reviewer} on ${signDate}. Official academic marks, skills matrix, and evaluation endorsed.`;
      if (approveBtn) {
        approveBtn.textContent = "📝 Update Assessment";
        approveBtn.style.background = "#4338ca";
        approveBtn.style.borderColor = "#4338ca";
      }
    }
  } else if (status === "pending") {
    statusPill.classList.add("review-pill-pending");
    if (dot) dot.classList.add("yellow");
    const dateStr = (sub && sub.submittedAtFormatted) || (currentData && currentData.submittedAtFormatted) || "Recently";
    if (label) label.textContent = `Review: 🟡 Pending Review (${dateStr.split(',')[0]})`;
    if (actionBtn) {
      actionBtn.textContent = "👁️ View / Resend";
      actionBtn.title = "View Submission Receipt or Re-send profile";
    }

    if (actionBox) {
      actionBox.style.display = "flex";
      actionBox.classList.add("pending-review");
      if (actionBoxIcon) actionBoxIcon.textContent = "📨";
      if (actionBoxTitle) actionBoxTitle.textContent = "Portfolio Profile Submitted for Teacher Review";
      const noteSnippet = (sub && sub.studentNote) ? ` • Note: "${escapeHtml(sub.studentNote)}"` : "";
      if (actionBoxMeta) actionBoxMeta.textContent = `Submitted on ${dateStr}${noteSnippet}. Awaiting teacher assessment and verification.`;
      if (approveBtn) {
        approveBtn.textContent = "✅ Approve & Complete Review";
        approveBtn.style.background = "#16a34a";
        approveBtn.style.borderColor = "#16a34a";
      }
    }
  } else {
    // Draft / Not submitted
    statusPill.classList.add("review-pill-draft");
    if (dot) dot.classList.add("blue");
    if (label) label.textContent = "Review: Ready to Send";
    if (actionBtn) {
      actionBtn.textContent = "📨 Send";
      actionBtn.title = "Save and submit portfolio profile for teacher review";
    }

    if (actionBox) {
      if (isTeacherMode) {
        actionBox.style.display = "flex";
        actionBox.classList.add("pending-review");
        if (actionBoxIcon) actionBoxIcon.textContent = "👩‍🏫";
        if (actionBoxTitle) actionBoxTitle.textContent = "Teacher Assessment Mode Active";
        if (actionBoxMeta) actionBoxMeta.textContent = "Student has not yet submitted an official review request. You can evaluate and directly approve marks below.";
        if (approveBtn) {
          approveBtn.textContent = "✅ Sign & Approve Portfolio";
          approveBtn.style.background = "#16a34a";
          approveBtn.style.borderColor = "#16a34a";
        }
      } else {
        actionBox.style.display = "none";
      }
    }
  }
}

function openSaveAndSendModal() {
  readFormToData();

  if (!currentData.studentName || !currentData.studentName.trim()) {
    alert("⚠️ Please enter the Student's Full Name in Step 1 (Profile) before saving and sending for teacher review.");
    goToStep(0);
    const inp = document.getElementById("f_studentName");
    if (inp) {
      inp.focus();
      inp.style.borderColor = "#dc2626";
      setTimeout(() => { inp.style.borderColor = ""; }, 2500);
    }
    return;
  }

  if (!currentData.classSection || !currentData.classSection.trim()) {
    alert("⚠️ Please enter the Class & Section in Step 1 (Profile) before saving and sending for teacher review.");
    goToStep(0);
    const inp = document.getElementById("f_classSection");
    if (inp) {
      inp.focus();
      inp.style.borderColor = "#dc2626";
      setTimeout(() => { inp.style.borderColor = ""; }, 2500);
    }
    return;
  }

  const modal = document.getElementById("saveSendReviewModal");
  if (!modal) return;

  // Populate modal summary fields
  const nameEl = document.getElementById("modalSummaryStudentName");
  const classEl = document.getElementById("modalSummaryClass");
  const rollAdmEl = document.getElementById("modalSummaryRollAdm");
  const sessionEl = document.getElementById("modalSummarySession");
  const teacherInput = document.getElementById("reviewTargetTeacher");
  const noteInput = document.getElementById("reviewStudentNote");
  const feedback = document.getElementById("saveSendFeedback");

  if (nameEl) nameEl.textContent = currentData.studentName;
  if (classEl) classEl.textContent = currentData.classSection;
  if (rollAdmEl) rollAdmEl.textContent = `${currentData.rollNo || "—"} / ${currentData.admissionNo || "—"}`;
  if (sessionEl) sessionEl.textContent = currentData.academicSession || "2026–2027";

  const sub = getActiveSubmission();
  const activeSub = (typeof getActiveSubjectData === "function") ? getActiveSubjectData() : null;
  if (teacherInput) {
    teacherInput.value = (activeSub && activeSub.subjectTeacher) || (sub && sub.targetTeacher) || currentData.classTeacher || "";
  }
  if (noteInput) {
    teacherInput.title = activeSub ? `Subject Teacher for ${activeSub.subject}` : "Class Teacher";
    noteInput.value = (sub && sub.studentNote) || (activeSub ? `Dear Teacher, please review my individual subject portfolio for ${activeSub.subject} (Code: ${activeSub.subjectCode}) and verify my marks and practical work.` : "") || currentData.studentReviewNote || "";
  }
  if (feedback) feedback.textContent = "";

  modal.style.display = "flex";
}

function closeSaveSendModal() {
  const modal = document.getElementById("saveSendReviewModal");
  if (modal) modal.style.display = "none";
}

function handleConfirmSendForReview(e) {
  if (e && e.preventDefault) e.preventDefault();

  readFormToData();

  const teacherInput = document.getElementById("reviewTargetTeacher");
  const noteInput = document.getElementById("reviewStudentNote");
  const targetTeacher = teacherInput ? teacherInput.value.trim() : (currentData.classTeacher || "");
  const studentNote = noteInput ? noteInput.value.trim() : "";

  if (targetTeacher) {
    currentData.classTeacher = targetTeacher;
    setVal("f_classTeacher", targetTeacher);
  }

  currentData.targetTeacher = targetTeacher;
  currentData.studentReviewNote = studentNote;
  currentData.reviewStatus = "pending";
  currentData.reviewStatusLabel = "Pending Teacher Review";

  // Automatically save and sync student into master database and review queue
  const dbStudent = syncStudentToDatabase({
    source: "send_review",
    forceReviewSubmit: true,
    studentNote: studentNote || "Submitted for teacher review & evaluation."
  });

  saveToLocalStorage();
  updateReviewStatusUI();
  renderPreview(currentData);
  closeSaveSendModal();

  showSaveToast(`Profile for "${currentData.studentName}" saved & queued for teacher review!`, 5000);

  alert(`✅ Portfolio profile successfully saved & sent for teacher review!\n\n• Student: ${currentData.studentName}\n• Class: ${currentData.classSection}\n• Reviewer: ${targetTeacher || "Class Teacher"}\n• Status: Pending Teacher Review\n\nYour portfolio profile has been automatically added to the database and queued in the Teacher Admin Dashboard for evaluation of your marks, skills matrix, and teacher remarks.`);

  return false;
}

/**
 * Synchronize current student portfolio to the master database (DataStore)
 * and ensure it is tracked in PortfolioReviewStore so admins and teachers can review.
 * @param {Object} [options]
 * @param {string} [options.source] - "manual_save" | "auto_save" | "print" | "send_review" | "teacher_approval"
 * @param {boolean} [options.forceReviewSubmit] - If true, registers/updates in PortfolioReviewStore
 * @param {string} [options.studentNote] - Optional note from student
 */
function syncStudentToDatabase(options = {}) {
  if (!currentData || !currentData.studentName || !currentData.studentName.trim()) {
    return null;
  }

  const sName = currentData.studentName.trim();
  let sClass = "Class VIII";
  let sSection = "A";

  if (currentData.classSection) {
    const rawClass = currentData.classSection.trim();
    if (rawClass.includes("-")) {
      const parts = rawClass.split("-").map(p => p.trim());
      sClass = parts[0] || "Class VIII";
      sSection = parts[1] || "A";
    } else if (rawClass.includes(" ")) {
      const parts = rawClass.split(" ");
      sSection = parts.pop();
      sClass = parts.join(" ") || "Class VIII";
    } else {
      sClass = rawClass;
    }
  }

  let existingStudent = null;
  if (window.DataStore && typeof window.DataStore.getStudents === "function") {
    const students = window.DataStore.getStudents();
    if (currentData.id) {
      existingStudent = students.find(s => s.id === currentData.id);
    }
    if (!existingStudent && currentData.admissionNo) {
      existingStudent = students.find(s => (s.admissionNo && s.admissionNo.toLowerCase() === currentData.admissionNo.trim().toLowerCase()) || s.id === currentData.admissionNo.trim());
    }
    if (!existingStudent && sName) {
      existingStudent = students.find(s => s.name && s.name.trim().toLowerCase() === sName.toLowerCase());
    }
  }

  // Generate or preserve ID
  const studentId = (existingStudent && existingStudent.id) || currentData.id || 
    ("tl-2026-" + sName.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").slice(0, 16) + "-" + Math.random().toString(36).substr(2, 4));
  currentData.id = studentId;

  // Infer student team
  let studentTeam = (existingStudent && existingStudent.team) || "it";
  const corpus = `${currentData.interests || ""} ${currentData.proj1Title || ""} ${currentData.proj1Did || ""} ${currentData.yearFavActivity || ""}`.toLowerCase();
  if (corpus.includes("robot") || corpus.includes("circuit") || corpus.includes("arduino") || corpus.includes("sensor")) {
    studentTeam = "robotics";
  } else if (corpus.includes("ai") || corpus.includes("artificial") || corpus.includes("vision") || corpus.includes("machine learning")) {
    studentTeam = "ai";
  }

  // Sync projects
  const dbProjects = (existingStudent && Array.isArray(existingStudent.projects) && existingStudent.projects.length > 0)
    ? [...existingStudent.projects]
    : [];

  if (currentData.proj1Title && !dbProjects.some(p => p.title === currentData.proj1Title)) {
    dbProjects.unshift({
      id: "proj-1-" + Date.now().toString(36),
      title: currentData.proj1Title,
      category: studentTeam === "robotics" ? "Hardware & Robotics" : (studentTeam === "ai" ? "AI Exploration" : "Digital IT"),
      icon: studentTeam === "robotics" ? "🤖" : (studentTeam === "ai" ? "🧠" : "💻"),
      summary: currentData.proj1Did || "Primary capstone project documented in student portfolio.",
      techStack: [currentData.proj1Learned || "Practical Tech"].filter(Boolean),
      impact: "Single-Page Verified Portfolio Project",
      liveDemoUrl: "",
      repoUrl: ""
    });
  }

  if (currentData.proj2Title && !dbProjects.some(p => p.title === currentData.proj2Title)) {
    dbProjects.push({
      id: "proj-2-" + Date.now().toString(36),
      title: currentData.proj2Title,
      category: "Digital Content & Web",
      icon: "🚀",
      summary: currentData.proj2Did || "Secondary technology project.",
      techStack: [currentData.proj2Learned || "Web & Media"].filter(Boolean),
      impact: "Demonstrated in class reviews",
      liveDemoUrl: "",
      repoUrl: ""
    });
  }

  // Sync achievements
  const dbAchievements = (existingStudent && Array.isArray(existingStudent.achievements) && existingStudent.achievements.length > 0)
    ? [...existingStudent.achievements]
    : [];

  if (Array.isArray(currentData.achievements)) {
    currentData.achievements.forEach((ach, i) => {
      if (ach && ach.title && !dbAchievements.some(a => a.title === ach.title)) {
        dbAchievements.push({
          id: "ach-" + (i + 1) + "-" + Date.now().toString(36),
          title: ach.title,
          issuer: ach.event || "SHM Academy",
          year: (ach.date || "2026").match(/\d{4}/)?.[0] || "2026",
          category: "School & Co-Curricular",
          badge: ach.award || "Honor Award"
        });
      }
    });
  }

  // Calculate Academic Score Average
  let academicScoreStr = (existingStudent && existingStudent.academicScore) || "92.5%";
  if (Array.isArray(currentData.academics) && currentData.academics.length > 0) {
    let sum = 0, count = 0;
    currentData.academics.forEach(ac => {
      const val = parseFloat(ac.t2 || ac.mid || ac.t1);
      if (!isNaN(val)) {
        sum += val;
        count++;
      }
    });
    if (count > 0) {
      academicScoreStr = (sum / count).toFixed(1) + "%";
    }
  }

  // Scorecard
  let scorecard = (existingStudent && Array.isArray(existingStudent.scorecard) && existingStudent.scorecard.length > 0)
    ? existingStudent.scorecard
    : [];
  if ((!scorecard || scorecard.length === 0) && Array.isArray(currentData.academics)) {
    scorecard = currentData.academics.map(ac => ({
      area: ac.subject,
      level: parseFloat(ac.t2 || ac.mid || ac.t1 || "85") || 85,
      description: ac.remarks || "Assessed academic performance"
    }));
  }

  // Register in Review Queue if forced or pending
  let reviewRecord = null;
  if (window.PortfolioReviewStore && (options.forceReviewSubmit || currentData.reviewStatus === "pending")) {
    try {
      reviewRecord = window.PortfolioReviewStore.submitReview({
        studentName: sName,
        classSection: currentData.classSection || `${sClass} - ${sSection}`,
        rollNo: currentData.rollNo || "1",
        admissionNo: currentData.admissionNo || studentId,
        targetTeacher: currentData.classTeacher || "Class Teacher",
        studentNote: options.studentNote || (options.source === "print" 
          ? "Single-page printable portfolio generated. Auto-submitted for teacher evaluation." 
          : "Saved & submitted from Portfolio Profile Builder."),
        data: currentData
      });
      if (reviewRecord && reviewRecord.id) {
        currentData.reviewSubmissionId = reviewRecord.id;
        currentData.reviewStatus = reviewRecord.status || "pending";
        currentData.reviewStatusLabel = reviewRecord.statusLabel || "Pending Teacher Review";
      }
    } catch (e) {
      console.warn("PortfolioReviewStore auto-submit:", e);
    }
  }

  // Create or update student record in DataStore
  const dbStudent = {
    ...(existingStudent || {}),
    id: studentId,
    name: sName,
    gender: (existingStudent && existingStudent.gender) || "Male",
    team: studentTeam,
    teamRole: (existingStudent && existingStudent.teamRole) || (studentTeam === "robotics" ? "Robotics & Hardware Scholar" : (studentTeam === "ai" ? "AI Exploration Specialist" : "IT Digital Content Specialist")),
    class: sClass,
    section: sSection,
    rollNo: currentData.rollNo || (existingStudent && existingStudent.rollNo) || "1",
    admissionNo: currentData.admissionNo || (existingStudent && existingStudent.admissionNo) || studentId,
    dob: currentData.dob || (existingStudent && existingStudent.dob) || "2012-08-15",
    avatar: currentData.photoUrl || (existingStudent && existingStudent.avatar) || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400",
    coverImage: (existingStudent && existingStudent.coverImage) || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200",
    tagline: currentData.interests ? `${currentData.interests} • ${currentData.schoolName || "SHM Academy"}` : ((existingStudent && existingStudent.tagline) || "Student Portfolio Builder"),
    bio: currentData.aboutSentence || (existingStudent && existingStudent.bio) || "Dedicated student portfolio profile.",
    motto: currentData.schoolMotto || (existingStudent && existingStudent.motto) || "“Infinite Knowledge Through Education.”",
    attendance: (existingStudent && existingStudent.attendance) || "97.5%",
    academicScore: academicScoreStr,
    activityCycle: (existingStudent && existingStudent.activityCycle) || {
      team: studentTeam,
      projectName: currentData.proj1Title || "Hands-on Technology Project",
      learn: {
        title: "Learn & Research Concepts",
        desc: currentData.proj1Learned || "Researched principles, logic, and practical frameworks."
      },
      make: {
        title: "Build & Execute Prototype",
        desc: currentData.proj1Did || "Constructed and implemented the working project."
      },
      show: {
        title: "Live Exhibition & Demonstration",
        desc: currentData.memorableActivity || "Demonstrated live in school exhibitions."
      },
      record: {
        title: "Record Video & Documentation",
        desc: currentData.bestWorkNote || "Recorded portfolio showcase and verified deliverables."
      }
    },
    outputDeliverables: (existingStudent && existingStudent.outputDeliverables) || {
      target: "1–3 working projects + photos + demonstration video",
      status: `Completed (${dbProjects.length} Projects, ${dbAchievements.length} Badges)`,
      items: []
    },
    introVideo: (existingStudent && existingStudent.introVideo) || {
      title: "Student Project Showcase",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: "Demonstration of student practical projects."
    },
    growthRecords: (existingStudent && existingStudent.growthRecords) || [
      { skill: "Problem Solving", icon: "🧠", before: "Basic analytical reasoning", after: "Advanced structured solution building" },
      { skill: "Digital Collaboration", icon: "💻", before: "Individual tasks", after: "Team project coordination and demo leadership" }
    ],
    scorecard: scorecard,
    projects: dbProjects,
    achievements: dbAchievements,
    teacherObservation: {
      teacherName: currentData.classTeacher || ((existingStudent && existingStudent.teacherObservation && existingStudent.teacherObservation.teacherName) || "Class Teacher"),
      role: "Class Teacher & Mentor",
      remark: currentData.teacherRemarks || ((existingStudent && existingStudent.teacherObservation && existingStudent.teacherObservation.remark) || "Profile saved in database and ready for teacher evaluation."),
      rating: (existingStudent && existingStudent.teacherObservation && existingStudent.teacherObservation.rating) || "Outstanding (A+)",
      date: currentData.teacherSignDate || "Current Academic Session"
    },
    parentNote: {
      parentsName: currentData.fatherName || currentData.motherName || ((existingStudent && existingStudent.parentNote && existingStudent.parentNote.parentsName) || "Parent / Guardian"),
      note: currentData.parentStrengths || ((existingStudent && existingStudent.parentNote && existingStudent.parentNote.note) || "Active participant in school learning programs."),
      date: currentData.parentSignDate || "Current Academic Session"
    },
    futureGoals: Array.isArray(currentData.improvementPlans) && currentData.improvementPlans.length > 0
      ? currentData.improvementPlans.map(p => `${p.area}: ${p.plan} (${p.target || "Upcoming Term"})`)
      : ((existingStudent && existingStudent.futureGoals) || [currentData.shortGoal, currentData.longGoal].filter(Boolean)),
    reviewStatus: currentData.reviewStatus || "pending",
    reviewSubmissionId: currentData.reviewSubmissionId || null,
    lastSavedAt: new Date().toISOString(),
    lastSavedSource: options.source || "manual",
    portfolioBuilderData: Object.assign({}, currentData)
  };

  if (window.DataStore && typeof window.DataStore.saveStudent === "function") {
    window.DataStore.saveStudent(dbStudent);
  }

  // Notify listeners across application
  try {
    window.dispatchEvent(new CustomEvent("student-database-updated", { detail: dbStudent }));
  } catch (e) {}

  return dbStudent;
}

/**
 * Save profile explicitly to database with user feedback
 * @param {boolean} showAlert
 */
function saveProfileToDatabase(showAlert = true) {
  readFormToData();

  if (!currentData.studentName || !currentData.studentName.trim()) {
    alert("⚠️ Please enter the Student Full Name before saving to the database.");
    const nameInput = document.getElementById("f_studentName");
    if (nameInput) {
      goToStep(0);
      nameInput.focus();
    }
    return;
  }

  saveToLocalStorage();
  const dbStudent = syncStudentToDatabase({
    source: "manual_save",
    forceReviewSubmit: true,
    studentNote: "Student clicked 'Save Profile' in Portfolio Builder. Auto-queued for teacher & admin review."
  });

  updateReviewStatusUI();
  renderPreview(currentData);

  const toastMsg = `Profile for "${currentData.studentName}" saved to database! Admins & teachers can now review.`;
  showSaveToast(toastMsg, 5000);

  if (showAlert) {
    alert(`✅ Student Profile Saved to Database!\n\n• Student: ${currentData.studentName}\n• Class: ${currentData.classSection}\n• Database ID: ${currentData.id}\n• Review Status: ${currentData.reviewStatusLabel || "Pending Teacher Review"}\n\nTeachers and Admins can now view, evaluate, and review this portfolio profile in the Admin Dashboard.`);
  }
}

/**
 * Display non-intrusive floating toast notification
 */
function showSaveToast(message, duration = 4000) {
  let toast = document.getElementById("portfolioSaveToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "portfolioSaveToast";
    toast.className = "portfolio-save-toast";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span style="font-size: 1.15rem;">💾</span> <span>${message}</span>`;
  toast.style.display = "flex";
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    if (toast) toast.style.display = "none";
  }, duration);
}

function handleReviewStatusPillClick() {
  const sub = getActiveSubmission();
  const status = (sub && sub.status) || (currentData && currentData.reviewStatus) || "draft";
  if (status === "draft") {
    openSaveAndSendModal();
  } else {
    openReviewReceiptModal();
  }
}

function handleReviewBadgeAction(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  handleReviewStatusPillClick();
}

function openReviewReceiptModal() {
  const modal = document.getElementById("reviewReceiptModal");
  const content = document.getElementById("receiptModalContent");
  const title = document.getElementById("receiptModalTitle");
  const icon = document.getElementById("receiptStatusIcon");

  if (!modal || !content) return;

  const sub = getActiveSubmission();
  const status = (sub && sub.status) || (currentData && currentData.reviewStatus) || "pending";
  const isApproved = status === "approved";

  if (icon) icon.textContent = isApproved ? "✅" : "⌛";
  if (title) title.textContent = isApproved ? "Portfolio Approved & Verified" : "Review Submission Receipt";

  const submissionId = (sub && sub.id) || (currentData && currentData.reviewSubmissionId) || "SUB-" + (currentData.studentName || "record");
  const submittedDate = (sub && sub.submittedAtFormatted) || (currentData && currentData.submittedAtFormatted) || "Recently";
  const teacherName = (sub && sub.targetTeacher) || (currentData && currentData.classTeacher) || "Class Teacher";
  const reviewedBy = (sub && sub.reviewedBy) || (currentData && currentData.reviewedBy) || teacherName;
  const reviewedAt = (sub && sub.reviewedAtFormatted) || (currentData && currentData.reviewedAtFormatted) || "";
  const teacherRemarks = (sub && sub.teacherRemarks) || (currentData && currentData.teacherRemarks) || "";
  const studentNote = (sub && sub.studentNote) || (currentData && currentData.studentReviewNote) || "";

  content.innerHTML = `
    <div style="background: ${isApproved ? "#f0fdf4" : "#fffbeb"}; border: 1.5px solid ${isApproved ? "#86efac" : "#fde68a"}; border-radius: 10px; padding: 0.85rem; margin-bottom: 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
        <span style="font-weight: 800; font-size: 0.88rem; color: ${isApproved ? "#166534" : "#92400e"};">
          ${isApproved ? "🟢 Reviewed & Approved by Teacher" : "🟡 Under Review by Class Teacher"}
        </span>
        <span style="font-family: monospace; font-size: 0.72rem; color: #64748b;">${escapeHtml(submissionId)}</span>
      </div>
      <p style="margin: 0; font-size: 0.8rem; color: #475569;">
        ${isApproved ? `Official assessment verified by <strong>${escapeHtml(reviewedBy)}</strong> on ${escapeHtml(reviewedAt)}.` : `Submitted on ${escapeHtml(submittedDate)} to <strong>${escapeHtml(teacherName)}</strong>.`}
      </p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.65rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.75rem; margin-bottom: 1rem; font-size: 0.82rem;">
      <div><span style="color: #64748b;">Student Name:</span><br><strong>${escapeHtml(currentData.studentName || "—")}</strong></div>
      <div><span style="color: #64748b;">Class & Section:</span><br><strong>${escapeHtml(currentData.classSection || "—")}</strong></div>
      <div><span style="color: #64748b;">Roll / Admission:</span><br><strong>${escapeHtml(currentData.rollNo || "—")} / ${escapeHtml(currentData.admissionNo || "—")}</strong></div>
      <div><span style="color: #64748b;">Assigned Teacher:</span><br><strong>${escapeHtml(teacherName)}</strong></div>
    </div>

    ${studentNote ? `
      <div style="margin-bottom: 0.85rem;">
        <span style="font-weight: 700; font-size: 0.78rem; color: #475569; display: block; margin-bottom: 0.2rem;">📝 Student Note to Teacher:</span>
        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 0.5rem 0.65rem; font-size: 0.82rem; color: #334155; font-style: italic;">
          “${escapeHtml(studentNote)}”
        </div>
      </div>
    ` : ""}

    ${isApproved && teacherRemarks ? `
      <div style="margin-bottom: 0.85rem;">
        <span style="font-weight: 700; font-size: 0.78rem; color: #166534; display: block; margin-bottom: 0.2rem;">👩‍🏫 Official Teacher Assessment Remarks:</span>
        <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 6px; padding: 0.5rem 0.65rem; font-size: 0.82rem; color: #14532d; font-weight: 600;">
          “${escapeHtml(teacherRemarks)}”
        </div>
      </div>
    ` : ""}
  `;

  modal.style.display = "flex";
}

function closeReviewReceiptModal() {
  const modal = document.getElementById("reviewReceiptModal");
  if (modal) modal.style.display = "none";
}

function approveCurrentStudentReview() {
  if (!isTeacherMode) {
    openTeacherAuthModal();
    return;
  }

  const teacherRole = sessionStorage.getItem("portfolio_teacher_role") || (currentData && currentData.classTeacher) || "Class Teacher";
  const defaultRemarks = (currentData && currentData.teacherRemarks) || "Demonstrates outstanding curiosity, consistent diligence, and exemplary practical project work.";
  
  const enteredRemarks = prompt(`👩‍🏫 Enter / Confirm Teacher Remarks to Approve Portfolio for ${currentData.studentName}:`, defaultRemarks);
  if (enteredRemarks === null) return;

  const todayStr = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

  currentData.teacherRemarks = enteredRemarks.trim();
  setVal("f_teacherRemarks", currentData.teacherRemarks);

  if (!currentData.teacherSignDate || !currentData.teacherSignDate.trim()) {
    currentData.teacherSignDate = todayStr;
    setVal("f_teacherSignDate", todayStr);
  }

  const sub = getActiveSubmission();
  const submissionId = (sub && sub.id) || (currentData && currentData.reviewSubmissionId) || "SUB-" + Date.now().toString(36).toUpperCase();

  if (window.PortfolioReviewStore) {
    window.PortfolioReviewStore.approveReview(submissionId, {
      status: "approved",
      reviewedBy: teacherRole,
      teacherRemarks: currentData.teacherRemarks,
      teacherRatings: currentData.teacherRatings
    });
  }

  currentData.reviewStatus = "approved";
  currentData.reviewStatusLabel = "Reviewed & Approved";
  currentData.reviewedBy = teacherRole;
  currentData.reviewedAt = new Date().toISOString();
  currentData.reviewedAtFormatted = todayStr;

  syncStudentToDatabase({
    source: "teacher_approval"
  });

  saveToLocalStorage();
  updateReviewStatusUI();
  renderPreview(currentData);

  alert(`✅ Portfolio Profile for ${currentData.studentName} is officially APPROVED!\n\n• Verified By: ${teacherRole}\n• Sign Date: ${currentData.teacherSignDate}\n• Status: Reviewed & Approved\n\nThe single-page print and verified records are now officially endorsed.`);
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
window.openTeacherAuthModal = openTeacherAuthModal;
window.closeTeacherAuthModal = closeTeacherAuthModal;
window.toggleTeacherAuth = toggleTeacherAuth;
window.handleTeacherPasscodeSubmit = handleTeacherPasscodeSubmit;
window.lockTeacherMode = lockTeacherMode;
window.updateTeacherLockUI = updateTeacherLockUI;

// Review & Database sync hooks
window.openSaveAndSendModal = openSaveAndSendModal;
window.closeSaveSendModal = closeSaveSendModal;
window.handleConfirmSendForReview = handleConfirmSendForReview;
window.handleReviewStatusPillClick = handleReviewStatusPillClick;
window.handleReviewBadgeAction = handleReviewBadgeAction;
window.openReviewReceiptModal = openReviewReceiptModal;
window.closeReviewReceiptModal = closeReviewReceiptModal;
window.approveCurrentStudentReview = approveCurrentStudentReview;
window.updateReviewStatusUI = updateReviewStatusUI;
window.syncStudentToDatabase = syncStudentToDatabase;
window.saveProfileToDatabase = saveProfileToDatabase;
window.showSaveToast = showSaveToast;

// Subject Portfolio & Performance Graph hooks
window.switchSubject = switchSubject;
window.updateActiveSubjectField = updateActiveSubjectField;
window.updateSubjectEvalPhase = updateSubjectEvalPhase;
window.updateSubjectBenchmarkScore = updateSubjectBenchmarkScore;
window.toggleAllSubjectBenchmarkEditor = toggleAllSubjectBenchmarkEditor;
window.openAddSubjectModal = openAddSubjectModal;
window.closeAddSubjectModal = closeAddSubjectModal;
window.handleAddSubjectSubmit = handleAddSubjectSubmit;
window.printAllSubjectPortfolios = printAllSubjectPortfolios;
window.generateOverallPerformanceSvg = generateOverallPerformanceSvg;


