/**
 * School Digital Student Portfolio Platform - Master Dataset
 * Structured around 3 Practical Technology Teams:
 * 1. 💻 IT Team (Digital Content: Posters, Presentations, Docs, Sheets, Notices)
 * 2. 🤖 Robotics Team (Models & Hardware: Circuits, Sensors, Small Robots, Robot Coding)
 * 3. 🧠 AI Team (AI Exploration: AI Tools, Image/Text Recognition, Interactive Demos)
 *
 * Core Activity Cycle: Learn → Make → Show → Record
 */

const DEFAULT_SCHOOL_CONFIG = {
  schoolName: "Techlearners Digital Portfolio",
  schoolMotto: "Inspiring Innovation, Excellence & Character",
  academicYear: "2026–2027",
  logoUrl: "assets/logo.svg",
  contactEmail: "portfolios@techlearners.edu.in",
  portalUrl: "https://techlearners.in/portfolio/"
};

const DEFAULT_TEAMS_CONFIG = {
  it: {
    id: "it",
    name: "IT Team",
    emoji: "💻",
    work: "Create digital content",
    tasks: [
      "Make posters",
      "Make presentations",
      "Create documents",
      "Make spreadsheets",
      "Prepare school/event notices"
    ],
    finalOutput: "Best 3–5 digital works + photos + short team video",
    color: "#4f46e5",
    gradient: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)",
    bgLight: "#eef2ff",
    badgeClass: "team-badge-it"
  },
  robotics: {
    id: "robotics",
    name: "Robotics Team",
    emoji: "🤖",
    work: "Build and demonstrate robots/models",
    tasks: [
      "Make simple circuits",
      "Work with sensors",
      "Build small robots",
      "Program robots",
      "Demonstrate working models"
    ],
    finalOutput: "1–3 working projects + photos + demonstration video",
    color: "#059669",
    gradient: "linear-gradient(135deg, #059669 0%, #0d9488 100%)",
    bgLight: "#ecfdf5",
    badgeClass: "team-badge-robotics"
  },
  ai: {
    id: "ai",
    name: "AI Team",
    emoji: "🧠",
    work: "Explore and create simple AI projects",
    tasks: [
      "Learn about AI",
      "Use AI tools",
      "Create simple AI projects",
      "Make image/text recognition projects",
      "Give AI demonstrations"
    ],
    finalOutput: "1–3 AI projects + screenshots/photos + short team video",
    color: "#7c3aed",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)",
    bgLight: "#f5f3ff",
    badgeClass: "team-badge-ai"
  }
};

const DEFAULT_STUDENTS = [
  {
    id: "tl-2026-8a-12",
    name: "Rahul Kumar",
    gender: "Male",
    class: "Class VIII",
    section: "A",
    rollNo: "12",
    dob: "2013-05-14",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80",
    team: "robotics",
    teamRole: "Lead Robotics & Embedded Systems Builder",
    tagline: "Robotics Team Lead • Sensor & Microcontroller Specialist",
    bio: "Class VIII student building autonomous robots, smart soil sensors, and programmable circuits. Passionate about hardware troubleshooting and live engineering demos.",
    motto: "“Build with purpose, test with patience, inspire through demo.”",
    attendance: "96.4%",
    academicScore: "92.8%",
    
    // Team Activity Cycle (Learn -> Make -> Show -> Record)
    activityCycle: {
      team: "robotics",
      projectName: "Smart Soil Moisture & Irrigation Bot",
      learn: {
        title: "Learn Circuit & Sensor Logic",
        desc: "Mastered analog-to-digital sensor calibration, breadboard wiring, and C++/Micro:bit programming for moisture detection."
      },
      make: {
        title: "Build the Working Hardware",
        desc: "Assembled a working prototype using Arduino Uno, capacitive moisture probes, 5V mini water pump relay, and recycled acrylic chassis."
      },
      show: {
        title: "Live Exhibition Demo",
        desc: "Demonstrated automated irrigation to 200+ students and judges during the Annual Inter-School STEM Expo."
      },
      record: {
        title: "Record 1-Minute Demonstration Video",
        desc: "Filmed and narrated a concise 60-second video demo capturing real-time soil sensing, dry/wet LED indicators, and pump trigger."
      }
    },

    outputDeliverables: {
      target: "1–3 working projects + photos + demonstration video",
      status: "Completed (3 Projects, 4 Media Items, 1 Demo Video)",
      checklist: [
        { item: "Smart Soil Moisture & Pump System", type: "Working Project", icon: "🌱", verified: true },
        { item: "Obstacle-Avoiding Ultrasonic Rover", type: "Working Project", icon: "🤖", verified: true },
        { item: "Traffic Light Sequencer Breadboard", type: "Working Project", icon: "🚦", verified: true },
        { item: "Hardware Assembly & Expo Photos", type: "Photos / Media", icon: "📸", verified: true },
        { item: "60-Second Live Demonstration Video", type: "Demo Video", icon: "📹", verified: true }
      ]
    },

    introVideo: {
      title: "Rahul Kumar - Robotics Demo & Activity Cycle Video",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
      description: "1-minute recorded demonstration showing the automated soil sensor in action, circuit breadboard layout, and live pump triggering."
    },

    growthRecords: [
      {
        skill: "Robotics & Sensor Circuitry",
        before: "Could only follow step-by-step pre-made toy kits without understanding wiring.",
        after: "Independently diagnosed circuit board wiring issues, calibrated moisture sensors, and programmed ESP32 controllers.",
        icon: "🤖"
      },
      {
        skill: "Technical Demonstration & Presentation",
        before: "Nervous and hesitant when explaining technical wiring to an audience.",
        after: "Delivered live hardware demonstrations to 200+ attendees at the STEM Expo.",
        icon: "🎙️"
      },
      {
        skill: "Algorithmic Logic (C++ / Block Code)",
        before: "Relied solely on copying boilerplate code without understanding conditional loops.",
        after: "Wrote clean threshold logic for sensors and automated fail-safe triggers for hardware.",
        icon: "⚡"
      }
    ],

    scorecard: [
      { area: "Hardware & Circuit Design", level: 5.0, description: "Exceptional mastery of breadboards, sensors & microcontrollers" },
      { area: "Robot Programming", level: 4.5, description: "Strong logic in Arduino C++ and Micro:bit block code" },
      { area: "Live Demonstration & Show", level: 5.0, description: "Engaging, clear live demos during school assemblies" },
      { area: "Teamwork & Collaboration", level: 5.0, description: "Supportive Robotics Team captain & lab peer mentor" },
      { area: "Troubleshooting & Debugging", level: 4.5, description: "Systematic diagnosis of loose connections & faulty components" },
      { area: "Academic Learning", level: 4.5, description: "Top distinctions in Physics, Math & Computer Science" }
    ],

    projects: [
      {
        id: "proj-r1",
        title: "Smart Irrigation & Soil Moisture Guardian",
        category: "Robotics / Sensor",
        icon: "🌱",
        image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=600&auto=format&fit=crop&q=80",
        summary: "An automated watering prototype using microcontrollers and moisture sensors to conserve up to 40% water in school garden beds.",
        techStack: ["Micro:bit / Arduino", "C++", "Moisture Probes", "5V Relay"],
        liveDemoUrl: "https://example.com/demo/smart-irrigation",
        repoUrl: "https://github.com/techlearners-demo/smart-irrigation",
        impact: "1st Prize in Inter-School District STEM Fair 2026"
      },
      {
        id: "proj-r2",
        title: "Obstacle-Avoiding Ultrasonic Rover",
        category: "Robotics / Autonomous",
        icon: "🤖",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80",
        summary: "A dual-motor 2WD robot rover that detects obstacles using HC-SR04 ultrasonic sensors and navigates corridors autonomously.",
        techStack: ["Arduino Uno", "L298N Motor Driver", "Ultrasonic Sensor", "Servo"],
        liveDemoUrl: "https://example.com/demo/obstacle-rover",
        repoUrl: "https://github.com/techlearners-demo/obstacle-rover",
        impact: "Demonstrated live in school computer lab"
      },
      {
        id: "proj-r3",
        title: "Traffic Light Sequencer & Pedestrian Buzzer",
        category: "Circuit / Hardware",
        icon: "🚦",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
        summary: "A breadboard model mimicking city intersection lights with pedestrian crosswalk push-button override and piezo buzzer alert.",
        techStack: ["555 Timer / Arduino", "RGB LEDs", "Piezo Buzzer", "Push Buttons"],
        liveDemoUrl: "https://example.com/demo/traffic-lights",
        repoUrl: "https://github.com/techlearners-demo/traffic-seq",
        impact: "Used as teaching prop in primary school road safety week"
      }
    ],

    achievements: [
      {
        title: "1st Place - Inter-School STEM Robotics Expo",
        issuer: "TechLearners Regional Conclave",
        year: "2026",
        badge: "🏆",
        image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&auto=format&fit=crop&q=80"
      },
      {
        title: "Junior Robotics Builder Certification",
        issuer: "All India Robotics Society",
        year: "2026",
        badge: "📜",
        image: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=600&auto=format&fit=crop&q=80"
      }
    ],

    gallery: [
      {
        title: "Demonstrating Soil Moisture Sensor at STEM Fair",
        category: "Showcase",
        url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80"
      },
      {
        title: "Soldering & Circuit Assembly in Robotics Lab",
        category: "Workshop",
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80"
      }
    ],

    teacherObservation: {
      teacherName: "Dr. K. Narayanan",
      role: "Head of Robotics & Physics Faculty",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      remark: "Rahul executed the entire Robotics Activity Cycle (Learn → Make → Show → Record) with exemplary discipline. His 1-minute video demo and working prototypes set a high standard for peer portfolios.",
      rating: "Outstanding (A+)",
      date: "February 2027"
    },

    parentNote: {
      parentsName: "Mr. Ramesh & Mrs. Priya Kumar",
      note: "Seeing Rahul’s hands-on robots operating in real life and watching his 1-minute demo video fills our hearts with pride!",
      date: "February 2027"
    },

    futureGoals: [
      "Build a dual-axis solar tracking robotics unit for Class IX.",
      "Mentor Class VI & VII juniors in the Robotics Team."
    ]
  },
  {
    id: "tl-2026-7b-07",
    name: "Priya Sharma",
    gender: "Female",
    class: "Class VII",
    section: "B",
    rollNo: "07",
    dob: "2014-08-22",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    team: "it",
    teamRole: "Lead IT & Digital Content Creator",
    tagline: "IT Team Lead • Posters, Presentations, Spreadsheets & Digital Publishing",
    bio: "Class VII student creating high-impact digital posters, interactive slide decks, automated spreadsheets, and official school event notices.",
    motto: "“Clean communication, beautiful design, structured data.”",
    attendance: "98.2%",
    academicScore: "95.1%",

    // Team Activity Cycle (Learn -> Make -> Show -> Record)
    activityCycle: {
      team: "it",
      projectName: "School Tech Conclave Digital Media Package",
      learn: {
        title: "Learn Digital Design & Layout Principles",
        desc: "Mastered Canva, Figma typography, Google Slides master layouts, and Excel formula functions (VLOOKUP, SUMIFS, Pivot Charts)."
      },
      make: {
        title: "Create 5 Digital Output Deliverables",
        desc: "Designed event posters, a 15-slide interactive presentation deck, the official event notice bulletin, a student registration doc, and an automated budget spreadsheet."
      },
      show: {
        title: "Present to School Assembly & Teachers",
        desc: "Presented the digital media kit to the school principal and displayed posters across digital bulletin boards."
      },
      record: {
        title: "Record 1-Minute Portfolio Walkthrough Video",
        desc: "Recorded a crisp 1-minute video walk-through demonstrating the presentation slides, spreadsheet dashboard, and graphic posters."
      }
    },

    // Final Output Verification (according to ChatGPT framework)
    outputDeliverables: {
      target: "Best 3–5 digital works + photos + short team video",
      status: "Completed (5 Digital Works, 3 Event Photos, 1 Showcase Video)",
      checklist: [
        { item: "Annual Science Fair Vector Poster", type: "Poster Design", icon: "🎨", verified: true },
        { item: "Interactive Climate Action Slide Deck (15 Slides)", type: "Presentation", icon: "📊", verified: true },
        { item: "Cyber Safety Student Handbook", type: "Document", icon: "📄", verified: true },
        { item: "Class Event Budget & Attendance Sheet", type: "Spreadsheet", icon: "📈", verified: true },
        { item: "Inter-House Debate Official Notice", type: "School Notice", icon: "📢", verified: true },
        { item: "Design & Presentation Showcase Video", type: "1-Min Video", icon: "📹", verified: true }
      ]
    },

    introVideo: {
      title: "Priya Sharma - IT Team Digital Content Showcase",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
      description: "1-minute video tour showcasing 5 digital creations: event posters, slide presentations, digital documents, and automated spreadsheets."
    },

    growthRecords: [
      {
        skill: "Digital Poster & Graphic Design",
        before: "Created basic word art with mismatched fonts and uneven margins.",
        after: "Designs professional vector-based event posters with balanced typography and color harmony in Canva & Figma.",
        icon: "🎨"
      },
      {
        skill: "Spreadsheets & Data Organization",
        before: "Only used spreadsheets as static tables without formulas.",
        after: "Builds automated budget templates with conditional formatting, automated totals, and interactive charts.",
        icon: "📊"
      },
      {
        skill: "Slide Presentation Storytelling",
        before: "Loaded slides with walls of text and read directly from the screen.",
        after: "Creates visual, engaging 10-slide decks with iconography, animated transitions, and key takeaways.",
        icon: "🖥️"
      }
    ],

    scorecard: [
      { area: "Digital Content Creation", level: 5.0, description: "Mastery of Canva, Figma, Google Docs & Slide Decks" },
      { area: "Spreadsheet & Data Skills", level: 4.5, description: "Proficient in formulas, formatting & chart generation" },
      { area: "Visual & Poster Design", level: 5.0, description: "High aesthetic standard in typography, color & layout" },
      { area: "Written Communication", level: 5.0, description: "Chief student editor of school newsletter & notices" },
      { area: "Activity Cycle Execution", level: 5.0, description: "Delivered all 5 target outputs on schedule" }
    ],

    projects: [
      {
        id: "proj-it1",
        title: "Annual STEM Conclave Media Suite",
        category: "IT / Digital Content",
        icon: "🎨",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
        summary: "Complete suite of 3 promotional posters, an official event circular notice, and social graphics created for the Annual STEM Conclave.",
        techStack: ["Canva Pro", "Figma", "Vector Graphics", "Typography"],
        liveDemoUrl: "https://example.com/demo/stem-posters",
        repoUrl: "https://github.com/techlearners-demo/digital-posters",
        impact: "Displayed on all school digital bulletin screens and notice boards"
      },
      {
        id: "proj-it2",
        title: "Interactive Climate Action Slide Deck",
        category: "IT / Presentation",
        icon: "📊",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80",
        summary: "A 15-slide interactive presentation featuring data charts, renewable energy diagrams, and student action steps.",
        techStack: ["Google Slides", "Infographics", "Data Visualization"],
        liveDemoUrl: "https://example.com/demo/climate-deck",
        repoUrl: "https://github.com/techlearners-demo/presentation-slides",
        impact: "Presented at Middle School Environmental Assembly"
      },
      {
        id: "proj-it3",
        title: "Automated Class Attendance & Budget Tracker",
        category: "IT / Spreadsheet",
        icon: "📈",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
        summary: "A spreadsheet system that calculates student attendance percentages, tracks club fund expenses, and outputs visual summaries.",
        techStack: ["Google Sheets / Excel", "Formulas", "Pivot Charts"],
        liveDemoUrl: "https://example.com/demo/budget-sheet",
        repoUrl: "https://github.com/techlearners-demo/sheets-tracker",
        impact: "Adopted by Class VII teacher for club expense tracking"
      }
    ],

    achievements: [
      {
        title: "Best Young Digital Designer Award",
        issuer: "TechLearners Annual Conclave",
        year: "2026",
        badge: "🥇",
        image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&auto=format&fit=crop&q=80"
      },
      {
        title: "Distinction in Digital Productivity Tools",
        issuer: "National IT Council for Schools",
        year: "2026",
        badge: "📜",
        image: "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?w=600&auto=format&fit=crop&q=80"
      }
    ],

    gallery: [
      {
        title: "Presenting Digital Posters to the Principal",
        category: "IT Presentation",
        url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80"
      },
      {
        title: "School Library Publishing Workshop",
        category: "Workshop",
        url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=80"
      }
    ],

    teacherObservation: {
      teacherName: "Mrs. Sunita Roy",
      role: "Class Teacher & Computer Applications Faculty",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      remark: "Priya exemplifies the IT Team mission: creating clear, purposeful digital content. Her posters, presentations, and spreadsheet models are among the finest in the school.",
      rating: "Outstanding (A+)",
      date: "February 2027"
    },

    parentNote: {
      parentsName: "Dr. & Mrs. Sharma",
      note: "We love browsing Priya’s digital portfolio! The 1-minute video summary and her posters look so polished and professional.",
      date: "February 2027"
    },

    futureGoals: [
      "Learn responsive web design (HTML5 & CSS3) to publish online newsletters.",
      "Organize a Digital Media Workshop for Class VI juniors."
    ]
  },
  {
    id: "tl-2026-9a-04",
    name: "Arjun Patel",
    gender: "Male",
    class: "Class IX",
    section: "A",
    rollNo: "04",
    dob: "2012-11-03",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
    team: "ai",
    teamRole: "Lead AI & Machine Learning Explorer",
    tagline: "AI Team Lead • Image Recognition, AI Prompts & Smart Demos",
    bio: "Class IX student building practical AI prototypes including camera-based recycling waste classifiers, voice recognition tools, and interactive AI web demonstrations.",
    motto: "“Demystify AI by building practical tools that help people.”",
    attendance: "94.5%",
    academicScore: "90.4%",

    // Team Activity Cycle (Learn -> Make -> Show -> Record)
    activityCycle: {
      team: "ai",
      projectName: "EcoVision: Real-Time AI Waste Classifier",
      learn: {
        title: "Learn Machine Learning & Vision Basics",
        desc: "Explored convolutional image recognition, Teachable Machine training workflows, dataset collection, and confidence thresholds."
      },
      make: {
        title: "Train & Build the AI Classifier",
        desc: "Captured 350+ training images of plastic, paper, metal, and organic waste, trained an image classifier model, and built a web camera interface."
      },
      show: {
        title: "Interactive Live Demo to Class",
        desc: "Gave a live demonstration in the science lab where students held real items up to the camera and the AI model classified them with 94% accuracy."
      },
      record: {
        title: "Record 1-Minute Demonstration Video",
        desc: "Produced a clean 60-second video demo explaining the AI workflow, showing live web-cam inference, and sharing testing results."
      }
    },

    // Final Output Verification (according to ChatGPT framework)
    outputDeliverables: {
      target: "1–3 AI projects + screenshots/photos + short team video",
      status: "Completed (3 AI Projects, 4 Screenshots, 1 Demo Video)",
      checklist: [
        { item: "EcoVision AI Garbage Classifier", type: "AI Project", icon: "🧠", verified: true },
        { item: "Voice-Activated Class Assistant Bot", type: "AI Project", icon: "🎙️", verified: true },
        { item: "Text Sentiment & Emotion Detector", type: "AI Project", icon: "📝", verified: true },
        { item: "Model Training Metrics & Screenshots", type: "Screenshots", icon: "📸", verified: true },
        { item: "60-Second Real-Time AI Demo Video", type: "Demo Video", icon: "📹", verified: true }
      ]
    },

    introVideo: {
      title: "Arjun Patel - AI Team Projects & EcoVision Live Demo",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80",
      description: "1-minute recorded video demonstration showing live camera classification of recyclable items and voice assistant response."
    },

    growthRecords: [
      {
        skill: "Artificial Intelligence & ML Tools",
        before: "Only used generative AI for casual chat without understanding how models train.",
        after: "Trained custom computer vision classifiers using Teachable Machine and deployed them into interactive JavaScript web apps.",
        icon: "🧠"
      },
      {
        skill: "Dataset Preparation & Labeling",
        before: "Did not know how bias and poor dataset lighting ruin AI model accuracy.",
        after: "Built structured training/validation sets with 400+ balanced samples across diverse light conditions.",
        icon: "🔬"
      },
      {
        skill: "Live Technical Demonstration",
        before: "Found it difficult to explain AI concepts without confusing younger students.",
        after: "Designed an interactive 5-minute hands-on demo where classmates test the model live.",
        icon: "🎤"
      }
    ],

    scorecard: [
      { area: "AI & Machine Learning Concepts", level: 5.0, description: "Clear grasp of neural classification, prompts & training sets" },
      { area: "AI Tool Utilization", level: 5.0, description: "Hands-on with Teachable Machine, TensorFlow.js & speech APIs" },
      { area: "Live Demonstration & Show", level: 4.5, description: "Engaging classroom demonstrations with high audience interaction" },
      { area: "Critical Problem Solving", level: 5.0, description: "Identified and fixed edge-case model classification errors" },
      { area: "Team Leadership", level: 4.5, description: "Mentored fellow AI Team members in model training" }
    ],

    projects: [
      {
        id: "proj-ai1",
        title: "EcoVision: Real-Time AI Waste Classifier",
        category: "AI / Vision",
        icon: "🧠",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
        summary: "A web-camera powered AI image classifier that instantly detects whether an item is plastic, paper, organic or e-waste with 94% accuracy.",
        techStack: ["Teachable Machine", "TensorFlow.js", "HTML5 Camera API"],
        liveDemoUrl: "https://example.com/demo/ecovision",
        repoUrl: "https://github.com/techlearners-demo/ecovision-ai",
        impact: "Deployed in school cafeteria sorting station during Green Week"
      },
      {
        id: "proj-ai2",
        title: "Voice-Activated Lab Assistant",
        category: "AI / Speech",
        icon: "🎙️",
        image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&auto=format&fit=crop&q=80",
        summary: "A hands-free voice assistant that answers science questions, sets experiment timers, and looks up atomic weights in the lab.",
        techStack: ["Web Speech API", "JavaScript", "OpenAI / Claude API"],
        liveDemoUrl: "https://example.com/demo/voice-assistant",
        repoUrl: "https://github.com/techlearners-demo/voice-lab-assistant",
        impact: "Used by science teachers during chemistry experiments"
      },
      {
        id: "proj-ai3",
        title: "Emotion & Text Sentiment Analyzer",
        category: "AI / NLP",
        icon: "📝",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
        summary: "A lightweight natural language processing web tool that analyzes short essays and detects positive, encouraging, or constructive tone.",
        techStack: ["JavaScript", "Sentiment.js", "CSS3"],
        liveDemoUrl: "https://example.com/demo/sentiment-tool",
        repoUrl: "https://github.com/techlearners-demo/sentiment-analyzer",
        impact: "Featured in English language writing workshop"
      }
    ],

    achievements: [
      {
        title: "1st Place - School AI Innovation Challenge",
        issuer: "TechLearners AI Lab",
        year: "2026",
        badge: "🏆",
        image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&auto=format&fit=crop&q=80"
      },
      {
        title: "Certified Junior AI Specialist",
        issuer: "Global AI for Youth Initiative",
        year: "2026",
        badge: "📜",
        image: "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?w=600&auto=format&fit=crop&q=80"
      }
    ],

    gallery: [
      {
        title: "Testing EcoVision AI Camera in Cafeteria",
        category: "AI Deployment",
        url: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&auto=format&fit=crop&q=80"
      },
      {
        title: "Explaining Neural Weights to Class IX Students",
        category: "Presentation",
        url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80"
      }
    ],

    teacherObservation: {
      teacherName: "Mr. Alok Verma",
      role: "AI & Mathematics Faculty",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      remark: "Arjun turned AI theory into a practical, working tool. Following the Learn → Make → Show → Record process gave him concrete portfolio proof that impressed every teacher.",
      rating: "Outstanding (A+)",
      date: "February 2027"
    },

    parentNote: {
      parentsName: "Mr. & Mrs. Patel",
      note: "Arjun’s video demo of his recycling AI was fascinating to watch! We are so pleased with his growth.",
      date: "February 2027"
    },

    futureGoals: [
      "Train edge-AI computer vision models on Raspberry Pi.",
      "Lead the School AI Ethics & Youth Council."
    ]
  },
  {
    id: "tl-2026-6c-18",
    name: "Ananya Verma",
    gender: "Female",
    class: "Class VI",
    section: "C",
    rollNo: "18",
    dob: "2015-02-10",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80",
    team: "it",
    teamRole: "Junior IT & Digital Media Creator",
    tagline: "IT Team • Digital Poster Designer & Environmental Notice Creator",
    bio: "Class VI student combining digital drawing, Canva poster design, and green school notices to promote conservation.",
    motto: "“Small digital actions make a big real-world impact.”",
    attendance: "97.0%",
    academicScore: "91.0%",

    activityCycle: {
      team: "it",
      projectName: "Save Our Oceans Digital Notice & Poster Campaign",
      learn: {
        title: "Learn Digital Canvas & Poster Layouts",
        desc: "Learned how to choose readable fonts, color contrast, and royalty-free nature graphics in Canva."
      },
      make: {
        title: "Design 3 Digital Works",
        desc: "Created an Ocean Clean-Up poster, a classroom recycling guide document, and an Earth Day assembly notice."
      },
      show: {
        title: "Show to Primary Classes",
        desc: "Presented the digital posters during morning homeroom in Class IV and V."
      },
      record: {
        title: "Record 1-Minute Video Summary",
        desc: "Recorded a 1-minute video explaining the poster symbols and the importance of ocean conservation."
      }
    },

    outputDeliverables: {
      target: "Best 3–5 digital works + photos + short team video",
      status: "Completed (3 Digital Works, 2 Photos, 1 Short Video)",
      checklist: [
        { item: "Ocean Clean-Up Campaign Poster", type: "Poster", icon: "🎨", verified: true },
        { item: "Classroom Recycling Rules Guide", type: "Document", icon: "📄", verified: true },
        { item: "Earth Day Celebration Notice", type: "Notice", icon: "📢", verified: true },
        { item: "Classroom Presentation Media", type: "Photos", icon: "📸", verified: true },
        { item: "1-Minute Project Video Reflection", type: "Video", icon: "📹", verified: true }
      ]
    },

    introVideo: {
      title: "Ananya Verma - Junior IT Poster Showcase",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80",
      description: "A 1-minute reflection on creating digital posters and notices for school environmental week."
    },

    growthRecords: [
      {
        skill: "Digital Media & Layouts",
        before: "Only knew how to draw on physical sketch paper.",
        after: "Created 3 multi-page digital flyers and posters with Canva and Google Docs.",
        icon: "🎨"
      }
    ],

    scorecard: [
      { area: "Digital Content Creation", level: 4.5, description: "Mastered basic Canva, poster layouts & text styling" },
      { area: "Communication & Expression", level: 4.5, description: "Confident speaker during morning homeroom presentations" },
      { area: "Activity Cycle Execution", level: 4.5, description: "Completed all 3 target deliverables + video" }
    ],

    projects: [
      {
        id: "proj-an1",
        title: "Ocean Clean-Up Digital Poster Suite",
        category: "IT / Digital Art",
        icon: "🌊",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80",
        summary: "A vibrant digital infographic poster series reminding students to recycle plastic bottles and keep waterways clean.",
        techStack: ["Canva", "Digital Illustration", "PDF Publishing"],
        liveDemoUrl: "https://example.com/demo/ocean-poster",
        repoUrl: "https://github.com/techlearners-demo/ocean-poster",
        impact: "Printed and pinned on every floor notice board"
      }
    ],

    achievements: [
      {
        title: "1st Prize - All India Junior Digital Art Contest",
        issuer: "National Wildlife Federation",
        year: "2026",
        badge: "🎨",
        image: "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?w=600&auto=format&fit=crop&q=80"
      }
    ],

    gallery: [
      {
        title: "Showing Posters in Primary Assembly",
        category: "Exhibition",
        url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&auto=format&fit=crop&q=80"
      }
    ],

    teacherObservation: {
      teacherName: "Ms. Neha Gupta",
      role: "Class VI Head & Art Educator",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      remark: "Ananya took on the IT Team challenge with joyful energy. Her clean notices and 1-minute video reflection make her portfolio shine.",
      rating: "Excellent (A)",
      date: "February 2027"
    },

    parentNote: {
      parentsName: "Mr. & Mrs. Verma",
      note: "Ananya is so excited to see her posters in the school digital portfolio!",
      date: "February 2027"
    },

    futureGoals: [
      "Learn basic presentation animations in Google Slides.",
      "Design next term's school library reading banner."
    ]
  },
  {
    id: "tl-2026-9b-21",
    name: "Vikram Aditya",
    gender: "Male",
    class: "Class IX",
    section: "B",
    rollNo: "21",
    dob: "2012-04-18",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    team: "robotics",
    teamRole: "Autonomous Systems & Sensor Programmer",
    tagline: "Robotics Team • Line-Following Bots & Ultrasonic Radars",
    bio: "Class IX student programming autonomous motor rovers and sonar distance mapping displays with Arduino and C++.",
    motto: "“Code the hardware, automate the future.”",
    attendance: "95.8%",
    academicScore: "93.2%",

    activityCycle: {
      team: "robotics",
      projectName: "Dual-Sensor Autonomous Line Follower Bot",
      learn: {
        title: "Learn Infrared Reflection & PWM Motor Control",
        desc: "Studied infrared surface reflectance sensors, PID line-tracking algorithms, and H-bridge motor driver modulation."
      },
      make: {
        title: "Construct the Line Following Rover",
        desc: "Assembled a 2WD differential robot chassis with dual TCRT5000 IR sensors, Arduino Nano, and 9V Li-ion battery pack."
      },
      show: {
        title: "Live Arena Time Trials",
        desc: "Demonstrated the bot racing along a custom black-tape track in front of the entire middle school physics class."
      },
      record: {
        title: "Record 1-Minute Performance Video",
        desc: "Recorded a 60-second video demonstrating track following, tight turn recovery, and lap timing statistics."
      }
    },

    outputDeliverables: {
      target: "1–3 working projects + photos + demonstration video",
      status: "Completed (2 Working Projects, 3 Photos, 1 Demo Video)",
      checklist: [
        { item: "Autonomous IR Line Follower Bot", type: "Working Project", icon: "🤖", verified: true },
        { item: "Servo Ultrasonic Radar Screen", type: "Working Project", icon: "📡", verified: true },
        { item: "Track Demo & Robotics Lab Photos", type: "Photos", icon: "📸", verified: true },
        { item: "1-Minute Race Run Video", type: "Demo Video", icon: "📹", verified: true }
      ]
    },

    introVideo: {
      title: "Vikram Aditya - Autonomous Line Follower Demo",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80",
      description: "1-minute demonstration of the line-following robot tracking curves and speed adjustments in real time."
    },

    growthRecords: [
      {
        skill: "Embedded C++ & Sensor Calibration",
        before: "Struggled with erratic motor jitter and false sensor reads.",
        after: "Programmed smoothed thresholding and proportional steering logic for smooth track navigation.",
        icon: "🤖"
      }
    ],

    scorecard: [
      { area: "Robot Assembly & Circuits", level: 5.0, description: "Clean wiring and reliable chassis construction" },
      { area: "Programming Logic", level: 4.5, description: "Efficient C++ code for real-time sensor processing" },
      { area: "Demonstration & Show", level: 5.0, description: "Exciting live arena demonstrations" }
    ],

    projects: [
      {
        id: "proj-vik1",
        title: "Dual-Sensor Autonomous Line Follower",
        category: "Robotics / Autonomous",
        icon: "🤖",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80",
        summary: "An autonomous line-following bot using dual infrared reflective sensors and custom proportional steering code.",
        techStack: ["Arduino Nano", "TCRT5000 IR", "L298N Driver", "C++"],
        liveDemoUrl: "https://example.com/demo/line-follower",
        repoUrl: "https://github.com/techlearners-demo/line-follower-bot",
        impact: "Completed the 10-meter obstacle course in record 14.2 seconds"
      }
    ],

    achievements: [
      {
        title: "1st Prize - Inter-House Bot Sprint Challenge",
        issuer: "School STEM Society",
        year: "2026",
        badge: "🥇",
        image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&auto=format&fit=crop&q=80"
      }
    ],

    gallery: [
      {
        title: "Bot Sprint Time Trials on Arena Track",
        category: "Competition",
        url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80"
      }
    ],

    teacherObservation: {
      teacherName: "Dr. K. Narayanan",
      role: "Head of Robotics & Physics Faculty",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      remark: "Vikram has a sharp engineering mind. His line-follower demo captured everyone's imagination and his portfolio documentation is stellar.",
      rating: "Outstanding (A+)",
      date: "February 2027"
    },

    parentNote: {
      parentsName: "Mr. & Mrs. Aditya",
      note: "Watching Vikram test his robot circuits on the living room floor and now seeing it in his portfolio is wonderful!",
      date: "February 2027"
    },

    futureGoals: [
      "Integrate camera-based computer vision on a 4WD rover.",
      "Participate in the National Robotics Olympiad."
    ]
  },
  {
    id: "tl-2026-8b-15",
    name: "Zara Khan",
    gender: "Female",
    class: "Class VIII",
    section: "B",
    rollNo: "15",
    dob: "2013-09-05",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1534972195531-a756b1126f24?w=1200&auto=format&fit=crop&q=80",
    team: "ai",
    teamRole: "AI Vision & Plant Health Classifier Lead",
    tagline: "AI Team • Computer Vision & Botanical Health Detection",
    bio: "Class VIII student building image recognition models that detect plant leaf diseases and guide organic gardeners.",
    motto: "“Using AI to protect green life and understand nature.”",
    attendance: "97.5%",
    academicScore: "94.6%",

    activityCycle: {
      team: "ai",
      projectName: "FloraGuard: Plant Disease AI Classifier",
      learn: {
        title: "Learn Botanical Disease Indicators & Dataset Sourcing",
        desc: "Researched plant leaf blight, rust, and healthy leaf textures while learning image augmentation and confidence scoring in AI."
      },
      make: {
        title: "Train the FloraGuard Vision Model",
        desc: "Trained a 500-image model on tomato and rose plant leaves using Teachable Machine and wrapped it in a responsive mobile-friendly web app."
      },
      show: {
        title: "Live Testing at School Botanical Garden",
        desc: "Conducted a live walk-through with the school eco-club, scanning actual plants and verifying healthy vs. infected leaves."
      },
      record: {
        title: "Record 1-Minute Demonstration Video",
        desc: "Filmed a 60-second video demo showing how a phone camera scans a leaf and displays instant treatment suggestions."
      }
    },

    outputDeliverables: {
      target: "1–3 AI projects + screenshots/photos + short team video",
      status: "Completed (2 AI Projects, 3 Photos, 1 Demo Video)",
      checklist: [
        { item: "FloraGuard Leaf Health Classifier", type: "AI Project", icon: "🌿", verified: true },
        { item: "AI Chatbot for Garden Care", type: "AI Project", icon: "💬", verified: true },
        { item: "Garden Testing & Model Accuracy Charts", type: "Screenshots", icon: "📸", verified: true },
        { item: "1-Minute Mobile Leaf Scan Demo", type: "Demo Video", icon: "📹", verified: true }
      ]
    },

    introVideo: {
      title: "Zara Khan - FloraGuard AI Plant Classifier",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1534972195531-a756b1126f24?w=800&auto=format&fit=crop&q=80",
      description: "1-minute video demonstration of the FloraGuard AI scanning leaf diseases in real time."
    },

    growthRecords: [
      {
        skill: "Computer Vision & Dataset Preparation",
        before: "Did not know how to collect and balance image training categories.",
        after: "Curated 500 leaf images and achieved 93% validation accuracy on real garden samples.",
        icon: "🌿"
      }
    ],

    scorecard: [
      { area: "AI Vision Modeling", level: 5.0, description: "Trained high-accuracy vision models with clean datasets" },
      { area: "Demonstration & Show", level: 4.5, description: "Excellent live botanical garden demonstrations" },
      { area: "Scientific Rigor", level: 5.0, description: "Thorough testing and documentation of model accuracy" }
    ],

    projects: [
      {
        id: "proj-zar1",
        title: "FloraGuard: Plant Disease AI Classifier",
        category: "AI / Vision",
        icon: "🌿",
        image: "https://images.unsplash.com/photo-1534972195531-a756b1126f24?w=600&auto=format&fit=crop&q=80",
        summary: "A mobile-ready AI image scanner that detects early signs of leaf blight, mildew, and nutritional deficiencies in garden plants.",
        techStack: ["Teachable Machine", "TensorFlow.js", "Webcam API"],
        liveDemoUrl: "https://example.com/demo/floraguard",
        repoUrl: "https://github.com/techlearners-demo/floraguard-ai",
        impact: "Tested on 60 plants in the school greenhouse with 93% accuracy"
      }
    ],

    achievements: [
      {
        title: "Excellence in Environmental AI Award",
        issuer: "Green Future Youth Summit",
        year: "2026",
        badge: "🌿",
        image: "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?w=600&auto=format&fit=crop&q=80"
      }
    ],

    gallery: [
      {
        title: "Scanning Tomato Plants in School Greenhouse",
        category: "AI Testing",
        url: "https://images.unsplash.com/photo-1534972195531-a756b1126f24?w=600&auto=format&fit=crop&q=80"
      }
    ],

    teacherObservation: {
      teacherName: "Mr. Alok Verma",
      role: "AI & Mathematics Faculty",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      remark: "Zara applied the AI Team formula brilliantly: Learn AI → Train FloraGuard → Show in Greenhouse → Record 1-minute demo. A stellar portfolio showcase!",
      rating: "Outstanding (A+)",
      date: "February 2027"
    },

    parentNote: {
      parentsName: "Dr. & Mrs. Khan",
      note: "Zara's passion for plants and technology came together beautifully in this project. We love her digital portfolio!",
      date: "February 2027"
    },

    futureGoals: [
      "Expand FloraGuard to recognize 20 common farm crops.",
      "Publish an open dataset for school biology classes."
    ]
  }
];

// Helper functions for Data Storage & Retrieval
const DataStore = {
  getSchoolConfig() {
    try {
      const stored = localStorage.getItem("tl_school_config");
      return stored ? JSON.parse(stored) : DEFAULT_SCHOOL_CONFIG;
    } catch(e) {
      return DEFAULT_SCHOOL_CONFIG;
    }
  },
  saveSchoolConfig(config) {
    localStorage.setItem("tl_school_config", JSON.stringify(config));
  },
  getTeamsConfig() {
    return DEFAULT_TEAMS_CONFIG;
  },
  getStudents() {
    try {
      const stored = localStorage.getItem("tl_students_data");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch(e) {
      console.warn("Could not parse localStorage, falling back to default dataset", e);
    }
    return DEFAULT_STUDENTS;
  },
  getStudentById(id) {
    const students = this.getStudents();
    return students.find(s => s.id === id) || students[0];
  },
  getStudentsByTeam(teamId) {
    const students = this.getStudents();
    if (!teamId || teamId === "all") return students;
    return students.filter(s => (s.team || "").toLowerCase() === teamId.toLowerCase());
  },
  saveStudents(students) {
    localStorage.setItem("tl_students_data", JSON.stringify(students));
  },
  saveStudent(student) {
    const students = this.getStudents();
    const index = students.findIndex(s => s.id === student.id);
    if (index >= 0) {
      students[index] = student;
    } else {
      students.push(student);
    }
    this.saveStudents(students);
  },
  deleteStudent(id) {
    let students = this.getStudents();
    students = students.filter(s => s.id !== id);
    this.saveStudents(students);
  },
  resetToDefaults() {
    localStorage.setItem("tl_students_data", JSON.stringify(DEFAULT_STUDENTS));
    localStorage.setItem("tl_school_config", JSON.stringify(DEFAULT_SCHOOL_CONFIG));
    return DEFAULT_STUDENTS;
  }
};

window.DEFAULT_SCHOOL_CONFIG = DEFAULT_SCHOOL_CONFIG;
window.DEFAULT_TEAMS_CONFIG = DEFAULT_TEAMS_CONFIG;
window.DEFAULT_STUDENTS = DEFAULT_STUDENTS;
window.DataStore = DataStore;
