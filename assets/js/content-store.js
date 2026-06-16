(function () {
  const storagePrefix = 'tl_content_';
  const contentTypes = ['notes', 'quizzes', 'quizQuestions', 'questionPapers', 'revisionPapers', 'chapters', 'announcements', 'focus', 'advertisements'];
  const firebase = window.TechLearnersFirebase;
  const defaultCache = new Map();
  const isAdminPage = location.pathname.includes('/pages/admin/');
  const publicCloudTimeout = window.matchMedia('(max-width: 700px)').matches ? 1200 : 3000;

  function withTimeout(promise, timeout = publicCloudTimeout) {
    let timer;
    return Promise.race([
      promise,
      new Promise((resolve, reject) => {
        timer = setTimeout(() => reject(new Error('Cloud content timed out.')), timeout);
      })
    ]).finally(() => clearTimeout(timer));
  }

  function getStored(type) {
    const stored = localStorage.getItem(storagePrefix + type);
    if (!stored) return null;

    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error(`Unable to read saved ${type}.`, error);
      return null;
    }
  }

  async function getDefaults(type, dataRoot) {
    const cacheKey = `${dataRoot || 'data'}:${type}`;
    if (defaultCache.has(cacheKey)) return defaultCache.get(cacheKey);
    const versions = {
      chapters: 'detailed-chapters-1',
      quizQuestions: 'practice-questions-2'
    };
    const version = versions[type] ? `?v=${versions[type]}` : '';
    const promise = fetch(`${dataRoot || 'data'}/${type}.json${version}`).then(response => {
      if (!response.ok) throw new Error(`Unable to load ${type}.`);
      return response.json();
    });
    defaultCache.set(cacheKey, promise);
    return promise;
  }

  function getCloudContent(type) {
    const request = firebase.getContent(type);
    return isAdminPage ? request : withTimeout(request);
  }

  async function get(type, dataRoot) {
    if (type === 'chapters') return getChapters(dataRoot);
    if (type === 'quizQuestions') return getQuizQuestions(dataRoot);
    if (type === 'quizzes') return getQuizzes(dataRoot);

    if (firebase.configured) {
      try {
        const cloudItems = await getCloudContent(type);
        if (cloudItems) return cloudItems;
      } catch (error) {
        console.warn(`Unable to load cloud ${type}; using bundled content.`, error);
      }
    }
    const stored = getStored(type);
    if (stored) return stored;

    return getDefaults(type, dataRoot);
  }

  function appendDownloadOnlyItems(baseItems, extraItems) {
    const existing = new Set(baseItems.map(item => [item.class, item.subject || 'AI', item.chapter || '', item.downloadLink || '', item.question || ''].join('|')));
    const additions = (extraItems || []).filter(item => {
      if (!item || !item.downloadLink) return false;
      const key = [item.class, item.subject || 'AI', item.chapter || '', item.downloadLink || '', item.question || ''].join('|');
      if (existing.has(key)) return false;
      existing.add(key);
      return true;
    });
    return additions.length ? [...baseItems, ...additions] : baseItems;
  }

  async function getQuizzes(dataRoot) {
    const defaults = await getDefaults('quizzes', dataRoot);
    const stored = getStored('quizzes');

    if (firebase.configured) {
      try {
        const cloudItems = await getCloudContent('quizzes');
        if (Array.isArray(cloudItems) && cloudItems.length >= defaults.length) return cloudItems;
        return appendDownloadOnlyItems(defaults, cloudItems);
      } catch (error) {
        console.warn('Unable to load cloud quizzes; using bundled MCQs.', error);
      }
    }

    if (Array.isArray(stored) && stored.length >= defaults.length) return stored;
    return appendDownloadOnlyItems(defaults, stored);
  }

  function appendQuestionItems(baseItems, extraItems) {
    const existing = new Set(baseItems.map(item => [item.class, item.subject || 'AI', item.question || ''].join('|')));
    const additions = (extraItems || []).filter(item => {
      if (!item || !item.question) return false;
      const key = [item.class, item.subject || 'AI', item.question || ''].join('|');
      if (existing.has(key)) return false;
      existing.add(key);
      return true;
    });
    return additions.length ? [...baseItems, ...additions] : baseItems;
  }

  async function getQuizQuestions(dataRoot) {
    const defaults = await getDefaults('quizQuestions', dataRoot);
    const stored = getStored('quizQuestions');

    if (firebase.configured) {
      try {
        const cloudItems = await getCloudContent('quizQuestions');
        if (Array.isArray(cloudItems) && cloudItems.length >= defaults.length) return cloudItems;
        return appendQuestionItems(defaults, cloudItems);
      } catch (error) {
        console.warn('Unable to load cloud quiz questions; using bundled practice questions.', error);
      }
    }

    if (Array.isArray(stored) && stored.length >= defaults.length) return stored;
    return appendQuestionItems(defaults, stored);
  }

  function chapterKey(item) {
    return item.id || [item.class, item.subject || 'AI', item.title].map(value => String(value || '').trim().toLowerCase()).join('|');
  }

  function mergeChapterItems(...collections) {
    const byKey = new Map();
    collections.flat().filter(Boolean).forEach(item => byKey.set(chapterKey(item), item));
    return [...byKey.values()];
  }

  async function getChapters(dataRoot) {
    let defaults = [];
    try {
      defaults = await getDefaults('chapters', dataRoot);
    } catch (error) {
      console.warn('Unable to load bundled chapters.', error);
    }

    const stored = getStored('chapters') || [];
    if (firebase.configured) {
      try {
        const cloudItems = await getCloudContent('chapters');
        return mergeChapterItems(defaults, stored, Array.isArray(cloudItems) ? cloudItems : []);
      } catch (error) {
        console.warn('Unable to load cloud chapters; using bundled content.', error);
      }
    }

    return mergeChapterItems(defaults, stored);
  }

  async function save(type, items) {
    if (firebase.configured) {
      await firebase.saveContent(type, items);
      return;
    }
    localStorage.setItem(storagePrefix + type, JSON.stringify(items));
  }

  async function reset(type, dataRoot) {
    const items = await getDefaults(type, dataRoot);
    if (firebase.configured) await firebase.saveContent(type, items);
    else localStorage.removeItem(storagePrefix + type);
    return items;
  }

  async function exportBackup(dataRoot) {
    const backup = {};
    await Promise.all(contentTypes.map(async type => {
      backup[type] = await get(type, dataRoot);
    }));
    return backup;
  }

  async function importBackup(backup) {
    await Promise.all(contentTypes.map(type => {
      if (Array.isArray(backup[type])) return save(type, backup[type]);
    }));
  }

  window.TechLearnersContent = {
    contentTypes,
    exportBackup,
    get,
    getStored,
    importBackup,
    requireAdmin: firebase.requireAdmin,
    reset,
    save,
    googleSignIn: firebase.adminGoogleSignIn,
    signIn: firebase.adminSignIn,
    signOut: firebase.signOut,
    uploadAnnouncement: firebase.uploadAnnouncement,
    uploadAdvertisement: firebase.uploadAdvertisement,
    uploadNote: firebase.uploadNote,
    uploadQuestionPaper: firebase.uploadQuestionPaper
  };
})();
