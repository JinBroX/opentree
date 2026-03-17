import { Link } from 'react-router-dom';
import { ArrowUpRight, Instagram, Youtube } from 'lucide-react';
import { useLang } from '../i18n/LangContext';

export default function Footer() {
  const { t } = useLang();

  const exploreLinks = [
    { label: t.footer.allProducts, href: '/products' },
    { label: t.footer.bian, href: '/products?category=bian' },
    { label: t.footer.agarwood, href: '/products?category=agarwood' },
    { label: t.footer.videos, href: '/videos' },
    { label: t.footer.about, href: '/about' },
  ];

  const supportLinks = [
    { label: t.footer.shipping, href: '#' },
    { label: t.footer.returns, href: '#' },
    { label: t.footer.faq, href: '#' },
    { label: t.footer.contact, href: '#' },
  ];

  return (
    <footer className="bg-ink-950 text-white">
      {/* Main grid */}
      <div className="container-base py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              {/* Logo — inverted white version on dark bg */}
              <img
                src="/opentree-logo-02.png"
                alt="OpenTree"
                className="h-10 w-auto brightness-0 invert opacity-90"
              />
            </div>
            <p className="text-ink-400 text-[14px] leading-relaxed max-w-xs mb-7">
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-xl bg-white/8 hover:bg-brand-500 flex items-center justify-center transition-colors text-ink-400 hover:text-white">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-white/8 hover:bg-brand-500 flex items-center justify-center transition-colors text-ink-400 hover:text-white">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-white/8 hover:bg-red-500 flex items-center justify-center transition-colors text-ink-400 hover:text-white text-xs font-bold">
                T
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {[
            { title: t.footer.explore, items: exploreLinks },
            { title: t.footer.service, items: supportLinks },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-ink-500 mb-5">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-ink-400 hover:text-white text-[14px] transition-colors flex items-center gap-1 group"
                    >
                      {item.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="container-base py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-ink-500 text-[12px]">{t.footer.copyright}</p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-ink-500 hover:text-ink-300 text-[12px] transition-colors">
              {t.footer.privacy}
            </a>
            <a href="#" className="text-ink-500 hover:text-ink-300 text-[12px] transition-colors">
              {t.footer.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
