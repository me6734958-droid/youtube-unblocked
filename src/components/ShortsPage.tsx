import React, { useState, useEffect, useRef } from 'react';
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  Repeat2,
  Music2,
  ChevronUp,
  ChevronDown,
  Volume2,
  VolumeX,
  X,
  Send,
  CheckCircle,
  Play,
  Shield,
  Search,
  Sparkles,
  Flame,
  Check,
  RefreshCw,
  SlidersHorizontal
} from 'lucide-react';
import { useYouTube } from '../context/YouTubeContext';
import { ShareModal } from './Modals/ShareModal';
import { Video } from '../types/youtube';

const SHORTS_TOPICS = [
  { label: '🔥 Trending', query: 'trending shorts' },
  { label: '😂 Comedy', query: 'funny comedy shorts' },
  { label: '🎮 Gaming', query: 'gaming minecraft gta shorts' },
  { label: '💻 Tech', query: 'tech gadgets coding shorts' },
  { label: '🎵 Music', query: 'trending music hits shorts' },
  { label: '🐾 Animals', query: 'cute animals pets shorts' },
];

export const ShortsPage: React.FC = () => {
  const {
    shorts,
    currentShortIndex,
    setCurrentShortIndex,
    toggleLikeVideo,
    toggleDislikeVideo,
    likedVideoIds,
    dislikedVideoIds,
    subscribedChannelIds,
    toggleSubscribe,
    addComment,
    openChannel,
    fetchShortsLive,
  } = useYouTube();

  const [isMuted, setIsMuted] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shortCommentInput, setShortCommentInput] = useState('');
  const [activeTopic, setActiveTopic] = useState('trending shorts');
  const [isLoadingTopic, setIsLoadingTopic] = useState(false);
  const [customShortsQuery, setCustomShortsQuery] = useState('');
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const currentShort = shorts[currentShortIndex] || shorts[0];
  const isLiked = currentShort ? likedVideoIds.includes(currentShort.id) : false;
  const isDisliked = currentShort ? dislikedVideoIds.includes(currentShort.id) : false;
  const isSubscribed = currentShort ? subscribedChannelIds.includes(currentShort.channelId) : false;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const goToNext = () => {
    if (currentShortIndex < shorts.length - 1) {
      setCurrentShortIndex(currentShortIndex + 1);
    } else {
      setCurrentShortIndex(0); // loop
    }
  };

  const goToPrev = () => {
    if (currentShortIndex > 0) {
      setCurrentShortIndex(currentShortIndex - 1);
    } else {
      setCurrentShortIndex(shorts.length - 1);
    }
  };

  // Keyboard navigation up / down
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        goToPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentShortIndex, shorts.length]);


  // Fetch real shorts when topic changes
  const handleSelectTopic = async (topicQuery: string) => {
    setActiveTopic(topicQuery);
    setIsLoadingTopic(true);
    try {
      await fetchShortsLive(topicQuery);
      setCurrentShortIndex(0);
    } finally {
      setIsLoadingTopic(false);
    }
  };

  const handleCustomSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customShortsQuery.trim()) return;
    setIsLoadingTopic(true);
    setShowSearchBox(false);
    try {
      await fetchShortsLive(customShortsQuery.trim());
      setActiveTopic(customShortsQuery.trim());
      setCurrentShortIndex(0);
    } finally {
      setIsLoadingTopic(false);
    }
  };

  const handleShortComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shortCommentInput.trim() || !currentShort) return;
    addComment(currentShort.id, shortCommentInput.trim());
    setShortCommentInput('');
    showToast('Comment added');
  };

  const handleRemixSound = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`https://youtube.com/shorts/${currentShort.youtubeId}`);
    }
    showToast(`Remix sound link copied! (${currentShort.soundTrack || 'Original Audio'})`);
  };

  if (!currentShort) {
    return (
      <div className="w-full h-[calc(100vh-3.5rem)] bg-[#0f0f0f] flex flex-col items-center justify-center p-4 text-white">
        <RefreshCw className="w-8 h-8 text-red-500 animate-spin mb-4" />
        <p className="text-sm">Loading YouTube Shorts...</p>
      </div>
    );
  }

  // Direct YouTube Shorts player embed URL
  const playerEmbedUrl = `https://www.youtube-nocookie.com/embed/${currentShort.youtubeId}?autoplay=1&loop=1&playlist=${currentShort.youtubeId}&controls=1&modestbranding=1`;

  return (
    <div className="relative w-full h-[calc(100vh-3.5rem)] bg-[#0f0f0f] flex flex-col items-center justify-between p-2 sm:p-4 overflow-hidden select-none">
      {/* Top Shorts Category Filter Bar */}
      <div className="w-full max-w-xl flex items-center justify-between gap-2 px-2 z-30">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {SHORTS_TOPICS.map(t => (
            <button
              key={t.query}
              onClick={() => handleSelectTopic(t.query)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer shadow-sm ${
                activeTopic === t.query
                  ? 'bg-white text-black'
                  : 'bg-neutral-800/90 text-neutral-300 hover:bg-neutral-700 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Search inside shorts */}
        <div className="relative shrink-0">
          {showSearchBox ? (
            <form onSubmit={handleCustomSearchSubmit} className="flex items-center bg-[#212121] border border-neutral-700 rounded-full px-2 py-1 shadow-lg">
              <input
                type="text"
                placeholder="Search any short..."
                value={customShortsQuery}
                onChange={e => setCustomShortsQuery(e.target.value)}
                className="bg-transparent text-xs text-white placeholder-neutral-500 outline-none w-32 sm:w-44 px-1"
                autoFocus
              />
              <button type="submit" className="p-1 text-red-500 hover:text-red-400">
                <Search className="w-3.5 h-3.5" />
              </button>
              <button type="button" onClick={() => setShowSearchBox(false)} className="p-1 text-neutral-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setShowSearchBox(true)}
              title="Search shorts"
              className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition shadow"
            >
              <Search className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation Arrows on desktop */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30 hidden lg:flex">
        <button
          onClick={goToPrev}
          title="Previous Short (Arrow Up)"
          className="p-3.5 rounded-full bg-neutral-800/90 hover:bg-neutral-700 text-white shadow-2xl transition hover:scale-105"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
        <button
          onClick={goToNext}
          title="Next Short (Arrow Down)"
          className="p-3.5 rounded-full bg-neutral-800/90 hover:bg-neutral-700 text-white shadow-2xl transition hover:scale-105"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>

      {/* Main Shorts Container */}
      <div
        ref={containerRef}
        className="relative flex items-end justify-center w-full max-w-[420px] h-[calc(100%-3rem)] rounded-3xl overflow-hidden bg-black shadow-2xl border border-neutral-800"
      >
        {/* Iframe Video Player */}
        <iframe
          key={currentShort.id}
          src={playerEmbedUrl}
          title={currentShort.title}
          className="absolute inset-0 w-full h-full object-cover border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        {/* Gradient Scrim for text readability */}
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

        {/* Top bar controls on player */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
          <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-white text-[11px] font-bold tracking-wider border border-white/10">
            SHORTS
          </span>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition border border-white/10 cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Bottom Details (Channel & Title & Audio) */}
        <div className="relative z-20 w-full p-4 space-y-3">
          {/* Channel Row */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => openChannel(currentShort.channelId)}
              className="w-9 h-9 rounded-full overflow-hidden shrink-0 ring-2 ring-white/20 bg-neutral-800"
            >
              <img
                src={currentShort.channelAvatar}
                alt={currentShort.channelName}
                className="w-full h-full object-cover"
              />
            </button>
            <button
              onClick={() => openChannel(currentShort.channelId)}
              className="font-semibold text-sm text-white hover:underline flex items-center gap-1 truncate"
            >
              <span className="truncate">{currentShort.channelName}</span>
              {currentShort.verified && <CheckCircle className="w-3.5 h-3.5 text-white fill-current shrink-0" />}
            </button>
            <button
              onClick={() => toggleSubscribe(currentShort.channelId)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition ml-1 shrink-0 ${
                isSubscribed
                  ? 'bg-neutral-800 text-white border border-neutral-700'
                  : 'bg-white text-black hover:bg-neutral-200'
              }`}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>

          {/* Title */}
          <p className="text-xs sm:text-sm text-white line-clamp-2 font-medium leading-relaxed pr-12">
            {currentShort.title}
          </p>

          {/* Sound / Music Track */}
          <div className="flex items-center gap-2 text-xs text-neutral-300 pr-12">
            <Music2 className="w-3.5 h-3.5 animate-bounce shrink-0 text-neutral-400" />
            <span className="truncate">{currentShort.soundTrack || 'Original audio'}</span>
          </div>
        </div>

        {/* Right Action Icons Column */}
        <div className="absolute right-3 bottom-16 z-20 flex flex-col items-center gap-4">
          {/* Like */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => toggleLikeVideo(currentShort.id)}
              className={`p-3 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md transition ${isLiked ? 'text-red-500' : 'text-white'}`}
            >
              <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <span className="text-[11px] font-bold text-white mt-1 font-mono tabular-nums">
              {currentShort.likes.toLocaleString()}
            </span>
          </div>

          {/* Dislike */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => toggleDislikeVideo(currentShort.id)}
              className={`p-3 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md transition ${isDisliked ? 'text-red-500' : 'text-white'}`}
            >
              <ThumbsDown className={`w-5 h-5 ${isDisliked ? 'fill-current' : ''}`} />
            </button>
            <span className="text-[11px] font-medium text-white mt-1">Dislike</span>
          </div>

          {/* Comments */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setShowComments(prev => !prev)}
              className="p-3 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white transition"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
            <span className="text-[11px] font-mono tabular-nums text-white mt-1">
              {currentShort.commentsCount}
            </span>
          </div>

          {/* Share */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setShowShareModal(true)}
              className="p-3 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white transition"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <span className="text-[11px] font-medium text-white mt-1">Share</span>
          </div>

          {/* Remix */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleRemixSound}
              className="p-3 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white transition"
              title="Remix this sound"
            >
              <Repeat2 className="w-5 h-5" />
            </button>
            <span className="text-[11px] font-medium text-white mt-1">Remix</span>
          </div>

          {/* Spinning Audio Album Cover */}
          <div className="w-8 h-8 rounded-full border-2 border-white/40 overflow-hidden animate-spin mt-1 bg-neutral-800">
            <img
              src={currentShort.channelAvatar}
              alt="Track"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Sliding Comments Drawer */}
        {showComments && (
          <div className="absolute inset-x-0 bottom-0 top-1/4 bg-[#212121] z-30 rounded-t-3xl flex flex-col shadow-2xl border-t border-neutral-700 animate-in slide-in-from-bottom duration-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-700/60">
              <span className="text-sm font-bold text-white">
                Comments <span className="font-mono font-normal text-xs text-neutral-400">({currentShort.commentsCount})</span>
              </span>
              <button
                onClick={() => setShowComments(false)}
                className="p-1 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentShort.comments && currentShort.comments.length > 0 ? (
                currentShort.comments.map(c => (
                  <div key={c.id} className="flex gap-3 text-xs">
                    <img
                      src={c.authorAvatar}
                      alt={c.author}
                      className="w-7 h-7 rounded-full object-cover shrink-0 bg-neutral-800"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="font-semibold text-white">{c.author}</span>
                        <span className="text-[10px] text-neutral-500">{c.timestamp}</span>
                      </div>
                      <p className="text-neutral-200 text-xs leading-relaxed">{c.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="space-y-4">
                  <div className="flex gap-3 text-xs">
                    <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">
                      Y
                    </div>
                    <div>
                      <span className="font-semibold text-white">YouTubeFan</span>
                      <p className="text-neutral-200 mt-0.5">This short is unreal! The editing quality is 10/10 🔥</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-xs">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold shrink-0">
                      M
                    </div>
                    <div>
                      <span className="font-semibold text-white">MusicLover</span>
                      <p className="text-neutral-200 mt-0.5">The audio choice fits this video so well 👏</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Comment Input */}
            <form onSubmit={handleShortComment} className="p-3 border-t border-neutral-700/60 flex items-center gap-2 bg-[#181818]">
              <input
                type="text"
                placeholder="Add a comment..."
                value={shortCommentInput}
                onChange={e => setShortCommentInput(e.target.value)}
                className="flex-1 bg-transparent border-b border-neutral-700 px-2 py-1 text-xs text-white placeholder-neutral-500 outline-none"
              />
              <button
                type="submit"
                disabled={!shortCommentInput.trim()}
                className="p-1.5 rounded-full bg-red-600 disabled:opacity-40 text-white cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Sleek Floating Toast Notification */}
      {toastMessage && (
        <div className="absolute bottom-6 z-50 px-4 py-2 bg-neutral-900 border border-neutral-700 text-white text-xs font-semibold rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom duration-150">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        video={currentShort}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
    </div>
  );
};
