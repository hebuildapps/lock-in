"use client";

import { Download, Monitor, Globe, Check } from "lucide-react";

interface PlatformDownloadProps {
  onLaunchApp: () => void;
  onOpenDownload: () => void;
}

export function PlatformDownload({ onLaunchApp, onOpenDownload }: PlatformDownloadProps) {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto border-t border-neutral-200">
      <div className="text-left max-w-2xl mb-14">
        <span className="text-xs font-mono uppercase tracking-widest text-[#f85121] font-semibold">
          CROSS-PLATFORM
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0f172a] mt-2 mb-3">
          Deploy anywhere you create
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed text-pretty">
          Available as an instant zero-install web application or a standalone Windows desktop binary.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Web Edition */}
        <div className="p-8 sm:p-10 bg-white border border-neutral-200 rounded-3xl flex flex-col justify-between space-y-8 shadow-sm">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#ffedd5] border border-[#fed7aa] flex items-center justify-center text-[#c2410c]">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#0f172a]">Web Application</h3>
              <p className="text-xs text-neutral-500 font-mono mt-0.5">Runs in all modern browsers</p>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-600 pt-2">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero installation or account required</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Runs 100% offline once loaded</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Local storage session and streak persistence</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onLaunchApp}
            className="w-full py-3.5 px-5 rounded-2xl bg-[#0f172a] hover:bg-black text-white font-semibold text-sm transition-all active:scale-[0.98] shadow-md"
          >
            Launch Web App
          </button>
        </div>

        {/* Windows Edition */}
        <div className="p-8 sm:p-10 bg-gradient-to-br from-[#fff7ed] to-[#ffedd5] border border-[#fed7aa] rounded-3xl flex flex-col justify-between space-y-8 shadow-sm">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#f85121] text-white flex items-center justify-center shadow-md">
              <Monitor className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#0f172a]">Windows Desktop App</h3>
              <p className="text-xs text-[#9a3412] font-mono mt-0.5">Windows 10 / 11 (64-bit)</p>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#7c2d12] pt-2">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#c2410c] shrink-0" />
                <span>Dedicated window without browser navigation clutter</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#c2410c] shrink-0" />
                <span>System-level global shortcut hooks</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#c2410c] shrink-0" />
                <span>Available as standard installer (.exe) or portable (.zip)</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onOpenDownload}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-[#f85121] hover:bg-[#ea4414] text-white font-semibold text-sm shadow-md transition-all active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            <span>Download for Windows (.exe)</span>
          </button>
        </div>
      </div>
    </section>
  );
}
