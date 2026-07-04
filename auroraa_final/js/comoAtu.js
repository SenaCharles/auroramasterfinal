/* ============================================================
   como-atuamos.js — interações exclusivas da página Como Atuamos
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  /* Scrollspy da sub-navegação (Eduque-se / Conecte-se / Cuide-se) */
  const subLinks = Aurora.$$('.subnav__link');
  const targets = subLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (targets.length) {
    const setActive = (id) => {
      subLinks.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === `#${id}`));
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-40% 0px -50% 0px' });
    targets.forEach(t => observer.observe(t));
  }

  /* Player de podcast (simulado com toast) */
  Aurora.$('#playFeatured')?.addEventListener('click', () => {
    Aurora.showToast('▶ Tocando: Reconhecendo padrões...');
  });

  Aurora.$$('.podcast-item').forEach(item => {
    item.addEventListener('click', () => {
      const title = item.querySelector('strong')?.textContent || 'episódio';
      Aurora.showToast(`▶ Tocando: ${title}`);
    });
  });
});
