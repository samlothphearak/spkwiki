"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Terminal,
  ShieldCheck,
  ShieldAlert,
  Loader2,
  ArrowLeft,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSuccess(false);
    setIsLoading(true);

    try {
      // Mocking API call context - replace with your actual service method:
      // await sendResetLink({ email });
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setIsSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Handshake reset execution failed",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050609] text-slate-300 antialiased selection:bg-sky-500/20 selection:text-white relative px-4 py-10 overflow-hidden">
      {/* Structural Ambient Glow System */}
      <div className="absolute top-[-10%] left-[-10%] -z-10 h-[500px] w-[500px] bg-radial-gradient from-sky-500/[0.03] to-transparent opacity-70 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] -z-10 h-[500px] w-[500px] bg-radial-gradient from-rose-500/[0.01] to-transparent opacity-50 blur-[120px]" />

      {/* Main Glassmorphic Bento Grid Shell */}
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-900/80 bg-slate-950/20 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl lg:grid lg:grid-cols-[1.1fr_0.9fr]">
        {/* LEFT COLUMN: Premium Context Recovery Panel */}
        <div className="relative flex flex-col justify-between border-b border-slate-900 bg-gradient-to-b from-slate-950/60 to-slate-950/95 p-8 sm:p-12 lg:border-b-0 lg:border-r lg:border-slate-900/80">
          <div className="space-y-6">
            {/* Project Namespace Tag */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-sky-500/10 bg-sky-500/[0.04] px-2.5 py-1 text-[10px] font-mono tracking-[0.2em] uppercase text-sky-400 select-none">
                <span className="h-1 w-1 rounded-full bg-sky-400 animate-pulse" />
                SparkWiki // Recovery
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl font-sans leading-tight">
              Restore your network credentials.
            </h1>

            <p className="max-w-md text-xs leading-relaxed text-slate-500 font-sans">
              Provide your authorized identity address to receive a secure,
              cryptographically signed token handshake link to update your
              configuration passkey safely.
            </p>
          </div>

          {/* Infrastructure Recovery Card */}
          <div className="mt-12 rounded-xl border border-slate-900 bg-slate-950/80 p-4 font-mono text-[11px]">
            <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-wider mb-1.5">
              <Terminal size={12} className="text-sky-500/70" />
              <span>Token Vault Safety</span>
            </div>
            <p className="text-slate-500 leading-normal">
              Reset hashes automatically expire after 15 minutes of issuance to
              isolate background tracking exposure vectors.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Form Block Container */}
        <div className="flex flex-col justify-center bg-slate-950/30 p-8 sm:p-12">
          <div className="mb-8 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-600 select-none">
              RECOVERY_HANDSHAKE
            </span>
            <h2 className="text-lg font-bold tracking-wide text-white">
              Recover access key
            </h2>
            <p className="text-xs text-slate-500 font-sans">
              Enter your registry parameters below to proceed.
            </p>
          </div>

          {/* Conditional Workflow Switching */}
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 select-none"
                >
                  Registry Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@domain.com"
                  className="w-full rounded-xl border border-slate-900 bg-slate-950/40 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-800 outline-none transition-all focus:border-sky-500/50 focus:bg-slate-950/80 focus:ring-1 focus:ring-sky-500/20 font-mono"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Secure Recovery Exception Display */}
              {error && (
                <div className="flex items-start gap-2 rounded-xl border border-rose-500/10 bg-rose-500/[0.04] p-3.5 text-xs font-mono text-rose-400">
                  <ShieldAlert size={14} className="mt-0.5 shrink-0" />
                  <div className="space-y-0.5">
                    <span className="font-bold uppercase tracking-wider block text-[10px]">
                      VAULT_EXCEPTION //
                    </span>
                    <p className="text-rose-400/80 leading-normal">{error}</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-black transition-all duration-200 hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50 font-sans"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin stroke-[2.5]" />
                    <span>Dispatching Token Payload...</span>
                  </>
                ) : (
                  <span>Dispatch Reset Stream</span>
                )}
              </button>
            </form>
          ) : (
            /* Successful Execution Banner Status Block */
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-start gap-3 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.04] p-4 text-xs font-mono text-emerald-400">
                <ShieldCheck
                  size={16}
                  className="mt-0.5 shrink-0 text-emerald-400"
                />
                <div className="space-y-1">
                  <span className="font-bold uppercase tracking-wider block text-[10px]">
                    DISPATCH_SUCCESS //
                  </span>
                  <p className="text-emerald-400/80 leading-relaxed">
                    A secure reset payload has been transmitted to{" "}
                    <span className="text-white font-bold">{email}</span>.
                    Please verify your system inbox parameters.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Back Anchor Control Links */}
          <div className="text-center pt-6 border-t border-slate-900/60 mt-6">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-sky-400 transition-colors group"
            >
              <ArrowLeft
                size={12}
                className="group-hover:-translate-x-0.5 transition-transform"
              />
              <span>Return to identity authentication</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
