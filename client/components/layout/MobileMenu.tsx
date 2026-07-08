"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  House,
  LayoutDashboard,
  BookOpen,
  Star,
  Settings,
  User,
  LogIn,
} from "lucide-react";

const links = [
  {
    href: "/",
    label: "Home",
    icon: House,
  },
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/wiki",
    label: "Wiki",
    icon: BookOpen,
  },
  {
    href: "/favorites",
    label: "Favorites",
    icon: Star,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

export function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
        <h1 className="text-lg font-bold text-slate-900">SparkWiki</h1>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-xl border border-slate-200 p-2 transition hover:bg-slate-100"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menu */}
      {open && (
        <div className="border-b border-slate-200 bg-white shadow-lg">
          {/* Profile */}
          <div className="flex items-center gap-3 border-b border-slate-100 p-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 font-semibold text-white">
              SP
            </div>

            <div>
              <p className="font-semibold text-slate-900">Guest User</p>

              <p className="text-sm text-slate-500">Welcome to SparkWiki</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-3">
            {links.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`mb-1 flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                    active
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer Buttons */}
          <div className="border-t border-slate-100 p-4">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="mb-3 flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 hover:bg-slate-50"
            >
              <User size={20} />
              Profile
            </Link>

            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-800"
            >
              <LogIn size={18} />
              Sign In
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
