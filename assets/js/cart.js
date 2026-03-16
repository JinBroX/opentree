// ===== CART MANAGEMENT =====

const STORAGE_KEY = 'opentree_cart';

function getCart() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  updateCartUI();
}

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1
    });
  }

  saveCart(cart);
  openCart();
  showToast(`${product.name} added to your bag`);
}

function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
}

function updateQty(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart(cart);
}

function updateCartUI() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  // Update count badge
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = totalItems;
    el.style.display = totalItems > 0 ? 'flex' : 'none';
  });

  // Update cart sidebar items
  const cartItemsEl = document.getElementById('cartItems');
  const cartFooterEl = document.getElementById('cartFooter');
  const cartTotalEl = document.getElementById('cartTotal');

  if (!cartItemsEl) return;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.<br /><a href="shop.html">Explore the collection</a></p>';
    if (cartFooterEl) cartFooterEl.style.display = 'none';
    return;
  }

  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-item-info">
        <strong>${item.name}</strong>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <span class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</span>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove">×</button>
    </div>
  `).join('');

  if (cartFooterEl) cartFooterEl.style.display = 'block';
  if (cartTotalEl) cartTotalEl.textContent = '$' + totalPrice.toFixed(2);
}

function openCart() {
  document.getElementById('cartSidebar')?.classList.add('active');
  document.getElementById('cartOverlay')?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartSidebar')?.classList.remove('active');
  document.getElementById('cartOverlay')?.classList.remove('active');
  document.body.style.overflow = '';
}

function showToast(message) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove('show'), 2500);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();

  document.getElementById('cartBtn')?.addEventListener('click', openCart);
  document.getElementById('cartClose')?.addEventListener('click', closeCart);
  document.getElementById('cartOverlay')?.addEventListener('click', closeCart);
});
