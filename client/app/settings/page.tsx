"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  User, 
  Bell, 
  ShieldAlert, 
  Key, 
  Eye, 
  Save, 
  ArrowLeft 
} from "lucide-react";

export default function SettingsPage() {
  // Simple form states for demonstration
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [developerMode, setDeveloperMode] = useState(false);

  return (
    <main className="min-h-screen bg-[#090a0f] text-slate-200 antialiased selection:bg-sky-500/20">
      {/* Glow Effect Ambient Background */}
      <div className="absolute top-0 left-1/2 -z-10 h-[300px] w-full max-w-7xl -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.06),transparent_50%)]" />

      <div className="mx-auto max-w-5xl px-6 py-12 space-y-6">
        
        {/* Navigation Utilities */}
        <div className="flex items-center justify-between">
          <Link 
            href="/profile" 
            className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-slate-500 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-transform" />
            Back to profile
          </Link>
          
          <button
            type="submit"
            form="settings-form"
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-white px-4 text-xs font-semibold text-slate-950 shadow-sm transition-colors hover:bg-slate-200"
          >
            <Save className="h-3.5 w-3.5" />
            Save Configuration
          </button>
        </div>

        {/* TOP ROW BENTO: Section Overview */}
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl">
          <div className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              System Settings
            </h1>
            <p className="text-xs font-mono tracking-wider uppercase text-slate-500">
              Workspace Operational Parameters
            </p>
          </div>
          <p className="mt-3 text-sm text-slate-400 max-w-xl leading-relaxed">
            Configure your development environment thresholds, telemetry routes, notification triggers, and active routing keys.
          </p>
        </div>

        {/* MAIN BENTO GRID FORM */}
        <form id="settings-form" className="grid grid-cols-1 gap-6 md:grid-cols-3">
          
          {/* LEFT SIDE: Workspace Preferences Panel */}
          <div className="md:col-span-2 rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 space-y-6 backdrop-blur-xl">
            <h3 className="text-xs font-mono tracking-widest uppercase text-slate-500">
              Preferences
            </h3>

            <div className="space-y-4">
              {/* Setting Row 1: Profile Display Name Input */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400 block">Public Handle</label>
                <div className="flex items-center gap-2.5 rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
                  <User className="w-4 h-4 text-slate-600 shrink-0" />
                  <input 
                    type="text" 
                    defaultValue="Premium Operator"
                    className="w-full bg-transparent border-0 p-0 text-sm text-slate-200 placeholder-slate-700 focus:ring-0 focus:outline-none"
                  />
                </div>
              </div>

              {/* Setting Row 2: Notification Toggle Switch */}
              <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/20 p-4">
                <div className="flex gap-3 items-start min-w-0">
                  <Bell className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-slate-300">Email Routing Logs</p>
                    <p className="text-xs text-slate-500 mt-0.5">Receive pipeline activity notifications via email.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${emailNotifications ? "bg-sky-500" : "bg-slate-800"}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${emailNotifications ? "translate-x-4" : "translate-x-0"}`} />
                </button>
              </div>

              {/* Setting Row 3: Dev Mode Toggle Switch */}
              <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/20 p-4">
                <div className="flex gap-3 items-start min-w-0">
                  <Eye className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-slate-300">Verbose System Telemetry</p>
                    <p className="text-xs text-slate-500 mt-0.5">Expose low-level debugging metrics inside console instances.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDeveloperMode(!developerMode)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${developerMode ? "bg-sky-500" : "bg-slate-800"}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${developerMode ? "translate-x-4" : "translate-x-0"}`} />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Security & Authorization Token Panel */}
          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-xs font-mono tracking-widest uppercase text-slate-500">
                Security Tokens
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-800/50 bg-slate-950/20 p-3.5">
                  <div className="text-slate-500 bg-slate-950/80 p-2 rounded-xl border border-slate-800 shrink-0">
                    <Key className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500 font-medium tracking-wide">Signing Protocol</p>
                    <p className="text-xs font-mono text-slate-300 mt-0.5">ED25519 SHA256</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-800/50 bg-slate-950/20 p-3.5">
                  <div className="text-slate-500 bg-slate-950/80 p-2 rounded-xl border border-slate-800 shrink-0">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500 font-medium tracking-wide">Node Integrity</p>
                    <p className="text-xs font-mono text-emerald-400 mt-0.5">SECURE_NODE_OK</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 bg-slate-950/40 p-3 rounded-2xl border border-slate-800/50 leading-relaxed">
              Modifying environment thresholds resets your session token lifecycle parameters automatically.
            </div>
          </div>

        </form>
      </div>
    </main>
  );
}