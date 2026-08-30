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
      {/* Top Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 ${
          mobileMenuOpen ? "z-[60]" : "z-40"
        } flex justify-center px-4 sm:px-8 pt-6 sm:pt-8 pointer-events-none transition-colors duration-300`}
      >
        <nav
          className={`pointer-events-auto flex items-center justify-between w-full max-w-6xl transition-colors duration-300 ease-out ${
            mobileMenuOpen
              ? "text-white"
              : isScrolledPastHero
              ? "text-black"
              : "text-white"
          }`}
          aria-label="Main Navigation"
        >
          {/* Left Side Links */}
          <div
            className={`flex items-center gap-6 sm:gap-8 text-xs font-sans font-medium transition-colors duration-300 ${
              mobileMenuOpen
                ? "text-white/80"
                : isScrolledPastHero
                ? "text-neutral-700"
                : "text-white/80"
            }`}
          >
            <button
              onClick={() => scrollToSection("demo-showcase")}
              className={`transition-colors cursor-pointer ${
                mobileMenuOpen
                  ? "hover:text-white"
                  : isScrolledPastHero
                  ? "hover:text-black"
                  : "hover:text-white"
              }`}
            >
              Product
            </button>
          </div>

          {/* Center Brand Logo with flocii-logo.jpg */}
          <div
            className="flex items-center gap-2 select-none cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div
              className={`relative w-6 h-6 sm:w-7 sm:h-7 shadow-sm transition-colors duration-300 ${
                mobileMenuOpen
                  ? "border border-white/20"
                  : isScrolledPastHero
                  ? "border border-black/15"
                  : "border border-white/20"
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
              className={`font-serif italic font-semibold text-lg sm:text-xl tracking-tight transition-colors duration-300 ${
                mobileMenuOpen
                  ? "text-white"
                  : isScrolledPastHero
                  ? "text-black"
                  : "text-white"
              }`}
            >
              flocii
            </span>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenDownload}
              className={`hidden sm:flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-medium backdrop-blur-md border transition-all active:scale-[0.98] cursor-pointer ${
                isScrolledPastHero
                  ? "bg-black/5 hover:bg-black/10 text-neutral-800 border-black/10"
                  : "bg-white/10 hover:bg-white/15 text-white/90 border-white/15 shadow-sm"
              }`}
            >
              <svg
                viewBox="0 0 88 88"
                className="w-3.5 h-3.5 fill-current shrink-0"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 12.402l35.687-4.86.016 34.423-35.67.243L0 12.402zm35.67 33.529l.028 34.453L0 75.545l.033-29.356 35.637-.258zM40.97 6.452L87.999 0v41.536l-47.029.336V6.452zm47.036 38.99v41.657L40.97 80.84v-35.08l47.036-.318z" />
              </svg>
              <span>Windows</span>
            </button>

            <button
              onClick={onLaunchApp}
              className={`hidden sm:flex items-center justify-center px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-semibold shadow-md transition-all active:scale-[0.98] cursor-pointer ${
                isScrolledPastHero
                  ? "bg-black hover:bg-neutral-800 text-white"
                  : "bg-white hover:bg-neutral-100 text-black"
              }`}
            >
              <span>Start session</span>
            </button>

            {/* Mobile Hamburger / Close Button in the exact same place */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`sm:hidden p-1.5 rounded-full transition-colors cursor-pointer ${
                mobileMenuOpen
                  ? "text-white hover:text-white/80 hover:bg-white/10"
                  : isScrolledPastHero
                  ? "text-neutral-800 hover:text-black hover:bg-black/5"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
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
            <div className="flex flex-col gap-4 text-sm font-sans font-medium text-neutral-200 pt-4">
              <button
                onClick={() => scrollToSection("demo-showcase")}
                className="text-left py-2 border-b border-white/10 hover:text-white"
              >
                Product & Demo
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
