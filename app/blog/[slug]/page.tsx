import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchSarkariBloggerPosts, getSarkariArticleBySlug } from "@/lib/blogger";
import { SITE_URL } from "@/lib/constants";
import "../blog-article.css";

export const dynamicParams = true; // Allow new posts to be rendered dynamically
export const revalidate = 300; // 5 minutes ISR cache

export async function generateStaticParams() {
  const articles = await fetchSarkariBloggerPosts();
  return articles.map((art) => ({ slug: art.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getSarkariArticleBySlug(params.slug);

  if (!article) return {};

  const canonicalUrl = `${SITE_URL}/blog/${article.slug}`;
  const ogImageUrl = article.thumbnail.startsWith("http")
    ? article.thumbnail
    : `${SITE_URL}${article.thumbnail}`;

  return {
    title: `${article.title} | SarkariPixels`,
    description: article.desc,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: { "en-IN": canonicalUrl },
    },
    openGraph: {
      title: `${article.title} | SarkariPixels`,
      description: article.desc,
      url: canonicalUrl,
      type: "article",
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
  };
}

export default async function SarkariBlogDetail({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getSarkariArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const ogImageUrl = article.thumbnail.startsWith("http")
    ? article.thumbnail
    : `${SITE_URL}${article.thumbnail}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.desc,
    datePublished: article.date,
    image: ogImageUrl,
    author: {
      "@type": "Organization",
      name: "SarkariPixels Citizen Desk",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "SarkariPixels",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.jpg`,
      },
    },
  };

  return (
    <>
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
            <a href="/blog" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">
              ← Back to Blog
            </a>
            <a href="/" className="text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors">
              Open Photo Resizer
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Schema Injection */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />

        {/* Back Button */}
        <a
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-sky-600 mb-8 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to All Articles
        </a>

        {/* Article Header */}
        <header className="mb-8 pb-8 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded-full text-xs font-bold uppercase tracking-wider">
              {article.tag}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {article.date}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              SarkariPixels Editorial Team
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            {article.title}
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed font-normal">
            {article.desc}
          </p>
        </header>

        {/* Featured Image */}
        {article.thumbnail && (
          <div className="relative w-full aspect-[16/9] mb-10 rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
            <img
              src={article.thumbnail}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* In-Site Tool Callout for Sarkari Exam Aspirants */}
        <div className="mb-10 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-white px-2.5 py-1 rounded-full border border-sky-200 inline-block mb-1">
              Online Photo &amp; Signature Tool
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Applying for Sarkari Forms online?
            </h3>
            <p className="text-sm text-slate-600">
              Compress your photo to exact 20KB-50KB and signature to 10KB-20KB instantly with 0% data upload.
            </p>
          </div>
          <a
            href="/"
            className="shrink-0 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl transition-colors shadow-sm inline-flex items-center gap-2"
          >
            Open Photo Resizer
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </a>
        </div>

        {/* Article Body */}
        <div
          className="blogger-premium-article prose prose-slate max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Explore more Sarkari Guides
          </a>
          <a
            href="/guides"
            className="text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            Need SSC / UPSC photo size guidelines? Check Guides →
          </a>
        </div>
      </div>

      <footer
        className="mt-16 border-t py-8 px-4 sm:px-6 bg-slate-50"
        style={{ borderColor: "var(--color-border, #e2e8f0)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="/" className="text-base font-bold text-slate-900">
            SarkariPixels
          </a>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} SarkariPixels · Citizen Information &amp; Photo Resizing Portal
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
