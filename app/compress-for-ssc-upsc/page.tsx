import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Compress Photo for SSC & UPSC Exams — Free Tool with Exact Specs",
  description: "Compress and resize your photo and signature to exact SSC and UPSC portal specifications — free, browser-based, zero upload. Covers SSC CGL, CHSL, MTS, UPSC Civil Services, NDA, CDS pixel and KB limits.",
  alternates: {
    canonical: `${SITE_URL}/compress-for-ssc-upsc`,
    languages: { "en": `${SITE_URL}/compress-for-ssc-upsc`, "x-default": `${SITE_URL}/compress-for-ssc-upsc` },
  },
  openGraph: {
    title: "Compress Photo for SSC & UPSC — Free Exact-Spec Tool",
    description: "Resize and compress photos to exact SSC CGL and UPSC Civil Services specifications in one click.",
    url: `${SITE_URL}/compress-for-ssc-upsc`,
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "SSC CGL photo size kya honi chahiye?", acceptedAnswer: { "@type": "Answer", text: "SSC CGL ke liye photo 3.5cm × 4.5cm (413×531 pixels at 300 DPI), 20–50KB, JPEG format, plain white background mandatory. Recent photo (within 3 months) chahiye." } },
    { "@type": "Question", name: "UPSC photo size kya hoti hai?", acceptedAnswer: { "@type": "Answer", text: "UPSC CSE ke liye photo 350×350 pixels (square), 20KB–300KB, JPEG, white background. Naam aur date stamp last 10 days ki photo pe zaroori hai. Signature 350×100 pixels, 10–100KB." } },
    { "@type": "Question", name: "Kya ek hi tool se SSC aur UPSC dono ka photo ban sakta hai?", acceptedAnswer: { "@type": "Answer", text: "Nahi — SSC aur UPSC ke dimensions alag hain. SSC ke liye portrait 413×531px aur UPSC ke liye square 350×350px chahiye. SarkariPixels pe alag-alag dedicated tools hain." } },
    { "@type": "Question", name: "SSC photo reject kyun hoti hai?", acceptedAnswer: { "@type": "Answer", text: "SSC photo rejection ke common reasons: file too large (>50KB), wrong dimensions, colored background, sunglasses, shadow on face, blurred photo, or OTR live webcam required (2024–2026 cycles). SarkariPixels portal-compliant output deta hai." } },
  ],
};

const specData = [
  { exam: "SSC CGL (Online)", photoSize: "413×531 px (3.5×4.5 cm)", photoKB: "20–50 KB", sigKB: "10–20 KB", fmt: "JPG", bg: "White", tool: "/tool/ssc-photo" },
  { exam: "SSC CHSL / MTS", photoSize: "413×531 px", photoKB: "20–50 KB", sigKB: "10–20 KB", fmt: "JPG", bg: "White", tool: "/tool/ssc-photo" },
  { exam: "UPSC CSE (IAS)", photoSize: "350×350 px (square)", photoKB: "20–300 KB", sigKB: "10–100 KB", fmt: "JPG", bg: "White", tool: "/tool/upsc-photo-resize" },
  { exam: "UPSC NDA / CDS", photoSize: "413×531 px", photoKB: "20–300 KB", sigKB: "10–100 KB", fmt: "JPG", bg: "White", tool: "/tool/upsc-photo-resize" },
];

export default function CompressForSSCUPSCPage() {
  const canonicalUrl = `${SITE_URL}/compress-for-ssc-upsc`;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}>
        <header className="sticky top-0 z-40 border-b" style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black" style={{ backgroundColor: "var(--color-accent)" }}>S</div>
              <span className="text-base font-bold">SarkariPixels</span>
            </a>
            <a href="/exam-specs" className="nav-link text-sm font-medium">Exam Specs →</a>
          </div>
        </header>
        <main className="flex-1">
          <section className="py-12 px-4 sm:px-6 text-center border-b" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border" style={{ backgroundColor: "var(--color-accent-light)", color: "var(--color-accent)", borderColor: "#bfdbfe" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                Verified Specs · Zero Upload · 100% Free
              </div>
              <h1 className="t-h1 mb-4">Compress Photo for SSC &amp; UPSC Exams</h1>
              <p className="t-body mb-8" style={{ color: "var(--color-muted)" }}>
                Resize and compress your photo and signature to <strong style={{ color: "var(--color-text)" }}>exact SSC and UPSC portal specifications</strong> —
                free, browser-based, zero upload. Covers SSC CGL, CHSL, MTS, UPSC Civil Services, NDA, and CDS.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/tool/ssc-photo" className="btn btn-primary">SSC Photo Tool →</a>
                <a href="/tool/upsc-photo-resize" className="btn btn-secondary">UPSC Photo Tool →</a>
              </div>
            </div>
          </section>
          <section className="py-12 px-4 sm:px-6" aria-labelledby="specs-heading">
            <div className="max-w-5xl mx-auto">
              <h2 id="specs-heading" className="t-h2 mb-6 text-center">Official Specifications Table</h2>
              <div className="overflow-x-auto card border rounded-xl" style={{ borderColor: "var(--color-border)" }}>
                <table className="w-full text-left text-sm" style={{ minWidth: "700px" }}>
                  <thead><tr style={{ backgroundColor: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
                    <th className="p-4 font-semibold">Exam</th><th className="p-4 font-semibold">Photo Dimensions</th>
                    <th className="p-4 font-semibold">Photo KB</th><th className="p-4 font-semibold">Signature KB</th>
                    <th className="p-4 font-semibold">Format</th><th className="p-4 font-semibold">Background</th><th className="p-4 font-semibold">Tool</th>
                  </tr></thead>
                  <tbody>
                    {specData.map((row, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid var(--color-border)" }}>
                        <td className="p-4 font-medium" style={{ color: "var(--color-text)" }}>{row.exam}</td>
                        <td className="p-4 font-mono text-xs" style={{ color: "var(--color-muted)" }}>{row.photoSize}</td>
                        <td className="p-4" style={{ color: "var(--color-muted)" }}>{row.photoKB}</td>
                        <td className="p-4" style={{ color: "var(--color-muted)" }}>{row.sigKB}</td>
                        <td className="p-4" style={{ color: "var(--color-muted)" }}>{row.fmt}</td>
                        <td className="p-4" style={{ color: "var(--color-muted)" }}>{row.bg}</td>
                        <td className="p-4"><a href={row.tool} className="text-xs font-medium" style={{ color: "var(--color-accent)" }}>Open →</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="t-caption mt-3 text-center">Specs verified against official SSC and UPSC notifications. Last reviewed: September 2026.</p>
            </div>
          </section>
          <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--color-border)" }} aria-labelledby="faq-heading">
            <div className="max-w-3xl mx-auto">
              <h2 id="faq-heading" className="t-h2 mb-8 text-center">SSC &amp; UPSC Photo FAQ</h2>
              <dl className="space-y-5 divide-y" style={{ borderColor: "var(--color-border)" }}>
                {[
                  { q: "SSC CGL photo size kya honi chahiye?", a: "SSC CGL ke liye photo 413×531 pixels (3.5×4.5 cm at 300 DPI), 20–50KB, JPEG, white background. Recent photo (within 3 months)." },
                  { q: "UPSC photo size kya hoti hai?", a: "UPSC CSE ke liye photo 350×350 pixels (square), 20KB–300KB, JPEG, white background. Naam aur date stamp zaroori." },
                  { q: "Kya ek tool se SSC aur UPSC dono ka photo ban sakta hai?", a: "Nahi — SSC portrait (413×531) aur UPSC square (350×350) hain. SarkariPixels pe dedicated tools hain dono ke liye." },
                  { q: "SSC photo reject kyun hoti hai?", a: "Common reasons: file >50KB, wrong dimensions, colored background, OTR webcam required (2024-2026 cycles). SarkariPixels portal-compliant output deta hai." },
                ].map(({ q, a }, i) => (
                  <div key={i} className={i > 0 ? "pt-5" : ""}>
                    <dt className="font-semibold mb-2" style={{ color: "var(--color-text)" }}>{q}</dt>
                    <dd style={{ color: "var(--color-muted)", fontSize: "0.875rem", lineHeight: "1.7" }}>{a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        </main>
        <footer className="border-t py-6 px-4 sm:px-6" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="t-caption">© {new Date().getFullYear()} SarkariPixels.</span>
            <div className="flex gap-4">
              {[{ href: "/exam-specs", label: "All Exam Specs" }, { href: "/page/privacy", label: "Privacy" }, { href: "/", label: "All Tools" }].map((l) => (
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
