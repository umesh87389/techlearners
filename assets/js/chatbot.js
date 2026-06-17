(async () => {
  // Determine relative path prefix to load data and assets correctly
  let pathPrefix = '';
  const rootIndex = window.location.pathname.indexOf('/pages/');
  if (rootIndex !== -1) {
    const depth = window.location.pathname.substring(rootIndex).split('/').length - 2;
    pathPrefix = '../'.repeat(depth);
  }

  // Inject CSS Styles
  const style = document.createElement('style');
  style.textContent = `
    /* Floating Icon */
    .tl-chat-trigger {
      position: fixed;
      bottom: 24px;
      right: 88px;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
      box-shadow: 0 8px 32px rgba(79, 172, 254, 0.45), 0 0 0 4px rgba(79, 172, 254, 0.15);
      border: none;
      cursor: pointer;
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
      animation: tl-float 3s ease-in-out infinite;
    }
    .tl-chat-trigger:hover {
      transform: scale(1.1) rotate(5deg);
      box-shadow: 0 10px 40px rgba(79, 172, 254, 0.65), 0 0 0 6px rgba(79, 172, 254, 0.25);
    }
    .tl-chat-trigger:active {
      transform: scale(0.95);
    }
    .tl-chat-trigger svg {
      width: 26px;
      height: 26px;
      fill: #fff;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .tl-chat-trigger.active svg {
      transform: rotate(90deg) scale(0.8);
    }

    /* Ripple Pulse Animation */
    .tl-chat-trigger::before, .tl-chat-trigger::after {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 2px solid #00f2fe;
      opacity: 0.8;
      animation: tl-ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
      pointer-events: none;
    }
    .tl-chat-trigger::after {
      animation-delay: 1.25s;
    }

    @keyframes tl-float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
    @keyframes tl-ping {
      75%, 100% {
        transform: scale(1.4);
        opacity: 0;
      }
    }

    /* Chat Widget Container */
    .tl-chat-widget {
      position: fixed;
      bottom: 96px;
      right: 24px;
      width: 380px;
      height: 580px;
      max-height: calc(100vh - 120px);
      max-width: calc(100vw - 48px);
      border-radius: 24px;
      background: rgba(15, 23, 42, 0.88);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(59, 130, 246, 0.3);
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45), 0 0 40px rgba(59, 130, 246, 0.2);
      z-index: 99999;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      opacity: 0;
      transform: scale(0.9) translateY(20px);
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      overscroll-behavior: contain;
    }
    .tl-chat-widget.active {
      opacity: 1;
      transform: scale(1) translateY(0);
      pointer-events: auto;
    }

    /* Header */
    .tl-chat-header {
      padding: 16px 20px;
      background: linear-gradient(90deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.8));
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .tl-chat-header-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .tl-chat-header-avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 10px rgba(0, 242, 254, 0.3);
    }
    .tl-chat-header-avatar svg {
      width: 22px;
      height: 22px;
      fill: #fff;
    }
    .tl-chat-header-title h3 {
      margin: 0;
      font-size: 0.95rem;
      font-weight: 800;
      color: #fff;
      letter-spacing: 0.02em;
    }
    .tl-chat-status {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 2px;
    }
    .tl-chat-status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 8px #10b981;
      animation: tl-pulse 2s infinite;
    }
    .tl-chat-status-text {
      font-size: 0.72rem;
      color: rgba(255, 255, 255, 0.5);
      font-weight: 600;
    }
    .tl-chat-close {
      background: transparent;
      border: none;
      color: rgba(255, 255, 255, 0.6);
      cursor: pointer;
      font-size: 1.2rem;
      padding: 4px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }
    .tl-chat-close:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
    }

    /* Messages Area */
    .tl-chat-messages {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
      scroll-behavior: smooth;
      overscroll-behavior: contain;
    }
    /* Scrollbar */
    .tl-chat-messages::-webkit-scrollbar {
      width: 6px;
    }
    .tl-chat-messages::-webkit-scrollbar-track {
      background: transparent;
    }
    .tl-chat-messages::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 99px;
    }
    .tl-chat-messages::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    /* Bubbles */
    .tl-message {
      display: flex;
      gap: 10px;
      max-width: 85%;
      animation: tl-fade-in 0.3s ease-out forwards;
    }
    .tl-message.user {
      align-self: flex-end;
      flex-direction: row-reverse;
    }
    .tl-message.bot {
      align-self: flex-start;
    }
    .tl-message-avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .tl-message-avatar svg {
      width: 14px;
      height: 14px;
      fill: rgba(255,255,255,0.7);
    }
    .tl-message-content {
      padding: 12px 16px;
      border-radius: 18px;
      font-size: 0.88rem;
      line-height: 1.45;
      color: rgba(255, 255, 255, 0.95);
    }
    .tl-message.user .tl-message-content {
      background: linear-gradient(135deg, #006874, #0054b4);
      border-bottom-right-radius: 4px;
      box-shadow: 0 4px 12px rgba(0, 84, 180, 0.25);
    }
    .tl-message.bot .tl-message-content {
      background: rgba(30, 41, 59, 0.7);
      border-bottom-left-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.06);
    }

    /* Typing Indicator */
    .tl-typing-dots {
      display: flex;
      gap: 5px;
      align-items: center;
      height: 20px;
      padding: 0 6px;
    }
    .tl-typing-dot {
      width: 6px;
      height: 6px;
      background: rgba(255, 255, 255, 0.75);
      border-radius: 50%;
      animation: tl-bounce 1.4s infinite ease-in-out both;
    }
    .tl-typing-dot:nth-child(1) { animation-delay: -0.32s; }
    .tl-typing-dot:nth-child(2) { animation-delay: -0.16s; }

    /* Action Links and Cards in Bot Response */
    .tl-bot-cards-container {
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
    }
    .tl-bot-card {
      padding: 12px 14px;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      flex-direction: column;
      gap: 4px;
      transition: all 0.2s ease;
    }
    .tl-bot-card:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(0, 242, 254, 0.4);
    }
    .tl-bot-card-title {
      font-weight: 700;
      color: #fff;
      font-size: 0.85rem;
    }
    .tl-bot-card-desc {
      font-size: 0.78rem;
      color: rgba(255, 255, 255, 0.65);
      line-height: 1.35;
    }
    .tl-bot-card-meta {
      font-size: 0.68rem;
      color: #00f2fe;
      text-transform: uppercase;
      font-weight: 800;
      letter-spacing: 0.04em;
    }
    .tl-bot-card-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: #3b82f6;
      text-decoration: none;
      font-weight: 700;
      font-size: 0.82rem;
      margin-top: 4px;
      transition: color 0.2s ease;
    }
    .tl-bot-card-link:hover {
      color: #00f2fe;
      text-decoration: underline;
    }

    /* Suggestion Chips Box */
    .tl-chat-suggestions {
      padding: 10px 16px;
      display: flex;
      gap: 8px;
      overflow-x: auto;
      white-space: nowrap;
      background: rgba(15, 23, 42, 0.6);
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      flex-shrink: 0;
    }
    .tl-chat-suggestions::-webkit-scrollbar {
      display: none;
    }
    .tl-suggestion-chip {
      padding: 6px 14px;
      border-radius: 99px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.85);
      font-size: 0.78rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .tl-suggestion-chip:hover {
      background: rgba(59, 130, 246, 0.18);
      border-color: rgba(59, 130, 246, 0.45);
      color: #fff;
      transform: translateY(-1px);
    }

    /* Input Form */
    .tl-chat-input-form {
      padding: 14px 16px;
      background: rgba(15, 23, 42, 0.85);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      gap: 10px;
      align-items: center;
      flex-shrink: 0;
    }
    .tl-chat-input {
      flex: 1;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 99px;
      padding: 10px 18px;
      color: #fff;
      font-size: 0.88rem;
      transition: all 0.2s ease;
    }
    .tl-chat-input:focus {
      outline: none;
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(59, 130, 246, 0.6);
      box-shadow: 0 0 10px rgba(59, 130, 246, 0.25);
    }
    .tl-chat-send {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }
    .tl-chat-send:hover {
      transform: scale(1.05);
      box-shadow: 0 0 12px rgba(0, 242, 254, 0.5);
    }
    .tl-chat-send:active {
      transform: scale(0.95);
    }
    .tl-chat-send svg {
      width: 18px;
      height: 18px;
      fill: #fff;
      margin-left: 2px;
    }

    @keyframes tl-pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.2); opacity: 0.6; }
    }
    @keyframes tl-bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1.0); }
    }
    @keyframes tl-fade-in {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 700px) {
      .tl-chat-trigger {
        right: 76px;
        bottom: 16px;
        width: 50px;
        height: 50px;
      }
      .tl-chat-widget {
        right: 16px;
        bottom: 78px;
        max-width: calc(100vw - 32px);
        max-height: calc(100vh - 100px);
      }
    }
  `;
  document.head.appendChild(style);

  // SVG Icons
  const botIcon = `<svg viewBox="0 0 24 24"><path d="M12 2a2 2 0 012 2v1h3a3 3 0 013 3v8a3 3 0 01-3 3h-3v1a2 2 0 01-2 2h-4a2 2 0 01-2-2v-1H7a3 3 0 01-3-3V8a3 3 0 013-3h3V4a2 2 0 012-2h2zm4 7h-2v2h2V9zm-6 0H8v2h2V9zm2 4H8v2h8v-2h-4z"/></svg>`;
  const chatBubbleIcon = `<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>`;
  const closeIcon = `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/></svg>`;
  const sendIcon = `<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>`;

  // Create trigger button
  const trigger = document.createElement('button');
  trigger.className = 'tl-chat-trigger';
  trigger.setAttribute('aria-label', 'Open support chat');
  trigger.innerHTML = chatBubbleIcon;
  document.body.appendChild(trigger);

  // Create chat widget
  const widget = document.createElement('div');
  widget.className = 'tl-chat-widget';
  widget.innerHTML = `
    <div class="tl-chat-header">
      <div class="tl-chat-header-info">
        <div class="tl-chat-header-avatar">${botIcon}</div>
        <div class="tl-chat-header-title">
          <h3>TechLearners Assistant</h3>
          <div class="tl-chat-status">
            <span class="tl-chat-status-dot"></span>
            <span class="tl-chat-status-text">Online Study AI</span>
          </div>
        </div>
      </div>
      <button class="tl-chat-close" aria-label="Close chat">${closeIcon}</button>
    </div>
    <div class="tl-chat-messages" id="tlChatMessages"></div>
    <div class="tl-chat-suggestions" id="tlChatSuggestions"></div>
    <form class="tl-chat-input-form" id="tlChatInputForm">
      <input type="text" class="tl-chat-input" id="tlChatInput" placeholder="Ask about chapters, notes, papers..." autocomplete="off">
      <button type="submit" class="tl-chat-send" aria-label="Send message">${sendIcon}</button>
    </form>
  `;
  document.body.appendChild(widget);

  const messagesContainer = document.getElementById('tlChatMessages');
  const suggestionsContainer = document.getElementById('tlChatSuggestions');
  const inputForm = document.getElementById('tlChatInputForm');
  const chatInput = document.getElementById('tlChatInput');

  // Draggable logic for the trigger button
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let initialLeft = 0;
  let initialTop = 0;
  let hasMoved = false;

  trigger.addEventListener('mousedown', dragStart);
  trigger.addEventListener('touchstart', dragStart, { passive: true });

  function dragStart(e) {
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

    isDragging = true;
    hasMoved = false;
    dragStartX = clientX;
    dragStartY = clientY;

    const rect = trigger.getBoundingClientRect();
    initialLeft = rect.left;
    initialTop = rect.top;

    trigger.style.bottom = 'auto';
    trigger.style.right = 'auto';
    trigger.style.left = initialLeft + 'px';
    trigger.style.top = initialTop + 'px';
    trigger.style.animation = 'none';

    if (e.type === 'mousedown') {
      document.addEventListener('mousemove', dragMove);
      document.addEventListener('mouseup', dragEnd);
    } else {
      document.addEventListener('touchmove', dragMove, { passive: false });
      document.addEventListener('touchend', dragEnd);
    }
  }

  function dragMove(e) {
    if (!isDragging) return;
    if (e.cancelable) e.preventDefault();

    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - dragStartX;
    const deltaY = clientY - dragStartY;

    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      hasMoved = true;
    }

    let newLeft = initialLeft + deltaX;
    let newTop = initialTop + deltaY;

    const padding = 10;
    const maxLeft = window.innerWidth - trigger.offsetWidth - padding;
    const maxTop = window.innerHeight - trigger.offsetHeight - padding;

    newLeft = Math.max(padding, Math.min(newLeft, maxLeft));
    newTop = Math.max(padding, Math.min(newTop, maxTop));

    trigger.style.left = newLeft + 'px';
    trigger.style.top = newTop + 'px';
  }

  function dragEnd() {
    isDragging = false;
    trigger.style.animation = 'tl-float 3s ease-in-out infinite';

    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('mouseup', dragEnd);
    document.removeEventListener('touchmove', dragMove);
    document.removeEventListener('touchend', dragEnd);

    if (widget.classList.contains('active')) {
      repositionWidget();
    }
  }

  function repositionWidget() {
    const triggerRect = trigger.getBoundingClientRect();
    const widgetWidth = 380;
    const widgetHeight = 580;
    const padding = 16;

    let widgetLeft = triggerRect.left + (triggerRect.width / 2) - (widgetWidth / 2);
    let widgetTop = triggerRect.top - widgetHeight - padding;

    if (widgetLeft < padding) widgetLeft = padding;
    if (widgetLeft + widgetWidth > window.innerWidth - padding) {
      widgetLeft = window.innerWidth - widgetWidth - padding;
    }

    if (widgetTop < padding) {
      widgetTop = triggerRect.bottom + padding;
    }
    if (widgetTop + widgetHeight > window.innerHeight - padding) {
      widgetTop = window.innerHeight - widgetHeight - padding;
    }

    widget.style.bottom = 'auto';
    widget.style.right = 'auto';
    widget.style.left = widgetLeft + 'px';
    widget.style.top = widgetTop + 'px';
  }

  window.addEventListener('resize', () => {
    if (widget.classList.contains('active')) {
      repositionWidget();
    }
  });

  // Toggle chat widget
  trigger.addEventListener('click', (e) => {
    if (hasMoved) {
      e.stopImmediatePropagation();
      e.preventDefault();
      hasMoved = false;
      return;
    }
    const isActive = widget.classList.toggle('active');
    trigger.classList.toggle('active', isActive);
    trigger.innerHTML = isActive ? closeIcon : chatBubbleIcon;
    if (isActive) {
      repositionWidget();
      chatInput.focus();
      if (messagesContainer.children.length === 0) {
        showWelcome();
      }
    }
  });

  widget.querySelector('.tl-chat-close').addEventListener('click', () => {
    widget.classList.remove('active');
    trigger.classList.remove('active');
    trigger.innerHTML = chatBubbleIcon;
  });

  // Prevent scroll propagation to body/main page
  widget.addEventListener('wheel', (e) => {
    e.stopPropagation();
  }, { passive: true });

  widget.addEventListener('touchmove', (e) => {
    e.stopPropagation();
  }, { passive: true });

  // Website Content Index
  let searchIndex = {
    chapters: [],
    notes: [],
    papers: [],
    quizzes: []
  };
  let isIndexed = false;

  let chatFlowState = {
    step: 'none', // 'none', 'waiting_for_menu', 'waiting_for_class'
    choice: null, // 'notes', 'mcqs', 'papers', 'chapters'
    selectedClass: null // 'class 9', 'class 10'
  };

  async function buildSearchIndex() {
    if (isIndexed || typeof TechLearnersContent === 'undefined') return;
    try {
      const [chapters, notes, papers, quizzes] = await Promise.all([
        TechLearnersContent.get('chapters', pathPrefix + 'data').catch(() => []),
        TechLearnersContent.get('notes', pathPrefix + 'data').catch(() => []),
        TechLearnersContent.get('questionPapers', pathPrefix + 'data').catch(() => []),
        TechLearnersContent.get('quizzes', pathPrefix + 'data').catch(() => [])
      ]);

      searchIndex.chapters = chapters || [];
      searchIndex.notes = notes || [];
      searchIndex.papers = papers || [];
      searchIndex.quizzes = quizzes || [];
      isIndexed = true;
    } catch (error) {
      console.error('Error indexing website content:', error);
    }
  }

  // UI Helpers
  function updateHeader(className = null) {
    const headerTitle = widget.querySelector('.tl-chat-header-title h3');
    const headerStatus = widget.querySelector('.tl-chat-status-text');
    if (!headerTitle || !headerStatus) return;
    if (className) {
      const clsUpper = className.toUpperCase();
      headerTitle.innerHTML = `TechLearners Assistant <span style="color:#00f2fe;font-size:0.85em;">(${clsUpper})</span>`;
      headerStatus.textContent = `${clsUpper} Mode Active`;
    } else {
      headerTitle.textContent = "TechLearners Assistant";
      headerStatus.textContent = "Online Study AI";
    }
  }

  function showWelcome() {
    chatFlowState.step = 'waiting_for_menu';
    chatFlowState.choice = null;
    chatFlowState.selectedClass = null;
    updateHeader(null);
    addBotMessage("Hi! I'm your **TechLearners Assistant** 🤖. How can I help you today? Please choose an option from the menu:");
    showSuggestions([
      "📚 Browse Notes",
      "📝 MCQ Practice",
      "📄 Sample Papers",
      "📖 View Chapters"
    ]);
    buildSearchIndex();
  }

  function addBotMessage(text, cards = []) {
    const msg = document.createElement('div');
    msg.className = 'tl-message bot';
    msg.innerHTML = `
      <div class="tl-message-avatar">${botIcon}</div>
      <div class="tl-message-content">
        <div>${parseMarkdown(text)}</div>
        ${cards.length ? `
          <div class="tl-bot-cards-container">
            ${cards.map(card => `
              <div class="tl-bot-card">
                <span class="tl-bot-card-meta">${card.meta}</span>
                <span class="tl-bot-card-title">${card.title}</span>
                ${card.desc ? `<span class="tl-bot-card-desc">${card.desc}</span>` : ''}
                <a href="${card.link}" class="tl-bot-card-link" ${card.link.startsWith('http') || card.link.includes('downloads/') ? 'download' : ''}>
                  ${card.linkLabel || 'Open Resource'} &rarr;
                </a>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
    messagesContainer.appendChild(msg);
    scrollToBottom();
  }

  function addUserMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'tl-message user';
    msg.innerHTML = `
      <div class="tl-message-content">${escapeHtml(text)}</div>
    `;
    messagesContainer.appendChild(msg);
    scrollToBottom();
  }

  function showSuggestions(list) {
    suggestionsContainer.innerHTML = list.map(item => `
      <button type="button" class="tl-suggestion-chip">${escapeHtml(item)}</button>
    `).join('');
    
    // Add chip listeners
    suggestionsContainer.querySelectorAll('.tl-suggestion-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.textContent;
        addUserMessage(query);
        handleQuery(query);
      });
    });
  }

  function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'tl-message bot tl-typing-indicator';
    indicator.innerHTML = `
      <div class="tl-message-avatar">${botIcon}</div>
      <div class="tl-message-content">
        <div class="tl-typing-dots">
          <span class="tl-typing-dot"></span>
          <span class="tl-typing-dot"></span>
          <span class="tl-typing-dot"></span>
        </div>
      </div>
    `;
    messagesContainer.appendChild(indicator);
    scrollToBottom();
    return indicator;
  }

  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function parseMarkdown(text) {
    return text
      .replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[c])
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
  }

  // Dialogue / Search Processor
  async function handleQuery(query) {
    const indicator = showTypingIndicator();
    await buildSearchIndex();
    
    setTimeout(() => {
      indicator.remove();
      processQuery(query);
    }, 600);
  }

  function processQuery(query) {
    const lower = query.toLowerCase().trim();
    
    const greetings = ['hi', 'hello', 'hey', 'hy', 'hola', 'greetings', 'yo', 'good morning', 'good afternoon', 'good evening'];
    const matchesGreeting = greetings.some(g => lower === g || lower.startsWith(g + ' ') || lower.startsWith('hello ') || lower.startsWith('hi '));

    if (matchesGreeting) {
      chatFlowState.step = 'waiting_for_menu';
      chatFlowState.choice = null;
      addBotMessage("Hello! 👋 I'm your TechLearners Assistant. What would you like to explore today? Please select an option:");
      showSuggestions([
        "📚 Browse Notes",
        "📝 MCQ Practice",
        "📄 Sample Papers",
        "📖 View Chapters"
      ]);
      return;
    }

    // Exact menus
    if (lower === 'back to menu' || lower === 'menu') {
      showWelcome();
      return;
    }

    // Define choices
    const choices = {
      'browse notes': 'notes',
      '📚 browse notes': 'notes',
      'notes': 'notes',
      '📚 notes': 'notes',
      'mcq practice': 'mcqs',
      '📝 mcq practice': 'mcqs',
      'mcqs': 'mcqs',
      '📝 mcqs': 'mcqs',
      'practice mcq': 'mcqs',
      'sample papers': 'papers',
      '📄 sample papers': 'papers',
      'papers': 'papers',
      '📄 papers': 'papers',
      'view chapters': 'chapters',
      '📖 view chapters': 'chapters',
      'chapters': 'chapters',
      '📖 chapters': 'chapters'
    };

    // Step-by-Step Flow: waiting for class selection
    if (chatFlowState.step === 'waiting_for_class') {
      if (lower.includes('9') || lower.includes('class 9') || lower.includes('class9')) {
        chatFlowState.step = 'none';
        chatFlowState.selectedClass = 'class 9';
        updateHeader('class 9');
        addBotMessage("Perfect! I've configured the chatbot for **Class 9**.");
        deliverChoiceContent(chatFlowState.choice, 'class 9');
        return;
      } else if (lower.includes('10') || lower.includes('class 10') || lower.includes('class10')) {
        chatFlowState.step = 'none';
        chatFlowState.selectedClass = 'class 10';
        updateHeader('class 10');
        addBotMessage("Perfect! I've configured the chatbot for **Class 10**.");
        deliverChoiceContent(chatFlowState.choice, 'class 10');
        return;
      }
    }

    // Check if user selected or typed a choice
    if (choices[lower]) {
      const choice = choices[lower];
      if (chatFlowState.selectedClass) {
        chatFlowState.step = 'none';
        deliverChoiceContent(choice, chatFlowState.selectedClass);
        return;
      } else {
        chatFlowState.choice = choice;
        chatFlowState.step = 'waiting_for_class';
        addBotMessage("Great choice! Which class are you in?");
        showSuggestions(["Class 9", "Class 10", "Back to Menu"]);
        return;
      }
    }

    // Direct Class-specific commands/searches (skip menu flow)
    if (lower === 'class 9 ai' || lower === '🤖 class 9 ai') {
      chatFlowState.step = 'none';
      chatFlowState.selectedClass = 'class 9';
      updateHeader('class 9');
      handleCategorySearch('class 9', 'ai');
      return;
    }
    
    if (lower === 'class 10 it' || lower === '💻 class 10 it') {
      chatFlowState.step = 'none';
      chatFlowState.selectedClass = 'class 10';
      updateHeader('class 10');
      handleCategorySearch('class 10', 'it');
      return;
    }

    if (lower === '📚 class 9 notes') {
      chatFlowState.step = 'none';
      chatFlowState.selectedClass = 'class 9';
      updateHeader('class 9');
      handleNotesCategory('class 9');
      return;
    }

    if (lower === '📚 class 10 notes') {
      chatFlowState.step = 'none';
      chatFlowState.selectedClass = 'class 10';
      updateHeader('class 10');
      handleNotesCategory('class 10');
      return;
    }

    // If they typed something else during menu or class expectation, reset step flow and search
    chatFlowState.step = 'none';
    performKeywordSearch(lower);
  }

  function handleCategorySearch(className, subjectName) {
    const matchingChapters = searchIndex.chapters.filter(c => 
      c.class.toLowerCase().includes(className) && c.subject.toLowerCase() === subjectName
    );
    const matchingNotes = searchIndex.notes.filter(n => 
      n.class.toLowerCase().includes(className) && n.subject.toLowerCase() === subjectName
    );

    const cards = [];
    matchingChapters.forEach(c => {
      cards.push({
        meta: `${c.class} ${c.subject} - Chapter`,
        title: c.title,
        desc: c.description || c.unit,
        link: pathPrefix + `pages/${c.class.replace(' ', '').toLowerCase()}/index.html?subject=${c.subject}&chapter=${encodeURIComponent(c.id)}`,
        linkLabel: "Read Chapter"
      });
    });

    matchingNotes.forEach(n => {
      cards.push({
        meta: `${n.class} ${n.subject} - Study Notes`,
        title: n.title,
        desc: n.description,
        link: pathPrefix + "pages/notes/index.html",
        linkLabel: "Open Notes"
      });
    });

    if (cards.length) {
      addBotMessage(`Here is all the syllabus content I found for **${className.toUpperCase()} ${subjectName.toUpperCase()}**:`, cards.slice(0, 6));
    } else {
      addBotMessage(`I couldn't find any specific matches for ${className} ${subjectName}.`);
    }
    deliverSuggestionsAfterChoice(null);
  }

  function handleNotesCategory(className) {
    const matchingNotes = searchIndex.notes.filter(n => n.class.toLowerCase().includes(className));
    const cards = matchingNotes.map(n => ({
      meta: `${n.class} ${n.subject} - Notes`,
      title: n.title,
      desc: n.description,
      link: pathPrefix + "pages/notes/index.html",
      linkLabel: "Read Notes"
    }));

    if (cards.length) {
      addBotMessage(`Here are the study notes for **${className.toUpperCase()}**:`, cards);
    } else {
      addBotMessage(`Sorry, I couldn't find any notes for ${className}.`);
    }
    deliverSuggestionsAfterChoice('notes');
  }

  function deliverChoiceContent(choice, className) {
    chatFlowState.selectedClass = className;
    updateHeader(className);

    if (choice === 'notes') {
      handleNotesCategory(className);
    } else if (choice === 'mcqs') {
      const matchingQuizzes = searchIndex.quizzes.filter(q => q.class.toLowerCase().includes(className));
      const chaptersList = [...new Set(matchingQuizzes.map(q => q.chapter))].filter(Boolean);
      
      addBotMessage(`Here are the practice MCQ resources for **${className.toUpperCase()}**:`, [
        {
          meta: `${className.toUpperCase()} Quiz`,
          title: "Launch Practice Quiz",
          desc: `Practice Class 9/10 AI and IT questions from chapters: ${chaptersList.slice(0, 3).join(', ')}...`,
          link: pathPrefix + `pages/quiz/index.html?class=${encodeURIComponent(className === 'class 9' ? 'Class 9' : 'Class 10')}`,
          linkLabel: "Open Quiz"
        },
        {
          meta: `${className.toUpperCase()} MCQs`,
          title: "MCQ Resources Page",
          desc: "Browse offline chapter question banks and downloads.",
          link: pathPrefix + "pages/quizzes/index.html",
          linkLabel: "Open Resources"
        }
      ]);
      deliverSuggestionsAfterChoice('mcqs');
    } else if (choice === 'papers') {
      const matchingPapers = searchIndex.papers.filter(p => p.class.toLowerCase().includes(className));
      showItems(matchingPapers, "papers", `Here are the sample papers and practice sheets I found for **${className.toUpperCase()}**:`);
    } else if (choice === 'chapters') {
      const matchingChapters = searchIndex.chapters.filter(c => c.class.toLowerCase().includes(className));
      showItems(matchingChapters, "chapters", `Here are the learning chapters and syllabus units for **${className.toUpperCase()}**:`);
    }
  }

  function deliverSuggestionsAfterChoice(choice) {
    if (chatFlowState.selectedClass) {
      const otherChoices = [
        choice !== 'notes' ? "📚 Notes" : null,
        choice !== 'mcqs' ? "📝 MCQs" : null,
        choice !== 'papers' ? "📄 Papers" : null,
        choice !== 'chapters' ? "📖 Chapters" : null,
        "Back to Menu"
      ].filter(Boolean);
      showSuggestions(otherChoices);
    } else {
      showSuggestions(["Back to Menu"]);
    }
  }

  function showItems(items, type, welcomeText) {
    const cards = items.map(item => {
      let meta = '';
      let link = '';
      let desc = item.description || '';
      let label = 'Open';

      if (type === 'papers') {
        meta = `${item.class} ${item.subject} - Paper (${item.year})`;
        link = item.file ? pathPrefix + item.file.replace('../../', '') : pathPrefix + 'pages/question-papers/index.html';
        label = "Download Paper";
      } else if (type === 'notes') {
        meta = `${item.class} ${item.subject} - Notes`;
        link = pathPrefix + "pages/notes/index.html";
        label = "Read Notes";
      } else if (type === 'chapters') {
        meta = `${item.class} ${item.subject} - Chapter`;
        link = pathPrefix + `pages/${item.class.replace(' ', '').toLowerCase()}/index.html?subject=${item.subject}&chapter=${encodeURIComponent(item.id)}`;
        label = "Read Chapter";
      }

      return { meta, title: item.title, desc, link, linkLabel: label };
    });

    if (cards.length) {
      addBotMessage(welcomeText, cards.slice(0, 6));
    } else {
      addBotMessage("I couldn't find any documents matching that category.");
    }
    deliverSuggestionsAfterChoice(type);
  }

  function performKeywordSearch(query) {
    const stopwords = new Set(['of', 'on', 'the', 'for', 'and', 'give', 'me', 'show', 'please', 'is', 'are', 'in', 'at', 'with', 'about', 'notes', 'chapters', 'papers', 'quiz', 'quizzes']);
    const keywords = query.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2 && !stopwords.has(w));

    const searchTerms = keywords.length ? keywords : [query];
    const cards = [];
    const addedTitles = new Set();

    const matchesSearch = (text) => {
      if (!text) return false;
      const txt = text.toLowerCase();
      return searchTerms.some(term => txt.includes(term));
    };

    // Filter by class context if active
    const selectedClass = chatFlowState.selectedClass;

    // Search Chapters
    searchIndex.chapters.forEach(c => {
      if (selectedClass && !c.class.toLowerCase().includes(selectedClass)) return;
      if (matchesSearch(c.title) || matchesSearch(c.description) || (c.unit && matchesSearch(c.unit))) {
        const key = `chapter|${c.title}`;
        if (!addedTitles.has(key)) {
          addedTitles.add(key);
          cards.push({
            meta: `${c.class} ${c.subject} - Chapter`,
            title: c.title,
            desc: c.description || c.unit,
            link: pathPrefix + `pages/${c.class.replace(' ', '').toLowerCase()}/index.html?subject=${c.subject}&chapter=${encodeURIComponent(c.id)}`,
            linkLabel: "Read Chapter"
          });
        }
      }
    });

    // Search Notes
    searchIndex.notes.forEach(n => {
      if (selectedClass && !n.class.toLowerCase().includes(selectedClass)) return;
      if (matchesSearch(n.title) || matchesSearch(n.description) || matchesSearch(n.content)) {
        const key = `notes|${n.title}`;
        if (!addedTitles.has(key)) {
          addedTitles.add(key);
          cards.push({
            meta: `${n.class} ${n.subject} - Notes`,
            title: n.title,
            desc: n.description,
            link: pathPrefix + "pages/notes/index.html",
            linkLabel: "Open Study Notes"
          });
        }
      }
    });

    // Search Question Papers
    searchIndex.papers.forEach(p => {
      if (selectedClass && !p.class.toLowerCase().includes(selectedClass)) return;
      if (matchesSearch(p.title) || matchesSearch(p.description) || (p.year && matchesSearch(p.year))) {
        const key = `paper|${p.title}`;
        if (!addedTitles.has(key)) {
          addedTitles.add(key);
          cards.push({
            meta: `${p.class} ${p.subject} - Practice Paper (${p.year})`,
            title: p.title,
            desc: p.description,
            link: p.file ? pathPrefix + p.file.replace('../../', '') : pathPrefix + 'pages/question-papers/index.html',
            linkLabel: "Download Paper"
          });
        }
      }
    });

    if (cards.length) {
      addBotMessage(`I found **${cards.length}** content item${cards.length === 1 ? '' : 's'} matching your query${selectedClass ? ` in **${selectedClass.toUpperCase()}**` : ''}:`, cards.slice(0, 5));
    } else {
      addBotMessage(`I couldn't find any direct matches for *"${query}"*${selectedClass ? ` in **${selectedClass.toUpperCase()}**` : ''} on TechLearners.\n\nTry looking for: 'Green Skills', 'Project Cycle', 'Employability Notes', or reset class filter.`);
    }

    if (selectedClass) {
      showSuggestions([
        "📚 Notes",
        "📝 MCQs",
        "📄 Papers",
        "📖 Chapters",
        "Back to Menu"
      ]);
    } else {
      showSuggestions([
        "📚 Browse Notes",
        "📄 Sample Papers",
        "📝 MCQ Practice",
        "Back to Menu"
      ]);
    }
  }

  // Handle Form Submit
  inputForm.addEventListener('submit', event => {
    event.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    
    chatInput.value = '';
    addUserMessage(text);
    handleQuery(text);
  });

})();
