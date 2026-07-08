import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.24),_transparent_30%),linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_100%)] px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-[0_20px_60px_-25px_rgba(15,23,42,0.35)] lg:grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-between bg-slate-950 p-8 text-slate-50 sm:p-10">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-300">SparkWiki</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Welcome back to your knowledge hub.
            </h1>
            <p className="mt-4 max-w-md text-base text-slate-400">
              Sign in to continue exploring articles, managing favorites, and sharing updates with your team.
            </p>
          </div>
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-slate-300">
            <p className="font-medium text-white">Why teams love it</p>
            <p className="mt-2">Fast onboarding, clean docs, and shared context in one place.</p>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <div className="mb-8">
            <p className="text-sm font-medium text-sky-700">Sign in</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Access your workspace</h2>
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
