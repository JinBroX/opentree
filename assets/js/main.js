// ================================================================
// main.js — Navigation, scroll effects, animations
// ================================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile nav toggle ----
  const navToggle = document.getElementById('navToggle');
  const siteNav   = document.getElementById('siteNav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      siteNav.classList.toggle('open');
    });
    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => siteNav.classList.remove('open'));
    });
  }

  // ---- Sticky header ----
  const header = document.getElementById('siteHeader');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- Scroll reveal ----
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -50px 0px' });

  function observeReveal(el) {
    revealObserver.observe(el);
  }
  window.observeReveal = observeReveal;

  document.querySelectorAll('.reveal, .reveal-left').forEach(el => revealObserver.observe(el));

  // ---- Cart controls ----
  document.getElementById('cartBtn')?.addEventListener('click', openCart);
  document.getElementById('cartClose')?.addEventListener('click', closeCart);
  document.getElementById('cartOverlay')?.addEventListener('click', closeCart);

  // ---- Sync lang-toggle button states ----
  document.addEventListener('langChanged', (e) => {
    const lang = e.detail?.lang || currentLang;
    // New style: lang-toggle buttons (no data-lang class, just onclick)
    document.querySelectorAll('.lang-toggle button, .footer-lang button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    // Legacy: lang-btn
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  });

});
