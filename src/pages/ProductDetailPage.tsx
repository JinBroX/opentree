import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, ShoppingBag, Minus, Plus, Heart, ChevronDown, CheckCircle } from 'lucide-react';
import { products, reviews } from '../data/copy';
import { useCartStore } from '../store/cartStore';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const addItem = useCartStore((s) => s.addItem);

  const [selImg, setSelImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [selVariants, setSelVariants] = useState<Record<string, string>>(() => {
    const d: Record<string, string> = {};
    product?.variants?.forEach((v) => { d[v.name] = v.options[0]; });
    return d;
  });
  const [openSpec, setOpenSpec] = useState(false);
  const [liked, setLiked] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-ink-400 mb-4">产品不存在</p>
          <Link to="/products" className="btn-primary">返回产品列表</Link>
        </div>
      </div>
    );
  }

  const productReviews = reviews.filter((r) => r.productId === product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="min-h-screen bg-white pt-16 lg:pt-[70px]">
      {/* Breadcrumb */}
      <div className="container-base py-4 flex items-center gap-2 text-[13px] text-ink-400">
        <Link to="/" className="hover:text-ink-700 transition-colors">首页</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-ink-700 transition-colors">产品</Link>
        <span>/</span>
        <span className="text-ink-700">{product.name}</span>
      </div>

      <div className="container-base py-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <div className="sticky top-[80px] self-start">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-ink-50 mb-3">
              <img
                src={product.images[selImg]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 badge bg-brand-500 text-white">{product.badge}</span>
              )}
              {discount && (
                <span className="absolute top-4 right-12 badge bg-red-500 text-white">-{discount}%</span>
              )}
              <button
                onClick={() => setLiked(!liked)}
                className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center shadow-card transition-all ${
                  liked ? 'bg-red-500 text-white' : 'bg-white text-ink-400 hover:text-red-400'
                }`}
              >
                <Heart className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} />
              </button>
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2.5">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelImg(i)}
                    className={`w-[72px] h-[72px] rounded-xl overflow-hidden flex-shrink-0 transition-all ${
                      selImg === i ? 'ring-2 ring-brand-500 ring-offset-2' : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="section-label mb-2">
              {product.category === 'bian' ? '砭石系列' : '沉香系列'}
            </p>
            <h1 className="font-display text-3xl lg:text-[40px] font-bold text-ink-950 leading-tight mb-2">
              {product.name}
            </h1>
            <p className="text-ink-400 text-[16px] mb-3">{product.subtitle}</p>
            <p className="text-brand-600 italic text-[15px] font-medium mb-5">「{product.tagline}」</p>

            {/* Rating */}
            <div className="flex items-center gap-2.5 mb-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-brand-400 text-brand-400' : 'fill-ink-100 text-ink-100'}`} />
                ))}
              </div>
              <span className="font-semibold text-ink-800 text-[14px]">{product.rating}</span>
              <span className="text-ink-400 text-[13px]">({product.reviewCount} 条评价)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8 pb-8 border-b border-ink-100">
              <span className="text-4xl font-bold text-ink-950">¥{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-ink-300 line-through">¥{product.originalPrice}</span>
                  <span className="badge bg-red-50 text-red-500">节省 ¥{product.originalPrice - product.price}</span>
                </>
              )}
            </div>

            {/* Variants */}
            {product.variants?.map((variant) => (
              <div key={variant.name} className="mb-6">
                <p className="text-[13px] font-semibold text-ink-700 mb-2.5">
                  {variant.name}：<span className="text-brand-600 font-bold">{selVariants[variant.name]}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {variant.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelVariants({ ...selVariants, [variant.name]: opt })}
                      className={`px-4 py-2 rounded-xl text-[13px] font-medium border-2 transition-all ${
                        selVariants[variant.name] === opt
                          ? 'border-ink-950 bg-ink-950 text-white'
                          : 'border-ink-200 text-ink-600 hover:border-ink-400'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-7">
              <p className="text-[13px] font-semibold text-ink-700">数量</p>
              <div className="flex items-center gap-0 border border-ink-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 flex items-center justify-center text-ink-600 hover:bg-ink-50 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-semibold text-ink-900">{qty}</span>
                <button
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  className="w-10 h-10 flex items-center justify-center text-ink-600 hover:bg-ink-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-[12px] text-ink-400">库存 {product.stock} 件</span>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 mb-7">
              <button
                onClick={() => addItem(product, qty, selVariants)}
                className="flex-1 btn-outline justify-center"
              >
                <ShoppingBag className="w-4 h-4" />
                加入购物袋
              </button>
              <button
                onClick={() => { addItem(product, qty, selVariants); navigate('/checkout'); }}
                className="flex-1 btn-primary-gold justify-center"
              >
                立即购买
              </button>
            </div>

            {/* Trust */}
            <div className="flex flex-wrap gap-2">
              {['正品保证', '7天退换', '满299免邮', '礼品包装'].map((b) => (
                <span key={b} className="flex items-center gap-1.5 text-[12px] text-ink-500 bg-ink-50 px-3 py-1.5 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5 text-forest-500" />
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Details section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="font-semibold text-ink-900 text-xl mb-4">产品介绍</h2>
              <p className="text-ink-500 leading-relaxed text-[15px]">{product.description}</p>
            </div>
            <div>
              <h2 className="font-semibold text-ink-900 text-xl mb-4">产品亮点</h2>
              <ul className="space-y-3">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-ink-500 text-[15px]">
                    <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                      {i + 1}
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-semibold text-ink-900 text-xl mb-4">产品故事</h2>
              <p className="text-ink-500 leading-relaxed text-[15px]">{product.story}</p>
            </div>
          </div>

          <div>
            <button
              onClick={() => setOpenSpec(!openSpec)}
              className="w-full bg-ink-50 rounded-2xl p-5 text-left hover:bg-ink-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-ink-900">产品规格</h2>
                <ChevronDown className={`w-5 h-5 text-ink-400 transition-transform ${openSpec ? 'rotate-180' : ''}`} />
              </div>
              <div className={`space-y-3 overflow-hidden transition-all ${openSpec ? 'max-h-[400px] mt-4' : 'max-h-0'}`}>
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between text-[13px]">
                    <span className="text-ink-400">{spec.label}</span>
                    <span className="text-ink-800 font-medium text-right max-w-[60%]">{spec.value}</span>
                  </div>
                ))}
              </div>
              {!openSpec && <p className="text-brand-500 text-[13px] mt-2">点击展开规格</p>}
            </button>
          </div>
        </div>

        {/* Reviews */}
        {productReviews.length > 0 && (
          <div className="mt-14">
            <h2 className="font-semibold text-ink-900 text-xl mb-6">用户评价 ({productReviews.length})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {productReviews.map((r) => (
                <div key={r.id} className="bg-ink-50 rounded-2xl p-6">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-brand-400 text-brand-400" />
                    ))}
                  </div>
                  <p className="text-ink-500 text-[14px] leading-relaxed mb-4 italic">"{r.content}"</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={r.avatar} alt={r.author} className="w-8 h-8 rounded-full" />
                      <span className="text-[13px] font-semibold text-ink-800">{r.author}</span>
                    </div>
                    <span className="text-[11px] text-ink-300">{r.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-semibold text-ink-900 text-xl mb-6">同系列产品</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
