async function adminLogin(event) {
  event.preventDefault();
  const message = document.getElementById('adminLoginMessage');
  message.textContent = 'Signing in...';

  try {
    await TechLearnersContent.signIn(
      document.getElementById('adminEmail').value,
      document.getElementById('adminPass').value
    );
    location.href = 'admin-dashboard.html';
  } catch (error) {
    message.textContent = error.message || 'Unable to sign in.';
  }
}
