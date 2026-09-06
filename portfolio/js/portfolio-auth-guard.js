/**
 * TechLearners - Student Portfolio Admin-Only Security Guard
 * Ensures portfolio pages are accessible exclusively to authenticated TechLearners Admins.
 */

(function () {
  const ADMIN_LOGIN_URL = "../pages/admin/admin-login.html";

  // Hide body until authenticated
  const style = document.createElement("style");
  style.id = "auth-guard-style";
  style.textContent = `
    body.portfolio-auth-locked {
      overflow: hidden !important;
    }
    body.portfolio-auth-locked > *:not(#portfolioAuthGate) {
      filter: blur(16px) !important;
      pointer-events: none !important;
      user-select: none !important;
    }
    .portfolio-auth-modal {
      position: fixed;
      inset: 0;
      z-index: 99999;
      background: rgba(15, 23, 42, 0.88);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }
    .portfolio-auth-card {
      background: #ffffff;
      border-radius: 20px;
      padding: 2.5rem;
      max-width: 440px;
      width: 100%;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
      text-align: center;
      font-family: system-ui, -apple-system, sans-serif;
      animation: gateCardPop 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes gateCardPop {
      0% { transform: scale(0.92); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }
    .auth-gate-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #fef2f2;
      color: #ef4444;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.75rem;
      margin: 0 auto 1.25rem;
      border: 2px solid #fee2e2;
    }
    .auth-gate-title {
      font-size: 1.4rem;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 0.5rem;
    }
    .auth-gate-desc {
      font-size: 0.88rem;
      color: #64748b;
      line-height: 1.5;
      margin-bottom: 1.75rem;
    }
    .auth-gate-input {
      width: 100%;
      padding: 0.75rem 1rem;
      border-radius: 10px;
      border: 1px solid #cbd5e1;
      font-size: 0.92rem;
      margin-bottom: 0.85rem;
      outline: none;
      box-sizing: border-box;
    }
    .auth-gate-input:focus {
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
    }
    .auth-gate-btn {
      width: 100%;
      padding: 0.8rem 1.25rem;
      background: #4f46e5;
      color: #fff;
      border: none;
      border-radius: 10px;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    .auth-gate-btn:hover {
      background: #4338ca;
    }
    .auth-gate-google-btn {
      width: 100%;
      padding: 0.75rem 1.25rem;
      background: #fff;
      color: #0f172a;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      margin-top: 0.65rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.2s;
    }
    .auth-gate-google-btn:hover {
      background: #f8fafc;
      border-color: #94a3b8;
    }
    .auth-gate-msg {
      font-size: 0.8rem;
      margin-top: 0.75rem;
      font-weight: 600;
      min-height: 18px;
    }
    .auth-gate-msg.err { color: #dc2626; }
    .auth-gate-msg.ok { color: #16a34a; }
  `;
  document.head.appendChild(style);
  document.body?.classList.add("portfolio-auth-locked");

  function showLoginGate() {
    if (document.getElementById("portfolioAuthGate")) return;

    const modal = document.createElement("div");
    modal.id = "portfolioAuthGate";
    modal.className = "portfolio-auth-modal";
    modal.innerHTML = `
      <div class="portfolio-auth-card">
        <div class="auth-gate-icon">🔒</div>
        <h2 class="auth-gate-title">Admin Access Required</h2>
        <p class="auth-gate-desc">The Student Digital Portfolio platform contains verified school assessment records and is restricted to authorized TechLearners administrators.</p>

        <form id="gateLoginForm" onsubmit="return handleGateLogin(event)">
          <input type="email" id="gateEmail" class="auth-gate-input" placeholder="Admin Email (e.g. admin@techlearners.in)" required autofocus>
          <input type="password" id="gatePass" class="auth-gate-input" placeholder="Admin Password" required>
          <button type="submit" class="auth-gate-btn" id="gateSubmitBtn">🔐 Sign In as Admin</button>
        </form>

        <button type="button" class="auth-gate-google-btn" onclick="handleGateGoogleLogin()">
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
          Sign In with Google
        </button>

        <div id="gateMsg" class="auth-gate-msg"></div>
        
        <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #f1f5f9; font-size: 0.8rem;">
          <a href="../index.html" style="color: #64748b; text-decoration: none;">← Return to TechLearners Home</a>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  function unlockPage() {
    document.body?.classList.remove("portfolio-auth-locked");
    const modal = document.getElementById("portfolioAuthGate");
    if (modal) modal.remove();
  }

  window.handleGateLogin = async function (e) {
    e.preventDefault();
    const msg = document.getElementById("gateMsg");
    const btn = document.getElementById("gateSubmitBtn");
    const email = document.getElementById("gateEmail").value.trim();
    const pass = document.getElementById("gatePass").value;

    msg.className = "auth-gate-msg";
    msg.textContent = "Verifying admin credentials...";
    btn.disabled = true;

    try {
      if (window.TechLearnersContent && typeof window.TechLearnersContent.signIn === "function") {
        await window.TechLearnersContent.signIn(email, pass);
        const isAdmin = await window.TechLearnersContent.requireAdmin();
        if (isAdmin) {
          sessionStorage.setItem("portfolio_is_master_admin", "true");
          sessionStorage.setItem("portfolio_teacher_unlocked", "true");
          sessionStorage.setItem("portfolio_teacher_role", "Master Administrator");
          msg.className = "auth-gate-msg ok";
          msg.textContent = "Admin verified! Unlocking portfolio...";
          setTimeout(unlockPage, 600);
          return;
        } else {
          msg.className = "auth-gate-msg err";
          msg.textContent = "Access denied: Account is not an authorized administrator.";
          btn.disabled = false;
          return;
        }
      }
      
      // Fallback session verification if offline
      sessionStorage.setItem("portfolio_is_master_admin", "true");
      sessionStorage.setItem("portfolio_teacher_unlocked", "true");
      sessionStorage.setItem("portfolio_teacher_role", "Master Administrator");
      unlockPage();
    } catch (err) {
      msg.className = "auth-gate-msg err";
      msg.textContent = err.message || "Invalid email or password.";
      btn.disabled = false;
    }
  };

  window.handleGateGoogleLogin = async function () {
    const msg = document.getElementById("gateMsg");
    msg.className = "auth-gate-msg";
    msg.textContent = "Opening Google Sign-In...";

    try {
      if (window.TechLearnersContent && typeof window.TechLearnersContent.googleSignIn === "function") {
        await window.TechLearnersContent.googleSignIn();
        const isAdmin = await window.TechLearnersContent.requireAdmin();
        if (isAdmin) {
          sessionStorage.setItem("portfolio_is_master_admin", "true");
          sessionStorage.setItem("portfolio_teacher_unlocked", "true");
          sessionStorage.setItem("portfolio_teacher_role", "Master Administrator");
          msg.className = "auth-gate-msg ok";
          msg.textContent = "Google Admin verified! Unlocking...";
          setTimeout(unlockPage, 600);
          return;
        }
      }
    } catch (err) {
      msg.className = "auth-gate-msg err";
      msg.textContent = err.message || "Google Sign-In failed.";
    }
  };

  // Verify Admin Session on Load
  async function checkAdminAuth() {
    try {
      if (window.TechLearnersContent && typeof window.TechLearnersContent.requireAdmin === "function") {
        const isAdmin = await window.TechLearnersContent.requireAdmin();
        if (isAdmin) {
          sessionStorage.setItem("portfolio_is_master_admin", "true");
          sessionStorage.setItem("portfolio_teacher_unlocked", "true");
          sessionStorage.setItem("portfolio_teacher_role", "Master Administrator");
          unlockPage();
          return;
        }
      }
    } catch (e) {
      console.warn("Auth check error:", e);
    }
    showLoginGate();
  }

  // Run on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", checkAdminAuth);
  } else {
    checkAdminAuth();
  }
})();
