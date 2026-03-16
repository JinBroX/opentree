import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Zap, Heart, Wind } from 'lucide-react';
import { brandCopy } from '../data/copy';

const values = [
  { icon: Leaf, title: '自然纯粹', desc: '所有原料直接来自大自然，无化学添加，无人工干预，保留最完整的天然能量。' },
  { icon: Zap, title: '科学验证', desc: '砭石的生物物理特性已被现代科学证实，沉香的神经调节功效有大量研究支撑。' },
  { icon: Heart, title: '用户优先', desc: '我们的每一款产品都经过真实用户测试，不上市、不营销，直到我们自己满意为止。' },
  { icon: Wind, title: '持续赋能', desc: '身体赋能是一个过程，不是一次购买。我们提供持续的内容、社区和指导。' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[65vh] flex items-end pb-16 pt-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1920&q=85"
            alt="Forest"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 to-ink-950/80" />
        </div>
        <div className="relative z-10 container-base">
          <p className="section-label text-ink-400 mb-4">品牌故事</p>
          <div className="divider mb-6" />
          <h1 className="display-lg text-white mb-5 max-w-2xl">
            每一棵树，<br />
            <span className="text-gradient-gold italic">都是一个答案</span>
          </h1>
          <p className="text-white/65 text-lg max-w-lg leading-relaxed">
            当我们向下扎根，才有向上生长的力量。OpenTree 由此而来。
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section-pad bg-white">
        <div className="container-base max-w-4xl">
          <p className="section-label mb-4">我们是谁</p>
          <div className="divider mb-8" />
          <h2 className="display-md text-ink-950 mb-8">{brandCopy.brandStory.title}</h2>
          <div className="space-y-6">
            {brandCopy.brandStory.paragraphs.map((para, i) => (
              <p key={i} className="text-ink-500 text-lg leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-pad bg-ink-50">
        <div className="container-base">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="section-label mb-4">赋能哲学</p>
            <div className="divider mx-auto mb-6" />
            <h2 className="display-md text-ink-950 mb-4">{brandCopy.energyConcept.title}</h2>
            <p className="text-ink-400 text-[15px]">{brandCopy.energyConcept.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {brandCopy.energyConcept.items.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center mb-4 text-lg font-bold">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-ink-900 mb-2">{item.title}</h3>
                <p className="text-ink-400 text-[13px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-ink-950">
        <div className="container-base">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="section-label text-ink-400 mb-4">品牌价值观</p>
            <div className="divider mx-auto mb-6" />
            <h2 className="display-md text-white">我们相信的事</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v) => (
              <div key={v.title} className="bg-white/5 rounded-2xl p-7 border border-white/8 hover:bg-white/10 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-white text-[17px] mb-2">{v.title}</h3>
                <p className="text-ink-400 text-[14px] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-brand-500">
        <div className="container-base text-center">
          <h2 className="display-md text-white mb-4">准备好开始了吗？</h2>
          <p className="text-white/70 text-[16px] mb-8 max-w-md mx-auto">
            探索我们的产品，找到属于你的东方能量之物。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/products" className="btn-primary text-[15px]">
              浏览全部产品
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/videos" className="btn-outline-white text-[15px]">
              先看能量视频
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
