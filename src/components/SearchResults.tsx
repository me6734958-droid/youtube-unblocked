import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, CheckCircle, Video as VideoIcon, Check, Play, Plus, RefreshCw } from 'lucide-react';
import { useYouTube } from '../context/YouTubeContext';
import { VideoCard } from './VideoCard';
import { Video } from '../types/youtube';
import { AddVideoModal } from './Modals/AddVideoModal';

export const SearchResults: React.FC = () => {
  const {
    searchQuery,
    videos,
    channels,
    openChannel,
    playVideo,
    extractYouTubeId,
    searchYouTubeLive
  } = useYouTube();
  const [showFilters, setShowFilters] = useState(false);
  const [durationFilter, setDurationFilter] = useState<'all' | 'short' | 'medium' | 'long'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'views' | 'date'>('relevance');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSearchingLive, setIsSearchingLive] = useState(false);

  const query = searchQuery.toLowerCase().trim();

  // Search live YouTube index directly
  useEffect(() => {
    if (query) {
      setIsSearchingLive(true);
      searchYouTubeLive(query).finally(() => setIsSearchingLive(false));
    }
  }, [query]);

  // Matched channel
  const matchedChannel = channels.find(
    c => c.name.toLowerCase().includes(query) || c.handle.toLowerCase().includes(query)
  );

  // Filter videos
  let results = videos.filter(v => {
    const matchesQuery = 
      v.title.toLowerCase().includes(query) ||
      v.description.toLowerCase().includes(query) ||
      v.channelName.toLowerCase().includes(query) ||
      v.category.toLowerCase().includes(query) ||
      v.tags.some(t => t.toLowerCase().includes(query));

    if (!matchesQuery) return false;

    if (durationFilter === 'short') return v.durationSeconds > 0 && v.durationSeconds <= 240;
    if (durationFilter === 'medium') return v.durationSeconds > 240 && v.durationSeconds <= 1200;
    if (durationFilter === 'long') return v.durationSeconds > 1200;

    return true;
  });

  // Sort videos
  if (sortBy === 'views') {
    results = [...results].sort((a, b) => b.views - a.views);
  } else if (sortBy === 'date') {
    results = [...results].reverse();
  }

  const detectedYouTubeId = extractYouTubeId(searchQuery);
  const isDirectUrlOrId = detectedYouTubeId && (searchQuery.includes('youtube.com') || searchQuery.includes('youtu.be') || /^[a-zA-Z0-9_-]{11}$/.test(searchQuery));

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 space-y-4">
      {/* Top Filter Bar */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <p className="text-xs text-neutral-400">
          About <span className="font-mono tabular-nums text-white">{results.length}</span> results for &quot;<span className="text-white font-medium">{searchQuery}</span>&quot;
        </p>

        <div className="flex items-center gap-2">
          {isSearchingLive && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300">
              <RefreshCw className="w-3 h-3 text-red-500 animate-spin" />
              <span>Searching YouTube...</span>
            </div>
          )}

          <button
            onClick={() => setShowFilters(prev => !prev)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
              showFilters
                ? 'bg-neutral-800 text-white border-neutral-600'
                : 'border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Expandable Filters Drawer */}
      {showFilters && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4 bg-[#1e1e1e] rounded-2xl border border-neutral-800 text-xs animate-in fade-in duration-150">
          <div>
            <h4 className="font-bold text-white uppercase text-[11px] mb-2 tracking-wider">
              Duration
            </h4>
            <div className="space-y-1.5 text-neutral-300">
              <button
                onClick={() => setDurationFilter('all')}
                className={`block hover:text-white text-left ${durationFilter === 'all' ? 'text-red-400 font-bold' : ''}`}
              >
                Any duration
              </button>
              <button
                onClick={() => setDurationFilter('short')}
                className={`block hover:text-white text-left ${durationFilter === 'short' ? 'text-red-400 font-bold' : ''}`}
              >
                Under 4 minutes
              </button>
              <button
                onClick={() => setDurationFilter('medium')}
                className={`block hover:text-white text-left ${durationFilter === 'medium' ? 'text-red-400 font-bold' : ''}`}
              >
                4 – 20 minutes
              </button>
              <button
                onClick={() => setDurationFilter('long')}
                className={`block hover:text-white text-left ${durationFilter === 'long' ? 'text-red-400 font-bold' : ''}`}
              >
                Over 20 minutes
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-[11px] mb-2 tracking-wider">
              Sort By
            </h4>
            <div className="space-y-1.5 text-neutral-300">
              <button
                onClick={() => setSortBy('relevance')}
                className={`block hover:text-white text-left ${sortBy === 'relevance' ? 'text-red-400 font-bold' : ''}`}
              >
                Relevance
              </button>
              <button
                onClick={() => setSortBy('views')}
                className={`block hover:text-white text-left ${sortBy === 'views' ? 'text-red-400 font-bold' : ''}`}
              >
                View count
              </button>
              <button
                onClick={() => setSortBy('date')}
                className={`block hover:text-white text-left ${sortBy === 'date' ? 'text-red-400 font-bold' : ''}`}
              >
                Upload date
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-[11px] mb-2 tracking-wider">
              Features
            </h4>
            <div className="space-y-1.5 text-neutral-400">
              <span className="block">4K Ultra HD</span>
              <span className="block">Subtitles / CC</span>
              <span className="block">Creative Commons</span>
              <span className="block">Live stream</span>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-white uppercase text-[11px] mb-2 tracking-wider">
                Custom Video
              </h4>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Have any YouTube URL or ID? Import and watch immediately.
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-3 flex items-center justify-center gap-1.5 py-2 px-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-xs transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Import URL</span>
            </button>
          </div>
        </div>
      )}

      {/* Direct link match banner */}
      {isDirectUrlOrId && (
        <div 
          onClick={() => playVideo(detectedYouTubeId)}
          className="flex items-center justify-between p-4 bg-gradient-to-r from-red-900/40 via-red-950/20 to-neutral-900 border border-red-800/60 rounded-2xl cursor-pointer hover:border-red-600 transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                Direct YouTube Match Detected
              </h4>
              <p className="text-xs text-neutral-400">
                Click to stream YouTube Video ID <span className="font-mono text-red-400 font-bold">{detectedYouTubeId}</span> directly
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-red-400 flex items-center gap-1">
            Watch Now →
          </span>
        </div>
      )}

      {/* Matched Channel Card if applicable */}
      {matchedChannel && (
        <div 
          onClick={() => openChannel(matchedChannel.id)}
          className="flex items-center justify-between p-4 bg-[#181818] rounded-2xl border border-neutral-800 cursor-pointer hover:bg-neutral-800/60 transition"
        >
          <div className="flex items-center gap-4">
            <img
              src={matchedChannel.avatar}
              alt={matchedChannel.name}
              className="w-16 h-16 rounded-full object-cover shadow"
            />
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                {matchedChannel.name}
                {matchedChannel.verified && <CheckCircle className="w-4 h-4 text-neutral-400 fill-current" />}
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                {matchedChannel.handle} · {matchedChannel.subscribers} subscribers · {matchedChannel.videosCount} videos
              </p>
              <p className="text-xs text-neutral-300 mt-1 line-clamp-1">
                {matchedChannel.description}
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              openChannel(matchedChannel.id);
            }}
            className="px-4 py-2 bg-white text-black font-semibold text-xs rounded-full hover:bg-neutral-200 transition"
          >
            Visit Channel
          </button>
        </div>
      )}

      {/* Video Results List */}
      <div className="space-y-4 pt-2">
        {results.map(video => (
          <VideoCard key={video.id} video={video} layout="row" />
        ))}

        {isSearchingLive && results.length === 0 && (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(n => (
              <div key={n} className="flex flex-col sm:flex-row gap-4 p-2 rounded-2xl animate-pulse">
                <div className="w-full sm:w-80 aspect-video rounded-xl bg-neutral-800" />
                <div className="flex-1 space-y-3 py-2">
                  <div className="h-4 bg-neutral-800 rounded w-4/5" />
                  <div className="h-3 bg-neutral-800 rounded w-1/3" />
                  <div className="flex items-center gap-2 pt-1">
                    <div className="w-6 h-6 rounded-full bg-neutral-800" />
                    <div className="h-3 bg-neutral-800 rounded w-1/4" />
                  </div>
                  <div className="h-3 bg-neutral-800 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isSearchingLive && results.length === 0 && (
          <div className="text-center py-16 bg-[#161616] rounded-2xl border border-neutral-800 p-8 space-y-4">
            <p className="text-base text-neutral-300 font-semibold">
              No videos found matching &quot;{searchQuery}&quot;
            </p>
            <p className="text-xs text-neutral-500 max-w-md mx-auto">
              Try different keywords or paste any valid YouTube video URL / ID to stream it directly.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-full shadow-lg transition"
            >
              Paste &amp; Stream Any YouTube Video
            </button>
          </div>
        )}
      </div>

      <AddVideoModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
};
