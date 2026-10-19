import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { ShortsIcon } from './icons/ShortsIcon';
import { useYouTube } from '../context/YouTubeContext';
import { CategoryChips } from './CategoryChips';
import { VideoCard } from './VideoCard';

export const HomeFeed: React.FC = () => {
  const { videos, shorts, selectedCategory, setView, setCurrentShortIndex, playVideo, searchYouTubeLive } = useYouTube();

  // Dynamically ensure every category has real videos from YouTube index
  React.useEffect(() => {
    if (selectedCategory !== 'All' && selectedCategory !== 'Watched' && selectedCategory !== 'Recently uploaded') {
      const matchCount = videos.filter(v => v.category.toLowerCase() === selectedCategory.toLowerCase()).length;
      if (matchCount < 6) {
        searchYouTubeLive(selectedCategory.toLowerCase() + ' official');
      }
    }
  }, [selectedCategory]);

  // Filter videos by category
  const filteredVideos = videos.filter(video => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Watched') return false; // Handled in history
    if (selectedCategory === 'Recently uploaded') return true;
    return video.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  // Top 8 videos, then Shorts Shelf, then remaining videos
  const firstBatch = filteredVideos.slice(0, 8);
  const secondBatch = filteredVideos.slice(8);

  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)] bg-[#0f0f0f] pb-16">
      {/* Category Pills Bar */}
      <CategoryChips />

      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-6 space-y-8">
        {/* First Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-4 gap-y-8">
          {firstBatch.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {/* YouTube Shorts Shelf (Iconic feature on YouTube Home) */}
        {selectedCategory === 'All' && shorts.length > 0 && (
          <div className="py-6 border-y border-neutral-800/80 my-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-red-600 flex items-center justify-center text-white">
                  <ShortsIcon className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-white tracking-tight">Shorts</h2>
              </div>
              <button
                onClick={() => setView('shorts')}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Shorts Horizontal Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {shorts.slice(0, 6).map((short, idx) => (
                <div
                  key={short.id}
                  onClick={() => {
                    setCurrentShortIndex(idx);
                    setView('shorts');
                  }}
                  className="group cursor-pointer flex flex-col gap-2"
                >
                  <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-neutral-900 shadow">
                    <img
                      src={short.thumbnailUrl}
                      alt={short.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-3">
                      <p className="text-xs font-semibold text-white line-clamp-2 leading-snug">
                        {short.title}
                      </p>
                      <span className="text-[10px] text-neutral-300 mt-1 font-mono tabular-nums">
                        {short.viewsFormatted} views
                      </span>
                    </div>

                    <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition">
                      <Play className="w-3 h-3 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Second Video Grid */}
        {secondBatch.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-4 gap-y-8">
            {secondBatch.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}

        {/* Empty state if category has no matches */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-20 text-neutral-400 space-y-2">
            <p className="text-base text-neutral-300">No videos found in &quot;{selectedCategory}&quot;</p>
            <p className="text-xs text-neutral-500">Try selecting &quot;All&quot; or searching for a specific topic.</p>
          </div>
        )}
      </div>
    </div>
  );
};
