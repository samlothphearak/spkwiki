import { RegisterForm } from "@/components/auth/RegisterForm";
import { Cpu } from "lucide-react";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050609] text-slate-300 antialiased selection:bg-sky-500/20 selection:text-white relative px-4 py-10 overflow-hidden">
      
      {/* Structural Ambient Glow System */}
      <div className="absolute top-[-10%] right-[-10%] -z-10 h-[500px] w-[500px] bg-radial-gradient from-sky-500/[0.03] to-transparent opacity-70 blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] -z-10 h-[500px] w-[500px] bg-radial-gradient from-emerald-500/[0.01] to-transparent opacity-50 blur-[120px]" />

      {/* Main Glassmorphic Bento Grid Shell */}
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-900/80 bg-slate-950/20 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl lg:grid lg:grid-cols-[1.1fr_0.9fr]">
        
        {/* LEFT COLUMN: Premium Context Provision Panel */}
        <div className="relative flex flex-col justify-between border-b border-slate-900 bg-gradient-to-b from-slate-950/60 to-slate-950/95 p-8 sm:p-12 lg:border-b-0 lg:border-r lg:border-slate-900/80">
          
          <div className="space-y-6">
            {/* Project Namespace Tag */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-sky-500/10 bg-sky-500/[0.04] px-2.5 py-1 text-[10px] font-mono tracking-[0.2em] uppercase text-sky-400 select-none">
                <span className="h-1 w-1 rounded-full bg-sky-400 animate-pulse" />
                SparkWiki // Setup
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl font-sans leading-tight">
              Start building your shared knowledge base.
            </h1>
            
            <p className="max-w-md text-xs leading-relaxed text-slate-500 font-sans">
              Create an account to securely publish technical documentation nodes, bookmark core repository architecture, and synchronize workflows with your team.
            </p>
          </div>

          {/* Infrastructure Provisioning Card */}
          <div className="mt-12 rounded-xl border border-slate-900 bg-slate-950/80 p-4 font-mono text-[11px]">
            <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-wider mb-1.5">
              <Cpu size={12} className="text-sky-500/70" />
              <span>Workspace Matrix</span>
            </div>
            <p className="text-slate-500 leading-normal">
              Initializing an account provisions a dedicated isolated indexing directory across your team's local ecosystem clusters.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Registration Identity Core */}
        <div className="flex flex-col justify-center bg-slate-950/30 p-8 sm:p-12">
          <div className="mb-8 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-600 select-none">
              INITIALIZE_NODE
            </span>
            <h2 className="text-lg font-bold tracking-wide text-white">
              Join the community
            </h2>
            <p className="text-xs text-slate-500 font-sans">
              Configure your credentials to deploy your active developer profile.
            </p>
          </div>

          {/* Form Injected Slot */}
          <div className="relative">
            <RegisterForm />
          </div>
        </div>

      </div>
    </main>
  );
}