import React, { useState, useEffect } from 'react';
import { X, Mic } from 'lucide-react';
import { useYouTube } from '../../context/YouTubeContext';

interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceSearchModal: React.FC<VoiceSearchModalProps> = ({ isOpen, onClose }) => {
  const { setSearchQuery, setView } = useYouTube();
  const [listeningState, setListeningState] = useState<'listening' | 'heard'>('listening');
  const [transcript, setTranscript] = useState('');

  const sampleVoiceQueries = [
    'gta 6 trailer rockstar games',
    'javascript tutorial fireship',
    'lofi hip hop radio beats to relax',
    'mrbeast squid game in real life',
    'rick astley never gonna give you up',
    'apple vision pro review mkbhd'
  ];

  useEffect(() => {
    if (!isOpen) return;

    setListeningState('listening');
    setTranscript('Listening...');

    // Simulate speech recognition speech capture
    const timer1 = setTimeout(() => {
      const randomQuery = sampleVoiceQueries[Math.floor(Math.random() * sampleVoiceQueries.length)];
      setTranscript(`"${randomQuery}"`);
      setListeningState('heard');

      const timer2 = setTimeout(() => {
        setSearchQuery(randomQuery);
        setView('search');
        onClose();
      }, 1200);

      return () => clearTimeout(timer2);
    }, 2200);

    return () => clearTimeout(timer1);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div 
        className="relative w-full max-w-md rounded-3xl bg-[#212121] text-white p-8 text-center shadow-2xl border border-neutral-700/60 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-medium mb-6">Search with your voice</h3>

        {/* Pulsing microphone animation */}
        <div className="relative my-8 flex items-center justify-center">
          <div className="absolute w-24 h-24 rounded-full bg-red-600/20 animate-ping" />
          <div className="absolute w-20 h-20 rounded-full bg-red-600/30 animate-pulse" />
          <div className="relative w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
            <Mic className="w-8 h-8 text-white" />
          </div>
        </div>

        <p className="text-lg font-medium text-neutral-200 min-h-8">
          {transcript}
        </p>
        <p className="text-xs text-neutral-500 mt-2">
          Try saying a title, creator name, or topic
        </p>

        {/* Quick sample chips */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {sampleVoiceQueries.slice(0, 3).map((query, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSearchQuery(query);
                setView('search');
                onClose();
              }}
              className="text-xs px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
            >
              {query}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
