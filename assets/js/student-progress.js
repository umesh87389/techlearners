(function () {
  const emptyProgress = () => ({ notes: {}, quizzes: {}, lectures: {} });

  function getStudentId() {
    const user = window.TechLearnersFirebase?.peekCurrentUser();
    return user?.uid || null;
  }

  function getKey() {
    const studentId = getStudentId();
    return studentId ? `tl_student_progress_${studentId}` : null;
  }

  function read() {
    const key = getKey();
    if (!key) return emptyProgress();
    try {
      return { ...emptyProgress(), ...JSON.parse(localStorage.getItem(key) || '{}') };
    } catch (error) {
      console.warn('Unable to read student progress.', error);
      return emptyProgress();
    }
  }

  function mark(type, id, detail = {}) {
    const key = getKey();
    if (!key || !id || !['notes', 'lectures', 'quizzes'].includes(type)) return;
    const progress = read();
    progress[type][id] = { ...detail, attemptedAt: new Date().toISOString() };
    localStorage.setItem(key, JSON.stringify(progress));
  }

  function summary() {
    const progress = read();
    return {
      notes: Object.keys(progress.notes).length,
      lectures: Object.keys(progress.lectures).length,
      quizzes: Object.keys(progress.quizzes).length
    };
  }

  window.TechLearnersProgress = { mark, read, summary };
})();
