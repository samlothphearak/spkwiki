"use client";

import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

const articles = [
  {
    title: "Roadmap update: what changed this sprint",
    author: "Mina Chen",
    time: "8 min ago",
    href: "/wiki/roadmap-update-sprint",
  },
  {
    title: "New team playbook for launching features",
    author: "Alex Rivera",
    time: "21 min ago",
    href: "/wiki/team-playbook-launching-features",
  },
  {
    title: "FAQ refresh for customer support readiness",
    author: "Jamie Brooks",
    time: "1 hour ago",
    href: "/wiki/faq-refresh-support-readiness",
  },
];

export function RecentArticles() {
  return (
    <section className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl">
      {/* Top Section Border Bar */}
      <div className="flex items-start justify-between pb-4 border-b border-slate-800/60">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-slate-500">
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            <span>Feed Registry</span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight mt-1">
            Recently Published
          </h2>
        </div>
        
        <Link 
          href="/wiki" 
          className="text-xs font-mono tracking-wider text-slate-400 hover:text-white bg-slate-950/60 border border-slate-800 px-3 py-1.5 rounded-xl transition-all"
        >
          View Index →
        </Link>
      </div>

      {/* Articles Feed */}
      <div className="divide-y divide-slate-800/60">
        {articles.map((article) => (
          <Link
            key={article.title}
            href={article.href}
            className="group flex items-center justify-between py-4 transition-all duration-150 first:pt-4 last:pb-0"
          >
            <div className="pr-4 space-y-1">
              <h3 className="font-medium text-slate-200 group-hover:text-sky-400 transition-colors duration-150 leading-snug">
                {article.title}
              </h3>
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                <span className="text-slate-400">by {article.author}</span>
                <span className="text-slate-700">•</span>
                <span>{article.time}</span>
              </div>
            </div>

            {/* Premium Directional Node */}
            <div className="flex items-center justify-center w-8 h-8 rounded-xl border border-slate-800 bg-slate-950/40 text-slate-500 group-hover:border-sky-500/30 group-hover:bg-sky-500/10 group-hover:text-sky-400 transition-all duration-200 shrink-0 transform group-hover:translate-x-0.5">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}