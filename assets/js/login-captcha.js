(function () {
  const forms = document.querySelectorAll('[data-login-captcha]');

  forms.forEach(form => {
    let expectedAnswer = 0;
    const captcha = document.createElement('fieldset');
    captcha.className = 'captcha-box';
    captcha.innerHTML = `<legend>Security check</legend>
      <div class="captcha-row">
        <label for="loginCaptchaAnswer">What is <span id="loginCaptchaQuestion"></span>?</label>
        <button class="btn small secondary" type="button" data-refresh-captcha>New question</button>
      </div>
      <input id="loginCaptchaAnswer" name="captchaAnswer" type="number" inputmode="numeric" autocomplete="off" required aria-describedby="loginCaptchaHelp">
      <p class="muted" id="loginCaptchaHelp">Answer this simple question before signing in.</p>`;

    const submitButton = form.querySelector('button[type="submit"]');
    form.insertBefore(captcha, submitButton);

    function refreshCaptcha() {
      const left = Math.floor(Math.random() * 8) + 2;
      const right = Math.floor(Math.random() * 8) + 1;
      expectedAnswer = left + right;
      captcha.querySelector('#loginCaptchaQuestion').textContent = `${left} + ${right}`;
      captcha.querySelector('input').value = '';
    }

    function validateCaptcha() {
      const answer = Number(captcha.querySelector('input').value);
      if (answer === expectedAnswer) return true;
      const help = captcha.querySelector('#loginCaptchaHelp');
      help.textContent = 'That answer is incorrect. Try the new question.';
      refreshCaptcha();
      captcha.querySelector('input').focus();
      return false;
    }

    captcha.querySelector('[data-refresh-captcha]').addEventListener('click', refreshCaptcha);
    form.addEventListener('submit', event => {
      if (validateCaptcha()) return;
      event.preventDefault();
      event.stopImmediatePropagation();
    }, true);
    form.addEventListener('captcha:validate', event => {
      if (!validateCaptcha()) event.preventDefault();
    });
    refreshCaptcha();
  });

  window.TechLearnersCaptcha = {
    validate(form) {
      if (!form) return true;
      const event = new Event('captcha:validate', { cancelable: true });
      return form.dispatchEvent(event);
    }
  };
})();
