"use client";

import { useState } from "react";
import {
  X,
  Keyboard,
  SlidersHorizontal,
  Info,
  Volume2,
} from "lucide-react";
import { PiSpeakerHighDuotone, PiSpeakerSlashDuotone } from "react-icons/pi";
import type { AmbientTrack } from "@/lib/zen/types";
import { AMBIENT_TRACKS } from "@/lib/zen/types";

type TabId = "general" | "sound" | "keyboard" | "about";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  initialTab: "general" | "sound" | "keyboard" | "about";
  soundEnabled: boolean;
  onSoundChange: (enabled: boolean) => void;
  activeTracks: AmbientTrack[];
  onToggleTrack: (track: AmbientTrack) => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  theme: "light" | "dark" | "system";
  onThemeChange: (theme: "light" | "dark" | "system") => void;
  reducedMotion: boolean;
  onReducedMotionChange: (value: boolean) => void;
}

const TABS: { id: TabId; label: string; icon: typeof SlidersHorizontal }[] = [
  { id: "general", label: "General", icon: SlidersHorizontal },
  { id: "sound", label: "Sound", icon: Volume2 },
  { id: "keyboard", label: "Keyboard", icon: Keyboard },
  { id: "about", label: "About", icon: Info },
];

const TRACK_LABELS: Record<AmbientTrack, string> = {
  wind: "WIND",
  rain: "RAIN",
  fireplace: "FIREPLACE",
  cafe: "CAFE",
};

const SHORTCUTS: { keys: string[]; description: string }[] = [
  { keys: ["N"], description: "Switch to Normal mode" },
  { keys: ["Z"], description: "Switch to Zen mode" },
  { keys: ["F"], description: "Zen theme: Fire" },
  { keys: ["R"], description: "Zen theme: Rain" },
  { keys: ["M"], description: "Mute / unmute sound" },
  { keys: ["1"], description: "Ambient audio: Wind" },
  { keys: ["2"], description: "Ambient audio: Rain" },
  { keys: ["3"], description: "Ambient audio: Fireplace" },
  { keys: ["4"], description: "Ambient audio: Cafe" },
];

export function SettingsModal({
  open,
  onClose,
  initialTab,
  soundEnabled,
  onSoundChange,
  activeTracks,
  onToggleTrack,
  volume,
  onVolumeChange,
  theme,
  onThemeChange,
  reducedMotion,
  onReducedMotionChange,
}: SettingsModalProps) {
  const [tab, setTab] = useState<TabId>(initialTab);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Settings"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="neo-border-thick bg-card neo-shadow w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col sm:flex-row">
        {/* Sidebar */}
        <nav
          className="w-full sm:w-52 shrink-0 border-b-4 sm:border-b-0 sm:border-r-4 border-border bg-muted p-4 flex sm:flex-col gap-2 overflow-y-auto"
          aria-label="Settings sections"
        >
          {TABS.map(({ id, label, icon: Icon }) => {
            const active = tab === id;
            return (
              <button
                key={id}
                onClick={() => setTab(id)}
                aria-pressed={active}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wide transition-all ${
                  active
                    ? "bg-[var(--neo-green)] neo-shadow-sm"
                    : "bg-transparent hover:bg-muted-foreground/10"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">SETTINGS</h2>
            <button
              onClick={onClose}
              className="neo-border p-2 hover:translate-x-1 hover:translate-y-1 hover:shadow-none neo-shadow-sm transition-all"
              aria-label="Close settings"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {tab === "general" && (
            <div className="space-y-6">
              <div className="neo-border bg-card p-5">
                <h3 className="text-lg font-bold mb-4">SOUND</h3>
                <button
                  onClick={() => onSoundChange(!soundEnabled)}
                  aria-pressed={soundEnabled}
                  className={`neo-border px-4 py-3 font-bold flex items-center gap-2 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none neo-shadow-sm ${
                    soundEnabled ? "bg-[var(--neo-green)]" : "bg-muted"
                  }`}
                >
                  {soundEnabled ? (
                    <PiSpeakerHighDuotone className="w-5 h-5" />
                  ) : (
                    <PiSpeakerSlashDuotone className="w-5 h-5" />
                  )}
                  {soundEnabled ? "SOUND ON" : "SOUND OFF"}
                </button>
              </div>

              <div className="neo-border bg-card p-5">
                <h3 className="text-lg font-bold mb-4">THEME</h3>
                <div className="flex flex-wrap gap-2">
                  {(["light", "dark", "system"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => onThemeChange(t)}
                      aria-pressed={theme === t}
                      className={`neo-border px-4 py-2 text-sm font-bold uppercase transition-all ${
                        theme === t
                          ? "bg-[var(--neo-green)] neo-shadow-sm"
                          : "bg-muted"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="neo-border bg-card p-5">
                <h3 className="text-lg font-bold mb-2">ACCESSIBILITY</h3>
                <button
                  onClick={() => onReducedMotionChange(!reducedMotion)}
                  aria-pressed={reducedMotion}
                  className={`neo-border px-4 py-3 font-bold flex items-center gap-2 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none neo-shadow-sm ${
                    reducedMotion ? "bg-[var(--neo-green)]" : "bg-muted"
                  }`}
                >
                  • {reducedMotion
                    ? "REDUCED MOTION ON"
                    : "REDUCED MOTION OFF"}
                </button>
              </div>
            </div>
          )}

          {tab === "sound" && (
            <div className="space-y-6">
              <div className="neo-border bg-card p-5">
                <h3 className="text-lg font-bold mb-4">SOUND</h3>
                <button
                  onClick={() => onSoundChange(!soundEnabled)}
                  aria-pressed={soundEnabled}
                  className={`neo-border px-4 py-3 font-bold flex items-center gap-2 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none neo-shadow-sm ${
                    soundEnabled ? "bg-[var(--neo-green)]" : "bg-muted"
                  }`}
                >
                  {soundEnabled ? (
                    <PiSpeakerHighDuotone className="w-5 h-5" />
                  ) : (
                    <PiSpeakerSlashDuotone className="w-5 h-5" />
                  )}
                  {soundEnabled ? "SOUND ON" : "SOUND OFF"}
                </button>
              </div>

              <div className="neo-border bg-card p-5">
                <h3 className="text-lg font-bold mb-4">AMBIENT TRACKS</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Toggle one or more tracks to play them at the same time.
                </p>
                <ul className="space-y-2">
                  {AMBIENT_TRACKS.map((track) => {
                    const active = activeTracks.includes(track);
                    return (
                      <li key={track}>
                        <button
                          onClick={() => onToggleTrack(track)}
                          aria-pressed={active}
                          className={`neo-border w-full px-4 py-3 font-bold flex items-center gap-3 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none neo-shadow-sm ${
                            active ? "bg-[var(--neo-green)]" : "bg-muted"
                          }`}
                        >
                          <span
                            className={`w-5 h-5 shrink-0 neo-border flex items-center justify-center ${
                              active ? "bg-[var(--neo-pink)]" : "bg-card"
                            }`}
                            aria-hidden="true"
                          >
                            {active && (
                              <span className="w-2.5 h-2.5 rounded-full bg-card" />
                            )}
                          </span>
                          {TRACK_LABELS[track]}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="neo-border bg-card p-5">
                <h3 className="text-lg font-bold mb-4">VOLUME</h3>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(volume * 100)}
                  onChange={(e) => onVolumeChange(Number(e.target.value) / 100)}
                  className="w-full h-2 bg-muted neo-border cursor-pointer"
                  aria-label="Ambient sound volume"
                />
                <div className="text-sm font-bold mt-2 tabular-nums">
                  {Math.round(volume * 100)}%
                </div>
              </div>
            </div>
          )}

          {tab === "keyboard" && (
            <div className="neo-border bg-card p-5">
              <h3 className="text-lg font-bold mb-4">KEYBOARD SHORTCUTS</h3>
              <ul className="space-y-3">
                {SHORTCUTS.map(({ keys, description }) => (
                  <li
                    key={description}
                    className="flex items-center justify-between gap-4 border-b-2 border-border/40 pb-3 last:border-b-0 last:pb-0"
                  >
                    <span className="text-sm text-muted-foreground">
                      {description}
                    </span>
                    <span className="flex gap-1.5 shrink-0">
                      {keys.map((k) => (
                        <kbd
                          key={k}
                          className="neo-border bg-muted px-2.5 py-1 text-xs font-bold"
                        >
                          {k}
                        </kbd>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                Shortcuts are active while a session is running.
              </p>
            </div>
          )}

          {tab === "about" && (
            <div className="neo-border bg-card p-5 space-y-4">
              <h3 className="text-lg font-bold">ABOUT</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                LOCK-IN is a neo-brutalist focus timer. Commit to deep work with
                a single goal, a countdown, and no distractions — plus an ASCII
                Zen mode for total immersion.
              </p>
              <div className="text-xs text-muted-foreground">
                Sessions are saved locally in your browser.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
