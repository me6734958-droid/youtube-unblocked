import React, { createContext, useContext, useState, useEffect } from 'react';
import { Video, Channel, Playlist, HistoryItem, ViewMode, VideoComment, ProxyProvider, ProxyServerStatus } from '../types/youtube';
import { INITIAL_VIDEOS, INITIAL_SHORTS, INITIAL_CHANNELS } from '../data/mockVideos';

interface YouTubeContextType {
  videos: Video[];
  shorts: Video[];
  channels: Channel[];
  currentVideo: Video | null;
  currentShortIndex: number;
  view: ViewMode;
  searchQuery: string;
  selectedCategory: string;
  sidebarCollapsed: boolean;
  theme: 'dark' | 'light';
  likedVideoIds: string[];
  dislikedVideoIds: string[];
  watchLaterIds: string[];
  subscribedChannelIds: string[];
  history: HistoryItem[];
  playlists: Playlist[];
  theaterMode: boolean;
  miniplayerVideo: Video | null;
  activeChannel: Channel | null;
  
  // Proxy state & methods
  proxyEnabled: boolean;
  proxyProvider: ProxyProvider;
  proxyStatus: ProxyServerStatus;
  useImageProxy: boolean;
  setProxyEnabled: (enabled: boolean) => void;
  setProxyProvider: (provider: ProxyProvider) => void;
  setUseImageProxy: (use: boolean) => void;
  checkProxyHealth: () => Promise<void>;
  getProxiedImageUrl: (url: string) => string;
  searchYouTubeLive: (query: string, type?: 'all' | 'video' | 'short') => Promise<Video[]>;
  fetchShortsLive: (topic?: string) => Promise<Video[]>;
  fetchVideoInfoProxy: (id: string) => Promise<{ title: string; authorName: string; thumbnailUrl: string } | null>;
  getProxyEmbedUrl: (videoId: string, options?: { autoplay?: boolean; quality?: string }) => string;
  
  // Actions
  setView: (view: ViewMode) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleTheme: () => void;
  setTheaterMode: (theater: boolean) => void;
  setMiniplayerVideo: (video: Video | null) => void;
  setCurrentShortIndex: (index: number) => void;
  
  // Video actions
  playVideo: (videoOrId: Video | string) => void;
  openChannel: (channelId: string) => void;
  toggleLikeVideo: (videoId: string) => void;
  toggleDislikeVideo: (videoId: string) => void;
  toggleWatchLater: (videoId: string) => void;
  toggleSubscribe: (channelId: string) => void;
  addComment: (videoId: string, text: string) => void;
  addCommentReply: (videoId: string, commentId: string, text: string) => void;
  likeComment: (videoId: string, commentId: string) => void;
  createPlaylist: (title: string, description?: string, isPrivate?: boolean) => Playlist;
  toggleVideoInPlaylist: (playlistId: string, videoId: string) => void;
  clearHistory: () => void;
  removeHistoryItem: (videoId: string) => void;
  addCustomVideo: (data: { urlOrId: string; title: string; category?: string; description?: string; channelName?: string }) => Video;
  extractYouTubeId: (urlOrId: string) => string;
  playShort: (urlOrId: string) => void;
}

const YouTubeContext = createContext<YouTubeContextType | undefined>(undefined);

export function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return '';
  const clean = urlOrId.trim();
  // Check for shorts URL pattern first: youtube.com/shorts/<id>
  const shortsMatch = clean.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch && shortsMatch[1]) {
    return shortsMatch[1];
  }
  // If it's already an 11 char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) {
    return clean;
  }
  // If it's a URL
  try {
    const urlObj = new URL(clean.startsWith('http') ? clean : `https://${clean}`);
    if (urlObj.hostname.includes('youtube.com')) {
      const v = urlObj.searchParams.get('v');
      if (v) return v;
      const pathParts = urlObj.pathname.split('/').filter(Boolean);
      if (pathParts[0] === 'embed' || pathParts[0] === 'shorts' || pathParts[0] === 'v' || pathParts[0] === 'live') {
        return pathParts[1] || '';
      }
    } else if (urlObj.hostname.includes('youtu.be')) {
      return urlObj.pathname.replace('/', '') || '';
    }
  } catch {
    // Regex fallback
    const match = clean.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|live\/))([a-zA-Z0-9_-]{11})/);
    if (match && match[1]) {
      return match[1];
    }
  }
  return clean.slice(0, 11);
}

export const YouTubeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local storage keys
  const STORAGE_VIDEOS = 'yt_videos_v3';
  const STORAGE_LIKES = 'yt_liked_v1';
  const STORAGE_DISLIKES = 'yt_disliked_v1';
  const STORAGE_WATCH_LATER = 'yt_watch_later_v1';
  const STORAGE_SUBSCRIPTIONS = 'yt_subs_v1';
  const STORAGE_HISTORY = 'yt_history_v1';
  const STORAGE_PLAYLISTS = 'yt_playlists_v1';
  const STORAGE_THEME = 'yt_theme_v1';
  const STORAGE_PROXY_ENABLED = 'yt_proxy_enabled_v1';
  const STORAGE_PROXY_PROVIDER = 'yt_proxy_provider_v1';
  const STORAGE_IMAGE_PROXY = 'yt_image_proxy_v1';

  const [proxyEnabled, setProxyEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PROXY_ENABLED);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [proxyProvider, setProxyProvider] = useState<ProxyProvider>(() => {
    try {
      return (localStorage.getItem(STORAGE_PROXY_PROVIDER) as ProxyProvider) || 'internal';
    } catch {
      return 'internal';
    }
  });

  const [useImageProxy, setUseImageProxy] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_IMAGE_PROXY);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [proxyStatus, setProxyStatus] = useState<ProxyServerStatus>({
    online: true,
    pingMs: 24,
    provider: 'internal',
    activeUpstreams: ['YouTube Official oEmbed', 'Invidious Mirror', 'Piped CDN'],
    features: ['live-search', 'suggestions', 'unblocked-embeds', 'image-proxy'],
  });

  const [videos, setVideos] = useState<Video[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_VIDEOS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return INITIAL_VIDEOS;
  });

  const [shorts, setShorts] = useState<Video[]>(INITIAL_SHORTS);
  const [channels, setChannels] = useState<Channel[]>(INITIAL_CHANNELS);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [currentShortIndex, setCurrentShortIndex] = useState<number>(0);
  const [view, setView] = useState<ViewMode>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [theaterMode, setTheaterMode] = useState<boolean>(false);
  const [miniplayerVideo, setMiniplayerVideo] = useState<Video | null>(null);
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      return (localStorage.getItem(STORAGE_THEME) as 'dark' | 'light') || 'dark';
    } catch {
      return 'dark';
    }
  });

  const [likedVideoIds, setLikedVideoIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_LIKES) || '["v-gta6"]');
    } catch {
      return ['v-gta6'];
    }
  });

  const [dislikedVideoIds, setDislikedVideoIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_DISLIKES) || '[]');
    } catch {
      return [];
    }
  });

  const [watchLaterIds, setWatchLaterIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_WATCH_LATER) || '["v-fireship-js"]');
    } catch {
      return ['v-fireship-js'];
    }
  });

  const [subscribedChannelIds, setSubscribedChannelIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_SUBSCRIPTIONS) || '["fireship", "mkbhd", "lofigirl"]');
    } catch {
      return ['fireship', 'mkbhd', 'lofigirl'];
    }
  });

  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_HISTORY) || '[]');
    } catch {
      return [];
    }
  });

  const [playlists, setPlaylists] = useState<Playlist[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PLAYLISTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Default initial playlists
    }
    return [
      {
        id: 'pl-favorites',
        title: 'Favorites',
        description: 'My favorite videos on YouTube',
        videoIds: ['v-gta6', 'v-queen-bohemian', 'v-lofi-beats'],
        thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
        updatedAt: 'Yesterday',
        isPrivate: false,
        itemCount: 3,
      },
      {
        id: 'pl-coding',
        title: 'Learn Code Fast',
        description: 'Frontend, JavaScript, and Web Development masterclasses',
        videoIds: ['v-fireship-js', 'v-react-100s'],
        thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
        updatedAt: '2 days ago',
        isPrivate: true,
        itemCount: 2,
      }
    ];
  });

  // Persist state updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_VIDEOS, JSON.stringify(videos));
    } catch (e) {
      console.warn(e);
    }
  }, [videos]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_LIKES, JSON.stringify(likedVideoIds));
    } catch (e) {
      console.warn(e);
    }
  }, [likedVideoIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_DISLIKES, JSON.stringify(dislikedVideoIds));
    } catch (e) {
      console.warn(e);
    }
  }, [dislikedVideoIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_WATCH_LATER, JSON.stringify(watchLaterIds));
    } catch (e) {
      console.warn(e);
    }
  }, [watchLaterIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SUBSCRIPTIONS, JSON.stringify(subscribedChannelIds));
    } catch (e) {
      console.warn(e);
    }
  }, [subscribedChannelIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_HISTORY, JSON.stringify(history));
    } catch (e) {
      console.warn(e);
    }
  }, [history]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PLAYLISTS, JSON.stringify(playlists));
    } catch (e) {
      console.warn(e);
    }
  }, [playlists]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_THEME, theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.body.classList.remove('bg-white', 'text-[#0f0f0f]');
        document.body.classList.add('bg-[#0f0f0f]', 'text-[#f1f1f1]');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('bg-[#0f0f0f]', 'text-[#f1f1f1]');
        document.body.classList.add('bg-white', 'text-[#0f0f0f]');
      }
    } catch (e) {
      console.warn(e);
    }
  }, [theme]);

  // Proxy persistence
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PROXY_ENABLED, JSON.stringify(proxyEnabled));
    } catch (e) {
      console.warn(e);
    }
  }, [proxyEnabled]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PROXY_PROVIDER, proxyProvider);
    } catch (e) {
      console.warn(e);
    }
  }, [proxyProvider]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_IMAGE_PROXY, JSON.stringify(useImageProxy));
    } catch (e) {
      console.warn(e);
    }
  }, [useImageProxy]);

  // Ping proxy server on start and when provider changes
  const checkProxyHealth = async () => {
    const start = performance.now();
    try {
      const res = await fetch('/api/proxy/status');
      if (res.ok) {
        const data = await res.json();
        const latency = Math.round(performance.now() - start);
        setProxyStatus({
          online: true,
          pingMs: latency,
          provider: proxyProvider,
          activeUpstreams: data.upstreams
            ? data.upstreams.map((u: { name: string }) => u.name)
            : ['YouTube Official', 'Invidious Mirror'],
          uptime: data.uptime,
          features: data.features,
        });
        return;
      }
    } catch {
      // Offline fallback
    }
    setProxyStatus(prev => ({ ...prev, online: false, pingMs: null }));
  };

  useEffect(() => {
    checkProxyHealth();
  }, [proxyProvider]);

  const getProxiedImageUrl = (url: string): string => {
    if (!url) return '';
    if (!proxyEnabled || !useImageProxy) return url;
    if (url.startsWith('/api/proxy/image') || url.startsWith('data:') || url.startsWith('/')) return url;
    if (url.includes('ytimg.com') || url.includes('ggpht.com') || url.includes('googleusercontent.com')) {
      return `/api/proxy/image?url=${encodeURIComponent(url)}`;
    }
    return url;
  };

  const getProxyEmbedUrl = (videoId: string, options?: { autoplay?: boolean; quality?: string }): string => {
    const autoplay = options?.autoplay !== false ? '1' : '0';
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${autoplay}&rel=0&modestbranding=1&enablejsapi=1`;
  };

  const searchYouTubeLive = async (query: string, type: 'all' | 'video' | 'short' = 'all'): Promise<Video[]> => {
    if (!query.trim()) return [];
    try {
      const res = await fetch(`/api/proxy/search?q=${encodeURIComponent(query)}&type=${type}`);
      if (res.ok) {
        const data = await res.json();
        if (data.results && Array.isArray(data.results)) {
          setVideos(prev => {
            const existingIds = new Set(prev.map(v => v.youtubeId));
            const newOnes = data.results.filter((v: Video) => !existingIds.has(v.youtubeId));
            return newOnes.length > 0 ? [...newOnes, ...prev] : prev;
          });
          return data.results;
        }
      }
    } catch (e) {
      console.warn('Proxy search error', e);
    }
    return [];
  };

  const fetchShortsLive = async (topic = 'trending shorts'): Promise<Video[]> => {
    try {
      const res = await fetch(`/api/proxy/shorts?topic=${encodeURIComponent(topic)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.shorts && Array.isArray(data.shorts) && data.shorts.length > 0) {
          setShorts(prev => {
            const existing = new Set(prev.map(s => s.youtubeId));
            const fresh = data.shorts.filter((s: Video) => !existing.has(s.youtubeId));
            return fresh.length > 0 ? [...fresh, ...prev] : prev;
          });
          return data.shorts;
        }
      }
    } catch (e) {
      console.warn('Proxy shorts fetch error', e);
    }
    return [];
  };

  const fetchVideoInfoProxy = async (id: string): Promise<{ title: string; authorName: string; thumbnailUrl: string } | null> => {
    try {
      const res = await fetch(`/api/proxy/video-info?id=${encodeURIComponent(id)}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Proxy video-info error', e);
    }
    return null;
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  const playShort = (urlOrId: string) => {
    const extractedId = extractYouTubeId(urlOrId);
    if (!extractedId) return;

    let idx = shorts.findIndex(s => s.youtubeId === extractedId || s.id === urlOrId);
    if (idx === -1) {
      const newShort: Video = {
        id: `short-${extractedId}`,
        youtubeId: extractedId,
        title: `YouTube Short (${extractedId})`,
        description: `Watching official YouTube Short ID ${extractedId}`,
        channelName: 'Shorts Creator',
        channelId: 'shorts-creator',
        channelAvatar: `https://i.ytimg.com/vi/${extractedId}/hqdefault.jpg`,
        subscribersCount: '2.4M',
        verified: true,
        views: 14200000,
        viewsFormatted: '14.2M',
        uploadedAt: 'Recently',
        duration: '0:45',
        durationSeconds: 45,
        category: 'Shorts',
        tags: ['shorts', 'trending', 'youtube'],
        thumbnailUrl: `https://i.ytimg.com/vi/${extractedId}/hqdefault.jpg`,
        likes: 840000,
        commentsCount: 5200,
        isShort: true,
        soundTrack: 'Original Sound - YouTube Shorts',
        comments: [
          {
            id: `sc-dyn-${Date.now()}`,
            author: 'ShortsFan',
            authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
            text: 'Such a good short! 🔥',
            likes: 642,
            timestamp: 'Just now'
          }
        ]
      };
      setShorts(prev => [newShort, ...prev]);
      setCurrentShortIndex(0);
    } else {
      setCurrentShortIndex(idx);
    }

    setMiniplayerVideo(null);
    setView('shorts');
  };

  const playVideo = (videoOrId: Video | string) => {
    if (typeof videoOrId === 'string' && videoOrId.includes('/shorts/')) {
      playShort(videoOrId);
      return;
    }

    let targetVideo: Video | undefined;

    if (typeof videoOrId === 'string') {
      const extractedId = extractYouTubeId(videoOrId);
      targetVideo = videos.find(v => v.id === videoOrId || v.youtubeId === extractedId);
      if (!targetVideo) {
        // Create an on-the-fly video instance for this YouTube ID
        targetVideo = {
          id: `custom-${extractedId}`,
          youtubeId: extractedId,
          title: `YouTube Video (${extractedId})`,
          description: `Playing YouTube video ID: ${extractedId}. You can watch, like, comment, and add it to your playlists.`,
          channelName: 'YouTube Creator',
          channelId: 'yt-creator',
          channelAvatar: `https://i.ytimg.com/vi/${extractedId}/hqdefault.jpg`,
          subscribersCount: '1.2M',
          verified: true,
          views: 1250000,
          viewsFormatted: '1.2M',
          uploadedAt: 'Recently',
          duration: '10:00',
          durationSeconds: 600,
          category: 'All',
          tags: ['YouTube', 'Video'],
          thumbnailUrl: `https://i.ytimg.com/vi/${extractedId}/hqdefault.jpg`,
          likes: 45000,
          commentsCount: 312,
          comments: []
        };
        setVideos(prev => [targetVideo!, ...prev]);
      }
    } else {
      targetVideo = videoOrId;
    }

    setCurrentVideo(targetVideo);
    setMiniplayerVideo(null);
    setView('watch');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update history
    setHistory(prev => {
      const filtered = prev.filter(h => h.videoId !== targetVideo!.id);
      return [{ videoId: targetVideo!.id, watchedAt: Date.now(), progressPercent: 15 }, ...filtered];
    });
  };

  const openChannel = (channelId: string) => {
    let ch = channels.find(
      c =>
        c.id === channelId ||
        c.handle.toLowerCase() === channelId.toLowerCase() ||
        c.name.toLowerCase() === channelId.toLowerCase()
    );

    if (!ch) {
      // Find a video with this channelId or channelName to borrow avatar & metadata
      const sampleVid = videos.find(
        v =>
          v.channelId === channelId ||
          v.channelName.toLowerCase() === channelId.toLowerCase()
      );

      const name = sampleVid ? sampleVid.channelName : channelId.replace(/^@/, '');
      const cleanHandle = `@${name.toLowerCase().replace(/[^a-z0-9_]/g, '')}`;

      ch = {
        id: channelId,
        name,
        handle: cleanHandle,
        avatar:
          sampleVid?.channelAvatar ||
          `https://i.ytimg.com/vi/${sampleVid?.youtubeId || 'dQw4w9WgXcQ'}/hqdefault.jpg`,
        banner: sampleVid?.thumbnailUrl || 'https://i.ytimg.com/vi/QdBZY2fkU-0/maxresdefault.jpg',
        subscribers: sampleVid?.subscribersCount || '2.4M subscribers',
        videosCount: videos.filter(v => v.channelId === channelId || v.channelName === name).length || 28,
        description: `Welcome to the official ${name} channel on YouTube. Watch all videos, shorts, and releases.`,
        joinedDate: 'Jan 15, 2018',
        verified: true,
        featuredVideoId: sampleVid?.youtubeId,
      };

      setChannels(prev => [...prev, ch!]);
    }

    setActiveChannel(ch);
    setView('channel');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLikeVideo = (videoId: string) => {
    setLikedVideoIds(prev => {
      const isLiked = prev.includes(videoId);
      if (isLiked) {
        return prev.filter(id => id !== videoId);
      } else {
        // Also remove from disliked
        setDislikedVideoIds(d => d.filter(id => id !== videoId));
        return [...prev, videoId];
      }
    });

    // Update video like count
    setVideos(prev => prev.map(v => {
      if (v.id === videoId) {
        const wasLiked = likedVideoIds.includes(videoId);
        return {
          ...v,
          likes: wasLiked ? v.likes - 1 : v.likes + 1
        };
      }
      return v;
    }));
  };

  const toggleDislikeVideo = (videoId: string) => {
    setDislikedVideoIds(prev => {
      const isDisliked = prev.includes(videoId);
      if (isDisliked) {
        return prev.filter(id => id !== videoId);
      } else {
        // Also remove from liked
        setLikedVideoIds(l => l.filter(id => id !== videoId));
        return [...prev, videoId];
      }
    });
  };

  const toggleWatchLater = (videoId: string) => {
    setWatchLaterIds(prev => {
      if (prev.includes(videoId)) {
        return prev.filter(id => id !== videoId);
      } else {
        return [...prev, videoId];
      }
    });
  };

  const toggleSubscribe = (channelId: string) => {
    setSubscribedChannelIds(prev => {
      if (prev.includes(channelId)) {
        return prev.filter(id => id !== channelId);
      } else {
        return [...prev, channelId];
      }
    });
  };

  const addComment = (videoId: string, text: string) => {
    if (!text.trim()) return;
    const newComment: VideoComment = {
      id: `comm-${Date.now()}`,
      author: 'You',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      authorHandle: '@You',
      text: text.trim(),
      likes: 0,
      timestamp: 'Just now',
      replies: []
    };

    setVideos(prev => prev.map(v => {
      if (v.id === videoId) {
        return {
          ...v,
          commentsCount: v.commentsCount + 1,
          comments: [newComment, ...v.comments]
        };
      }
      return v;
    }));

    if (currentVideo && currentVideo.id === videoId) {
      setCurrentVideo(prev => prev ? {
        ...prev,
        commentsCount: prev.commentsCount + 1,
        comments: [newComment, ...prev.comments]
      } : null);
    }
  };

  const addCommentReply = (videoId: string, commentId: string, text: string) => {
    if (!text.trim()) return;
    const reply = {
      id: `reply-${Date.now()}`,
      author: 'You',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      authorHandle: '@You',
      text: text.trim(),
      likes: 0,
      timestamp: 'Just now'
    };

    const updateComments = (comments: VideoComment[]) =>
      comments.map(c => {
        if (c.id === commentId) {
          return {
            ...c,
            replies: [...(c.replies || []), reply]
          };
        }
        return c;
      });

    setVideos(prev => prev.map(v => {
      if (v.id === videoId) {
        return {
          ...v,
          comments: updateComments(v.comments)
        };
      }
      return v;
    }));

    if (currentVideo && currentVideo.id === videoId) {
      setCurrentVideo(prev => prev ? {
        ...prev,
        comments: updateComments(prev.comments)
      } : null);
    }
  };

  const likeComment = (videoId: string, commentId: string) => {
    const updateComments = (comments: VideoComment[]) =>
      comments.map(c => {
        if (c.id === commentId) {
          const isLiked = c.isLiked;
          return {
            ...c,
            isLiked: !isLiked,
            likes: isLiked ? c.likes - 1 : c.likes + 1
          };
        }
        return c;
      });

    setVideos(prev => prev.map(v => {
      if (v.id === videoId) {
        return {
          ...v,
          comments: updateComments(v.comments)
        };
      }
      return v;
    }));

    if (currentVideo && currentVideo.id === videoId) {
      setCurrentVideo(prev => prev ? {
        ...prev,
        comments: updateComments(prev.comments)
      } : null);
    }
  };

  const createPlaylist = (title: string, description: string = '', isPrivate: boolean = false): Playlist => {
    const newPl: Playlist = {
      id: `pl-${Date.now()}`,
      title,
      description,
      isPrivate,
      videoIds: [],
      thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      updatedAt: 'Just now',
      itemCount: 0
    };
    setPlaylists(prev => [newPl, ...prev]);
    return newPl;
  };

  const toggleVideoInPlaylist = (playlistId: string, videoId: string) => {
    setPlaylists(prev => prev.map(pl => {
      if (pl.id === playlistId) {
        const exists = pl.videoIds.includes(videoId);
        const newIds = exists ? pl.videoIds.filter(id => id !== videoId) : [...pl.videoIds, videoId];
        // find thumbnail from first video
        const firstVid = videos.find(v => v.id === newIds[0]);
        return {
          ...pl,
          videoIds: newIds,
          itemCount: newIds.length,
          updatedAt: 'Just now',
          thumbnailUrl: firstVid ? firstVid.thumbnailUrl : pl.thumbnailUrl
        };
      }
      return pl;
    }));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const removeHistoryItem = (videoId: string) => {
    setHistory(prev => prev.filter(h => h.videoId !== videoId));
  };

  const addCustomVideo = (data: {
    urlOrId: string;
    title: string;
    category?: string;
    description?: string;
    channelName?: string;
  }): Video => {
    const extractedId = extractYouTubeId(data.urlOrId);
    const newVid: Video = {
      id: `custom-${Date.now()}`,
      youtubeId: extractedId,
      title: data.title || `Custom Video (${extractedId})`,
      description: data.description || 'Uploaded via YouTube Web Studio.',
      channelName: data.channelName || 'My Channel',
      channelId: 'my-channel',
      channelAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      subscribersCount: '1',
      verified: false,
      views: 1,
      viewsFormatted: '1 view',
      uploadedAt: 'Just now',
      duration: '10:00',
      durationSeconds: 600,
      category: data.category || 'All',
      tags: ['Custom', 'UserUpload'],
      thumbnailUrl: `https://i.ytimg.com/vi/${extractedId}/hqdefault.jpg`,
      likes: 1,
      commentsCount: 0,
      comments: []
    };

    setVideos(prev => [newVid, ...prev]);
    return newVid;
  };

  return (
    <YouTubeContext.Provider
      value={{
        videos,
        shorts,
        channels,
        currentVideo,
        currentShortIndex,
        view,
        searchQuery,
        selectedCategory,
        sidebarCollapsed,
        theme,
        likedVideoIds,
        dislikedVideoIds,
        watchLaterIds,
        subscribedChannelIds,
        history,
        playlists,
        theaterMode,
        miniplayerVideo,
        activeChannel,
        setView,
        setSearchQuery,
        setSelectedCategory,
        toggleSidebar,
        setSidebarCollapsed,
        toggleTheme,
        setTheaterMode,
        setMiniplayerVideo,
        setCurrentShortIndex,
        playVideo,
        openChannel,
        toggleLikeVideo,
        toggleDislikeVideo,
        toggleWatchLater,
        toggleSubscribe,
        addComment,
        addCommentReply,
        likeComment,
        createPlaylist,
        toggleVideoInPlaylist,
        clearHistory,
        removeHistoryItem,
        addCustomVideo,
        extractYouTubeId,
        playShort,
        // Proxy properties
        proxyEnabled,
        proxyProvider,
        proxyStatus,
        useImageProxy,
        setProxyEnabled,
        setProxyProvider,
        setUseImageProxy,
        checkProxyHealth,
        getProxiedImageUrl,
        searchYouTubeLive,
        fetchShortsLive,
        fetchVideoInfoProxy,
        getProxyEmbedUrl
      }}
    >
      {children}
    </YouTubeContext.Provider>
  );
};

export const useYouTube = () => {
  const context = useContext(YouTubeContext);
  if (!context) {
    throw new Error('useYouTube must be used within a YouTubeProvider');
  }
  return context;
};
