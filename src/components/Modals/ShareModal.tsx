import React, { useState } from 'react';
import { X, Copy, Check, Share2, Code2, MessageCircle, Send } from 'lucide-react';
import { Video } from '../../types/youtube';

interface ShareModalProps {
  video?: Video;
  youtubeId?: string;
  videoTitle?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ video, youtubeId, videoTitle, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [includeTimestamp, setIncludeTimestamp] = useState(false);
  const [timestampSeconds, setTimestampSeconds] = useState('0:00');
  const [activeTab, setActiveTab] = useState<'link' | 'embed'>('link');

  if (!isOpen) return null;

  const yId = video ? video.youtubeId : (youtubeId || '');
  const title = video ? video.title : (videoTitle || 'YouTube Video');
  const currentUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const shareUrl = `${currentUrl}/?v=${yId}${includeTimestamp ? '&t=' + timestampSeconds : ''}`;
  const embedCode = `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${yId}" title="${title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-[#212121] dark:bg-[#212121] text-white shadow-2xl border border-neutral-700/60 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-700/50">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Share2 className="w-5 h-5 text-red-500" />
            Share
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex px-6 pt-3 border-b border-neutral-800 gap-6">
          <button
            onClick={() => setActiveTab('link')}
            className={`pb-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'link' ? 'border-red-500 text-white' : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Share Link
          </button>
          <button
            onClick={() => setActiveTab('embed')}
            className={`pb-2.5 text-sm font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'embed' ? 'border-red-500 text-white' : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            Embed Code
          </button>
        </div>

        <div className="p-6 space-y-5">
          {activeTab === 'link' ? (
            <>
              {/* Quick share social buttons */}
              <div className="flex items-center justify-between gap-3 py-2 overflow-x-auto no-scrollbar">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(title + ' ' + shareUrl)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-neutral-800 text-neutral-300 hover:text-white transition group shrink-0"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <span className="text-xs">WhatsApp</span>
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-neutral-800 text-neutral-300 hover:text-white transition group shrink-0"
                >
                  <div className="w-12 h-12 rounded-full bg-black border border-neutral-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition">
                    <span className="font-bold text-base">𝕏</span>
                  </div>
                  <span className="text-xs">X</span>
                </a>

                <a
                  href={`https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-neutral-800 text-neutral-300 hover:text-white transition group shrink-0"
                >
                  <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition">
                    <Send className="w-5 h-5 -rotate-45" />
                  </div>
                  <span className="text-xs">Reddit</span>
                </a>

                <button
                  onClick={() => handleCopy(shareUrl)}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-neutral-800 text-neutral-300 hover:text-white transition group shrink-0"
                >
                  <div className="w-12 h-12 rounded-full bg-neutral-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition">
                    <Copy className="w-5 h-5" />
                  </div>
                  <span className="text-xs">Copy</span>
                </button>
              </div>

              {/* URL bar with copy button */}
              <div className="flex items-center gap-2 p-1.5 bg-[#121212] rounded-xl border border-neutral-700">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="flex-1 bg-transparent px-3 py-1.5 text-sm text-neutral-200 outline-none select-all"
                />
                <button
                  onClick={() => handleCopy(shareUrl)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white text-black hover:bg-neutral-200 font-medium text-xs rounded-lg transition-colors shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Start at checkbox */}
              <label className="flex items-center gap-2 text-sm text-neutral-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeTimestamp}
                  onChange={e => setIncludeTimestamp(e.target.checked)}
                  className="w-4 h-4 accent-red-600 rounded"
                />
                <span>Start at</span>
                {includeTimestamp && (
                  <input
                    type="text"
                    value={timestampSeconds}
                    onChange={e => setTimestampSeconds(e.target.value)}
                    className="w-16 bg-neutral-800 border border-neutral-700 rounded px-2 py-0.5 text-xs text-center font-mono tabular-nums text-white"
                  />
                )}
              </label>
            </>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-neutral-400">
                Copy and paste this HTML code into your website or blog to embed this video:
              </p>
              <textarea
                readOnly
                rows={4}
                value={embedCode}
                className="w-full bg-[#121212] border border-neutral-700 rounded-xl p-3 font-mono text-xs text-neutral-300 outline-none select-all"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => handleCopy(embedCode)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white hover:bg-red-700 font-medium text-xs rounded-lg transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Code Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Embed Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
