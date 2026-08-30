"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Maximize, Minimize, AlertTriangle, ShieldAlert } from "lucide-react";

interface LockInTimerProps {
  duration: number;
  goal: string;
  onComplete: () => void;
  onProgress: (progress: number) => void;
  onResetUsed?: () => void;
  timerColor?: string;
  showControls?: boolean;
}

export function LockInTimer({
  duration,
  goal,
  onComplete,
  onProgress,
  onResetUsed,
  timerColor = "#ff7800",
}: LockInTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 3600);
  const [isRunning, setIsRunning] = useState(true); // Active immediately on launch
  const [isPaused, setIsPaused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenWarning, setShowFullscreenWarning] = useState(false);
  const [hasReset, setHasReset] = useState(false);
  const [isInterrupted, setIsInterrupted] = useState(false);
  const [penaltyCountdown, setPenaltyCountdown] = useState(0);

  const totalSeconds = duration * 3600;

  // Sync progress
  useEffect(() => {
    const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;
    onProgress(progress);
  }, [timeLeft, totalSeconds, onProgress]);

  // Main countdown timer (always runs active during session unless paused or in penalty)
  useEffect(() => {
    if (!isRunning || isPaused || isInterrupted || penaltyCountdown > 0) {
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isPaused, isInterrupted, penaltyCountdown, onComplete]);

  // Penalty cooldown countdown
  useEffect(() => {
    if (penaltyCountdown <= 0) return;
    const timeout = setTimeout(() => {
      setPenaltyCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [penaltyCountdown]);

  // Tab-switch visibility listener (+2 min penalty)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isRunning && !isPaused) {
        setIsInterrupted(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isRunning, isPaused]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);

      if (!isCurrentlyFullscreen && isRunning) {
        setShowFullscreenWarning(true);
        setTimeout(() => setShowFullscreenWarning(false), 5000);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [isRunning]);

  const enterFullscreen = async () => {
    try {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } catch {
      // ignore
    }
  };

  const exitFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
      setIsFullscreen(false);
    } catch {
      // ignore
    }
  };

  const handleResumeFromInterruption = () => {
    setTimeLeft((prev) => prev + 120);
    setPenaltyCountdown(30);
    setIsInterrupted(false);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <>
      {/* Central JetBrains Mono Digital Clock Display for Zen Mode */}
      <div
        className="fixed inset-0 z-20 flex flex-col items-center justify-center pointer-events-none select-none"
        role="timer"
        aria-live="polite"
        aria-label={`Time remaining: ${formatTime(timeLeft)}`}
      >
        <div
          className="font-timer text-7xl sm:text-8xl md:text-9xl font-bold tabular-nums tracking-tight transition-colors duration-500 drop-shadow-2xl"
          style={{ color: timerColor }}
        >
          {formatTime(timeLeft)}
        </div>
        {goal && (
          <p className="mt-4 text-sm sm:text-base font-mono text-neutral-400 max-w-lg text-center px-4 truncate opacity-80">
            {goal}
          </p>
        )}
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

      {/* Penalty Cooldown Display */}
      {penaltyCountdown > 0 && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-6">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-2">
            Enforced Focus Cooldown
          </span>
          <div className="text-7xl sm:text-8xl font-bold font-timer text-white tabular-nums mb-3">
            {penaltyCountdown}
          </div>
          <p className="text-xs text-neutral-500 font-mono">Reflect on your current sprint deliverable...</p>
        </div>
      )}
    </>
  );
}