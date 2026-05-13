/* ═══════════════════════════════════════════
   宽树香品 · i18n — CN / EN bilingual
   IP detection + manual toggle + localStorage
═══════════════════════════════════════════ */

const I18N = {
  cn: {
    /* ─── Global ─── */
    page_title: '宽树 · 自然香道',
    menu: '菜单',
    cart_aria: '购物车',
    user_aria: '用户',

    /* ─── Navigation ─── */
    nav_scenes: '用香场景',
    nav_craft: '制香工艺',
    nav_products: '香品系列',
    nav_reviews: '用户心声',
    nav_login: '登录 / 注册',
    nav_cart: '🛒 我的购物车',

    /* ─── Hero ─── */
    hero_title_1: '宽树香品',
    hero_title_2: '只看时间与好料',
    hero_cta_1: '探索香品',
    hero_cta_2: '了解宽树',
    hero_scroll: '向下探索',

    /* ─── About / Brand Philosophy ─── */
    about_label: '关于宽树',
    about_title: '以树之宽，<br/>容纳万物之静',
    about_body_1: '宽树，取意于"宽容如树"——树木以根深厚德，以枝广纳阴，以香馈赠天地。',
    about_body_2: '我们相信，一支好香不只是气味，它是一种态度，是在喧嚣日常里为自己辟出的安静角落。宽树的每一款香品，都经历从原料甄选、古法研磨到手工成型的完整工艺，只为将那份真实的自然气息，完整地送入你的呼吸。',
    about_tag_1: '纯天然原料',
    about_tag_2: '无化学添加',
    about_tag_3: '手工制作',
    about_tag_4: '古法工艺',
    about_stat_1_num: '100%',
    about_stat_1_label: '天然香材',
    about_stat_2_num: '17+',
    about_stat_2_label: '年制香经验',
    about_stat_3_num: '0',
    about_stat_3_label: '化学添加物',

    /* ─── Scenes ─── */
    scenes_label: '用香场景',
    scenes_title: '从晨光到夜半<br class="mobile-br"/>香气始终在场',
    scenes_subtitle: '一天之中，总有那么几个时刻，值得为一支香停留',
    scene_1_title: '茶席 · 晨光',
    scene_1_desc: '清晨第一壶茶，配一支沉香<br/>用自然香气开启从容的一天',
    scene_2_title: '书房 · 静心',
    scene_2_desc: '读书、工作、冥想<br/>让香气成为专注力的催化剂',
    scene_3_title: '傍晚 · 余韵',
    scene_3_desc: '日暮时分，一缕轻烟<br/>卸下一天的匆忙与疲惫',
    scene_4_title: '夜晚 · 安眠',
    scene_4_desc: '睡前一炷香，释放一天的疲惫<br/>让沉香守护你的深度睡眠',

    /* ─── Craft ─── */
    craft_label: '制香工艺',
    craft_title: '慢工出细活',
    craft_subtitle: '每支香背后，是数道繁复而认真的工序',
    craft_1_title: '原产地甄选',
    craft_1_desc: '深入越南、印度、云南等地，直接与香农合作，确保香材溯源可查。',
    craft_2_title: '古法研磨',
    craft_2_desc: '石磨低温慢研，全程控温40°C以下，最大保留芳香分子与油脂。',
    craft_3_title: '自然醒香',
    craft_3_desc: '成品恒温存放7至14天，让各香材充分融合，去除新制品的生涩气息。',
    craft_4_title: '无添加配方',
    craft_4_desc: '坚持不添加任何化学香精、定香剂及防腐剂，每一支都是真实的自然气息。',

    /* ─── Products Section ─── */
    products_label: '香品系列',
    products_title: '三款精选，各有灵魂',
    products_subtitle: '每一款都经过数年打磨，选材、配方、工艺缺一不可',
    btn_view_detail: '查看详情',
    btn_add_cart: '加入购物车',

    /* ─── Reviews ─── */
    reviews_label: '用户心声',
    reviews_title: '他们这样说',
    review_1: '"每天睡前点一支沉香，感觉整个人都安静下来了。香气不浓不淡，燃完也没有刺鼻感，真正的好香。"',
    review_2: '"盘香的形态很美，放在书桌上既是摆件又是香品。檀香气息非常真实，没有那种劣质香的刺激感，连续买了三次了。"',
    review_3: '"新搬家用了艾草净化香，很喜欢那种清新温暖的草本气息。包装也很用心，整体感受非常好。"',
    review_4: '"送给长辈的礼物，包装精致有质感。老人家说这个香气跟以前寺庙里的不一样，更柔和更干净，很喜欢。"',
    review_5: '"朋友推荐的，一开始觉得价格不便宜，收到后点燃才知道什么叫物有所值。香灰落得很整齐，余香持久。"',
    review_6: '"作为瑜伽冥想用香，艾草款的气息让人很放松，不像有些香太冲。燃一支足够一整个冥想时段。"',

    /* ─── CTA ─── */
    cta_title_1: '香的差别，不在复杂',
    cta_title_2: '在时间',
    cta_desc: '从基础耐用，到层次展开，再到高年份老料<br/>你闻到的，是时间留下来的东西',
    cta_btn: '立即选购',

    /* ─── Footer ─── */
    footer_tagline: '宽树香品，自然香道。<br/>让每一次呼吸都有意义。',
    footer_nav: '快速导航',
    footer_service: '客户服务',
    footer_shipping: '配送说明',
    footer_contact: '联系客服',
    footer_copyright: '© 2024 宽树香品. 保留所有权利.',
    footer_contact_alert: '请联系微信客服：kuanshu2024',

    /* ─── Cart Sidebar ─── */
    cart_title: '购物车',
    cart_empty: '购物车是空的',
    cart_empty_sub: '去选择一款心仪的香品吧',
    cart_total: '合计',
    cart_checkout: '去结算',
    cart_remove: '删除',

    /* ─── Auth Modal ─── */
    auth_tab_login: '登录',
    auth_tab_register: '注册',
    auth_label_email: '邮箱',
    auth_ph_email: 'your@email.com',
    auth_label_password: '密码',
    auth_ph_password_login: '请输入密码',
    auth_no_account: '没有账号？',
    auth_go_register: '立即注册',
    auth_label_name: '姓名',
    auth_ph_name: '您的称呼',
    auth_label_phone: '手机号',
    auth_optional: '（选填）',
    auth_ph_phone: '1xx xxxx xxxx',
    auth_ph_password_reg: '至少8位',
    auth_has_account: '已有账号？',
    auth_go_login: '立即登录',

    /* ─── Checkout Modal ─── */
    checkout_title: '确认订单',
    checkout_section: '收货信息',
    checkout_label_name: '收件人',
    checkout_ph_name: '姓名',
    checkout_label_phone: '联系电话',
    checkout_ph_phone: '手机号',
    checkout_label_address: '收货地址',
    checkout_ph_address: '省/市/区 + 详细地址',
    checkout_label_remark: '备注',
    checkout_ph_remark: '特殊要求或留言',
    checkout_subtotal: '商品合计',
    checkout_shipping: '运费',
    checkout_shipping_free: '免费',
    checkout_total: '应付总额',
    checkout_submit: '提交订单',

    /* ─── User Modal ─── */
    user_hello: '你好',
    user_tab_profile: '我的资料',
    user_tab_orders: '我的订单',
    user_save: '保存修改',
    user_logout: '退出登录',
    user_loading: '加载中...',

    /* ─── Order Success ─── */
    order_success_title: '订单提交成功',
    order_success_body: '感谢您选择宽树香品',
    order_success_note: '我们将在1-2个工作日内安排发货，顺丰配送。<br/>如有疑问请联系客服微信：kuanshu2024',
    order_success_continue: '继续购物',
    order_success_view: '查看订单',

    /* ─── Product Detail Modal ─── */
    pd_material: '原料与陈化',
    pd_blend: '配比方式',
    pd_spec: '形制规格',
    pd_scent: '气味表现',
    pd_per_box: '/ 盒',
    pd_qty: '数量',
    pd_close: '×',

    /* ─── Toast ─── */
    toast_added: '已加入: '
  },

  /* ═══════════════ ENGLISH ═══════════════ */
  en: {
    /* ─── Global ─── */
    page_title: 'Kuanshu · Natural Incense',
    menu: 'Menu',
    cart_aria: 'Cart',
    user_aria: 'Account',

    /* ─── Navigation ─── */
    nav_scenes: 'Scenes',
    nav_craft: 'Craft',
    nav_products: 'Products',
    nav_reviews: 'Reviews',
    nav_login: 'Login / Register',
    nav_cart: '🛒 My Cart',

    /* ─── Hero ─── */
    hero_title_1: 'Kuanshu Incense',
    hero_title_2: 'Crafted Only by Time & Quality',
    hero_cta_1: 'Explore Collection',
    hero_cta_2: 'Our Story',
    hero_scroll: 'Scroll',

    /* ─── About / Brand Philosophy ─── */
    about_label: 'About Kuanshu',
    about_title: 'As wide as a tree,<br/>embracing stillness within all things',
    about_body_1: 'Kuanshu takes its name from "tolerance like a tree" — a tree gives to the world with deep roots, broad branches, and fragrant offerings.',
    about_body_2: 'We believe a fine incense is more than a scent — it is an attitude, a quiet corner carved out of the noise of daily life. Every Kuanshu product undergoes a complete process from raw material selection and traditional grinding to hand-finishing, so that the true breath of nature finds its way to you.',
    about_tag_1: '100% Natural',
    about_tag_2: 'No Chemical Additives',
    about_tag_3: 'Handmade',
    about_tag_4: 'Traditional Method',
    about_stat_1_num: '100%',
    about_stat_1_label: 'Natural Materials',
    about_stat_2_num: '17+',
    about_stat_2_label: 'Years of Craft',
    about_stat_3_num: '0',
    about_stat_3_label: 'Chemical Additives',

    /* ─── Scenes ─── */
    scenes_label: 'Incense Scenes',
    scenes_title: 'From dawn to midnight,<br class="mobile-br"/>aroma is always with you',
    scenes_subtitle: 'In the span of a day, there are always moments worth pausing for a stick of incense',
    scene_1_title: 'Tea · Morning Light',
    scene_1_desc: 'The first pot of tea at dawn, paired with aloeswood —<br/>start your day with natural fragrance',
    scene_2_title: 'Study · Stillness',
    scene_2_desc: 'Reading, working, meditating —<br/>let aroma be the catalyst for focus',
    scene_3_title: 'Dusk · Lingering',
    scene_3_desc: 'As daylight fades, a wisp of smoke —<br/>let go of the day\'s rush and weariness',
    scene_4_title: 'Night · Rest',
    scene_4_desc: 'A stick of incense before sleep —<br/>let aloeswood guard your deep slumber',

    /* ─── Craft ─── */
    craft_label: 'Our Craft',
    craft_title: 'Patience in every step',
    craft_subtitle: 'Behind every stick of incense are layers of meticulous work',
    craft_1_title: 'Origin Sourcing',
    craft_1_desc: 'We travel to Vietnam, India, Yunnan and beyond, working directly with cultivators to ensure full traceability.',
    craft_2_title: 'Traditional Grinding',
    craft_2_desc: 'Stone-milled at low temperature under 40°C, preserving the full spectrum of aromatic molecules and natural oils.',
    craft_3_title: 'Natural Aging',
    craft_3_desc: 'Finished incense rests for 7–14 days at controlled temperature, allowing materials to harmonize and raw notes to mellow.',
    craft_4_title: 'Additive-Free Formula',
    craft_4_desc: 'Absolutely no synthetic fragrances, fixatives or preservatives — each stick is the true breath of nature.',

    /* ─── Products Section ─── */
    products_label: 'Collection',
    products_title: 'Three blends, each with soul',
    products_subtitle: 'Every blend has been refined over years — materials, formula, and technique are inseparable',
    btn_view_detail: 'View Details',
    btn_add_cart: 'Add to Cart',

    /* ─── Reviews ─── */
    reviews_label: 'Our Community',
    reviews_title: 'What they say',
    review_1: '"I light a stick of aloeswood every night before bed. The whole person quiets down. The scent is neither too strong nor too faint, and there\'s no harshness after it burns — truly a fine incense."',
    review_2: '"The coiled incense is beautiful in form — it doubles as decor on my desk. The sandalwood scent is incredibly authentic, without any of that cheap, irritating quality. I\'ve repurchased three times."',
    review_3: '"I used the mugwort purification incense after moving into my new home, and I love the fresh, warm herbal notes. The packaging is also very thoughtful — the whole experience is wonderful."',
    review_4: '"A gift for my elders. The packaging is refined and substantial. They said this aroma is different from what they remember at temples — softer, cleaner, and they really enjoy it."',
    review_5: '"Recommended by a friend. At first I thought it was a bit pricey, but once I received it and lit the first stick, I understood what \'worth every penny\' means. The ash falls neatly, and the lingering fragrance lasts."',
    review_6: '"As incense for yoga meditation, the mugwort blend is so relaxing — not overpowering like some incense can be. One stick lasts through an entire meditation session."',

    /* ─── CTA ─── */
    cta_title_1: 'The difference in incense is not complexity',
    cta_title_2: 'It is time',
    cta_desc: 'From everyday reliability, to layered unfolding, to rare aged materials —<br/>what you smell is what time has left behind',
    cta_btn: 'Shop Now',

    /* ─── Footer ─── */
    footer_tagline: 'Kuanshu Incense, the natural way.<br/>Make every breath meaningful.',
    footer_nav: 'Navigate',
    footer_service: 'Service',
    footer_shipping: 'Shipping',
    footer_contact: 'Contact Us',
    footer_copyright: '© 2024 Kuanshu Incense. All rights reserved.',
    footer_contact_alert: 'Please contact WeChat: kuanshu2024',

    /* ─── Cart Sidebar ─── */
    cart_title: 'Cart',
    cart_empty: 'Your cart is empty',
    cart_empty_sub: 'Browse our collection',
    cart_total: 'Total',
    cart_checkout: 'Checkout',
    cart_remove: 'Remove',

    /* ─── Auth Modal ─── */
    auth_tab_login: 'Login',
    auth_tab_register: 'Register',
    auth_label_email: 'Email',
    auth_ph_email: 'your@email.com',
    auth_label_password: 'Password',
    auth_ph_password_login: 'Enter your password',
    auth_no_account: 'No account?',
    auth_go_register: 'Register',
    auth_label_name: 'Name',
    auth_ph_name: 'Your name',
    auth_label_phone: 'Phone',
    auth_optional: '(Optional)',
    auth_ph_phone: '1xx xxxx xxxx',
    auth_ph_password_reg: 'At least 8 characters',
    auth_has_account: 'Already have an account?',
    auth_go_login: 'Login',

    /* ─── Checkout Modal ─── */
    checkout_title: 'Confirm Order',
    checkout_section: 'Shipping Info',
    checkout_label_name: 'Recipient',
    checkout_ph_name: 'Full name',
    checkout_label_phone: 'Phone',
    checkout_ph_phone: 'Phone number',
    checkout_label_address: 'Address',
    checkout_ph_address: 'Province / City / District + details',
    checkout_label_remark: 'Note',
    checkout_ph_remark: 'Special requests or comments',
    checkout_subtotal: 'Subtotal',
    checkout_shipping: 'Shipping',
    checkout_shipping_free: 'Free',
    checkout_total: 'Total',
    checkout_submit: 'Place Order',

    /* ─── User Modal ─── */
    user_hello: 'Hello',
    user_tab_profile: 'My Profile',
    user_tab_orders: 'My Orders',
    user_save: 'Save Changes',
    user_logout: 'Log Out',
    user_loading: 'Loading...',

    /* ─── Order Success ─── */
    order_success_title: 'Order Placed',
    order_success_body: 'Thank you for choosing Kuanshu',
    order_success_note: 'We will ship your order within 1–2 business days via SF Express.<br/>For inquiries, contact WeChat: kuanshu2024',
    order_success_continue: 'Continue Shopping',
    order_success_view: 'View Order',

    /* ─── Product Detail Modal ─── */
    pd_material: 'Material & Aging',
    pd_blend: 'Blending Method',
    pd_spec: 'Specifications',
    pd_scent: 'Scent Profile',
    pd_per_box: '/ box',
    pd_qty: 'Quantity',
    pd_close: '×',

    /* ─── Toast ─── */
    toast_added: 'Added: '
  }
};

/* ═══════════════ ENGINE ═══════════════ */
let currentLang = 'cn';

async function detectLanguageByIP() {
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(4000) });
    const data = await res.json();
    const country = data.country_code || '';
    const cnCountries = ['CN', 'TW', 'HK', 'MO', 'SG', 'MY'];
    return cnCountries.includes(country) ? 'cn' : 'en';
  } catch {
    try {
      const bl = navigator.language || navigator.userLanguage || 'en';
      return bl.startsWith('zh') ? 'cn' : 'en';
    } catch {
      return 'en';
    }
  }
}

function t(key) {
  return I18N[currentLang] && I18N[currentLang][key] ? I18N[currentLang][key] : (I18N.cn[key] || key);
}

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('opentree_lang', lang);

  document.documentElement.lang = lang === 'cn' ? 'zh-CN' : 'en';
  document.title = t('page_title');

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else {
      el.innerHTML = val;
    }
  });

  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPh);
  });

  document.dispatchEvent(new CustomEvent('langChanged', { detail: { lang } }));
}

async function initLang() {
  const saved = localStorage.getItem('opentree_lang');
  if (saved) {
    applyLang(saved);
  } else {
    const detected = await detectLanguageByIP();
    applyLang(detected);
  }
}

window.switchLang = function(lang) { applyLang(lang); };

document.addEventListener('DOMContentLoaded', initLang);
