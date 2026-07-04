/* ============================================================
   perfil.js — interações compartilhadas pelas páginas de perfil
   Valida e "envia" o formulário de solicitação de conversa
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const form = Aurora.$('#bookingForm');
  if (!form) return;

  const success = Aurora.$('#bookingSuccess');

  function setError(fieldWrap, message) {
    fieldWrap.classList.add('has-error');
    const errorEl = fieldWrap.querySelector('.field-error');
    if (errorEl) errorEl.textContent = message;
  }
  function clearError(fieldWrap) {
    fieldWrap.classList.remove('has-error');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = Aurora.$('#bookingName');
    const email = Aurora.$('#bookingEmail');
    const message = Aurora.$('#bookingMessage');

    [name, email, message].forEach(input => clearError(input.closest('.field')));

    if (!name.value.trim()) {
      setError(name.closest('.field'), 'Digite seu nome.');
      valid = false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      setError(email.closest('.field'), 'Digite um e-mail válido.');
      valid = false;
    }
    if (!message.value.trim() || message.value.trim().length < 10) {
      setError(message.closest('.field'), 'Conte um pouco mais (mín. 10 caracteres).');
      valid = false;
    }

    if (!valid) return;

    form.querySelector('button[type="submit"]').disabled = true;
    success?.classList.add('is-visible');
    Aurora.showToast('Sua solicitação foi enviada com sucesso.');
    form.reset();
    setTimeout(() => {
      form.querySelector('button[type="submit"]').disabled = false;
    }, 2500);
  });
});
