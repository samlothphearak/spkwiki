"use client";

import { Activity } from "lucide-react";

const points = [42, 68, 54, 82, 76, 94, 88];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function ActivityChart() {
  return (
    <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl">
      {/* Header Context Bar */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-slate-500">
            <Activity className="w-3.5 h-3.5 text-sky-400" />
            <span>Weekly Activity</span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight mt-1">
            Engagement Momentum
          </h2>
        </div>
        
        <span className="text-[11px] font-mono tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
          +14% vs baseline
        </span>
      </div>

      {/* SVG Canvas Workspace */}
      <div className="mt-6 h-56 w-full rounded-2xl bg-slate-950/40 border border-slate-800/40 p-4 relative overflow-hidden">
        <svg viewBox="0 0 300 180" className="h-full w-full" preserveAspectRatio="none">
          <defs>
            {/* Premium Linear Glow Gradient mapping */}
            <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area Fill Glow Layer */}
          <path
            d="M 15 180 L 15 138 C 50 100, 70 120, 105 98 S 160 50, 195 72 S 230 110, 285 35 L 285 180 Z"
            fill="url(#chart-glow)"
          />

          {/* Core Trending Vector Stroke */}
          <path
            d="M 15 138 C 50 100, 70 120, 105 98 S 160 50, 195 72 S 230 110, 285 35"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Nodes Grid Indicators */}
          {points.map((value, index) => {
            const cx = index * 45 + 15;
            const cy = 180 - value;
            return (
              <g key={`${value}-${index}`} className="group/node">
                {/* Outer interactive glow halo */}
                <circle
                  cx={cx}
                  cy={cy}
                  r="7"
                  className="fill-sky-400/20 stroke-sky-400/40 stroke-1"
                />
                {/* Core structural point node */}
                <circle
                  cx={cx}
                  cy={cy}
                  r="3"
                  fill="#ffffff"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Horizontally Balanced Label Axis Row */}
      <div className="mt-4 flex justify-between px-2 text-[11px] font-mono text-slate-500">
        {days.map((day) => (
          <span key={day} className="w-8 text-center select-none">
            {day}
          </span>
        ))}
      </div>
    </div>
  );
}