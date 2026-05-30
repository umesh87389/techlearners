(function () {
  const storagePrefix = 'tl_content_';
  const contentTypes = ['notes', 'lectures', 'quizzes', 'announcements'];
  const firebase = window.TechLearnersFirebase;

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
    const response = await fetch(`${dataRoot || 'data'}/${type}.json`);
    if (!response.ok) throw new Error(`Unable to load ${type}.`);
    return response.json();
  }

  async function get(type, dataRoot) {
    if (firebase.configured) {
      const cloudItems = await firebase.getContent(type);
      if (cloudItems) return cloudItems;
    }
    const stored = getStored(type);
    if (stored) return stored;

    return getDefaults(type, dataRoot);
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
    signIn: firebase.signIn,
    signOut: firebase.signOut,
    uploadNote: firebase.uploadNote
  };
})();
