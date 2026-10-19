import React, { useState } from 'react';
import { Flame, Music2, Gamepad2, Film } from 'lucide-react';
import { useYouTube } from '../context/YouTubeContext';
import { VideoCard } from './VideoCard';

export const TrendingPage: React.FC = () => {
  const { videos } = useYouTube();
  const [tab, setTab] = useState<'now' | 'music' | 'gaming' | 'films'>('now');

  let filtered = [...videos];
  if (tab === 'music') {
    filtered = videos.filter(v => v.category === 'Music');
  } else if (tab === 'gaming') {
    filtered = videos.filter(v => v.category === 'Gaming');
  } else if (tab === 'films') {
    filtered = videos.filter(v => v.category === 'Entertainment');
  }

  // Sort by highest views for trending
  filtered.sort((a, b) => b.views - a.views);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 pb-4 border-b border-neutral-800">
        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-orange-600 to-red-600 flex items-center justify-center text-white shadow-xl">
          <Flame className="w-8 h-8 fill-current" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Trending</h1>
          <p className="text-xs text-neutral-400">See what the world is watching right now</p>
        </div>
      </div>

      {/* Trending Categories */}
      <div className="flex border-b border-neutral-800 gap-8 text-xs font-semibold">
        <button
          onClick={() => setTab('now')}
          className={`pb-3 uppercase tracking-wider transition ${
            tab === 'now' ? 'text-white border-b-2 border-white' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Now
        </button>
        <button
          onClick={() => setTab('music')}
          className={`pb-3 uppercase tracking-wider flex items-center gap-1.5 transition ${
            tab === 'music' ? 'text-white border-b-2 border-white' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Music2 className="w-3.5 h-3.5" />
          Music
        </button>
        <button
          onClick={() => setTab('gaming')}
          className={`pb-3 uppercase tracking-wider flex items-center gap-1.5 transition ${
            tab === 'gaming' ? 'text-white border-b-2 border-white' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Gamepad2 className="w-3.5 h-3.5" />
          Gaming
        </button>
        <button
          onClick={() => setTab('films')}
          className={`pb-3 uppercase tracking-wider flex items-center gap-1.5 transition ${
            tab === 'films' ? 'text-white border-b-2 border-white' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Film className="w-3.5 h-3.5" />
          Films
        </button>
      </div>

      {/* Trending Ranked List */}
      <div className="space-y-4 pt-2">
        {filtered.map((video, idx) => (
          <div key={video.id} className="flex items-center gap-4 group">
            <span className="text-lg font-bold font-mono text-neutral-500 w-6 text-center tabular-nums group-hover:text-red-500 transition">
              {idx + 1}
            </span>
            <div className="flex-1">
              <VideoCard video={video} layout="row" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
