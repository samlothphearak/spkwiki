"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hook/useAuth";
import { BookOpen, User, LogIn } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/wiki", label: "Wiki" },
  { href: "/profile", label: "Profile" },
];

export function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-900/60 bg-[#090a0f]/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 lg:px-6">
        
        {/* Brand System */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 text-sky-400 group-hover:border-sky-500/30 group-hover:bg-sky-500/10 transition-all duration-300">
            <BookOpen className="h-4 w-4" />
          </div>

          <div>
            <p className="text-sm font-bold tracking-tight text-white">
              SPKWiki
            </p>
            <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
              v1.0.0_sys
            </p>
          </div>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden items-center gap-1 rounded-full border border-slate-900 bg-slate-950/40 p-1.5 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-1.5 text-xs font-medium font-mono tracking-wide transition-all duration-200 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm border border-slate-800"
                    : "text-slate-400 hover:text-white border border-transparent"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action / Identity Container */}
        <div className="flex items-center gap-3">
          {user ? (
            <Link
              href="/profile"
              className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/30 px-3 py-1.5 text-xs font-mono text-slate-300 transition-all duration-200 hover:border-slate-700/80 hover:bg-slate-900/60"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-sky-500/10 border border-sky-500/20 text-[10px] font-bold text-sky-400">
                {user.name?.charAt(0).toUpperCase() || <User className="h-3 w-3" />}
              </div>
              <span className="hidden sm:inline tracking-tight max-w-[100px] truncate">
                {user.name}
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-1.5 text-xs font-mono text-white transition-all duration-200 hover:border-sky-500/30 hover:bg-slate-900"
            >
              <LogIn className="h-3.5 w-3.5 text-slate-400" />
              <span>Sign In</span>
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}