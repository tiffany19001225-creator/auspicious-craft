/* ==========================================================================
   Auspicious Craft — Products catalogue page
   Live search + multi-dimension filters + responsive product grid.
   ========================================================================== */

const filterState = { q: '', category: 'all', material: 'all', size: 'all', pieces: 'all' };

const SIZE_BUCKETS = [
  { key: 'all', labelKey: 'products.allSizes', test: function (cm) { return true; } },
  { key: 'small', labelKey: 'products.small', test: function (cm) { return cm <= 30; } },
  { key: 'medium', labelKey: 'products.medium', test: function (cm) { return cm >= 31 && cm <= 60; } },
  { key: 'large', labelKey: 'products.large', test: function (cm) { return cm > 60; } }
];

const PIECE_BUCKETS = [
  { key: 'all', labelKey: 'products.anySetSize', test: function (n) { return true; } },
  { key: '3-5', labelKey: 'products.pieces3to5', test: function (n) { return n >= 3 && n <= 5; } },
  { key: '6-9', labelKey: 'products.pieces6to9', test: function (n) { return n >= 6 && n <= 9; } },
  { key: '10-15', labelKey: 'products.pieces10to15', test: function (n) { return n >= 10 && n <= 15; } }
];

function availableMaterials() {
  const seen = {};
  PRODUCTS.forEach(function (p) { seen[p.material] = true; });
  return Object.keys(seen);
}

function getFiltered() {
  return PRODUCTS.filter(function (p) {
    if (filterState.category !== 'all' && p.category !== filterState.category) return false;
    if (filterState.material !== 'all' && p.material !== filterState.material) return false;

    if (filterState.size !== 'all') {
      const b = SIZE_BUCKETS.find(function (x) { return x.key === filterState.size; });
      if (b && !b.test(p.sizeCm)) return false;
    }
    if (filterState.pieces !== 'all') {
      const b = PIECE_BUCKETS.find(function (x) { return x.key === filterState.pieces; });
      if (b && !b.test(p.pieces)) return false;
    }
    if (filterState.q) {
      const hay = (p.name + ' ' + prodText(p, 'name') + ' ' + p.model + ' ' + p.material + ' ' + p.category + ' ' +
        (p.highlights || []).join(' ')).toLowerCase();
      if (hay.indexOf(filterState.q.toLowerCase()) === -1) return false;
    }
    return true;
  });
}

function productCard(p) {
  const hl = prodText(p, 'highlights') || p.highlights || [];
  const chips = hl.slice(0, 3).map(function (h) {
    return '<span class="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-pine-50 text-pine-700 border border-pine-200">' + h + '</span>';
  }).join('');

  return `
  <article class="card-hover group bg-white rounded-2xl overflow-hidden border border-[#eadfc9] shadow-sm flex flex-col">
    <a href="detail.html?id=${p.id}" class="card-zoom product-frame">
      <img src="${p.image}" alt="${prodText(p, 'name')}" loading="lazy">
    </a>
    <div class="p-5 flex flex-col flex-1">
      <p class="text-[11px] uppercase tracking-[0.16em] text-gold-600 font-bold">${p.model}</p>
      <h3 class="font-display text-lg font-bold text-night leading-snug mt-1">${prodText(p, 'name')}</h3>
      <div class="flex flex-wrap gap-1.5 mt-2.5">${chips}</div>
      <div class="mt-auto pt-4">
        <p class="text-sm text-[#7a6a55]">${t('spec.packing')}: <strong class="text-burgundy">${p.packing}</strong></p>
        <a href="detail.html?id=${p.id}" class="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-burgundy hover:text-gold-600 transition-colors">${t('common.viewDetails')} ${ICONS.arrow}</a>
      </div>
    </div>
  </article>`;
}


/* --------------------------------------------------------------------------
   Rendering
   -------------------------------------------------------------------------- */
function chip(o, active) {
  const base = 'px-3.5 py-2 rounded-full text-sm font-semibold border transition-colors whitespace-nowrap';
  const on = active ? ' bg-burgundy text-cream border-burgundy shadow-sm' : ' bg-white text-[#4a3c33] border-[#e2d6bd] hover:border-gold hover:text-burgundy';
  const label = o.labelKey ? t(o.labelKey) : o.label;
  return '<button type="button" data-key="' + o.key + '" class="' + base + on + '">' + label + '</button>';
}

function renderCategoryTabs() {
  const host = document.getElementById('categoryTabs');
  if (!host) return;
  const tabs = [{ key: 'all', name: t('products.all') }].concat(CATEGORIES).map(function (c) {
    const active = filterState.category === c.key;
    const base = 'px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors';
    const on = active ? ' bg-night text-cream border-night' : ' bg-white text-[#4a3c33] border-[#e2d6bd] hover:border-burgundy hover:text-burgundy';
    const name = c.key === 'all' ? c.name : catText(c, 'name');
    return '<button type="button" data-key="' + c.key + '" class="' + base + on + '">' + name + '</button>';
  }).join('');
  host.innerHTML = tabs;
}

function renderFilters() {
  const matHost = document.getElementById('materialChips');
  if (matHost) {
    const opts = [{ key: 'all', labelKey: 'products.allMaterials' }].concat(
      availableMaterials().map(function (m) { return { key: m, label: m }; })
    );
    matHost.innerHTML = opts.map(function (o) { return chip(o, filterState.material === o.key); }).join('');
  }

  const sizeHost = document.getElementById('sizeChips');
  if (sizeHost) {
    sizeHost.innerHTML = SIZE_BUCKETS.map(function (o) { return chip(o, filterState.size === o.key); }).join('');
  }

  const pieceHost = document.getElementById('piecesChips');
  if (pieceHost) {
    pieceHost.innerHTML = PIECE_BUCKETS.map(function (o) { return chip(o, filterState.pieces === o.key); }).join('');
  }
}

function renderGrid() {
  const grid = document.getElementById('productGrid');
  const count = document.getElementById('resultCount');
  const empty = document.getElementById('emptyState');
  if (!grid) return;

  const list = getFiltered();
  if (count) count.textContent = list.length + ' ' + t('products.found');

  grid.innerHTML = list.map(productCard).join('');
  if (empty) empty.classList.toggle('hidden', list.length !== 0);
  grid.classList.toggle('hidden', list.length === 0);
}

function render() {
  renderCategoryTabs();
  renderFilters();
  renderGrid();
}

/* --------------------------------------------------------------------------
   Wiring
   -------------------------------------------------------------------------- */
function wireControls() {
  const search = document.getElementById('searchInput');
  if (search) {
    search.addEventListener('input', function () {
      filterState.q = search.value.trim();
      renderGrid();
    });
  }

  function bind(hostId, field) {
    const host = document.getElementById(hostId);
    if (!host) return;
    host.addEventListener('click', function (e) {
      const btn = e.target.closest('button[data-key]');
      if (!btn) return;
      filterState[field] = btn.getAttribute('data-key');
      render();
    });
  }
  bind('categoryTabs', 'category');
  bind('materialChips', 'material');
  bind('sizeChips', 'size');
  bind('piecesChips', 'pieces');
}

document.addEventListener('DOMContentLoaded', function () {
  const catParam = new URLSearchParams(window.location.search).get('category');
  if (catParam && CATEGORIES.some(function (c) { return c.key === catParam; })) {
    filterState.category = catParam;
  }
  render();
  wireControls();
});
