// ================================================================
// products.js — OpenTree product catalog
// ================================================================

const PRODUCTS = [
  {
    id: 1,
    name_en: "Sacred Agarwood Tea",
    name_cn: "神圣沉香茶",
    desc_en: "Ancient Eastern Tea for Deep Meditation",
    desc_cn: "东方古法沉香茶，深度冥想助手",
    price: 29,
    category: "tea",
    image: "assets/img/ai/product-tea.jpg",
    image_fallback: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80",
    badge_en: "Bestseller",
    badge_cn: "热销"
  },
  {
    id: 2,
    name_en: "Bian Stone Bracelet",
    name_cn: "砭石能量手串",
    desc_en: "Authentic Bian Stone for Energy & Balance",
    desc_cn: "正宗砭石，疏通经络，平衡气血",
    price: 49,
    category: "stone",
    image: "assets/img/ai/product-stone.jpg",
    image_fallback: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80",
    badge_en: "New",
    badge_cn: "新品"
  },
  {
    id: 3,
    name_en: "Crystal Energy Bracelet",
    name_cn: "水晶能量手链",
    desc_en: "Eastern Crystal Beads for Clarity & Protection",
    desc_cn: "东方水晶珠串，净化能量，守护内心",
    price: 38,
    category: "bracelet",
    image: "assets/img/ai/product-bracelet.jpg",
    image_fallback: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
    badge_en: "",
    badge_cn: ""
  },
  {
    id: 4,
    name_en: "Ritual Incense Set",
    name_cn: "仪式沉香香品套装",
    desc_en: "Natural Agarwood Incense for Sacred Space",
    desc_cn: "天然沉香原料，营造禅意空间",
    price: 19,
    category: "incense",
    image: "assets/img/ai/product-incense.jpg",
    image_fallback: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80",
    badge_en: "",
    badge_cn: ""
  },
  {
    id: 5,
    name_en: "Zen Soy Candle",
    name_cn: "禅意香薰蜡烛",
    desc_en: "Soy Candle with Oriental Sandalwood Aroma",
    desc_cn: "大豆蜡烛，东方檀香沉香香气",
    price: 25,
    category: "candle",
    image: "assets/img/ai/product-candle.jpg",
    image_fallback: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&q=80",
    badge_en: "",
    badge_cn: ""
  }
];

// ================================================================
// Build featured product card (editorial grid style)
// ================================================================
function buildProductCard(product) {
  const lang = typeof currentLang !== 'undefined' ? currentLang : 'en';
  const name  = lang === 'cn' ? product.name_cn  : product.name_en;
  const desc  = lang === 'cn' ? product.desc_cn  : product.desc_en;
  const badge = lang === 'cn' ? product.badge_cn : product.badge_en;
  const addLabel = lang === 'cn' ? '加入购物袋 →' : 'Add to Bag →';

  const badgeHtml = badge
    ? `<span style="position:absolute;top:16px;left:16px;background:var(--gold);color:#fff;font-size:10px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;padding:4px 10px;border-radius:2px;z-index:2;">${badge}</span>`
    : '';

  return `
    <div class="product-card" data-id="${product.id}" data-category="${product.category}">
      <div class="product-card-img">
        ${badgeHtml}
        <img
          src="${product.image}"
          onerror="this.src='${product.image_fallback}'"
          alt="${name}"
          loading="lazy"
        />
      </div>
      <div class="product-card-overlay"></div>
      <div class="product-card-info">
        <span class="label">${product.category.toUpperCase()}</span>
        <h3>${name}</h3>
        <div class="price">$${product.price}</div>
        <button class="btn-add" onclick="addToCart(${product.id})">${addLabel}</button>
      </div>
    </div>
  `;
}

// ================================================================
// Build shop card (standard grid style)
// ================================================================
function buildShopCard(product) {
  const lang = typeof currentLang !== 'undefined' ? currentLang : 'en';
  const name  = lang === 'cn' ? product.name_cn  : product.name_en;
  const desc  = lang === 'cn' ? product.desc_cn  : product.desc_en;
  const addLabel = lang === 'cn' ? '加入购物袋' : 'Add to Bag';

  return `
    <div class="shop-card" data-id="${product.id}" data-category="${product.category}">
      <div class="shop-card-img">
        <img
          src="${product.image}"
          onerror="this.src='${product.image_fallback}'"
          alt="${name}"
          loading="lazy"
        />
      </div>
      <h3>${name}</h3>
      <p>${desc}</p>
      <div class="shop-card-footer">
        <span class="shop-price">$${product.price}</span>
        <button class="btn-add-small" onclick="addToCart(${product.id})">${addLabel}</button>
      </div>
    </div>
  `;
}

// Re-render grids on language change
document.addEventListener('langChanged', () => {
  const featuredGrid = document.getElementById('featuredGrid');
  if (featuredGrid) {
    featuredGrid.innerHTML = '';
    PRODUCTS.slice(0, 5).forEach(p => { featuredGrid.innerHTML += buildProductCard(p); });
  }
  const shopGrid = document.getElementById('shopGrid');
  if (shopGrid) {
    const currentFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    shopGrid.innerHTML = '';
    PRODUCTS.forEach(p => { shopGrid.innerHTML += buildShopCard(p); });
    if (currentFilter !== 'all') {
      shopGrid.querySelectorAll('.shop-card').forEach(card => {
        card.style.display = card.dataset.category === currentFilter ? '' : 'none';
      });
    }
  }
});
