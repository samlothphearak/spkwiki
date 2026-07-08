import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

function formatTitle(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function EditWikiPage({ params }: Props) {
  const { slug } = await params;
  const initialTitle = formatTitle(slug);

  return (
    <main className="min-h-screen bg-white text-slate-900 antialiased selection:bg-slate-100">
      {/* Top Controls Header sticky bar */}
      <header className="sticky top-0 z-10 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link
              href={`/wiki/${slug}`}
              className="text-sm font-medium text-slate-400 hover:text-slate-900 transition-colors"
            >
              Cancel
            </Link>
            <span className="text-slate-200">|</span>
            <span className="text-xs font-medium text-slate-400 select-none">
              Editing Draft
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-slate-400 sm:inline">
              Saved to cloud text box
            </span>
            <button
              type="submit"
              form="wiki-edit-form"
              className="rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              Save changes
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        <form id="wiki-edit-form" className="space-y-8">
          {/* Title Area Input */}
          <div className="space-y-2">
            <label htmlFor="title" className="sr-only">
              Article Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={initialTitle}
              placeholder="Title your article..."
              className="w-full border-0 p-0 text-4xl font-bold tracking-tight text-slate-900 placeholder-slate-200 focus:ring-0 focus:outline-none sm:text-5xl"
              required
            />
          </div>

          {/* Context Ribbon for Content Metadata */}
          <div className="flex flex-wrap items-center gap-4 border-y border-slate-100 py-3 text-xs text-slate-400">
            <div>
              <span className="font-medium text-slate-500">Slug:</span> /wiki/
              {slug}
            </div>
            <span className="hidden text-slate-200 sm:inline">•</span>
            <div>
              <span className="font-medium text-slate-500">Author:</span> Mina
              Chen
            </div>
          </div>

          {/* Core Content Textarea */}
          <div className="space-y-2">
            <label htmlFor="content" className="sr-only">
              Article Content (Markdown)
            </label>
            <textarea
              id="content"
              name="content"
              rows={20}
              placeholder="Start writing in Markdown..."
              defaultValue={`This sprint brought several highly requested adjustments to our core cross-team delivery pipelines. Here is a breakdown of what changed, why we did it, and how it impacts your daily flow.

## 1. Unified Delivery Timelines
We have integrated milestone definitions across both engineering and design tracks.`}
              className="w-full resize-none border-0 p-0 text-[17px] leading-relaxed text-slate-700 placeholder-slate-300 focus:ring-0 focus:outline-none"
              required
            />
          </div>
        </form>
      </div>
    </main>
  );
}
