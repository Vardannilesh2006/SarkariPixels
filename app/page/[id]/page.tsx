import type { Metadata } from "next";
import { notFound } from "next/navigation";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sarkaripixels.vercel.app";

interface Props {
  params: Promise<{ id: string }>;
}

const PAGES: Record<string, { title: string; desc: string }> = {
  privacy: {
    title: "Privacy Policy — SarkariPixels",
    desc: "SarkariPixels operates 100% in your browser. No images are ever uploaded to any server.",
  },
  about: {
    title: "About Us & Terms — SarkariPixels",
    desc: "About SarkariPixels — free browser-based photo editor for Indian government exam applications.",
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
    alternates: { canonical: `${SITE_URL}/page/${id}` },
  };
}

export default async function LegalPage({ params }: Props) {
  const { id } = await params;
  if (!PAGES[id]) notFound();

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 font-black">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center">
              <i className="fa-solid fa-image text-white text-sm" />
            </div>
            <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">SarkariPixels</span>
          </a>
          <a href="/" className="text-xs text-slate-400 hover:text-indigo-600">← Home</a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        {id === "privacy" && <PrivacyContent />}
        {id === "about" && <AboutContent />}
        {id === "sitemap" && <SitemapContent />}
      </main>
    </>
  );
}

function PrivacyContent() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Privacy Policy</h1>
      <p className="text-sm text-slate-400">Last updated: June 2026 · Version 2.0 (DPDP Act 2023 compliant)</p>

      <h2>Zero Data Collection — How SarkariPixels Works</h2>
      <p>
        SarkariPixels is a 100% client-side browser application. When you upload or process any image,
        that image is processed <strong>entirely on your device</strong> using the Canvas API.
        No image data is ever transmitted to any server — not ours, not anyone else's.
      </p>

      <h2>What Data We Do Collect</h2>
      <p>We collect minimal, non-personal analytics data through the following third-party services:</p>

      <h3>Analytics</h3>
      <ul>
        <li><strong>Google Analytics 4 (G-KNQ135CJNM)</strong> — Page views, tool usage events, session data. IP anonymized. No personally identifiable information collected from image processing.</li>
        <li><strong>Google Tag Manager (GTM-KMK8392M)</strong> — Tag management for analytics scripts.</li>
      </ul>

      <h3>Advertising</h3>
      <ul>
        <li><strong>Monetag</strong> — Ad network for revenue. May set cookies for ad targeting. Opt-out: monetag.com privacy page.</li>
        <li><strong>EffectiveCPM Network</strong> — Ad network serving display and popunder ads. May set cookies.</li>
      </ul>

      <h3>AI Assistant</h3>
      <ul>
        <li><strong>OpenRouter / OpenAI</strong> — When you use the AI assistant, your text questions are sent to OpenRouter's API. No image data is sent. Questions may be logged by OpenRouter per their privacy policy.</li>
      </ul>

      <h2>Your Rights Under DPDP Act 2023</h2>
      <p>Under India's Digital Personal Data Protection Act 2023, you have the right to:</p>
      <ul>
        <li>Know what data we have about you (analytics only — no images)</li>
        <li>Request correction of inaccurate data</li>
        <li>Request erasure of your data</li>
        <li>Nominate someone to exercise these rights on your behalf</li>
      </ul>
      <p>
        To exercise these rights, contact: <strong>privacy [at] sarkaripixels [dot] com</strong>
      </p>

      <h2>Cookies</h2>
      <p>
        We use localStorage (not cookies) for theme preference (dark/light mode). This data never leaves
        your device. Third-party ad networks (Monetag, EffectiveCPM) may set their own cookies — see
        their respective privacy policies.
      </p>

      <h2>Children</h2>
      <p>SarkariPixels does not knowingly collect data from children under 18.</p>

      <h2>Changes to This Policy</h2>
      <p>
        This policy will be updated when exam specifications, ad networks, or functionality changes.
        The version date at the top of this page will be updated. Continued use of the site constitutes acceptance.
      </p>
    </article>
  );
}

function AboutContent() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      <h1>About SarkariPixels</h1>

      <p>
        SarkariPixels was built because photo rejection on government exam portals is <em>genuinely frustrating</em>.
        You&apos;ve filled the form, you have the photo, but the portal says &quot;file too large&quot; or &quot;invalid dimensions&quot;
        and you don&apos;t know what to do next.
      </p>

      <p>
        This site exists to solve exactly that — with 88 specific tools covering every major Indian exam&apos;s
        photo and signature requirements. All processing happens in your browser. Your photo never goes anywhere.
      </p>

      <h2>Core Principles</h2>
      <ul>
        <li><strong>Zero Upload</strong> — Your files never leave your device. Ever.</li>
        <li><strong>Free Forever</strong> — No paywalls, no login required for core tools.</li>
        <li><strong>Accurate Specs</strong> — Exam specifications verified against official notifications.</li>
        <li><strong>Mobile-First</strong> — Works on slow connections and budget phones.</li>
      </ul>

      <h2>Terms of Use</h2>
      <p>
        SarkariPixels is provided &quot;as-is&quot; for educational and utility use. While we verify exam specifications
        carefully, official exam portals may update their requirements without notice. Always cross-check
        with the official notification before submitting.
      </p>

      <p>
        You may use the tools for personal, educational, and professional use. Automated scraping,
        reselling processed results, or using our infrastructure to build competing services is not permitted.
      </p>

      <h2>Contact</h2>
      <p>For queries, corrections to exam specifications, or feedback: info [at] sarkaripixels [dot] com</p>
    </article>
  );
}

function SitemapContent() {
  return (
    <div>
      <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-8">HTML Sitemap</h1>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-3">Main Pages</h2>
        <ul className="space-y-1 text-sm">
          <li><a href="/" className="text-indigo-600 hover:underline">Home — All Tools</a></li>
          <li><a href="/exam-specs" className="text-indigo-600 hover:underline">Exam Specifications Hub</a></li>
          <li><a href="/guides" className="text-indigo-600 hover:underline">Guides & Articles</a></li>
          <li><a href="/page/about" className="text-indigo-600 hover:underline">About Us & Terms</a></li>
          <li><a href="/page/privacy" className="text-indigo-600 hover:underline">Privacy Policy</a></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-3">Exam Specifications</h2>
        <ul className="space-y-1 text-sm grid grid-cols-2 gap-1">
          {["ssc", "upsc", "bpsc", "bssc", "rrb", "nta", "ibps", "pan"].map((key) => (
            <li key={key}>
              <a href={`/exam-specs/${key}`} className="text-indigo-600 hover:underline capitalize">
                {key.toUpperCase()} Specifications
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-3">All 88 Tools</h2>
        <p className="text-sm text-slate-500 mb-4">Browse all tools at <a href="/" className="text-indigo-600 hover:underline">the home page</a> with category filters.</p>
      </section>
    </div>
  );
}
