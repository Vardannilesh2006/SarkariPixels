// app/jobs/page.tsx
// Central Hub for All Active Mega Government Recruitment Drives (>= 400 Vacancies)

import type { Metadata } from "next";
import { getAllJobs } from "@/lib/jobs/store";
import { SITE_URL } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Govt Job Photo & Signature Resizer Hub (Latest Notifications) | SarkariPixels",
  description: "Free online photo and signature resizer for all latest government recruitment drives (SSC, RRB, UPSC, State Police, Banking). Exact portal pixel dimensions and KB limits.",
  alternates: {
    canonical: `${SITE_URL}/jobs`,
    languages: { "en-IN": `${SITE_URL}/jobs` },
  },
  openGraph: {
    title: "All Govt Exam Photo & Signature Resizers — Latest Job Alerts",
    description: "Browse photo & signature resizing tools for active government jobs with 400+ vacancies.",
    url: `${SITE_URL}/jobs`,
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
};

export default function JobsHubPage() {
  const jobs = getAllJobs();
  const totalOpenings = jobs.reduce((acc, j) => acc + j.vacancies, 0);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Govt Jobs", item: `${SITE_URL}/jobs` },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Government Exam Photo & Signature Specifications Hub",
    description: "Verified photo and signature upload requirements for active central and state recruitment forms.",
    url: `${SITE_URL}/jobs`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b" style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="SarkariPixels Home">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black" style={{ backgroundColor: "var(--color-accent)" }}>
              S
            </div>
            <span className="text-base font-bold" style={{ color: "var(--color-text)" }}>SarkariPixels</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="nav-link text-sm font-medium">← All Tools</Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10" style={{ color: "var(--color-text)" }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5" style={{ fontSize: "0.8125rem", color: "var(--color-muted)" }}>
            <li><Link href="/" style={{ color: "var(--color-muted)" }}>Home</Link></li>
            <li aria-hidden="true">/</li>
            <li style={{ color: "var(--color-text)", fontWeight: 500 }} aria-current="page">Govt Jobs</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-3 border border-emerald-500/20">
            <span>🔥</span> Over {totalOpenings.toLocaleString()} Active Vacancies Tracked
          </div>
          <h1 className="t-h1 mb-3">Govt Exam Photo &amp; Signature Resizers</h1>
          <p className="t-body" style={{ color: "var(--color-muted)" }}>
            Latest notifications with 400+ vacancies. Direct 1-click photo and signature formatting tools tailored to each board&apos;s exact portal guidelines.
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {jobs.map((job) => (
            <div
              key={job.slug}
              className="card p-5 rounded-2xl border flex flex-col justify-between hover:shadow-md transition-all"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                    {job.vacancies.toLocaleString()} Posts
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">{job.board}</span>
                </div>

                <h2 className="text-base font-bold mb-2 text-foreground leading-snug">
                  {job.title}
                </h2>

                <div className="grid grid-cols-2 gap-2 my-3 p-3 rounded-xl bg-background border text-xs">
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase font-bold">Photo Specs</span>
                    <span className="font-semibold text-foreground">
                      {job.photo.minKB}-{job.photo.maxKB} KB ({job.photo.widthCm ? `${job.photo.widthCm}x${job.photo.heightCm}cm` : `${job.photo.widthPx}x${job.photo.heightPx}px`})
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase font-bold">Signature Specs</span>
                    <span className="font-semibold text-foreground">
                      {job.signature.minKB}-{job.signature.maxKB} KB ({job.signature.widthCm ? `${job.signature.widthCm}x${job.signature.heightCm}cm` : `${job.signature.widthPx}x${job.signature.heightPx}px`})
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t flex justify-between items-center" style={{ borderColor: "var(--color-border)" }}>
                <span className="text-xs text-muted-foreground">
                  {job.lastDateToApply ? `Last Date: ${job.lastDateToApply}` : "Active Drive"}
                </span>
                <Link
                  href={`/jobs/${job.slug}`}
                  className="btn btn-sm btn-primary py-2 px-3.5 rounded-lg text-xs font-bold flex items-center gap-1.5"
                >
                  <span>Open Resizer Tool</span>
                  <i className="fa-solid fa-arrow-right" style={{ fontSize: "10px" }} aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>
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
