"use client";

import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Sparkles, ArrowRight, Library, Shield, Cpu, Activity, Database, CheckCircle2 } from "lucide-react";

const benefits = [
  {
    title: "Capture knowledge faster",
    description: "Create searchable documentation, guides, and policies with a clean editor built for engineering teams.",
    icon: Library,
    tag: "SYS_INDEX"
  },
  {
    title: "Stay aligned across teams",
    description: "Centralize your content so everyone can find the same answers and move faster together.",
    icon: Shield,
    tag: "SYNC_CORE"
  },
  {
    title: "Launch with confidence",
    description: "Onboard new team members quickly with a single source of truth for every internal process.",
    icon: Cpu,
    tag: "DEPL_READY"
  },
];

const stats = [
  { label: "Trusted by growing teams", value: "1,200+", active: true },
  { label: "Page views saved", value: "74%", active: false },
  { label: "Time saved per week", value: "4.5 hrs", active: false },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#050609] text-slate-300 antialiased selection:bg-sky-500/30 selection:text-white overflow-x-hidden relative">
      
      {/* Premium Ambient Background Glow Vectors */}
      <div className="absolute top-[-10%] left-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-sky-500/5 blur-[140px]" />
      <div className="absolute top-[40%] right-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-violet-500/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        
        {/* Header System Layout */}
        <header className="flex items-center justify-between border-b border-slate-900/80 pb-5 backdrop-blur-sm">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 text-sky-400 group-hover:border-sky-500/30 group-hover:bg-sky-500/10 transition-all duration-300">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold tracking-tight text-white font-mono">SparkWiki.sys</span>
          </Link>
          
          <Link
            href="/login"
            className="rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-1.5 text-xs font-mono font-medium text-slate-300 transition-all duration-200 hover:border-slate-700 hover:bg-slate-900/80"
          >
            SIGN_IN_
          </Link>
        </header>

        {/* Main Hero & Context Grid */}
        <main className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          
          {/* Left Text Column */}
          <section className="space-y-10">
            <div className="max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-3 py-1 text-xs font-mono tracking-wide text-sky-400">
                <Activity className="h-3 w-3 animate-pulse" />
                <span>START_TRIAL_INITIATED [v1.0.0]</span>
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
                Build a knowledge base your team <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">actually uses.</span>
              </h1>
              
              <p className="text-sm leading-relaxed text-slate-400 font-sans max-w-xl">
                SparkWiki helps active squads capture technical blueprints, share structural guidelines, and isolate answers instantly — all hosted from one polished obsidian workspace.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-mono font-bold text-slate-950 transition hover:bg-slate-200"
                >
                  <span>INITIALIZE_FREE_TRIAL</span>
                  <ArrowRight size={14} />
                </Link>
                
                <a
                  href="#benefits"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900/30 px-5 py-3 text-xs font-mono font-medium text-slate-400 transition hover:border-slate-700 hover:bg-slate-900/60"
                >
                  VIEW_PARAMETERS
                </a>
              </div>
            </div>

            {/* Inline Bento Statistics Grid */}
            <div className="grid gap-4 sm:grid-cols-3 pt-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className={`rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 ${
                    stat.active 
                      ? "border-sky-500/20 bg-sky-500/[0.02]" 
                      : "border-slate-900 bg-slate-950/40"
                  }`}
                >
                  <p className={`text-2xl font-bold tracking-tight font-mono ${stat.active ? "text-sky-400" : "text-white"}`}>
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-[11px] font-mono uppercase tracking-wide text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Right Showcase Hero Bento Box */}
          <section className="relative rounded-3xl border border-slate-800/80 bg-gradient-to-b from-slate-900/60 to-slate-950/80 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden group">
            <div className="absolute top-0 right-0 -z-10 h-32 w-32 rounded-full bg-sky-500/[0.03] blur-3xl transition-opacity group-hover:opacity-100" />
            
            <div className="flex items-center gap-2">
              <Database className="h-3.5 w-3.5 text-sky-400" />
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-500">
                System Workflow Matrix
              </p>
            </div>
            
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">
              One central architecture for code indexes, wikis, and team operations.
            </h2>
            
            <p className="mt-2 text-xs leading-relaxed text-slate-400 font-sans">
              Deploy continuous knowledge tracking pools. Eliminate dark data silos and accelerate developer shipping speeds.
            </p>
            
            <div className="mt-6 space-y-3">
              <div className="rounded-xl border border-slate-900 bg-slate-950/70 p-4 transition-all duration-300 hover:border-slate-800">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-white tracking-wide">
                    Instant Global Document Indexing
                  </p>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-sky-500/20 bg-sky-500/10 text-sky-400">FAST_QUERY</span>
                </div>
                <p className="mt-1.5 text-xs text-slate-500">
                  Query operational knowledge caches in sub-milliseconds, matching high production thresholds.
                </p>
              </div>

              <div className="rounded-xl border border-slate-900 bg-slate-950/70 p-4 transition-all duration-300 hover:border-slate-800">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-white tracking-wide">
                    Enterprise Scaling Nodes
                  </p>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded border-emerald-500/20 bg-emerald-500/10 text-emerald-400">STABLE</span>
                </div>
                <p className="mt-1.5 text-xs text-slate-500">
                  Configured seamlessly to adapt from independent developers to clustered enterprise teams.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Feature Benefits Grid Section */}
        <section id="benefits" className="mt-28 space-y-8 border-t border-slate-900/60 pt-16">
          <div className="max-w-xl">
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-slate-600">
              System Parameters // Why SparkWiki
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              An optimized knowledge layer for high-throughput teams.
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="group relative rounded-2xl border border-slate-900 bg-slate-950/30 p-6 backdrop-blur-xl transition-all duration-300 hover:border-slate-800 hover:bg-slate-900/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/50 text-slate-400 group-hover:text-sky-400 group-hover:border-sky-500/20 transition-all duration-300">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-600 group-hover:text-slate-400 transition-colors">
                      {benefit.tag}
                    </span>
                  </div>
                  
                  <h3 className="mt-4 text-sm font-bold tracking-wide text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 group-hover:text-slate-400 transition-colors">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}