import { cn } from "./utils";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export interface AdBannerProps {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  accentLabel?: string;
  icon?: ReactNode;
  className?: string;
}

export function AdBanner({
  title,
  description,
  ctaLabel,
  href,
  accentLabel,
  icon,
  className,
}: AdBannerProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-slate-900 bg-gradient-to-b from-slate-950/40 to-slate-950/80 p-6 backdrop-blur-xl overflow-hidden group shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]",
        className,
      )}
    >
      {/* Micro Glow Effect */}
      <div className="absolute top-0 right-0 -z-10 h-24 w-24 rounded-full bg-sky-500/[0.02] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          {accentLabel ? (
            <span className="inline-flex items-center gap-1.5 rounded-md border border-sky-500/10 bg-sky-500/[0.04] px-2.5 py-1 text-[10px] font-mono tracking-[0.2em] uppercase text-sky-400 select-none">
              <span className="h-1 w-1 rounded-full bg-sky-400 animate-pulse" />
              {accentLabel}
            </span>
          ) : null}

          <div className="flex items-center gap-2.5">
            {icon ? (
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/40 text-sky-400 group-hover:border-sky-500/20 group-hover:bg-sky-500/10 transition-all duration-300 shrink-0">
                {icon}
              </div>
            ) : null}
            <h3 className="text-lg font-bold tracking-wide text-white group-hover:text-sky-400 transition-colors">
              {title}
            </h3>
          </div>

          <p className="max-w-2xl text-xs leading-relaxed text-slate-500 font-sans group-hover:text-slate-400 transition-colors">
            {description}
          </p>
        </div>

        {/* Premium Mono Trigger CTA */}
        <a
          href={href}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/30 px-5 py-3 text-xs font-mono font-bold text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-900/60 transition-all duration-200 group/btn shrink-0"
        >
          <span>{ctaLabel}</span>
          <ArrowUpRight size={13} className="text-slate-600 group-hover/btn:text-sky-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
        </a>
      </div>
    </div>
  );
}