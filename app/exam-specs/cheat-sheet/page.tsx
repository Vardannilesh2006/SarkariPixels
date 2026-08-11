import type { Metadata } from "next";
import { EXAM_SPECS } from "@/lib/exam-specs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sarkaripixels.online";

export const metadata: Metadata = {
  title: { absolute: "Indian Exam Photo & Signature Specifications Cheat Sheet 2026 | SarkariPixels" },
  description:
    "Master reference table of official photo, signature, and thumb impression requirements for all Indian government exams (SSC, UPSC, BPSC, RRB, IBPS, NTA). Exact KB, pixels, CM, DPI limits.",
  alternates: {
    canonical: `${SITE_URL}/exam-specs/cheat-sheet`,
    languages: { "en-IN": `${SITE_URL}/exam-specs/cheat-sheet` },
  },
  openGraph: {
    title: "Indian Exam Photo & Signature Rules Cheat Sheet 2026",
    description: "Complete master reference for SSC, UPSC, BPSC, RRB, IBPS, NTA exam photo specifications.",
    url: `${SITE_URL}/exam-specs/cheat-sheet`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Exam Specifications", item: `${SITE_URL}/exam-specs` },
    { "@type": "ListItem", position: 3, name: "Master Cheat Sheet", item: `${SITE_URL}/exam-specs/cheat-sheet` },
  ],
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Indian Government Exam Photo & Signature Specifications 2026 Master Dataset",
  description: "Official verified photo, signature, and document specifications for Indian competitive recruitment portals.",
  url: `${SITE_URL}/exam-specs/cheat-sheet`,
  publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "SarkariPixels" },
  inLanguage: "en-IN",
};

export default function MasterCheatSheetPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />

      {/* Header */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          <a href="/" className="flex items-center gap-2.5 shrink-0" aria-label="SarkariPixels — go to homepage">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black"
              style={{ backgroundColor: "var(--color-accent)" }}
              aria-hidden="true"
            >S</div>
            <span className="text-base font-bold" style={{ color: "var(--color-text)" }}>SarkariPixels</span>
          </a>
          <nav className="flex items-center gap-4">
            <a href="/exam-specs" className="nav-link text-sm font-medium">← All Exams</a>
            <a href="/" className="nav-link text-sm font-medium hidden sm:block">All Tools</a>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10" style={{ color: "var(--color-text)" }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 flex-wrap" style={{ fontSize: "0.8125rem", color: "var(--color-muted)" }}>
            <li><a href="/" style={{ color: "var(--color-muted)" }}>Home</a></li>
            <li aria-hidden="true">/</li>
            <li><a href="/exam-specs" style={{ color: "var(--color-muted)" }}>Exam Specs</a></li>
            <li aria-hidden="true">/</li>
            <li style={{ color: "var(--color-text)", fontWeight: 500 }} aria-current="page">Master Cheat Sheet</li>
          </ol>
        </nav>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 text-xs font-bold" style={{ backgroundColor: "#eff6ff", color: "var(--color-accent)" }}>
            <i className="fa-solid fa-bookmark" aria-hidden="true" />
            Official Educational Reference Asset (2026 Verified)
          </div>
          <h1 className="t-h1 mb-3">Indian Exam Photo &amp; Signature Rules Cheat Sheet 2026</h1>
          <p className="t-body" style={{ color: "var(--color-muted)", maxWidth: "720px" }}>
            The definitive master reference table for educational portals, coaching institutes, and applicants.
            Exact KB ranges, dimensions (CM/PX), DPI resolution, and background rules for all major competitive exams.
          </p>
        </div>

        {/* Master Table */}
        <div className="card overflow-hidden mb-10">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse" style={{ minWidth: "640px" }}>
              <thead>
                <tr style={{ backgroundColor: "var(--color-surface)", borderBottom: "2px solid var(--color-border)" }}>
                  <th className="p-3 font-bold">Exam / Portal</th>
                  <th className="p-3 font-bold">Photo Specs (CM / PX)</th>
                  <th className="p-3 font-bold">Photo KB Limit</th>
                  <th className="p-3 font-bold">Signature Specs</th>
                  <th className="p-3 font-bold">Sig KB Limit</th>
                  <th className="p-3 font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {EXAM_SPECS.map((spec) => {
                  const photoDim = spec.photo.widthCm ? `${spec.photo.widthCm}×${spec.photo.heightCm} cm` : `${spec.photo.widthPx}×${spec.photo.heightPx} px`;
                  const sigDim = spec.signature.widthCm ? `${spec.signature.widthCm}×${spec.signature.heightCm} cm` : `${spec.signature.widthPx}×${spec.signature.heightPx} px`;
                  return (
                    <tr key={spec.key} style={{ borderBottom: "1px solid var(--color-border)" }} className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                      <td className="p-3 font-bold" style={{ color: "var(--color-text)" }}>
                        <a href={`/exam-specs/${spec.key}`} style={{ color: "var(--color-accent)" }}>{spec.name}</a>
                        <span className="block text-muted font-normal text-[10px]">{spec.fullName}</span>
                      </td>
                      <td className="p-3 font-medium">{photoDim} ({spec.photo.dpi ? `${spec.photo.dpi} DPI` : "Standard"})</td>
                      <td className="p-3 font-semibold text-emerald-700 dark:text-emerald-400">{spec.photo.minKB}KB – {spec.photo.maxKB}KB</td>
                      <td className="p-3 font-medium">{sigDim}</td>
                      <td className="p-3 font-semibold text-purple-700 dark:text-purple-400">{spec.signature.minKB}KB – {spec.signature.maxKB}KB</td>
                      <td className="p-3 text-center">
                        <a href={`/tool/${spec.toolIds[0]}`} className="btn btn-primary text-[11px] px-2.5 py-1 inline-block">
                          Resize →
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Embed / Backlink Sharing Box for Educational Blogs */}
        <div className="card p-6 border-2 border-blue-500/20" style={{ backgroundColor: "var(--color-surface)" }}>
          <h2 className="text-base font-bold mb-2" style={{ color: "var(--color-text)" }}>
            <i className="fa-solid fa-code mr-2 text-blue-600" aria-hidden="true" />
            Cite or Embed This Cheat Sheet on Your Educational Blog
          </h2>
          <p className="text-xs mb-4" style={{ color: "var(--color-muted)" }}>
            Are you an educational blogger, coaching admin, or Sarkari Result site owner? 
            Copy the HTML snippet below to cite this official cheat sheet or embed a free resizer link for your readers.
          </p>

          <div className="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto mb-3 select-all">
            <code>
              {`<p>Check exact photo requirements on <a href="${SITE_URL}/exam-specs/cheat-sheet" target="_blank" rel="noopener">SarkariPixels Exam Photo Rules Cheat Sheet</a> or use the free <a href="${SITE_URL}/tool/ssc-photo" target="_blank" rel="noopener">SSC & UPSC Photo Resizer</a>.</p>`}
            </code>
          </div>
          <p className="text-[11px]" style={{ color: "var(--color-muted)" }}>
            ✓ Free to use on any educational website. Attribution backlink appreciated!
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t py-8 px-4 sm:px-6" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="/" className="text-base font-bold" style={{ color: "var(--color-text)" }}>SarkariPixels</a>
          <p className="t-caption">© {new Date().getFullYear()} SarkariPixels · 100% Client-Side · Open Educational Resource</p>
          <div className="flex gap-4">
            {[{ href: "/page/privacy", label: "Privacy" }, { href: "/page/about", label: "About" }, { href: "/exam-specs", label: "All Exams" }].map((link) => (
              <a key={link.href} href={link.href} className="t-caption" style={{ color: "var(--color-muted)" }}>{link.label}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
