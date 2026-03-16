import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, ShoppingBag, Minus, Plus, Share2, Heart, ChevronDown } from 'lucide-react';
import { products, reviews } from '../data/copy';
import { useCartStore } from '../store/cartStore';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const addItem = useCartStore((s) => s.addItem);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {};
    product?.variants?.forEach((v) => { defaults[v.name] = v.options[0]; });
    return defaults;
  });
  const [openSpec, setOpenSpec] = useState(false);
  const [liked, setLiked] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-stone-500 text-lg mb-4">产品不存在</p>
          <Link to="/products" className="btn-primary">返回产品列表</Link>
        </div>
      </div>
    );
  }

  const productReviews = reviews.filter((r) => r.productId === product.id);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariants);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedVariants);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-white pt-16 lg:pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-stone-400">
          <Link to="/" className="hover:text-earth-600 transition-colors">首页</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-earth-600 transition-colors">产品</Link>
          <span>/</span>
          <span className="text-stone-700">{product.name}</span>
        </nav>
      </div>

      {/* Main Product */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-amber-50 mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-earth-500 text-white text-sm font-medium px-3 py-1.5 rounded-full">
                  {product.badge}
                </span>
              )}
              <button
                onClick={() => setLiked(!liked)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${
                  liked ? 'bg-red-500 text-white' : 'bg-white/90 text-stone-600 hover:text-red-500'
                }`}
              >
                <Heart className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} />
              </button>
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 transition-all ${
                      selectedImage === i ? 'ring-2 ring-earth-500 ring-offset-2' : 'opacity-60 hover:opacity-100'
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
            <p className="text-earth-600 text-sm font-medium tracking-wider uppercase mb-2">
              {product.category === 'bian' ? '砭石系列' : '沉香系列'}
            </p>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-stone-800 mb-2">
              {product.name}
            </h1>
            <p className="text-stone-500 text-lg mb-4">{product.subtitle}</p>
            <p className="text-earth-700 font-medium italic mb-6">" {product.tagline} "</p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-stone-200'}`}
                  />
                ))}
              </div>
              <span className="font-medium text-stone-700">{product.rating}</span>
              <span className="text-stone-400 text-sm">({product.reviewCount} 条评价)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-4xl font-bold text-stone-800">¥{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-stone-400 line-through">¥{product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <span className="bg-red-50 text-red-600 text-sm font-medium px-2 py-0.5 rounded-full">
                  节省 ¥{product.originalPrice - product.price}
                </span>
              )}
            </div>

            {/* Variants */}
            {product.variants?.map((variant) => (
              <div key={variant.name} className="mb-6">
                <p className="text-sm font-medium text-stone-700 mb-2">
                  {variant.name}：<span className="text-earth-600">{selectedVariants[variant.name]}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {variant.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedVariants({ ...selectedVariants, [variant.name]: opt })}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                        selectedVariants[variant.name] === opt
                          ? 'border-earth-500 bg-earth-50 text-earth-700'
                          : 'border-stone-200 text-stone-600 hover:border-earth-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-8">
              <p className="text-sm font-medium text-stone-700">数量</p>
              <div className="flex items-center gap-2 border border-stone-200 rounded-xl px-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:text-earth-600 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2 hover:text-earth-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs text-stone-400">库存 {product.stock} 件</span>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-secondary justify-center"
              >
                <ShoppingBag className="w-4 h-4" />
                加入购物袋
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 btn-primary justify-center"
              >
                立即购买
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {['正品保证', '7天退换', '满299免运', '礼品包装'].map((b) => (
                <span key={b} className="text-xs text-stone-500 bg-stone-50 border border-stone-100 px-3 py-1.5 rounded-full">
                  ✓ {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Description */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-semibold text-stone-800 text-xl mb-4">产品介绍</h2>
              <p className="text-stone-600 leading-relaxed">{product.description}</p>
            </div>
            <div>
              <h2 className="font-semibold text-stone-800 text-xl mb-4">产品亮点</h2>
              <ul className="space-y-2.5">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-stone-600">
                    <span className="w-5 h-5 rounded-full bg-sage-100 text-sage-700 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-medium">
                      {i + 1}
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-semibold text-stone-800 text-xl mb-4">产品故事</h2>
              <p className="text-stone-600 leading-relaxed">{product.story}</p>
            </div>
          </div>

          {/* Specs */}
          <div>
            <div
              className="bg-amber-50 rounded-2xl p-6 cursor-pointer"
              onClick={() => setOpenSpec(!openSpec)}
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-stone-800 text-lg">产品规格</h2>
                <ChevronDown
                  className={`w-5 h-5 text-stone-500 transition-transform ${openSpec ? 'rotate-180' : ''}`}
                />
              </div>
              <div className={`space-y-3 overflow-hidden transition-all ${openSpec ? 'max-h-96 mt-4' : 'max-h-0'}`}>
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between text-sm">
                    <span className="text-stone-500">{spec.label}</span>
                    <span className="text-stone-700 font-medium text-right max-w-[60%]">{spec.value}</span>
                  </div>
                ))}
              </div>
              {!openSpec && (
                <p className="text-earth-600 text-sm mt-1">点击查看完整规格</p>
              )}
            </div>
          </div>
        </div>

        {/* Reviews */}
        {productReviews.length > 0 && (
          <div className="mt-16">
            <h2 className="font-semibold text-stone-800 text-xl mb-6">
              用户评价 ({productReviews.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {productReviews.map((review) => (
                <div key={review.id} className="bg-stone-50 rounded-2xl p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-stone-600 leading-relaxed mb-4 italic">"{review.content}"</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={review.avatar} alt={review.author} className="w-8 h-8 rounded-full" />
                      <span className="text-sm font-medium text-stone-700">{review.author}</span>
                    </div>
                    <span className="text-xs text-stone-400">{review.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="font-semibold text-stone-800 text-xl mb-6">同系列产品</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
