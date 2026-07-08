// app/not-found.tsx
// Custom 404 page — helps with UX and SEO (reduces bounce rate from broken links)

import Link from "next/link";

export const metadata = {
  title: "Page Not Found — SarkariPixels",
  description: "The page you're looking for doesn't exist. Browse our 88 free photo editing tools for government exam applications.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      {/* Header */}
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
            >
              S
            </div>
            <span className="text-base font-bold" style={{ color: "var(--color-text)" }}>SarkariPixels</span>
          </a>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center" style={{ color: "var(--color-text)" }}>
        {/* Large 404 */}
        <div
          className="text-8xl sm:text-9xl font-black mb-4"
          style={{ color: "var(--color-accent)", opacity: 0.15, letterSpacing: "-4px" }}
        >
          404
        </div>

        <h1 className="t-h1 mb-3" style={{ marginTop: "-2rem" }}>Page Not Found</h1>
        <p className="t-body mb-8" style={{ color: "var(--color-muted)", maxWidth: "420px", margin: "0 auto 2rem" }}>
          Yeh page exist nahi karta ya hata diya gaya hai.
          Neeche kuch useful links hain jo aapki madad kar sakte hain.
        </p>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          {[
            { href: "/", icon: "fa-house", label: "All Tools", desc: "Browse 88 tools" },
            { href: "/exam-specs", icon: "fa-clipboard-list", label: "Exam Specs", desc: "Photo requirements" },
            { href: "/guides", icon: "fa-book-open", label: "Guides", desc: "Step-by-step help" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="card p-4 text-center"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                textDecoration: "none",
                transition: "border-color 0.2s, transform 0.2s",
              }}
            >
              <i
                className={`fa-solid ${link.icon} mb-2`}
                style={{ color: "var(--color-accent)", fontSize: "20px" }}
                aria-hidden="true"
              />
              <div className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>{link.label}</div>
              <div className="text-xs" style={{ color: "var(--color-muted)" }}>{link.desc}</div>
            </a>
          ))}
        </div>

        {/* Popular Tools */}
        <div className="text-left">
          <h2 className="t-h3 mb-3">Popular Tools</h2>
          <ul className="space-y-1.5 text-sm">
            {[
              { href: "/tool/compress-50", label: "Compress Photo to 50KB" },
              { href: "/tool/ssc-photo", label: "SSC Photo Resize" },
              { href: "/tool/upsc-photo-resize", label: "UPSC Photo Resize" },
              { href: "/tool/passport-photo", label: "Passport Photo Maker" },
              { href: "/tool/smart-resizer", label: "Smart Image Resizer" },
              { href: "/tool/convert-dpi", label: "DPI Converter" },
            ].map((link) => (
              <li key={link.href}>
                <a href={link.href} style={{ color: "var(--color-accent)" }}>
                  <i className="fa-solid fa-arrow-right mr-2" style={{ fontSize: "10px" }} aria-hidden="true" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="mt-16 border-t py-8 px-4 sm:px-6"
        style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="/" className="text-base font-bold" style={{ color: "var(--color-text)" }}>SarkariPixels</a>
          <p className="t-caption">© {new Date().getFullYear()} SarkariPixels · 100% Client-Side</p>
          <div className="flex gap-4">
            {[
              { href: "/page/privacy", label: "Privacy" },
              { href: "/page/about", label: "About" },
              { href: "/", label: "All Tools" },
            ].map((link) => (
              <a key={link.href} href={link.href} className="t-caption" style={{ color: "var(--color-muted)" }}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
