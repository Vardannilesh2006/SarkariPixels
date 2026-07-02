import type { Metadata } from "next";
import { EXAM_SPECS } from "@/lib/exam-specs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sarkaripixels.vercel.app";

export const metadata: Metadata = {
  title: "Exam Photo Specifications — SSC UPSC BPSC RRB IBPS NTA | SarkariPixels",
  description:
    "Official photo and signature requirements for all Indian government exams. SSC, UPSC, BPSC, RRB, IBPS, NTA NEET — exact KB, pixels, DPI, format requirements with direct tool links. Verified 2026.",
  alternates: {
    canonical: `${SITE_URL}/exam-specs`,
    languages: { "en-IN": `${SITE_URL}/exam-specs` },
  },
  openGraph: {
    title: "Indian Exam Photo Specifications 2026 | SarkariPixels",
    description: "Official verified photo and signature size requirements for SSC, UPSC, BPSC, RRB, IBPS, NTA exams.",
    url: `${SITE_URL}/exam-specs`,
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Exam Specifications", item: `${SITE_URL}/exam-specs` },
  ],
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/exam-specs`,
  url: `${SITE_URL}/exam-specs`,
  name: "Indian Government Exam Photo Specifications",
  description: "Official photo and signature requirements for SSC, UPSC, BPSC, RRB, IBPS, NTA and state PSC exams.",
  publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
};

export default function ExamSpecsHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      {/* Header — new design system */}
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
          <a href="/" className="nav-link text-sm font-medium">← All Tools</a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10" style={{ color: "var(--color-text)" }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5" style={{ fontSize: "0.8125rem", color: "var(--color-muted)" }}>
            <li><a href="/" style={{ color: "var(--color-muted)" }}>Home</a></li>
            <li aria-hidden="true">/</li>
            <li style={{ color: "var(--color-text)", fontWeight: 500 }} aria-current="page">Exam Specifications</li>
          </ol>
        </nav>

        <div className="mb-8">
          <h1 className="t-h1 mb-3">Exam Photo &amp; Signature Specifications</h1>
          <p className="t-body" style={{ color: "var(--color-muted)" }}>
            All Indian government exam photo/signature requirements — exact sizes, KB limits, DPI.
            Verified dates included. Direct tool links for each exam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXAM_SPECS.map((exam) => (
            <div key={exam.key} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="t-h3">{exam.name}</h2>
                  <p className="t-caption">{exam.fullName}</p>
                </div>
                <span
                  className="text-xs rounded-full px-2 py-1 font-semibold shrink-0"
                  style={{ backgroundColor: "#eff6ff", color: "var(--color-accent)", fontSize: "0.6875rem" }}
                >
                  Verified: {exam.lastVerified}
                </span>
              </div>

              <div className="space-y-3 text-sm mb-4">
                <div className="rounded-lg p-3" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                  <div className="font-semibold mb-1" style={{ color: "var(--color-text)" }}>
                    <i className="fa-solid fa-camera mr-2" style={{ color: "var(--color-accent)" }} aria-hidden="true" />Photo
                  </div>
                  <div className="space-y-0.5" style={{ color: "var(--color-muted)", fontSize: "0.75rem" }}>
                    <div>Size: {exam.photo.widthCm ? `${exam.photo.widthCm}cm × ${exam.photo.heightCm}cm` : `${exam.photo.widthPx}px × ${exam.photo.heightPx}px`}</div>
                    <div>File Size: {exam.photo.minKB}KB – {exam.photo.maxKB}KB</div>
                    <div>Format: {exam.photo.format}</div>
                  </div>
                </div>

                <div className="rounded-lg p-3" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                  <div className="font-semibold mb-1" style={{ color: "var(--color-text)" }}>
                    <i className="fa-solid fa-signature mr-2" style={{ color: "var(--color-accent)" }} aria-hidden="true" />Signature
                  </div>
                  <div className="space-y-0.5" style={{ color: "var(--color-muted)", fontSize: "0.75rem" }}>
                    <div>Size: {exam.signature.widthCm ? `${exam.signature.widthCm}cm × ${exam.signature.heightCm}cm` : `${exam.signature.widthPx}px × ${exam.signature.heightPx}px`}</div>
                    <div>File Size: {exam.signature.minKB}KB – {exam.signature.maxKB}KB</div>
                  </div>
                </div>
              </div>

              <a href={`/exam-specs/${exam.key}`} className="btn btn-primary" style={{ display: "block", textAlign: "center", padding: "10px" }}>
                {exam.name} Full Specs Dekhen →
              </a>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-16 border-t py-8 px-4 sm:px-6" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="/" className="text-base font-bold" style={{ color: "var(--color-text)" }}>SarkariPixels</a>
          <p className="t-caption">© {new Date().getFullYear()} SarkariPixels · 100% Client-Side</p>
          <div className="flex gap-4">
            {[{ href: "/page/privacy", label: "Privacy" }, { href: "/page/about", label: "About" }, { href: "/", label: "All Tools" }].map((link) => (
              <a key={link.href} href={link.href} className="t-caption" style={{ color: "var(--color-muted)" }}>{link.label}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
