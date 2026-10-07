// lib/exam-specs.ts
// Single source of truth for all government exam photo/signature specifications.
// Updating one entry here updates every tool page, spec hub page, and AI assistant response.

export interface ExamSpec {
  key: string;
  name: string;
  fullName: string;
  sourceUrl: string;
  sourceLabel: string;
  notificationUrl: string;
  recruitmentCycle: string;
  lastCheckedDate: string; // ISO format e.g. "2026-07-01"
  reviewDueDate: string;   // ISO format e.g. "2026-10-01"
  exceptions: string[];
  photo: {
    widthCm?: number;
    heightCm?: number;
    widthPx?: number;
    heightPx?: number;
    minKB: number;
    maxKB: number;
    dpi?: number;
    format: string;
    background: string;
    notes?: string;
  };
  signature: {
    widthCm?: number;
    heightCm?: number;
    widthPx?: number;
    heightPx?: number;
    minKB: number;
    maxKB: number;
    dpi?: number;
    format: string;
    notes?: string;
  };
  generalRules: string[];
  toolIds: string[];
  lastVerified: string;
}

export const EXAM_SPECS: ExamSpec[] = [
  {
    key: "ssc",
    name: "SSC",
    fullName: "Staff Selection Commission (SSC)",
    sourceUrl: "https://ssc.gov.in",
    sourceLabel: "ssc.gov.in",
    notificationUrl: "https://ssc.gov.in/notices",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-07-01",
    reviewDueDate: "2026-10-01",
    exceptions: [
      "SSC One-Time Registration (OTR) mandates live webcam/mobile app photo capture. Uploaded photos are accepted for regional/legacy slots and specific admit card validations.",
      "Signature must strictly be 10KB to 20KB in JPEG format with 4.0cm × 2.0cm dimensions.",
    ],
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      minKB: 20,
      maxKB: 50,
      dpi: 300,
      format: "JPG/JPEG",
      background: "White or light-colored",
      notes: "Recent passport-size photograph. Face should occupy 70-80% of frame.",
    },
    signature: {
      widthCm: 4.0,
      heightCm: 2.0,
      minKB: 10,
      maxKB: 20,
      format: "JPG/JPEG",
      notes: "Black or dark blue ink on white paper. Signature must be in English or Hindi as specified.",
    },
    generalRules: [
      "White or light-colored background only",
      "No caps, sunglasses, or masks",
      "Front-facing photo, eyes clearly visible",
      "Photo must be recent (taken within 3 months)",
      "Both ears must be clearly visible without shadows",
    ],
    toolIds: ["ssc-photo", "resize-35-45", "compress-50", "reduce-kb"],
    lastVerified: "July 2026",
  },
  {
    key: "upsc",
    name: "UPSC",
    fullName: "Union Public Service Commission (UPSC)",
    sourceUrl: "https://upsconline.nic.in",
    sourceLabel: "upsconline.nic.in",
    notificationUrl: "https://upsconline.nic.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-07-01",
    reviewDueDate: "2026-10-01",
    exceptions: [
      "UPSC 10-Day Rule: Photograph must not be more than 10 days old from the date of online application portal opening.",
      "The candidate's name and the exact date on which the photograph was taken must be clearly printed at the bottom.",
      "Face must occupy at least 3/4th (75%) of the photograph space.",
      "Dimensions must be square (minimum 350×350 px to maximum 1000×1000 px).",
    ],
    photo: {
      widthPx: 350,
      heightPx: 350,
      minKB: 20,
      maxKB: 300,
      format: "JPG/JPEG",
      background: "White",
      notes: "Square format. White margin at bottom with candidate's name and date of photograph.",
    },
    signature: {
      widthPx: 350,
      heightPx: 350,
      minKB: 20,
      maxKB: 300,
      format: "JPG/JPEG",
      notes: "White background, clear dark ink signature.",
    },
    generalRules: [
      "Square photograph mandatory (350x350 to 1000x1000 px)",
      "White background with name + date stamp at bottom",
      "No dark or patterned backgrounds",
      "Regular prescription spectacles permitted without glare",
      "File size strictly between 20KB and 300KB",
    ],
    toolIds: ["upsc-photo-resize", "resize-600-600", "compress-300"],
    lastVerified: "July 2026",
  },
  {
    key: "bpsc",
    name: "BPSC",
    fullName: "Bihar Public Service Commission (BPSC)",
    sourceUrl: "https://bpsc.bih.nic.in",
    sourceLabel: "bpsc.bih.nic.in",
    notificationUrl: "https://bpsc.bih.nic.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-07-01",
    reviewDueDate: "2026-10-01",
    exceptions: [
      "BPSC requires live webcam capture during application, alongside scanned photo upload and bilingual signatures.",
      "Strict 50KB upper limit on photo, 15KB on signature.",
    ],
    photo: {
      widthPx: 250,
      heightPx: 327,
      minKB: 4,
      maxKB: 50,
      format: "JPG/JPEG",
      background: "White",
      notes: "Portrait orientation. Max 50KB strictly enforced by portal.",
    },
    signature: {
      widthPx: 100,
      heightPx: 250,
      minKB: 1,
      maxKB: 15,
      format: "JPG/JPEG",
      notes: "Black ink signature on white background. Must be clear and legible.",
    },
    generalRules: [
      "White background mandatory",
      "Clear black ink signature",
      "Photo must be recent",
      "No stickers, date stamps or extraneous marks on photo",
    ],
    toolIds: ["ssc-photo", "compress-50", "compress-20"],
    lastVerified: "July 2026",
  },
  {
    key: "bssc",
    name: "BSSC",
    fullName: "Bihar Staff Selection Commission (BSSC)",
    sourceUrl: "https://bssc.bihar.gov.in",
    sourceLabel: "bssc.bihar.gov.in",
    notificationUrl: "https://bssc.bihar.gov.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-07-01",
    reviewDueDate: "2026-10-01",
    exceptions: [
      "Both English and Hindi signatures are required separately for most BSSC recruitment drives (10KB - 20KB each).",
      "Photo dimensions 3.5cm × 4.5cm, file size between 20KB and 50KB.",
    ],
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      minKB: 20,
      maxKB: 50,
      format: "JPG/JPEG",
      background: "White",
    },
    signature: {
      widthCm: 3.5,
      heightCm: 1.5,
      minKB: 10,
      maxKB: 20,
      format: "JPG/JPEG",
      notes: "Submit both English and Hindi signatures separately.",
    },
    generalRules: [
      "Legible English and Hindi signatures required",
      "White background only",
      "Recent photograph without headgear",
    ],
    toolIds: ["psc-photo", "compress-50", "reduce-kb"],
    lastVerified: "July 2026",
  },
  {
    key: "rrb",
    name: "RRB",
    fullName: "Railway Recruitment Board (RRB / RRC)",
    sourceUrl: "https://indianrailways.gov.in",
    sourceLabel: "indianrailways.gov.in",
    notificationUrl: "https://www.rrbchennai.gov.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-07-01",
    reviewDueDate: "2026-10-01",
    exceptions: [
      "Colour photo taken within the last 3 months with plain white background.",
      "No selfie, no spectacles, no tinted glasses or side poses permitted.",
      "File size: 30KB - 70KB in latest CEN notices (or 20KB - 50KB in legacy forms).",
    ],
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      minKB: 20,
      maxKB: 50,
      dpi: 200,
      format: "JPG/JPEG",
      background: "White",
      notes: "Colour photograph on white background. Photo taken in last 3 months.",
    },
    signature: {
      widthCm: 4.0,
      heightCm: 2.0,
      minKB: 10,
      maxKB: 30,
      format: "JPG/JPEG",
      notes: "Signature on white paper in blue/black ink.",
    },
    generalRules: [
      "Colour photo mandatory",
      "Plain white background",
      "Photo less than 3 months old",
      "No digital beauty filter manipulations",
    ],
    toolIds: ["ssc-photo", "compress-50", "compress-30"],
    lastVerified: "July 2026",
  },
  {
    key: "nta",
    name: "NTA / JEE / NEET",
    fullName: "National Testing Agency (NTA) — JEE, NEET, CUET",
    sourceUrl: "https://nta.ac.in",
    sourceLabel: "nta.ac.in",
    notificationUrl: "https://nta.ac.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-07-01",
    reviewDueDate: "2026-10-01",
    exceptions: [
      "Postcard size photograph (4×6 inch, 10KB - 200KB) is required separately for NEET applicants alongside standard passport photo.",
      "80% face coverage with white background; ears must be clearly visible.",
      "Signature must be in running handwriting; signatures in ALL CAPITAL LETTERS are rejected.",
    ],
    photo: {
      widthPx: 100,
      heightPx: 120,
      minKB: 10,
      maxKB: 200,
      format: "JPG/JPEG",
      background: "White or off-white",
      notes: "80% face coverage. 10KB–200KB, 100×120 px minimum.",
    },
    signature: {
      widthPx: 100,
      heightPx: 60,
      minKB: 4,
      maxKB: 30,
      format: "JPG/JPEG",
      notes: "Running handwriting only. No capital block letters.",
    },
    generalRules: [
      "Cross-check specific exam information bulletin (NEET / JEE / CUET)",
      "White or off-white background mandatory",
      "Clear, recent photograph without shadow",
    ],
    toolIds: ["compress-200", "compress-50", "reduce-kb"],
    lastVerified: "July 2026",
  },
  {
    key: "ibps",
    name: "IBPS / Bank PO",
    fullName: "Institute of Banking Personnel Selection (IBPS) & SBI",
    sourceUrl: "https://ibps.in",
    sourceLabel: "ibps.in",
    notificationUrl: "https://ibps.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-07-01",
    reviewDueDate: "2026-10-01",
    exceptions: [
      "Left Thumb Impression (LTI) (20KB - 50KB) and Handwritten Declaration (50KB - 100KB) are also mandatory uploads alongside photo and signature.",
      "Signatures in CAPITAL LETTERS will strictly not be accepted.",
    ],
    photo: {
      widthPx: 200,
      heightPx: 230,
      minKB: 20,
      maxKB: 50,
      format: "JPG/JPEG",
      background: "White",
      notes: "200×230 px, 20-50KB for IBPS PO/Clerk.",
    },
    signature: {
      widthPx: 140,
      heightPx: 60,
      minKB: 10,
      maxKB: 20,
      format: "JPG/JPEG",
      notes: "Blue or black ink on white background. Running handwriting only.",
    },
    generalRules: [
      "White background mandatory",
      "Formal attire recommended",
      "Neutral expression, eyes open",
      "File format must be JPG/JPEG only",
    ],
    toolIds: ["compress-50", "compress-20", "resize-pixel"],
    lastVerified: "July 2026",
  },
  {
    key: "pan",
    name: "PAN Card",
    fullName: "NSDL / Protean / UTI PAN Card Application",
    sourceUrl: "https://incometax.gov.in",
    sourceLabel: "incometax.gov.in",
    notificationUrl: "https://www.onlineservices.nsdl.com",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-07-01",
    reviewDueDate: "2026-10-01",
    exceptions: [
      "Exact 300 DPI metadata must be embedded into the JPEG JFIF APP0 marker.",
      "Photo dimensions: 2.5cm × 3.5cm (under 50KB). Signature dimensions: 2.0cm × 4.5cm (under 50KB).",
    ],
    photo: {
      widthCm: 2.5,
      heightCm: 3.5,
      minKB: 10,
      maxKB: 50,
      dpi: 300,
      format: "JPG/JPEG",
      background: "White",
      notes: "DPI must be exactly 300. File must be under 50KB.",
    },
    signature: {
      widthCm: 2.0,
      heightCm: 4.5,
      minKB: 10,
      maxKB: 50,
      format: "JPG/JPEG",
      notes: "DPI 300. Signature in black ink on white paper.",
    },
    generalRules: [
      "DPI metadata must be locked at 300",
      "White background mandatory",
      "Photo and signature under 50KB each",
    ],
    toolIds: ["pan-card-resize", "convert-dpi", "compress-50"],
    lastVerified: "July 2026",
  },
  {
    key: "up-police",
    name: "UP Police",
    fullName: "Uttar Pradesh Police Recruitment & Promotion Board (UPPRPB)",
    sourceUrl: "https://uppbpb.gov.in",
    sourceLabel: "uppbpb.gov.in",
    notificationUrl: "https://uppbpb.gov.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Candidate face must occupy 70% of the photograph with ears clearly visible.",
      "Signature must strictly be between 5KB and 20KB in black ink on white unruled paper.",
      "Background must be plain light gray or white; sunglasses and caps are strictly prohibited."
    ],
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      widthPx: 350,
      heightPx: 450,
      minKB: 20,
      maxKB: 50,
      dpi: 200,
      format: "JPG/JPEG",
      background: "Plain Light Gray or White",
      notes: "Face covering 70% of frame, crisp clarity, no red eye or flash glare."
    },
    signature: {
      widthCm: 3.5,
      heightCm: 1.5,
      widthPx: 350,
      heightPx: 150,
      minKB: 5,
      maxKB: 20,
      format: "JPG/JPEG",
      notes: "Black ink on clean white paper. Strictly 5KB to 20KB."
    },
    generalRules: [
      "Photo 20KB to 50KB, Signature 5KB to 20KB",
      "Both ears visibly uncovered",
      "No shadow on face or background"
    ],
    toolIds: ["up-police-photo-resizer", "compress-50", "signature-whitener"],
    lastVerified: "October 2026"
  },
  {
    key: "ctet",
    name: "CTET",
    fullName: "Central Teacher Eligibility Test (CBSE CTET)",
    sourceUrl: "https://ctet.nic.in",
    sourceLabel: "ctet.nic.in",
    notificationUrl: "https://ctet.nic.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Photo size strictly between 10KB and 100KB with 3.5cm x 4.5cm dimensions.",
      "Signature file size strictly between 3KB and 30KB with 3.5cm x 1.5cm dimensions."
    ],
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      widthPx: 413,
      heightPx: 531,
      minKB: 10,
      maxKB: 100,
      dpi: 300,
      format: "JPG/JPEG",
      background: "White",
      notes: "Recent passport photo with 80% face coverage without spectacles."
    },
    signature: {
      widthCm: 3.5,
      heightCm: 1.5,
      widthPx: 413,
      heightPx: 177,
      minKB: 3,
      maxKB: 30,
      format: "JPG/JPEG",
      notes: "Running hand signature in black/blue ink on white paper."
    },
    generalRules: [
      "Photo: 10KB to 100KB",
      "Signature: 3KB to 30KB",
      "Format: JPG/JPEG only"
    ],
    toolIds: ["ctet-photo-signature-resizer", "compress-100", "signature-resizer-10-20kb"],
    lastVerified: "October 2026"
  },
  {
    key: "upsssc",
    name: "UPSSSC",
    fullName: "Uttar Pradesh Subordinate Services Selection Commission (PET/Lekhpal)",
    sourceUrl: "https://upsssc.gov.in",
    sourceLabel: "upsssc.gov.in",
    notificationUrl: "https://upsssc.gov.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Candidate signature must have full name written in Hindi below the signature in English or vice-versa.",
      "Photo must be under 50KB and signature under 30KB."
    ],
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      minKB: 20,
      maxKB: 50,
      dpi: 200,
      format: "JPG/JPEG",
      background: "White or Light Gray",
      notes: "Front-facing colored photo taken within the last 6 months."
    },
    signature: {
      widthCm: 3.5,
      heightCm: 1.5,
      minKB: 5,
      maxKB: 30,
      format: "JPG/JPEG",
      notes: "Signature on white paper, under 30KB."
    },
    generalRules: [
      "Photo strictly under 50KB",
      "Signature strictly under 30KB",
      "No blur or dark background"
    ],
    toolIds: ["upsssc-pet-photo-resizer", "compress-50", "signature-whitener"],
    lastVerified: "October 2026"
  },
  {
    key: "vyapam",
    name: "MP ESB (Vyapam)",
    fullName: "Madhya Pradesh Employees Selection Board (MP ESB / Vyapam)",
    sourceUrl: "https://esb.mp.gov.in",
    sourceLabel: "esb.mp.gov.in",
    notificationUrl: "https://esb.mp.gov.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Mandatory Vyapam Profile Template: Single scanned image containing Candidate Photo with Name & Date, Signature, and Two-line Handwritten Declaration.",
      "Overall template file size must be between 100KB and 200KB."
    ],
    photo: {
      widthCm: 4.0,
      heightCm: 5.0,
      minKB: 20,
      maxKB: 100,
      dpi: 200,
      format: "JPG/JPEG",
      background: "White",
      notes: "Must have Candidate Name and Date of Photograph printed on bottom white strip."
    },
    signature: {
      widthCm: 4.0,
      heightCm: 2.0,
      minKB: 10,
      maxKB: 50,
      format: "JPG/JPEG",
      notes: "Black ink on white background."
    },
    generalRules: [
      "Photo must include clear Name & Date of Photo (DOP)",
      "Template file 100KB to 200KB",
      "Handwritten self-declaration included"
    ],
    toolIds: ["mp-vyapam-template-generator", "name-date-dop-stamp", "compress-200"],
    lastVerified: "October 2026"
  },
  {
    key: "rpsc",
    name: "RPSC / RSMSSB",
    fullName: "Rajasthan Public Service Commission & Staff Selection Board (CET/Patwar)",
    sourceUrl: "https://rpsc.rajasthan.gov.in",
    sourceLabel: "rpsc.rajasthan.gov.in",
    notificationUrl: "https://rpsc.rajasthan.gov.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Photo size between 50KB and 100KB (recent photo within 1 month).",
      "Signature size between 20KB and 50KB in black ink."
    ],
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      minKB: 50,
      maxKB: 100,
      dpi: 300,
      format: "JPG/JPEG",
      background: "White or Light Cream",
      notes: "Full face view, eyes open, neutral expression."
    },
    signature: {
      widthCm: 7.0,
      heightCm: 2.0,
      minKB: 20,
      maxKB: 50,
      format: "JPG/JPEG",
      notes: "Black ink on white unruled paper."
    },
    generalRules: [
      "Photo: 50KB to 100KB",
      "Signature: 20KB to 50KB",
      "Format: JPG/JPEG"
    ],
    toolIds: ["rajasthan-cet-photo-resizer", "compress-100", "compress-50"],
    lastVerified: "October 2026"
  },
  {
    key: "bihar-police",
    name: "Bihar Police",
    fullName: "Central Selection Board of Constable (CSBC) & BPSSC",
    sourceUrl: "https://csbc.bihar.gov.in",
    sourceLabel: "csbc.bihar.gov.in",
    notificationUrl: "https://csbc.bihar.gov.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Two separate signatures required: One in Hindi and One in English, both under 25KB.",
      "Colored photograph with white background, strictly under 25KB or 50KB depending on post."
    ],
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      minKB: 15,
      maxKB: 50,
      dpi: 200,
      format: "JPG/JPEG",
      background: "White",
      notes: "White background, straight head without tilted posture."
    },
    signature: {
      widthCm: 3.5,
      heightCm: 1.5,
      minKB: 5,
      maxKB: 25,
      format: "JPG/JPEG",
      notes: "Both English and Hindi signatures under 25KB each."
    },
    generalRules: [
      "Photo under 50KB",
      "English & Hindi signatures under 25KB each",
      "White background only"
    ],
    toolIds: ["bihar-police-photo-resizer", "compress-50", "signature-whitener"],
    lastVerified: "October 2026"
  },
  {
    key: "neet",
    name: "NEET UG",
    fullName: "National Testing Agency (NTA) NEET UG Medical Entrance",
    sourceUrl: "https://exams.nta.ac.in/NEET",
    sourceLabel: "exams.nta.ac.in/NEET",
    notificationUrl: "https://exams.nta.ac.in/NEET",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Requires BOTH Passport Size (10-200KB) AND Postcard Size 4\"x6\" Photo (10-200KB).",
      "Name of candidate and date of taking photograph must be clearly printed at bottom.",
      "80% face coverage with white background, ears clearly visible."
    ],
    photo: {
      widthCm: 10.0,
      heightCm: 15.0,
      minKB: 10,
      maxKB: 200,
      dpi: 300,
      format: "JPG/JPEG",
      background: "White",
      notes: "4\"x6\" Postcard size with candidate name and date stamp."
    },
    signature: {
      widthCm: 3.5,
      heightCm: 1.5,
      minKB: 4,
      maxKB: 30,
      format: "JPG/JPEG",
      notes: "Running hand signature in black ink."
    },
    generalRules: [
      "80% face coverage without mask/spectacles",
      "Postcard 4x6 inch and Passport size photos mandatory",
      "Left & Right hand fingers and thumb impression under 200KB"
    ],
    toolIds: ["neet-postcard-photo-resizer", "name-date-dop-stamp", "left-thumb-impression-resizer"],
    lastVerified: "October 2026"
  },
  {
    key: "dsssb",
    name: "DSSSB",
    fullName: "Delhi Subordinate Services Selection Board (DSSSB)",
    sourceUrl: "https://dsssbonline.nic.in",
    sourceLabel: "dsssbonline.nic.in",
    notificationUrl: "https://dsssbonline.nic.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "DSSSB mandates Postcard Size 5\"x7\" Photo (50KB to 300KB) OR Passport Size (40KB to 100KB).",
      "Signature: 140 width × 110 height px (20KB to 50KB).",
      "Left & Right Thumb Impression: 110 width × 140 height px (20KB to 50KB)."
    ],
    photo: {
      widthPx: 480,
      heightPx: 672,
      minKB: 50,
      maxKB: 300,
      dpi: 300,
      format: "JPG/JPEG",
      background: "White",
      notes: "Postcard 5x7 inch or passport photo with white background."
    },
    signature: {
      widthPx: 140,
      heightPx: 110,
      minKB: 20,
      maxKB: 50,
      format: "JPG/JPEG",
      notes: "Dark black ink on white paper."
    },
    generalRules: [
      "White background only without caps or dark glasses",
      "Left and Right thumb impressions required separately",
      "Signature in running hand (no block letters)"
    ],
    toolIds: ["signature-resizer-govt-forms", "signature-whitener", "left-thumb-impression-resizer"],
    lastVerified: "October 2026"
  },
  {
    key: "hssc",
    name: "HSSC",
    fullName: "Haryana Staff Selection Commission (CET & Police)",
    sourceUrl: "https://hssc.gov.in",
    sourceLabel: "hssc.gov.in",
    notificationUrl: "https://onetimeregn.haryana.gov.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Photo must not be older than 3 months with name & date printed.",
      "Photo size strictly 20KB to 50KB with light background.",
      "Signature strictly 10KB to 20KB in dark ink."
    ],
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      minKB: 20,
      maxKB: 50,
      dpi: 300,
      format: "JPG/JPEG",
      background: "White/Light",
      notes: "Recent passport photo with 80% face coverage."
    },
    signature: {
      widthCm: 4.0,
      heightCm: 2.0,
      minKB: 10,
      maxKB: 20,
      format: "JPG/JPEG",
      notes: "Black ink on clean white background."
    },
    generalRules: [
      "Both ears must be clearly visible",
      "Socio-economic criteria self-declaration under 200KB",
      "No selfies or filtered mobile photos allowed"
    ],
    toolIds: ["passport-photo-maker", "signature-whitener", "name-date-dop-stamp"],
    lastVerified: "October 2026"
  },
  {
    key: "jssc",
    name: "JSSC",
    fullName: "Jharkhand Staff Selection Commission (JSSC CGL & Police)",
    sourceUrl: "https://jssc.nic.in",
    sourceLabel: "jssc.nic.in",
    notificationUrl: "https://jssc.nic.in/notices",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Color passport size photo between 20KB and 50KB.",
      "Signature strictly between 10KB and 20KB in blue/black ink."
    ],
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      minKB: 20,
      maxKB: 50,
      dpi: 300,
      format: "JPG/JPEG",
      background: "Light Grey/White",
      notes: "Recent color passport photo."
    },
    signature: {
      widthCm: 3.5,
      heightCm: 1.5,
      minKB: 10,
      maxKB: 20,
      format: "JPG/JPEG",
      notes: "Signature on white paper."
    },
    generalRules: [
      "Frontal view with neutral facial expression",
      "No caps, hats or tinted sunglasses",
      "File size must not exceed 50KB for photo"
    ],
    toolIds: ["passport-photo-maker", "signature-resizer-govt-forms"],
    lastVerified: "October 2026"
  },
  {
    key: "ukpsc",
    name: "UKPSC",
    fullName: "Uttarakhand Public Service Commission (UKPSC)",
    sourceUrl: "https://psc.uk.gov.in",
    sourceLabel: "psc.uk.gov.in",
    notificationUrl: "https://ukpscnet.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "UKPSC requires photo size 20KB to 50KB in JPG format.",
      "Signature size 10KB to 20KB with clear white background."
    ],
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      minKB: 20,
      maxKB: 50,
      dpi: 300,
      format: "JPG/JPEG",
      background: "White",
      notes: "White background passport photo."
    },
    signature: {
      widthCm: 3.5,
      heightCm: 1.5,
      minKB: 10,
      maxKB: 20,
      format: "JPG/JPEG",
      notes: "Clear black ballpoint pen signature."
    },
    generalRules: [
      "White background mandatory",
      "Spectacles allowed only without glare",
      "Do not compress below 20KB"
    ],
    toolIds: ["passport-photo-maker", "signature-whitener"],
    lastVerified: "October 2026"
  },
  {
    key: "uksssc",
    name: "UKSSSC",
    fullName: "Uttarakhand Subordinate Service Selection Commission",
    sourceUrl: "https://sssc.uk.gov.in",
    sourceLabel: "sssc.uk.gov.in",
    notificationUrl: "https://sssc.uk.gov.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Photo: 20KB to 50KB with white background.",
      "Signature: 10KB to 20KB in running hand.",
      "Thumb Impression: 10KB to 20KB."
    ],
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      minKB: 20,
      maxKB: 50,
      dpi: 300,
      format: "JPG/JPEG",
      background: "White",
      notes: "3.5cm x 4.5cm passport photo."
    },
    signature: {
      widthCm: 3.5,
      heightCm: 1.5,
      minKB: 10,
      maxKB: 20,
      format: "JPG/JPEG",
      notes: "Black ink on white paper."
    },
    generalRules: [
      "OTR registration requires photo under 50KB",
      "Thumb impression required for group C recruitment"
    ],
    toolIds: ["signature-resizer-govt-forms", "left-thumb-impression-resizer"],
    lastVerified: "October 2026"
  },
  {
    key: "wbprb",
    name: "WB Police",
    fullName: "West Bengal Police Recruitment Board (WBPRB)",
    sourceUrl: "https://prb.wb.gov.in",
    sourceLabel: "prb.wb.gov.in",
    notificationUrl: "https://prb.wb.gov.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Photo: 10KB to 50KB, dimensions 138px width x 177px height.",
      "Signature: 5KB to 20KB, dimensions 350px width x 63px height."
    ],
    photo: {
      widthPx: 138,
      heightPx: 177,
      minKB: 10,
      maxKB: 50,
      dpi: 300,
      format: "JPG/JPEG",
      background: "White",
      notes: "Strict white background without shadow."
    },
    signature: {
      widthPx: 350,
      heightPx: 63,
      minKB: 5,
      maxKB: 20,
      format: "JPG/JPEG",
      notes: "Running handwriting in black ink."
    },
    generalRules: [
      "Clear front view of face with eyes open",
      "No head coverings except religious requirements",
      "Aspect ratio must match 138x177 px exactly"
    ],
    toolIds: ["passport-photo-maker", "signature-whitener"],
    lastVerified: "October 2026"
  },
  {
    key: "wbpsc",
    name: "WBPSC",
    fullName: "West Bengal Public Service Commission (WBCS)",
    sourceUrl: "https://psc.wb.gov.in",
    sourceLabel: "psc.wb.gov.in",
    notificationUrl: "https://psc.wb.gov.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Photo: 20KB to 100KB, passport size.",
      "Signature: 10KB to 50KB in black ink."
    ],
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      minKB: 20,
      maxKB: 100,
      dpi: 300,
      format: "JPG/JPEG",
      background: "White",
      notes: "White background passport photo."
    },
    signature: {
      widthCm: 4.0,
      heightCm: 2.0,
      minKB: 10,
      maxKB: 50,
      format: "JPG/JPEG",
      notes: "Signature on white paper."
    },
    generalRules: [
      "Enrolment photo must be sharp and in color",
      "No blurred or pixelated images"
    ],
    toolIds: ["passport-photo-maker", "signature-resizer-govt-forms"],
    lastVerified: "October 2026"
  },
  {
    key: "osssc",
    name: "OSSSC",
    fullName: "Odisha Subordinate Staff Selection Commission",
    sourceUrl: "https://osssc.gov.in",
    sourceLabel: "osssc.gov.in",
    notificationUrl: "https://osssc.gov.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Photo: 20KB to 100KB in JPG/JPEG format.",
      "Signature: 20KB to 50KB in dark blue/black ink.",
      "Thumb Impression: 20KB to 50KB."
    ],
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      minKB: 20,
      maxKB: 100,
      dpi: 300,
      format: "JPG/JPEG",
      background: "White",
      notes: "Recent passport photo."
    },
    signature: {
      widthCm: 3.5,
      heightCm: 1.5,
      minKB: 20,
      maxKB: 50,
      format: "JPG/JPEG",
      notes: "Signature on clean paper."
    },
    generalRules: [
      "Clear frontal view",
      "Left thumb impression must show ridge details"
    ],
    toolIds: ["signature-resizer-govt-forms", "left-thumb-impression-resizer"],
    lastVerified: "October 2026"
  },
  {
    key: "opsc",
    name: "OPSC",
    fullName: "Odisha Public Service Commission (OAS & OJS)",
    sourceUrl: "https://opsc.gov.in",
    sourceLabel: "opsc.gov.in",
    notificationUrl: "https://opsc.gov.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Photo: 20KB to 100KB, passport size.",
      "Signature: 10KB to 50KB."
    ],
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      minKB: 20,
      maxKB: 100,
      dpi: 300,
      format: "JPG/JPEG",
      background: "White",
      notes: "Color passport photo."
    },
    signature: {
      widthCm: 3.5,
      heightCm: 1.5,
      minKB: 10,
      maxKB: 50,
      format: "JPG/JPEG",
      notes: "Black ink signature."
    },
    generalRules: [
      "White background mandatory",
      "No sunglasses or dark tinted spectacles"
    ],
    toolIds: ["passport-photo-maker", "signature-whitener"],
    lastVerified: "October 2026"
  },
  {
    key: "mppsc",
    name: "MPPSC",
    fullName: "Madhya Pradesh Public Service Commission",
    sourceUrl: "https://mppsc.mp.gov.in",
    sourceLabel: "mppsc.mp.gov.in",
    notificationUrl: "https://mponline.gov.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Photo: 20KB to 100KB with candidate name and date stamp.",
      "Signature: 10KB to 50KB."
    ],
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      minKB: 20,
      maxKB: 100,
      dpi: 300,
      format: "JPG/JPEG",
      background: "Light White",
      notes: "Passport photo with name and date stamp."
    },
    signature: {
      widthCm: 4.0,
      heightCm: 2.0,
      minKB: 10,
      maxKB: 50,
      format: "JPG/JPEG",
      notes: "Signature on white paper."
    },
    generalRules: [
      "Candidate name and DOP on photo mandatory",
      "Do not blur face details"
    ],
    toolIds: ["name-date-dop-stamp", "mp-vyapam-template-generator"],
    lastVerified: "October 2026"
  },
  {
    key: "mpsc",
    name: "MPSC",
    fullName: "Maharashtra Public Service Commission",
    sourceUrl: "https://mpsc.gov.in",
    sourceLabel: "mpsc.gov.in",
    notificationUrl: "https://mpsconline.gov.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Photo: strictly up to 50KB (minimum 20KB).",
      "Signature: strictly up to 50KB (minimum 10KB)."
    ],
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      minKB: 20,
      maxKB: 50,
      dpi: 300,
      format: "JPG/JPEG",
      background: "White",
      notes: "Clear passport photo."
    },
    signature: {
      widthCm: 3.5,
      heightCm: 1.5,
      minKB: 10,
      maxKB: 50,
      format: "JPG/JPEG",
      notes: "Signature on white background."
    },
    generalRules: [
      "White background required",
      "High resolution without shadow"
    ],
    toolIds: ["passport-photo-maker", "signature-whitener"],
    lastVerified: "October 2026"
  },
  {
    key: "tnpsc",
    name: "TNPSC",
    fullName: "Tamil Nadu Public Service Commission (Group 1, 2, 4)",
    sourceUrl: "https://tnpsc.gov.in",
    sourceLabel: "tnpsc.gov.in",
    notificationUrl: "https://tnpscexams.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Photo: 20KB to 50KB, 200 DPI, candidate name & date of photo printed at bottom.",
      "Signature: 10KB to 20KB, 200 DPI in blue/black ink."
    ],
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      minKB: 20,
      maxKB: 50,
      dpi: 200,
      format: "JPG/JPEG",
      background: "White",
      notes: "Name of applicant and date of taking photo mandatory at bottom."
    },
    signature: {
      widthCm: 6.0,
      heightCm: 2.0,
      minKB: 10,
      maxKB: 20,
      dpi: 200,
      format: "JPG/JPEG",
      notes: "Blue or black ink on clean white sheet."
    },
    generalRules: [
      "Name and date of photo printed at bottom is mandatory",
      "OTR photo must be recent within 3 months"
    ],
    toolIds: ["name-date-dop-stamp", "signature-whitener"],
    lastVerified: "October 2026"
  },
  {
    key: "kpsc",
    name: "KPSC",
    fullName: "Karnataka Public Service Commission (KAS & Group C)",
    sourceUrl: "https://kpsc.kar.nic.in",
    sourceLabel: "kpsc.kar.nic.in",
    notificationUrl: "https://kpsconline.karnataka.gov.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Photo: 20KB to 50KB with white background.",
      "Signature: 10KB to 20KB in black ink."
    ],
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      minKB: 20,
      maxKB: 50,
      dpi: 300,
      format: "JPG/JPEG",
      background: "White",
      notes: "Passport photo on white background."
    },
    signature: {
      widthCm: 3.5,
      heightCm: 1.5,
      minKB: 10,
      maxKB: 20,
      format: "JPG/JPEG",
      notes: "Signature on white paper."
    },
    generalRules: [
      "White background only",
      "Both ears must be clearly visible"
    ],
    toolIds: ["passport-photo-maker", "signature-resizer-govt-forms"],
    lastVerified: "October 2026"
  },
  {
    key: "appsc",
    name: "APPSC",
    fullName: "Andhra Pradesh Public Service Commission",
    sourceUrl: "https://psc.ap.gov.in",
    sourceLabel: "psc.ap.gov.in",
    notificationUrl: "https://psc.ap.gov.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Photo: up to 50KB (3.5cm x 4.5cm).",
      "Signature: up to 30KB (3.5cm x 1.5cm)."
    ],
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      minKB: 20,
      maxKB: 50,
      dpi: 300,
      format: "JPG/JPEG",
      background: "White/Light",
      notes: "Recent passport photo."
    },
    signature: {
      widthCm: 3.5,
      heightCm: 1.5,
      minKB: 10,
      maxKB: 30,
      format: "JPG/JPEG",
      notes: "Signature in black ballpoint pen."
    },
    generalRules: [
      "OTR profile photo must be crisp",
      "White or light background"
    ],
    toolIds: ["passport-photo-maker", "signature-whitener"],
    lastVerified: "October 2026"
  },
  {
    key: "tspsc",
    name: "TSPSC",
    fullName: "Telangana State Public Service Commission",
    sourceUrl: "https://tspsc.gov.in",
    sourceLabel: "tspsc.gov.in",
    notificationUrl: "https://tspsc.gov.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Photo: up to 50KB in JPG format.",
      "Signature: up to 30KB in JPG format."
    ],
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      minKB: 20,
      maxKB: 50,
      dpi: 300,
      format: "JPG/JPEG",
      background: "White",
      notes: "Passport photo with white background."
    },
    signature: {
      widthCm: 3.5,
      heightCm: 1.5,
      minKB: 10,
      maxKB: 30,
      format: "JPG/JPEG",
      notes: "Black ink signature."
    },
    generalRules: [
      "OTR requires single photo and signature upload",
      "Clear facial features"
    ],
    toolIds: ["passport-photo-maker", "signature-resizer-govt-forms"],
    lastVerified: "October 2026"
  },
  {
    key: "tslprb",
    name: "TS Police",
    fullName: "Telangana State Level Police Recruitment Board",
    sourceUrl: "https://tslprb.in",
    sourceLabel: "tslprb.in",
    notificationUrl: "https://tslprb.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Photo: up to 50KB.",
      "Signature: up to 30KB."
    ],
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      minKB: 20,
      maxKB: 50,
      dpi: 300,
      format: "JPG/JPEG",
      background: "White",
      notes: "Passport photo with clear background."
    },
    signature: {
      widthCm: 3.5,
      heightCm: 1.5,
      minKB: 10,
      maxKB: 30,
      format: "JPG/JPEG",
      notes: "Black ink signature."
    },
    generalRules: [
      "Physical efficiency candidate verification photo",
      "White background only"
    ],
    toolIds: ["passport-photo-maker", "signature-whitener"],
    lastVerified: "October 2026"
  },
  {
    key: "army-agniveer",
    name: "Army Agniveer",
    fullName: "Indian Army Agniveer Recruitment Rally & CEE",
    sourceUrl: "https://joinindianarmy.nic.in",
    sourceLabel: "joinindianarmy.nic.in",
    notificationUrl: "https://joinindianarmy.nic.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Photo: 5KB to 20KB or 20KB to 50KB depending on rally entry.",
      "Signature: 5KB to 10KB in black ink.",
      "Sikh candidates must wear proper turban."
    ],
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      minKB: 10,
      maxKB: 50,
      dpi: 300,
      format: "JPG/JPEG",
      background: "Light/White",
      notes: "Recent passport photo with neat haircut and clear ears."
    },
    signature: {
      widthCm: 3.5,
      heightCm: 1.5,
      minKB: 5,
      maxKB: 15,
      format: "JPG/JPEG",
      notes: "Signature on white paper."
    },
    generalRules: [
      "Neat haircut with ears clearly visible",
      "No sunglasses or fancy caps",
      "Light background mandatory"
    ],
    toolIds: ["passport-photo-maker", "signature-whitener"],
    lastVerified: "October 2026"
  },
  {
    key: "airforce-agniveer",
    name: "Air Force Agniveer",
    fullName: "Indian Air Force Agniveer Vayu Recruitment",
    sourceUrl: "https://agnipathvayu.cdac.in",
    sourceLabel: "agnipathvayu.cdac.in",
    notificationUrl: "https://agnipathvayu.cdac.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Mandatory: Candidate must hold a black slate in front of chest with name and date of photo written clearly in white chalk.",
      "Photo: 10KB to 50KB in JPG/JPEG format.",
      "Signature: 10KB to 50KB.",
      "Left Thumb Impression: 10KB to 50KB."
    ],
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      minKB: 10,
      maxKB: 50,
      dpi: 300,
      format: "JPG/JPEG",
      background: "Light",
      notes: "Black slate in front of chest with candidate name and DOP written in white chalk."
    },
    signature: {
      widthCm: 3.5,
      heightCm: 1.5,
      minKB: 10,
      maxKB: 50,
      format: "JPG/JPEG",
      notes: "Signature in black ballpoint pen."
    },
    generalRules: [
      "Black slate with Name and DOP in white chalk is mandatory",
      "Left thumb impression must be unblurred",
      "File size must not exceed 50KB"
    ],
    toolIds: ["name-date-dop-stamp", "left-thumb-impression-resizer"],
    lastVerified: "October 2026"
  },
  {
    key: "navy-agniveer",
    name: "Navy Agniveer",
    fullName: "Indian Navy Agniveer MR & SSR Recruitment",
    sourceUrl: "https://joinindiannavy.gov.in",
    sourceLabel: "joinindiannavy.gov.in",
    notificationUrl: "https://joinindiannavy.gov.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Photo: 10KB to 50KB with plain blue background.",
      "Signature: 10KB to 20KB in blue/black ink."
    ],
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      minKB: 10,
      maxKB: 50,
      dpi: 300,
      format: "JPG/JPEG",
      background: "Blue",
      notes: "Plain blue background passport photo."
    },
    signature: {
      widthCm: 3.5,
      heightCm: 1.5,
      minKB: 10,
      maxKB: 20,
      format: "JPG/JPEG",
      notes: "Signature on white paper."
    },
    generalRules: [
      "Blue background mandatory for Navy uploads",
      "Both ears must be clearly visible"
    ],
    toolIds: ["passport-photo-maker", "signature-whitener"],
    lastVerified: "October 2026"
  },
  {
    key: "nda-cds",
    name: "NDA & CDS",
    fullName: "UPSC National Defence Academy & Combined Defence Services",
    sourceUrl: "https://upsconline.nic.in",
    sourceLabel: "upsconline.nic.in",
    notificationUrl: "https://upsconline.nic.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Photo: 20KB to 300KB, pixel dimensions 350x350 to 1000x1000.",
      "Name and Date of photograph must be printed at the bottom.",
      "Signature: 20KB to 300KB, pixel dimensions 350x350 to 1000x1000."
    ],
    photo: {
      widthPx: 550,
      heightPx: 550,
      minKB: 20,
      maxKB: 300,
      dpi: 300,
      format: "JPG/JPEG",
      background: "White",
      notes: "350x350 to 1000x1000 px with candidate name and date stamp."
    },
    signature: {
      widthPx: 550,
      heightPx: 550,
      minKB: 20,
      maxKB: 300,
      format: "JPG/JPEG",
      notes: "Square box signature 350x350 to 1000x1000 px."
    },
    generalRules: [
      "Photo not older than 10 days before application start date",
      "Name and date printed on photo is mandatory"
    ],
    toolIds: ["name-date-dop-stamp", "signature-whitener"],
    lastVerified: "October 2026"
  },
  {
    key: "afcat",
    name: "AFCAT",
    fullName: "Air Force Common Admission Test (AFCAT Flying & Ground Duty)",
    sourceUrl: "https://afcat.cdac.in",
    sourceLabel: "afcat.cdac.in",
    notificationUrl: "https://afcat.cdac.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Photo: 10KB to 50KB in JPG/JPEG.",
      "Signature: 10KB to 50KB.",
      "Thumb Impression: 10KB to 50KB."
    ],
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      minKB: 10,
      maxKB: 50,
      dpi: 300,
      format: "JPG/JPEG",
      background: "Light",
      notes: "Recent passport photo."
    },
    signature: {
      widthCm: 3.5,
      heightCm: 1.5,
      minKB: 10,
      maxKB: 50,
      format: "JPG/JPEG",
      notes: "Signature in black ballpoint pen."
    },
    generalRules: [
      "Passport photo under 50KB",
      "Left thumb impression under 50KB"
    ],
    toolIds: ["passport-photo-maker", "left-thumb-impression-resizer"],
    lastVerified: "October 2026"
  },
  {
    key: "gate",
    name: "GATE",
    fullName: "Graduate Aptitude Test in Engineering (GATE / JAM)",
    sourceUrl: "https://gate2026.iitk.ac.in",
    sourceLabel: "gate2026.iitk.ac.in",
    notificationUrl: "https://gate2026.iitk.ac.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Photo: 20KB to 200KB, aspect ratio 3.5cm x 4.5cm, 60-70% face coverage.",
      "Signature: 5KB to 200KB, aspect ratio 2:1, dark blue/black ink."
    ],
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      minKB: 20,
      maxKB: 200,
      dpi: 300,
      format: "JPG/JPEG",
      background: "White",
      notes: "White background with 60-70% face coverage."
    },
    signature: {
      widthCm: 4.0,
      heightCm: 2.0,
      minKB: 5,
      maxKB: 200,
      format: "JPG/JPEG",
      notes: "Dark blue or black ink."
    },
    generalRules: [
      "White background only",
      "60-70% face coverage without spectacles or shadows"
    ],
    toolIds: ["passport-photo-maker", "signature-whitener"],
    lastVerified: "October 2026"
  },
  {
    key: "ugc-net",
    name: "UGC NET",
    fullName: "National Testing Agency (NTA) UGC NET / CSIR NET",
    sourceUrl: "https://ugcnet.nta.ac.in",
    sourceLabel: "ugcnet.nta.ac.in",
    notificationUrl: "https://ugcnet.nta.ac.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Photo: 10KB to 200KB, 80% face coverage with white background.",
      "Signature: 4KB to 30KB in running hand."
    ],
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      minKB: 10,
      maxKB: 200,
      dpi: 300,
      format: "JPG/JPEG",
      background: "White",
      notes: "80% face coverage with white background."
    },
    signature: {
      widthCm: 3.5,
      heightCm: 1.5,
      minKB: 4,
      maxKB: 30,
      format: "JPG/JPEG",
      notes: "Running handwriting in black ink."
    },
    generalRules: [
      "White background with visible ears",
      "Do not compress signature below 4KB"
    ],
    toolIds: ["passport-photo-maker", "signature-resizer-govt-forms"],
    lastVerified: "October 2026"
  },
  {
    key: "india-post-gds",
    name: "India Post GDS",
    fullName: "India Post Gramin Dak Sevak (GDS 40,000+ Posts)",
    sourceUrl: "https://indiapostgdsonline.gov.in",
    sourceLabel: "indiapostgdsonline.gov.in",
    notificationUrl: "https://indiapostgdsonline.gov.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Photo: strictly up to 50KB, dimensions 200 x 230 pixels.",
      "Signature: strictly up to 20KB, dimensions 140 x 60 pixels."
    ],
    photo: {
      widthPx: 200,
      heightPx: 230,
      minKB: 10,
      maxKB: 50,
      dpi: 200,
      format: "JPG/JPEG",
      background: "Light/White",
      notes: "200x230 px passport photo under 50KB."
    },
    signature: {
      widthPx: 140,
      heightPx: 60,
      minKB: 5,
      maxKB: 20,
      format: "JPG/JPEG",
      notes: "140x60 px signature under 20KB."
    },
    generalRules: [
      "Exact 200x230 px photo dimensions required by India Post portal",
      "Signature must be exactly 140x60 px"
    ],
    toolIds: ["passport-photo-maker", "signature-resizer-govt-forms"],
    lastVerified: "October 2026"
  },
  {
    key: "sbi",
    name: "SBI PO & Clerk",
    fullName: "State Bank of India (SBI PO, Clerk & Specialist Officers)",
    sourceUrl: "https://sbi.co.in/careers",
    sourceLabel: "sbi.co.in/careers",
    notificationUrl: "https://ibpsonline.ibps.in",
    recruitmentCycle: "2026-2027",
    lastCheckedDate: "2026-10-01",
    reviewDueDate: "2027-01-01",
    exceptions: [
      "Photo: 20KB to 50KB, 200 x 230 pixels.",
      "Signature: 10KB to 20KB, 140 x 60 pixels.",
      "Left Thumb Impression: 20KB to 50KB.",
      "Handwritten Declaration: 50KB to 100KB."
    ],
    photo: {
      widthPx: 200,
      heightPx: 230,
      minKB: 20,
      maxKB: 50,
      dpi: 200,
      format: "JPG/JPEG",
      background: "White",
      notes: "200x230 px photo with white background."
    },
    signature: {
      widthPx: 140,
      heightPx: 60,
      minKB: 10,
      maxKB: 20,
      format: "JPG/JPEG",
      notes: "140x60 px signature in black ink."
    },
    generalRules: [
      "Handwritten declaration must be in English with black ink (50-100KB)",
      "Left thumb impression in blue/black ink (20-50KB)"
    ],
    toolIds: ["handwritten-declaration-compressor", "left-thumb-impression-resizer", "signature-whitener"],
    lastVerified: "October 2026"
  },
];

export function getExamByKey(key: string): ExamSpec | undefined {
  return EXAM_SPECS.find((e) => e.key === key);
}

export function getAllExamKeys(): string[] {
  return EXAM_SPECS.map((e) => e.key);
}

export function isExamReviewDue(spec: ExamSpec): boolean {
  const today = new Date().toISOString().split("T")[0];
  return today >= spec.reviewDueDate;
}
