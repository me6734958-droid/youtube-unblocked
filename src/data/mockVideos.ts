import { Video, Channel } from '../types/youtube';

export const INITIAL_CHANNELS: Channel[] = [
  {
    "id": "mkbhd",
    "name": "Marques Brownlee",
    "handle": "@mkbhd",
    "avatar": "https://i.ytimg.com/vi/dtp6bRe6x3U/hqdefault.jpg",
    "banner": "https://i.ytimg.com/vi/scwlR0QHGOk/maxresdefault.jpg",
    "subscribers": "19.4M",
    "videosCount": 1640,
    "description": "Quality tech videos | YouTuber | Geek | Consumer Electronics. Explaining the newest hardware, smartphones, EVs, and wearable computing.",
    "joinedDate": "Mar 21, 2008",
    "verified": true,
    "featuredVideoId": "scwlR0QHGOk"
  },
  {
    "id": "mrbeast",
    "name": "MrBeast",
    "handle": "@MrBeast",
    "avatar": "https://i.ytimg.com/vi/0e3GPea1Tyg/hqdefault.jpg",
    "banner": "https://i.ytimg.com/vi/pe_ejTiIcSs/maxresdefault.jpg",
    "subscribers": "335M",
    "videosCount": 840,
    "description": "I want to make the world a better place before I die. Giving away millions, building houses, and creating the biggest shows on the planet.",
    "joinedDate": "Feb 19, 2012",
    "verified": true,
    "featuredVideoId": "0e3GPea1Tyg"
  },
  {
    "id": "fireship",
    "name": "Fireship",
    "handle": "@fireship",
    "avatar": "https://i.ytimg.com/vi/Tn6-PIqc4UM/hqdefault.jpg",
    "banner": "https://i.ytimg.com/vi/cuHDQhDhvPE/maxresdefault.jpg",
    "subscribers": "3.5M",
    "videosCount": 650,
    "description": "High-intensity code tutorials and tech news to help you ship software faster. JavaScript, Python, Rust, and web dev in 100 seconds.",
    "joinedDate": "Oct 28, 2017",
    "verified": true,
    "featuredVideoId": "Tn6-PIqc4UM"
  },
  {
    "id": "lofigirl",
    "name": "Lofi Girl",
    "handle": "@LofiGirl",
    "avatar": "https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg",
    "banner": "https://i.ytimg.com/vi/jfKfPfyJRdk/maxresdefault.jpg",
    "subscribers": "14.5M",
    "videosCount": 1200,
    "description": "Peaceful lofi hip hop radio to help you relax, study, and focus 24/7. Join our global cozy community of learners and music lovers.",
    "joinedDate": "Mar 18, 2015",
    "verified": true,
    "featuredVideoId": "jfKfPfyJRdk"
  },
  {
    "id": "kurzgesagt",
    "name": "Kurzgesagt – In a Nutshell",
    "handle": "@kurzgesagt",
    "avatar": "https://i.ytimg.com/vi/wNDGgL73ihY/hqdefault.jpg",
    "banner": "https://i.ytimg.com/vi/pjoQdz0nxf4/maxresdefault.jpg",
    "subscribers": "22.8M",
    "videosCount": 230,
    "description": "Videos explaining things with optimistic nihilism. We are a small team who want to make science look beautiful. Because it is beautiful.",
    "joinedDate": "Jul 9, 2013",
    "verified": true,
    "featuredVideoId": "wNDGgL73ihY"
  },
  {
    "id": "rockstargames",
    "name": "Rockstar Games",
    "handle": "@rockstargames",
    "avatar": "https://i.ytimg.com/vi/QdBZY2fkU-0/hqdefault.jpg",
    "banner": "https://i.ytimg.com/vi/QdBZY2fkU-0/maxresdefault.jpg",
    "subscribers": "11.2M",
    "videosCount": 340,
    "description": "Official YouTube channel for Rockstar Games, creators of Grand Theft Auto, Red Dead Redemption, and more.",
    "joinedDate": "Nov 6, 2005",
    "verified": true,
    "featuredVideoId": "QdBZY2fkU-0"
  },
  {
    "id": "playstation",
    "name": "PlayStation",
    "handle": "@PlayStation",
    "avatar": "https://i.ytimg.com/vi/u83VdXAVq08/hqdefault.jpg",
    "banner": "https://i.ytimg.com/vi/nq1M_Wc4FIc/maxresdefault.jpg",
    "subscribers": "16.1M",
    "videosCount": 8200,
    "description": "Welcome to the official home of PlayStation on YouTube. Watch game trailers, behind-the-scenes features, and livestreams.",
    "joinedDate": "Dec 12, 2005",
    "verified": true,
    "featuredVideoId": "u83VdXAVq08"
  },
  {
    "id": "comedycentral",
    "name": "Comedy Central",
    "handle": "@ComedyCentral",
    "avatar": "https://i.ytimg.com/vi/Dd7FixvoKBw/hqdefault.jpg",
    "banner": "https://i.ytimg.com/vi/5LGEiIL1__s/maxresdefault.jpg",
    "subscribers": "12.5M",
    "videosCount": 4500,
    "description": "The official YouTube channel for Comedy Central, featuring Key & Peele, The Daily Show, South Park, and stand-up comedy specials.",
    "joinedDate": "Jan 15, 2006",
    "verified": true,
    "featuredVideoId": "Dd7FixvoKBw"
  }
];

export const INITIAL_VIDEOS: Video[] = [
  {
    "id": "video-1",
    "youtubeId": "0e3GPea1Tyg",
    "title": "$456,000 Squid Game In Real Life!",
    "description": "Recreating every single game from Squid Game in real life with 456 random players! Winner takes home $456,000 cash.",
    "channelName": "MrBeast",
    "channelId": "mrbeast",
    "channelAvatar": "https://i.ytimg.com/vi/0e3GPea1Tyg/hqdefault.jpg",
    "subscribersCount": "335M",
    "verified": true,
    "views": 654000000,
    "viewsFormatted": "654M views",
    "uploadedAt": "3 years ago",
    "duration": "25:41",
    "durationSeconds": 1541,
    "category": "Entertainment",
    "tags": [
      "mrbeast",
      "squid game",
      "challenge",
      "viral"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/0e3GPea1Tyg/hqdefault.jpg",
    "likes": 17200000,
    "commentsCount": 630000,
    "comments": [
      {
        "id": "c1-0e3GPea1Tyg",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-0e3GPea1Tyg",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-2",
    "youtubeId": "pe_ejTiIcSs",
    "title": "Lose 100 LBs, Win $250,000!",
    "description": "I challenged my friend to transform his health and life. Every single pound lost is rewarded with cash.",
    "channelName": "MrBeast",
    "channelId": "mrbeast",
    "channelAvatar": "https://i.ytimg.com/vi/0e3GPea1Tyg/hqdefault.jpg",
    "subscribersCount": "335M",
    "verified": true,
    "views": 286000000,
    "viewsFormatted": "286M views",
    "uploadedAt": "6 months ago",
    "duration": "36:50",
    "durationSeconds": 2210,
    "category": "Entertainment",
    "tags": [
      "mrbeast",
      "challenge",
      "fitness",
      "transformation"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/pe_ejTiIcSs/hqdefault.jpg",
    "likes": 8500000,
    "commentsCount": 180000,
    "comments": [
      {
        "id": "c1-pe_ejTiIcSs",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-pe_ejTiIcSs",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-3",
    "youtubeId": "scwlR0QHGOk",
    "title": "The NEW Tesla Roadster: My Honest Reaction",
    "description": "Breaking down the newest prototype specs, acceleration claims, and design changes of the long-awaited Tesla Roadster.",
    "channelName": "Marques Brownlee",
    "channelId": "mkbhd",
    "channelAvatar": "https://i.ytimg.com/vi/dtp6bRe6x3U/hqdefault.jpg",
    "subscribersCount": "19.4M",
    "verified": true,
    "views": 10060000,
    "viewsFormatted": "10M views",
    "uploadedAt": "1 month ago",
    "duration": "22:45",
    "durationSeconds": 1365,
    "category": "Technology",
    "tags": [
      "mkbhd",
      "tesla",
      "roadster",
      "tech",
      "electric vehicle"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/scwlR0QHGOk/hqdefault.jpg",
    "likes": 420000,
    "commentsCount": 18500,
    "comments": [
      {
        "id": "c1-scwlR0QHGOk",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-scwlR0QHGOk",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-4",
    "youtubeId": "ohqxP8EEumo",
    "title": "iPhone 18 Pro Review: All About that Chip",
    "description": "The complete deep dive into Apple silicon improvements, camera sensor upgrades, battery longevity, and real-world durability.",
    "channelName": "Marques Brownlee",
    "channelId": "mkbhd",
    "channelAvatar": "https://i.ytimg.com/vi/dtp6bRe6x3U/hqdefault.jpg",
    "subscribersCount": "19.4M",
    "verified": true,
    "views": 11720000,
    "viewsFormatted": "11M views",
    "uploadedAt": "2 weeks ago",
    "duration": "16:36",
    "durationSeconds": 996,
    "category": "Technology",
    "tags": [
      "mkbhd",
      "iphone",
      "apple",
      "smartphone",
      "review"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/ohqxP8EEumo/hqdefault.jpg",
    "likes": 560000,
    "commentsCount": 22000,
    "comments": [
      {
        "id": "c1-ohqxP8EEumo",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-ohqxP8EEumo",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-5",
    "youtubeId": "JzpUfRv45yY",
    "title": "The Worst Hot Takes in Tech",
    "description": "Reacting to the wildest predictions, misunderstandings, and debates across the consumer tech landscape.",
    "channelName": "Marques Brownlee",
    "channelId": "mkbhd",
    "channelAvatar": "https://i.ytimg.com/vi/dtp6bRe6x3U/hqdefault.jpg",
    "subscribersCount": "19.4M",
    "verified": true,
    "views": 4895000,
    "viewsFormatted": "4.8M views",
    "uploadedAt": "3 months ago",
    "duration": "14:30",
    "durationSeconds": 870,
    "category": "Technology",
    "tags": [
      "mkbhd",
      "hot takes",
      "technology",
      "gadgets"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/JzpUfRv45yY/hqdefault.jpg",
    "likes": 215000,
    "commentsCount": 9400,
    "comments": [
      {
        "id": "c1-JzpUfRv45yY",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-JzpUfRv45yY",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-6",
    "youtubeId": "hFZFjoX2cGg",
    "title": "Backyard Squirrel Maze 1.0 - Ninja Warrior",
    "description": "Building an absurd obstacle course in the backyard to see if neighborhood squirrels can complete a full Ninja Warrior challenge.",
    "channelName": "Mark Rober",
    "channelId": "markrober",
    "channelAvatar": "https://i.ytimg.com/vi/hFZFjoX2cGg/hqdefault.jpg",
    "subscribersCount": "62M",
    "verified": true,
    "views": 124000000,
    "viewsFormatted": "124M views",
    "uploadedAt": "4 years ago",
    "duration": "21:40",
    "durationSeconds": 1300,
    "category": "Science",
    "tags": [
      "mark rober",
      "squirrel",
      "engineering",
      "ninja warrior"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/hFZFjoX2cGg/hqdefault.jpg",
    "likes": 4600000,
    "commentsCount": 145000,
    "comments": [
      {
        "id": "c1-hFZFjoX2cGg",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-hFZFjoX2cGg",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-7",
    "youtubeId": "cuHDQhDhvPE",
    "title": "I built the same app 10 times // Which JS Framework is best?",
    "description": "Comparing React, Vue, Svelte, Angular, Solid, Qwik, Lit, HTMX, Alpine, and Vanilla JS in high-speed side-by-side benchmarks.",
    "channelName": "Fireship",
    "channelId": "fireship",
    "channelAvatar": "https://i.ytimg.com/vi/Tn6-PIqc4UM/hqdefault.jpg",
    "subscribersCount": "3.5M",
    "verified": true,
    "views": 3100000,
    "viewsFormatted": "3.1M views",
    "uploadedAt": "1 year ago",
    "duration": "12:24",
    "durationSeconds": 744,
    "category": "Coding",
    "tags": [
      "fireship",
      "javascript",
      "webdev",
      "frameworks"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/cuHDQhDhvPE/hqdefault.jpg",
    "likes": 185000,
    "commentsCount": 7800,
    "comments": [
      {
        "id": "c1-cuHDQhDhvPE",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-cuHDQhDhvPE",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-8",
    "youtubeId": "Tn6-PIqc4UM",
    "title": "React in 100 Seconds",
    "description": "A super fast overview of React.js, explaining JSX, virtual DOM, component lifecycles, and modern state hooks.",
    "channelName": "Fireship",
    "channelId": "fireship",
    "channelAvatar": "https://i.ytimg.com/vi/Tn6-PIqc4UM/hqdefault.jpg",
    "subscribersCount": "3.5M",
    "verified": true,
    "views": 2950000,
    "viewsFormatted": "2.9M views",
    "uploadedAt": "3 years ago",
    "duration": "2:25",
    "durationSeconds": 145,
    "category": "Coding",
    "tags": [
      "fireship",
      "react",
      "100 seconds",
      "code"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/Tn6-PIqc4UM/hqdefault.jpg",
    "likes": 142000,
    "commentsCount": 4200,
    "comments": [
      {
        "id": "c1-Tn6-PIqc4UM",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-Tn6-PIqc4UM",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-9",
    "youtubeId": "jfKfPfyJRdk",
    "title": "lofi hip hop radio 📚 beats to relax/study to",
    "description": "The legendary continuous 24/7 lofi broadcast streaming calming beats, peaceful animations, and study vibes for millions worldwide.",
    "channelName": "Lofi Girl",
    "channelId": "lofigirl",
    "channelAvatar": "https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg",
    "subscribersCount": "14.5M",
    "verified": true,
    "views": 198000000,
    "viewsFormatted": "198M views",
    "uploadedAt": "Streamed live",
    "duration": "LIVE",
    "durationSeconds": 7200,
    "category": "Music",
    "tags": [
      "lofi",
      "chill",
      "study",
      "music",
      "live"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg",
    "likes": 7400000,
    "commentsCount": 920000,
    "comments": [
      {
        "id": "c1-jfKfPfyJRdk",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-jfKfPfyJRdk",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-10",
    "youtubeId": "dQw4w9WgXcQ",
    "title": "Rick Astley - Never Gonna Give You Up (Official Music Video)",
    "description": "The official video for Never Gonna Give You Up by Rick Astley. Directed by Simon West. Over 1.6 Billion views of pure internet heritage.",
    "channelName": "Rick Astley",
    "channelId": "rickastley",
    "channelAvatar": "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    "subscribersCount": "4.8M",
    "verified": true,
    "views": 1620000000,
    "viewsFormatted": "1.6B views",
    "uploadedAt": "15 years ago",
    "duration": "3:33",
    "durationSeconds": 213,
    "category": "Music",
    "tags": [
      "rick astley",
      "never gonna give you up",
      "80s",
      "classic",
      "music"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    "likes": 18000000,
    "commentsCount": 2600000,
    "comments": [
      {
        "id": "c1-dQw4w9WgXcQ",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-dQw4w9WgXcQ",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-11",
    "youtubeId": "fJ9rUzIMcZQ",
    "title": "Queen – Bohemian Rhapsody (Official Video Remastered)",
    "description": "The official Bohemian Rhapsody video remastered in 4K HD. Originally released in 1975, celebrated as one of the greatest rock songs ever composed.",
    "channelName": "Queen Official",
    "channelId": "queenofficial",
    "channelAvatar": "https://i.ytimg.com/vi/fJ9rUzIMcZQ/hqdefault.jpg",
    "subscribersCount": "18M",
    "verified": true,
    "views": 1710000000,
    "viewsFormatted": "1.7B views",
    "uploadedAt": "16 years ago",
    "duration": "5:59",
    "durationSeconds": 359,
    "category": "Music",
    "tags": [
      "queen",
      "bohemian rhapsody",
      "freddie mercury",
      "rock",
      "classic"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/fJ9rUzIMcZQ/hqdefault.jpg",
    "likes": 14000000,
    "commentsCount": 980000,
    "comments": [
      {
        "id": "c1-fJ9rUzIMcZQ",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-fJ9rUzIMcZQ",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-12",
    "youtubeId": "kJQP7kiw5Fk",
    "title": "Luis Fonsi - Despacito ft. Daddy Yankee",
    "description": "Despacito performed by Luis Fonsi featuring Daddy Yankee. One of the most viewed YouTube videos in world history.",
    "channelName": "Luis Fonsi",
    "channelId": "luisfonsi",
    "channelAvatar": "https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg",
    "subscribersCount": "32M",
    "verified": true,
    "views": 8640000000,
    "viewsFormatted": "8.6B views",
    "uploadedAt": "8 years ago",
    "duration": "4:42",
    "durationSeconds": 282,
    "category": "Music",
    "tags": [
      "despacito",
      "luis fonsi",
      "daddy yankee",
      "latin",
      "music"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg",
    "likes": 54000000,
    "commentsCount": 4400000,
    "comments": [
      {
        "id": "c1-kJQP7kiw5Fk",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-kJQP7kiw5Fk",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-13",
    "youtubeId": "JGwWNGJdvx8",
    "title": "Ed Sheeran - Shape of You (Official Music Video)",
    "description": "The official music video for Ed Sheeran - Shape of You. Taken from the studio album ÷ (Divide).",
    "channelName": "Ed Sheeran",
    "channelId": "edsheeran",
    "channelAvatar": "https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg",
    "subscribersCount": "55M",
    "verified": true,
    "views": 6380000000,
    "viewsFormatted": "6.3B views",
    "uploadedAt": "7 years ago",
    "duration": "4:24",
    "durationSeconds": 264,
    "category": "Music",
    "tags": [
      "ed sheeran",
      "shape of you",
      "pop",
      "music"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg",
    "likes": 33000000,
    "commentsCount": 1200000,
    "comments": [
      {
        "id": "c1-JGwWNGJdvx8",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-JGwWNGJdvx8",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-14",
    "youtubeId": "YVkUvmDQ3HY",
    "title": "Eminem - Without Me (Official Music Video)",
    "description": "Official music video for Without Me by Eminem, remastered in HD. Featuring Rap Boy and Dr. Dre.",
    "channelName": "Eminem",
    "channelId": "eminem",
    "channelAvatar": "https://i.ytimg.com/vi/YVkUvmDQ3HY/hqdefault.jpg",
    "subscribersCount": "62M",
    "verified": true,
    "views": 2100000000,
    "viewsFormatted": "2.1B views",
    "uploadedAt": "15 years ago",
    "duration": "4:58",
    "durationSeconds": 298,
    "category": "Music",
    "tags": [
      "eminem",
      "without me",
      "hip hop",
      "rap"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/YVkUvmDQ3HY/hqdefault.jpg",
    "likes": 18000000,
    "commentsCount": 880000,
    "comments": [
      {
        "id": "c1-YVkUvmDQ3HY",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-YVkUvmDQ3HY",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-15",
    "youtubeId": "DyDfgMOUjCI",
    "title": "Billie Eilish - bad guy",
    "description": "Official music video for bad guy by Billie Eilish, taken from the debut album WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?",
    "channelName": "Billie Eilish",
    "channelId": "billieeilish",
    "channelAvatar": "https://i.ytimg.com/vi/DyDfgMOUjCI/hqdefault.jpg",
    "subscribersCount": "52M",
    "verified": true,
    "views": 1310000000,
    "viewsFormatted": "1.3B views",
    "uploadedAt": "6 years ago",
    "duration": "3:25",
    "durationSeconds": 205,
    "category": "Music",
    "tags": [
      "billie eilish",
      "bad guy",
      "pop",
      "alternative"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/DyDfgMOUjCI/hqdefault.jpg",
    "likes": 21000000,
    "commentsCount": 1100000,
    "comments": [
      {
        "id": "c1-DyDfgMOUjCI",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-DyDfgMOUjCI",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-16",
    "youtubeId": "4NRXx6U8ABQ",
    "title": "The Weeknd - Blinding Lights (Official Music Video)",
    "description": "Official music video for Blinding Lights performed by The Weeknd, from the record-breaking album After Hours.",
    "channelName": "The Weeknd",
    "channelId": "theweeknd",
    "channelAvatar": "https://i.ytimg.com/vi/4NRXx6U8ABQ/hqdefault.jpg",
    "subscribersCount": "36M",
    "verified": true,
    "views": 890000000,
    "viewsFormatted": "890M views",
    "uploadedAt": "5 years ago",
    "duration": "4:20",
    "durationSeconds": 260,
    "category": "Music",
    "tags": [
      "the weeknd",
      "blinding lights",
      "synthwave",
      "after hours"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/4NRXx6U8ABQ/hqdefault.jpg",
    "likes": 9800000,
    "commentsCount": 420000,
    "comments": [
      {
        "id": "c1-4NRXx6U8ABQ",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-4NRXx6U8ABQ",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-17",
    "youtubeId": "OPf0YbXqDm0",
    "title": "Mark Ronson - Uptown Funk (Official Video) ft. Bruno Mars",
    "description": "Uptown Funk by Mark Ronson featuring Bruno Mars. Certified 11x Diamond with over 5 Billion views.",
    "channelName": "Mark Ronson",
    "channelId": "markronson",
    "channelAvatar": "https://i.ytimg.com/vi/OPf0YbXqDm0/hqdefault.jpg",
    "subscribersCount": "11M",
    "verified": true,
    "views": 5410000000,
    "viewsFormatted": "5.4B views",
    "uploadedAt": "10 years ago",
    "duration": "4:30",
    "durationSeconds": 270,
    "category": "Music",
    "tags": [
      "uptown funk",
      "bruno mars",
      "mark ronson",
      "funk",
      "pop"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/OPf0YbXqDm0/hqdefault.jpg",
    "likes": 24000000,
    "commentsCount": 680000,
    "comments": [
      {
        "id": "c1-OPf0YbXqDm0",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-OPf0YbXqDm0",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-18",
    "youtubeId": "QdBZY2fkU-0",
    "title": "Grand Theft Auto VI Trailer 1",
    "description": "Official debut trailer for Grand Theft Auto VI. Welcome to Vice City and the state of Leonida. Coming to PlayStation 5 and Xbox Series X|S.",
    "channelName": "Rockstar Games",
    "channelId": "rockstargames",
    "channelAvatar": "https://i.ytimg.com/vi/QdBZY2fkU-0/hqdefault.jpg",
    "subscribersCount": "11.2M",
    "verified": true,
    "views": 228000000,
    "viewsFormatted": "228M views",
    "uploadedAt": "10 months ago",
    "duration": "1:31",
    "durationSeconds": 91,
    "category": "Gaming",
    "tags": [
      "gta 6",
      "rockstar games",
      "grand theft auto",
      "trailer",
      "vice city"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/QdBZY2fkU-0/hqdefault.jpg",
    "likes": 12100000,
    "commentsCount": 890000,
    "comments": [
      {
        "id": "c1-QdBZY2fkU-0",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-QdBZY2fkU-0",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-19",
    "youtubeId": "u83VdXAVq08",
    "title": "Black Myth: Wukong - Pre-Order CG Trailer | PS5 Games",
    "description": "Official CG reveal trailer for Black Myth: Wukong, showcasing breathtaking mythical Chinese mythology action and Unreal Engine 5 visuals.",
    "channelName": "PlayStation",
    "channelId": "playstation",
    "channelAvatar": "https://i.ytimg.com/vi/u83VdXAVq08/hqdefault.jpg",
    "subscribersCount": "16.1M",
    "verified": true,
    "views": 6400000,
    "viewsFormatted": "6.4M views",
    "uploadedAt": "4 months ago",
    "duration": "2:15",
    "durationSeconds": 135,
    "category": "Gaming",
    "tags": [
      "black myth wukong",
      "ps5",
      "action",
      "playstation",
      "gameplay"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/u83VdXAVq08/hqdefault.jpg",
    "likes": 290000,
    "commentsCount": 12500,
    "comments": [
      {
        "id": "c1-u83VdXAVq08",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-u83VdXAVq08",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-20",
    "youtubeId": "jSJr3dXZfcg",
    "title": "World of Warcraft: Battle for Azeroth Cinematic Trailer",
    "description": "For the Alliance! For the Horde! The iconic cinematic trailer showcasing the siege of Lordaeron, Sylvanas Windrunner, and Anduin Wrynn.",
    "channelName": "World of Warcraft",
    "channelId": "warcraft",
    "channelAvatar": "https://i.ytimg.com/vi/jSJr3dXZfcg/hqdefault.jpg",
    "subscribersCount": "3.8M",
    "verified": true,
    "views": 25400000,
    "viewsFormatted": "25M views",
    "uploadedAt": "6 years ago",
    "duration": "4:26",
    "durationSeconds": 266,
    "category": "Gaming",
    "tags": [
      "world of warcraft",
      "blizzard",
      "cinematic",
      "battle for azeroth"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/jSJr3dXZfcg/hqdefault.jpg",
    "likes": 670000,
    "commentsCount": 65000,
    "comments": [
      {
        "id": "c1-jSJr3dXZfcg",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-jSJr3dXZfcg",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-21",
    "youtubeId": "c7nRTF2SowQ",
    "title": "Battlefield 1 Official Reveal Trailer",
    "description": "Set to The White Stripes Seven Nation Army remix. Witness the dawn of all-out warfare in one of the most acclaimed gaming trailers in history.",
    "channelName": "Battlefield",
    "channelId": "battlefield",
    "channelAvatar": "https://i.ytimg.com/vi/c7nRTF2SowQ/hqdefault.jpg",
    "subscribersCount": "4.2M",
    "verified": true,
    "views": 74200000,
    "viewsFormatted": "74M views",
    "uploadedAt": "8 years ago",
    "duration": "1:59",
    "durationSeconds": 119,
    "category": "Gaming",
    "tags": [
      "battlefield 1",
      "dice",
      "ea",
      "trailer",
      "fps"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/c7nRTF2SowQ/hqdefault.jpg",
    "likes": 2300000,
    "commentsCount": 220000,
    "comments": [
      {
        "id": "c1-c7nRTF2SowQ",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-c7nRTF2SowQ",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-22",
    "youtubeId": "nq1M_Wc4FIc",
    "title": "Marvel's Spider-Man 2 - Be Greater. Together. Trailer I PS5 Games",
    "description": "Peter Parker and Miles Morales unite against Venom and Kraven the Hunter across an expanded New York City.",
    "channelName": "PlayStation",
    "channelId": "playstation",
    "channelAvatar": "https://i.ytimg.com/vi/u83VdXAVq08/hqdefault.jpg",
    "subscribersCount": "16.1M",
    "verified": true,
    "views": 18500000,
    "viewsFormatted": "18M views",
    "uploadedAt": "1 year ago",
    "duration": "2:40",
    "durationSeconds": 160,
    "category": "Gaming",
    "tags": [
      "spider-man 2",
      "marvel",
      "ps5",
      "playstation",
      "venom"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/nq1M_Wc4FIc/hqdefault.jpg",
    "likes": 680000,
    "commentsCount": 31000,
    "comments": [
      {
        "id": "c1-nq1M_Wc4FIc",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-nq1M_Wc4FIc",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-23",
    "youtubeId": "wNDGgL73ihY",
    "title": "The Beginning of Everything -- The Big Bang",
    "description": "How did the universe begin? What happened in the first picoseconds of cosmic expansion? An animated voyage through the dawn of spacetime.",
    "channelName": "Kurzgesagt – In a Nutshell",
    "channelId": "kurzgesagt",
    "channelAvatar": "https://i.ytimg.com/vi/wNDGgL73ihY/hqdefault.jpg",
    "subscribersCount": "22.8M",
    "verified": true,
    "views": 45000000,
    "viewsFormatted": "45M views",
    "uploadedAt": "9 years ago",
    "duration": "5:55",
    "durationSeconds": 355,
    "category": "Science",
    "tags": [
      "kurzgesagt",
      "big bang",
      "physics",
      "cosmology",
      "universe"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/wNDGgL73ihY/hqdefault.jpg",
    "likes": 1800000,
    "commentsCount": 74000,
    "comments": [
      {
        "id": "c1-wNDGgL73ihY",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-wNDGgL73ihY",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-24",
    "youtubeId": "pjoQdz0nxf4",
    "title": "How The Dinosaurs Actually Died",
    "description": "The asteroid impact 66 million years ago was far more catastrophic than just an explosion. Minute by minute analysis of what took place.",
    "channelName": "Kurzgesagt – In a Nutshell",
    "channelId": "kurzgesagt",
    "channelAvatar": "https://i.ytimg.com/vi/wNDGgL73ihY/hqdefault.jpg",
    "subscribersCount": "22.8M",
    "verified": true,
    "views": 29800000,
    "viewsFormatted": "29M views",
    "uploadedAt": "2 years ago",
    "duration": "11:42",
    "durationSeconds": 702,
    "category": "Science",
    "tags": [
      "kurzgesagt",
      "dinosaurs",
      "asteroid",
      "extinction",
      "science"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/pjoQdz0nxf4/hqdefault.jpg",
    "likes": 1400000,
    "commentsCount": 46000,
    "comments": [
      {
        "id": "c1-pjoQdz0nxf4",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-pjoQdz0nxf4",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-25",
    "youtubeId": "QAa2O_8wBUQ",
    "title": "What is Dark Matter and Dark Energy?",
    "description": "95% of our entire universe is made of stuff we cannot directly observe. Investigating the greatest cosmic mystery known to science.",
    "channelName": "Kurzgesagt – In a Nutshell",
    "channelId": "kurzgesagt",
    "channelAvatar": "https://i.ytimg.com/vi/wNDGgL73ihY/hqdefault.jpg",
    "subscribersCount": "22.8M",
    "verified": true,
    "views": 21500000,
    "viewsFormatted": "21M views",
    "uploadedAt": "8 years ago",
    "duration": "6:12",
    "durationSeconds": 372,
    "category": "Science",
    "tags": [
      "kurzgesagt",
      "dark matter",
      "dark energy",
      "astrophysics"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/QAa2O_8wBUQ/hqdefault.jpg",
    "likes": 950000,
    "commentsCount": 38000,
    "comments": [
      {
        "id": "c1-QAa2O_8wBUQ",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-QAa2O_8wBUQ",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-26",
    "youtubeId": "Dd7FixvoKBw",
    "title": "Substitute Teacher - Key & Peele",
    "description": "Mr. Garvey, an inner-city substitute teacher, takes attendance in a suburban classroom. Where is A-A-ron at?! Classic comedy sketch.",
    "channelName": "Comedy Central",
    "channelId": "comedycentral",
    "channelAvatar": "https://i.ytimg.com/vi/Dd7FixvoKBw/hqdefault.jpg",
    "subscribersCount": "12.5M",
    "verified": true,
    "views": 233000000,
    "viewsFormatted": "233M views",
    "uploadedAt": "11 years ago",
    "duration": "3:02",
    "durationSeconds": 182,
    "category": "Comedy",
    "tags": [
      "key and peele",
      "substitute teacher",
      "comedy",
      "sketch"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/Dd7FixvoKBw/hqdefault.jpg",
    "likes": 4100000,
    "commentsCount": 165000,
    "comments": [
      {
        "id": "c1-Dd7FixvoKBw",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-Dd7FixvoKBw",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-27",
    "youtubeId": "5LGEiIL1__s",
    "title": "Key & Peele - I Said Bitch",
    "description": "Two husbands travel out into the wilderness and the edge of space just to quietly express their feelings to each other.",
    "channelName": "Comedy Central",
    "channelId": "comedycentral",
    "channelAvatar": "https://i.ytimg.com/vi/Dd7FixvoKBw/hqdefault.jpg",
    "subscribersCount": "12.5M",
    "verified": true,
    "views": 66900000,
    "viewsFormatted": "66M views",
    "uploadedAt": "10 years ago",
    "duration": "4:18",
    "durationSeconds": 258,
    "category": "Comedy",
    "tags": [
      "key and peele",
      "comedy central",
      "funny",
      "marriage"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/5LGEiIL1__s/hqdefault.jpg",
    "likes": 1200000,
    "commentsCount": 41000,
    "comments": [
      {
        "id": "c1-5LGEiIL1__s",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-5LGEiIL1__s",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-28",
    "youtubeId": "b-KN6NyzpG0",
    "title": "LIONEL MESSI BRACE ⚽️⚽️ Atlanta United vs. Inter Miami | MLS Highlights",
    "description": "Lionel Messi scores two stunning goals and orchestrates the offense for Inter Miami in front of a packed stadium crowd.",
    "channelName": "ESPN FC",
    "channelId": "espnfc",
    "channelAvatar": "https://i.ytimg.com/vi/b-KN6NyzpG0/hqdefault.jpg",
    "subscribersCount": "5.4M",
    "verified": true,
    "views": 809000,
    "viewsFormatted": "809K views",
    "uploadedAt": "Recently",
    "duration": "3:11",
    "durationSeconds": 191,
    "category": "Sports",
    "tags": [
      "messi",
      "inter miami",
      "mls",
      "soccer",
      "espn"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/b-KN6NyzpG0/hqdefault.jpg",
    "likes": 48000,
    "commentsCount": 2200,
    "comments": [
      {
        "id": "c1-b-KN6NyzpG0",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-b-KN6NyzpG0",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-29",
    "youtubeId": "AWBTVCYHT3Q",
    "title": "Atlanta United vs. Inter Miami CF | Full Match Highlights",
    "description": "Full official match highlights of the thrilling playoff encounter featuring goals from Messi and world-class saves.",
    "channelName": "Major League Soccer",
    "channelId": "mls",
    "channelAvatar": "https://i.ytimg.com/vi/AWBTVCYHT3Q/hqdefault.jpg",
    "subscribersCount": "2.5M",
    "verified": true,
    "views": 2330000,
    "viewsFormatted": "2.3M views",
    "uploadedAt": "Recently",
    "duration": "10:03",
    "durationSeconds": 603,
    "category": "Sports",
    "tags": [
      "mls",
      "soccer",
      "football",
      "highlights"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/AWBTVCYHT3Q/hqdefault.jpg",
    "likes": 92000,
    "commentsCount": 3900,
    "comments": [
      {
        "id": "c1-AWBTVCYHT3Q",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-AWBTVCYHT3Q",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-30",
    "youtubeId": "B3OjfK0t1XM",
    "title": "Iguana chased by killer snakes | Planet Earth II",
    "description": "The greatest chase scene in documentary history. A marine iguana hatchling must run the gauntlet of racer snakes on Fernandina Island. Narrated by Sir David Attenborough.",
    "channelName": "BBC",
    "channelId": "bbc",
    "channelAvatar": "https://i.ytimg.com/vi/B3OjfK0t1XM/hqdefault.jpg",
    "subscribersCount": "15.2M",
    "verified": true,
    "views": 45000000,
    "viewsFormatted": "45M views",
    "uploadedAt": "7 years ago",
    "duration": "2:16",
    "durationSeconds": 136,
    "category": "Nature",
    "tags": [
      "bbc",
      "planet earth",
      "iguana",
      "snakes",
      "david attenborough"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/B3OjfK0t1XM/hqdefault.jpg",
    "likes": 1100000,
    "commentsCount": 52000,
    "comments": [
      {
        "id": "c1-B3OjfK0t1XM",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-B3OjfK0t1XM",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-31",
    "youtubeId": "WwA_7QyqtGI",
    "title": "UNREAL AMAZON – Nature’s Most Dangerous Paradise (Full Documentary)",
    "description": "Deep exploration into the remote tributaries, canopy layers, and predatory creatures of the Amazon basin rainforest.",
    "channelName": "Travpedia Wildlife",
    "channelId": "travpedia",
    "channelAvatar": "https://i.ytimg.com/vi/WwA_7QyqtGI/hqdefault.jpg",
    "subscribersCount": "890K",
    "verified": true,
    "views": 7160000,
    "viewsFormatted": "7.1M views",
    "uploadedAt": "1 year ago",
    "duration": "1:14:55",
    "durationSeconds": 4495,
    "category": "Nature",
    "tags": [
      "amazon",
      "documentary",
      "wildlife",
      "nature",
      "rainforest"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/WwA_7QyqtGI/hqdefault.jpg",
    "likes": 210000,
    "commentsCount": 5800,
    "comments": [
      {
        "id": "c1-WwA_7QyqtGI",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-WwA_7QyqtGI",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-32",
    "youtubeId": "jNQXAC9IVRw",
    "title": "Me at the zoo",
    "description": "The very first video ever uploaded to YouTube by co-founder Jawed Karim at the San Diego Zoo on April 23, 2005.",
    "channelName": "jawed",
    "channelId": "jawed",
    "channelAvatar": "https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg",
    "subscribersCount": "4.5M",
    "verified": true,
    "views": 326000000,
    "viewsFormatted": "326M views",
    "uploadedAt": "20 years ago",
    "duration": "0:19",
    "durationSeconds": 19,
    "category": "Entertainment",
    "tags": [
      "first video",
      "zoo",
      "jawed",
      "history",
      "youtube"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg",
    "likes": 16000000,
    "commentsCount": 11000000,
    "comments": [
      {
        "id": "c1-jNQXAC9IVRw",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-jNQXAC9IVRw",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-33",
    "youtubeId": "_OBlgSz8sSM",
    "title": "Charlie bit my finger - again !",
    "description": "Legendary home video of baby Charlie biting his older brother Harrys finger. Classic internet phenomenon.",
    "channelName": "HDCYT",
    "channelId": "hdcyt",
    "channelAvatar": "https://i.ytimg.com/vi/_OBlgSz8sSM/hqdefault.jpg",
    "subscribersCount": "2.4M",
    "verified": true,
    "views": 910000000,
    "viewsFormatted": "910M views",
    "uploadedAt": "17 years ago",
    "duration": "0:56",
    "durationSeconds": 56,
    "category": "Comedy",
    "tags": [
      "charlie bit my finger",
      "viral",
      "classic",
      "baby"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/_OBlgSz8sSM/hqdefault.jpg",
    "likes": 4200000,
    "commentsCount": 890000,
    "comments": [
      {
        "id": "c1-_OBlgSz8sSM",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-_OBlgSz8sSM",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-34",
    "youtubeId": "J---aiyznGQ",
    "title": "Keyboard Cat! - THE ORIGINAL!",
    "description": "Fatso the ginger cat wearing a blue shirt playing a jaunty tune on an electronic keyboard. Play him off, Keyboard Cat!",
    "channelName": "Keyboard Cat!",
    "channelId": "keyboardcat",
    "channelAvatar": "https://i.ytimg.com/vi/J---aiyznGQ/hqdefault.jpg",
    "subscribersCount": "780K",
    "verified": true,
    "views": 89000000,
    "viewsFormatted": "89M views",
    "uploadedAt": "16 years ago",
    "duration": "0:54",
    "durationSeconds": 54,
    "category": "Comedy",
    "tags": [
      "keyboard cat",
      "cat",
      "meme",
      "classic"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/J---aiyznGQ/hqdefault.jpg",
    "likes": 980000,
    "commentsCount": 95000,
    "comments": [
      {
        "id": "c1-J---aiyznGQ",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-J---aiyznGQ",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-35",
    "youtubeId": "dMH0bHeiRNg",
    "title": "Evolution of Dance",
    "description": "Comedian Judson Laipply performs 32 iconic dance moves through the eras from Elvis to Michael Jackson to Sir Mix-A-Lot.",
    "channelName": "Judson Laipply",
    "channelId": "judsonlaipply",
    "channelAvatar": "https://i.ytimg.com/vi/dMH0bHeiRNg/hqdefault.jpg",
    "subscribersCount": "490K",
    "verified": true,
    "views": 312000000,
    "viewsFormatted": "312M views",
    "uploadedAt": "18 years ago",
    "duration": "6:00",
    "durationSeconds": 360,
    "category": "Entertainment",
    "tags": [
      "evolution of dance",
      "viral",
      "dance",
      "classic"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/dMH0bHeiRNg/hqdefault.jpg",
    "likes": 1900000,
    "commentsCount": 170000,
    "comments": [
      {
        "id": "c1-dMH0bHeiRNg",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-dMH0bHeiRNg",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  },
  {
    "id": "video-36",
    "youtubeId": "21X5lGlDOfg",
    "title": "NASA Live: Official Stream of NASA TV",
    "description": "Direct livestream from the National Aeronautics and Space Administration featuring ISS space walks, Artemis coverage, and rocket launches.",
    "channelName": "NASA",
    "channelId": "nasa",
    "channelAvatar": "https://i.ytimg.com/vi/21X5lGlDOfg/hqdefault.jpg",
    "subscribersCount": "12M",
    "verified": true,
    "views": 95000000,
    "viewsFormatted": "95M views",
    "uploadedAt": "Streamed live",
    "duration": "LIVE",
    "durationSeconds": 7200,
    "category": "Science",
    "tags": [
      "nasa",
      "space",
      "iss",
      "artemis",
      "live"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/21X5lGlDOfg/hqdefault.jpg",
    "likes": 3800000,
    "commentsCount": 480000,
    "comments": [
      {
        "id": "c1-21X5lGlDOfg",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-21X5lGlDOfg",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": false
  }
];

export const INITIAL_SHORTS: Video[] = [
  {
    "id": "short-MxSog0rv5Lg",
    "youtubeId": "MxSog0rv5Lg",
    "title": "The Game of Life🎮 #shorts #funny #viral",
    "description": "When life choices look like a video game inventory screen.",
    "channelName": "ISSEI / いっせい",
    "channelId": "issei",
    "channelAvatar": "https://i.ytimg.com/vi/MxSog0rv5Lg/hqdefault.jpg",
    "subscribersCount": "38M",
    "verified": true,
    "views": 45000000,
    "viewsFormatted": "45M",
    "uploadedAt": "3 months ago",
    "duration": "0:35",
    "durationSeconds": 35,
    "category": "Comedy",
    "tags": [
      "shorts",
      "issei",
      "comedy",
      "viral"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/MxSog0rv5Lg/hqdefault.jpg",
    "likes": 3400000,
    "commentsCount": 28000,
    "comments": [
      {
        "id": "c1-MxSog0rv5Lg",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-MxSog0rv5Lg",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": true,
    "soundTrack": "Original Sound - ISSEI"
  },
  {
    "id": "short-VjEAO9Rum7s",
    "youtubeId": "VjEAO9Rum7s",
    "title": "Don’t forget these #relatablestories #comedy #shorts",
    "description": "Super relatable everyday awkward moments broken down with hilarious facial expressions.",
    "channelName": "Tyler Vitelli",
    "channelId": "tylervitelli",
    "channelAvatar": "https://i.ytimg.com/vi/VjEAO9Rum7s/hqdefault.jpg",
    "subscribersCount": "8.4M",
    "verified": true,
    "views": 32000000,
    "viewsFormatted": "32M",
    "uploadedAt": "5 months ago",
    "duration": "0:42",
    "durationSeconds": 42,
    "category": "Comedy",
    "tags": [
      "shorts",
      "relatable",
      "comedy"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/VjEAO9Rum7s/hqdefault.jpg",
    "likes": 2100000,
    "commentsCount": 19000,
    "comments": [
      {
        "id": "c1-VjEAO9Rum7s",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-VjEAO9Rum7s",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": true,
    "soundTrack": "Original Sound - Tyler Vitelli"
  },
  {
    "id": "short-PvLoExRm3TE",
    "youtubeId": "PvLoExRm3TE",
    "title": "Can You Escape This Rope Trick? 😲 #viral #shorts #fyp",
    "description": "The mind-bending rope puzzle demonstration that went viral on TikTok and YouTube.",
    "channelName": "Seoul Sueños",
    "channelId": "seoulsuenos",
    "channelAvatar": "https://i.ytimg.com/vi/PvLoExRm3TE/hqdefault.jpg",
    "subscribersCount": "1.2M",
    "verified": true,
    "views": 18000000,
    "viewsFormatted": "18M",
    "uploadedAt": "2 months ago",
    "duration": "0:28",
    "durationSeconds": 28,
    "category": "Entertainment",
    "tags": [
      "shorts",
      "puzzle",
      "magic",
      "trick"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/PvLoExRm3TE/hqdefault.jpg",
    "likes": 1200000,
    "commentsCount": 9400,
    "comments": [
      {
        "id": "c1-PvLoExRm3TE",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-PvLoExRm3TE",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": true,
    "soundTrack": "Dramatic Suspense Audio"
  },
  {
    "id": "short-SuvMDH_le6g",
    "youtubeId": "SuvMDH_le6g",
    "title": "When you and bro argue over nothing #meme #viral #shorts",
    "description": "The quintessential sibling or best friend argument over the most trivial detail.",
    "channelName": "minimadmatt",
    "channelId": "minimadmatt",
    "channelAvatar": "https://i.ytimg.com/vi/SuvMDH_le6g/hqdefault.jpg",
    "subscribersCount": "2.8M",
    "verified": true,
    "views": 24000000,
    "viewsFormatted": "24M",
    "uploadedAt": "1 month ago",
    "duration": "0:30",
    "durationSeconds": 30,
    "category": "Comedy",
    "tags": [
      "shorts",
      "meme",
      "friends",
      "funny"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/SuvMDH_le6g/hqdefault.jpg",
    "likes": 1900000,
    "commentsCount": 14000,
    "comments": [
      {
        "id": "c1-SuvMDH_le6g",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-SuvMDH_le6g",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": true,
    "soundTrack": "Funny Sibling Meme Sound"
  },
  {
    "id": "short-pGoXMFrOzAA",
    "youtubeId": "pGoXMFrOzAA",
    "title": "VIRAL Wrap Me In Plastic Dance Trend 🔥😱 #shorts #dance #trending",
    "description": "The viral choreography sensation taking over the YouTube shorts feed.",
    "channelName": "The Magic X",
    "channelId": "themagicx",
    "channelAvatar": "https://i.ytimg.com/vi/pGoXMFrOzAA/hqdefault.jpg",
    "subscribersCount": "3.1M",
    "verified": true,
    "views": 67000000,
    "viewsFormatted": "67M",
    "uploadedAt": "6 months ago",
    "duration": "0:25",
    "durationSeconds": 25,
    "category": "Music",
    "tags": [
      "shorts",
      "dance",
      "trend",
      "music"
    ],
    "thumbnailUrl": "https://i.ytimg.com/vi/pGoXMFrOzAA/hqdefault.jpg",
    "likes": 4800000,
    "commentsCount": 35000,
    "comments": [
      {
        "id": "c1-pGoXMFrOzAA",
        "author": "YouTube Fan",
        "authorAvatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@youtubefan",
        "text": "This video is an absolute masterpiece. Glad this works directly in 1080p!",
        "likes": 1240,
        "timestamp": "2 days ago",
        "isCreatorHearted": true
      },
      {
        "id": "c2-pGoXMFrOzAA",
        "author": "AudioPhile",
        "authorAvatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        "authorHandle": "@audiophile",
        "text": "The production quality here is top tier. Playing directly on the site without hiccups!",
        "likes": 482,
        "timestamp": "1 week ago"
      }
    ],
    "isShort": true,
    "soundTrack": "CHROMANCE - Wrap Me In Plastic"
  }
];

export const CATEGORIES = [
  'All',
  'Gaming',
  'Music',
  'Coding',
  'Technology',
  'Science',
  'Entertainment',
  'Nature',
  'Live',
  'Sports',
  'Comedy',
  'Podcasts',
  'News',
  'Recently uploaded',
  'Watched'
];
