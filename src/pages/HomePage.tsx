import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Play, Star, Zap, Leaf, Coffee } from 'lucide-react';
import { products, reviews, videos } from '../data/copy';
import ProductCard from '../components/ProductCard';
import { useLang } from '../i18n/LangContext';

/* ─── Hero ─────────────────────────────────────────────────── */
function Hero() {
  const { t } = useLang();
  return (
    <section className="relative min-h-screen flex flex-col">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1920&q=90"
          alt="hero"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink-950/80 via-ink-950/50 to-forest-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex justify-center pt-28 lg:pt-32">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-medium tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
          {t.home.heroPill}
        </div>
      </div>

      <div className="relative z-10 flex-1 flex items-center">
        <div className="container-base w-full">
          <div className="max-w-4xl">
            <h1 className="display-xl text-white mb-6 leading-[1.08]">
              {t.home.heroH1a}<br />
              <span className="text-gradient-gold italic">{t.home.heroH1b}</span>
            </h1>
            <p className="text-white/70 text-lg sm:text-xl max-w-xl leading-relaxed mb-10 font-light whitespace-pre-line">
              {t.home.heroSub}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/products" className="btn-primary-gold text-[15px]">
                {t.home.heroCta1}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/about" className="btn-outline-white text-[15px]">
                {t.home.heroCta2}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10">
        <div className="container-base">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {t.common.trustSignals.map((s, i) => (
              <div key={i} className="py-6 px-4 text-center">
                <p className="font-display text-2xl sm:text-3xl font-bold text-brand-300">{s.number}</p>
                <p className="text-white/50 text-xs mt-1 tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Marquee Strip ────────────────────────────────────────── */
function MarqueeStrip() {
  const { t } = useLang();
  const items = t.home.marqueeItems;
  return (
    <div className="bg-brand-500 py-3 overflow-hidden">
      <div className="flex gap-0 animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-6 text-white font-semibold text-sm tracking-widest uppercase">
            {item}
            <span className="w-1 h-1 rounded-full bg-white/50" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Brand Concept ────────────────────────────────────────── */
function Concept() {
  const { t } = useLang();
  const icons = [<Zap className="w-5 h-5" />, <Coffee className="w-5 h-5" />, <Star className="w-5 h-5" />, <Leaf className="w-5 h-5" />];
  return (
    <section className="section-pad bg-white">
      <div className="container-base">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label mb-4">{t.home.conceptLabel}</p>
            <div className="divider mb-6" />
            <h2 className="display-md text-ink-950 mb-5 leading-snug">{t.home.conceptTitle}</h2>
            <p className="text-ink-400 text-lg leading-relaxed mb-10">{t.home.conceptSubtitle}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.common.energyConcept.map((item, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-2xl bg-ink-50 hover:bg-brand-50 border border-transparent hover:border-brand-200 transition-all duration-300 group">
                  <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-brand-100 flex items-center justify-center text-brand-600 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                    {icons[i]}
                  </div>
                  <div>
                    <p className="font-semibold text-ink-900 text-[15px] mb-1">{item.title}</p>
                    <p className="text-ink-400 text-[13px] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block h-[560px]">
            <img
              src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=85"
              alt="agarwood tea"
              className="absolute top-0 left-0 w-[65%] h-[60%] object-cover rounded-3xl shadow-card-hover"
            />
            <img
              src="https://images.unsplash.com/photo-1611042553484-d61f84d22784?w=600&q=85"
              alt="bian stone"
              className="absolute bottom-0 right-0 w-[60%] h-[55%] object-cover rounded-3xl shadow-card-hover"
            />
            <div className="absolute bottom-[38%] left-[28%] -translate-x-1/2 translate-y-1/2 w-16 h-16 bg-brand-500 rounded-2xl flex items-center justify-center shadow-glow-brand z-10">
              <Zap className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Products ─────────────────────────────────────────────── */
function Products() {
  const { t } = useLang();
  return (
    <section className="section-pad bg-ink-50">
      <div className="container-base">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-label mb-4">{t.home.productsLabel}</p>
            <div className="divider mb-5" />
            <h2 className="display-md text-ink-950">{t.home.productsTitle}</h2>
          </div>
          <Link to="/products" className="inline-flex items-center gap-2 text-ink-500 hover:text-ink-950 font-medium text-sm transition-colors group whitespace-nowrap">
            {t.home.productsViewAll}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <Link to="/products?category=bian" className="group relative h-52 rounded-2xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=85" alt="bian" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-950/75 via-ink-950/40 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8">
              <div>
                <span className="badge-gold mb-3">{t.nav.bian}</span>
                <h3 className="text-white text-2xl font-display font-bold leading-tight mt-2 whitespace-pre-line">{t.home.bianBannerTitle}</h3>
                <span className="inline-flex items-center gap-1.5 text-brand-300 text-sm font-medium mt-3 group-hover:gap-3 transition-all">
                  {t.home.bianBannerCta} <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
          <Link to="/products?category=agarwood" className="group relative h-52 rounded-2xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85" alt="agarwood" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-forest-950/75 via-forest-950/40 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8">
              <div>
                <span className="badge-forest mb-3">{t.nav.agarwood}</span>
                <h3 className="text-white text-2xl font-display font-bold leading-tight mt-2 whitespace-pre-line">{t.home.agarwoodBannerTitle}</h3>
                <span className="inline-flex items-center gap-1.5 text-forest-300 text-sm font-medium mt-3 group-hover:gap-3 transition-all">
                  {t.home.agarwoodBannerCta} <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Brand Story ──────────────────────────────────────────── */
function BrandStory() {
  const { t, lang } = useLang();
  const paragraphs = lang === 'zh'
    ? [
        '每个人的体内都藏着一棵树——根系连接大地，枝桠伸向天空。当你疲惫、焦虑、气血不畅时，不是你的身体出了问题，而是那棵树失去了与天地的连接。',
        'OpenTree 从东方智慧中寻找答案。砭石，这块距今数亿年的远古石材，携带着地球最深处的矿物频率；沉香，这粒历经数十年凝结的天然树脂，蕴含着植物王国最高级的疗愈能量。',
        '我们相信：真正的赋能不是向外添加，而是向内唤醒。将天地精华贴近身体，让身体记起它本来就懂得如何流动、如何滋养、如何绽放。',
      ]
    : [
        'Within each of us lives a tree — roots reaching into the earth, branches stretching toward the sky. When you feel exhausted, anxious, or out of balance, the tree hasn\'t broken. It\'s simply lost its connection to heaven and earth.',
        'OpenTree draws from Eastern wisdom. Bian stone — an ancient mineral formed over hundreds of millions of years — carries the deepest frequencies of the earth. Agarwood resin — condensed over decades — holds the highest healing energy of the plant kingdom.',
        'We believe: true empowerment is not about adding more, but awakening what\'s already within. Bring the essence of nature close to the body, and the body remembers how to flow, how to nourish, how to bloom.',
      ];
  return (
    <section className="section-pad bg-white overflow-hidden">
      <div className="container-base">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-5 -left-5 w-full h-full rounded-3xl bg-brand-100 z-0" />
            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=85"
              alt="nature"
              className="relative z-10 w-full aspect-4-3 object-cover rounded-3xl shadow-card-hover"
            />
            <div className="absolute z-20 -bottom-5 -right-5 bg-white rounded-2xl p-4 shadow-card-hover max-w-[160px]">
              <p className="text-3xl font-display font-bold text-brand-500">{t.home.storyYears}</p>
              <p className="text-ink-400 text-xs mt-1">{t.home.storyYearsLabel}</p>
            </div>
          </div>

          <div className="lg:pl-4">
            <p className="section-label mb-4">{t.home.storyLabel}</p>
            <div className="divider mb-6" />
            <h2 className="display-md text-ink-950 mb-8 leading-snug">{t.home.storyTitle}</h2>
            <div className="space-y-5">
              {paragraphs.map((para, i) => (
                <p key={i} className="text-ink-500 leading-relaxed text-[16px]">{para}</p>
              ))}
            </div>
            <Link to="/about" className="inline-flex items-center gap-2 mt-8 text-ink-900 font-semibold text-sm hover:text-brand-600 transition-colors group">
              {t.home.storyReadMore}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Videos Preview ───────────────────────────────────────── */
function VideosSection() {
  const { t } = useLang();
  return (
    <section className="section-pad bg-ink-950">
      <div className="container-base">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-label text-ink-400 mb-4">{t.home.videosLabel}</p>
            <div className="divider mb-5" />
            <h2 className="display-md text-white">{t.home.videosTitle}</h2>
          </div>
          <Link to="/videos" className="inline-flex items-center gap-2 text-ink-400 hover:text-white font-medium text-sm transition-colors group whitespace-nowrap">
            {t.home.videosViewAll}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.slice(0, 3).map((v) => (
            <div key={v.id} className="group cursor-pointer relative rounded-2xl overflow-hidden bg-ink-900">
              <div className="aspect-video">
                <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-500 transition-all duration-300">
                  <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white text-sm font-medium clamp-2 mb-2">{v.title}</p>
                <div className="flex items-center gap-3 text-ink-400 text-xs">
                  <span>{v.duration}</span>
                  <span className="w-1 h-1 rounded-full bg-ink-600" />
                  <span>{v.views} {t.videos.views}</span>
                </div>
              </div>
              <div className="absolute top-3 right-3 badge-dark text-[10px]">TikTok</div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-pink-600/20 via-purple-600/10 to-cyan-600/20 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center text-white font-black text-lg">T</div>
            <div>
              <p className="text-white font-semibold text-[15px]">@opentree.energy</p>
              <p className="text-ink-400 text-xs mt-0.5">{t.home.tiktokSub}</p>
            </div>
          </div>
          <a href="#" className="btn-outline-white py-2.5 px-6 text-[13px] whitespace-nowrap">
            {t.home.tiktokFollow}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Reviews ──────────────────────────────────────────────── */
function Reviews() {
  const { t } = useLang();
  return (
    <section className="section-pad bg-white">
      <div className="container-base">
        <div className="text-center max-w-lg mx-auto mb-12">
          <p className="section-label mb-4">{t.home.reviewsLabel}</p>
          <div className="divider mx-auto mb-5" />
          <h2 className="display-md text-ink-950">{t.home.reviewsTitle}</h2>
          <p className="text-ink-400 mt-4 text-[15px]">{t.home.reviewsSub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((r) => (
            <div key={r.id} className="card p-6 group">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-400 text-brand-400" />
                ))}
              </div>
              <p className="text-ink-600 text-[14px] leading-relaxed mb-5 italic clamp-3">
                "{r.content}"
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <img src={r.avatar} alt={r.author} className="w-9 h-9 rounded-full object-cover ring-2 ring-ink-100" />
                <div>
                  <p className="text-ink-900 font-semibold text-[13px]">{r.author}</p>
                  <p className="text-ink-400 text-[11px] mt-0.5">{r.tag}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA ────────────────────────────────────────────── */
function CtaSection() {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1920&q=85"
        alt="nature"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-ink-950/90 via-ink-950/70 to-forest-900/60" />
      <div className="relative z-10 container-base section-pad text-center">
        <p className="section-label text-brand-400 mb-4">{t.home.ctaLabel}</p>
        <div className="divider mx-auto mb-8" />
        <h2 className="display-lg text-white mb-6">
          {t.home.ctaTitle1}<br />
          <span className="text-gradient-gold italic">{t.home.ctaTitle2}</span>
        </h2>
        <p className="text-white/65 text-lg max-w-lg mx-auto leading-relaxed mb-10">
          {t.home.ctaSub}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/products" className="btn-primary-gold text-[15px]">
            {t.home.ctaBtn1}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/videos" className="btn-outline-white text-[15px]">
            {t.home.ctaBtn2}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <MarqueeStrip />
      <Concept />
      <Products />
      <BrandStory />
      <VideosSection />
      <Reviews />
      <CtaSection />
    </main>
  );
}
