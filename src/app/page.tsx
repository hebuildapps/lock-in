"use client";

import { useCallback, useEffect, useState } from "react";
import { List, ArrowLeft, Maximize, Minimize, Power } from "lucide-react";
import { LandingNav } from "@/components/landing/LandingNav";
import { LandingHero } from "@/components/landing/LandingHero";
import { TaglineReveal } from "@/components/landing/TaglineReveal";
import { CoreMechanics } from "@/components/landing/CoreMechanics";
import { AudioTestBench } from "@/components/landing/AudioTestBench";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { PlatformDownload } from "@/components/landing/PlatformDownload";
import { LandingFaq } from "@/components/landing/LandingFaq";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { WindowsDownloadModal } from "@/components/landing/WindowsDownloadModal";

import { SessionSetup } from "@/components/SessionSetup";
import { LockInTimer } from "@/components/LockInTimer";
import {
  AchievementBadges,
  unlockAchievement,
} from "@/components/AchievementBadges";
import { CompletionCelebration } from "@/components/CompletionCelebration";
import { SessionHistory } from "@/components/SessionHistory";
import { ZenBackground } from "@/components/ZenBackground";
import { useTheme } from "@/components/ThemeProvider";
import { useZenKeyboard } from "@/hooks/useZenKeyboard";
import { FloatingControls } from "@/components/FloatingControls";
import { SettingsModal } from "@/components/SettingsModal";
import { YouTubeAudioPlayer } from "@/components/YouTubeAudioPlayer";
import { getAmbientEngine } from "@/lib/zen/ambientAudio";
import type { AmbientTrack, ZenTheme } from "@/lib/zen/types";

type ViewMode = "landing" | "app";
type SessionState = "setup" | "active" | "completed" | "history";
type SettingsTab = "sound" | "keyboard" | "about";

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
  const [viewMode, setViewMode] = useState<ViewMode>("landing");
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  const [sessionState, setSessionState] = useState<SessionState>("setup");
  const [duration, setDuration] = useState(2);
  const [goal, setGoal] = useState("");
  const [progress, setProgress] = useState(0);
  const [usedReset, setUsedReset] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [zenTheme, setZenTheme] = useState<ZenTheme>("fire");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeTracks, setActiveTracks] = useState<AmbientTrack[]>([]);
  const [volume, setVolume] = useState(() =>
    typeof window === "undefined" ? 0.5 : getAmbientEngine()?.getVolume() ?? 0.5
  );
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState<SettingsTab>("sound");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { reducedMotion, setReducedMotion } = useTheme();

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
    enabled: viewMode === "app" && sessionState === "active",
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
    if (viewMode !== "app" || sessionState !== "active") {
      getAmbientEngine()?.stopAll();
      setActiveTracks([]);
    }
  }, [viewMode, sessionState]);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // ignore
    }
  };

  const handleStartSession = (
    sessionDuration: number,
    sessionGoal: string,
    theme: ZenTheme,
    customYoutubeUrl?: string
  ) => {
    setDuration(sessionDuration);
    setGoal(sessionGoal);
    setZenTheme(theme);
    if (customYoutubeUrl !== undefined) {
      setYoutubeUrl(customYoutubeUrl);
    }
    setSessionState("active");
    setProgress(0);
    setUsedReset(false);
    setSettingsOpen(false);

    // Auto-enter fullscreen for Zen mode
    void document.documentElement.requestFullscreen().catch(() => {});
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

    if (duration >= 18) {
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

  const handleEndSessionEarly = () => {
    if (confirm("End current sprint early and return to setup?")) {
      setSessionState("setup");
      getAmbientEngine()?.stopAll();
      setActiveTracks([]);
      if (document.fullscreenElement) {
        void document.exitFullscreen().catch(() => {});
      }
    }
  };

  // RENDER LANDING PAGE VIEW
  if (viewMode === "landing") {
    return (
      <div className="min-h-screen bg-white text-[#0f172a] font-sans selection:bg-[#ffedd5] selection:text-[#c2410c]">
        <LandingNav
          onLaunchApp={() => {
            setViewMode("app");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onOpenDownload={() => setDownloadModalOpen(true)}
        />

        <main>
          <LandingHero
            onLaunchApp={() => {
              setViewMode("app");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onOpenDownload={() => setDownloadModalOpen(true)}
          />

          <TaglineReveal />

          <CoreMechanics />

          <AudioTestBench />

          <HowItWorks />

          <PlatformDownload
            onLaunchApp={() => {
              setViewMode("app");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onOpenDownload={() => setDownloadModalOpen(true)}
          />

          <LandingFaq />
        </main>

        <LandingFooter
          onLaunchApp={() => {
            setViewMode("app");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onOpenDownload={() => setDownloadModalOpen(true)}
        />

        <WindowsDownloadModal
          open={downloadModalOpen}
          onClose={() => setDownloadModalOpen(false)}
        />
      </div>
    );
  }

  // RENDER APP VIEW (PURE ZEN MODE ONLY)
  const isZenActive = sessionState === "active";

  return (
    <main
      className={`min-h-screen relative bg-black ${isZenActive ? "zen-active" : ""}`}
      data-zen={isZenActive ? "true" : undefined}
    >
      {/* ASCII Zen Background Layer (Active during session) */}
      {isZenActive && (
        <ZenBackground
          theme={zenTheme}
          reducedMotion={reducedMotion}
          playing
        />
      )}

      {/* Hidden YouTube Lofi Player */}
      <YouTubeAudioPlayer
        url={youtubeUrl}
        playing={isZenActive && soundEnabled}
        volume={volume}
      />

      {/* Top Floating App Bar */}
      <div
        className="fixed top-4 left-4 right-4 flex items-center justify-between z-30 pointer-events-none"
        role="toolbar"
        aria-label="Navigation and controls"
      >
        <button
          onClick={() => {
            if (isZenActive) {
              if (!confirm("Exit active sprint and return to landing page?")) return;
            }
            getAmbientEngine()?.stopAll();
            setViewMode("landing");
            setSessionState("setup");
            if (document.fullscreenElement) {
              void document.exitFullscreen().catch(() => {});
            }
          }}
          className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 bg-[#121212]/80 hover:bg-[#1c1c1c] border border-[#272727] text-neutral-300 text-xs font-mono rounded-xl backdrop-blur-md transition-colors"
          title="Return to Landing Page"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Landing</span>
        </button>

        <div className="pointer-events-auto flex items-center gap-2">
          {sessionState === "setup" && (
            <button
              onClick={handleShowHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#121212]/80 hover:bg-[#1a1a1a] border border-[#272727] text-neutral-300 text-xs font-mono rounded-xl backdrop-blur-md transition-colors"
              aria-label="View session history"
              title="Session History"
            >
              <List className="w-3.5 h-3.5" />
              <span>History</span>
            </button>
          )}

          {isZenActive && (
            <>
              <button
                onClick={toggleFullscreen}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#121212]/80 hover:bg-[#1a1a1a] border border-[#272727] text-neutral-300 text-xs font-mono rounded-xl backdrop-blur-md transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
                <span>{isFullscreen ? "Exit FS" : "Fullscreen"}</span>
              </button>

              <button
                onClick={handleEndSessionEarly}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 text-xs font-mono rounded-xl backdrop-blur-md transition-colors"
                title="End Sprint Early"
              >
                <Power className="w-3.5 h-3.5" />
                <span>End Sprint</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Container */}
      <div className="container mx-auto min-h-screen flex flex-col items-center justify-center py-8 px-4 relative z-10">
        {sessionState === "setup" && (
          <>
            <SessionSetup
              onStart={handleStartSession}
              onBackToLanding={() => {
                getAmbientEngine()?.stopAll();
                setViewMode("landing");
              }}
              initialYoutubeUrl={youtubeUrl}
            />
            <div className="mt-8 w-full">
              <AchievementBadges />
            </div>
          </>
        )}

        {/* Pure Zen Mode Live Sprint with JetBrains Mono Timer */}
        {sessionState === "active" && (
          <LockInTimer
            duration={duration}
            goal={goal}
            onComplete={handleCompleteSession}
            onProgress={handleProgress}
            onResetUsed={handleResetUsed}
            timerColor={THEME_TIMER_COLORS[zenTheme]}
          />
        )}

        {sessionState === "completed" && (
          <CompletionCelebration
            duration={duration}
            goal={goal}
            onClose={handleCloseCompletion}
            usedReset={usedReset}
          />
        )}

        {sessionState === "history" && (
          <SessionHistory onBack={handleBackFromHistory} />
        )}
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
        youtubeUrl={youtubeUrl}
        onYoutubeUrlChange={setYoutubeUrl}
        reducedMotion={reducedMotion}
        onReducedMotionChange={setReducedMotion}
      />
    </main>
  );
}
