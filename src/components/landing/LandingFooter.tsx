"use client";

import { Play } from "lucide-react";
import Image from "next/image";

interface LandingFooterProps {
  onLaunchApp: () => void;
  onOpenDownload: () => void;
}

export function LandingFooter({ onLaunchApp, onOpenDownload }: LandingFooterProps) {
  return (
    <footer className="relative text-neutral-600 text-xs overflow-hidden font-sans border-t border-neutral-200">
      {/* Seamless Multi-Stop Atmospheric Gradient Background (matching Hero's subtle oceanic/platinum curve) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgb(255, 255, 255) 0%, rgb(250, 251, 252) 15%, rgb(243, 244, 248) 35%, rgb(237, 239, 244) 60%, rgb(229, 232, 240) 85%, rgb(219, 224, 234) 100%)",
          opacity: 0.85,
        }}
      />

      {/* Subtle Embossed ASCII / Brand Watermark in Background matching Navbar serif */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.035] overflow-hidden">
        <span className="font-serif italic text-[24vw] tracking-tighter text-[#0f172a] whitespace-nowrap font-bold">
          flocii
        </span>
      </div>

      <div className="relative z-10">
        {/* Final Conversion Banner */}
        <div className="max-w-4xl mx-auto py-28 px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-neutral-300 shadow-xs text-xs font-geist text-[#f85121] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f85121]" />
            <span>START NOW</span>
          </div>

          {/* Refined EB Garamond + Lora Header replacing thonky font */}
          <h2 className="font-garamond text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#0f172a] leading-[1.05]">
            Ready to eliminate <br className="hidden sm:block" />
            <span className="italic font-serif font-normal text-[#f85121]">distractions?</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-neutral-600 max-w-lg mx-auto text-pretty font-light">
            Lock in your next sprint with uncompromised focus reflection, zen audio engines, and ruthless tab accountability.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <button
              onClick={onLaunchApp}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#f85121] hover:bg-[#ea4414] text-white font-semibold text-sm shadow-xl shadow-[#f85121]/20 transition-all active:scale-[0.98] cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Zen Session</span>
            </button>

            <button
              onClick={onOpenDownload}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white/90 hover:bg-white border border-neutral-300 text-[#0f172a] font-semibold text-sm shadow-sm active:scale-[0.98] transition-all cursor-pointer backdrop-blur-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                className="w-4 h-4 shrink-0 text-[#0f172a]"
              >
                <rect width="256" height="256" fill="none" />
                <polygon
                  points="216 216 136 201.46 136 201.46 136 144 216 144 216 216"
                  opacity="0.2"
                />
                <polygon
                  points="104 195.64 40 184 40 144 104 144 104 195.64"
                  opacity="0.2"
                />
                <polygon
                  points="216 40 136 54.55 136 54.55 136 112 216 112 216 40"
                  opacity="0.2"
                />
                <polygon
                  points="104 60.36 40 72 40 112 104 112 104 60.36"
                  opacity="0.2"
                />
                <polygon
                  points="216 216 136 201.46 136 201.46 136 144 216 144 216 216"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
                <polygon
                  points="104 195.64 40 184 40 144 104 144 104 195.64"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
                <polygon
                  points="216 40 136 54.55 136 54.55 136 112 216 112 216 40"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
                <polygon
                  points="104 60.36 40 72 40 112 104 112 104 60.36"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
              </svg>
              <span>Download for Windows</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar: Copyright, heramb.icu Link, System Status Chip & Links */}
        <div className="border-t border-neutral-300/80 py-8 px-4 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-neutral-600">
          {/* Left: flocii — heramb.icu site */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md overflow-hidden relative border border-black/10 shadow-xs">
              <Image
                src="/flocii-logo.jpg"
                alt="flocii logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-[#3b342a] font-normal">
              &copy; {new Date().getFullYear()} flocii &mdash;{" "}
              <a
                href="https://heramb.icu"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#0f172a] underline underline-offset-4 decoration-neutral-400 hover:decoration-[#f85121] hover:text-[#f85121] transition-colors"
              >
                heramb.icu site
              </a>
            </span>
          </div>

          {/* Right: Systems Operational Chip & GitHub Repo */}
          <div className="flex items-center gap-5 sm:gap-6">
            {/* Live Systems Operational Chip */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-[11px] font-geist font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Systems Operational</span>
            </div>

            <a
              href="https://github.com/hebuildapps/lock-in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0f172a] flex items-center gap-1.5 transition-colors font-medium font-mono text-[11px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                className="w-4 h-4"
              >
                <rect width="256" height="256" fill="none" />
                <path
                  d="M104,232V192a32,32,0,0,1,32-32h0a32,32,0,0,1,32,32v40Z"
                  opacity="0.2"
                  fill="#000000"
                />
                <path
                  d="M119.83,56A52,52,0,0,0,76,32a51.92,51.92,0,0,0-3.49,44.7A49.28,49.28,0,0,0,64,104v8a48,48,0,0,0,48,48h48a48,48,0,0,0,48-48v-8a49.28,49.28,0,0,0-8.51-27.3A51.92,51.92,0,0,0,196,32a52,52,0,0,0-43.83,24Z"
                  opacity="0.2"
                  fill="#000000"
                />
                <path
                  d="M119.83,56A52,52,0,0,0,76,32a51.92,51.92,0,0,0-3.49,44.7A49.28,49.28,0,0,0,64,104v8a48,48,0,0,0,48,48h48a48,48,0,0,0,48-48v-8a49.28,49.28,0,0,0-8.51-27.3A51.92,51.92,0,0,0,196,32a52,52,0,0,0-43.83,24Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
                <path
                  d="M104,232V192a32,32,0,0,1,32-32h0a32,32,0,0,1,32,32v40"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
                <path
                  d="M104,208H72a32,32,0,0,1-32-32A32,32,0,0,0,8,144"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
              </svg>
              <span>GitHub</span>
            </a>

            <span className="font-mono text-[11px] text-neutral-500">MIT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
