(function () {
  function showLoading(message) {
    let overlay = document.getElementById('loginLoadingOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'loginLoadingOverlay';
      overlay.className = 'login-loading-overlay';
      overlay.innerHTML = `<div class="login-loading-card" role="status" aria-live="polite">
        <span class="login-spinner" aria-hidden="true"></span>
        <b id="loginLoadingMessage">Preparing your dashboard...</b>
        <span class="muted">TechLearners is getting things ready.</span>
      </div>`;
      document.body.appendChild(overlay);
    }
    document.getElementById('loginLoadingMessage').textContent = message || 'Preparing your dashboard...';
    requestAnimationFrame(() => overlay.classList.add('show'));
  }

  function goToDashboard(url, message) {
    showLoading(message);
    window.setTimeout(() => {
      location.href = url;
    }, 850);
  }

  window.TechLearnersAuthUI = { goToDashboard, showLoading };
})();
