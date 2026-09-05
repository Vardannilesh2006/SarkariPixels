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
