(function () {
  const storageKey = 'tl_theme';
  const media = window.matchMedia('(prefers-color-scheme: light)');

  function applyTheme(mode) {
    const resolved = mode === 'system' ? (media.matches ? 'light' : 'dark') : mode;
    document.documentElement.dataset.theme = resolved;
  }

  function setTheme(mode) {
    localStorage.setItem(storageKey, mode);
    applyTheme(mode);
  }

  function addSelector() {
    const nav = document.querySelector('.nav');
    if (!nav || document.getElementById('themeMode')) return;
    const mode = localStorage.getItem(storageKey) || 'system';
    const label = document.createElement('label');
    label.className = 'theme-picker';
    label.innerHTML = `<span>Theme</span><select id="themeMode" aria-label="Theme mode">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>`;
    label.querySelector('select').value = mode;
    label.querySelector('select').addEventListener('change', event => setTheme(event.target.value));
    nav.appendChild(label);
  }

  const currentMode = localStorage.getItem(storageKey) || 'system';
  applyTheme(currentMode);
  media.addEventListener('change', () => {
    if ((localStorage.getItem(storageKey) || 'system') === 'system') applyTheme('system');
  });
  document.addEventListener('DOMContentLoaded', addSelector);
})();
