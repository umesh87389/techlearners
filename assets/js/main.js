(function initTheme() {
  const savedTheme = localStorage.getItem('tl_theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const activeTheme = savedTheme || (systemDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', activeTheme);
})();

const escapeHtml = value => String(value || '').replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
})[character]);

function setupNavAuth() {
  if (typeof TechLearnersFirebase === 'undefined') return;
  const nav = document.getElementById('navMenu');
  if (!nav) return;
  TechLearnersFirebase.onAuthStateChanged(user => {
    const existingWidget = document.getElementById('navUserWidget');
    if (existingWidget) existingWidget.remove();
    const loginLink = nav.querySelector('a[href*="login.html"]');
    if (user) {
      if (loginLink) loginLink.style.display = 'none';
      const widget = document.createElement('div');
      widget.id = 'navUserWidget';
      widget.className = 'nav-user-widget';
      const name = user.displayName || user.email?.split('@')[0] || 'Student';
      const initial = name.charAt(0).toUpperCase();
      widget.innerHTML = `<button class="nav-user-trigger" aria-label="User menu" aria-expanded="false">
        <span class="nav-profile-pic">${user.photoURL ? `<img class="nav-profile-img" src="${escapeHtml(user.photoURL)}" alt="">` : `<span class="nav-profile-initial">${initial}</span>`}</span>
        <svg class="nav-chevron" viewBox="0 0 20 20" width="12" height="12" aria-hidden="true"><path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="nav-dropdown" role="menu">
        <a class="nav-dropdown-item" role="menuitem" href="${escapeHtml(getSiteRoot() + 'dashboard.html')}">
          <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M2 10l8-7 8 7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 8v7h4v-4h2v4h4V8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Dashboard
        </a>
        <button class="nav-dropdown-item nav-dropdown-logout" role="menuitem" type="button">
          <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M7 5V3a1 1 0 011-1h4a1 1 0 011 1v2M3 10h10M10 7l3 3-3 3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 13v2a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Logout
        </button>
      </div>`;
      const navImg = widget.querySelector('.nav-profile-img');
      if (navImg) navImg.onerror = function () { this.outerHTML = '<span class="nav-profile-initial">' + initial + '</span>'; };
      widget.querySelector('.nav-user-trigger').addEventListener('click', event => {
        event.stopPropagation();
        const expanded = widget.querySelector('.nav-dropdown').classList.toggle('show');
        event.currentTarget.setAttribute('aria-expanded', expanded);
      });
      widget.querySelector('.nav-dropdown-logout').addEventListener('click', async () => {
        await TechLearnersFirebase.signOut();
        TechLearnersCookies.set('tl_logout', '1', 1);
        location.href = getSiteRoot() + 'login.html';
      });
      document.addEventListener('click', event => {
        if (!widget.contains(event.target)) {
          widget.querySelector('.nav-dropdown').classList.remove('show');
          widget.querySelector('.nav-user-trigger').setAttribute('aria-expanded', 'false');
        }
      });
      nav.appendChild(widget);
    } else {
      if (loginLink) loginLink.style.display = '';
    }
  });
}

window.TechLearnersAdminNav = {
  setup(nav = document.querySelector('.nav')) {
    if (!nav || nav.dataset.adminNavReady === 'true') return;
    const header = nav.closest('.site-header');
    if (header && !header.querySelector('.menu-btn')) {
      const menuBtn = document.createElement('button');
      menuBtn.className = 'menu-btn';
      menuBtn.id = 'menuBtn';
      menuBtn.type = 'button';
      menuBtn.setAttribute('aria-label', 'Open navigation menu');
      menuBtn.innerHTML = '<span></span><span></span><span></span>';
      const brand = header.querySelector('.brand');
      if (brand) brand.after(menuBtn);
      else header.prepend(menuBtn);
    }
    if (!nav.id) nav.id = 'navMenu';
    const menuButton = header?.querySelector('.menu-btn');
    if (menuButton && !menuButton.dataset.navToggleReady) {
      menuButton.dataset.navToggleReady = 'true';
      menuButton.addEventListener('click', () => nav.classList.toggle('show'));
    }
    nav.dataset.adminNavReady = 'true';
    nav.classList.add('admin-nav');
    nav.setAttribute('aria-label', 'Admin navigation');

    const currentPage = location.pathname.split('/').pop();
    const adminLinks = [
      { href: 'admin-dashboard.html', label: 'Dashboard' },
      { href: 'manage-chapters.html', label: 'Chapters' },
      { href: 'upload-notes.html', label: 'Notes' },
      { href: 'manage-mcqs.html', label: 'MCQs' },
      { href: 'manage-question-papers.html', label: 'Sample Papers' },
      { href: 'manage-revision-papers.html', label: 'Revision Papers' },
      { href: 'manage-quizzes.html', label: 'Manage Quiz' },
      { href: 'quiz-results.html', label: 'Quiz Results' },
      { href: 'announcements.html', label: 'Announcements' },
      { href: 'focus.html', label: "Today's Focus" },
      { href: 'advertisements.html', label: 'Advertisements' },
      { href: 'contact-messages.html', label: 'Contact Messages' }
    ];
    const navInsertRef = () => [...nav.children].find(child => child.matches('.admin-notification, .login-greeting, button'));
    const ref = navInsertRef();
    adminLinks.forEach(link => {
      if (nav.querySelector(`[href="${link.href}"]`)) return;
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.label;
      if (ref) nav.insertBefore(anchor, ref);
      else nav.appendChild(anchor);
    });

    const groups = [
      { label: 'Resources', items: ['manage-chapters.html', 'upload-notes.html', 'manage-mcqs.html', 'manage-question-papers.html', 'manage-revision-papers.html'] },
      { label: 'Quizzes', items: ['manage-quizzes.html', 'quiz-results.html'] },
      { label: 'Site Management', items: ['announcements.html', 'focus.html', 'advertisements.html', 'contact-messages.html'] }
    ];
    const closeGroup = wrapper => {
      const trigger = wrapper.querySelector('.nav-dd-trigger');
      const menu = wrapper.querySelector('.nav-dd-menu');
      if (!trigger || !menu) return;
      menu.hidden = true;
      menu.classList.remove('show');
      wrapper.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    };
    const openGroup = wrapper => {
      nav.querySelectorAll('.nav-dd-wrapper').forEach(other => {
        if (other !== wrapper) closeGroup(other);
      });
      const trigger = wrapper.querySelector('.nav-dd-trigger');
      const menu = wrapper.querySelector('.nav-dd-menu');
      if (!trigger || !menu) return;
      menu.hidden = false;
      menu.classList.add('show');
      wrapper.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    };
    groups.forEach(group => {
      const groupLinks = [...nav.querySelectorAll('a')].filter(a => group.items.includes(a.getAttribute('href')));
      if (!groupLinks.length) return;
      const isActiveGroup = groupLinks.some(a => a.getAttribute('href') === currentPage);
      const menuId = `admin-nav-${group.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      const wrapper = document.createElement('div');
      wrapper.className = `nav-dd-wrapper${isActiveGroup ? ' active' : ''}`;
      wrapper.innerHTML = `<button class="nav-dd-trigger" type="button" aria-expanded="false" aria-controls="${menuId}">${group.label} <svg class="nav-chevron" viewBox="0 0 20 20" width="12" height="12" aria-hidden="true"><path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button><div class="nav-dd-menu" id="${menuId}" hidden></div>`;
      const menu = wrapper.querySelector('.nav-dd-menu');
      groupLinks.forEach(a => {
        if (a.getAttribute('href') === currentPage) {
          a.classList.add('active');
          a.setAttribute('aria-current', 'page');
        }
        menu.appendChild(a);
      });
      const anchorRef = navInsertRef();
      if (anchorRef) nav.insertBefore(wrapper, anchorRef);
      else nav.appendChild(wrapper);
      const trigger = wrapper.querySelector('.nav-dd-trigger');
      trigger.addEventListener('click', event => {
        event.stopPropagation();
        if (menu.hidden) openGroup(wrapper);
        else closeGroup(wrapper);
      });
      trigger.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
          closeGroup(wrapper);
          trigger.focus();
        }
      });
      document.addEventListener('click', event => {
        if (!wrapper.contains(event.target)) closeGroup(wrapper);
      });
    });
    const dashboard = nav.querySelector('[href="admin-dashboard.html"]');
    if (dashboard && dashboard.getAttribute('href') === currentPage) dashboard.setAttribute('aria-current', 'page');
  }
};

(function routeAdminHost() {
  const adminHost = 'admin.techlearners.in';
  const adminPathPrefix = '/pages/admin/';
  if (location.hostname.toLowerCase() === adminHost && !location.pathname.startsWith(adminPathPrefix)) {
    location.replace(`${location.protocol}//${adminHost}/pages/admin/admin-login.html`);
  }
})();

function renderRichText(value, { linkify = false } = {}) {
  const raw = String(value || '');
  const hasFormatting = /<\/?(?:a|b|blockquote|br|div|em|h2|h3|i|li|ol|p|strong|u|ul)\b/i.test(raw);
  if (!hasFormatting) {
    const escaped = escapeHtml(raw).replace(/\n/g, '<br>');
    return linkify ? escaped.replace(
      /(https?:\/\/[^\s<]+)/g,
      '<a class="announcement-link" href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    ) : escaped;
  }

  const template = document.createElement('template');
  template.innerHTML = raw;
  const allowedTags = new Set(['A', 'B', 'BLOCKQUOTE', 'BR', 'DIV', 'EM', 'H2', 'H3', 'I', 'LI', 'OL', 'P', 'STRONG', 'U', 'UL']);
  [...template.content.querySelectorAll('*')].forEach(element => {
    if (!allowedTags.has(element.tagName)) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const href = element.tagName === 'A' ? element.getAttribute('href') : '';
    [...element.attributes].forEach(attribute => element.removeAttribute(attribute.name));
    if (element.tagName === 'A') {
      if (/^https?:\/\//i.test(href || '')) {
        element.setAttribute('href', href);
        element.setAttribute('target', '_blank');
        element.setAttribute('rel', 'noopener noreferrer');
      } else {
        element.replaceWith(...element.childNodes);
      }
    }
  });
  return template.innerHTML;
}

function renderPlainNote(value) {
  const lines = String(value || '').replace(/\r\n/g, '\n').split('\n');
  const html = [];
  let paragraph = [];
  let listType = '';

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${paragraph.join('<br>')}</p>`);
    paragraph = [];
  };
  const flushList = () => {
    if (!listType) return;
    html.push(`</${listType}>`);
    listType = '';
  };
  const openList = type => {
    flushParagraph();
    if (listType === type) return;
    flushList();
    html.push(`<${type}>`);
    listType = type;
  };
  const looksLikeHeading = line => {
    if (/[:：]$/.test(line)) return true;
    if (/^(chapter|section|topic|unit|module|key points?|summary|definition|example|activity|steps?|important|remember)\b/i.test(line)) return true;
    return line.length <= 56 && !/[.!?]$/.test(line);
  };

  lines.forEach(rawLine => {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
      return;
    }

    const bullet = line.match(/^[-*•]\s+(.+)/);
    const numbered = line.match(/^\d+[.)]\s+(.+)/);
    if (bullet || numbered) {
      openList(bullet ? 'ul' : 'ol');
      html.push(`<li>${escapeHtml((bullet || numbered)[1])}</li>`);
      return;
    }

    flushList();
    if (looksLikeHeading(line)) {
      flushParagraph();
      html.push(`<h3>${escapeHtml(line.replace(/[:：]$/, ''))}</h3>`);
      return;
    }
    paragraph.push(escapeHtml(line));
  });

  flushParagraph();
  flushList();
  return html.join('');
}

function renderNoteContent(value) {
  const raw = String(value || '');
  return /<\/?(?:a|b|blockquote|br|div|em|h2|h3|i|li|ol|p|strong|u|ul)\b/i.test(raw)
    ? renderRichText(raw)
    : renderPlainNote(raw);
}

const noteUrl = value => {
  const url = String(value || '');
  if (/^https?:\/\//.test(url)) return url;
  return `../../${url.replace(/^\/+/, '')}`;
};

const noteKey = (note, index = 0) => note.id || `${note.class}|${note.subject || 'AI'}|${note.title || index}`;
const noteDetailUrl = (note, index = 0) => {
  const params = new URLSearchParams({
    class: note.class || 'Class 9',
    subject: note.subject || 'AI',
    note: noteKey(note, index)
  });
  return `${getSiteRoot()}pages/notes/detail.html?${params}`;
};
const displayClassName = value => /^CBSE\s/i.test(String(value || '')) ? String(value || '') : `CBSE ${value}`;

const homepageSearchRoutes = [
  { terms: ['class 9 ai', '9 ai', 'artificial intelligence 9'], url: 'pages/class9/ai.html' },
  { terms: ['class 9 it', '9 it', 'information technology 9'], url: 'pages/class9/it.html' },
  { terms: ['class 10 ai', '10 ai', 'artificial intelligence 10'], url: 'pages/class10/ai.html' },
  { terms: ['class 10 it', '10 it', 'information technology 10'], url: 'pages/class10/it.html' },
  { terms: ['mcq', 'mcqs', 'multiple choice'], url: 'pages/quizzes/index.html' },
  { terms: ['quiz', 'practice', 'test'], url: 'pages/quiz/index.html' },
  { terms: ['revision paper', 'revision test', 'revision papers', 'revision'], url: 'pages/revision-papers/index.html' },
  { terms: ['paper', 'sample', 'question paper', 'exam'], url: 'pages/question-papers/index.html' },
  { terms: ['dashboard', 'progress'], url: 'dashboard.html' },
  { terms: ['note', 'notes', 'chapter'], url: 'pages/notes/index.html' }
];

function searchHomepageResources(form) {
  const searchInput = form?.querySelector('input[type="search"]');
  const query = String(searchInput?.value || '').toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').replace(/\s+/g, ' ').trim();
  if (!query) return false;
  const match = homepageSearchRoutes.find(route => route.terms.some(term => query.includes(term)));
  location.href = match ? match.url : 'pages/notes/index.html';
  return false;
}
window.searchHomepageResources = searchHomepageResources;

function shareUrl(url, title = 'TechLearners note') {
  if (navigator.share) {
    return navigator.share({ title, url }).catch(error => {
      if (error.name !== 'AbortError') throw error;
    });
  }
  return navigator.clipboard.writeText(url).then(() => alert('Share link copied.'));
}

function copyShareUrl(url) {
  return navigator.clipboard.writeText(url).then(() => alert('Share link copied.'));
}

function renderShareActions(url, title, label = 'Share') {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title || 'TechLearners resource');
  return `<div class="share-actions" aria-label="${escapeHtml(label)} options">
    <button class="btn small secondary" type="button" data-share-url="${escapeHtml(url)}" data-share-title="${escapeHtml(title)}">${escapeHtml(label)}</button>
    <button class="btn small secondary" type="button" data-copy-url="${escapeHtml(url)}">Copy link</button>
    <a class="btn small secondary" href="https://wa.me/?text=${encodedTitle}%20${encodedUrl}" target="_blank" rel="noopener">WhatsApp</a>
  </div>`;
}

function setupShareActionHandlers(scope = document) {
  scope.querySelectorAll('[data-share-url]').forEach(button => {
    button.addEventListener('click', () => shareUrl(button.dataset.shareUrl, button.dataset.shareTitle));
  });
  scope.querySelectorAll('[data-copy-url]').forEach(button => {
    button.addEventListener('click', () => copyShareUrl(button.dataset.copyUrl));
  });
}

function getSiteRoot() {
  const parts = location.pathname.split('/').filter(Boolean);
  const pagesIndex = parts.indexOf('pages');
  return pagesIndex < 0 ? '' : '../'.repeat(parts.length - pagesIndex - 1);
}

function normaliseHomepageUrl() {
  if (location.pathname === '/index.html') {
    history.replaceState(null, '', `/${location.search}${location.hash}`);
  }
}

function setupButtonClickFeedback() {
  document.addEventListener('click', event => {
    const button = event.target.closest('button, a.btn');
    if (!button) return;
    button.classList.remove('button-click-feedback');
    void button.offsetWidth;
    button.classList.add('button-click-feedback');
    clearTimeout(button.buttonClickFeedbackTimer);
    button.buttonClickFeedbackTimer = setTimeout(() => button.classList.remove('button-click-feedback'), 650);
  });
}

function setupMobileCardScrollEffects() {
  const cards = [...document.querySelectorAll('.home-updates .hero-card, .explore-section .card, .explore-section .subject-link, .help-section .card')];
  cards.forEach(card => card.classList.remove('mobile-scroll-card', 'scroll-effect-visible'));
}

const TechLearnersCookies = {
  set(name, value, days = 180) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  },
  get(name) {
    const key = `${encodeURIComponent(name)}=`;
    return document.cookie
      .split('; ')
      .find(cookie => cookie.startsWith(key))
      ?.slice(key.length) || '';
  }
};
window.TechLearnersCookies = TechLearnersCookies;

const TechLearnersConsent = {
  categories: { essential: true, analytics: false, advertising: false },
  storageKey: 'tl_consent',

  load() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) return Object.assign({}, this.categories, JSON.parse(raw));
    } catch {}
    return null;
  },

  save(prefs) {
    localStorage.setItem(this.storageKey, JSON.stringify(prefs));
    this.apply(prefs);
  },

  apply(prefs) {
    document.documentElement.dataset.consentAnalytics = String(prefs.analytics);
    document.documentElement.dataset.consentAdvertising = String(prefs.advertising);
  },

  hasAnswered() {
    return localStorage.getItem(this.storageKey) !== null;
  },

  reset() {
    localStorage.removeItem(this.storageKey);
    document.documentElement.removeAttribute('data-consent-analytics');
    document.documentElement.removeAttribute('data-consent-advertising');
  }
};
window.TechLearnersConsent = TechLearnersConsent;

const existing = TechLearnersConsent.load();
if (existing) TechLearnersConsent.apply(existing);

function setupCookieNotice() {
  const root = getSiteRoot();
  const existingConsent = TechLearnersConsent.load();
  if (existingConsent || document.querySelector('.consent-banner')) return;

  const banner = document.createElement('aside');
  banner.className = 'consent-banner';
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.innerHTML = `<div class="consent-banner-content">
    <div class="consent-banner-text">
      <b>Cookie Consent</b>
      <p>TechLearners uses essential cookies for basic site features. You can choose whether to allow analytics and advertising cookies. <a href="${root}privacy.html">Learn more</a></p>
    </div>
    <div class="consent-banner-actions">
      <button class="btn small" type="button" data-consent-accept-all>Accept All</button>
      <button class="btn small secondary" type="button" data-consent-customize>Customize</button>
    </div>
  </div>
  <div class="consent-panel" hidden>
    <div class="consent-panel-inner">
      <b>Cookie Preferences</b>
      <label class="consent-option consent-option-disabled"><span><b>Essential</b><p>Required for site features and security. Always active.</p></span><input type="checkbox" checked disabled></label>
      <label class="consent-option"><span><b>Analytics</b><p>Help us understand how visitors use the site (optional).</p></span><input type="checkbox" data-consent-category="analytics"></label>
      <label class="consent-option"><span><b>Advertising</b><p>Enable personalized ads from partners like Google AdSense (optional).</p></span><input type="checkbox" data-consent-category="advertising"></label>
      <div class="consent-panel-actions">
        <button class="btn small" type="button" data-consent-save>Save Preferences</button>
        <button class="btn small secondary" type="button" data-consent-accept-all>Accept All</button>
      </div>
    </div>
  </div>`;

  banner.addEventListener('click', event => {
    const target = event.target;
    if (target.closest('[data-consent-accept-all]')) {
      TechLearnersConsent.save({ essential: true, analytics: true, advertising: true });
      banner.remove();
      return;
    }
    if (target.closest('[data-consent-customize]')) {
      const panel = banner.querySelector('.consent-panel');
      panel.hidden = !panel.hidden;
      const customizeBtn = banner.querySelector('[data-consent-customize]');
      if (customizeBtn) customizeBtn.hidden = true;
      return;
    }
    if (target.closest('[data-consent-save]')) {
      const analytics = banner.querySelector('[data-consent-category="analytics"]')?.checked || false;
      const advertising = banner.querySelector('[data-consent-category="advertising"]')?.checked || false;
      TechLearnersConsent.save({ essential: true, analytics, advertising });
      banner.remove();
      return;
    }
  });

  document.body.appendChild(banner);
}

function runWhenIdle(callback) {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback, { timeout: 2500 });
    return;
  }
  setTimeout(callback, 700);
}

document.addEventListener('click', event => {
  const resetBtn = event.target.closest('[data-consent-reset]');
  if (resetBtn) {
    event.preventDefault();
    TechLearnersConsent.reset();
    document.querySelector('.consent-banner')?.remove();
    setupCookieNotice();
  }
});

function setupCardTouchTilt() {
  if (!('ontouchstart' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const tiltCards = '.card, .hero-card, .resource-card, .subject-link, .stat, .progress-card, .note-card, .practice-question, .admin-list-item, .announcement-item, .detail-card';
  const restoreTransitions = new WeakMap();
  let activeCard = null;
  let touchActive = false;

  const findCard = touch => {
    if (!touch) return null;
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!el) return null;
    const card = el.closest(tiltCards);
    return card && document.contains(card) ? card : null;
  };

  const activateCard = card => {
    if (!card || card === activeCard) return;
    deactivateCard();
    activeCard = card;
    restoreTransitions.set(card, card.style.transition);
    card.style.transition = 'none';
    card.style.willChange = 'transform';
  };

  const deactivateCard = () => {
    if (!activeCard) return;
    activeCard.style.transition = restoreTransitions.get(activeCard) || '';
    activeCard.style.transform = '';
    activeCard.style.willChange = '';
    activeCard = null;
  };

  document.addEventListener('touchstart', () => { touchActive = true; }, { passive: true });

  document.addEventListener('touchmove', event => {
    if (!touchActive) return;
    const touch = event.touches[0];
    const card = findCard(touch);
    if (!card) { deactivateCard(); return; }
    activateCard(card);
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const relX = (touch.clientX - centerX) / (rect.width / 2);
    const relY = (touch.clientY - centerY) / (rect.height / 2);
    const maxAngle = 20;
    const rotateY = relX * maxAngle;
    const rotateX = -relY * maxAngle;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1)`;
  }, { passive: true });

  document.addEventListener('touchend', () => {
    touchActive = false;
    deactivateCard();
  }, { passive: true });
}

function setupThemeToggle(nav) {
  if (!nav || document.getElementById('themeToggle')) return;
  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'themeToggle';
  toggleBtn.className = 'theme-toggle-btn';
  toggleBtn.type = 'button';
  toggleBtn.setAttribute('aria-label', 'Toggle theme');
  toggleBtn.innerHTML = `
    <svg class="theme-toggle-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path class="sun-path" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.32 11.32l.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      <path class="moon-path" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  `;
  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('tl_theme', nextTheme);
  });
  const loginLink = nav.querySelector('a[href*="login.html"], .nav-user-widget, .btn');
  if (loginLink) {
    nav.insertBefore(toggleBtn, loginLink);
  } else {
    nav.appendChild(toggleBtn);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  normaliseHomepageUrl();
  document.querySelectorAll('a.brand[href="/"]').forEach(link => {
    link.href = getSiteRoot() + 'index.html';
  });
  setupButtonClickFeedback();
  setupMobileCardScrollEffects();
  setupCookieNotice();
  setupNavAuth();
  setupGoToTop();
  const btn = document.getElementById('menuBtn');
  const nav = document.getElementById('navMenu') || document.querySelector('.nav');
  if (nav) {
    setupThemeToggle(nav);
  }
  if(btn && nav && !btn.dataset.navToggleReady) {
    btn.dataset.navToggleReady = 'true';
    btn.addEventListener('click', () => nav.classList.toggle('show'));
  }
  if (location.pathname.includes('/pages/admin/')) window.TechLearnersAdminNav?.setup(nav || document.querySelector('.nav'));

  const root = getSiteRoot();
  const learningSearch = document.querySelector('.learning-search');
  if (learningSearch) {
    learningSearch.addEventListener('submit', event => {
      event.preventDefault();
      searchHomepageResources(learningSearch);
    });
  }

  const announcementList = document.getElementById('announcementList');
  if(announcementList){
    const defaultAnnouncements = [
      {
        title: 'CBSE AI and IT Study Material Available',
        message: 'Students can access Class 9 and Class 10 AI/IT notes, MCQs, sample papers, chapter modules, and revision resources.'
      }
    ];

    const renderAnnouncements = items => {
      let html = '<div class="announcement-slides">';
      html += items.map((a, index) => `<article class="announcement-item${a.image ? ' has-image' : ''}${index === 0 ? ' active' : ''}" data-index="${index}">
        ${a.image ? `<img src="${escapeHtml(a.image)}" alt="${escapeHtml(a.title || 'TechLearners announcement image')}">` : '<span class="announcement-item-icon" aria-hidden="true">!</span>'}
        <div><b>${escapeHtml(a.title)}</b><div class="announcement-message rich-text-content">${renderRichText(a.message, { linkify: true })}</div></div>
      </article>`).join('');
      html += '</div>';

      if (items.length > 1) {
        html += '<div class="announcement-indicators">';
        html += items.map((_, index) => `<button class="indicator${index === 0 ? ' active' : ''}" data-index="${index}" aria-label="Go to announcement ${index + 1}" type="button"></button>`).join('');
        html += '</div>';
      }
      return html;
    };

    const setupSlider = (container) => {
      const slides = container.querySelectorAll('.announcement-item');
      const indicators = container.querySelectorAll('.announcement-indicators .indicator');
      if (slides.length <= 1) return;

      let currentIndex = 0;
      let slideInterval;

      const showSlide = (index) => {
        slides.forEach((slide, i) => {
          if (i === index) {
            slide.classList.add('active');
          } else {
            slide.classList.remove('active');
          }
        });
        indicators.forEach((indicator, i) => {
          if (i === index) {
            indicator.classList.add('active');
          } else {
            indicator.classList.remove('active');
          }
        });
        currentIndex = index;
      };

      const nextSlide = () => {
        const nextIndex = (currentIndex + 1) % slides.length;
        showSlide(nextIndex);
      };

      const startAutoPlay = () => {
        stopAutoPlay();
        slideInterval = setInterval(nextSlide, 5000);
      };

      const stopAutoPlay = () => {
        if (slideInterval) clearInterval(slideInterval);
      };

      indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
          showSlide(i);
          startAutoPlay(); // Reset timer on user interaction
        });
      });

      // Pause auto-play when user hovers or focuses on the panel (for accessibility and readability)
      container.addEventListener('mouseenter', stopAutoPlay);
      container.addEventListener('mouseleave', startAutoPlay);
      container.addEventListener('focusin', stopAutoPlay);
      container.addEventListener('focusout', startAutoPlay);

      startAutoPlay();
    };

    TechLearnersContent.get('announcements', 'data').then(data=>{
      const items = data.length ? data : defaultAnnouncements;
      announcementList.innerHTML = renderAnnouncements(items);
      setupSlider(announcementList);
    }).catch(()=>{
      announcementList.innerHTML = renderAnnouncements(defaultAnnouncements);
      setupSlider(announcementList);
    });
  }

  const focusList = document.getElementById('focusList');
  if(focusList){
    const defaultFocus = [
      'Read one chapter module and write five key points',
      'Attempt one class-wise MCQ practice set',
      'Solve one sample-paper question'
    ];
    TechLearnersContent.get('focus', 'data').then(data=>{
      focusList.innerHTML = data.length ? data.map(item=>`<li>${escapeHtml(item.title)}</li>`).join('') : defaultFocus.map(item=>`<li>${escapeHtml(item)}</li>`).join('');
    }).catch(()=> focusList.innerHTML=defaultFocus.map(item=>`<li>${escapeHtml(item)}</li>`).join(''));
  }

  const formatLastUpdatedDate = value => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'June 15, 2026';
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  };
  const applyLastUpdatedDate = value => {
    const formatted = formatLastUpdatedDate(value);
    document.querySelectorAll('[data-last-updated]').forEach(element => {
      element.textContent = element.dataset.lastUpdatedPrefix
        ? `${element.dataset.lastUpdatedPrefix}${formatted}`
        : formatted;
    });
  };
  const refreshLastUpdatedDate = () => {
    applyLastUpdatedDate('2026-06-15T00:00:00Z');
    fetch('https://api.github.com/repos/umesh87389/techlearners/commits/main', {
      headers: { Accept: 'application/vnd.github+json' }
    })
      .then(response => response.ok ? response.json() : Promise.reject(new Error('Unable to load latest commit date.')))
      .then(data => applyLastUpdatedDate(data?.commit?.committer?.date || data?.commit?.author?.date))
      .catch(() => {});
  };

  const footer = document.querySelector('.footer');
  if(footer){
    footer.innerHTML = `<div class="footer-grid">
      <div><b>TechLearners</b><p>Simple learning support for CBSE Class 9 and CBSE Class 10 students.</p><p class="footer-author">Founded and managed by <a href="${root}author.html">Umesh Tripathi</a>.</p></div>
      <div><b>Explore</b><div class="footer-links"><a href="${root}about.html">About Us</a><a href="${root}author.html">Author Information</a><a href="${root}pages/notes/index.html">CBSE Notes</a><a href="${root}pages/revision-papers/index.html">Revision Papers</a><a href="${root}pages/question-papers/index.html">Sample Papers</a><a href="${root}contact.html">Contact Us</a></div></div>
      <div><b>Follow Us</b><div class="social-links">
        <a class="social-icon" href="https://www.instagram.com/techlearners.in/" target="_blank" rel="noopener" aria-label="Instagram">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.1 1.5a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6ZM12 6.9a5.1 5.1 0 1 1 0 10.2 5.1 5.1 0 0 1 0-10.2Zm0 2a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2Z"/></svg>
        </a>
        <a class="social-icon" href="https://www.facebook.com/share/1ECnABWT7r/" target="_blank" rel="noopener" aria-label="Facebook">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.7 22v-9h3l.5-3.5h-3.5V7.2c0-1 .3-1.7 1.8-1.7h1.9V2.4c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8v2.4H6.8V13h3.1v9h3.8Z"/></svg>
        </a>
        <a class="social-icon" href="https://wa.me/918738943773" target="_blank" rel="noopener" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 1.9 17.7L.3 23.5l5.9-1.6A11.8 11.8 0 0 0 20.5 3.5ZM12.2 21a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.5.9.9-3.4-.2-.4A9.8 9.8 0 1 1 12.2 21Zm5.4-7.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.7-.9-2.8-1.6-3.9-3.5-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.6-.5-.9-.5h-.7c-.3 0-.7.1-1 .5-.3.3-1.3 1.3-1.3 3.2s1.4 3.7 1.6 4c.2.3 2.7 4.1 6.5 5.7 2.4 1 3.4 1.1 4.6.9.7-.1 1.8-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4Z"/></svg>
        </a>
        <a class="social-icon" href="https://www.youtube.com/@techlearners1" target="_blank" rel="noopener" aria-label="YouTube">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 32 32 0 0 0 0 12a32 32 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.4-1.9.6-3.9.6-5.8s-.2-3.9-.6-5.8ZM9.5 15.5V8.5l6.3 3.5-6.3 3.5Z"/></svg>
        </a>
      </div></div>
      <div><b>Trust &amp; Legal</b><div class="footer-links"><a href="${root}privacy.html">Privacy Policy</a><a href="${root}terms.html">Terms &amp; Conditions</a><a href="${root}disclaimer.html">Disclaimer</a><a href="${root}editorial-policy.html">Editorial Policy</a></div></div>
    </div><p class="footer-bottom">&copy; 2026 TechLearners. All rights reserved. <span data-last-updated data-last-updated-prefix="Website content last updated: ">Website content last updated: June 15, 2026</span>.</p>`;
  }

  if ((location.pathname === '/' || location.pathname.endsWith('/index.html')) && window.TechLearnersContent) {
    runWhenIdle(() => TechLearnersContent.get('advertisements', 'data').then(items => {
      const advertisement = [...items].reverse().find(item => item.active && item.image);
      if (!advertisement) return;
      const modal = document.createElement('div');
      modal.className = 'advertisement-modal';
      modal.innerHTML = `<div class="advertisement-card" role="dialog" aria-modal="true" aria-label="${escapeHtml(advertisement.title || 'Advertisement')}">
        <button class="advertisement-close" type="button" aria-label="Close advertisement">&times;</button>
        ${advertisement.link ? `<a href="${escapeHtml(advertisement.link)}" target="_blank" rel="noopener">` : ''}
          <img src="${escapeHtml(advertisement.image)}" alt="${escapeHtml(advertisement.title || 'Advertisement poster')}">
        ${advertisement.link ? '</a>' : ''}
        ${advertisement.title ? `<h2>${escapeHtml(advertisement.title)}</h2>` : ''}
        ${advertisement.description ? `<div class="advertisement-description rich-text-content">${renderRichText(advertisement.description)}</div>` : ''}
      </div>`;
      modal.querySelector('.advertisement-close').addEventListener('click', () => modal.remove());
      modal.addEventListener('click', event => {
        if (event.target === modal) modal.remove();
      });
      document.body.appendChild(modal);
    }).catch(error => console.warn('Unable to load homepage advertisement.', error)));
  }

  const path = location.pathname;
  const learningPage = path.includes('/pages/class9/') || path.includes('/pages/class10/') || path.includes('/pages/notes/') || path.includes('/pages/quizzes/') || path.includes('/pages/question-papers/') || path.includes('/pages/revision-papers/');
  if (learningPage && !document.querySelector('.content-trust')) {
    const root = getSiteRoot();
    const trust = document.createElement('aside');
    trust.className = 'content-trust';
    trust.innerHTML = `<b>Reviewed learning resource</b><span>Maintained by <a href="${root}author.html">Umesh Tripathi</a> for TechLearners.</span><span data-last-updated data-last-updated-prefix="Last updated: ">Last updated: June 15, 2026</span><a href="${root}editorial-policy.html">Report a correction</a>`;
    const section = document.querySelector('main .section');
    if (section) section.appendChild(trust);
  }
  refreshLastUpdatedDate();
});

function loadNotes(className, subject = 'AI'){
  const box = document.getElementById('notesList');
  if(!box) return;
  document.querySelectorAll('.note-filter').forEach(button => {
    const selected = button.dataset.class === className && button.dataset.subject === subject;
    button.classList.toggle('secondary', !selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  TechLearnersContent.get('notes', '../../data').then(data=>{
    const filtered = data.filter(n => n.class === className && (n.subject || 'AI') === subject);
    const title = document.getElementById('notesTitle');
    if(title) title.textContent = `${displayClassName(className)} ${subject} Notes`;
    box.classList.add('chapter-library', 'notes-library');
    box.innerHTML = filtered.length ? filtered.map((n, index)=>{
      const id = noteKey(n, index);
      const detailUrl = noteDetailUrl(n, index);
      const absoluteDetailUrl = new URL(detailUrl, location.href).href;
      return `
      <article class="card note-card" data-note-key="${escapeHtml(id)}">
        <p class="tag">${escapeHtml(displayClassName(n.class))} ${escapeHtml(n.subject || 'AI')}</p>
        <h2>${escapeHtml(n.title)}</h2>
        <div class="rich-text-content">${renderRichText(n.description)}</div>
        <div class="note-actions">
          <a class="btn small" href="${escapeHtml(detailUrl)}" target="_blank" rel="noopener" data-note-id="${escapeHtml(id)}">Click Here</a>
          ${n.file ? `<a class="btn small secondary" href="${escapeHtml(noteUrl(n.file))}" target="_blank" rel="noopener" data-note-id="${escapeHtml(id)}">Open optional file</a>` : ''}
          <button class="btn small secondary" type="button" data-share-note="${escapeHtml(absoluteDetailUrl)}" data-share-title="${escapeHtml(n.title)}">Share note</button>
        </div>
      </article>`;
    }).join('') : '<div class="notice">No notes have been published for this selection yet.</div>';
    box.querySelectorAll('[data-note-id]').forEach(link => {
      link.addEventListener('click', () => {
        TechLearnersProgress?.mark('notes', link.dataset.noteId);
      });
    });
    box.querySelectorAll('[data-share-note]').forEach(button => {
      button.addEventListener('click', () => shareUrl(button.dataset.shareNote, button.dataset.shareTitle));
    });
    const selectedNote = new URLSearchParams(location.search).get('note');
    if (selectedNote) {
      const selected = [...box.querySelectorAll('[data-note-key]')].find(card => card.dataset.noteKey === selectedNote);
      if (selected) {
        selected.classList.add('shared-note');
        selected.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }).catch(()=> box.innerHTML='<div class="notice">No notes are available right now.</div>');
}

function loadNoteDetail() {
  const box = document.getElementById('noteDetail');
  if (!box) return;
  const params = new URLSearchParams(location.search);
  const className = params.get('class') || 'Class 9';
  const subject = params.get('subject') || 'AI';
  const selectedKey = params.get('note') || '';
  box.innerHTML = '<p class="muted">Loading note...</p>';

  TechLearnersContent.get('notes', '../../data').then(data => {
    const notes = data.filter(note => note.class === className && (note.subject || 'AI') === subject);
    const selectedIndex = notes.findIndex((note, index) => noteKey(note, index) === selectedKey);
    const index = selectedIndex >= 0 ? selectedIndex : 0;
    const note = notes[index];
    if (!note) {
      box.innerHTML = '<div class="notice">This note could not be found. Please open it again from the notes library.</div>';
      return;
    }

    document.title = `${note.title} | TechLearners`;
    const listUrl = `index.html?${new URLSearchParams({ class: note.class, subject: note.subject || 'AI' })}#browseNotes`;
    const previous = notes[index - 1];
    const next = notes[index + 1];
    const currentUrl = location.href;
    box.innerHTML = `
      <nav class="resource-nav" aria-label="Note navigation">
        <a href="../../">Home</a><span>/</span><a href="${escapeHtml(listUrl)}">Notes</a><span>/</span><b>${escapeHtml(note.title)}</b>
      </nav>
      <article class="card detail-card">
        <p class="tag">${escapeHtml(displayClassName(note.class))} ${escapeHtml(note.subject || 'AI')} Note</p>
        <h1>${escapeHtml(note.title)}</h1>
        <div class="rich-text-content">${renderRichText(note.description)}</div>
        <div class="note-content rich-text-content">${renderNoteContent(note.content || note.description)}</div>
        <div class="detail-actions">
          <a class="btn secondary" href="${escapeHtml(listUrl)}">Back to notes</a>
          ${note.file ? `<a class="btn secondary" href="${escapeHtml(noteUrl(note.file))}" target="_blank" rel="noopener">Open optional file</a>` : ''}
          <a class="btn secondary" href="../quizzes/index.html?${new URLSearchParams({ class: note.class, subject: note.subject || 'AI' })}">Related MCQs</a>
          <a class="btn secondary" href="../question-papers/index.html?${new URLSearchParams({ class: note.class, subject: note.subject || 'AI' })}#browsePapers">Related sample papers</a>
        </div>
        ${renderShareActions(currentUrl, note.title, 'Share note')}
      </article>
      <div class="detail-actions detail-pager">
        ${previous ? `<a class="btn small secondary" href="${escapeHtml(noteDetailUrl(previous, index - 1))}">Previous note</a>` : ''}
        ${next ? `<a class="btn small" href="${escapeHtml(noteDetailUrl(next, index + 1))}">Next note</a>` : ''}
      </div>`;
    setupShareActionHandlers(box);
    TechLearnersProgress?.mark('notes', noteKey(note, index));
    requestAnimationFrame(() => {
      box.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }).catch(error => {
    box.innerHTML = `<div class="notice">${escapeHtml(error.message || 'Unable to load this note.')}</div>`;
  });
}

function chapterKey(chapter, index = 0) {
  return chapter.id || `${chapter.class}|${chapter.subject || 'AI'}|${chapter.title || index}`;
}

function chapterDetailUrl(chapter, index = 0) {
  const params = new URLSearchParams({
    class: chapter.class || 'Class 9',
    subject: chapter.subject || 'AI',
    chapter: chapterKey(chapter, index)
  });
  return `${getSiteRoot()}pages/chapters/detail.html?${params}`;
}

function chapterIndexUrl(className, subject = 'AI') {
  const classFolder = className === 'Class 10' ? 'class10' : 'class9';
  const file = subject === 'IT' ? 'it-chapters.html' : 'chapters.html';
  return `${getSiteRoot()}pages/${classFolder}/${file}`;
}

function chapterAnchorId(value, usedIds) {
  const base = String(value || 'chapter-section').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'chapter-section';
  let id = base;
  let count = 2;
  while (usedIds.has(id)) {
    id = `${base}-${count}`;
    count += 1;
  }
  usedIds.add(id);
  return id;
}

function renderChapterModuleContent(value) {
  const template = document.createElement('template');
  template.innerHTML = renderNoteContent(value);
  const usedIds = new Set();
  const sections = [];
  let current = null;

  [...template.content.childNodes].forEach(node => {
    if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'H2') {
      current = {
        id: chapterAnchorId(node.textContent, usedIds),
        title: node.textContent.trim(),
        nodes: [node.outerHTML]
      };
      sections.push(current);
      return;
    }
    if (!current) {
      current = {
        id: 'overview',
        title: 'Overview',
        nodes: ['<h2>Overview</h2>']
      };
      sections.push(current);
    }
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent.trim();
      if (text) current.nodes.push(`<p>${escapeHtml(text)}</p>`);
    } else if (node.outerHTML) {
      current.nodes.push(node.outerHTML);
    }
  });

  if (!sections.length) {
    sections.push({
      id: 'overview',
      title: 'Overview',
      nodes: [`<h2>Overview</h2><p>${escapeHtml(String(value || ''))}</p>`]
    });
  }

  const toc = `<nav class="card chapter-toc" aria-label="Chapter contents">
    <h2>Chapter Contents</h2>
    <ol>${sections.map(section => `<li><a href="#${escapeHtml(section.id)}">${escapeHtml(section.title)}</a></li>`).join('')}</ol>
  </nav>`;
  const content = `<article class="chapter-notes">${sections.map(section =>
    `<section id="${escapeHtml(section.id)}" class="card">${section.nodes.join('')}</section>`
  ).join('')}</article>`;

  return { toc, content };
}

function loadPublishedChapters(className, subject = 'AI') {
  if (!window.TechLearnersContent) return;
  const section = document.querySelector('main .section');
  if (!section) return;
  const anchor = section.querySelector('.hero-actions');

  TechLearnersContent.get('chapters', '../../data').then(data => {
    const chapters = data.filter(chapter => !chapter.hidden && chapter.class === className && (chapter.subject || 'AI') === subject);
    let wrap = document.getElementById('publishedChapterModules');
    if (!chapters.length) {
      if (wrap) wrap.remove();
      return;
    }

    if (!wrap) {
      wrap = document.createElement('section');
      wrap.id = 'publishedChapterModules';
      wrap.className = 'published-chapter-modules';
      if (anchor) section.insertBefore(wrap, anchor);
      else section.appendChild(wrap);
    }

    wrap.innerHTML = `<div class="section-heading"><div><p class="tag">Published from admin</p><h2>More Chapter Modules</h2></div></div>
      <div class="exam-grid">${chapters.map((chapter, index) => {
        const detailUrl = chapterDetailUrl(chapter, index);
        return `<a class="exam-card exam-card-link ${subject === 'IT' ? 'subject-it' : 'subject-ai'}" href="${escapeHtml(detailUrl)}">
          <div class="exam-card-body">
            <h3>${escapeHtml(chapter.title)}</h3>
            <p class="tag">${escapeHtml(chapter.unit || 'Chapter Module')}</p>
            <div class="rich-text-content">${renderRichText(chapter.description)}</div>
            <span class="btn small">Click Here</span>
          </div>
        </a>`;
      }).join('')}</div>`;
  }).catch(error => {
    console.warn('Unable to load published chapters.', error);
  });
}

function loadChapterDetail() {
  const box = document.getElementById('chapterDetail');
  if (!box) return;
  const params = new URLSearchParams(location.search);
  const className = params.get('class') || 'Class 9';
  const subject = params.get('subject') || 'AI';
  const selectedKey = params.get('chapter') || '';
  box.innerHTML = '<p class="muted">Loading chapter...</p>';

  TechLearnersContent.get('chapters', '../../data').then(data => {
    const chapters = data.filter(chapter => !chapter.hidden && chapter.class === className && (chapter.subject || 'AI') === subject);
    const selectedIndex = chapters.findIndex((chapter, index) => chapterKey(chapter, index) === selectedKey);
    const index = selectedIndex >= 0 ? selectedIndex : 0;
    const chapter = chapters[index];
    if (!chapter) {
      box.innerHTML = '<div class="notice">This chapter could not be found. Please open it again from the chapter modules page.</div>';
      return;
    }

    document.title = `${chapter.title} | TechLearners`;
    const listUrl = chapterIndexUrl(chapter.class, chapter.subject || 'AI');
    const previous = chapters[index - 1];
    const next = chapters[index + 1];
    const currentUrl = location.href;
    const chapterModule = renderChapterModuleContent(chapter.content || chapter.description);
    box.innerHTML = `
      <nav class="resource-nav" aria-label="Chapter navigation">
        <a href="../../">Home</a><span>/</span><a href="${escapeHtml(listUrl)}">Chapter Modules</a><span>/</span><b>${escapeHtml(chapter.title)}</b>
      </nav>
      <header class="card detail-card">
        <p class="tag">${escapeHtml(displayClassName(chapter.class))} ${escapeHtml(chapter.subject || 'AI')} ${escapeHtml(chapter.unit || 'Chapter Module')}</p>
        <h1>${escapeHtml(chapter.title)}</h1>
        <div class="rich-text-content">${renderRichText(chapter.description)}</div>
        <div class="detail-actions">
          <a class="btn secondary" href="${escapeHtml(listUrl)}">Back to chapters</a>
          <a class="btn secondary" href="../notes/index.html?${new URLSearchParams({ class: chapter.class, subject: chapter.subject || 'AI' })}#browseNotes">Related notes</a>
          <a class="btn secondary" href="../quizzes/index.html?${new URLSearchParams({ class: chapter.class, subject: chapter.subject || 'AI' })}">Related MCQs</a>
          <a class="btn secondary" href="../question-papers/index.html?${new URLSearchParams({ class: chapter.class, subject: chapter.subject || 'AI' })}#browsePapers">Related sample papers</a>
        </div>
        ${renderShareActions(currentUrl, chapter.title, 'Share chapter')}
      </header>
      ${chapterModule.toc}
      ${chapterModule.content}
      <div class="detail-actions detail-pager">
        ${previous ? `<a class="btn small secondary" href="${escapeHtml(chapterDetailUrl(previous, index - 1))}">Previous chapter</a>` : ''}
        ${next ? `<a class="btn small" href="${escapeHtml(chapterDetailUrl(next, index + 1))}">Next chapter</a>` : ''}
      </div>`;
    setupShareActionHandlers(box);
    requestAnimationFrame(() => {
      box.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }).catch(error => {
    box.innerHTML = `<div class="notice">${escapeHtml(error.message || 'Unable to load this chapter.')}</div>`;
  });
}

function setupGoToTop() {
  const btn = document.createElement('button');
  btn.className = 'go-to-top';
  btn.setAttribute('type', 'button');
  btn.setAttribute('aria-label', 'Go to top');
  btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 19V5m-7 7l7-7 7 7"/></svg>';
  document.body.appendChild(btn);
  const toggle = () => btn.classList.toggle('visible', window.scrollY > 300);
  toggle();
  document.addEventListener('scroll', toggle, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
