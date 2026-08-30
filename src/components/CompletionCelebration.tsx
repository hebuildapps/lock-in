"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import { Trophy, Share2, ArrowRight, RotateCcw } from "lucide-react";

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
  usedReset,
}: CompletionCelebrationProps) {
  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#101010] border border-[#262626] rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
          <Trophy className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
            Sprint Completed
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Deliverable Locked In
          </h2>
          <p className="text-sm text-neutral-400 break-words font-medium">
            &ldquo;{goal}&rdquo;
          </p>
        </div>

        <div className="p-4 bg-[#141414] border border-[#222222] rounded-2xl flex items-center justify-around font-mono text-xs text-neutral-300">
          <div>
            <div className="text-lg font-bold text-white">{duration}h</div>
            <div className="text-[10px] text-neutral-400 uppercase">Committed</div>
          </div>
          <div className="w-px h-8 bg-[#262626]" />
          <div>
            <div className="text-lg font-bold text-emerald-400">
              {usedReset ? "1" : "0"}
            </div>
            <div className="text-[10px] text-neutral-400 uppercase">Resets</div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 active:scale-[0.98] transition-all"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
