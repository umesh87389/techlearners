async function studentLogin(event) {
  event.preventDefault();
  const message = document.getElementById('studentAuthMessage');
  message.textContent = 'Signing in...';

  try {
    await TechLearnersFirebase.signIn(
      document.getElementById('email').value,
      document.getElementById('password').value
    );
    location.href = 'dashboard.html';
  } catch (error) {
    message.textContent = describeAuthError(error);
  }
}

async function studentRegister(event) {
  event.preventDefault();
  const message = document.getElementById('studentAuthMessage');
  message.textContent = 'Creating account...';

  try {
    await TechLearnersFirebase.studentSignUp(
      document.getElementById('email').value,
      document.getElementById('password').value
    );
    location.href = 'dashboard.html';
  } catch (error) {
    message.textContent = describeAuthError(error);
  }
}

async function studentGoogleLogin() {
  const message = document.getElementById('studentAuthMessage');
  message.textContent = 'Opening Google sign-in...';

  try {
    await TechLearnersFirebase.studentGoogleSignIn();
    location.href = 'dashboard.html';
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
    'auth/popup-blocked': 'Allow pop-ups for this website and try Google sign-in again.',
    'auth/popup-closed-by-user': 'Google sign-in was cancelled.',
    'auth/weak-password': 'Choose a password with at least 6 characters.'
  };
  return messages[error.code] || error.message || 'Unable to complete authentication.';
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

  userName.textContent = user.email || 'Student';
  const logout = document.getElementById('studentLogout');
  if (logout) logout.addEventListener('click', studentLogout);
}

setupStudentDashboard();
