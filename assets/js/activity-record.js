(function () {
  const form = document.getElementById('activityRecordForm');
  if (!form) return;

  const status = document.getElementById('activityStatus');
  const submitBtn = document.getElementById('activitySubmitBtn');

  function validateContact(value) {
    const v = String(value || '').trim();
    if (v.includes('@')) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }
    const digits = v.replace(/\D/g, '');
    return digits.length >= 7;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (submitBtn.disabled) return;

    const sections = Array.from(form.querySelectorAll('input[name="sections"]:checked')).map((input) => input.value);

    const record = {
      teacherName: form.elements.teacherName.value.trim(),
      contact: form.elements.contact.value.trim(),
      className: form.elements.className.value,
      sections,
      activityName: form.elements.activityName.value.trim(),
      activityDate: form.elements.activityDate.value
    };

    if (!record.teacherName || !record.contact || !record.className || !sections.length || !record.activityName || !record.activityDate) {
      status.textContent = 'Please fill in all required fields and select at least one section.';
      return;
    }
    if (!validateContact(record.contact)) {
      status.textContent = 'Please enter a valid email or phone number.';
      return;
    }

    submitBtn.disabled = true;
    status.textContent = 'Submitting your activity record...';

    try {
      await TechLearnersFirebase.submitActivityRecord(record);
      form.reset();
      status.textContent = 'Your activity record has been submitted successfully.';
      Array.from(form.elements).forEach((element) => {
        element.disabled = true;
      });
    } catch (error) {
      console.error('Failed to submit activity record:', error);
      const message = error.message || 'Unable to submit your activity record.';
      if (message.toLowerCase().includes('already submitted')) {
        alert('This email/phone number has already submitted an activity record.');
      }
      status.textContent = message;
      submitBtn.disabled = false;
    }
  });
})();