/**
 * School Directory & Portal Hub Logic (index.html)
 * Enhanced with 3 Technology Teams (IT, Robotics, AI) Filtering & Counts
 */

document.addEventListener("DOMContentLoaded", () => {
  const schoolConfig = DataStore.getSchoolConfig();
  const students = DataStore.getStudents();

  // Populate school brand across hub
  document.querySelectorAll(".school-name-text").forEach(el => el.textContent = schoolConfig.schoolName);
  document.querySelectorAll(".school-year-text").forEach(el => el.textContent = schoolConfig.academicYear);
  document.querySelectorAll(".school-motto-text").forEach(el => el.textContent = schoolConfig.schoolMotto);

  const searchInput = document.getElementById("searchInput");
  const classFilter = document.getElementById("classFilter");
  const gridContainer = document.getElementById("studentsGrid");
  const countBadge = document.getElementById("studentCountBadge");
  const teamTabs = document.querySelectorAll(".team-tab");

  let selectedTeam = "all";

  // Update counts in team tabs
  function updateTeamCounts() {
    const allCount = students.length;
    const itCount = students.filter(s => (s.team || "").toLowerCase() === "it").length;
    const roboticsCount = students.filter(s => (s.team || "").toLowerCase() === "robotics").length;
    const aiCount = students.filter(s => (s.team || "").toLowerCase() === "ai").length;

    const elAll = document.getElementById("allCount");
    const elIt = document.getElementById("itCount");
    const elRobotics = document.getElementById("roboticsCount");
    const elAi = document.getElementById("aiCount");

    if (elAll) elAll.textContent = allCount;
    if (elIt) elIt.textContent = itCount;
    if (elRobotics) elRobotics.textContent = roboticsCount;
    if (elAi) elAi.textContent = aiCount;
  }

  function getTeamBadge(teamKey) {
    if (teamKey === "it") {
      return `<span class="team-badge team-badge-it">💻 IT Team</span>`;
    } else if (teamKey === "robotics") {
      return `<span class="team-badge team-badge-robotics">🤖 Robotics Team</span>`;
    } else if (teamKey === "ai") {
      return `<span class="team-badge team-badge-ai">🧠 AI Team</span>`;
    }
    return `<span class="team-badge team-badge-it">💻 Technology</span>`;
  }

  function renderStudents(filteredList) {
    if (!gridContainer) return;
    
    gridContainer.innerHTML = "";
    if (countBadge) {
      countBadge.textContent = `${filteredList.length} Student${filteredList.length === 1 ? "" : "s"} Found`;
    }

    if (filteredList.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: #fff; border-radius: 16px; border: 1px dashed #cbd5e1;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
          <h3>No Student Portfolios Found</h3>
          <p>Try changing your team filter, search terms, or grade selection.</p>
          <button class="btn btn-secondary btn-sm" style="margin-top: 1rem;" onclick="resetAllFilters()">Reset Filters</button>
        </div>
      `;
      return;
    }

    filteredList.forEach(student => {
      const card = document.createElement("div");
      card.className = `student-card team-border-${student.team || "it"}`;
      
      const numProjects = student.projects ? student.projects.length : 0;
      const numBadges = student.achievements ? student.achievements.length : 0;
      const teamBadge = getTeamBadge(student.team);
      const featuredProject = student.activityCycle?.projectName || student.projects?.[0]?.title || "Activity Project";

      card.innerHTML = `
        <div class="card-banner team-banner-${student.team || "it"}"></div>
        <div class="card-avatar-wrapper">
          <img src="${student.avatar}" alt="${student.name}" class="student-card-avatar" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'">
          <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.25rem;">
            ${teamBadge}
            <span class="badge badge-dark" style="font-size: 0.7rem;">${student.class}-${student.section}</span>
          </div>
        </div>
        <div class="student-card-body">
          <h3 class="student-card-name">${student.name}</h3>
          <div class="student-card-meta">${student.teamRole || "Team Contributor"}</div>
          <p class="student-card-bio">${student.tagline || student.bio}</p>
          
          <div class="student-card-featured-project">
            <small style="font-weight: 700; color: var(--text-muted); text-transform: uppercase; font-size: 0.68rem; display: block;">⭐ Cycle Deliverable:</small>
            <span style="font-weight: 600; font-size: 0.82rem; color: var(--text-main);">${featuredProject}</span>
          </div>

          <div class="student-card-stats">
            <div>
              <div class="stat-num">${numProjects}</div>
              <div class="stat-lbl">Projects</div>
            </div>
            <div>
              <div class="stat-num">${student.scorecard ? student.scorecard.length : 6}</div>
              <div class="stat-lbl">Skills</div>
            </div>
            <div>
              <div class="stat-num">${numBadges}</div>
              <div class="stat-lbl">Badges</div>
            </div>
          </div>

          <div class="student-card-actions">
            <a href="portfolio.html?id=${encodeURIComponent(student.id)}" class="btn btn-primary" style="flex: 1;">
              <span>View Portfolio</span> 🚀
            </a>
            <a href="id-card.html?id=${encodeURIComponent(student.id)}" class="btn btn-secondary btn-icon" title="View QR Card">
              📱
            </a>
          </div>
        </div>
      `;
      gridContainer.appendChild(card);
    });
  }

  function filterData() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const selectedClass = classFilter ? classFilter.value : "all";

    const filtered = students.filter(s => {
      const matchesTeam = selectedTeam === "all" || (s.team || "").toLowerCase() === selectedTeam.toLowerCase();
      const matchesClass = selectedClass === "all" || s.class.toLowerCase() === selectedClass.toLowerCase();

      const matchesQuery = !query || 
        s.name.toLowerCase().includes(query) ||
        (s.tagline && s.tagline.toLowerCase().includes(query)) ||
        (s.rollNo && s.rollNo.toString().includes(query)) ||
        (s.teamRole && s.teamRole.toLowerCase().includes(query)) ||
        (s.team && s.team.toLowerCase().includes(query)) ||
        (s.bio && s.bio.toLowerCase().includes(query)) ||
        (s.projects && s.projects.some(p => p.title.toLowerCase().includes(query) || (p.techStack && p.techStack.some(t => t.toLowerCase().includes(query)))));

      return matchesTeam && matchesClass && matchesQuery;
    });

    renderStudents(filtered);
  }

  window.resetAllFilters = function() {
    if (searchInput) searchInput.value = "";
    if (classFilter) classFilter.value = "all";
    selectedTeam = "all";
    teamTabs.forEach(t => t.classList.toggle("active", t.dataset.team === "all"));
    filterData();
  };

  // Team tab click handlers
  teamTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      teamTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      selectedTeam = tab.dataset.team;

      const titleHeading = document.getElementById("gridTitleHeading");
      const subtitleText = document.getElementById("gridSubtitleText");

      if (titleHeading && subtitleText) {
        if (selectedTeam === "it") {
          titleHeading.textContent = "💻 IT Team Student Portfolios";
          subtitleText.textContent = "Digital content creators • Posters, Presentations, Spreadsheets, Documents & Notices";
        } else if (selectedTeam === "robotics") {
          titleHeading.textContent = "🤖 Robotics Team Student Portfolios";
          subtitleText.textContent = "Hardware & Robotics builders • Circuits, Sensors, Autonomous Bots & Demonstrations";
        } else if (selectedTeam === "ai") {
          titleHeading.textContent = "🧠 AI Team Student Portfolios";
          subtitleText.textContent = "AI explorers & developers • Computer Vision, AI Tools, Speech & Interactive Demos";
        } else {
          titleHeading.textContent = "All Student Portfolios";
          subtitleText.textContent = "Showing all students across IT, Robotics & AI tracks";
        }
      }

      filterData();
    });
  });

  if (searchInput) searchInput.addEventListener("input", filterData);
  if (classFilter) classFilter.addEventListener("change", filterData);

  // Initialize
  updateTeamCounts();
  renderStudents(students);
});
