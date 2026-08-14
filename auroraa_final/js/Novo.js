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

/* ============================================================
   quem-somos.js — interações exclusivas da página Quem Somos
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const stats = Aurora.$$('.stat__num');
  if (!stats.length) return;

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toLocaleString('pt-BR') + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  stats.forEach(el => observer.observe(el));
});

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
