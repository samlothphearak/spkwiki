"use client";

import Link from "next/link";
import {
  Search,
  Terminal,
  Layers,
  Folder,
  BookOpen,
  Plus,
  Clock,
  User,
  Flame,
  ArrowUpRight,
} from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";

const categories = [
  {
    name: "Programming",
    description: "Learn programming languages, frameworks, and modern tools.",
    count: 42,
    code: "PROG_CORE",
  },
  {
    name: "Technology",
    description: "Explore hardware, edge systems, and modern software specs.",
    count: 35,
    code: "TECH_EDGE",
  },
  {
    name: "Database",
    description:
      "Deep guides covering SQL schemas, MongoDB collections, and caching.",
    count: 28,
    code: "DATA_NODE",
  },
  {
    name: "Networking",
    description:
      "Understand internal protocols, remote servers, and routing indices.",
    count: 18,
    code: "NET_ROUTE",
  },
];

const articles = [
  {
    title: "Introduction to Next.js Architecture",
    category: "Programming",
    description:
      "Master modern Next.js workflows including routing matrices, nested layouts, and server action pipelines.",
    author: "Samloth",
    updated: "2h ago",
  },
  {
    title: "MongoDB Cluster Configuration Guide",
    category: "Database",
    description:
      "Complete architectural setup for scaling document collections, indexing parameters, and complex aggregated streams.",
    author: "Admin",
    updated: "Yesterday",
  },
  {
    title: "Optimizing Full-Stack API Engineering",
    category: "Technology",
    description:
      "Deep-dive analysis on how frontend layouts and decoupled servers achieve latency minimization via atomic caching.",
    author: "Samloth",
    updated: "3d ago",
  },
  {
    title: "Network Fundamentals & Edge Routing",
    category: "Networking",
    description:
      "Deconstruct routing layers, internal DNS setups, security headers, and modern content delivery frameworks.",
    author: "Admin",
    updated: "1w ago",
  },
];

export default function WikiPage() {
  return (
    <main className="min-h-screen bg-[#050609] text-slate-300 px-4 py-8 lg:px-8 relative selection:bg-sky-500/30 selection:text-white">
      {/* Structural Ambient Background Tints */}
      <div className="absolute top-0 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-sky-500/[0.02] blur-[120px]" />
      <div className="absolute bottom-1/4 left-10 -z-10 h-[400px] w-[400px] rounded-full bg-violet-500/[0.02] blur-[100px]" />

      <div className="mx-auto flex max-w-7xl gap-8 xl:gap-10">
        <aside className="hidden xl:block w-72">
          <Sidebar />
        </aside>

        <div className="flex-1 space-y-10">
          {/* Core Control Panel & Search */}
          <section className="relative rounded-3xl border border-slate-900 bg-slate-950/40 p-6 md:p-8 backdrop-blur-xl overflow-hidden">
          <div className="flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5 text-sky-400" />
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
              Directory / Index Matrix
            </p>
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Knowledge Repository
          </h1>
          <p className="mt-1 text-xs text-slate-400 max-w-xl">
            Centralized index layout built to query infrastructure tutorials,
            design schemas, and engineering code bases.
          </p>

          {/* Upgraded Glass Search Input */}
          <div className="mt-6 relative max-w-2xl group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600 group-focus-within:text-sky-400 transition-colors" />
            <input
              type="text"
              placeholder="Query files, articles, updates..."
              className="w-full rounded-xl border border-slate-900 bg-slate-950/60 py-3 pl-11 pr-5 text-xs font-mono text-white placeholder-slate-600 outline-none transition-all duration-300 focus:border-sky-500/30 focus:bg-slate-950/90 focus:ring-1 focus:ring-sky-500/10"
            />
          </div>
        </section>

        {/* Categories Grid (Bento Style Layout) */}
        <section>
          <div className="flex items-center gap-2 mb-4 px-1">
            <Layers className="h-4 w-4 text-slate-500" />
            <h2 className="text-sm font-mono tracking-wider uppercase text-slate-400">
              Categories
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div
                key={category.name}
                className="group relative rounded-2xl border border-slate-900 bg-slate-950/30 p-5 backdrop-blur-xl transition-all duration-300 hover:border-slate-800/80 hover:bg-slate-900/20"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/50 text-slate-500 group-hover:text-sky-400 group-hover:border-sky-500/20 transition-all duration-300">
                    <Folder className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-600 group-hover:text-slate-400 transition-colors">
                    {category.code}
                  </span>
                </div>

                <h3 className="mt-4 text-sm font-bold text-white tracking-wide">
                  {category.name}
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 leading-relaxed min-h-[36px]">
                  {category.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-900/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>FILES_COUNT</span>
                  <span className="text-sky-400 bg-sky-500/5 px-2 py-0.5 rounded border border-sky-500/10">
                    {category.count} items
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Documentation Nodes */}
        <section>
          <div className="mb-4 flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-slate-500" />
              <h2 className="text-sm font-mono tracking-wider uppercase text-slate-400">
                Latest Documentation Nodes
              </h2>
            </div>

            <button className="flex items-center gap-1.5 rounded-xl border border-sky-500/20 bg-sky-500/10 px-3 py-1.5 text-[10px] font-mono font-semibold text-sky-400 transition-all duration-300 hover:border-sky-500/40 hover:bg-sky-500/20">
              <Plus size={12} />
              <span>PUSH_ARTICLE</span>
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {articles.map((article) => (
              <Link
                href="#"
                key={article.title}
                className="group relative rounded-2xl border border-slate-900 bg-slate-950/20 p-5 transition-all duration-300 hover:border-slate-800 hover:bg-slate-900/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="rounded-md border border-slate-800 bg-slate-900/50 px-2 py-0.5 text-slate-400 group-hover:border-sky-500/20 group-hover:text-sky-400 transition-colors">
                      {article.category}
                    </span>

                    <div className="flex items-center gap-1 text-slate-500">
                      <Clock className="h-3 w-3" />
                      <span>{article.updated}</span>
                    </div>
                  </div>

                  <h3 className="mt-4 text-sm font-bold text-white group-hover:text-sky-400 transition-colors flex items-center gap-1 justify-between">
                    <span className="truncate">{article.title}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 text-sky-400 shrink-0" />
                  </h3>

                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors">
                    {article.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-1.5 text-[10px] font-mono text-slate-600">
                  <User className="h-3 w-3 text-slate-700" />
                  <span>AUTHOR //</span>
                  <span className="text-slate-400 font-sans font-medium">
                    {article.author}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Tags Index */}
        <section className="rounded-2xl border border-slate-900 bg-slate-950/20 p-5 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-slate-400">
            <Flame className="h-3.5 w-3.5 text-amber-500/80" />
            <h2 className="text-xs font-mono tracking-wider uppercase">
              Hot Queries Index
            </h2>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "React",
              "Next.js",
              "MongoDB",
              "JavaScript",
              "Flutter",
              "Unity",
              "Cyber Security",
              "Cloud Computing",
            ].map((topic) => (
              <span
                key={topic}
                className="rounded-lg border border-slate-900 bg-slate-950/60 px-3 py-1.5 text-xs font-mono text-slate-400 transition-all duration-200 hover:border-slate-700 hover:bg-slate-900 hover:text-white cursor-pointer"
              >
                #{topic.toLowerCase().replace(" ", "_")}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
    </main>
  );
}
