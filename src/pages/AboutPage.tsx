import { Leaf, Wind, Zap, Heart } from 'lucide-react';
import { brandCopy } from '../data/copy';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1920&q=80"
            alt="Forest"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 to-stone-900/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
          <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            品牌故事
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            每一棵树，<br />
            <span className="text-amber-300">都是一个答案</span>
          </h1>
          <p className="text-white/80 text-lg leading-relaxed">
            当我们向下扎根，才有向上生长的力量。OpenTree 由此而来。
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 px-4 bg-amber-50">
        <div className="max-w-4xl mx-auto">
          <span className="tag-badge mb-6 inline-block">我们是谁</span>
          <h2 className="section-title mb-8">{brandCopy.brandStory.title}</h2>
          {brandCopy.brandStory.paragraphs.map((p, i) => (
            <p key={i} className="text-stone-600 text-lg leading-relaxed mb-6">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="tag-badge mb-4 inline-block">赋能哲学</span>
            <h2 className="section-title">{brandCopy.energyConcept.title}</h2>
            <p className="text-stone-500 text-lg mt-4 max-w-2xl mx-auto">
              {brandCopy.energyConcept.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {brandCopy.energyConcept.items.map((item, i) => (
              <div key={i} className="text-center p-8">
                <div className="text-5xl mb-6">{item.icon}</div>
                <h3 className="font-semibold text-stone-800 text-xl mb-3">{item.title}</h3>
                <p className="text-stone-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Commitment */}
      <section id="quality" className="py-24 px-4 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="tag-badge mb-4 inline-block">品质承诺</span>
            <h2 className="section-title">我们对品质的执念</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Leaf className="w-8 h-8" />,
                title: "原产地直供",
                desc: "砭石直采自山东泗水，沉香直采自广东惠州，跳过中间环节，原产地品质直达你手。",
                color: "text-sage-600 bg-sage-50",
              },
              {
                icon: <Wind className="w-8 h-8" />,
                title: "零添加工艺",
                desc: "所有产品不添加任何人工成分。砭石手工打磨，沉香低温慢焙，保留天然能量最完整的状态。",
                color: "text-earth-600 bg-earth-50",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "科学验证",
                desc: "我们与多所高校合作，对砭石的远红外辐射和沉香的倍半萜成分进行检测，以科学为品质背书。",
                color: "text-amber-600 bg-amber-50",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-sm">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${item.color}`}>
                  {item.icon}
                </div>
                <h3 className="font-semibold text-stone-800 text-xl mb-3">{item.title}</h3>
                <p className="text-stone-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16 bg-gradient-to-r from-earth-700 to-sage-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            {brandCopy.trustSignals.map((item, i) => (
              <div key={i}>
                <p className="font-display text-5xl font-bold text-amber-200 mb-2">{item.number}</p>
                <p className="text-white/80 font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-white text-center">
        <Heart className="w-12 h-12 mx-auto mb-6 text-earth-400" />
        <h2 className="font-display text-4xl font-bold text-stone-800 mb-4">
          准备好了吗？
        </h2>
        <p className="text-stone-500 text-lg mb-8 max-w-md mx-auto">
          让我们一起，用东方智慧重新定义你的身体关系。
        </p>
        <Link to="/products" className="btn-primary">
          探索产品
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
