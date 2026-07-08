import { cn } from "./utils";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export interface AdCardProps {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  highlight?: string;
  icon?: ReactNode;
  className?: string;
}

export function AdCard({
  title,
  description,
  ctaLabel,
  href,
  highlight,
  icon,
  className,
}: AdCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl border border-slate-900 bg-slate-950/30 p-5 backdrop-blur-xl transition-all duration-300 hover:border-slate-800/80 hover:bg-slate-900/10 shadow-[0_15px_40px_-25px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {/* Structural Inner Content */}
      <div>
        <div className="flex items-start justify-between gap-4">
          {highlight ? (
            <span className="inline-flex rounded-md border border-slate-900 bg-slate-950/60 px-2.5 py-1 text-[9px] font-mono tracking-[0.2em] uppercase text-slate-500 group-hover:text-slate-400 transition-colors select-none">
              {highlight}
            </span>
          ) : <div />}

          {icon ? (
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/50 text-slate-500 group-hover:text-sky-400 group-hover:border-sky-500/20 transition-all duration-300 shrink-0">
              {icon}
            </div>
          ) : null}
        </div>

        <div className="mt-4 space-y-1.5">
          <h3 className="text-sm font-bold text-white tracking-wide transition-colors group-hover:text-sky-400">
            {title}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed font-sans group-hover:text-slate-400 transition-colors">
            {description}
          </p>
        </div>
      </div>

      {/* Premium Mono Trigger Link Button */}
      <div className="mt-5 pt-4 border-t border-slate-900/60">
        <a
          href={href}
          className="inline-flex w-full items-center justify-between rounded-xl border border-slate-900 bg-slate-950/40 px-3.5 py-2.5 text-[11px] font-mono font-bold text-slate-400 transition-all duration-200 hover:border-slate-800 hover:bg-slate-900/50 hover:text-white group/btn"
        >
          <span>{ctaLabel}</span>
          <ArrowUpRight size={13} className="text-slate-600 group-hover/btn:text-sky-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
        </a>
      </div>
    </article>
  );
}