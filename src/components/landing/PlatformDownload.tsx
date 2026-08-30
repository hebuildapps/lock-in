"use client";

import { Download, Monitor, Globe, Check, ShieldCheck, Sparkles, Terminal } from "lucide-react";

interface PlatformDownloadProps {
  onLaunchApp: () => void;
  onOpenDownload: () => void;
}

export function PlatformDownload({ onLaunchApp, onOpenDownload }: PlatformDownloadProps) {
  return (
    <section className="py-28 px-4 max-w-6xl mx-auto border-t border-neutral-200 font-sans">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="text-xs font-geist uppercase tracking-widest text-[#f85121] font-bold">
          DISTRIBUTION TIERS
        </span>
        <h2 className="font-garamond text-4xl sm:text-6xl font-normal tracking-tight text-[#0f172a]">
          Zero barrier to deep work
        </h2>
        <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed text-pretty font-light">
          Choose between instant in-browser execution or the dedicated standalone desktop environment.
        </p>
      </div>

      {/* Pricing/Platform Card Tier Layout matching NEMO OS reference */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
        {/* Tier 1: Web Application (Parchment Card) */}
        <div className="bg-[#FAF6F0] border border-[#E8DFC8] rounded-3xl p-8 sm:p-10 flex flex-col justify-between space-y-8 shadow-sm relative">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-geist text-xs uppercase tracking-widest text-[#78350F] font-bold">
                BROWSER CLIENT
              </span>
              <span className="px-3 py-0.5 rounded-full bg-[#fde68a] text-[#854d0e] font-geist text-[11px] font-bold">
                ZERO INSTALL
              </span>
            </div>

            <div>
              <div className="font-garamond text-5xl font-normal text-[#291D00] tracking-tight">
                $0 <span className="font-sans text-sm text-[#78350F] font-light">/ free forever</span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#574c35] font-light mt-2 leading-relaxed">
                Instant distraction-free timer in your browser with local-first persistence.
              </p>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-[#574c35] pt-2">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#3D6F12] shrink-0" />
                <span>100% offline once loaded</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#3D6F12] shrink-0" />
                <span>Local storage session & badge tracking</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#3D6F12] shrink-0" />
                <span>ASCII Fire & Rain Zen Matrix</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#3D6F12] shrink-0" />
                <span>Custom YouTube lofi stream integration</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onLaunchApp}
            className="w-full py-4 px-6 rounded-2xl bg-white border border-[#3D6F12] hover:bg-[#FAF6F0] text-[#291D00] font-sans font-semibold text-sm transition-all active:scale-[0.98] shadow-xs cursor-pointer"
          >
            Launch Web App
          </button>
        </div>

        {/* Tier 2: Windows Desktop App (Deep Botanical Olive Highlight Card) */}
        <div className="bg-[#41481b] text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between space-y-8 shadow-xl relative overflow-hidden">
          {/* Top Most Popular Ribbon */}
          <div className="absolute top-6 right-6">
            <span className="px-3 py-1 rounded-md bg-[#d97706] text-white font-geist text-[10px] font-bold uppercase tracking-wider shadow-sm">
              RECOMMENDED
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <span className="font-geist text-xs uppercase tracking-widest text-[#a3e635] font-bold">
                WINDOWS DESKTOP
              </span>
            </div>

            <div>
              <div className="font-garamond text-5xl font-normal text-white tracking-tight">
                Native <span className="font-sans text-sm text-neutral-300 font-light">/ 64-bit Binary</span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-neutral-200 font-light mt-2 leading-relaxed">
                Dedicated distraction-free desktop window with zero browser navigation clutter.
              </p>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-neutral-200 pt-2">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#86efac] shrink-0" />
                <span>Includes all Web features</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#86efac] shrink-0" />
                <span>System-level global keyboard shortcuts</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#86efac] shrink-0" />
                <span>Available as .exe installer or portable .zip</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#86efac] shrink-0" />
                <span>Zero background telemetry or telemetry trackers</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onOpenDownload}
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-white hover:bg-neutral-100 text-[#0f172a] font-sans font-semibold text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download for Windows (.exe)</span>
          </button>
        </div>
      </div>
    </section>
  );
}
