import React, { useEffect } from 'react';
import { YouTubeProvider, useYouTube } from './context/YouTubeContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HomeFeed } from './components/HomeFeed';
import { WatchPage } from './components/WatchPage';
import { ShortsPage } from './components/ShortsPage';
import { SubscriptionsFeed } from './components/SubscriptionsFeed';
import { TrendingPage } from './components/TrendingPage';
import { SearchResults } from './components/SearchResults';
import { LibraryPage } from './components/LibraryPage';
import { ChannelPage } from './components/ChannelPage';
import { Miniplayer } from './components/Miniplayer';

const YouTubeApp: React.FC = () => {
  const { view, playVideo, setSearchQuery, setView, openChannel, theaterMode } = useYouTube();

  // Check URL query params on initial mount (?v=ID, ?q=query, ?channel=id)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const v = params.get('v');
      const q = params.get('q') || params.get('search_query');
      const ch = params.get('channel');

      if (v) {
        playVideo(v);
      } else if (q) {
        setSearchQuery(q);
        setView('search');
      } else if (ch) {
        openChannel(ch);
      }
    } catch (e) {
      console.warn(e);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-neutral-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header />

      {/* Main Container */}
      <div className="flex-1 flex w-full">
        {/* Left Sidebar (hidden in shorts and in theater mode) */}
        {view !== 'shorts' && !(view === 'watch' && theaterMode) && <Sidebar />}

        {/* Content Area */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          {view === 'home' && <HomeFeed />}
          {view === 'watch' && <WatchPage />}
          {view === 'shorts' && <ShortsPage />}
          {view === 'subscriptions' && <SubscriptionsFeed />}
          {view === 'trending' && <TrendingPage />}
          {view === 'search' && <SearchResults />}
          {view === 'history' && <LibraryPage mode="history" />}
          {view === 'liked' && <LibraryPage mode="liked" />}
          {view === 'watchLater' && <LibraryPage mode="watchLater" />}
          {view === 'playlists' && <LibraryPage mode="playlists" />}
          {view === 'channel' && <ChannelPage />}
        </main>
      </div>

      {/* Floating Picture-in-Picture Miniplayer */}
      <Miniplayer />
    </div>
  );
};

export default function App() {
  return (
    <YouTubeProvider>
      <YouTubeApp />
    </YouTubeProvider>
  );
}
