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

    const record = {
      teacherName: form.elements.teacherName.value.trim(),
      contact: form.elements.contact.value.trim(),
      className: form.elements.className.value,
      section: form.elements.section.value,
      activityName: form.elements.activityName.value.trim(),
      activityDate: form.elements.activityDate.value
    };

    if (!record.teacherName || !record.contact || !record.className || !record.section || !record.activityName || !record.activityDate) {
      status.textContent = 'Please fill in all required fields.';
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
      status.textContent = 'Your activity record has been submitted successfully. Each teacher can submit only once.';
      Array.from(form.elements).forEach((element) => {
        element.disabled = true;
      });
    } catch (error) {
      console.error('Failed to submit activity record:', error);
      status.textContent = error.message || 'Unable to submit your activity record.';
      submitBtn.disabled = false;
    }
  });
})();