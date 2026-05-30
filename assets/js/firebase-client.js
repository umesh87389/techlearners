(function () {
  const config = window.TechLearnersFirebaseConfig || {};
  const configured = Boolean(config.apiKey && !config.apiKey.startsWith('REPLACE_'));
  let servicesPromise;

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

  async function signIn(email, password) {
    const services = await getServices();
    if (!services) {
      if (password !== 'admin123') throw new Error('Wrong demo password.');
      localStorage.setItem('tl_admin', 'true');
      return;
    }
    await services.authApi.signInWithEmailAndPassword(services.auth, email, password);
  }

  async function adminSignIn(email, password) {
    await signIn(email, password);
    const services = await getServices();
    if (services && services.auth.currentUser?.uid !== config.adminUid) {
      await services.authApi.signOut(services.auth);
      throw new Error('This account does not have admin access.');
    }
  }

  async function studentSignUp(email, password) {
    const services = await getServices();
    if (!services) throw new Error('Firebase is not configured.');
    return services.authApi.createUserWithEmailAndPassword(services.auth, email, password);
  }

  async function getCurrentUser() {
    const services = await getServices();
    if (!services) return null;
    if (services.auth.currentUser) return services.auth.currentUser;
    return new Promise(resolve => {
      const unsubscribe = services.authApi.onAuthStateChanged(services.auth, user => {
        unsubscribe();
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
    await services.firestoreApi.setDoc(reference, {
      items,
      updatedAt: services.firestoreApi.serverTimestamp()
    });
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
    return snapshot.docs.map(document => ({ id: document.id, ...document.data() }));
  }

  async function deleteContactMessage(id) {
    const services = await getServices();
    if (!services) return;
    await services.firestoreApi.deleteDoc(
      services.firestoreApi.doc(services.db, 'contactMessages', id)
    );
  }

  window.TechLearnersFirebase = {
    adminSignIn,
    configured,
    deleteContactMessage,
    getContactMessages,
    getContent,
    getCurrentUser,
    requireAdmin,
    saveContent,
    signIn,
    signOut,
    studentSignUp,
    submitContact,
    uploadNote
  };
})();
