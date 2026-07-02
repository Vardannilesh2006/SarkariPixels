import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sarkaripixels.vercel.app";

export const metadata: Metadata = {
  title: "Guides — SSC UPSC Exam Photo Tips | SarkariPixels",
  description:
    "How-to guides for exam photo preparation. Why photos get rejected, exact sizes for SSC UPSC BPSC RRB, step-by-step tutorials for compressing and resizing government exam photos.",
  alternates: {
    canonical: `${SITE_URL}/guides`,
    languages: { "en-IN": `${SITE_URL}/guides` },
  },
  openGraph: {
    title: "Exam Photo Guides — SSC UPSC BPSC RRB | SarkariPixels",
    description: "Step-by-step guides for government exam photo preparation.",
    url: `${SITE_URL}/guides`,
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
};

const GUIDES = [
  {
    slug: "ssc-cgl-photo-rejection",
    title: "SSC CGL Photo Reject Kyun Hoti Hai? 7 Common Reasons",
    desc: "Form fill karte time photo reject hoti hai? Yeh 7 common reasons check karo — aur each ka fix.",
    date: "June 2026",
    readTime: "4 min",
    category: "SSC",
  },
  {
    slug: "upsc-photo-requirements-2026",
    title: "UPSC Photo Requirements 2026 — Complete Guide",
    desc: "UPSC ka square photo format, name stamp requirement, exact KB limits — sab ek jagah.",
    date: "June 2026",
    readTime: "5 min",
    category: "UPSC",
  },
  {
    slug: "compress-photo-under-50kb",
    title: "Photo Ko 50KB Se Kam Kaise Karein — Step by Step",
    desc: "Mobile phone ki 3MB photo ko 20-50KB mein compress karna — without quality loss.",
    date: "June 2026",
    readTime: "3 min",
    category: "How-To",
  },
  {
    slug: "ibps-photo-size-guide",
    title: "IBPS Bank PO/Clerk Photo Size — 2026 Complete Guide",
    desc: "IBPS PO, Clerk, SO sab ke photo aur signature requirements ek jagah.",
    date: "June 2026",
    readTime: "4 min",
    category: "IBPS",
  },
  {
    slug: "pan-card-photo-dpi-300",
    title: "PAN Card Photo Ka DPI 300 Kaise Set Karein",
    desc: "NSDL/UTI PAN application mein DPI 300 mandatory hai. Yeh tool se 2 steps mein fix karo.",
    date: "June 2026",
    readTime: "2 min",
    category: "PAN Card",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
  ],
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/guides`,
  url: `${SITE_URL}/guides`,
  name: "Exam Photo Guides & How-To Articles",
  description: "Step-by-step guides for government exam photo preparation.",
  publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
};

export default function GuidesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      {/* Header — new design system */}
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
          <a href="/" className="nav-link text-sm font-medium">← All Tools</a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10" style={{ color: "var(--color-text)" }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5" style={{ fontSize: "0.8125rem", color: "var(--color-muted)" }}>
            <li><a href="/" style={{ color: "var(--color-muted)" }}>Home</a></li>
            <li aria-hidden="true">/</li>
            <li style={{ color: "var(--color-text)", fontWeight: 500 }} aria-current="page">Guides</li>
          </ol>
        </nav>

        <h1 className="t-h1 mb-2">Guides &amp; How-To Articles</h1>
        <p className="t-body mb-8" style={{ color: "var(--color-muted)" }}>
          Real answers to real exam photo problems — written for students who have dealt with portal rejection errors.
        </p>

        <div className="space-y-3">
          {GUIDES.map((guide) => (
            <a
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="card"
              style={{ display: "block", padding: "1.5rem", textDecoration: "none" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className="text-xs font-bold rounded-full px-2 py-0.5"
                      style={{ backgroundColor: "#eff6ff", color: "var(--color-accent)" }}
                    >
                      {guide.category}
                    </span>
                    <span className="t-caption">{guide.readTime} read</span>
                    <span className="t-caption">· {guide.date}</span>
                  </div>
                  <h2 className="font-bold mb-2" style={{ color: "var(--color-text)", fontSize: "1rem", lineHeight: "1.4" }}>
                    {guide.title}
                  </h2>
                  <p className="t-caption">{guide.desc}</p>
                </div>
                <i
                  className="fa-solid fa-arrow-right mt-1 flex-shrink-0"
                  style={{ color: "var(--color-border)", fontSize: "12px" }}
                  aria-hidden="true"
                />
              </div>
            </a>
          ))}
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
