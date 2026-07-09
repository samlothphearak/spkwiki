import { LoginForm } from "@/components/auth/LoginForm";
import { Terminal, ShieldAlert } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050609] text-slate-300 antialiased selection:bg-sky-500/20 selection:text-white relative px-4 py-10 overflow-hidden">
      
      {/* Structural Ambient Glow System */}
      <div className="absolute top-[-10%] left-[-10%] -z-10 h-[500px] w-[500px] bg-radial-gradient from-sky-500/[0.03] to-transparent opacity-70 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] -z-10 h-[500px] w-[500px] bg-radial-gradient from-emerald-500/[0.01] to-transparent opacity-50 blur-[120px]" />

      {/* Main Glassmorphic Bento Grid Shell */}
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-900/80 bg-slate-950/20 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl lg:grid lg:grid-cols-[1.1fr_0.9fr]">
        
        {/* LEFT COLUMN: Premium Context Terminal Panel */}
        <div className="relative flex flex-col justify-between border-b border-slate-900 bg-gradient-to-b from-slate-950/60 to-slate-950/95 p-8 sm:p-12 lg:border-b-0 lg:border-r lg:border-slate-900/80">
          
          <div className="space-y-6">
            {/* Project Namespace Tag */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-sky-500/10 bg-sky-500/[0.04] px-2.5 py-1 text-[10px] font-mono tracking-[0.2em] uppercase text-sky-400 select-none">
                <span className="h-1 w-1 rounded-full bg-sky-400 animate-pulse" />
                SparkWiki // Core
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl font-sans leading-tight">
              Welcome back to your knowledge hub.
            </h1>
            
            <p className="max-w-md text-xs leading-relaxed text-slate-500 font-sans">
              Sign in to continue exploring compiled workspace nodes, orchestrating dynamic team document routes, and managing global codebase contexts.
            </p>
          </div>

          {/* System Environment Notification Card */}
          <div className="mt-12 rounded-xl border border-slate-900 bg-slate-950/80 p-4 font-mono text-[11px]">
            <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-wider mb-1.5">
              <Terminal size={12} className="text-sky-500/70" />
              <span>Security Checkpoint</span>
            </div>
            <p className="text-slate-500 leading-normal">
              Session tokens are isolated via cryptographically hashed structures. Multi-factor handshake protocol active.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Login Handling Core */}
        <div className="flex flex-col justify-center bg-slate-950/30 p-8 sm:p-12">
          <div className="mb-8 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-600 select-none">
              AUTH_PASSPORT
            </span>
            <h2 className="text-lg font-bold tracking-wide text-white">
              Access your workspace
            </h2>
            <p className="text-xs text-slate-500 font-sans">
              Provide authorization credentials to pull active node data.
            </p>
          </div>

          {/* Form Injected Slot */}
          <div className="relative">
            <LoginForm />
          </div>
        </div>

      </div>
    </main>
  );
}