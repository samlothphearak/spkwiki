"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hook/useAuth";
import { registerUser } from "@/services/auth";
import { ShieldAlert, Loader2 } from "lucide-react";

export function RegisterForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await registerUser({ name, email, password });
      login(response.user, response.token);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Profile registration failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      
      {/* Name Input Field */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 select-none">
          Identity / Handle
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g., Phearak Phuwasit"
          className="w-full rounded-xl border border-slate-900 bg-slate-950/40 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-800 outline-none transition-all focus:border-sky-500/50 focus:bg-slate-950/80 focus:ring-1 focus:ring-sky-500/20 font-mono"
          required
          disabled={isLoading}
        />
      </div>

      {/* Email Input Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 select-none">
          Network Mail Address
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

      {/* Password Input Field */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 select-none">
          Generate Security Passkey
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="••••••••"
          className="w-full rounded-xl border border-slate-900 bg-slate-950/40 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-800 outline-none transition-all focus:border-sky-500/50 focus:bg-slate-950/80 focus:ring-1 focus:ring-sky-500/20 font-mono"
          required
          disabled={isLoading}
        />
      </div>

      {/* Secure Registration Exception Display */}
      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-rose-500/10 bg-rose-500/[0.04] p-3.5 text-xs font-mono text-rose-400">
          <ShieldAlert size={14} className="mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="font-bold uppercase tracking-wider block text-[10px]">REG_EXCEPTION //</span>
            <p className="text-rose-400/80 leading-normal">{error}</p>
          </div>
        </div>
      )}

      {/* Submission Dispatcher Action */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-black transition-all duration-200 hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50 font-sans"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin stroke-[2.5]" />
            <span>Deploying Profile Identity...</span>
          </>
        ) : (
          <span>Initialize & Launch Profile</span>
        )}
      </button>

      {/* Navigation Redirect Anchor */}
      <p className="text-center text-xs font-mono text-slate-600 pt-2">
        Already verified?{" "}
        <Link href="/login" className="text-sky-400 hover:text-sky-300 font-bold ml-1 transition-colors">
          Sign in
        </Link>
      </p>
    </form>
  );
}