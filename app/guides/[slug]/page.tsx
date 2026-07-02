// app/guides/[slug]/page.tsx
// Individual guide pages — 5 articles covering top exam photo questions.
// Each has unique title, meta, H1, full content, FAQPage + BreadcrumbList + Article schema.

import type { Metadata } from "next";
import { notFound } from "next/navigation";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sarkaripixels.vercel.app";

interface Props {
  params: Promise<{ slug: string }>;
}

// ── Guide content data ────────────────────────────────────────────────────────
const GUIDES: Record<string, {
  title: string;
  metaTitle: string;
  metaDesc: string;
  category: string;
  date: string;
  dateISO: string;
  readTime: string;
  content: React.FC;
}> = {
  "ssc-cgl-photo-rejection": {
    title: "SSC CGL Photo Reject Kyun Hoti Hai? 7 Common Reasons",
    metaTitle: "SSC CGL Photo Reject Kyun Hoti Hai? 7 Reasons & Fixes | SarkariPixels",
    metaDesc: "SSC portal pe photo reject ho rahi hai? Yeh 7 most common reasons hain — file size badi, wrong dimensions, wrong background, blurry photo — aur har ka fix.",
    category: "SSC",
    date: "June 2026",
    dateISO: "2026-06-01",
    readTime: "4 min",
    content: SSCRejectionGuide,
  },
  "upsc-photo-requirements-2026": {
    title: "UPSC Photo Requirements 2026 — Complete Guide",
    metaTitle: "UPSC Photo Size Requirements 2026 — KB, Pixels, Format | SarkariPixels",
    metaDesc: "UPSC CSE 2026 ke liye photo size, KB limit, format aur background requirements — square crop, name stamp requirement — sab verified information ek jagah.",
    category: "UPSC",
    date: "June 2026",
    dateISO: "2026-06-01",
    readTime: "5 min",
    content: UPSCGuide,
  },
  "compress-photo-under-50kb": {
    title: "Photo Ko 50KB Se Kam Kaise Karein — Step by Step",
    metaTitle: "Photo Ko 50KB Se Kam Kaise Karein — Free Tool | SarkariPixels",
    metaDesc: "Mobile se li 3MB photo ko 50KB ya 20KB mein kaise compress karein bina quality loss ke — step by step guide with free browser tool.",
    category: "How-To",
    date: "June 2026",
    dateISO: "2026-06-01",
    readTime: "3 min",
    content: CompressGuide,
  },
  "ibps-photo-size-guide": {
    title: "IBPS Bank PO/Clerk Photo Size — 2026 Complete Guide",
    metaTitle: "IBPS PO Clerk Photo & Signature Size 2026 | SarkariPixels",
    metaDesc: "IBPS PO, Clerk, SO, RRB Officer sab ke liye photo aur signature exact size, KB limit, format — 2026 verified requirements ek jagah.",
    category: "IBPS",
    date: "June 2026",
    dateISO: "2026-06-01",
    readTime: "4 min",
    content: IBPSGuide,
  },
  "pan-card-photo-dpi-300": {
    title: "PAN Card Photo Ka DPI 300 Kaise Set Karein",
    metaTitle: "PAN Card Photo DPI 300 Set Kaise Karein — NSDL UTI | SarkariPixels",
    metaDesc: "NSDL aur UTI PAN card application mein DPI 300 mandatory hai. Yeh guide mein bataya gaya hai ki free tool se 2 steps mein DPI kaise fix karein.",
    category: "PAN Card",
    date: "June 2026",
    dateISO: "2026-06-01",
    readTime: "2 min",
    content: PANGuide,
  },
};

export async function generateStaticParams() {
  return Object.keys(GUIDES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES[slug];
  if (!guide) return { title: "Guide Not Found" };
  const url = `${SITE_URL}/guides/${slug}`;
  return {
    title: guide.metaTitle,
    description: guide.metaDesc,
    alternates: { canonical: url, languages: { "en-IN": url } },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDesc,
      url,
      type: "article",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = GUIDES[slug];
  if (!guide) notFound();

  const canonicalUrl = `${SITE_URL}/guides/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": canonicalUrl,
    headline: guide.title,
    description: guide.metaDesc,
    datePublished: guide.dateISO,
    dateModified: guide.dateISO,
    url: canonicalUrl,
    inLanguage: "en-IN",
    publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "SarkariPixels" },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
      { "@type": "ListItem", position: 3, name: guide.title, item: canonicalUrl },
    ],
  };

  const ContentComponent = guide.content;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b" style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          <a href="/" className="flex items-center gap-2.5 shrink-0" aria-label="SarkariPixels — go to homepage">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black" style={{ backgroundColor: "var(--color-accent)" }} aria-hidden="true">S</div>
            <span className="text-base font-bold" style={{ color: "var(--color-text)" }}>SarkariPixels</span>
          </a>
          <a href="/guides" className="nav-link text-sm font-medium">← All Guides</a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10" style={{ color: "var(--color-text)" }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 flex-wrap" style={{ fontSize: "0.8125rem", color: "var(--color-muted)" }}>
            <li><a href="/" style={{ color: "var(--color-muted)" }}>Home</a></li>
            <li aria-hidden="true">/</li>
            <li><a href="/guides" style={{ color: "var(--color-muted)" }}>Guides</a></li>
            <li aria-hidden="true">/</li>
            <li style={{ color: "var(--color-text)", fontWeight: 500 }} aria-current="page">{guide.category}</li>
          </ol>
        </nav>

        {/* Article meta */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ backgroundColor: "#eff6ff", color: "var(--color-accent)" }}>{guide.category}</span>
          <span className="t-caption">{guide.readTime} read</span>
          <span className="t-caption">· {guide.date}</span>
        </div>

        <h1 className="t-h1 mb-8">{guide.title}</h1>

        <ContentComponent />

        {/* CTA */}
        <div className="card p-6 mt-10" style={{ backgroundColor: "var(--color-surface)", textAlign: "center" }}>
          <p className="font-semibold mb-3" style={{ color: "var(--color-text)" }}>Ready to resize your photo?</p>
          <a href="/" className="btn btn-primary" style={{ fontSize: "0.9375rem", padding: "12px 28px" }}>
            <i className="fa-solid fa-wand-magic-sparkles mr-2" aria-hidden="true" />
            Open SarkariPixels Tools →
          </a>
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

// ── Article content components ────────────────────────────────────────────────

function ArticleSection({ children }: { children: React.ReactNode }) {
  return <div className="space-y-5" style={{ color: "var(--color-muted)", lineHeight: "1.8", fontSize: "0.9375rem" }}>{children}</div>;
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="t-h3 mt-8 mb-3" style={{ color: "var(--color-text)" }}>{children}</h2>;
}

function SpecTable({ rows }: { rows: [string, string][] }) {
  return (
    <table className="w-full text-sm my-4 card overflow-hidden" style={{ borderCollapse: "collapse" }}>
      <tbody>
        {rows.map(([k, v]) => (
          <tr key={k} style={{ borderBottom: "1px solid var(--color-border)" }}>
            <td className="py-2.5 px-4 font-semibold w-40" style={{ color: "var(--color-muted)", backgroundColor: "var(--color-surface)" }}>{k}</td>
            <td className="py-2.5 px-4 font-medium" style={{ color: "var(--color-text)" }}>{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ── Guide 1: SSC CGL Photo Rejection ─────────────────────────────────────────
function SSCRejectionGuide() {
  return (
    <ArticleSection>
      <p>SSC CGL, CHSL, MTS ya kisi bhi SSC exam ka form fill karte waqt photo rejection sabse frustrating experience hota hai. Portal clearly nahi batata ki exactly kya galat hai — bas "photo invalid" ya "file not accepted" message aata hai.</p>
      <p>Yahan 7 most common reasons hain aur unka direct fix:</p>

      <H2>1. File Size Too Large</H2>
      <p><strong style={{ color: "var(--color-text)" }}>Reason:</strong> SSC portal maximum 50KB accept karta hai. Mobile camera ki photo 2MB–8MB hoti hai.</p>
      <p><strong style={{ color: "var(--color-text)" }}>Fix:</strong> <a href="/tool/compress-50" style={{ color: "var(--color-accent)" }}>Compress to 50KB tool</a> use karo — automatically sahi size mein compress kar dega.</p>

      <H2>2. Wrong Dimensions</H2>
      <p><strong style={{ color: "var(--color-text)" }}>Reason:</strong> SSC ke liye exact dimension: 3.5 cm × 4.5 cm (approximately 413 × 531 pixels at 300 DPI).</p>
      <p><strong style={{ color: "var(--color-text)" }}>Fix:</strong> <a href="/tool/ssc-photo" style={{ color: "var(--color-accent)" }}>SSC Photo Resize tool</a> — pre-set dimensions ke saath.</p>

      <H2>3. Wrong Background Color</H2>
      <p><strong style={{ color: "var(--color-text)" }}>Reason:</strong> SSC white ya light-colored plain background maangta hai. Colorful ya patterned background se rejection hoti hai.</p>
      <p><strong style={{ color: "var(--color-text)" }}>Fix:</strong> <a href="/tool/remove-bg" style={{ color: "var(--color-accent)" }}>Background remove tool</a> se background replace karo.</p>

      <H2>4. File Format Wrong</H2>
      <p><strong style={{ color: "var(--color-text)" }}>Reason:</strong> SSC only JPG/JPEG accept karta hai. PNG, WEBP, HEIC rejected ho jaate hain.</p>
      <p><strong style={{ color: "var(--color-text)" }}>Fix:</strong> SarkariPixels ka koi bhi tool download karte waqt automatically JPG mein convert kar deta hai.</p>

      <H2>5. Face Not Clearly Visible</H2>
      <p><strong style={{ color: "var(--color-text)" }}>Reason:</strong> SSC ke guidelines mein face 70-80% of the frame hona chahiye. Full body ya half body photo reject hoti hai.</p>
      <p><strong style={{ color: "var(--color-text)" }}>Fix:</strong> Passport-size crop use karo — <a href="/tool/free-crop" style={{ color: "var(--color-accent)" }}>Free Crop tool</a>.</p>

      <H2>6. Photo Too Old or Not Recent</H2>
      <p><strong style={{ color: "var(--color-text)" }}>Reason:</strong> SSC notification mein usually "recent passport-size photograph" mention hota hai — generally 3-6 months se purani photo accept nahi hoti.</p>
      <p><strong style={{ color: "var(--color-text)" }}>Fix:</strong> Fresh photo click karo — clear daylight mein, plain wall background ke saath.</p>

      <H2>7. Blurry or Low Resolution</H2>
      <p><strong style={{ color: "var(--color-text)" }}>Reason:</strong> WhatsApp se download ki gai ya forwarded photos quality lose kar deti hain. 300 DPI se kum resolution ka photo portal reject karta hai.</p>
      <p><strong style={{ color: "var(--color-text)" }}>Fix:</strong> Original camera photo use karo, WhatsApp compressed version nahi. DPI check ke liye <a href="/tool/convert-dpi" style={{ color: "var(--color-accent)" }}>DPI Converter tool</a>.</p>

      <H2>SSC Photo Quick Reference</H2>
      <SpecTable rows={[
        ["Dimensions", "3.5 cm × 4.5 cm (413 × 531 px at 300 DPI)"],
        ["File Size", "20 KB – 50 KB"],
        ["Format", "JPG/JPEG only"],
        ["Background", "White or light plain color"],
        ["DPI", "300 DPI recommended"],
        ["Face area", "70-80% of frame"],
      ]} />
    </ArticleSection>
  );
}

// ── Guide 2: UPSC Photo Requirements ─────────────────────────────────────────
function UPSCGuide() {
  return (
    <ArticleSection>
      <p>UPSC CSE (Civil Services Examination) aur baaki UPSC exams ke liye photo requirements thodi alag hoti hain compared to SSC. Sabse important difference: <strong style={{ color: "var(--color-text)" }}>UPSC square format photo maangta hai</strong>.</p>

      <H2>UPSC Photo — Exact Requirements 2026</H2>
      <SpecTable rows={[
        ["Dimensions", "350 × 350 pixels (square)"],
        ["File Size", "20 KB – 300 KB"],
        ["Format", "JPG/JPEG"],
        ["Background", "White or light plain color"],
        ["Face", "Front-facing, clearly visible"],
      ]} />

      <H2>UPSC Signature — Exact Requirements 2026</H2>
      <SpecTable rows={[
        ["Dimensions", "350 × 100 pixels"],
        ["File Size", "10 KB – 100 KB"],
        ["Format", "JPG/JPEG"],
        ["Background", "White"],
      ]} />

      <H2>UPSC Photo Ke Liye Naam Ka Stamp Kab Chahiye?</H2>
      <p>Kuch UPSC exams ke admit card ya DAF (Detailed Application Form) ke liye photo ke neeche applicant ka naam likhna hota hai. Yeh requirement form instructions mein clearly mention hoti hai. Agar likha ho toh <a href="/tool/add-name-dob" style={{ color: "var(--color-accent)" }}>Name/DOB stamp tool</a> use karo.</p>

      <H2>Square Crop Kaise Karein?</H2>
      <p>UPSC ke 350×350 square format ke liye:</p>
      <ol className="list-decimal pl-5 space-y-1">
        <li><a href="/tool/upsc-photo-resize" style={{ color: "var(--color-accent)" }}>UPSC Photo Resize tool</a> open karo</li>
        <li>Photo upload karo</li>
        <li>Tool automatically 350×350 px square mein crop kar dega</li>
        <li>Download karo — JPG format mein</li>
      </ol>

      <H2>Common UPSC Photo Rejection Reasons</H2>
      <ul className="space-y-2">
        {[
          "Non-square photo upload karna (UPSC square maangta hai)",
          "File 300KB se badi hona",
          "Sunglasses ya koi accessory pehni hona",
          "Background plain white nahi hona",
          "Photo 6 months se purani hona",
        ].map((r) => (
          <li key={r} className="flex items-start gap-2">
            <i className="fa-solid fa-triangle-exclamation mt-1 shrink-0" style={{ color: "#f59e0b", fontSize: "13px" }} aria-hidden="true" />
            <span>{r}</span>
          </li>
        ))}
      </ul>
    </ArticleSection>
  );
}

// ── Guide 3: Compress Photo Under 50KB ───────────────────────────────────────
function CompressGuide() {
  return (
    <ArticleSection>
      <p>Mobile camera se photo typically 2MB se 8MB mein aati hai. Zyaadatar sarkari exam portals maximum 20KB, 50KB, ya 100KB accept karte hain. Yeh guide mein bataya gaya hai ki bina quality khoye photo compress kaise karein.</p>

      <H2>Method 1: SarkariPixels (Recommended — Free, No Upload)</H2>
      <ol className="list-decimal pl-5 space-y-2">
        <li><a href="/tool/reduce-kb" style={{ color: "var(--color-accent)" }}>Reduce KB tool</a> open karo</li>
        <li>Apni photo upload karo (any format — JPG, PNG, WEBP)</li>
        <li>Target KB enter karo (e.g., 50 for 50KB)</li>
        <li>&quot;Compress&quot; button dabao</li>
        <li>Download karo — done!</li>
      </ol>
      <p><strong style={{ color: "var(--color-text)" }}>Koi upload nahi hoti</strong> — sab kuch browser mein hota hai. Photo tera device kabhi nahi chhodti.</p>

      <H2>Exam-wise KB Limits — Quick Reference</H2>
      <SpecTable rows={[
        ["SSC (CGL, CHSL)", "Photo: 20–50 KB · Signature: 10–20 KB"],
        ["UPSC", "Photo: 20–300 KB · Signature: 10–100 KB"],
        ["BPSC", "Photo: 50 KB max · Signature: 20 KB max"],
        ["IBPS PO/Clerk", "Photo: 20–50 KB · Signature: 10–20 KB"],
        ["RRB NTPC", "Photo: 20–40 KB · Signature: 10–20 KB"],
        ["NTA NEET", "Photo: 10–200 KB · Signature: 4–30 KB"],
      ]} />

      <H2>Quality Loss Se Kaise Bachein?</H2>
      <p>Photo compress karte waqt quality thodi reduce hoti hai — yeh unavoidable hai. Lekin:</p>
      <ul className="space-y-1 pl-4">
        <li>• Hamesha original high-resolution photo use karo (WhatsApp ki forwarded copy nahi)</li>
        <li>• 50KB target hai toh 40-45KB tak compress karo — agar zyaada compress kiya toh quality zyaada kharab hogi</li>
        <li>• Face clearly visible hona chahiye — yahi most important hai</li>
      </ul>

      <H2>Direct Compression Tools by Target Size</H2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-4">
        {[
          { label: "Compress to 20 KB", href: "/tool/compress-20" },
          { label: "Compress to 30 KB", href: "/tool/compress-30" },
          { label: "Compress to 50 KB", href: "/tool/compress-50" },
          { label: "Compress to 100 KB", href: "/tool/compress-100" },
          { label: "Compress to 200 KB", href: "/tool/compress-200" },
          { label: "Custom KB target", href: "/tool/reduce-kb" },
        ].map((t) => (
          <a key={t.href} href={t.href} className="btn btn-ghost btn-sm" style={{ textAlign: "center" }}>{t.label}</a>
        ))}
      </div>
    </ArticleSection>
  );
}

// ── Guide 4: IBPS Photo Size ──────────────────────────────────────────────────
function IBPSGuide() {
  return (
    <ArticleSection>
      <p>IBPS (Institute of Banking Personnel Selection) ke through IBPS PO, IBPS Clerk, IBPS SO, aur IBPS RRB Officer/Assistant ke exams hote hain. Sab ke liye photo aur signature requirements lagbhag same hain — lekin exactly check karein.</p>

      <H2>IBPS PO / IBPS Clerk — Photo Requirements</H2>
      <SpecTable rows={[
        ["Dimensions", "200 × 230 pixels (4.5 cm × 3.5 cm approx)"],
        ["File Size", "20 KB – 50 KB"],
        ["Format", "JPG/JPEG"],
        ["Background", "White or light plain color"],
        ["Face", "Front-facing, 70-80% of frame"],
      ]} />

      <H2>IBPS PO / IBPS Clerk — Signature Requirements</H2>
      <SpecTable rows={[
        ["Dimensions", "140 × 60 pixels"],
        ["File Size", "10 KB – 20 KB"],
        ["Format", "JPG/JPEG"],
        ["Background", "White"],
        ["Ink color", "Black ink on white paper"],
      ]} />

      <H2>IBPS RRB Officer / Assistant</H2>
      <p>IBPS RRB ke liye requirements IBPS PO se almost same hain:</p>
      <SpecTable rows={[
        ["Photo Size", "200 × 230 pixels, 20–50 KB, JPG"],
        ["Signature Size", "140 × 60 pixels, 10–20 KB, JPG"],
      ]} />

      <H2>IBPS Photo Ke Liye Common Mistakes</H2>
      <ul className="space-y-2">
        {[
          "Wrong aspect ratio — IBPS portrait format chahta hai (taller than wide), square nahi",
          "Signature ka background plain white nahi hona — yellow tinted paper se scan karna wrong hai",
          "Photo mein spectacles — IBPS guidelines mein sunglasses prohibited hain, regular specs allowed hain lekin koi reflection nahi honi chahiye",
          "File 50KB se badi upload karna",
        ].map((r) => (
          <li key={r} className="flex items-start gap-2">
            <i className="fa-solid fa-circle-exclamation mt-1 shrink-0" style={{ color: "var(--color-accent)", fontSize: "13px" }} aria-hidden="true" />
            <span>{r}</span>
          </li>
        ))}
      </ul>

      <H2>Direct Tools for IBPS</H2>
      <div className="flex flex-wrap gap-2 my-4">
        {[
          { label: "Photo Resize (200×230px)", href: "/tool/smart-resizer" },
          { label: "Compress to 50KB", href: "/tool/compress-50" },
          { label: "Signature Resize", href: "/tool/resize-signature" },
          { label: "Compress to 20KB", href: "/tool/compress-20" },
        ].map((t) => (
          <a key={t.href} href={t.href} className="btn btn-ghost btn-sm">{t.label}</a>
        ))}
      </div>
    </ArticleSection>
  );
}

// ── Guide 5: PAN Card DPI ─────────────────────────────────────────────────────
function PANGuide() {
  return (
    <ArticleSection>
      <p>NSDL aur UTI PAN card applications mein photo upload karte waqt ek common error aata hai: <strong style={{ color: "var(--color-text)" }}>&quot;Image resolution should be 300 DPI&quot;</strong>. Yeh fix karna simple hai — sirf 2 steps.</p>

      <H2>PAN Card Photo Requirements (NSDL/UTI)</H2>
      <SpecTable rows={[
        ["Dimensions", "3.5 cm × 2.5 cm (approx 413 × 295 px at 300 DPI)"],
        ["File Size", "10 KB – 100 KB"],
        ["Format", "JPG/JPEG"],
        ["Background", "White"],
        ["DPI", "300 DPI (mandatory)"],
        ["Face", "Front-facing, clearly visible"],
      ]} />

      <H2>DPI Kya Hota Hai?</H2>
      <p>DPI ka matlab hai <em>Dots Per Inch</em> — yeh photo ki print quality batata hai. 300 DPI ka matlab hai ki ek inch mein 300 pixels hain, jo ki standard print quality hai.</p>
      <p>Zaroori nahi ki teri photo chhoti ho — ek badi photo ko 300 DPI pe set kiya ja sakta hai bina quality lose kiye.</p>

      <H2>2 Steps Mein DPI 300 Kaise Set Karein</H2>
      <ol className="list-decimal pl-5 space-y-3">
        <li>
          <strong style={{ color: "var(--color-text)" }}>Step 1:</strong>{" "}
          <a href="/tool/convert-dpi" style={{ color: "var(--color-accent)" }}>DPI Converter tool</a> open karo aur photo upload karo
        </li>
        <li>
          <strong style={{ color: "var(--color-text)" }}>Step 2:</strong>{" "}
          Target DPI mein 300 enter karo aur download karo — done!
        </li>
      </ol>
      <p>Agar file size bhi adjust karni ho (10–100KB range mein lani ho), toh DPI set karne ke baad <a href="/tool/reduce-kb" style={{ color: "var(--color-accent)" }}>Reduce KB tool</a> bhi use karo.</p>

      <H2>PAN Card Photo Common Errors & Fixes</H2>
      <div className="space-y-3 my-4">
        {[
          { error: "\"Image resolution should be 300 DPI\"", fix: "DPI Converter tool use karo, 300 set karo" },
          { error: "\"File size too large\"", fix: "Compress to 50KB ya 100KB tool use karo" },
          { error: "\"Invalid image dimensions\"", fix: "PAN Card Resize tool use karo — exact dimensions set hai" },
          { error: "Photo blurry or rejected", fix: "Original camera se fresh photo click karo, WhatsApp compressed nahi" },
        ].map(({ error, fix }) => (
          <div key={error} className="card p-4" style={{ backgroundColor: "var(--color-surface)" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--color-text)" }}>Error: {error}</p>
            <p className="t-caption">Fix: {fix}</p>
          </div>
        ))}
      </div>

      <H2>Direct Tools for PAN Card</H2>
      <div className="flex flex-wrap gap-2 my-4">
        {[
          { label: "DPI Converter (300 DPI)", href: "/tool/convert-dpi" },
          { label: "PAN Card Photo Resize", href: "/tool/pan-card-resize" },
          { label: "Compress to 50KB", href: "/tool/compress-50" },
        ].map((t) => (
          <a key={t.href} href={t.href} className="btn btn-ghost btn-sm">{t.label}</a>
        ))}
      </div>
    </ArticleSection>
  );
}

// Make React import work
import React from "react";
