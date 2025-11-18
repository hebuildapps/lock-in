"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, Clock, Target } from "lucide-react";
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
        setSessions(parsedSessions.reverse()); // Show newest first
      } catch (error) {
        console.error("Error parsing session history:", error);
      }
    }
  }, []);

  const getTotalHours = () => {
    return sessions.reduce((total, session) => total + session.duration, 0);
  };

  const formatDuration = (hours: number) => {
    if (hours === 1) return "1 hour";
    return `${hours} hours`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="neo-border bg-background hover:bg-muted p-3 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            aria-label="Go back to main page"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              SESSION HISTORY
            </h1>
            <p className="text-xl text-muted-foreground mt-2">
              YOUR LOCK-IN JOURNEY
            </p>
          </div>
          <div className="w-[60px]" /> {/* Spacer for centering */}
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="neo-border bg-card p-6 text-center">
            <div className="text-3xl font-bold text-primary">
              {sessions.length}
            </div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">
              Total Sessions
            </div>
          </div>
          <div className="neo-border bg-card p-6 text-center">
            <div className="text-3xl font-bold text-primary">
              {getTotalHours()}
            </div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">
              Total Hours
            </div>
          </div>
          <div className="neo-border bg-card p-6 text-center">
            <div className="text-3xl font-bold text-primary">
              {sessions.filter((s) => !s.usedReset).length}
            </div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">
              Perfect Sessions
            </div>
          </div>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {sessions.length === 0 ? (
            <div className="neo-border bg-card p-12 text-center">
              <Target className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-bold mb-2">No Sessions Yet</h3>
              <p className="text-muted-foreground">
                Complete your first Lock-In session to see it here!
              </p>
            </div>
          ) : (
            sessions.map((session) => (
              <div
                key={session.id}
                className="neo-border bg-card p-6 hover:bg-muted/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 break-words overflow-hidden max-h-[3.5rem]">
                      {session.goal}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatDuration(session.duration)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {format(
                            session.completedAt,
                            "MMM dd, yyyy 'at' HH:mm"
                          )}
                        </span>
                      </div>
                      {!session.usedReset && (
                        <div className="neo-border bg-primary/10 text-primary px-2 py-1 text-xs font-bold">
                          PERFECT
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {formatDuration(session.duration)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {format(session.completedAt, "HH:mm")}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
