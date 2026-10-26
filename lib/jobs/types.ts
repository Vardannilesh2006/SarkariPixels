// lib/jobs/types.ts
// Strict schema for tracked Sarkari job alerts, vacancies, and official photo/signature criteria

export type JobCategory =
  | "railway"
  | "ssc"
  | "upsc"
  | "banking"
  | "defence"
  | "police"
  | "state-psc"
  | "teaching"
  | "postal"
  | "other";

export interface PhotoUploadSpec {
  widthCm?: number;
  heightCm?: number;
  widthPx?: number;
  heightPx?: number;
  minKB: number;
  maxKB: number;
  dpi?: number;
  format: "JPG" | "JPEG" | "PNG" | "JPG/JPEG";
  background: string;
  notes?: string;
  hasNameDateStamp?: boolean;
  isLiveWebcamRequired?: boolean;
}

export interface SignatureUploadSpec {
  widthCm?: number;
  heightCm?: number;
  widthPx?: number;
  heightPx?: number;
  minKB: number;
  maxKB: number;
  dpi?: number;
  format: "JPG" | "JPEG" | "PNG" | "JPG/JPEG";
  inkColor?: string;
  notes?: string;
}

export interface DocumentUploadSpec {
  name: string;
  minKB?: number;
  maxKB: number;
  format: string;
}

export interface SarkariJobAlert {
  id: string; // e.g. "rrb-alp-recruitment-2026"
  slug: string; // e.g. "rrb-alp-photo-signature-resizer"
  title: string; // "RRB Assistant Loco Pilot (ALP) Recruitment 2026"
  shortTitle: string; // "RRB ALP 2026"
  board: string; // "Railway Recruitment Board (RRB)"
  vacancies: number; // e.g. 18799
  category: JobCategory;
  notificationDate: string; // "YYYY-MM-DD"
  lastDateToApply: string; // "YYYY-MM-DD"
  officialNotificationUrl: string;
  applyOnlineUrl: string;
  status: "active" | "closing-soon" | "closed";
  photo: PhotoUploadSpec;
  signature: SignatureUploadSpec;
  additionalDocs?: DocumentUploadSpec[];
  rules: string[];
  keywords: string[];
  primaryToolId: string; // link to existing tool e.g. "smart-resizer" or "resize-cm"
  lastUpdated: string;
}
