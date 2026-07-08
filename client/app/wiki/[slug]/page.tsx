"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Terminal, 
  ChevronRight, 
  Heart, 
  Bookmark, 
  Share2, 
  Clock, 
  User,
  ArrowRight
} from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

function formatTitle(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function WikiSlugPage({ params }: Props) {
  const slug = "roadmap-update-what-changed";
  const title = formatTitle(slug);

  // Interaction tracking state configurations
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(12);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    setHasLiked(!hasLiked);
    setLikes((prev) => (hasLiked ? prev - 1 : prev + 1));
  };

  return (
    <main className="min-h-screen bg-[#050609] text-slate-300 antialiased selection:bg-sky-500/30 selection:text-white relative">
      
      {/* Decorative Structural Glow Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-full max-w-7xl bg-radial-gradient from-sky-500/[0.02] to-transparent opacity-70 blur-[120px]" />

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
        
        {/* FEATURE 1: Upgraded Breadcrumbs Navigation */}
        <nav className="flex items-center gap-2 text-[11px] font-mono tracking-wider uppercase text-slate-500">
          <Link
            href="/dashboard"
            className="hover:text-white transition-colors"
          >
            Workspace
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-700" />
          <Link href="/wiki" className="hover:text-white transition-colors">
            Wiki
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-700" />
          <span className="text-sky-400 truncate max-w-[180px] font-medium">{title}</span>
        </nav>

        {/* Core Content Container */}
        <article className="mt-8">
          
          {/* Title & Metadata Header Block */}
          <header className="space-y-4 border-b border-slate-900 pb-6">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl leading-[1.15]">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-slate-500">
              <div className="flex items-center gap-1.5 text-slate-400">
                <User className="h-3.5 w-3.5 text-slate-600" />
                <span>Mina Chen</span>
              </div>
              <span className="text-slate-800">•</span>
              <div className="flex items-center gap-1.5">
                <time dateTime="2026-07-08">July 8, 2026</time>
              </div>
              <span className="text-slate-800">•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-slate-600" />
                <span>5 min read</span>
              </div>
            </div>
          </header>

          {/* FEATURE 2: Contextual Action Toolbar */}
          <div className="flex items-center justify-between border-b border-slate-900/60 py-3 text-xs font-mono">
            <div className="flex items-center gap-3">
              
              {/* Like Node Link */}
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 transition-all duration-200 border ${
                  hasLiked 
                    ? "border-rose-500/20 bg-rose-500/10 text-rose-400" 
                    : "border-slate-900 bg-slate-950/40 text-slate-400 hover:text-white hover:border-slate-800"
                }`}
              >
                <Heart className={`h-3.5 w-3.5 ${hasLiked ? "fill-current" : ""}`} />
                <span>{likes}</span>
              </button>

              {/* Bookmark Toggle Node */}
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 transition-all duration-200 border ${
                  isBookmarked 
                    ? "border-amber-500/20 bg-amber-500/10 text-amber-400" 
                    : "border-slate-900 bg-slate-950/40 text-slate-400 hover:text-white hover:border-slate-800"
                }`}
              >
                <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? "fill-current" : ""}`} />
                <span>{isBookmarked ? "INDEXED" : "INDEX_FILE"}</span>
              </button>
            </div>

            {/* Action Clipboard Link */}
            <button
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="flex items-center gap-1.5 border border-slate-900 bg-slate-950/40 rounded-lg px-2.5 py-1.5 text-slate-400 hover:text-white hover:border-slate-800 transition-all duration-200"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>COPY_URL</span>
            </button>
          </div>

          {/* Article Body Content */}
          <div className="mt-8 space-y-6 text-sm sm:text-base leading-relaxed text-slate-400 font-sans">
            <p className="text-lg leading-relaxed text-slate-200 font-normal tracking-tight">
              This sprint brought several highly requested adjustments to our core
              cross-team delivery pipelines. Here is a breakdown of what changed.
            </p>
            
            <div className="flex items-center gap-2 pt-4">
              <Terminal className="h-4 w-4 text-sky-400" />
              <h2 className="text-lg font-bold tracking-tight text-white font-mono">
                1. Unified Delivery Timelines
              </h2>
            </div>
            
            <p>
              We have integrated milestone definitions across both engineering and
              design tracks, preventing structural drifting during deployment routines.
            </p>
          </div>

          {/* FEATURE 3: Footer "Up Next" Navigation */}
          <footer className="mt-16 pt-8 border-t border-slate-900">
            <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-slate-600">
              Up Next // Pipeline Index
            </p>
            
            <Link
              href="/wiki/team-playbook-launching-features"
              className="group mt-3 block rounded-2xl border border-slate-900 bg-slate-950/30 p-5 backdrop-blur-xl transition-all duration-300 hover:border-slate-800 hover:bg-slate-900/20"
            >
              <span className="text-[10px] font-mono text-slate-500 group-hover:text-sky-400 transition-colors">
                NEXT_NODE_FILE
              </span>
              
              <div className="mt-2 flex items-center justify-between gap-4">
                <h4 className="text-sm font-bold tracking-wide text-white group-hover:text-sky-400 transition-colors truncate">
                  New team playbook for launching features
                </h4>
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 group-hover:border-sky-500/20 group-hover:bg-sky-500/10 group-hover:text-sky-400 transition-all duration-300">
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          </footer>

        </article>
      </div>
    </main>
  );
}