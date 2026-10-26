// app/jobs/[slug]/page.tsx
// Dedicated Programmatic SEO Landing Page for Active Government Recruitment Drives (>= 400 Posts)

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJobBySlug, getAllJobSlugs, getAllJobs } from "@/lib/jobs/store";
import { SITE_URL } from "@/lib/constants";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllJobSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) return { title: "Recruitment Not Found" };

  const canonicalUrl = `${SITE_URL}/jobs/${slug}`;
  const title = `${job.shortTitle} Photo & Signature Resizer Online (${job.vacancies.toLocaleString()} Posts) | SarkariPixels`;
  const description = `Free online photo and signature resizer for ${job.title} (${job.vacancies.toLocaleString()} Vacancies). Exact photo (${job.photo.minKB}-${job.photo.maxKB}KB) and signature (${job.signature.minKB}-${job.signature.maxKB}KB) portal specifications with 1-click resize tool.`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: { "en-IN": canonicalUrl },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    keywords: job.keywords,
  };
}

export default async function JobSpecPage({ params }: Props) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) notFound();

  const canonicalUrl = `${SITE_URL}/jobs/${slug}`;

  // Structured Data — JobPosting
  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: `Official recruitment notification for ${job.title} with ${job.vacancies.toLocaleString()} vacancies announced by ${job.board}. Prepare compliant passport photograph (${job.photo.minKB}-${job.photo.maxKB} KB) and signature (${job.signature.minKB}-${job.signature.maxKB} KB).`,
    datePosted: job.notificationDate,
    validThrough: job.lastDateToApply ? `${job.lastDateToApply}T23:59:59+05:30` : undefined,
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: job.board,
      sameAs: job.officialNotificationUrl,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
    },
    totalJobOpenings: job.vacancies,
  };

  // Structured Data — SoftwareApplication for the Tool
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${job.shortTitle} Photo & Signature Resizer`,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    url: canonicalUrl,
    description: `Free in-browser client-side photo and signature resizer for ${job.title}. Zero upload privacy.`,
  };

  // Structured Data — BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Govt Job Resizers", item: `${SITE_URL}/jobs` },
      { "@type": "ListItem", position: 3, name: job.shortTitle, item: canonicalUrl },
    ],
  };

  // Structured Data — FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `${job.shortTitle} ke liye photo ka size aur KB limit kya hai?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${job.title} ke liye photo ka size ${job.photo.widthCm ? `${job.photo.widthCm}cm × ${job.photo.heightCm}cm` : `${job.photo.widthPx} × ${job.photo.heightPx} pixels`} aur file size ${job.photo.minKB}KB se ${job.photo.maxKB}KB ke beech hona chahiye (${job.photo.background}).`,
        },
      },
      {
        "@type": "Question",
        name: `${job.shortTitle} signature upload ka kya criteria hai?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Signature ka size ${job.signature.widthCm ? `${job.signature.widthCm}cm × ${job.signature.heightCm}cm` : `${job.signature.widthPx} × ${job.signature.heightPx} pixels`} aur file size strictly ${job.signature.minKB}KB se ${job.signature.maxKB}KB ke beech hona chahiye (${job.signature.inkColor || "Black ink on white paper"}).`,
        },
      },
      {
        "@type": "Question",
        name: `Kya ${job.shortTitle} form me phone se photo upload kar sakte hain?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Haan, SarkariPixels ke tool par aap mobile camera ya gallery se photo select karke 10 second me exact ${job.photo.minKB}-${job.photo.maxKB}KB aur portal dimensions me crop & compress kar sakte hain.`,
        },
      },
    ],
  };

  // 1-Click Launch URLs (with pre-filled parameters)
  const photoToolUrl = `/tool/${job.primaryToolId || "smart-resizer"}?exam=${encodeURIComponent(job.shortTitle)}&targetKB=${job.photo.maxKB}&unit=${job.photo.widthCm ? "cm" : "px"}&w=${job.photo.widthCm || job.photo.widthPx}&h=${job.photo.heightCm || job.photo.heightPx}`;
  const sigToolUrl = `/tool/signature-resizer-10-20kb?exam=${encodeURIComponent(job.shortTitle)}&targetKB=${job.signature.maxKB}&unit=${job.signature.widthCm ? "cm" : "px"}&w=${job.signature.widthCm || job.signature.widthPx}&h=${job.signature.heightCm || job.signature.heightPx}`;

  const otherJobs = getAllJobs().filter((j) => j.slug !== job.slug).slice(0, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b" style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="SarkariPixels Home">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black" style={{ backgroundColor: "var(--color-accent)" }}>
              S
            </div>
            <span className="text-base font-bold" style={{ color: "var(--color-text)" }}>SarkariPixels</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/jobs" className="nav-link text-sm font-medium">← All Govt Jobs</Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10" style={{ color: "var(--color-text)" }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 flex-wrap" style={{ fontSize: "0.8125rem", color: "var(--color-muted)" }}>
            <li><Link href="/" style={{ color: "var(--color-muted)" }}>Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/jobs" style={{ color: "var(--color-muted)" }}>Govt Jobs</Link></li>
            <li aria-hidden="true">/</li>
            <li style={{ color: "var(--color-text)", fontWeight: 500 }} aria-current="page">{job.shortTitle}</li>
          </ol>
        </nav>

        {/* Live Vacancy & Status Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            🔥 Mega Recruitment: {job.vacancies.toLocaleString()} Posts
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            {job.board}
          </span>
          {job.lastDateToApply && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              📅 Last Date: {job.lastDateToApply}
            </span>
          )}
        </div>

        {/* H1 Heading */}
        <h1 className="t-h1 mb-4 leading-tight">
          {job.title} — Photo &amp; Signature Resizer Online
        </h1>
        <p className="t-body mb-8 leading-relaxed" style={{ color: "var(--color-muted)" }}>
          Official {job.board} portal specifications for online application upload. Avoid form rejection due to incorrect dimensions or oversized images. 
          Use our 1-click in-browser tools below with exact criteria pre-configured.
        </p>

        {/* ── 1-CLICK LAUNCH CALLOUT HERO ─────────────────────────────────── */}
        <div className="card p-6 mb-10 rounded-2xl border-2 border-primary/30 shadow-lg" style={{ backgroundColor: "var(--color-surface)" }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">⚡</span>
            <h2 className="text-lg font-bold" style={{ color: "var(--color-text)" }}>
              1-Click Instant Tool Launch for {job.shortTitle}
            </h2>
          </div>
          <p className="text-sm mb-5" style={{ color: "var(--color-muted)" }}>
            Select what you want to prepare. Dimensions, KB limits, and DPI rules are automatically locked for this recruitment:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href={photoToolUrl}
              className="btn btn-primary py-3.5 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 shadow-sm"
            >
              <i className="fa-solid fa-camera" aria-hidden="true" />
              <span>Resize Photo ({job.photo.minKB}-{job.photo.maxKB} KB)</span>
            </Link>
            <Link
              href={sigToolUrl}
              className="btn btn-secondary py-3.5 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 border"
            >
              <i className="fa-solid fa-signature" aria-hidden="true" />
              <span>Resize Signature ({job.signature.minKB}-{job.signature.maxKB} KB)</span>
            </Link>
          </div>
        </div>

        {/* ── SIDE-BY-SIDE SPECIFICATION COMPARISON CARDS ─────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Photo Card */}
          <div className="card p-5 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)" }}>
            <div className="flex items-center justify-between border-b pb-3 mb-4" style={{ borderColor: "var(--color-border)" }}>
              <h3 className="font-bold text-base flex items-center gap-2" style={{ color: "var(--color-text)" }}>
                <span>📸</span> Official Photograph Specifications
              </h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-600">
                {job.photo.minKB} - {job.photo.maxKB} KB
              </span>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between py-1 border-b" style={{ borderColor: "var(--color-border)" }}>
                <span style={{ color: "var(--color-muted)" }}>Physical Dimensions:</span>
                <span className="font-semibold text-right">
                  {job.photo.widthCm ? `${job.photo.widthCm} cm × ${job.photo.heightCm} cm` : `${job.photo.widthPx} × ${job.photo.heightPx} px`}
                </span>
              </li>
              <li className="flex justify-between py-1 border-b" style={{ borderColor: "var(--color-border)" }}>
                <span style={{ color: "var(--color-muted)" }}>File Size Limit:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {job.photo.minKB} KB to {job.photo.maxKB} KB
                </span>
              </li>
              <li className="flex justify-between py-1 border-b" style={{ borderColor: "var(--color-border)" }}>
                <span style={{ color: "var(--color-muted)" }}>Allowed Format:</span>
                <span className="font-semibold">{job.photo.format}</span>
              </li>
              <li className="flex justify-between py-1 border-b" style={{ borderColor: "var(--color-border)" }}>
                <span style={{ color: "var(--color-muted)" }}>Background:</span>
                <span className="font-semibold text-right">{job.photo.background}</span>
              </li>
              <li className="flex justify-between py-1">
                <span style={{ color: "var(--color-muted)" }}>Resolution / DPI:</span>
                <span className="font-semibold">{job.photo.dpi ? `${job.photo.dpi} DPI` : "Standard (200-300 DPI)"}</span>
              </li>
            </ul>
            {job.photo.notes && (
              <p className="mt-3 p-3 rounded-lg bg-blue-500/5 text-xs text-blue-700 dark:text-blue-300 border border-blue-500/15 leading-relaxed">
                📌 <strong>Official Note:</strong> {job.photo.notes}
              </p>
            )}
          </div>

          {/* Signature Card */}
          <div className="card p-5 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)" }}>
            <div className="flex items-center justify-between border-b pb-3 mb-4" style={{ borderColor: "var(--color-border)" }}>
              <h3 className="font-bold text-base flex items-center gap-2" style={{ color: "var(--color-text)" }}>
                <span>✍️</span> Official Signature Specifications
              </h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600">
                {job.signature.minKB} - {job.signature.maxKB} KB
              </span>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between py-1 border-b" style={{ borderColor: "var(--color-border)" }}>
                <span style={{ color: "var(--color-muted)" }}>Dimensions:</span>
                <span className="font-semibold text-right">
                  {job.signature.widthCm ? `${job.signature.widthCm} cm × ${job.signature.heightCm} cm` : `${job.signature.widthPx} × ${job.signature.heightPx} px`}
                </span>
              </li>
              <li className="flex justify-between py-1 border-b" style={{ borderColor: "var(--color-border)" }}>
                <span style={{ color: "var(--color-muted)" }}>File Size Limit:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {job.signature.minKB} KB to {job.signature.maxKB} KB
                </span>
              </li>
              <li className="flex justify-between py-1 border-b" style={{ borderColor: "var(--color-border)" }}>
                <span style={{ color: "var(--color-muted)" }}>Ink Color:</span>
                <span className="font-semibold text-right">{job.signature.inkColor || "Black or dark blue"}</span>
              </li>
              <li className="flex justify-between py-1 border-b" style={{ borderColor: "var(--color-border)" }}>
                <span style={{ color: "var(--color-muted)" }}>Allowed Format:</span>
                <span className="font-semibold">{job.signature.format}</span>
              </li>
              <li className="flex justify-between py-1">
                <span style={{ color: "var(--color-muted)" }}>Style:</span>
                <span className="font-semibold">Running Handwriting (No Capital Letters)</span>
              </li>
            </ul>
            {job.signature.notes && (
              <p className="mt-3 p-3 rounded-lg bg-amber-500/5 text-xs text-amber-700 dark:text-amber-300 border border-amber-500/15 leading-relaxed">
                📌 <strong>Official Note:</strong> {job.signature.notes}
              </p>
            )}
          </div>
        </div>

        {/* ── ADDITIONAL DOCUMENTS IF REQUIRED ────────────────────────────── */}
        {job.additionalDocs && job.additionalDocs.length > 0 && (
          <div className="card p-5 mb-10 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: "var(--color-text)" }}>
              <span>📄</span> Other Required Upload Documents for {job.shortTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {job.additionalDocs.map((doc, idx) => (
                <div key={idx} className="p-3 rounded-lg border bg-background text-xs flex justify-between items-center" style={{ borderColor: "var(--color-border)" }}>
                  <span className="font-medium text-foreground">{doc.name}</span>
                  <span className="px-2 py-0.5 rounded font-bold bg-muted text-muted-foreground">
                    Max {doc.maxKB} KB ({doc.format})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── REJECTION RULES CHECKLIST ──────────────────────────────────── */}
        <section className="mb-10 card p-6 rounded-2xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
          <h2 className="text-base font-bold mb-4 flex items-center gap-2" style={{ color: "var(--color-text)" }}>
            <span>⚠️</span> Reasons for Form Rejection in {job.shortTitle}
          </h2>
          <ul className="space-y-2.5 text-sm" style={{ color: "var(--color-muted)" }}>
            {job.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <i className="fa-solid fa-triangle-exclamation text-amber-500 mt-1 shrink-0" aria-hidden="true" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── OFFICIAL NOTIFICATION & APPLY LINKS ─────────────────────────── */}
        <section className="mb-10 flex flex-wrap gap-4 items-center justify-between p-5 rounded-2xl border bg-muted/30">
          <div>
            <h3 className="font-bold text-sm text-foreground">Official Recruitment Board Information</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Source verified from {job.board} notification bulletin.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href={job.officialNotificationUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="btn btn-secondary text-xs font-semibold py-2 px-4 rounded-lg border"
            >
              <i className="fa-solid fa-file-pdf mr-1.5" aria-hidden="true" />
              Official Notification
            </a>
            <a
              href={job.applyOnlineUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="btn btn-primary text-xs font-semibold py-2 px-4 rounded-lg"
            >
              <i className="fa-solid fa-arrow-up-right-from-square mr-1.5" aria-hidden="true" />
              Apply Online Portal
            </a>
          </div>
        </section>

        {/* ── RELATED GOVT RECRUITMENTS ──────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="t-h3 mb-4">Other Active Mega Recruitment Drives (&gt;= 400 Posts)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {otherJobs.map((oj) => (
              <Link
                key={oj.slug}
                href={`/jobs/${oj.slug}`}
                className="card p-4 rounded-xl border flex flex-col justify-between hover:border-primary transition-all text-decoration-none"
                style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)" }}
              >
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      {oj.vacancies.toLocaleString()} Posts
                    </span>
                    <span className="text-[11px] text-muted-foreground">{oj.board}</span>
                  </div>
                  <h3 className="font-bold text-sm mb-1 text-foreground">{oj.shortTitle}</h3>
                </div>
                <span className="text-xs font-semibold text-primary mt-2 flex items-center gap-1">
                  View Photo &amp; Signature Specs →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t py-8 px-4 sm:px-6" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="text-base font-bold" style={{ color: "var(--color-text)" }}>SarkariPixels</Link>
          <p className="t-caption">© {new Date().getFullYear()} SarkariPixels · 100% Client-Side Free Exam Tools</p>
          <div className="flex gap-4">
            <Link href="/jobs" className="t-caption" style={{ color: "var(--color-muted)" }}>Govt Jobs</Link>
            <Link href="/page/privacy" className="t-caption" style={{ color: "var(--color-muted)" }}>Privacy</Link>
            <Link href="/page/about" className="t-caption" style={{ color: "var(--color-muted)" }}>About</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
