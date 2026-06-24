(function () {
  const storagePrefix = 'tl_content_';
  const contentTypes = ['notes', 'quizzes', 'quizQuestions', 'questionPapers', 'revisionPapers', 'chapters', 'announcements', 'focus', 'advertisements', 'guessPapers'];
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

    const skipCloud = !isAdminPage && (type === 'announcements' || type === 'focus');
    if (isAdminPage && firebase.configured && !skipCloud) {
      try {
        const cloudItems = await getCloudContent(type);
        if (cloudItems) {
          localStorage.setItem(storagePrefix + type, JSON.stringify(cloudItems));
          return cloudItems;
        }
      } catch (error) {
        console.warn(`Unable to load cloud ${type}; using cached/default.`, error);
      }
    }

    const stored = getStored(type);
    const defaultsPromise = getDefaults(type, dataRoot);

    if (!isAdminPage && firebase.configured && !skipCloud) {
      setTimeout(async () => {
        try {
          const cloudItems = await getCloudContent(type);
          if (cloudItems) {
            localStorage.setItem(storagePrefix + type, JSON.stringify(cloudItems));
            document.dispatchEvent(new CustomEvent('tl_content_updated', { detail: { type } }));
          }
        } catch (e) {
          console.warn(`Background sync failed for ${type}`, e);
        }
      }, 50);
    }

    if (stored) return stored;
    return defaultsPromise;
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
    const localMerged = appendDownloadOnlyItems(defaults, stored);

    if (isAdminPage && firebase.configured) {
      try {
        const cloudItems = await getCloudContent('quizzes');
        const merged = Array.isArray(cloudItems) && cloudItems.length >= defaults.length
          ? cloudItems
          : appendDownloadOnlyItems(defaults, cloudItems);
        localStorage.setItem(storagePrefix + 'quizzes', JSON.stringify(merged));
        return merged;
      } catch (error) {
        console.warn('Unable to load cloud quizzes; using local content.', error);
      }
    }

    if (!isAdminPage && firebase.configured) {
      setTimeout(async () => {
        try {
          const cloudItems = await getCloudContent('quizzes');
          const merged = Array.isArray(cloudItems) && cloudItems.length >= defaults.length
            ? cloudItems
            : appendDownloadOnlyItems(defaults, cloudItems);
          localStorage.setItem(storagePrefix + 'quizzes', JSON.stringify(merged));
          document.dispatchEvent(new CustomEvent('tl_content_updated', { detail: { type: 'quizzes' } }));
        } catch (e) {
          console.warn('Background quizzes sync failed', e);
        }
      }, 50);
    }

    return localMerged;
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
    const localMerged = appendQuestionItems(defaults, stored);

    if (isAdminPage && firebase.configured) {
      try {
        const cloudItems = await getCloudContent('quizQuestions');
        const merged = Array.isArray(cloudItems) && cloudItems.length >= defaults.length
          ? cloudItems
          : appendQuestionItems(defaults, cloudItems);
        localStorage.setItem(storagePrefix + 'quizQuestions', JSON.stringify(merged));
        return merged;
      } catch (error) {
        console.warn('Unable to load cloud quiz questions; using local content.', error);
      }
    }

    if (!isAdminPage && firebase.configured) {
      setTimeout(async () => {
        try {
          const cloudItems = await getCloudContent('quizQuestions');
          const merged = Array.isArray(cloudItems) && cloudItems.length >= defaults.length
            ? cloudItems
            : appendQuestionItems(defaults, cloudItems);
          localStorage.setItem(storagePrefix + 'quizQuestions', JSON.stringify(merged));
          document.dispatchEvent(new CustomEvent('tl_content_updated', { detail: { type: 'quizQuestions' } }));
        } catch (e) {
          console.warn('Background quizQuestions sync failed', e);
        }
      }, 50);
    }

    return localMerged;
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
    const localMerged = mergeChapterItems(defaults, stored);

    if (isAdminPage && firebase.configured) {
      try {
        const cloudItems = await getCloudContent('chapters');
        const merged = mergeChapterItems(defaults, stored, Array.isArray(cloudItems) ? cloudItems : []);
        localStorage.setItem(storagePrefix + 'chapters', JSON.stringify(merged));
        return merged;
      } catch (error) {
        console.warn('Unable to load cloud chapters; using local content.', error);
      }
    }

    if (!isAdminPage && firebase.configured) {
      setTimeout(async () => {
        try {
          const cloudItems = await getCloudContent('chapters');
          const merged = mergeChapterItems(defaults, stored, Array.isArray(cloudItems) ? cloudItems : []);
          localStorage.setItem(storagePrefix + 'chapters', JSON.stringify(merged));
          document.dispatchEvent(new CustomEvent('tl_content_updated', { detail: { type: 'chapters' } }));
        } catch (e) {
          console.warn('Background chapters sync failed', e);
        }
      }, 50);
    }

    return localMerged;
  }

  async function save(type, items) {
    const data = JSON.stringify(items);
    if (firebase.configured) {
      await firebase.saveContent(type, items);
      localStorage.setItem(storagePrefix + type, data);
      return;
    }
    localStorage.setItem(storagePrefix + type, data);
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
