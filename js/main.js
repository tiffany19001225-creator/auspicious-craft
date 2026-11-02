/* ==========================================================================
   Auspicious Craft — Shared application shell
   Renders the global header & footer on every page, powers the language
   switcher, mobile menu, scroll effects and reveal animations.
   ========================================================================== */

/* --------------------------------------------------------------------------
   Inline icon set (no external icon library required)
   -------------------------------------------------------------------------- */
const ICONS = {
  logo: `<svg viewBox="0 0 44 44" class="w-11 h-11 drop-shadow-sm" aria-hidden="true">
    <circle cx="22" cy="22" r="21" fill="#7C1D2E"/>
    <circle cx="22" cy="22" r="21" fill="none" stroke="#D4A000" stroke-opacity=".45" stroke-width="1.5"/>
    <path d="M22 7 l2.6 6.4 6.4 1 -4.4 4.2 1 6.4 -5.6 -3.2 -5.6 3.2 1 -6.4 -4.4 -4.2 6.4 -1 Z" fill="#F5B800"/>
    <path d="M13 33 h18 M15 33 v-3 a7 7 0 0 1 14 0 v3" fill="none" stroke="#F5B800" stroke-width="2" stroke-linecap="round"/>
  </svg>`,
  email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-4 h-4"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-4 h-4"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-4 h-4"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5"><path d="m6 9 6 6 6-6"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" class="w-4 h-4"><path d="m5 12 5 5 9-10"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6"><path d="M6 6l12 12M18 6 6 18"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M13 22v-8h3l.5-4H13V7.5c0-1.1.3-2 2-2H16.5V2.1C16.2 2.06 15 2 14 2c-2.8 0-4.5 1.7-4.5 4.7V10H6v4h3.5v8Z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-5 h-5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5ZM3 9h4v12H3Zm7 0h3.8v1.7h.05c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6V21h-4v-5.5c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V21h-4Z"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.5 12 4.5 12 4.5s-7 0-8.9.6A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.6 8.9.6 8.9.6s7 0 8.9-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.5 12 31 31 0 0 0 23 7.2ZM9.8 15.3V8.7l6 3.3Z"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  quote: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-4 h-4"><path d="M7 8h3v6H8a2 2 0 0 1-2-2v-2a2 2 0 0 1 1-2Zm9 0h3v6h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 1-2Z"/></svg>`
};

/* --------------------------------------------------------------------------
   Language configuration
   -------------------------------------------------------------------------- */
/* Language config & dictionary are defined in js/i18n.js (loaded before this file) */

/* --------------------------------------------------------------------------
   Navigation model
   -------------------------------------------------------------------------- */
const NAV = [
  { key: 'home',     href: 'index.html',    i18n: 'nav.home' },
  { key: 'products', href: 'products.html', i18n: 'nav.products' },
  { key: 'about',    href: 'about.html',    i18n: 'nav.about' },
  { key: 'contact',  href: 'contact.html',  i18n: 'nav.contact' }
];

function currentPage() {
  return document.body.getAttribute('data-page') || '';
}

/* --------------------------------------------------------------------------
   Global header
   -------------------------------------------------------------------------- */
function renderHeader() {
  const page = currentPage();

  const navLinks = NAV.map(function (n) {
    const active = page === n.key ? ' is-active' : '';
    return '<a href="' + n.href + '" class="nav-link' + active + '" data-i18n="' + n.i18n + '">' + t(n.i18n) + '</a>';
  }).join('');

  const langOptions = Object.keys(LANGS).map(function (k) {
    const active = k === currentLang();
    const mark = active ? ICONS.check : '<span class="w-4 h-4 inline-block"></span>';
    return '<button type="button" data-lang="' + k + '" class="' + (active ? 'is-active' : '') + '">' + mark + '<span>' + LANGS[k].label + '</span></button>';
  }).join('');

  document.getElementById('site-header').innerHTML = `
  <div class="top-strip text-[13px]">
    <div class="container-x flex items-center justify-between gap-4 py-1.5">
      <p class="hidden md:flex items-center gap-2 font-medium tracking-wide" data-i18n="top.manufacturer">${t('top.manufacturer')}</p>
      <div class="flex items-center gap-5 ml-auto">
        <a href="mailto:${BRAND.email}" class="flex items-center gap-1.5 hover:text-gold-light transition-colors">${ICONS.email}<span class="hidden sm:inline">${BRAND.email}</span></a>
        <a href="tel:${BRAND.phone.replace(/[^+\\d]/g, '')}" class="flex items-center gap-1.5 hover:text-gold-light transition-colors">${ICONS.phone}<span class="hidden sm:inline">${BRAND.phone}</span></a>
      </div>
    </div>
  </div>

  <div class="nav-bar">
    <div class="container-x flex items-center justify-between gap-4 py-3">
      <a href="index.html" class="flex items-center gap-2.5 shrink-0" aria-label="${BRAND.name}">
        ${ICONS.logo}
        <span class="leading-tight">
          <span class="font-display text-2xl font-bold text-burgundy tracking-tight">${BRAND.name}</span>
          <span class="block text-[10px] uppercase tracking-[0.2em] text-wood font-semibold">${BRAND.tagline}</span>
        </span>
      </a>

      <nav class="hidden lg:flex items-center gap-7" aria-label="Primary">${navLinks}</nav>

      <div class="flex items-center gap-3">
        <div class="relative">
          <button id="langBtn" type="button" class="flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#e2d6bd] bg-white/60 hover:bg-white transition-colors text-sm font-semibold text-[#4a3c33]">
            ${ICONS.globe}<span id="langCurrent">${LANGS[currentLang()].code}</span>${ICONS.chevron}
          </button>
          <div id="langMenu" class="lang-menu">${langOptions}</div>
        </div>

        <a href="contact.html#inquiry" class="btn-gold hidden sm:inline-flex px-5 py-2.5 text-sm" data-i18n="cta.quote">${t('cta.quote')}</a>

        <button id="menuBtn" type="button" class="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-[#e2d6bd] text-burgundy" aria-label="Open menu">${ICONS.menu}</button>
      </div>
    </div>

    <div id="mobileMenu" class="lg:hidden hidden border-t border-[#eadfc9] bg-[#fffaf1]">
      <nav class="container-x flex flex-col py-3" aria-label="Mobile">
        ${navLinks}
        <a href="contact.html#inquiry" class="btn-gold mt-3 px-5 py-3 text-sm" data-i18n="cta.quote">${t('cta.quote')}</a>
      </nav>
    </div>
  </div>`;
}

/* --------------------------------------------------------------------------
   Global footer
   -------------------------------------------------------------------------- */
function renderFooter() {
  const year = new Date().getFullYear();

  const quickLinks = NAV.map(function (n) {
    return '<li><a href="' + n.href + '" class="hover:text-gold-light transition-colors" data-i18n="' + n.i18n + '">' + t(n.i18n) + '</a></li>';
  }).join('');

  const categoryLinks = CATEGORIES.map(function (c) {
    return '<li><a href="products.html?category=' + c.key + '" class="hover:text-gold-light transition-colors">' + catText(c, 'name') + '</a></li>';
  }).join('');

  const socials = [
    { icon: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/auspiciouscraft' },
    { icon: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/auspiciouscraft' },
    { icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/auspiciouscraft' },
    { icon: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@auspiciouscraft' }
  ].map(function (s) {
    return '<a href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + s.label + '" class="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-gold hover:text-night transition-colors">' + ICONS[s.icon] + '</a>';
  }).join('');

  document.getElementById('site-footer').innerHTML = `
  <footer class="bg-night text-[#e9ddc8] mt-20">
    <div class="container-x grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
      <div>
        <div class="flex items-center gap-2.5 mb-4">
          ${ICONS.logo}
          <span class="font-display text-2xl font-bold text-cream">${BRAND.name}</span>
        </div>
        <p class="text-sm leading-relaxed text-[#cbbfa6]" data-i18n="footer.about">${t('footer.about')}</p>
        <div class="flex items-center gap-2 mt-5">${socials}</div>
      </div>

      <div>
        <h3 class="font-display text-lg font-semibold text-gold-light mb-4" data-i18n="footer.quick">${t('footer.quick')}</h3>
        <ul class="space-y-2.5 text-sm">${quickLinks}</ul>
      </div>

      <div>
        <h3 class="font-display text-lg font-semibold text-gold-light mb-4" data-i18n="footer.catalogue">${t('footer.catalogue')}</h3>
        <ul class="space-y-2.5 text-sm">${categoryLinks}</ul>
      </div>

      <div>
        <h3 class="font-display text-lg font-semibold text-gold-light mb-4" data-i18n="footer.contact">${t('footer.contact')}</h3>
        <ul class="space-y-3 text-sm text-[#cbbfa6]">
          <li class="flex gap-2.5"><span class="text-gold-light mt-0.5">${ICONS.email}</span>${BRAND.email}</li>
          <li class="flex gap-2.5"><span class="text-gold-light mt-0.5">${ICONS.phone}</span>${BRAND.phone}</li>
          <li class="flex gap-2.5"><span class="text-gold-light mt-0.5">${ICONS.globe}</span>${BRAND.address}</li>
        </ul>
      </div>
    </div>

    <div class="border-t border-white/10">
      <div class="container-x py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#b8ab92]">
        <p>© <span data-year>${year}</span> ${BRAND.name}. <span data-i18n="footer.rights">${t('footer.rights')}</span></p>
        <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <span class="hover:text-gold-light transition-colors">GDPR Privacy Notice</span>
          <span class="text-[#8a7c64]">•</span>
          <span class="hover:text-gold-light transition-colors" data-i18n="footer.compliance">${t('footer.compliance')}</span>
          <span class="text-[#8a7c64]">•</span>
          <span class="flex items-center gap-1.5"><span class="inline-block w-2 h-2 rounded-full bg-pine-400"></span> Eco-friendly Material Statement</span>
        </div>
      </div>
    </div>
  </footer>`;
}

/* --------------------------------------------------------------------------
   i18n application + language switcher
   -------------------------------------------------------------------------- */
function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    const key = el.getAttribute('data-i18n');
    if (key && I18N[currentLang()] && I18N[currentLang()][key]) {
      el.textContent = I18N[currentLang()][key];
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) el.setAttribute('placeholder', t(key));
  });
}

function setLang(lang) {
  if (!LANGS[lang]) return;
  localStorage.setItem('sc_lang', lang);
  renderHeader();
  applyI18n();
  const current = document.getElementById('langCurrent');
  if (current) current.textContent = LANGS[lang].code;
  /* Re-render any page-specific translated content (e.g. homepage categories) */
  if (typeof window.renderCategoryGrid === 'function') window.renderCategoryGrid();
}

function wireHeaderEvents() {
  /* Event delegation on document — survives header re-rendering that happens
     when the language is switched (renderHeader rebuilds #site-header). */
  document.addEventListener('click', function (e) {
    const el = e.target; // always an Element for click events

    /* 1) Select a language from the dropdown */
    const langOpt = el.closest('#langMenu [data-lang]');
    if (langOpt) {
      setLang(langOpt.getAttribute('data-lang'));
      const menu = document.getElementById('langMenu');
      if (menu) menu.classList.remove('open');
      return;
    }

    /* 2) Toggle the language dropdown open / closed */
    if (el.closest('#langBtn')) {
      const menu = document.getElementById('langMenu');
      if (menu) menu.classList.toggle('open');
      return;
    }

    /* 3) Close the dropdown when clicking anywhere else */
    const menu = document.getElementById('langMenu');
    if (menu && !menu.contains(el)) menu.classList.remove('open');

    /* 4) Mobile menu toggle */
    const menuBtn = el.closest('#menuBtn');
    if (menuBtn) {
      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenu) {
        const open = !mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');
        menuBtn.innerHTML = open ? ICONS.menu : ICONS.close;
      }
    }
  });
}


/* --------------------------------------------------------------------------
   Scroll effects + reveal-on-scroll
   -------------------------------------------------------------------------- */
function wireScrollEffects() {
  const navBar = document.querySelector('.nav-bar');
  const onScroll = function () {
    if (navBar) navBar.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
  }
}

/* --------------------------------------------------------------------------
   Boot
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {
  renderHeader();
  renderFooter();
  applyI18n();
  wireHeaderEvents();
  wireScrollEffects();
});




