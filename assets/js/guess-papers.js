(async () => {
  let activeSubject = 'AI';
  let allPapers = [];
  let currentPaper = null;

  const query = new URLSearchParams(location.search);
  if (query.get('subject') === 'IT') {
    activeSubject = 'IT';
  }

  // DOM Elements
  const paperTitle = document.getElementById('paperTitle');
  const paperDesc = document.getElementById('paperDesc');
  const maxMarks = document.getElementById('maxMarks');
  const timeDuration = document.getElementById('timeDuration');
  const instructionsList = document.getElementById('instructionsList');
  const sectionsContainer = document.getElementById('sectionsContainer');
  const filterButtons = document.querySelectorAll('.guess-filter');

  const escapeHtml = value => String(value || '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[character]);

  function updateFilterUI() {
    filterButtons.forEach(button => {
      const isSelected = button.dataset.subject === activeSubject;
      button.classList.toggle('secondary', !isSelected);
      button.setAttribute('aria-pressed', String(isSelected));
    });
  }

  function updateUrl() {
    const params = new URLSearchParams({ subject: activeSubject });
    history.replaceState(null, '', `${location.pathname}?${params}`);
  }

  function renderPaper() {
    currentPaper = allPapers.find(p => p.class === 'Class 10' && p.subject === activeSubject);
    if (!currentPaper) {
      paperTitle.textContent = 'Guess Paper Not Found';
      paperDesc.textContent = 'Sorry, the requested guess paper is not available yet.';
      maxMarks.textContent = '-';
      timeDuration.textContent = '-';
      instructionsList.innerHTML = '<li>No instructions available.</li>';
      sectionsContainer.innerHTML = '';
      return;
    }

    // Header & Info
    paperTitle.textContent = currentPaper.title;
    paperDesc.textContent = currentPaper.description;
    maxMarks.textContent = `${currentPaper.maxMarks} Marks`;
    timeDuration.textContent = currentPaper.time;

    // Instructions
    instructionsList.innerHTML = currentPaper.instructions.map(inst => `<li>${escapeHtml(inst)}</li>`).join('');

    // Sections & Questions
    sectionsContainer.innerHTML = currentPaper.sections.map((section, sIdx) => {
      const qHtml = section.questions.map((q, qIdx) => {
        const optionLetters = ['A', 'B', 'C', 'D'];
        let optionsHtml = '';
        if (q.type === 'objective' && q.options) {
          optionsHtml = `<div class="options-container">
            ${q.options.map((opt, oIdx) => {
              const isCorrectOption = opt === q.answer;
              return `
                <div class="option-pill ${isCorrectOption ? 'correct-option' : ''}">
                  <span class="option-marker">${optionLetters[oIdx]}.</span>
                  <span>${escapeHtml(opt)}</span>
                </div>
              `;
            }).join('')}
          </div>`;
        }

        return `
          <div class="question-card" id="q-card-${q.id}">
            <div class="question-header">
              <div class="question-meta">
                <span class="question-num">Question ${qIdx + 1}</span>
                <span class="marks-badge">${q.marks} Mark${q.marks > 1 ? 's' : ''}</span>
              </div>
              <button class="btn small secondary reveal-btn" type="button" data-q-id="${q.id}">Reveal Answer</button>
            </div>
            <div class="question-text">${q.text}</div>
            ${optionsHtml}
            <div class="answer-panel" id="ans-panel-${q.id}">
              <div class="answer-content">
                <span class="answer-title">Model Answer:</span>
                <div>${q.answer}</div>
                ${q.explanation ? `<div class="explanation-block"><strong>Explanation:</strong> ${escapeHtml(q.explanation)}</div>` : ''}
              </div>
            </div>
          </div>
        `;
      }).join('');

      return `
        <div class="guess-section">
          <h2 class="guess-section-title">${escapeHtml(section.name)}</h2>
          <div class="question-list">
            ${qHtml}
          </div>
        </div>
      `;
    }).join('');

    // Rebind toggles
    setupRevealToggles();
  }

  function setupRevealToggles() {
    document.querySelectorAll('.reveal-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const qId = btn.dataset.qId;
        const panel = document.getElementById(`ans-panel-${qId}`);
        if (panel) {
          const isHidden = panel.style.display === '' || panel.style.display === 'none';
          panel.style.display = isHidden ? 'block' : 'none';
          btn.textContent = isHidden ? 'Hide Answer' : 'Reveal Answer';
          btn.classList.toggle('secondary', !isHidden);

          const card = document.getElementById(`q-card-${qId}`);
          if (card) {
            card.classList.toggle('revealed', isHidden);
          }
        }
      });
    });
  }

  // Global Actions
  document.getElementById('expandAllBtn').addEventListener('click', () => {
    document.querySelectorAll('.answer-panel').forEach(panel => {
      panel.style.display = 'block';
    });
    document.querySelectorAll('.reveal-btn').forEach(btn => {
      btn.textContent = 'Hide Answer';
      btn.classList.remove('secondary');
    });
    document.querySelectorAll('.question-card').forEach(card => {
      card.classList.add('revealed');
    });
  });

  document.getElementById('collapseAllBtn').addEventListener('click', () => {
    document.querySelectorAll('.answer-panel').forEach(panel => {
      panel.style.display = 'none';
    });
    document.querySelectorAll('.reveal-btn').forEach(btn => {
      btn.textContent = 'Reveal Answer';
      btn.classList.add('secondary');
    });
    document.querySelectorAll('.question-card').forEach(card => {
      card.classList.remove('revealed');
    });
  });

  document.getElementById('printBtn').addEventListener('click', () => {
    // Expand all answers in DOM to ensure they render completely for print (Chrome PDF renderer friendly)
    const panels = document.querySelectorAll('.answer-panel');
    const buttons = document.querySelectorAll('.reveal-btn');
    const cards = document.querySelectorAll('.question-card');
    
    // Store original visibility state of each panel
    const originalStates = [];
    panels.forEach(panel => {
      originalStates.push(panel.style.display);
      panel.style.display = 'block';
    });
    
    const originalButtonTexts = [];
    buttons.forEach(btn => {
      originalButtonTexts.push(btn.textContent);
      btn.textContent = 'Hide Answer';
      btn.classList.remove('secondary');
    });

    const originalCardRevealed = [];
    cards.forEach(card => {
      originalCardRevealed.push(card.classList.contains('revealed'));
      card.classList.add('revealed');
    });

    // Open browser print layout (blocks thread till print preview is generated/closed)
    window.print();

    // Restore original visibility state after printing dialog closes
    panels.forEach((panel, index) => {
      panel.style.display = originalStates[index];
    });
    buttons.forEach((btn, index) => {
      btn.textContent = originalButtonTexts[index];
      if (originalButtonTexts[index] === 'Reveal Answer') {
        btn.classList.add('secondary');
      } else {
        btn.classList.remove('secondary');
      }
    });
    cards.forEach((card, index) => {
      if (originalCardRevealed[index]) {
        card.classList.add('revealed');
      } else {
        card.classList.remove('revealed');
      }
    });
  });

  document.getElementById('shareBtn').addEventListener('click', async () => {
    const url = window.location.href;
    const title = currentPaper ? currentPaper.title : 'CBSE Class 10 Guess Papers';
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        alert('Guess paper link copied to clipboard.');
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        prompt('Copy this guess paper link:', url);
      }
    }
  });

  // Filter Buttons Event Listeners
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      activeSubject = button.dataset.subject;
      updateFilterUI();
      updateUrl();
      renderPaper();
    });
  });

  // Load Data
  updateFilterUI();
  TechLearnersContent.get('guessPapers', '../../data')
    .then(data => {
      allPapers = data;
      renderPaper();
    })
    .catch(error => {
      sectionsContainer.innerHTML = `<div class="notice">Error loading guess papers: ${escapeHtml(error.message)}</div>`;
    });
})();
