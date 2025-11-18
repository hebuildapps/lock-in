"use client";

import { useState } from "react";
import { Clock, List } from "lucide-react";
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

type SessionState = "setup" | "active" | "completed" | "history";

interface CompletedSession {
  id: string;
  goal: string;
  duration: number;
  completedAt: Date;
  usedReset: boolean;
}

export default function Home() {
  const [sessionState, setSessionState] = useState<SessionState>("setup");
  const [duration, setDuration] = useState(0);
  const [goal, setGoal] = useState("");
  const [progress, setProgress] = useState(0);
  const [usedReset, setUsedReset] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  const handleStartSession = (sessionDuration: number, sessionGoal: string) => {
    setDuration(sessionDuration);
    setGoal(sessionGoal);
    setSessionState("active");
    setProgress(0);
    setUsedReset(false);
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

    // Save session to history
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

  return (
    <main className="min-h-screen relative">
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

      <div className="container mx-auto min-h-screen flex flex-col items-center justify-center py-8 px-4">
        {sessionState === "setup" && (
          <>
            <SessionSetup onStart={handleStartSession} />
            <div className="mt-16 w-full">
              <AchievementBadges />
            </div>
          </>
        )}

        {sessionState === "active" && (
          <div className="w-full space-y-8">
            <LockInTimer
              duration={duration}
              goal={goal}
              onComplete={handleCompleteSession}
              onProgress={handleProgress}
              onResetUsed={handleResetUsed}
            />
            <ProgressBar progress={progress} />
          </div>
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
          "Lock-in session active. Timer is running."}
        {sessionState === "completed" && "Session completed! Congratulations!"}
      </div>
    </main>
  );
}
