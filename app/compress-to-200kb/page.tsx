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
    { "@type": "Question", name: "SSC CGL ke liye photo 200KB se compress kaise karein?", acceptedAnswer: { "@type": "Answer", text: "SSC CGL aur CHSL ke liye photo 20KB–50KB honi chahiye, lekin verification marksheets aur scanned certificates 200KB tak allowed hain. SarkariPixels ka Compress to 200KB tool use karo — photo browser mein hi compress hoti hai." } },
    { "@type": "Question", name: "Does NTA allow 200KB photos for JEE / NEET?", acceptedAnswer: { "@type": "Answer", text: "NTA JEE Main and NEET allow passport photos between 10KB and 200KB (JPEG format, 80% face coverage, white background). Signatures must be 4KB–30KB." } },
    { "@type": "Question", name: "Is 200KB enough for high-resolution passport photos?", acceptedAnswer: { "@type": "Answer", text: "Yes. A standard 3.5cm x 4.5cm passport photo at 300 DPI occupies around 40KB–90KB. 200KB gives plenty of room for crystal-clear facial features without portal rejection." } },
    { "@type": "Question", name: "How to compress scanned marksheet to 200KB without blurring text?", acceptedAnswer: { "@type": "Answer", text: "Upload your scanned PDF or JPG into the SarkariPixels compressor. The tool uses intelligent Lanczos resampling to preserve text sharpness and numerical clarity while fitting under 200KB." } },
    { "@type": "Question", name: "Are my photos uploaded to any server?", acceptedAnswer: { "@type": "Answer", text: "No. All image processing runs locally in your device browser sandbox. No photo or signature ever leaves your mobile phone or computer." } },
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
                Reduce photos and documents to <strong style={{ color: "var(--color-text)" }}>200KB or less</strong> — free, private, instant.
                Configured for <strong style={{ color: "var(--color-text)" }}>SSC CGL, CHSL, MTS, RRB NTPC, Railway, and NTA 200KB portal limits</strong>.
              </p>
              <a href="/tool/reduce-kb" className="btn btn-primary" style={{ fontSize: "1rem", padding: "14px 36px" }}>
                Open Compress Tool →
              </a>
            </div>
          </section>

          <section className="py-10 px-4 sm:px-6 border-b" style={{ borderColor: "var(--color-border)" }}>
            <div className="max-w-4xl mx-auto">
              <h2 className="t-h2 mb-4 text-center">Government Exam Portals with 200KB Limits</h2>
              <p className="text-center text-sm mb-6" style={{ color: "var(--color-muted)" }}>
                Reference table for exams and recruitment portals requiring documents under 200KB:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse card">
                  <thead>
                    <tr className="border-b" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
                      <th className="p-3 font-semibold">Recruitment Board</th>
                      <th className="p-3 font-semibold">Permitted File Size</th>
                      <th className="p-3 font-semibold">Accepted Format</th>
                      <th className="p-3 font-semibold">Dimensions / DPI</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b" style={{ borderColor: "var(--color-border)" }}>
                      <td className="p-3 font-medium">NTA (NEET / JEE Main)</td>
                      <td className="p-3">10KB – 200KB</td>
                      <td className="p-3">JPG / JPEG</td>
                      <td className="p-3">3.5cm × 4.5cm (80% face)</td>
                    </tr>
                    <tr className="border-b" style={{ borderColor: "var(--color-border)" }}>
                      <td className="p-3 font-medium">RRB (Railway NTPC / Group D)</td>
                      <td className="p-3">20KB – 100KB / 200KB docs</td>
                      <td className="p-3">JPG / JPEG</td>
                      <td className="p-3">35mm × 45mm</td>
                    </tr>
                    <tr className="border-b" style={{ borderColor: "var(--color-border)" }}>
                      <td className="p-3 font-medium">CTET / Teaching Exams</td>
                      <td className="p-3">10KB – 100KB (Certificates up to 200KB)</td>
                      <td className="p-3">JPG / PDF</td>
                      <td className="p-3">200 DPI scan</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">State Police & Defense Recruitment</td>
                      <td className="p-3">50KB – 200KB</td>
                      <td className="p-3">JPG / JPEG</td>
                      <td className="p-3">Standard Passport Size</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="py-12 px-4 sm:px-6" aria-labelledby="uses-heading">
            <div className="max-w-4xl mx-auto">
              <h2 id="uses-heading" className="t-h2 mb-6 text-center">Why Portals Require 200KB</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Railway Recruitment Board (RRB)", body: "RRB NTPC, ALP, and Group D portals restrict photo uploads to 20KB–50KB and certificates/category proofs to under 200KB." },
                  { title: "NTA Examination Forms", body: "NTA JEE Main and NEET application forms specify 10KB–200KB for candidate photographs." },
                  { title: "State Police Constable & SI Forms", body: "UP Police, Bihar Police, and MP Police forms commonly specify 100KB–200KB for domicile and educational certificates." },
                  { title: "Banking & Insurance (IBPS / SBI / LIC)", body: "IBPS PO and Clerk applications require handwritten declaration and certificates compressed to under 100KB–200KB." },
                ].map((card) => (
                  <div key={card.title} className="card p-5">
                    <h3 className="font-semibold mb-2" style={{ color: "var(--color-text)" }}>{card.title}</h3>
                    <p className="t-caption" style={{ lineHeight: "1.7" }}>{card.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--color-border)" }} aria-labelledby="faq-heading">
            <div className="max-w-3xl mx-auto">
              <h2 id="faq-heading" className="t-h2 mb-8 text-center">Frequently Asked Questions</h2>
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
