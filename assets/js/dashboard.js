(async function () {
  const stats = document.getElementById('studentStats');
  if (!stats) return;

  const user = await TechLearnersFirebase.getCurrentUser();
  if (!user) return;

  const name = user.displayName || user.email?.split('@')[0] || 'Student';
  const avatar = document.getElementById('userAvatar');
  if (avatar) {
    if (user.photoURL) {
      avatar.style.background = `url(${JSON.stringify(user.photoURL)}) center/cover no-repeat`;
      avatar.textContent = '';
    } else {
      avatar.textContent = name.charAt(0).toUpperCase();
    }
  }

  const greeting = document.getElementById('greetingTime');
  if (greeting) {
    const hour = new Date().getHours();
    const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
    greeting.textContent = `${timeGreeting}, ${name}!`;
  }

  const attempted = TechLearnersProgress.summary();
  const content = await Promise.all([
    TechLearnersContent.get('notes', 'data'),
    TechLearnersContent.get('quizQuestions', 'data')
  ]);
  const quizSets = new Set(content[1].map(item => `${item.class || 'Class 9'}|${item.subject || 'AI'}`));
  const total = content[0].length + quizSets.size;
  const completed = attempted.notes + attempted.quizzes;
  const percentage = total ? Math.min(100, Math.round(completed / total * 100)) : 0;

  document.getElementById('notesAttempted').textContent = attempted.notes;
  document.getElementById('quizzesAttempted').textContent = attempted.quizzes;
  document.getElementById('overallProgress').style.width = `${percentage}%`;
  document.getElementById('overallProgress').parentElement.setAttribute('aria-valuenow', percentage);
  const percentEl = document.getElementById('progressPercent');
  const start = parseInt(percentEl.textContent) || 0;
  let current = start;
  const step = Math.ceil((percentage - start) / 20);
  const counter = setInterval(() => {
    current = Math.min(current + Math.max(step, 1), percentage);
    percentEl.textContent = `${current}%`;
    if (current >= percentage) clearInterval(counter);
  }, 30);
})();
