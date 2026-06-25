(async function () {
  if (!(await TechLearnersContent.requireAdmin())) {
    location.replace('admin-login.html');
    return;
  }

  const list = document.getElementById('quizResultList');
  const search = document.getElementById('quizResultSearch');
  const classFilter = document.getElementById('quizResultClass');
  const subjectFilter = document.getElementById('quizResultSubject');
  let results = [];
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
    return String(value || '').replace(/[&<>"']/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    })[character]);
  }

  function formatDate(timestamp) {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  function getScoreClass(percentage) {
    if (percentage >= 80) return 'score-excellent';
    if (percentage >= 50) return 'score-pass';
    return 'score-fail';
  }

  function render(nextResults) {
    results = nextResults;
    const query = search.value.trim().toLowerCase();
    const cls = classFilter.value;
    const subj = subjectFilter.value;
    const visible = results.filter(r =>
      (!cls || r.class === cls) &&
      (!subj || r.subject === subj) &&
      (!query || `${r.studentName || ''} ${r.studentEmail || ''} ${r.school || ''}`.toLowerCase().includes(query))
    );
    list.innerHTML = visible.length ? visible.map(r => `
      <article class="list-item admin-list-item">
        <div>
          <b>${escapeHtml(r.studentName || 'Unknown')}</b>
          <p>${escapeHtml(r.studentEmail || '')}</p>
          <p>${escapeHtml(r.class || '')} &middot; ${escapeHtml(r.subject || '')} &middot; ${escapeHtml(r.school || 'No School')}</p>
          <p>Score: <b class="${getScoreClass(r.percentage)}">${r.score}/${r.total} (${r.percentage}%)</b></p>
          <p class="muted">${formatDate(r.createdAt)}</p>
        </div>
        <button class="btn small danger" type="button" data-result-id="${r.id}">Delete</button>
      </article>`).join('') : `<div class="list-item muted">${results.length ? 'No results match your filters.' : 'No quiz results yet.'}</div>`;
  }

  search.addEventListener('input', () => render());
  classFilter.addEventListener('change', () => render());
  subjectFilter.addEventListener('change', () => render());

  document.getElementById('exportExcelBtn').addEventListener('click', () => {
    if (!results.length) { alert('No quiz results to export.'); return; }
    const cls = classFilter.value;
    const subj = subjectFilter.value;
    const query = search.value.trim().toLowerCase();
    const visible = results.filter(r =>
      (!cls || r.class === cls) &&
      (!subj || r.subject === subj) &&
      (!query || `${r.studentName || ''} ${r.studentEmail || ''} ${r.school || ''}`.toLowerCase().includes(query))
    );
    if (!visible.length) { alert('No results match the current filters.'); return; }
    const rows = visible.map(r => ({
      'Student Name': r.studentName || 'Unknown',
      'Email': r.studentEmail || '',
      'Class': r.class || '',
      'Subject': r.subject || '',
      'School': r.school || '',
      'Score': r.score,
      'Total': r.total,
      'Percentage': `${r.percentage}%`,
      'Date': formatDate(r.createdAt)
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = [{ wch: 22 }, { wch: 30 }, { wch: 12 }, { wch: 10 }, { wch: 24 }, { wch: 8 }, { wch: 8 }, { wch: 12 }, { wch: 20 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Quiz Results');
    XLSX.writeFile(wb, `quiz-results-${new Date().toISOString().slice(0, 10)}.xlsx`);
  });

  let isSyncing = false;
  async function syncLeaderboard(quizResultsList) {
    if (isSyncing || !quizResultsList.length) return;
    isSyncing = true;
    try {
      const unsubscribe = await TechLearnersFirebase.subscribeLeaderboard(async (leaderboardEntries) => {
        unsubscribe();
        const existingKeys = new Set(leaderboardEntries.map(e => 
          `${e.userId || e.studentName}_${e.class}_${e.subject}_${e.score}_${e.total}`
        ));
        for (const res of quizResultsList) {
          const userId = res.userId || res.studentEmail || res.studentName;
          const key = `${userId}_${res.class}_${res.subject}_${res.score}_${res.total}`;
          if (!existingKeys.has(key)) {
            const leaderboardEntry = {
              class: res.class,
              subject: res.subject,
              school: res.school || 'TechLearners School',
              score: res.score,
              total: res.total,
              percentage: res.percentage,
              studentName: res.studentName || 'Student',
              userId: res.userId || ''
            };
            await TechLearnersFirebase.submitLeaderboardEntry(leaderboardEntry);
          }
        }
        isSyncing = false;
      }, error => {
        isSyncing = false;
        console.error('Leaderboard sync read error:', error);
      });
    } catch (e) {
      isSyncing = false;
      console.error('Failed to sync leaderboard:', e);
    }
  }

  list.addEventListener('click', async event => {
    const button = event.target.closest('[data-result-id]');
    if (!button || !confirm('Delete this quiz result?')) return;
    const resultId = button.dataset.resultId;
    const resultToDelete = results.find(r => r.id === resultId);
    if (resultToDelete) {
      try {
        const unsubscribe = await TechLearnersFirebase.subscribeLeaderboard(async (leaderboardEntries) => {
          unsubscribe();
          const match = leaderboardEntries.find(e => 
            e.class === resultToDelete.class && 
            e.subject === resultToDelete.subject && 
            e.studentName === resultToDelete.studentName && 
            e.score === resultToDelete.score && 
            e.total === resultToDelete.total
          );
          if (match) {
            await TechLearnersFirebase.deleteLeaderboardEntry(match.id);
          }
        }, () => {});
      } catch (e) {
        console.error('Failed to delete leaderboard entry:', e);
      }
    }
    await TechLearnersFirebase.deleteQuizResult(resultId);
  });

  await TechLearnersFirebase.subscribeQuizResults(nextResults => {
    render(nextResults);
    syncLeaderboard(nextResults);
  }, error => {
    list.textContent = error.message || 'Unable to load quiz results.';
  });
})();
