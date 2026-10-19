import React, { useState, useRef, useEffect } from 'react';
import {
  MoreVertical,
  Clock,
  ListPlus,
  Share2,
  CheckCircle,
  EyeOff,
  Radio,
  Play
} from 'lucide-react';
import { Video } from '../types/youtube';
import { useYouTube } from '../context/YouTubeContext';
import { ShareModal } from './Modals/ShareModal';
import { SavePlaylistModal } from './Modals/SavePlaylistModal';

interface VideoCardProps {
  video: Video;
  layout?: 'grid' | 'row';
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, layout = 'grid' }) => {
  const { playVideo, openChannel, toggleWatchLater, watchLaterIds, getProxiedImageUrl } = useYouTube();
  const [showMenu, setShowMenu] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [imgError, setImgError] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isSavedWatchLater = watchLaterIds.includes(video.id);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const rawThumbnailSrc = imgError
    ? `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`
    : video.thumbnailUrl || `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;
  const thumbnailSrc = getProxiedImageUrl ? getProxiedImageUrl(rawThumbnailSrc) : rawThumbnailSrc;
  const channelAvatarSrc = getProxiedImageUrl ? getProxiedImageUrl(video.channelAvatar) : video.channelAvatar;

  if (layout === 'row') {
    return (
      <>
        <div className="flex gap-4 group cursor-pointer w-full">
          {/* Thumbnail */}
          <div 
            onClick={() => playVideo(video)}
            className="relative w-40 sm:w-48 aspect-video rounded-xl overflow-hidden bg-neutral-900 shrink-0"
          >
            <img
              src={thumbnailSrc}
              alt={video.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            {video.duration === 'LIVE' ? (
              <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold flex items-center gap-1">
                <Radio className="w-3 h-3 animate-pulse" /> LIVE
              </span>
            ) : (
              <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono font-medium tabular-nums">
                {video.duration}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
            <div>
              <h3 
                onClick={() => playVideo(video)}
                className="text-xs sm:text-sm font-medium text-white line-clamp-2 leading-snug hover:text-red-400 transition"
              >
                {video.title}
              </h3>
              <p 
                onClick={(e) => {
                  e.stopPropagation();
                  openChannel(video.channelId);
                }}
                className="text-[11px] text-neutral-400 hover:text-white transition mt-1 flex items-center gap-1"
              >
                {video.channelName}
                {video.verified && <CheckCircle className="w-3 h-3 text-neutral-400 fill-current" />}
              </p>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                {video.viewsFormatted} views · {video.uploadedAt}
              </p>
            </div>
          </div>
        </div>

        <ShareModal video={video} isOpen={showShareModal} onClose={() => setShowShareModal(false)} />
        <SavePlaylistModal video={video} isOpen={showPlaylistModal} onClose={() => setShowPlaylistModal(false)} />
      </>
    );
  }

  // Grid layout (Standard Home card)
  return (
    <>
      <div className="flex flex-col gap-3 group">
        {/* Thumbnail Container */}
        <div 
          onClick={() => playVideo(video)}
          className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900 cursor-pointer shadow-sm group-hover:rounded-none group-hover:shadow-md transition-all duration-200"
        >
          <img
            src={thumbnailSrc}
            alt={video.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Hover Play Icon Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <div className="w-12 h-12 rounded-full bg-black/70 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
              <Play className="w-6 h-6 fill-current ml-0.5 text-white" />
            </div>
          </div>

          {/* Quick Action Buttons on Hover (Top Right) */}
          <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWatchLater(video.id);
              }}
              title={isSavedWatchLater ? 'Remove from Watch Later' : 'Watch Later'}
              className="p-1.5 rounded bg-black/80 hover:bg-black text-white text-xs shadow transition"
            >
              <Clock className={`w-4 h-4 ${isSavedWatchLater ? 'text-red-500' : ''}`} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowPlaylistModal(true);
              }}
              title="Add to playlist"
              className="p-1.5 rounded bg-black/80 hover:bg-black text-white text-xs shadow transition"
            >
              <ListPlus className="w-4 h-4" />
            </button>
          </div>

          {/* Duration Badge */}
          {video.duration === 'LIVE' ? (
            <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-red-600 text-white text-xs font-bold flex items-center gap-1 shadow">
              <Radio className="w-3 h-3 animate-pulse" /> LIVE
            </span>
          ) : (
            <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/85 text-white text-xs font-mono font-medium tabular-nums shadow">
              {video.duration}
            </span>
          )}
        </div>

        {/* Video Metadata */}
        <div className="flex gap-3 px-0.5">
          {/* Channel Avatar */}
          <button
            onClick={() => openChannel(video.channelId)}
            className="w-9 h-9 rounded-full overflow-hidden shrink-0 mt-0.5 hover:opacity-85 transition"
          >
            <img
              src={channelAvatarSrc}
              alt={video.channelName}
              className="w-full h-full object-cover"
            />
          </button>

          {/* Title and details */}
          <div className="flex-1 min-w-0">
            <h3
              onClick={() => playVideo(video)}
              title={video.title}
              className="text-sm font-semibold text-white line-clamp-2 leading-snug cursor-pointer hover:text-red-400 transition"
            >
              {video.title}
            </h3>

            <div
              onClick={() => openChannel(video.channelId)}
              className="text-xs text-neutral-400 hover:text-white transition mt-1.5 flex items-center gap-1 cursor-pointer"
            >
              <span className="truncate">{video.channelName}</span>
              {video.verified && <CheckCircle className="w-3 h-3 text-neutral-400 fill-current shrink-0" />}
            </div>

            <div className="text-xs text-neutral-400 mt-0.5 flex items-center gap-1">
              <span>{video.viewsFormatted} views</span>
              <span>•</span>
              <span>{video.uploadedAt}</span>
            </div>
          </div>

          {/* Context 3-Dots Menu */}
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setShowMenu(prev => !prev)}
              className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 opacity-0 group-hover:opacity-100 transition"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMenu && (
              <div className="absolute right-0 bottom-8 w-48 bg-[#282828] rounded-xl shadow-2xl border border-neutral-700/70 py-1.5 z-30 animate-in fade-in duration-100">
                <button
                  onClick={() => {
                    toggleWatchLater(video.id);
                    setShowMenu(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-xs text-neutral-200 hover:bg-neutral-700/60 text-left transition"
                >
                  <Clock className="w-4 h-4 text-neutral-400" />
                  <span>{isSavedWatchLater ? 'Remove from Watch Later' : 'Save to Watch Later'}</span>
                </button>

                <button
                  onClick={() => {
                    setShowMenu(false);
                    setShowPlaylistModal(true);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-xs text-neutral-200 hover:bg-neutral-700/60 text-left transition"
                >
                  <ListPlus className="w-4 h-4 text-neutral-400" />
                  <span>Save to playlist</span>
                </button>

                <button
                  onClick={() => {
                    setShowMenu(false);
                    setShowShareModal(true);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-xs text-neutral-200 hover:bg-neutral-700/60 text-left transition"
                >
                  <Share2 className="w-4 h-4 text-neutral-400" />
                  <span>Share</span>
                </button>

                <button
                  onClick={() => setShowMenu(false)}
                  className="flex items-center gap-3 w-full px-4 py-2 text-xs text-neutral-200 hover:bg-neutral-700/60 text-left transition"
                >
                  <EyeOff className="w-4 h-4 text-neutral-400" />
                  <span>Not interested</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ShareModal video={video} isOpen={showShareModal} onClose={() => setShowShareModal(false)} />
      <SavePlaylistModal video={video} isOpen={showPlaylistModal} onClose={() => setShowPlaylistModal(false)} />
    </>
  );
};
