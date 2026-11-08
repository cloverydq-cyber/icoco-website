import { createEffectScope } from './lifecycle.js'
/* =========================================================
   ICOCO META — interactions
   ========================================================= */
export function initInteractions() {
  const scope = createEffectScope();

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------
     1. Nav
  --------------------------------------------------- */
  const nav = document.getElementById('nav');
  const navLinks = document.getElementById('navLinks');
  const navInk = document.getElementById('navInk');
  const scrollBar = document.getElementById('scrollBar');

  function onScrollNav() {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  onScrollNav();

  /* ink indicator */
  if (navLinks && navInk) {
    const moveInk = el => {
      if (!el) { navInk.style.opacity = '0'; return; }
      const lr = navLinks.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      navInk.style.opacity = '1';
      navInk.style.width = r.width + 'px';
      navInk.style.transform = `translateX(${r.left - lr.left}px)`;
    };
    const links = Array.from(navLinks.querySelectorAll('.nav__link'));
    links.forEach(l => {
      scope.listen(l, 'mouseenter', () => moveInk(l));
      scope.listen(l, 'focus', () => moveInk(l));
    });
    scope.listen(navLinks, 'mouseleave', () => {
      const active = navLinks.querySelector('.nav__link.is-active');
      if (active) moveInk(active); else navInk.style.opacity = '0';
    });
    window.__moveInk = moveInk;
  }

  /* active section */
  const sectionMap = {
    home: document.getElementById('home'),
    products: document.getElementById('products'),
    news: document.getElementById('news'),
    about: document.getElementById('about')
  };
  const navObserver = scope.observer(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const id = e.target.id;
      document.querySelectorAll('.nav__link').forEach(l => {
        l.classList.toggle('is-active', l.dataset.nav === id);
      });
      if (window.__moveInk) window.__moveInk(document.querySelector(`.nav__link[data-nav="${id}"]`));
    });
  }, { rootMargin: '-40% 0px -52% 0px', threshold: 0 });
  Object.values(sectionMap).forEach(s => s && navObserver.observe(s));

  /* mobile menu */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    const items = mobileMenu.querySelectorAll('a');
    items.forEach((a, i) => a.style.setProperty('--i', i));
    const toggle = open => {
      burger.classList.toggle('is-open', open);
      mobileMenu.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.getElementById('marketing-root').classList.toggle('is-locked', open);
    };
    scope.listen(burger, 'click', () => toggle(!mobileMenu.classList.contains('is-open')));
    items.forEach(a => scope.listen(a, 'click', () => toggle(false)));
  }

  /* ---------------------------------------------------
     2. Cursor glow
  --------------------------------------------------- */
  const glow = document.getElementById('cursorGlow');
  if (glow && finePointer) {
    let gx = window.innerWidth / 2, gy = window.innerHeight / 2;
    let tx = gx, ty = gy, active = false;
    scope.listen(window, 'pointermove', e => {
      tx = e.clientX; ty = e.clientY;
      if (!active) { active = true; glow.style.opacity = '1'; }
    }, { passive: true });
    (function loop() {
      gx += (tx - gx) * 0.12;
      gy += (ty - gy) * 0.12;
      glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%,-50%)`;
      scope.frame(loop);
    })();
  }

  /* ---------------------------------------------------
     3. Hero scroll choreography
  --------------------------------------------------- */
  const stage = document.getElementById('heroStage');
  const heroContent = document.getElementById('heroContent');
  const heroScrollHint = document.getElementById('heroHint');

  let heroMobile = window.innerWidth <= 960;

  function updateHero() {
    if (!stage) return;
    const vh = window.innerHeight;
    const y = window.scrollY;

    if (heroMobile) {
      if (heroContent) { heroContent.style.transform = ''; heroContent.style.opacity = ''; }
      if (heroScrollHint) heroScrollHint.style.opacity = '';
      return;
    }

    const p = clamp(y / Math.max(vh, 1), 0, 1);

    if (heroContent) {
      const cp = clamp(p / 0.7, 0, 1);
      heroContent.style.transform = `translateY(calc(-52% + ${(-cp * 80).toFixed(1)}px))`;
      heroContent.style.opacity = String(clamp(1 - cp * 1.5, 0, 1));
    }

    if (heroScrollHint) heroScrollHint.style.opacity = String(clamp(1 - p * 3, 0, 1));
  }

  /* ---------------------------------------------------
     3b. Capability cards — scroll-driven entrance
     Each card's progress (--p: 0→1) follows its viewport
     position; per-index offsets stagger the wave so the
     row cascades left → right while scrolling.
  --------------------------------------------------- */
  const capCards = Array.from(document.querySelectorAll('.capcard'));

  function updateCaps() {
    if (!capCards.length || reduce) return;
    const vh = window.innerHeight;
    const start = vh * 1.02;   /* card top here → p = 0 */
    const span  = vh * 0.50;   /* scroll distance for the full rise */
    const step  = 0.055;       /* per-card wave offset */
    const norm  = 1 - step * (capCards.length - 1);
    capCards.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      if (r.top > start) { el.style.setProperty('--p', '0'); return; }
      let p = (start - r.top) / span;
      p = clamp((p - i * step) / norm, 0, 1);
      p = p * p * (3 - 2 * p);           /* smoothstep easing */
      el.style.setProperty('--p', p.toFixed(3));
    });
  }

  /* ---------------------------------------------------
     4. Scroll loop
  --------------------------------------------------- */
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    scope.frame(() => {
      ticking = false;
      onScrollNav();
      updateHero();
      updateCaps();
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollBar) scrollBar.style.width = (clamp(window.scrollY / Math.max(docH, 1), 0, 1) * 100).toFixed(2) + '%';
    });
  }
  scope.listen(window, 'scroll', onScroll, { passive: true });

  let rz;
  scope.listen(window, 'resize', () => {
    clearTimeout(rz);
    rz = setTimeout(() => {
      heroMobile = window.innerWidth <= 960;
      updateHero();
      updateCaps();
    }, 160);
  });

  /* ---------------------------------------------------
     5. Reveal on enter
  --------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    const io = scope.observer((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-in'));
  }

  /* ---------------------------------------------------
     6. Counters
  --------------------------------------------------- */
  const counters = document.querySelectorAll('[data-count]');
  const countObserver = scope.observer((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.count);
      const prefix = el.dataset.prefix || '';
      const dur = 1500;
      const t0 = performance.now();
      function step(now) {
        const k = clamp((now - t0) / dur, 0, 1);
        const v = Math.round(target * easeOut(k));
        el.textContent = prefix + v;
        if (k < 1) scope.frame(step);
      }
      scope.frame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(c => countObserver.observe(c));

  /* ---------------------------------------------------
     7. Tilt + spotlight
  --------------------------------------------------- */
  if (finePointer && !reduce) {
    document.querySelectorAll('[data-tilt]').forEach(el => {
      const strength = el.classList.contains('hcard') ? 7 : 5;
      scope.listen(el, 'pointermove', e => {
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width;
        const ny = (e.clientY - r.top) / r.height;
        el.style.setProperty('--mx', (nx * 100).toFixed(1) + '%');
        el.style.setProperty('--my', (ny * 100).toFixed(1) + '%');
        el.style.setProperty('--rx', ((0.5 - ny) * strength).toFixed(2) + 'deg');
        el.style.setProperty('--ry', ((nx - 0.5) * strength).toFixed(2) + 'deg');
      });
      scope.listen(el, 'pointerleave', () => {
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* spotlight for buttons */
  if (finePointer) {
    document.querySelectorAll('.btn').forEach(btn => {
      scope.listen(btn, 'pointermove', e => {
        const r = btn.getBoundingClientRect();
        btn.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        btn.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ---------------------------------------------------
     8. Magnetic buttons
  --------------------------------------------------- */
  if (finePointer && !reduce) {
    document.querySelectorAll('[data-magnetic]').forEach(el => {
      const base = el.style.transform;
      scope.listen(el, 'pointermove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.18;
        const y = (e.clientY - r.top - r.height / 2) * 0.28;
        el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      });
      scope.listen(el, 'pointerleave', () => { el.style.transform = base || ''; });
    });
  }

  /* ---------------------------------------------------
     9. Parallax on hero title (subtle)
  --------------------------------------------------- */
  if (finePointer && !reduce) {
    const title = document.querySelector('.hero__title');
    if (title) {
      scope.listen(window, 'pointermove', e => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        title.style.transform = `translate(${(-nx * 14).toFixed(1)}px, ${(-ny * 8).toFixed(1)}px)`;
      }, { passive: true });
    }
  }

  /* init */
  updateHero();
  updateCaps();
  onScroll();
  return () => {
    scope.dispose();
    clearTimeout(rz);
    delete window.__moveInk;
  };
}
