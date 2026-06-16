function loadQuestionPapers(className, subject = 'AI') {
  const box = document.getElementById('papersList');
  const title = document.getElementById('papersTitle');
  title.textContent = `${displayPaperClassName(className)} ${subject} Sample Papers`;
  box.innerHTML = '<p class="muted">Choose from the available sample papers below.</p>';
  box.classList.add('paper-results');
  document.querySelectorAll('.paper-filter').forEach(button => {
    const selected = button.dataset.class === className && button.dataset.subject === subject;
    button.classList.toggle('secondary', !selected);
    button.setAttribute('aria-pressed', String(selected));
  });

  const params = new URLSearchParams({ class: className, subject });
  history.replaceState(null, '', `${location.pathname}?${params}${location.hash === '#browsePapers' ? '#browsePapers' : ''}`);

  TechLearnersContent.get('questionPapers', '../../data').then(data => {
    const papers = data.filter(paper => paper.class === className && (paper.subject || 'AI') === subject)
      .sort((a, b) => Number(b.year || 0) - Number(a.year || 0));
    box.innerHTML = papers.length ? papers.map(paper => {
      const detailUrl = paperDetailUrl(paper);
      const shareUrl = new URL(detailUrl, location.href);
      return `<article class="card paper-card">
        <div class="paper-card-head">
          <span class="paper-year-badge">${escapePaperHtml(paper.year)}</span>
          <span class="paper-subject-tag">${escapePaperHtml(paper.subject || 'AI')}</span>
        </div>
        <h2>${escapePaperHtml(paper.title)}</h2>
        <div class="rich-text-content">${renderPaperRichText(paper.description)}</div>
        <div class="note-actions"><a class="btn small" href="${escapePaperHtml(detailUrl)}" target="_blank" rel="noopener">Click Here</a><button class="btn small secondary" type="button" data-share-paper="${escapePaperHtml(shareUrl.href)}" data-share-title="${escapePaperHtml(paper.title)}">Share</button></div>
      </article>`;
    }).join('') : '<div class="notice">No sample papers have been published for this selection yet. Please check again later.</div>';
    box.querySelectorAll('[data-share-paper]').forEach(button => button.addEventListener('click', () => sharePaperUrl(button.dataset.sharePaper, button.dataset.shareTitle)));
    if (document.activeElement?.classList.contains('paper-filter') || location.hash === '#browsePapers') {
      scrollToPaperBrowser();
    }
  }).catch(error => {
    box.textContent = error.message || 'Unable to load sample papers.';
  });
}

function paperKey(paper) {
  return paper.id || `${paper.class}|${paper.subject || 'AI'}|${paper.year || ''}|${paper.title || ''}`;
}

function paperDetailUrl(paper) {
  const params = new URLSearchParams({
    class: paper.class || 'Class 9',
    subject: paper.subject || 'AI',
    paper: paperKey(paper)
  });
  return `detail.html?${params}`;
}

function paperFileUrl(value) {
  const url = String(value || '');
  if (/^https?:\/\//.test(url)) return url;
  return `../../${url.replace(/^(\.\.\/)+/, '').replace(/^\/+/, '')}`;
}

function renderPaperShareActions(url, title) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title || 'TechLearners sample paper');
  return `<div class="share-actions" aria-label="Sample paper sharing options">
    <button class="btn small secondary" type="button" data-share-paper="${escapePaperHtml(url)}" data-share-title="${escapePaperHtml(title)}">Share paper</button>
    <button class="btn small secondary" type="button" data-copy-paper="${escapePaperHtml(url)}">Copy link</button>
    <a class="btn small secondary" href="https://wa.me/?text=${encodedTitle}%20${encodedUrl}" target="_blank" rel="noopener">WhatsApp</a>
  </div>`;
}

function setupPaperShareHandlers(scope = document) {
  scope.querySelectorAll('[data-share-paper]').forEach(button => button.addEventListener('click', () => sharePaperUrl(button.dataset.sharePaper, button.dataset.shareTitle)));
  scope.querySelectorAll('[data-copy-paper]').forEach(button => button.addEventListener('click', async () => {
    await navigator.clipboard.writeText(button.dataset.copyPaper);
    alert('Sample-paper link copied.');
  }));
}

function loadPaperDetail() {
  const box = document.getElementById('paperDetail');
  if (!box) return;
  const params = new URLSearchParams(location.search);
  const className = params.get('class') || 'Class 9';
  const subject = params.get('subject') || 'AI';
  const selectedKey = params.get('paper') || '';
  box.innerHTML = '<p class="muted">Loading sample paper...</p>';

  TechLearnersContent.get('questionPapers', '../../data').then(data => {
    const papers = data.filter(paper => paper.class === className && (paper.subject || 'AI') === subject)
      .sort((a, b) => Number(b.year || 0) - Number(a.year || 0));
    const selectedIndex = papers.findIndex(paper => paperKey(paper) === selectedKey);
    const index = selectedIndex >= 0 ? selectedIndex : 0;
    const paper = papers[index];
    if (!paper) {
      box.innerHTML = '<div class="notice">This sample paper could not be found. Please open it again from the sample papers library.</div>';
      return;
    }

    document.title = `${paper.title} | TechLearners`;
    const listUrl = `index.html?${new URLSearchParams({ class: paper.class, subject: paper.subject || 'AI' })}#browsePapers`;
    const previous = papers[index - 1];
    const next = papers[index + 1];
    const currentUrl = location.href;
    box.innerHTML = `
      <nav class="resource-nav" aria-label="Sample paper navigation">
        <a href="../../">Home</a><span>/</span><a href="${escapePaperHtml(listUrl)}">Sample Papers</a><span>/</span><b>${escapePaperHtml(paper.title)}</b>
      </nav>
      <article class="card detail-card">
        <p class="tag">${escapePaperHtml(displayPaperClassName(paper.class))} ${escapePaperHtml(paper.subject || 'AI')} ${escapePaperHtml(paper.year || '')}</p>
        <h1>${escapePaperHtml(paper.title)}</h1>
        <div class="rich-text-content">${renderPaperRichText(paper.description)}</div>
        <div class="detail-actions">
          <a class="btn" href="${escapePaperHtml(paperFileUrl(paper.file))}" target="_blank" rel="noopener">Open sample paper file</a>
          <a class="btn secondary" href="${escapePaperHtml(listUrl)}">Back to sample papers</a>
          <a class="btn secondary" href="../notes/index.html?${new URLSearchParams({ class: paper.class, subject: paper.subject || 'AI' })}#browseNotes">Related notes</a>
          <a class="btn secondary" href="../quizzes/index.html?${new URLSearchParams({ class: paper.class, subject: paper.subject || 'AI' })}">Related MCQs</a>
        </div>
        ${renderPaperShareActions(currentUrl, paper.title)}
      </article>
      <div class="detail-actions detail-pager">
        ${previous ? `<a class="btn small secondary" href="${escapePaperHtml(paperDetailUrl(previous))}">Previous paper</a>` : ''}
        ${next ? `<a class="btn small" href="${escapePaperHtml(paperDetailUrl(next))}">Next paper</a>` : ''}
      </div>`;
    setupPaperShareHandlers(box);
  }).catch(error => {
    box.innerHTML = `<div class="notice">${escapePaperHtml(error.message || 'Unable to load this sample paper.')}</div>`;
  });
}

function scrollToPaperBrowser() {
  const target = document.getElementById('browsePapers') || document.getElementById('papersList');
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - 90;
  window.setTimeout(() => window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' }), 80);
}

document.addEventListener('click', event => {
  const link = event.target.closest('.paper-jump');
  if (!link) return;
  const url = new URL(link.href, location.href);
  if (url.pathname !== location.pathname) return;
  event.preventDefault();
  const className = url.searchParams.get('class') || 'Class 9';
  const subject = url.searchParams.get('subject') || 'AI';
  history.replaceState(null, '', `${location.pathname}?${new URLSearchParams({ class: className, subject })}#browsePapers`);
  loadQuestionPapers(className, subject);
  scrollToPaperBrowser();
});

function displayPaperClassName(value) {
  return /^CBSE\s/i.test(String(value || '')) ? String(value || '') : `CBSE ${value}`;
}

function escapePaperHtml(value) {
  return String(value || '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[character]);
}

function renderPaperRichText(value) {
  const raw = String(value || '');
  if (!/<\/?(?:a|b|blockquote|br|div|em|h2|h3|i|li|ol|p|strong|u|ul)\b/i.test(raw)) {
    return escapePaperHtml(raw).replace(/\n/g, '<br>');
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

async function sharePaperUrl(url, title) {
  try {
    if (navigator.share) await navigator.share({ title, url });
    else {
      await navigator.clipboard.writeText(url);
      alert('Sample-paper link copied.');
    }
  } catch (error) {
    if (error.name !== 'AbortError') prompt('Copy this sample-paper link:', url);
  }
}
