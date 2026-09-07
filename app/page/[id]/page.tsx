import type { Metadata } from "next";
import { TOOLS, CATEGORY_LABELS } from "@/lib/tools-data";
import { GUIDES } from "@/lib/guides-content";
import { notFound } from "next/navigation";

import { SITE_URL, INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/constants";
import { TOTAL_TOOLS_COUNT } from "@/lib/toolRegistry";
import InstagramLink, { InstagramBadgeIcon } from "@/components/InstagramLink";

interface Props {
  params: Promise<{ id: string }>;
}

const PAGES: Record<string, { title: string; desc: string }> = {
  privacy: {
    title: "Privacy Policy — SarkariPixels",
    desc: "SarkariPixels operates 100% in your browser. No images are ever uploaded to any server. Read our complete privacy policy.",
  },
  cookies: {
    title: "Cookie Policy — SarkariPixels",
    desc: "SarkariPixels cookie policy: what we store in your browser, why, and how to control it. We use localStorage for preferences and Google Analytics for anonymous traffic measurement.",
  },
  about: {
    title: "About SarkariPixels — Free Exam Photo Resizer",
    desc: `About SarkariPixels — the free browser-based photo resizer built for Indian government exam applicants. Zero upload, ${TOTAL_TOOLS_COUNT} tools, covers SSC, UPSC, BPSC, RRB, IBPS.`,
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
    title: { absolute: page.title },
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
        <div className="flex items-center gap-3">
          <InstagramLink variant="icon" />
          <a href={backHref} className="nav-link text-sm font-medium">{backLabel}</a>
        </div>
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
        <div className="flex items-center gap-4">
          <InstagramLink variant="footer-item" showHandle={false} />
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
        {id === "cookies" && <CookiesContent />}
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
      <p className="t-caption mb-8">Last updated: June 2026 · Version 2.0</p>

      <h2 className="t-h3 mb-3 mt-8">Your Images Are Not Uploaded</h2>
      <p className="t-body mb-4" style={{ color: "var(--color-muted)" }}>
        SarkariPixels is an in-browser utility. When you resize, compress, or edit any image,
        that file is processed <strong style={{ color: "var(--color-text)" }}>entirely on your local device</strong> using the browser HTML5 Canvas API.
        Your photo and signature files are never transmitted to, stored on, or inspected by any server.
      </p>

      <h2 className="t-h3 mb-3 mt-8">Website Analytics &amp; Ads</h2>
      <p className="t-body mb-4" style={{ color: "var(--color-muted)" }}>
        While your images remain strictly on your device, our website uses standard web services for anonymous performance measurement, tag management, and advertising to keep our tools free:
      </p>

      <div className="overflow-x-auto my-4 card border rounded-xl" style={{ borderColor: "var(--color-border)" }}>
        <table className="w-full text-left text-xs border-collapse" style={{ minWidth: "600px" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
              <th className="p-3 font-semibold" style={{ color: "var(--color-text)" }}>Service / Vendor</th>
              <th className="p-3 font-semibold" style={{ color: "var(--color-text)" }}>Purpose</th>
              <th className="p-3 font-semibold" style={{ color: "var(--color-text)" }}>Data Processed</th>
              <th className="p-3 font-semibold" style={{ color: "var(--color-text)" }}>Retention</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td className="p-3 font-medium" style={{ color: "var(--color-text)" }}>Google Analytics 4 (G-5EBGBRC049) &amp; GTM</td>
              <td className="p-3" style={{ color: "var(--color-muted)" }}>Aggregated traffic analytics &amp; tool usage trends</td>
              <td className="p-3" style={{ color: "var(--color-muted)" }}>Anonymized IP, browser/device type, pages visited, button events</td>
              <td className="p-3" style={{ color: "var(--color-muted)" }}>14 months (Google Analytics default)</td>
            </tr>
            <tr>
              <td className="p-3 font-medium" style={{ color: "var(--color-text)" }}>OpenRouter / AI Assistant</td>
              <td className="p-3" style={{ color: "var(--color-muted)" }}>Optional user-initiated chat questions regarding exam guidelines</td>
              <td className="p-3" style={{ color: "var(--color-muted)" }}>User-typed text query only (no images or documents transmitted)</td>
              <td className="p-3" style={{ color: "var(--color-muted)" }}>Stateless API session; per OpenRouter terms</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="t-h3 mb-3 mt-8">Your Rights Under DPDP Act 2023</h2>
      <p className="t-body mb-3" style={{ color: "var(--color-muted)" }}>Under India&apos;s Digital Personal Data Protection Act 2023, you have the right to:</p>
      <ul className="space-y-1 mb-4" style={{ color: "var(--color-muted)", fontSize: "0.9rem" }}>
        <li>• Know what data we have about you (analytics only — no images)</li>
        <li>• Request correction of inaccurate data</li>
        <li>• Request erasure of your data</li>
        <li>• Nominate someone to exercise these rights on your behalf</li>
      </ul>
      <p className="t-body" style={{ color: "var(--color-muted)" }}>
        To exercise these rights, contact: <a href="mailto:privacy@sarkaripixels.online" style={{ color: "var(--color-accent)" }}>privacy@sarkaripixels.online</a>
      </p>

      <h2 className="t-h3 mb-3 mt-8">Cookies</h2>
      <p className="t-body" style={{ color: "var(--color-muted)" }}>
        We use localStorage (not cookies) for theme preference (dark/light mode). SarkariPixels is 100% ad-free — we do not use third-party advertising networks or ad cookies.
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

function CookiesContent() {
  return (
    <article>
      <h1 className="t-h1 mb-2">Cookie Policy</h1>
      <p className="t-caption mb-8">Last updated: September 2026 · Version 1.0</p>

      <div className="card p-5 mb-8" style={{ backgroundColor: "var(--color-surface)", borderLeft: "4px solid var(--color-accent)" }}>
        <p className="t-body" style={{ color: "var(--color-muted)" }}>
          <strong style={{ color: "var(--color-text)" }}>Short version:</strong> SarkariPixels never uploads your photos or personal files. We use browser
          localStorage for your theme preference and Google Analytics for anonymous traffic measurement. SarkariPixels is 100% ad-free and uses zero third-party advertising cookies.
        </p>
      </div>

      <h2 className="t-h3 mb-3 mt-8">What We Store</h2>
      <p className="t-body mb-4" style={{ color: "var(--color-muted)" }}>
        Below is a complete table of every item stored in your browser when using SarkariPixels:
      </p>
      <div className="overflow-x-auto my-4 card border rounded-xl mb-8" style={{ borderColor: "var(--color-border)" }}>
        <table className="w-full text-left text-xs border-collapse" style={{ minWidth: "640px" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
              <th className="p-3 font-semibold" style={{ color: "var(--color-text)" }}>Name</th>
              <th className="p-3 font-semibold" style={{ color: "var(--color-text)" }}>Type</th>
              <th className="p-3 font-semibold" style={{ color: "var(--color-text)" }}>Set by</th>
              <th className="p-3 font-semibold" style={{ color: "var(--color-text)" }}>Purpose</th>
              <th className="p-3 font-semibold" style={{ color: "var(--color-text)" }}>Expiry</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "sp-theme", type: "localStorage", by: "SarkariPixels", purpose: "Stores your dark/light mode preference so the site loads in your chosen theme.", expiry: "Permanent (until manually cleared)" },
              { name: "sp-cookie-consent", type: "localStorage", by: "SarkariPixels", purpose: "Records your cookie consent decision (granted/denied) to avoid asking again.", expiry: "Permanent (until manually cleared)" },
              { name: "_ga, _ga_*", type: "Cookie", by: "Google Analytics", purpose: "Anonymous visitor measurement — pages viewed, session duration, traffic source. IP is anonymized.", expiry: "14 months (GA4 default)" },
              { name: "FPAU, _gcl_au", type: "Cookie", by: "Google Tag Manager", purpose: "Conversion measurement and attribution for analytics.", expiry: "90 days" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td className="p-3 font-mono font-medium" style={{ color: "var(--color-text)", fontSize: "11px" }}>{row.name}</td>
                <td className="p-3" style={{ color: "var(--color-muted)" }}>{row.type}</td>
                <td className="p-3" style={{ color: "var(--color-muted)" }}>{row.by}</td>
                <td className="p-3" style={{ color: "var(--color-muted)" }}>{row.purpose}</td>
                <td className="p-3" style={{ color: "var(--color-muted)" }}>{row.expiry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="t-h3 mb-3 mt-8">Your Image Files Are NOT Stored</h2>
      <p className="t-body mb-4" style={{ color: "var(--color-muted)" }}>
        No photo, signature, or document file you process on SarkariPixels is ever stored in cookies,
        localStorage, IndexedDB, or any server. All image processing runs entirely in your browser&apos;s
        JavaScript memory (RAM) and is discarded when you close or refresh the page.
      </p>

      <h2 className="t-h3 mb-3 mt-8">How to Manage Cookies</h2>
      <p className="t-body mb-3" style={{ color: "var(--color-muted)" }}>You have full control over browser storage:</p>
      <ul className="space-y-2 mb-6 text-sm" style={{ color: "var(--color-muted)" }}>
        <li>• <strong style={{ color: "var(--color-text)" }}>Withdraw consent:</strong> Click &ldquo;Decline&rdquo; in the cookie banner on your next visit after clearing localStorage.</li>
        <li>• <strong style={{ color: "var(--color-text)" }}>Clear localStorage:</strong> Open browser DevTools → Application → Local Storage → delete <code>sp-theme</code> and <code>sp-cookie-consent</code>.</li>
        <li>• <strong style={{ color: "var(--color-text)" }}>Block all cookies:</strong> Use your browser&apos;s Privacy Settings to block third-party cookies. Core tools still work without cookies.</li>
        <li>• <strong style={{ color: "var(--color-text)" }}>Opt out of GA:</strong> Install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-accent)" }}>Google Analytics Opt-out Browser Add-on</a>.</li>
      </ul>

      <h2 className="t-h3 mb-3 mt-8">Legal Basis</h2>
      <p className="t-body mb-4" style={{ color: "var(--color-muted)" }}>
        We rely on your <strong>consent</strong> (provided via the cookie banner) for analytics and advertising cookies.
        Strictly necessary localStorage items (theme preference) require no consent as they contain no personal data and
        are essential for the user experience you explicitly requested.
      </p>

      <h2 className="t-h3 mb-3 mt-8">Contact</h2>
      <p className="t-body" style={{ color: "var(--color-muted)" }}>
        Cookie-related questions or withdrawal requests:{" "}
        <a href="mailto:privacy@sarkaripixels.online" style={{ color: "var(--color-accent)" }}>privacy@sarkaripixels.online</a>
      </p>
    </article>
  );
}

function AboutContent() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SarkariPixels",
    url: SITE_URL,
    description: "SarkariPixels is a free browser-based photo resizer that helps Indian government exam applicants compress and resize photos to exact portal specifications.",
    email: "info@sarkaripixels.online",
    foundingDate: "2024",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "info@sarkaripixels.online",
        availableLanguage: ["en", "hi"],
      },
      {
        "@type": "ContactPoint",
        contactType: "editorial",
        email: "editorial@sarkaripixels.online",
        availableLanguage: ["en", "hi"],
      },
    ],
    knowsAbout: [
      "SSC exam photo requirements",
      "UPSC photo size",
      "Government exam photo compression",
      "Image resizing",
      "DPI conversion",
      "Passport photo specifications"
    ],
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
        SarkariPixels was built because photo rejection on government exam portals is a major hurdle for candidates.
        When applicants face errors like &quot;file too large&quot; or &quot;invalid dimensions&quot; during tight application deadlines,
        traditional photo software is often inaccessible or requires technical knowledge.
      </p>

      <p className="t-body mb-8" style={{ color: "var(--color-muted)" }}>
        This site solves that challenge with {TOTAL_TOOLS_COUNT} specialized tools covering major Indian exam photo and signature requirements.
        All processing executes locally in your browser memory — your photos are never uploaded or stored on any server.
      </p>

      <h2 className="t-h3 mb-4">Core Principles</h2>
      <ul className="space-y-3 mb-8">
        {[
          { icon: "fa-shield-halved", label: "Zero Upload", desc: "Your files never leave your device. All computations run in local browser memory." },
          { icon: "fa-infinity", label: "Free Forever", desc: "No paywalls, no subscription fees, and no account registration required." },
          { icon: "fa-bullseye", label: "Accurate Specs", desc: "Specifications verified against official exam notifications and bulletins." },
          { icon: "fa-mobile-screen", label: "Mobile-First", desc: "Designed for budget smartphones, tablets, and slow internet connections." },
        ].map(({ icon, label, desc }) => (
          <li key={label} className="flex items-start gap-3">
            <i className={`fa-solid ${icon} mt-1 shrink-0`} style={{ color: "var(--color-accent)", fontSize: "14px" }} aria-hidden="true" />
            <span className="t-body" style={{ color: "var(--color-muted)" }}>
              <strong style={{ color: "var(--color-text)" }}>{label}</strong> — {desc}
            </span>
          </li>
        ))}
      </ul>

      <h2 className="t-h3 mb-4">Editorial Verification &amp; Spec Governance</h2>
      <p className="t-body mb-4" style={{ color: "var(--color-muted)" }}>
        Recruitment boards across India routinely update online portal requirements, introduce live-capture OTR systems, and adjust KB upload limits. To ensure absolute compliance:
      </p>
      <div className="card p-5 mb-8 space-y-3" style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}>
        <div className="flex items-start gap-3">
          <i className="fa-solid fa-calendar-check text-blue-600 mt-1 shrink-0" aria-hidden="true" />
          <div>
            <strong className="block text-sm font-semibold" style={{ color: "var(--color-text)" }}>90-Day Periodic Review Cycle</strong>
            <span className="text-xs" style={{ color: "var(--color-muted)" }}>
              Every exam board profile (SSC, UPSC, BPSC, RRB, NTA, IBPS) is formally audited against the latest official recruitment gazettes and notices every 90 days.
            </span>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <i className="fa-solid fa-file-pdf text-blue-600 mt-1 shrink-0" aria-hidden="true" />
          <div>
            <strong className="block text-sm font-semibold" style={{ color: "var(--color-text)" }}>Direct Source Linking</strong>
            <span className="text-xs" style={{ color: "var(--color-muted)" }}>
              We link directly to official portal notices and application bulletins so candidates can independently cross-reference dimension, file size, and background guidelines.
            </span>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <i className="fa-solid fa-triangle-exclamation text-blue-600 mt-1 shrink-0" aria-hidden="true" />
          <div>
            <strong className="block text-sm font-semibold" style={{ color: "var(--color-text)" }}>Portal Exceptions Disclosed</strong>
            <span className="text-xs" style={{ color: "var(--color-muted)" }}>
              Special rules—such as the UPSC 10-day name/date stamp, SSC live webcam capture for 2024–2026 OTR cycles, and NTA NEET postcard formats—are prominently flagged.
            </span>
          </div>
        </div>
      </div>

      <h2 className="t-h3 mb-4">Technical Architecture &amp; Client Privacy</h2>
      <p className="t-body mb-4" style={{ color: "var(--color-muted)" }}>
        Unlike traditional image utilities that upload candidate documents to cloud servers for server-side processing, SarkariPixels runs entirely in your browser:
      </p>
      <ul className="space-y-2 text-xs mb-8 list-disc pl-5" style={{ color: "var(--color-muted)" }}>
        <li><strong>Client Memory Sandbox:</strong> All resizing, bilinear interpolation, Canvas histogram normalization, and iterative JPEG compression execute inside your browser’s local JavaScript sandbox.</li>
        <li><strong>Zero Image Transmission:</strong> Raw image pixels never leave your device CPU/GPU. No backend server ever receives or caches your biometric documents.</li>
        <li><strong>Offline-Ready Execution:</strong> Once the page is loaded, core resizing and compression algorithms can execute even without an active data connection.</li>
      </ul>

      <h2 className="t-h3 mb-4">Tested Browser &amp; Device Compatibility Matrix</h2>
      <p className="t-body mb-4" style={{ color: "var(--color-muted)" }}>
        SarkariPixels is continuously tested across major mobile and desktop operating systems to guarantee dependable in-browser processing without plugin installations:
      </p>
      <div className="overflow-x-auto my-4 card border rounded-xl mb-8" style={{ borderColor: "var(--color-border)" }}>
        <table className="w-full text-left text-xs border-collapse" style={{ minWidth: "600px" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
              <th className="p-3 font-semibold" style={{ color: "var(--color-text)" }}>OS / Platform</th>
              <th className="p-3 font-semibold" style={{ color: "var(--color-text)" }}>Browser</th>
              <th className="p-3 font-semibold" style={{ color: "var(--color-text)" }}>Min. Version</th>
              <th className="p-3 font-semibold" style={{ color: "var(--color-text)" }}>Canvas &amp; Blob Export</th>
              <th className="p-3 font-semibold" style={{ color: "var(--color-text)" }}>Target Compression</th>
              <th className="p-3 font-semibold" style={{ color: "var(--color-text)" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { os: "Android 10+", browser: "Google Chrome Mobile", ver: "v100+", canvas: "Supported", comp: "Supported", status: "Verified Compatible" },
              { os: "Android 10+", browser: "Mozilla Firefox Mobile", ver: "v105+", canvas: "Supported", comp: "Supported", status: "Verified Compatible" },
              { os: "Android 10+", browser: "Samsung Internet", ver: "v18+", canvas: "Supported", comp: "Supported", status: "Verified Compatible" },
              { os: "iOS / iPadOS 15+", browser: "Apple Safari Mobile", ver: "iOS 15+", canvas: "Supported", comp: "Supported", status: "Verified Compatible" },
              { os: "iOS / iPadOS 15+", browser: "Google Chrome iOS", ver: "v100+", canvas: "Supported", comp: "Supported", status: "Verified Compatible" },
              { os: "Windows 10/11", browser: "Google Chrome", ver: "v95+", canvas: "Supported", comp: "Supported", status: "Verified Compatible" },
              { os: "Windows 10/11", browser: "Microsoft Edge", ver: "v95+", canvas: "Supported", comp: "Supported", status: "Verified Compatible" },
              { os: "Windows 10/11", browser: "Mozilla Firefox", ver: "v100+", canvas: "Supported", comp: "Supported", status: "Verified Compatible" },
              { os: "macOS 12+", browser: "Apple Safari Desktop", ver: "v15+", canvas: "Supported", comp: "Supported", status: "Verified Compatible" },
              { os: "macOS 12+", browser: "Google Chrome Desktop", ver: "v95+", canvas: "Supported", comp: "Supported", status: "Verified Compatible" },
            ].map((row, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td className="p-3 font-medium" style={{ color: "var(--color-text)" }}>{row.os}</td>
                <td className="p-3" style={{ color: "var(--color-text)" }}>{row.browser}</td>
                <td className="p-3 text-slate-500">{row.ver}</td>
                <td className="p-3 text-emerald-600 font-medium">{row.canvas}</td>
                <td className="p-3 text-emerald-600 font-medium">{row.comp}</td>
                <td className="p-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    <i className="fa-solid fa-check text-[10px]" aria-hidden="true" />
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

      <h2 className="t-h3 mb-4">Contact &amp; Candidate Support</h2>
      <p className="t-body mb-4" style={{ color: "var(--color-muted)" }}>
        Have questions, discovered a portal specification change, or noticed a bug? We welcome feedback from candidates, coaching institutes, and cyber café operators:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="card p-4 border rounded-xl" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">General Inquiries &amp; Feedback</span>
          <a href="mailto:info@sarkaripixels.online" className="text-sm font-semibold hover:underline" style={{ color: "var(--color-text)" }}>
            info@sarkaripixels.online
          </a>
          <p className="text-xs mt-2" style={{ color: "var(--color-muted)" }}>For general questions, user suggestions, and platform assistance.</p>
        </div>
        <div className="card p-4 border rounded-xl" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">Editorial &amp; Spec Corrections</span>
          <a href="mailto:editorial@sarkaripixels.online" className="text-sm font-semibold hover:underline" style={{ color: "var(--color-text)" }}>
            editorial@sarkaripixels.online
          </a>
          <p className="text-xs mt-2" style={{ color: "var(--color-muted)" }}>Priority mailbox for notification updates and portal spec revisions (reviewed within 48 hours).</p>
        </div>
        <div className="card p-4 border rounded-xl" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
          <span className="text-xs font-bold uppercase tracking-wider text-pink-600 block mb-1">Official Instagram</span>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold hover:underline inline-flex items-center gap-2"
            style={{ color: "var(--color-text)" }}
          >
            <InstagramBadgeIcon size={20} />
            <span>{INSTAGRAM_HANDLE}</span>
          </a>
          <p className="text-xs mt-2" style={{ color: "var(--color-muted)" }}>Follow for latest government exam photo updates, notification alerts, and guides.</p>
        </div>
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
            { href: "/page/cookies", label: "Cookie Policy" },
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
        <ul className="space-y-1 text-sm grid grid-cols-1 sm:grid-cols-2 gap-1">
          {Object.values(GUIDES).map((guide) => (
            <li key={guide.slug}>
              <a href={`/guides/${guide.slug}`} style={{ color: "var(--color-accent)" }}>
                {guide.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="t-h3 mb-3">All {TOOLS.length} Tools</h2>
        {Object.entries(
          TOOLS.reduce<Record<string, typeof TOOLS>>((acc, tool) => {
            const cat = tool.category;
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(tool);
            return acc;
          }, {})
        ).map(([cat, tools]) => (
          <div key={cat} className="mb-4">
            <h3 className="text-sm font-semibold mb-1" style={{ color: "var(--color-text)" }}>
              {(CATEGORY_LABELS as Record<string, string>)[cat] || cat}
            </h3>
            <ul className="space-y-0.5 text-sm">
              {tools.map((tool) => (
                <li key={tool.id}>
                  <a href={`/tool/${tool.id}`} style={{ color: "var(--color-accent)" }}>{tool.title}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
