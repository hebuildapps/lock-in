"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, Maximize, AlertTriangle } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface LockInTimerProps {
  duration: number;
  goal: string;
  onComplete: () => void;
  onProgress: (progress: number) => void;
  onResetUsed?: () => void;
  zenActive?: boolean;
  showTimer?: boolean;
  timerColor?: string;
}

export function LockInTimer({
  duration,
  goal,
  onComplete,
  onProgress,
  onResetUsed,
  zenActive = false,
  showTimer = true,
  timerColor,
}: LockInTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 3600);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenWarning, setShowFullscreenWarning] = useState(false);
  const [hasReset, setHasReset] = useState(false);
  const [isInterrupted, setIsInterrupted] = useState(false);
  const [penaltyCountdown, setPenaltyCountdown] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { reducedMotion } = useTheme();

  const totalSeconds = duration * 3600;

  useEffect(() => {
    const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;
    onProgress(progress);
  }, [timeLeft, totalSeconds, onProgress]);

  useEffect(() => {
    if (isRunning && !isPaused && !isInterrupted && penaltyCountdown === 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, isPaused, isInterrupted, penaltyCountdown, onComplete]);

  useEffect(() => {
    if (penaltyCountdown > 0) {
      const timeout = setTimeout(() => {
        setPenaltyCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [penaltyCountdown]);

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
    } catch (error) {
      console.error("Failed to enter fullscreen:", error);
    }
  };

  const exitFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
      setIsFullscreen(false);
    } catch (error) {
      console.error("Failed to exit fullscreen:", error);
    }
  };

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
    enterFullscreen();
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    if (hasReset) {
      alert("You've already used your one reset for this session. Continuing will forfeit your progress.");
      return;
    }
    
    if (confirm("Are you sure you want to reset? You can only reset once per session.")) {
      setTimeLeft(duration * 3600);
      setIsRunning(false);
      setIsPaused(false);
      setHasReset(true);
      setIsInterrupted(false);
      exitFullscreen();
      onResetUsed?.();
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

  // Minimal text-only timer overlay used on the animation page. The component
  // stays mounted so the countdown keeps running even when the full UI hides.
  if (!showTimer) {
    return (
      <div
        className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none"
        role="timer"
        aria-live="polite"
        aria-label={`Time remaining: ${formatTime(timeLeft)}`}
      >
        <div
          className="font-mono text-7xl md:text-8xl font-bold tabular-nums tracking-tight"
          style={timerColor ? { color: timerColor } : undefined}
        >
          {formatTime(timeLeft)}
        </div>
      </div>
    );
  }

  // In Zen mode, once the timer starts, hidden so the ASCII UI is the only
  // visible timer. The component stays mounted so the countdown keeps running.
  const zenHidden = zenActive && isRunning;

  return (
    <div
      className={`flex flex-col items-center justify-center gap-8 w-full max-w-4xl mx-auto p-8 ${
        zenHidden ? "hidden" : ""
      }`}
    >
      {/* Goal Display */}
      {goal && (
        <div className="neo-border-thick bg-[var(--neo-yellow)] p-6 neo-shadow w-full text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight break-words">
            {goal}
          </h2>
        </div>
      )}

      {/* Timer Display */}
      <div className="relative w-full">
        <div className="neo-border-thick bg-card p-12 neo-shadow">
          <div className="text-center">
            <div 
              className="text-6xl md:text-8xl lg:text-9xl font-bold tabular-nums tracking-tighter"
              role="timer"
              aria-live="polite"
              aria-label={`Time remaining: ${formatTime(timeLeft)}`}
            >
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* Fullscreen Warning Overlay */}
        {showFullscreenWarning && (
          <div className="absolute inset-0 neo-border-thick bg-[var(--neo-orange)] flex items-center justify-center p-8 neo-shadow animate-pulse">
            <div className="text-center">
              <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">FULLSCREEN EXITED</h3>
              <p className="text-lg">Stay focused! Re-enter fullscreen for the best experience.</p>
            </div>
          </div>
        )}

        {/* Interruption Overlay */}
        {isInterrupted && (
          <div className="absolute inset-0 neo-border-thick bg-destructive flex items-center justify-center p-8 neo-shadow z-50">
            <div className="text-center text-destructive-foreground">
              <AlertTriangle className="w-20 h-20 mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-4">SESSION INTERRUPTED</h3>
              <p className="text-xl mb-6">You navigated away from this tab!</p>
              <p className="text-lg mb-8">
                <strong>Penalty:</strong> +2 minutes added to timer<br />
                <strong>Enforced pause:</strong> 30 seconds before resuming
              </p>
              <button
                onClick={handleResumeFromInterruption}
                className="neo-border bg-background text-foreground px-8 py-4 text-xl font-bold hover:translate-x-1 hover:translate-y-1 hover:shadow-none neo-shadow-sm transition-all"
                aria-label="Resume session with penalty"
              >
                ACCEPT PENALTY & RESUME
              </button>
            </div>
          </div>
        )}

        {/* Penalty Countdown Overlay */}
        {penaltyCountdown > 0 && (
          <div className="absolute inset-0 neo-border-thick bg-[var(--neo-orange)] flex items-center justify-center p-8 neo-shadow z-50">
            <div className="text-center">
              <h3 className="text-4xl font-bold mb-4">ENFORCED PAUSE</h3>
              <div className="text-8xl font-bold tabular-nums">{penaltyCountdown}</div>
              <p className="text-xl mt-4">Reflect on your focus...</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 justify-center items-center w-full">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="neo-border-thick bg-[var(--neo-green)] px-12 py-6 text-2xl md:text-3xl font-bold hover:translate-x-2 hover:translate-y-2 hover:shadow-none neo-shadow transition-all flex items-center gap-3"
            aria-label="Start lock-in session"
          >
            <Play className="w-8 h-8" />
            START LOCK-IN
          </button>
        ) : (
          <>
            <button
              onClick={handlePause}
              disabled={penaltyCountdown > 0}
              className="neo-border bg-[var(--neo-cyan)] px-8 py-4 text-xl font-bold hover:translate-x-1 hover:translate-y-1 hover:shadow-none neo-shadow-sm transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={isPaused ? "Resume session" : "Pause session"}
              aria-pressed={isPaused}
            >
              {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
              {isPaused ? "RESUME" : "PAUSE"}
            </button>
            
            <button
              onClick={handleReset}
              disabled={penaltyCountdown > 0}
              className="neo-border bg-[var(--neo-pink)] px-8 py-4 text-xl font-bold hover:translate-x-1 hover:translate-y-1 hover:shadow-none neo-shadow-sm transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Reset session"
            >
              <RotateCcw className="w-6 h-6" />
              RESET {hasReset && "(USED)"}
            </button>
          </>
        )}

        <button
          onClick={isFullscreen ? exitFullscreen : enterFullscreen}
          className="neo-border bg-muted px-8 py-4 text-xl font-bold hover:translate-x-1 hover:translate-y-1 hover:shadow-none neo-shadow-sm transition-all flex items-center gap-2"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          aria-pressed={isFullscreen}
        >
          <Maximize className="w-6 h-6" />
          {isFullscreen ? "EXIT FULLSCREEN" : "FULLSCREEN"}
        </button>
      </div>
    </div>
  );
}