import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Leaf } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleCart, totalCount } = useCartStore();
  const count = useCartStore((s) => s.totalCount());
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { href: '/', label: '首页' },
    { href: '/products', label: '全部产品' },
    { href: '/products?category=bian', label: '砭石系列' },
    { href: '/products?category=agarwood', label: '沉香系列' },
    { href: '/videos', label: '能量视频' },
    { href: '/about', label: '品牌故事' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-sm shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-sage-500 to-earth-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="font-display text-xl font-semibold text-stone-800 tracking-wide">
                OpenTree
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium transition-colors hover:text-earth-600 ${
                    location.pathname === link.href.split('?')[0]
                      ? 'text-earth-600'
                      : 'text-stone-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleCart}
                className="relative p-2 rounded-full hover:bg-stone-100 transition-colors"
                aria-label="购物袋"
              >
                <ShoppingBag className="w-5 h-5 text-stone-700" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-earth-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                className="lg:hidden p-2 rounded-full hover:bg-stone-100 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="菜单"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5 text-stone-700" />
                ) : (
                  <Menu className="w-5 h-5 text-stone-700" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 pt-20">
            <p className="text-xs text-stone-400 uppercase tracking-widest mb-6 font-medium">
              导航菜单
            </p>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="flex items-center px-4 py-3 text-stone-700 hover:bg-amber-50 hover:text-earth-600 rounded-xl transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-8 pt-6 border-t border-stone-100">
              <p className="text-xs text-stone-400 text-center">
                开启身体智慧，激活生命能量
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
