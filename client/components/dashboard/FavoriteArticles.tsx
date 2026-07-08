"use client";

import { Heart } from "lucide-react";

const favorites = [
  {
    title: "How to structure onboarding docs",
    tag: "Guides",
    blurb: "A clean framework for smoother team handoffs.",
  },
  {
    title: "Designing reusable wiki templates",
    tag: "Templates",
    blurb: "Keep information consistent across every page.",
  },
];

export function FavoriteArticles() {
  return (
    <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl">
      {/* Header Area */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-slate-500">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500/10" />
            <span>Curated List</span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight mt-1">
            Saved Favorites
          </h2>
        </div>
        
        <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase bg-slate-950/60 px-2.5 py-1 rounded border border-slate-800">
          Bookmarks
        </span>
      </div>

      {/* Favorites List Container */}
      <div className="mt-6 divide-y divide-slate-800/60">
        {favorites.map((item) => (
          <div 
            key={item.title} 
            className="group block py-4 first:pt-0 last:pb-0 cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <h3 className="font-medium text-slate-200 group-hover:text-sky-400 transition-colors duration-150 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {item.blurb}
                </p>
              </div>

              {/* Minimal Tag Pill */}
              <span className="text-[10px] font-mono font-medium tracking-wider text-sky-400 bg-sky-500/10 border border-sky-500/15 px-2 py-0.5 rounded-md shrink-0">
                {item.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}