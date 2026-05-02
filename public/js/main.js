/* ────────────────────────────────────────────────
   宽树香品 · 主逻辑
   ─────────────────────────────────────────────── */
const API = 'http://localhost:3001/api';

// ─── 状态 ────────────────────────────────────────
let state = {
  user: null,
  token: null,
  cart: [],
  products: [],
  authCallback: null,  // 登录后需要执行的回调（如：继续结算）
};

// ─── 持久化 ─────────────────────────────────────
function saveAuth(user, token) {
  state.user = user;
  state.token = token;
  localStorage.setItem('ks_user', JSON.stringify(user));
  localStorage.setItem('ks_token', token);
  updateUserUI();
}
function loadAuth() {
  try {
    const u = localStorage.getItem('ks_user');
    const t = localStorage.getItem('ks_token');
    if (u && t) { state.user = JSON.parse(u); state.token = t; }
  } catch {}
}
function clearAuth() {
  state.user = null; state.token = null;
  localStorage.removeItem('ks_user');
  localStorage.removeItem('ks_token');
  localStorage.removeItem('ks_guest_cart');
  state.cart = [];
  renderCart();
  updateUserUI();
}

// ─── API 请求 ────────────────────────────────────
async function api(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (state.token) headers['Authorization'] = `Bearer ${state.token}`;
  const res = await fetch(`${API}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || '请求失败');
  return data;
}

// ─── 产品 ────────────────────────────────────────
async function loadProducts() {
  try {
    const { data } = await api('/products');
    state.products = data;
    renderProducts();
  } catch (e) {
    console.error(e);
  }
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  grid.innerHTML = state.products.map((p, i) => `
    <div class="product-card reveal reveal-delay-${i + 1}" onclick="openProduct('${p.id}')">
      <span class="product-badge">${p.badge}</span>
      <div class="product-img-wrap">
        ${productImageOrPlaceholder(p, 'product-img')}
      </div>
      <div class="product-info">
        <p class="product-subtitle">${p.subtitle}</p>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.shortDesc}</p>
        <div class="product-pricing">
          <span class="product-price">¥${p.price}</span>
          <span class="product-original">¥${p.originalPrice}</span>
          <span class="product-unit">${p.unit}</span>
        </div>
        <div class="product-actions">
          <button class="btn btn-ghost" onclick="event.stopPropagation();openProduct('${p.id}')">了解详情</button>
          <button class="btn btn-primary" onclick="event.stopPropagation();addToCart('${p.id}', 1)">加入购物车</button>
        </div>
      </div>
    </div>
  `).join('');
  setupReveal();
}

function productImageOrPlaceholder(p, cls = '') {
  // 尝试加载图片，若不存在则显示艺术占位
  const placeholders = {
    'p001': `<div class="product-placeholder">
      <svg width="40" height="80" viewBox="0 0 40 80" fill="none">
        <rect x="18" y="10" width="4" height="60" rx="2" fill="#7a5c38" opacity="0.7"/>
        <rect x="26" y="6" width="4" height="64" rx="2" fill="#9c7a52" opacity="0.5"/>
        <rect x="10" y="14" width="4" height="56" rx="2" fill="#c49a6c" opacity="0.4"/>
        <ellipse cx="20" cy="9" rx="3" ry="4" fill="#c49a6c" opacity="0.6"/>
        <path d="M20 4 Q22 0 24 4 Q20 6 16 4 Q18 0 20 4Z" fill="#c49a6c" opacity="0.5"/>
      </svg>
      <span style="font-size:0.75rem;color:var(--text-light)">沉香线香</span>
    </div>`,
    'p002': `<div class="product-placeholder">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <path d="M40 10 Q60 25 70 40 Q60 60 40 70 Q20 60 10 40 Q20 20 40 10Z" stroke="#7a5c38" stroke-width="2" fill="none" opacity="0.6"/>
        <path d="M40 18 Q55 28 62 40 Q55 55 40 62 Q25 55 18 40 Q25 25 40 18Z" stroke="#c49a6c" stroke-width="1.5" fill="none" opacity="0.5"/>
        <circle cx="40" cy="40" r="6" fill="#7a5c38" opacity="0.4"/>
      </svg>
      <span style="font-size:0.75rem;color:var(--text-light)">檀香盘香</span>
    </div>`,
    'p003': `<div class="product-placeholder">
      <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
        <rect x="26" y="8" width="8" height="56" rx="4" fill="#7a5c38" opacity="0.6"/>
        <rect x="20" y="10" width="20" height="4" rx="2" fill="#c49a6c" opacity="0.4"/>
        <rect x="20" y="18" width="20" height="3" rx="1.5" fill="#c49a6c" opacity="0.3"/>
        <path d="M30 6 Q33 2 30 0 Q27 2 30 6Z" fill="#9c7a52" opacity="0.6"/>
      </svg>
      <span style="font-size:0.75rem;color:var(--text-light)">艾草净化香</span>
    </div>`,
  };
  return placeholders[p.id] || `<div class="product-placeholder"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c49a6c" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>`;
}

// ─── 产品详情 modal ──────────────────────────────
function openProduct(id) {
  const p = state.products.find(x => x.id === id);
  if (!p) return;
  const modal = document.getElementById('product-modal');
  const content = document.getElementById('product-modal-content');

  const ingredientRows = (p.ingredients || []).map(i => `
    <tr>
      <td><span class="ingredient-name">${i.name}</span></td>
      <td>${i.origin}</td>
      <td>${i.role}</td>
      <td>${i.ratio}</td>
    </tr>
  `).join('');

  const processSteps = (p.process || []).map(s => `
    <div class="process-step">
      <div class="process-step-num">${s.step}</div>
      <div class="process-step-content">
        <h5>${s.title}</h5>
        <p>${s.desc}</p>
      </div>
    </div>
  `).join('');

  const tags = (p.tags || []).map(t => `<span class="usage-tag">${t}</span>`).join('');

  content.innerHTML = `
    <button class="modal-close" onclick="closeProduct()">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div class="pd-header">
      <div class="pd-img-wrap">
        ${productImageOrPlaceholder(p)}
      </div>
      <div class="pd-basic">
        <p class="pd-subtitle">${p.subtitle}</p>
        <h2 class="pd-name">${p.name}</h2>
        <div class="pd-price-wrap">
          <span class="pd-price">¥${p.price}</span>
          <span class="pd-original">¥${p.originalPrice}</span>
        </div>
        <p class="pd-unit">${p.unit}</p>
        <p class="pd-short-desc">${p.shortDesc}</p>
        <div class="pd-specs">
          <div class="pd-spec"><span class="pd-spec-key">燃烧时长</span><span class="pd-spec-val">${p.burnTime}</span></div>
          <div class="pd-spec"><span class="pd-spec-key">规格</span><span class="pd-spec-val">${p.dimensions}</span></div>
        </div>
        <div class="pd-qty-row">
          <span class="pd-qty-label">数量</span>
          <div class="qty-control">
            <button class="qty-btn" onclick="adjustPdQty(-1)">−</button>
            <span class="qty-num" id="pd-qty">1</span>
            <button class="qty-btn" onclick="adjustPdQty(1)">+</button>
          </div>
        </div>
        <div class="pd-actions">
          <button class="btn btn-ghost" onclick="closeProduct()">继续逛逛</button>
          <button class="btn btn-primary" onclick="pdAddToCart('${p.id}')">加入购物车</button>
        </div>
      </div>
    </div>
    <div class="pd-body">
      <div class="pd-tabs">
        <button class="pd-tab active" onclick="switchPdTab(event, 'ingredients')">配料介绍</button>
        <button class="pd-tab" onclick="switchPdTab(event, 'process')">生产工艺</button>
        <button class="pd-tab" onclick="switchPdTab(event, 'usage')">使用 &amp; 故事</button>
      </div>
      <div class="pd-tab-content active" id="pd-tab-ingredients">
        <table class="ingredients-table">
          <thead><tr><th>原料名称</th><th>产地</th><th>作用</th><th>占比</th></tr></thead>
          <tbody>${ingredientRows}</tbody>
        </table>
      </div>
      <div class="pd-tab-content" id="pd-tab-process">
        <div class="process-steps">${processSteps}</div>
      </div>
      <div class="pd-tab-content" id="pd-tab-usage">
        <div class="smell-block">
          <span class="usage-label">香气层次</span>
          <p class="usage-block">${p.smell}</p>
        </div>
        <div>
          <span class="usage-label">使用建议</span>
          <p class="usage-block">${p.usage}</p>
          <div class="usage-tags">${tags}</div>
        </div>
        <div style="margin-top:24px">
          <span class="usage-label">产品故事</span>
          <p class="story-block">${p.story}</p>
        </div>
      </div>
    </div>
  `;

  modal.style.display = '';
  document.body.style.overflow = 'hidden';
}
function closeProduct() {
  document.getElementById('product-modal').style.display = 'none';
  document.body.style.overflow = '';
}
function switchPdTab(e, tab) {
  document.querySelectorAll('.pd-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.pd-tab-content').forEach(c => c.classList.remove('active'));
  e.target.classList.add('active');
  document.getElementById('pd-tab-' + tab).classList.add('active');
}
function adjustPdQty(delta) {
  const el = document.getElementById('pd-qty');
  if (!el) return;
  let v = parseInt(el.textContent) + delta;
  if (v < 1) v = 1;
  if (v > 99) v = 99;
  el.textContent = v;
}
function pdAddToCart(productId) {
  const qty = parseInt(document.getElementById('pd-qty')?.textContent || '1');
  addToCart(productId, qty);
  closeProduct();
}

// ─── 购物车 ──────────────────────────────────────
async function loadCart() {
  if (state.token) {
    try {
      const { data } = await api('/cart');
      state.cart = data || [];
    } catch {
      state.cart = [];
    }
  } else {
    // 未登录：从 localStorage 恢复
    try {
      state.cart = JSON.parse(localStorage.getItem('ks_guest_cart')) || [];
    } catch {
      state.cart = [];
    }
  }
  renderCart();
}

async function addToCart(productId, quantity = 1) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  // 更新本地状态
  const idx = state.cart.findIndex(i => i.productId === productId);
  if (idx >= 0) {
    state.cart[idx].quantity += quantity;
  } else {
    state.cart.push({
      productId,
      quantity,
      name: product.name,
      price: product.price,
      image: product.image || ''
    });
  }

  renderCart();

  if (state.token) {
    // 已登录：同步到服务端
    try {
      const { data } = await api('/cart', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity }),
      });
      state.cart = data;
      renderCart();
    } catch (e) {
      showToast(e.message, 'error');
    }
  } else {
    // 未登录：存到 localStorage
    localStorage.setItem('ks_guest_cart', JSON.stringify(state.cart));
  }

  showToast('已加入购物车', 'success');
}

async function updateCartItem(productId, quantity) {
  if (quantity <= 0) { removeCartItem(productId); return; }

  const idx = state.cart.findIndex(i => i.productId === productId);
  if (idx >= 0) state.cart[idx].quantity = quantity;
  renderCart();

  if (state.token) {
    try {
      const { data } = await api(`/cart/${productId}`, {
        method: 'PUT',
        body: JSON.stringify({ quantity }),
      });
      state.cart = data;
      renderCart();
    } catch {}
  } else {
    localStorage.setItem('ks_guest_cart', JSON.stringify(state.cart));
  }
}

async function removeCartItem(productId) {
  state.cart = state.cart.filter(i => i.productId !== productId);
  renderCart();

  if (state.token) {
    try {
      const { data } = await api(`/cart/${productId}`, { method: 'DELETE' });
      state.cart = data;
      renderCart();
    } catch {}
  } else {
    localStorage.setItem('ks_guest_cart', JSON.stringify(state.cart));
  }
}

function renderCart() {
  const items = document.getElementById('cart-items');
  const empty = document.getElementById('cart-empty');
  const footer = document.getElementById('cart-footer');
  const badge = document.getElementById('cart-badge');

  const totalQty = state.cart.reduce((s, i) => s + i.quantity, 0);
  if (badge) {
    badge.textContent = totalQty;
    badge.style.display = totalQty > 0 ? '' : 'none';
  }

  if (!state.cart || state.cart.length === 0) {
    if (empty) empty.style.display = '';
    if (footer) footer.style.display = 'none';
    // Clear dynamic items
    const dynamic = items?.querySelectorAll('.cart-item');
    dynamic?.forEach(el => el.remove());
    return;
  }

  if (empty) empty.style.display = 'none';
  if (footer) footer.style.display = '';

  const total = state.cart.reduce((s, i) => s + i.price * i.quantity, 0);
  document.getElementById('cart-total-price').textContent = `¥${total}`;

  // 清除旧的动态项目
  items?.querySelectorAll('.cart-item').forEach(el => el.remove());

  state.cart.forEach(item => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <div class="cart-item-img" style="background:var(--bg-warm);display:flex;align-items:center;justify-content:center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c49a6c" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      </div>
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">¥${item.price}</p>
        <div class="qty-control">
          <button class="qty-btn" onclick="updateCartItem('${item.productId}', ${item.quantity - 1})">−</button>
          <span class="qty-num">${item.quantity}</span>
          <button class="qty-btn" onclick="updateCartItem('${item.productId}', ${item.quantity + 1})">+</button>
        </div>
        <span class="cart-item-remove" onclick="removeCartItem('${item.productId}')">删除</span>
      </div>
    `;
    items?.insertBefore(el, empty);
  });
}

function openCart() {
  document.getElementById('cart-sidebar').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  document.getElementById('cart-sidebar').classList.remove('open');
  document.body.style.overflow = '';
}

// ─── 结算 ────────────────────────────────────────
function goCheckout() {
  if (state.cart.length === 0) { showToast('购物车是空的', 'error'); return; }
  if (!state.token) {
    // 未登录：弹出登录框，登录成功后自动继续结算
    showAuthModal(() => goCheckout());
    return;
  }
  closeCart();

  // 填充结算商品
  const co = document.getElementById('checkout-items');
  co.innerHTML = state.cart.map(item => `
    <div class="checkout-item">
      <div class="checkout-item-img" style="background:var(--bg-warm);display:flex;align-items:center;justify-content:center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c49a6c" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      </div>
      <div>
        <p class="checkout-item-name">${item.name}</p>
        <p class="checkout-item-qty">x${item.quantity}</p>
      </div>
      <span class="checkout-item-price">¥${item.price * item.quantity}</span>
    </div>
  `).join('');

  const total = state.cart.reduce((s, i) => s + i.price * i.quantity, 0);
  document.getElementById('co-subtotal').textContent = `¥${total}`;
  document.getElementById('co-total').textContent = `¥${total}`;

  document.getElementById('checkout-modal').style.display = '';
  document.body.style.overflow = 'hidden';
}
function closeCheckout() {
  document.getElementById('checkout-modal').style.display = 'none';
  document.body.style.overflow = '';
}
async function submitOrder(e) {
  e.preventDefault();
  const btn = document.getElementById('checkout-submit');
  const errEl = document.getElementById('checkout-error');
  const name = document.getElementById('co-name').value.trim();
  const phone = document.getElementById('co-phone').value.trim();
  const address = document.getElementById('co-address').value.trim();
  const remark = document.getElementById('co-remark').value.trim();

  errEl.style.display = 'none';
  btn.disabled = true;
  btn.textContent = '提交中...';

  try {
    const { data } = await api('/orders', {
      method: 'POST',
      body: JSON.stringify({ items: state.cart, name, phone, address, remark }),
    });
    state.cart = [];
    renderCart();
    closeCheckout();
    document.getElementById('order-no-display').textContent = `订单编号：${data.orderNo}`;
    document.getElementById('order-success').style.display = '';
  } catch (err) {
    errEl.textContent = err.message;
    errEl.style.display = '';
  } finally {
    btn.disabled = false;
    btn.textContent = '提交订单';
  }
}
function closeOrderSuccess() {
  document.getElementById('order-success').style.display = 'none';
  document.body.style.overflow = '';
}

// ─── 认证 ────────────────────────────────────────

// 合并游客购物车到服务端
async function syncGuestCart() {
  const raw = localStorage.getItem('ks_guest_cart');
  if (!raw) return;
  let guestCart = [];
  try {
    guestCart = JSON.parse(raw);
  } catch { return; }
  if (guestCart.length === 0) {
    localStorage.removeItem('ks_guest_cart');
    return;
  }

  // 清空服务端购物车（逐条删除）
  try {
    const { data: serverCart } = await api('/cart');
    for (const item of serverCart) {
      try { await api(`/cart/${item.productId}`, { method: 'DELETE' }); } catch {}
    }
  } catch {
    return;
  }

  const failedItems = [];
  for (const item of guestCart) {
    try {
      await api('/cart', {
        method: 'POST',
        body: JSON.stringify({ productId: item.productId, quantity: item.quantity }),
      });
    } catch {
      failedItems.push(item);
    }
  }

  if (failedItems.length === 0) {
    localStorage.removeItem('ks_guest_cart');
  } else {
    localStorage.setItem('ks_guest_cart', JSON.stringify(failedItems));
  }
}

function showAuthModal(callback) {
  if (state.user) { openUserModal(); return; }
  state.authCallback = callback || null;
  document.getElementById('auth-modal').style.display = '';
  document.body.style.overflow = 'hidden';
}
function closeAuthModal() {
  state.authCallback = null;
  document.getElementById('auth-modal').style.display = 'none';
  document.body.style.overflow = '';
}
function switchAuthTab(tab) {
  document.getElementById('login-tab').classList.toggle('active', tab === 'login');
  document.getElementById('register-tab').classList.toggle('active', tab === 'register');
  document.getElementById('login-form').style.display = tab === 'login' ? '' : 'none';
  document.getElementById('register-form').style.display = tab === 'register' ? '' : 'none';
  document.getElementById('login-error').style.display = 'none';
  document.getElementById('register-error').style.display = 'none';
}
async function handleLogin(e) {
  e.preventDefault();
  const btn = document.getElementById('login-submit');
  const errEl = document.getElementById('login-error');
  errEl.style.display = 'none';
  btn.disabled = true; btn.textContent = '登录中...';
  try {
    const { data } = await api('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: document.getElementById('login-email').value, password: document.getElementById('login-password').value }),
    });
    saveAuth(data.user, data.token);

    // 合并游客购物车
    await syncGuestCart();
    await loadCart();

    // 有回调则执行（如继续结算）
    if (state.authCallback) {
      const cb = state.authCallback;
      state.authCallback = null;
      closeAuthModal();
      cb();
      return;
    }

    closeAuthModal();
    showToast(`欢迎回来，${data.user.name}`, 'success');
  } catch (err) {
    errEl.textContent = err.message;
    errEl.style.display = '';
  } finally {
    btn.disabled = false; btn.textContent = '登录';
  }
}
async function handleRegister(e) {
  e.preventDefault();
  const btn = document.getElementById('register-submit');
  const errEl = document.getElementById('register-error');
  errEl.style.display = 'none';
  btn.disabled = true; btn.textContent = '注册中...';
  try {
    const { data } = await api('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: document.getElementById('reg-name').value,
        email: document.getElementById('reg-email').value,
        phone: document.getElementById('reg-phone').value,
        password: document.getElementById('reg-password').value,
      }),
    });
    saveAuth(data.user, data.token);

    // 合并游客购物车
    await syncGuestCart();
    await loadCart();

    // 有回调则执行（如继续结算）
    if (state.authCallback) {
      const cb = state.authCallback;
      state.authCallback = null;
      closeAuthModal();
      cb();
      return;
    }

    closeAuthModal();
    showToast(`注册成功，欢迎 ${data.user.name}`, 'success');
  } catch (err) {
    errEl.textContent = err.message;
    errEl.style.display = '';
  } finally {
    btn.disabled = false; btn.textContent = '注册';
  }
}

// ─── 用户中心 ────────────────────────────────────
async function openUserModal() {
  if (!state.user) { showAuthModal(); return; }
  const modal = document.getElementById('user-modal');
  document.getElementById('user-greeting').textContent = `你好，${state.user.name}`;
  document.getElementById('user-email-display').textContent = state.user.email;
  document.getElementById('user-avatar-initial').textContent = state.user.name?.[0]?.toUpperCase() || 'U';
  document.getElementById('profile-name').value = state.user.name || '';
  document.getElementById('profile-phone').value = state.user.phone || '';
  modal.style.display = '';
  document.body.style.overflow = 'hidden';
}
function closeUserModal() {
  document.getElementById('user-modal').style.display = 'none';
  document.body.style.overflow = '';
}
function switchUserTab(tab) {
  document.getElementById('profile-tab').classList.toggle('active', tab === 'profile');
  document.getElementById('orders-tab').classList.toggle('active', tab === 'orders');
  document.getElementById('profile-panel').style.display = tab === 'profile' ? '' : 'none';
  document.getElementById('orders-panel').style.display = tab === 'orders' ? '' : 'none';
  if (tab === 'orders') loadOrders();
}
async function loadOrders() {
  const list = document.getElementById('orders-list');
  list.innerHTML = '<div class="loading-text">加载中...</div>';
  try {
    const { data } = await api('/orders');
    if (!data.length) { list.innerHTML = '<div class="empty-orders">暂无订单</div>'; return; }
    list.innerHTML = data.map(o => `
      <div class="order-item">
        <div class="order-item-header">
          <span class="order-no">${o.orderNo}</span>
          <span class="order-status">${o.statusText}</span>
        </div>
        <p class="order-products">${o.items.map(i => `${i.name} x${i.quantity}`).join('、')}</p>
        <div class="order-footer">
          <span>${new Date(o.createdAt).toLocaleDateString('zh-CN')}</span>
          <span class="order-total">¥${o.total}</span>
        </div>
      </div>
    `).join('');
  } catch {
    list.innerHTML = '<div class="empty-orders">获取订单失败，请重试</div>';
  }
}
async function updateProfile(e) {
  e.preventDefault();
  try {
    await api('/auth/me', {
      method: 'PUT',
      body: JSON.stringify({ name: document.getElementById('profile-name').value, phone: document.getElementById('profile-phone').value }),
    });
    state.user.name = document.getElementById('profile-name').value;
    localStorage.setItem('ks_user', JSON.stringify(state.user));
    showToast('资料已更新', 'success');
    updateUserUI();
  } catch (e) {
    showToast(e.message, 'error');
  }
}
function logout() {
  clearAuth();
  closeUserModal();
  showToast('已退出登录');
}

// ─── UI 辅助 ─────────────────────────────────────
function updateUserUI() {}

function showToast(msg, type = '') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast${type ? ' ' + type : ''}`;
  toast.innerHTML = `
    ${type === 'success' ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
    ${msg}
  `;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, 2800);
}

// ─── Header 滚动效果 ─────────────────────────────
function setupHeader() {
  const header = document.getElementById('site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ─── Drawer ──────────────────────────────────────
function closeDrawer() { document.getElementById('nav-drawer').classList.remove('open'); document.body.style.overflow = ''; }

// ─── 滚动揭示动画 ────────────────────────────────
function setupReveal() {
  const els = document.querySelectorAll('.reveal:not(.visible)');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
}

// ─── 平滑滚动处理 ────────────────────────────────
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); const y = target.getBoundingClientRect().top + window.scrollY - 80; window.scrollTo({ top: y, behavior: 'smooth' }); }
    });
  });
}

// ─── 初始化 ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadAuth();
  setupHeader();
  setupSmoothScroll();

  // 给品牌区域和craft区域元素添加reveal
  document.querySelectorAll('.philosophy-card, .craft-step, .review-card').forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 4 === 1) el.classList.add('reveal-delay-1');
    if (i % 4 === 2) el.classList.add('reveal-delay-2');
    if (i % 4 === 3) el.classList.add('reveal-delay-3');
  });
  setupReveal();

  // 购物车按钮
  document.getElementById('cart-btn').addEventListener('click', async () => { await loadCart(); openCart(); });
  document.getElementById('cart-overlay').addEventListener('click', closeCart);

  // 用户按钮
  document.getElementById('user-btn').addEventListener('click', () => state.user ? openUserModal() : showAuthModal());

  // modal overlay 点击关闭
  document.getElementById('auth-modal').addEventListener('click', e => { if (e.target === e.currentTarget) closeAuthModal(); });
  document.getElementById('product-modal').addEventListener('click', e => { if (e.target === e.currentTarget) closeProduct(); });
  document.getElementById('checkout-modal').addEventListener('click', e => { if (e.target === e.currentTarget) closeCheckout(); });
  document.getElementById('user-modal').addEventListener('click', e => { if (e.target === e.currentTarget) closeUserModal(); });

  // 移动端导航
  document.getElementById('nav-toggle').addEventListener('click', () => {
    document.getElementById('nav-drawer').classList.toggle('open');
    document.body.style.overflow = document.getElementById('nav-drawer').classList.contains('open') ? 'hidden' : '';
  });
  document.getElementById('drawer-overlay').addEventListener('click', closeDrawer);

  // 加载产品
  loadProducts();
  // 加载购物车（自动判断登录状态）
  loadCart();
});
