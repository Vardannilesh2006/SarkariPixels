import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sarkaripixels.vercel.app";

export const metadata: Metadata = {
  title: "Guides — SSC UPSC Exam Photo Tips | SarkariPixels",
  description: "How-to guides for exam photo preparation. Why photos get rejected, exact sizes for SSC UPSC BPSC RRB, step-by-step tutorials.",
  alternates: { canonical: `${SITE_URL}/guides` },
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
    title: "IBPS Bank PO/Clerk Photo Size — 2024-25 Complete Guide",
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

export default function GuidesPage() {
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
          <a href="/" className="text-xs text-slate-400 hover:text-indigo-600">← All Tools</a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
          Guides & How-To Articles
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mb-8">
          Real answers to real exam photo problems — written by people who&apos;ve actually dealt with portal rejection errors.
        </p>

        <div className="space-y-4">
          {GUIDES.map((guide) => (
            <a
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="block bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full px-2 py-0.5">
                      {guide.category}
                    </span>
                    <span className="text-xs text-slate-400">{guide.readTime} read</span>
                    <span className="text-xs text-slate-400">· {guide.date}</span>
                  </div>
                  <h2 className="font-black text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                    {guide.title}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{guide.desc}</p>
                </div>
                <i className="fa-solid fa-arrow-right text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors mt-1 flex-shrink-0" />
              </div>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}
