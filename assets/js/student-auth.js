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
    message.textContent = error.message || 'Unable to sign in.';
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
    message.textContent = error.message || 'Unable to create account.';
  }
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
