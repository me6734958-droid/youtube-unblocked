import React, { useState } from 'react';
import { X, Plus, Check, Lock, Globe, ListPlus } from 'lucide-react';
import { useYouTube } from '../../context/YouTubeContext';
import { Video } from '../../types/youtube';

interface SavePlaylistModalProps {
  video: Video;
  isOpen: boolean;
  onClose: () => void;
}

export const SavePlaylistModal: React.FC<SavePlaylistModalProps> = ({ video, isOpen, onClose }) => {
  const { playlists, toggleVideoInPlaylist, createPlaylist, watchLaterIds, toggleWatchLater } = useYouTube();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  if (!isOpen) return null;

  const isWatchLater = watchLaterIds.includes(video.id);

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const pl = createPlaylist(newTitle.trim(), '', isPrivate);
    toggleVideoInPlaylist(pl.id, video.id);
    setNewTitle('');
    setShowCreateForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div 
        className="relative w-full max-w-sm rounded-2xl bg-[#212121] text-white shadow-2xl border border-neutral-700/60 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-700/50">
          <h2 className="text-base font-semibold flex items-center gap-2">
            <ListPlus className="w-5 h-5 text-red-500" />
            Save video to...
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 max-h-72 overflow-y-auto space-y-2">
          {/* Watch Later Item */}
          <label className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-800/70 cursor-pointer transition select-none">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={isWatchLater}
                onChange={() => toggleWatchLater(video.id)}
                className="w-4 h-4 accent-red-600 rounded"
              />
              <span className="text-sm">Watch Later</span>
            </div>
            <Lock className="w-4 h-4 text-neutral-400" />
          </label>

          {/* User Playlists */}
          {playlists.map(playlist => {
            const isContained = playlist.videoIds.includes(video.id);
            return (
              <label 
                key={playlist.id} 
                className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-800/70 cursor-pointer transition select-none"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isContained}
                    onChange={() => toggleVideoInPlaylist(playlist.id, video.id)}
                    className="w-4 h-4 accent-red-600 rounded"
                  />
                  <span className="text-sm truncate max-w-[180px]">{playlist.title}</span>
                </div>
                {playlist.isPrivate ? (
                  <Lock className="w-4 h-4 text-neutral-400" />
                ) : (
                  <Globe className="w-4 h-4 text-neutral-400" />
                )}
              </label>
            );
          })}
        </div>

        {/* Create playlist toggle or inline form */}
        <div className="p-4 border-t border-neutral-700/50 bg-[#1a1a1a]">
          {!showCreateForm ? (
            <button
              onClick={() => setShowCreateForm(true)}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 text-sm font-medium text-neutral-200 hover:text-white hover:bg-neutral-800 rounded-xl transition"
            >
              <Plus className="w-4 h-4" />
              <span>Create new playlist</span>
            </button>
          ) : (
            <form onSubmit={handleCreateNew} className="space-y-3">
              <div>
                <label className="text-xs text-neutral-400 mb-1 block">Title</label>
                <input
                  type="text"
                  placeholder="Enter playlist title..."
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  autoFocus
                  className="w-full bg-[#121212] border border-neutral-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-xs text-neutral-400 mb-1 block">Privacy</label>
                <select
                  value={isPrivate ? 'private' : 'public'}
                  onChange={e => setIsPrivate(e.target.value === 'private')}
                  className="w-full bg-[#121212] border border-neutral-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-red-500"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-3 py-1.5 text-xs text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newTitle.trim()}
                  className="px-4 py-1.5 bg-red-600 disabled:opacity-50 text-white font-medium text-xs rounded-lg hover:bg-red-700 transition"
                >
                  Create
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
