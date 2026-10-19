import React from 'react';
import { Tv, Radio, CheckCircle, Bell } from 'lucide-react';
import { useYouTube } from '../context/YouTubeContext';
import { VideoCard } from './VideoCard';

export const SubscriptionsFeed: React.FC = () => {
  const { channels, subscribedChannelIds, videos, openChannel } = useYouTube();

  const subscribedList = channels.filter(c => subscribedChannelIds.includes(c.id));
  const subVideos = videos.filter(v => subscribedChannelIds.includes(v.channelId));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Subscribed Channels Avatar Ribbon */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Tv className="w-5 h-5 text-red-500" />
            Subscriptions ({subscribedList.length})
          </h2>
          <span className="text-xs text-blue-400 font-semibold cursor-pointer hover:underline">
            Manage
          </span>
        </div>

        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-2">
          {subscribedList.map(ch => (
            <button
              key={ch.id}
              onClick={() => openChannel(ch.id)}
              className="flex flex-col items-center gap-2 group cursor-pointer shrink-0"
            >
              <div className="relative">
                <img
                  src={ch.avatar}
                  alt={ch.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-transparent group-hover:ring-red-500 transition"
                />
                {ch.id === 'lofigirl' && (
                  <span className="absolute bottom-0 right-0 p-1 bg-red-600 rounded-full ring-2 ring-[#0f0f0f]">
                    <Radio className="w-2.5 h-2.5 text-white animate-pulse" />
                  </span>
                )}
              </div>
              <span className="text-xs text-neutral-300 group-hover:text-white transition font-medium truncate max-w-[80px]">
                {ch.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Latest Videos from Subscriptions */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4">
          Latest Uploads
        </h3>

        {subVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {subVideos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-neutral-400">
            <p className="text-sm">No videos from subscribed channels yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
