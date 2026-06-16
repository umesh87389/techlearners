function loadRevisionPapers(className, subject = 'AI') {
  const box = document.getElementById('revisionPapersList');
  const title = document.getElementById('revisionPapersTitle');
  if (!box) return;
  if (title) title.textContent = `${displayRevisionClassName(className)} ${subject} Revision Papers`;
  box.innerHTML = '<p class="muted">Choose from the available revision papers below.</p>';
  box.classList.add('paper-results');
  document.querySelectorAll('.revision-paper-filter').forEach(button => {
    const selected = button.dataset.class === className && button.dataset.subject === subject;
    button.classList.toggle('secondary', !selected);
    button.setAttribute('aria-pressed', String(selected));
  });

  const params = new URLSearchParams({ class: className, subject });
  history.replaceState(null, '', `${location.pathname}?${params}${location.hash === '#browseRevisionPapers' ? '#browseRevisionPapers' : ''}`);

  TechLearnersContent.get('revisionPapers', '../../data').then(data => {
    const papers = data.filter(paper => paper.class === className && (paper.subject || 'AI') === subject)
      .sort((a, b) => revisionPaperKey(a).localeCompare(revisionPaperKey(b)));
    box.innerHTML = papers.length ? papers.map((paper, index) => {
      const detailUrl = revisionPaperDetailUrl(paper);
      const shareUrl = new URL(detailUrl, location.href);
      return `<article class="card paper-card note-card revision-paper-card" id="revision-paper-${index + 1}">
        <div class="paper-card-head">
          <span class="paper-year-badge">${escapeRevisionHtml(paper.testType || 'Revision Test')}</span>
          <span class="paper-subject-tag">${escapeRevisionHtml(paper.subject || 'AI')}</span>
        </div>
        <h2>${escapeRevisionHtml(paper.title)}</h2>
        <div class="rich-text-content">${renderRevisionRichText(paper.description)}</div>
        <details class="note-module revision-paper-module">
          <summary>Explore Paper</summary>
          <div class="note-content rich-text-content">${renderRevisionRichText(paper.content)}</div>
          <div class="note-actions">
            ${paper.file ? `<a class="btn small secondary" href="${escapeRevisionHtml(revisionPaperFileUrl(paper.file))}" target="_blank" rel="noopener">Open file</a>` : ''}
            <button class="btn small secondary note-see-less" type="button" data-collapse-revision>See Less</button>
          </div>
        </details>
        <div class="note-actions">
          <a class="btn small" href="${escapeRevisionHtml(detailUrl)}" target="_blank" rel="noopener">Open Page</a>
          <button class="btn small secondary" type="button" data-copy-revision-paper="${escapeRevisionHtml(shareUrl.href)}">Copy link</button>
          <button class="btn small secondary" type="button" data-share-revision-paper="${escapeRevisionHtml(shareUrl.href)}" data-share-title="${escapeRevisionHtml(paper.title)}">Share</button>
        </div>
      </article>`;
    }).join('') : '<div class="notice">No revision papers have been published for this selection yet. Please check again later.</div>';
    setupRevisionPaperHandlers(box);
    if (document.activeElement?.classList.contains('revision-paper-filter') || location.hash === '#browseRevisionPapers') {
      scrollToRevisionPaperBrowser();
    }
  }).catch(error => {
    box.textContent = error.message || 'Unable to load revision papers.';
  });
}

function revisionPaperKey(paper) {
  return paper.id || `${paper.class}|${paper.subject || 'AI'}|${paper.testType || ''}|${paper.title || ''}`;
}

function revisionPaperDetailUrl(paper) {
  const params = new URLSearchParams({
    class: paper.class || 'Class 9',
    subject: paper.subject || 'AI',
    paper: revisionPaperKey(paper)
  });
  return `detail.html?${params}`;
}

function revisionPaperFileUrl(value) {
  const url = String(value || '');
  if (/^https?:\/\//.test(url)) return url;
  return `../../${url.replace(/^(\.\.\/)+/, '').replace(/^\/+/, '')}`;
}

function renderRevisionShareActions(url, title) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title || 'TechLearners revision paper');
  return `<div class="share-actions" aria-label="Revision paper sharing options">
    <button class="btn small secondary" type="button" data-share-revision-paper="${escapeRevisionHtml(url)}" data-share-title="${escapeRevisionHtml(title)}">Share paper</button>
    <button class="btn small secondary" type="button" data-copy-revision-paper="${escapeRevisionHtml(url)}">Copy link</button>
    <a class="btn small secondary" href="https://wa.me/?text=${encodedTitle}%20${encodedUrl}" target="_blank" rel="noopener">WhatsApp</a>
  </div>`;
}

function setupRevisionPaperHandlers(scope = document) {
  scope.querySelectorAll('[data-share-revision-paper]').forEach(button => button.addEventListener('click', () => shareRevisionPaperUrl(button.dataset.shareRevisionPaper, button.dataset.shareTitle)));
  scope.querySelectorAll('[data-copy-revision-paper]').forEach(button => button.addEventListener('click', async () => {
    await navigator.clipboard.writeText(button.dataset.copyRevisionPaper);
    alert('Revision-paper link copied.');
  }));
  scope.querySelectorAll('[data-collapse-revision]').forEach(button => button.addEventListener('click', () => {
    const details = button.closest('details');
    if (details) details.open = false;
  }));
}

function loadRevisionPaperDetail() {
  const box = document.getElementById('revisionPaperDetail');
  if (!box) return;
  const params = new URLSearchParams(location.search);
  const className = params.get('class') || 'Class 9';
  const subject = params.get('subject') || 'AI';
  const selectedKey = params.get('paper') || '';
  box.innerHTML = '<p class="muted">Loading revision paper...</p>';

  TechLearnersContent.get('revisionPapers', '../../data').then(data => {
    const papers = data.filter(paper => paper.class === className && (paper.subject || 'AI') === subject)
      .sort((a, b) => revisionPaperKey(a).localeCompare(revisionPaperKey(b)));
    const selectedIndex = papers.findIndex(paper => revisionPaperKey(paper) === selectedKey);
    const index = selectedIndex >= 0 ? selectedIndex : 0;
    const paper = papers[index];
    if (!paper) {
      box.innerHTML = '<div class="notice">This revision paper could not be found. Please open it again from the revision paper library.</div>';
      return;
    }

    document.title = `${paper.title} | TechLearners`;
    const listUrl = `index.html?${new URLSearchParams({ class: paper.class, subject: paper.subject || 'AI' })}#browseRevisionPapers`;
    const previous = papers[index - 1];
    const next = papers[index + 1];
    const currentUrl = location.href;
    box.innerHTML = `
      <nav class="resource-nav" aria-label="Revision paper navigation">
        <a href="../../">Home</a><span>/</span><a href="${escapeRevisionHtml(listUrl)}">Revision Papers</a><span>/</span><b>${escapeRevisionHtml(paper.title)}</b>
      </nav>
      <article class="card detail-card">
        <p class="tag">${escapeRevisionHtml(displayRevisionClassName(paper.class))} ${escapeRevisionHtml(paper.subject || 'AI')} ${escapeRevisionHtml(paper.testType || 'Revision Test')}</p>
        <h1>${escapeRevisionHtml(paper.title)}</h1>
        <div class="rich-text-content">${renderRevisionRichText(paper.description)}</div>
        <div class="note-content rich-text-content">${renderRevisionRichText(paper.content)}</div>
        <div class="detail-actions">
          ${paper.file ? `<a class="btn" href="${escapeRevisionHtml(revisionPaperFileUrl(paper.file))}" target="_blank" rel="noopener">Open revision paper file</a>` : ''}
          <a class="btn secondary" href="${escapeRevisionHtml(listUrl)}">Back to revision papers</a>
          <a class="btn secondary" href="../notes/index.html?${new URLSearchParams({ class: paper.class, subject: paper.subject || 'AI' })}#browseNotes">Related notes</a>
          <a class="btn secondary" href="../quizzes/index.html?${new URLSearchParams({ class: paper.class, subject: paper.subject || 'AI' })}">Related MCQs</a>
        </div>
        ${renderRevisionShareActions(currentUrl, paper.title)}
      </article>
      <div class="detail-actions detail-pager">
        ${previous ? `<a class="btn small secondary" href="${escapeRevisionHtml(revisionPaperDetailUrl(previous))}">Previous paper</a>` : ''}
        ${next ? `<a class="btn small" href="${escapeRevisionHtml(revisionPaperDetailUrl(next))}">Next paper</a>` : ''}
      </div>`;
    setupRevisionPaperHandlers(box);
    requestAnimationFrame(() => {
      box.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }).catch(error => {
    box.innerHTML = `<div class="notice">${escapeRevisionHtml(error.message || 'Unable to load this revision paper.')}</div>`;
  });
}

function scrollToRevisionPaperBrowser() {
  const target = document.getElementById('browseRevisionPapers') || document.getElementById('revisionPapersList');
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - 90;
  window.setTimeout(() => window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' }), 80);
}

document.addEventListener('click', event => {
  const link = event.target.closest('.revision-paper-jump');
  if (!link) return;
  const url = new URL(link.href, location.href);
  if (url.pathname !== location.pathname) return;
  event.preventDefault();
  const className = url.searchParams.get('class') || 'Class 9';
  const subject = url.searchParams.get('subject') || 'AI';
  history.replaceState(null, '', `${location.pathname}?${new URLSearchParams({ class: className, subject })}#browseRevisionPapers`);
  loadRevisionPapers(className, subject);
  scrollToRevisionPaperBrowser();
});

function displayRevisionClassName(value) {
  return /^CBSE\s/i.test(String(value || '')) ? String(value || '') : `CBSE ${value}`;
}

function escapeRevisionHtml(value) {
  return String(value || '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[character]);
}

function renderRevisionRichText(value) {
  const raw = String(value || '');
  if (!/<\/?(?:a|b|blockquote|br|div|em|h2|h3|i|li|ol|p|strong|u|ul)\b/i.test(raw)) {
    return escapeRevisionHtml(raw).replace(/\n/g, '<br>');
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

async function shareRevisionPaperUrl(url, title) {
  try {
    if (navigator.share) await navigator.share({ title, url });
    else {
      await navigator.clipboard.writeText(url);
      alert('Revision-paper link copied.');
    }
  } catch (error) {
    if (error.name !== 'AbortError') prompt('Copy this revision-paper link:', url);
  }
}
