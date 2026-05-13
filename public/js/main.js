/* ── 宽树·自然香道 — main.js ── */
'use strict';

/* ═══════════════ STATE ═══════════════ */
const state = {
  products: [],
  cart: { items: [], total: 0 },
  user: null,
  modalQty: 1
};

/* ═══════════════ PRODUCTS DATA (bilingual) ═══════════════ */
const INLINE_PRODUCTS = [
  {
    id: "king-series",
    name_cn: "国王｜沉稳香", name_en: "The King · Steady",
    subtitle_cn: "清醇基础款 · 日用标杆", subtitle_en: "Clean Base · Daily Standard",
    badge_cn: "基础款", badge_en: "Essential",
    price: 88,
    unit_cn: "4mm × 10cm 手工线香", unit_en: "4mm × 10cm Hand-rolled Incense",
    image: "/assets/images/products/king.png",
    intro_cn: "一款适合长期使用的基础标杆香。气息稳定，不挑环境，是日常点香最安心的一款。",
    intro_en: "A foundational incense for everyday use. Stable, versatile, and reliable — the most reassuring stick for daily burning.",
    material_cn: "喜马拉雅高原基础香材<br/>自然陈化，使香气由燥转润",
    material_en: "Himalayan highland base materials<br/>Naturally aged to smooth and round out the aroma",
    blend_cn: "结构简洁，以稳定为主<br/>不做复杂叠加，确保耐闻度",
    blend_en: "Simple structure focused on stability<br/>No over-complication — built for lasting appeal",
    spec_cn: "4mm × 10cm 手工线香<br/>香体敦实，燃烧均匀",
    spec_en: "4mm × 10cm Hand-rolled<br/>Dense body, even burn",
    scent_cn: "干净、克制、稳定<br/>久闻不腻",
    scent_en: "Clean, restrained, steady<br/>Never tires the nose"
  },
  {
    id: "boat-series",
    name_cn: "船师｜舒展香", name_en: "The Boatmaster · Unfolding",
    subtitle_cn: "陈韵典藏款 · 层次进阶", subtitle_en: "Aged Reserve · Layered Depth",
    badge_cn: "进阶款", badge_en: "Advanced",
    price: 128,
    unit_cn: "4mm × 10cm 手工线香", unit_en: "4mm × 10cm Hand-rolled Incense",
    image: "/assets/images/products/chuanshi.png",
    intro_cn: "在基础香之上增加层次结构。适合需要放松、长时间停留的空间。",
    intro_en: "Adds structural layers beyond the basics. Ideal for spaces where you want to unwind and linger.",
    material_cn: "多种高原陈化老料<br/>陈化时间更长，融合更自然",
    material_en: "Multiple highland aged materials<br/>Longer aging for more natural blending",
    blend_cn: "多层结构，逐步展开<br/>前后过渡自然",
    blend_en: "Multi-layered, unfolding gradually<br/>Seamless transitions from start to finish",
    spec_cn: "4mm × 10cm 手工线香<br/>密度更高，燃烧更稳",
    spec_en: "4mm × 10cm Hand-rolled<br/>Higher density, steadier burn",
    scent_cn: "温润舒展，层次清晰<br/>越闻越顺",
    scent_en: "Warm and expansive, clearly layered<br/>Grows smoother with each breath"
  },
  {
    id: "mutong-series",
    name_cn: "牧童｜清逸香", name_en: "The Shepherd · Clarity",
    subtitle_cn: "臻品老料款 · 高年份", subtitle_en: "Rare Reserve · High Vintage",
    badge_cn: "臻品款", badge_en: "Connoisseur",
    price: 188,
    unit_cn: "4mm × 10cm 手工线香", unit_en: "4mm × 10cm Hand-rolled Incense",
    image: "/assets/images/products/mutong.png",
    intro_cn: "以高年份老料为核心的顶配版本。香气不靠浓，而靠纯净与时间。",
    intro_en: "A top-tier edition built around high-vintage aged materials. The aroma relies not on intensity, but on purity and time.",
    material_cn: "高年份稀缺老料<br/>长期自然陈化，存量有限",
    material_en: "Rare high-vintage aged materials<br/>Long-term natural aging, limited stock",
    blend_cn: "以老料为主导<br/>减少人为干预",
    blend_en: "Aged materials take the lead<br/>Minimal human intervention",
    spec_cn: "4mm × 10cm 手工线香<br/>高密度，燃烧安静",
    spec_en: "4mm × 10cm Hand-rolled<br/>High density, burns in silence",
    scent_cn: "清透、干净、细腻<br/>尾韵悠长",
    scent_en: "Clear, pure, delicate<br/>A long, lingering finish"
  }
];

/* ═══════════════ HELPERS ═══════════════ */
function productField(p, field) {
  var key = field + '_' + currentLang;
  return p[key] || p[field + '_cn'] || '';
}

function pName(p) { return productField(p, 'name'); }
function pSubtitle(p) { return productField(p, 'subtitle'); }
function pBadge(p) { return productField(p, 'badge'); }
function pUnit(p) { return productField(p, 'unit'); }
function pIntro(p) { return productField(p, 'intro'); }
function pMaterial(p) { return productField(p, 'material'); }
function pBlend(p) { return productField(p, 'blend'); }
function pSpec(p) { return productField(p, 'spec'); }
function pScent(p) { return productField(p, 'scent'); }

/* ═══════════════ INIT ═══════════════ */
document.addEventListener('DOMContentLoaded', function () {
  state.products = INLINE_PRODUCTS;
  initCartFromStorage();
  renderCartBadge();
  renderProductCards();
  bindEvents();
});

/* ═══════════════ EVENTS ═══════════════ */
function bindEvents() {
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-action]');
    if (!btn) return;
    var action = btn.dataset.action;
    var id = btn.dataset.id;
    if (action === 'view') openProduct(id);
    if (action === 'cart') addToCart(id);
  });

  var cartBtn = document.getElementById('cart-btn');
  var cartOverlay = document.getElementById('cart-overlay');
  if (cartBtn) cartBtn.addEventListener('click', openCartSidebar);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCartSidebar);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeProductModal();
      closeCartSidebar(); closeDrawer();
    }
  });

  var productModal = document.getElementById('product-modal');
  if (productModal) {
    productModal.addEventListener('click', function (e) {
      if (e.target === productModal) closeProductModal();
    });
  }

  var navToggle = document.getElementById("nav-toggle");
  var drawerOverlay = document.getElementById("drawer-overlay");
  if (navToggle) navToggle.addEventListener("click", openDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener("click", closeDrawer);

  document.addEventListener('langChanged', function () {
    renderProductCards();
  });
}

/* ═══════════════ PRODUCT CARDS ═══════════════ */
function renderProductCards() {
  var grid = document.getElementById('products-grid');
  if (!grid) return;
  grid.innerHTML = state.products.map(function (p) {
    return '<div class="product-card">' +
      '<div class="product-img-wrap"><img src="' + p.image + '" alt="' + pName(p) + '" loading="lazy"></div>' +
      '<div class="product-info">' +
        '<p class="product-subtitle">' + pName(p) + '</p>' +
        '<h3 class="product-name">' + pSubtitle(p) + '</h3>' +
        '<p class="product-desc">' + pIntro(p).substring(0, 30) + '</p>' +
        '<div class="product-actions">' +
          '<span class="product-price">¥' + p.price + '</span>' +
          '<button class="btn btn-sm btn-outline" data-action="view" data-id="' + p.id + '">' + t('btn_view_detail') + '</button>' +
          '<button class="btn btn-sm" data-action="cart" data-id="' + p.id + '">' + t('btn_add_cart') + '</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');
}

/* ═══════════════ CART ═══════════════ */
function openDrawer() {
  document.getElementById("nav-drawer").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeDrawer() {
  document.getElementById("nav-drawer").classList.remove("open");
  document.body.style.overflow = "";
}

function initCartFromStorage() {
  try {
    var saved = localStorage.getItem('opentree_cart');
    if (saved) {
      var data = JSON.parse(saved);
      state.cart.items = data.items || [];
      state.cart.total = data.total || 0;
    }
  } catch (_) {}
}

function saveCart() {
  try {
    localStorage.setItem('opentree_cart', JSON.stringify({
      items: state.cart.items,
      total: state.cart.total
    }));
  } catch (_) {}
}

function addToCart(productId) {
  var product = state.products.find(function(p) { return p.id === productId; });
  if (!product) return;
  var name = pName(product);
  var exist = state.cart.items.find(function(i) { return i.id === productId; });
  if (exist) {
    exist.quantity += 1;
  } else {
    state.cart.items.push({ id: product.id, name: name, price: product.price, quantity: 1 });
  }
  state.cart.total = state.cart.items.reduce(function(s, i) { return s + i.price * i.quantity; }, 0);
  saveCart();
  renderCartBadge();
  showToast(t('toast_added') + name);
}

function removeFromCart(productId) {
  state.cart.items = state.cart.items.filter(function(i) { return i.id !== productId; });
  state.cart.total = state.cart.items.reduce(function(s, i) { return s + i.price * i.quantity; }, 0);
  saveCart();
  renderCartBadge();
  renderCartItems();
}

function clearCart() {
  state.cart.items = [];
  state.cart.total = 0;
  saveCart();
  renderCartBadge();
  renderCartItems();
}

function renderCartBadge() {
  var badge = document.getElementById('cart-badge');
  if (!badge) return;
  var count = state.cart.items.reduce(function(s, i) { return s + i.quantity; }, 0);
  badge.textContent = count;
  badge.style.display = count > 0 ? 'inline' : 'none';
}

function openCartSidebar() {
  var sidebar = document.getElementById('cart-sidebar');
  if (sidebar) sidebar.classList.add('open');
  renderCartItems();
}

function closeCartSidebar() {
  var sidebar = document.getElementById('cart-sidebar');
  if (sidebar) sidebar.classList.remove('open');
}

function renderCartItems() {
  var container = document.getElementById('cart-items');
  var empty = document.getElementById('cart-empty');
  var footer = document.getElementById('cart-footer');
  var totalEl = document.getElementById('cart-total-price');
  if (!container) return;
  if (state.cart.items.length === 0) {
    container.innerHTML = '<div class="cart-empty"><p>' + t('cart_empty') + '</p></div>';
    if (empty) empty.style.display = 'block';
    if (footer) footer.style.display = 'none';
    return;
  }
  if (empty) empty.style.display = 'none';
  if (footer) footer.style.display = 'block';
  if (totalEl) totalEl.textContent = '¥' + state.cart.total;
  container.innerHTML = state.cart.items.map(function(item) {
    return '<div class="cart-item">' +
      '<div class="cart-item-info"><p class="cart-item-name">' + item.name + '</p><p class="cart-item-price">¥' + item.price + '</p></div>' +
      '<div class="cart-item-actions"><span class="qty">×' + item.quantity + '</span>' +
      '<button class="btn-remove" data-remove="' + item.id + '">' + t('cart_remove') + '</button></div></div>';
  }).join('');
  container.querySelectorAll('[data-remove]').forEach(function(btn) {
    btn.addEventListener('click', function() { removeFromCart(btn.dataset.remove); });
  });
}

/* ═══════════════ PRODUCT MODAL ═══════════════ */
function openProduct(productId) {
  var product = state.products.find(function(p) { return p.id === productId; });
  if (!product) return;
  state.modalQty = 1;
  var modal = document.getElementById('product-modal');
  var body = document.getElementById('product-modal-body');
  if (!modal || !body) return;

  body.innerHTML =
    '<button class="modal-close-btn" id="pm-close-btn">' + t('pd_close') + '</button>' +
    '<div class="pm-layout">' +
      '<div class="pm-img-wrap"><img src="' + product.image + '" alt="' + pName(product) + '"></div>' +
      '<div class="pm-info">' +
        '<span class="pm-badge">' + pBadge(product) + '</span>' +
        '<h2 class="pm-title">' + pName(product) + '</h2>' +
        '<p class="pm-subtitle">' + pSubtitle(product) + '</p>' +
        '<p class="pm-desc">' + pIntro(product) + '</p>' +
        '<div class="pm-details">' +
          '<div class="pm-detail"><span class="pm-dl">' + t('pd_material') + '</span><span class="pm-dv">' + pMaterial(product) + '</span></div>' +
          '<div class="pm-detail"><span class="pm-dl">' + t('pd_blend') + '</span><span class="pm-dv">' + pBlend(product) + '</span></div>' +
          '<div class="pm-detail"><span class="pm-dl">' + t('pd_spec') + '</span><span class="pm-dv">' + pSpec(product) + '</span></div>' +
          '<div class="pm-detail"><span class="pm-dl">' + t('pd_scent') + '</span><span class="pm-dv">' + pScent(product) + '</span></div>' +
        '</div>' +
        '<div class="pm-price">¥' + product.price + '<span class="pm-unit">' + t('pd_per_box') + '</span></div>' +
        '<div class="pm-qty-row">' +
          '<span>' + t('pd_qty') + '</span>' +
          '<div class="pm-qty-ctrl">' +
            '<button class="pm-qty-btn" id="pm-qty-minus">−</button>' +
            '<span class="pm-qty-num" id="pm-qty-num">1</span>' +
            '<button class="pm-qty-btn" id="pm-qty-plus">+</button>' +
          '</div>' +
        '</div>' +
        '<button class="btn btn-primary pm-add-btn" data-action="cart" data-id="' + product.id + '">' + t('btn_add_cart') + '</button>' +
      '</div>' +
    '</div>';

  document.getElementById('pm-close-btn').addEventListener('click', closeProductModal);
  document.getElementById('pm-qty-minus').addEventListener('click', function() {
    if (state.modalQty > 1) { state.modalQty--; document.getElementById('pm-qty-num').textContent = state.modalQty; }
  });
  document.getElementById('pm-qty-plus').addEventListener('click', function() {
    state.modalQty++; document.getElementById('pm-qty-num').textContent = state.modalQty;
  });

  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  var modal = document.getElementById('product-modal');
  if (modal) {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}

/* ═══════════════ TOAST ═══════════════ */
function showToast(msg) {
  var old = document.querySelector('.ot-toast');
  if (old) old.remove();
  var toast = document.createElement('div');
  toast.className = 'ot-toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  requestAnimationFrame(function() { toast.classList.add('show'); });
  setTimeout(function() {
    toast.classList.remove('show');
    setTimeout(function() { toast.remove(); }, 300);
  }, 2000);
}
