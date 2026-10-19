export interface CommentReply {
  id: string;
  author: string;
  authorAvatar: string;
  authorHandle?: string;
  text: string;
  likes: number;
  timestamp: string;
  isLiked?: boolean;
}

export interface VideoComment {
  id: string;
  author: string;
  authorAvatar: string;
  authorHandle?: string;
  text: string;
  likes: number;
  timestamp: string;
  isPinned?: boolean;
  isCreatorHearted?: boolean;
  isLiked?: boolean;
  replies?: CommentReply[];
}

export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  channelName: string;
  channelId: string;
  channelAvatar: string;
  subscribersCount: string;
  verified: boolean;
  views: number;
  viewsFormatted: string;
  uploadedAt: string;
  duration: string;
  durationSeconds: number;
  category: string;
  tags: string[];
  thumbnailUrl: string;
  likes: number;
  commentsCount: number;
  comments: VideoComment[];
  isShort?: boolean;
  soundTrack?: string;
}

export interface Channel {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  banner: string;
  subscribers: string;
  videosCount: number;
  description: string;
  joinedDate: string;
  verified: boolean;
  featuredVideoId?: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  videoIds: string[];
  thumbnailUrl: string;
  updatedAt: string;
  isPrivate: boolean;
  itemCount: number;
}

export interface HistoryItem {
  videoId: string;
  watchedAt: number;
  progressPercent: number;
}

export type ViewMode = 
  | 'home'
  | 'watch'
  | 'shorts'
  | 'subscriptions'
  | 'history'
  | 'liked'
  | 'watchLater'
  | 'playlists'
  | 'trending'
  | 'search'
  | 'channel';

export type ProxyProvider = 'internal' | 'invidious' | 'piped' | 'direct';

export interface ProxyServerStatus {
  online: boolean;
  pingMs: number | null;
  provider: ProxyProvider;
  activeUpstreams: string[];
  uptime?: number;
  features?: string[];
}

