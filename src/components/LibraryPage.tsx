import React from 'react';
import {
  History as HistoryIcon,
  Clock,
  ThumbsUp,
  ListVideo,
  Trash2,
  Play,
  Share2,
  Lock,
  Globe,
  Plus
} from 'lucide-react';
import { useYouTube } from '../context/YouTubeContext';
import { VideoCard } from './VideoCard';
import { ViewMode } from '../types/youtube';

interface LibraryPageProps {
  mode: 'history' | 'liked' | 'watchLater' | 'playlists';
}

export const LibraryPage: React.FC<LibraryPageProps> = ({ mode }) => {
  const {
    videos,
    history,
    likedVideoIds,
    watchLaterIds,
    playlists,
    clearHistory,
    removeHistoryItem,
    playVideo,
    createPlaylist,
  } = useYouTube();

  // Mode: Watch History
  if (mode === 'history') {
    const historyVideos = history
      .map(h => ({
        video: videos.find(v => v.id === h.videoId),
        progress: h.progressPercent
      }))
      .filter((item): item is { video: typeof videos[0]; progress: number } => Boolean(item.video));

    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-between pb-4 border-b border-neutral-800 gap-4">
          <div className="flex items-center gap-3">
            <HistoryIcon className="w-6 h-6 text-red-500" />
            <h1 className="text-xl font-bold text-white">Watch history</h1>
          </div>

          {historyVideos.length > 0 && (
            <button
              onClick={clearHistory}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-700 hover:bg-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear all watch history</span>
            </button>
          )}
        </div>

        {historyVideos.length === 0 ? (
          <div className="text-center py-16 text-neutral-400">
            <HistoryIcon className="w-12 h-12 mx-auto text-neutral-600 mb-3" />
            <p className="text-base font-semibold text-neutral-300">Your watch history is empty</p>
            <p className="text-xs text-neutral-500 mt-1">Videos you watch will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4 mt-6">
            {historyVideos.map(({ video, progress }) => (
              <div key={video.id} className="relative group">
                <VideoCard video={video} layout="row" />
                <button
                  onClick={() => removeHistoryItem(video.id)}
                  title="Remove from watch history"
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white transition opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Mode: Liked Videos
  if (mode === 'liked') {
    const likedVideos = videos.filter(v => likedVideoIds.includes(v.id));

    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left hero banner */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-gradient-to-b from-blue-900/40 to-neutral-900 border border-neutral-800 flex flex-col justify-between">
          <div>
            <div className="w-full aspect-video rounded-xl overflow-hidden bg-neutral-900 mb-4 shadow-lg">
              {likedVideos[0] ? (
                <img
                  src={likedVideos[0].thumbnailUrl}
                  alt="Liked playlist"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ThumbsUp className="w-10 h-10 text-neutral-600" />
                </div>
              )}
            </div>

            <h1 className="text-xl font-bold text-white mb-2">Liked videos</h1>
            <p className="text-xs text-neutral-300">User Profile · {likedVideos.length} videos</p>
          </div>

          {likedVideos.length > 0 && (
            <button
              onClick={() => playVideo(likedVideos[0])}
              className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 bg-white hover:bg-neutral-200 text-black font-semibold text-xs rounded-full transition shadow"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Play all</span>
            </button>
          )}
        </div>

        {/* Right videos list */}
        <div className="lg:col-span-8 space-y-4">
          {likedVideos.length === 0 ? (
            <div className="text-center py-16 text-neutral-400">
              <p className="text-sm">No liked videos yet.</p>
            </div>
          ) : (
            likedVideos.map((video, idx) => (
              <div key={video.id} className="flex items-center gap-3">
                <span className="text-xs font-mono text-neutral-500 w-4">{idx + 1}</span>
                <div className="flex-1">
                  <VideoCard video={video} layout="row" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // Mode: Watch Later
  if (mode === 'watchLater') {
    const watchLaterVideos = videos.filter(v => watchLaterIds.includes(v.id));

    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 p-6 rounded-2xl bg-gradient-to-b from-teal-900/40 to-neutral-900 border border-neutral-800 flex flex-col justify-between">
          <div>
            <div className="w-full aspect-video rounded-xl overflow-hidden bg-neutral-900 mb-4 shadow-lg">
              {watchLaterVideos[0] ? (
                <img
                  src={watchLaterVideos[0].thumbnailUrl}
                  alt="Watch later playlist"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Clock className="w-10 h-10 text-neutral-600" />
                </div>
              )}
            </div>

            <h1 className="text-xl font-bold text-white mb-2">Watch Later</h1>
            <p className="text-xs text-neutral-300">Private · {watchLaterVideos.length} videos</p>
          </div>

          {watchLaterVideos.length > 0 && (
            <button
              onClick={() => playVideo(watchLaterVideos[0])}
              className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 bg-white hover:bg-neutral-200 text-black font-semibold text-xs rounded-full transition shadow"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Play all</span>
            </button>
          )}
        </div>

        <div className="lg:col-span-8 space-y-4">
          {watchLaterVideos.length === 0 ? (
            <div className="text-center py-16 text-neutral-400">
              <p className="text-sm">No videos saved for later.</p>
            </div>
          ) : (
            watchLaterVideos.map((video, idx) => (
              <div key={video.id} className="flex items-center gap-3">
                <span className="text-xs font-mono text-neutral-500 w-4">{idx + 1}</span>
                <div className="flex-1">
                  <VideoCard video={video} layout="row" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // Mode: Playlists
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <ListVideo className="w-6 h-6 text-red-500" />
          <h1 className="text-xl font-bold text-white">Playlists</h1>
        </div>

        <button
          onClick={() => {
            const title = prompt('Enter new playlist name:');
            if (title && title.trim()) {
              createPlaylist(title.trim());
            }
          }}
          className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-full transition"
        >
          <Plus className="w-4 h-4" />
          <span>New playlist</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {playlists.map(pl => {
          const firstVid = videos.find(v => pl.videoIds.includes(v.id));
          return (
            <div
              key={pl.id}
              onClick={() => {
                if (firstVid) playVideo(firstVid);
              }}
              className="group cursor-pointer flex flex-col gap-2.5"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-800 shadow">
                <img
                  src={pl.thumbnailUrl || (firstVid ? firstVid.thumbnailUrl : '')}
                  alt={pl.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute right-0 inset-y-0 w-2/5 bg-black/70 backdrop-blur-xs flex flex-col items-center justify-center text-white">
                  <ListVideo className="w-6 h-6 mb-1" />
                  <span className="text-xs font-mono font-bold tabular-nums">{pl.itemCount}</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white group-hover:text-red-400 transition truncate">
                  {pl.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
                  <span>{pl.isPrivate ? 'Private' : 'Public'}</span>
                  <span>•</span>
                  <span>Updated {pl.updatedAt}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
