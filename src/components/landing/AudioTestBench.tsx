"use client";

import { useState } from "react";
import { Volume2, VolumeX, Radio, Sparkles, Sliders } from "lucide-react";
import { getAmbientEngine } from "@/lib/zen/ambientAudio";
import type { AmbientTrack } from "@/lib/zen/types";

interface SoundSpec {
  id: AmbientTrack;
  name: string;
  description: string;
  shortcut: string;
  techDetail: string;
}

const SOUNDS: SoundSpec[] = [
  {
    id: "wind",
    name: "Wind Resonator",
    description: "Low-frequency sweeping resonance for deep isolation and noise masking",
    shortcut: "Key 1",
    techDetail: "180Hz Highpass + 900Hz Lowpass LFO",
  },
  {
    id: "fireplace",
    name: "Fireplace Synth",
    description: "Low-frequency rumble paired with periodic procedural crackle generators",
    shortcut: "Key 2",
    techDetail: "900Hz Lowpass + 3500Hz Crackle buffer",
  },
];

export function AudioTestBench() {
  const [activeTrack, setActiveTrack] = useState<AmbientTrack | null>(null);
  const [volume, setVolume] = useState(0.5);

  const toggleTrack = (id: AmbientTrack) => {
    const engine = getAmbientEngine();
    if (!engine) return;

    if (activeTrack === id) {
      engine.stop(id);
      setActiveTrack(null);
    } else {
      engine.stopAll();
      engine.setVolume(volume);
      engine.playTrack(id);
      setActiveTrack(id);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    const engine = getAmbientEngine();
    if (engine) engine.setVolume(newVol);
  };

  return (
    <section id="audio-bench" className="py-20 px-4 max-w-6xl mx-auto scroll-mt-20">
      <div className="text-left max-w-2xl mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-[#f85121] font-semibold">
          AUDIO ENGINE
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0f172a] mt-2 mb-3">
          Procedural Audio Test Bench
        </h2>
        <p className="text-sm text-neutral-600 leading-relaxed text-pretty">
          All ambient soundscapes are synthesized mathematically inside your browser via the Web Audio API or coupled with your YouTube lofi streams.
        </p>
      </div>

      <div className="bg-[#f8fafc] border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        {/* Control Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center justify-center text-[#f85121]">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0f172a]">
                Web Audio Synthesizer
              </h3>
              <p className="text-xs text-neutral-500 font-mono">
                {activeTrack ? `Playing: ${activeTrack.toUpperCase()}` : "Synthesizer Ready"}
              </p>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3 w-full sm:w-auto bg-white border border-neutral-200 px-4 py-2 rounded-2xl shadow-sm">
            {volume === 0 ? (
              <VolumeX className="w-4 h-4 text-neutral-400 shrink-0" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#f85121] shrink-0" />
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full sm:w-32 h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#f85121]"
              aria-label="Master volume control"
            />
            <span className="text-xs font-mono text-neutral-600 w-9 text-right font-medium">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>

        {/* Sound Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SOUNDS.map((sound) => {
            const isPlaying = activeTrack === sound.id;
            return (
              <div
                key={sound.id}
                onClick={() => toggleTrack(sound.id)}
                className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                  isPlaying
                    ? "bg-white border-[#f85121] shadow-md ring-1 ring-[#f85121]/30"
                    : "bg-white border-neutral-200 hover:border-neutral-300 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        isPlaying ? "bg-[#f85121] animate-pulse" : "bg-neutral-300"
                      }`}
                    />
                    <h4 className="text-sm font-bold text-[#0f172a]">{sound.name}</h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-neutral-100 text-neutral-600 font-semibold border border-neutral-200">
                    {sound.shortcut}
                  </span>
                </div>

                <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
                  {sound.description}
                </p>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span className="truncate">{sound.techDetail}</span>
                  <span className={isPlaying ? "text-[#f85121] font-bold" : "text-neutral-500 font-medium"}>
                    {isPlaying ? "Active" : "Click to audition"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
