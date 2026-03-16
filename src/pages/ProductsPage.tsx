import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { products } from '../data/copy';
import ProductCard from '../components/ProductCard';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as 'bian' | 'agarwood' | null;
  const [activeCategory, setActiveCategory] = useState<'all' | 'bian' | 'agarwood'>(
    categoryParam || 'all'
  );
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default');

  useEffect(() => {
    if (categoryParam) setActiveCategory(categoryParam);
  }, [categoryParam]);

  const handleCategoryChange = (cat: 'all' | 'bian' | 'agarwood') => {
    setActiveCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const filtered = products
    .filter((p) => activeCategory === 'all' || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const categories = [
    { key: 'all' as const, label: '全部产品', count: products.length },
    { key: 'bian' as const, label: '砭石系列', count: products.filter((p) => p.category === 'bian').length },
    { key: 'agarwood' as const, label: '沉香系列', count: products.filter((p) => p.category === 'agarwood').length },
  ];

  return (
    <div className="min-h-screen bg-stone-50 pt-24">
      {/* Page Header */}
      <div className="bg-gradient-to-b from-amber-50 to-stone-50 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="tag-badge mb-3 inline-block">OpenTree 产品</span>
          <h1 className="section-title mb-4">天地精华，随身携带</h1>
          <p className="text-stone-500 max-w-xl mx-auto">
            砭石的远古矿能与沉香的千年馥郁，两种自然力量，共同构建你的身体赋能系统
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleCategoryChange(cat.key)}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.key
                    ? 'bg-earth-600 text-white shadow-md shadow-earth-200'
                    : 'bg-white text-stone-600 hover:bg-amber-50 border border-stone-200'
                }`}
              >
                {cat.label}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeCategory === cat.key ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-stone-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="text-sm text-stone-600 border border-stone-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-earth-300"
            >
              <option value="default">默认排序</option>
              <option value="price-asc">价格从低到高</option>
              <option value="price-desc">价格从高到低</option>
              <option value="rating">评分最高</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-stone-400 text-sm mb-6">共 {filtered.length} 件产品</p>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-stone-400 text-lg">暂无符合条件的产品</p>
          </div>
        )}
      </div>
    </div>
  );
}
