import React, { useState } from 'react';
import { X, Youtube, Play, CheckCircle2, AlertCircle } from 'lucide-react';
import { useYouTube } from '../../context/YouTubeContext';
import { CATEGORIES } from '../../data/mockVideos';

interface AddVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddVideoModal: React.FC<AddVideoModalProps> = ({ isOpen, onClose }) => {
  const { addCustomVideo, playVideo, extractYouTubeId } = useYouTube();
  const [urlOrId, setUrlOrId] = useState('');
  const [title, setTitle] = useState('');
  const [channelName, setChannelName] = useState('');
  const [category, setCategory] = useState('All');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const detectedId = extractYouTubeId(urlOrId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!detectedId) {
      setError('Please enter a valid YouTube URL (e.g., https://www.youtube.com/watch?v=...) or an 11-character video ID.');
      return;
    }

    const newVideo = addCustomVideo({
      urlOrId: detectedId,
      title: title.trim() || `YouTube Video (${detectedId})`,
      category,
      channelName: channelName.trim() || 'My YouTube Channel',
      description: description.trim() || 'Imported into YouTube Web Viewer.',
    });

    onClose();
    // Play immediately
    playVideo(newVideo);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-[#212121] text-white shadow-2xl border border-neutral-700/60 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-700/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white">
              <Youtube className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="text-base font-semibold">Add Any YouTube Video</h2>
              <p className="text-xs text-neutral-400">Play or add any YouTube video directly to your library</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-neutral-300 mb-1.5 block">
              YouTube Video URL or Video ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              value={urlOrId}
              onChange={e => {
                setUrlOrId(e.target.value);
                if (error) setError('');
              }}
              autoFocus
              className="w-full bg-[#121212] border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
            />
            {detectedId && (
              <p className="text-xs text-emerald-400 mt-1.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Detected YouTube ID: <span className="font-mono font-bold">{detectedId}</span>
              </p>
            )}
            {error && (
              <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {error}
              </p>
            )}
          </div>

          {/* Live Preview if ID is detected */}
          {detectedId && (
            <div className="flex items-center gap-3 p-3 bg-[#181818] rounded-xl border border-neutral-800">
              <img
                src={`https://i.ytimg.com/vi/${detectedId}/hqdefault.jpg`}
                alt="Thumbnail preview"
                className="w-28 aspect-video object-cover rounded-lg bg-neutral-900"
                onError={e => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-neutral-200 truncate">
                  Ready to stream in 4K/1080p
                </p>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Official YouTube Embed Player
                </p>
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-neutral-300 mb-1.5 block">
              Custom Video Title (Optional)
            </label>
            <input
              type="text"
              placeholder="Will auto-title if left empty"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-[#121212] border border-neutral-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-neutral-300 mb-1.5 block">
                Channel Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Official Artist"
                value={channelName}
                onChange={e => setChannelName(e.target.value)}
                className="w-full bg-[#121212] border border-neutral-700 rounded-xl px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-neutral-300 mb-1.5 block">
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-[#121212] border border-neutral-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-300 mb-1.5 block">
              Description (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Add video notes or description..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full bg-[#121212] border border-neutral-700 rounded-xl px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-xl shadow-lg transition"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Add & Watch</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
