// ============================================================
// OpenTree 品牌文案体系 — 东方能量·身体赋能
// ============================================================

export const brandCopy = {
  // 品牌核心定位
  tagline: "开启身体智慧，激活生命能量",
  subTagline: "东方千年精粹 × 现代赋能哲学",
  heroHeadline: "当天地精华\n与身体相遇",
  heroSubHeadline:
    "OpenTree 汇聚砭石的远古矿能与沉香的千年馥郁，为你打造由内而外的能量闭环——让身体成为你最大的资产。",

  // 品牌故事
  brandStory: {
    title: "大地给予，身体接收",
    paragraphs: [
      "每个人的体内都藏着一棵树——根系连接大地，枝桠伸向天空。当你疲惫、焦虑、气血不畅时，不是你的身体出了问题，而是那棵树失去了与天地的连接。",
      "OpenTree 从东方智慧中寻找答案。砭石，这块距今数亿年的远古石材，携带着地球最深处的矿物频率；沉香，这粒历经数十年凝结的天然树脂，蕴含着植物王国最高级的疗愈能量。",
      "我们相信：真正的赋能不是向外添加，而是向内唤醒。将天地精华贴近身体，让身体记起它本来就懂得如何流动、如何滋养、如何绽放。",
    ],
  },

  // 身体赋能概念
  energyConcept: {
    title: "身体赋能，不是保健品逻辑",
    subtitle: "是一种与自己同频的生活方式",
    items: [
      {
        icon: "🌿",
        title: "频率共鸣",
        desc: "砭石含有31种对人体有益的微量元素，其远红外辐射频率与人体生物电高度共振，激活深层细胞活力。",
      },
      {
        icon: "🌸",
        title: "嗅觉疗愈",
        desc: "沉香香气分子直达大脑边缘系统，调节皮质醇水平，平静焦虑，让神经系统重归有序状态。",
      },
      {
        icon: "✨",
        title: "意识锚点",
        desc: "佩戴或品饮的仪式感，是与自己约定的那一刻——我在照顾自己，我在为自己赋能。",
      },
      {
        icon: "🌳",
        title: "能量累积",
        desc: "身体赋能不是一次性的，而是每日微量积累。如同大树，每天向下扎根一寸，才能向上生长一尺。",
      },
    ],
  },

  // CTA 文案
  cta: {
    primary: "开始我的能量之旅",
    secondary: "了解赋能哲学",
    addToCart: "加入购物袋",
    buyNow: "立即购买",
    viewAll: "探索全部产品",
    checkout: "前往结算",
  },

  // 信任背书
  trustSignals: [
    { number: "10,000+", label: "能量用户" },
    { number: "98%", label: "复购率" },
    { number: "5 年", label: "品质沉淀" },
    { number: "零添加", label: "纯天然来源" },
  ],

  // 视频区域
  videoSection: {
    title: "能量，看得见",
    subtitle: "短视频记录身体赋能的每一个瞬间，也是你了解 OpenTree 的最好方式",
    tiktokBanner: "在 TikTok 上关注我们 @opentree.energy",
  },
};

// ============================================================
// 产品数据
// ============================================================

export type Product = {
  id: string;
  category: "bian" | "agarwood";
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  images: string[];
  coverImage: string;
  badge?: string;
  tagline: string;
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  story: string;
  rating: number;
  reviewCount: number;
  stock: number;
  variants?: { name: string; options: string[] }[];
};

export const products: Product[] = [
  // ── 砭石系列 ──────────────────────────────────────────────
  {
    id: "bian-bracelet-classic",
    category: "bian",
    name: "泗滨砭石手串",
    subtitle: "远古矿能 · 日常佩戴赋能",
    price: 288,
    originalPrice: 388,
    images: [
      "https://images.unsplash.com/photo-1611042553484-d61f84d22784?w=800&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
      "https://images.unsplash.com/photo-1573408301185-9519f94f3e26?w=800&q=80",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1611042553484-d61f84d22784?w=800&q=80",
    badge: "热销",
    tagline: "亿年地脉精华，贴肤共振身体",
    description:
      "泗滨砭石产自山东泗水，是世界上已知唯一的砭石产地。这条手串采用天然原矿砭石精打细磨，每颗珠子都保留了石材最原始的能量频率。每天佩戴，让矿石频率与你的身体轻声对话。",
    highlights: [
      "山东泗水原矿砭石，稀缺正宗产地",
      "含31种人体所需微量元素",
      "远红外辐射促进微循环",
      "负离子释放，净化体表能量场",
      "手工打磨，表面细腻如脂",
    ],
    specs: [
      { label: "材质", value: "天然泗滨砭石" },
      { label: "珠径", value: "10mm / 12mm 可选" },
      { label: "周长", value: "约 16cm（弹力绳可调节）" },
      { label: "重量", value: "约 28g（10mm款）" },
      { label: "产地", value: "山东省泗水县" },
    ],
    story:
      "砭石疗法是中医最古老的外治法之一，早于针灸千年。《黄帝内经》记载："一曰砭石，二曰毒药，三曰灸焫……" 泗滨砭石以其特殊的生物物理特性被现代科学证实——它能产生高密度的远红外线和超声波，与人体组织产生良性共振，是天然的"能量石"。",
    rating: 4.9,
    reviewCount: 312,
    stock: 68,
    variants: [
      { name: "珠径", options: ["10mm", "12mm"] },
      { name: "手围", options: ["15cm", "16cm", "17cm", "18cm"] },
    ],
  },
  {
    id: "bian-pendant-lotus",
    category: "bian",
    name: "砭石莲花吊坠",
    subtitle: "莲花为形 · 能量随行",
    price: 198,
    originalPrice: 268,
    images: [
      "https://images.unsplash.com/photo-1573408301185-9519f94f3e26?w=800&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1573408301185-9519f94f3e26?w=800&q=80",
    badge: "新品",
    tagline: "一朵莲花，携千年石气",
    description:
      "以莲花为形，取砭石原矿精雕而成。莲在东方象征纯净与觉醒，砭石则携带地脉矿能。两者合一，是我们对"身体赋能"最诗意的表达——佩戴于胸前，如同随身携带一座能量场。",
    highlights: [
      "天然泗滨砭石手工雕刻",
      "莲花造型，东方美学设计",
      "随附 925 银扣 + 天然玉石绳链",
      "礼品盒包装，适合送礼",
    ],
    specs: [
      { label: "材质", value: "天然泗滨砭石 + 925银扣" },
      { label: "尺寸", value: "约 3.5cm × 2.8cm" },
      { label: "重量", value: "约 12g" },
      { label: "链长", value: "45cm 可调节" },
    ],
    story:
      "每一块砭石都是独一无二的，颜色、纹路都是大地的签名。莲花吊坠限量手工雕刻，轻微的自然纹路差异正是原矿材质的证明——没有两朵莲花完全相同，就像没有两个人的能量旅程完全相同。",
    rating: 4.8,
    reviewCount: 156,
    stock: 34,
    variants: [{ name: "链型", options: ["玉石绳链", "纯银链"] }],
  },
  {
    id: "bian-pendant-gourd",
    category: "bian",
    name: "砭石葫芦吊坠",
    subtitle: "纳福招财 · 能量护体",
    price: 168,
    originalPrice: 228,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    badge: "经典款",
    tagline: "葫芦纳百福，石气护全身",
    description:
      "葫芦是东方传统文化中最重要的吉祥器物之一，形似"吉"字，寓意吉祥如意。砭石葫芦吊坠将传统吉祥符号与现代能量理念融合——既是文化符号，更是能量载体。",
    highlights: [
      "传统葫芦造型，东方吉祥寓意",
      "原矿砭石，细腻触感",
      "随附竹节纹皮绳",
      "适合商务场合与日常佩戴",
    ],
    specs: [
      { label: "材质", value: "天然泗滨砭石" },
      { label: "尺寸", value: "约 4cm × 2.5cm" },
      { label: "重量", value: "约 15g" },
    ],
    story:
      "葫芦有上下两个球体，下大上小，象征乾坤阴阳的和谐。砭石葫芦吊坠是 OpenTree 最受中年商务人士喜爱的款式——在繁忙的会议室里，偶尔触碰它，那一刻的停顿与感知，就是最小代价的自我赋能。",
    rating: 4.7,
    reviewCount: 89,
    stock: 45,
  },

  // ── 沉香茶系列 ────────────────────────────────────────────
  {
    id: "agarwood-tea-classic",
    category: "agarwood",
    name: "沉香叶养生茶",
    subtitle: "茶中奢品 · 日饮赋能",
    price: 368,
    originalPrice: 468,
    images: [
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=800&q=80",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80",
    badge: "明星产品",
    tagline: "一杯沉香，喝下千年修炼",
    description:
      "本品采用广东惠州正宗沉香树叶，经低温烘焙工艺保留活性成分，每一泡都是极度细腻的草木香气。沉香叶含丰富的天然倍半萜类化合物，现代研究证实其对调节神经系统、缓解焦虑有独特功效。",
    highlights: [
      "惠州正宗沉香树叶，产地直供",
      "低温慢焙，保留活性倍半萜",
      "无农药、零添加，纯天然",
      "独立茶包，每包精准 3g",
      "支持冷泡·热泡·煮茶三种方式",
    ],
    specs: [
      { label: "净含量", value: "30g（约10泡）/ 90g（约30泡）" },
      { label: "产地", value: "广东省惠州市" },
      { label: "成分", value: "100% 天然沉香叶，无添加" },
      { label: "保质期", value: "24个月（密封干燥保存）" },
      { label: "冲泡建议", value: "90°C热水，3-5分钟" },
    ],
    story:
      "沉香树需要15年以上才能开始结香，叶片虽不及心材珍贵，却同样蕴含植物王国最精华的生化能量。我们选用树龄8年以上的成熟沉香树嫩叶，在节气最佳时手工采摘，用传统工艺加现代设备制成这款茶——每一口都是植物用时间酿造的馈赠。",
    rating: 4.9,
    reviewCount: 428,
    stock: 120,
    variants: [
      { name: "规格", options: ["30g（体验装）", "90g（月度装）", "180g（季度装）"] },
    ],
  },
  {
    id: "agarwood-tea-premium",
    category: "agarwood",
    name: "沉香养神礼盒",
    subtitle: "沉香茶 + 砭石杯垫 · 组合赋能",
    price: 688,
    originalPrice: 888,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    badge: "礼盒推荐",
    tagline: "喝茶时，连茶杯都在赋能你",
    description:
      "OpenTree 独家礼盒组合：将沉香茶的嗅觉疗愈与砭石杯垫的矿物能量融合。当你将茶杯放在砭石杯垫上，远红外线会温和激活茶液中的活性成分，让每一口茶都多一分能量。这也是东方赋能哲学的最佳实践——仪式感本身就是能量。",
    highlights: [
      "沉香叶茶 90g + 砭石圆形杯垫 1片",
      "砭石杯垫可促进茶液中分子活性",
      "高端礼品盒装，适合送礼",
      "附赠「身体赋能指南」手册",
      "定制 OpenTree 帆布手提袋",
    ],
    specs: [
      { label: "茶叶净含量", value: "90g" },
      { label: "砭石杯垫尺寸", value: "直径 10cm，厚 0.8cm" },
      { label: "礼盒尺寸", value: "28cm × 20cm × 8cm" },
      { label: "适合场景", value: "商务馈赠 / 节日礼品 / 自用升级" },
    ],
    story:
      "这款礼盒的灵感来自一位用户的分享——她把沉香茶杯放在砭石手串上，说感觉"茶里也有了矿石的气息"。我们由此研发了专用砭石杯垫，让品茶的每一刻都成为身体与天地连接的仪式。",
    rating: 4.9,
    reviewCount: 203,
    stock: 55,
  },
  {
    id: "agarwood-tea-cold",
    category: "agarwood",
    name: "沉香冷泡茶（夏季限定）",
    subtitle: "无需加热，随时随地赋能",
    price: 198,
    originalPrice: 248,
    images: [
      "https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=800&q=80",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=800&q=80",
    badge: "限定",
    tagline: "放入水杯，8小时后喝下天地精华",
    description:
      "专为现代快节奏生活设计的冷泡版本。将茶包放入矿泉水中，冷藏8小时，得到一杯清透微甘、带有淡淡木香的能量水。无需热水，无需等待，用矿泉水就能完成你当天最重要的赋能仪式。",
    highlights: [
      "专用冷泡工艺，低温萃取更温和",
      "使用矿泉水冷泡，保留更多微量元素",
      "口感清透不苦，适合不喜热茶的人",
      "独立便携装，外出随身携带",
    ],
    specs: [
      { label: "净含量", value: "20包/盒，每包 2.5g" },
      { label: "冷泡建议", value: "500ml 矿泉水 + 1包，冷藏 8h" },
      { label: "保质期", value: "18个月" },
    ],
    story:
      "炎热的夏天，能量不该打烊。冷泡沉香茶是我们送给夏天的礼物——让身体赋能成为一件简单、清凉、随时都能做到的事。",
    rating: 4.7,
    reviewCount: 134,
    stock: 89,
    variants: [{ name: "规格", options: ["20包", "40包"] }],
  },
];

// 视频内容
export const videos = [
  {
    id: "v1",
    title: "砭石手串：贴肤两周后，我的手变暖了",
    thumbnail:
      "https://images.unsplash.com/photo-1611042553484-d61f84d22784?w=600&q=80",
    duration: "1:23",
    views: "12.3万",
    platform: "tiktok" as const,
    embedUrl: "",
    category: "bian",
  },
  {
    id: "v2",
    title: "早晨一杯沉香茶，启动今天的能量模式",
    thumbnail:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80",
    duration: "0:58",
    views: "8.7万",
    platform: "tiktok" as const,
    embedUrl: "",
    category: "agarwood",
  },
  {
    id: "v3",
    title: "OpenTree 品牌故事：大地给予，身体接收",
    thumbnail:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    duration: "2:15",
    views: "24.1万",
    platform: "tiktok" as const,
    embedUrl: "",
    category: "brand",
  },
  {
    id: "v4",
    title: "砭石 vs 普通石头：科学解析为什么砭石有效",
    thumbnail:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    duration: "3:02",
    views: "19.5万",
    platform: "tiktok" as const,
    embedUrl: "",
    category: "bian",
  },
  {
    id: "v5",
    title: "身体赋能指南：每天5分钟，能量积累看得见",
    thumbnail:
      "https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=600&q=80",
    duration: "4:30",
    views: "31.2万",
    platform: "tiktok" as const,
    embedUrl: "",
    category: "brand",
  },
  {
    id: "v6",
    title: "沉香礼盒开箱：送给自己的身体赋能大礼",
    thumbnail:
      "https://images.unsplash.com/photo-1573408301185-9519f94f3e26?w=600&q=80",
    duration: "1:45",
    views: "6.8万",
    platform: "tiktok" as const,
    embedUrl: "",
    category: "agarwood",
  },
];

// 用户评价
export const reviews = [
  {
    id: "r1",
    productId: "bian-bracelet-classic",
    author: "林晓雯",
    avatar: "https://i.pravatar.cc/60?img=1",
    rating: 5,
    date: "2026-02-18",
    content:
      "戴了三个月了，手串质感很好，石头摸起来很细腻。最神奇的是，自从戴上之后，感觉手脚冰凉的情况确实有改善。不知道是不是心理作用，但反正感觉变好了就对了。",
    tag: "已购买 · 10mm款",
  },
  {
    id: "r2",
    productId: "agarwood-tea-classic",
    author: "陈明哲",
    avatar: "https://i.pravatar.cc/60?img=12",
    rating: 5,
    date: "2026-03-01",
    content:
      "每天早上一杯沉香茶，已经成为我的仪式感。香气真的很独特，比那些乱七八糟香精调的茶高级太多了。而且确实比较平静，我的焦虑感减少了很多。",
    tag: "已购买 · 90g装",
  },
  {
    id: "r3",
    productId: "agarwood-tea-premium",
    author: "周思婷",
    avatar: "https://i.pravatar.cc/60?img=5",
    rating: 5,
    date: "2026-01-22",
    content:
      "买来送老板的，礼盒包装特别精美，很有格调。老板专门发信息说喜欢，说这个茶香气特别。砭石杯垫也很有意思，感觉很用心的品牌。",
    tag: "已购买 · 礼盒款",
  },
  {
    id: "r4",
    productId: "bian-pendant-lotus",
    author: "王静宜",
    avatar: "https://i.pravatar.cc/60?img=9",
    rating: 5,
    date: "2026-02-05",
    content:
      "莲花吊坠真的太美了！石头的颜色有一种深邃的感觉，每块都不太一样。戴上之后很多人问我哪里买的，这种低调的美感很适合我。",
    tag: "已购买 · 莲花款",
  },
];
