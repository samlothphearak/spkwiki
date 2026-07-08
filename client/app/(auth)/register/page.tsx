import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.24),transparent_30%),linear-gradient(135deg,#f8fbff_0%,#eef4ff_100%)] px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-4xl border border-slate-200/80 bg-white shadow-[0_20px_60px_-25px_rgba(15,23,42,0.35)] lg:grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-between bg-slate-950 p-8 text-slate-50 sm:p-10">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-300">SparkWiki</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Start building your shared knowledge base.
            </h1>
            <p className="mt-4 max-w-md text-base text-slate-400">
              Create an account to publish articles, bookmark favorites, and collaborate in a focused workspace.
            </p>
          </div>
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-slate-300">
            <p className="font-medium text-white">Everything in one place</p>
            <p className="mt-2">Inviting interface, simple onboarding, and collaborative tools built for growth.</p>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <div className="mb-8">
            <p className="text-sm font-medium text-sky-700">Create account</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Join the community</h2>
          </div>
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
