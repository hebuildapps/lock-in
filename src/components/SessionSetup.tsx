"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { UiMode, ZenTheme } from "@/lib/zen/types";

interface SessionSetupProps {
  onStart: (
    duration: number,
    goal: string,
    mode: UiMode,
    zenTheme: ZenTheme
  ) => void;
}

export function SessionSetup({ onStart }: SessionSetupProps) {
  const [duration, setDuration] = useState(18);
  const [goal, setGoal] = useState("");
  const [uiMode, setUiMode] = useState<UiMode>("normal");
  const [zenTheme, setZenTheme] = useState<ZenTheme>("fire");

  const handleDurationChange = (increment: number) => {
    setDuration((prev) => Math.max(1, Math.min(18, prev + increment)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal.trim()) {
      onStart(duration, goal, uiMode, zenTheme);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full max-w-4xl mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl md:text-7xl pt-12 lg:text-8xl font-bold mb-4 tracking-tight">
          LOCK-IN
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          COMMIT TO DEEP WORK. NO DISTRACTIONS.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-8">
        <div className="space-y-4">
          <label
            htmlFor="goal"
            className="text-2xl font-bold block text-center"
          >
            WHAT&apos;S YOUR GOAL?
          </label>
          <input
            id="goal"
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="COMPLETE PROJECT MILESTONE"
            className="w-full neo-border-thick bg-card px-6 py-6 text-2xl md:text-3xl font-bold text-center uppercase placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-ring"
            maxLength={60}
            required
            aria-label="Enter your focus goal"
            autoFocus
          />
          <p className="text-center text-sm text-muted-foreground">
            {goal.length}/60 characters
          </p>
        </div>

        <div className="space-y-4">
          <label className="text-2xl font-bold block text-center">
            SESSION DURATION
          </label>
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => handleDurationChange(-1)}
              disabled={duration <= 1}
              className="neo-border bg-muted p-4 hover:translate-x-1 hover:translate-y-1 hover:shadow-none neo-shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Decrease duration"
            >
              <Minus className="w-8 h-8" />
            </button>

            <div className="neo-border-thick bg-[var(--neo-cyan)] px-12 py-8 neo-shadow min-w-[200px]">
              <div className="text-6xl md:text-7xl font-bold text-center tabular-nums">
                {duration}
              </div>
              <div className="text-2xl font-bold text-center mt-2">
                {duration === 1 ? "HOUR" : "HOURS"}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleDurationChange(1)}
              disabled={duration >= 18}
              className="neo-border bg-muted p-4 hover:translate-x-1 hover:translate-y-1 hover:shadow-none neo-shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Increase duration"
            >
              <Plus className="w-8 h-8" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-2xl font-bold block text-center">
            SESSION MODE
          </label>
          <div
            className="flex flex-col sm:flex-row items-stretch justify-center gap-4"
            role="group"
            aria-label="Choose session mode"
          >
            <button
              type="button"
              onClick={() => setUiMode("normal")}
              className={`neo-border px-8 py-6 text-xl font-bold transition-all flex-1 max-w-xs mx-auto sm:mx-0 ${
                uiMode === "normal"
                  ? "bg-[var(--neo-yellow)] neo-shadow"
                  : "bg-muted hover:translate-x-1 hover:translate-y-1 hover:shadow-none neo-shadow-sm"
              }`}
              aria-pressed={uiMode === "normal"}
            >
              NORMAL
            </button>
            <button
              type="button"
              onClick={() => setUiMode("zen")}
              className={`neo-border px-8 py-6 text-xl font-bold transition-all flex-1 max-w-xs mx-auto sm:mx-0 ${
                uiMode === "zen"
                  ? "bg-[var(--neo-pink)] neo-shadow"
                  : "bg-muted hover:translate-x-1 hover:translate-y-1 hover:shadow-none neo-shadow-sm"
              }`}
              aria-pressed={uiMode === "zen"}
            >
              ZEN
            </button>
          </div>

          {uiMode === "zen" && (
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setZenTheme("fire")}
                className={`neo-border px-6 py-3 text-sm font-bold ${
                  zenTheme === "fire" ? "bg-[var(--neo-orange)]" : "bg-muted"
                }`}
                aria-pressed={zenTheme === "fire"}
              >
                FIRE
              </button>
              <button
                type="button"
                onClick={() => setZenTheme("rain")}
                className={`neo-border px-6 py-3 text-sm font-bold ${
                  zenTheme === "rain" ? "bg-[var(--neo-cyan)]" : "bg-muted"
                }`}
                aria-pressed={zenTheme === "rain"}
              >
                RAIN
              </button>
            </div>
          )}

          <p className="text-center text-xs md:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            In session: <strong>N</strong> normal · <strong>Z</strong> zen ·{" "}
            <strong>F</strong>/<strong>R</strong> fire/rain · <strong>M</strong>{" "}
            mute · <strong>1–4</strong> wind/rain/fire/cafe audio
          </p>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={!goal.trim()}
            className="neo-border-thick bg-[var(--neo-green)] px-16 py-8 text-3xl md:text-4xl font-bold hover:translate-x-2 hover:translate-y-2 hover:shadow-none neo-shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Start lock-in session"
          >
            START LOCK-IN
          </button>
        </div>
      </form>

      <div className="neo-border bg-[var(--neo-orange)] p-6 w-full">
        <h3 className="text-xl font-bold mb-3">⚠️ SESSION RULES:</h3>
        <ul className="space-y-2 text-sm md:text-base">
          <li>✓ Fullscreen mode will be activated</li>
          <li>✓ Leaving the tab = +2 min penalty + 30s pause</li>
          <li>✓ Only ONE reset allowed per session</li>
          <li>✓ Complete without reset to unlock badges</li>
        </ul>
      </div>
    </div>
  );
}
