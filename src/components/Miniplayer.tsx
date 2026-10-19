import React from 'react';
import { Maximize2, X, Play, Pause } from 'lucide-react';
import { useYouTube } from '../context/YouTubeContext';

export const Miniplayer: React.FC = () => {
  const { miniplayerVideo, setMiniplayerVideo, playVideo } = useYouTube();

  if (!miniplayerVideo) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-72 sm:w-80 bg-[#212121] rounded-2xl shadow-2xl border border-neutral-700/80 overflow-hidden animate-in slide-in-from-bottom duration-200">
      <div className="relative aspect-video bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${miniplayerVideo.youtubeId}?autoplay=1&controls=1&modestbranding=1`}
          title={miniplayerVideo.title}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        <div className="absolute top-2 right-2 flex items-center gap-1">
          <button
            onClick={() => {
              playVideo(miniplayerVideo);
              setMiniplayerVideo(null);
            }}
            title="Expand player"
            className="p-1 rounded-full bg-black/70 hover:bg-black text-white transition"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMiniplayerVideo(null)}
            title="Close miniplayer"
            className="p-1 rounded-full bg-black/70 hover:bg-black text-white transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="p-3">
        <h4 className="text-xs font-semibold text-white line-clamp-1">{miniplayerVideo.title}</h4>
        <p className="text-[11px] text-neutral-400 mt-0.5">{miniplayerVideo.channelName}</p>
      </div>
    </div>
  );
};
