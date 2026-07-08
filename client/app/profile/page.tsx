"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Mail,
  User,
  Calendar,
  Shield,
  Settings,
  BookOpen,
  Heart,
  Eye,
  Activity,
  Verified,
  Lock,
} from "lucide-react";

import { useAuth } from "@/hook/useAuth";

interface DashboardMetrics {
  articles: number;
  favorites: number;
  views: string;
  joined: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkspaceData() {
      try {
        // Simulating immediate API data fetch
        await new Promise((resolve) => setTimeout(resolve, 400));
        setMetrics({
          articles: 126,
          favorites: 34,
          views: "12.8K",
          joined: "2026",
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadWorkspaceData();
  }, []);

  return (
    <main className="min-h-screen bg-[#090a0f] text-slate-200 antialiased selection:bg-sky-500/20">
      {/* Glow Effect Ambient Background */}
      <div className="absolute top-0 left-1/2 -z-10 h-[300px] w-full max-w-7xl -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.08),transparent_50%)]" />

      <div className="mx-auto max-w-5xl px-6 py-12 space-y-6">
        {/* TOP ROW BENTO: Hero Profile Panel & Configuration Shortcut */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Main User Identity Box */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl md:col-span-2 flex flex-col justify-between min-h-[180px]">
            <div className="flex items-start gap-5">
              <img
                src={
                  user?.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=0f172a&color=38bdf8&bold=true`
                }
                alt="Avatar"
                className="h-16 w-16 rounded-2xl border border-slate-700/50 object-cover bg-slate-950 shadow-inner"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                    {user?.name || "Premium Operator"}
                  </h1>
                  {user?.isVerified && (
                    <Verified className="h-4 w-4 text-sky-400 fill-sky-950" />
                  )}
                </div>
                <p className="text-xs text-slate-400 font-mono tracking-wider uppercase">
                  {user?.role || "System Architect"}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-400 max-w-md leading-relaxed">
              {user?.bio ||
                "Active node in the distributed team knowledge base grid pipeline."}
            </p>
          </div>

          {/* Quick Action System Control Box */}
          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/20 p-6 flex flex-col justify-between group hover:border-slate-700 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400">
                <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                Online
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-white">
                Workspace Prefs
              </h3>
              <p className="text-xs text-slate-500">
                Configure key mappings, api parameters and routing tokens.
              </p>
              <Link
                href="/settings"
                className="mt-2 inline-flex items-center text-xs font-semibold text-sky-400 hover:text-sky-300 gap-1"
              >
                Open Settings{" "}
                <span className="transform group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* METRICS ROW BENTO: High-contrast Grid Metrics */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <BentoMetricItem
            icon={<BookOpen className="w-4 h-4 text-sky-400" />}
            label="Articles"
            value={metrics?.articles}
            loading={loading}
          />
          <BentoMetricItem
            icon={<Heart className="w-4 h-4 text-rose-400" />}
            label="Favorites"
            value={metrics?.favorites}
            loading={loading}
          />
          <BentoMetricItem
            icon={<Eye className="w-4 h-4 text-emerald-400" />}
            label="Total Views"
            value={metrics?.views}
            loading={loading}
          />
          <BentoMetricItem
            icon={<Calendar className="w-4 h-4 text-amber-400" />}
            label="Established"
            value={metrics?.joined}
            loading={loading}
          />
        </div>

        {/* CORE DETAILS ROW BENTO: Two-Column Deep-dive Context Frame */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Detailed Metadata Grid Module */}
          <div className="lg:col-span-2 rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 space-y-4 backdrop-blur-xl">
            <h3 className="text-xs font-mono tracking-widest uppercase text-slate-500">
              Security Node Values
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <BentoGridDetail
                icon={<User />}
                title="Legal Handle"
                value={user?.name || "-"}
              />
              <BentoGridDetail
                icon={<Mail />}
                title="Routing Endpoint"
                value={user?.email || "-"}
              />
              <BentoGridDetail
                icon={<Shield />}
                title="Clearance Scope"
                value={user?.role || "Standard"}
              />
              <BentoGridDetail
                icon={<Activity />}
                title="Node Epoch"
                value={
                  user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "2026"
                }
              />
            </div>
          </div>

          {/* Verification Status Card Component */}
          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 flex flex-col justify-between space-y-4">
            <h3 className="text-xs font-mono tracking-widest uppercase text-slate-500">
              System Authorization
            </h3>

            <div className="space-y-3 flex-1 flex flex-col justify-center">
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                <span className="text-xs text-slate-400">Account Registry</span>
                <span
                  className={`text-xs font-mono font-bold uppercase tracking-wider ${user?.isActive !== false ? "text-emerald-400" : "text-rose-400"}`}
                >
                  {user?.isActive !== false ? "[ Active ]" : "[ Inert ]"}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-400">
                  Token Verification
                </span>
                <span
                  className={`text-xs font-mono font-bold uppercase tracking-wider ${user?.isVerified ? "text-sky-400" : "text-amber-500"}`}
                >
                  {user?.isVerified ? "Verified" : "Pending"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-950/40 p-3 rounded-2xl border border-slate-800/50">
              <Lock className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <span>Cryptographic keys managed automatically.</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Sub-Component: Bento Dashboard Metric block
function BentoMetricItem({
  icon,
  label,
  value,
  loading,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number | undefined;
  loading: boolean;
}) {
  return (
    <div className="rounded-3xl border border-slate-800/60 bg-slate-900/30 p-5 flex flex-col justify-between h-[110px] hover:bg-slate-900/50 transition-colors duration-200">
      <div className="flex items-center justify-between text-slate-400">
        <span className="text-xs font-medium text-slate-500">{label}</span>
        <div className="p-1.5 rounded-lg bg-slate-950/60 border border-slate-800">
          {icon}
        </div>
      </div>
      {loading ? (
        <div className="h-7 w-12 animate-pulse rounded bg-slate-800/50 mt-2" />
      ) : (
        <p className="text-2xl font-bold tracking-tight text-white">
          {value ?? 0}
        </p>
      )}
    </div>
  );
}

// Sub-Component: Flattened Grid Detail Module
function BentoGridDetail({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3.5 rounded-2xl border border-slate-800/50 bg-slate-950/20 p-3.5">
      <div className="text-slate-500 bg-slate-950/80 p-2 rounded-xl border border-slate-800/80 shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] text-slate-500 font-medium tracking-wide">
          {title}
        </p>
        <p className="text-xs font-semibold text-slate-300 truncate mt-0.5">
          {value}
        </p>
      </div>
    </div>
  );
}
