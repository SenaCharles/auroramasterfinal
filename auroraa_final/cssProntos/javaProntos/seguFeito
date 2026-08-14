/* ============================================================
   seguranca.js — interações exclusivas da página Segurança
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  /* Feedback ao alternar os toggles do painel de demonstração */
  Aurora.$$('.security-card .toggle input').forEach(input => {
    input.addEventListener('change', () => {
      const label = input.closest('.security-row')?.querySelector('span')?.textContent || 'Opção';
      Aurora.showToast(`${label}: ${input.checked ? 'ativado' : 'desativado'}`);
    });
  });

  /* Botão de destaque abre o mesmo modal SOS do FAB */
  Aurora.$('#openSosBtn')?.addEventListener('click', () => {
    Aurora.$('#sosOverlay')?.classList.add('is-open');
  });
});
