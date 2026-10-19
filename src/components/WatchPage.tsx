import React, { useState, useEffect, useRef } from 'react';
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Download,
  Scissors,
  ListPlus,
  MoreHorizontal,
  Bell,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Smile,
  Radio,
  Maximize2,
  Tv,
  Layers,
  ArrowRight,
  Check,
  Settings
} from 'lucide-react';
import { useYouTube } from '../context/YouTubeContext';
import { VideoCard } from './VideoCard';
import { ShareModal } from './Modals/ShareModal';
import { SavePlaylistModal } from './Modals/SavePlaylistModal';

type VideoQuality = '1080p' | '720p' | '480p' | 'Auto';

interface QualityOption {
  id: VideoQuality;
  label: string;
  badge?: string;
  desc: string;
  vqParam: string;
}

const QUALITY_OPTIONS: QualityOption[] = [
  { id: '1080p', label: '1080p60 HD', badge: 'HD', desc: 'Full High Definition (60fps)', vqParam: 'hd1080' },
  { id: '720p', label: '720p HD', badge: 'HD', desc: 'High Definition', vqParam: 'hd720' },
  { id: '480p', label: '480p', desc: 'Standard Definition (Data saver)', vqParam: 'large' },
  { id: 'Auto', label: 'Auto (1080p)', badge: 'Auto', desc: 'Automatically adjusts to network', vqParam: 'auto' },
];

export const WatchPage: React.FC = () => {
  const {
    currentVideo,
    videos,
    openChannel,
    toggleLikeVideo,
    toggleDislikeVideo,
    likedVideoIds,
    dislikedVideoIds,
    subscribedChannelIds,
    toggleSubscribe,
    addComment,
    addCommentReply,
    likeComment,
    theaterMode,
    setTheaterMode,
    setMiniplayerVideo,
    playVideo,
    setView,
  } = useYouTube();

  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [isCommentFocused, setIsCommentFocused] = useState(false);
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyInput, setReplyInput] = useState('');
  const [sortBy, setSortBy] = useState<'top' | 'newest'>('top');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [autoplayNext, setAutoplayNext] = useState(true);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [showDownloadToast, setShowDownloadToast] = useState(false);

  // Video Quality State
  const [selectedQuality, setSelectedQuality] = useState<VideoQuality>('1080p');
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [qualityToast, setQualityToast] = useState<string | null>(null);
  const qualityMenuRef = useRef<HTMLDivElement>(null);

  // Close quality menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (qualityMenuRef.current && !qualityMenuRef.current.contains(e.target as Node)) {
        setShowQualityMenu(false);
      }
    };
    if (showQualityMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showQualityMenu]);

  // Keyboard shortcut 't' to toggle theater mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        setTheaterMode(!theaterMode);
        setQualityToast(!theaterMode ? 'Theater mode on (Sidebar & recommendations hidden)' : 'Default view restored');
        setTimeout(() => setQualityToast(null), 2500);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [theaterMode, setTheaterMode]);

  // Modals
  const [showShareModal, setShowShareModal] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);

  if (!currentVideo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <p className="text-lg text-neutral-400">No video selected</p>
        <button
          onClick={() => setView('home')}
          className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const isLiked = likedVideoIds.includes(currentVideo.id);
  const isDisliked = dislikedVideoIds.includes(currentVideo.id);
  const isSubscribed = subscribedChannelIds.includes(currentVideo.channelId);

  const relatedVideos = videos.filter(v => v.id !== currentVideo.id);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addComment(currentVideo.id, commentInput.trim());
    setCommentInput('');
    setIsCommentFocused(false);
  };

  const handleReplySubmit = (commentId: string) => {
    if (!replyInput.trim()) return;
    addCommentReply(currentVideo.id, commentId, replyInput.trim());
    setReplyInput('');
    setActiveReplyId(null);
  };

  const handleDownload = () => {
    setDownloadProgress(0);
    setShowDownloadToast(true);
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloadProgress(null);
            setShowDownloadToast(false);
          }, 2000);
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  const handleSelectQuality = (quality: VideoQuality) => {
    setSelectedQuality(quality);
    setShowQualityMenu(false);
    const label = QUALITY_OPTIONS.find(q => q.id === quality)?.label || quality;
    setQualityToast(`Video quality set to ${label}`);
    setTimeout(() => setQualityToast(null), 3000);
  };

  const activeQualityConfig = QUALITY_OPTIONS.find(q => q.id === selectedQuality);
  const vqParam = activeQualityConfig?.vqParam || 'hd1080';
  
  const playerEmbedUrl = `https://www.youtube-nocookie.com/embed/${currentVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1&vq=${vqParam}`;

  return (
    <div className={`w-full min-h-screen bg-[#0f0f0f] text-neutral-200 pb-16 ${theaterMode ? '' : 'max-w-[1720px] mx-auto px-4 lg:px-8 pt-4'}`}>
      {/* Toast Notification */}
      {showDownloadToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#282828] text-white px-4 py-3 rounded-xl shadow-2xl border border-neutral-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom duration-200">
          <Download className="w-5 h-5 text-red-500 animate-bounce" />
          <div>
            <p className="text-xs font-semibold">
              {downloadProgress === 100 ? 'Video Download Complete!' : `Downloading Video (${downloadProgress}%)...`}
            </p>
            <p className="text-[11px] text-neutral-400">Saved offline in 1080p HD</p>
          </div>
        </div>
      )}

      {/* Theater Mode Top Player View */}
      {theaterMode && (
        <div className="w-full bg-black mb-6 flex justify-center">
          <div className="relative w-full aspect-video min-h-[60vh] sm:min-h-[75vh] md:min-h-[82vh] lg:min-h-[88vh] max-h-[92vh] bg-black group">
            <iframe
              key={`theater-${currentVideo.youtubeId}-${selectedQuality}`}
              src={playerEmbedUrl}
              title={currentVideo.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

            {/* Quality & Theater Mode Overlays on Player */}
            <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
              <button
                onClick={() => setShowQualityMenu(prev => !prev)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 hover:bg-black text-white text-xs font-medium backdrop-blur-xs border border-white/10 shadow-lg cursor-pointer transition hover:scale-105"
                title="Change video quality (1080p, 720p, 480p)"
              >
                <Settings className="w-3.5 h-3.5 text-neutral-300" />
                <span className="font-mono text-[11px] font-bold">{selectedQuality}</span>
                <span className="text-[9px] px-1 py-0.2 bg-red-600 text-white font-bold rounded">
                  {selectedQuality === '480p' ? 'SD' : 'HD'}
                </span>
              </button>

              <button
                onClick={() => {
                  setTheaterMode(false);
                  setQualityToast('Default view restored');
                  setTimeout(() => setQualityToast(null), 2500);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold backdrop-blur-xs border border-white/10 shadow-lg cursor-pointer transition hover:scale-105"
                title="Exit theater mode (t)"
              >
                <Tv className="w-3.5 h-3.5" />
                <span className="text-[11px] font-semibold">Exit Theater</span>
              </button>
            </div>

            {/* Quality Toast on Player */}
            {qualityToast && (
              <div className="absolute top-3 left-3 z-30 px-3.5 py-1.5 bg-black/85 backdrop-blur-xs text-white rounded-xl text-xs font-medium border border-neutral-700 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200 flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>{qualityToast}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className={`grid grid-cols-1 ${theaterMode ? 'max-w-5xl mx-auto px-2 sm:px-4' : 'lg:grid-cols-12 gap-6'}`}>
        {/* Main Video & Details Column */}
        <div className={`${theaterMode ? 'w-full' : 'lg:col-span-8'}`}>
          {/* Normal Mode Player */}
          {!theaterMode && (
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-neutral-800 mb-4 group">
              <iframe
                key={`normal-${currentVideo.youtubeId}-${selectedQuality}`}
                src={playerEmbedUrl}
                title={currentVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />

              {/* Quality & Theater Mode Overlays on Normal Player */}
              <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
                <button
                  onClick={() => setShowQualityMenu(prev => !prev)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 hover:bg-black text-white text-xs font-medium backdrop-blur-xs border border-white/10 shadow-lg cursor-pointer transition hover:scale-105"
                  title="Change video quality (1080p, 720p, 480p)"
                >
                  <Settings className="w-3.5 h-3.5 text-neutral-300" />
                  <span className="font-mono text-[11px] font-bold">{selectedQuality}</span>
                  <span className="text-[9px] px-1 py-0.2 bg-red-600 text-white font-bold rounded">
                    {selectedQuality === '480p' ? 'SD' : 'HD'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setTheaterMode(true);
                    setQualityToast('Theater mode on (Sidebar & recommendations hidden)');
                    setTimeout(() => setQualityToast(null), 2500);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 hover:bg-black text-white text-xs font-medium backdrop-blur-xs border border-white/10 shadow-lg cursor-pointer transition hover:scale-105"
                  title="Theater mode (t)"
                >
                  <Tv className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px] font-semibold">Theater</span>
                </button>
              </div>

              {/* Quality Toast on Player */}
              {qualityToast && (
                <div className="absolute top-3 left-3 z-30 px-3.5 py-1.5 bg-black/85 backdrop-blur-xs text-white rounded-xl text-xs font-medium border border-neutral-700 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200 flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{qualityToast}</span>
                </div>
              )}
            </div>
          )}

          {/* Video Title */}
          <h1 className="text-lg sm:text-xl font-bold text-white leading-snug">
            {currentVideo.title}
          </h1>

          {/* Channel Row & Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-neutral-800">
            {/* Channel Info */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => openChannel(currentVideo.channelId)}
                className="w-10 h-10 rounded-full overflow-hidden hover:opacity-85 transition cursor-pointer"
              >
                <img
                  src={currentVideo.channelAvatar}
                  alt={currentVideo.channelName}
                  className="w-full h-full object-cover"
                />
              </button>

              <div>
                <button
                  onClick={() => openChannel(currentVideo.channelId)}
                  className="text-sm font-bold text-white hover:text-neutral-300 transition flex items-center gap-1.5"
                >
                  <span>{currentVideo.channelName}</span>
                  {currentVideo.verified && <CheckCircle className="w-3.5 h-3.5 text-neutral-400 fill-current" />}
                </button>
                <p className="text-xs text-neutral-400">{currentVideo.subscribersCount} subscribers</p>
              </div>

              {/* Subscribe Button */}
              <button
                onClick={() => toggleSubscribe(currentVideo.channelId)}
                className={`ml-2 px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  isSubscribed
                    ? 'bg-[#272727] text-white hover:bg-[#3f3f3f]'
                    : 'bg-white text-black hover:bg-neutral-200'
                }`}
              >
                {isSubscribed ? (
                  <>
                    <Bell className="w-3.5 h-3.5" />
                    <span>Subscribed</span>
                  </>
                ) : (
                  <span>Subscribe</span>
                )}
              </button>

              <button className="hidden sm:inline-flex px-3.5 py-2 rounded-full border border-neutral-700 hover:bg-neutral-800 text-xs font-semibold text-neutral-200 transition">
                Join
              </button>
            </div>

            {/* Actions: Quality Selector, Like/Dislike, Share, Download, Clip, Save */}
            <div className="flex items-center flex-wrap gap-2">
              {/* Video Quality Selection Menu Button */}
              <div className="relative">
                <button
                  onClick={() => setShowQualityMenu(prev => !prev)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
                    showQualityMenu
                      ? 'bg-neutral-700 text-white'
                      : 'bg-[#272727] hover:bg-[#333333] text-neutral-200'
                  }`}
                  title="Select video quality (1080p, 720p, 480p)"
                >
                  <Settings className="w-4 h-4 text-neutral-300" />
                  <span className="hidden xs:inline">Quality:</span>
                  <span className="font-mono text-white font-bold">{selectedQuality}</span>
                  <span className="text-[9px] px-1 py-0.2 bg-red-600 text-white font-bold rounded">
                    {selectedQuality === '480p' ? 'SD' : 'HD'}
                  </span>
                </button>

                {/* Quality Selection Dropdown Menu */}
                {showQualityMenu && (
                  <div
                    ref={qualityMenuRef}
                    className="absolute right-0 bottom-full mb-2 w-72 bg-[#212121] text-white rounded-2xl shadow-2xl border border-neutral-700/80 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 select-none"
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between px-4 pb-2 border-b border-neutral-700/60 mb-1.5">
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4 text-neutral-300" />
                        <span className="text-xs font-semibold text-white">Quality for current video</span>
                      </div>
                      <button
                        onClick={() => setShowQualityMenu(false)}
                        className="text-neutral-400 hover:text-white text-xs p-1 rounded-full hover:bg-neutral-800 transition"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-1 px-1.5">
                      {QUALITY_OPTIONS.map(opt => {
                        const isSelected = selectedQuality === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectQuality(opt.id)}
                            className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-left transition cursor-pointer ${
                              isSelected
                                ? 'bg-neutral-800 text-white font-medium'
                                : 'text-neutral-300 hover:bg-neutral-800/60 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-4 flex items-center justify-center">
                                {isSelected && <Check className="w-4 h-4 text-red-500 stroke-[2.5]" />}
                              </span>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-semibold">{opt.label}</span>
                                  {opt.badge && (
                                    <span className="text-[9px] px-1.5 py-0.2 bg-red-600 text-white font-bold rounded">
                                      {opt.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[10px] text-neutral-400 leading-tight mt-0.5">{opt.desc}</p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Like / Dislike pill */}
              <div className="flex items-center bg-[#272727] hover:bg-[#333333] rounded-full overflow-hidden transition">
                <button
                  onClick={() => toggleLikeVideo(currentVideo.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold hover:bg-neutral-700/60 transition cursor-pointer ${
                    isLiked ? 'text-red-500' : 'text-neutral-200'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="font-mono tabular-nums">{currentVideo.likes.toLocaleString()}</span>
                </button>
                <div className="w-px h-5 bg-neutral-600" />
                <button
                  onClick={() => toggleDislikeVideo(currentVideo.id)}
                  className={`p-2 hover:bg-neutral-700/60 transition cursor-pointer ${
                    isDisliked ? 'text-red-500' : 'text-neutral-200'
                  }`}
                >
                  <ThumbsDown className={`w-4 h-4 ${isDisliked ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Share button */}
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#272727] hover:bg-[#333333] text-xs font-semibold text-neutral-200 transition cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>

              {/* Download button */}
              <button
                onClick={handleDownload}
                className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#272727] hover:bg-[#333333] text-xs font-semibold text-neutral-200 transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>

              {/* Theater Mode toggle */}
              <button
                onClick={() => setTheaterMode(!theaterMode)}
                title={theaterMode ? 'Default view' : 'Theater mode'}
                className="p-2 rounded-full bg-[#272727] hover:bg-[#333333] text-neutral-200 transition cursor-pointer"
              >
                <Tv className="w-4 h-4" />
              </button>

              {/* Save to Playlist */}
              <button
                onClick={() => setShowPlaylistModal(true)}
                title="Save"
                className="p-2 rounded-full bg-[#272727] hover:bg-[#333333] text-neutral-200 transition cursor-pointer"
              >
                <ListPlus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Description Box */}
          <div
            onClick={() => setDescriptionExpanded(prev => !prev)}
            className="mt-4 p-3.5 bg-[#272727]/70 hover:bg-[#272727] rounded-xl cursor-pointer transition text-sm text-neutral-200 select-text"
          >
            <div className="font-semibold text-xs text-white mb-1.5 flex items-center gap-2 flex-wrap">
              <span>{currentVideo.views.toLocaleString()} views</span>
              <span>•</span>
              <span>{currentVideo.uploadedAt}</span>
              {currentVideo.tags && currentVideo.tags.map((tag, i) => (
                <span key={i} className="text-blue-400 font-normal hover:underline">
                  #{tag}
                </span>
              ))}
            </div>

            <p className={`text-xs whitespace-pre-line leading-relaxed text-neutral-300 ${descriptionExpanded ? '' : 'line-clamp-3'}`}>
              {currentVideo.description}
            </p>

            <button className="mt-2 text-xs font-bold text-white flex items-center gap-1 hover:text-neutral-300">
              {descriptionExpanded ? (
                <>Show less <ChevronUp className="w-3.5 h-3.5" /></>
              ) : (
                <>...more <ChevronDown className="w-3.5 h-3.5" /></>
              )}
            </button>
          </div>

          {/* Comments Section */}
          <div className="mt-6">
            {/* Header: count & sort */}
            <div className="flex items-center gap-6 mb-4">
              <h2 className="text-base font-bold text-white">
                {currentVideo.commentsCount.toLocaleString()} Comments
              </h2>

              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(prev => !prev)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-white transition"
                >
                  <span>Sort by: {sortBy === 'top' ? 'Top comments' : 'Newest first'}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {showSortDropdown && (
                  <div className="absolute top-6 left-0 w-36 bg-[#282828] rounded-xl shadow-xl border border-neutral-700 py-1 z-20">
                    <button
                      onClick={() => {
                        setSortBy('top');
                        setShowSortDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs transition ${sortBy === 'top' ? 'text-white font-bold bg-neutral-700' : 'text-neutral-300 hover:bg-neutral-700/50'}`}
                    >
                      Top comments
                    </button>
                    <button
                      onClick={() => {
                        setSortBy('newest');
                        setShowSortDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs transition ${sortBy === 'newest' ? 'text-white font-bold bg-neutral-700' : 'text-neutral-300 hover:bg-neutral-700/50'}`}
                    >
                      Newest first
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Add Comment Input */}
            <form onSubmit={handleCommentSubmit} className="flex gap-4 mb-8">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Your Avatar"
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentInput}
                  onChange={e => setCommentInput(e.target.value)}
                  onFocus={() => setIsCommentFocused(true)}
                  className="w-full bg-transparent border-b border-neutral-700 focus:border-white pb-1.5 text-sm text-white placeholder-neutral-500 outline-none transition"
                />

                {isCommentFocused && (
                  <div className="flex items-center justify-between mt-3 animate-in fade-in duration-150">
                    <button
                      type="button"
                      onClick={() => setCommentInput(prev => prev + ' 🔥')}
                      className="p-1 rounded-full text-neutral-400 hover:text-white transition"
                    >
                      <Smile className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setCommentInput('');
                          setIsCommentFocused(false);
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:text-white rounded-full hover:bg-neutral-800 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!commentInput.trim()}
                        className="px-4 py-1.5 text-xs font-semibold bg-blue-500 disabled:opacity-40 text-black font-semibold rounded-full hover:bg-blue-400 transition"
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {currentVideo.comments.map(comment => (
                <div key={comment.id} className="flex gap-3 text-xs">
                  <img
                    src={comment.authorAvatar}
                    alt={comment.author}
                    className="w-9 h-9 rounded-full object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-white">{comment.author}</span>
                      {comment.authorHandle && (
                        <span className="text-[11px] text-neutral-400">{comment.authorHandle}</span>
                      )}
                      <span className="text-[11px] text-neutral-500">{comment.timestamp}</span>
                      {comment.isPinned && (
                        <span className="text-[10px] text-neutral-400 bg-neutral-800 px-1.5 py-0.5 rounded flex items-center gap-1 font-medium">
                          Pinned by {currentVideo.channelName}
                        </span>
                      )}
                    </div>

                    <p className="text-neutral-200 text-xs leading-relaxed whitespace-pre-line mb-2">
                      {comment.text}
                    </p>

                    {/* Actions: Like, Dislike, Reply */}
                    <div className="flex items-center gap-3 text-neutral-400">
                      <button
                        onClick={() => likeComment(currentVideo.id, comment.id)}
                        className={`flex items-center gap-1 hover:text-white transition ${comment.isLiked ? 'text-red-500' : ''}`}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${comment.isLiked ? 'fill-current' : ''}`} />
                        <span className="text-[11px] font-mono tabular-nums">{comment.likes}</span>
                      </button>

                      <button className="hover:text-white transition">
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </button>

                      {comment.isCreatorHearted && (
                        <span className="flex items-center text-red-500" title={`Hearted by ${currentVideo.channelName}`}>
                          ❤️
                        </span>
                      )}

                      <button
                        onClick={() => setActiveReplyId(activeReplyId === comment.id ? null : comment.id)}
                        className="hover:text-white font-semibold transition"
                      >
                        Reply
                      </button>
                    </div>

                    {/* Reply Input Box */}
                    {activeReplyId === comment.id && (
                      <div className="mt-3 flex gap-3 pl-2">
                        <input
                          type="text"
                          placeholder="Add a reply..."
                          value={replyInput}
                          onChange={e => setReplyInput(e.target.value)}
                          autoFocus
                          className="flex-1 bg-transparent border-b border-neutral-700 pb-1 text-xs text-white placeholder-neutral-500 outline-none"
                        />
                        <button
                          onClick={() => handleReplySubmit(comment.id)}
                          className="px-3 py-1 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 text-xs transition"
                        >
                          Reply
                        </button>
                      </div>
                    )}

                    {/* Nested Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-3 pl-4 border-l border-neutral-800 space-y-3">
                        {comment.replies.map(reply => (
                          <div key={reply.id} className="flex gap-2">
                            <img
                              src={reply.authorAvatar}
                              alt={reply.author}
                              className="w-6 h-6 rounded-full object-cover shrink-0"
                            />
                            <div>
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="font-semibold text-white text-[11px]">{reply.author}</span>
                                <span className="text-[10px] text-neutral-500">{reply.timestamp}</span>
                              </div>
                              <p className="text-neutral-300 text-xs">{reply.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Up Next / Related Videos Column (Hidden in Theater Mode) */}
        {!theaterMode && (
          <div className="lg:col-span-4">
            {/* Autoplay & Filters */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80 mb-4">
              <span className="text-sm font-semibold text-white">Up next</span>
              <label className="flex items-center gap-2 text-xs text-neutral-400 cursor-pointer">
                <span>Autoplay</span>
                <input
                  type="checkbox"
                  checked={autoplayNext}
                  onChange={e => setAutoplayNext(e.target.checked)}
                  className="w-3.5 h-3.5 accent-blue-500 rounded"
                />
              </label>
            </div>

            {/* Related Videos List */}
            <div className="space-y-3">
              {relatedVideos.map(video => (
                <VideoCard key={video.id} video={video} layout="row" />
              ))}
            </div>
          </div>
        )}
      </div>

      <ShareModal video={currentVideo} isOpen={showShareModal} onClose={() => setShowShareModal(false)} />
      <SavePlaylistModal video={currentVideo} isOpen={showPlaylistModal} onClose={() => setShowPlaylistModal(false)} />
    </div>
  );
};
