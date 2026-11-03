(async function () {
  if (!(await TechLearnersContent.requireAdmin())) {
    location.replace('admin-login.html');
    return;
  }

  const list = document.getElementById('activityRecordList');
  const search = document.getElementById('activityRecordSearch');
  const classFilter = document.getElementById('activityRecordClass');
  const sectionFilter = document.getElementById('activityRecordSection');
  let records = [];

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
  window.TechLearnersAdminNav?.setup(nav);

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    })[character]);
  }

  function formatDate(timestamp) {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  function render(nextRecords) {
    records = nextRecords;
    const query = (search.value || '').trim().toLowerCase();
    const cls = classFilter.value;
    const sec = sectionFilter.value;
    const visible = records.filter((r) =>
      (!cls || String(r.className || '') === cls) &&
      (!sec || r.section === sec) &&
      (!query || `${r.teacherName || ''} ${r.contact || ''} ${r.activityName || ''}`.toLowerCase().includes(query))
    );

    list.innerHTML = visible.length
      ? visible.map((r) => `
        <article class="list-item admin-list-item">
          <div>
            <b>${escapeHtml(r.teacherName || 'Unknown')}</b>
            <p>${escapeHtml(r.contact || '')}</p>
            <p>Class ${escapeHtml(r.className || '')} &middot; ${escapeHtml(r.section || '')}</p>
            <p>Activity: ${escapeHtml(r.activityName || '')}</p>
            <p>Date: ${escapeHtml(r.activityDate || '')}</p>
            <p class="muted">Submitted: ${formatDate(r.createdAt)}</p>
          </div>
          <button class="btn small danger" type="button" data-record-id="${escapeHtml(r.id)}">Delete</button>
        </article>`).join('')
      : `<div class="list-item muted">${records.length ? 'No records match your filters.' : 'No activity records yet.'}</div>`;
  }

  search.addEventListener('input', () => render());
  classFilter.addEventListener('change', () => render());
  sectionFilter.addEventListener('change', () => render());

  document.getElementById('exportActivityExcelBtn').addEventListener('click', () => {
    if (!records.length) { alert('No activity records to export.'); return; }
    const cls = classFilter.value;
    const sec = sectionFilter.value;
    const query = (search.value || '').trim().toLowerCase();
    const visible = records.filter((r) =>
      (!cls || String(r.className || '') === cls) &&
      (!sec || r.section === sec) &&
      (!query || `${r.teacherName || ''} ${r.contact || ''} ${r.activityName || ''}`.toLowerCase().includes(query))
    );
    if (!visible.length) { alert('No records match the current filters.'); return; }
    const rows = visible.map((r) => ({
      'Teacher Name': r.teacherName || 'Unknown',
      'Contact': r.contact || '',
      'Class': r.className || '',
      'Section': r.section || '',
      'Activity Name': r.activityName || '',
      'Activity Date': r.activityDate || '',
      'Submitted': formatDate(r.createdAt)
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = [{ wch: 22 }, { wch: 26 }, { wch: 8 }, { wch: 12 }, { wch: 28 }, { wch: 14 }, { wch: 20 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Activity Records');
    XLSX.writeFile(wb, `activity-records-${new Date().toISOString().slice(0, 10)}.xlsx`);
  });

  list.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-record-id]');
    if (!button) return;
    if (!confirm('Delete this activity record?')) return;

    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = 'Deleting...';

    try {
      await TechLearnersFirebase.deleteActivityRecord(button.dataset.recordId);
    } catch (e) {
      console.error('Failed to delete activity record:', e);
      alert('Failed to delete activity record: ' + e.message);
      button.disabled = false;
      button.textContent = originalText;
    }
  });

  await TechLearnersFirebase.subscribeActivityRecords((nextRecords) => {
    render(nextRecords);
  }, (error) => {
    list.textContent = error.message || 'Unable to load activity records.';
  });
})();