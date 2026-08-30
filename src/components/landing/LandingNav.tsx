"use client";

import { useState } from "react";
import { Download, Play, Menu, X, Monitor } from "lucide-react";

interface LandingNavProps {
  onLaunchApp: () => void;
  onOpenDownload: () => void;
}

export function LandingNav({ onLaunchApp, onOpenDownload }: LandingNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-5 pointer-events-none">
        <nav
          className="pointer-events-auto flex items-center justify-between gap-6 px-4 py-2.5 bg-[#0b1419]/70 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl max-w-4xl w-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
          aria-label="Main Navigation"
        >
          {/* Logo / Brand */}
          <div className="flex items-center gap-3 pl-1">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#f85121] shadow-sm shadow-[#f85121]/50 animate-pulse" />
              <span className="font-mono text-sm font-semibold tracking-wider text-white">
                LOCK-IN
              </span>
            </div>
            <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono uppercase bg-white/5 text-neutral-300 border border-white/10 rounded-md">
              Zen Protocol
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-6 text-xs text-neutral-300 font-medium">
            <button
              onClick={() => scrollToSection("interactive-demo")}
              className="hover:text-white transition-colors"
            >
              Interactive Sandbox
            </button>
            <button
              onClick={() => scrollToSection("mechanics")}
              className="hover:text-white transition-colors"
            >
              Mechanics
            </button>
            <button
              onClick={() => scrollToSection("audio-bench")}
              className="hover:text-white transition-colors"
            >
              Sound Engines
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="hover:text-white transition-colors"
            >
              FAQ
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenDownload}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 text-xs font-medium transition-all active:scale-[0.98]"
              title="Download Lock-In for Windows (.exe)"
            >
              <Monitor className="w-3.5 h-3.5 text-neutral-400" />
              <span>Windows</span>
              <Download className="w-3 h-3 text-neutral-400 ml-0.5" />
            </button>

            <button
              onClick={onLaunchApp}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-neutral-100 text-black text-xs font-semibold shadow-md transition-all active:scale-[0.98]"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Start Session</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-[#0b1419]/95 backdrop-blur-2xl pt-24 px-6 md:hidden animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-col gap-6 max-w-sm mx-auto">
            <div className="flex flex-col gap-4 text-base font-medium text-neutral-200">
              <button
                onClick={() => scrollToSection("interactive-demo")}
                className="text-left py-2 border-b border-white/10 hover:text-white"
              >
                Interactive Sandbox
              </button>
              <button
                onClick={() => scrollToSection("mechanics")}
                className="text-left py-2 border-b border-white/10 hover:text-white"
              >
                Core Mechanics
              </button>
              <button
                onClick={() => scrollToSection("audio-bench")}
                className="text-left py-2 border-b border-white/10 hover:text-white"
              >
                Procedural Sound Engine
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-left py-2 border-b border-white/10 hover:text-white"
              >
                Frequently Asked Questions
              </button>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDownload();
                }}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 border border-white/10 text-white text-sm font-medium"
              >
                <Monitor className="w-4 h-4" />
                <span>Download for Windows (.exe)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLaunchApp();
                }}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black text-sm font-semibold"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Launch Web App</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
