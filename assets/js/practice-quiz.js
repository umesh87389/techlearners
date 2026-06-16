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
  const quizTitle = document.getElementById('quizTitle');
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  const scoreText = document.getElementById('scoreText');
  let quizTools = document.getElementById('practiceQuizTools');
  let allQuestions = [];
  let quizData = [];

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
    if (total && !allAnswered) {
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

  function render() {
    quizData = allQuestions.filter(question => question.class === classField.value && question.subject === subjectField.value);
    quizTitle.textContent = `${displayClassName(classField.value)} ${subjectField.value} Practice Quiz`;
    quizBox.innerHTML = quizData.length ? quizData.map((question, index) => `
      <details class="list-item practice-question" open>
        <summary><b>${index + 1}. ${renderRichText(question.question)}</b></summary>
        <div class="practice-options">${question.options.map((option, optionIndex) => `
          <label><input type="radio" name="practice-q${index}" value="${optionIndex}"><span>${escapeHtml(option)}</span></label>
        `).join('')}</div>
      </details>`).join('') : '<div class="notice">No quiz questions are available for this selection yet.</div>';
    renderQuizTools();
    scoreText.textContent = '';
    document.getElementById('submitQuizButton').disabled = true;
    updateProgress();
  }

  function updateUrl() {
    const params = new URLSearchParams({ class: classField.value, subject: subjectField.value });
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
    quizTools.innerHTML = `
      <button class="btn small secondary" type="button" data-copy-practice-quiz>Copy link</button>
      <button class="btn small secondary" type="button" data-share-practice-quiz>Share</button>
      <button class="btn small secondary" type="button" data-expand-practice-quiz>Expand all</button>
      <button class="btn small secondary" type="button" data-collapse-practice-quiz>Collapse all</button>`;
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
      quizBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  filterForm.addEventListener('submit', event => {
    event.preventDefault();
    updateUrl();
    render();
    scrollToContent();
  });
  quizBox.addEventListener('change', updateProgress);
  quizTools?.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.matches('[data-copy-practice-quiz]')) copyPracticeQuizLink();
    if (button.matches('[data-share-practice-quiz]')) sharePracticeQuizLink();
    if (button.matches('[data-expand-practice-quiz]')) setPracticeQuestionsOpen(true);
    if (button.matches('[data-collapse-practice-quiz]')) setPracticeQuestionsOpen(false);
  });
  document.getElementById('restartQuizButton').addEventListener('click', render);
  function animateScore(finalScore, totalQuestions, finalPercentage) {
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
    if (!canAttemptToday()) {
      scoreText.textContent = 'You have already attempted this quiz today. Come back tomorrow for a new attempt.';
      return;
    }
    requestAnimationFrame(() => {
      scoreText.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    // Highlight correct / incorrect answers
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
    const result = { class: classField.value, subject: subjectField.value, score, total, percentage };
    markAttemptToday();
    window.TechLearnersProgress?.mark('quizzes', `${classField.value}|${subjectField.value}`, { score, total });
    try {
      const user = await TechLearnersFirebase.getCurrentUser();
      if (user) {
        result.studentName = user.displayName || user.email?.split('@')[0] || 'Student';
        result.studentEmail = user.email || '';
        await TechLearnersFirebase.submitQuizResult(result);
        animateScore(score, total, percentage);
      } else {
        animateScore(score, total, percentage);
      }
    } catch {
      animateScore(score, total, percentage);
    }
  });

  TechLearnersContent.get('quizQuestions', '../../data')
    .then(data => { allQuestions = data; render(); })
    .catch(error => { quizBox.textContent = error.message; });
})();
