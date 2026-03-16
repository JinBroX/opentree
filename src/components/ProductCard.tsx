import { Link } from 'react-router-dom';
import { Star, ShoppingBag } from 'lucide-react';
import { Product } from '../data/copy';
import { useCartStore } from '../store/cartStore';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    const defaultVariants: Record<string, string> = {};
    product.variants?.forEach((v) => {
      defaultVariants[v.name] = v.options[0];
    });
    addItem(product, 1, defaultVariants);
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-amber-50">
        <img
          src={product.coverImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-earth-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}
        {/* Quick add button */}
        <button
          onClick={handleQuickAdd}
          className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-earth-600 hover:text-white"
          title="快速加入购物袋"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="text-xs text-earth-600 font-medium tracking-wider uppercase mb-1">
          {product.category === 'bian' ? '砭石系列' : '沉香系列'}
        </p>
        <h3 className="font-semibold text-stone-800 text-base leading-snug mb-1">
          {product.name}
        </h3>
        <p className="text-stone-400 text-xs line-clamp-2 mb-3">
          {product.tagline}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-stone-200'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-stone-400">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-stone-800">
            ¥{product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-stone-400 line-through">
              ¥{product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
