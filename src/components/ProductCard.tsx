import { Link } from 'react-router-dom';
import { ShoppingBag, Star, ArrowRight, Tag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import type { Product } from '../data/copy';

interface Props { product: Product; }

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ ...product, quantity: 1, selectedVariants: {} });
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <Link to={`/products/${product.id}`} className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-ink-50">
        <img
          src={product.coverImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-ink-950/0 group-hover:bg-ink-950/10 transition-colors duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="badge bg-brand-500 text-white text-[10px]">{product.badge}</span>
          )}
          {discount && (
            <span className="badge bg-red-500 text-white text-[10px]">
              <Tag className="w-2.5 h-2.5" />
              -{discount}%
            </span>
          )}
        </div>

        {/* Quick add btn */}
        <button
          onClick={handleAdd}
          className="absolute bottom-3 right-3 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-ink-900 hover:bg-brand-500 hover:text-white transition-all duration-200 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
          aria-label="加入购物袋"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-ink-900 text-[15px] leading-snug clamp-1">{product.name}</p>
            <p className="text-ink-400 text-[12px] mt-0.5 clamp-1">{product.subtitle}</p>
          </div>
          {/* Category indicator */}
          <span className={`flex-shrink-0 w-2 h-2 rounded-full mt-1.5 ${product.category === 'bian' ? 'bg-ink-400' : 'bg-forest-500'}`} />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-brand-400 text-brand-400' : 'fill-ink-200 text-ink-200'}`} />
            ))}
          </div>
          <span className="text-ink-400 text-[11px]">({product.reviewCount})</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-ink-100">
          <div>
            <span className="font-bold text-ink-950 text-[17px]">¥{product.price}</span>
            {product.originalPrice && (
              <span className="text-ink-300 text-[13px] line-through ml-1.5">¥{product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors"
          >
            加入购物袋
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </Link>
  );
}
