"use client";

import { ArrowUpRight, TrendingUp } from "lucide-react";

type Tone = "sky" | "emerald" | "violet" | "amber";

type StatsCardProps = {
  title: string;
  value: string;
  change: string;
  tone: Tone;
};

// Map each color option to specific subtle semantic borders, text colors, and highlights
const toneVariants: Record<Tone, { border: string; glow: string; text: string; badge: string }> = {
  sky: {
    border: "group-hover:border-sky-500/30",
    glow: "bg-sky-500/5",
    text: "text-sky-400",
    badge: "text-sky-400 bg-sky-500/10 border-sky-500/20"
  },
  emerald: {
    border: "group-hover:border-emerald-500/30",
    glow: "bg-emerald-500/5",
    text: "text-emerald-400",
    badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
  },
  violet: {
    border: "group-hover:border-violet-500/30",
    glow: "bg-violet-500/5",
    text: "text-violet-400",
    badge: "text-violet-400 bg-violet-500/10 border-violet-500/20"
  },
  amber: {
    border: "group-hover:border-amber-500/30",
    glow: "bg-amber-500/5",
    text: "text-amber-400",
    badge: "text-amber-400 bg-amber-500/10 border-amber-500/20"
  },
};

export function StatsCard({ title, value, change, tone }: StatsCardProps) {
  const styles = toneVariants[tone];

  return (
    <div className={`group relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/40 p-5 backdrop-blur-xl transition-all duration-300 ${styles.border}`}>
      {/* Background Glow Layer */}
      <div className={`absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${styles.glow}`} />

      {/* Header Context */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono tracking-wider uppercase text-slate-500">
          {title}
        </p>
        <div className={`rounded-lg border p-1 transition-transform group-hover:scale-105 duration-300 ${styles.badge}`}>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Metrics Values */}
      <div className="mt-4 space-y-1.5">
        <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {value}
        </p>
        
        {/* Delta Badges */}
        <div className="flex items-center gap-1.5">
          <TrendingUp className={`w-3.5 h-3.5 ${styles.text}`} />
          <p className="text-[11px] font-mono tracking-wide text-slate-400">
            {change}
          </p>
        </div>
      </div>
    </div>
  );
}