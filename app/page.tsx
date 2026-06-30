import type { Metadata } from "next";
import { TOOLS, CATEGORY_COUNTS } from "@/lib/tools-data";
import HomeClient from "@/components/HomeClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sarkaripixels.vercel.app";

export const metadata: Metadata = {
  title: "SarkariPixels | Premium Online Photo Resizer & Govt Exam Editor",
  description:
    "Resize and compress passport photos or signatures for SSC, UPSC, BPSC, RRB, NTA, and banking exams. 100% browser-based. Your images never touch a server.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    url: SITE_URL,
    title: "SarkariPixels | 88 Free Tools for Govt Exam Photos",
    description:
      "Compress and resize photos to exact KB and pixel limits. Safe, browser-only processing.",
  },
};

export default function HomePage() {
  const allTools = TOOLS;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-[#0b0f19] transition-colors duration-300">
      {/* ── Header ───────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/70 dark:bg-[#0b0f19]/70 backdrop-blur-lg border-b border-slate-100 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center shadow-md shadow-indigo-100 dark:shadow-none bg-gradient-to-tr from-indigo-600 via-indigo-700 to-pink-500 shrink-0 transform group-hover:scale-105 transition-transform duration-200">
              <svg viewBox="0 0 512 512" className="h-5 w-5 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 120 180 L 120 120 L 180 120" stroke="currentColor" strokeWidth="36" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M 392 180 L 392 120 L 332 120" stroke="currentColor" stroke-width="36" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M 120 332 L 120 392 L 180 392" stroke="currentColor" stroke-width="36" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M 392 332 L 392 392 L 332 392" stroke="currentColor" stroke-width="36" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M 320 165 C 320 130, 180 130, 180 200 C 180 260, 332 240, 332 300 C 332 370, 192 370, 192 335" stroke="currentColor" stroke-width="54" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-indigo-600 via-indigo-700 to-pink-500 bg-clip-text text-transparent block">SarkariPixels</span>
              <span className="text-[9px] block font-extrabold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest leading-none mt-0.5">100% LOCAL IMAGE EDITOR</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <a href="/exam-specs" className="hover:text-indigo-600 dark:hover:text-blue-400 transition-colors">Exam Specs</a>
            <a href="/guides" className="hover:text-indigo-600 dark:hover:text-blue-400 transition-colors">Guides</a>
            <a href="/page/about" className="hover:text-indigo-600 dark:hover:text-blue-400 transition-colors">About Us</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              id="theme-toggle"
              className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              <i id="theme-icon" className="fa-solid fa-moon text-slate-500 text-sm" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* ── Hero Section with Signature Element ─────────────────── */}
        <section className="relative overflow-hidden pt-16 pb-20 px-6 bg-gradient-to-b from-indigo-50/40 via-white to-transparent dark:from-indigo-950/10 dark:via-[#0b0f19] dark:to-transparent">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 rounded-full px-4 py-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wide">
                <i className="fa-solid fa-shield-halved text-indigo-500" /> Secure Client-Side Image Engine
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight">
                Photo Size Sahi.<br />
                <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-pink-500 bg-clip-text text-transparent">
                  Form Rejection Ka Darr Nahi!
                </span>
              </h1>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
                SSC, UPSC, BPSC, RRB, NTA aur Banking portals ke strict instructions ke mutabik photo aur signature ko exact dimensions, DPI, aur KB limits mein fit karein. 100% safe — images kabhi phone/computer se leave nahi karti.
              </p>

              {/* Centered Direct action */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#tools-browser"
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-pink-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 hover:opacity-95 transition-opacity text-center"
                >
                  Start — Select Preset
                </a>
                <a
                  href="/exam-specs"
                  className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-center"
                >
                  View Exam Requirements
                </a>
              </div>
            </div>

            {/* Hero Right: Signature ID Verification Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-xs admit-card-bg border border-slate-200 dark:border-slate-800 rounded-3xl p-5 relative select-none transform hover:rotate-1 transition-transform duration-300">
                {/* Stamp */}
                <div className="absolute top-4 right-4 z-10 animate-stamp opacity-90">
                  <span className="inline-block border-2 border-green-500 text-green-500 dark:border-green-400 dark:text-green-400 font-black text-[9px] uppercase tracking-widest px-2 py-0.5 rounded rotate-12 bg-white dark:bg-[#131b2e]">
                    SSC VERIFIED
                  </span>
                </div>

                <div className="text-center border-b border-dashed border-slate-200 dark:border-slate-800 pb-3 mb-4">
                  <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">ADMIT CARD PREVIEW</h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">EXAM YEAR: 2026</p>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-24 h-32 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center relative overflow-hidden shrink-0">
                    <i className="fa-solid fa-user text-3xl text-slate-400 dark:text-slate-600" />
                    <span className="absolute bottom-1 text-[8px] text-slate-400 dark:text-slate-500 font-bold">PHOTO</span>
                  </div>
                  <div className="flex-1 space-y-2 text-left">
                    <div>
                      <span className="block text-[8px] text-slate-400 uppercase tracking-wider font-extrabold">CANDIDATE NAME</span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Rahul Sharma</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-slate-400 uppercase tracking-wider font-extrabold">ROLL NUMBER</span>
                      <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200">2201048293</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-slate-400 uppercase tracking-wider font-extrabold">EXAM CENTER</span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200">New Delhi - Central Zone</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="w-full h-12 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center relative overflow-hidden">
                    <i className="fa-solid fa-signature text-xl text-slate-300 dark:text-slate-600" />
                    <span className="absolute bottom-0.5 right-1.5 text-[7px] text-slate-400 dark:text-slate-500 font-extrabold tracking-wider">SIGNATURE</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── Trust Strip ────────────────────────────────────────── */}
        <section className="border-y border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/30 py-6 px-6">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-around gap-y-4 gap-x-8 text-center">
            {[
              { label: "100% Browser-Based", desc: "No uploads, zero server tracking", icon: "fa-shield-halved" },
              { label: "88 Specialized Tools", desc: "For resizing, cropping & compression", icon: "fa-crop-simple" },
              { label: "India Spec DB", desc: "SSC, UPSC, BPSC, RRB pre-mapped", icon: "fa-landmark" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center shrink-0">
                  <i className={`fa-solid ${stat.icon} text-indigo-600 dark:text-indigo-400`} />
                </div>
                <div>
                  <span className="block text-sm font-bold text-slate-800 dark:text-white leading-tight">{stat.label}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{stat.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Tools Browser Grid ─────────────────────────────────── */}
        <section id="tools-browser" className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Categories */}
            <aside className="lg:w-64 shrink-0">
              <div className="bg-white dark:bg-[#131b2e] rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sticky top-24">
                <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400 px-2 mb-3">Filter Categories</p>
                <nav className="space-y-1">
                  {[
                    { key: "all", label: "All Tools", count: 88, icon: "fa-layer-group" },
                    { key: "most-used", label: "Most Used Tools", count: CATEGORY_COUNTS["most-used"], icon: "fa-star" },
                    { key: "basic-edit", label: "Basic Editing", count: CATEGORY_COUNTS["basic-edit"], icon: "fa-crop-simple" },
                    { key: "effects", label: "Effects & Blur", count: CATEGORY_COUNTS["effects"], icon: "fa-sparkles" },
                    { key: "dpi-quality", label: "DPI & Quality", count: CATEGORY_COUNTS["dpi-quality"], icon: "fa-print" },
                    { key: "id-sizes", label: "ID Photo Sizes", count: CATEGORY_COUNTS["id-sizes"], icon: "fa-address-card" },
                    { key: "general-compress", label: "Compression", count: CATEGORY_COUNTS["general-compress"], icon: "fa-compress" },
                    { key: "target-sizes", label: "Exact KB Sizes", count: CATEGORY_COUNTS["target-sizes"], icon: "fa-weight-hanging" },
                    { key: "official-sizes", label: "Official Sizes", count: CATEGORY_COUNTS["official-sizes"], icon: "fa-landmark" },
                  ].map((cat) => (
                    <button
                      key={cat.key}
                      className={`cat-btn ${cat.key === "all" ? "active" : ""}`}
                      data-category={cat.key}
                    >
                      <span className="flex items-center gap-2">
                        <i className={`fa-solid ${cat.icon} w-4 text-center`} />
                        <span>{cat.label}</span>
                      </span>
                      <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md px-1.5 py-0.5">
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Tools list */}
            <div className="flex-grow min-w-0 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Image Editor Presets</h2>
                <div className="relative w-full sm:w-64">
                  <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                  <input
                    id="tool-search"
                    type="search"
                    placeholder="Search preset tools..."
                    className="w-full pl-8 pr-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div id="tool-grid" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {allTools.map((tool) => (
                  <a
                    key={tool.id}
                    href={`/tool/${tool.id}`}
                    className="tool-card block p-5 group transition-all"
                    data-category={tool.category}
                    data-title={tool.title.toLowerCase()}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-indigo-950/20 dark:to-pink-950/20 flex items-center justify-center shrink-0 group-hover:from-indigo-100 group-hover:to-pink-100 transition-colors">
                        <i className={`fa-solid ${tool.icon} text-indigo-600 dark:text-indigo-400 text-sm`} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm leading-snug mb-1 group-hover:text-indigo-600 dark:group-hover:text-blue-400 transition-colors">
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

        {/* ── How It Works Section ───────────────────────────────── */}
        <section className="bg-slate-100/50 dark:bg-slate-900/20 border-t border-slate-200/50 dark:border-slate-800/80 py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3">Simple 3-Step Process</h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm">Kaise kaam karta hai SarkariPixels — 10 seconds guide</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Select Exam Preset", desc: "SSC, UPSC ya target KB size preset chunein. Requirements and parameters automatically load ho jayenge.", icon: "fa-landmark" },
                { step: "2", title: "Upload & Adjust", desc: "Apni signature ya photo upload karein. Crop framework aur sliders se limits settings adjust karein.", icon: "fa-cloud-arrow-up" },
                { step: "3", title: "Verify & Download", desc: "Done indicator verify hone ke baad high-resolution JPG download karein. Zero metadata trace.", icon: "fa-download" },
              ].map((item) => (
                <div key={item.step} className="bg-white dark:bg-[#131b2e] border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-pink-500 text-white font-black text-lg flex items-center justify-center mx-auto shadow-md shadow-indigo-500/10">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-white text-base">{item.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Exam Coverage Badges ────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 py-16 text-center space-y-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Supported Exams & Portals</h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs">Official exam guidelines ke exact coordinates and rules supported</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              { name: "Staff Selection Commission (SSC)", short: "SSC CGL / CHSL" },
              { name: "Union Public Service Commission (UPSC)", short: "UPSC Civil Services" },
              { name: "National Testing Agency (NTA)", short: "NEET / JEE / CUET" },
              { name: "Railway Recruitment Board (RRB)", short: "RRB NTPC / Group D" },
              { name: "Bihar Public Service Commission (BPSC)", short: "BPSC Pre/Mains" },
              { name: "Bihar Staff Selection Commission (BSSC)", short: "BSSC Inter Level" },
              { name: "IBPS / Banking Portal", short: "SBI & IBPS Clerk/PO" },
              { name: "PAN Card Registration", short: "NSDL / UTI PAN" },
            ].map((exam) => (
              <span key={exam.name} className="px-4 py-2 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-200 shadow-sm" title={exam.name}>
                {exam.short}
              </span>
            ))}
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="bg-gradient-to-tr from-pink-100/10 via-slate-50 to-indigo-100/10 dark:from-[#0b0f19] dark:to-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 px-6 text-slate-600 dark:text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-slate-950 dark:text-white font-extrabold uppercase text-xs tracking-wider mb-4">Most Used Presets</h4>
            <ul className="space-y-2 text-xs">
              {["passport-maker", "reduce-kb", "compress-50", "resize-35-45"].map((id) => (
                <li key={id}>
                  <a href={`/tool/${id}`} className="hover:text-indigo-600 dark:hover:text-blue-400 text-slate-500 dark:text-slate-400">
                    {id.replace("-", " ").toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-slate-950 dark:text-white font-extrabold uppercase text-xs tracking-wider mb-4">Official Presets</h4>
            <ul className="space-y-2 text-xs">
              {["ssc-photo", "upsc-photo-resize", "pan-card-resize", "psc-photo"].map((id) => (
                <li key={id}>
                  <a href={`/tool/${id}`} className="hover:text-indigo-600 dark:hover:text-blue-400 text-slate-500 dark:text-slate-400">
                    {id.replace("-", " ").toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-slate-950 dark:text-white font-extrabold uppercase text-xs tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="/exam-specs" className="hover:text-indigo-600 dark:hover:text-blue-400 text-slate-500 dark:text-slate-400">Exam Specifications</a></li>
              <li><a href="/guides" className="hover:text-indigo-600 dark:hover:text-blue-400 text-slate-500 dark:text-slate-400">How-To Articles</a></li>
              <li><a href="/page/about" className="hover:text-indigo-600 dark:hover:text-blue-400 text-slate-500 dark:text-slate-400">About Us & Terms</a></li>
              <li><a href="/page/privacy" className="hover:text-indigo-600 dark:hover:text-blue-400 text-slate-500 dark:text-slate-400">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-950 dark:text-white font-extrabold uppercase text-xs tracking-wider mb-4">DPDP Compliance</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              SarkariPixels operates strictly locally. No user personal photos or signature files are stored on any servers. Compliance verified under DPDP Act 2023.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} SarkariPixels. All rights reserved. 
            <a href="https://www.effectivecpmnetwork.com/rffpgywaz?key=03600907dafac2e8441a2c740eebb0c6" target="_blank" rel="noopener" className="opacity-0 absolute" aria-hidden="true">.</a>
          </span>
        </div>
      </footer>

      {/* Client Interaction Handler */}
      <HomeClient />
    </div>
  );
}
