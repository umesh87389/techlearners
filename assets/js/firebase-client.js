(function () {
  const config = window.TechLearnersFirebaseConfig || {};
  const configured = Boolean(config.apiKey && !config.apiKey.startsWith('REPLACE_'));
  let servicesPromise;

  function withTimeout(promise, message, timeout = 15000) {
    let timer;
    return Promise.race([
      promise,
      new Promise((resolve, reject) => {
        timer = setTimeout(() => reject(new Error(message)), timeout);
      })
    ]).finally(() => clearTimeout(timer));
  }

  async function ensureStorageBucketExists() {
    const bucket = encodeURIComponent(config.storageBucket || '');
    if (!bucket) throw new Error('Firebase Storage bucket is missing from the website configuration.');

    let response;
    try {
      response = await withTimeout(
        fetch(`https://firebasestorage.googleapis.com/v0/b/${bucket}/o?maxResults=1`),
        'Unable to reach Firebase Storage. Check your connection and try again.',
        10000
      );
    } catch (error) {
      throw new Error(error.message || 'Unable to reach Firebase Storage. Check your connection and try again.');
    }

    if (response.status === 404) {
      throw new Error('Firebase Storage is not set up yet. In Firebase Console, open Storage, click Get started, create the default bucket, then publish the Storage rules.');
    }
  }
  let currentUser = null;
  let authStarted = false;
  let authResolved = false;
  const authStateListeners = [];
  const authPath = location.pathname;
  const authCriticalPage = authPath.includes('/pages/admin/') || /\/(?:login|dashboard)\.html$/.test(authPath);

  function runWhenIdle(callback) {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(callback, { timeout: 2500 });
      return;
    }
    setTimeout(callback, 700);
  }

  async function getServices() {
    if (!configured) return null;
    if (!servicesPromise) {
      servicesPromise = Promise.all([
        import('https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js'),
        import('https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js'),
        import('https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js'),
        import('https://www.gstatic.com/firebasejs/12.7.0/firebase-storage.js')
      ]).then(([appApi, authApi, firestoreApi, storageApi]) => {
        const app = appApi.initializeApp(config);
        return {
          auth: authApi.getAuth(app),
          authApi,
          db: firestoreApi.getFirestore(app),
          firestoreApi,
          storage: storageApi.getStorage(app),
          storageApi
        };
      });
    }
    return servicesPromise;
  }

  function startAuthListener() {
    if (authStarted || authResolved) return;
    authStarted = true;
    getServices().then(services => {
      if (!services) return;
      services.authApi.onAuthStateChanged(services.auth, user => {
        currentUser = user;
        authResolved = true;
        authStateListeners.forEach(listener => { try { listener(user); } catch {} });
        authStateListeners.length = 0;
      });
    });
  }

  async function signIn(email, password) {
    const services = await getServices();
    if (!services) {
      if (password !== 'admin123') throw new Error('Wrong demo password.');
      localStorage.setItem('tl_admin', 'true');
      return;
    }
    await services.authApi.setPersistence(services.auth, services.authApi.browserLocalPersistence);
    await services.authApi.signInWithEmailAndPassword(services.auth, email, password);
  }

  async function adminSignIn(email, password) {
    await signIn(email, password);
    await requireCurrentUserAdmin();
  }

  async function requireCurrentUserAdmin() {
    const services = await getServices();
    if (services && services.auth.currentUser?.uid !== config.adminUid) {
      await services.authApi.signOut(services.auth);
      throw new Error('This account does not have admin access.');
    }
  }

  async function studentSignUp(email, password) {
    const services = await getServices();
    if (!services) throw new Error('Firebase is not configured.');
    await services.authApi.setPersistence(services.auth, services.authApi.browserLocalPersistence);
    return services.authApi.createUserWithEmailAndPassword(services.auth, email, password);
  }

  async function studentGoogleSignIn() {
    const services = await getServices();
    if (!services) throw new Error('Firebase is not configured.');
    await services.authApi.setPersistence(services.auth, services.authApi.browserLocalPersistence);
    const provider = new services.authApi.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      return await services.authApi.signInWithPopup(services.auth, provider);
    } catch (error) {
      if (['auth/popup-blocked', 'auth/cancelled-popup-request'].includes(error.code)) {
        sessionStorage.setItem('tl_google_redirect', 'true');
        return services.authApi.signInWithRedirect(services.auth, provider);
      }
      throw error;
    }
  }

  async function adminGoogleSignIn() {
    const result = await studentGoogleSignIn();
    await requireCurrentUserAdmin();
    return result;
  }

  async function getGoogleRedirectResult() {
    const services = await getServices();
    if (!services) return null;
    const pending = sessionStorage.getItem('tl_google_redirect') === 'true';
    if (!pending) return null;
    sessionStorage.removeItem('tl_google_redirect');
    return services.authApi.getRedirectResult(services.auth);
  }

  async function getCurrentUser() {
    const services = await getServices();
    if (!services) return null;
    if (services.auth.currentUser) {
      currentUser = services.auth.currentUser;
      return currentUser;
    }
    return new Promise(resolve => {
      const unsubscribe = services.authApi.onAuthStateChanged(services.auth, user => {
        unsubscribe();
        currentUser = user;
        resolve(user);
      });
    });
  }

  async function signOut() {
    const services = await getServices();
    localStorage.removeItem('tl_admin');
    if (services) await services.authApi.signOut(services.auth);
  }

  async function requireAdmin() {
    const services = await getServices();
    if (!services) return localStorage.getItem('tl_admin') === 'true';
    if (services.auth.currentUser) return services.auth.currentUser.uid === config.adminUid;
    return new Promise(resolve => {
      const unsubscribe = services.authApi.onAuthStateChanged(services.auth, user => {
        unsubscribe();
        resolve(user?.uid === config.adminUid);
      });
    });
  }

  async function getContent(type) {
    const services = await getServices();
    if (!services) return null;
    const reference = services.firestoreApi.doc(services.db, 'content', type);
    const snapshot = await services.firestoreApi.getDoc(reference);
    return snapshot.exists() ? snapshot.data().items : null;
  }

  async function saveContent(type, items) {
    const services = await getServices();
    if (!services) return false;
    const reference = services.firestoreApi.doc(services.db, 'content', type);
    await withTimeout(
      services.firestoreApi.setDoc(reference, {
        items,
        updatedAt: services.firestoreApi.serverTimestamp()
      }),
      'Publishing timed out. Check your connection and Firebase Firestore rules, then try again.'
    );
    return true;
  }

  async function uploadNote(file) {
    const services = await getServices();
    if (!services) throw new Error('Add your Firebase config before uploading files.');
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    const path = `notes/${Date.now()}-${safeName}`;
    const reference = services.storageApi.ref(services.storage, path);
    await services.storageApi.uploadBytes(reference, file);
    return services.storageApi.getDownloadURL(reference);
  }

  async function uploadQuestionPaper(file) {
    const services = await getServices();
    if (!services) throw new Error('Add your Firebase config before uploading files.');
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    const path = `question-papers/${Date.now()}-${safeName}`;
    const reference = services.storageApi.ref(services.storage, path);
    await services.storageApi.uploadBytes(reference, file);
    return services.storageApi.getDownloadURL(reference);
  }

  async function uploadAnnouncement(file) {
    const services = await getServices();
    if (!services) throw new Error('Add your Firebase config before uploading images.');
    if (!file.type.startsWith('image/')) throw new Error('Choose an image file for the announcement.');
    if (file.size >= 5 * 1024 * 1024) throw new Error('Announcement images must be smaller than 5 MB.');
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    const path = `announcements/${Date.now()}-${safeName}`;
    const reference = services.storageApi.ref(services.storage, path);
    await services.storageApi.uploadBytes(reference, file, { contentType: file.type });
    return services.storageApi.getDownloadURL(reference);
  }

  async function uploadAdvertisement(file, onProgress) {
    const services = await getServices();
    if (!services) throw new Error('Add your Firebase config before uploading images.');
    if (!file.type.startsWith('image/')) throw new Error('Choose an image file for the advertisement poster.');
    if (file.size >= 5 * 1024 * 1024) throw new Error('Advertisement posters must be smaller than 5 MB.');
    if (!services.auth.currentUser) throw new Error('Your admin session expired. Sign in again before uploading.');
    await ensureStorageBucketExists();
    await withTimeout(
      services.auth.currentUser.getIdToken(true),
      'Unable to refresh your admin session. Sign in again and retry the upload.'
    );

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    const path = `advertisements/${Date.now()}-${safeName}`;
    const reference = services.storageApi.ref(services.storage, path);
    const task = services.storageApi.uploadBytesResumable(reference, file, { contentType: file.type });
    const uploadedReference = await new Promise((resolve, reject) => {
      let timer;
      let settled = false;

      function fail(error) {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        reject(error);
      }

      function resetTimer() {
        clearTimeout(timer);
        timer = setTimeout(() => {
          fail(new Error('Poster upload timed out. Check your connection and Firebase Storage rules, then try again.'));
          task.cancel();
        }, 30000);
      }

      resetTimer();
      task.on('state_changed', snapshot => {
        resetTimer();
        const progress = snapshot.totalBytes ? Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100) : 0;
        if (onProgress) onProgress(progress);
      }, fail, () => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        resolve(task.snapshot.ref);
      });
    });
    return withTimeout(
      services.storageApi.getDownloadURL(uploadedReference),
      'Poster uploaded, but its download URL could not be created. Please try again.'
    );
  }

  async function submitContact(message) {
    const services = await getServices();
    if (!services) throw new Error('Firebase is not configured.');
    await services.firestoreApi.addDoc(
      services.firestoreApi.collection(services.db, 'contactMessages'),
      {
        ...message,
        createdAt: services.firestoreApi.serverTimestamp()
      }
    );
  }

  async function getContactMessages() {
    const services = await getServices();
    if (!services) return [];
    const reference = services.firestoreApi.collection(services.db, 'contactMessages');
    const snapshot = await services.firestoreApi.getDocs(reference);
    return sortContactMessages(snapshot.docs.map(document => ({ id: document.id, ...document.data() })));
  }

  function sortContactMessages(messages) {
    return messages.sort((a, b) => {
      const aTime = a.createdAt?.toMillis?.() || 0;
      const bTime = b.createdAt?.toMillis?.() || 0;
      return bTime - aTime;
    });
  }

  async function subscribeContactMessages(onMessages, onError) {
    const services = await getServices();
    if (!services) {
      onMessages([]);
      return () => {};
    }
    const reference = services.firestoreApi.collection(services.db, 'contactMessages');
    return services.firestoreApi.onSnapshot(reference, snapshot => {
      onMessages(sortContactMessages(snapshot.docs.map(document => ({ id: document.id, ...document.data() }))));
    }, onError);
  }

  async function deleteContactMessage(id) {
    const services = await getServices();
    if (!services) return;
    await services.firestoreApi.deleteDoc(
      services.firestoreApi.doc(services.db, 'contactMessages', id)
    );
  }

  async function submitQuizResult(result) {
    const services = await getServices();
    if (!services) throw new Error('Firebase is not configured.');
    await services.firestoreApi.addDoc(
      services.firestoreApi.collection(services.db, 'quizResults'),
      {
        ...result,
        createdAt: services.firestoreApi.serverTimestamp()
      }
    );
  }

  function sortQuizResults(results) {
    return results.sort((a, b) => {
      const aTime = a.createdAt?.toMillis?.() || 0;
      const bTime = b.createdAt?.toMillis?.() || 0;
      return bTime - aTime;
    });
  }

  async function getQuizResults() {
    const services = await getServices();
    if (!services) return [];
    const reference = services.firestoreApi.collection(services.db, 'quizResults');
    const snapshot = await services.firestoreApi.getDocs(reference);
    return sortQuizResults(snapshot.docs.map(document => ({ id: document.id, ...document.data() })));
  }

  async function subscribeQuizResults(onResults, onError) {
    const services = await getServices();
    if (!services) {
      onResults([]);
      return () => {};
    }
    const reference = services.firestoreApi.collection(services.db, 'quizResults');
    return services.firestoreApi.onSnapshot(reference, snapshot => {
      onResults(sortQuizResults(snapshot.docs.map(document => ({ id: document.id, ...document.data() }))));
    }, onError);
  }

  async function deleteQuizResult(id) {
    const services = await getServices();
    if (!services) return;
    await services.firestoreApi.deleteDoc(
      services.firestoreApi.doc(services.db, 'quizResults', id)
    );
  }

  window.TechLearnersFirebase = {
    adminSignIn,
    adminGoogleSignIn,
    configured,
    deleteContactMessage,
    deleteQuizResult,
    getContactMessages,
    getContent,
    getCurrentUser,
    getGoogleRedirectResult,
    getQuizResults,
    onAuthStateChanged: callback => {
      if (authResolved) {
        try { callback(currentUser); } catch {}
        return;
      }
      authStateListeners.push(callback);
      if (authCriticalPage) startAuthListener();
      else runWhenIdle(startAuthListener);
    },
    requireAdmin,
    saveContent,
    signIn,
    signOut,
    subscribeContactMessages,
    subscribeQuizResults,
    studentSignUp,
    studentGoogleSignIn,
    peekCurrentUser: () => currentUser,
    submitContact,
    submitQuizResult,
    uploadAnnouncement,
    uploadAdvertisement,
    uploadNote,
    uploadQuestionPaper
  };

  if (authCriticalPage) startAuthListener();
})();
