import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Mic,
  Video,
  Bell,
  X,
  Upload,
  Radio,
  FileText,
  Moon,
  Sun,
  Keyboard,
  Settings,
  HelpCircle,
  Check,
  Play
} from 'lucide-react';
import { useYouTube } from '../context/YouTubeContext';
import { VoiceSearchModal } from './Modals/VoiceSearchModal';
import { AddVideoModal } from './Modals/AddVideoModal';
import { KeyboardShortcutsModal } from './Modals/KeyboardShortcutsModal';

export const Header: React.FC = () => {
  const {
    toggleSidebar,
    searchQuery,
    setSearchQuery,
    setView,
    playVideo,
    videos,
    theme,
    toggleTheme,
    extractYouTubeId
  } = useYouTube();

  const [inputVal, setInputVal] = useState(searchQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [liveSuggestions, setLiveSuggestions] = useState<string[]>([]);

  // Modals
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [showKeyboardModal, setShowKeyboardModal] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const createMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputVal(searchQuery);
  }, [searchQuery]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
      if (createMenuRef.current && !createMenuRef.current.contains(e.target as Node)) {
        setShowCreateMenu(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setShowSuggestions(false);
    const trimmed = inputVal.trim();
    if (!trimmed) return;

    // Check if user entered a direct YouTube URL or 11-char ID
    const extracted = extractYouTubeId(trimmed);
    if (extracted && (trimmed.includes('youtube.com') || trimmed.includes('youtu.be') || /^[a-zA-Z0-9_-]{11}$/.test(trimmed))) {
      playVideo(trimmed);
      return;
    }

    setSearchQuery(trimmed);
    setView('search');
  };

  // Fetch live autocomplete suggestions with debounce
  useEffect(() => {
    if (!inputVal.trim()) {
      setLiveSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/proxy/suggestions?q=${encodeURIComponent(inputVal.trim())}`);
        if (res.ok) {
          const data = await res.json();
          if (data.suggestions && Array.isArray(data.suggestions)) {
            setLiveSuggestions(data.suggestions);
          }
        }
      } catch {
        // Fallback
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [inputVal]);

  // Autocomplete suggestions based on catalog and popular searches
  const popularKeywords = [
    'GTA 6 trailer',
    'JavaScript tutorial',
    'lofi hip hop radio',
    'MrBeast squid game',
    'Apple Vision Pro review',
    'Queen Bohemian Rhapsody',
    'Rick Astley Never Gonna Give You Up',
    'African wildlife 4K',
    'React in 100 seconds',
    'Curious science Veritasium',
  ];

  const filteredSuggestions = liveSuggestions.length > 0
    ? liveSuggestions.slice(0, 8)
    : inputVal.trim()
    ? popularKeywords
        .concat(videos.map(v => v.title))
        .filter(item => item.toLowerCase().includes(inputVal.toLowerCase()))
        .slice(0, 7)
    : popularKeywords.slice(0, 5);

  const detectedDirectId = inputVal.trim() ? extractYouTubeId(inputVal.trim()) : '';
  const isDirectUrlOrId = detectedDirectId && (inputVal.includes('youtube.com') || inputVal.includes('youtu.be') || /^[a-zA-Z0-9_-]{11}$/.test(inputVal.trim()));

  return (
    <>
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 h-14 bg-[#0f0f0f] text-white border-b border-neutral-800/70 select-none">
        {/* Left Section: Menu + YouTube Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            aria-label="Toggle navigation drawer"
            className="p-2 rounded-full hover:bg-neutral-800 transition text-neutral-200 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              setView('home');
              setSearchQuery('');
            }}
            className="flex items-center gap-1 group text-left cursor-pointer"
          >
            <div className="relative flex items-center">
              <svg className="w-7 h-5 fill-red-600 group-hover:scale-105 transition" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span className="ml-1 text-lg font-bold tracking-tighter text-white font-sans flex items-center">
                YouTube
                <sup className="text-[9px] font-normal text-neutral-400 ml-1">US</sup>
              </span>
            </div>
          </button>
        </div>

        {/* Center Section: Search Bar + Voice Search */}
        <div ref={searchContainerRef} className="relative flex items-center justify-center flex-1 max-w-2xl mx-4">
          <form onSubmit={handleSearchSubmit} className="flex items-center w-full">
            <div className="flex items-center flex-1 h-10 bg-[#121212] border border-neutral-700/80 rounded-l-full px-4 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition">
              <Search className="w-4 h-4 text-neutral-400 mr-2.5 shrink-0" />
              <input
                type="text"
                placeholder="Search or paste any YouTube URL / Video ID"
                value={inputVal}
                onChange={e => {
                  setInputVal(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full bg-transparent text-sm text-white placeholder-neutral-500 outline-none"
              />
              {inputVal && (
                <button
                  type="button"
                  onClick={() => {
                    setInputVal('');
                    setSearchQuery('');
                  }}
                  className="p-1 rounded-full text-neutral-400 hover:text-white transition"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="submit"
              title="Search"
              className="flex items-center justify-center w-16 h-10 bg-[#222222] hover:bg-[#272727] border border-l-0 border-neutral-700/80 rounded-r-full text-neutral-300 hover:text-white transition"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Voice Search Button */}
          <button
            onClick={() => setShowVoiceModal(true)}
            title="Search with your voice"
            className="ml-3 p-2.5 rounded-full bg-[#222222] hover:bg-[#2e2e2e] text-neutral-200 hover:text-white transition shrink-0"
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute top-11 left-0 right-16 bg-[#212121] rounded-2xl shadow-2xl border border-neutral-700/60 overflow-hidden py-2 z-50 animate-in fade-in duration-150">
              {/* Direct YouTube link detection card */}
              {isDirectUrlOrId && (
                <div
                  onClick={() => {
                    setShowSuggestions(false);
                    playVideo(detectedDirectId);
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 bg-red-950/40 hover:bg-red-900/40 border-b border-neutral-700/60 cursor-pointer transition"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shrink-0">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">
                      Play YouTube Video Directly: <span className="text-red-400 font-mono">{detectedDirectId}</span>
                    </p>
                    <p className="text-[11px] text-neutral-400">Click to watch now</p>
                  </div>
                </div>
              )}

              {filteredSuggestions.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setInputVal(item);
                    setSearchQuery(item);
                    setView('search');
                    setShowSuggestions(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-700/50 cursor-pointer transition"
                >
                  <Search className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Section: Create, Notifications, Profile */}
        <div className="flex items-center gap-1.5 md:gap-3">
          {/* Create Button */}
          <div ref={createMenuRef} className="relative">
            <button
              onClick={() => setShowCreateMenu(prev => !prev)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#222222] hover:bg-[#2e2e2e] text-white text-xs font-medium transition cursor-pointer"
            >
              <Video className="w-4 h-4 text-red-500" />
              <span className="hidden sm:inline">Create</span>
            </button>

            {showCreateMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-[#282828] rounded-xl shadow-2xl border border-neutral-700/70 py-1.5 z-50 animate-in fade-in duration-150">
                <button
                  onClick={() => {
                    setShowCreateMenu(false);
                    setShowAddVideoModal(true);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-xs text-neutral-200 hover:bg-neutral-700/60 text-left transition"
                >
                  <Upload className="w-4 h-4 text-red-400" />
                  <span>Upload / Add YouTube Video</span>
                </button>
                <button
                  onClick={() => {
                    setShowCreateMenu(false);
                    playVideo('jfKfPfyJRdk');
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-xs text-neutral-200 hover:bg-neutral-700/60 text-left transition"
                >
                  <Radio className="w-4 h-4 text-red-500" />
                  <span>Go Live (Lofi Stream)</span>
                </button>
                <button
                  onClick={() => {
                    setShowCreateMenu(false);
                    setView('subscriptions');
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-xs text-neutral-200 hover:bg-neutral-700/60 text-left transition"
                >
                  <FileText className="w-4 h-4 text-neutral-400" />
                  <span>Community Post</span>
                </button>
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <div ref={notifMenuRef} className="relative">
            <button
              onClick={() => setShowNotifications(prev => !prev)}
              className="relative p-2 rounded-full hover:bg-neutral-800 text-neutral-200 hover:text-white transition cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                3
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#282828] rounded-2xl shadow-2xl border border-neutral-700/70 overflow-hidden z-50 animate-in fade-in duration-150">
                <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-700/60">
                  <span className="text-sm font-semibold text-white">Notifications</span>
                  <Settings className="w-4 h-4 text-neutral-400 hover:text-white cursor-pointer" />
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-neutral-800">
                  <div 
                    onClick={() => {
                      setShowNotifications(false);
                      playVideo('v-gta6');
                    }}
                    className="flex gap-3 p-3 hover:bg-neutral-700/50 cursor-pointer transition"
                  >
                    <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center font-bold text-black text-sm shrink-0">
                      R*
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-neutral-200 line-clamp-2">
                        <strong className="text-white">Rockstar Games</strong> uploaded: Grand Theft Auto VI Trailer 1
                      </p>
                      <span className="text-[10px] text-neutral-400">2 hours ago</span>
                    </div>
                  </div>

                  <div 
                    onClick={() => {
                      setShowNotifications(false);
                      playVideo('v-fireship-js');
                    }}
                    className="flex gap-3 p-3 hover:bg-neutral-700/50 cursor-pointer transition"
                  >
                    <div className="w-9 h-9 rounded-full bg-orange-600 flex items-center justify-center font-bold text-white text-xs shrink-0">
                      🔥
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-neutral-200 line-clamp-2">
                        <strong className="text-white">Fireship</strong> replied to your comment: &quot;Awesome breakdown!&quot;
                      </p>
                      <span className="text-[10px] text-neutral-400">5 hours ago</span>
                    </div>
                  </div>

                  <div 
                    onClick={() => {
                      setShowNotifications(false);
                      playVideo('v-mkbhd-vision-pro');
                    }}
                    className="flex gap-3 p-3 hover:bg-neutral-700/50 cursor-pointer transition"
                  >
                    <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center font-bold text-white text-[10px] shrink-0">
                      MKBHD
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-neutral-200 line-clamp-2">
                        <strong className="text-white">Marques Brownlee</strong> uploaded: Apple Vision Pro Full Review
                      </p>
                      <span className="text-[10px] text-neutral-400">1 day ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile User Menu */}
          <div ref={userMenuRef} className="relative">
            <button
              onClick={() => setShowUserMenu(prev => !prev)}
              className="w-8 h-8 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-transparent hover:ring-red-500 transition cursor-pointer"
            >
              U
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-[#282828] rounded-2xl shadow-2xl border border-neutral-700/70 py-2 z-50 animate-in fade-in duration-150 text-neutral-200">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-700/60">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    U
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">YouTube User</p>
                    <p className="text-xs text-neutral-400 truncate">@user_youtube</p>
                  </div>
                </div>

                <div className="py-1 border-b border-neutral-700/60">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      toggleTheme();
                    }}
                    className="flex items-center justify-between w-full px-4 py-2 text-xs hover:bg-neutral-700/60 text-left transition"
                  >
                    <div className="flex items-center gap-3">
                      {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
                      <span>Appearance: {theme === 'dark' ? 'Dark' : 'Light'}</span>
                    </div>
                    <Check className="w-3.5 h-3.5 text-neutral-400" />
                  </button>

                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      setShowKeyboardModal(true);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-xs hover:bg-neutral-700/60 text-left transition"
                  >
                    <Keyboard className="w-4 h-4" />
                    <span>Keyboard shortcuts</span>
                  </button>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      setView('history');
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-xs hover:bg-neutral-700/60 text-left transition"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings &amp; History</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      setShowAddVideoModal(true);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-xs hover:bg-neutral-700/60 text-left transition"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>Add Video or Help</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Modals */}
      <VoiceSearchModal isOpen={showVoiceModal} onClose={() => setShowVoiceModal(false)} />
      <AddVideoModal isOpen={showAddVideoModal} onClose={() => setShowAddVideoModal(false)} />
      <KeyboardShortcutsModal isOpen={showKeyboardModal} onClose={() => setShowKeyboardModal(false)} />
    </>
  );
};
