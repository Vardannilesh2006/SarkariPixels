import React from "react";
import { Metadata } from "next";
import { fetchSarkariBloggerPosts } from "@/lib/blogger";
import { SITE_URL } from "@/lib/constants";

export const revalidate = 300; // Revalidate every 5 minutes

export const metadata: Metadata = {
  title: "Sarkari Yojana & Official Updates Blog | SarkariPixels",
  description:
    "Official guides, registration steps, eligibility criteria, and document verification for PM Yojana, Sarkari Exam Alerts, Aadhaar/PAN updates, and government portals.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "Sarkari Yojana & Official Updates Blog | SarkariPixels",
    description:
      "Step-by-step application walkthroughs, portal photo guidelines, and latest government scheme alerts.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

export default async function SarkariBlogPage() {
  const articlesList = await fetchSarkariBloggerPosts();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/blog`,
    url: `${SITE_URL}/blog`,
    name: "Sarkari Yojana & Government Scheme Blog",
    description:
      "Comprehensive application procedures, official updates, and photo requirements for Indian government schemes.",
    publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-IN",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Header */}
      <header
        className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur-md"
        style={{ borderColor: "var(--color-border, #e2e8f0)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          <a href="/" className="flex items-center gap-2.5 shrink-0" aria-label="SarkariPixels — Home">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black shadow-sm"
              style={{ backgroundColor: "#0284c7" }}
            >
              S
            </div>
            <span className="text-base font-bold text-slate-900">SarkariPixels</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="/guides" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">
              Exam Guides
            </a>
            <a href="/" className="text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors">
              ← All Tools
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <li>
              <a href="/" className="hover:text-sky-600 transition-colors">
                Home
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-slate-900 font-semibold" aria-current="page">
              Blog &amp; Updates
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wider mb-3">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            Official Scheme &amp; Exam Updates
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Sarkari Yojana &amp; Portal Help Desk
          </h1>
          <p className="text-slate-600 max-w-2xl text-base sm:text-lg leading-relaxed">
            Verified step-by-step tutorials, eligibility requirements, and portal solutions for central &amp; state government services.
          </p>
        </div>

        {/* Article Grid */}
        {articlesList.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-md mx-auto shadow-sm">
            <svg className="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            <h3 className="font-bold text-slate-800 mb-1">New Articles Loading</h3>
            <p className="text-sm text-slate-500">
              Government scheme guides are currently syncing. Please check back in a few minutes.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articlesList.map((art, idx) => (
              <article
                key={art.slug || idx}
                className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-sky-500/50 transition-all duration-200"
              >
                {/* Thumbnail Banner */}
                <a
                  href={`/blog/${art.slug}`}
                  className="block relative w-full aspect-[16/9] overflow-hidden bg-slate-100"
                >
                  {art.thumbnail ? (
                    <img
                      src={art.thumbnail}
                      alt={art.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100 flex items-center justify-center">
                      <svg className="w-12 h-12 text-sky-600/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    </div>
                  )}
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-sm text-sky-900 font-bold text-[11px] rounded-lg shadow-sm border border-sky-100">
                    {art.tag}
                  </span>
                </a>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-slate-400 font-medium mb-2">{art.date}</p>
                    <h2 className="font-bold text-lg text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug mb-3">
                      <a href={`/blog/${art.slug}`}>{art.title}</a>
                    </h2>
                    <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed mb-4">
                      {art.desc}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={`/blog/${art.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors"
                    >
                      Read Full Article
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <footer
        className="mt-16 border-t py-8 px-4 sm:px-6 bg-slate-50"
        style={{ borderColor: "var(--color-border, #e2e8f0)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="/" className="text-base font-bold text-slate-900">
            SarkariPixels
          </a>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} SarkariPixels · Fast &amp; Private Citizen Portal Tools
          </p>
          <div className="flex gap-4">
            <a href="/guides" className="text-xs text-slate-500 hover:text-slate-800">
              Exam Guides
            </a>
            <a href="/blog" className="text-xs text-slate-500 hover:text-slate-800 font-bold">
              Blog
            </a>
            <a href="/" className="text-xs text-slate-500 hover:text-slate-800">
              All Tools
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
