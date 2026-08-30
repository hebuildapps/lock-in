"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Play, Menu, X } from "lucide-react";

interface LandingNavProps {
  onLaunchApp: () => void;
  onOpenDownload: () => void;
}

export function LandingNav({ onLaunchApp, onOpenDownload }: LandingNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const triggerEl = document.getElementById("hero-gradient-trigger");
      if (triggerEl) {
        const rect = triggerEl.getBoundingClientRect();
        // Turns black when the gradient section passes above or meets the vertical center of the screen
        if (rect.top <= window.innerHeight * 0.5) {
          setIsScrolledPastHero(true);
        } else {
          setIsScrolledPastHero(false);
        }
      } else {
        if (window.scrollY > window.innerHeight * 0.6) {
          setIsScrolledPastHero(true);
        } else {
          setIsScrolledPastHero(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Navbar matching Relay/Higgsfield screenshot layout */}
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 sm:px-8 pt-6 sm:pt-8 pointer-events-none">
        <nav
          className={`pointer-events-auto flex items-center justify-between w-full max-w-6xl transition-colors duration-300 ease-out ${isScrolledPastHero ? "text-black" : "text-white"
            }`}
          aria-label="Main Navigation"
        >
          {/* Left Side Links */}
          <div
            className={`flex items-center gap-6 sm:gap-8 text-xs font-sans font-medium transition-colors duration-300 ${isScrolledPastHero ? "text-neutral-700" : "text-white/80"
              }`}
          >
            <button
              onClick={() => scrollToSection("demo-showcase")}
              className={`transition-colors cursor-pointer ${isScrolledPastHero ? "hover:text-black" : "hover:text-white"
                }`}
            >
              Product
            </button>
            <button
              onClick={() => scrollToSection("mechanics")}
              className={`transition-colors cursor-pointer ${isScrolledPastHero ? "hover:text-black" : "hover:text-white"
                }`}
            >
              Docs
            </button>
            <button
              onClick={() => scrollToSection("audio-bench")}
              className={`transition-colors cursor-pointer ${isScrolledPastHero ? "hover:text-black" : "hover:text-white"
                }`}
            >
              Pricing
            </button>
          </div>

          {/* Center Brand Logo with flocii-logo.jpg */}
          <div
            className="flex items-center gap-2 select-none cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div
              className={`relative w-6 h-6 sm:w-7 sm:h-7 shadow-sm transition-colors duration-300 ${isScrolledPastHero ? "border border-black/15" : "border border-white/20"
                }`}
              style={{
                borderRadius: "6px",
                overflow: "hidden",
              }}
            >
              <Image
                src="/flocii-logo.jpg"
                alt="flocii logo"
                fill
                priority
                className="object-cover"
                style={{
                  borderRadius: "6px",
                }}
              />
            </div>

            <span
              className={`font-serif italic font-semibold text-lg sm:text-xl tracking-tight transition-colors duration-300 ${isScrolledPastHero ? "text-black" : "text-white"
                }`}
            >
              flocii
            </span>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenDownload}
              className={`hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium backdrop-blur-md transition-all active:scale-[0.98] ${isScrolledPastHero
                  ? "bg-black/5 hover:bg-black/10 border border-black/10 text-neutral-800"
                  : "bg-white/10 hover:bg-white/20 border border-white/15 text-neutral-200"
                }`}
              title="Download flocii for Windows"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                className={`w-4 h-4 shrink-0 transition-colors duration-300 ${isScrolledPastHero ? "text-black" : "text-white"
                  }`}
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
              <span>Windows</span>
            </button>

            <button
              onClick={onLaunchApp}
              className={`flex items-center justify-center px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-semibold shadow-md transition-all active:scale-[0.98] cursor-pointer ${isScrolledPastHero
                  ? "bg-black hover:bg-neutral-800 text-white"
                  : "bg-white hover:bg-neutral-100 text-black"
                }`}
            >
              <span>Start session</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`sm:hidden p-1.5 rounded-full transition-colors ${isScrolledPastHero
                  ? "text-neutral-800 hover:text-black hover:bg-black/5"
                  : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#0b1419]/95 backdrop-blur-2xl pt-24 px-6 sm:hidden animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-col gap-6 max-w-sm mx-auto">
            <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
              <div
                className="w-7 h-7 relative border border-white/20"
                style={{
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
                <Image
                  src="/flocii-logo.jpg"
                  alt="flocii logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-serif italic font-semibold text-xl text-white">
                flocii
              </span>
            </div>

            <div className="flex flex-col gap-4 text-sm font-sans font-medium text-neutral-200">
              <button
                onClick={() => scrollToSection("demo-showcase")}
                className="text-left py-2 border-b border-white/10 hover:text-white"
              >
                Product & Demo
              </button>
              <button
                onClick={() => scrollToSection("mechanics")}
                className="text-left py-2 border-b border-white/10 hover:text-white"
              >
                Docs & Architecture
              </button>
              <button
                onClick={() => scrollToSection("audio-bench")}
                className="text-left py-2 border-b border-white/10 hover:text-white"
              >
                Procedural Sound Engines
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
                className="flex items-center justify-center gap-2 py-3 rounded-full bg-white/10 border border-white/15 text-white text-xs font-medium"
              >
                <span>Download Windows (.exe)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLaunchApp();
                }}
                className="flex items-center justify-center gap-2 py-3 rounded-full bg-white text-black text-xs font-semibold shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start session</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
