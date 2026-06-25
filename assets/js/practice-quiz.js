(async () => {
  const currentUser = await TechLearnersFirebase.getCurrentUser();
  if (!currentUser) {
    const next = 'pages/quiz/index.html' + location.search;
    location.replace('../../login.html?next=' + encodeURIComponent(next));
    return;
  }

  const quizBox = document.getElementById('practiceQuizBox');
  const filterForm = document.getElementById('practiceQuizFilter');
  const classField = document.getElementById('practiceQuizClass');
  const subjectField = document.getElementById('practiceQuizSubject');
  const schoolField = document.getElementById('practiceQuizSchool');
  const quizTitle = document.getElementById('quizTitle');
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  const scoreText = document.getElementById('scoreText');
  const progressContainer = document.querySelector('.quiz-progress');
  const actionsContainer = document.querySelector('.quiz-actions');
  let quizTools = document.getElementById('practiceQuizTools');
  let allQuestions = [];
  let quizData = [];
  let currentQuestionIndex = 0;
  let isSubmitted = false;
  let leaderboardData = [];

  const escapeHtml = value => String(value || '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[character]);
  const renderRichText = value => {
    const template = document.createElement('template');
    template.innerHTML = String(value || '');
    const allowedTags = new Set(['B', 'BR', 'EM', 'I', 'STRONG', 'U']);
    [...template.content.querySelectorAll('*')].forEach(element => {
      if (!allowedTags.has(element.tagName)) element.replaceWith(...element.childNodes);
      else [...element.attributes].forEach(attribute => element.removeAttribute(attribute.name));
    });
    return template.innerHTML;
  };
  const displayClassName = value => /^CBSE\s/i.test(String(value || '')) ? String(value || '') : `CBSE ${value}`;

  const query = new URLSearchParams(location.search);
  classField.value = query.get('class') || 'Class 9';
  subjectField.value = query.get('subject') || 'AI';
  if (schoolField) schoolField.value = query.get('school') || '';
  let quizLoaded = query.has('class') && query.has('subject');
  if (!quizTools && quizBox) {
    quizTools = document.createElement('div');
    quizTools.id = 'practiceQuizTools';
    quizTools.className = 'practice-quiz-tools note-actions';
    quizTools.hidden = true;
    quizBox.before(quizTools);
  }

  function updateSubmitButton() {
    const submitBtn = document.getElementById('submitQuizButton');
    if (!submitBtn) return;
    const total = quizData.length;
    if (!total) { submitBtn.disabled = true; return; }
    const answered = quizData.filter((q, i) => document.querySelector(`input[name="practice-q${i}"]:checked`)).length;
    const allAnswered = answered === total;
    submitBtn.disabled = !allAnswered;
    submitBtn.title = allAnswered ? 'Submit your answers' : 'Answer all questions to submit';
    let warning = document.getElementById('quizWarning');
    if (total && !allAnswered && currentQuestionIndex === total - 1 && !isSubmitted) {
      if (!warning) {
        warning = document.createElement('p');
        warning.id = 'quizWarning';
        warning.className = 'muted';
        warning.style.marginTop = '12px';
        warning.style.textAlign = 'center';
        submitBtn.parentElement.appendChild(warning);
      }
      warning.textContent = `Answer all ${total} question${total === 1 ? '' : 's'} to submit. ${total - answered} remaining.`;
    } else if (warning) {
      warning.remove();
    }
  }

  function updateProgress() {
    const answered = quizData.filter((question, index) => document.querySelector(`input[name="practice-q${index}"]:checked`)).length;
    const percentage = quizData.length ? Math.round(answered / quizData.length * 100) : 0;
    progressText.textContent = `${answered}/${quizData.length} answered`;
    progressBar.style.width = `${percentage}%`;
    progressBar.parentElement.setAttribute('aria-valuenow', percentage);
    document.querySelectorAll('.milestone-dot').forEach(dot => {
      const pct = parseInt(dot.closest('.milestone').getAttribute('data-label'));
      dot.style.background = percentage >= pct ? '#fff' : 'rgba(255,255,255,.5)';
      dot.style.borderColor = percentage >= pct ? 'rgba(8,127,216,.5)' : 'rgba(71,105,160,.2)';
    });
    updateSubmitButton();
  }

  function updateQuizVisibility() {
    const questions = quizBox.querySelectorAll('.practice-question');
    questions.forEach((q, idx) => {
      if (isSubmitted) {
        q.style.display = '';
        q.open = true;
      } else {
        q.style.display = idx === currentQuestionIndex ? '' : 'none';
        q.open = true;
      }
    });

    const prevBtn = document.getElementById('prevQuizButton');
    const nextBtn = document.getElementById('nextQuizButton');
    const submitBtn = document.getElementById('submitQuizButton');
    const restartBtn = document.getElementById('restartQuizButton');

    if (!quizData.length) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      if (submitBtn) submitBtn.style.display = 'none';
      if (restartBtn) restartBtn.style.display = 'none';
      return;
    }

    if (!isSubmitted) {
      if (prevBtn) {
        prevBtn.style.display = 'inline-block';
        prevBtn.disabled = currentQuestionIndex === 0;
      }
      if (nextBtn) {
        if (currentQuestionIndex === quizData.length - 1) {
          nextBtn.style.display = 'none';
          submitBtn.style.display = 'inline-block';
        } else {
          nextBtn.style.display = 'inline-block';
          submitBtn.style.display = 'none';
        }
      } else {
        submitBtn.style.display = 'inline-block';
      }
      if (restartBtn) restartBtn.style.display = 'inline-block';
    } else {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      if (submitBtn) submitBtn.style.display = 'none';
      if (restartBtn) restartBtn.style.display = 'inline-block';
    }
  }

  function render() {
    if (!quizLoaded) return;

    if (progressContainer) progressContainer.style.display = '';
    if (quizBox) quizBox.style.display = '';
    if (actionsContainer) actionsContainer.style.display = '';
    scoreText.style.display = 'none';

    quizData = allQuestions.filter(question => question.class === classField.value && question.subject === subjectField.value);
    quizTitle.textContent = `${displayClassName(classField.value)} ${subjectField.value} Practice Quiz`;
    quizBox.innerHTML = quizData.length ? quizData.map((question, index) => `
      <details class="list-item practice-question" open>
        <summary><b>${index + 1}. ${renderRichText(question.question)}</b></summary>
        <div class="practice-options">${question.options.map((option, optionIndex) => `
          <label><input type="radio" name="practice-q${index}" value="${optionIndex}"><span>${escapeHtml(option)}</span></label>
        `).join('')}</div>
      </details>`).join('') : '<div class="notice">No quiz questions are available for this selection yet.</div>';

    const savedState = loadQuizState();
    if (savedState && savedState.answers && savedState.answers.length === quizData.length) {
      currentQuestionIndex = savedState.currentQuestionIndex ?? 0;
      isSubmitted = savedState.isSubmitted ?? false;
      savedState.answers.forEach((val, index) => {
        if (val !== null && val !== undefined) {
          const radio = document.querySelector(`input[name="practice-q${index}"][value="${val}"]`);
          if (radio) radio.checked = true;
        }
      });
    } else {
      currentQuestionIndex = 0;
      isSubmitted = false;
      clearQuizState();
    }

    renderQuizTools();
    scoreText.textContent = '';
    scoreText.className = 'quiz-result';
    document.getElementById('submitQuizButton').disabled = true;
    updateProgress();
    updateQuizVisibility();
    if (isSubmitted) {
      applySubmittedResults();
    }
    if (typeof renderLeaderboard === 'function') {
      renderLeaderboard();
    }
  }

  function updateUrl() {
    const params = new URLSearchParams({
      class: classField.value,
      subject: subjectField.value,
      school: schoolField ? schoolField.value : ''
    });
    history.replaceState(null, '', `${location.pathname}?${params}`);
  }

  function getQuizShareUrl() {
    const params = new URLSearchParams({ class: classField.value, subject: subjectField.value });
    return new URL(`${location.pathname}?${params}`, location.href).href;
  }

  function renderQuizTools() {
    if (!quizTools) return;
    quizTools.hidden = !quizData.length;
    if (!quizData.length) {
      quizTools.innerHTML = '';
      return;
    }
    if (isSubmitted) {
      quizTools.innerHTML = `
        <button class="btn small secondary" type="button" data-copy-practice-quiz>Copy link</button>
        <button class="btn small secondary" type="button" data-share-practice-quiz>Share</button>
        <button class="btn small secondary" type="button" data-expand-practice-quiz>Expand all</button>
        <button class="btn small secondary" type="button" data-collapse-practice-quiz>Collapse all</button>`;
    } else {
      quizTools.innerHTML = `
        <button class="btn small secondary" type="button" data-copy-practice-quiz>Copy link</button>
        <button class="btn small secondary" type="button" data-share-practice-quiz>Share</button>`;
    }
  }

  async function copyPracticeQuizLink() {
    const url = getQuizShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      alert('Practice quiz link copied.');
    } catch {
      prompt('Copy this practice quiz link:', url);
    }
  }

  async function sharePracticeQuizLink() {
    const url = getQuizShareUrl();
    const title = `${displayClassName(classField.value)} ${subjectField.value} Practice Quiz`;
    try {
      if (navigator.share) await navigator.share({ title, url });
      else await copyPracticeQuizLink();
    } catch (error) {
      if (error.name !== 'AbortError') prompt('Copy this practice quiz link:', url);
    }
  }

  function setPracticeQuestionsOpen(open) {
    quizBox.querySelectorAll('.practice-question').forEach(question => { question.open = open; });
  }

  function getAttemptKey() {
    return `tl_quiz_attempt_${classField.value}_${subjectField.value}`;
  }

  function canAttemptToday() {
    const key = getAttemptKey();
    const lastAttempt = localStorage.getItem(key);
    if (!lastAttempt) return true;
    const today = new Date().toDateString();
    return lastAttempt !== today;
  }

  function markAttemptToday() {
    localStorage.setItem(getAttemptKey(), new Date().toDateString());
  }

  function scrollToContent() {
    requestAnimationFrame(() => {
      quizBox.scrollIntoView({ behavior: 'auto', block: 'start' });
    });
  }

  function getStateKey() {
    return `tl_quiz_state_${classField.value}_${subjectField.value}`;
  }

  function saveQuizState() {
    if (!quizData.length) return;
    const answers = quizData.map((q, index) => {
      const selected = document.querySelector(`input[name="practice-q${index}"]:checked`);
      return selected ? selected.value : null;
    });
    const state = {
      answers,
      currentQuestionIndex,
      isSubmitted
    };
    localStorage.setItem(getStateKey(), JSON.stringify(state));
  }

  function loadQuizState() {
    const raw = localStorage.getItem(getStateKey());
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function clearQuizState() {
    localStorage.removeItem(getStateKey());
  }

  function applySubmittedResults() {
    quizData.forEach((question, index) => {
      const selected = document.querySelector(`input[name="practice-q${index}"]:checked`);
      const options = document.querySelectorAll(`input[name="practice-q${index}"]`);
      
      options.forEach(input => {
        const label = input.closest('label');
        if (!label) return;
        input.disabled = true;
        const val = Number(input.value);
        if (val === question.answer) {
          label.classList.add('answer-correct');
        } else if (selected && val === Number(selected.value) && val !== question.answer) {
          label.classList.add('answer-wrong');
        }
      });
    });

    const score = quizData.reduce((total, question, index) => {
      const selected = document.querySelector(`input[name="practice-q${index}"]:checked`);
      return total + (selected && Number(selected.value) === question.answer ? 1 : 0);
    }, 0);
    const percentage = Math.round(score / quizData.length * 100);
    const total = quizData.length;
    animateScore(score, total, percentage);
  }

  filterForm.addEventListener('submit', event => {
    event.preventDefault();
    updateUrl();
    quizLoaded = true;
    render();
    scrollToContent();
  });
  quizBox.addEventListener('change', () => {
    updateProgress();
    saveQuizState();
  });
  quizTools?.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.matches('[data-copy-practice-quiz]')) copyPracticeQuizLink();
    if (button.matches('[data-share-practice-quiz]')) sharePracticeQuizLink();
    if (button.matches('[data-expand-practice-quiz]')) setPracticeQuestionsOpen(true);
    if (button.matches('[data-collapse-practice-quiz]')) setPracticeQuestionsOpen(false);
  });
  document.getElementById('prevQuizButton')?.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      updateQuizVisibility();
      saveQuizState();
    }
  });
  document.getElementById('nextQuizButton')?.addEventListener('click', () => {
    if (currentQuestionIndex < quizData.length - 1) {
      currentQuestionIndex++;
      updateQuizVisibility();
      saveQuizState();
    }
  });
  document.getElementById('restartQuizButton').addEventListener('click', () => {
    clearQuizState();
    render();
  });
  function animateScore(finalScore, totalQuestions, finalPercentage) {
    scoreText.style.display = '';
    let currentScore = 0;
    const step = Math.max(1, Math.ceil(finalScore / 20));
    const scoreClass = finalPercentage >= 80 ? 'score-excellent' : finalPercentage >= 50 ? 'score-pass' : 'score-fail';
    scoreText.className = `quiz-result ${scoreClass}`;
    const counter = setInterval(() => {
      currentScore = Math.min(currentScore + step, finalScore);
      scoreText.innerHTML = `<span class="quiz-score-number">${currentScore}/${totalQuestions}</span>${currentScore >= finalScore ? `${finalPercentage >= 80 ? 'Excellent! &#127942;' : finalPercentage >= 50 ? 'Well done! &#127775;' : 'Keep trying! &#128170;'}` : 'Scoring...'}`;
      if (currentScore >= finalScore) {
        clearInterval(counter);
        scoreText.innerHTML = `<span class="quiz-score-number">${finalScore}/${totalQuestions} (${finalPercentage}%)</span>${finalPercentage >= 80 ? 'Excellent work! &#127942;' : finalPercentage >= 50 ? 'Good effort! Keep practising. &#127775;' : 'Don\'t give up! Review the topics and try again. &#128170;'}`;
      }
    }, 30);
  }

  document.getElementById('submitQuizButton').addEventListener('click', async () => {
    if (!quizData.length) return;
    if (schoolField && !schoolField.value.trim()) {
      alert('School name is mandatory. Please enter your school name at the top of the page.');
      schoolField.focus();
      return;
    }
    if (!canAttemptToday()) {
      scoreText.style.display = '';
      scoreText.textContent = 'You have already attempted this quiz today. Come back tomorrow for a new attempt.';
      return;
    }
    isSubmitted = true;
    saveQuizState();
    updateQuizVisibility();
    renderQuizTools();
    const root = document.documentElement;
    const original = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    scoreText.scrollIntoView({ behavior: 'auto', block: 'center' });
    requestAnimationFrame(() => {
      root.style.scrollBehavior = original;
    });

    applySubmittedResults();

    const score = quizData.reduce((total, question, index) => {
      const selected = document.querySelector(`input[name="practice-q${index}"]:checked`);
      return total + (selected && Number(selected.value) === question.answer ? 1 : 0);
    }, 0);
    const percentage = Math.round(score / quizData.length * 100);
    const total = quizData.length;
    const result = {
      class: classField.value,
      subject: subjectField.value,
      school: schoolField ? schoolField.value.trim() : '',
      score,
      total,
      percentage
    };
    markAttemptToday();
    window.TechLearnersProgress?.mark('quizzes', `${classField.value}|${subjectField.value}`, { score, total });
    try {
      const user = await TechLearnersFirebase.getCurrentUser();
      if (user) {
        result.studentName = user.displayName || user.email?.split('@')[0] || 'Student';
        result.studentEmail = user.email || '';
        result.userId = user.uid;
        await TechLearnersFirebase.submitQuizResult(result);

        const leaderboardEntry = {
          class: result.class,
          subject: result.subject,
          school: result.school,
          score: result.score,
          total: result.total,
          percentage: result.percentage,
          studentName: result.studentName,
          userId: user.uid
        };
        await TechLearnersFirebase.submitLeaderboardEntry(leaderboardEntry);
      }
    } catch {}
  });

  const getInitials = name => {
    const cleanName = String(name || '').trim();
    const parts = cleanName.split(/\s+/);
    if (parts.length >= 2 && parts[0] && parts[parts.length - 1]) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return cleanName[0] ? cleanName[0].toUpperCase() : '?';
  };

  function renderLeaderboard() {
    const table = document.getElementById('leaderboardTable');
    const body = document.getElementById('leaderboardBody');
    const loader = document.getElementById('leaderboardLoader');
    const empty = document.getElementById('leaderboardEmpty');

    if (!table || !body || !loader || !empty) return;

    const filtered = leaderboardData;

    if (!filtered.length) {
      table.style.display = 'none';
      loader.style.display = 'none';
      empty.style.display = 'block';
      return;
    }

    const bestScores = {};
    filtered.forEach(entry => {
      const key = entry.userId || entry.studentName;
      if (!bestScores[key] || (entry.percentage ?? 0) > (bestScores[key].percentage ?? 0)) {
        bestScores[key] = entry;
      } else if ((entry.percentage ?? 0) === (bestScores[key].percentage ?? 0)) {
        if ((entry.score ?? 0) > (bestScores[key].score ?? 0)) {
          bestScores[key] = entry;
        }
      }
    });

    const sorted = Object.values(bestScores).sort((a, b) => {
      const aPct = a.percentage ?? 0;
      const bPct = b.percentage ?? 0;
      if (bPct !== aPct) return bPct - aPct;

      const aScore = a.score ?? 0;
      const bScore = b.score ?? 0;
      if (bScore !== aScore) return bScore - aScore;

      const getMs = item => {
        if (!item || !item.createdAt) return 0;
        if (typeof item.createdAt.toMillis === 'function') return item.createdAt.toMillis();
        if (typeof item.createdAt.toDate === 'function') return item.createdAt.toDate().getTime();
        if (item.createdAt.seconds) return item.createdAt.seconds * 1000;
        const parsed = Date.parse(item.createdAt);
        return isNaN(parsed) ? 0 : parsed;
      };

      return getMs(a) - getMs(b);
    });

    loader.style.display = 'none';
    empty.style.display = 'none';
    table.style.display = 'table';

    let currentRank = 0;
    let prevPercentage = -1;

    body.innerHTML = sorted.slice(0, 5).map((entry, idx) => {
      const pct = entry.percentage ?? 0;
      if (pct !== prevPercentage) {
        currentRank = idx + 1; // Standard competition ranking: if two share rank 2, next is 4
        prevPercentage = pct;
      }
      const rank = currentRank;

      let rankHtml = `<span class="rank-badge">${rank}</span>`;
      if (rank === 1) rankHtml = `<span class="rank-badge rank-1">🥇</span>`;
      else if (rank === 2) rankHtml = `<span class="rank-badge rank-2">🥈</span>`;
      else if (rank === 3) rankHtml = `<span class="rank-badge rank-3">🥉</span>`;

      const isCurrentUser = currentUser && (entry.userId === currentUser.uid);
      const rowClass = isCurrentUser ? 'leaderboard-row current-user' : 'leaderboard-row';
      const initials = getInitials(entry.studentName || 'Student');

      return `
        <tr class="${rowClass}">
          <td class="rank-col">${rankHtml}</td>
          <td>
            <div class="student-col">
              <div class="student-avatar">${initials}</div>
              <div class="student-info">
                <span class="student-name">${escapeHtml(entry.studentName || 'Student')}</span>
                <span class="student-school">${escapeHtml(entry.class || 'Class 9')} &middot; ${escapeHtml(entry.school || 'TechLearners School')}</span>
              </div>
            </div>
          </td>
          <td>
            <span class="score-badge ${(entry.percentage ?? 0) >= 80 ? 'score-excellent' : (entry.percentage ?? 0) >= 50 ? 'score-pass' : 'score-fail'}">
              ${entry.score ?? 0}/${entry.total ?? 0} (${entry.percentage ?? 0}%)
            </span>
          </td>
        </tr>
      `;
    }).join('');
  }

  TechLearnersFirebase.subscribeLeaderboard(
    data => {
      leaderboardData = data;
      renderLeaderboard();
    },
    error => {
      console.error('Leaderboard error:', error);
      const loader = document.getElementById('leaderboardLoader');
      if (loader) {
        if (error.code === 'permission-denied') {
          loader.innerHTML = '<span style="color: var(--muted); font-size: 0.95rem; display: block; line-height: 1.5;">Leaderboard is locked. Please ensure you copy, paste, and publish the updated <b>firestore.rules</b> in your <b>Firebase Console</b>.</span>';
        } else {
          loader.textContent = 'Unable to load leaderboard. Check your connection.';
        }
      }
    }
  );

  TechLearnersContent.get('quizQuestions', '../../data')
    .then(data => {
      allQuestions = data;
      if (quizLoaded) {
        render();
      } else {
        renderLeaderboard();
      }
    })
    .catch(error => {
      quizBox.style.display = '';
      quizBox.textContent = error.message;
    });
})();
