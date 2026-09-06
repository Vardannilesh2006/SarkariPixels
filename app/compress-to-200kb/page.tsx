import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Compress Image to 200KB — Free Online Tool for SSC CGL, CHSL, RRB",
  description: "Compress your photo or document to exactly 200KB or less — free, browser-based. Pre-configured for SSC CGL, CHSL, MTS, RRB NTPC, Railway, and NTA exam portal 200KB upload limits.",
  alternates: {
    canonical: `${SITE_URL}/compress-to-200kb`,
    languages: { "en": `${SITE_URL}/compress-to-200kb`, "x-default": `${SITE_URL}/compress-to-200kb` },
  },
  openGraph: {
    title: "Compress Image to 200KB — Free for SSC RRB NTA Exams",
    description: "Reduce photo to under 200KB instantly. Zero server upload — all processing stays in your browser.",
    url: `${SITE_URL}/compress-to-200kb`,
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Compress a Photo to 200KB for SSC, RRB, NTA Exam Portals",
  step: [
    { "@type": "HowToStep", position: 1, name: "Open the Tool", text: "Go to SarkariPixels and click 'Compress to 200KB' from the Target KB section." },
    { "@type": "HowToStep", position: 2, name: "Upload Photo", text: "Upload your JPG or PNG. It stays on your device — zero server upload." },
    { "@type": "HowToStep", position: 3, name: "Compress", text: "The tool auto-compresses to just under 200KB at maximum possible quality." },
    { "@type": "HowToStep", position: 4, name: "Download", text: "Download the result and upload to your SSC / RRB / NTA application portal." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "SSC CGL ke liye photo 200KB se compress kaise karein?", acceptedAnswer: { "@type": "Answer", text: "SSC CGL aur CHSL ke liye photo 20KB–50KB honi chahiye, lekin kuch cycle mein 200KB tak allowed hai. SarkariPixels ka Compress to 200KB tool use karo — photo browser mein hi compress hoti hai." } },
    { "@type": "Question", name: "Does NTA allow 200KB photos for JEE / NEET?", acceptedAnswer: { "@type": "Answer", text: "NTA JEE Main and NEET allow photos up to 200KB in certain cycles (minimum 10KB). JPEG format with white/off-white background. Signature must be 4–30KB." } },
    { "@type": "Question", name: "Is 200KB enough for high-resolution passport photos?", acceptedAnswer: { "@type": "Answer", text: "Yes. A 413×531 pixel passport photo at JPEG quality 90+ typically occupies 30–80KB. 200KB allows excellent quality for all standard exam photo sizes." } },
  ],
};

export default function CompressTo200KBPage() {
  const canonicalUrl = `${SITE_URL}/compress-to-200kb`;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
              <h1 className="t-h1 mb-4">Compress Image to 200KB</h1>
              <p className="t-body mb-6" style={{ color: "var(--color-muted)" }}>
                Compress photos to <strong style={{ color: "var(--color-text)" }}>200KB or less</strong> instantly — free and private.
                Trusted for <strong style={{ color: "var(--color-text)" }}>SSC CGL/CHSL, RRB NTPC, NTA JEE/NEET, and Railway</strong> exam portals.
              </p>
              <a href="/tool/compress-200" className="btn btn-primary" style={{ fontSize: "1rem", padding: "14px 36px" }}>
                Open Compress to 200KB Tool →
              </a>
            </div>
          </section>
          <section className="py-12 px-4 sm:px-6" aria-labelledby="portals-heading">
            <div className="max-w-4xl mx-auto">
              <h2 id="portals-heading" className="t-h2 mb-6 text-center">Portals With 200KB Photo Limits</h2>
              <div className="overflow-x-auto card border rounded-xl" style={{ borderColor: "var(--color-border)" }}>
                <table className="w-full text-left text-sm" style={{ minWidth: "500px" }}>
                  <thead><tr style={{ backgroundColor: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
                    <th className="p-4 font-semibold">Exam</th><th className="p-4 font-semibold">Photo Limit</th><th className="p-4 font-semibold">Notes</th>
                  </tr></thead>
                  <tbody>
                    {[
                      { exam: "SSC CGL / CHSL / MTS (various cycles)", photo: "20–200 KB", notes: "Specific cycle may vary; check current notification" },
                      { exam: "RRB NTPC / Group D / ALP", photo: "Up to 200 KB", notes: "JPEG, white background, recent photo" },
                      { exam: "NTA JEE Main / NEET UG", photo: "10–200 KB", notes: "JPEG only, white/off-white background" },
                      { exam: "Railway Recruitment Board (various boards)", photo: "20–200 KB", notes: "Color photo, formal attire, white background" },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid var(--color-border)" }}>
                        <td className="p-4 font-medium" style={{ color: "var(--color-text)" }}>{row.exam}</td>
                        <td className="p-4" style={{ color: "var(--color-muted)" }}>{row.photo}</td>
                        <td className="p-4" style={{ color: "var(--color-muted)" }}>{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--color-border)" }} aria-labelledby="faq-heading">
            <div className="max-w-3xl mx-auto">
              <h2 id="faq-heading" className="t-h2 mb-8 text-center">FAQ</h2>
              <dl className="space-y-5 divide-y" style={{ borderColor: "var(--color-border)" }}>
                {[
                  { q: "SSC CGL ke liye photo 200KB se compress kaise karein?", a: "SarkariPixels ka Compress to 200KB tool use karo — photo browser mein hi compress hoti hai, server pe upload nahi hoti." },
                  { q: "Does NTA allow 200KB photos for JEE / NEET?", a: "NTA JEE Main and NEET allow photos 10KB–200KB (JPEG, white/off-white background). Signature must be 4–30KB." },
                  { q: "Is 200KB enough for high-resolution passport photos?", a: "Yes. A 413×531 pixel passport photo at JPEG quality 90+ typically occupies 30–80KB. 200KB allows excellent quality." },
                ].map(({ q, a }, i) => (
                  <div key={i} className={i > 0 ? "pt-5" : ""}>
                    <dt className="font-semibold mb-2" style={{ color: "var(--color-text)" }}>{q}</dt>
                    <dd style={{ color: "var(--color-muted)", fontSize: "0.875rem", lineHeight: "1.7" }}>{a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
          <section className="py-10 px-4 sm:px-6 border-t" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="t-h3 mb-6">Related Tools</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { href: "/tool/compress-200", label: "Compress to 200KB" }, { href: "/compress-to-100kb", label: "Compress to 100KB" },
                  { href: "/compress-to-50kb", label: "Compress to 50KB" }, { href: "/compress-to-500kb", label: "Compress to 500KB" },
                  { href: "/tool/ssc-photo", label: "SSC Photo" }, { href: "/tool/upsc-photo-resize", label: "UPSC Photo" },
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
              {[{ href: "/page/privacy", label: "Privacy" }, { href: "/page/cookies", label: "Cookies" }, { href: "/", label: "All Tools" }].map((l) => (
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
