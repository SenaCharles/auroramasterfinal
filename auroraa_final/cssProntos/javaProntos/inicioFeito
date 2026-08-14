/* ============================================================
   inicio.js — interações exclusivas da página Início
   (depende de common.js, carregado antes deste arquivo)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  /* Revela seções suavemente conforme entram na tela */
  const revealEls = Aurora.$$('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => observer.observe(el));
  }

  /* Botão de início dá as boas-vindas com um toast */
  Aurora.$('#startBtn')?.addEventListener('click', () => {
    Aurora.showToast('Bem-vinda! Explore os conteúdos para começar.');
  });
});
