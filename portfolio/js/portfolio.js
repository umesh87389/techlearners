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
});
