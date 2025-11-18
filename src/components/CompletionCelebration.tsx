"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import { Trophy, Share2, X } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface CompletionCelebrationProps {
  duration: number;
  goal: string;
  onClose: () => void;
  usedReset: boolean;
}

export function CompletionCelebration({ 
  duration, 
  goal, 
  onClose,
  usedReset 
}: CompletionCelebrationProps) {
  const { reducedMotion } = useTheme();

  useEffect(() => {
    if (!reducedMotion) {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: NodeJS.Timeout = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [reducedMotion]);

  const handleShare = async () => {
    const shareText = `🎯 Locked in for ${duration} hours—Mission Accomplished! ${goal ? `Goal: ${goal}` : ""}\n\nCompleted with${usedReset ? "" : "out"} reset! #LockIn #DeepWork #Focus`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          text: shareText,
        });
      } catch (error) {
        console.error("Failed to share:", error);
        copyToClipboard(shareText);
      }
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Achievement copied to clipboard!");
    }).catch(() => {
      alert("Failed to copy to clipboard");
    });
  };

  return (
    <div className="fixed inset-0 bg-background/95 flex items-center justify-center z-50 p-4">
      <div className="neo-border-thick bg-[var(--neo-yellow)] p-8 md:p-12 neo-shadow max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 neo-border bg-background p-2 hover:translate-x-1 hover:translate-y-1 hover:shadow-none neo-shadow-sm transition-all"
          aria-label="Close celebration"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <Trophy className="w-20 h-20 md:w-32 md:h-32 mx-auto mb-6" />
          
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            MISSION<br />ACCOMPLISHED!
          </h2>
          
          {goal && (
            <div className="neo-border bg-card p-4 mb-6">
              <p className="text-xl md:text-2xl font-bold">{goal}</p>
            </div>
          )}
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
            <div className="neo-border bg-[var(--neo-green)] px-6 py-3">
              <div className="text-sm font-bold">DURATION</div>
              <div className="text-3xl font-bold">{duration}H</div>
            </div>
            
            <div className="neo-border bg-[var(--neo-cyan)] px-6 py-3">
              <div className="text-sm font-bold">RESET USED</div>
              <div className="text-3xl font-bold">{usedReset ? "YES" : "NO"}</div>
            </div>
          </div>

          <p className="text-xl mb-8">
            {usedReset 
              ? "Great job completing your session!" 
              : "Perfect focus! You completed without reset!"}
          </p>

          <button
            onClick={handleShare}
            className="neo-border-thick bg-foreground text-background px-8 py-4 text-xl font-bold hover:translate-x-2 hover:translate-y-2 hover:shadow-none neo-shadow transition-all flex items-center gap-3 mx-auto"
            aria-label="Share your achievement"
          >
            <Share2 className="w-6 h-6" />
            SHARE YOUR ACHIEVEMENT
          </button>
        </div>
      </div>
    </div>
  );
}
