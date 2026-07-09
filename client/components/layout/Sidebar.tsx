"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Star,
  FolderOpen,
  Clock3,
  Users,
  Settings,
  Plus,
  BarChart3,
  Database,
  ChevronRight,
  Terminal,
  Zap,
} from "lucide-react";
import { useAuth } from "@/hook/useAuth";

const menu = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Wiki Index", href: "/wiki", icon: BookOpen },
  { title: "Favorites", href: "/favorites", icon: Star },
  { title: "Categories", href: "/categories", icon: FolderOpen },
  { title: "Recent Log", href: "/recent", icon: Clock3 },
  { title: "Team Instance", href: "/team", icon: Users },
  { title: "Analytics", href: "/analytics", icon: BarChart3 },
  { title: "Data Storage", href: "/database", icon: Database },
  { title: "Upgrade Plan", href: "/upgrade", icon: Zap },
  { title: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "OP";

  const tierName = user?.tier || "free";

  return (
    <aside className="hidden lg:sticky lg:top-[73px] lg:block lg:w-72 lg:self-start h-[calc(100vh-90px)] overflow-y-auto pr-2 scrollbar-none">
      <div className="rounded-3xl border border-slate-900/80 bg-slate-950/40 p-4 backdrop-blur-xl">
        
        {/* Workspace Bento Action Box */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800/60 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-4">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-20 h-20 bg-sky-500/[0.03] rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5 text-sky-400" />
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
              Active Environment
            </p>
          </div>

          <h2 className="mt-1.5 text-lg font-bold tracking-tight text-white">SparkWiki</h2>
          <p className="mt-1 text-xs text-slate-400 font-sans leading-relaxed">
            All systems nominal. Ready to deploy documentation parameters.
          </p>

          <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-sky-500/20 bg-sky-500/10 py-2.5 text-xs font-mono font-semibold text-sky-400 transition-all duration-300 hover:border-sky-500/40 hover:bg-sky-500/20">
            <Plus size={14} />
            <span>CREATE_ARTICLE</span>
          </button>
        </div>

        {/* Navigation Section */}
        <div className="mt-6">
          <p className="mb-2 px-2 text-[10px] font-mono tracking-widest uppercase text-slate-600">
            Navigation Matrix
          </p>

          <nav className="space-y-1">
            {menu.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`group flex items-center justify-between rounded-xl px-3 py-2.5 transition-all duration-200 border ${
                    active
                      ? "bg-slate-900 border-slate-800 text-white shadow-sm"
                      : "text-slate-400 border-transparent hover:bg-slate-900/30 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} className={active ? "text-sky-400" : "text-slate-500 group-hover:text-slate-300"} />
                    <span className="text-xs font-medium tracking-wide">{item.title}</span>
                  </div>

                  <ChevronRight
                    size={12}
                    className={`transition-transform duration-200 group-hover:translate-x-0.5 ${
                      active ? "text-sky-400/70" : "opacity-20"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Pro Promo Card (Only for free tier users) */}
        {tierName === "free" && (
          <div className="relative mt-5 overflow-hidden rounded-2xl border border-sky-500/20 bg-gradient-to-b from-sky-950/20 to-slate-950/60 p-4">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-16 h-16 bg-sky-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center gap-1.5 text-sky-400">
              <Zap className="h-3.5 w-3.5 fill-sky-400/20" />
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Upgrade to Pro</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-400 leading-normal">
              Unlock unlimited wiki hosting, semantic searching & team invites.
            </p>
            <Link
              href="/upgrade"
              className="mt-3 flex w-full items-center justify-center rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 py-2 text-[10px] font-mono font-bold text-sky-400 transition-colors"
            >
              INITIALIZE_UPGRADE
            </Link>
          </div>
        )}

        {/* Profile Card Terminal Footprint */}
        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-slate-900 bg-slate-950/60 p-3.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-slate-900 to-slate-800 border border-slate-700/50 font-mono text-xs font-bold text-slate-300">
            {initials}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-white truncate">{user?.name || "Operator"}</h4>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wide">
              {tierName === "free" ? "Free Tier" : `${tierName} member`}
            </p>
          </div>
        </div>

      </div>
    </aside>
  );
}