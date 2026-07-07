(async function () {
  const store = window.TechLearnersContent;
  const adminPage = location.pathname.endsWith('admin-login.html') === false;
  let items = [];
  let websiteChapterItems = [];
  let editingIndex = -1;
  let floatingRichTextToolbar = null;
  let activeRichTextEditor = null;

  const header = document.querySelector('.site-header');
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
  document.querySelectorAll('.nav').forEach(nav => { if (!nav.id) nav.id = 'navMenu'; });

  if (adminPage && !(await store.requireAdmin())) {
    location.replace('admin-login.html');
    return;
  }

  window.adminLogout = async function () {
    await store.signOut();
    location.href = 'admin-login.html';
  };

  function getSeenMessageIds() {
    try {
      return new Set(JSON.parse(localStorage.getItem('tl_seen_contact_messages') || '[]'));
    } catch {
      return new Set();
    }
  }

  function setupNotifications(nav) {
    const notification = document.createElement('a');
    notification.className = 'admin-notification';
    notification.href = 'contact-messages.html';
    notification.setAttribute('aria-label', 'Contact message notifications');
    notification.innerHTML = '<span class="admin-notification-icon" aria-hidden="true">&#128276;</span><span class="admin-notification-badge" hidden>0</span>';
    nav.appendChild(notification);

    TechLearnersFirebase.subscribeContactMessages(messages => {
      const seenIds = getSeenMessageIds();
      const unreadCount = messages.filter(message => !seenIds.has(message.id)).length;
      const badge = notification.querySelector('.admin-notification-badge');
      badge.textContent = unreadCount > 99 ? '99+' : String(unreadCount);
      badge.hidden = unreadCount === 0;
      notification.setAttribute('aria-label', `${unreadCount} unread contact message${unreadCount === 1 ? '' : 's'}`);
    }).catch(error => console.warn('Unable to subscribe to contact message notifications.', error));
  }

  document.querySelectorAll('.nav').forEach(nav => {
    if (!nav.querySelector('[href="quiz-results.html"]')) {
      const resultsLink = document.createElement('a');
      resultsLink.href = 'quiz-results.html';
      resultsLink.textContent = 'Quiz Results';
      nav.appendChild(resultsLink);
    }
    if (!nav.querySelector('[href="manage-quizzes.html"]')) {
      const quizLink = document.createElement('a');
      quizLink.href = 'manage-quizzes.html';
      quizLink.textContent = 'Manage Quiz';
      nav.appendChild(quizLink);
    }
    if (!nav.querySelector('[href="manage-question-papers.html"]')) {
      const papersLink = document.createElement('a');
      papersLink.href = 'manage-question-papers.html';
      papersLink.textContent = 'Sample Papers';
      nav.appendChild(papersLink);
    }
    if (!nav.querySelector('[href="manage-revision-papers.html"]')) {
      const revisionPapersLink = document.createElement('a');
      revisionPapersLink.href = 'manage-revision-papers.html';
      revisionPapersLink.textContent = 'Revision Papers';
      nav.appendChild(revisionPapersLink);
    }
    if (!nav.querySelector('[href="manage-guess-papers.html"]')) {
      const guessPapersLink = document.createElement('a');
      guessPapersLink.href = 'manage-guess-papers.html';
      guessPapersLink.textContent = 'Guess Papers';
      nav.appendChild(guessPapersLink);
    }
    if (!nav.querySelector('[href="manage-chapters.html"]')) {
      const chaptersLink = document.createElement('a');
      chaptersLink.href = 'manage-chapters.html';
      chaptersLink.textContent = 'Chapters';
      nav.appendChild(chaptersLink);
    }
    if (!nav.querySelector('[href="focus.html"]')) {
      const focusLink = document.createElement('a');
      focusLink.href = 'focus.html';
      focusLink.textContent = "Today's Focus";
      nav.appendChild(focusLink);
    }
    if (!nav.querySelector('[href="contact-messages.html"]')) {
      const contactLink = document.createElement('a');
      contactLink.href = 'contact-messages.html';
      contactLink.textContent = 'Contact Messages';
      nav.appendChild(contactLink);
    }
    if (!nav.querySelector('[href="advertisements.html"]')) {
      const advertisementLink = document.createElement('a');
      advertisementLink.href = 'advertisements.html';
      advertisementLink.textContent = 'Advertisements';
      nav.appendChild(advertisementLink);
    }
    const logout = document.createElement('button');
    logout.className = 'btn small secondary';
    logout.type = 'button';
    logout.textContent = 'Logout';
    logout.addEventListener('click', window.adminLogout);
    const greeting = document.createElement('span');
    greeting.className = 'login-greeting';
    greeting.textContent = 'Hello, Admin';
    setupNotifications(nav);
    nav.appendChild(greeting);
    nav.appendChild(logout);
  });

  setupAdminNavDropdowns();

  function setupAdminNavDropdowns() {
    if (window.TechLearnersAdminNav?.setup) {
      document.querySelectorAll('.nav').forEach(nav => window.TechLearnersAdminNav.setup(nav));
      return;
    }
    document.querySelectorAll('.nav').forEach(nav => {
      nav.classList.add('admin-nav');
      nav.setAttribute('aria-label', 'Admin navigation');
      const groups = [
        { label: 'Resources', items: ['manage-chapters.html', 'upload-notes.html', 'manage-mcqs.html', 'manage-question-papers.html', 'manage-revision-papers.html', 'manage-guess-papers.html'] },
        { label: 'Quizzes', items: ['manage-quizzes.html', 'quiz-results.html'] },
        { label: 'Site Management', items: ['announcements.html', 'focus.html', 'advertisements.html', 'contact-messages.html'] }
      ];
      const currentPage = location.pathname.split('/').pop();
      const ref = [...nav.children].find(child => child.matches('.admin-notification, .login-greeting, button'));
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
        if (ref && ref.parentNode === nav) nav.insertBefore(wrapper, ref);
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
    });
  }

  const classSelect = '<select name="class" required><option value="Class 9">CBSE Class 9</option><option value="Class 10">CBSE Class 10</option></select>';

  const editorConfigs = {
    'upload-notes.html': {
      type: 'notes',
      title: 'Manage Notes',
      intro: 'Write the note content directly for students. Each saved note gets its own student page with navigation and sharing options. Adding a PDF or file link is optional.',
      fields: `${classSelect}<select name="subject" required><option>AI</option><option>IT</option></select><input name="title" placeholder="Title" required><textarea name="description" data-rich-text placeholder="Short summary" required></textarea><textarea name="content" data-rich-text placeholder="Write the complete note content here" required></textarea><input name="file" placeholder="Optional PDF or file URL"><label>Optional PDF or file upload<input name="upload" type="file"></label>`
    },
    'manage-mcqs.html': {
      type: 'quizzes',
      title: 'Manage MCQs',
      intro: 'Publish MCQ reading material class-wise and module-wise. Add an optional Google Drive or public download link so students can open the complete MCQ file.',
      fields: `${classSelect}<select name="subject" required><option>AI</option><option>IT</option></select><input name="chapter" placeholder="Module or chapter name, for example ICT Skills-II" required><textarea name="question" data-rich-text placeholder="Optional question when publishing a downloadable file"></textarea><textarea name="options" placeholder="Optional: enter one option per line"></textarea><input name="downloadLink" type="url" placeholder="Optional Google Drive or public MCQ download link">`
    },
    'manage-quizzes.html': {
      type: 'quizQuestions',
      title: 'Manage Quiz',
      intro: 'Publish interactive quiz questions separately from MCQ reading resources. Students receive instant scores after submitting a quiz.',
      fields: `${classSelect}<select name="subject" required><option>AI</option><option>IT</option></select><textarea name="question" data-rich-text placeholder="Quiz question" required></textarea><textarea name="options" placeholder="Enter one option per line" required></textarea><input name="answer" type="number" min="1" placeholder="Correct option number, for example 1" required>`
    },
    'manage-question-papers.html': {
      type: 'questionPapers',
      title: 'Manage Sample Papers',
      intro: 'Publish sample papers class-wise. Each saved paper gets its own student page with navigation and sharing options. Add a public paper URL when the file is ready; students will see only the papers you publish.',
      fields: `${classSelect}<select name="subject" required><option>AI</option><option>IT</option></select><input name="year" type="number" min="2000" max="2100" placeholder="Exam year, for example 2025" required><input name="title" placeholder="Paper title" required><textarea name="description" data-rich-text placeholder="Short description" required></textarea><input name="file" type="url" placeholder="Optional public sample-paper URL, for example https://..."><label>Optional paper upload<input name="upload" type="file" accept=".pdf,.doc,.docx,.txt"></label>`
    },
    'manage-guess-papers.html': {
      type: 'guessPapers',
      title: 'Manage Guess Papers',
      intro: 'Publish CBSE Class 10 AI and IT guess papers. Enter metadata, list instructions one per line, and paste the sections and questions JSON array.',
      fields: `${classSelect}<select name="subject" required><option>AI</option><option>IT</option></select><input name="title" placeholder="Paper title" required><textarea name="description" placeholder="Short description" required></textarea><input name="time" placeholder="Exam duration (e.g., 2 Hours)" required><input name="maxMarks" type="number" placeholder="Max Marks" required><textarea name="instructions" placeholder="Enter general instructions (one per line)" required></textarea><textarea name="sectionsJson" placeholder="Paste sections & questions JSON array here" required></textarea>`
    },
    'manage-revision-papers.html': {
      type: 'revisionPapers',
      title: 'Manage Revision Papers',
      intro: 'Publish revision tests with rich text for MCQs, question answers, practice instructions, or any other written revision material. Each saved revision paper appears on the student Revision Paper page with explore, collapse, copy-link, and share options.',
      fields: `${classSelect}<select name="subject" required><option>AI</option><option>IT</option></select><input name="title" placeholder="Revision paper title" required><input name="testType" placeholder="Test type, for example MCQs, Q&A, Mixed Practice"><textarea name="description" data-rich-text placeholder="Short description" required></textarea><textarea name="content" data-rich-text placeholder="Write MCQs, question answers, instructions, or any other revision text here" required></textarea><input name="file" type="url" placeholder="Optional public revision-paper URL, for example https://..."><label>Optional revision paper upload<input name="upload" type="file" accept=".pdf,.doc,.docx,.txt"></label>`
    },
    'manage-chapters.html': {
      type: 'chapters',
      title: 'Manage Chapter Modules',
      intro: 'Publish chapter modules directly to the matching public chapter page. Each saved chapter appears under its class and subject index and opens on a full student chapter page.',
      fields: `${classSelect}<select name="subject" required><option>AI</option><option>IT</option></select><input name="unit" placeholder="Chapter or unit label, for example Chapter 5" required><input name="title" placeholder="Chapter title" required><textarea name="description" data-rich-text placeholder="Short summary shown on the chapter card" required></textarea><textarea name="content" data-rich-text placeholder="Write the complete chapter content here" required></textarea>`
    },
    'announcements.html': {
      type: 'announcements',
      title: 'Manage Announcements',
      intro: 'Publish a short homepage update. Add an optional image URL or upload an image to show it beside the description.',
      fields: '<input name="title" placeholder="Announcement title" required><textarea name="message" data-rich-text placeholder="Announcement message" required></textarea><input name="image" placeholder="Optional public image URL or path, for example https://..."><label>Optional announcement image upload<input name="upload" type="file" accept="image/*"></label>'
    },
    'focus.html': {
      type: 'focus',
      title: "Manage Today's Focus",
      intro: 'Add, edit or remove the focus items shown on the homepage.',
      fields: '<input name="title" placeholder="Focus item" required>'
    },
    'advertisements.html': {
      type: 'advertisements',
      title: 'Manage Homepage Advertisements',
      intro: 'Free-plan mode: upload your poster to any public image hosting service, paste the direct image URL below, and save. Active advertisements appear as a dismissible popup when visitors open the homepage.',
      fields: '<input name="title" placeholder="Advertisement title" required><textarea name="description" data-rich-text placeholder="Short description shown below the poster (optional)"></textarea><input name="image" type="url" placeholder="Direct public poster image URL, for example https://.../poster.jpg" required><input name="link" type="url" placeholder="Destination URL when visitors click the poster (optional)"><label class="checkbox-label"><input name="active" type="checkbox" value="true"> Show this advertisement on the homepage</label>'
    }
  };

  function setupAdminScreen() {
    const filename = location.pathname.split('/').pop();
    const config = editorConfigs[filename];
    if (!config) return null;

    const section = document.querySelector('main .section');
    section.dataset.contentType = config.type;
    const filters = createFilters(config.type);
    section.innerHTML = `<h1>${config.title}</h1>
      ${config.intro ? `<p class="notice">${config.intro}</p>` : ''}
      <form class="form-card" id="adminForm">${config.fields}
        <div class="backup-actions"><button class="btn" id="saveButton" type="submit">Add Item</button><button class="btn secondary" id="cancelButton" type="button" hidden>Cancel Edit</button><button class="btn secondary" id="resetButton" type="button">Restore Defaults</button></div>
      </form>
      <p id="adminMessage" class="muted"></p>${filters}<div class="list-box admin-list" id="adminList"></div>
      <div id="quizActions" class="backup-actions" hidden><span id="questionCount" class="muted"></span><button class="btn small secondary" id="shuffleButton" type="button">Shuffle Questions</button><button class="btn small danger" id="deleteAllButton" type="button">Delete All Questions</button></div>`;
    return section;
  }

  function setupDashboard() {
    if (!location.pathname.endsWith('admin-dashboard.html')) return;
    const section = document.querySelector('main .section');
    section.querySelector('h1').textContent = 'Welcome back, Admin';
    section.insertAdjacentHTML('beforeend', `<div class="notice">
      <b>Storage mode:</b> ${window.TechLearnersFirebase.configured ? 'Firebase is connected. Changes are published for all visitors.' : 'Firebase config is missing. Changes are saved only in this browser until you add your project config.'}
      <div class="backup-actions"><button class="btn small" type="button" onclick="exportAdminBackup()">Export Backup</button><label class="btn small secondary file-button">Import Backup<input type="file" accept="application/json" onchange="importAdminBackup(this)"></label></div>
      <p id="adminMessage"></p>
    </div><div class="exam-grid" style="margin-top:20px"><a class="exam-card exam-card-link" href="quiz-results.html"><div class="exam-card-body"><svg class="exam-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg><h3>Quiz Results</h3><p>Review student quiz scores, filter by class and subject, and download Excel reports.</p><span class="btn small">Click Here</span></div></a><a class="exam-card exam-card-link" href="advertisements.html"><div class="exam-card-body"><svg class="exam-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a6 6 0 010 12m0-12A6 6 0 006 8m12 0v2a4 4 0 01-4 4m0 0a4 4 0 01-4-4m4 4v4"/></svg><h3>Homepage Advertisements</h3><p>Add and activate externally hosted poster images shown to homepage visitors.</p><span class="btn small">Click Here</span></div></a><a class="exam-card exam-card-link" href="contact-messages.html"><div class="exam-card-body"><svg class="exam-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg><h3>Contact Messages</h3><p>Read questions and feedback sent through the website.</p><span class="btn small">Click Here</span></div></a></div>`);
  }

  setupDashboard();
  const editor = setupAdminScreen();

  function setMessage(message) {
    const box = document.getElementById('adminMessage');
    if (box) box.textContent = message;
  }

  function describeError(error) {
    const messages = {
      'permission-denied': 'Firestore rejected this update. In Firebase Console, open Firestore Database > Rules, paste the project firestore.rules file, publish it, then sign in again.',
      'firestore/permission-denied': 'Firestore rejected this update. In Firebase Console, open Firestore Database > Rules, paste the project firestore.rules file, publish it, then sign in again.',
      'storage/unauthorized': 'Firebase Storage rejected the image upload. Publish the updated storage rules and sign in again with the admin account.',
      'storage/canceled': 'Image upload was cancelled. Please try again.',
      'storage/retry-limit-exceeded': 'Image upload could not complete. Check your connection and try again.'
    };
    if (messages[error.code]) return messages[error.code];
    return error.message || 'Something went wrong. Check your Firebase config and security rules.';
  }

  function render() {
    const list = document.getElementById('adminList');
    if (!list) return;
    const type = editor?.dataset.contentType;
    const quizActions = document.getElementById('quizActions');
    const countLabel = document.getElementById('questionCount');
    if (quizActions) quizActions.hidden = type !== 'quizQuestions';
    if (countLabel && type === 'quizQuestions') {
      const visibleItems = getVisibleItems();
      countLabel.textContent = `Showing ${visibleItems.length} of ${items.length} question${items.length === 1 ? '' : 's'}`;
    }

    const renderableItems = getRenderableItems();
    if (!renderableItems.length) {
      list.innerHTML = '<div class="list-item muted">No items yet.</div>';
      return;
    }

    const visibleItems = getVisibleItems();
    if (!visibleItems.length) {
      list.innerHTML = '<div class="list-item muted">No items match the selected filters.</div>';
      return;
    }

    list.innerHTML = visibleItems.map(({ item, index, readonly, sourceIndex }) => {
      const heading = item.title || item.question || (item.downloadLink ? `${item.chapter || 'MCQ'} downloadable file` : `Item ${index + 1}`);
      const detail = item.message || item.description || item.image || (item.options || []).join(' | ');
      const downloadLink = item.downloadLink ? `<p class="admin-link-indicator"><b>Download link attached</b> <a href="${escapeHtml(item.downloadLink)}" target="_blank" rel="noopener noreferrer">Open link</a></p>` : '';
      const publicLinks = renderPublicLinks(type, item, index);
      const sourceLabel = readonly ? '<p class="admin-link-indicator"><b>Website chapter module</b></p>' : '';
      const actions = readonly
        ? `<div class="admin-actions">
          <button class="btn small secondary" type="button" data-adopt-edit="${sourceIndex}">Edit</button>
          <button class="btn small danger" type="button" data-adopt-delete="${sourceIndex}">Delete</button>
        </div>`
        : `<div class="admin-actions">
          <button class="btn small secondary" type="button" data-edit="${index}">Edit</button>
          <button class="btn small danger" type="button" data-delete="${index}">Delete</button>
        </div>`;
      return `<article class="list-item admin-list-item">
        <div><b>${escapeHtml(plainText(heading))}</b>${detail ? `<p>${escapeHtml(plainText(detail))}</p>` : ''}${sourceLabel}${downloadLink}${publicLinks}</div>
        ${actions}
      </article>`;
    }).join('');
  }

  function createFilters(type) {
    const sharedClassSubject = `
      <select data-filter-field="class" aria-label="Filter by class"><option value="">All classes</option><option value="Class 9">CBSE Class 9</option><option value="Class 10">CBSE Class 10</option></select>
      <select data-filter-field="subject" aria-label="Filter by subject"><option value="">All subjects</option><option>AI</option><option>IT</option></select>`;
    const controls = {
      notes: `${sharedClassSubject}<input data-filter-search type="search" placeholder="Search notes" aria-label="Search notes">`,
      quizzes: `${sharedClassSubject}<select data-filter-field="chapter" data-filter-dynamic aria-label="Filter by module"><option value="">All modules</option></select><input data-filter-search type="search" placeholder="Search MCQs" aria-label="Search MCQs">`,
      quizQuestions: `${sharedClassSubject}<input data-filter-search type="search" placeholder="Search quiz questions" aria-label="Search quiz questions">`,
      questionPapers: `${sharedClassSubject}<select data-filter-field="year" data-filter-dynamic aria-label="Filter by year"><option value="">All years</option></select><input data-filter-search type="search" placeholder="Search papers" aria-label="Search sample papers">`,
      revisionPapers: `${sharedClassSubject}<select data-filter-field="testType" data-filter-dynamic aria-label="Filter by test type"><option value="">All test types</option></select><input data-filter-search type="search" placeholder="Search revision papers" aria-label="Search revision papers">`,
      guessPapers: `${sharedClassSubject}<input data-filter-search type="search" placeholder="Search guess papers" aria-label="Search guess papers">`,
      chapters: `${sharedClassSubject}<input data-filter-search type="search" placeholder="Search chapters" aria-label="Search chapters">`,
      announcements: '<input data-filter-search type="search" placeholder="Search announcements" aria-label="Search announcements">',
      focus: '<input data-filter-search type="search" placeholder="Search focus items" aria-label="Search focus items">',
      advertisements: '<select data-filter-field="active" aria-label="Filter by advertisement status"><option value="">All advertisements</option><option value="true">Active advertisements</option><option value="false">Inactive advertisements</option></select><input data-filter-search type="search" placeholder="Search advertisements" aria-label="Search advertisements">'
    };
    if (!controls[type]) return '';
    return `<div id="adminFilters"><article class="exam-card"><div class="exam-card-body"><svg class="exam-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21h16M4 21V4a2 2 0 012-2h12a2 2 0 012 2v17M4 21h16"/><path d="M8 7h8m-8 4h8m-8 4h4"/></svg><h2>Filter published items</h2><div class="admin-filter-grid">${controls[type]}</div></div></article></div>`;
  }

  function getVisibleItems() {
    const filters = document.getElementById('adminFilters');
    const renderableItems = getRenderableItems();
    if (!filters) return renderableItems;

    filters.querySelectorAll('[data-filter-dynamic]').forEach(select => {
      const selectedValue = select.value;
      const field = select.dataset.filterField;
      const values = [...new Set(renderableItems.map(({ item }) => item[field]).filter(Boolean).map(String))].sort().reverse();
      const label = field === 'year' ? 'All years' : field === 'testType' ? 'All test types' : 'All modules';
      select.innerHTML = `<option value="">${label}</option>` + values.map(value =>
        `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`
      ).join('');
      select.value = values.includes(selectedValue) ? selectedValue : '';
    });

    const search = filters.querySelector('[data-filter-search]')?.value.trim().toLowerCase() || '';
    const fieldFilters = [...filters.querySelectorAll('[data-filter-field]')];

    return renderableItems.filter(({ item }) => {
      const searchable = Object.values(item).flat().join(' ').toLowerCase();
      return fieldFilters.every(filter => {
        if (!filter.value) return true;
        const itemValue = filter.dataset.filterField === 'active'
          ? String(Boolean(item.active))
          : String(item[filter.dataset.filterField] || '');
        return itemValue === filter.value;
      }) && (!search || searchable.includes(search));
    });
  }

  function chapterSignature(chapter) {
    return [chapter.class, chapter.subject || 'AI', chapter.title].map(value => String(value || '').trim().toLowerCase()).join('|');
  }

  function getRenderableItems() {
    if (editor?.dataset.contentType !== 'chapters') return items.map((item, index) => ({ item, index, readonly: false }));

    const visibleSavedItems = items
      .map((item, index) => ({ item, index, readonly: false }))
      .filter(({ item }) => !item.hidden);
    const savedSignatures = new Set(items.map(chapterSignature));
    const hiddenSignatures = new Set(items.filter(item => item.hidden).map(chapterSignature));
    const websiteItems = websiteChapterItems
      .map((item, sourceIndex) => ({ item, sourceIndex }))
      .filter(({ item }) => !savedSignatures.has(chapterSignature(item)) && !hiddenSignatures.has(chapterSignature(item)))
      .map(({ item, sourceIndex }) => ({ item, index: -1, sourceIndex, readonly: true }));
    return [
      ...visibleSavedItems,
      ...websiteItems
    ];
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, character => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    })[character]);
  }

  function plainText(value) {
    const container = document.createElement('div');
    container.innerHTML = value || '';
    return container.textContent || '';
  }

  function adminNoteKey(note, index = 0) {
    return note.id || `${note.class}|${note.subject || 'AI'}|${note.title || index}`;
  }

  function adminPaperKey(paper) {
    return paper.id || `${paper.class}|${paper.subject || 'AI'}|${paper.year || ''}|${paper.title || ''}`;
  }

  function adminRevisionPaperKey(paper) {
    return paper.id || `${paper.class}|${paper.subject || 'AI'}|${paper.testType || ''}|${paper.title || ''}`;
  }

  function adminChapterKey(chapter, index = 0) {
    return chapter.id || `${chapter.class}|${chapter.subject || 'AI'}|${chapter.title || index}`;
  }

  function publicResourceUrl(type, item, index) {
    if (type === 'notes') {
      return `../notes/detail.html?${new URLSearchParams({
        class: item.class || 'Class 9',
        subject: item.subject || 'AI',
        note: adminNoteKey(item, index)
      })}`;
    }
    if (type === 'questionPapers') {
      return `../question-papers/detail.html?${new URLSearchParams({
        class: item.class || 'Class 9',
        subject: item.subject || 'AI',
        paper: adminPaperKey(item)
      })}`;
    }
    if (type === 'revisionPapers') {
      return `../revision-papers/detail.html?${new URLSearchParams({
        class: item.class || 'Class 9',
        subject: item.subject || 'AI',
        paper: adminRevisionPaperKey(item)
      })}`;
    }
    if (type === 'guessPapers') {
      return `../guess-papers/index.html?${new URLSearchParams({
        subject: item.subject || 'AI'
      })}`;
    }
    if (type === 'chapters') {
      if (item.url) return item.url;
      return `../chapters/detail.html?${new URLSearchParams({
        class: item.class || 'Class 9',
        subject: item.subject || 'AI',
        chapter: adminChapterKey(item, index)
      })}`;
    }
    return '';
  }

  function renderPublicLinks(type, item, index) {
    const url = publicResourceUrl(type, item, index);
    if (!url) return '';
    const absoluteUrl = new URL(url, location.href).href;
    return `<div class="admin-public-links">
      <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">Open public page</a>
      <button type="button" data-copy-public="${escapeHtml(absoluteUrl)}">Copy public link</button>
    </div>`;
  }

  async function discoverWebsiteChapters() {
    const pages = [
      { class: 'Class 9', subject: 'AI', url: '../class9/chapters.html' },
      { class: 'Class 9', subject: 'IT', url: '../class9/it-chapters.html' },
      { class: 'Class 10', subject: 'AI', url: '../class10/chapters.html' },
      { class: 'Class 10', subject: 'IT', url: '../class10/it-chapters.html' }
    ];

    const discovered = await Promise.all(pages.map(async page => {
      const response = await fetch(page.url);
      if (!response.ok) return [];
      const html = await response.text();
      const documentFragment = new DOMParser().parseFromString(html, 'text/html');
      const pageUrl = new URL(page.url, location.href);

      return [...documentFragment.querySelectorAll('.exam-card-link')].map(card => {
        const title = card.querySelector('h3')?.textContent.trim() || 'Chapter Module';
        const unit = card.querySelector('.tag')?.textContent.trim() || 'Chapter Module';
        const description = [...card.querySelectorAll('p')]
          .find(paragraph => !paragraph.classList.contains('tag'))?.textContent.trim() || '';
        return {
          class: page.class,
          subject: page.subject,
          unit,
          title,
          description,
          url: new URL(card.getAttribute('href') || page.url, pageUrl).pathname.replace(/^\//, '../../')
        };
      });
    }));

    return discovered.flat();
  }

  function sanitizeRichText(value) {
    const template = document.createElement('template');
    template.innerHTML = String(value || '');
    const allowedTags = new Set(['A', 'B', 'BLOCKQUOTE', 'BR', 'DIV', 'EM', 'H2', 'H3', 'I', 'LI', 'OL', 'P', 'STRONG', 'U', 'UL', 'FONT', 'SPAN', 'STRIKE', 'S', 'SUB', 'SUP', 'PRE', 'CODE', 'HR']);

    [...template.content.querySelectorAll('*')].forEach(element => {
      if (!allowedTags.has(element.tagName)) {
        element.replaceWith(...element.childNodes);
        return;
      }
      const href = element.tagName === 'A' ? element.getAttribute('href') : '';
      const size = element.tagName === 'FONT' ? element.getAttribute('size') : '';
      const color = element.tagName === 'FONT' ? element.getAttribute('color') : '';
      const style = element.tagName === 'SPAN' ? element.getAttribute('style') : '';
      
      [...element.attributes].forEach(attribute => element.removeAttribute(attribute.name));
      
      if (element.tagName === 'A') {
        if (/^https?:\/\//i.test(href || '')) {
          element.setAttribute('href', href);
          element.setAttribute('target', '_blank');
          element.setAttribute('rel', 'noopener noreferrer');
        } else {
          element.replaceWith(...element.childNodes);
        }
      } else if (element.tagName === 'FONT') {
        if (size) element.setAttribute('size', size);
        if (color) element.setAttribute('color', color);
      } else if (element.tagName === 'SPAN') {
        if (style) element.setAttribute('style', style);
      }
    });
    return template.innerHTML.trim();
  }

  function extractYouTubeVideoId(value) {
    const input = String(value || '').trim();
    if (!input) return '';
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;

    try {
      const url = new URL(input);
      const hostname = url.hostname.replace(/^www\./, '').toLowerCase();
      if (hostname === 'youtu.be') {
        const id = url.pathname.split('/').filter(Boolean)[0];
        return /^[a-zA-Z0-9_-]{11}$/.test(id || '') ? id : '';
      }
      if (hostname.endsWith('youtube.com') || hostname.endsWith('youtube-nocookie.com')) {
        const directId = url.searchParams.get('v');
        if (/^[a-zA-Z0-9_-]{11}$/.test(directId || '')) return directId;
        const parts = url.pathname.split('/').filter(Boolean);
        const markerIndex = parts.findIndex(part => ['embed', 'shorts', 'live'].includes(part));
        const id = markerIndex >= 0 ? parts[markerIndex + 1] : '';
        return /^[a-zA-Z0-9_-]{11}$/.test(id || '') ? id : '';
      }
    } catch {
      return '';
    }

    return '';
  }

  function slugify(value) {
    return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) || `chapter-${Date.now()}`;
  }

  function createRichTextEditors(form) {
    const toolbar = getFloatingRichTextToolbar();

    form.querySelectorAll('textarea[data-rich-text]').forEach(textarea => {
      const wrapper = document.createElement('div');
      wrapper.className = 'rich-text-field';
      const surface = document.createElement('div');
      surface.className = 'rich-text-editor';
      surface.contentEditable = 'true';
      surface.dataset.placeholder = textarea.placeholder || 'Write content here';
      surface.setAttribute('role', 'textbox');
      surface.setAttribute('aria-multiline', 'true');
      surface.setAttribute('aria-label', textarea.placeholder || textarea.name);
      surface.innerHTML = textarea.value;
      textarea.dataset.richTextRequired = String(textarea.required);
      textarea.required = false;
      textarea.hidden = true;
      textarea.before(wrapper);
      wrapper.append(surface, textarea);

      const sync = () => {
        textarea.value = sanitizeRichText(surface.innerHTML);
        surface.classList.toggle('is-empty', !plainText(textarea.value).trim());
      };
      surface.addEventListener('input', sync);
      surface.addEventListener('blur', sync);
      surface.addEventListener('focus', () => {
        activeRichTextEditor = { surface, textarea, sync };
        toolbar.setAttribute('aria-label', `${textarea.placeholder || textarea.name} formatting controls`);
        showFloatingRichTextToolbar(surface);
      });
      surface.addEventListener('click', () => showFloatingRichTextToolbar(surface));
      surface.addEventListener('keyup', () => showFloatingRichTextToolbar(surface));
      surface.addEventListener('mouseup', () => showFloatingRichTextToolbar(surface));
      textarea.richTextEditor = { surface, sync };
      sync();
    });
  }

  function getFloatingRichTextToolbar() {
    if (floatingRichTextToolbar) return floatingRichTextToolbar;
    const toolbar = document.createElement('div');
    toolbar.className = 'rich-text-toolbar rich-text-toolbar-floating';
    toolbar.hidden = true;
    toolbar.innerHTML = `
      <select class="rich-text-select" title="Font Size">
        <option value="">Size</option>
        <option value="1">Smallest</option>
        <option value="2">Small</option>
        <option value="3">Normal</option>
        <option value="4">Large</option>
        <option value="5">X-Large</option>
        <option value="6">XX-Large</option>
        <option value="7">Largest</option>
      </select>
      <button type="button" data-command="bold" title="Bold"><b>B</b></button>
      <button type="button" data-command="italic" title="Italic"><i>I</i></button>
      <button type="button" data-command="underline" title="Underline"><u>U</u></button>
      <button type="button" data-command="strikeThrough" title="Strikethrough"><del>S</del></button>
      <button type="button" data-command="subscript" title="Subscript">X<sub>2</sub></button>
      <button type="button" data-command="superscript" title="Superscript">X<sup>2</sup></button>
      <button type="button" data-command="formatBlock" data-value="h2" title="Heading">H2</button>
      <button type="button" data-command="formatBlock" data-value="h3" title="Subheading">H3</button>
      <button type="button" data-command="formatBlock" data-value="pre" title="Code Block">Code</button>
      <button type="button" data-command="justifyLeft" title="Align Left">Left</button>
      <button type="button" data-command="justifyCenter" title="Align Center">Center</button>
      <button type="button" data-command="justifyRight" title="Align Right">Right</button>
      <button type="button" data-command="insertUnorderedList" title="Bulleted list">&bull; List</button>
      <button type="button" data-command="insertOrderedList" title="Numbered list">1. List</button>
      <button type="button" data-command="insertHorizontalRule" title="Horizontal Rule">HR</button>
      <button type="button" data-command="formatBlock" data-value="blockquote" title="Quote">Quote</button>
      <button type="button" data-command="createLink" title="Add link">Link</button>
      <button type="button" data-command="undo" title="Undo">Undo</button>
      <button type="button" data-command="removeFormat" title="Clear formatting">Clear</button>`;
    toolbar.addEventListener('mousedown', event => {
      // Don't lose focus on select element changes
      if (event.target.tagName !== 'SELECT') {
        event.preventDefault();
      }
    });
    toolbar.addEventListener('change', event => {
      const select = event.target.closest('.rich-text-select');
      if (!select || !activeRichTextEditor) return;
      const command = 'fontSize';
      const value = select.value;
      if (!value) return;
      activeRichTextEditor.surface.focus();
      document.execCommand(command, false, value);
      select.value = ""; // reset option
      activeRichTextEditor.sync();
    });
    toolbar.addEventListener('click', event => {
      const button = event.target.closest('[data-command]');
      if (!button || !activeRichTextEditor) return;
      const command = button.dataset.command;
      let value = button.dataset.value || null;
      activeRichTextEditor.surface.focus();
      if (command === 'createLink') {
        value = prompt('Enter a full link beginning with https://');
        if (!/^https?:\/\//i.test(value || '')) return;
      }
      document.execCommand(command, false, value);
      activeRichTextEditor.sync();
      showFloatingRichTextToolbar(activeRichTextEditor.surface);
    });
    document.addEventListener('mousedown', event => {
      if (toolbar.hidden) return;
      if (toolbar.contains(event.target) || activeRichTextEditor?.surface.contains(event.target)) return;
      toolbar.hidden = true;
      activeRichTextEditor = null;
    });
    let ticking = false;
    const handleUpdate = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (activeRichTextEditor) showFloatingRichTextToolbar(activeRichTextEditor.surface);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('resize', handleUpdate, { passive: true });
    window.addEventListener('scroll', handleUpdate, { capture: true, passive: true });
    document.body.append(toolbar);
    floatingRichTextToolbar = toolbar;
    return toolbar;
  }

  function showFloatingRichTextToolbar(surface) {
    const toolbar = getFloatingRichTextToolbar();
    toolbar.hidden = false;
    const rect = surface.getBoundingClientRect();
    const toolbarWidth = Math.min(toolbar.offsetWidth || 420, window.innerWidth - 24);
    const left = Math.max(12, Math.min(rect.left, window.innerWidth - toolbarWidth - 12));
    const top = rect.top > 78 ? rect.top - toolbar.offsetHeight - 12 : rect.bottom + 12;
    toolbar.style.left = `${left}px`;
    toolbar.style.top = `${Math.max(12, top)}px`;
  }

  function formToItem(form) {
    form.querySelectorAll('textarea[data-rich-text]').forEach(field => field.richTextEditor?.sync());
    const missingRichText = [...form.querySelectorAll('textarea[data-rich-text-required="true"]')]
      .find(field => !plainText(field.value).trim());
    if (missingRichText) {
      missingRichText.richTextEditor.surface.focus();
      throw new Error(`Write the ${missingRichText.placeholder.toLowerCase()} before saving.`);
    }
    const values = Object.fromEntries(new FormData(form).entries());
    delete values.upload;
    if ('active' in values || form.elements.namedItem('active')) values.active = values.active === 'true';
    if ('options' in values) {
      values.options = values.options.split('\n').map(option => option.trim()).filter(Boolean);
    }
    if (editor?.dataset.contentType === 'quizQuestions') values.answer = Number(values.answer) - 1;
    if (editor?.dataset.contentType === 'chapters') {
      values.id = editingIndex >= 0 && items[editingIndex]?.id
        ? items[editingIndex].id
        : `${slugify(values.class)}-${slugify(values.subject)}-${slugify(values.title)}`;
      values.hidden = false;
    }
    if (editor?.dataset.contentType === 'lectures') {
      const videoId = extractYouTubeVideoId(values.videoId);
      if (!videoId) throw new Error('Enter a valid YouTube video ID or full YouTube video link.');
      values.videoId = videoId;
    }
    if (editor?.dataset.contentType === 'guessPapers') {
      values.maxMarks = Number(values.maxMarks);
      if (isNaN(values.maxMarks) || values.maxMarks <= 0) {
        throw new Error('Enter a valid positive number for Max Marks.');
      }
      values.instructions = (values.instructions || '').split('\n').map(line => line.trim()).filter(Boolean);
      try {
        values.sections = JSON.parse(values.sectionsJson || '[]');
      } catch (e) {
        throw new Error('Invalid JSON format in sections field: ' + e.message);
      }
      if (!Array.isArray(values.sections)) {
        throw new Error('Sections must be a JSON array at the top level.');
      }
      for (const section of values.sections) {
        if (!section.name) {
          throw new Error('Each section in the JSON must have a "name" property.');
        }
        if (!Array.isArray(section.questions)) {
          throw new Error('Each section must have a "questions" array.');
        }
        for (const q of section.questions) {
          if (!q.id) throw new Error('Each question must have a unique "id".');
          if (!q.type) throw new Error('Each question must have a "type" ("objective" or "subjective").');
          if (!q.text) throw new Error('Each question must have "text" content.');
          if (q.type === 'objective' && !Array.isArray(q.options)) {
            throw new Error('Objective questions must have an "options" array.');
          }
          if (q.marks === undefined || isNaN(Number(q.marks))) {
            throw new Error('Each question must specify numeric "marks".');
          }
          q.marks = Number(q.marks);
          if (q.answer === undefined) {
            throw new Error('Each question must specify an "answer".');
          }
        }
      }
      delete values.sectionsJson;
      values.id = editingIndex >= 0 && items[editingIndex]?.id
        ? items[editingIndex].id
        : `class10-${values.subject.toLowerCase()}-guess-2026`;
    }
    return values;
  }

  function fillForm(index) {
    editingIndex = index;
    const item = items[index];
    const form = document.getElementById('adminForm');
    if (editor?.dataset.contentType === 'guessPapers') {
      const displayItem = { ...item };
      displayItem.instructions = Array.isArray(item.instructions) ? item.instructions.join('\n') : '';
      displayItem.sectionsJson = Array.isArray(item.sections) ? JSON.stringify(item.sections, null, 2) : '';
      
      Object.entries(displayItem).forEach(([key, value]) => {
        const field = form.elements.namedItem(key);
        if (field) {
          field.value = value;
        }
      });
    } else {
      Object.entries(item).forEach(([key, value]) => {
        const field = form.elements.namedItem(key);
        if (field?.type === 'checkbox') field.checked = Boolean(value);
        else if (field) {
          field.value = key === 'answer' && editor?.dataset.contentType === 'quizQuestions'
            ? Number(value) + 1
            : Array.isArray(value) ? value.join('\n') : value;
          if (field.richTextEditor) field.richTextEditor.surface.innerHTML = field.value;
        }
      });
    }
    document.getElementById('saveButton').textContent = 'Update Item';
    document.getElementById('cancelButton').hidden = false;
    form.scrollIntoView({ behavior: 'smooth' });
  }

  async function loadWebsiteChapterContent(chapter) {
    if (!chapter?.url) return '';
    try {
      const response = await fetch(chapter.url);
      if (!response.ok) return '';
      const html = await response.text();
      const parsed = new DOMParser().parseFromString(html, 'text/html');
      const content = parsed.querySelector('.chapter-notes') || parsed.querySelector('main .section');
      return content?.innerHTML?.trim() || '';
    } catch (error) {
      console.warn('Unable to load website chapter content.', error);
      return '';
    }
  }

  async function adoptWebsiteChapter(sourceIndex, { edit = false, hidden = false } = {}) {
    const source = websiteChapterItems[sourceIndex];
    if (!source) throw new Error('This website chapter could not be found.');
    const existingIndex = items.findIndex(item => chapterSignature(item) === chapterSignature(source));
    const adopted = {
      ...source,
      id: source.id || `${slugify(source.class)}-${slugify(source.subject)}-${slugify(source.title)}`,
      sourceUrl: source.url,
      hidden
    };
    if (!hidden) adopted.content = source.content || await loadWebsiteChapterContent(source) || `<p>${escapeHtml(source.description || source.title)}</p>`;
    if (existingIndex >= 0) items[existingIndex] = { ...items[existingIndex], ...adopted };
    else items.push(adopted);
    await store.save('chapters', items);
    render();
    if (edit && !hidden) {
      const editIndex = items.findIndex(item => chapterSignature(item) === chapterSignature(source));
      fillForm(editIndex);
      setMessage('Website chapter added to the editor. Review the content, then save your changes.');
    }
    if (hidden) setMessage('Chapter module deleted from the admin-managed chapter list.');
  }

  function clearForm() {
    editingIndex = -1;
    const form = document.getElementById('adminForm');
    if (form) {
      form.reset();
      form.querySelectorAll('textarea[data-rich-text]').forEach(field => {
        field.richTextEditor.surface.innerHTML = '';
        field.richTextEditor.sync();
      });
    }
    const saveButton = document.getElementById('saveButton');
    const cancelButton = document.getElementById('cancelButton');
    if (saveButton) saveButton.textContent = 'Add Item';
    if (cancelButton) cancelButton.hidden = true;
  }

  async function setupEditor() {
    const type = editor.dataset.contentType;
    createRichTextEditors(document.getElementById('adminForm'));
    const loadedItems = await store.get(type, '../../data');
    items = Array.isArray(loadedItems) ? loadedItems : [];
    if (type === 'chapters') {
      try {
        websiteChapterItems = await discoverWebsiteChapters();
      } catch (error) {
        console.warn('Unable to discover existing website chapters.', error);
        websiteChapterItems = [];
      }
    }
    render();

    document.getElementById('adminFilters')?.addEventListener('input', render);
    document.getElementById('adminFilters')?.addEventListener('change', render);

    document.getElementById('adminForm').addEventListener('submit', async event => {
      event.preventDefault();
      const saveButton = document.getElementById('saveButton');
      saveButton.disabled = true;
      saveButton.textContent = editingIndex >= 0 ? 'Updating...' : 'Saving...';
      setMessage('Saving item...');
      try {
        const item = formToItem(event.currentTarget);
        const upload = event.currentTarget.elements.namedItem('upload');

        if (type === 'quizzes') {
          const hasReadableQuestion = Boolean(plainText(item.question).trim()) || item.options.length > 0;
          if (!item.downloadLink && !hasReadableQuestion) {
            setMessage('Add a downloadable link or provide a question with at least two options.');
            return;
          }
          if (hasReadableQuestion && (!plainText(item.question).trim() || item.options.length < 2)) {
            setMessage('When adding a readable MCQ, provide the question and at least two options.');
            return;
          }
        }
        if (type === 'quizQuestions') {
          if (!plainText(item.question).trim() || item.options.length < 2) {
            setMessage('Add a quiz question and at least two options.');
            return;
          }
          if (!Number.isInteger(item.answer) || item.answer < 0 || item.answer >= item.options.length) {
            setMessage('Choose a correct option number that matches one of the listed options.');
            return;
          }
        }

        if (type === 'notes' && upload?.files?.[0]) {
          setMessage('Uploading note file...');
          item.file = await store.uploadNote(upload.files[0]);
        }
        if (type === 'questionPapers' && upload?.files?.[0]) {
          setMessage('Uploading sample paper...');
          item.file = await store.uploadQuestionPaper(upload.files[0]);
        }
        if (type === 'revisionPapers' && upload?.files?.[0]) {
          setMessage('Uploading revision paper...');
          item.file = await store.uploadQuestionPaper(upload.files[0]);
        }
        if (type === 'announcements' && upload?.files?.[0]) {
          setMessage('Uploading announcement image...');
          item.image = await store.uploadAnnouncement(upload.files[0]);
        }
        if (type === 'advertisements' && !item.image) {
          setMessage('Provide a public poster image URL.');
          return;
        }
        if (type === 'notes' && !item.content) {
          setMessage('Write the note content before saving.');
          return;
        }
        if (type === 'chapters' && !item.content) {
          setMessage('Write the chapter content before publishing.');
          return;
        }
        if (type === 'questionPapers' && !item.file) {
          setMessage('Add a public sample-paper URL or upload a paper file before saving.');
          return;
        }
        if (type === 'revisionPapers' && !item.content) {
          setMessage('Write the revision paper content before publishing.');
          return;
        }

        if (editingIndex >= 0) items[editingIndex] = item;
        else items.push(item);
        await store.save(type, items);
        clearForm();
        render();
        setMessage('Saved. Visitors can now see the update.');
      } catch (error) {
        setMessage(describeError(error));
      } finally {
        saveButton.disabled = false;
        saveButton.textContent = editingIndex >= 0 ? 'Update Item' : 'Add Item';
      }
    });

    document.getElementById('adminList').addEventListener('click', async event => {
      const editButton = event.target.closest('[data-edit]');
      const deleteButton = event.target.closest('[data-delete]');
      const adoptEditButton = event.target.closest('[data-adopt-edit]');
      const adoptDeleteButton = event.target.closest('[data-adopt-delete]');
      const copyButton = event.target.closest('[data-copy-public]');
      if (copyButton) {
        await navigator.clipboard.writeText(copyButton.dataset.copyPublic);
        setMessage('Public link copied.');
        return;
      }
      if (adoptEditButton) {
        try {
          await adoptWebsiteChapter(Number(adoptEditButton.dataset.adoptEdit), { edit: true });
        } catch (error) {
          setMessage(describeError(error));
        }
        return;
      }
      if (adoptDeleteButton && confirm('Delete this chapter module from the admin list?')) {
        try {
          await adoptWebsiteChapter(Number(adoptDeleteButton.dataset.adoptDelete), { hidden: true });
        } catch (error) {
          setMessage(describeError(error));
        }
        return;
      }
      if (editButton) fillForm(Number(editButton.dataset.edit));
      if (deleteButton && confirm('Delete this item?')) {
        try {
          const deleteIndex = Number(deleteButton.dataset.delete);
          if (type === 'chapters') items[deleteIndex] = { ...items[deleteIndex], hidden: true };
          else items.splice(deleteIndex, 1);
          await store.save(type, items);
          clearForm();
          render();
          setMessage('Item deleted.');
        } catch (error) {
          setMessage(describeError(error));
        }
      }
    });

    document.getElementById('cancelButton').addEventListener('click', clearForm);
    document.getElementById('resetButton').addEventListener('click', async () => {
      if (!confirm('Restore the original JSON data for this section?')) return;
      try {
        items = await store.reset(type, '../../data');
        clearForm();
        render();
        setMessage('Original JSON data restored.');
      } catch (error) {
        setMessage(describeError(error));
      }
    });

    document.getElementById('shuffleButton')?.addEventListener('click', async () => {
      if (items.length < 2) { setMessage('Need at least 2 questions to shuffle.'); return; }
      for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
      }
      try {
        await store.save(type, items);
        render();
        setMessage('Questions shuffled and saved.');
      } catch (error) {
        setMessage(describeError(error));
      }
    });

    document.getElementById('deleteAllButton')?.addEventListener('click', async () => {
      if (!items.length) { setMessage('No items to delete.'); return; }
      if (!confirm(`Delete all ${items.length} question${items.length === 1 ? '' : 's'}? This cannot be undone.`)) return;
      if (!confirm(`Are you sure? All ${items.length} question${items.length === 1 ? '' : 's'} will be permanently removed.`)) return;
      try {
        items = [];
        await store.save(type, items);
        clearForm();
        render();
        setMessage('All questions deleted.');
      } catch (error) {
        setMessage(describeError(error));
      }
    });
  }

  window.exportAdminBackup = async function () {
    try {
      const backup = await store.exportBackup('../../data');
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'techlearners-admin-backup.json';
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      setMessage(describeError(error));
    }
  };

  window.importAdminBackup = function (input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        await store.importBackup(JSON.parse(reader.result));
        setMessage('Backup imported. Reload an editor page to review the content.');
      } catch (error) {
        setMessage('That file is not a valid TechLearners backup.');
      }
    };
    reader.readAsText(file);
  };

  if (editor) setupEditor().catch(error => setMessage(describeError(error)));
})();
