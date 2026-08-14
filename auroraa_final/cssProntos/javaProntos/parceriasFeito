/* ============================================================
   parcerias.js — interações exclusivas da página Parcerias
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const chips = Aurora.$$('.filters .chip');
  const cards = Aurora.$$('#prosGrid .pro-card');
  if (!chips.length || !cards.length) return;

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');

      const wanted = chip.dataset.filter;
      cards.forEach(card => {
        const match = wanted === 'todas' || card.dataset.specialty === wanted;
        card.parentElement.style.display = match ? '' : 'none';
      });
    });
  });
});
