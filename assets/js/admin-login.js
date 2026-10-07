async function adminLogin(event) {
  event.preventDefault();
  const message = document.getElementById('adminLoginMessage');
  message.textContent = 'Signing in...';

  try {
    await TechLearnersContent.signIn(
      document.getElementById('adminEmail').value,
      document.getElementById('adminPass').value
    );
    TechLearnersAuthUI.goToDashboard('admin-dashboard.html', 'Welcome, Admin! Opening your dashboard...');
  } catch (error) {
    message.textContent = getAdminLoginErrorMessage(error);
  }
}

async function adminGoogleLogin() {
  const message = document.getElementById('adminLoginMessage');
  message.textContent = 'Opening Google sign in...';

  try {
    await TechLearnersContent.googleSignIn();
    TechLearnersAuthUI.goToDashboard('admin-dashboard.html', 'Welcome, Admin! Opening your dashboard...');
  } catch (error) {
    message.textContent = getAdminLoginErrorMessage(error);
  }
}

TechLearnersContent.requireAdmin().then(isAdmin => {
  if (isAdmin) location.replace('admin-dashboard.html');
});

function getAdminLoginErrorMessage(error) {
  if (error?.code === 'auth/unauthorized-domain' || /unauthorized.?domain/i.test(error?.message || '')) {
    return 'Firebase has not authorized this admin domain yet. Add admin.techlearners.in in Firebase Authentication > Settings > Authorized domains, then try again.';
  }
  if (error?.code === 'auth/operation-not-allowed') {
    return 'This Firebase sign-in method is disabled. Enable Email/Password or Google in Firebase Authentication > Sign-in method.';
  }
  if (error?.code === 'auth/invalid-credential' || error?.code === 'auth/wrong-password' || error?.code === 'auth/user-not-found') {
    return 'The admin email or password is incorrect.';
  }
  return error?.message || 'Unable to sign in.';
}
