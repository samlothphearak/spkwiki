"use client";

import Link from "next/link";
import { PlusCircle, Compass, Terminal, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/hook/useAuth";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { FavoriteArticles } from "@/components/dashboard/FavoriteArticles";
import { RecentArticles } from "@/components/dashboard/RecentArticles";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { AdBanner } from "@/components/ui/AdBanner";
import { AdCard } from "@/components/ui/AdCard";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-200 antialiased selection:bg-sky-500/20">
      {/* Ambient Top Glow Filter */}
      <div className="absolute top-0 left-1/2 -z-10 h-[360px] w-full max-w-7xl -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.07),transparent_50%)]" />

      <Navbar />

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 lg:flex-row">
        <Sidebar />

        <main className="flex-1 space-y-6">
          {/* HERO BENTO CELL: Welcome Banner */}
          <section className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 md:p-8 backdrop-blur-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-slate-500">
                  <LayoutDashboard className="w-3.5 h-3.5 text-sky-500" />
                  <span>Workspace Core</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl mt-2">
                  Welcome back, {user?.name || "Operator"}
                </h1>
                <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
                  System operational pipelines are optimal. Tracking baseline
                  updates, workspace logs, and repository metrics down below.
                </p>
              </div>
            </div>
          </section>

          {/* METRICS GRID ROW BENTO */}
          <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatsCard
              title="Articles"
              value="1.2k"
              change="+8% this month"
              tone="sky"
            />
            <StatsCard
              title="Active users"
              value="3.4k"
              change="+14% this week"
              tone="emerald"
            />
            <StatsCard
              title="Contributions"
              value="482"
              change="+4% vs last"
              tone="violet"
            />
            <StatsCard
              title="New signups"
              value="128"
              change="+22% this week"
              tone="amber"
            />
          </section>

          <section className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl">
            <AdBanner
              title="Boost team knowledge adoption"
              description="Launch your first article with clear templates and share it instantly with your workspace. Your team can discover answers faster and stay aligned."
              ctaLabel="Create a wiki article"
              href="/wiki/create"
              accentLabel="New"
            />
          </section>

          {/* MAIN DEEP-DIVE SPLIT VIEW */}
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Analytics & Content Streams */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-3xl border border-slate-800/60 bg-slate-900/20 p-2">
                <ActivityChart />
              </div>
              <RecentArticles />
            </div>

            {/* Side Utilities Panel */}
            <aside className="space-y-6">
              <FavoriteArticles />

              <AdCard
                title="Search smarter with SparkWiki"
                description="Highlight the most important documentation, keep the team aligned, and turn knowledge into action with one-click publishing."
                ctaLabel="Get started"
                href="/wiki/create"
                highlight="Featured"
              />

              {/* ACTION QUICK-LINKS BENTO CELL */}
              <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl space-y-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-slate-500" />
                  <h3 className="text-xs font-mono tracking-widest uppercase text-slate-500">
                    Quick Operations
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  <Link
                    href="/wiki/create"
                    className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-3.5 text-sm font-medium text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-900/50 transition-all group"
                  >
                    <PlusCircle className="w-4 h-4 text-sky-400 group-hover:scale-105 transition-transform" />
                    <span>Create new article</span>
                    <span className="ml-auto text-slate-600 group-hover:text-slate-400 transition-colors">
                      →
                    </span>
                  </Link>

                  <Link
                    href="/wiki"
                    className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-3.5 text-sm font-medium text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-900/50 transition-all group"
                  >
                    <Compass className="w-4 h-4 text-slate-400 group-hover:text-sky-400 transition-colors" />
                    <span>Browse index registry</span>
                    <span className="ml-auto text-slate-600 group-hover:text-slate-400 transition-colors">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}
