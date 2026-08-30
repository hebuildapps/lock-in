"use client";

import { useState, useEffect } from "react";
import { Play, Pause, AlertTriangle, ShieldAlert, RefreshCw } from "lucide-react";
import { getAmbientEngine } from "@/lib/zen/ambientAudio";
import type { AmbientTrack } from "@/lib/zen/types";

export function InteractiveSessionWidget() {
  const [goal, setGoal] = useState("Ship authentication layer");
  const [durationMinutes, setDurationMinutes] = useState(25);
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [penaltiesTriggered, setPenaltiesTriggered] = useState(0);
  const [showPenaltyAlert, setShowPenaltyAlert] = useState(false);
  const [activeSound, setActiveSound] = useState<AmbientTrack | "none">("none");

  // Timer countdown simulation
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsLeft]);

  // Audio control
  const toggleSound = (sound: AmbientTrack) => {
    const engine = getAmbientEngine();
    if (!engine) return;

    if (activeSound === sound) {
      engine.stopAll();
      setActiveSound("none");
    } else {
      engine.stopAll();
      engine.playTrack(sound);
      setActiveSound(sound);
    }
  };

  // Penalty simulation button
  const triggerSimulatedTabSwitch = () => {
    setShowPenaltyAlert(true);
    setPenaltiesTriggered((prev) => prev + 1);
    setSecondsLeft((prev) => prev + 120); // +2 minutes penalty

    setTimeout(() => {
      setShowPenaltyAlert(false);
    }, 4000);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-[#0d0d0d] border border-[#222222] rounded-2xl p-5 md:p-6 shadow-2xl space-y-5 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1c1c1c]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-xs text-neutral-400">
            sandbox://lock-in-zen
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#161616] border border-[#262626] text-[11px] font-mono text-neutral-400">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Interactive Preview</span>
        </div>
      </div>

      {/* Goal Input Simulator */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1">
          <span>Deliverable Objective</span>
          <span className="text-amber-500 font-bold text-xs leading-none">*</span>
        </label>
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Declare one objective..."
          className="w-full px-3.5 py-2.5 bg-[#141414] border border-[#242424] rounded-xl text-sm font-medium text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
        />
      </div>

      {/* Main Timer Display */}
      <div className="flex flex-col items-center justify-center p-6 bg-[#121212] border border-[#1f1f1f] rounded-xl relative overflow-hidden">
        {showPenaltyAlert && (
          <div className="absolute inset-0 bg-red-950/80 backdrop-blur-sm border border-red-500/40 flex flex-col items-center justify-center p-4 z-10 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-2 text-red-400 font-mono text-sm font-semibold mb-1">
              <ShieldAlert className="w-4 h-4" />
              <span>TAB SWITCH DETECTED</span>
            </div>
            <p className="text-xs text-neutral-200 text-center font-mono">
              Penalty applied: <strong className="text-red-400">+2 minutes added</strong> to sprint
            </p>
          </div>
        )}

        <div className="text-5xl md:text-6xl font-timer font-bold tracking-tight text-white tabular-nums">
          {formatTime(secondsLeft)}
        </div>

        <p className="text-xs text-neutral-400 font-mono mt-2">
          {isRunning ? "Zen Session Active • Strict Lockdown" : "Ready to Lock In"}
        </p>

        {/* Timer Control Buttons */}
        <div className="flex items-center gap-3 mt-5">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all active:scale-[0.98] ${isRunning
              ? "bg-neutral-800 hover:bg-neutral-700 text-white"
              : "bg-white hover:bg-neutral-200 text-black shadow-md"
              }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start Sprint</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setIsRunning(false);
              setSecondsLeft(durationMinutes * 60);
              setPenaltiesTriggered(0);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] border border-[#2b2b2b] text-neutral-300 text-xs font-medium transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5 text-neutral-400" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Interactive Soundscape & Penalty Sandbox Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {/* Procedural Audio Selector */}
        <div className="p-3 bg-[#131313] border border-[#222222] rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-neutral-400 uppercase">
              Web Audio Synthesizer
            </span>
            {activeSound !== "none" ? (
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            ) : (
              <span className="text-[10px] text-neutral-500 font-mono">Off</span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {(["wind", "fireplace"] as AmbientTrack[]).map((sound) => (
              <button
                key={sound}
                onClick={() => toggleSound(sound)}
                className={`px-2 py-1.5 rounded-lg text-xs font-mono capitalize transition-all border ${activeSound === sound
                  ? "bg-neutral-200 text-black border-white font-semibold"
                  : "bg-[#181818] text-neutral-400 border-[#272727] hover:text-white hover:border-neutral-600"
                  }`}
              >
                {sound === "fireplace" ? "Fire Synth" : "Wind Synth"}
              </button>
            ))}
          </div>
        </div>

        {/* Tab-Switch Penalty Test Button */}
        <div className="p-3 bg-[#131313] border border-[#222222] rounded-xl flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-mono text-neutral-400 uppercase">
                Tab Drift Simulator
              </span>
              <span className="text-[10px] font-mono text-amber-400">
                {penaltiesTriggered} logged
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-tight">
              Test what happens when a user switches tabs or blurs the window.
            </p>
          </div>

          <button
            onClick={triggerSimulatedTabSwitch}
            className="w-full py-1.5 px-3 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Simulate Tab Switch (+2m)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
