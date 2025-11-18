"use client";

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="neo-border-thick bg-card overflow-hidden h-16">
        <div
          className="h-full bg-[var(--neo-green)] transition-all duration-1000 ease-linear flex items-center justify-end pr-4"
          style={{ width: `${Math.min(progress, 100)}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Session progress: ${Math.round(progress)}%`}
        >
          {progress > 10 && (
            <span className="font-bold text-xl tabular-nums">
              {Math.round(progress)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
