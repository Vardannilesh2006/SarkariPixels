import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Compress Image to 500KB — Free Tool for College Admissions, Marksheets",
  description: "Compress photos, scanned marksheets, and documents to 500KB or less — free, browser-based. Perfect for college admission portals, university forms, and DU/JNU application uploads.",
  alternates: {
    canonical: `${SITE_URL}/compress-to-500kb`,
    languages: { "en": `${SITE_URL}/compress-to-500kb`, "x-default": `${SITE_URL}/compress-to-500kb` },
  },
  openGraph: {
    title: "Compress Image to 500KB — Free for College & University Portals",
    description: "Reduce photo or document size to under 500KB instantly. Zero server upload — all processing in your browser.",
    url: `${SITE_URL}/compress-to-500kb`,
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Compress a Photo or Document to 500KB for College Admissions",
  step: [
    { "@type": "HowToStep", position: 1, name: "Open Compress to 500KB", text: "Visit SarkariPixels and use the 'Reduce KB' tool or set a target of 500KB." },
    { "@type": "HowToStep", position: 2, name: "Upload your file", text: "Upload your JPG, PNG, or scanned photo. It stays locally in your browser." },
    { "@type": "HowToStep", position: 3, name: "Compress", text: "The tool compresses the image to just under 500KB at maximum quality." },
    { "@type": "HowToStep", position: 4, name: "Download", text: "Download and upload to your college or university admission portal." },
  ],
};

export default function CompressTo500KBPage() {
  const canonicalUrl = `${SITE_URL}/compress-to-500kb`;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}>
        <header className="sticky top-0 z-40 border-b" style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black" style={{ backgroundColor: "var(--color-accent)" }}>S</div>
              <span className="text-base font-bold">SarkariPixels</span>
            </a>
            <a href="/" className="nav-link text-sm font-medium">← All Tools</a>
          </div>
        </header>
        <main className="flex-1">
          <section className="py-12 px-4 sm:px-6 text-center border-b" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border" style={{ backgroundColor: "var(--color-accent-light)", color: "var(--color-accent)", borderColor: "#bfdbfe" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                Browser-Based · Zero Upload · 100% Free
              </div>
              <h1 className="t-h1 mb-4">Compress Image to 500KB</h1>
              <p className="t-body mb-6" style={{ color: "var(--color-muted)" }}>
                Reduce photos and scanned marksheets to <strong style={{ color: "var(--color-text)" }}>500KB or less</strong> — instantly and privately.
                Ideal for <strong style={{ color: "var(--color-text)" }}>college admissions, university portals, DU, JNU, CUET, and marksheet uploads</strong>.
              </p>
              <a href="/tool/reduce-kb" className="btn btn-primary" style={{ fontSize: "1rem", padding: "14px 36px" }}>
                Open Compress Tool →
              </a>
            </div>
          </section>
          <section className="py-12 px-4 sm:px-6" aria-labelledby="uses-heading">
            <div className="max-w-4xl mx-auto">
              <h2 id="uses-heading" className="t-h2 mb-6 text-center">Common Use Cases for 500KB Limit</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "College Admission Portals (CUET/DU/JNU)", body: "Most central university and CUET portals require profile photo under 200KB–500KB and scanned marksheets under 500KB–1MB." },
                  { title: "Scholarship Applications", body: "National Scholarship Portal (NSP) and state scholarship forms typically require photo/docs under 200KB–500KB." },
                  { title: "State Government Service Forms", body: "Various state recruitment boards and government department forms allow files up to 500KB for scanned documents." },
                  { title: "Court / Legal Document Uploads", body: "E-court and judicial portals commonly set 500KB limits for scanned affidavits, identity proofs, and photographs." },
                ].map((card) => (
                  <div key={card.title} className="card p-5">
                    <h3 className="font-semibold mb-2" style={{ color: "var(--color-text)" }}>{card.title}</h3>
                    <p className="t-caption" style={{ lineHeight: "1.7" }}>{card.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="py-10 px-4 sm:px-6 border-t" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="t-h3 mb-6">Other Size Targets</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { href: "/compress-to-50kb", label: "50KB" }, { href: "/compress-to-100kb", label: "100KB" },
                  { href: "/compress-to-200kb", label: "200KB" }, { href: "/tool/reduce-kb", label: "Custom KB" },
                  { href: "/tool/compress-200", label: "Compress to 200KB Tool" },
                ].map((link) => (
                  <a key={link.href} href={link.href} className="badge badge-accent" style={{ fontSize: "0.8125rem", padding: "6px 14px" }}>{link.label}</a>
                ))}
              </div>
            </div>
          </section>
        </main>
        <footer className="border-t py-6 px-4 sm:px-6" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="t-caption">© {new Date().getFullYear()} SarkariPixels.</span>
            <div className="flex gap-4">
              {[{ href: "/page/privacy", label: "Privacy" }, { href: "/", label: "All Tools" }].map((l) => (
                <a key={l.href} href={l.href} className="t-caption" style={{ color: "var(--color-muted)" }}>{l.label}</a>
              ))}
            </div>
          </div>
        </footer>
      </div>
      <link rel="canonical" href={canonicalUrl} />
    </>
  );
}
