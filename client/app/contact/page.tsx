export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Contact Us</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Have a question, feedback, or need help with SparkWiki? Our team is here to help.
          Send us a message below, or email support@sparkwiki.com and we’ll get back to you shortly.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">Contact details</h2>
            <p className="mt-4 text-slate-600">support@sparkwiki.com</p>
            <p className="mt-2 text-slate-600">+1 (555) 123-4567</p>
            <p className="mt-2 text-slate-600">123 Spark Lane, Knowledge City</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">Send a message</h2>
            <form className="mt-6 space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Name
                <input
                  type="text"
                  name="name"
                  className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
                  placeholder="Your name"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Email
                <input
                  type="email"
                  name="email"
                  className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
                  placeholder="you@example.com"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Message
                <textarea
                  name="message"
                  rows={5}
                  className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
                  placeholder="How can we help you today?"
                />
              </label>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
