document.getElementById('contactForm')?.addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.getElementById('contactStatus');
  status.textContent = 'Sending message...';

  try {
    await TechLearnersFirebase.submitContact({
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      message: form.elements.message.value.trim()
    });
    form.reset();
    status.textContent = 'Thank you. Your message has been sent.';
  } catch (error) {
    status.textContent = error.message || 'Unable to send your message.';
  }
});
