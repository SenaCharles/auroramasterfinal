/* ============================================================
   conteudos.js — interações exclusivas da página Conteúdos
   Busca por texto + filtro por categoria, combinados
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const chips = Aurora.$$('.filters .chip');
  const searchInput = Aurora.$('#contentSearch');
  const cards = Aurora.$$('#contentGrid .content-card__link');
  const emptyState = Aurora.$('#emptyState');
  if (!cards.length) return;

  let activeCategory = 'todos';

  function applyFilters() {
    const query = (searchInput?.value || '').trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach(card => {
      const category = card.dataset.category;
      const title = card.querySelector('h4')?.textContent.toLowerCase() || '';
      const matchesCategory = activeCategory === 'todos' || category === activeCategory;
      const matchesQuery = !query || title.includes(query);
      const visible = matchesCategory && matchesQuery;
      card.style.display = visible ? '' : 'none';
      if (visible) visibleCount++;
    });

    emptyState?.classList.toggle('is-visible', visibleCount === 0);
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      activeCategory = chip.dataset.filter;
      applyFilters();
    });
  });

  searchInput?.addEventListener('input', applyFilters);
});
