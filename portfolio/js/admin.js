/**
 * Teacher & School Admin Dashboard Logic
 * Full CRUD, Team Assignment, Activity Cycle Editor, Scorecard Sliders & Data Export/Import
 */

document.addEventListener("DOMContentLoaded", () => {
  let currentStudentId = null;
  const studentListEl = document.getElementById("adminStudentList");
  const studentForm = document.getElementById("studentEditForm");
  const schoolConfig = DataStore.getSchoolConfig();

  // Populate school header info
  document.querySelectorAll(".school-name-text").forEach(el => el.textContent = schoolConfig.schoolName);
  document.querySelectorAll(".school-year-text").forEach(el => el.textContent = schoolConfig.academicYear);

  function getTeamIcon(teamKey) {
    if (teamKey === "it") return "💻";
    if (teamKey === "robotics") return "🤖";
    if (teamKey === "ai") return "🧠";
    return "⚡";
  }

  function renderStudentSidebar() {
    const students = DataStore.getStudents();
    studentListEl.innerHTML = "";

    students.forEach(student => {
      const item = document.createElement("div");
      item.className = `admin-student-item ${student.id === currentStudentId ? "active" : ""}`;
      item.onclick = () => loadStudentToForm(student.id);

      const teamIcon = getTeamIcon(student.team);

      let reviewBadgeHtml = "";
      if (window.PortfolioReviewStore) {
        const sub = window.PortfolioReviewStore.getByStudent(student.name, `${student.class} - ${student.section}`) || window.PortfolioReviewStore.getByStudent(student.name);
        if (sub) {
          if (sub.status === "pending") {
            reviewBadgeHtml = `<span style="display: inline-block; font-size: 0.65rem; font-weight: 700; background: #fef3c7; color: #92400e; padding: 1px 6px; border-radius: 4px; margin-top: 3px;">🟡 Needs Review</span>`;
          } else if (sub.status === "approved") {
            reviewBadgeHtml = `<span style="display: inline-block; font-size: 0.65rem; font-weight: 700; background: #dcfce7; color: #166534; padding: 1px 6px; border-radius: 4px; margin-top: 3px;">🟢 Approved</span>`;
          }
        }
      }

      item.innerHTML = `
        <img src="${student.avatar}" class="admin-student-thumb" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'">
        <div style="flex: 1; min-width: 0;">
          <div style="font-weight: 700; font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${teamIcon} ${student.name}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${student.class}-${student.section} • ${(student.team || "it").toUpperCase()} Team</div>
          ${reviewBadgeHtml}
        </div>
      `;
      studentListEl.appendChild(item);
    });
  }

  function loadStudentToForm(id) {
    currentStudentId = id;
    const student = DataStore.getStudentById(id);
    if (!student) return;

    renderStudentSidebar();

    // Basic Fields & Team
    document.getElementById("studentId").value = student.id;
    document.getElementById("studentName").value = student.name;
    document.getElementById("studentGender").value = student.gender || "Male";
    document.getElementById("studentTeam").value = student.team || "it";
    document.getElementById("studentTeamRole").value = student.teamRole || "";
    document.getElementById("studentClass").value = student.class;
    document.getElementById("studentSection").value = student.section;
    document.getElementById("studentRollNo").value = student.rollNo;
    document.getElementById("studentAvatar").value = student.avatar || "";
    document.getElementById("studentCover").value = student.coverImage || "";
    document.getElementById("studentTagline").value = student.tagline || "";
    document.getElementById("studentBio").value = student.bio || "";
    document.getElementById("studentMotto").value = student.motto || "";
    document.getElementById("studentAttendance").value = student.attendance || "";
    document.getElementById("studentAcademicScore").value = student.academicScore || "";

    // Activity Cycle
    const ac = student.activityCycle || {};
    document.getElementById("cycleProjectName").value = ac.projectName || "";
    document.getElementById("cycleLearnTitle").value = ac.learn?.title || "";
    document.getElementById("cycleLearnDesc").value = ac.learn?.desc || "";
    document.getElementById("cycleMakeTitle").value = ac.make?.title || "";
    document.getElementById("cycleMakeDesc").value = ac.make?.desc || "";
    document.getElementById("cycleShowTitle").value = ac.show?.title || "";
    document.getElementById("cycleShowDesc").value = ac.show?.desc || "";
    document.getElementById("cycleRecordTitle").value = ac.record?.title || "";
    document.getElementById("cycleRecordDesc").value = ac.record?.desc || "";

    // Video
    const v = student.introVideo || {};
    document.getElementById("videoTitle").value = v.title || "";
    document.getElementById("videoUrl").value = v.videoUrl || "";
    document.getElementById("videoDesc").value = v.description || "";

    // Growth Records
    renderGrowthInputs(student.growthRecords || []);

    // Scorecard
    renderScorecardInputs(student.scorecard || []);

    // Projects
    renderProjectInputs(student.projects || []);

    // Achievements
    renderAchievementInputs(student.achievements || []);

    // Teacher & Parent
    const t = student.teacherObservation || {};
    document.getElementById("teacherName").value = t.teacherName || "";
    document.getElementById("teacherRole").value = t.role || "";
    document.getElementById("teacherRemark").value = t.remark || "";
    document.getElementById("teacherRating").value = t.rating || "Outstanding (A+)";

    const p = student.parentNote || {};
    document.getElementById("parentName").value = p.parentsName || "";
    document.getElementById("parentNote").value = p.note || "";

    // Goals
    renderGoalsInputs(student.futureGoals || []);

    // Live preview link & builder review link
    const previewBtn = document.getElementById("livePreviewBtn");
    if (previewBtn) {
      previewBtn.href = `portfolio.html?id=${encodeURIComponent(student.id)}`;
    }
    const builderBtn = document.getElementById("openInBuilderBtn");
    if (builderBtn) {
      builderBtn.href = `builder.html?id=${encodeURIComponent(student.id)}`;
    }
  }

  // GROWTH BUILDER
  function renderGrowthInputs(records) {
    const container = document.getElementById("growthRowsContainer");
    container.innerHTML = "";
    records.forEach((rec) => {
      const row = document.createElement("div");
      row.className = "dynamic-row";
      row.innerHTML = `
        <button type="button" class="remove-row-btn" onclick="this.parentElement.remove()">✕</button>
        <div class="form-grid-2">
          <div class="form-group">
            <label>Skill / Area</label>
            <input type="text" class="form-control growth-skill" value="${rec.skill}" required>
          </div>
          <div class="form-group">
            <label>Icon Emoji</label>
            <input type="text" class="form-control growth-icon" value="${rec.icon || "📈"}" style="width: 80px;">
          </div>
        </div>
        <div class="form-grid-2">
          <div class="form-group">
            <label>Beginning of Year (Before)</label>
            <textarea class="form-control growth-before" rows="2">${rec.before}</textarea>
          </div>
          <div class="form-group">
            <label>End of Year Progress (After)</label>
            <textarea class="form-control growth-after" rows="2">${rec.after}</textarea>
          </div>
        </div>
      `;
      container.appendChild(row);
    });
  }

  window.addGrowthRow = function() {
    const container = document.getElementById("growthRowsContainer");
    const row = document.createElement("div");
    row.className = "dynamic-row";
    row.innerHTML = `
      <button type="button" class="remove-row-btn" onclick="this.parentElement.remove()">✕</button>
      <div class="form-grid-2">
        <div class="form-group">
          <label>Skill / Area</label>
          <input type="text" class="form-control growth-skill" placeholder="e.g. Robotics Coding / AI Vision" required>
        </div>
        <div class="form-group">
          <label>Icon Emoji</label>
          <input type="text" class="form-control growth-icon" value="💡" style="width: 80px;">
        </div>
      </div>
      <div class="form-grid-2">
        <div class="form-group">
          <label>Beginning of Year (Before)</label>
          <textarea class="form-control growth-before" rows="2" placeholder="Initial baseline..."></textarea>
        </div>
        <div class="form-group">
          <label>End of Year Progress (After)</label>
          <textarea class="form-control growth-after" rows="2" placeholder="Demonstrated growth..."></textarea>
        </div>
      </div>
    `;
    container.appendChild(row);
  };

  // SCORECARD BUILDER
  function renderScorecardInputs(scorecard) {
    const container = document.getElementById("scorecardRowsContainer");
    container.innerHTML = "";
    const defaultAreas = [
      "Hardware & Circuit Design",
      "Digital & Coding Skills",
      "Live Demonstration & Show",
      "Teamwork & Collaboration",
      "Critical Problem Solving",
      "Academic Learning"
    ];

    const areasToRender = scorecard.length > 0 ? scorecard : defaultAreas.map(a => ({ area: a, level: 4.5, description: "" }));

    areasToRender.forEach(item => {
      const row = document.createElement("div");
      row.className = "dynamic-row";
      row.style.marginBottom = "0.75rem";
      row.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <input type="text" class="form-control score-area" value="${item.area}" style="font-weight: 700; width: 60%;" required>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <input type="range" class="score-level-range" min="1" max="5" step="0.5" value="${item.level}" oninput="this.nextElementSibling.textContent = this.value + ' / 5'" style="cursor: pointer;">
            <span style="font-weight: 800; font-size: 0.85rem; width: 45px;">${item.level} / 5</span>
          </div>
        </div>
        <input type="text" class="form-control score-desc" value="${item.description || ""}" placeholder="Short observation notes...">
      `;
      container.appendChild(row);
    });
  }

  // PROJECTS BUILDER
  function renderProjectInputs(projects) {
    const container = document.getElementById("projectsRowsContainer");
    container.innerHTML = "";
    projects.forEach(p => {
      const row = document.createElement("div");
      row.className = "dynamic-row";
      row.innerHTML = `
        <button type="button" class="remove-row-btn" onclick="this.parentElement.remove()">✕</button>
        <div class="form-grid-3">
          <div class="form-group">
            <label>Project / Deliverable Title</label>
            <input type="text" class="form-control proj-title" value="${p.title}" required>
          </div>
          <div class="form-group">
            <label>Category</label>
            <input type="text" class="form-control proj-cat" value="${p.category || "Deliverable"}">
          </div>
          <div class="form-group">
            <label>Icon / Emoji</label>
            <input type="text" class="form-control proj-icon" value="${p.icon || "🚀"}">
          </div>
        </div>
        <div class="form-group">
          <label>Summary Description</label>
          <textarea class="form-control proj-summary" rows="2">${p.summary}</textarea>
        </div>
        <div class="form-grid-2">
          <div class="form-group">
            <label>Tech Stack / Tools (Comma-separated)</label>
            <input type="text" class="form-control proj-tech" value="${(p.techStack || []).join(", ")}">
          </div>
          <div class="form-group">
            <label>Impact / Award / Demonstration</label>
            <input type="text" class="form-control proj-impact" value="${p.impact || ""}">
          </div>
        </div>
        <div class="form-grid-2">
          <div class="form-group">
            <label>Live Demo / File URL</label>
            <input type="text" class="form-control proj-demourl" value="${p.liveDemoUrl || ""}">
          </div>
          <div class="form-group">
            <label>Source Code / Design URL</label>
            <input type="text" class="form-control proj-repourl" value="${p.repoUrl || ""}">
          </div>
        </div>
      `;
      container.appendChild(row);
    });
  }

  window.addProjectRow = function() {
    const container = document.getElementById("projectsRowsContainer");
    const row = document.createElement("div");
    row.className = "dynamic-row";
    row.innerHTML = `
      <button type="button" class="remove-row-btn" onclick="this.parentElement.remove()">✕</button>
      <div class="form-grid-3">
        <div class="form-group">
          <label>Project / Deliverable Title</label>
          <input type="text" class="form-control proj-title" placeholder="e.g. EcoVision AI Classifier" required>
        </div>
        <div class="form-group">
          <label>Category</label>
          <input type="text" class="form-control proj-cat" value="AI / Vision">
        </div>
        <div class="form-group">
          <label>Icon / Emoji</label>
          <input type="text" class="form-control proj-icon" value="🧠">
        </div>
      </div>
      <div class="form-group">
        <label>Summary Description</label>
        <textarea class="form-control proj-summary" rows="2" placeholder="Explain what was built and demonstrated..."></textarea>
      </div>
      <div class="form-grid-2">
        <div class="form-group">
          <label>Tech Stack / Tools</label>
          <input type="text" class="form-control proj-tech" placeholder="Python, Teachable Machine, Canva">
        </div>
        <div class="form-group">
          <label>Impact / Award</label>
          <input type="text" class="form-control proj-impact" placeholder="Exhibited at Annual Expo">
        </div>
      </div>
      <div class="form-grid-2">
        <div class="form-group">
          <label>Live Demo URL</label>
          <input type="text" class="form-control proj-demourl" placeholder="https://...">
        </div>
        <div class="form-group">
          <label>Source Code / Design URL</label>
          <input type="text" class="form-control proj-repourl" placeholder="https://github.com/...">
        </div>
      </div>
    `;
    container.appendChild(row);
  };

  // ACHIEVEMENTS BUILDER
  function renderAchievementInputs(achievements) {
    const container = document.getElementById("achievementsRowsContainer");
    container.innerHTML = "";
    achievements.forEach(ach => {
      const row = document.createElement("div");
      row.className = "dynamic-row";
      row.innerHTML = `
        <button type="button" class="remove-row-btn" onclick="this.parentElement.remove()">✕</button>
        <div class="form-grid-3">
          <div class="form-group">
            <label>Badge / Icon</label>
            <input type="text" class="form-control ach-badge" value="${ach.badge || "🏆"}" style="width: 70px;">
          </div>
          <div class="form-group" style="grid-column: span 2;">
            <label>Achievement Title</label>
            <input type="text" class="form-control ach-title" value="${ach.title}" required>
          </div>
        </div>
        <div class="form-grid-2">
          <div class="form-group">
            <label>Issuing Body / Event</label>
            <input type="text" class="form-control ach-issuer" value="${ach.issuer}">
          </div>
          <div class="form-group">
            <label>Year</label>
            <input type="text" class="form-control ach-year" value="${ach.year}">
          </div>
        </div>
      `;
      container.appendChild(row);
    });
  }

  window.addAchievementRow = function() {
    const container = document.getElementById("achievementsRowsContainer");
    const row = document.createElement("div");
    row.className = "dynamic-row";
    row.innerHTML = `
      <button type="button" class="remove-row-btn" onclick="this.parentElement.remove()">✕</button>
      <div class="form-grid-3">
        <div class="form-group">
          <label>Badge / Icon</label>
          <input type="text" class="form-control ach-badge" value="🥇" style="width: 70px;">
        </div>
        <div class="form-group" style="grid-column: span 2;">
          <label>Achievement Title</label>
          <input type="text" class="form-control ach-title" placeholder="e.g. 1st Place STEM Conclave" required>
        </div>
      </div>
      <div class="form-grid-2">
        <div class="form-group">
          <label>Issuing Body / Event</label>
          <input type="text" class="form-control ach-issuer" placeholder="TechLearners Academy">
        </div>
        <div class="form-group">
          <label>Year</label>
          <input type="text" class="form-control ach-year" value="2026">
        </div>
      </div>
    `;
    container.appendChild(row);
  };

  // GOALS BUILDER
  function renderGoalsInputs(goals) {
    const container = document.getElementById("goalsRowsContainer");
    container.innerHTML = "";
    goals.forEach(g => {
      const row = document.createElement("div");
      row.className = "dynamic-row";
      row.style.marginBottom = "0.5rem";
      row.innerHTML = `
        <button type="button" class="remove-row-btn" onclick="this.parentElement.remove()">✕</button>
        <input type="text" class="form-control goal-text" value="${g}" required style="padding-right: 40px;">
      `;
      container.appendChild(row);
    });
  }

  window.addGoalRow = function() {
    const container = document.getElementById("goalsRowsContainer");
    const row = document.createElement("div");
    row.className = "dynamic-row";
    row.style.marginBottom = "0.5rem";
    row.innerHTML = `
      <button type="button" class="remove-row-btn" onclick="this.parentElement.remove()">✕</button>
      <input type="text" class="form-control goal-text" placeholder="Future target or milestone..." required style="padding-right: 40px;">
    `;
    container.appendChild(row);
  };

  // SAVE FORM HANDLER
  studentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = document.getElementById("studentId").value.trim();
    const existing = DataStore.getStudentById(id) || {};
    const team = document.getElementById("studentTeam").value;

    // Collect Growth
    const growthRecords = [];
    document.querySelectorAll("#growthRowsContainer .dynamic-row").forEach(row => {
      growthRecords.push({
        skill: row.querySelector(".growth-skill").value,
        icon: row.querySelector(".growth-icon").value || "📈",
        before: row.querySelector(".growth-before").value,
        after: row.querySelector(".growth-after").value
      });
    });

    // Collect Scorecard
    const scorecard = [];
    document.querySelectorAll("#scorecardRowsContainer .dynamic-row").forEach(row => {
      scorecard.push({
        area: row.querySelector(".score-area").value,
        level: parseFloat(row.querySelector(".score-level-range").value),
        description: row.querySelector(".score-desc").value
      });
    });

    // Collect Projects
    const projects = [];
    document.querySelectorAll("#projectsRowsContainer .dynamic-row").forEach(row => {
      const techStr = row.querySelector(".proj-tech").value;
      projects.push({
        id: "proj-" + Math.random().toString(36).substr(2, 9),
        title: row.querySelector(".proj-title").value,
        category: row.querySelector(".proj-cat").value,
        icon: row.querySelector(".proj-icon").value,
        summary: row.querySelector(".proj-summary").value,
        techStack: techStr ? techStr.split(",").map(s => s.trim()).filter(Boolean) : [],
        impact: row.querySelector(".proj-impact").value,
        liveDemoUrl: row.querySelector(".proj-demourl").value,
        repoUrl: row.querySelector(".proj-repourl").value,
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600"
      });
    });

    // Collect Achievements
    const achievements = [];
    document.querySelectorAll("#achievementsRowsContainer .dynamic-row").forEach(row => {
      achievements.push({
        badge: row.querySelector(".ach-badge").value,
        title: row.querySelector(".ach-title").value,
        issuer: row.querySelector(".ach-issuer").value,
        year: row.querySelector(".ach-year").value,
        image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600"
      });
    });

    // Collect Goals
    const futureGoals = [];
    document.querySelectorAll("#goalsRowsContainer .goal-text").forEach(input => {
      if (input.value.trim()) futureGoals.push(input.value.trim());
    });

    const activityCycle = {
      team: team,
      projectName: document.getElementById("cycleProjectName").value.trim(),
      learn: {
        title: document.getElementById("cycleLearnTitle").value.trim(),
        desc: document.getElementById("cycleLearnDesc").value.trim()
      },
      make: {
        title: document.getElementById("cycleMakeTitle").value.trim(),
        desc: document.getElementById("cycleMakeDesc").value.trim()
      },
      show: {
        title: document.getElementById("cycleShowTitle").value.trim(),
        desc: document.getElementById("cycleShowDesc").value.trim()
      },
      record: {
        title: document.getElementById("cycleRecordTitle").value.trim(),
        desc: document.getElementById("cycleRecordDesc").value.trim()
      }
    };

    const targetOutput = team === "it" 
      ? "Best 3–5 digital works + photos + short team video"
      : (team === "robotics" 
        ? "1–3 working projects + photos + demonstration video" 
        : "1–3 AI projects + screenshots/photos + short team video");

    const updatedStudent = {
      ...existing,
      id: id,
      name: document.getElementById("studentName").value.trim(),
      gender: document.getElementById("studentGender").value,
      team: team,
      teamRole: document.getElementById("studentTeamRole").value.trim() || `${team.toUpperCase()} Team Specialist`,
      class: document.getElementById("studentClass").value,
      section: document.getElementById("studentSection").value,
      rollNo: document.getElementById("studentRollNo").value,
      avatar: document.getElementById("studentAvatar").value || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400",
      coverImage: document.getElementById("studentCover").value || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200",
      tagline: document.getElementById("studentTagline").value,
      bio: document.getElementById("studentBio").value,
      motto: document.getElementById("studentMotto").value,
      attendance: document.getElementById("studentAttendance").value,
      academicScore: document.getElementById("studentAcademicScore").value,
      activityCycle,
      outputDeliverables: {
        target: targetOutput,
        status: `Completed (${projects.length} Works/Projects, ${achievements.length} Badges, 1 Video Demo)`,
        checklist: projects.map(p => ({ item: p.title, type: p.category || "Deliverable", icon: p.icon || "✅", verified: true }))
      },
      introVideo: {
        title: document.getElementById("videoTitle").value,
        videoUrl: document.getElementById("videoUrl").value,
        description: document.getElementById("videoDesc").value
      },
      growthRecords,
      scorecard,
      projects,
      achievements,
      teacherObservation: {
        teacherName: document.getElementById("teacherName").value,
        role: document.getElementById("teacherRole").value,
        remark: document.getElementById("teacherRemark").value,
        rating: document.getElementById("teacherRating").value,
        date: "Current Academic Session"
      },
      parentNote: {
        parentsName: document.getElementById("parentName").value,
        note: document.getElementById("parentNote").value,
        date: "Current Academic Session"
      },
      futureGoals
    };

    DataStore.saveStudent(updatedStudent);
    renderStudentSidebar();

    alert("✅ Student portfolio & activity cycle saved successfully!");
  });

  // ADD NEW STUDENT
  document.getElementById("addNewStudentBtn").addEventListener("click", () => {
    const newId = "tl-2026-" + Math.random().toString(36).substr(2, 6);
    const newStudent = {
      id: newId,
      name: "New Student",
      gender: "Male",
      team: "it",
      teamRole: "IT Digital Content Specialist",
      class: "Class VIII",
      section: "A",
      rollNo: "99",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
      tagline: "Young Learner & Technology Explorer",
      bio: "Add student bio here...",
      activityCycle: {
        team: "it",
        projectName: "Digital Content Package",
        learn: { title: "Learn Design Principles", desc: "Studied Canva & Google Docs layouts." },
        make: { title: "Create 3 Digital Deliverables", desc: "Built posters and presentation deck." },
        show: { title: "Show to Class", desc: "Presented in classroom." },
        record: { title: "Record 1-Min Video", desc: "Filmed short 60-second walkthrough." }
      },
      outputDeliverables: {
        target: "Best 3–5 digital works + photos + short team video",
        status: "In Progress",
        checklist: []
      },
      growthRecords: [],
      scorecard: [],
      projects: [],
      achievements: [],
      futureGoals: []
    };
    DataStore.saveStudent(newStudent);
    loadStudentToForm(newId);
  });

  // DELETE STUDENT
  document.getElementById("deleteStudentBtn").addEventListener("click", () => {
    if (!currentStudentId) return;
    if (confirm("Are you sure you want to remove this student portfolio?")) {
      DataStore.deleteStudent(currentStudentId);
      const remaining = DataStore.getStudents();
      if (remaining.length > 0) {
        loadStudentToForm(remaining[0].id);
      } else {
        location.reload();
      }
    }
  });

  // EXPORT EXCEL (Excel-Compatible CSV with UTF-8 BOM)
  const exportExcelBtn = document.getElementById("exportExcelBtn");
  if (exportExcelBtn) {
    exportExcelBtn.addEventListener("click", () => {
      const students = DataStore.getStudents();
      if (!students || students.length === 0) {
        alert("No student records available to export.");
        return;
      }

      function csvClean(val) {
        if (val === null || val === undefined) return '""';
        const str = String(val).replace(/"/g, '""').replace(/\r?\n/g, ' | ');
        return `"${str}"`;
      }

      const headers = [
        "Student ID",
        "Full Name",
        "Gender",
        "Class",
        "Section",
        "Roll No",
        "Technology Team",
        "Team Role",
        "Tagline / Specialization",
        "Bio",
        "Motto",
        "Attendance (%)",
        "Academic Score (%)",
        "Activity Project Name",
        "Learn Phase",
        "Make Phase",
        "Show Phase",
        "Record Phase",
        "Video Demo Title",
        "Video Demo URL",
        "Total Projects Count",
        "Projects List",
        "Total Achievements Count",
        "Achievements List",
        "Scorecard Averages",
        "Growth Records",
        "Teacher Name",
        "Teacher Role",
        "Teacher Rating",
        "Teacher Remarks",
        "Parent Name",
        "Parent Feedback",
        "Future Goals"
      ];

      const rows = students.map(s => {
        const ac = s.activityCycle || {};
        const learnStr = ac.learn ? `${ac.learn.title || ''}: ${ac.learn.desc || ''}` : '';
        const makeStr = ac.make ? `${ac.make.title || ''}: ${ac.make.desc || ''}` : '';
        const showStr = ac.show ? `${ac.show.title || ''}: ${ac.show.desc || ''}` : '';
        const recordStr = ac.record ? `${ac.record.title || ''}: ${ac.record.desc || ''}` : '';

        const projs = s.projects || [];
        const projsStr = projs.map((p, i) => `${i + 1}. [${p.category || 'Deliverable'}] ${p.title} (${(p.techStack || []).join(', ')})`).join('; ');

        const achs = s.achievements || [];
        const achsStr = achs.map((a, i) => `${i + 1}. ${a.title} - ${a.award || ''} [${a.event || ''}]`).join('; ');

        const scorecard = s.scorecard || [];
        const scoreStr = scorecard.map(sc => `${sc.area}: ${sc.level}/5`).join('; ');

        const growth = s.growthRecords || [];
        const growthStr = growth.map(g => `${g.skill}: Before="${g.before}" -> After="${g.after}"`).join('; ');

        const goals = s.futureGoals || [];
        const goalsStr = goals.map((g, i) => `${i + 1}. ${typeof g === 'object' ? (g.goal || JSON.stringify(g)) : g}`).join('; ');

        const teacher = s.teacherObservation || {};
        const parent = s.parentNote || {};
        const video = s.introVideo || {};

        return [
          csvClean(s.id),
          csvClean(s.name),
          csvClean(s.gender || "Not specified"),
          csvClean(s.class),
          csvClean(s.section),
          csvClean(s.rollNo),
          csvClean((s.team || "it").toUpperCase()),
          csvClean(s.teamRole || ""),
          csvClean(s.tagline || ""),
          csvClean(s.bio || ""),
          csvClean(s.motto || ""),
          csvClean(s.attendance || ""),
          csvClean(s.academicScore || ""),
          csvClean(ac.projectName || ""),
          csvClean(learnStr),
          csvClean(makeStr),
          csvClean(showStr),
          csvClean(recordStr),
          csvClean(video.title || ""),
          csvClean(video.videoUrl || ""),
          csvClean(projs.length),
          csvClean(projsStr),
          csvClean(achs.length),
          csvClean(achsStr),
          csvClean(scoreStr),
          csvClean(growthStr),
          csvClean(teacher.teacherName || ""),
          csvClean(teacher.role || ""),
          csvClean(teacher.rating || ""),
          csvClean(teacher.remark || ""),
          csvClean(parent.parentsName || ""),
          csvClean(parent.note || ""),
          csvClean(goalsStr)
        ].join(",");
      });

      const csvData = [headers.map(h => `"${h}"`).join(","), ...rows].join("\r\n");
      const blob = new Blob(["\uFEFF" + csvData], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `TechLearners_Student_Portfolios_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  // EXPORT JSON
  document.getElementById("exportJsonBtn").addEventListener("click", () => {
    const students = DataStore.getStudents();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(students, null, 2));
    const dlAnchorElem = document.createElement("a");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `school_portfolios_${new Date().toISOString().slice(0,10)}.json`);
    dlAnchorElem.click();
  });

  // IMPORT JSON
  const jsonFileInput = document.getElementById("jsonFileInput");
  document.getElementById("importJsonBtn").addEventListener("click", () => jsonFileInput.click());
  jsonFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported)) {
          DataStore.saveStudents(imported);
          alert(`Successfully imported ${imported.length} student records!`);
          renderStudentSidebar();
          if (imported.length > 0) loadStudentToForm(imported[0].id);
        } else {
          alert("Invalid JSON file format. Must be an array of students.");
        }
      } catch (err) {
        alert("Error parsing JSON file: " + err.message);
      }
    };
    reader.readAsText(file);
  });

  // RESET DEFAULT DATA
  document.getElementById("resetDefaultBtn").addEventListener("click", () => {
    if (confirm("Reset all data to default demonstration portfolios? Any custom edits will be replaced.")) {
      DataStore.resetToDefaults();
      const students = DataStore.getStudents();
      renderStudentSidebar();
      if (students.length > 0) loadStudentToForm(students[0].id);
      alert("Reset to default sample portfolios complete!");
    }
  });

  // =============================================================
  // STUDENT PORTFOLIO REVIEW QUEUE (TEACHER & ADMIN)
  // =============================================================
  let currentQueueFilter = "all";

  function updatePendingReviewsBadge() {
    const badge = document.getElementById("pendingReviewsCount");
    if (badge && window.PortfolioReviewStore) {
      badge.textContent = window.PortfolioReviewStore.getPendingCount();
    }
  }

  function openReviewQueueModal() {
    const modal = document.getElementById("reviewQueueModal");
    if (!modal) return;
    renderReviewQueue(currentQueueFilter);
    modal.style.display = "flex";
  }

  function closeReviewQueueModal() {
    const modal = document.getElementById("reviewQueueModal");
    if (modal) modal.style.display = "none";
  }

  function filterReviewQueue(type) {
    currentQueueFilter = type;
    ["All", "Pending", "Approved"].forEach(btnType => {
      const b = document.getElementById("btnFilterQueue" + btnType);
      if (b) {
        if (btnType.toLowerCase() === type.toLowerCase()) {
          b.style.background = "#e2e8f0";
          b.style.fontWeight = "800";
        } else {
          b.style.background = "";
          b.style.fontWeight = "";
        }
      }
    });
    renderReviewQueue(type);
  }

  function renderReviewQueue(filter = "all") {
    const container = document.getElementById("reviewQueueContainer");
    const summaryText = document.getElementById("queueSummaryText");
    if (!container || !window.PortfolioReviewStore) return;

    let submissions = window.PortfolioReviewStore.getAll();
    if (filter === "pending") {
      submissions = submissions.filter(s => s.status === "pending");
    } else if (filter === "approved") {
      submissions = submissions.filter(s => s.status === "approved");
    }

    if (summaryText) {
      const pendingCount = window.PortfolioReviewStore.getPendingCount();
      summaryText.textContent = `Showing ${submissions.length} submission(s) • ${pendingCount} awaiting teacher review`;
    }

    if (submissions.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem; color: #64748b;">
          <span style="font-size: 2.2rem; display: block; margin-bottom: 0.5rem;">📭</span>
          <strong style="font-size: 0.95rem; color: #1e293b; display: block; margin-bottom: 0.25rem;">No submissions found</strong>
          <p style="font-size: 0.82rem; margin: 0;">Students can save and send their portfolios for review from the Portfolio Builder.</p>
        </div>
      `;
      return;
    }

    let html = `
      <table class="review-queue-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Class / Roll</th>
            <th>Submitted On</th>
            <th>Status</th>
            <th>Student Note</th>
            <th style="text-align: right;">Actions</th>
          </tr>
        </thead>
        <tbody>
    `;

    submissions.forEach(sub => {
      const isPending = sub.status === "pending";
      const statusPill = isPending
        ? `<span style="background: #fef3c7; color: #92400e; font-weight: 700; font-size: 0.72rem; padding: 2px 8px; border-radius: 9999px; border: 1px solid #fde68a;">🟡 Pending</span>`
        : `<span style="background: #dcfce7; color: #166534; font-weight: 700; font-size: 0.72rem; padding: 2px 8px; border-radius: 9999px; border: 1px solid #86efac;">🟢 Approved</span>`;

      html += `
        <tr>
          <td>
            <strong style="color: #0f172a; display: block;">${escapeAdminHtml(sub.studentName)}</strong>
            <span style="font-size: 0.7rem; color: #64748b; font-family: monospace;">${escapeAdminHtml(sub.id)}</span>
          </td>
          <td>
            <span>${escapeAdminHtml(sub.classSection || "—")}</span>
            <span style="display: block; font-size: 0.72rem; color: #64748b;">Roll: ${escapeAdminHtml(sub.rollNo || "—")}</span>
          </td>
          <td>
            <span style="font-size: 0.78rem; color: #334155;">${escapeAdminHtml(sub.submittedAtFormatted || "—")}</span>
          </td>
          <td>${statusPill}</td>
          <td style="max-width: 180px; font-size: 0.78rem; color: #475569;">
            ${sub.studentNote ? `“${escapeAdminHtml(sub.studentNote)}”` : "<span style='color: #94a3b8;'>None</span>"}
          </td>
          <td style="text-align: right; white-space: nowrap;">
            <div style="display: flex; gap: 0.35rem; justify-content: flex-end;">
              <a href="${(() => {
                let matchingStudentId = null;
                if (window.DataStore && typeof window.DataStore.getStudents === 'function') {
                  const allStudents = window.DataStore.getStudents();
                  const found = allStudents.find(s => s.name && s.name.trim().toLowerCase() === String(sub.studentName).trim().toLowerCase());
                  if (found) matchingStudentId = found.id;
                }
                return matchingStudentId ? `builder.html?id=${encodeURIComponent(matchingStudentId)}` : `builder.html?reviewId=${encodeURIComponent(sub.id)}`;
              })()}" target="_blank" class="btn btn-secondary btn-sm" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;" title="Open Portfolio Builder to assess student">
                🎓 Open
              </a>
              ${isPending ? `
                <button type="button" class="btn btn-primary btn-sm" onclick="quickApproveSubmission('${sub.id}')" style="background: #16a34a; border-color: #16a34a; font-size: 0.75rem; padding: 0.25rem 0.55rem; font-weight: 700;">
                  ✅ Approve
                </button>
              ` : `
                <span style="font-size: 0.72rem; color: #16a34a; font-weight: 600; padding: 0.25rem;">Reviewed</span>
              `}
              <button type="button" class="btn btn-secondary btn-sm" onclick="deleteReviewSubmissionAdmin('${sub.id}')" style="color: #dc2626; font-size: 0.75rem; padding: 0.25rem 0.45rem;" title="Delete submission">
                ✕
              </button>
            </div>
          </td>
        </tr>
      `;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
  }

  function quickApproveSubmission(id) {
    const sub = window.PortfolioReviewStore.getById(id);
    if (!sub) return;

    const teacherRemarks = prompt(
      `Enter / Confirm Teacher Remarks to approve portfolio for ${sub.studentName}:`,
      sub.teacherRemarks || "Approved • Demonstrates diligent learning and verified practical project output."
    );
    if (teacherRemarks === null) return;

    window.PortfolioReviewStore.approveReview(id, {
      status: "approved",
      reviewedBy: "Teacher & Admin Dashboard",
      teacherRemarks: teacherRemarks.trim()
    });

    updatePendingReviewsBadge();
    renderReviewQueue(currentQueueFilter);
    renderStudentSidebar();
    alert(`✅ Portfolio for ${sub.studentName} marked as Reviewed & Approved!`);
  }

  function deleteReviewSubmissionAdmin(id) {
    if (confirm("Delete this portfolio review submission?")) {
      window.PortfolioReviewStore.deleteSubmission(id);
      updatePendingReviewsBadge();
      renderReviewQueue(currentQueueFilter);
      renderStudentSidebar();
    }
  }

  function escapeAdminHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Review Event Listeners
  window.addEventListener("portfolio-review-submitted", () => {
    updatePendingReviewsBadge();
    renderStudentSidebar();
    if (document.getElementById("reviewQueueModal")?.style.display === "flex") {
      renderReviewQueue(currentQueueFilter);
    }
  });

  window.addEventListener("portfolio-review-updated", () => {
    updatePendingReviewsBadge();
    renderStudentSidebar();
    if (document.getElementById("reviewQueueModal")?.style.display === "flex") {
      renderReviewQueue(currentQueueFilter);
    }
  });

  window.addEventListener("student-database-updated", () => {
    renderStudentSidebar();
    updatePendingReviewsBadge();
    if (document.getElementById("reviewQueueModal")?.style.display === "flex") {
      renderReviewQueue(currentQueueFilter);
    }
  });

  // Expose globally for HTML onclick handlers
  window.openReviewQueueModal = openReviewQueueModal;
  window.closeReviewQueueModal = closeReviewQueueModal;
  window.filterReviewQueue = filterReviewQueue;
  window.quickApproveSubmission = quickApproveSubmission;
  window.deleteReviewSubmissionAdmin = deleteReviewSubmissionAdmin;

  // Initial Load
  const students = DataStore.getStudents();
  renderStudentSidebar();
  updatePendingReviewsBadge();
  if (students.length > 0) {
    loadStudentToForm(students[0].id);
  }
});
