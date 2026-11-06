(function () {
  const form = document.getElementById('conductedActivityRecordForm');
  if (!form) return;

  const status = document.getElementById('conductedActivityStatus');
  const submitBtn = document.getElementById('conductedActivitySubmitBtn');

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
      activityDate: form.elements.activityDate.value,
      conducted: true
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
    status.textContent = 'Submitting your conducted activity record...';

    try {
      await TechLearnersFirebase.submitActivityRecord(record);
      form.reset();
      status.textContent = 'Your conducted activity record has been submitted successfully.';
      Array.from(form.elements).forEach((element) => {
        element.disabled = true;
      });
    } catch (error) {
      console.error('Failed to submit conducted activity record:', error);
      status.textContent = error.message || 'Unable to submit your conducted activity record.';
      submitBtn.disabled = false;
    }
  });
})();