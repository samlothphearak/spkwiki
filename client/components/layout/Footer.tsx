"use client";

import Link from "next/link";
import {
  BookOpen,
  Mail,
  Globe,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-[#090a0f] text-slate-400">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-4 md:grid-cols-2">
          
          {/* Brand Panel Bento Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 text-sky-400 group-hover:border-sky-500/30 group-hover:bg-sky-500/10 transition-all duration-300">
                <BookOpen className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-md font-bold tracking-tight text-white">SPKWiki</h2>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                  Knowledge Hub
                </p>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-slate-500 max-w-xs">
              SparkWiki helps teams organize production documentation, live tutorials, pipeline guides, and system indices within one unified platform.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="mb-4 text-xs font-mono tracking-widest uppercase text-slate-500">
              Product
            </h3>

            <div className="space-y-2.5 text-sm">
              {[
                { label: "Home Base", href: "/" },
                { label: "Registry Index", href: "/wiki" },
                { label: "Core Dashboard", href: "/dashboard" },
                { label: "User Profile", href: "/profile" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-slate-400 hover:text-sky-400 transition-colors duration-150"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="mb-4 text-xs font-mono tracking-widest uppercase text-slate-500">
              Resources
            </h3>

            <div className="space-y-2.5 text-sm">
              {[
                { label: "System Settings", href: "/settings" },
                { label: "Privacy Schema", href: "/privacy" },
                { label: "Terms of Action", href: "/terms" },
                { label: "Cookie Cache", href: "/cookies" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-slate-400 hover:text-sky-400 transition-colors duration-150"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Meta Log Tags */}
          <div>
            <h3 className="mb-4 text-xs font-mono tracking-widest uppercase text-slate-500">
              Endpoints
            </h3>

            <div className="space-y-3 font-mono text-[11px] text-slate-500">
              <div className="flex items-center gap-2.5 hover:text-slate-300 transition-colors cursor-pointer">
                <Mail className="h-3.5 w-3.5 text-slate-600 shrink-0" />
                <span>support@spkwiki.com</span>
              </div>

              <div className="flex items-center gap-2.5 hover:text-slate-300 transition-colors cursor-pointer">
                <Globe className="h-3.5 w-3.5 text-slate-600 shrink-0" />
                <span>www.spkwiki.com</span>
              </div>

              <div className="flex items-center gap-2.5 hover:text-slate-300 transition-colors cursor-pointer">
                <MessageCircle className="h-3.5 w-3.5 text-slate-600 shrink-0" />
                <span>Community Channel</span>
              </div>

              <div className="flex items-center gap-2.5 text-emerald-500/80">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500/50 shrink-0" />
                <span>SECURE_SSL_ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metadata Copyright Row */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-900 pt-6 text-xs text-slate-600 md:flex-row font-mono">
          <p>© 2026 SparkWiki Core. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">
              Privacy.md
            </Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">
              Terms.md
            </Link>
            <Link href="/contact" className="hover:text-slate-400 transition-colors">
              Contact.sys
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}