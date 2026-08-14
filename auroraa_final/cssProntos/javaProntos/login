/* ============================================================
   login.js — interações exclusivas da página de Login
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── MOSTRAR / OCULTAR SENHA ─────────────────────────── */
  const passwordInput = Aurora.$('#loginPassword');
  const passwordToggle = Aurora.$('#passwordToggle');

  passwordToggle?.addEventListener('click', () => {
    const isHidden = passwordInput.type === 'password';
    passwordInput.type = isHidden ? 'text' : 'password';
    passwordToggle.textContent = isHidden ? 'Ocultar' : 'Mostrar';
  });

  /* ─── ALTERNAR ENTRE LOGIN E RECUPERAR SENHA ─────────────── */
  const loginMode = Aurora.$('#loginMode');
  const recoverMode = Aurora.$('#recoverMode');

  Aurora.$('#showRecover')?.addEventListener('click', (e) => {
    e.preventDefault();
    loginMode.hidden = true;
    recoverMode.hidden = false;
  });

  Aurora.$('#backToLogin')?.addEventListener('click', (e) => {
    e.preventDefault();
    recoverMode.hidden = true;
    loginMode.hidden = false;
  });

  /* ─── VALIDAÇÃO DO LOGIN ──────────────────────────────── */
  const loginForm = Aurora.$('#loginForm');

  function setError(field, message) {
    field.classList.add('has-error');
    const err = field.querySelector('.field-error');
    if (err) err.textContent = message;
  }
  function clearError(field) { field.classList.remove('has-error'); }

  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const email = Aurora.$('#loginEmail');
    [email, passwordInput].forEach(input => clearError(input.closest('.field')));

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      setError(email.closest('.field'), 'Digite um e-mail válido.');
      valid = false;
    }
    if (!passwordInput.value) {
      setError(passwordInput.closest('.field'), 'Digite sua senha.');
      valid = false;
    }

    if (!valid) return;

    const submitBtn = loginForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Entrando...';
    Aurora.showToast('Login realizado com sucesso!');

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1200);
  });

  /* ─── RECUPERAR SENHA ──────────────────────────────────── */
  const recoverForm = Aurora.$('#recoverForm');
  recoverForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = Aurora.$('#recoverEmail');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    clearError(email.closest('.field'));
    if (!emailPattern.test(email.value.trim())) {
      setError(email.closest('.field'), 'Digite um e-mail válido.');
      return;
    }

    Aurora.showToast('Link de recuperação enviado para o seu e-mail.');
    recoverForm.reset();
  });

  /* ─── CRIAR CONTA (ainda não existe uma página dedicada) ── */
  Aurora.$('#createAccountLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    Aurora.showToast('Cadastro em breve! Explore os conteúdos gratuitos enquanto isso.');
    setTimeout(() => { window.location.href = 'conteudos.html'; }, 1600);
  });
});
