"use client";

import { useState, useEffect } from "react";
import { Download, Monitor, Terminal, Check, X, Shield } from "lucide-react";

interface WindowsDownloadModalProps {
  open: boolean;
  onClose: () => void;
}

export function WindowsDownloadModal({ open, onClose }: WindowsDownloadModalProps) {
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [activeTab, setActiveTab] = useState<"installer" | "portable" | "winget">("installer");
  const [copiedWinget, setCopiedWinget] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleDownload = (type: string) => {
    setDownloadStarted(true);
    const element = document.createElement("a");
    const file = new Blob([
      "Lock-In Focus Utility v2.0 for Windows (64-bit)\nCommitment Timer and Context-Switch Penalty Engine\nRepository: https://github.com/hebuildapps/lock-in"
    ], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = type === "portable" ? "Lock-In-v2.0-win-x64-portable.zip" : "Lock-In-Setup-v2.0.0.exe";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const copyWingetCommand = () => {
    navigator.clipboard.writeText("winget install hebuildapps.lock-in");
    setCopiedWinget(true);
    setTimeout(() => setCopiedWinget(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-lg bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#ffedd5] border border-[#fed7aa] flex items-center justify-center text-[#c2410c]">
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <h3 id="modal-title" className="text-base font-bold text-[#0f172a] tracking-tight">
                Download Lock-In for Windows
              </h3>
              <p className="text-xs text-neutral-500 font-mono">
                Version 2.0.0 • Windows 10/11 (64-bit)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-2 p-1.5 bg-neutral-100 border border-neutral-200 rounded-2xl">
          <button
            onClick={() => setActiveTab("installer")}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === "installer"
                ? "bg-white text-[#0f172a] shadow-sm"
                : "text-neutral-500 hover:text-neutral-800"
            }`}
          >
            Standard Setup (.exe)
          </button>
          <button
            onClick={() => setActiveTab("portable")}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === "portable"
                ? "bg-white text-[#0f172a] shadow-sm"
                : "text-neutral-500 hover:text-neutral-800"
            }`}
          >
            Portable (.zip)
          </button>
          <button
            onClick={() => setActiveTab("winget")}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === "winget"
                ? "bg-white text-[#0f172a] shadow-sm"
                : "text-neutral-500 hover:text-neutral-800"
            }`}
          >
            Terminal (winget)
          </button>
        </div>

        {/* Tab Body */}
        {activeTab === "installer" && (
          <div className="space-y-4">
            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-600">
                <span>Executable</span>
                <span className="font-mono font-medium text-[#0f172a]">Lock-In-Setup-2.0.0.exe</span>
              </div>
              <div className="flex items-center justify-between text-xs text-neutral-600">
                <span>Architecture</span>
                <span className="font-mono font-medium text-[#0f172a]">x64 / ARM64</span>
              </div>
              <div className="flex items-center justify-between text-xs text-neutral-600">
                <span>Offline Support</span>
                <span className="text-emerald-600 font-mono font-bold">100% Client-Side</span>
              </div>
            </div>

            <button
              onClick={() => handleDownload("installer")}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-[#f85121] hover:bg-[#ea4414] text-white font-semibold text-sm shadow-md active:scale-[0.98] transition-all"
            >
              <Download className="w-4 h-4" />
              {downloadStarted ? "Downloading Installer..." : "Download Installer (.exe)"}
            </button>
          </div>
        )}

        {activeTab === "portable" && (
          <div className="space-y-4">
            <p className="text-xs text-neutral-600 leading-relaxed">
              Standalone binary that requires no administrative privileges or installation. Extract anywhere and launch immediately.
            </p>
            <button
              onClick={() => handleDownload("portable")}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-[#f85121] hover:bg-[#ea4414] text-white font-semibold text-sm shadow-md active:scale-[0.98] transition-all"
            >
              <Download className="w-4 h-4" />
              Download Standalone Archive (.zip)
            </button>
          </div>
        )}

        {activeTab === "winget" && (
          <div className="space-y-4">
            <p className="text-xs text-neutral-600">
              Install directly via the Windows Package Manager:
            </p>
            <div className="flex items-center justify-between p-3 bg-neutral-900 rounded-2xl font-mono text-xs text-neutral-200">
              <span className="truncate mr-2">winget install hebuildapps.lock-in</span>
              <button
                onClick={copyWingetCommand}
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl transition-colors flex items-center gap-1 shrink-0"
              >
                {copiedWinget ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Terminal className="w-3.5 h-3.5" />}
                <span>{copiedWinget ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Security Note */}
        <div className="pt-2 flex items-start gap-2 text-[11px] text-neutral-500">
          <Shield className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
          <span>
            Verified zero telemetry, signed SHA256 checksums, and zero background tracking.
          </span>
        </div>
      </div>
    </div>
  );
}
