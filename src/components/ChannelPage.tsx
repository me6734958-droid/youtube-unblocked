import React, { useState, useRef, useEffect } from 'react';
import {
  CheckCircle,
  Bell,
  Share2,
  Search,
  ChevronRight,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Play,
  Film,
  Radio,
  Flame,
  Globe,
  X,
  ListPlus,
  Check,
  UserCheck
} from 'lucide-react';
import { useYouTube } from '../context/YouTubeContext';
import { VideoCard } from './VideoCard';
import { ShareModal } from './Modals/ShareModal';
import { Video } from '../types/youtube';

export const ChannelPage: React.FC = () => {
  const {
    activeChannel,
    videos,
    shorts,
    subscribedChannelIds,
    toggleSubscribe,
    playVideo,
  } = useYouTube();

  const [activeTab, setActiveTab] = useState<'home' | 'videos' | 'shorts' | 'live' | 'playlists' | 'community' | 'about'>('home');
  const [videoSort, setVideoSort] = useState<'latest' | 'popular' | 'oldest'>('latest');
  const [inChannelSearch, setInChannelSearch] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showBellDropdown, setShowBellDropdown] = useState(false);
  const [bellSetting, setBellSetting] = useState<'all' | 'personalized' | 'none'>('all');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Community poll state
  const [pollVotedIndex, setPollVotedIndex] = useState<number | null>(null);
  const [communityLikes, setCommunityLikes] = useState<{ [key: string]: number }>({
    'post-1': 14200,
    'post-2': 38900
  });
  const [communityUserLiked, setCommunityUserLiked] = useState<{ [key: string]: boolean }>({});

  const bellDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (bellDropdownRef.current && !bellDropdownRef.current.contains(e.target as Node)) {
        setShowBellDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!activeChannel) return null;

  const isSubscribed = subscribedChannelIds.includes(activeChannel.id);
  
  // Videos from this channel
  let channelVideos = videos.filter(
    v =>
      v.channelId === activeChannel.id ||
      v.channelName.toLowerCase() === activeChannel.name.toLowerCase()
  );

  // If no videos yet for this newly discovered channel, provide sample relevant videos
  if (channelVideos.length === 0) {
    channelVideos = videos.slice(0, 6).map((v, i) => ({
      ...v,
      id: `${activeChannel.id}-vid-${i}`,
      channelName: activeChannel.name,
      channelId: activeChannel.id,
      channelAvatar: activeChannel.avatar,
    }));
  }

  // Channel shorts
  let channelShorts = shorts.filter(
    s =>
      s.channelId === activeChannel.id ||
      s.channelName.toLowerCase() === activeChannel.name.toLowerCase()
  );

  if (channelShorts.length === 0) {
    channelShorts = shorts.slice(0, 4).map((s, i) => ({
      ...s,
      id: `${activeChannel.id}-short-${i}`,
      channelName: activeChannel.name,
      channelId: activeChannel.id,
      channelAvatar: activeChannel.avatar,
    }));
  }

  // Filter videos by in-channel search
  const filteredVideos = channelVideos.filter(v =>
    !inChannelSearch.trim() ||
    v.title.toLowerCase().includes(inChannelSearch.toLowerCase()) ||
    v.description.toLowerCase().includes(inChannelSearch.toLowerCase())
  );

  // Sort videos
  const sortedVideos = [...filteredVideos].sort((a, b) => {
    if (videoSort === 'popular') return b.views - a.views;
    if (videoSort === 'oldest') return a.durationSeconds - b.durationSeconds;
    return 0; // latest default
  });

  // Featured video (trailer)
  const featuredVideo =
    channelVideos.find(v => v.youtubeId === activeChannel.featuredVideoId) ||
    channelVideos[0];

  const handleVotePoll = (idx: number) => {
    if (pollVotedIndex === null) {
      setPollVotedIndex(idx);
    }
  };

  const handleToggleCommunityLike = (postId: string) => {
    setCommunityUserLiked(prev => {
      const isLiked = prev[postId];
      setCommunityLikes(likes => ({
        ...likes,
        [postId]: isLiked ? likes[postId] - 1 : likes[postId] + 1
      }));
      return { ...prev, [postId]: !isLiked };
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#0f0f0f] text-neutral-200 pb-20 select-none">
      {/* Banner */}
      <div className="w-full h-36 sm:h-52 md:h-64 lg:h-72 overflow-hidden relative bg-neutral-900">
        <img
          src={activeChannel.banner}
          alt={activeChannel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-black/20" />

        {/* Channel Links Badge on Banner */}
        <div className="absolute bottom-3 right-4 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs text-white">
          <Globe className="w-3.5 h-3.5 text-neutral-400" />
          <span className="font-medium hover:underline cursor-pointer">Official Website</span>
          <span className="text-neutral-500">•</span>
          <span className="font-medium hover:underline cursor-pointer">Socials</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Channel Header Info */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-5 border-b border-neutral-800/80">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 w-full">
            <div className="relative group">
              <img
                src={activeChannel.avatar}
                alt={activeChannel.name}
                className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover shadow-2xl border-4 border-[#0f0f0f] -mt-10 sm:-mt-16 shrink-0 bg-neutral-800"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                <span>{activeChannel.name}</span>
                {activeChannel.verified && (
                  <CheckCircle className="w-5 h-5 text-neutral-400 fill-current shrink-0" />
                )}
              </h1>

              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-neutral-400 mt-1">
                <span className="font-semibold text-white">{activeChannel.handle}</span>
                <span>•</span>
                <span>{activeChannel.subscribers} subscribers</span>
                <span>•</span>
                <span>{activeChannel.videosCount || channelVideos.length} videos</span>
              </div>

              {/* Bio & Details link */}
              <div
                onClick={() => setShowAboutModal(true)}
                className="mt-2 text-xs text-neutral-400 max-w-2xl cursor-pointer hover:text-neutral-200 group flex items-center gap-1"
              >
                <p className="line-clamp-1 text-neutral-300">
                  {activeChannel.description}
                </p>
                <span className="font-semibold text-white underline shrink-0 flex items-center">
                  ...more <ChevronRight className="w-3.5 h-3.5 inline group-hover:translate-x-0.5 transition" />
                </span>
              </div>
            </div>

            {/* Action Buttons: Subscribe & Join & Share */}
            <div className="flex items-center gap-2.5 shrink-0 pt-2 sm:pt-0">
              {/* Join Button (Membership) */}
              <button
                onClick={() => setShowJoinModal(true)}
                className="px-4 py-2 rounded-full text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-white transition border border-neutral-700/60"
              >
                Join
              </button>

              {/* Subscribe Button with Bell */}
              <div className="relative" ref={bellDropdownRef}>
                <button
                  onClick={() => {
                    if (isSubscribed) {
                      setShowBellDropdown(prev => !prev);
                    } else {
                      toggleSubscribe(activeChannel.id);
                    }
                  }}
                  className={`px-5 py-2 rounded-full text-xs font-semibold transition flex items-center gap-2 shadow cursor-pointer ${
                    isSubscribed
                      ? 'bg-neutral-800 text-white hover:bg-neutral-700 border border-neutral-700'
                      : 'bg-white text-black hover:bg-neutral-200'
                  }`}
                >
                  {isSubscribed ? (
                    <>
                      <Bell className="w-4 h-4 fill-current text-white" />
                      <span>Subscribed</span>
                    </>
                  ) : (
                    <span>Subscribe</span>
                  )}
                </button>

                {/* Bell Dropdown */}
                {isSubscribed && showBellDropdown && (
                  <div className="absolute right-0 top-11 w-52 bg-[#212121] border border-neutral-700/80 rounded-2xl shadow-2xl py-2 z-50 text-xs animate-in fade-in duration-150">
                    <button
                      onClick={() => {
                        setBellSetting('all');
                        setShowBellDropdown(false);
                      }}
                      className="flex items-center justify-between w-full px-4 py-2.5 hover:bg-neutral-800 text-neutral-200 hover:text-white"
                    >
                      <span className="flex items-center gap-2">
                        <Bell className="w-4 h-4" /> All notifications
                      </span>
                      {bellSetting === 'all' && <Check className="w-4 h-4 text-blue-400" />}
                    </button>
                    <button
                      onClick={() => {
                        setBellSetting('personalized');
                        setShowBellDropdown(false);
                      }}
                      className="flex items-center justify-between w-full px-4 py-2.5 hover:bg-neutral-800 text-neutral-200 hover:text-white"
                    >
                      <span className="flex items-center gap-2">
                        <Bell className="w-4 h-4 opacity-60" /> Personalized
                      </span>
                      {bellSetting === 'personalized' && <Check className="w-4 h-4 text-blue-400" />}
                    </button>
                    <button
                      onClick={() => {
                        setBellSetting('none');
                        setShowBellDropdown(false);
                      }}
                      className="flex items-center justify-between w-full px-4 py-2.5 hover:bg-neutral-800 text-neutral-200 hover:text-white"
                    >
                      <span className="flex items-center gap-2">
                        <Bell className="w-4 h-4 line-through opacity-40" /> None
                      </span>
                      {bellSetting === 'none' && <Check className="w-4 h-4 text-blue-400" />}
                    </button>
                    <div className="border-t border-neutral-700 my-1" />
                    <button
                      onClick={() => {
                        toggleSubscribe(activeChannel.id);
                        setShowBellDropdown(false);
                      }}
                      className="flex items-center w-full px-4 py-2 hover:bg-neutral-800 text-red-400"
                    >
                      Unsubscribe
                    </button>
                  </div>
                )}
              </div>

              {/* Share channel */}
              <button
                onClick={() => setShowShareModal(true)}
                title="Share Channel"
                className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center justify-between border-b border-neutral-800 mt-2">
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold overflow-x-auto no-scrollbar">
            {(['home', 'videos', 'shorts', 'live', 'playlists', 'community', 'about'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 uppercase tracking-wider capitalize whitespace-nowrap transition border-b-2 cursor-pointer ${
                  activeTab === tab
                    ? 'text-white border-white'
                    : 'text-neutral-400 border-transparent hover:text-neutral-200 hover:border-neutral-700'
                }`}
              >
                {tab === 'home'
                  ? 'Home'
                  : tab === 'videos'
                  ? `Videos (${channelVideos.length})`
                  : tab === 'shorts'
                  ? 'Shorts'
                  : tab === 'live'
                  ? 'Live'
                  : tab === 'playlists'
                  ? 'Playlists'
                  : tab === 'community'
                  ? 'Community'
                  : 'About'}
              </button>
            ))}
          </div>

          {/* In-channel search */}
          <div className="flex items-center gap-2 pl-4 py-2">
            {showSearchInput ? (
              <div className="flex items-center bg-[#1e1e1e] border border-neutral-700 rounded-full px-3 py-1">
                <Search className="w-3.5 h-3.5 text-neutral-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search this channel"
                  value={inChannelSearch}
                  onChange={e => setInChannelSearch(e.target.value)}
                  className="bg-transparent text-xs text-white placeholder-neutral-500 outline-none w-36 sm:w-48"
                  autoFocus
                />
                <button onClick={() => { setShowSearchInput(false); setInChannelSearch(''); }}>
                  <X className="w-3.5 h-3.5 text-neutral-400 hover:text-white" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                title="Search channel videos"
                className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tab Content */}
        <div className="pt-6">
          {/* TAB: HOME */}
          {activeTab === 'home' && (
            <div className="space-y-8">
              {/* Channel Trailer / Featured Video */}
              {featuredVideo && !inChannelSearch && (
                <div
                  onClick={() => playVideo(featuredVideo)}
                  className="flex flex-col md:flex-row items-start gap-6 p-4 sm:p-5 rounded-2xl bg-[#181818] border border-neutral-800/80 hover:border-neutral-700 transition cursor-pointer group shadow-lg"
                >
                  <div className="relative w-full md:w-[420px] aspect-video rounded-xl overflow-hidden bg-black shrink-0">
                    <img
                      src={featuredVideo.thumbnailUrl}
                      alt={featuredVideo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white shadow-xl">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white font-mono text-[11px] rounded">
                      {featuredVideo.duration}
                    </span>
                  </div>

                  <div className="flex-1 space-y-2">
                    <span className="text-[11px] font-bold text-red-500 tracking-wider uppercase">
                      Featured Video
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-400 transition leading-snug">
                      {featuredVideo.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono">
                      {featuredVideo.viewsFormatted} • {featuredVideo.uploadedAt}
                    </p>
                    <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed">
                      {featuredVideo.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Latest Videos Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>Latest Uploads</span>
                  </h2>
                  <button
                    onClick={() => setActiveTab('videos')}
                    className="text-xs font-semibold text-neutral-400 hover:text-white"
                  >
                    View all ({channelVideos.length})
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {sortedVideos.slice(0, 6).map(vid => (
                    <VideoCard key={vid.id} video={vid} />
                  ))}
                </div>
              </div>

              {/* Shorts Shelf Section on Channel Home */}
              {channelShorts.length > 0 && (
                <div className="pt-4 border-t border-neutral-800">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <Flame className="w-5 h-5 text-red-500" />
                      <span>Shorts</span>
                    </h2>
                    <button
                      onClick={() => setActiveTab('shorts')}
                      className="text-xs font-semibold text-neutral-400 hover:text-white"
                    >
                      View all
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {channelShorts.slice(0, 4).map(short => (
                      <div
                        key={short.id}
                        onClick={() => playVideo(short)}
                        className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-neutral-900 cursor-pointer group shadow-lg"
                      >
                        <img
                          src={short.thumbnailUrl}
                          alt={short.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-3">
                          <p className="text-xs font-semibold text-white line-clamp-2 leading-snug">
                            {short.title}
                          </p>
                          <span className="text-[10px] text-neutral-300 font-mono mt-1">
                            {short.viewsFormatted}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: VIDEOS */}
          {activeTab === 'videos' && (
            <div className="space-y-5">
              {/* Filter Pills */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setVideoSort('latest')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    videoSort === 'latest' ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                >
                  Latest
                </button>
                <button
                  onClick={() => setVideoSort('popular')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    videoSort === 'popular' ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                >
                  Popular
                </button>
                <button
                  onClick={() => setVideoSort('oldest')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    videoSort === 'oldest' ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                >
                  Oldest
                </button>
              </div>

              {sortedVideos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {sortedVideos.map(vid => (
                    <VideoCard key={vid.id} video={vid} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-neutral-400">
                  <p className="text-sm">No videos found for &quot;{inChannelSearch}&quot;</p>
                </div>
              )}
            </div>
          )}

          {/* TAB: SHORTS */}
          {activeTab === 'shorts' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {channelShorts.map(short => (
                <div
                  key={short.id}
                  onClick={() => playVideo(short)}
                  className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-neutral-900 cursor-pointer group shadow-lg"
                >
                  <img
                    src={short.thumbnailUrl}
                    alt={short.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-3">
                    <p className="text-xs font-semibold text-white line-clamp-2 leading-snug">
                      {short.title}
                    </p>
                    <span className="text-[10px] text-neutral-300 font-mono mt-1">
                      {short.viewsFormatted}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: LIVE */}
          {activeTab === 'live' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Past Live Streams
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {channelVideos.slice(0, 3).map(vid => (
                  <div key={vid.id} onClick={() => playVideo(vid)} className="cursor-pointer group">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                      <img src={vid.thumbnailUrl} alt={vid.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                      <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-red-600 text-white font-mono text-[10px] rounded font-bold uppercase">
                        Streamed
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-white mt-2 line-clamp-2">{vid.title}</h4>
                    <p className="text-xs text-neutral-400 font-mono mt-1">{vid.viewsFormatted} • Streamed 2 weeks ago</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PLAYLISTS */}
          {activeTab === 'playlists' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              <div
                onClick={() => playVideo(featuredVideo)}
                className="cursor-pointer group rounded-2xl bg-[#181818] p-3 border border-neutral-800"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                  <img src={activeChannel.banner} alt="Best of" className="w-full h-full object-cover group-hover:scale-105 transition" />
                  <div className="absolute inset-y-0 right-0 w-28 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                    <ListPlus className="w-5 h-5 mb-1" />
                    <span className="text-xs font-mono font-bold">14 videos</span>
                  </div>
                </div>
                <h4 className="text-sm font-bold text-white mt-3">Essential Series &amp; Deep Dives</h4>
                <p className="text-xs text-neutral-400 mt-1">Updated yesterday • View full playlist</p>
              </div>

              <div
                onClick={() => playVideo(featuredVideo)}
                className="cursor-pointer group rounded-2xl bg-[#181818] p-3 border border-neutral-800"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                  <img src={featuredVideo.thumbnailUrl} alt="Uploads" className="w-full h-full object-cover group-hover:scale-105 transition" />
                  <div className="absolute inset-y-0 right-0 w-28 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                    <ListPlus className="w-5 h-5 mb-1" />
                    <span className="text-xs font-mono font-bold">42 videos</span>
                  </div>
                </div>
                <h4 className="text-sm font-bold text-white mt-3">All Popular Uploads &amp; Highlights</h4>
                <p className="text-xs text-neutral-400 mt-1">Updated 3 days ago • View full playlist</p>
              </div>
            </div>
          )}

          {/* TAB: COMMUNITY */}
          {activeTab === 'community' && (
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Post 1: Interactive Community Poll */}
              <div className="p-5 rounded-2xl bg-[#1e1e1e] border border-neutral-800 space-y-4">
                <div className="flex items-center gap-3">
                  <img src={activeChannel.avatar} alt={activeChannel.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{activeChannel.name}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-neutral-400 fill-current" />
                    </h4>
                    <span className="text-[11px] text-neutral-400">2 days ago</span>
                  </div>
                </div>

                <p className="text-sm text-neutral-200 leading-relaxed">
                  Working on the next massive video release! Which topic are you most excited to see us cover next? Cast your vote below 👇
                </p>

                {/* Poll Options */}
                <div className="space-y-2">
                  {[
                    { label: 'Next-Gen Hardware & In-Depth Benchmarks', pct: 44 },
                    { label: 'Extreme Real-World Durability Testing', pct: 28 },
                    { label: 'Deep Dive Studio Tour & Behind The Scenes', pct: 18 },
                    { label: 'Community Q&A and Gear Giveaway', pct: 10 },
                  ].map((opt, idx) => {
                    const isSelected = pollVotedIndex === idx;
                    const hasVoted = pollVotedIndex !== null;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleVotePoll(idx)}
                        className={`relative w-full text-left p-3 rounded-xl border text-xs font-medium overflow-hidden transition flex items-center justify-between ${
                          isSelected
                            ? 'border-blue-500 bg-blue-950/20 text-white'
                            : 'border-neutral-700 hover:border-neutral-500 text-neutral-200'
                        }`}
                      >
                        {hasVoted && (
                          <div
                            className={`absolute inset-y-0 left-0 ${isSelected ? 'bg-blue-600/30' : 'bg-neutral-700/30'} -z-10 transition-all duration-500`}
                            style={{ width: `${opt.pct}%` }}
                          />
                        )}
                        <span className="relative z-10">{opt.label}</span>
                        {hasVoted && (
                          <span className="relative z-10 font-mono font-bold text-neutral-300 ml-2">
                            {opt.pct}%
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-800">
                  <span className="font-mono">184,200 votes</span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleToggleCommunityLike('post-1')}
                      className={`flex items-center gap-1.5 hover:text-white transition ${communityUserLiked['post-1'] ? 'text-red-500' : ''}`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{communityLikes['post-1'].toLocaleString()}</span>
                    </button>
                    <button className="hover:text-white transition">
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-white transition">
                      <MessageSquare className="w-4 h-4" />
                      <span>1,420</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Post 2: Photo Post */}
              <div className="p-5 rounded-2xl bg-[#1e1e1e] border border-neutral-800 space-y-4">
                <div className="flex items-center gap-3">
                  <img src={activeChannel.avatar} alt={activeChannel.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{activeChannel.name}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-neutral-400 fill-current" />
                    </h4>
                    <span className="text-[11px] text-neutral-400">1 week ago</span>
                  </div>
                </div>

                <p className="text-sm text-neutral-200 leading-relaxed">
                  Thank you all for hitting the new subscriber milestone! We just unboxed the custom diamond play button in the studio. New video drops tomorrow at 9 AM EST! 🚀
                </p>

                <div className="rounded-xl overflow-hidden aspect-video bg-neutral-900 border border-neutral-800">
                  <img src={activeChannel.banner} alt="Studio update" className="w-full h-full object-cover" />
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-800">
                  <span className="font-mono">Official Update</span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleToggleCommunityLike('post-2')}
                      className={`flex items-center gap-1.5 hover:text-white transition ${communityUserLiked['post-2'] ? 'text-red-500' : ''}`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{communityLikes['post-2'].toLocaleString()}</span>
                    </button>
                    <button className="hover:text-white transition">
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-white transition">
                      <MessageSquare className="w-4 h-4" />
                      <span>3,190</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ABOUT */}
          {activeTab === 'about' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-neutral-800 space-y-3">
                  <h3 className="font-bold text-white text-base">Description</h3>
                  <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-line">
                    {activeChannel.description}
                  </p>
                </div>

                <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-neutral-800 space-y-3">
                  <h3 className="font-bold text-white text-base">Links</h3>
                  <div className="space-y-2 text-xs">
                    <a href="https://youtube.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-blue-400 hover:underline">
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Official Website</span>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-blue-400 hover:underline">
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>X / Twitter</span>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-blue-400 hover:underline">
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Instagram</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Stats Column */}
              <div className="space-y-4">
                <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-neutral-800 space-y-4 text-xs">
                  <h3 className="font-bold text-white text-sm">Stats</h3>
                  <div className="space-y-3 divide-y divide-neutral-800">
                    <div className="pt-2 flex justify-between">
                      <span className="text-neutral-400">Joined:</span>
                      <span className="text-white font-medium">{activeChannel.joinedDate}</span>
                    </div>
                    <div className="pt-2 flex justify-between">
                      <span className="text-neutral-400">Subscribers:</span>
                      <span className="text-white font-medium">{activeChannel.subscribers}</span>
                    </div>
                    <div className="pt-2 flex justify-between">
                      <span className="text-neutral-400">Total Views:</span>
                      <span className="text-white font-mono">4,892,150,830 views</span>
                    </div>
                    <div className="pt-2 flex justify-between">
                      <span className="text-neutral-400">Location:</span>
                      <span className="text-white font-medium">United States</span>
                    </div>
                    <div className="pt-2 flex justify-between">
                      <span className="text-neutral-400">Verified:</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 fill-current" /> Official Creator
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* About Channel Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#212121] rounded-3xl border border-neutral-700/80 p-6 shadow-2xl space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-neutral-700 pb-3">
              <h3 className="text-base font-bold text-white">About {activeChannel.name}</h3>
              <button onClick={() => setShowAboutModal(false)} className="p-1 rounded-full text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs max-h-[60vh] overflow-y-auto pr-1">
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Description</h4>
                <p className="text-neutral-300 leading-relaxed whitespace-pre-line">
                  {activeChannel.description}
                </p>
              </div>

              <div className="border-t border-neutral-700/80 pt-3 space-y-2">
                <h4 className="font-bold text-white text-sm mb-1">Channel Details</h4>
                <p className="text-neutral-400">Handle: <span className="text-white font-medium">{activeChannel.handle}</span></p>
                <p className="text-neutral-400">Joined: <span className="text-white font-medium">{activeChannel.joinedDate}</span></p>
                <p className="text-neutral-400">Country: <span className="text-white font-medium">United States</span></p>
                <p className="text-neutral-400">Channel URL: <span className="text-blue-400 font-mono">youtube.com/{activeChannel.handle}</span></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Channel Memberships Modal (Join) */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#212121] rounded-3xl border border-neutral-700/80 p-6 shadow-2xl space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-neutral-700 pb-3">
              <div className="flex items-center gap-3">
                <img src={activeChannel.avatar} alt={activeChannel.name} className="w-8 h-8 rounded-full" />
                <h3 className="text-sm font-bold text-white">Join {activeChannel.name}</h3>
              </div>
              <button onClick={() => setShowJoinModal(false)} className="p-1 rounded-full text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-neutral-800/80 border border-neutral-700 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white text-sm">Tier 1 • Channel Member</h4>
                  <span className="text-emerald-400 font-bold">$4.99/mo</span>
                </div>
                <p className="text-neutral-300">
                  Get custom loyalty badges next to your name in comments and live chat, exclusive emojis, and member-only community updates.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowJoinModal(false);
                }}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full text-xs transition"
              >
                Join for $4.99/month
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        videoTitle={`${activeChannel.name} on YouTube`}
        youtubeId={activeChannel.featuredVideoId || 'channel'}
      />
    </div>
  );
};
