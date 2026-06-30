import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TOOLS, getToolById, CATEGORY_LABELS } from "@/lib/tools-data";
import { getToolContent } from "@/lib/tool-content";
import ToolEditor from "@/components/ToolEditor";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sarkaripixels.vercel.app";

interface Props {
  params: Promise<{ slug: string }>;
}

// Pre-generate all 88 tool pages at build time
export async function generateStaticParams() {
  return TOOLS.map((tool) => ({ slug: tool.id }));
}

// Per-tool SSR metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolById(slug);
  if (!tool) return { title: "Tool Not Found" };

  const content = getToolContent(slug);
  const title = content?.metaTitle || `${tool.title} — Free Online Tool | SarkariPixels`;
  const description =
    content?.metaDesc ||
    `Use ${tool.title} free online. ${tool.desc} 100% browser-based — no file upload needed.`;

  const canonicalUrl = `${SITE_URL}/tool/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
    },
    other: {
      // SoftwareApplication schema hint
      "application-name": "SarkariPixels",
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolById(slug);
  if (!tool) notFound();

  const content = getToolContent(slug);
  const categoryLabel = CATEGORY_LABELS[tool.category];

  // Structured data — SoftwareApplication + FAQPage
  const faqSchema =
    content?.faqs && content.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: content.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
        }
      : null;

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    url: `${SITE_URL}/tool/${slug}`,
    description:
      content?.description ||
      `${tool.title}: ${tool.desc} Free, browser-based, no file upload needed.`,
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* ── Header ───────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 font-black text-slate-900 dark:text-white tracking-tight"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center">
              <i className="fa-solid fa-image text-white text-sm" />
            </div>
            <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
              SarkariPixels
            </span>
          </a>
          <div className="flex items-center gap-2">
            <a
              href="/"
              className="text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors hidden sm:block"
            >
              ← All Tools
            </a>
            <button
              id="theme-toggle-tool"
              className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              <i id="theme-icon-tool" className="fa-solid fa-moon text-slate-500 text-sm" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-400 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li><a href="/" className="hover:text-indigo-600">Home</a></li>
            <li>/</li>
            <li><a href={`/?cat=${tool.category}`} className="hover:text-indigo-600">{categoryLabel}</a></li>
            <li>/</li>
            <li className="text-slate-600 dark:text-slate-300 font-medium">{tool.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ── Left: Editor (client) ─────────────────────────────── */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              {/* Tool Header */}
              <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-pink-100 dark:from-indigo-900/40 dark:to-pink-900/40 flex items-center justify-center">
                    <i className={`fa-solid ${tool.icon} text-indigo-600 dark:text-indigo-400`} />
                  </div>
                  <div>
                    <h1 className="text-xl font-black text-slate-900 dark:text-white">
                      {content?.h1 || tool.title}
                    </h1>
                    <span className="text-xs text-slate-400">{categoryLabel}</span>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full px-3 py-1">
                  <i className="fa-solid fa-shield-halved" />
                  <span>100% Browser-Based — No File Upload</span>
                </div>
              </div>

              {/* Client Canvas Editor */}
              <ToolEditor tool={tool} />
            </div>
          </div>

          {/* ── Right: SEO Content (SSR) ──────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            {content && (
              <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                <h2 className="font-bold text-slate-800 dark:text-white mb-3 text-base">
                  Is Tool Ke Baare Mein
                </h2>
                <div className="prose prose-sm dark:prose-invert text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {content.description.split("\n\n").map((para, i) => (
                    <p key={i} className="mb-3 last:mb-0">
                      {para.replace(/\*\*(.*?)\*\*/g, "$1")}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* How To */}
            {content && content.howTo.length > 0 && (
              <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                <h2 className="font-bold text-slate-800 dark:text-white mb-4 text-base">
                  Kaise Use Karein?
                </h2>
                <ol className="space-y-3">
                  {content.howTo.map((step, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm text-slate-600 dark:text-slate-300">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Related Tools */}
            {content && content.relatedTools.length > 0 && (
              <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                <h2 className="font-bold text-slate-800 dark:text-white mb-4 text-base">
                  Related Tools
                </h2>
                <div className="space-y-2">
                  {content.relatedTools.map((relId) => {
                    const relTool = getToolById(relId);
                    if (!relTool) return null;
                    return (
                      <a
                        key={relId}
                        href={`/tool/${relId}`}
                        className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                          <i className={`fa-solid ${relTool.icon} text-indigo-500 text-xs`} />
                        </div>
                        <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 font-medium">
                          {relTool.title}
                        </span>
                        <i className="fa-solid fa-arrow-right text-slate-300 text-xs ml-auto" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── FAQ Section (SSR — important for SEO) ─────────────── */}
        {content && content.faqs.length > 0 && (
          <div className="mt-10 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 md:p-8">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6">
              Aksar Pooche Jaane Wale Sawaal (FAQ)
            </h2>
            <div className="space-y-5 divide-y divide-slate-100 dark:divide-slate-700">
              {content.faqs.map((faq, i) => (
                <div key={i} className={i > 0 ? "pt-5" : ""}>
                  <dt className="font-bold text-slate-800 dark:text-slate-100 mb-2 text-sm">
                    <i className="fa-solid fa-circle-question text-indigo-500 mr-2" />
                    {faq.q}
                  </dt>
                  <dd className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-6">
                    {faq.a}
                  </dd>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="mt-16 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="/" className="font-black text-base bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
            SarkariPixels
          </a>
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} SarkariPixels · 100% Client-Side · Privacy First
          </p>
          <div className="flex gap-4 text-xs text-slate-400">
            <a href="/page/privacy" className="hover:text-indigo-600">Privacy</a>
            <a href="/page/about" className="hover:text-indigo-600">About</a>
            <a href="/" className="hover:text-indigo-600">All Tools</a>
          </div>
        </div>
      </footer>

      {/* Client-side: theme toggle, before/after slider */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              var btn = document.getElementById('theme-toggle-tool');
              var icon = document.getElementById('theme-icon-tool');
              function apply(dark){
                document.documentElement.classList.toggle('dark', dark);
                localStorage.setItem('sp-theme', dark ? 'dark' : 'light');
                if(icon) icon.className = dark ? 'fa-solid fa-sun text-amber-400 text-sm' : 'fa-solid fa-moon text-slate-500 text-sm';
              }
              var isDark = document.documentElement.classList.contains('dark');
              apply(isDark);
              btn && btn.addEventListener('click', function(){ apply(!document.documentElement.classList.contains('dark')); });
            })();
          `,
        }}
      />
    </>
  );
}
