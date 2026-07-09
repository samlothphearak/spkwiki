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
  ArrowLeft,
  Cpu,
  Layers,
  Moon,
  Terminal,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function SettingsPage() {
  // Operational React States for Form Configurations
  const [handle, setHandle] = useState("Premium Operator");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [developerMode, setDeveloperMode] = useState(false);
  const [activeCluster, setActiveCluster] = useState("us-east-eks");
  const [themePreference, setThemePreference] = useState<"obsidian" | "matrix">(
    "obsidian",
  );
  const [apiKey, setApiKey] = useState("sk_live_2026_d7f2a1b9c8e34f7a");
  const [showApiKey, setShowApiKey] = useState(false);

  // User Interactive Action State Feedback
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const triggerNotification = (
    text: string,
    type: "success" | "error" = "success",
  ) => {
    setToastMessage({ text, type });
    if (window.innerHeight) {
      // Clear previous timeout if fast clicking
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  async function handleConfigurationSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setIsSaving(true);

    // Simulate real database updating dispatch handshake delay
    try {
      await new Promise((resolve) => setTimeout(resolve, 1400));
      triggerNotification(
        "System operational parameters synchronized successfully.",
      );
    } catch (err) {
      triggerNotification(
        "Failed to deploy environment config properties.",
        "error",
      );
    } finally {
      setIsSaving(false);
    }
  }

  const rotateActiveToken = () => {
    const generatedHex = Array.from({ length: 16 }, () =>
      Math.floor(Math.random() * 16).toString(16),
    ).join("");
    setApiKey(`sk_live_2026_${generatedHex}`);
    triggerNotification(
      "Generated fresh environment security handshake key. Remember to save changes.",
    );
  };

  return (
    <main className="min-h-screen bg-[#050609] text-slate-300 antialiased selection:bg-sky-500/20 selection:text-white relative pb-16">
      {/* Fixed: Ambient Glow Vector System using inline style workaround for Tailwind */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[400px] w-full max-w-7xl opacity-70 blur-[120px]"
        style={
          {
            backgroundImage: "radial-gradient(var(--tw-gradient-stops))",
            "--tw-gradient-from": "rgba(14, 165, 233, 0.03)",
            "--tw-gradient-to": "transparent",
          } as React.CSSProperties
        }
      />

      {/* Floating Status Notification Toast */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-start gap-3 rounded-xl border p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md font-mono text-xs max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-300 ${
            toastMessage.type === "success"
              ? "border-emerald-500/10 bg-slate-950/90 text-emerald-400"
              : "border-rose-500/10 bg-slate-950/90 text-rose-400"
          }`}
        >
          {toastMessage.type === "success" ? (
            <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
          )}
          <div className="space-y-0.5">
            <span className="font-bold uppercase tracking-wider block text-[10px]">
              {toastMessage.type === "success"
                ? "SYS_SYNC_OK //"
                : "SYS_SYNC_ERR //"}
            </span>
            <p className="text-slate-400 leading-relaxed">
              {toastMessage.text}
            </p>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-5xl px-6 py-12 space-y-8">
        {/* Navigation Utilities Row */}
        <div className="flex items-center justify-between border-b border-slate-900/60 pb-6">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-slate-500 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Profile</span>
          </Link>

          <button
            type="submit"
            form="settings-form"
            disabled={isSaving}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 text-xs font-semibold text-black transition-all hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50 shadow-[0_4px_20px_rgba(14,165,233,0.15)]"
          >
            {isSaving ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>Syncing Matrix...</span>
              </>
            ) : (
              <>
                <Save className="h-3.5 w-3.5 stroke-[2.5]" />
                <span>Save Configuration</span>
              </>
            )}
          </button>
        </div>

        {/* TOP ROW BENTO: Section Overview */}
        <div className="rounded-2xl border border-slate-900/80 bg-gradient-to-b from-slate-950/40 to-slate-950/80 p-6 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-[0.02] text-white select-none pointer-events-none">
            <Terminal size={140} />
          </div>
          <div className="space-y-1 relative z-10">
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-sky-400 bg-sky-500/[0.04] border border-sky-500/10 px-2.5 py-1 rounded-md w-fit">
              <span className="h-1 w-1 rounded-full bg-sky-400 animate-pulse" />
              <span>CLUSTER_SETTINGS_ACTIVE</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl pt-2">
              System Settings
            </h1>
          </div>
          <p className="mt-3 text-xs text-slate-500 max-w-2xl leading-relaxed">
            Configure deployment infrastructure loops, telemetry variables,
            runtime authorization keys, and visual profile routing contexts.
            Changes take effect across active child workspace nodes instantly.
          </p>
        </div>

        {/* MAIN BENTO GRID FORM */}
        <form
          id="settings-form"
          onSubmit={handleConfigurationSubmit}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {/* LEFT SIDE: Workspace Preferences Panel */}
          <div className="md:col-span-2 rounded-2xl border border-slate-900/80 bg-slate-950/20 p-6 space-y-6 backdrop-blur-xl">
            <div className="border-b border-slate-900/60 pb-3">
              <h3 className="text-xs font-mono tracking-widest uppercase text-slate-400 font-bold">
                Identity & Environment Context
              </h3>
            </div>

            <div className="space-y-5">
              {/* Setting Row 1: Profile Display Name Input */}
              <div className="space-y-2">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500 select-none block">
                  Public Operator Handle
                </label>
                <div className="flex items-center gap-2.5 rounded-xl border border-slate-900 bg-slate-950/40 p-3 focus-within:border-sky-500/50 transition-colors">
                  <User className="w-4 h-4 text-slate-600 shrink-0" />
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="w-full bg-transparent border-0 p-0 text-sm text-slate-200 placeholder-slate-800 focus:ring-0 focus:outline-none font-mono"
                    required
                  />
                </div>
              </div>

              {/* Setting Row 2: Target Cluster Node Selection Grid */}
              <div className="space-y-2">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500 select-none block">
                  Primary Deployment Target
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      id: "us-east-eks",
                      name: "AWS EKS (us-east-1)",
                      desc: "Production Core Edge",
                    },
                    {
                      id: "eu-central-k8s",
                      name: "K8s Cluster (eu-central)",
                      desc: "Fallback Registry Node",
                    },
                  ].map((cluster) => (
                    <button
                      type="button"
                      key={cluster.id}
                      onClick={() => setActiveCluster(cluster.id)}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all select-none ${
                        activeCluster === cluster.id
                          ? "border-sky-500/40 bg-sky-500/[0.02]"
                          : "border-slate-900 bg-slate-950/20 hover:border-slate-800"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-mono font-bold ${activeCluster === cluster.id ? "text-sky-400" : "text-slate-400"}`}
                        >
                          {cluster.name}
                        </span>
                        <Cpu
                          size={12}
                          className={
                            activeCluster === cluster.id
                              ? "text-sky-400"
                              : "text-slate-700"
                          }
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {cluster.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Setting Row 3: Interface Theme Selector */}
              <div className="space-y-2">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500 select-none block">
                  Visual Aesthetic Schema
                </label>
                <div className="grid grid-cols-2 gap-3 p-1 rounded-xl bg-slate-950/60 border border-slate-900 w-full sm:w-72">
                  <button
                    type="button"
                    onClick={() => setThemePreference("obsidian")}
                    className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-mono uppercase transition-all ${
                      themePreference === "obsidian"
                        ? "bg-slate-900 text-sky-400 border border-slate-800/60"
                        : "text-slate-500 hover:text-slate-400"
                    }`}
                  >
                    <Moon size={12} />
                    <span>Obsidian</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setThemePreference("matrix")}
                    className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-mono uppercase transition-all ${
                      themePreference === "matrix"
                        ? "bg-slate-900 text-emerald-400 border border-slate-800/60"
                        : "text-slate-500 hover:text-slate-400"
                    }`}
                  >
                    <Layers size={12} />
                    <span>Matrix</span>
                  </button>
                </div>
              </div>

              {/* Setting Row 4: Toggle Notifications */}
              <div className="flex items-center justify-between rounded-xl border border-slate-900 bg-slate-950/20 p-4 transition-colors hover:border-slate-900/80">
                <div className="flex gap-3 items-start min-w-0">
                  <Bell className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                  <div className="space-y-0.5">
                    <p className="text-xs font-mono font-bold text-slate-300">
                      Email Routing Logs
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Dispatch direct pipeline activity telemetry warnings to
                      target address.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${emailNotifications ? "bg-sky-500" : "bg-slate-900"}`}
                >
                  <span
                    className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white transition duration-200 mt-[2px] ml-[2px] ${emailNotifications ? "translate-x-4" : "translate-x-0"}`}
                  />
                </button>
              </div>

              {/* Setting Row 5: Toggle Verbose Mode */}
              <div className="flex items-center justify-between rounded-xl border border-slate-900 bg-slate-950/20 p-4 transition-colors hover:border-slate-900/80">
                <div className="flex gap-3 items-start min-w-0">
                  <Eye className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                  <div className="space-y-0.5">
                    <p className="text-xs font-mono font-bold text-slate-300">
                      Verbose System Telemetry
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Inject raw real-time tracking streams inside client
                      browser terminal console panels.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDeveloperMode(!developerMode)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${developerMode ? "bg-sky-500" : "bg-slate-900"}`}
                >
                  <span
                    className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white transition duration-200 mt-[2px] ml-[2px] ${developerMode ? "translate-x-4" : "translate-x-0"}`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Security & Cryptographic Key Management Panel */}
          <div className="space-y-6">
            {/* Bento Block 1: Real-time Secret Token Vault Container */}
            <div className="rounded-2xl border border-slate-900/80 bg-slate-950/20 p-6 flex flex-col justify-between space-y-6 backdrop-blur-xl">
              <div className="space-y-4">
                <h3 className="text-xs font-mono tracking-widest uppercase text-slate-400 font-bold">
                  Security Keys
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-xl border border-slate-900 bg-slate-950/50 p-3.5">
                    <div className="text-slate-500 bg-slate-950/80 p-2 rounded-lg border border-slate-900 shrink-0">
                      <Key className="w-3.5 h-3.5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                        Signing Logic
                      </p>
                      <p className="text-xs font-mono text-slate-300 mt-0.5">
                        ED25519 SHA256
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-slate-900 bg-slate-950/50 p-3.5">
                    <div className="text-slate-500 bg-slate-950/80 p-2 rounded-lg border border-slate-900 shrink-0">
                      <ShieldAlert className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                        Node Status
                      </p>
                      <p className="text-xs font-mono text-emerald-400 mt-0.5">
                        SECURE_NODE_OK
                      </p>
                    </div>
                  </div>
                </div>

                {/* API String Rotation Input Group */}
                <div className="space-y-2 pt-2 border-t border-slate-900/60">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 select-none">
                      Webhook API Stream Key
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="text-[10px] font-mono text-sky-500 hover:text-sky-400"
                    >
                      {showApiKey ? "Mask Key" : "Reveal Key"}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type={showApiKey ? "text" : "password"}
                      readOnly
                      value={apiKey}
                      className="w-full bg-slate-950/80 border border-slate-900 rounded-xl px-3 py-2 text-xs text-slate-400 font-mono focus:outline-none cursor-default select-all"
                    />
                    <button
                      type="button"
                      onClick={rotateActiveToken}
                      className="p-2 rounded-xl bg-slate-950 border border-slate-900 text-slate-500 hover:text-white transition-colors hover:border-slate-800"
                      title="Roll dynamic streaming token hash"
                    >
                      <RefreshCw size={13} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-mono text-slate-500 bg-slate-950/50 p-3 rounded-xl border border-slate-900/60 leading-relaxed">
                Modifying deployment parameters resets active session payload
                handshakes immediately.
              </div>
            </div>

            {/* Bento Block 2: Informative Health Metric Log Card */}
            <div className="rounded-2xl border border-slate-900/80 bg-gradient-to-br from-slate-950/40 to-slate-950/90 p-4 font-mono text-[10px] space-y-2">
              <span className="text-slate-600 block tracking-widest uppercase">
                Telemetry Stream Metrics //
              </span>
              <div className="flex justify-between text-slate-500">
                <span>System Health Index:</span>
                <span className="text-emerald-400 font-bold">99.98%</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Database Delay Offset:</span>
                <span className="text-sky-400">14ms</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
