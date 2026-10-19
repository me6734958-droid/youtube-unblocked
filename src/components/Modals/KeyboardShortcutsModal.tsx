import React from 'react';
import { X, Keyboard } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'k / Space', desc: 'Toggle play / pause' },
    { key: 'j', desc: 'Seek backward 10 seconds' },
    { key: 'l', desc: 'Seek forward 10 seconds' },
    { key: 'm', desc: 'Toggle mute' },
    { key: 'f', desc: 'Toggle full screen' },
    { key: 't', desc: 'Toggle theater mode' },
    { key: 'i', desc: 'Open Miniplayer' },
    { key: '/', desc: 'Focus search box' },
    { key: '0..9', desc: 'Seek to percentage (0% to 90%)' },
    { key: 'Shift + n', desc: 'Move to next video' },
    { key: 'Shift + p', desc: 'Move to previous video' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div 
        className="relative w-full max-w-md rounded-2xl bg-[#212121] text-white p-6 shadow-2xl border border-neutral-700/60 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-neutral-700/50 mb-4">
          <h3 className="text-base font-semibold flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-red-500" />
            Keyboard shortcuts
          </h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {shortcuts.map((sc, idx) => (
            <div key={idx} className="flex items-center justify-between text-sm py-1 border-b border-neutral-800/40">
              <span className="text-neutral-300 text-xs">{sc.desc}</span>
              <kbd className="px-2 py-1 bg-neutral-800 border border-neutral-700 rounded text-xs font-mono font-bold text-neutral-200">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
