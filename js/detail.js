/* ==========================================================================
   Auspicious Craft — Product detail page
   Gallery switching, spec table, "Inquire Now" pre-fill and related items.
   ========================================================================== */

const detailProduct = getProductById(new URLSearchParams(window.location.search).get('id'));
let currentAngle = 0;

function specRows(p) {
  const rows = [
    [t('spec.material'), p.material],
    [t('spec.size'), p.sizeLabel],
    [t('spec.packing'), p.packing]
  ];
  return rows.map(function (r) {
    return '<div class="flex gap-4 py-3 border-b border-[#efe5d2] last:border-0">' +
      '<dt class="w-32 shrink-0 text-sm font-semibold text-[#7a6a55]">' + r[0] + '</dt>' +
      '<dd class="text-sm text-night">' + r[1] + '</dd></div>';
  }).join('');
}

function renderGallery() {
  const main = document.getElementById('mainImage');
  if (main) main.innerHTML = '<img src="' + detailProduct.image + '" alt="' + prodText(detailProduct, 'name') + '">';
  const thumbs = document.getElementById('thumbnails');
  if (thumbs) thumbs.innerHTML = '';
  const label = document.getElementById('angleLabel');
  if (label) label.textContent = '';
}

function renderDetail() {
  const p = detailProduct;
  const cat = CATEGORIES.find(function (x) { return x.key === p.category; });

  document.getElementById('breadcrumb').innerHTML =
    '<a href="index.html" class="hover:text-burgundy transition-colors">' + t('common.home') + '</a>' +
    '<span class="text-gold-600">/</span>' +
    '<a href="products.html" class="hover:text-burgundy transition-colors">' + t('detail.products') + '</a>' +
    '<span class="text-gold-600">/</span>' +
    '<a href="products.html?category=' + p.category + '" class="hover:text-burgundy transition-colors">' + (cat ? catText(cat, 'name') : p.category) + '</a>' +
    '<span class="text-gold-600">/</span>' +
    '<span class="text-night font-medium">' + prodText(p, 'name') + '</span>';

  document.getElementById('detailTitle').textContent = prodText(p, 'name');
  document.getElementById('detailModel').textContent = t('detail.itemNo') + ' ' + p.model;
  document.getElementById('detailPrice').textContent = formatPriceRange(p);
  document.getElementById('detailDesc').textContent = prodText(p, 'description');

  document.getElementById('highlightChips').innerHTML = (prodText(p, 'highlights') || p.highlights || []).map(function (h) {
    return '<span class="text-xs font-semibold px-3 py-1 rounded-full bg-pine-50 text-pine-700 border border-pine-200">' + h + '</span>';
  }).join('');

  document.getElementById('specList').innerHTML = specRows(p);

  const inquire = document.getElementById('inquireBtn');
  inquire.href = 'contact.html?product=' + encodeURIComponent(p.model + ' ' + prodText(p, 'name')) + '#inquiry';

  renderGallery();
  renderRelated();
}

function renderRelated() {
  const host = document.getElementById('relatedGrid');
  if (!host) return;
  host.innerHTML = getRelatedProducts(detailProduct, 4).map(function (r) {
    return '<article class="card-hover bg-white rounded-2xl overflow-hidden border border-[#eadfc9] shadow-sm flex flex-col">' +
      '<a href="detail.html?id=' + r.id + '" class="card-zoom product-frame"><img src="' + r.image + '" alt="' + prodText(r, 'name') + '" loading="lazy"></a>' +
      '<div class="p-4 flex flex-col flex-1">' +
      '<p class="text-[11px] uppercase tracking-[0.14em] text-gold-600 font-bold">' + r.model + '</p>' +
      '<h3 class="font-display text-base font-bold text-night leading-snug mt-1">' + prodText(r, 'name') + '</h3>' +
      '<a href="detail.html?id=' + r.id + '" class="mt-auto pt-3 inline-flex items-center gap-1.5 text-sm font-bold text-burgundy hover:text-gold-600 transition-colors">' + t('common.viewDetails') + ' ' + ICONS.arrow + '</a>' +
      '</div></article>';
  }).join('');
}

document.addEventListener('DOMContentLoaded', function () {
  renderDetail();

  const thumbs = document.getElementById('thumbnails');
  if (thumbs) {
    thumbs.addEventListener('click', function (e) {
      const btn = e.target.closest('button[data-angle]');
      if (!btn) return;
      currentAngle = parseInt(btn.getAttribute('data-angle'), 10);
      renderGallery();
    });
  }
});
