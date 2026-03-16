import { Link } from 'react-router-dom';
import { Play, ArrowUpRight, TrendingUp, Eye } from 'lucide-react';
import { brandCopy, videos } from '../data/copy';

export default function VideosPage() {
  const featured = videos[0];
  const rest = videos.slice(1);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-ink-950 pt-24 pb-14">
        <div className="container-base text-center">
          <p className="section-label text-ink-400 mb-4">能量视频</p>
          <div className="divider mx-auto mb-6" />
          <h1 className="display-md text-white mb-4">{brandCopy.videoSection.title}</h1>
          <p className="text-ink-400 max-w-lg mx-auto text-[15px]">{brandCopy.videoSection.subtitle}</p>
        </div>
      </div>

      <div className="container-base py-12">
        {/* Featured video */}
        <div className="mb-10">
          <p className="text-[12px] font-semibold tracking-widest uppercase text-ink-400 mb-5">精选视频</p>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
            <div className="lg:col-span-3 group cursor-pointer relative rounded-2xl overflow-hidden bg-ink-100">
              <div className="aspect-video">
                <img src={featured.thumbnail} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-500 transition-all duration-300">
                  <Play className="w-6 h-6 text-white fill-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="badge bg-brand-500 text-white text-[10px] mb-3">精选</span>
                <p className="text-white text-lg font-semibold leading-snug mb-2">{featured.title}</p>
                <div className="flex items-center gap-3 text-white/50 text-xs">
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{featured.views}</span>
                  <span>{featured.duration}</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-3">
              {rest.slice(0,3).map((v) => (
                <div key={v.id} className="group cursor-pointer flex gap-4 p-3 rounded-xl hover:bg-ink-50 transition-colors">
                  <div className="relative w-28 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                    <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-ink-950/30 flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center">
                        <Play className="w-3 h-3 text-ink-900 fill-ink-900 ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 py-1">
                    <p className="text-ink-900 font-medium text-[13px] leading-snug clamp-2 mb-2">{v.title}</p>
                    <div className="flex items-center gap-2 text-ink-400 text-[11px]">
                      <span>{v.duration}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{v.views}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* All videos */}
        <div>
          <p className="text-[12px] font-semibold tracking-widest uppercase text-ink-400 mb-5">全部视频</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.map((v) => (
              <div key={v.id} className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-video overflow-hidden">
                  <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-ink-950/20 group-hover:bg-ink-950/40 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-75 transition-all duration-300">
                      <Play className="w-5 h-5 text-ink-900 fill-ink-900 ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 badge-dark text-[10px]">
                    TikTok
                  </div>
                  <div className="absolute bottom-3 right-3 bg-ink-950/70 text-white text-[11px] px-2 py-0.5 rounded-full font-medium">
                    {v.duration}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-ink-900 font-semibold text-[14px] leading-snug clamp-2 mb-2">{v.title}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-ink-400 text-[12px]">
                      <TrendingUp className="w-3 h-3" />
                      {v.views} 播放
                    </span>
                    <span className={`badge text-[10px] ${v.category === 'bian' ? 'badge-dark' : v.category === 'agarwood' ? 'badge-forest' : 'badge-gold'}`}>
                      {v.category === 'bian' ? '砭石' : v.category === 'agarwood' ? '沉香' : '品牌'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TikTok Follow Banner */}
        <div className="mt-10 p-8 rounded-2xl bg-ink-950 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 via-red-500 to-yellow-400 flex items-center justify-center text-white font-black text-2xl shadow-glow-brand">
              T
            </div>
            <div>
              <p className="text-white font-semibold text-[16px]">{brandCopy.videoSection.tiktokBanner}</p>
              <p className="text-ink-400 text-sm mt-1">每周更新 · 能量日常记录</p>
            </div>
          </div>
          <a href="#" className="btn-primary-gold whitespace-nowrap">
            立即关注
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
