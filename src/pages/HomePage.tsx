import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Sparkles, Leaf, Wind } from 'lucide-react';
import { brandCopy, products, reviews, videos } from '../data/copy';
import ProductCard from '../components/ProductCard';

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80"
          alt="Forest background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-amber-950/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/30 to-transparent" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-200/20 animate-float"
            style={{
              width: `${Math.random() * 80 + 20}px`,
              height: `${Math.random() * 80 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 1.1}s`,
              animationDuration: `${Math.random() * 4 + 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-amber-300" />
          {brandCopy.subTagline}
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 animate-slide-up">
          {brandCopy.heroHeadline.split('\n').map((line, i) => (
            <span key={i} className="block">
              {i === 0 ? (
                line
              ) : (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-earth-300">
                  {line}
                </span>
              )}
            </span>
          ))}
        </h1>

        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-10 animate-slide-up">
          {brandCopy.heroSubHeadline}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
          <Link to="/products" className="btn-primary text-sm">
            {brandCopy.cta.primary}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium"
          >
            {brandCopy.cta.secondary}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  );
}

// Brand Story
function BrandStorySection() {
  return (
    <section className="py-24 lg:py-32 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=700&q=80"
                alt="沉香茶"
                className="w-full aspect-[4/3] object-cover rounded-3xl shadow-2xl"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-2/3 z-20 hidden sm:block">
              <img
                src="https://images.unsplash.com/photo-1611042553484-d61f84d22784?w=500&q=80"
                alt="砭石手串"
                className="w-full aspect-square object-cover rounded-3xl shadow-2xl border-4 border-amber-50"
              />
            </div>
            {/* Decorative */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-sage-200 to-earth-200 rounded-full opacity-50 -z-10" />
          </div>

          {/* Text */}
          <div className="lg:pl-8">
            <span className="tag-badge mb-6 inline-block">品牌故事</span>
            <h2 className="section-title mb-8">
              {brandCopy.brandStory.title}
            </h2>
            <div className="space-y-5">
              {brandCopy.brandStory.paragraphs.map((p, i) => (
                <p key={i} className="text-stone-600 leading-relaxed text-lg">
                  {p}
                </p>
              ))}
            </div>
            <Link to="/about" className="inline-flex items-center gap-2 mt-8 text-earth-600 font-medium hover:gap-4 transition-all">
              了解更多故事
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Energy Concept
function EnergyConceptSection() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="tag-badge mb-4 inline-block">赋能哲学</span>
          <h2 className="section-title mb-4">{brandCopy.energyConcept.title}</h2>
          <p className="text-stone-500 text-lg">{brandCopy.energyConcept.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brandCopy.energyConcept.items.map((item, i) => (
            <div
              key={i}
              className="relative p-8 bg-gradient-to-b from-amber-50 to-white rounded-3xl border border-amber-100 hover:border-earth-300 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-semibold text-stone-800 text-lg mb-3 group-hover:text-earth-700 transition-colors">
                {item.title}
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-earth-100 to-transparent rounded-tr-3xl rounded-bl-3xl opacity-50" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Products Section
function ProductsSection() {
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="py-24 lg:py-32 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="tag-badge mb-3 inline-block">精选产品</span>
            <h2 className="section-title">天地精华，随身携带</h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-earth-600 font-medium hover:gap-4 transition-all whitespace-nowrap"
          >
            探索全部
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Link
            to="/products?category=bian"
            className="group relative h-48 rounded-3xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1611042553484-d61f84d22784?w=800&q=80"
              alt="砭石系列"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-900/70 to-stone-900/20" />
            <div className="absolute inset-0 flex items-center p-8">
              <div>
                <p className="text-amber-300 text-sm font-medium mb-1">砭石系列</p>
                <h3 className="text-white text-2xl font-bold font-display mb-2">
                  远古矿能，<br />贴肤共振
                </h3>
                <span className="inline-flex items-center gap-1 text-white/80 text-sm group-hover:gap-3 transition-all">
                  探索系列 <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>

          <Link
            to="/products?category=agarwood"
            className="group relative h-48 rounded-3xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80"
              alt="沉香系列"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-earth-900/70 to-earth-900/20" />
            <div className="absolute inset-0 flex items-center p-8">
              <div>
                <p className="text-amber-300 text-sm font-medium mb-1">沉香系列</p>
                <h3 className="text-white text-2xl font-bold font-display mb-2">
                  千年馥郁，<br />由内安神
                </h3>
                <span className="inline-flex items-center gap-1 text-white/80 text-sm group-hover:gap-3 transition-all">
                  探索系列 <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Trust Signals
function TrustSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-earth-700 via-earth-600 to-sage-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {brandCopy.trustSignals.map((item, i) => (
            <div key={i} className="text-center text-white">
              <p className="font-display text-4xl lg:text-5xl font-bold text-amber-200 mb-2">
                {item.number}
              </p>
              <p className="text-white/80 text-sm font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Videos Section (Preview)
function VideosPreviewSection() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="tag-badge mb-4 inline-block">能量视频</span>
          <h2 className="section-title mb-4">{brandCopy.videoSection.title}</h2>
          <p className="text-stone-500">{brandCopy.videoSection.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.slice(0, 3).map((video) => (
            <div
              key={video.id}
              className="group relative rounded-2xl overflow-hidden bg-stone-100 cursor-pointer"
            >
              <div className="aspect-video">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border border-white/30">
                  <div className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[14px] border-transparent border-l-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-medium text-sm line-clamp-2 mb-2">
                  {video.title}
                </p>
                <div className="flex items-center gap-3 text-white/60 text-xs">
                  <span>{video.duration}</span>
                  <span>{video.views} 次播放</span>
                </div>
              </div>
              {/* TikTok badge */}
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium">
                TikTok
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/videos" className="btn-secondary">
            查看更多视频
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* TikTok follow banner */}
        <div className="mt-8 p-6 bg-gradient-to-r from-stone-900 to-stone-800 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-cyan-500 rounded-2xl flex items-center justify-center font-bold text-white text-lg">
              T
            </div>
            <div>
              <p className="text-white font-semibold">{brandCopy.videoSection.tiktokBanner}</p>
              <p className="text-stone-400 text-sm">每周更新，能量日常记录</p>
            </div>
          </div>
          <a
            href="#"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-stone-900 font-semibold text-sm px-6 py-3 rounded-full hover:bg-amber-50 transition-colors"
          >
            立即关注
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

// Reviews
function ReviewsSection() {
  return (
    <section className="py-24 lg:py-32 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="tag-badge mb-4 inline-block">用户心声</span>
          <h2 className="section-title mb-4">他们说，身体在回应</h2>
          <p className="text-stone-500">真实用户 · 真实体验 · 不加修饰</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-stone-600 text-sm leading-relaxed mb-5 italic">
                "{review.content}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-stone-800 text-sm">{review.author}</p>
                  <p className="text-xs text-stone-400">{review.tag}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Final CTA
function CtaSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1920&q=80"
          alt="nature"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/85 to-stone-900/60" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center text-white">
        <Leaf className="w-12 h-12 mx-auto mb-6 text-sage-400" />
        <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6 leading-tight">
          你的身体，<br />
          <span className="text-amber-300">等了多久了？</span>
        </h2>
        <p className="text-white/75 text-lg mb-10 leading-relaxed">
          每一天都是重新连接的机会。砭石贴肤，沉香入杯，开始你的东方能量生活方式。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/products" className="btn-primary">
            开始我的能量之旅
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <BrandStorySection />
      <EnergyConceptSection />
      <ProductsSection />
      <TrustSection />
      <VideosPreviewSection />
      <ReviewsSection />
      <CtaSection />
    </main>
  );
}
