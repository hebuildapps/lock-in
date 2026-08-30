"use client";

import { Play, Download, Github, Monitor } from "lucide-react";

interface LandingFooterProps {
  onLaunchApp: () => void;
  onOpenDownload: () => void;
}

export function LandingFooter({ onLaunchApp, onOpenDownload }: LandingFooterProps) {
  return (
    <footer className="border-t border-neutral-200 bg-[#f8fafc] text-neutral-600 text-xs">
      {/* Final Conversion Banner */}
      <div className="max-w-4xl mx-auto py-24 px-4 text-center space-y-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#f85121] font-semibold">
          START NOW
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0f172a]">
          Ready to eliminate distractions?
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 max-w-lg mx-auto text-pretty">
          Lock in your next sprint with real accountability and procedural soundscapes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={onLaunchApp}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#f85121] hover:bg-[#ea4414] text-white font-semibold text-sm shadow-md transition-all active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch Zen Session</span>
          </button>

          <button
            onClick={onOpenDownload}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-800 font-semibold text-sm shadow-sm active:scale-[0.98] transition-all"
          >
            <Monitor className="w-4 h-4 text-neutral-600" />
            <span>Download for Windows</span>
          </button>
        </div>
      </div>

      {/* Bottom links and status */}
      <div className="border-t border-neutral-200 py-8 px-4 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-neutral-500">
        <div className="flex items-center gap-3">
          <span className="font-bold text-[#0f172a]">LOCK-IN</span>
          <span className="text-neutral-300">•</span>
          <span>Zero Telemetry Focus Protocol</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/hebuildapps/lock-in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0f172a] flex items-center gap-1.5 transition-colors font-medium"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub Repository</span>
          </a>
          <span>MIT License</span>
        </div>
      </div>
    </footer>
  );
}
