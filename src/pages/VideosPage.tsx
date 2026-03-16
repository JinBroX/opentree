import { useState } from 'react';
import { Play, Filter } from 'lucide-react';
import { videos, brandCopy } from '../data/copy';

type Category = 'all' | 'bian' | 'agarwood' | 'brand';

export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const filtered = videos.filter(
    (v) => activeCategory === 'all' || v.category === activeCategory
  );

  const categories = [
    { key: 'all' as Category, label: '全部' },
    { key: 'brand' as Category, label: '品牌故事' },
    { key: 'bian' as Category, label: '砭石系列' },
    { key: 'agarwood' as Category, label: '沉香系列' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-stone-900 to-stone-800 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            能量视频中心
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            {brandCopy.videoSection.title}
          </h1>
          <p className="text-white/70 max-w-xl mx-auto text-lg">
            {brandCopy.videoSection.subtitle}
          </p>
        </div>
      </div>

      {/* TikTok Banner */}
      <div className="bg-gradient-to-r from-pink-600 to-cyan-600 py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-bold text-stone-900 text-sm">
            T
          </div>
          <p className="text-white font-medium text-sm">
            {brandCopy.videoSection.tiktokBanner}
          </p>
          <a
            href="#"
            className="bg-white text-stone-900 text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-stone-100 transition-colors"
          >
            立即关注
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filter */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <Filter className="w-4 h-4 text-stone-400" />
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.key
                  ? 'bg-stone-800 text-white'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured Video */}
        {activeCategory === 'all' && (
          <div className="mb-10 relative rounded-3xl overflow-hidden bg-stone-900 group cursor-pointer"
            onClick={() => setPlayingId(videos[2].id)}
          >
            <div className="aspect-video sm:aspect-[21/7]">
              <img
                src={videos[2].thumbnail}
                alt={videos[2].title}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-60 transition-opacity"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
              <div className="p-8 sm:p-12 max-w-xl">
                <span className="text-amber-300 text-xs font-semibold tracking-widest uppercase mb-3 block">
                  精选推荐
                </span>
                <h2 className="font-display text-2xl sm:text-3xl text-white font-bold mb-4">
                  {videos[2].title}
                </h2>
                <div className="flex items-center gap-4 text-white/60 text-sm mb-6">
                  <span>{videos[2].duration}</span>
                  <span>{videos[2].views} 次播放</span>
                </div>
                <button className="flex items-center gap-3 bg-white text-stone-900 font-semibold px-6 py-3 rounded-full hover:bg-amber-50 transition-colors">
                  <Play className="w-4 h-4 fill-current" />
                  立即观看
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((video) => (
            <div
              key={video.id}
              className="group relative rounded-2xl overflow-hidden bg-stone-100 cursor-pointer"
              onClick={() => setPlayingId(video.id)}
            >
              <div className="aspect-video">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 border-white/50 transition-all duration-300 group-hover:scale-110 ${
                  playingId === video.id ? 'bg-earth-500 border-earth-400' : 'bg-white/20 backdrop-blur-sm'
                }`}>
                  <div className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[14px] border-transparent border-l-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-amber-300 text-xs font-medium uppercase tracking-wide block mb-1">
                  {video.category === 'brand' ? '品牌' : video.category === 'bian' ? '砭石' : '沉香'}
                </span>
                <p className="text-white font-semibold text-sm line-clamp-2 mb-2">
                  {video.title}
                </p>
                <div className="flex items-center gap-3 text-white/50 text-xs">
                  <span>▶ {video.duration}</span>
                  <span>{video.views}</span>
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium">
                  TikTok
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder for embedding */}
        {playingId && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setPlayingId(null)}
          >
            <div className="bg-stone-900 rounded-3xl p-8 max-w-lg w-full text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                T
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                {videos.find(v => v.id === playingId)?.title}
              </h3>
              <p className="text-stone-400 text-sm mb-6">
                请前往 TikTok @opentree.energy 观看完整视频
              </p>
              <div className="flex gap-3 justify-center">
                <a href="#" className="bg-white text-stone-900 font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-stone-100 transition-colors">
                  前往 TikTok
                </a>
                <button
                  onClick={() => setPlayingId(null)}
                  className="border border-stone-600 text-stone-400 font-medium px-5 py-2.5 rounded-full text-sm hover:border-stone-400 hover:text-white transition-colors"
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
