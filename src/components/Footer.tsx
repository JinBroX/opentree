import { Link } from 'react-router-dom';
import { Leaf, Instagram, Youtube, Music2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      {/* Top banner */}
      <div className="bg-gradient-to-r from-earth-700 via-earth-600 to-sage-600 py-4 px-6 text-center text-white">
        <p className="text-sm font-medium">
          ✨ 满 ¥299 免运费 &nbsp;·&nbsp; 7天无理由退换 &nbsp;·&nbsp; 正品保证
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-sage-500 to-earth-500 rounded-full flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="font-display text-xl font-semibold text-white">OpenTree</span>
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              开启身体智慧，激活生命能量。<br />
              东方千年精粹 × 现代赋能哲学。
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 bg-stone-800 hover:bg-earth-600 rounded-full flex items-center justify-center transition-colors">
                <Music2 className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-stone-800 hover:bg-earth-600 rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-stone-800 hover:bg-earth-600 rounded-full flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">产品系列</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/products?category=bian', label: '砭石手串' },
                { href: '/products?category=bian', label: '砭石吊坠' },
                { href: '/products?category=agarwood', label: '沉香养生茶' },
                { href: '/products?category=agarwood', label: '沉香礼盒' },
                { href: '/products', label: '全部产品' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-stone-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">关于我们</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/about', label: '品牌故事' },
                { href: '/videos', label: '能量视频' },
                { href: '/about#philosophy', label: '赋能哲学' },
                { href: '/about#quality', label: '品质承诺' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-stone-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">客户服务</h4>
            <ul className="space-y-2.5">
              {[
                '运费说明',
                '退换政策',
                '配送时效',
                '联系我们',
              ].map((item) => (
                <li key={item}>
                  <span className="text-stone-400 hover:text-white transition-colors text-sm cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-stone-800 rounded-xl">
              <p className="text-xs text-stone-400 mb-1">客服微信</p>
              <p className="text-white font-medium text-sm">opentree2025</p>
              <p className="text-xs text-stone-400 mt-2">工作日 9:00–18:00</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-500 text-xs">
            © 2026 OpenTree. All rights reserved. 东方能量 · 身体赋能
          </p>
          <div className="flex items-center gap-4 text-xs text-stone-500">
            <span className="hover:text-stone-300 cursor-pointer transition-colors">隐私政策</span>
            <span className="hover:text-stone-300 cursor-pointer transition-colors">用户协议</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
