"use client";

import { useEffect, useState } from "react";
import { Award, Zap, Trophy, Target, CheckCircle2, Lock } from "lucide-react";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: typeof Award;
  unlocked: boolean;
}

export function AchievementBadges() {
  const [badges, setBadges] = useState<Badge[]>([
    {
      id: "first-lockin",
      name: "First Lock-In",
      description: "Complete your first deep work sprint",
      icon: Award,
      unlocked: false,
    },
    {
      id: "no-reset",
      name: "Unbroken Focus",
      description: "Complete a sprint with zero resets",
      icon: Target,
      unlocked: false,
    },
    {
      id: "streak-starter",
      name: "Streak Starter",
      description: "Complete 3 sessions in sequence",
      icon: Zap,
      unlocked: false,
    },
    {
      id: "marathon",
      name: "Marathon Master",
      description: "Complete an extended 18-hour session",
      icon: Trophy,
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
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
          Earned Milestones
        </h3>
        <span className="text-xs font-mono text-neutral-500">
          {badges.filter((b) => b.unlocked).length}/{badges.length} Unlocked
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {badges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.id}
              className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-between space-y-2 ${
                badge.unlocked
                  ? "bg-[#141414] border-white/30 text-white shadow-lg"
                  : "bg-[#0c0c0c] border-[#1e1e1e] text-neutral-500 opacity-60"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                  badge.unlocked
                    ? "bg-[#1f1f1f] border-[#333333] text-emerald-400"
                    : "bg-[#141414] border-[#222222] text-neutral-600"
                }`}
              >
                {badge.unlocked ? <Icon className="w-4 h-4" /> : <Lock className="w-3.5 h-3.5" />}
              </div>

              <div>
                <div className="text-xs font-semibold text-white tracking-tight">
                  {badge.name}
                </div>
                <div className="text-[10px] text-neutral-400 mt-0.5 leading-tight">
                  {badge.description}
                </div>
              </div>
            </div>
          );
        })}
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
