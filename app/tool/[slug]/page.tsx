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
    other: { "application-name": "SarkariPixels" },
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
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }
      : null;

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
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
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          backgroundColor: "var(--color-bg)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 shrink-0" aria-label="SarkariPixels — go to homepage">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black"
              style={{ backgroundColor: "var(--color-accent)" }}
              aria-hidden="true"
            >
              S
            </div>
            <span className="text-base font-bold" style={{ color: "var(--color-text)" }}>
              SarkariPixels
            </span>
          </a>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="btn btn-ghost btn-sm hidden sm:inline-flex"
              aria-label="Back to all tools"
            >
              <i className="fa-solid fa-arrow-left" style={{ fontSize: "12px" }} aria-hidden="true" />
              All Tools
            </a>
            <button
              id="theme-toggle-tool"
              className="btn btn-ghost btn-sm"
              aria-label="Toggle dark mode"
            >
              <i
                id="theme-icon-tool"
                className="fa-solid fa-moon"
                style={{ fontSize: "14px" }}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </header>

      <main
        className="max-w-6xl mx-auto px-4 sm:px-6 py-8"
        style={{ color: "var(--color-text)" }}
      >
        {/* Breadcrumb */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol
            className="flex items-center gap-1.5 flex-wrap"
            style={{ fontSize: "0.8125rem", color: "var(--color-muted)" }}
          >
            <li><a href="/" style={{ color: "var(--color-muted)" }}>Home</a></li>
            <li aria-hidden="true">/</li>
            <li>
              <a
                href={`/#tools`}
                style={{ color: "var(--color-muted)" }}
              >
                {categoryLabel}
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li
              style={{ color: "var(--color-text)", fontWeight: 500 }}
              aria-current="page"
            >
              {tool.title}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ── Left: Editor (client component) ───────────────────── */}
          <div className="lg:col-span-3">
            <div
              className="card overflow-hidden"
              style={{ borderRadius: "var(--radius-lg)" }}
            >
              {/* Tool header bar */}
              <div
                className="px-6 py-5 border-b"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                    }}
                    aria-hidden="true"
                  >
                    <i
                      className={`fa-solid ${tool.icon}`}
                      style={{ fontSize: "15px", color: "var(--color-accent)" }}
                    />
                  </div>
                  <div>
                    <h1
                      className="text-xl font-bold leading-tight"
                      style={{ color: "var(--color-text)" }}
                    >
                      {content?.h1 || tool.title}
                    </h1>
                    <span className="t-caption">{categoryLabel}</span>
                  </div>
                </div>

                <div
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1"
                  style={{
                    backgroundColor: "#f0fdf4",
                    color: "#166534",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                  }}
                >
                  <i className="fa-solid fa-shield-halved" aria-hidden="true" />
                  <span>100% Browser-Based — No File Upload</span>
                </div>
              </div>

              {/* Canvas Editor */}
              <ToolEditor tool={tool} />
            </div>
          </div>

          {/* ── Right: SEO content (SSR) ───────────────────────────── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Description */}
            {content && (
              <div className="card p-6">
                <h2
                  className="text-base font-bold mb-3"
                  style={{ color: "var(--color-text)" }}
                >
                  About This Tool
                </h2>
                <div style={{ fontSize: "0.875rem", color: "var(--color-muted)", lineHeight: "1.7" }}>
                  {content.description.split("\n\n").map((para, i) => (
                    <p key={i} className={i > 0 ? "mt-3" : ""}>
                      {para.replace(/\*\*(.*?)\*\*/g, "$1")}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* How To */}
            {content && content.howTo.length > 0 && (
              <div className="card p-6">
                <h2
                  className="text-base font-bold mb-4"
                  style={{ color: "var(--color-text)" }}
                >
                  How To Use
                </h2>
                <ol className="space-y-3" role="list">
                  {content.howTo.map((step, i) => (
                    <li key={i} className="flex gap-3 items-start" role="listitem">
                      <span
                        className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5"
                        style={{ backgroundColor: "var(--color-accent)" }}
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <span
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--color-muted)",
                          lineHeight: "1.6",
                        }}
                      >
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Related Tools */}
            {content && content.relatedTools.length > 0 && (
              <div className="card p-6">
                <h2
                  className="text-base font-bold mb-4"
                  style={{ color: "var(--color-text)" }}
                >
                  Related Tools
                </h2>
                <div className="space-y-1">
                  {content.relatedTools.map((relId) => {
                    const relTool = getToolById(relId);
                    if (!relTool) return null;
                    return (
                      <a
                        key={relId}
                        href={`/tool/${relId}`}
                        className="related-tool-link flex items-center gap-2.5 p-2.5 rounded-lg transition-colors"
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: "var(--color-surface)",
                            border: "1px solid var(--color-border)",
                          }}
                          aria-hidden="true"
                        >
                          <i
                            className={`fa-solid ${relTool.icon}`}
                            style={{ fontSize: "11px", color: "var(--color-muted)" }}
                          />
                        </div>
                        <span
                          style={{
                            fontSize: "0.875rem",
                            color: "var(--color-text)",
                            fontWeight: 500,
                          }}
                        >
                          {relTool.title}
                        </span>
                        <i
                          className="fa-solid fa-arrow-right ml-auto"
                          style={{ fontSize: "10px", color: "var(--color-border)" }}
                          aria-hidden="true"
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── FAQ Section (SSR — important for SEO) ──────────────── */}
        {content && content.faqs.length > 0 && (
          <div className="card mt-8 p-6 md:p-8">
            <h2
              className="t-h2 mb-6"
              style={{ fontSize: "1.25rem" }}
            >
              Frequently Asked Questions
            </h2>
            <dl
              className="space-y-0 divide-y"
              style={{ borderColor: "var(--color-border)" }}
            >
              {content.faqs.map((faq, i) => (
                <div key={i} className={i > 0 ? "pt-5 mt-5" : ""}>
                  <dt
                    className="flex items-start gap-2 font-semibold mb-2"
                    style={{ fontSize: "0.9375rem", color: "var(--color-text)" }}
                  >
                    <i
                      className="fa-solid fa-circle-question mt-0.5 shrink-0"
                      style={{ fontSize: "13px", color: "var(--color-accent)" }}
                      aria-hidden="true"
                    />
                    {faq.q}
                  </dt>
                  <dd
                    className="pl-6"
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-muted)",
                      lineHeight: "1.7",
                    }}
                  >
                    {faq.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </main>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer
        className="mt-16 border-t py-8 px-4 sm:px-6"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href="/"
            className="text-base font-bold"
            style={{ color: "var(--color-text)" }}
            aria-label="SarkariPixels — homepage"
          >
            SarkariPixels
          </a>
          <p className="t-caption">
            &copy; {new Date().getFullYear()} SarkariPixels · 100% Client-Side · Privacy First
          </p>
          <div className="flex gap-4">
            {[
              { href: "/page/privacy", label: "Privacy" },
              { href: "/page/about", label: "About" },
              { href: "/", label: "All Tools" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="t-caption transition-colors"
                style={{ color: "var(--color-muted)" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Theme toggle — inline script for zero flash */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){
            var btn = document.getElementById('theme-toggle-tool');
            var icon = document.getElementById('theme-icon-tool');
            function apply(dark){
              document.documentElement.classList.toggle('dark', dark);
              localStorage.setItem('sp-theme', dark ? 'dark' : 'light');
              if(icon){ icon.className = dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'; icon.style.fontSize='14px'; }
            }
            apply(document.documentElement.classList.contains('dark'));
            btn && btn.addEventListener('click', function(){ apply(!document.documentElement.classList.contains('dark')); });
          })();`,
        }}
      />
    </>
  );
}
