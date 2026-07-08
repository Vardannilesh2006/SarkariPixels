// lib/guides-content.tsx
// Centralized content database for all guides/articles.
// Written in JSX/TSX. Includes exact spec tables, H2 elements, and schemas.

import React from "react";

export interface GuideFAQ {
  q: string;
  a: string;
}

export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  category: string;
  date: string;
  dateISO: string;
  readTime: string;
  desc: string;
  faqs: GuideFAQ[];
  content: React.FC;
}

// ── Shared Content Helper Components ────────────────────────────────────────

function ArticleSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-5" style={{ color: "var(--color-muted)", lineHeight: "1.8", fontSize: "0.9375rem" }}>
      {children}
    </div>
  );
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

// ── Guides Content Components ───────────────────────────────────────────────

function SSCRejectionGuide() {
  return (
    <ArticleSection>
      <p>SSC CGL, CHSL, MTS ya kisi bhi SSC exam ka form fill karte waqt photo rejection sabse frustrating experience hota hai. Portal clearly nahi batata ki exactly kya galat hai — bas &quot;photo invalid&quot; ya &quot;file not accepted&quot; message aata hai.</p>
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
      <p><strong style={{ color: "var(--color-text)" }}>Reason:</strong> SSC notification mein usually &quot;recent passport-size photograph&quot; mention hota hai — generally 3-6 months se purani photo accept nahi hoti.</p>
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
        ].map((m) => (
          <li key={m} className="flex items-start gap-2">
            <i className="fa-solid fa-triangle-exclamation mt-1 shrink-0" style={{ color: "#f59e0b", fontSize: "13px" }} />
            <span>{m}</span>
          </li>
        ))}
      </ul>
    </ArticleSection>
  );
}

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
    </ArticleSection>
  );
}

// ── 15 NEW GUIDES ────────────────────────────────────────────────────────────

// 6. RRB NTPC Photo Size
function RRBNTPCGuide() {
  return (
    <ArticleSection>
      <p>Railway Recruitment Board (RRB) NTPC, Group D, aur ALP exams me photo upload regulations bohot strictly follow hoti hain. Har saal hazaron applications sirf wrong formats ya specifications ki wajah se reject hoti hain.</p>
      <H2>RRB Exams Photo Specs</H2>
      <SpecTable rows={[
        ["Dimensions", "35mm × 45mm (approx 320 × 400 pixels)"],
        ["File Size", "20 KB – 50 KB"],
        ["Format", "JPG/JPEG only"],
        ["Background", "Plain White or Light color"],
        ["Face Coverage", "Minimum 50% area of the frame"],
      ]} />
      <H2>RRB Signature Specifications</H2>
      <SpecTable rows={[
        ["Dimensions", "50mm × 20mm (approx 140 × 60 pixels)"],
        ["File Size", "10 KB – 40 KB"],
        ["Format", "JPG/JPEG"],
        ["Notes", "Black ink only. English or Hindi capital letters strictly prohibited."],
      ]} />
      <H2>Rejection Se Kaise Bachein?</H2>
      <p>RRB notifications ke anusaar, candidate ki photo ke peeche plain light ya white background hona chahiye aur signature black ink pen se paper par kiya hona chahiye. Kisi bhi tarah ki blurred ya digital signature upload na karein.</p>
    </ArticleSection>
  );
}

// 7. NEET Postcard Size Photo (NTA)
function NEETPostcardGuide() {
  return (
    <ArticleSection>
      <p>NTA NEET exam me apply karte waqt regular passport-size photo ke sath-sath ek postcard-size photo upload karna mandatory hota hai. Is photo ki requirements doosre exam portal se kaafi alag hain.</p>
      <H2>NEET Postcard Size Requirements</H2>
      <SpecTable rows={[
        ["Dimensions", "4 inch × 6 inch (approx 480 × 720 pixels at 120 DPI)"],
        ["File Size", "10 KB – 200 KB"],
        ["Format", "JPG/JPEG"],
        ["Name & Date", "Mandatory at bottom (Name and date of photograph)"],
        ["Face Coverage", "80% of photo, ears clearly visible"],
      ]} />
      <H2>Postcard Photo Kaise Banayein?</H2>
      <ol className="list-decimal pl-5 space-y-2">
        <li>Apni plain background wali passport photo select karein.</li>
        <li><a href="/tool/resize-4-6" style={{ color: "var(--color-accent)" }}>Resize 4x6 tool</a> open karke use resize karein.</li>
        <li>Bottom border line add karke candidate name aur photo capture date add karein.</li>
      </ol>
    </ArticleSection>
  );
}

// 8. BPSC Photo & Signature Guide
function BPSCGuide() {
  return (
    <ArticleSection>
      <p>Bihar Public Service Commission (BPSC) exams ke liye photo format aur sizing limits set hoti hain. Bihar civil services forms bharte waqt photo optimization ensure karna application confirmation ke liye zaroori hai.</p>
      <H2>BPSC Photo Specs</H2>
      <SpecTable rows={[
        ["Dimensions", "250 × 327 pixels (Portrait)"],
        ["File Size", "15 KB – 50 KB"],
        ["Format", "JPG/JPEG"],
        ["Background", "Light or White plain"],
      ]} />
      <H2>BPSC Signature Specs</H2>
      <SpecTable rows={[
        ["Dimensions", "250 × 100 pixels"],
        ["File Size", "10 KB – 20 KB"],
        ["Format", "JPG/JPEG"],
        ["Language", "Separate uploads of English and Hindi signature required"],
      ]} />
    </ArticleSection>
  );
}

// 9. BSSC Inter Level Photo & Signature Guide
function BSSCGuide() {
  return (
    <ArticleSection>
      <p>BSSC Inter Level exams me selection process me badlaav na aaye, isliye candidate information aur uploads clear hone chahiye. Bihar SSC ke form portal photo verification standard rules par chalta hai.</p>
      <H2>BSSC Photo Specifications</H2>
      <SpecTable rows={[
        ["Dimensions", "3.5 cm × 4.5 cm"],
        ["File Size", "20 KB – 50 KB"],
        ["Format", "JPG/JPEG"],
        ["Background", "White background recommended"],
      ]} />
      <H2>BSSC Signature Specifications</H2>
      <SpecTable rows={[
        ["Dimensions", "3.5 cm × 1.5 cm"],
        ["File Size", "10 KB – 20 KB"],
        ["Requirement", "Dono English aur Hindi signature file formats upload karne hote hain"],
      ]} />
    </ArticleSection>
  );
}

// 10. Signature Ko 10KB-20KB Kaise Karein
function SignatureCompressGuide() {
  return (
    <ArticleSection>
      <p>Admit card and applications me signature file size target aksar 10KB–20KB tak hota hai. Agar scan copy camera se 2MB me aati hai toh use perfect ratio me compress karna padega.</p>
      <H2>Quick Steps to Compress Signature</H2>
      <ol className="list-decimal pl-5 space-y-2">
        <li>Apne white paper par ink pen se sign ki hui photo phone se click karein.</li>
        <li><a href="/tool/resize-signature" style={{ color: "var(--color-accent)" }}>Signature Resize tool</a> par upload karein.</li>
        <li>Excess space crop karne ke baad target compress size 15KB choose karein.</li>
        <li>Processed output download karein jo bilkul white clean background me deliver hoga.</li>
      </ol>
    </ArticleSection>
  );
}

// 11. Passport Size Photo Dimensions in CM, MM, Pixels
function PassportDimensionsGuide() {
  return (
    <ArticleSection>
      <p>Passport-size dimensions globally and countrywise alag parameters ke anusaar customize hote hain. India me different government portals ke standards pixels ya CM ranges me set hain.</p>
      <H2>Standard Dimensions Chart</H2>
      <SpecTable rows={[
        ["Centimeters", "3.5 cm × 4.5 cm"],
        ["Millimeters", "35 mm × 45 mm"],
        ["Pixels (at 300 DPI)", "413 × 531 pixels"],
        ["Pixels (at 96 DPI)", "132 × 170 pixels"],
        ["Inches", "1.38 inch × 1.77 inch"],
      ]} />
      <p>Print size resolutions ke anusar pixels multiply ya scale hote hain, isliye conversion standards hamesha check karein.</p>
    </ArticleSection>
  );
}

// 12. Photo Ka DPI Kaise Check/Convert Karein
function DpiCheckGuide() {
  return (
    <ArticleSection>
      <p>DPI checks ensure karte hain ki visual print documents standard dots range specifications me match hote hain. Agar DPI requirements 300 DPI di gayi ho toh direct conversion methods useful hote hain.</p>
      <H2>Online DPI Conversion</H2>
      <ol className="list-decimal pl-5 space-y-2">
        <li><a href="/tool/convert-dpi" style={{ color: "var(--color-accent)" }}>DPI Converter</a> tool open karein.</li>
        <li>Image upload karein, current specs analyze honge.</li>
        <li>Custom option me target DPI select karke process file direct download karein.</li>
      </ol>
    </ArticleSection>
  );
}

// 13. PNG to JPG Converter Guide
function PngToJpgGuide() {
  return (
    <ArticleSection>
      <p>Indian exam application portals generic PNG screenshots accept nahi karte hain. Unke database system me strictly JPEG ya JPG upload process supported hai.</p>
      <H2>PNG format ko JPG kaise banayein?</H2>
      <p>SarkariPixels framework ke all editors canvas rendering se load hote hain. Jab aap koi PNG photo upload karte hain toh use instant download option click par automatically pure JPEG layout format system me re-save kar diya jata hai. Isliye browser me conversion safely and instantly achieve ho jata hai.</p>
    </ArticleSection>
  );
}

// 14. Mobile Se Photo Resize/Compress Kaise Karein
function MobileResizeGuide() {
  return (
    <ArticleSection>
      <p>90% students form verification ya registrations mobile browser Chrome ya Safari se directly complete karte hain. Desktop access na hone par phone photo editor rules handle karna easy hai.</p>
      <H2>Mobile Browser Optimization Steps</H2>
      <p>SarkariPixels tools lightweight, zero dynamic server latency code systems par design kiye gaye hain. Phone capture image ko directly browser page cards templates par drag karein. Canvas execution system background scaling configurations fast load execute karta hai aur clean mobile network zones par offline render output generate karta hai.</p>
    </ArticleSection>
  );
}

// 15. SBI Clerk/PO Photo & Signature Requirements
function SBIGuide() {
  return (
    <ArticleSection>
      <p>State Bank of India (SBI) ke PO/Clerk vacancies registrations me standard bank regulations parameters apply hote hain. Upload specs clear and accurate hone chahiye.</p>
      <H2>SBI Photo Specs</H2>
      <SpecTable rows={[
        ["Dimensions", "4.5 cm × 3.5 cm (200 × 230 pixels)"],
        ["File Size", "20 KB – 50 KB"],
        ["Format", "JPG/JPEG"],
      ]} />
      <H2>SBI Signature specs</H2>
      <SpecTable rows={[
        ["Dimensions", "140 × 60 pixels"],
        ["File Size", "10 KB – 20 KB"],
        ["Format", "JPG/JPEG"],
        ["Color Pen", "Black ink pen strictly mandatory"],
      ]} />
    </ArticleSection>
  );
}

// 16. LIC AAO Photo & Signature Size & KB Limits
function LICGuide() {
  return (
    <ArticleSection>
      <p>LIC AAO, ADO aur direct recruitments registration rules details dynamic exam patterns par build hote hain. Photo validation system regular check constraints verify karta hai.</p>
      <H2>LIC Requirements Grid</H2>
      <SpecTable rows={[
        ["Photo dimensions", "4.5 cm × 3.5 cm (200 × 230 px)"],
        ["Photo file limit", "20 KB – 50 KB"],
        ["Signature limits", "10 KB – 20 KB, 140 × 60 pixels"],
        ["Pen type", "Black ink pen on plain white paper"],
      ]} />
    </ArticleSection>
  );
}

// 17. Indian Navy / Air Force Photo Slate holding requirements
function DefenceSlateGuide() {
  return (
    <ArticleSection>
      <p>Indian Navy, Air Force (Agniveer) and Army registration forms fill karte waqt candidate photo standard requirement different hoti hai: candidate holding black slate on chest.</p>
      <H2>Slate Photo Guidelines</H2>
      <ul className="space-y-2 text-sm pl-4 list-disc">
        <li>Candidate ko apni chest ke aage ek black color ki slate hold karni hoti hai.</li>
        <li>Slate par candidate ka full name aur date of photo (DOP) clear white chalk se capital letters me likha hona chahiye.</li>
        <li>Slate parameters background and light details standard white background par valid hone chahiye.</li>
        <li>Sizing requirements: 3.5cm x 4.5cm, file size limit: 10KB - 50KB range JPEG.</li>
      </ul>
    </ArticleSection>
  );
}

// 18. Passport Photo Ka Background White Kaise Karein Online
function WhiteBgGuide() {
  return (
    <ArticleSection>
      <p>White background standard compliance rules sabhi main central exam boards ke notifications me mandatory kar diya gaya hai. Agar aapki photo red, blue ya pattern wallpaper ke sath click hai toh use direct clear background color de.</p>
      <H2>White Background online steps</H2>
      <p>SarkariPixels tools use karke dynamic color canvas elements change karein. Target tools list par background options edit choose karke output format transparent PNG or solid white JPEG download check execute kiya ja sakta hai.</p>
    </ArticleSection>
  );
}

// 19. Photo Ko 20KB Se Kam Kaise Karein Online
function Compress20Guide() {
  return (
    <ArticleSection>
      <p>Kuch rare state commissions aur sign parameters me limit maximum 20KB hoti hai. High resolution image ko 20KB size me compress karte waqt pixels details correct rehne chahiye.</p>
      <H2>Steps to Compress Under 20KB</H2>
      <ol className="list-decimal pl-5 space-y-2">
        <li><a href="/tool/compress-20" style={{ color: "var(--color-accent)" }}>Compress to 20KB</a> tool open karein.</li>
        <li>Upload zone par check image submit karein.</li>
        <li>Iteration processing parameters set target automatically target quality set range 18-19KB generated downloads match kar dega.</li>
      </ol>
    </ArticleSection>
  );
}

// 20. Mobile Se Sign Image Crop Kaise Karein
function SignatureCropGuide() {
  return (
    <ArticleSection>
      <p>Signature documents upload ke waqt mobile se photo click karte waqt background sheets aur noise pixels cover ho jate hain. Sahi dimension aur boundary crop parameters setup helpful hai.</p>
      <H2>Signature Crop workflow</H2>
      <p>Clean alignment ke liye white page sign photo click karein. Free crop tools option par target area boundary crop coordinate set select karein. Bounding boxes resize lock parameters clear parameters setup sign ko final target grid template me safe load download kar dega.</p>
    </ArticleSection>
  );
}

// ── Guides Master Array ──────────────────────────────────────────────────────

export const GUIDES: Record<string, Guide> = {
  "ssc-cgl-photo-rejection": {
    slug: "ssc-cgl-photo-rejection",
    title: "SSC CGL Photo Reject Kyun Hoti Hai? 7 Common Reasons",
    metaTitle: "SSC CGL Photo Reject Kyun Hoti Hai? 7 Reasons & Fixes | SarkariPixels",
    metaDesc: "SSC portal pe photo reject ho rahi hai? Yeh 7 most common reasons hain — file size badi, wrong dimensions, wrong background, blurry photo — aur har ka fix.",
    category: "SSC",
    date: "June 2026",
    dateISO: "2026-06-01",
    readTime: "4 min",
    desc: "Form fill karte time photo reject hoti hai? Yeh 7 common reasons check karo — aur each ka fix.",
    faqs: [
      { q: "SSC CGL ke liye photo ka size kitna hona chahiye?", a: "SSC CGL ke liye photo 3.5 cm × 4.5 cm (413 × 531 px at 300 DPI) aur file size 20KB se 50KB ke beech honi chahiye, JPG format mein." },
      { q: "SSC photo reject kyun hoti hai?", a: "SSC photo reject hone ke 7 common reasons hain: file size too large, wrong dimensions, wrong background, wrong file format, face not clearly visible, photo too old, ya blurry/low resolution photo." },
      { q: "SSC ke liye photo ka background kaisa hona chahiye?", a: "SSC exams ke liye white ya light plain colored background chahiye. Colorful ya patterned background se photo rejection hoti hai." },
    ],
    content: SSCRejectionGuide,
  },
  "upsc-photo-requirements-2026": {
    slug: "upsc-photo-requirements-2026",
    title: "UPSC Photo Requirements 2026 — Complete Guide",
    metaTitle: "UPSC Photo Size Requirements 2026 — KB, Pixels, Format | SarkariPixels",
    metaDesc: "UPSC CSE 2026 ke liye photo size, KB limit, format aur background requirements — square crop, name stamp requirement — sab verified information ek jagah.",
    category: "UPSC",
    date: "June 2026",
    dateISO: "2026-06-01",
    readTime: "5 min",
    desc: "UPSC ka square photo format, name stamp requirement, exact KB limits — sab ek jagah.",
    faqs: [
      { q: "UPSC CSE 2026 ke liye photo size kya hai?", a: "UPSC CSE 2026 ke liye photo 350 × 350 pixels (square format) chahiye, file size 20KB se 300KB, JPG format mein, white background ke saath." },
      { q: "UPSC signature ka size kya hona chahiye?", a: "UPSC ke liye signature 350 × 100 pixels, 10KB se 100KB, JPG format mein, white background pe honi chahiye." },
      { q: "UPSC photo pe naam ka stamp kab lagana chahiye?", a: "Kuch UPSC exams ke admit card ya DAF ke liye photo ke neeche naam likhna hota hai. Yeh requirement form instructions mein mention hoti hai." },
    ],
    content: UPSCGuide,
  },
  "compress-photo-under-50kb": {
    slug: "compress-photo-under-50kb",
    title: "Photo Ko 50KB Se Kam Kaise Karein — Step by Step",
    metaTitle: "Photo Ko 50KB Se Kam Kaise Karein — Free Tool | SarkariPixels",
    metaDesc: "Mobile se li 3MB photo ko 50KB ya 20KB mein kaise compress karein bina quality loss ke — step by step guide with free browser tool.",
    category: "How-To",
    date: "June 2026",
    dateISO: "2026-06-01",
    readTime: "3 min",
    desc: "Mobile phone ki 3MB photo ko 20-50KB mein compress karna — without quality loss.",
    faqs: [
      { q: "Photo ko 50KB se kam kaise karein?", a: "SarkariPixels ka Compress to 50KB tool use karein — photo upload karein aur tool automatically JPEG quality adjust karke 50KB se kam mein compress kar dega, bina quality loss ke." },
      { q: "Kya compress karne se photo quality kharab hoti hai?", a: "Smart compression mein minimal quality loss hota hai. SarkariPixels binary search algorithm use karta hai jo best possible quality maintain karta hai target KB mein." },
    ],
    content: CompressGuide,
  },
  "ibps-photo-size-guide": {
    slug: "ibps-photo-size-guide",
    title: "IBPS Bank PO/Clerk Photo Size — 2026 Complete Guide",
    metaTitle: "IBPS PO Clerk Photo & Signature Size 2026 | SarkariPixels",
    metaDesc: "IBPS PO, Clerk, SO, RRB Officer sab ke liye photo aur signature exact size, KB limit, format — 2026 verified requirements ek jagah.",
    category: "IBPS",
    date: "June 2026",
    dateISO: "2026-06-01",
    readTime: "4 min",
    desc: "IBPS PO, Clerk, SO sab ke photo aur signature requirements ek jagah.",
    faqs: [
      { q: "IBPS PO ke liye photo size kya hai?", a: "IBPS PO ke liye photo 200 × 230 pixels, 20KB se 50KB, JPG format mein chahiye. Background white ya light colored hona chahiye." },
      { q: "IBPS signature ka size kya hona chahiye?", a: "IBPS ke liye signature 140 × 60 pixels, 10KB se 20KB, JPG format mein honi chahiye." },
    ],
    content: IBPSGuide,
  },
  "pan-card-photo-dpi-300": {
    slug: "pan-card-photo-dpi-300",
    title: "PAN Card Photo Ka DPI 300 Kaise Set Karein",
    metaTitle: "PAN Card Photo DPI 300 Set Kaise Karein — NSDL UTI | SarkariPixels",
    metaDesc: "NSDL aur UTI PAN card application mein DPI 300 mandatory hai. Yeh guide mein bataya gaya hai ki free tool se 2 steps mein DPI kaise fix karein.",
    category: "PAN Card",
    date: "June 2026",
    dateISO: "2026-06-01",
    readTime: "2 min",
    desc: "NSDL/UTI PAN application mein DPI 300 mandatory hai. Yeh tool se 2 steps mein fix karo.",
    faqs: [
      { q: "PAN card photo ka DPI 300 kaise set karein?", a: "SarkariPixels ka DPI Converter tool use karein — photo upload karein, target DPI 300 set karein, aur download karein. Tool metadata mein DPI value set kar deta hai." },
      { q: "PAN card ke liye photo size kya chahiye?", a: "NSDL/UTI PAN card application ke liye photo 3.5 × 4.5 cm, 300 DPI, 2KB se 20KB, JPG format mein chahiye." },
    ],
    content: PANGuide,
  },
  "rrb-ntpc-photo-size": {
    slug: "rrb-ntpc-photo-size",
    title: "RRB NTPC Photo & Signature Size Specifications",
    metaTitle: "RRB NTPC Photo & Signature Size Requirements 2026 | SarkariPixels",
    metaDesc: "RRB NTPC, ALP and Group D photo and signature size rules. Learn file limits, specifications, and how to avoid rejections.",
    category: "Railway",
    date: "June 2026",
    dateISO: "2026-06-15",
    readTime: "3 min",
    desc: "RRB NTPC Photo & Signature Size Specifications, format, background and rules.",
    faqs: [
      { q: "RRB NTPC photo size and KB limit?", a: "RRB NTPC photo should be 35mm x 45mm, file size 20KB to 50KB, JPG format with light background." },
      { q: "Can I sign in capital letters for RRB?", a: "No, signatures in capital/block letters are strictly rejected in RRB exams. Use normal running hand sign." }
    ],
    content: RRBNTPCGuide,
  },
  "neet-photo-post-card-size": {
    slug: "neet-photo-post-card-size",
    title: "NTA NEET Postcard Size Photo Requirements",
    metaTitle: "NEET Postcard Size Photo Requirements (4x6 inch) | SarkariPixels",
    metaDesc: "NTA NEET postcard photo guidelines. Learn specifications for name/date stamps, dimensions, and layout configurations.",
    category: "NEET",
    date: "June 2026",
    dateISO: "2026-06-15",
    readTime: "4 min",
    desc: "NTA NEET Postcard Size Photo Requirements (4x6 inches) with Name/Date stamps.",
    faqs: [
      { q: "What is postcard photo size in pixels?", a: "Postcard size for NEET is 4x6 inches, which translates to roughly 480x720 pixels or higher at standard resolution." },
      { q: "Is name and date required on NEET postcard photo?", a: "Yes, candidates must print their name and date of photo capture at the bottom on a white strip." }
    ],
    content: NEETPostcardGuide,
  },
  "bpsc-photo-signature-guide": {
    slug: "bpsc-photo-signature-guide",
    title: "BPSC Photo & Signature Specifications",
    metaTitle: "BPSC Photo & Signature Size Specifications | SarkariPixels",
    metaDesc: "Official BPSC Civil Services photo requirements, portrait dimensions, file sizes, and Hindi/English signature rules.",
    category: "BPSC",
    date: "June 2026",
    dateISO: "2026-06-15",
    readTime: "3 min",
    desc: "BPSC Pre/Mains Photo and English/Hindi Signature Specifications.",
    faqs: [
      { q: "What is the BPSC photo size limit?", a: "BPSC photo should be 250x327 pixels, file size between 15KB and 50KB in JPG/JPEG format." },
      { q: "Are Hindi signatures required for BPSC?", a: "Yes, BPSC requires separate uploads for both Hindi and English signatures." }
    ],
    content: BPSCGuide,
  },
  "bssc-inter-level-photo": {
    slug: "bssc-inter-level-photo",
    title: "BSSC Inter Level Photo & Signature Size Guide",
    metaTitle: "BSSC Inter Level Photo & Signature Specifications | SarkariPixels",
    metaDesc: "Find exact BSSC Inter Level recruitment photo dimensions, signature file rules, and white background specifications.",
    category: "BSSC",
    date: "June 2026",
    dateISO: "2026-06-15",
    readTime: "3 min",
    desc: "BSSC Inter Level Photo, English & Hindi Signature Specifications.",
    faqs: [
      { q: "BSSC photo specifications and background?", a: "BSSC photo should be 3.5 cm x 4.5 cm, 20-50 KB in size, preferably with a white background." }
    ],
    content: BSSCGuide,
  },
  "signature-resize-10-20kb": {
    slug: "signature-resize-10-20kb",
    title: "Signature Ko 10KB-20KB Kaise Karein",
    metaTitle: "Signature Image Size 10KB to 20KB Compressor | SarkariPixels",
    metaDesc: "Learn how to crop and compress your hand-signed paper photos to exact 10KB-20KB size formats for exam portals.",
    category: "How-To",
    date: "June 2026",
    dateISO: "2026-06-15",
    readTime: "3 min",
    desc: "How to crop and compress your handwritten signature to 10-20KB range.",
    faqs: [
      { q: "Signature size range for SSC/IBPS?", a: "Most portals like SSC and IBPS mandate signature files to be exactly between 10KB and 20KB." }
    ],
    content: SignatureCompressGuide,
  },
  "passport-photo-dimensions-cm-px": {
    slug: "passport-photo-dimensions-cm-px",
    title: "Passport Size Photo Dimensions in CM, MM, Pixels",
    metaTitle: "Passport Photo Dimensions Chart (CM, MM, Pixels) | SarkariPixels",
    metaDesc: "Compare official passport size photo dimensions in centimeters, millimeters, inches, and pixel counts at different DPI settings.",
    category: "General",
    date: "June 2026",
    dateISO: "2026-06-15",
    readTime: "3 min",
    desc: "Standard passport size photo measurements in CM, MM, Inches and Pixels.",
    faqs: [
      { q: "What is Indian passport photo size in cm?", a: "The standard size is 3.5 cm in width by 4.5 cm in height." }
    ],
    content: PassportDimensionsGuide,
  },
  "photo-dpi-checker-online": {
    slug: "photo-dpi-checker-online",
    title: "Photo Ka DPI Kaise Check/Convert Karein",
    metaTitle: "How to Check & Change Image DPI to 300 Online | SarkariPixels",
    metaDesc: "Step by step guide to check image density values and convert photos to 150/300 DPI for government online forms.",
    category: "DPI",
    date: "June 2026",
    dateISO: "2026-06-15",
    readTime: "3 min",
    desc: "Check image density details and change to 300 DPI for official portal checks.",
    faqs: [
      { q: "Is 300 DPI mandatory for exam portals?", a: "Yes, several portals like PAN card systems, banking exams, and state PSCs require 300 DPI resolution." }
    ],
    content: DpiCheckGuide,
  },
  "convert-png-to-jpg-without-software": {
    slug: "convert-png-to-jpg-without-software",
    title: "PNG to JPG Converter Guide",
    metaTitle: "How to Convert PNG to JPG Online Free | SarkariPixels",
    metaDesc: "Learn how to convert screenshot PNG files to standard JPG/JPEG formats instantly without installing extra software.",
    category: "Format",
    date: "June 2026",
    dateISO: "2026-06-15",
    readTime: "3 min",
    desc: "Convert PNG or WEBP screenshot images to JPG formats in your browser.",
    faqs: [
      { q: "Will converting to JPG lower file quality?", a: "Yes, slightly since JPG is lossy, but it allows for much smaller file sizes under KB limits." }
    ],
    content: PngToJpgGuide,
  },
  "resize-image-mobile-chrome": {
    slug: "resize-image-mobile-chrome",
    title: "Mobile Se Photo Resize/Compress Kaise Karein",
    metaTitle: "Resize & Compress Exam Photos on Android/iOS | SarkariPixels",
    metaDesc: "Complete mobile guide. Crop, resize, and compress your document images directly from Chrome or Safari on smartphones.",
    category: "Mobile",
    date: "June 2026",
    dateISO: "2026-06-15",
    readTime: "3 min",
    desc: "Optimize exam form photo dimensions directly on mobile browser screens.",
    faqs: [
      { q: "Do mobile browsers upload data for compression?", a: "No, SarkariPixels operates locally in your mobile browser memory without any network uploads." }
    ],
    content: MobileResizeGuide,
  },
  "sbi-clerk-photo-rejection": {
    slug: "sbi-clerk-photo-rejection",
    title: "SBI Clerk/PO Photo & Signature Requirements",
    metaTitle: "SBI Clerk PO Photo & Signature Size Specs 2026 | SarkariPixels",
    metaDesc: "Official State Bank of India (SBI) PO and Clerk online application photo dimension rules, signature formats, and KB limits.",
    category: "Banking",
    date: "June 2026",
    dateISO: "2026-06-15",
    readTime: "3 min",
    desc: "SBI Bank PO and Clerk Photo and Signature Specifications.",
    faqs: [
      { q: "SBI Clerk signature ink color requirement?", a: "SBI mandates black ink signatures on white paper only. Blue ink is strictly rejected." }
    ],
    content: SBIGuide,
  },
  "lic-aao-photo-requirements": {
    slug: "lic-aao-photo-requirements",
    title: "LIC AAO Photo & Signature Size & KB Limits",
    metaTitle: "LIC AAO ADO Photo & Signature Specifications | SarkariPixels",
    metaDesc: "Check Life Insurance Corporation (LIC) recruitment exam application specifications for photos and signatures.",
    category: "Insurance",
    date: "June 2026",
    dateISO: "2026-06-15",
    readTime: "3 min",
    desc: "LIC Recruitment Exam Photo and Signature Specifications.",
    faqs: [
      { q: "What is the LIC AAO signature limit?", a: "LIC signature must be between 10KB and 20KB, dimensions 140x60 pixels." }
    ],
    content: LICGuide,
  },
  "navy-airforce-photo-slate": {
    slug: "navy-airforce-photo-slate",
    title: "Indian Navy / Air Force Photo Slate holding requirements",
    metaTitle: "Agniveer Navy Air Force Photo Slate Specifications | SarkariPixels",
    metaDesc: "Learn rules for holding a black slate on chest with name and DOP written in chalk for Indian Air Force and Navy exams.",
    category: "Defence",
    date: "June 2026",
    dateISO: "2026-06-15",
    readTime: "4 min",
    desc: "IAF and Navy Agniveer slate holding photo specifications.",
    faqs: [
      { q: "Is slate holding mandatory for Agniveer?", a: "Yes, for Air Force and Navy entries, candidates must hold a black slate in front of their chest." }
    ],
    content: DefenceSlateGuide,
  },
  "remove-background-passport-photo": {
    slug: "remove-background-passport-photo",
    title: "Passport Photo Ka Background White Kaise Karein Online",
    metaTitle: "Change Passport Photo Background to White Online | SarkariPixels",
    metaDesc: "How to edit, remove, and replace backgrounds of photos to plain solid white color for SSC and UPSC registrations.",
    category: "How-To",
    date: "June 2026",
    dateISO: "2026-06-15",
    readTime: "3 min",
    desc: "Convert dark backgrounds of images to official white colors locally.",
    faqs: [
      { q: "Is white background compulsory for SSC?", a: "Yes, official notifications specify light or white background for passport uploads." }
    ],
    content: WhiteBgGuide,
  },
  "compress-image-to-20kb": {
    slug: "compress-image-to-20kb",
    title: "Photo Ko 20KB Se Kam Kaise Karein Online",
    metaTitle: "Compress Photo to Under 20KB Online Free | SarkariPixels",
    metaDesc: "Learn step-by-step methods to compress, resize and export image files under 20KB targets without losing layout definitions.",
    category: "How-To",
    date: "June 2026",
    dateISO: "2026-06-15",
    readTime: "3 min",
    desc: "Compress document images under 20KB for specific government form slots.",
    faqs: [
      { q: "How to compress image to 20KB?", a: "Upload photo to SarkariPixels, use target size 20KB and export directly." }
    ],
    content: Compress20Guide,
  },
  "crop-signature-from-mobile-photo": {
    slug: "crop-signature-from-mobile-photo",
    title: "Mobile Se Sign Image Crop Kaise Karein",
    metaTitle: "Crop and Clean Signature Photo from Mobile | SarkariPixels",
    metaDesc: "How to crop signature images clicked from smartphones, clear shadows, and align them properly for exam portals.",
    category: "How-To",
    date: "June 2026",
    dateISO: "2026-06-15",
    readTime: "3 min",
    desc: "Quick cropping and lighting alignment for smartphone-clicked signature images.",
    faqs: [
      { q: "Signature background must be white?", a: "Yes, signature background must be plain white without shadows or table textures." }
    ],
    content: SignatureCropGuide,
  },
};

export function getAllGuideKeys(): string[] {
  return Object.keys(GUIDES);
}

export function getGuideByKey(key: string): Guide | undefined {
  return GUIDES[key];
}
