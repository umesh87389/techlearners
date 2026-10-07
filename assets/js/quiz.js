(function () {
  const quizBox = document.getElementById('quizBox');
  const filterForm = document.getElementById('quizFilterForm');
  const classField = document.getElementById('quizClass');
  const subjectField = document.getElementById('quizSubject');
  const chapterField = document.getElementById('quizChapter');
  const quizTitle = document.getElementById('quizTitle');
  const downloads = document.getElementById('quizDownloads');
  let allQuestions = [];
  let quizData = [];

  const escapeHtml = value => String(value || '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[character]);
  const safeExternalUrl = value => {
    try {
      const url = new URL(value);
      return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
    } catch {
      return '';
    }
  };
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
  const optionLabel = index => String.fromCharCode(65 + index);

  const query = new URLSearchParams(location.search);
  classField.value = query.get('class') || 'Class 9';
  subjectField.value = query.get('subject') || 'AI';

  function relevantQuestions() {
    return allQuestions.filter(item => (!item.class || item.class === classField.value) && (item.subject || 'AI') === subjectField.value);
  }

  function refreshChapters(preferred = '') {
    const chapters = [...new Set(relevantQuestions().map(item => item.chapter || 'General Practice'))].sort();
    chapterField.innerHTML = '<option value="">All published modules</option>' + chapters.map(chapter => `<option value="${escapeHtml(chapter)}">${escapeHtml(chapter)}</option>`).join('');
    if (chapters.includes(preferred)) chapterField.value = preferred;
  }

  function render() {
    const selectedChapter = chapterField.value;
    quizData = relevantQuestions().filter(item => !selectedChapter || (item.chapter || 'General Practice') === selectedChapter);
    quizTitle.textContent = `${displayClassName(classField.value)} ${subjectField.value} MCQs${selectedChapter ? ` - ${selectedChapter}` : ''}`;
    const readableQuestions = quizData.filter(question => question.question && Array.isArray(question.options) && question.options.length);
    const answerKey = readableQuestions
      .map((question, index) => {
        const answerIndex = Number.isInteger(question.answer) ? question.answer : -1;
        const answerText = answerIndex >= 0 && answerIndex < question.options.length ? question.options[answerIndex] : '';
        return answerText ? `
          <li>
            <span>${index + 1}. ${optionLabel(answerIndex)}</span>
            <b>${escapeHtml(answerText)}</b>
          </li>` : '';
      })
      .join('');
    quizBox.innerHTML = readableQuestions.length ? `${readableQuestions.map((question, index) => `
      <div class="mcq-card">
        <div class="mcq-card-header">
          <span class="mcq-number">${index + 1}</span>
        </div>
        <div class="mcq-card-body">
          <b class="mcq-question">${renderRichText(question.question)}</b>
          <ol class="mcq-options">${question.options.map(option => `<li>${escapeHtml(option)}</li>`).join('')}</ol>
        </div>
      </div>`).join('')}
      <section class="mcq-answer-key" aria-label="Answer key">
        <h2>Answer Key</h2>
        <ol>${answerKey}</ol>
      </section>` : '<div class="notice">No readable MCQs have been published for this selection yet. Check the downloadable files below.</div>';
    const links = [...new Map(quizData.map(item => {
      const url = safeExternalUrl(item.downloadLink);
      return url ? [url, { url, chapter: item.chapter || 'MCQ file' }] : null;
    }).filter(Boolean)).values()];
    downloads.innerHTML = links.length ? `<div class="notice"><b>Downloadable MCQ files</b><div class="quiz-download-actions">${links.map(link => `<a class="btn small" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">Open ${escapeHtml(link.chapter)} MCQs</a>`).join('')}</div></div>` : '';
  }

  function updateUrl() {
    const params = new URLSearchParams({ class: classField.value, subject: subjectField.value });
    if (chapterField.value) params.set('chapter', chapterField.value);
    history.replaceState(null, '', `${location.pathname}?${params}`);
  }

  function scrollToContent() {
    requestAnimationFrame(() => {
      filterForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  document.querySelectorAll('.exam-card-link[href^="?"]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const params = new URLSearchParams(link.getAttribute('href').substring(1));
      if (params.has('class')) classField.value = params.get('class');
      if (params.has('subject')) subjectField.value = params.get('subject');
      refreshChapters(params.get('chapter') || '');
      render();
      scrollToContent();
    });
  });

  filterForm.addEventListener('submit', event => {
    event.preventDefault();
    updateUrl();
    render();
    scrollToContent();
  });
  classField.addEventListener('change', () => { refreshChapters(); render(); });
  subjectField.addEventListener('change', () => { refreshChapters(); render(); });
  TechLearnersContent.get('quizzes', '../../data').then(data => {
    allQuestions = data;
    refreshChapters(query.get('chapter') || '');
    render();
    if (query.get('class') || query.get('subject')) scrollToContent();
  }).catch(error => {
    quizBox.textContent = error.message || 'Unable to load MCQs.';
  });
})();
