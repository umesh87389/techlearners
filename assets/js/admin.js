(async function () {
  const store = window.TechLearnersContent;
  const adminPage = location.pathname.endsWith('admin-login.html') === false;
  let items = [];
  let editingIndex = -1;

  if (adminPage && !(await store.requireAdmin())) {
    location.replace('admin-login.html');
    return;
  }

  window.adminLogout = async function () {
    await store.signOut();
    location.href = 'admin-login.html';
  };

  document.querySelectorAll('.nav').forEach(nav => {
    const logout = document.createElement('button');
    logout.className = 'btn small secondary';
    logout.type = 'button';
    logout.textContent = 'Logout';
    logout.addEventListener('click', window.adminLogout);
    nav.appendChild(logout);
  });

  const editorConfigs = {
    'upload-notes.html': {
      type: 'notes',
      title: 'Manage Notes',
      intro: 'Upload a new note file or add a link to a file already hosted online.',
      fields: '<select name="class" required><option>Class 9</option><option>Class 10</option></select><input name="title" placeholder="Title" required><textarea name="description" placeholder="Description" required></textarea><input name="file" placeholder="Existing file URL (optional when uploading)"><label>Upload note file<input name="upload" type="file"></label>'
    },
    'upload-lectures.html': {
      type: 'lectures',
      title: 'Manage Lectures',
      fields: '<select name="class" required><option>Class 9</option><option>Class 10</option></select><input name="title" placeholder="Lecture title" required><textarea name="description" placeholder="Description" required></textarea><input name="videoId" placeholder="YouTube video ID, for example dQw4w9WgXcQ" required>'
    },
    'manage-quizzes.html': {
      type: 'quizzes',
      title: 'Manage Quizzes',
      fields: '<input name="question" placeholder="Question" required><textarea name="options" placeholder="Enter one option per line" required></textarea><input name="answer" type="number" min="0" placeholder="Correct option index, starting from 0" required>'
    },
    'announcements.html': {
      type: 'announcements',
      title: 'Manage Announcements',
      fields: '<input name="title" placeholder="Announcement title" required><textarea name="message" placeholder="Announcement message" required></textarea>'
    }
  };

  function setupAdminScreen() {
    const filename = location.pathname.split('/').pop();
    const config = editorConfigs[filename];
    if (!config) return null;

    const section = document.querySelector('main .section');
    section.dataset.contentType = config.type;
    section.innerHTML = `<h1>${config.title}</h1>
      ${config.intro ? `<p class="notice">${config.intro}</p>` : ''}
      <form class="form-card" id="adminForm">${config.fields}
        <div class="backup-actions"><button class="btn" id="saveButton" type="submit">Add Item</button><button class="btn secondary" id="cancelButton" type="button" hidden>Cancel Edit</button><button class="btn secondary" id="resetButton" type="button">Restore Defaults</button></div>
      </form>
      <p id="adminMessage" class="muted"></p><div class="list-box admin-list" id="adminList"></div>`;
    return section;
  }

  function setupDashboard() {
    if (!location.pathname.endsWith('admin-dashboard.html')) return;
    const section = document.querySelector('main .section');
    section.insertAdjacentHTML('beforeend', `<div class="notice">
      <b>Storage mode:</b> ${window.TechLearnersFirebase.configured ? 'Firebase is connected. Changes are published for all visitors.' : 'Firebase config is missing. Changes are saved only in this browser until you add your project config.'}
      <div class="backup-actions"><button class="btn small" type="button" onclick="exportAdminBackup()">Export Backup</button><label class="btn small secondary file-button">Import Backup<input type="file" accept="application/json" onchange="importAdminBackup(this)"></label></div>
      <p id="adminMessage"></p>
    </div>`);
  }

  setupDashboard();
  const editor = setupAdminScreen();

  function setMessage(message) {
    const box = document.getElementById('adminMessage');
    if (box) box.textContent = message;
  }

  function describeError(error) {
    return error.message || 'Something went wrong. Check your Firebase config and security rules.';
  }

  function render() {
    const list = document.getElementById('adminList');
    if (!list) return;

    if (!items.length) {
      list.innerHTML = '<div class="list-item muted">No items yet.</div>';
      return;
    }

    list.innerHTML = items.map((item, index) => {
      const heading = item.title || item.question || `Item ${index + 1}`;
      const detail = item.message || item.description || (item.options || []).join(' | ');
      return `<article class="list-item admin-list-item">
        <div><b>${escapeHtml(heading)}</b><p>${escapeHtml(detail)}</p></div>
        <div class="admin-actions">
          <button class="btn small secondary" type="button" data-edit="${index}">Edit</button>
          <button class="btn small danger" type="button" data-delete="${index}">Delete</button>
        </div>
      </article>`;
    }).join('');
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

  function formToItem(form) {
    const values = Object.fromEntries(new FormData(form).entries());
    delete values.upload;
    if (values.options) {
      values.options = values.options.split('\n').map(option => option.trim()).filter(Boolean);
      values.answer = Number(values.answer);
    }
    return values;
  }

  function fillForm(index) {
    editingIndex = index;
    const item = items[index];
    const form = document.getElementById('adminForm');
    Object.entries(item).forEach(([key, value]) => {
      const field = form.elements.namedItem(key);
      if (field) field.value = Array.isArray(value) ? value.join('\n') : value;
    });
    document.getElementById('saveButton').textContent = 'Update Item';
    document.getElementById('cancelButton').hidden = false;
    form.scrollIntoView({ behavior: 'smooth' });
  }

  function clearForm() {
    editingIndex = -1;
    const form = document.getElementById('adminForm');
    if (form) form.reset();
    const saveButton = document.getElementById('saveButton');
    const cancelButton = document.getElementById('cancelButton');
    if (saveButton) saveButton.textContent = 'Add Item';
    if (cancelButton) cancelButton.hidden = true;
  }

  async function setupEditor() {
    const type = editor.dataset.contentType;
    items = await store.get(type, '../../data');
    render();

    document.getElementById('adminForm').addEventListener('submit', async event => {
      event.preventDefault();
      try {
        const item = formToItem(event.currentTarget);
        const upload = event.currentTarget.elements.namedItem('upload');

        if (type === 'quizzes' && (item.options.length < 2 || !Number.isInteger(item.answer) || item.answer < 0 || item.answer >= item.options.length)) {
          setMessage('Add at least two options and choose a valid correct option index.');
          return;
        }

        if (type === 'notes' && upload.files[0]) {
          setMessage('Uploading note file...');
          item.file = await store.uploadNote(upload.files[0]);
        }
        if (type === 'notes' && !item.file) {
          setMessage('Upload a note file or provide an existing file URL.');
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
      }
    });

    document.getElementById('adminList').addEventListener('click', async event => {
      const editButton = event.target.closest('[data-edit]');
      const deleteButton = event.target.closest('[data-delete]');
      if (editButton) fillForm(Number(editButton.dataset.edit));
      if (deleteButton && confirm('Delete this item?')) {
        try {
          items.splice(Number(deleteButton.dataset.delete), 1);
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
