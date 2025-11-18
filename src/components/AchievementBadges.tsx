"use client";

import { useEffect, useState } from "react";
import { Award, Zap, Trophy, Target } from "lucide-react";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
}

export function AchievementBadges() {
  const [badges, setBadges] = useState<Badge[]>([
    {
      id: "first-lockin",
      name: "First Lock-In",
      description: "Complete your first session",
      icon: <Award className="w-8 h-8" />,
      unlocked: false,
    },
    {
      id: "no-reset",
      name: "Unbroken Focus",
      description: "Complete a session without resetting",
      icon: <Target className="w-8 h-8" />,
      unlocked: false,
    },
    {
      id: "streak-starter",
      name: "Streak Starter",
      description: "Complete 3 sessions in a row",
      icon: <Zap className="w-8 h-8" />,
      unlocked: false,
    },
    {
      id: "marathon",
      name: "Marathon Master",
      description: "Complete an 18-hour session",
      icon: <Trophy className="w-8 h-8" />,
      unlocked: false,
    },
  ]);

  useEffect(() => {
    const savedBadges = localStorage.getItem("achievements");
    if (savedBadges) {
      try {
        const parsed = JSON.parse(savedBadges);
        setBadges((current) =>
          current.map((badge) => ({
            ...badge,
            unlocked: parsed[badge.id] || false,
          }))
        );
      } catch (error) {
        console.error("Failed to load achievements:", error);
      }
    }
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-center">ACHIEVEMENTS</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`neo-border p-4 text-center transition-all ${
              badge.unlocked
                ? "bg-[var(--neo-yellow)] neo-shadow"
                : "bg-muted opacity-50"
            }`}
            role="img"
            aria-label={`${badge.name}: ${badge.description}${badge.unlocked ? " - Unlocked" : " - Locked"}`}
          >
            <div className="flex justify-center mb-2">{badge.icon}</div>
            <div className="font-bold text-sm mb-1">{badge.name}</div>
            <div className="text-xs text-muted-foreground">{badge.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function unlockAchievement(achievementId: string) {
  const savedBadges = localStorage.getItem("achievements");
  const achievements = savedBadges ? JSON.parse(savedBadges) : {};
  achievements[achievementId] = true;
  localStorage.setItem("achievements", JSON.stringify(achievements));
}
