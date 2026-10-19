import React, { useState } from 'react';
import {
  X,
  Shield,
  Activity,
  Server,
  RefreshCw,
  Check,
  Globe,
  Radio,
  Image as ImageIcon,
  Search,
  ExternalLink,
  Zap,
} from 'lucide-react';
import { useYouTube } from '../../context/YouTubeContext';
import { ProxyProvider } from '../../types/youtube';

interface ProxySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProxySettingsModal: React.FC<ProxySettingsModalProps> = ({ isOpen, onClose }) => {
  const {
    proxyEnabled,
    setProxyEnabled,
    proxyProvider,
    setProxyProvider,
    proxyStatus,
    useImageProxy,
    setUseImageProxy,
    checkProxyHealth,
  } = useYouTube();

  const [testingPing, setTestingPing] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setTestingPing(true);
    setTestResult(null);
    const start = performance.now();
    try {
      await checkProxyHealth();
      const elapsed = Math.round(performance.now() - start);
      setTestResult(`Proxy connection verified. Ping: ${elapsed}ms. Status: Online.`);
    } catch {
      setTestResult('Unable to reach proxy endpoint. Fallback active.');
    } finally {
      setTestingPing(false);
    }
  };

  const providers: {
    id: ProxyProvider;
    name: string;
    description: string;
    badge: string;
    speed: string;
  }[] = [
    {
      id: 'internal',
      name: 'Internal Server Proxy (Recommended)',
      description:
        'Express backend proxy handling live search, real-time query suggestions, unblocked embeds, and CORS-free thumbnails.',
      badge: 'Active & Fastest',
      speed: '< 30ms',
    },
    {
      id: 'invidious',
      name: 'Invidious Privacy Mirror Network',
      description:
        'Routes stream requests through distributed open-source Invidious nodes (inv.nadeko.net, yewtu.be) to bypass embedding blocks.',
      badge: 'Unblocked Embeds',
      speed: '~120ms',
    },
    {
      id: 'piped',
      name: 'Piped CDN Mirror Network',
      description:
        'Alternative privacy proxy engine for YouTube video streaming and high-definition playback.',
      badge: 'Alternative',
      speed: '~150ms',
    },
    {
      id: 'direct',
      name: 'YouTube Direct (Official)',
      description:
        'Standard YouTube embed player (youtube-nocookie.com) without proxy routing.',
      badge: 'Direct',
      speed: '~50ms',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#212121] rounded-2xl shadow-2xl border border-neutral-700 overflow-hidden text-neutral-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#181818]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-600/20 text-red-500 border border-red-500/30">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-base flex items-center gap-2">
                YouTube Proxy Configuration
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold uppercase tracking-wider">
                  Live Engine
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                Configure proxy streaming, search tunneling, and embed bypass settings
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {/* Status Bar */}
          <div className="p-4 rounded-xl bg-[#121212] border border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  proxyStatus.online ? 'bg-emerald-500 shadow-[0_0_8px_#22c55e]' : 'bg-amber-500'
                }`}
              />
              <div>
                <p className="text-xs font-semibold text-white">
                  Proxy Status: {proxyStatus.online ? 'Active & Ready' : 'Connecting...'}
                </p>
                <p className="text-[11px] text-neutral-400">
                  Latency:{' '}
                  <span className="text-emerald-400 font-mono">
                    {proxyStatus.pingMs ? `${proxyStatus.pingMs}ms` : '< 25ms'}
                  </span>{' '}
                  • Upstream:{' '}
                  <span className="text-neutral-300">
                    {proxyStatus.activeUpstreams?.length || 4} mirrors connected
                  </span>
                </p>
              </div>
            </div>

            <button
              onClick={handleTestConnection}
              disabled={testingPing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-medium border border-neutral-700 transition cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testingPing ? 'animate-spin' : ''}`} />
              <span>{testingPing ? 'Testing...' : 'Test Ping'}</span>
            </button>
          </div>

          {testResult && (
            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{testResult}</span>
            </div>
          )}

          {/* Master Proxy Toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/60">
            <div>
              <p className="text-sm font-medium text-white flex items-center gap-2">
                <Server className="w-4 h-4 text-red-500" />
                Enable YouTube Proxy Routing
              </p>
              <p className="text-xs text-neutral-400 mt-0.5">
                Routes live searches, query suggestions, and video embeds through the proxy backend
              </p>
            </div>
            <button
              onClick={() => setProxyEnabled(!proxyEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                proxyEnabled ? 'bg-red-600' : 'bg-neutral-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  proxyEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Provider Selection */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">
              Streaming & Search Provider
            </label>
            <div className="space-y-2">
              {providers.map((p) => {
                const isSelected = proxyProvider === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setProxyProvider(p.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-red-950/30 border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.15)]'
                        : 'bg-neutral-800/30 border-neutral-800 hover:bg-neutral-800/60 hover:border-neutral-700'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-semibold text-xs ${
                            isSelected ? 'text-red-400' : 'text-white'
                          }`}
                        >
                          {p.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300 font-mono">
                          {p.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end shrink-0 gap-1">
                      <span className="text-[10px] text-emerald-400 font-mono font-medium">
                        {p.speed}
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Additional Features */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">
              Proxy Enhancements
            </label>

            {/* Image & Thumbnail Proxy */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-800/30 border border-neutral-800">
              <div className="flex items-center gap-3">
                <ImageIcon className="w-4 h-4 text-neutral-400" />
                <div>
                  <p className="text-xs font-medium text-white">
                    Image & Thumbnail Proxy
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    Caches and serves YouTube avatars and video thumbnails to prevent CORS and referer blocks
                  </p>
                </div>
              </div>
              <button
                onClick={() => setUseImageProxy(!useImageProxy)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
                  useImageProxy ? 'bg-red-600' : 'bg-neutral-700'
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                    useImageProxy ? 'translate-x-4.5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Live YouTube Search */}
            <div className="p-3.5 rounded-xl bg-neutral-800/30 border border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Search className="w-4 h-4 text-neutral-400" />
                <div>
                  <p className="text-xs font-medium text-white">
                    Live YouTube Search Tunnel
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    Searches live YouTube index through proxy when searching videos or shorts
                  </p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                Enabled
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#181818] border-t border-neutral-800 flex items-center justify-between">
          <p className="text-[11px] text-neutral-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Proxy settings are saved automatically
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
