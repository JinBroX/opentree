// ===== PRODUCTS DATA =====
const PRODUCTS = [
  {
    id: 1,
    name: "Sacred Tea",
    price: 29,
    category: "tea",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80",
    description: "Ancient Eastern Tea for Meditation",
    longDesc: "Hand-selected agarwood tea leaves from ancient forests, blended for deep calm and mental clarity. A morning ritual that connects you to centuries of Eastern wisdom."
  },
  {
    id: 2,
    name: "Energy Stone",
    price: 49,
    category: "stone",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500&q=80",
    description: "Handcrafted Bian Stone Bracelet for Balance",
    longDesc: "Authentic Bian stone beads, each one hand-polished by artisan craftspeople. Known in Eastern tradition for promoting circulation, balance, and grounding energy."
  },
  {
    id: 3,
    name: "Ritual Incense",
    price: 19,
    category: "incense",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80",
    description: "Natural Incense for Spiritual Rituals",
    longDesc: "Pure natural agarwood and sandalwood blends, hand-rolled in the traditional style. Each stick burns for 45 minutes, filling your space with meditative calm."
  },
  {
    id: 4,
    name: "Zen Candle",
    price: 25,
    category: "candle",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&q=80",
    description: "Soy Candle infused with Oriental Aroma",
    longDesc: "100% soy wax candle infused with jasmine, sandalwood, and white tea essential oils. Hand-poured in small batches. Burns for 45+ hours."
  },
  {
    id: 5,
    name: "Mindful Journal",
    price: 15,
    category: "journal",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=500&q=80",
    description: "Guided Journal for Inner Reflection",
    longDesc: "A beautifully designed 120-page guided journal inspired by Eastern philosophy. Daily prompts for gratitude, intention-setting, and inner reflection. Acid-free paper."
  }
];

// ===== BUILD PRODUCT CARD HTML =====
function buildProductCard(product) {
  return `
    <div class="product-card" data-id="${product.id}" data-category="${product.category}">
      <div class="product-card-img">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </div>
      <div class="product-card-body">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-card-footer">
          <span class="product-price">$${product.price}</span>
          <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Bag</button>
        </div>
      </div>
    </div>
  `;
}
