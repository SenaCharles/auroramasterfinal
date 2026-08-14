/* ============================================================
   artigo.js — interações compartilhadas pelas páginas de artigo
   Barra de progresso de leitura
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const bar = Aurora.$('#readingProgress');
  const article = Aurora.$('.blog-article');
  if (!bar || !article) return;

  function update() {
    const total = article.offsetHeight - window.innerHeight * 0.5;
    const scrolled = window.scrollY - article.offsetTop + window.innerHeight * 0.3;
    const percent = Math.max(0, Math.min(100, (scrolled / total) * 100));
    bar.style.width = percent + '%';
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
});
