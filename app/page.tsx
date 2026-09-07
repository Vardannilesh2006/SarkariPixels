import type { Metadata } from "next";
import { TOOLS, CATEGORY_COUNTS } from "@/lib/tools-data";
import HomeClient from "@/components/HomeClient";

const CATEGORY_COLORS: Record<string, { color: string; bg: string }> = {
  "basic-edit": { color: "#2563EB", bg: "#2563eb1a" },
  "effects": { color: "#7C3AED", bg: "#7c3aed1a" },
  "dpi-quality": { color: "#0EA5E9", bg: "#0ea5e91a" },
  "id-sizes": { color: "#059669", bg: "#0596691a" },
  "general-compress": { color: "#F97316", bg: "#f973161a" },
  "target-sizes": { color: "#EA580C", bg: "#ea580c1a" },
  "official-sizes": { color: "#DC2626", bg: "#dc26261a" },
  "most-used": { color: "#2563EB", bg: "#2563eb1a" },
};

import { SITE_URL, INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/constants";
import { TOTAL_TOOLS_COUNT } from "@/lib/toolRegistry";
import InstagramLink from "@/components/InstagramLink";

export const metadata: Metadata = {
  title: "SarkariPixels | Free Photo & Signature Resizer for Govt Exams",
  description:
    "SarkariPixels is a free browser-based photo resizer that helps Indian government exam applicants resize and compress photos for SSC, UPSC, BPSC, RRB, IBPS exam portals. Exact KB and pixel limits. 100% browser-based — nothing is uploaded.",
  alternates: {
    canonical: SITE_URL,
    languages: { "en-IN": SITE_URL },
  },
  openGraph: {
    url: SITE_URL,
    title: `SarkariPixels | ${TOTAL_TOOLS_COUNT} Free Exam Photo Tools`,
    description:
      "Compress and resize photos to exact KB and pixel limits for any Indian government exam portal. Browser-only, zero upload.",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
};

const NAV_CATEGORIES = [
  { key: "all", label: "All Tools", count: TOTAL_TOOLS_COUNT },
  { key: "most-used", label: "Most Used", count: CATEGORY_COUNTS["most-used"] },
  { key: "basic-edit", label: "Basic Editing", count: CATEGORY_COUNTS["basic-edit"] },
  { key: "effects", label: "Effects", count: CATEGORY_COUNTS["effects"] },
  { key: "dpi-quality", label: "DPI & Quality", count: CATEGORY_COUNTS["dpi-quality"] },
  { key: "id-sizes", label: "ID Photo Sizes", count: CATEGORY_COUNTS["id-sizes"] },
  { key: "general-compress", label: "Compression", count: CATEGORY_COUNTS["general-compress"] },
  { key: "target-sizes", label: "Target KB", count: CATEGORY_COUNTS["target-sizes"] },
  { key: "official-sizes", label: "Official Sizes", count: CATEGORY_COUNTS["official-sizes"] },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}>

      {/* ── HEADER ─────────────────────────────────────────────────
           Sticky. Logo + nav links + theme toggle. Nothing else.
      ────────────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          backgroundColor: "var(--color-bg)",
          borderColor: "var(--color-border)",
        }}
      >
        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8"
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 shrink-0" aria-label="SarkariPixels — go to homepage">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black"
              style={{ backgroundColor: "var(--color-accent)" }}
              aria-hidden="true"
            >
              S
            </div>
            <span className="text-base font-bold" style={{ color: "var(--color-text)" }}>
              SarkariPixels
            </span>
          </a>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {[
              { href: "/exam-specs", label: "Exam Specs" },
              { href: "/guides", label: "Guides" },
              { href: "/page/about", label: "About" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header actions: Instagram + Theme toggle */}
          <div className="flex items-center gap-2">
            <InstagramLink variant="icon" />
            <button
              id="theme-toggle"
              className="btn btn-ghost btn-sm"
              aria-label="Toggle dark mode"
            >
              <i id="theme-icon" className="fa-solid fa-moon" style={{ fontSize: "14px" }} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* ── HERO ───────────────────────────────────────────────────
             Single focus: headline + support text + one CTA.
             No sidebar. No mockup widget. No competing elements.
             Clear whitespace above and below.
        ────────────────────────────────────────────────────────────── */}
        <section
          className="pt-8 pb-5 sm:pt-10 sm:pb-7 px-4 sm:px-6 text-center hero-anim hero-gradient"
          aria-labelledby="hero-headline"
        >
          <div className="max-w-2xl mx-auto">
            {/* Security pill — pulsing trust signal */}
            <div className="flex justify-center mb-4">
              <div className="security-pill" role="status" aria-label="Privacy status: all image processing is local">
                <span className="security-pill__dot" aria-hidden="true"></span>
                100% In-Memory · Zero Server Upload · WebAssembly Canvas
              </div>
            </div>
            <h1
              id="hero-headline"
              className="t-h1 mb-3"
            >
              Resize Exam Photos &amp; Signatures to Exact Specs — 100% Free
            </h1>
            <p
              className="t-body"
              style={{ color: "var(--color-muted)", maxWidth: "560px", margin: "0 auto 1.25rem", lineHeight: "1.6" }}
            >
              Compress and resize passport photos for <strong>SSC, UPSC, BPSC, RRB, IBPS &amp; NTA</strong>. 
              Set exact KB, pixels, or cm in seconds.{" "}
              <span style={{ color: "#059669", fontWeight: 600 }}>100% Private — photos never leave your phone.</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href="#tools" className="btn btn-primary" style={{ fontSize: "1rem", padding: "14px 32px" }}>
                Browse {TOTAL_TOOLS_COUNT} Tools
              </a>
              <a href="/exam-specs" className="btn btn-ghost" style={{ fontSize: "0.9375rem", padding: "12px 24px" }}>
                <i className="fa-solid fa-list-check mr-2" aria-hidden="true" />
                View Official Specs
              </a>
            </div>
          </div>
        </section>

        {/* ── TRUST COUNTER STRIP ─────────────────────────────────────────
             Premium counter row — replaces static 3-fact strip.
             4 counters: tool count, local processing, zero storage, free.
        ────────────────────────────────────────────────────────────── */}
        <section
          className="py-6 px-4 sm:px-6 border-b"
          style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
          aria-label="Key facts about SarkariPixels"
        >
          <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-x-12 gap-y-5">
            {[
              { value: `${TOTAL_TOOLS_COUNT}`, label: "Free Tools" },
              { value: "100%", label: "Local Processing" },
              { value: "0 KB", label: "Server Storage" },
              { value: "∞", label: "Free Forever" },
            ].map((item) => (
              <div key={item.label} className="trust-counter" aria-label={`${item.value} ${item.label}`}>
                <div className="trust-counter__value">{item.value}</div>
                <div className="trust-counter__label">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── MARQUEE STRIP ──────────────────────────────────────────
             Infinite CSS-only scroll of tool names — all clickable links.
             Placed below the trust strip.
        ────────────────────────────────────────────────────────────── */}
        <div
          className="marquee-wrapper border-b overflow-hidden"
          style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
          aria-label="Quick links to popular tools"
        >
          <div className="marquee-track">
            {[1, 2].map((n) => (
              <div key={n} className="marquee-content" aria-hidden={n === 2 ? "true" : undefined}>
                {[
                  { label: "Compress to 50 KB",  href: "/tool/compress-50" },
                  { label: "SSC CGL Photo",       href: "/tool/ssc-photo" },
                  { label: "UPSC Photo",          href: "/tool/upsc-photo-resize" },
                  { label: "Passport Size",       href: "/tool/passport-maker" },
                  { label: "Signature Resize",    href: "/tool/resize-signature" },
                  { label: "Compress to 20 KB",  href: "/tool/compress-20" },
                  { label: "PAN Card Photo",      href: "/tool/pan-card-resize" },
                  { label: "Compress to 100 KB", href: "/tool/compress-100" },
                  { label: "PSC Photo",           href: "/tool/psc-photo" },
                  { label: "Smart Resizer",       href: "/tool/smart-resizer" },
                  { label: "DPI Converter",       href: "/tool/convert-dpi" },
                  { label: "Compress to 30 KB",  href: "/tool/compress-30" },
                  { label: "Resize in cm",        href: "/tool/resize-cm" },
                  { label: "Compress to 40 KB",  href: "/tool/compress-40" },
                  { label: "A4 Size",             href: "/tool/resize-a4" },
                  { label: "Compress to 200 KB", href: "/tool/compress-200" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="marquee-item"
                    tabIndex={n === 2 ? -1 : 0}
                  >
                    <i className="fa-solid fa-circle-small marquee-dot" aria-hidden="true" />
                    {item.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── TOOL BROWSER ───────────────────────────────────────────
             Clearly separated from hero. Sidebar + grid.
             Sidebar: label + count only (no icon competing).
             Structural fix: sidebar is inside the same grid as the
             tool grid — it never overlaps the hero above.
        ────────────────────────────────────────────────────────────── */}
        <section id="tools" className="py-14 px-4 sm:px-6" aria-labelledby="tools-heading">
          <div className="max-w-6xl mx-auto">

            {/* Section header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h2 id="tools-heading" className="t-h2">Image Tools</h2>
              <div className="relative">
                <label htmlFor="tool-search" className="sr-only">Search tools</label>
                <i
                  className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ fontSize: "12px", color: "var(--color-muted)" }}
                  aria-hidden="true"
                />
                <input
                  id="tool-search"
                  type="search"
                  placeholder="Search tools…"
                  className="input"
                  style={{ paddingLeft: "32px", width: "220px" }}
                  aria-label="Search tools"
                />
              </div>
            </div>

            {/* Layout: sidebar + grid in the same grid — no overlap possible */}
            <div className="flex flex-col lg:flex-row gap-8 items-start">

              {/* Category sidebar */}
              <aside
                className="lg:w-48 shrink-0 w-full"
                aria-label="Filter by category"
              >
                <div
                  className="rounded-xl border overflow-hidden"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <p
                    className="t-caption px-4 py-3 border-b font-semibold uppercase tracking-wider"
                    style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
                  >
                    Category
                  </p>
                  <nav aria-label="Tool categories">
                    {NAV_CATEGORIES.map((cat) => (
                      <button
                        key={cat.key}
                        className={`cat-btn ${cat.key === "all" ? "active" : ""}`}
                        data-category={cat.key}
                        aria-pressed={cat.key === "all"}
                      >
                        <span>{cat.label}</span>
                        <span
                          className="t-caption"
                          aria-label={`${cat.count} tools`}
                        >
                          {cat.count}
                        </span>
                      </button>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Tool grid */}
              <div className="flex-1 min-w-0">
                <div
                  id="tool-grid"
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3"
                  aria-label="Tool list"
                >
                  {TOOLS.map((tool) => {
                    const catStyle = CATEGORY_COLORS[tool.category] || { color: "var(--color-muted)", bg: "var(--color-surface)" };
                    return (
                      <a
                        key={tool.id}
                        href={`/tool/${tool.id}`}
                        className="tool-card"
                        data-category={tool.category}
                        data-title={tool.title.toLowerCase()}
                        aria-label={`${tool.title}: ${tool.desc}`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                            style={{
                              backgroundColor: catStyle.bg,
                              border: "1px solid var(--color-border)",
                            }}
                            aria-hidden="true"
                          >
                            <div
                              style={{
                                width: "18px",
                                height: "18px",
                                backgroundColor: catStyle.color,
                                WebkitMaskImage: `url(/icons/tools/${tool.id}.svg)`,
                                maskImage: `url(/icons/tools/${tool.id}.svg)`,
                                WebkitMaskSize: "contain",
                                maskSize: "contain",
                                WebkitMaskPosition: "center",
                                maskPosition: "center",
                                WebkitMaskRepeat: "no-repeat",
                                maskRepeat: "no-repeat",
                              }}
                            />
                          </div>
                          <div className="min-w-0">
                            <h3>{tool.title}</h3>
                            <p className="line-clamp-2">{tool.desc}</p>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ───────────────────────────────────────────
             Different rhythm from the card grid above.
             3 steps, horizontally laid out, minimal.
        ────────────────────────────────────────────────────────────── */}
        <section
          className="py-14 px-4 sm:px-6"
          style={{ backgroundColor: "var(--color-surface)" }}
          aria-labelledby="how-heading"
        >
          <div className="max-w-6xl mx-auto">
            <h2 id="how-heading" className="t-h2 mb-10 text-center">How It Works</h2>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-8" role="list">
              {[
                {
                  n: "1",
                  title: "Select a Tool",
                  body: "Choose your exam portal (SSC, UPSC, etc.) or pick a target KB size from the grid.",
                  icon: "fa-hand-pointer",
                },
                {
                  n: "2",
                  title: "Upload Your Photo",
                  body: "Drag or browse your image. It stays on your device — never leaves your browser.",
                  icon: "fa-cloud-arrow-up",
                },
                {
                  n: "3",
                  title: "Download & Submit",
                  body: "The processed image is ready in seconds. Download and use directly on the exam portal.",
                  icon: "fa-download",
                },
              ].map((step) => (
                <li key={step.n} className="card p-6" role="listitem">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-black text-white mb-4"
                    style={{ backgroundColor: "var(--color-accent)" }}
                    aria-hidden="true"
                  >
                    {step.n}
                  </div>
                  <h3
                    className="text-base font-semibold mb-2"
                    style={{ color: "var(--color-text)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="t-caption" style={{ lineHeight: "1.6" }}>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── EXAM COVERAGE ──────────────────────────────────────────
             Plain badge list. Different rhythm (badge cloud vs card grid).
        ────────────────────────────────────────────────────────────── */}
        <section className="py-14 px-4 sm:px-6" aria-labelledby="exams-heading">
          <div className="max-w-4xl mx-auto text-center">
            <h2 id="exams-heading" className="t-h2 mb-3">Supported Exams</h2>
            <p className="t-body mb-8" style={{ color: "var(--color-muted)" }}>
              Exact photo and signature specs for major exam portals — pre-loaded.
            </p>
            <div className="flex flex-wrap justify-center gap-2" role="list" aria-label="Supported exam portals">
              {[
                "SSC CGL / CHSL",
                "UPSC Civil Services",
                "BPSC Pre / Mains",
                "BSSC Inter Level",
                "RRB NTPC / Group D",
                "NTA NEET / JEE",
                "IBPS PO / Clerk",
                "SBI PO / Clerk",
                "PAN Card (NSDL / UTI)",
              ].map((exam) => (
                <span key={exam} className="badge" role="listitem">{exam}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── ARCHITECTURE BENTO: Browser vs Cloud ────────────────────
             Side-by-side technical comparison highlighting privacy.
             No competing shadows — uses arch-bento CSS classes.
        ────────────────────────────────────────────────────────────── */}
        <section className="py-14 px-4 sm:px-6" style={{ backgroundColor: "var(--color-surface)" }} aria-labelledby="arch-heading">
          <div className="max-w-4xl mx-auto">
            <h2 id="arch-heading" className="t-h2 mb-2 text-center">Why In-Browser Processing?</h2>
            <p className="t-body mb-8 text-center" style={{ color: "var(--color-muted)" }}>
              Traditional cloud converters upload your biometric documents to remote servers. SarkariPixels never does.
            </p>
            <div className="arch-bento" role="table" aria-label="Browser processing vs cloud uploader comparison">
              <div className="arch-bento__col arch-bento__col--bad" role="cell">
                <h3 className="text-base font-bold mb-4">
                  <i className="fa-solid fa-cloud mr-2" aria-hidden="true" />
                  Traditional Cloud Converters
                </h3>
                <ul className="space-y-3 text-sm" style={{ color: "var(--color-muted)" }}>
                  {[
                    "Files uploaded across the internet to remote servers",
                    "Documents cached on server disks indefinitely",
                    "Queue delays for free-tier accounts (30–60s)",
                    "2–5 file hourly limits on free plans",
                    "Cannot work offline — requires active internet",
                    "Risk: data breach or server-side snooping",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <i className="fa-solid fa-xmark text-red-500 mt-0.5 shrink-0" style={{ fontSize: "13px" }} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="arch-bento__col arch-bento__col--good" role="cell">
                <h3 className="text-base font-bold mb-4">
                  <i className="fa-solid fa-microchip mr-2" aria-hidden="true" />
                  SarkariPixels In-Browser Engine
                </h3>
                <ul className="space-y-3 text-sm" style={{ color: "var(--color-muted)" }}>
                  {[
                    "0 bytes uploaded — runs entirely in browser RAM",
                    "Executed in an isolated local JavaScript sandbox",
                    "Instant processing — no queue, no server round-trip",
                    "Unlimited files, unlimited use, forever free",
                    "Works offline after first page load (PWA)",
                    "Impossible to intercept — image never leaves your CPU",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <i className="fa-solid fa-check text-green-600 mt-0.5 shrink-0" style={{ fontSize: "13px" }} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ SECTION ─────────────────────────────────────────────
             FAQPage schema injected in JSON-LD below.
             Targets: AI Overviews, ChatGPT, Perplexity citations.
        ────────────────────────────────────────────────────────────── */}
        <section className="py-14 px-4 sm:px-6 border-t" style={{ borderColor: "var(--color-border)" }} aria-labelledby="faq-heading">
          <div className="max-w-3xl mx-auto">
            <h2 id="faq-heading" className="t-h2 mb-2 text-center">Frequently Asked Questions</h2>
            <p className="t-body mb-8 text-center" style={{ color: "var(--color-muted)" }}>Common exam photo questions — answered directly.</p>
            <dl className="space-y-0 divide-y" style={{ borderColor: "var(--color-border)" }}>
              {[
                {
                  q: "SSC exam ke liye photo size kya honi chahiye?",
                  a: "SSC CGL, CHSL, aur MTS ke liye photo 3.5 cm × 4.5 cm (413 × 531 pixels at 300 DPI) honi chahiye. File size 20 KB se 50 KB, JPEG format, aur plain white background mandatory hai."
                },
                {
                  q: "Phone ki photo ko 50KB se kam kaise karein?",
                  a: "SarkariPixels ka 'Compress to 50KB' tool use karein. Photo upload karein aur tool turant 50KB ke andar output produce karega. Saari processing browser memory mein hoti hai."
                },
                {
                  q: "UPSC ke liye photo ka size kya hota hai?",
                  a: "UPSC CSE ke liye photo square 350 × 350 pixels (up to 1000 × 1000 px), 20 KB se 300 KB, JPEG format mein honi chahiye, white background aur bottom par candidate name/date stamp ke saath."
                },
                {
                  q: "Kya yeh tool mobile pe kaam karta hai?",
                  a: "Haan, SarkariPixels sabhi modern mobile browsers (Chrome, Safari, Firefox) par chalta hai. Processing device memory mein hoti hai."
                },
                {
                  q: "Kya photo ka data server pe upload hota hai?",
                  a: "Nahi. SarkariPixels 100% client-side HTML5 Canvas use karta hai. Aapki photos kisi bhi server ya cloud storage par upload nahi hoti hain."
                },
                {
                  q: "IBPS PO ya Clerk ke liye signature resize kaise karein?",
                  a: "IBPS ke liye signature 140 × 60 pixels, 10-20 KB, JPG format mein chahiye. SarkariPixels ka 'Signature Resize' tool pre-set IBPS dimensions ke saath turant output deta hai."
                },
              ].map(({ q, a }, i) => (
                <div key={i} className={i > 0 ? "pt-5 mt-5" : ""}>
                  <dt className="flex items-start gap-2 font-semibold mb-2" style={{ fontSize: "0.9375rem", color: "var(--color-text)" }}>
                    <i className="fa-solid fa-circle-question mt-0.5 shrink-0" style={{ fontSize: "13px", color: "var(--color-accent)" }} aria-hidden="true" />
                    {q}
                  </dt>
                  <dd className="pl-6" style={{ fontSize: "0.875rem", color: "var(--color-muted)", lineHeight: "1.7" }}>{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer
        className="mt-auto border-t py-10 px-4 sm:px-6"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {([
            {
              heading: "Popular Tools",
              links: [
                { href: "/tool/passport-maker", label: "Passport Photo Maker" },
                { href: "/tool/reduce-kb", label: "Reduce Photo KB" },
                { href: "/tool/compress-50", label: "Compress to 50 KB" },
                { href: "/tool/ssc-photo", label: "SSC Photo Size" },
              ],
            },
            {
              heading: "Official Presets",
              links: [
                { href: "/tool/upsc-photo-resize", label: "UPSC Photo" },
                { href: "/tool/pan-card-resize", label: "PAN Card Photo" },
                { href: "/tool/smart-resizer", label: "Smart Resizer" },
                { href: "/tool/psc-photo", label: "PSC Photo" },
              ],
            },
            {
              heading: "Resources",
              links: [
                { href: "/exam-specs", label: "Exam Specifications" },
                { href: "/guides", label: "How-To Guides" },
                { href: "/page/sitemap", label: "All Tools (Sitemap)" },
              ],
            },
            {
              heading: "Legal & Social",
              links: [
                { href: "/page/privacy", label: "Privacy Policy", external: false },
                { href: "/page/cookies", label: "Cookie Policy", external: false },
                { href: "/page/about", label: "About & Terms", external: false },
                { href: INSTAGRAM_URL, label: "Instagram (@sarkaripixcel)", external: true },
              ],
            },
          ] as { heading: string; links: { href: string; label: string; external?: boolean }[] }[]).map((col) => (
            <div key={col.heading}>
              <h3 className="t-caption font-bold uppercase tracking-wider mb-3" style={{ color: "var(--color-text)" }}>
                {col.heading}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="t-caption transition-colors hover:text-blue-600 inline-flex items-center gap-1.5"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {link.external && (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "14px",
                            height: "14px",
                            borderRadius: "4px",
                            background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                            color: "#fff",
                            fontSize: "8px",
                            flexShrink: 0,
                          }}
                          aria-hidden="true"
                        >
                          <i className="fa-brands fa-instagram" />
                        </span>
                      )}
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          className="max-w-6xl mx-auto pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="flex flex-wrap items-center gap-4">
            <span className="t-caption">
              &copy; {new Date().getFullYear()} SarkariPixels. All rights reserved.
            </span>
            <span className="t-caption hidden sm:inline" style={{ color: "var(--color-muted)" }}>•</span>
            <InstagramLink variant="footer-item" showHandle={true} />
          </div>
          <span className="t-caption">
            Images are processed locally in your browser.
          </span>
        </div>
      </footer>

      {/* FAQPage + WebPage JSON-LD for homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: "SSC exam ke liye photo size kya honi chahiye?", acceptedAnswer: { "@type": "Answer", text: "SSC CGL, CHSL, MTS ke liye photo 3.5 cm × 4.5 cm (413 × 531 pixels at 300 DPI) honi chahiye. File size 20–50 KB, JPG format, white background." } },
              { "@type": "Question", name: "Phone ki photo ko 50KB se kam kaise karein?", acceptedAnswer: { "@type": "Answer", text: "SarkariPixels pe Compress to 50KB tool use karo — photo upload karo, tool automatically compress kar dega. Koi file upload nahi hoti." } },
              { "@type": "Question", name: "UPSC ke liye photo ka size kya hota hai?", acceptedAnswer: { "@type": "Answer", text: "UPSC CSE ke liye photo 350 × 350 pixels (square), 20–300 KB, JPG, white background. Signature 350 × 100 pixels, 10-100 KB." } },
              { "@type": "Question", name: "Kya yeh tool mobile pe kaam karta hai?", acceptedAnswer: { "@type": "Answer", text: "Haan, SarkariPixels fully mobile-friendly hai. Chrome, Firefox, Safari sab mein kaam karta hai. Processing device pe hoti hai — server pe upload nahi hota." } },
              { "@type": "Question", name: "Kya photo ka data server pe upload hota hai?", acceptedAnswer: { "@type": "Answer", text: "Nahi. 100% client-side Canvas API. Photo kabhi server pe nahi jaati — na humare, na kisi aur ke." } },
              { "@type": "Question", name: "IBPS ke liye signature resize kaise karein?", acceptedAnswer: { "@type": "Answer", text: "IBPS ke liye signature 140 × 60 pixels, 10-20 KB, JPG. SarkariPixels Signature Resize tool use karo — exact dimensions pre-set hain." } },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${SITE_URL}/#webpage`,
            url: SITE_URL,
            name: "SarkariPixels — Free Exam Photo Resizer",
            description: "SarkariPixels is a free browser-based photo resizer that helps Indian government exam applicants compress and resize photos to exact portal specifications for SSC, UPSC, BPSC, RRB, IBPS, NTA, and state PSC exams.",
            publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization` },
            inLanguage: "en-IN",
            isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website` },
            dateModified: new Date().toISOString().split("T")[0],
          }),
        }}
      />

      {/* Client: theme toggle + category filter + search */}
      <HomeClient />
    </div>
  );
}
