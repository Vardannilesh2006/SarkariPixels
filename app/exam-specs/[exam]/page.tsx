import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getExamByKey, getAllExamKeys } from "@/lib/exam-specs";
import { getToolById } from "@/lib/tools-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sarkaripixels.vercel.app";

interface Props {
  params: Promise<{ exam: string }>;
}

export async function generateStaticParams() {
  return getAllExamKeys().map((key) => ({ exam: key }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { exam } = await params;
  const spec = getExamByKey(exam);
  if (!spec) return { title: "Exam Not Found" };

  const url = `${SITE_URL}/exam-specs/${exam}`;
  return {
    title: `${spec.name} Photo Size & Specification 2026 | SarkariPixels`,
    description: `Official ${spec.name} (${spec.fullName}) photo and signature size requirements. Exact KB limits, pixel dimensions, DPI, format. Verified ${spec.lastVerified}. Direct resize tool link included.`,
    alternates: {
      canonical: url,
      languages: { "en-IN": url },
    },
    openGraph: {
      title: `${spec.name} Photo & Signature Specifications 2026`,
      description: `Exact photo and signature requirements for ${spec.name} exam portals. Verified ${spec.lastVerified}.`,
      url,
      type: "article",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default async function ExamSpecPage({ params }: Props) {
  const { exam } = await params;
  const spec = getExamByKey(exam);
  if (!spec) notFound();

  const primaryTool = spec.toolIds[0] ? getToolById(spec.toolIds[0]) : null;
  const canonicalUrl = `${SITE_URL}/exam-specs/${exam}`;

  // BreadcrumbList JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Exam Specifications", item: `${SITE_URL}/exam-specs` },
      { "@type": "ListItem", position: 3, name: `${spec.name} Specifications`, item: canonicalUrl },
    ],
  };

  // FAQPage JSON-LD — exam-specific FAQs
  const photoSize = spec.photo.widthCm
    ? `${spec.photo.widthCm} cm × ${spec.photo.heightCm} cm`
    : `${spec.photo.widthPx} × ${spec.photo.heightPx} pixels`;
  const sigSize = spec.signature.widthCm
    ? `${spec.signature.widthCm} cm × ${spec.signature.heightCm} cm`
    : `${spec.signature.widthPx} × ${spec.signature.heightPx} pixels`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `${spec.name} exam ke liye photo size kya honi chahiye?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${spec.name} (${spec.fullName}) ke liye photo ${photoSize} honi chahiye, ${spec.photo.minKB}KB se ${spec.photo.maxKB}KB ke beech, ${spec.photo.format} format mein, ${spec.photo.background} background ke saath.`,
        },
      },
      {
        "@type": "Question",
        name: `${spec.name} signature ka size kya hona chahiye?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${spec.name} ke liye signature ${sigSize} honi chahiye, ${spec.signature.minKB}KB se ${spec.signature.maxKB}KB ke beech, ${spec.signature.format} format mein.`,
        },
      },
      {
        "@type": "Question",
        name: `${spec.name} photo ka background color kya hona chahiye?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${spec.name} portal ke liye photo ka background ${spec.photo.background} hona chahiye. ${spec.photo.notes || ""}`,
        },
      },
      {
        "@type": "Question",
        name: `${spec.name} photo kaise resize karein free mein?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `SarkariPixels par jaayein, ${spec.name} Photo tool select karein, apni photo upload karein, aur tool automatically sahi size mein resize kar dega. Koi file upload nahi hoti — 100% browser-based hai.`,
        },
      },
    ],
  };

  // WebPage JSON-LD
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": canonicalUrl,
    url: canonicalUrl,
    name: `${spec.name} Photo Size & Specification 2026`,
    description: `Official ${spec.name} photo and signature requirements for exam portal.`,
    publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-IN",
    dateModified: new Date().toISOString().split("T")[0],
    breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
  };

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      {/* ── Header — matches new design system ─────────────────── */}
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
          <nav className="flex items-center gap-4" aria-label="Secondary navigation">
            <a href="/exam-specs" className="nav-link text-sm font-medium">← All Exams</a>
            <a href="/" className="nav-link text-sm font-medium hidden sm:block">All Tools</a>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10" style={{ color: "var(--color-text)" }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 flex-wrap" style={{ fontSize: "0.8125rem", color: "var(--color-muted)" }}>
            <li><a href="/" style={{ color: "var(--color-muted)" }}>Home</a></li>
            <li aria-hidden="true">/</li>
            <li><a href="/exam-specs" style={{ color: "var(--color-muted)" }}>Exam Specs</a></li>
            <li aria-hidden="true">/</li>
            <li style={{ color: "var(--color-text)", fontWeight: 500 }} aria-current="page">{spec.name}</li>
          </ol>
        </nav>

        <h1 className="t-h1 mb-2">{spec.name} Photo &amp; Signature Requirements</h1>
        <p className="t-body mb-1" style={{ color: "var(--color-muted)" }}>{spec.fullName}</p>
        <p className="t-caption mb-8">
          <i className="fa-solid fa-calendar-check mr-1" aria-hidden="true" />
          Last Verified: {spec.lastVerified} — Hamesha official notification se cross-check karein
        </p>

        {/* Photo Specs */}
        <div className="card p-6 mb-4">
          <h2 className="t-h3 mb-4">
            <i className="fa-solid fa-camera mr-2" style={{ color: "var(--color-accent)" }} aria-hidden="true" />
            Photo Requirements
          </h2>
          <table className="w-full text-sm">
            <tbody>
              {[
                ["Dimensions", spec.photo.widthCm ? `${spec.photo.widthCm} cm × ${spec.photo.heightCm} cm` : `${spec.photo.widthPx} × ${spec.photo.heightPx} pixels`],
                ["File Size", `${spec.photo.minKB} KB – ${spec.photo.maxKB} KB`],
                ["Format", spec.photo.format],
                ["Background", spec.photo.background],
                ...(spec.photo.dpi ? [["DPI", `${spec.photo.dpi} DPI`]] : []),
                ...(spec.photo.notes ? [["Notes", spec.photo.notes]] : []),
              ].map(([k, v]) => (
                <tr key={k} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td className="py-2.5 pr-4 font-semibold w-32" style={{ color: "var(--color-muted)" }}>{k}</td>
                  <td className="py-2.5 font-medium" style={{ color: "var(--color-text)" }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Signature Specs */}
        <div className="card p-6 mb-4">
          <h2 className="t-h3 mb-4">
            <i className="fa-solid fa-signature mr-2" style={{ color: "var(--color-accent)" }} aria-hidden="true" />
            Signature Requirements
          </h2>
          <table className="w-full text-sm">
            <tbody>
              {[
                ["Dimensions", spec.signature.widthCm ? `${spec.signature.widthCm} cm × ${spec.signature.heightCm} cm` : `${spec.signature.widthPx} × ${spec.signature.heightPx} pixels`],
                ["File Size", `${spec.signature.minKB} KB – ${spec.signature.maxKB} KB`],
                ["Format", spec.signature.format],
                ...(spec.signature.notes ? [["Notes", spec.signature.notes]] : []),
              ].map(([k, v]) => (
                <tr key={k} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td className="py-2.5 pr-4 font-semibold w-32" style={{ color: "var(--color-muted)" }}>{k}</td>
                  <td className="py-2.5 font-medium" style={{ color: "var(--color-text)" }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* General Rules */}
        <div className="card p-6 mb-6" style={{ backgroundColor: "var(--color-surface)" }}>
          <h2 className="t-h3 mb-3">
            <i className="fa-solid fa-list-check mr-2" style={{ color: "var(--color-accent)" }} aria-hidden="true" />
            General Rules
          </h2>
          <ul className="space-y-2">
            {spec.generalRules.map((rule) => (
              <li key={rule} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-muted)" }}>
                <i className="fa-solid fa-check-circle mt-0.5 flex-shrink-0" style={{ color: "#16a34a" }} aria-hidden="true" />
                {rule}
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ Section */}
        <div className="card p-6 mb-6">
          <h2 className="t-h3 mb-4">Frequently Asked Questions</h2>
          <dl className="space-y-4">
            {[
              { q: `${spec.name} photo size kya honi chahiye?`, a: `${spec.name} ke liye photo ${photoSize} honi chahiye, ${spec.photo.minKB}–${spec.photo.maxKB} KB, ${spec.photo.format} format, ${spec.photo.background} background.` },
              { q: `${spec.name} signature size kya hai?`, a: `Signature ${sigSize} honi chahiye, ${spec.signature.minKB}–${spec.signature.maxKB} KB, ${spec.signature.format} format mein.` },
              { q: `${spec.name} photo free mein kaise resize karein?`, a: `SarkariPixels.vercel.app par jaayein, ${spec.name} tool select karein, photo upload karein — tool automatically sahi size mein convert kar dega. Bilkul free, koi upload nahi.` },
            ].map(({ q, a }) => (
              <div key={q}>
                <dt className="font-semibold mb-1" style={{ fontSize: "0.9375rem", color: "var(--color-text)" }}>
                  <i className="fa-solid fa-circle-question mr-2" style={{ color: "var(--color-accent)", fontSize: "13px" }} aria-hidden="true" />
                  {q}
                </dt>
                <dd className="pl-6 text-sm" style={{ color: "var(--color-muted)", lineHeight: "1.7" }}>{a}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* CTA */}
        {primaryTool && (
          <a
            href={`/tool/${spec.toolIds[0]}`}
            className="btn btn-primary"
            style={{ display: "block", textAlign: "center", padding: "16px 32px", fontSize: "1rem", marginBottom: "1rem" }}
          >
            <i className="fa-solid fa-wand-magic-sparkles mr-2" aria-hidden="true" />
            {spec.name} Photo Tool Use Karein → ({primaryTool.title})
          </a>
        )}

        <div className="flex flex-wrap gap-2">
          {spec.toolIds.slice(1).map((id) => {
            const t = getToolById(id);
            if (!t) return null;
            return (
              <a
                key={id}
                href={`/tool/${id}`}
                className="btn btn-ghost btn-sm"
              >
                {t.title}
              </a>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer
        className="mt-16 border-t py-8 px-4 sm:px-6"
        style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="/" className="text-base font-bold" style={{ color: "var(--color-text)" }}>SarkariPixels</a>
          <p className="t-caption">© {new Date().getFullYear()} SarkariPixels · 100% Client-Side · Privacy First</p>
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
