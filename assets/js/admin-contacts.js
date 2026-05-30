(async function () {
  if (!(await TechLearnersContent.requireAdmin())) {
    location.replace('admin-login.html');
    return;
  }

  const list = document.getElementById('contactMessageList');
  const nav = document.querySelector('.nav');
  const logout = document.createElement('button');
  logout.className = 'btn small secondary';
  logout.type = 'button';
  logout.textContent = 'Logout';
  logout.addEventListener('click', async () => {
    await TechLearnersContent.signOut();
    location.href = 'admin-login.html';
  });
  nav.appendChild(logout);

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, character => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    })[character]);
  }

  async function render() {
    try {
      const messages = await TechLearnersFirebase.getContactMessages();
      list.innerHTML = messages.length ? messages.map(message => `
        <article class="list-item admin-list-item">
          <div>
            <b>${escapeHtml(message.name)}</b>
            <p><a href="mailto:${escapeHtml(message.email)}">${escapeHtml(message.email)}</a></p>
            <p>${escapeHtml(message.message)}</p>
          </div>
          <button class="btn small danger" type="button" data-message-id="${message.id}">Delete</button>
        </article>`).join('') : '<div class="list-item muted">No contact messages yet.</div>';
    } catch (error) {
      list.textContent = error.message || 'Unable to load contact messages.';
    }
  }

  list.addEventListener('click', async event => {
    const button = event.target.closest('[data-message-id]');
    if (!button || !confirm('Delete this contact message?')) return;
    await TechLearnersFirebase.deleteContactMessage(button.dataset.messageId);
    await render();
  });

  await render();
})();
