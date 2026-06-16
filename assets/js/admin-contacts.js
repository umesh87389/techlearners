(async function () {
  if (!(await TechLearnersContent.requireAdmin())) {
    location.replace('admin-login.html');
    return;
  }

  const list = document.getElementById('contactMessageList');
  const search = document.getElementById('contactMessageSearch');
  let messages = [];
  const nav = document.querySelector('.nav');
  const notification = document.createElement('a');
  notification.className = 'admin-notification';
  notification.href = 'contact-messages.html';
  notification.setAttribute('aria-label', 'Contact message notifications');
  notification.innerHTML = '<span class="admin-notification-icon" aria-hidden="true">&#128276;</span><span class="admin-notification-badge" hidden>0</span>';
  const logout = document.createElement('button');
  logout.className = 'btn small secondary';
  logout.type = 'button';
  logout.textContent = 'Logout';
  logout.addEventListener('click', async () => {
    await TechLearnersContent.signOut();
    location.href = 'admin-login.html';
  });
  nav.append(notification, logout);
  window.TechLearnersAdminNav?.setup(nav);

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, character => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    })[character]);
  }

  function render(nextMessages = messages) {
    messages = nextMessages;
    localStorage.setItem('tl_seen_contact_messages', JSON.stringify(messages.map(message => message.id)));
    const query = search.value.trim().toLowerCase();
    const visibleMessages = messages.filter(message =>
      [message.name, message.email, message.message].join(' ').toLowerCase().includes(query)
    );
    list.innerHTML = visibleMessages.length ? visibleMessages.map(message => `
        <article class="list-item admin-list-item">
          <div>
            <b>${escapeHtml(message.name)}</b>
            <p><a href="mailto:${escapeHtml(message.email)}">${escapeHtml(message.email)}</a></p>
            <p>${escapeHtml(message.message)}</p>
          </div>
          <button class="btn small danger" type="button" data-message-id="${message.id}">Delete</button>
        </article>`).join('') : `<div class="list-item muted">${messages.length ? 'No messages match your search.' : 'No contact messages yet.'}</div>`;
  }

  search.addEventListener('input', () => render());

  list.addEventListener('click', async event => {
    const button = event.target.closest('[data-message-id]');
    if (!button || !confirm('Delete this contact message?')) return;
    await TechLearnersFirebase.deleteContactMessage(button.dataset.messageId);
  });

  await TechLearnersFirebase.subscribeContactMessages(render, error => {
    list.textContent = error.message || 'Unable to load contact messages.';
  });
})();
