"use client";

import { useCallback, useEffect, useState } from "react";
import { List } from "lucide-react";
import { SessionSetup } from "@/components/SessionSetup";
import { LockInTimer } from "@/components/LockInTimer";
import { ProgressBar } from "@/components/ProgressBar";
import {
  AchievementBadges,
  unlockAchievement,
} from "@/components/AchievementBadges";
import { CompletionCelebration } from "@/components/CompletionCelebration";
import { SessionHistory } from "@/components/SessionHistory";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ReducedMotionToggle } from "@/components/ReducedMotionToggle";
import { ZenBackground } from "@/components/ZenBackground";
import { useTheme } from "@/components/ThemeProvider";
import { useZenKeyboard } from "@/hooks/useZenKeyboard";
import { FloatingControls } from "@/components/FloatingControls";
import { SettingsModal } from "@/components/SettingsModal";
import { getAmbientEngine } from "@/lib/zen/ambientAudio";
import { AMBIENT_TRACKS } from "@/lib/zen/types";
import type { AmbientTrack, UiMode, ZenTheme } from "@/lib/zen/types";

type SessionState = "setup" | "active" | "completed" | "history";

type SettingsTab = "general" | "sound" | "keyboard" | "about";

interface CompletedSession {
  id: string;
  goal: string;
  duration: number;
  completedAt: Date;
  usedReset: boolean;
}

const THEME_TIMER_COLORS: Record<ZenTheme, string> = {
  fire: "#ff7800",
  rain: "#5078c8",
};

export default function Home() {
  const [sessionState, setSessionState] = useState<SessionState>("setup");
  const [duration, setDuration] = useState(0);
  const [goal, setGoal] = useState("");
  const [progress, setProgress] = useState(0);
  const [usedReset, setUsedReset] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [uiMode, setUiMode] = useState<UiMode>("normal");
  const [zenTheme, setZenTheme] = useState<ZenTheme>("fire");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeTracks, setActiveTracks] = useState<AmbientTrack[]>([]);
  const [volume, setVolume] = useState(() =>
    typeof window === "undefined" ? 0.5 : getAmbientEngine()?.getVolume() ?? 0.5
  );
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState<SettingsTab>("general");
  const { reducedMotion, setReducedMotion, theme, setTheme } = useTheme();

  const handleAmbientTrack = useCallback((track: AmbientTrack) => {
    const engine = getAmbientEngine();
    if (!engine) return;
    const next = engine.toggleTrack(track);
    setActiveTracks(next ?? []);
  }, []);

  const handleVolumeChange = useCallback((nextVolume: number) => {
    setVolume(nextVolume);
    getAmbientEngine()?.setVolume(nextVolume);
  }, []);

  const openSettings = useCallback((tab: SettingsTab) => {
    setSettingsTab(tab);
    setSettingsOpen(true);
  }, []);

  useZenKeyboard({
    enabled: sessionState === "active",
    uiMode,
    setUiMode,
    setZenTheme,
    soundEnabled,
    setSoundEnabled,
    onAmbientTrack: handleAmbientTrack,
  });

  useEffect(() => {
    const engine = getAmbientEngine();
    if (!engine) return;
    engine.setEnabled(soundEnabled);
    if (!soundEnabled) setActiveTracks([]);
  }, [soundEnabled]);

  useEffect(() => {
    if (sessionState !== "active") {
      getAmbientEngine()?.stopAll();
      setActiveTracks([]);
    }
  }, [sessionState]);

  useEffect(() => {
    return () => {
      getAmbientEngine()?.stopAll();
    };
  }, []);

  const handleStartSession = (
    sessionDuration: number,
    sessionGoal: string,
    mode: UiMode,
    theme: ZenTheme
  ) => {
    setDuration(sessionDuration);
    setGoal(sessionGoal);
    setUiMode(mode);
    setZenTheme(theme);
    setSessionState("active");
    setProgress(0);
    setUsedReset(false);
    setSettingsOpen(false);
  };

  const handleResetUsed = () => {
    setUsedReset(true);
  };

  const saveSessionToHistory = (
    sessionGoal: string,
    sessionDuration: number,
    sessionUsedReset: boolean
  ) => {
    const newSession: CompletedSession = {
      id: Date.now().toString(),
      goal: sessionGoal,
      duration: sessionDuration,
      completedAt: new Date(),
      usedReset: sessionUsedReset,
    };

    const existingSessions = localStorage.getItem("lockInSessions");
    const sessions = existingSessions ? JSON.parse(existingSessions) : [];
    sessions.push(newSession);
    localStorage.setItem("lockInSessions", JSON.stringify(sessions));
  };

  const handleCompleteSession = () => {
    setSessionState("completed");
    getAmbientEngine()?.stopAll();
    setActiveTracks([]);

    saveSessionToHistory(goal, duration, usedReset);

    const newCompletedCount = completedSessions + 1;
    setCompletedSessions(newCompletedCount);

    if (newCompletedCount === 1) {
      unlockAchievement("first-lockin");
    }

    if (!usedReset) {
      unlockAchievement("no-reset");
    }

    if (newCompletedCount >= 3) {
      unlockAchievement("streak-starter");
    }

    if (duration === 18) {
      unlockAchievement("marathon");
    }

    window.dispatchEvent(new Event("storage"));
  };

  const handleCloseCompletion = () => {
    setSessionState("setup");
    setProgress(0);
  };

  const handleProgress = (newProgress: number) => {
    setProgress(newProgress);
  };

  const handleShowHistory = () => {
    setSessionState("history");
  };

  const handleBackFromHistory = () => {
    setSessionState("setup");
  };

  const isZen = sessionState === "active" && uiMode === "zen";

  return (
    <main
      className={`min-h-screen relative ${isZen ? "zen-active" : ""}`}
      data-zen={isZen ? "true" : undefined}
    >
      {isZen && (
        <ZenBackground
          theme={zenTheme}
          reducedMotion={reducedMotion}
          playing
        />
      )}

      {sessionState !== "active" && (
        <div
          className="absolute top-4 right-4 flex gap-2 z-10"
          role="toolbar"
          aria-label="Navigation and accessibility controls"
        >
          <button
            onClick={handleShowHistory}
            className="neo-border bg-background text-foreground p-3 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none neo-shadow-sm"
            aria-label="View session history"
            title="Session History"
          >
            <List className="w-5 h-5" />
          </button>
          <ReducedMotionToggle />
          <ThemeToggle />
        </div>
      )}

      <div className="container mx-auto min-h-screen flex flex-col items-center justify-center py-8 px-4 relative z-10">
        {sessionState === "setup" && (
          <>
            <SessionSetup onStart={handleStartSession} />
            <div className="mt-16 w-full">
              <AchievementBadges />
            </div>
          </>
        )}

        {sessionState === "active" && !isZen && (
          <div className="w-full space-y-8">
            <LockInTimer
              duration={duration}
              goal={goal}
              onComplete={handleCompleteSession}
              onProgress={handleProgress}
              onResetUsed={handleResetUsed}
              zenActive={false}
            />
            <ProgressBar progress={progress} />
          </div>
        )}

        {sessionState === "active" && isZen && (
          <LockInTimer
            duration={duration}
            goal={goal}
            onComplete={handleCompleteSession}
            onProgress={handleProgress}
            onResetUsed={handleResetUsed}
            zenActive={true}
            showTimer={false}
            timerColor={THEME_TIMER_COLORS[zenTheme]}
          />
        )}

        {sessionState === "completed" && (
          <>
            <CompletionCelebration
              duration={duration}
              goal={goal}
              onClose={handleCloseCompletion}
              usedReset={usedReset}
            />
          </>
        )}

        {sessionState === "history" && (
          <SessionHistory onBack={handleBackFromHistory} />
        )}
      </div>

      <div className="sr-only" role="status" aria-live="polite">
        {sessionState === "setup" &&
          "Session setup page. Use Tab to navigate between controls."}
        {sessionState === "active" &&
          `Lock-in session active. Mode ${uiMode}. Sound ${
            soundEnabled ? "on" : "muted"
          }.`}
        {sessionState === "completed" && "Session completed! Congratulations!"}
      </div>

      <FloatingControls
        soundEnabled={soundEnabled}
        onOpenSettings={() => openSettings("sound")}
      />

      <SettingsModal
        key={settingsOpen ? "open" : "closed"}
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        initialTab={settingsTab}
        soundEnabled={soundEnabled}
        onSoundChange={setSoundEnabled}
        activeTracks={activeTracks}
        onToggleTrack={handleAmbientTrack}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        theme={theme}
        onThemeChange={setTheme}
        reducedMotion={reducedMotion}
        onReducedMotionChange={setReducedMotion}
      />
    </main>
  );
}
