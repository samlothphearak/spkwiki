"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Terminal,
  ArrowLeft,
  Globe,
  SendHorizontal,
  Eye,
  Edit3,
  Columns,
  Code,
  Heading2,
  List,
  Quote,
  TableProperties,
} from "lucide-react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { useAuth } from "@/hook/useAuth";
import { createWikiArticle } from "@/services/wiki";

export default function CreateWikiPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"edit" | "preview" | "split">(
    "split",
  );
  const router = useRouter();
  const { token } = useAuth();

  // Ref hooks for syncing scrolls between elements
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const currentSlug = generateSlug(title) || "your-article-slug";

  const canPublish = Boolean(title.trim() && content.trim() && token);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!token) {
      setError("You must be signed in to publish a wiki article.");
      return;
    }

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    setIsLoading(true);

    try {
      await createWikiArticle(
        {
          title: title.trim(),
          content: content.trim(),
          description: description.trim(),
        },
        token,
      );

      setSuccess("Article published successfully. Redirecting to wiki index...");
      setTitle("");
      setDescription("");
      setContent("");

      setTimeout(() => {
        router.push("/wiki");
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to publish article.");
    } finally {
      setIsLoading(false);
    }
  };

  // FIX: Secure Markdown compilation using Sanitization
  const compiledMarkdown = useMemo(() => {
    if (!content)
      return `<p class="text-slate-700 italic font-mono text-xs">// Empty document node. Use the quick snippets or type below...</p>`;
    try {
      const rawHtml = marked.parse(content, { async: false }) as string;
      return DOMPurify.sanitize(rawHtml); // Securely strips <script> tags and malicious hooks
    } catch (e) {
      return `<span class="text-rose-500 font-mono text-xs">Token compilation failure</span>`;
    }
  }, [content]);

  // IMPROVEMENT: Synchronized Scroller Logic
  const handleScroll = (source: "editor" | "preview") => {
    const editor = textareaRef.current;
    const preview = previewRef.current;
    if (!editor || !preview || activeTab !== "split") return;

    if (source === "editor") {
      const percentage =
        editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
      preview.scrollTop =
        percentage * (preview.scrollHeight - preview.clientHeight);
    } else {
      const percentage =
        preview.scrollTop / (preview.scrollHeight - preview.clientHeight);
      editor.scrollTop =
        percentage * (editor.scrollHeight - editor.clientHeight);
    }
  };

  // IMPROVEMENT: Macro Template Injector Trigger
  const injectSnippet = (type: "h2" | "code" | "list" | "quote" | "table") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = textarea.value;

    const snippets = {
      h2: "\n## ## SYSTEM_SUBSECTION_TITLE\n",
      code: '\n```typescript\nconst nodeData = {\n  status: "ACTIVE"\n};\n```\n',
      list: "\n* [ ] Task checkpoint item\n* [ ] Alternative system node\n",
      quote:
        "\n> CRITICAL: Ensure database migrations run before deployment pipeline steps.\n",
      table:
        "\n| Param | Type | Description |\n|---|---|---|\n| id | string | System node identifier |\n",
    };

    const targetSnippet = snippets[type];
    const newText =
      currentText.substring(0, start) +
      targetSnippet +
      currentText.substring(end);

    setContent(newText);

    // Reposition cursor seamlessly inside input window
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + targetSnippet.length,
        start + targetSnippet.length,
      );
    }, 10);
  };

  return (
    <main className="min-h-screen bg-[#050609] text-slate-300 antialiased selection:bg-sky-500/20 selection:text-white relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[400px] w-full max-w-7xl bg-radial-gradient from-sky-500/[0.015] to-transparent opacity-60 blur-[100px]" />

      {/* Action Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-slate-900/80 bg-[#050609]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3.5">
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-slate-500 hover:text-white transition-colors group"
            >
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Discard</span>
            </Link>
            <span className="text-slate-800 font-mono">|</span>
            <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-sky-400 bg-sky-500/[0.06] border border-sky-500/10 px-2.5 py-1 rounded-md select-none">
              <span className="h-1 w-1 rounded-full bg-sky-400 animate-pulse" />
              <span>SECURE_STREAM_ACTIVE</span>
            </div>
          </div>

          {/* View Segment Switchers */}
          <div className="hidden md:flex items-center gap-1 rounded-lg border border-slate-900 bg-slate-950/60 p-1">
            {(["edit", "split", "preview"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-mono transition-all uppercase ${
                  activeTab === tab
                    ? "bg-slate-900 text-sky-400"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {tab === "edit" && <Edit3 size={12} />}
                {tab === "split" && <Columns size={12} />}
                {tab === "preview" && <Eye size={12} />}
                <span>{tab}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              form="wiki-create-form"
              className="flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-xs font-semibold text-black transition-all duration-200 hover:bg-sky-400"
            >
              <span>Publish Node</span>
              <SendHorizontal className="h-3.5 w-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <form id="wiki-create-form" className="space-y-6">
          <div className="space-y-2 max-w-4xl">
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled Workspace Node"
              className="w-full border-0 p-0 bg-transparent text-3xl font-bold tracking-tight text-white placeholder-slate-800 focus:ring-0 focus:outline-none sm:text-4xl leading-tight"
              required
            />
            <p className="text-sm text-slate-500">
              Create a searchable wiki article for your team and publish it instantly.
            </p>
          </div>

          {/* Path Ribbon & Toolbar Integration */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-y border-slate-900/60 py-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-500">
              <Globe className="h-3.5 w-3.5 text-slate-600" />
              <span className="text-slate-600">PATH //</span>
              <span
                className={`transition-colors ${title ? "text-sky-400" : "text-slate-700"}`}
              >
                /wiki/{currentSlug}
              </span>
            </div>

            {/* QUICK MACRO TOOLBAR BUTTONS */}
            <div className="flex items-center gap-1.5 border-t border-slate-900/40 pt-2 sm:border-t-0 sm:pt-0">
              <span className="text-[10px] text-slate-700 mr-1 uppercase tracking-wider select-none">
                Inject:
              </span>
              <button
                type="button"
                onClick={() => injectSnippet("h2")}
                className="p-1.5 rounded bg-slate-950 border border-slate-900 text-slate-500 hover:text-sky-400 hover:border-slate-800 transition-colors"
                title="Heading"
              >
                <Heading2 size={13} />
              </button>
              <button
                type="button"
                onClick={() => injectSnippet("code")}
                className="p-1.5 rounded bg-slate-950 border border-slate-900 text-slate-500 hover:text-sky-400 hover:border-slate-800 transition-colors"
                title="Code Block"
              >
                <Code size={13} />
              </button>
              <button
                type="button"
                onClick={() => injectSnippet("list")}
                className="p-1.5 rounded bg-slate-950 border border-slate-900 text-slate-500 hover:text-sky-400 hover:border-slate-800 transition-colors"
                title="Checklist"
              >
                <List size={13} />
              </button>
              <button
                type="button"
                onClick={() => injectSnippet("quote")}
                className="p-1.5 rounded bg-slate-950 border border-slate-900 text-slate-500 hover:text-sky-400 hover:border-slate-800 transition-colors"
                title="Callout Quote"
              >
                <Quote size={13} />
              </button>
              <button
                type="button"
                onClick={() => injectSnippet("table")}
                className="p-1.5 rounded bg-slate-950 border border-slate-900 text-slate-500 hover:text-sky-400 hover:border-slate-800 transition-colors"
                title="Data Table"
              >
                <TableProperties size={13} />
              </button>
            </div>
          </div>

          {/* Master Canvas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start h-[calc(100vh-250px)]">
            {/* Editor Input Core */}
            <div
              className={`flex flex-col h-full ${activeTab === "preview" ? "hidden" : activeTab === "edit" ? "col-span-2" : "col-span-1"}`}
            >
              <textarea
                ref={textareaRef}
                id="content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onScroll={() => handleScroll("editor")}
                placeholder="Draft workspace guidelines, API schemas, or technical maps..."
                className="w-full h-full resize-none border-0 p-0 bg-transparent text-[14px] leading-relaxed text-slate-400 placeholder-slate-800 focus:ring-0 focus:outline-none font-mono focus:text-slate-200 overflow-y-auto"
                required
              />
            </div>

            {/* High-End Target Render Panel */}
            <div
              ref={previewRef}
              onScroll={() => handleScroll("preview")}
              className={`h-full border border-slate-900/60 bg-[#07090e]/40 rounded-xl p-6 overflow-y-auto ${
                activeTab === "edit"
                  ? "hidden"
                  : activeTab === "preview"
                    ? "col-span-2"
                    : "col-span-1"
              }`}
            >
              <div
                className="prose prose-invert max-w-none text-[14px] text-slate-400 space-y-4 font-sans
                  prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                  prose-h1:text-2xl prose-h2:text-lg prose-h2:text-sky-400 prose-h2:font-mono prose-h2:border-b prose-h2:border-slate-900 prose-h2:pb-1.5 prose-h2:mt-6
                  prose-p:leading-relaxed prose-p:text-slate-400/90
                  prose-code:text-sky-400 prose-code:font-mono prose-code:bg-slate-950 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:border prose-code:border-slate-900 prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-900 prose-pre:rounded-lg prose-pre:p-4
                  prose-ul:list-disc prose-ul:pl-5 prose-ol:list-decimal prose-ol:pl-5
                  prose-table:w-full prose-table:text-xs prose-table:font-mono prose-th:border-b prose-th:border-slate-800 prose-th:p-2 prose-th:text-slate-500 prose-td:p-2 prose-td:border-b prose-td:border-slate-900/40
                  prose-blockquote:border-l-2 prose-blockquote:border-sky-500/40 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-500"
                dangerouslySetInnerHTML={{ __html: compiledMarkdown }}
              />
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
