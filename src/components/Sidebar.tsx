import React from 'react';
import {
  Home,
  Flame,
  Tv,
  History,
  Clock,
  ThumbsUp,
  ListVideo,
  Compass,
  Music2,
  Gamepad2,
  Newspaper,
  Trophy,
  Lightbulb,
  Radio,
  ChevronRight,
  Settings,
  HelpCircle,
  MessageSquareWarning,
  Youtube,
  Headphones,
  Film
} from 'lucide-react';
import { ShortsIcon } from './icons/ShortsIcon';
import { useYouTube } from '../context/YouTubeContext';
import { ViewMode } from '../types/youtube';

export const Sidebar: React.FC = () => {
  const {
    sidebarCollapsed,
    view,
    setView,
    channels,
    subscribedChannelIds,
    openChannel,
    setSelectedCategory,
  } = useYouTube();

  const handleNav = (targetView: ViewMode, category?: string) => {
    if (category) {
      setSelectedCategory(category);
    }
    setView(targetView);
  };

  // Subscribed channels
  const subscribedList = channels.filter(c => subscribedChannelIds.includes(c.id));

  // Collapsed Rail View
  if (sidebarCollapsed) {
    return (
      <aside className="sticky top-14 left-0 w-18 h-[calc(100vh-3.5rem)] bg-[#0f0f0f] flex flex-col items-center py-2 shrink-0 z-30 select-none overflow-y-auto no-scrollbar border-r border-neutral-800/40">
        <button
          onClick={() => handleNav('home', 'All')}
          className={`flex flex-col items-center justify-center w-16 py-3.5 rounded-xl transition ${
            view === 'home' ? 'text-white font-medium bg-neutral-800/60' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/30'
          }`}
        >
          <Home className="w-5 h-5 mb-1.5" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => handleNav('shorts')}
          className={`flex flex-col items-center justify-center w-16 py-3.5 rounded-xl transition ${
            view === 'shorts' ? 'text-white font-medium bg-neutral-800/60' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/30'
          }`}
        >
          <ShortsIcon className="w-5 h-5 mb-1.5 text-red-500" />
          <span className="text-[10px]">Shorts</span>
        </button>

        <button
          onClick={() => handleNav('subscriptions')}
          className={`flex flex-col items-center justify-center w-16 py-3.5 rounded-xl transition ${
            view === 'subscriptions' ? 'text-white font-medium bg-neutral-800/60' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/30'
          }`}
        >
          <Tv className="w-5 h-5 mb-1.5" />
          <span className="text-[10px]">Subs</span>
        </button>

        <button
          onClick={() => handleNav('history')}
          className={`flex flex-col items-center justify-center w-16 py-3.5 rounded-xl transition ${
            view === 'history' || view === 'playlists' ? 'text-white font-medium bg-neutral-800/60' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/30'
          }`}
        >
          <History className="w-5 h-5 mb-1.5" />
          <span className="text-[10px]">You</span>
        </button>
      </aside>
    );
  }

  // Expanded Sidebar View
  return (
    <aside className="sticky top-14 left-0 w-60 h-[calc(100vh-3.5rem)] bg-[#0f0f0f] text-neutral-200 overflow-y-auto px-3 py-2 shrink-0 z-30 select-none border-r border-neutral-800/50">
      {/* Primary Section */}
      <div className="space-y-0.5 pb-3 border-b border-neutral-800">
        <button
          onClick={() => handleNav('home', 'All')}
          className={`flex items-center gap-5 w-full px-3 py-2.5 rounded-xl text-sm transition ${
            view === 'home' ? 'bg-[#272727] text-white font-semibold' : 'hover:bg-neutral-800/60 text-neutral-300 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5 shrink-0" />
          <span>Home</span>
        </button>

        <button
          onClick={() => handleNav('shorts')}
          className={`flex items-center gap-5 w-full px-3 py-2.5 rounded-xl text-sm transition ${
            view === 'shorts' ? 'bg-[#272727] text-white font-semibold' : 'hover:bg-neutral-800/60 text-neutral-300 hover:text-white'
          }`}
        >
          <ShortsIcon className="w-5 h-5 text-red-500 shrink-0" />
          <span>Shorts</span>
        </button>

        <button
          onClick={() => handleNav('subscriptions')}
          className={`flex items-center gap-5 w-full px-3 py-2.5 rounded-xl text-sm transition ${
            view === 'subscriptions' ? 'bg-[#272727] text-white font-semibold' : 'hover:bg-neutral-800/60 text-neutral-300 hover:text-white'
          }`}
        >
          <Tv className="w-5 h-5 shrink-0" />
          <span>Subscriptions</span>
        </button>
      </div>

      {/* You / Library Section */}
      <div className="py-3 border-b border-neutral-800">
        <button
          onClick={() => handleNav('history')}
          className="flex items-center justify-between w-full px-3 py-1.5 text-sm font-semibold text-white hover:text-red-400 group"
        >
          <span className="flex items-center gap-1.5">You <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition" /></span>
        </button>

        <div className="mt-1 space-y-0.5">
          <button
            onClick={() => handleNav('history')}
            className={`flex items-center gap-5 w-full px-3 py-2 rounded-xl text-sm transition ${
              view === 'history' ? 'bg-[#272727] text-white font-semibold' : 'hover:bg-neutral-800/60 text-neutral-300 hover:text-white'
            }`}
          >
            <History className="w-5 h-5 shrink-0 text-neutral-400" />
            <span>History</span>
          </button>

          <button
            onClick={() => handleNav('playlists')}
            className={`flex items-center gap-5 w-full px-3 py-2 rounded-xl text-sm transition ${
              view === 'playlists' ? 'bg-[#272727] text-white font-semibold' : 'hover:bg-neutral-800/60 text-neutral-300 hover:text-white'
            }`}
          >
            <ListVideo className="w-5 h-5 shrink-0 text-neutral-400" />
            <span>Playlists</span>
          </button>

          <button
            onClick={() => handleNav('watchLater')}
            className={`flex items-center gap-5 w-full px-3 py-2 rounded-xl text-sm transition ${
              view === 'watchLater' ? 'bg-[#272727] text-white font-semibold' : 'hover:bg-neutral-800/60 text-neutral-300 hover:text-white'
            }`}
          >
            <Clock className="w-5 h-5 shrink-0 text-neutral-400" />
            <span>Watch Later</span>
          </button>

          <button
            onClick={() => handleNav('liked')}
            className={`flex items-center gap-5 w-full px-3 py-2 rounded-xl text-sm transition ${
              view === 'liked' ? 'bg-[#272727] text-white font-semibold' : 'hover:bg-neutral-800/60 text-neutral-300 hover:text-white'
            }`}
          >
            <ThumbsUp className="w-5 h-5 shrink-0 text-neutral-400" />
            <span>Liked videos</span>
          </button>
        </div>
      </div>

      {/* Subscriptions List */}
      <div className="py-3 border-b border-neutral-800">
        <h4 className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Subscriptions
        </h4>
        <div className="space-y-0.5">
          {subscribedList.map(ch => (
            <button
              key={ch.id}
              onClick={() => openChannel(ch.id)}
              className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm text-neutral-300 hover:bg-neutral-800/60 hover:text-white transition group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={ch.avatar}
                  alt={ch.name}
                  className="w-6 h-6 rounded-full object-cover shrink-0"
                />
                <span className="truncate text-xs">{ch.name}</span>
              </div>
              {ch.id === 'lofigirl' && (
                <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Explore Section */}
      <div className="py-3 border-b border-neutral-800">
        <h4 className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Explore
        </h4>
        <div className="space-y-0.5">
          <button
            onClick={() => handleNav('trending')}
            className={`flex items-center gap-5 w-full px-3 py-2 rounded-xl text-sm transition ${
              view === 'trending' ? 'bg-[#272727] text-white font-semibold' : 'hover:bg-neutral-800/60 text-neutral-300 hover:text-white'
            }`}
          >
            <Flame className="w-5 h-5 text-orange-500 shrink-0" />
            <span>Trending</span>
          </button>

          <button
            onClick={() => handleNav('home', 'Music')}
            className="flex items-center gap-5 w-full px-3 py-2 rounded-xl text-sm hover:bg-neutral-800/60 text-neutral-300 hover:text-white transition"
          >
            <Music2 className="w-5 h-5 text-pink-500 shrink-0" />
            <span>Music</span>
          </button>

          <button
            onClick={() => handleNav('home', 'Gaming')}
            className="flex items-center gap-5 w-full px-3 py-2 rounded-xl text-sm hover:bg-neutral-800/60 text-neutral-300 hover:text-white transition"
          >
            <Gamepad2 className="w-5 h-5 text-indigo-400 shrink-0" />
            <span>Gaming</span>
          </button>

          <button
            onClick={() => handleNav('home', 'News')}
            className="flex items-center gap-5 w-full px-3 py-2 rounded-xl text-sm hover:bg-neutral-800/60 text-neutral-300 hover:text-white transition"
          >
            <Newspaper className="w-5 h-5 text-blue-400 shrink-0" />
            <span>News</span>
          </button>

          <button
            onClick={() => handleNav('home', 'Science')}
            className="flex items-center gap-5 w-full px-3 py-2 rounded-xl text-sm hover:bg-neutral-800/60 text-neutral-300 hover:text-white transition"
          >
            <Lightbulb className="w-5 h-5 text-amber-400 shrink-0" />
            <span>Learning &amp; Science</span>
          </button>
        </div>
      </div>

      {/* More from YouTube */}
      <div className="py-3 border-b border-neutral-800">
        <h4 className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
          More from YouTube
        </h4>
        <div className="space-y-0.5">
          <div className="flex items-center gap-5 px-3 py-2 rounded-xl text-sm text-neutral-300 hover:bg-neutral-800/60 hover:text-white transition cursor-pointer">
            <Youtube className="w-5 h-5 text-red-600 shrink-0" />
            <span>YouTube Premium</span>
          </div>
          <div className="flex items-center gap-5 px-3 py-2 rounded-xl text-sm text-neutral-300 hover:bg-neutral-800/60 hover:text-white transition cursor-pointer">
            <Headphones className="w-5 h-5 text-red-500 shrink-0" />
            <span>YouTube Music</span>
          </div>
        </div>
      </div>

      {/* Settings / Footer info */}
      <div className="py-3 border-b border-neutral-800 space-y-0.5">
        <button
          onClick={() => handleNav('history')}
          className="flex items-center gap-5 w-full px-3 py-2 rounded-xl text-sm text-neutral-300 hover:bg-neutral-800/60 hover:text-white transition"
        >
          <Settings className="w-5 h-5 shrink-0 text-neutral-400" />
          <span>Settings</span>
        </button>

        <button
          onClick={() => handleNav('history')}
          className="flex items-center gap-5 w-full px-3 py-2 rounded-xl text-sm text-neutral-300 hover:bg-neutral-800/60 hover:text-white transition"
        >
          <HelpCircle className="w-5 h-5 shrink-0 text-neutral-400" />
          <span>Help</span>
        </button>
      </div>

      {/* Legal & Copyright */}
      <div className="px-3 pt-4 pb-8 text-[11px] text-neutral-500 space-y-3 leading-relaxed">
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          <span className="hover:text-neutral-400 cursor-pointer">About</span>
          <span className="hover:text-neutral-400 cursor-pointer">Press</span>
          <span className="hover:text-neutral-400 cursor-pointer">Copyright</span>
          <span className="hover:text-neutral-400 cursor-pointer">Contact us</span>
          <span className="hover:text-neutral-400 cursor-pointer">Creators</span>
          <span className="hover:text-neutral-400 cursor-pointer">Advertise</span>
          <span className="hover:text-neutral-400 cursor-pointer">Developers</span>
        </div>
        <p>© 2026 YouTube LLC</p>
      </div>
    </aside>
  );
};
