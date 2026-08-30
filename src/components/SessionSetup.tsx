"use client";

import { useState } from "react";
import { Minus, Plus, Play, ShieldAlert, Sparkles, Volume2, Moon, Sun, ArrowLeft, Youtube } from "lucide-react";
import type { ZenTheme } from "@/lib/zen/types";

interface SessionSetupProps {
  onStart: (
    duration: number,
    goal: string,
    zenTheme: ZenTheme,
    youtubeUrl?: string
  ) => void;
  onBackToLanding?: () => void;
  initialYoutubeUrl?: string;
}

export function SessionSetup({ onStart, onBackToLanding, initialYoutubeUrl = "" }: SessionSetupProps) {
  const [duration, setDuration] = useState(2);
  const [durationInput, setDurationInput] = useState("2");
  const [goal, setGoal] = useState("");
  const [zenTheme, setZenTheme] = useState<ZenTheme>("fire");
  const [youtubeUrl, setYoutubeUrl] = useState(initialYoutubeUrl);

  const handleDurationChange = (increment: number) => {
    const next = Math.max(1, Math.min(18, duration + increment));
    setDuration(next);
    setDurationInput(next.toString());
  };

  const handleDurationInputChange = (val: string) => {
    setDurationInput(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= 24) {
      setDuration(parsed);
    }
  };

  const handleDurationInputBlur = () => {
    const parsed = parseInt(durationInput, 10);
    if (isNaN(parsed) || parsed < 1) {
      setDuration(1);
      setDurationInput("1");
    } else if (parsed > 24) {
      setDuration(24);
      setDurationInput("24");
    } else {
      setDuration(parsed);
      setDurationInput(parsed.toString());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal.trim()) {
      onStart(duration, goal, zenTheme, youtubeUrl.trim());
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto py-12 px-4 sm:px-6 animate-in fade-in duration-500 font-sans">
      {/* Header */}
      <div className="mb-10 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#272727] text-xs font-geist text-neutral-400 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f85121]" />
          <span>flocii Zen Protocol</span>
        </div>
        <h1 className="font-garamond text-3xl sm:text-5xl font-normal tracking-tight text-white dark:text-black">
          Configure Your Sprint
        </h1>
        <p className="text-sm text-neutral-400 text-pretty font-light">
          Define your deliverable and lock your workspace environment in Zen Mode.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Goal Input Card */}
        <div className="p-6 bg-[#0e0e0e] border border-[#222222] rounded-2xl space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <label htmlFor="goal" className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1">
              <span>Deliverable Objective</span>
              <span className="text-amber-500 font-bold text-sm leading-none">*</span>
            </label>
            <span className="text-xs font-mono text-neutral-500">
              {goal.length}/60
            </span>
          </div>
          <input
            id="goal"
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g. Implement database schema migrations..."
            className="w-full px-4 py-3.5 bg-[#141414] border border-[#262626] rounded-xl text-base font-medium text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/40 transition-colors"
            maxLength={60}
            required
            autoFocus
          />
        </div>

        {/* Sprint Duration Card (Editable Input + Steppers) */}
        <div className="p-6 bg-[#0e0e0e] border border-[#222222] rounded-2xl space-y-4 shadow-lg">
          <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
            Sprint Duration
          </label>
          <div className="flex items-center justify-between p-4 bg-[#141414] border border-[#262626] rounded-xl">
            <button
              type="button"
              onClick={() => handleDurationChange(-1)}
              disabled={duration <= 1}
              className="w-10 h-10 rounded-lg bg-[#1c1c1c] hover:bg-[#282828] border border-[#303030] text-neutral-200 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
              aria-label="Decrease duration"
            >
              <Minus className="w-4 h-4" />
            </button>

            <div className="text-center flex flex-col items-center">
              <input
                type="number"
                min="1"
                max="24"
                value={durationInput}
                onChange={(e) => handleDurationInputChange(e.target.value)}
                onBlur={handleDurationInputBlur}
                className="text-4xl font-semibold font-mono text-white tabular-nums bg-transparent text-center w-24 focus:outline-none border-b border-dashed border-neutral-600 focus:border-white transition-colors"
                aria-label="Sprint duration in hours"
              />
              <div className="text-xs font-mono text-neutral-400 uppercase mt-1">
                {duration === 1 ? "Hour" : "Hours"}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleDurationChange(1)}
              disabled={duration >= 24}
              className="w-10 h-10 rounded-lg bg-[#1c1c1c] hover:bg-[#282828] border border-[#303030] text-neutral-200 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
              aria-label="Increase duration"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Zen Visual Matrix Theme */}
        <div className="p-6 bg-[#0e0e0e] border border-[#222222] rounded-2xl space-y-3 shadow-lg">
          <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
            ASCII Zen Matrix Theme
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setZenTheme("fire")}
              className={`p-3.5 rounded-xl border text-left transition-all ${zenTheme === "fire"
                ? "bg-amber-500/10 border-amber-500/40 text-amber-300 shadow-sm"
                : "bg-[#121212] border-[#222222] text-neutral-400 hover:text-white"
                }`}
            >
              <div className="font-semibold text-sm mb-0.5">Fire Matrix</div>
              <div className="text-xs text-neutral-400">Warm ambient visual ASCII</div>
            </button>

            <button
              type="button"
              onClick={() => setZenTheme("rain")}
              className={`p-3.5 rounded-xl border text-left transition-all ${zenTheme === "rain"
                ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-300 shadow-sm"
                : "bg-[#121212] border-[#222222] text-neutral-400 hover:text-white"
                }`}
            >
              <div className="font-semibold text-sm mb-0.5">Rain Matrix</div>
              <div className="text-xs text-neutral-400">Cool soothing visual ASCII</div>
            </button>
          </div>
        </div>

        {/* Custom YouTube Lofi Audio URL */}
        <div className="p-6 bg-[#0e0e0e] border border-[#222222] rounded-2xl space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <label htmlFor="youtube-url" className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Youtube className="w-4 h-4 text-red-500" />
              <span>Custom YouTube Lofi Audio</span>
            </label>
            <span className="text-[11px] font-mono text-neutral-500">Optional</span>
          </div>
          <input
            id="youtube-url"
            type="url"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="Paste any YouTube video/lofi link..."
            className="w-full px-4 py-3 bg-[#141414] border border-[#262626] rounded-xl text-xs font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/40 transition-colors"
          />
          <p className="text-[11px] text-neutral-500 font-mono">
            Plays automatically in background during your session.
          </p>
        </div>

        {/* Start Button */}
        <button
          type="submit"
          disabled={!goal.trim()}
          className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-white dark:bg-black text-black dark:text-white font-semibold text-base hover:bg-neutral-200 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xl shadow-white/5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className="w-4 h-4 shrink-0"
          >
            <rect width="256" height="256" fill="none" />
            <path
              d="M72,39.88V216.12a8,8,0,0,0,12.15,6.69l144.08-88.12a7.82,7.82,0,0,0,0-13.38L84.15,33.19A8,8,0,0,0,72,39.88Z"
              opacity="0.2"
              fill="currentColor"
            />
            <path
              d="M72,39.88V216.12a8,8,0,0,0,12.15,6.69l144.08-88.12a7.82,7.82,0,0,0,0-13.38L84.15,33.19A8,8,0,0,0,72,39.88Z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
          </svg>
          <span>Launch Zen Session</span>
        </button>
      </form>

      {/* Rules Notice */}
      <div className="mt-8 p-4 bg-[#0e0e0e] border border-[#222222] rounded-2xl space-y-2 text-xs text-neutral-400">
        <div className="flex items-center gap-2 text-neutral-300 font-semibold font-mono">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span>PROTOCOL RULES</span>
        </div>
        <ul className="space-y-1 pl-5 list-disc text-neutral-400 leading-relaxed font-mono text-[11px]">
          <li>Leaving or blurring the window activates a +2m penalty</li>
          <li>One reset permitted per sprint session</li>
          <li>Press <strong>M</strong> to mute, <strong>F/R</strong> to toggle Fire/Rain, <strong>1-2</strong> for wind/fireplace</li>
        </ul>
      </div>
    </div>
  );
}
