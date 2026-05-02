// 确保 UTF-8 输出
if (process.stdout.setEncoding) process.stdout.setEncoding('utf8');
const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Datastore = require('nedb-promises');
const fs = require('fs');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'kuanshu-secret-2024';

// ─── 数据库 ───────────────────────────────────────────────
const db = {
  users: Datastore.create({ filename: path.join(__dirname, 'data/users.db'), autoload: true }),
  orders: Datastore.create({ filename: path.join(__dirname, 'data/orders.db'), autoload: true }),
  carts: Datastore.create({ filename: path.join(__dirname, 'data/carts.db'), autoload: true }),
};

// 创建data目录
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}

// ─── 产品数据（静态） ────────────────────────────────────
const products = [
  {
    id: 'p001',
    name: '宽树·沉香线香',
    subtitle: '静心 · 深呼吸',
    price: 268,
    originalPrice: 328,
    unit: '支/盒（60支）',
    image: '/assets/images/product-01.jpg',
    badge: '精选',
    shortDesc: '选用越南芽庄天然沉香木，历经二十年自然醇化，香气深邃悠长。',
    ingredients: [
      { name: '越南芽庄沉香木粉', origin: '越南芽庄', role: '主香材，提供深沉木质香调', ratio: '45%' },
      { name: '天然楠木粉', origin: '云南', role: '粘合基底，增加燃烧稳定性', ratio: '30%' },
      { name: '天然黏合剂（榆皮粉）', origin: '陕西', role: '无化学添加，纯植物粘合', ratio: '20%' },
      { name: '天然精油调和', origin: '印度尼西亚', role: '增益香调层次', ratio: '5%' },
    ],
    process: [
      { step: '01', title: '原料甄选', desc: '深入越南芽庄产区，与当地香农合作，精选树龄二十年以上的沉香木，每批次手工挑选。' },
      { step: '02', title: '自然干燥', desc: '采用低温阴干工艺，历时90天，最大程度保留沉香油脂与香气分子，拒绝人工速干。' },
      { step: '03', title: '手工研磨', desc: '古法石磨慢磨，保持香材温度不超过40°C，确保芳香分子不被高温破坏。' },
      { step: '04', title: '配方调和', desc: '匠人依据传统配比，将各香材手工混合，反复嗅辨，调出平衡而深邃的香气层次。' },
      { step: '05', title: '手工成型', desc: '采用传统立式香机配合手工修整，每支线香直径均匀、长度一致，表面光洁。' },
      { step: '06', title: '自然晾晒', desc: '成型后在通风阴凉处静置七天，让香材充分融合，香气更加圆润饱满。' },
    ],
    usage: '每次燃一支，于安静清洁之处，配合深呼吸冥想。燃时约45分钟。',
    burnTime: '约45分钟/支',
    dimensions: '长度24cm，直径约1.5mm',
    smell: '前调：清甜木质；中调：沉稳奶香；尾调：绵长烟木',
    story: '宽树沉香线香，源自创始人一次越南之旅。彼时在一家百年香铺，闻到了那股令人心旷神怡的沉香气息，自此念念不忘，历经三年研发，方成今日之作。',
    tags: ['冥想', '睡前', '瑜伽', '读书'],
  },
  {
    id: 'p002',
    name: '宽树·檀香盘香',
    subtitle: '宁静 · 沉淀思绪',
    price: 198,
    originalPrice: 238,
    unit: '盘/盒（12盘）',
    image: '/assets/images/product-02.jpg',
    badge: '热销',
    shortDesc: '印度老山檀与云南白檀相融，古典而温润，盘香燃烧缓慢，香气持久。',
    ingredients: [
      { name: '印度迈索尔老山檀香粉', origin: '印度迈索尔', role: '核心香材，贡献奶香木质气息', ratio: '40%' },
      { name: '云南白檀香粉', origin: '云南瑞丽', role: '辅香，增加清雅层次', ratio: '25%' },
      { name: '天然楠木粉', origin: '四川', role: '粘合基底', ratio: '25%' },
      { name: '天然玫瑰精油', origin: '保加利亚', role: '微量调香，增加花香尾调', ratio: '10%' },
    ],
    process: [
      { step: '01', title: '双檀融合', desc: '精选印度迈索尔老山檀与云南白檀，两种香材按秘制比例融合，取长补短，香气更加丰富。' },
      { step: '02', title: '浸泡熟化', desc: '研磨后的香粉置于天然泉水中浸泡24小时，使香材充分水化，便于后续成型，同时促进香气分子融合。' },
      { step: '03', title: '机械压制', desc: '使用定制的盘香模具，精确控制厚度与间距，确保每盘燃烧时间一致，约2.5小时。' },
      { step: '04', title: '低温烘干', desc: '50°C低温慢烘48小时，去除多余水分，同时保留香材的天然精油成分。' },
      { step: '05', title: '质检包装', desc: '每盘逐一检验，确保无裂纹、无变形，再以天然桑皮纸单独包裹，防潮防碰。' },
    ],
    usage: '将盘香置于专用香座或耐热盘上，取适量香灰铺底，点燃后可享2.5小时持续香气。',
    burnTime: '约2.5小时/盘',
    dimensions: '直径8cm，厚度约3mm',
    smell: '前调：奶甜木质；中调：温润檀木；尾调：轻柔花香',
    story: '盘香的形态本身就是一种禅意——无始无终，绵延不断。宽树檀香盘香以此为灵感，希望每一缕香气都能成为冥想与专注的起点。',
    tags: ['冥想', '居家', '办公', '禅修'],
  },
  {
    id: 'p003',
    name: '宽树·艾草净化香',
    subtitle: '清净 · 驱浊纳新',
    price: 128,
    originalPrice: 158,
    unit: '支/包（20支）',
    image: '/assets/images/product-03.jpg',
    badge: '新品',
    shortDesc: '南阳三年陈艾与天然白鼠尾草复合，净化空间气场，清新自然，无刺激。',
    ingredients: [
      { name: '河南南阳三年陈艾绒', origin: '河南南阳', role: '主材，净化空间，暖阳气息', ratio: '50%' },
      { name: '白鼠尾草（白赛其）', origin: '美国加利福尼亚', role: '净化香调，增加草本清新感', ratio: '20%' },
      { name: '天然雪松木粉', origin: '摩洛哥', role: '粘合兼辅香，增加稳定木质调', ratio: '20%' },
      { name: '天然榆皮粉（粘合剂）', origin: '陕西', role: '纯植物粘合，无化学添加', ratio: '10%' },
    ],
    process: [
      { step: '01', title: '陈艾筛选', desc: '精选陈放三年以上的南阳艾绒，绒质细腻，燃烧充分，挥发性物质转化完全，香气醇厚不刺激。' },
      { step: '02', title: '自然阴干', desc: '新鲜白鼠尾草采收后自然阴干，保留其净化功效与独特香气，不做任何化学处理。' },
      { step: '03', title: '古法配比', desc: '依据中医香道传统配方，与现代香料学理论结合，反复调试出最优融合比例。' },
      { step: '04', title: '手工制棒', desc: '全程手工操作，将调配好的香材均匀卷制成棒，每根粗细均匀，重量误差不超过0.1克。' },
      { step: '05', title: '恒温醒香', desc: '成品在恒温25°C、湿度60%的醒香室存放14天，让各香材充分融合，去除新制品的生涩感。' },
    ],
    usage: '点燃后在空间中缓慢移动，或放于香座静置。建议每次使用前后通风。不宜在密闭空间长时间使用。',
    burnTime: '约30分钟/支',
    dimensions: '长度20cm，直径约8mm',
    smell: '前调：清新草本；中调：温暖艾草；尾调：淡雅木质',
    story: '艾草在中国文化中有数千年净化与保健的传统。宽树将这一古老植物与现代香道结合，创造出既有传统底蕴、又适合当代生活的净化香棒。',
    tags: ['净化', '驱虫', '新家', '冥想'],
  },
];

// ─── 中间件 ────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5500', 'http://127.0.0.1:5500'],
  credentials: true,
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// ─── Auth 中间件 ────────────────────────────────────────
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: '请先登录' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: '登录已过期，请重新登录' });
  }
}

// ─── 产品路由 ───────────────────────────────────────────
app.get('/api/products', (req, res) => {
  res.json({ data: products.map(p => ({ ...p, ingredients: undefined, process: undefined })) });
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: '产品不存在' });
  res.json({ data: product });
});

// ─── 用户路由 ───────────────────────────────────────────
// 注册
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(422).json({ error: '请填写完整信息' });
    }
    const existing = await db.users.findOne({ email });
    if (existing) return res.status(409).json({ error: '该邮箱已注册' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await db.users.insert({
      name, email, phone: phone || '',
      password: hashed,
      createdAt: new Date().toISOString(),
      avatar: '',
    });

    const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ data: { token, user: { id: user._id, name: user.name, email: user.email } } });
  } catch (err) {
    res.status(500).json({ error: '注册失败，请稍后重试' });
  }
});

// 登录
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.users.findOne({ email });
    if (!user) return res.status(401).json({ error: '邮箱或密码错误' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: '邮箱或密码错误' });

    const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ data: { token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone } } });
  } catch (err) {
    res.status(500).json({ error: '登录失败，请稍后重试' });
  }
});

// 获取当前用户信息
app.get('/api/auth/me', authenticate, async (req, res) => {
  try {
    const user = await db.users.findOne({ _id: req.user.id });
    if (!user) return res.status(404).json({ error: '用户不存在' });
    res.json({ data: { id: user._id, name: user.name, email: user.email, phone: user.phone, createdAt: user.createdAt } });
  } catch (err) {
    res.status(500).json({ error: '获取用户信息失败' });
  }
});

// 更新用户信息
app.put('/api/auth/me', authenticate, async (req, res) => {
  try {
    const { name, phone } = req.body;
    await db.users.update({ _id: req.user.id }, { $set: { name, phone } });
    res.json({ data: { message: '更新成功' } });
  } catch (err) {
    res.status(500).json({ error: '更新失败' });
  }
});

// ─── 购物车路由 ─────────────────────────────────────────
app.get('/api/cart', authenticate, async (req, res) => {
  let cart = await db.carts.findOne({ userId: req.user.id });
  if (!cart) cart = { userId: req.user.id, items: [] };
  res.json({ data: cart.items || [] });
});

app.post('/api/cart', authenticate, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = products.find(p => p.id === productId);
    if (!product) return res.status(404).json({ error: '产品不存在' });

    let cart = await db.carts.findOne({ userId: req.user.id });
    if (!cart) {
      cart = { userId: req.user.id, items: [] };
      await db.carts.insert(cart);
      cart = await db.carts.findOne({ userId: req.user.id });
    }

    const items = cart.items || [];
    const idx = items.findIndex(i => i.productId === productId);
    if (idx >= 0) {
      items[idx].quantity += quantity;
    } else {
      items.push({ productId, quantity, name: product.name, price: product.price, image: product.image });
    }

    await db.carts.update({ userId: req.user.id }, { $set: { items } });
    res.json({ data: items, message: '已加入购物车' });
  } catch (err) {
    res.status(500).json({ error: '操作失败' });
  }
});

app.put('/api/cart/:productId', authenticate, async (req, res) => {
  try {
    const { quantity } = req.body;
    let cart = await db.carts.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ error: '购物车为空' });

    let items = cart.items || [];
    if (quantity <= 0) {
      items = items.filter(i => i.productId !== req.params.productId);
    } else {
      const idx = items.findIndex(i => i.productId === req.params.productId);
      if (idx >= 0) items[idx].quantity = quantity;
    }

    await db.carts.update({ userId: req.user.id }, { $set: { items } });
    res.json({ data: items });
  } catch (err) {
    res.status(500).json({ error: '操作失败' });
  }
});

app.delete('/api/cart/:productId', authenticate, async (req, res) => {
  try {
    let cart = await db.carts.findOne({ userId: req.user.id });
    if (!cart) return res.json({ data: [] });
    const items = (cart.items || []).filter(i => i.productId !== req.params.productId);
    await db.carts.update({ userId: req.user.id }, { $set: { items } });
    res.json({ data: items });
  } catch (err) {
    res.status(500).json({ error: '操作失败' });
  }
});

// ─── 订单路由 ───────────────────────────────────────────
app.post('/api/orders', authenticate, async (req, res) => {
  try {
    const { items, address, name, phone, remark } = req.body;
    if (!items || items.length === 0) return res.status(422).json({ error: '订单不能为空' });
    if (!address || !name || !phone) return res.status(422).json({ error: '请填写收货信息' });

    const orderItems = items.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        productId: item.productId,
        name: product ? product.name : item.name,
        price: product ? product.price : item.price,
        quantity: item.quantity,
        image: product ? product.image : item.image,
      };
    });

    const total = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const orderNo = 'KS' + Date.now() + Math.floor(Math.random() * 1000);

    const order = await db.orders.insert({
      orderNo,
      userId: req.user.id,
      userName: req.user.name,
      items: orderItems,
      total,
      address, name, phone,
      remark: remark || '',
      status: 'pending',
      statusText: '待发货',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // 清空购物车
    await db.carts.update({ userId: req.user.id }, { $set: { items: [] } });

    res.status(201).json({ data: order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '下单失败，请稍后重试' });
  }
});

app.get('/api/orders', authenticate, async (req, res) => {
  try {
    const orders = await db.orders.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ data: orders });
  } catch (err) {
    res.status(500).json({ error: '获取订单失败' });
  }
});

app.get('/api/orders/:id', authenticate, async (req, res) => {
  try {
    const order = await db.orders.findOne({ _id: req.params.id, userId: req.user.id });
    if (!order) return res.status(404).json({ error: '订单不存在' });
    res.json({ data: order });
  } catch (err) {
    res.status(500).json({ error: '获取订单失败' });
  }
});

// ─── 健康检查 ────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'ok', name: '宽树香品API' }));

// ─── 捕获所有前端路由 ───────────────────────────────────
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  }
});

// ─── 全局错误处理 ───────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: '服务器内部错误' });
});

app.listen(PORT, () => {
  console.log(`宽树香品API服务已启动：http://localhost:${PORT}`);
});
