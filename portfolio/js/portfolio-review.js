/**
 * TechLearners & School Digital Portfolio - Portfolio Review & Submission System
 * Handles saving student portfolio profiles, submitting them for teacher review,
 * tracking review statuses (Pending / Approved / Revisions), and recording teacher feedback.
 */

(function () {
  const STORAGE_KEY = "tl_portfolio_submissions";
  const ACTIVE_PORTFOLIO_KEY = "tl_shm_portfolio_data";

  const PortfolioReviewStore = {
    /**
     * Get all submitted student portfolios from LocalStorage
     * @returns {Array<Object>}
     */
    getAll() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch (e) {
        console.warn("Could not load portfolio submissions:", e);
      }
      return [];
    },

    /**
     * Save all submissions to LocalStorage
     * @param {Array<Object>} submissions
     */
    saveAll(submissions) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
        return true;
      } catch (e) {
        console.error("Could not save portfolio submissions:", e);
        return false;
      }
    },

    /**
     * Get submission by ID
     * @param {string} id
     */
    getById(id) {
      const all = this.getAll();
      return all.find(s => s.id === id) || null;
    },

    /**
     * Find submission by student name and class/section
     * @param {string} name
     * @param {string} [classSection]
     */
    getByStudent(name, classSection) {
      if (!name) return null;
      const all = this.getAll();
      const normName = String(name).trim().toLowerCase();
      const normClass = classSection ? String(classSection).trim().toLowerCase() : "";
      return all.find(s => {
        const sName = String(s.studentName || "").trim().toLowerCase();
        const sClass = String(s.classSection || "").trim().toLowerCase();
        if (normClass) {
          return sName === normName && sClass === normClass;
        }
        return sName === normName;
      }) || null;
    },

    /**
     * Get count of pending review submissions
     */
    getPendingCount() {
      const all = this.getAll();
      return all.filter(s => s.status === "pending").length;
    },

    /**
     * Submit or re-submit a student portfolio for teacher review
     * @param {Object} options
     */
    submitReview(options) {
      const {
        studentName,
        classSection,
        rollNo,
        admissionNo,
        targetTeacher,
        studentNote,
        data
      } = options;

      if (!studentName || !String(studentName).trim()) {
        throw new Error("Student Full Name is required to submit for teacher review.");
      }

      const all = this.getAll();
      const now = new Date();
      const formattedDate = now.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });

      // Find existing submission for this student to update, or create new
      const existingIdx = all.findIndex(s => {
        const sName = String(s.studentName || "").trim().toLowerCase();
        const sClass = String(s.classSection || "").trim().toLowerCase();
        return sName === String(studentName).trim().toLowerCase() && 
               (!classSection || sClass === String(classSection).trim().toLowerCase());
      });

      const submissionId = existingIdx >= 0 && all[existingIdx].id 
        ? all[existingIdx].id 
        : "SUB-" + Date.now().toString(36).toUpperCase();

      const prevTeacherRemarks = existingIdx >= 0 ? all[existingIdx].teacherRemarks : "";
      const prevReviewedBy = existingIdx >= 0 ? all[existingIdx].reviewedBy : null;

      const submissionRecord = {
        id: submissionId,
        studentName: String(studentName).trim(),
        classSection: String(classSection || "").trim(),
        rollNo: String(rollNo || "").trim(),
        admissionNo: String(admissionNo || "").trim(),
        targetTeacher: String(targetTeacher || "").trim(),
        studentNote: String(studentNote || "").trim(),
        submittedAt: now.toISOString(),
        submittedAtFormatted: formattedDate,
        status: "pending",
        statusLabel: "Pending Teacher Review",
        reviewedBy: prevReviewedBy,
        reviewedAt: null,
        reviewedAtFormatted: null,
        teacherRemarks: prevTeacherRemarks || "",
        teacherRatings: null,
        portfolioData: Object.assign({}, data || {})
      };

      if (existingIdx >= 0) {
        all[existingIdx] = submissionRecord;
      } else {
        all.unshift(submissionRecord);
      }

      this.saveAll(all);

      // Sync active portfolio in LocalStorage
      try {
        const activeRaw = localStorage.getItem(ACTIVE_PORTFOLIO_KEY);
        let activeData = activeRaw ? JSON.parse(activeRaw) : {};
        activeData.reviewStatus = "pending";
        activeData.reviewStatusLabel = "Pending Teacher Review";
        activeData.reviewSubmissionId = submissionId;
        activeData.submittedAt = now.toISOString();
        activeData.submittedAtFormatted = formattedDate;
        activeData.targetTeacher = String(targetTeacher || "").trim();
        activeData.studentReviewNote = String(studentNote || "").trim();
        localStorage.setItem(ACTIVE_PORTFOLIO_KEY, JSON.stringify(activeData));
      } catch (e) {
        console.warn("Could not sync active portfolio review status:", e);
      }

      // Sync DataStore if available
      if (window.DataStore && typeof window.DataStore.getStudents === "function") {
        try {
          const students = window.DataStore.getStudents();
          const sMatch = students.find(s => 
            s.name.trim().toLowerCase() === String(studentName).trim().toLowerCase()
          );
          if (sMatch) {
            sMatch.reviewStatus = "pending";
            sMatch.reviewSubmissionId = submissionId;
            sMatch.lastSubmittedForReview = now.toISOString();
            window.DataStore.saveStudent(sMatch);
          }
        } catch (e) {
          console.warn("Could not update DataStore student review status:", e);
        }
      }

      window.dispatchEvent(new CustomEvent("portfolio-review-submitted", {
        detail: submissionRecord
      }));

      return submissionRecord;
    },

    /**
     * Teacher approves or updates review status
     * @param {string} id
     * @param {Object} details
     */
    approveReview(id, details = {}) {
      const all = this.getAll();
      const sub = all.find(s => s.id === id);
      if (!sub) return null;

      const now = new Date();
      const formattedDate = now.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });

      sub.status = details.status || "approved";
      sub.statusLabel = details.status === "needs_revision" ? "Revisions Requested" : "Reviewed & Approved";
      sub.reviewedBy = details.reviewedBy || "Class Teacher";
      sub.reviewedAt = now.toISOString();
      sub.reviewedAtFormatted = formattedDate;
      if (details.teacherRemarks) sub.teacherRemarks = details.teacherRemarks;
      if (details.teacherRatings) sub.teacherRatings = details.teacherRatings;

      this.saveAll(all);

      // Sync active portfolio if matching
      try {
        const activeRaw = localStorage.getItem(ACTIVE_PORTFOLIO_KEY);
        if (activeRaw) {
          let activeData = JSON.parse(activeRaw);
          if (activeData.reviewSubmissionId === id || activeData.studentName === sub.studentName) {
            activeData.reviewStatus = sub.status;
            activeData.reviewStatusLabel = sub.statusLabel;
            activeData.reviewedBy = sub.reviewedBy;
            activeData.reviewedAt = sub.reviewedAt;
            activeData.reviewedAtFormatted = formattedDate;
            if (details.teacherRemarks) activeData.teacherRemarks = details.teacherRemarks;
            if (details.teacherRatings) activeData.teacherRatings = details.teacherRatings;
            localStorage.setItem(ACTIVE_PORTFOLIO_KEY, JSON.stringify(activeData));
          }
        }
      } catch (e) {
        console.warn("Could not sync active portfolio after approval:", e);
      }

      // Sync DataStore
      if (window.DataStore && typeof window.DataStore.getStudents === "function") {
        try {
          const students = window.DataStore.getStudents();
          const sMatch = students.find(s => 
            s.name.trim().toLowerCase() === String(sub.studentName).trim().toLowerCase()
          );
          if (sMatch) {
            sMatch.reviewStatus = sub.status;
            sMatch.reviewedBy = sub.reviewedBy;
            sMatch.reviewedAt = sub.reviewedAt;
            window.DataStore.saveStudent(sMatch);
          }
        } catch (e) {}
      }

      window.dispatchEvent(new CustomEvent("portfolio-review-updated", {
        detail: sub
      }));

      return sub;
    },

    /**
     * Delete submission
     * @param {string} id
     */
    deleteSubmission(id) {
      let all = this.getAll();
      all = all.filter(s => s.id !== id);
      this.saveAll(all);
      window.dispatchEvent(new CustomEvent("portfolio-review-updated", { detail: { id, deleted: true } }));
      return true;
    }
  };

  window.PortfolioReviewStore = PortfolioReviewStore;
})();
