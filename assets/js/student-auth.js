async function studentLogin(event) {
  event.preventDefault();
  const message = document.getElementById('studentAuthMessage');
  message.textContent = 'Signing in...';

  try {
    await TechLearnersFirebase.signIn(
      document.getElementById('email').value,
      document.getElementById('password').value
    );
    TechLearnersAuthUI.goToDashboard(getStudentDestination(), 'Welcome back! Opening your dashboard...');
  } catch (error) {
    message.textContent = describeAuthError(error);
  }
}

async function studentRegister(event) {
  event.preventDefault();
  const message = document.getElementById('studentAuthMessage');
  if (!TechLearnersCaptcha.validate(event.currentTarget.closest('form'))) return;
  message.textContent = 'Creating account...';

  try {
    await TechLearnersFirebase.studentSignUp(
      document.getElementById('email').value,
      document.getElementById('password').value
    );
    TechLearnersAuthUI.goToDashboard(getStudentDestination(), 'Account created! Opening your dashboard...');
  } catch (error) {
    message.textContent = describeAuthError(error);
  }
}

async function studentGoogleLogin() {
  const message = document.getElementById('studentAuthMessage');
  if (!TechLearnersCaptcha.validate(document.querySelector('.login-light-card') || document.querySelector('[data-login-captcha]'))) return;
  message.textContent = 'Opening Google sign-in...';

  try {
    await TechLearnersFirebase.studentGoogleSignIn();
    TechLearnersAuthUI.goToDashboard(getStudentDestination(), 'Signed in! Opening your dashboard...');
  } catch (error) {
    message.textContent = describeAuthError(error);
  }
}

function describeAuthError(error) {
  const messages = {
    'auth/email-already-in-use': 'This email already has an account. Use Login instead.',
    'auth/invalid-credential': 'Email or password is incorrect.',
    'auth/invalid-email': 'Enter a valid email address.',
    'auth/operation-not-allowed': 'This sign-in method is not enabled in Firebase Authentication.',
    'auth/unauthorized-domain': 'Google sign-in is not authorized for this website domain. Add it under Firebase Authentication > Settings > Authorized domains.',
    'auth/popup-blocked': 'Allow pop-ups for this website and try Google sign-in again.',
    'auth/popup-closed-by-user': 'Google sign-in was cancelled.',
    'auth/weak-password': 'Choose a password with at least 6 characters.'
  };
  return messages[error.code] || error.message || 'Unable to complete authentication.';
}

function getStudentDestination() {
  const next = new URLSearchParams(location.search).get('next');
  return next && /^[a-zA-Z0-9/_-]+\.html$/.test(next) ? next : 'dashboard.html';
}

async function studentLogout() {
  await TechLearnersFirebase.signOut();
  location.href = 'login.html';
}

async function setupStudentDashboard() {
  const userName = document.getElementById('userName');
  if (!userName) return;

  const user = await TechLearnersFirebase.getCurrentUser();
  if (!user) {
    location.replace('login.html');
    return;
  }

  const name = user.displayName || user.email?.split('@')[0] || 'Student';
  userName.textContent = name;
  const logout = document.getElementById('studentLogout');
  if (logout) logout.addEventListener('click', studentLogout);
}

setupStudentDashboard();

async function finishGoogleRedirect() {
  const message = document.getElementById('studentAuthMessage');
  if (!message) return;

  try {
    const result = await TechLearnersFirebase.getGoogleRedirectResult();
    if (result?.user) TechLearnersAuthUI.goToDashboard(getStudentDestination(), 'Signed in! Opening your dashboard...');
  } catch (error) {
    message.textContent = describeAuthError(error);
  }
}

finishGoogleRedirect();

async function redirectLoggedInStudent() {
  if (!document.getElementById('studentAuthMessage')) return;
  const user = await TechLearnersFirebase.getCurrentUser();
  if (user) location.replace(getStudentDestination());
}

redirectLoggedInStudent();

function toggleAuthMode(mode) {
  const form = document.querySelector('.login-light-card');
  if (!form) return;
  const title = form.querySelector('.login-light-title');
  const subtitle = form.querySelector('.login-light-subtitle');
  const submitButton = form.querySelector('.login-submit-button');
  const footerLink = form.querySelector('.login-footer-link');
  const message = document.getElementById('studentAuthMessage');
  if (message) message.textContent = '';

  if (mode === 'register') {
    if (title) title.textContent = 'Create an account';
    if (subtitle) subtitle.textContent = 'Sign up to start your learning journey.';
    if (submitButton) submitButton.textContent = 'Create my account';
    form.setAttribute('onsubmit', 'studentRegister(event)');
    if (footerLink) {
      footerLink.innerHTML = 'Already have an account? <a href="#" onclick="toggleAuthMode(\'login\'); event.preventDefault();">Sign in instead</a>';
    }
  } else {
    if (title) title.textContent = 'Welcome back';
    if (subtitle) subtitle.textContent = 'Sign in to continue your learning journey.';
    if (submitButton) submitButton.textContent = 'Sign in to my account';
    form.setAttribute('onsubmit', 'studentLogin(event)');
    if (footerLink) {
      footerLink.innerHTML = 'New to TechLearners? <a href="#" onclick="toggleAuthMode(\'register\'); event.preventDefault();">Create a free account</a>';
    }
  }
}
window.toggleAuthMode = toggleAuthMode;
