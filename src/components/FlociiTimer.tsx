"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, ShieldAlert } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export interface FlociiTimerProps {
  duration: number; // in minutes
  goal: string;
  onComplete: () => void;
  onProgress: (progress: number) => void;
  onResetUsed?: () => void;
  timerColor?: string;
}

export type LockInTimerProps = FlociiTimerProps;

export function FlociiTimer({
  duration,
  goal,
  onComplete,
  onProgress,
}: FlociiTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isInterrupted, setIsInterrupted] = useState(false);
  const [penaltyCountdown, setPenaltyCountdown] = useState(0);
  const [showFullscreenWarning, setShowFullscreenWarning] = useState(false);
  const [isDocked, setIsDocked] = useState(false);
  const { theme } = useTheme();

  // After 5 seconds of entering the session, smoothly glide and shrink to bottom-left corner
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDocked(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)")?.matches);

  const totalSeconds = duration * 60;
  const elapsedSeconds = totalSeconds - timeLeft;
  const progressPercent = Math.min(
    100,
    Math.max(0, (elapsedSeconds / totalSeconds) * 100)
  );

  // Main countdown tick
  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    if (isInterrupted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        const totalSeconds = duration * 60;
        const currentProgress = ((totalSeconds - next) / totalSeconds) * 100;
        onProgress(Math.min(100, Math.max(0, currentProgress)));
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isInterrupted, duration, onComplete, onProgress]);

  // Tab switch & visibility change detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && timeLeft > 0) {
        setIsInterrupted(true);
      }
    };

    const handleWindowBlur = () => {
      if (timeLeft > 0) {
        setIsInterrupted(true);
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && timeLeft > 0) {
        setShowFullscreenWarning(true);
        setTimeout(() => setShowFullscreenWarning(false), 4000);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [timeLeft]);

  // Penalty countdown
  useEffect(() => {
    if (penaltyCountdown > 0) {
      const timer = setTimeout(() => {
        setPenaltyCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [penaltyCountdown]);

  const handleResumeFromInterruption = () => {
    setTimeLeft((prev) => prev + 120);
    setPenaltyCountdown(30);
    setIsInterrupted(false);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <>
      {/* Central Display for Zen Mode (Smoothly glides and shrinks to bottom-left corner with gentle 1.8s easing) */}
      <div
        className={`fixed z-20 select-none transition-all duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isDocked
          ? "top-[calc(100%-1.25rem)] left-5 -translate-y-full translate-x-0 scale-[0.6] origin-bottom-left"
          : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100 origin-center"
          }`}
        role="timer"
        aria-live="polite"
        aria-label={`Time remaining: ${formatTime(timeLeft)}`}
      >
        {/* Exact same transparent box and dimensions for both Dark and Light themes */}
        <div
          onClick={() => setIsDocked(!isDocked)}
          className={`border-2 px-10 sm:px-16 py-8 sm:py-10 shadow-none flex flex-col items-center justify-center min-w-[290px] sm:min-w-[460px] bg-transparent pointer-events-auto transition-colors duration-300 ${isDark ? "border-white/80 text-white" : "border-black text-black"
            } ${isDocked ? "cursor-pointer hover:scale-[1.03]" : ""}`}
          title={isDocked ? "Click to expand timer" : "Click to dock timer"}
        >
          {/* High-contrast timer digits */}
          <div
            className={`font-timer text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight tabular-nums ${isDark ? "text-white" : "text-black"
              }`}
          >
            {formatTime(timeLeft)}
          </div>

          {/* Minimalist Progress Track */}
          <div
            className={`w-48 sm:w-72 h-1.5 mt-6 mb-3 relative overflow-hidden rounded-full ${isDark ? "bg-neutral-800" : "bg-neutral-200"
              }`}
          >
            <div
              className={`h-full transition-all duration-300 ease-out ${isDark ? "bg-white" : "bg-black"
                }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Subtext info */}
          <p
            className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-center ${isDark ? "text-neutral-400" : "text-neutral-600"
              }`}
          >
            {isDocked
              ? `RUNNING · ${formatTime(timeLeft)}`
              : `RUNNING · ${goal || "Click or ESC to exit"}`}
          </p>
        </div>
      </div>

      {/* Fullscreen Warning Badge */}
      {showFullscreenWarning && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-amber-500/20 border border-amber-500/40 backdrop-blur-md rounded-xl px-4 py-2 text-amber-300 text-xs font-mono flex items-center gap-2 animate-in fade-in shadow-2xl">
          <AlertTriangle className="w-4 h-4" />
          <span>Fullscreen exited. Press Fullscreen button for total immersion.</span>
        </div>
      )}

      {/* Tab-Switch Penalty Modal Overlay */}
      {isInterrupted && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex flex-col items-center justify-center p-6 animate-in fade-in">
          <div className="w-14 h-14 rounded-2xl bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-400 mb-4 shadow-2xl">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-2 tracking-tight">Session Interrupted</h3>
          <p className="text-xs text-neutral-300 max-w-sm text-center mb-6 font-mono leading-relaxed">
            Window focus lost. A mandatory <strong className="text-red-400">+2 min penalty</strong> will be added and a 30-second cooldown enforced.
          </p>
          <button
            onClick={handleResumeFromInterruption}
            className="py-3.5 px-6 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all shadow-xl active:scale-95"
          >
            Accept Penalty & Resume Sprint
          </button>
        </div>
      )}
    </>
  );
}

export const LockInTimer = FlociiTimer;