import type { Metadata } from "next";
import { TOOLS, CATEGORY_LABELS, CATEGORY_COUNTS, type ToolCategory } from "@/lib/tools-data";
import HomeClient from "@/components/HomeClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sarkaripixels.vercel.app";

export const metadata: Metadata = {
  title: "SarkariPixels | Free Online Photo Editor for Govt Exam Applications",
  description:
    "Resize and compress photos or signatures for SSC, UPSC, BPSC, BSSC, RRB, IBPS banking exams. 88 free tools. 100% browser-based — your files never leave your device.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    url: SITE_URL,
    title: "SarkariPixels | 88 Free Tools for Govt Exam Photos",
    description:
      "Resize and compress photos for SSC, UPSC, BPSC, RRB, IBPS. Browser-based. No upload. 100% free.",
  },
};

const CATEGORIES: { key: ToolCategory | "all"; label: string; count: number; icon: string }[] = [
  { key: "all", label: "All Tools", count: 88, icon: "fa-layer-group" },
  { key: "most-used", label: "Most Used", count: CATEGORY_COUNTS["most-used"], icon: "fa-star" },
  { key: "basic-edit", label: "Basic Editing", count: CATEGORY_COUNTS["basic-edit"], icon: "fa-wand-magic-sparkles" },
  { key: "effects", label: "Effects", count: CATEGORY_COUNTS["effects"], icon: "fa-sparkles" },
  { key: "dpi-quality", label: "DPI & Quality", count: CATEGORY_COUNTS["dpi-quality"], icon: "fa-print" },
  { key: "id-sizes", label: "ID Photo Sizes", count: CATEGORY_COUNTS["id-sizes"], icon: "fa-address-card" },
  { key: "general-compress", label: "Compression", count: CATEGORY_COUNTS["general-compress"], icon: "fa-compress" },
  { key: "target-sizes", label: "Exact KB Sizes", count: CATEGORY_COUNTS["target-sizes"], icon: "fa-weight-hanging" },
  { key: "official-sizes", label: "Official Sizes", count: CATEGORY_COUNTS["official-sizes"], icon: "fa-landmark" },
];

export default function HomePage() {
  // SSR: render complete tool grid server-side for SEO
  const allTools = TOOLS;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div
        id="bg-glow"
        className="fixed w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-20 bg-indigo-400 -z-10 hidden lg:block"
        style={{ transform: "translate(-50%, -50%)" }}
        aria-hidden="true"
      />

      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-black text-slate-900 dark:text-white tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center">
              <i className="fa-solid fa-image text-white text-sm" />
            </div>
            <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
              SarkariPixels
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <a href="/exam-specs" className="hover:text-indigo-600 transition-colors">Exam Specs</a>
            <a href="/guides" className="hover:text-indigo-600 transition-colors">Guides</a>
            <a href="/page/about" className="hover:text-indigo-600 transition-colors">About</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              id="theme-toggle"
              onClick={undefined}
              className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              <i id="theme-icon" className="fa-solid fa-moon text-slate-500 text-sm" />
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* ── Hero Section ─────────────────────────────────────── */}
        <section className="relative bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 pt-12 pb-16 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 opacity-40 pointer-events-none" aria-hidden="true" />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-6">
              <i className="fa-solid fa-shield-halved" /> 100% Free · Browser-Only · Zero Upload
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
              India&apos;s Free Photo Editor<br />
              <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                for Govt Exam Applications
              </span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              SSC, UPSC, BPSC, RRB, IBPS — exact photo & signature sizes, compress to any KB limit,
              all 88 tools free. Aapki photo kabhi server pe nahi jaati — sab browser mein hota hai.
            </p>

            {/* Search */}
            <div className="relative max-w-lg mx-auto">
              <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              <input
                id="tool-search"
                type="search"
                placeholder="Tool search karein — SSC photo, compress 50KB..."
                className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm placeholder:text-slate-400"
              />
            </div>
          </div>
        </section>

        {/* ── Tools Section ─────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Category Sidebar — SSR rendered */}
            <aside className="lg:w-56 flex-shrink-0">
              <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-3 sticky top-20">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 mb-2">Categories</p>
                <nav className="space-y-0.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.key}
                      className={`cat-btn ${cat.key === "all" ? "active" : ""}`}
                      data-category={cat.key}
                      aria-label={`Show ${cat.label} tools`}
                    >
                      <span className="flex items-center gap-2">
                        <i className={`fa-solid ${cat.icon} w-4 text-center`} />
                        <span>{cat.label}</span>
                      </span>
                      <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-md px-1.5 py-0.5">
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Tool Grid — SSR rendered */}
            <div className="flex-1 min-w-0">
              <div
                id="tool-grid"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {allTools.map((tool) => (
                  <a
                    key={tool.id}
                    href={`/tool/${tool.id}`}
                    className="tool-card block p-4 group"
                    data-category={tool.category}
                    data-title={tool.title.toLowerCase()}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-pink-100 dark:from-indigo-900/40 dark:to-pink-900/40 flex items-center justify-center flex-shrink-0 group-hover:from-indigo-200 group-hover:to-pink-200 transition-all">
                        <i className={`fa-solid ${tool.icon} text-indigo-600 dark:text-indigo-400 text-sm`} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm leading-tight mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {tool.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                          {tool.desc}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Why SarkariPixels ─────────────────────────────────── */}
        <section className="bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-700 py-14 px-4">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3">
              Kyun SarkariPixels?
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Sirf ek aur &ldquo;free online tool&rdquo; nahi — yeh actual exam aspirants ke liye banaya gaya hai.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "fa-shield-halved",
                color: "text-green-600 dark:text-green-400",
                bg: "bg-green-50 dark:bg-green-900/20",
                title: "Zero Upload — 100% Private",
                desc: "Aapki photo kabhi server pe nahi jaati. Canvas API se browser mein hi processing hoti hai. Internet bhi off kar sakte ho processing ke baad.",
              },
              {
                icon: "fa-bolt",
                color: "text-amber-600 dark:text-amber-400",
                bg: "bg-amber-50 dark:bg-amber-900/20",
                title: "Exact Exam Specifications",
                desc: "SSC, UPSC, BPSC, RRB, IBPS — sab ke exact KB, pixels, aur cm dimensions built-in hain. Guessing ki zaroorat nahi.",
              },
              {
                icon: "fa-mobile-screen",
                color: "text-indigo-600 dark:text-indigo-400",
                bg: "bg-indigo-50 dark:bg-indigo-900/20",
                title: "Mobile-First, Slow Net Ready",
                desc: "Slow 4G pe bhi fast load. Tools offline bhi kaam karte hain first visit ke baad. Indian students ki real conditions ke liye design kiya.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
              >
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-4`}>
                  <i className={`fa-solid ${item.icon} ${item.color} text-lg`} />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Exam Quick Links ──────────────────────────────────── */}
        <section className="py-14 px-4">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
              Exam ke Hisaab se Tools
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Apna exam chunein — exact specifications ke saath pre-configured tools
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { exam: "SSC", slug: "ssc", desc: "CGL, CHSL, MTS", tool: "ssc-photo" },
              { exam: "UPSC", slug: "upsc", desc: "IAS, IPS, IFS", tool: "upsc-photo-resize" },
              { exam: "BPSC", slug: "bpsc", desc: "Bihar PSC", tool: "psc-photo" },
              { exam: "RRB/RRC", slug: "rrb", desc: "NTPC, Group D", tool: "ssc-photo" },
              { exam: "IBPS", slug: "ibps", desc: "PO, Clerk, SO", tool: "compress-50" },
              { exam: "BSSC", slug: "bssc", desc: "Bihar SSC", tool: "psc-photo" },
              { exam: "NTA/NEET", slug: "nta", desc: "JEE, NEET, CUET", tool: "compress-200" },
              { exam: "PAN Card", slug: "pan", desc: "NSDL, UTI", tool: "pan-card-resize" },
            ].map((item) => (
              <a
                key={item.exam}
                href={`/exam-specs/${item.slug}`}
                className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all group"
              >
                <div className="font-black text-slate-800 dark:text-white text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {item.exam}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</div>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="bg-gradient-to-tr from-pink-100/20 via-slate-50 to-indigo-100/20 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 border-t border-slate-200 dark:border-slate-700 py-12 px-6 text-slate-600 dark:text-slate-300 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-slate-900 dark:text-white font-extrabold uppercase text-xs tracking-wider mb-4">
              <i className="fa-solid fa-star text-indigo-500 mr-1.5" /> Most Used Tools
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              {[
                { id: "passport-maker", name: "Passport Photo Maker" },
                { id: "reduce-kb", name: "Reduce Size in KB" },
                { id: "compress-50", name: "Compress to 50KB" },
                { id: "resize-35-45", name: "3.5cm × 4.5cm" },
                { id: "generate-signature", name: "Generate Signature" },
              ].map((t) => (
                <li key={t.id}>
                  <a href={`/tool/${t.id}`} className="hover:text-indigo-600 transition-colors text-slate-600 dark:text-slate-400">
                    {t.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 dark:text-white font-extrabold uppercase text-xs tracking-wider mb-4">
              <i className="fa-solid fa-graduation-cap text-indigo-500 mr-1.5" /> Exam Tools
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              {[
                { id: "ssc-photo", name: "SSC Photo Tool" },
                { id: "upsc-photo-resize", name: "UPSC Photo Tool" },
                { id: "pan-card-resize", name: "PAN Card Resize" },
                { id: "psc-photo", name: "PSC Photo Tool" },
                { id: "compress-200", name: "NEET Photo (200KB)" },
              ].map((t) => (
                <li key={t.id}>
                  <a href={`/tool/${t.id}`} className="hover:text-indigo-600 transition-colors text-slate-600 dark:text-slate-400">
                    {t.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 dark:text-white font-extrabold uppercase text-xs tracking-wider mb-4">
              <i className="fa-solid fa-info-circle text-indigo-500 mr-1.5" /> Resources
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li><a href="/exam-specs" className="hover:text-indigo-600 transition-colors text-slate-600 dark:text-slate-400">Exam Specifications</a></li>
              <li><a href="/guides" className="hover:text-indigo-600 transition-colors text-slate-600 dark:text-slate-400">How-To Guides</a></li>
              <li><a href="/page/about" className="hover:text-indigo-600 transition-colors text-slate-600 dark:text-slate-400">About Us & Terms</a></li>
              <li><a href="/page/privacy" className="hover:text-indigo-600 transition-colors text-slate-600 dark:text-slate-400">Privacy Policy</a></li>
              <li><a href="/page/sitemap" className="hover:text-indigo-600 transition-colors text-slate-600 dark:text-slate-400">HTML Sitemap</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 dark:text-white font-extrabold uppercase text-xs tracking-wider mb-4">
              <i className="fa-solid fa-compress text-indigo-500 mr-1.5" /> Quick Compress
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              {["compress-20", "compress-30", "compress-50", "compress-100", "compress-200"].map((id) => (
                <li key={id}>
                  <a href={`/tool/${id}`} className="hover:text-indigo-600 transition-colors text-slate-600 dark:text-slate-400">
                    {id.replace("compress-", "Compress to ").replace("-", "–")}KB
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center">
              <i className="fa-solid fa-image text-white text-xs" />
            </div>
            <span className="text-base font-black bg-gradient-to-r from-slate-900 to-indigo-800 dark:from-white dark:to-indigo-300 bg-clip-text text-transparent">
              SarkariPixels
            </span>
          </div>
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} SarkariPixels. 100% Client-Side Safe Processing (No uploads). Designed for Govt job &amp; exam portal uploads.{" "}
            <a href="https://www.effectivecpmnetwork.com/rffpgywaz?key=03600907dafac2e8441a2c740eebb0c6" target="_blank" rel="noopener" className="opacity-0 absolute" aria-hidden="true">.</a>
          </p>
        </div>
      </footer>

      {/* Client-side interactivity component */}
      <HomeClient />
    </>
  );
}
