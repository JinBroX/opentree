import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { products } from '../data/copy';
import ProductCard from '../components/ProductCard';
import { useLang } from '../i18n/LangContext';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useLang();
  const categoryParam = searchParams.get('category') as 'bian' | 'agarwood' | null;
  const [activeCategory, setActiveCategory] = useState<'all' | 'bian' | 'agarwood'>(categoryParam || 'all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default');

  useEffect(() => {
    if (categoryParam) setActiveCategory(categoryParam);
    else setActiveCategory('all');
  }, [categoryParam]);

  const handleCat = (cat: 'all' | 'bian' | 'agarwood') => {
    setActiveCategory(cat);
    const next = new URLSearchParams(searchParams);
    if (cat === 'all') next.delete('category');
    else next.set('category', cat);
    setSearchParams(next);
  };

  const filtered = products
    .filter((p) => activeCategory === 'all' || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const cats = [
    { key: 'all' as const, label: t.products.all, count: products.length },
    { key: 'bian' as const, label: t.products.bian, count: products.filter((p) => p.category === 'bian').length },
    { key: 'agarwood' as const, label: t.products.agarwood, count: products.filter((p) => p.category === 'agarwood').length },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="relative pt-24 pb-16 bg-ink-950 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1400&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 container-base text-center">
          <p className="section-label text-ink-400 mb-4">OpenTree</p>
          <div className="divider mx-auto mb-6" />
          <h1 className="display-md text-white mb-4">{t.products.title}</h1>
          <p className="text-ink-400 max-w-xl mx-auto text-[15px] leading-relaxed">
            {t.products.subtitle}
          </p>
        </div>
      </div>

      <div className="container-base py-10">
        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            {cats.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleCat(cat.key)}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                  activeCategory === cat.key
                    ? 'bg-ink-950 text-white shadow-md'
                    : 'bg-ink-50 text-ink-600 hover:bg-ink-100 border border-ink-100'
                }`}
              >
                {cat.label}
                <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium ${
                  activeCategory === cat.key ? 'bg-white/20 text-white' : 'bg-ink-200 text-ink-500'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="w-4 h-4 text-ink-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="text-[13px] text-ink-600 border border-ink-200 rounded-xl px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-brand-300 cursor-pointer"
            >
              <option value="default">{t.products.sortDefault}</option>
              <option value="price-asc">{t.products.sortPriceAsc}</option>
              <option value="price-desc">{t.products.sortPriceDesc}</option>
              <option value="rating">{t.products.sortRating}</option>
            </select>
          </div>
        </div>

        <p className="text-ink-400 text-[13px] mb-6">
          {filtered.length} {t.products.all}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-ink-400 text-lg">{t.products.noResults}</div>
        )}
      </div>
    </div>
  );
}
