// app/guides/[slug]/page.tsx
// Individual guide pages — dynamically loads from 20 guides library.
// Each has unique title, meta, H1, full content, FAQPage + BreadcrumbList + Article schema.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import { GUIDES, getGuideByKey, getAllGuideKeys } from "@/lib/guides-content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sarkaripixels.online";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllGuideKeys().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideByKey(slug);
  if (!guide) return { title: "Guide Not Found" };
  const url = `${SITE_URL}/guides/${slug}`;
  return {
    title: guide.metaTitle,
    description: guide.metaDesc,
    alternates: { canonical: url, languages: { "en-IN": url } },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDesc,
      url,
      type: "article",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideByKey(slug);
  if (!guide) notFound();

  const canonicalUrl = `${SITE_URL}/guides/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": canonicalUrl,
    headline: guide.title,
    description: guide.metaDesc,
    datePublished: guide.dateISO,
    dateModified: guide.dateISO,
    url: canonicalUrl,
    inLanguage: "en-IN",
    publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "SarkariPixels" },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
      { "@type": "ListItem", position: 3, name: guide.title, item: canonicalUrl },
    ],
  };

  const faqSchema = guide.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  } : null;

  const ContentComponent = guide.content;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      {/* Header */}
      <header className="sticky top-0 z-40 border-b" style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          <a href="/" className="flex items-center gap-2.5 shrink-0" aria-label="SarkariPixels — go to homepage">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black" style={{ backgroundColor: "var(--color-accent)" }} aria-hidden="true">S</div>
            <span className="text-base font-bold" style={{ color: "var(--color-text)" }}>SarkariPixels</span>
          </a>
          <a href="/guides" className="nav-link text-sm font-medium">← All Guides</a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10" style={{ color: "var(--color-text)" }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 flex-wrap" style={{ fontSize: "0.8125rem", color: "var(--color-muted)" }}>
            <li><a href="/" style={{ color: "var(--color-muted)" }}>Home</a></li>
            <li aria-hidden="true">/</li>
            <li><a href="/guides" style={{ color: "var(--color-muted)" }}>Guides</a></li>
            <li aria-hidden="true">/</li>
            <li style={{ color: "var(--color-text)", fontWeight: 500 }} aria-current="page">{guide.category}</li>
          </ol>
        </nav>

        {/* Article meta */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ backgroundColor: "#eff6ff", color: "var(--color-accent)" }}>{guide.category}</span>
          <span className="t-caption">{guide.readTime} read</span>
          <span className="t-caption">· {guide.date}</span>
        </div>

        <h1 className="t-h1 mb-8">{guide.title}</h1>

        <ContentComponent />

        {/* CTA */}
        <div className="card p-6 mt-10" style={{ backgroundColor: "var(--color-surface)", textAlign: "center" }}>
          <p className="font-semibold mb-3" style={{ color: "var(--color-text)" }}>Ready to resize your photo?</p>
          <a href="/" className="btn btn-primary" style={{ fontSize: "0.9375rem", padding: "12px 28px" }}>
            <i className="fa-solid fa-wand-magic-sparkles mr-2" aria-hidden="true" />
            Open SarkariPixels Tools →
          </a>
        </div>
      </main>

      <footer className="mt-16 border-t py-8 px-4 sm:px-6" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="/" className="text-base font-bold" style={{ color: "var(--color-text)" }}>SarkariPixels</a>
          <p className="t-caption">© {new Date().getFullYear()} SarkariPixels · 100% Client-Side</p>
          <div className="flex gap-4">
            {[{ href: "/page/privacy", label: "Privacy" }, { href: "/page/about", label: "About" }, { href: "/", label: "All Tools" }].map((link) => (
              <a key={link.href} href={link.href} className="t-caption" style={{ color: "var(--color-muted)" }}>{link.label}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
