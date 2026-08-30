"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, Clock, Target, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";

interface CompletedSession {
  id: string;
  goal: string;
  duration: number;
  completedAt: Date;
  usedReset: boolean;
}

interface SessionHistoryProps {
  onBack: () => void;
}

export function SessionHistory({ onBack }: SessionHistoryProps) {
  const [sessions, setSessions] = useState<CompletedSession[]>([]);

  useEffect(() => {
    const savedSessions = localStorage.getItem("lockInSessions");
    if (savedSessions) {
      try {
        const parsedSessions = JSON.parse(savedSessions).map(
          (session: any) => ({
            ...session,
            completedAt: new Date(session.completedAt),
          })
        );
        setSessions(parsedSessions.reverse());
      } catch (error) {
        console.error("Error parsing session history:", error);
      }
    }
  }, []);

  const getTotalHours = () => {
    return sessions.reduce((total, session) => total + session.duration, 0);
  };

  const formatDuration = (hours: number) => {
    return hours === 1 ? "1 hour" : `${hours} hours`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-12 px-4 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1c1c1c]">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] border border-[#272727] text-xs font-mono text-neutral-300 transition-colors"
          aria-label="Back to session"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <div className="text-center">
          <h1 className="text-xl font-semibold text-white tracking-tight">
            Sprint History
          </h1>
        </div>

        <div className="w-16" />
      </div>

      {/* Stats Metric Strip */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="p-4 bg-[#0e0e0e] border border-[#222222] rounded-2xl text-center">
          <div className="text-2xl font-bold font-mono text-white">
            {sessions.length}
          </div>
          <div className="text-[11px] font-mono text-neutral-400 mt-0.5">
            Total Sprints
          </div>
        </div>

        <div className="p-4 bg-[#0e0e0e] border border-[#222222] rounded-2xl text-center">
          <div className="text-2xl font-bold font-mono text-white">
            {getTotalHours()}
          </div>
          <div className="text-[11px] font-mono text-neutral-400 mt-0.5">
            Hours Committed
          </div>
        </div>

        <div className="p-4 bg-[#0e0e0e] border border-[#222222] rounded-2xl text-center">
          <div className="text-2xl font-bold font-mono text-emerald-400">
            {sessions.filter((s) => !s.usedReset).length}
          </div>
          <div className="text-[11px] font-mono text-neutral-400 mt-0.5">
            Zero-Reset Runs
          </div>
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-3">
        {sessions.length === 0 ? (
          <div className="p-12 bg-[#0e0e0e] border border-[#222222] rounded-2xl text-center space-y-3">
            <Target className="w-8 h-8 mx-auto text-neutral-600" />
            <h3 className="text-sm font-semibold text-white">No sprint logs recorded</h3>
            <p className="text-xs text-neutral-500 font-mono">
              Complete your first focus sprint to log milestones here.
            </p>
          </div>
        ) : (
          sessions.map((session) => (
            <div
              key={session.id}
              className="p-4 bg-[#0e0e0e] border border-[#222222] rounded-2xl hover:border-[#333333] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-white">{session.goal}</h4>
                  {!session.usedReset && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      Zero Reset
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-neutral-500 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {format(session.completedAt, "MMM dd, yyyy • HH:mm")}
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right font-mono text-xs text-neutral-300">
                <span>{formatDuration(session.duration)}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
