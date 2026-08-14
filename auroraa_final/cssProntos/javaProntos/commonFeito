/* ============================================================
   AURORA — common.js
   Comportamento compartilhado por TODAS as páginas:
   header, menu mobile, modal SOS, modo discreto, toast.
   Cada página também carrega seu próprio arquivo JS
   com interações específicas daquela página.
   ============================================================ */

const Aurora = (function () {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ─── TOAST (usado por várias páginas) ───────────────── */
  let toastTimer = null;
  function showToast(message, duration = 2600) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), duration);
  }

  /* ─── HEADER: sombra ao rolar ────────────────────────── */
  function initHeaderScroll() {
    const header = $('#header');
    if (!header) return;
    const onScroll = () => {
      header.style.boxShadow = window.scrollY > 8 ? '0 4px 24px rgba(45,31,61,0.08)' : 'none';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── MENU MOBILE (drawer) ───────────────────────────── */
  function initDrawer() {
    const hamburger = $('#hamburgerBtn');
    const drawer = $('#drawer');
    const overlay = $('#drawerOverlay');
    if (!hamburger || !drawer || !overlay) return;

    const open = () => {
      drawer.classList.add('is-open');
      overlay.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.classList.add('is-active');
    };
    const close = () => {
      drawer.classList.remove('is-open');
      overlay.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.classList.remove('is-active');
    };

    hamburger.addEventListener('click', () => {
      drawer.classList.contains('is-open') ? close() : open();
    });
    overlay.addEventListener('click', close);
    $$('.drawer__link', drawer).forEach(link => link.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  /* ─── MODAL SOS / SEGURANÇA ──────────────────────────── */
  function initSosModal() {
    const fab = $('#securityFab');
    const overlay = $('#sosOverlay');
    const closeBtn = $('#sosClose');
    const trigger = $('#sosTrigger');
    const feedback = $('#sosFeedback');
    if (!fab || !overlay) return;

    const open = () => overlay.classList.add('is-open');
    const close = () => overlay.classList.remove('is-open');

    fab.addEventListener('click', open);
    closeBtn?.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

    trigger?.addEventListener('click', () => {
      if (!feedback) return;
      feedback.hidden = false;
      trigger.disabled = true;
      showToast('Rede de Confiança avisada com sucesso.');
      setTimeout(() => { feedback.hidden = true; trigger.disabled = false; }, 4000);
    });
  }

  /* ─── MODO DISCRETO ───────────────────────────────────── */
  function initDiscreteMode() {
    const btn = $('#discreteBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      document.body.classList.toggle('is-discrete');
      const on = document.body.classList.contains('is-discrete');
      showToast(on ? 'Modo discreto ativado.' : 'Modo discreto desativado.');
    });
  }

  /* ─── BOTÕES GENÉRICOS (perfil, etc.) ────────────────── */
  function initHeaderMisc() {
    $('#profileBtn')?.addEventListener('click', () => {
      window.location.href = 'perfil.html';
    });
  }

  /* ─── ACCORDION (compartilhado, usado em várias páginas) ── */
  function initAccordion() {
    const items = $$('.accordion__item');
    if (!items.length) return;
    items.forEach(item => {
      const trigger = $('.accordion__trigger', item);
      trigger.addEventListener('click', () => {
        const wasOpen = item.classList.contains('is-open');
        items.forEach(i => i.classList.remove('is-open'));
        if (!wasOpen) item.classList.add('is-open');
      });
    });
  }

  /* ─── INIT ────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initDrawer();
    initSosModal();
    initDiscreteMode();
    initHeaderMisc();
    initAccordion();
  });

  /* API pública — usada pelos scripts de cada página */
  return { showToast, $, $$ };
})();
