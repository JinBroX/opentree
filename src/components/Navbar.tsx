import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Globe } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useLang } from '../i18n/LangContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleCart } = useCartStore();
  const count = useCartStore((s) => s.totalCount());
  const location = useLocation();
  const { t, lang, toggle } = useLang();

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/products', label: t.nav.allProducts },
    { href: '/products?category=bian', label: t.nav.bian },
    { href: '/products?category=agarwood', label: t.nav.agarwood },
    { href: '/videos', label: t.nav.videos },
    { href: '/about', label: t.nav.about },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const isHome = location.pathname === '/';
  const transparent = isHome && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          transparent ? 'bg-transparent' : 'glass shadow-nav'
        }`}
      >
        <div className="container-base">
          <div className="flex items-center justify-between h-16 lg:h-[70px]">

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
              {/* Logo image — white filter when over hero, normal otherwise */}
              <img
                src="/opentree-logo-01.png"
                alt="OpenTree"
                className={`h-9 lg:h-11 w-auto object-contain transition-all duration-300 ${
                  transparent
                    ? 'brightness-0 invert opacity-90'
                    : 'opacity-100'
                }`}
              />
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active =
                  location.pathname === link.href.split('?')[0] &&
                  (link.href.includes('?')
                    ? location.search.includes(link.href.split('?')[1])
                    : true);
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-all ${
                      transparent
                        ? active
                          ? 'text-white bg-white/20'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                        : active
                          ? 'text-ink-950 bg-ink-100'
                          : 'text-ink-500 hover:text-ink-900 hover:bg-ink-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* ── Actions ── */}
            <div className="flex items-center gap-1">
              {/* Language toggle */}
              <button
                onClick={toggle}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-semibold tracking-wide transition-all ${
                  transparent
                    ? 'text-white/80 hover:bg-white/15 hover:text-white'
                    : 'text-ink-500 hover:bg-ink-100 hover:text-ink-900'
                }`}
                aria-label="Switch language"
              >
                <Globe className="w-3.5 h-3.5" />
                {lang === 'zh' ? 'EN' : '中'}
              </button>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className={`relative p-2.5 rounded-xl transition-all ${
                  transparent
                    ? 'text-white hover:bg-white/15'
                    : 'text-ink-700 hover:bg-ink-100'
                }`}
                aria-label={t.nav.cart}
              >
                <ShoppingBag className="w-5 h-5" />
                {count > 0 && (
                  <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] bg-brand-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </button>

              {/* Mobile menu */}
              <button
                className={`lg:hidden p-2.5 rounded-xl transition-all ${
                  transparent
                    ? 'text-white hover:bg-white/15'
                    : 'text-ink-700 hover:bg-ink-100'
                }`}
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={t.nav.menu}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Desktop CTA */}
              <Link
                to="/products"
                className="hidden lg:flex btn-primary-gold py-2.5 px-5 text-[13px] ml-2"
              >
                {t.nav.buyNow}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? 'visible' : 'invisible'
        }`}
      >
        <div
          className={`absolute inset-0 bg-ink-950/50 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-ink-100">
            <img src="/opentree-logo.png" alt="OpenTree" className="h-8 w-auto" />
            <div className="flex items-center gap-2">
              {/* Language toggle in mobile */}
              <button
                onClick={toggle}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[12px] font-semibold text-ink-500 hover:bg-ink-100 hover:text-ink-900 transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                {lang === 'zh' ? 'EN' : '中'}
              </button>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg hover:bg-ink-100 transition-colors"
              >
                <X className="w-5 h-5 text-ink-600" />
              </button>
            </div>
          </div>
          <nav className="p-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="flex items-center px-4 py-3 rounded-xl text-ink-700 hover:bg-ink-50 hover:text-ink-950 font-medium text-[15px] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-ink-100 mt-2">
            <Link to="/products" className="btn-primary-gold w-full">
              {t.nav.shopNow}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
