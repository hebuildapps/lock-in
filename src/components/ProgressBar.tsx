"use client";

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full max-w-2xl mx-auto space-y-1.5 px-2">
      <div className="flex justify-between text-xs font-mono text-neutral-400">
        <span>Sprint Progress</span>
        <span className="text-white font-medium">{Math.round(clampedProgress)}%</span>
      </div>
      <div className="w-full h-1.5 bg-[#141414] border border-[#242424] rounded-full overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-300 ease-out rounded-full"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
}
