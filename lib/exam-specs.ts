// lib/exam-specs.ts
// Single source of truth for all government exam photo/signature specifications.
// Updating one entry here updates every tool page, spec hub page, and AI assistant response.
// Last verified: June 2026

export interface ExamSpec {
  key: string;
  name: string;
  fullName: string;
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
      notes: "Black or dark blue ink on white paper. Signature must be in English.",
    },
    generalRules: [
      "White or light-colored background only",
      "No caps, sunglasses, or masks",
      "Front-facing photo, eyes clearly visible",
      "Photo must be recent (taken within 6 months)",
      "Name and date printed at the bottom for some exams",
    ],
    toolIds: ["ssc-photo", "resize-35-45", "compress-50", "reduce-kb"],
    lastVerified: "June 2026",
  },
  {
    key: "upsc",
    name: "UPSC",
    fullName: "Union Public Service Commission (UPSC)",
    photo: {
      widthPx: 350,
      heightPx: 350,
      minKB: 20,
      maxKB: 300,
      format: "JPG/JPEG",
      background: "White",
      notes: "Square format. White border at bottom with candidate's name and date of photograph.",
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
      "Square photograph mandatory",
      "White background with name + date stamp at bottom",
      "No dark or patterned backgrounds",
      "Glasses permitted if worn regularly",
      "File size strictly between 20KB and 300KB",
    ],
    toolIds: ["upsc-photo-resize", "resize-600-600", "compress-300"],
    lastVerified: "June 2026",
  },
  {
    key: "bpsc",
    name: "BPSC",
    fullName: "Bihar Public Service Commission (BPSC)",
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
      "No stickers or marks on photo",
    ],
    toolIds: ["ssc-photo", "compress-50", "compress-20"],
    lastVerified: "June 2026",
  },
  {
    key: "bssc",
    name: "BSSC",
    fullName: "Bihar Staff Selection Commission (BSSC)",
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
      notes: "Submit both English and Hindi signatures for some BSSC forms.",
    },
    generalRules: [
      "Legible English and Hindi signatures required for some posts",
      "White background",
      "Recent photograph",
    ],
    toolIds: ["psc-photo", "compress-50", "reduce-kb"],
    lastVerified: "June 2026",
  },
  {
    key: "rrb",
    name: "RRB",
    fullName: "Railway Recruitment Board (RRB / RRC)",
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
      "White background",
      "Photo less than 3 months old",
      "No digital manipulations to face",
    ],
    toolIds: ["ssc-photo", "compress-50", "compress-30"],
    lastVerified: "June 2026",
  },
  {
    key: "nta",
    name: "NTA / JEE / NEET",
    fullName: "National Testing Agency (NTA) — JEE, NEET, CUET etc.",
    photo: {
      widthPx: 100,
      heightPx: 120,
      minKB: 10,
      maxKB: 200,
      format: "JPG/JPEG",
      background: "White or off-white",
      notes: "NTA requirements vary per exam. NEET 2024: 10KB–200KB, 100x120 px minimum.",
    },
    signature: {
      widthPx: 100,
      heightPx: 60,
      minKB: 4,
      maxKB: 30,
      format: "JPG/JPEG",
    },
    generalRules: [
      "Check specific exam notification for exact requirements",
      "White or off-white background preferred",
      "Clear and recent photograph",
    ],
    toolIds: ["compress-200", "compress-50", "reduce-kb"],
    lastVerified: "June 2026",
  },
  {
    key: "ibps",
    name: "IBPS / Bank PO",
    fullName: "Institute of Banking Personnel Selection (IBPS) & SBI",
    photo: {
      widthPx: 200,
      heightPx: 230,
      minKB: 20,
      maxKB: 50,
      format: "JPG/JPEG",
      background: "White",
      notes: "200x230 px, 20-50KB for IBPS PO/Clerk. SBI PO allows up to 100KB.",
    },
    signature: {
      widthPx: 140,
      heightPx: 60,
      minKB: 10,
      maxKB: 20,
      format: "JPG/JPEG",
      notes: "Blue or black ink on white background.",
    },
    generalRules: [
      "White background mandatory",
      "Formal attire recommended",
      "No smiling with teeth",
      "File format must be JPG only",
    ],
    toolIds: ["compress-50", "compress-20", "resize-pixel"],
    lastVerified: "June 2026",
  },
  {
    key: "pan",
    name: "PAN Card",
    fullName: "NSDL / UTI PAN Card Application",
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
    lastVerified: "June 2026",
  },
];

export function getExamByKey(key: string): ExamSpec | undefined {
  return EXAM_SPECS.find((e) => e.key === key);
}

export function getAllExamKeys(): string[] {
  return EXAM_SPECS.map((e) => e.key);
}
