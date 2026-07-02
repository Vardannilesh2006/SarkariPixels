import type { Metadata } from "next";
import { notFound } from "next/navigation";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sarkaripixels.vercel.app";

interface Props {
  params: Promise<{ id: string }>;
}

const PAGES: Record<string, { title: string; desc: string }> = {
  privacy: {
    title: "Privacy Policy — SarkariPixels",
    desc: "SarkariPixels operates 100% in your browser. No images are ever uploaded to any server. Read our complete privacy policy including DPDP Act 2023 compliance.",
  },
  about: {
    title: "About SarkariPixels — Free Exam Photo Resizer",
    desc: "About SarkariPixels — the free browser-based photo resizer built for Indian government exam applicants. Zero upload, 88 tools, covers SSC, UPSC, BPSC, RRB, IBPS.",
  },
  sitemap: {
    title: "HTML Sitemap — SarkariPixels",
    desc: "Complete index of all SarkariPixels tools and pages.",
  },
};

export async function generateStaticParams() {
  return Object.keys(PAGES).map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const page = PAGES[id];
  if (!page) return { title: "Page Not Found" };

  return {
    title: page.title,
    description: page.desc,
    alternates: {
      canonical: `${SITE_URL}/page/${id}`,
      languages: { "en-IN": `${SITE_URL}/page/${id}` },
    },
    openGraph: {
      title: page.title,
      description: page.desc,
      url: `${SITE_URL}/page/${id}`,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
  };
}

// Shared header component (design system compliant)
function PageHeader({ backHref, backLabel }: { backHref: string; backLabel: string }) {
  return (
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
        <a href={backHref} className="nav-link text-sm font-medium">{backLabel}</a>
      </div>
    </header>
  );
}

function PageFooter() {
  return (
    <footer className="mt-16 border-t py-8 px-4 sm:px-6" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="/" className="text-base font-bold" style={{ color: "var(--color-text)" }}>SarkariPixels</a>
        <p className="t-caption">© {new Date().getFullYear()} SarkariPixels · 100% Client-Side · Privacy First</p>
        <div className="flex gap-4">
          {[{ href: "/page/privacy", label: "Privacy" }, { href: "/page/about", label: "About" }, { href: "/", label: "All Tools" }].map((link) => (
            <a key={link.href} href={link.href} className="t-caption" style={{ color: "var(--color-muted)" }}>{link.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default async function LegalPage({ params }: Props) {
  const { id } = await params;
  if (!PAGES[id]) notFound();

  const canonicalUrl = `${SITE_URL}/page/${id}`;
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": canonicalUrl,
    url: canonicalUrl,
    name: PAGES[id].title,
    description: PAGES[id].desc,
    publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-IN",
    dateModified: "2026-06-01",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <PageHeader backHref="/" backLabel="← Home" />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12" style={{ color: "var(--color-text)" }}>
        {id === "privacy" && <PrivacyContent />}
        {id === "about" && <AboutContent />}
        {id === "sitemap" && <SitemapContent />}
      </main>
      <PageFooter />
    </>
  );
}

function PrivacyContent() {
  return (
    <article>
      <h1 className="t-h1 mb-2">Privacy Policy</h1>
      <p className="t-caption mb-8">Last updated: June 2026 · Version 2.0 (DPDP Act 2023 compliant)</p>

      <h2 className="t-h3 mb-3 mt-8">Zero Data Collection — How SarkariPixels Works</h2>
      <p className="t-body mb-4" style={{ color: "var(--color-muted)" }}>
        SarkariPixels is a 100% client-side browser application. When you upload or process any image,
        that image is processed <strong style={{ color: "var(--color-text)" }}>entirely on your device</strong> using the Canvas API.
        No image data is ever transmitted to any server — not ours, not anyone else&apos;s.
      </p>

      <h2 className="t-h3 mb-3 mt-8">What Data We Do Collect</h2>
      <p className="t-body mb-3" style={{ color: "var(--color-muted)" }}>We collect minimal, non-personal analytics data through the following third-party services:</p>

      <h3 className="font-semibold mb-2 mt-4" style={{ color: "var(--color-text)" }}>Analytics</h3>
      <ul className="space-y-2 mb-4" style={{ color: "var(--color-muted)", fontSize: "0.9rem" }}>
        <li>• <strong style={{ color: "var(--color-text)" }}>Google Analytics 4 (G-KNQ135CJNM)</strong> — Page views, tool usage events, session data. IP anonymized.</li>
        <li>• <strong style={{ color: "var(--color-text)" }}>Google Tag Manager (GTM-KMK8392M)</strong> — Tag management for analytics scripts.</li>
      </ul>

      <h3 className="font-semibold mb-2 mt-4" style={{ color: "var(--color-text)" }}>Advertising</h3>
      <ul className="space-y-2 mb-4" style={{ color: "var(--color-muted)", fontSize: "0.9rem" }}>
        <li>• <strong style={{ color: "var(--color-text)" }}>Monetag</strong> — Ad network. May set cookies for ad targeting.</li>
        <li>• <strong style={{ color: "var(--color-text)" }}>EffectiveCPM Network</strong> — Display and popunder ads. May set cookies.</li>
      </ul>

      <h3 className="font-semibold mb-2 mt-4" style={{ color: "var(--color-text)" }}>AI Assistant</h3>
      <ul className="space-y-2 mb-4" style={{ color: "var(--color-muted)", fontSize: "0.9rem" }}>
        <li>• <strong style={{ color: "var(--color-text)" }}>OpenRouter / OpenAI</strong> — When you use the AI assistant, your text questions are sent to OpenRouter&apos;s API. No image data is sent.</li>
      </ul>

      <h2 className="t-h3 mb-3 mt-8">Your Rights Under DPDP Act 2023</h2>
      <p className="t-body mb-3" style={{ color: "var(--color-muted)" }}>Under India&apos;s Digital Personal Data Protection Act 2023, you have the right to:</p>
      <ul className="space-y-1 mb-4" style={{ color: "var(--color-muted)", fontSize: "0.9rem" }}>
        <li>• Know what data we have about you (analytics only — no images)</li>
        <li>• Request correction of inaccurate data</li>
        <li>• Request erasure of your data</li>
        <li>• Nominate someone to exercise these rights on your behalf</li>
      </ul>
      <p className="t-body" style={{ color: "var(--color-muted)" }}>
        To exercise these rights, contact: <a href="mailto:privacy@sarkaripixels.com" style={{ color: "var(--color-accent)" }}>privacy@sarkaripixels.com</a>
      </p>

      <h2 className="t-h3 mb-3 mt-8">Cookies</h2>
      <p className="t-body" style={{ color: "var(--color-muted)" }}>
        We use localStorage (not cookies) for theme preference (dark/light mode). Third-party ad networks (Monetag, EffectiveCPM) may set their own cookies.
      </p>

      <h2 className="t-h3 mb-3 mt-8">Children</h2>
      <p className="t-body" style={{ color: "var(--color-muted)" }}>SarkariPixels does not knowingly collect data from children under 18.</p>

      <h2 className="t-h3 mb-3 mt-8">Changes to This Policy</h2>
      <p className="t-body" style={{ color: "var(--color-muted)" }}>
        This policy will be updated when exam specifications, ad networks, or functionality changes.
        The version date at the top will be updated. Continued use constitutes acceptance.
      </p>
    </article>
  );
}

function AboutContent() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SarkariPixels",
    url: "https://sarkaripixels.vercel.app",
    description: "SarkariPixels is a free browser-based photo resizer that helps Indian government exam applicants compress and resize photos to exact portal specifications.",
    email: "info@sarkaripixels.com",
    foundingDate: "2024",
    knowsAbout: ["SSC exam photo requirements", "UPSC photo size", "Government exam photo compression", "Image resizing"],
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      <h1 className="t-h1 mb-6">About SarkariPixels</h1>

      {/* Entity definition — critical for LLM/GEO */}
      <div className="card p-5 mb-8" style={{ backgroundColor: "var(--color-surface)", borderLeft: "4px solid var(--color-accent)" }}>
        <p className="t-body font-medium" style={{ color: "var(--color-text)" }}>
          <strong>SarkariPixels</strong> is a free, browser-based photo resizer that helps Indian government exam applicants
          compress and resize photos and signatures to the exact pixel dimensions and KB file size limits required
          by official exam portals — for SSC, UPSC, BPSC, RRB, IBPS, NTA, and state PSC exams.
        </p>
      </div>

      <p className="t-body mb-4" style={{ color: "var(--color-muted)" }}>
        SarkariPixels was built because photo rejection on government exam portals is genuinely frustrating.
        You&apos;ve filled the form, you have the photo, but the portal says &quot;file too large&quot; or &quot;invalid dimensions&quot;
        and you don&apos;t know what to do next.
      </p>

      <p className="t-body mb-8" style={{ color: "var(--color-muted)" }}>
        This site exists to solve exactly that — with 88 specific tools covering every major Indian exam&apos;s
        photo and signature requirements. All processing happens in your browser. Your photo never goes anywhere.
      </p>

      <h2 className="t-h3 mb-4">Core Principles</h2>
      <ul className="space-y-3 mb-8">
        {[
          { icon: "fa-shield-halved", label: "Zero Upload", desc: "Your files never leave your device. Ever." },
          { icon: "fa-infinity", label: "Free Forever", desc: "No paywalls, no login required for core tools." },
          { icon: "fa-bullseye", label: "Accurate Specs", desc: "Exam specifications verified against official notifications." },
          { icon: "fa-mobile-screen", label: "Mobile-First", desc: "Works on slow connections and budget phones." },
        ].map(({ icon, label, desc }) => (
          <li key={label} className="flex items-start gap-3">
            <i className={`fa-solid ${icon} mt-1 shrink-0`} style={{ color: "var(--color-accent)", fontSize: "14px" }} aria-hidden="true" />
            <span className="t-body" style={{ color: "var(--color-muted)" }}>
              <strong style={{ color: "var(--color-text)" }}>{label}</strong> — {desc}
            </span>
          </li>
        ))}
      </ul>

      <h2 className="t-h3 mb-4">Who Built This</h2>
      <p className="t-body mb-8" style={{ color: "var(--color-muted)" }}>
        SarkariPixels is an independent project built by a developer who experienced first-hand the frustration of
        exam portal photo rejections. The goal is simple: make photo preparation the least stressful part of
        applying for a government job. All exam specifications are manually verified against official notifications
        before being added to the site.
      </p>

      <h2 className="t-h3 mb-4">Exams Covered</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
        {["SSC (CGL, CHSL, MTS)", "UPSC (CSE, CDS, NDA)", "BPSC", "BSSC", "RRB (NTPC, Group D)", "IBPS (PO, Clerk, SO)", "NTA (NEET, JEE)", "SBI PO/Clerk", "PAN Card", "State PSCs"].map((exam) => (
          <span
            key={exam}
            className="text-xs font-medium rounded-lg px-3 py-2 text-center"
            style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-muted)" }}
          >
            {exam}
          </span>
        ))}
      </div>

      <h2 className="t-h3 mb-4">Terms of Use</h2>
      <p className="t-body mb-4" style={{ color: "var(--color-muted)" }}>
        SarkariPixels is provided &quot;as-is&quot; for educational and utility use. While we verify exam specifications
        carefully, official exam portals may update their requirements without notice. Always cross-check
        with the official notification before submitting.
      </p>
      <p className="t-body mb-8" style={{ color: "var(--color-muted)" }}>
        You may use the tools for personal, educational, and professional use. Automated scraping,
        reselling processed results, or using our infrastructure to build competing services is not permitted.
      </p>

      <h2 className="t-h3 mb-4">Contact</h2>
      <p className="t-body" style={{ color: "var(--color-muted)" }}>
        For queries, corrections to exam specifications, or feedback:{" "}
        <a href="mailto:info@sarkaripixels.com" style={{ color: "var(--color-accent)" }}>info@sarkaripixels.com</a>
      </p>
    </article>
  );
}

function SitemapContent() {
  return (
    <div style={{ color: "var(--color-text)" }}>
      <h1 className="t-h1 mb-8">HTML Sitemap</h1>

      <section className="mb-8">
        <h2 className="t-h3 mb-3">Main Pages</h2>
        <ul className="space-y-1 text-sm">
          {[
            { href: "/", label: "Home — All Tools" },
            { href: "/exam-specs", label: "Exam Specifications Hub" },
            { href: "/guides", label: "Guides & Articles" },
            { href: "/page/about", label: "About Us & Terms" },
            { href: "/page/privacy", label: "Privacy Policy" },
          ].map((link) => (
            <li key={link.href}>
              <a href={link.href} style={{ color: "var(--color-accent)" }}>{link.label}</a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="t-h3 mb-3">Exam Specifications</h2>
        <ul className="space-y-1 text-sm grid grid-cols-2 gap-1">
          {["ssc", "upsc", "bpsc", "bssc", "rrb", "nta", "ibps", "pan"].map((key) => (
            <li key={key}>
              <a href={`/exam-specs/${key}`} style={{ color: "var(--color-accent)" }} className="capitalize">
                {key.toUpperCase()} Specifications
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="t-h3 mb-3">Guides</h2>
        <ul className="space-y-1 text-sm">
          {[
            { href: "/guides/ssc-cgl-photo-rejection", label: "SSC CGL Photo Reject Kyun Hoti Hai?" },
            { href: "/guides/upsc-photo-requirements-2026", label: "UPSC Photo Requirements 2026" },
            { href: "/guides/compress-photo-under-50kb", label: "Photo Ko 50KB Se Kam Kaise Karein" },
            { href: "/guides/ibps-photo-size-guide", label: "IBPS Bank PO/Clerk Photo Size Guide" },
            { href: "/guides/pan-card-photo-dpi-300", label: "PAN Card Photo DPI 300 Guide" },
          ].map((link) => (
            <li key={link.href}>
              <a href={link.href} style={{ color: "var(--color-accent)" }}>{link.label}</a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="t-h3 mb-3">All 88 Tools</h2>
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>
          Browse all tools at <a href="/" style={{ color: "var(--color-accent)" }}>the home page</a> with category filters.
        </p>
      </section>
    </div>
  );
}
