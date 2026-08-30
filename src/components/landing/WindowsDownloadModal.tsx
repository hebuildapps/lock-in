"use client";

import { useEffect, useState } from "react";
import { Monitor, X, Clock, Sparkles, Bell, ArrowRight } from "lucide-react";

interface WindowsDownloadModalProps {
  open: boolean;
  onClose: () => void;
}

export function WindowsDownloadModal({ open, onClose }: WindowsDownloadModalProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

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

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200 font-sans"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-lg bg-[#FAF6F0] border border-[#E8DFC8] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8DFC8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#41481b] text-white flex items-center justify-center shadow-sm">
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="modal-title" className="font-garamond text-xl sm:text-2xl font-normal text-[#291D00] tracking-tight">
                  Windows Desktop Binary
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#f85121] text-white font-geist text-[9px] font-bold tracking-wide uppercase">
                  COMING SOON
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#78350F] hover:text-[#291D00] hover:bg-[#ebdcc7] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Coming Soon Notice Body */}
        <div className="p-6 bg-white/90 border border-[#e0d6be] rounded-2xl space-y-4 shadow-xs text-left">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#ffedd5] border border-[#fed7aa] flex items-center justify-center text-[#c2410c] shrink-0 mt-0.5">
              <Clock className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-[#291D00]">
                Native Windows binary currently in active build
              </h4>
              <p className="text-xs text-[#574c35] leading-relaxed font-light">
                No executable file is provided right now. You can run <span className="font-serif italic font-medium">flocii</span> immediately as a zero-install, 100% private offline Web App with full Zen Mode.
              </p>
            </div>
          </div>

          {/* Email Notification Form */}
          <div className="pt-2 border-t border-[#e8dfc8]">
            {subscribed ? (
              <div className="p-3.5 bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl text-center">
                <span className="text-xs font-geist text-[#15803d] font-bold">
                  ✓ You&apos;ll be notified when the Windows installer releases!
                </span>
              </div>
            ) : (
              <form onSubmit={handleNotifySubmit} className="space-y-2">
                <label className="text-[11px] font-geist text-[#78350f] font-semibold uppercase tracking-wider block">
                  Get notified on official release
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@loremipsum.com"
                    required
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#d8ccb0] text-xs text-[#291D00] placeholder:text-[#998b71] focus:outline-none focus:border-[#41481b]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#41481b] hover:bg-[#323814] text-white font-geist text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Action Button: Launch Web App */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          <button
            onClick={() => {
              onClose();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-[#f85121] hover:bg-[#ea4414] text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
          >
            Use Web App Now
          </button>
        </div>
      </div>
    </div>
  );
}
