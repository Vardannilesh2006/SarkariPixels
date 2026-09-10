import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Compress Image to 100KB — Free Online Tool for UPSC, SSC, RRB, IBPS",
  description: "Compress your photo to exactly 100KB or less — free, browser-based, zero server upload. Pre-configured for UPSC Civil Services, SSC, RRB NTPC, and banking exam portal requirements.",
  alternates: {
    canonical: `${SITE_URL}/compress-to-100kb`,
    languages: { "en": `${SITE_URL}/compress-to-100kb`, "x-default": `${SITE_URL}/compress-to-100kb` },
  },
  openGraph: {
    title: "Compress Image to 100KB — Free for UPSC SSC RRB IBPS Exams",
    description: "Reduce photo size to under 100KB instantly. Browser-based — zero server upload. Pre-configured for Indian exam portals.",
    url: `${SITE_URL}/compress-to-100kb`,
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Compress a Photo to 100KB for UPSC, SSC, and Banking Exam Portals",
  description: "Step-by-step instructions to compress photo to under 100KB for UPSC, SSC, RRB, and IBPS exam portal uploads.",
  step: [
    { "@type": "HowToStep", position: 1, name: "Open Compress to 100KB Tool", text: "Visit SarkariPixels and click 'Compress to 100KB' from the Target KB category." },
    { "@type": "HowToStep", position: 2, name: "Upload your exam photo", text: "Drag or browse your JPG/PNG file. The image never leaves your browser." },
    { "@type": "HowToStep", position: 3, name: "Automatic compression", text: "The tool iteratively compresses the JPEG to fit under 100KB while preserving face clarity." },
    { "@type": "HowToStep", position: 4, name: "Download and submit", text: "Download the compressed photo and upload it to your UPSC, SSC, or RRB portal." },
  ],
  totalTime: "PT1M",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Does UPSC require photos under 100KB?", acceptedAnswer: { "@type": "Answer", text: "UPSC CSE online application requires a photo between 20KB–300KB and a signature between 10KB–100KB, both in JPEG format with white background. The 100KB limit is common for many UPSC field types." } },
    { "@type": "Question", name: "RRB ke liye photo 100KB se kam kaise karein?", acceptedAnswer: { "@type": "Answer", text: "RRB NTPC aur Group D ke liye photo 20KB–100KB, JPEG format mein chahiye. SarkariPixels ka Compress to 100KB tool use karo — photo browser mein compress hoti hai, upload nahi hoti." } },
    { "@type": "Question", name: "Does compression reduce image quality?", acceptedAnswer: { "@type": "Answer", text: "SarkariPixels uses iterative quality reduction to find the highest quality that fits under 100KB. For passport-size photos, 100KB allows excellent JPEG quality (typically Q80–Q90)." } },
    { "@type": "Question", name: "Can I use this for SBI or IBPS applications?", acceptedAnswer: { "@type": "Answer", text: "Yes. SBI PO, SBI Clerk, IBPS PO, and IBPS Clerk all allow photos up to 50KB or 100KB depending on the cycle. The Compress to 100KB tool works for both." } },
    { "@type": "Question", name: "How to ensure passport photo dimensions remain 3.5cm x 4.5cm under 100KB?", acceptedAnswer: { "@type": "Answer", text: "Use our built-in aspect ratio lock or Passport Maker tool before compression. Our algorithm maintains pixel dimensions (e.g. 413x531 px at 300 DPI) while stripping unnecessary EXIF data to reach exactly under 100KB." } },
    { "@type": "Question", name: "Are my application documents safe on this website?", acceptedAnswer: { "@type": "Answer", text: "100% safe. SarkariPixels performs client-side compression exclusively inside your browser memory. Your confidential certificates and photos are never uploaded or stored on any server." } },
  ],
};

export default function CompressTo100KBPage() {
  const canonicalUrl = `${SITE_URL}/compress-to-100kb`;
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
                Zero Server Upload · 100% Free
              </div>
              <h1 className="t-h1 mb-4">Compress Image to 100KB</h1>
              <p className="t-body mb-6" style={{ color: "var(--color-muted)" }}>
                Instantly reduce your photo to <strong style={{ color: "var(--color-text)" }}>100KB or less</strong> — free and 100% private.
                Trusted for <strong style={{ color: "var(--color-text)" }}>UPSC, SSC, RRB NTPC, IBPS, and SBI</strong> exam applications.
              </p>
              <a href="/tool/compress-100" className="btn btn-primary" style={{ fontSize: "1rem", padding: "14px 36px" }}>
                Open Compress to 100KB Tool →
              </a>
            </div>
          </section>
          <section className="py-12 px-4 sm:px-6" aria-labelledby="portals-heading">
            <div className="max-w-4xl mx-auto">
              <h2 id="portals-heading" className="t-h2 mb-6 text-center">Portals With 100KB Photo Limits</h2>
              <div className="overflow-x-auto card border rounded-xl" style={{ borderColor: "var(--color-border)" }}>
                <table className="w-full text-left text-sm" style={{ minWidth: "500px" }}>
                  <thead><tr style={{ backgroundColor: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
                    <th className="p-4 font-semibold">Exam</th><th className="p-4 font-semibold">Photo Limit</th><th className="p-4 font-semibold">Signature Limit</th><th className="p-4 font-semibold">Format</th>
                  </tr></thead>
                  <tbody>
                    {[
                      { exam: "UPSC Civil Services (IAS)", photo: "20–300 KB", sig: "10–100 KB", fmt: "JPG" },
                      { exam: "RRB NTPC / Group D / ALP", photo: "20–100 KB", sig: "10–40 KB", fmt: "JPG" },
                      { exam: "SBI PO / SBI Clerk", photo: "20–100 KB", sig: "10–40 KB", fmt: "JPG" },
                      { exam: "IBPS PO / Clerk / RRB", photo: "20–100 KB", sig: "10–40 KB", fmt: "JPG" },
                      { exam: "SSC CGL / CHSL / MTS (alternate cycles)", photo: "20–100 KB", sig: "10–50 KB", fmt: "JPG" },
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
          <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--color-border)" }} aria-labelledby="faq-heading">
            <div className="max-w-3xl mx-auto">
              <h2 id="faq-heading" className="t-h2 mb-8 text-center">FAQ</h2>
              <dl className="space-y-5 divide-y" style={{ borderColor: "var(--color-border)" }}>
                {faqSchema.mainEntity.map(({ name, acceptedAnswer }, i) => (
                  <div key={i} className={i > 0 ? "pt-5" : ""}>
                    <dt className="font-semibold mb-2" style={{ color: "var(--color-text)" }}>{name}</dt>
                    <dd style={{ color: "var(--color-muted)", fontSize: "0.875rem", lineHeight: "1.7" }}>{acceptedAnswer.text}</dd>
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
                  { href: "/tool/compress-100", label: "Compress to 100KB" },
                  { href: "/compress-to-50kb", label: "Compress to 50KB" },
                  { href: "/compress-to-200kb", label: "Compress to 200KB" },
                  { href: "/tool/upsc-photo-resize", label: "UPSC Photo Resize" },
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
