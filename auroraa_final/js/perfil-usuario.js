/* ============================================================
   perfil-usuario.js — interações exclusivas da página Meu Perfil
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── UPLOAD / PRÉVIA DA FOTO ─────────────────────────── */
  const photoInput = Aurora.$('#photoInput');
  const photoPreview = Aurora.$('#photoPreview');
  const photoImg = Aurora.$('#photoImg');
  const removePhotoBtn = Aurora.$('#removePhotoBtn');

  photoInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      Aurora.showToast('Escolha um arquivo de imagem válido.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      Aurora.showToast('A imagem precisa ter até 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      photoImg.src = ev.target.result;
      photoPreview.classList.add('has-photo');
      Aurora.showToast('Foto atualizada!');
    };
    reader.readAsDataURL(file);
  });

  removePhotoBtn?.addEventListener('click', () => {
    photoImg.src = '';
    photoPreview.classList.remove('has-photo');
    photoInput.value = '';
    Aurora.showToast('Foto removida.');
  });

  /* ─── FORMULÁRIO DE INFORMAÇÕES PESSOAIS ─────────────────── */
  const form = Aurora.$('#profileForm');
  const success = Aurora.$('#saveSuccess');

  function setError(field, message) {
    field.classList.add('has-error');
    const err = field.querySelector('.field-error');
    if (err) err.textContent = message;
  }
  function clearError(field) { field.classList.remove('has-error'); }

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = Aurora.$('#profileName');
    const email = Aurora.$('#profileEmail');

    [name, email].forEach(input => clearError(input.closest('.field')));

    if (!name.value.trim()) {
      setError(name.closest('.field'), 'Digite seu nome.');
      valid = false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      setError(email.closest('.field'), 'Digite um e-mail válido.');
      valid = false;
    }

    if (!valid) return;

    success?.classList.add('is-visible');
    Aurora.showToast('Perfil atualizado com sucesso.');
    setTimeout(() => success?.classList.remove('is-visible'), 4000);
  });

  /* ─── CONTADOR DE CARACTERES DA BIO ──────────────────────── */
  const bio = Aurora.$('#profileBio');
  const charCount = Aurora.$('#bioCharCount');
  bio?.addEventListener('input', () => {
    if (charCount) charCount.textContent = `${bio.value.length}/280`;
  });

  /* ─── TOGGLES DE PREFERÊNCIA ──────────────────────────────── */
  Aurora.$$('.photo-card .toggle input, .form-card .toggle input').forEach(input => {
    input.addEventListener('change', () => {
      const label = input.closest('.privacy-toggle, .security-row')?.querySelector('span')?.textContent || 'Preferência';
      Aurora.showToast(`${label}: ${input.checked ? 'ativado' : 'desativado'}`);
    });
  });
});
