
const PROJECTS = [

  {
    id: 'holzideen',
    title: 'Holzideen.org - Webseite & Onlineshop',
    subtitle: 'Webseite mit Word Press, Elementor und Woocomerce.',
    gradient: 'linear-gradient(135deg, #6d28d9 0%, #a21caf 45%, #ec4899 100%)',
    details: { dauer: '1 Woche', tools: 'WordPress, WooCommerce, Elementor, Cloudflare', jahr: '2025' },
    website: 'https://holzideen.org'
  },
  {
    id: 'controller-halter',
    title: 'Controller halter',
    subtitle: 'Controllerhalter aus Restholz mit LED-Beleuchtung.',
    img: 'Bilder/Controller.webp',
    imgs: ['Bilder/Controller.webp', 'Bilder/Controller1.webp'],
    details: { dauer: '3 Stunden', kosten: '10€', jahr: '2024' },
    website: null
  },
  {
    id: 'holzlockcard',
    title: 'Lockcard Wallet – CNC-Version',
    subtitle: 'Lockard Wallet aus 6mm Sperholz CNC Gefrässt.',
    img: 'Bilder/Lockcard.webp',
    imgs: ['Bilder/Lockcard.webp', 'Bilder/Lockcard1.webp'],
    details: { dauer: '2 Tage', kosten: '10€', Material: 'Lockard-Band, 6 mm Sperrholz', jahr: '2024' },
    website: null
  },
  {
    id: 'Redstone-Lager',
    title: 'Automatisches Redstone-Lager',
    subtitle: 'Automatisches Lager in Minecraft.',
    img: 'Bilder/RedstoneLager.webp',
    imgs: ['Bilder/RedstoneLager.webp'],
    details: { dauer: '1 Woche', tools: 'Minecraft Bedrock', jahr: '2024' },
    file: 'Downloads/Redstone_Lager.mcworld'
  },
  {
    id: 'amdlogo',
    title: 'AMD Logo – CNC-gefräst & RGB-beleuchtet',
    subtitle: 'AMD Logo aus 15mm Multiplex CNC Gefräßt mit ARGB Leds.',
    img: 'Bilder/amd_logo.webp',
    imgs: ['Bilder/amd_logo.webp', 'Bilder/amd_logo1.webp', 'Bilder/amd_logo2.webp'],
    details: { dauer: '1 Tag', kosten: '50€', Material: '15 mm Multiplex, ARGB-LED-Streifen', jahr: '2024' },
    file: null
  },
  {
    id: 'labornetztzteil',
    title: 'Labornetzteil aus PC-Netzteil',
    subtitle: 'Altes PC Netzteil alas Labornetzteil mit Lasergecutteten Gehäsue aus 3mm Pappel.',
    img: 'Bilder/Labor_Netzteil.webp',
    imgs: ['Bilder/Labor_Netzteil.webp', 'Bilder/Labor_Netzteil1.webp', 'Bilder/Labor_Netzteil2.webp'],
    details: { dauer: '2 Tage', kosten: '30€', Material: 'Altes PC-Netzteil, 3 mm Pappelsperrholz', jahr: '2024' },
    website: null
  },
  {
    id: 'serverack',
    title: '10 Zoll Holz Serverack',
    subtitle: '10 Zoll Serverack aus 12, 15 und 9mm Multiplex CNC Gefräßt Birke über Fingerzinken verbunden.',
    img: 'Bilder/10_Zoll_Rack_1.webp',
    imgs: ['Bilder/10_Zoll_Rack_1.webp', 'Bilder/10_Zoll_Rack_2.webp', 'Bilder/10_Zoll_Rack_3.webp', 'Bilder/10_Zoll_Rack_4.webp'],
    details: { dauer: '3 Wochen', Material: 'Multiplex 12, 9 und 15mm, M6 Muttern, 3D Gedruckte Füße aus TPU.', jahr: '2026' },
    website: null
  },
  {
    id: 'upmark?',
    title: '???',
    subtitle: 'Eine App für Achievements in Real Life',
    img: 'Bilder/realifeachievement.png',
    imgs: ['Bilder/realifeachievement.png'],
    details: { dauer: 'läuft noch', tools: 'Flutter, Supabase, Next.js', jahr: '2026' },
    website: 'https://upmark.farin-langner.de',
    GitHub: 'https://github.com/Farin25/real-live-achievement',
  },
  {
    id: 'dnsblocklist',
    title: 'DNS Blocklist / Pi-hole list',
    subtitle: 'Eine DNS Blockliste ',
    gradient: 'linear-gradient(135deg, #6d28d9 0%, #a21caf 45%, #ec4899 100%)',
    details: { jahr: '2026' },
    website: 'https://farin25.github.io/DNS-blocklists/',
    GitHub: 'https://github.com/Farin25/DNS-blocklists',
  },
];

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

(function initTheme() {
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (systemDark ? 'dark' : 'light');
  if (initial === 'dark') root.classList.add('dark');
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const sun = btn.querySelector('.sun');
  const moon = btn.querySelector('.moon');
  const updateIcon = () => {
    const dark = root.classList.contains('dark');
    sun.style.opacity = dark ? '0' : '1';
    sun.style.transform = dark ? 'scale(.75) rotate(90deg)' : 'scale(1)';
    moon.style.opacity = dark ? '1' : '0';
    moon.style.transform = dark ? 'scale(1) rotate(0deg)' : 'scale(.75) rotate(-90deg)';
  };
  updateIcon();
  btn.addEventListener('click', () => {
    root.classList.toggle('dark');
    localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
    updateIcon();
  });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.classList.toggle('dark', e.matches);
      updateIcon();
    }
  });
})();


(function initParallax() {
  const els = Array.from(document.querySelectorAll('[data-speed]'));
  if (!els.length) return;
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    window.requestAnimationFrame(() => {
      const y = window.scrollY;
      els.forEach(el => {
        const s = parseFloat(el.getAttribute('data-speed') || '0');
        el.style.transform = `translate3d(0, ${y * s}px, 0)`;
      });
      ticking = false;
    });
    ticking = true;
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();


(function initCursor() {
  const dot = document.getElementById('cursor-dot');
  if (!dot) return;
  let x = window.innerWidth / 2, y = window.innerHeight / 2;
  let tx = x, ty = y; let raf;
  const move = e => { tx = e.clientX; ty = e.clientY; };
  const loop = () => {
    x += (tx - x) * 0.15; y += (ty - y) * 0.15;
    dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    raf = requestAnimationFrame(loop);
  };
  if (!prefersReduced()) loop();
  window.addEventListener('mousemove', move, { passive: true });
  document.addEventListener('mouseleave', () => (dot.style.opacity = '0.2'));
  document.addEventListener('mouseenter', () => (dot.style.opacity = '1'));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf); else if (!prefersReduced()) loop();
  });
})();

(function initMagnetic() {
  document.querySelectorAll('.magnetic').forEach(el => {
    const onMove = e => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - .5) * 10;
      const y = ((e.clientY - r.top) / r.height - .5) * 10;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const onLeave = () => (el.style.transform = 'translate(0,0)');
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
  });
})();


(function initProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  const tpl = (p) => {

    const mediaContent = p.gradient
      ? `<div class="project-media" style="background:${p.gradient}"></div>`
      : `<div class="project-media"><img alt="${p.title}" src="${p.img || (p.imgs && p.imgs[0] ? p.imgs[0] : '')}" loading="lazy" /></div>`;

    return `
    <div class="project-card" data-id="${p.id}" tabindex="0" aria-label="Details zu ${p.title} öffnen" style="transform: perspective(900px)">
      ${mediaContent}
      <div style="margin-top:12px">
        <h3 style="margin:0; font-size:16px; font-weight:600">${p.title}</h3>
        <p style="margin:6px 0 0 0; color:var(--muted); font-size:14px">${p.subtitle}</p>
      </div>
      <span aria-hidden="true" style="position:absolute; inset:0; border-radius:20px; box-shadow: inset 0 0 0 1px var(--ring)"></span>
    </div>`;
  };

  grid.innerHTML = PROJECTS.map(tpl).join('');


  grid.querySelectorAll('.project-card').forEach(card => {
    let raf = 0;
    const onMove = e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const rx = (0.5 - y) * 8;
      const ry = (x - 0.5) * 10;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
    };
    const onLeave = () => (card.style.transform = 'perspective(900px) rotateX(0) rotateY(0)');
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
  });


  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.project-card');
    if (card) openModal(card.dataset.id);
  });
  grid.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const card = e.target.closest('.project-card');
      if (card) openModal(card.dataset.id);
    }
  });
})();


const modalBack = document.getElementById('modalBack');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalImg = document.getElementById('modalImg');
const metaList = document.getElementById('metaList');
const modalActions = document.querySelector('.modal-actions');


let _galleryState = { imgs: [], index: 0 };
function buildCarousel(imgs, startIndex = 0) {
  _galleryState.imgs = imgs.slice();
  _galleryState.index = Math.max(0, Math.min(startIndex, imgs.length - 1));

  const thumb = document.querySelector('.modal .thumb');
  thumb.style.height = 'auto';
  thumb.innerHTML = `
    <div class="carousel" role="group" aria-label="Bildergalerie">
      <button class="carousel-nav prev" aria-label="Vorheriges Bild">‹</button>
      <div class="carousel-viewport">
        <img class="carousel-image" alt="" />
      </div>
      <button class="carousel-nav next" aria-label="Nächstes Bild">›</button>
      <div class="carousel-dots" role="tablist" aria-label="Bildauswahl"></div>
      <div class="carousel-counter" aria-live="polite"></div>
    </div>`;

  const imgEl = thumb.querySelector('.carousel-image');
  const dotsEl = thumb.querySelector('.carousel-dots');
  const counterEl = thumb.querySelector('.carousel-counter');
  const prevBtn = thumb.querySelector('.carousel-nav.prev');
  const nextBtn = thumb.querySelector('.carousel-nav.next');

  function update() {
    const src = _galleryState.imgs[_galleryState.index];
    imgEl.src = src;
    imgEl.alt = `${_galleryState.index + 1} / ${_galleryState.imgs.length}`;


    dotsEl.innerHTML = _galleryState.imgs.map((_, i) =>
      `<button class="dot ${i === _galleryState.index ? 'active' : ''}" aria-label="Bild ${i + 1} anzeigen" data-i="${i}"></button>`
    ).join('');


    counterEl.textContent = `${_galleryState.index + 1} / ${_galleryState.imgs.length}`;


    prevBtn.disabled = _galleryState.index === 0;
    nextBtn.disabled = _galleryState.index === _galleryState.imgs.length - 1;
  }

  prevBtn.addEventListener('click', () => { if (_galleryState.index > 0) { _galleryState.index--; update(); } });
  nextBtn.addEventListener('click', () => { if (_galleryState.index < _galleryState.imgs.length - 1) { _galleryState.index++; update(); } });
  dotsEl.addEventListener('click', (e) => {
    const b = e.target.closest('.dot');
    if (!b) return;
    const i = parseInt(b.dataset.i, 10);
    if (!Number.isNaN(i)) { _galleryState.index = i; update(); }
  });


  function onKey(e) {
    const visible = modalBack && modalBack.style.display === 'flex';
    if (!visible) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); if (_galleryState.index > 0) { _galleryState.index--; update(); } }
    if (e.key === 'ArrowRight') { e.preventDefault(); if (_galleryState.index < _galleryState.imgs.length - 1) { _galleryState.index++; update(); } }
  }
  window.addEventListener('keydown', onKey);

  modalBack.addEventListener('transitionend', function cleanup() {
    if (modalBack.style.display === 'none') {
      window.removeEventListener('keydown', onKey);
      modalBack.removeEventListener('transitionend', cleanup);
    }
  });

  update();
}


function openModal(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p || !modalBack) return;
  modalTitle.textContent = p.title;
  modalSubtitle.textContent = p.subtitle;


  const thumb = document.querySelector('.modal .thumb');
  if (thumb) {
    if (p.gradient) {
      thumb.style.height = '320px';
      thumb.innerHTML = `<div class="gradient-box" style="width:100%; height:100%; background:${p.gradient}; border-radius:14px;"></div>`;
    } else if (p.imgs && p.imgs.length > 1) {

      buildCarousel(p.imgs, 0);
    } else {

      const src = (p.imgs && p.imgs[0]) ? p.imgs[0] : p.img;
      thumb.style.height = '320px';
      thumb.innerHTML = `<img src="${src}" alt="${p.title}" />`;
    }
  }


  metaList.innerHTML = '';
  for (const [k, v] of Object.entries(p.details || {})) {
    const label = ({ dauer: 'Dauer', kosten: 'Kosten', rolle: 'Rolle', tools: 'Tools', jahr: 'Jahr' })[k] || k;
    metaList.insertAdjacentHTML('beforeend', `<dt>${label}</dt><dd>${v}</dd>`);
  }


  modalActions.innerHTML = '';
  if (p.file) {
    const a = document.createElement('a');
    a.className = 'btn btn-primary';
    a.href = p.file;
    a.setAttribute('download', p.file.split('/').pop());
    a.textContent = 'Download';
    modalActions.appendChild(a);
  } else if (p.website) {
    const a = document.createElement('a');
    a.className = 'btn btn-primary';
    a.href = p.website;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = 'Website ansehen';
    modalActions.appendChild(a);
  }



  (function renderDescription() {
    try {

      let descHtml = '';
      if (p.description) {
        if (typeof p.description === 'string') {
          descHtml = p.description;
        } else if (typeof p.description === 'object') {
          descHtml = Object.entries(p.description)
            .map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`)
            .join('');
        }
      }

      if (!window.__descStylesAdded) {
        const style = document.createElement('style');
        style.textContent = `.modal-desc{margin-top:auto;max-height:30vh;overflow:auto;padding:12px;border-top:1px solid var(--ring);line-height:1.5}`;
        document.head.appendChild(style);
        window.__descStylesAdded = true;
      }

      const container = modalActions ? modalActions.parentElement : document.querySelector('.modal');
      if (container) {
        let box = container.querySelector('.modal-desc');
        if (!box) {
          box = document.createElement('div');
          box.className = 'modal-desc';
          container.appendChild(box);
        }
        if (descHtml) {
          box.innerHTML = descHtml;
          box.style.display = '';
        } else {
          box.style.display = 'none';
        }
      }
    } catch (e) { }
  })();

  modalBack.style.display = 'flex';
  modalBack.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  if (!modalBack) return;
  modalBack.style.display = 'none';
  modalBack.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
if (modalBack) {
  modalBack.addEventListener('click', (e) => { if (e.target === modalBack) closeModal(); });
  if (modalClose) modalClose.addEventListener('click', closeModal);
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
}


(function initParticles() {
  const c = document.getElementById('particles');
  if (!c) return;
  const ctx = c.getContext('2d', { alpha: true });
  let w = c.width = window.innerWidth; let h = c.height = window.innerHeight;
  const DPR = Math.min(2, window.devicePixelRatio || 1);
  c.width = w * DPR; c.height = h * DPR; c.style.width = w + 'px'; c.style.height = h + 'px'; ctx.scale(DPR, DPR);

  const count = Math.round(Math.min(120, (w * h) / 14000));
  const pts = Array.from({ length: count }, () => ({
    x: Math.random() * w, y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6
  }));
  let last = performance.now(); let anim;

  function draw(now) {
    const dt = Math.min(.033, (now - last) / 1000); last = now;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(124,58,237,.06)';
    ctx.strokeStyle = 'rgba(124,58,237,.09)';
    ctx.lineWidth = 1;
    for (let p of pts) {
      p.x += p.vx * (prefersReduced() ? 0 : 60 * dt);
      p.y += p.vy * (prefersReduced() ? 0 : 60 * dt);
      if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;
      ctx.beginPath(); ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2); ctx.fill();
    }
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d2 = dx * dx + dy * dy;
        if (d2 < 120 * 120) {
          ctx.globalAlpha = 1 - d2 / (120 * 120);
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); ctx.globalAlpha = 1;
        }
      }
    }
    anim = requestAnimationFrame(draw);
  }
  function onResize() {
    w = window.innerWidth; h = window.innerHeight;
    const DPR = Math.min(2, window.devicePixelRatio || 1);
    c.width = w * DPR; c.height = h * DPR; c.style.width = w + 'px'; c.style.height = h + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  function onVisibility() { if (document.hidden) cancelAnimationFrame(anim); else anim = requestAnimationFrame(draw); }

  anim = requestAnimationFrame(draw);
  window.addEventListener('resize', onResize);
  document.addEventListener('visibilitychange', onVisibility);
})();


(function initWave() {
  const canvas = document.getElementById('wave');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  function resize() {
    const w = canvas.clientWidth; const h = canvas.clientHeight;
    const DPR = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = w * DPR; canvas.height = h * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  let t = 0;
  (function draw() {
    const w = canvas.clientWidth; const h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, 'rgba(124,58,237,.14)'); g.addColorStop(1, 'rgba(124,58,237,.02)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(124,58,237,.6)';
    const rows = 6;
    for (let r = 0; r < rows; r++) {
      ctx.beginPath();
      for (let x = 0; x <= w; x += 8) {
        const y = h * .2 + r * (h / (rows + 1)) + Math.sin((x + t + r * 120) / 30) * 12;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    if (!prefersReduced()) t += 1.6; requestAnimationFrame(draw);
  })();
})();


const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();