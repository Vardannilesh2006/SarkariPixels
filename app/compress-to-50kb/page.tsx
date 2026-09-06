import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Compress Image to 50KB — Free Online Tool for SSC, UPSC, IBPS Exams",
  description: "Compress your photo or signature to exactly 50KB or less — free, browser-based, zero upload. Pre-configured for SSC, UPSC, IBPS, NTA, and state PSC exam portals that require files under 50KB.",
  alternates: {
    canonical: `${SITE_URL}/compress-to-50kb`,
    languages: { "en": `${SITE_URL}/compress-to-50kb`, "x-default": `${SITE_URL}/compress-to-50kb` },
  },
  openGraph: {
    title: "Compress Image to 50KB — Free for SSC UPSC IBPS Exams",
    description: "Reduce photo size to under 50KB instantly. All processing in your browser — zero server upload.",
    url: `${SITE_URL}/compress-to-50kb`,
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Compress a Photo to 50KB for Government Exam Portals",
  description: "Step-by-step guide to reduce your photo or signature file size to under 50KB for SSC, UPSC, and other exam portal uploads using SarkariPixels.",
  step: [
    { "@type": "HowToStep", position: 1, name: "Open the Compress to 50KB Tool", text: "Go to SarkariPixels and click on the 'Compress to 50KB' tool from the Target KB section." },
    { "@type": "HowToStep", position: 2, name: "Upload your photo or signature", text: "Click 'Browse' or drag your JPG/PNG file onto the upload zone. The file stays on your device." },
    { "@type": "HowToStep", position: 3, name: "Preview the result", text: "The tool automatically compresses your image to under 50KB. Preview the output to check quality." },
    { "@type": "HowToStep", position: 4, name: "Download the compressed file", text: "Click 'Download' to save the 50KB-or-less image ready for the exam portal upload field." },
  ],
  totalTime: "PT1M",
  tool: [{ "@type": "HowToTool", name: "SarkariPixels Compress to 50KB — Free Browser Tool" }],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which exams require photo under 50KB?",
      acceptedAnswer: { "@type": "Answer", text: "SSC CGL/CHSL/MTS (20–50KB), IBPS PO/Clerk (20–50KB), NTA NEET/JEE signature (10–30KB), BPSC signature (10–20KB), and most state PSC portals require photo or signature files under 50KB." }
    },
    {
      "@type": "Question",
      name: "Will image quality be poor after compressing to 50KB?",
      acceptedAnswer: { "@type": "Answer", text: "SarkariPixels uses iterative JPEG quality reduction to find the minimum quality setting that still fits under 50KB while preserving facial clarity and exam portal acceptance. Most passport-size photos compress cleanly to 50KB." }
    },
    {
      "@type": "Question",
      name: "Is 50KB compression free?",
      acceptedAnswer: { "@type": "Answer", text: "Yes, 100% free with no account, no watermark, and no file limit. All compression runs locally in your browser — nothing is uploaded to any server." }
    },
    {
      "@type": "Question",
      name: "Can I compress a signature to 50KB?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Signatures (white background, black ink on JPG/PNG) compress very efficiently to well under 50KB. Use SarkariPixels 'Signature Resize' or 'Compress to 50KB' tool." }
    },
  ],
};

export default function CompressTo50KBPage() {
  const canonicalUrl = `${SITE_URL}/compress-to-50kb`;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}>
        {/* Header */}
        <header className="sticky top-0 z-40 border-b" style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2.5 shrink-0" aria-label="SarkariPixels home">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black" style={{ backgroundColor: "var(--color-accent)" }} aria-hidden="true">S</div>
              <span className="text-base font-bold">SarkariPixels</span>
            </a>
            <a href="/" className="nav-link text-sm font-medium">← All Tools</a>
          </div>
        </header>
        <main className="flex-1">
          {/* Hero */}
          <section className="py-12 px-4 sm:px-6 text-center border-b" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border" style={{ backgroundColor: "var(--color-accent-light)", color: "var(--color-accent)", borderColor: "#bfdbfe" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                100% Browser-Based · Zero Server Upload
              </div>
              <h1 className="t-h1 mb-4">Compress Image to 50KB</h1>
              <p className="t-body mb-6" style={{ color: "var(--color-muted)" }}>
                Reduce your photo or signature file size to <strong style={{ color: "var(--color-text)" }}>50KB or less</strong> — free, instant, and 100% private.
                Pre-configured for <strong style={{ color: "var(--color-text)" }}>SSC, UPSC, IBPS, NTA, BPSC, and state PSC</strong> exam portal upload requirements.
              </p>
              <a href="/tool/compress-50" className="btn btn-primary" style={{ fontSize: "1rem", padding: "14px 36px" }}>
                Open Compress to 50KB Tool →
              </a>
            </div>
          </section>
          {/* Exam portals table */}
          <section className="py-12 px-4 sm:px-6" aria-labelledby="portals-heading">
            <div className="max-w-4xl mx-auto">
              <h2 id="portals-heading" className="t-h2 mb-6 text-center">Portals That Require Files Under 50KB</h2>
              <div className="overflow-x-auto card border rounded-xl" style={{ borderColor: "var(--color-border)" }}>
                <table className="w-full text-left text-sm" style={{ minWidth: "500px" }}>
                  <thead>
                    <tr style={{ backgroundColor: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
                      <th className="p-4 font-semibold">Exam / Portal</th>
                      <th className="p-4 font-semibold">Photo Limit</th>
                      <th className="p-4 font-semibold">Signature Limit</th>
                      <th className="p-4 font-semibold">Format</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { exam: "SSC CGL / CHSL / MTS", photo: "20–50 KB", sig: "10–20 KB", fmt: "JPG" },
                      { exam: "IBPS PO / Clerk / SO", photo: "20–50 KB", sig: "10–20 KB", fmt: "JPG" },
                      { exam: "NTA NEET / JEE (Signature)", photo: "10–200 KB", sig: "4–30 KB", fmt: "JPG" },
                      { exam: "BPSC / BSSC", photo: "10–50 KB", sig: "10–20 KB", fmt: "JPG" },
                      { exam: "SBI PO / Clerk", photo: "20–50 KB", sig: "10–20 KB", fmt: "JPG" },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid var(--color-border)" }}>
                        <td className="p-4 font-medium" style={{ color: "var(--color-text)" }}>{row.exam}</td>
                        <td className="p-4" style={{ color: "var(--color-muted)" }}>{row.photo}</td>
                        <td className="p-4" style={{ color: "var(--color-muted)" }}>{row.sig}</td>
                        <td className="p-4" style={{ color: "var(--color-muted)" }}>{row.fmt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          {/* How it works */}
          <section className="py-12 px-4 sm:px-6" style={{ backgroundColor: "var(--color-surface)" }} aria-labelledby="how-heading">
            <div className="max-w-4xl mx-auto">
              <h2 id="how-heading" className="t-h2 mb-8 text-center">How to Compress to 50KB</h2>
              <ol className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { n: "1", title: "Open Tool", body: "Click 'Open Compress to 50KB Tool' above." },
                  { n: "2", title: "Upload Photo", body: "Drag or browse your JPG/PNG photo. It stays on your device." },
                  { n: "3", title: "Auto Compress", body: "The tool iteratively compresses JPEG quality to fit under 50KB." },
                  { n: "4", title: "Download", body: "Preview quality and download. Upload directly to your exam portal." },
                ].map((step) => (
                  <li key={step.n} className="card p-5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black mb-3" style={{ backgroundColor: "var(--color-accent)" }}>{step.n}</div>
                    <h3 className="font-semibold mb-1" style={{ color: "var(--color-text)" }}>{step.title}</h3>
                    <p className="t-caption" style={{ lineHeight: "1.6" }}>{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
          {/* FAQ */}
          <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--color-border)" }} aria-labelledby="faq-heading">
            <div className="max-w-3xl mx-auto">
              <h2 id="faq-heading" className="t-h2 mb-8 text-center">Frequently Asked Questions</h2>
              <dl className="space-y-5 divide-y" style={{ borderColor: "var(--color-border)" }}>
                {[
                  { q: "Which exams require photo under 50KB?", a: "SSC CGL/CHSL/MTS (20–50KB), IBPS PO/Clerk (20–50KB), NTA NEET/JEE signature (10–30KB), BPSC signature (10–20KB), and most state PSC portals require files under 50KB." },
                  { q: "Will image quality be poor after compressing to 50KB?", a: "SarkariPixels uses iterative JPEG quality reduction to find the minimum quality setting that still fits under 50KB while preserving facial clarity and exam portal acceptance." },
                  { q: "Is 50KB compression free?", a: "Yes, 100% free with no account, no watermark, and no file limit. All compression runs locally in your browser — nothing is uploaded to any server." },
                  { q: "Can I compress a signature to 50KB?", a: "Yes. Signatures compress very efficiently. Use 'Compress to 50KB' or the dedicated Signature Resize tool." },
                ].map(({ q, a }, i) => (
                  <div key={i} className={i > 0 ? "pt-5" : ""}>
                    <dt className="font-semibold mb-2" style={{ color: "var(--color-text)" }}>{q}</dt>
                    <dd style={{ color: "var(--color-muted)", fontSize: "0.875rem", lineHeight: "1.7" }}>{a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
          {/* Related tools */}
          <section className="py-10 px-4 sm:px-6 border-t" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="t-h3 mb-6">Related Compression Tools</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { href: "/tool/compress-50", label: "Compress to 50KB" },
                  { href: "/tool/compress-20", label: "Compress to 20KB" },
                  { href: "/tool/compress-30", label: "Compress to 30KB" },
                  { href: "/compress-to-100kb", label: "Compress to 100KB" },
                  { href: "/compress-to-200kb", label: "Compress to 200KB" },
                  { href: "/tool/resize-signature", label: "Signature Resize" },
                  { href: "/tool/ssc-photo", label: "SSC Photo Tool" },
                ].map((link) => (
                  <a key={link.href} href={link.href} className="badge badge-accent" style={{ fontSize: "0.8125rem", padding: "6px 14px" }}>{link.label}</a>
                ))}
              </div>
            </div>
          </section>
        </main>
        <footer className="border-t py-6 px-4 sm:px-6" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="t-caption">© {new Date().getFullYear()} SarkariPixels. All rights reserved.</span>
            <div className="flex gap-4">
              {[{ href: "/page/privacy", label: "Privacy" }, { href: "/page/cookies", label: "Cookies" }, { href: "/page/about", label: "About" }, { href: "/", label: "All Tools" }].map((l) => (
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
