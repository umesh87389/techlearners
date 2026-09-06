/**
 * TechLearners - Teacher & Staff Verification PIN Manager
 * Supports Master School PIN and Class-Wise Teacher Passcodes (Class VI - XII)
 */

(function () {
  const STORAGE_KEY = "tl_teacher_pins_config";

  const DEFAULT_TEACHER_PINS = {
    masterPin: "shm2026",
    classPins: {
      "Class VI": "shm-vi",
      "Class VII": "shm-vii",
      "Class VIII": "shm-viii",
      "Class IX": "shm-ix",
      "Class X": "shm-x",
      "Class XI": "shm-xi",
      "Class XII": "shm-xii"
    },
    backupPins: ["shm2026", "teacher2026", "shm@2026", "techlearners", "admin"]
  };

  const TeacherPINStore = {
    get() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          return {
            masterPin: (parsed.masterPin && String(parsed.masterPin).trim()) || DEFAULT_TEACHER_PINS.masterPin,
            classPins: Object.assign({}, DEFAULT_TEACHER_PINS.classPins, parsed.classPins || {}),
            backupPins: Array.isArray(parsed.backupPins) && parsed.backupPins.length > 0 
              ? parsed.backupPins 
              : DEFAULT_TEACHER_PINS.backupPins
          };
        }
      } catch (e) {
        console.warn("Could not read teacher PINs from storage:", e);
      }
      return JSON.parse(JSON.stringify(DEFAULT_TEACHER_PINS));
    },

    save(config) {
      try {
        const payload = {
          masterPin: (config.masterPin && String(config.masterPin).trim()) || DEFAULT_TEACHER_PINS.masterPin,
          classPins: config.classPins || DEFAULT_TEACHER_PINS.classPins,
          backupPins: Array.isArray(config.backupPins) ? config.backupPins : DEFAULT_TEACHER_PINS.backupPins,
          updatedAt: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        return true;
      } catch (e) {
        console.error("Could not save teacher PINs:", e);
        return false;
      }
    },

    reset() {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      return JSON.parse(JSON.stringify(DEFAULT_TEACHER_PINS));
    },

    verify(enteredPin, currentStudentClass) {
      const config = this.get();
      const clean = (enteredPin || "").trim().toLowerCase();
      if (!clean) return { valid: false, message: "Please enter a passcode." };

      // 1. Check Master School PIN
      if (config.masterPin && clean === config.masterPin.trim().toLowerCase()) {
        return {
          valid: true,
          role: "Master Administrator",
          isMaster: true,
          message: "Verified as School Master Admin"
        };
      }

      // 2. Check Backup Admin PINs
      if (config.backupPins && config.backupPins.some(p => p.trim().toLowerCase() === clean)) {
        return {
          valid: true,
          role: "Staff Administrator",
          isMaster: true,
          message: "Verified as Staff Admin"
        };
      }

      // 3. Check Class-Wise PINs
      for (const [cls, pin] of Object.entries(config.classPins || {})) {
        if (pin && clean === pin.trim().toLowerCase()) {
          const studentNorm = normalizeClass(currentStudentClass);
          const pinNorm = normalizeClass(cls);
          if (studentNorm && pinNorm && studentNorm !== pinNorm) {
            return {
              valid: true,
              warning: true,
              role: `${cls} Teacher`,
              verifiedClass: cls,
              isMaster: false,
              message: `Verified as ${cls} Teacher (Note: student profile is currently ${currentStudentClass})`
            };
          }
          return {
            valid: true,
            role: `${cls} Teacher`,
            verifiedClass: cls,
            isMaster: false,
            message: `Verified as ${cls} Teacher`
          };
        }
      }

      return { valid: false, message: "Invalid passcode. Please enter Master PIN or Class PIN." };
    },

    isMasterSession() {
      return sessionStorage.getItem("portfolio_is_master_admin") === "true";
    },

    setMasterSession(val) {
      if (val) {
        sessionStorage.setItem("portfolio_is_master_admin", "true");
      } else {
        sessionStorage.removeItem("portfolio_is_master_admin");
      }
    }
  };

  // UI Modal Management
  function renderClassPinsForm(config) {
    const grid = document.getElementById("classPinsGrid");
    if (!grid) return;
    grid.innerHTML = "";

    const classList = [
      "Class VI", "Class VII", "Class VIII", "Class IX", 
      "Class X", "Class XI", "Class XII"
    ];

    classList.forEach(cls => {
      const currentPin = (config.classPins && config.classPins[cls]) || "";
      const field = document.createElement("div");
      field.className = "form-group";
      field.style.background = "#f8fafc";
      field.style.border = "1px solid #e2e8f0";
      field.style.borderRadius = "8px";
      field.style.padding = "0.6rem 0.75rem";
      field.innerHTML = `
        <label style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; font-weight: 700; color: #1e293b; margin-bottom: 0.25rem;">
          <span>🏫 ${cls} PIN</span>
        </label>
        <div style="display: flex; gap: 0.35rem; align-items: center;">
          <input type="text" class="form-control class-pin-input" data-class="${cls}" value="${escapeHtml(currentPin)}" placeholder="e.g. shm-${cls.split(" ")[1]?.toLowerCase() || "pin"}" required style="font-size: 0.85rem; padding: 0.4rem 0.6rem;">
        </div>
      `;
      grid.appendChild(field);
    });
  }

  function openPinManagerModal() {
    // If not verified as master admin yet, request Master PIN first for security
    if (!TeacherPINStore.isMasterSession()) {
      const config = TeacherPINStore.get();
      const entered = prompt("🔐 Enter Master School PIN to configure Teacher & Class passcodes:");
      if (!entered) return;
      const clean = entered.trim().toLowerCase();
      const masterClean = (config.masterPin || "shm2026").trim().toLowerCase();
      const isBackup = (config.backupPins || []).some(p => p.trim().toLowerCase() === clean);

      if (clean !== masterClean && !isBackup) {
        alert("❌ Access denied: Incorrect Master School PIN.");
        return;
      }
      TeacherPINStore.setMasterSession(true);
    }

    const modal = document.getElementById("pinManagerModal");
    if (!modal) return;

    const config = TeacherPINStore.get();
    const masterInput = document.getElementById("cfgMasterPin");
    if (masterInput) masterInput.value = config.masterPin || "shm2026";

    renderClassPinsForm(config);

    const feedback = document.getElementById("pinManagerFeedback");
    if (feedback) feedback.textContent = "";

    modal.style.display = "flex";
  }

  function closePinManagerModal() {
    const modal = document.getElementById("pinManagerModal");
    if (modal) modal.style.display = "none";
  }

  function handleSavePinConfig(e) {
    if (e && e.preventDefault) e.preventDefault();

    const masterInput = document.getElementById("cfgMasterPin");
    const masterPin = masterInput ? masterInput.value.trim() : "shm2026";
    if (!masterPin) {
      alert("Master School PIN cannot be empty.");
      return false;
    }

    const classPins = {};
    document.querySelectorAll(".class-pin-input").forEach(inp => {
      const cls = inp.getAttribute("data-class");
      const val = inp.value.trim();
      if (cls && val) {
        classPins[cls] = val;
      }
    });

    const currentConfig = TeacherPINStore.get();
    const updated = {
      masterPin,
      classPins,
      backupPins: currentConfig.backupPins
    };

    TeacherPINStore.save(updated);

    const feedback = document.getElementById("pinManagerFeedback");
    if (feedback) {
      feedback.style.color = "#16a34a";
      feedback.textContent = "✅ Master and Class PINs updated successfully!";
    }

    window.dispatchEvent(new CustomEvent("teacher-pins-updated", { detail: updated }));

    setTimeout(() => {
      closePinManagerModal();
    }, 600);

    return false;
  }

  function handleResetPinConfig() {
    if (confirm("Reset all Teacher & Class PINs to original school defaults?")) {
      const def = TeacherPINStore.reset();
      const masterInput = document.getElementById("cfgMasterPin");
      if (masterInput) masterInput.value = def.masterPin;
      renderClassPinsForm(def);

      const feedback = document.getElementById("pinManagerFeedback");
      if (feedback) {
        feedback.style.color = "#4338ca";
        feedback.textContent = "🔄 Reset to factory defaults!";
      }

      window.dispatchEvent(new CustomEvent("teacher-pins-updated", { detail: def }));
    }
  }

  function normalizeClass(str) {
    if (!str) return "";
    let s = String(str).toUpperCase();
    s = s.replace(/\b(\d+)(ST|ND|RD|TH)\b/g, "$1");
    s = s.replace(/[^A-Z0-9]/g, " ");
    if (/\b(XII|12)\b/.test(s)) return "Class XII";
    if (/\b(XI|11)\b/.test(s)) return "Class XI";
    if (/\b(X|10)\b/.test(s)) return "Class X";
    if (/\b(IX|9)\b/.test(s)) return "Class IX";
    if (/\b(VIII|8)\b/.test(s)) return "Class VIII";
    if (/\b(VII|7)\b/.test(s)) return "Class VII";
    if (/\b(VI|6)\b/.test(s)) return "Class VI";
    return "";
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Expose globally
  window.TeacherPINStore = TeacherPINStore;
  window.openPinManagerModal = openPinManagerModal;
  window.closePinManagerModal = closePinManagerModal;
  window.handleSavePinConfig = handleSavePinConfig;
  window.handleResetPinConfig = handleResetPinConfig;
})();
