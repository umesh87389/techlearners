/**
 * Printable Student QR Portfolio Cards Generator
 * Enhanced with Team Badges (IT, Robotics, AI) and Team Filtering
 */

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const singleStudentId = urlParams.get("id");
  const schoolConfig = DataStore.getSchoolConfig();
  const allStudents = DataStore.getStudents();

  // Update School branding
  document.querySelectorAll(".school-name-text").forEach(el => el.textContent = schoolConfig.schoolName);
  document.querySelectorAll(".school-year-text").forEach(el => el.textContent = schoolConfig.academicYear);

  const teamFilterSelect = document.getElementById("teamSelectFilter");
  const classFilterSelect = document.getElementById("classSelectFilter");
  const cardsContainer = document.getElementById("idCardsContainer");

  // Populate Filter
  if (singleStudentId) {
    if (classFilterSelect) {
      classFilterSelect.innerHTML = `<option value="single">Single Student View</option>`;
      classFilterSelect.disabled = true;
    }
    if (teamFilterSelect) {
      teamFilterSelect.disabled = true;
    }
  } else {
    if (classFilterSelect) classFilterSelect.addEventListener("change", applyFilters);
    if (teamFilterSelect) teamFilterSelect.addEventListener("change", applyFilters);
  }

  function getBasePortfolioUrl(studentId) {
    const currentOrigin = window.location.origin;
    const pathname = window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/") + 1);
    return `${currentOrigin}${pathname}portfolio.html?id=${encodeURIComponent(studentId)}`;
  }

  function getTeamDetails(teamKey) {
    if (teamKey === "it") {
      return { name: "IT Team", emoji: "💻", role: "Digital Content", color: "#4f46e5", banner: "team-banner-it" };
    } else if (teamKey === "robotics") {
      return { name: "Robotics Team", emoji: "🤖", role: "Robotics & Hardware", color: "#059669", banner: "team-banner-robotics" };
    } else if (teamKey === "ai") {
      return { name: "AI Team", emoji: "🧠", role: "AI & Machine Learning", color: "#7c3aed", banner: "team-banner-ai" };
    }
    return { name: "Tech Team", emoji: "⚡", role: "Technology", color: "#0284c7", banner: "team-banner-it" };
  }

  function applyFilters() {
    const teamVal = teamFilterSelect ? teamFilterSelect.value : "all";
    const classVal = classFilterSelect ? classFilterSelect.value : "all";
    renderCards(teamVal, classVal);
  }

  function renderCards(teamFilterValue, classFilterValue) {
    if (!cardsContainer) return;
    cardsContainer.innerHTML = "";

    let studentsToRender = allStudents;
    if (singleStudentId) {
      studentsToRender = allStudents.filter(s => s.id === singleStudentId);
    } else {
      if (teamFilterValue && teamFilterValue !== "all") {
        studentsToRender = studentsToRender.filter(s => (s.team || "").toLowerCase() === teamFilterValue.toLowerCase());
      }
      if (classFilterValue && classFilterValue !== "all") {
        studentsToRender = studentsToRender.filter(s => s.class.toLowerCase() === classFilterValue.toLowerCase());
      }
    }

    if (studentsToRender.length === 0) {
      cardsContainer.innerHTML = `<p style="text-align:center; padding: 2rem; width: 100%;">No student cards found for this selection.</p>`;
      return;
    }

    studentsToRender.forEach((student, index) => {
      const card = document.createElement("div");
      card.className = `id-card team-border-${student.team || "it"}`;
      
      const teamInfo = getTeamDetails(student.team);
      const qrTargetUrl = getBasePortfolioUrl(student.id);
      const qrBoxId = `qr-canvas-${student.id.replace(/[^a-zA-Z0-9]/g, "-")}-${index}`;
      const projectName = student.activityCycle?.projectName || student.projects?.[0]?.title || "Project Showcase";

      card.innerHTML = `
        <div class="id-header ${teamInfo.banner}">
          <div style="font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.9;">${teamInfo.emoji} ${teamInfo.name} • ${teamInfo.role}</div>
          <h3 class="school-name-text" style="color: #fff; font-size: 0.95rem;">${schoolConfig.schoolName}</h3>
          <p style="color: rgba(255,255,255,0.9); font-size: 0.7rem;">${schoolConfig.academicYear} • Official Digital Portfolio Badge</p>
        </div>
        <div class="id-body">
          <img src="${student.avatar}" alt="${student.name}" class="id-avatar" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'">
          <div class="id-student-name">${student.name}</div>
          <div class="id-student-class">${student.class} — Sec ${student.section} (Roll #${student.rollNo})</div>
          
          <div class="id-qr-box" id="${qrBoxId}"></div>
          <div class="id-scan-hint">📱 Scan to view verified portfolio & video</div>
          
          <div style="font-size: 0.72rem; font-weight: 600; color: ${teamInfo.color}; margin-top: 0.4rem; max-width: 90%;">
            ⭐ Cycle Project: ${projectName}
          </div>
        </div>
        <div class="id-footer">
          Verified ID: <strong style="font-family: monospace;">${student.id}</strong> • Activity Cycle: <span style="color: #059669; font-weight: 700;">Completed ✓</span>
        </div>
      `;

      cardsContainer.appendChild(card);

      // Generate QR Code
      const qrEl = document.getElementById(qrBoxId);
      if (qrEl) {
        new QRCode(qrEl, {
          text: qrTargetUrl,
          width: 120,
          height: 120,
          colorDark: "#0f172a",
          colorLight: "#ffffff"
        });
      }
    });
  }

  // Print button
  const printBtn = document.getElementById("printCardsBtn");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }

  // Initial render
  renderCards("all", "all");
});
