/* ── 宽树·自然香道 — main.js ── */
'use strict';

/* ═══════════════ STATE ═══════════════ */
const state = {
  products: [],
  cart: { items: [], total: 0 },
  user: null,
  modalQty: 1
};

/* ═══════════════ PRODUCTS DATA ═══════════════ */
const INLINE_PRODUCTS = [
  {
    id: "king-series",
    name: "国王｜沉稳香",
    subtitle: "清醇基础款 · 日用标杆",
    badge: "基础款",
    price: 88,
    unit: "4mm × 10cm 手工线香",
    image: "/assets/images/products/king.png",
    intro: "一款适合长期使用的基础标杆香。气息稳定，不挑环境，是日常点香最安心的一款。",
    material: "喜马拉雅高原基础香材<br/>自然陈化，使香气由燥转润",
    blend: "结构简洁，以稳定为主<br/>不做复杂叠加，确保耐闻度",
    spec: "4mm × 10cm 手工线香<br/>香体敦实，燃烧均匀",
    scent: "干净、克制、稳定<br/>久闻不腻"
  },
  {
    id: "boat-series",
    name: "船师｜舒展香",
    subtitle: "陈韵典藏款 · 层次进阶",
    badge: "进阶款",
    price: 128,
    unit: "4mm × 10cm 手工线香",
    image: "/assets/images/products/chuanshi.png",
    intro: "在基础香之上增加层次结构。适合需要放松、长时间停留的空间。",
    material: "多种高原陈化老料<br/>陈化时间更长，融合更自然",
    blend: "多层结构，逐步展开<br/>前后过渡自然",
    spec: "4mm × 10cm 手工线香<br/>密度更高，燃烧更稳",
    scent: "温润舒展，层次清晰<br/>越闻越顺"
  },
  {
    id: "mutong-series",
    name: "牧童｜清逸香",
    subtitle: "臻品老料款 · 高年份",
    badge: "臻品款",
    price: 188,
    unit: "4mm × 10cm 手工线香",
    image: "/assets/images/products/mutong.png",
    intro: "以高年份老料为核心的顶配版本。香气不靠浓，而靠纯净与时间。",
    material: "高年份稀缺老料<br/>长期自然陈化，存量有限",
    blend: "以老料为主导<br/>减少人为干预",
    spec: "4mm × 10cm 手工线香<br/>高密度，燃烧安静",
    scent: "清透、干净、细腻<br/>尾韵悠长"
  }
];

/* ═══════════════ INIT ═══════════════ */
document.addEventListener('DOMContentLoaded', function () {
  state.products = INLINE_PRODUCTS;
  initCartFromStorage();
  renderCartBadge();
  bindEvents();
});

/* ═══════════════ EVENTS ═══════════════ */
function bindEvents() {
  // 产品卡片按钮 - 事件委托
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-action]');
    if (!btn) return;
    var action = btn.dataset.action;
    var id = btn.dataset.id;
    if (action === 'view') openProduct(id);
    if (action === 'cart') addToCart(id);
  });

  // 购物车按钮
  var cartBtn = document.getElementById('cart-btn');
  var cartOverlay = document.getElementById('cart-overlay');
  if (cartBtn) cartBtn.addEventListener('click', openCartSidebar);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCartSidebar);

  // ESC 关闭
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeProductModal();
      closeCartSidebar(); closeDrawer();
    }
  });

  // 点击遮罩关闭弹窗
  var productModal = document.getElementById('product-modal');
  if (productModal) {
    productModal.addEventListener('click', function (e) {
      if (e.target === productModal) closeProductModal();
    });
  }

  // 移动端抽屉导航
  var navToggle = document.getElementById("nav-toggle");
  var drawerOverlay = document.getElementById("drawer-overlay");
  if (navToggle) navToggle.addEventListener("click", openDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener("click", closeDrawer);
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
  var exist = state.cart.items.find(function(i) { return i.id === productId; });
  if (exist) {
    exist.quantity += 1;
  } else {
    state.cart.items.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
  }
  state.cart.total = state.cart.items.reduce(function(s, i) { return s + i.price * i.quantity; }, 0);
  saveCart();
  renderCartBadge();
  showToast('已加入: ' + product.name);
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
    container.innerHTML = '<div class="cart-empty"><p>购物车是空的</p></div>';
    if (empty) empty.style.display = 'block';
    if (footer) footer.style.display = 'none';
    return;
  }
  if (empty) empty.style.display = 'none';
  if (footer) footer.style.display = 'block';
  if (totalEl) totalEl.textContent = '\u00a5' + state.cart.total;
  container.innerHTML = state.cart.items.map(function(item) {
    return '<div class="cart-item">' +
      '<div class="cart-item-info"><p class="cart-item-name">' + item.name + '</p><p class="cart-item-price">\u00a5' + item.price + '</p></div>' +
      '<div class="cart-item-actions"><span class="qty">\u00d7' + item.quantity + '</span>' +
      '<button class="btn-remove" data-remove="' + item.id + '">删除</button></div></div>';
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
    '<button class="modal-close-btn" id="pm-close-btn">\u00d7</button>' +
    '<div class="pm-layout">' +
      '<div class="pm-img-wrap"><img src="' + product.image + '" alt="' + product.name + '"></div>' +
      '<div class="pm-info">' +
        '<span class="pm-badge">' + (product.badge || '') + '</span>' +
        '<h2 class="pm-title">' + product.name + '</h2>' +
        '<p class="pm-subtitle">' + product.subtitle + '</p>' +
        '<p class="pm-desc">' + product.intro + '</p>' +
        '<div class="pm-details">' +
          '<div class="pm-detail"><span class="pm-dl">原料与陈化</span><span class="pm-dv">' + product.material + '</span></div>' +
          '<div class="pm-detail"><span class="pm-dl">配比方式</span><span class="pm-dv">' + product.blend + '</span></div>' +
          '<div class="pm-detail"><span class="pm-dl">形制规格</span><span class="pm-dv">' + product.spec + '</span></div>' +
          '<div class="pm-detail"><span class="pm-dl">气味表现</span><span class="pm-dv">' + product.scent + '</span></div>' +
        '</div>' +
        '<div class="pm-price">\u00a5' + product.price + '<span class="pm-unit">/ 盒</span></div>' +
        '<div class="pm-qty-row">' +
          '<span>数量</span>' +
          '<div class="pm-qty-ctrl">' +
            '<button class="pm-qty-btn" id="pm-qty-minus">−</button>' +
            '<span class="pm-qty-num" id="pm-qty-num">1</span>' +
            '<button class="pm-qty-btn" id="pm-qty-plus">+</button>' +
          '</div>' +
        '</div>' +
        '<button class="btn btn-primary pm-add-btn" data-action="cart" data-id="' + product.id + '">加入购物车</button>' +
      '</div>' +
    '</div>';

  // 关闭按钮
  document.getElementById('pm-close-btn').addEventListener('click', closeProductModal);
  // 数量控制
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
