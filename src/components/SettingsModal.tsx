"use client";

import { useState } from "react";
import {
  X,
  Keyboard,
  SlidersHorizontal,
  Info,
  Volume2,
  Check,
  Youtube,
} from "lucide-react";
import type { AmbientTrack } from "@/lib/zen/types";
import { AMBIENT_TRACKS } from "@/lib/zen/types";

type TabId = "sound" | "keyboard" | "about";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  initialTab?: "sound" | "keyboard" | "about";
  soundEnabled: boolean;
  onSoundChange: (enabled: boolean) => void;
  activeTracks: AmbientTrack[];
  onToggleTrack: (track: AmbientTrack) => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  youtubeUrl?: string;
  onYoutubeUrlChange?: (url: string) => void;
  reducedMotion: boolean;
  onReducedMotionChange: (value: boolean) => void;
}

const TABS: { id: TabId; label: string; icon: typeof SlidersHorizontal }[] = [
  { id: "sound", label: "Sound & Lofi", icon: Volume2 },
  { id: "keyboard", label: "Shortcuts", icon: Keyboard },
  { id: "about", label: "Zen Protocol", icon: Info },
];

const TRACK_LABELS: Record<AmbientTrack, string> = {
  wind: "Wind Noise",
  fireplace: "Fireplace",
};

const SHORTCUTS: { keys: string[]; description: string }[] = [
  { keys: ["F"], description: "Zen Theme: Fire Matrix" },
  { keys: ["R"], description: "Zen Theme: Rain Matrix" },
  { keys: ["M"], description: "Mute / Unmute Audio" },
  { keys: ["1"], description: "Ambient Audio: Wind" },
  { keys: ["2"], description: "Ambient Audio: Fireplace" },
];

export function SettingsModal({
  open,
  onClose,
  initialTab = "sound",
  soundEnabled,
  onSoundChange,
  activeTracks,
  onToggleTrack,
  volume,
  onVolumeChange,
  youtubeUrl = "",
  onYoutubeUrlChange,
  reducedMotion,
  onReducedMotionChange,
}: SettingsModalProps) {
  const [tab, setTab] = useState<TabId>(initialTab);
  const [urlInput, setUrlInput] = useState(youtubeUrl);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Settings"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#101010] border border-[#262626] rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col sm:flex-row shadow-2xl">
        {/* Sidebar */}
        <nav
          className="w-full sm:w-48 shrink-0 border-b sm:border-b-0 sm:border-r border-[#222222] bg-[#0c0c0c] p-3 flex sm:flex-col gap-1 overflow-y-auto"
          aria-label="Settings sections"
        >
          {TABS.map(({ id, label, icon: Icon }) => {
            const active = tab === id;
            return (
              <button
                key={id}
                onClick={() => setTab(id)}
                aria-pressed={active}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  active
                    ? "bg-[#1f1f1f] text-white shadow-sm"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-[#161616]"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        {/* Content Panel */}
        <div className="flex-1 min-w-0 p-6 overflow-y-auto space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#1c1c1c]">
            <h2 className="text-sm font-semibold text-white tracking-tight uppercase font-mono">
              {TABS.find((t) => t.id === tab)?.label}
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1a1a1a] transition-colors"
              aria-label="Close settings"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {tab === "sound" && (
            <div className="space-y-4">
              {/* Master Volume */}
              <div className="p-4 bg-[#141414] border border-[#222222] rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs text-neutral-300">
                  <span>Audio Volume</span>
                  <span className="font-mono">{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(volume * 100)}
                  onChange={(e) => onVolumeChange(Number(e.target.value) / 100)}
                  className="w-full h-1.5 bg-[#262626] rounded-lg appearance-none cursor-pointer accent-white"
                  aria-label="Ambient sound volume"
                />
              </div>

              {/* Available Soundscapes (Wind & Fireplace only) */}
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase text-neutral-400">
                  Available Soundscapes
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {AMBIENT_TRACKS.map((track) => {
                    const active = activeTracks.includes(track);
                    return (
                      <button
                        key={track}
                        onClick={() => onToggleTrack(track)}
                        className={`p-3 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition-all ${
                          active
                            ? "bg-[#1c1c1c] border-white/40 text-white"
                            : "bg-[#131313] border-[#222222] text-neutral-400 hover:text-white"
                        }`}
                      >
                        <span>{TRACK_LABELS[track]}</span>
                        {active && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* YouTube Video URL Input for Lofi */}
              <div className="p-4 bg-[#141414] border border-[#222222] rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="modal-youtube-url" className="text-xs font-mono uppercase text-neutral-400 flex items-center gap-1.5">
                    <Youtube className="w-3.5 h-3.5 text-red-500" />
                    <span>YouTube Lofi Music URL</span>
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    id="modal-youtube-url"
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="flex-1 px-3 py-2 bg-[#101010] border border-[#262626] rounded-lg text-xs font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500"
                  />
                  <button
                    type="button"
                    onClick={() => onYoutubeUrlChange?.(urlInput.trim())}
                    className="px-3 py-2 bg-[#202020] hover:bg-[#2a2a2a] text-white text-xs font-mono rounded-lg transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {tab === "keyboard" && (
            <div className="p-4 bg-[#141414] border border-[#222222] rounded-xl space-y-3">
              <div className="text-xs font-mono uppercase text-neutral-400 mb-2">Zen Session Hotkeys</div>
              <ul className="space-y-2 text-xs">
                {SHORTCUTS.map(({ keys, description }) => (
                  <li
                    key={description}
                    className="flex items-center justify-between py-1.5 border-b border-[#1f1f1f] last:border-b-0"
                  >
                    <span className="text-neutral-400">{description}</span>
                    <div className="flex gap-1">
                      {keys.map((k) => (
                        <kbd
                          key={k}
                          className="px-2 py-0.5 rounded bg-[#202020] border border-[#2e2e2e] text-neutral-200 font-mono text-[11px]"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tab === "about" && (
            <div className="p-4 bg-[#141414] border border-[#222222] rounded-xl space-y-3 text-xs text-neutral-400 leading-relaxed">
              <p className="text-white font-medium">
                Lock-In Zen Protocol v2.0
              </p>
              <p>
                An uncompromising distraction-elimination utility designed for deep focus through tab visibility penalties, ASCII matrix visuals, and in-browser soundscapes.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
