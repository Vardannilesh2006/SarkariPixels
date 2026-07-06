"use client";

import { useState, useRef, useCallback } from "react";
import type { Tool } from "@/lib/tools-data";

/* ── Category Colors ────────────────────────────────────────────────── */
export const CATEGORY_COLORS: Record<string, { color: string; bg: string }> = {
  "basic-edit": { color: "#2563EB", bg: "#2563eb1a" },
  effects: { color: "#7C3AED", bg: "#7c3aed1a" },
  "dpi-quality": { color: "#0EA5E9", bg: "#0ea5e91a" },
  "id-sizes": { color: "#059669", bg: "#0596691a" },
  "general-compress": { color: "#F97316", bg: "#f973161a" },
  "target-sizes": { color: "#EA580C", bg: "#ea580c1a" },
  "official-sizes": { color: "#DC2626", bg: "#dc26261a" },
  "most-used": { color: "#2563EB", bg: "#2563eb1a" },
};

/* ── Utility Functions ──────────────────────────────────────────────── */
export function readFile(f: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(f);
  });
}

export function readFileAsBuffer(f: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = reject;
    reader.readAsArrayBuffer(f);
  });
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  q: number,
  type: string = "image/jpeg"
): Promise<Blob> {
  return new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b!), type, q)
  );
}

export async function compressToTargetKB(
  canvas: HTMLCanvasElement,
  targetKBVal: number
): Promise<Blob> {
  const targetBytes = targetKBVal * 1024;
  let lo = 0.01;
  let hi = 0.95;
  let blob = await canvasToBlob(canvas, hi);

  for (let i = 0; i < 20; i++) {
    const q = (lo + hi) / 2;
    blob = await canvasToBlob(canvas, q);
    if (blob.size > targetBytes) hi = q;
    else lo = q;
    if (Math.abs(blob.size - targetBytes) < 1024) break;
  }
  return blob;
}

export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function clamp(v: number): number {
  return Math.max(0, Math.min(255, Math.round(v)));
}

export function unitToPx(val: number, u: string, dpi: number = 300): number {
  if (u === "px") return Math.round(val);
  if (u === "cm") return Math.round((val / 2.54) * dpi);
  if (u === "mm") return Math.round((val / 25.4) * dpi);
  if (u === "inch") return Math.round(val * dpi);
  return Math.round(val);
}

/* ── Shared Upload Zone Component ───────────────────────────────────── */
interface UploadZoneProps {
  tool: Tool;
  onFile: (f: File) => void;
  accept?: string;
  label?: string;
  id?: string;
}

export function UploadZone({ tool, onFile, accept = "image/*", label, id = "file-input" }: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Upload image — drag and drop or click to browse"
      onDrop={handleDrop}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={() => setIsDragOver(false)}
      onClick={() => document.getElementById(id)?.click()}
      onKeyDown={(e) => e.key === "Enter" && document.getElementById(id)?.click()}
      className={`upload-zone flex flex-col items-center justify-center py-14 text-center select-none cursor-pointer${isDragOver ? " drag-over" : ""}`}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{
          backgroundColor: CATEGORY_COLORS[tool.category]?.bg || "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
        aria-hidden="true"
      >
        <div
          style={{
            width: "28px",
            height: "28px",
            backgroundColor: CATEGORY_COLORS[tool.category]?.color || "var(--color-accent)",
            WebkitMaskImage: `url(/icons/tools/${tool.id}.svg)`,
            maskImage: `url(/icons/tools/${tool.id}.svg)`,
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        />
      </div>
      <p className="text-sm font-semibold mb-1" style={{ color: "var(--color-text)" }}>
        {label || "Drag or Browse Image"}
      </p>
      <p className="t-caption">JPG, PNG, WebP · Max 20MB</p>
      <input
        id={id}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
      />
    </div>
  );
}

/* ── Shared Result Preview Component ────────────────────────────────── */
interface ResultPreviewProps {
  originalSrc: string;
  originalSize: number;
  outputBlob: Blob;
  outputSize: number;
  toolId: string;
  targetKB?: number;
  outputFormat?: string;
  onReset: () => void;
}

export function ResultPreview({
  originalSrc,
  originalSize,
  outputBlob,
  outputSize,
  toolId,
  targetKB,
  outputFormat = "jpg",
  onReset,
}: ResultPreviewProps) {
  const targetBytesLimit = targetKB ? targetKB * 1024 : undefined;
  const isCompliant = targetBytesLimit ? outputSize <= targetBytesLimit : true;

  function download() {
    const url = URL.createObjectURL(outputBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${toolId}_sarkaripixels.${outputFormat}`;
    a.click();
    URL.revokeObjectURL(url);

    setTimeout(() => {
      const share = document.getElementById("whatsapp-share-nudge");
      if (share) share.style.display = "flex";
    }, 500);
  }

  return (
    <div className="space-y-5">
      {/* Before / After */}
      <div className="grid grid-cols-2 gap-3">
        <div
          className="rounded-xl border p-3"
          style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)" }}
        >
          <span className="t-caption font-semibold uppercase tracking-wider block mb-2">Original</span>
          <img
            src={originalSrc}
            alt="Original input"
            className="max-h-40 w-full object-contain rounded-lg"
            style={{ backgroundColor: "var(--color-surface)" }}
          />
          <div className="t-caption mt-2">{formatSize(originalSize)}</div>
        </div>
        <div
          className="rounded-xl border p-3 relative"
          style={{
            borderColor: isCompliant ? "#86efac" : "#fca5a5",
            backgroundColor: "var(--color-bg)",
          }}
        >
          <span
            className="t-caption font-semibold uppercase tracking-wider block mb-2"
            style={{ color: "var(--color-accent)" }}
          >
            Output
          </span>
          <img
            src={URL.createObjectURL(outputBlob)}
            alt="Processed output preview"
            className="max-h-40 w-full object-contain rounded-lg"
            style={{ backgroundColor: "var(--color-surface)" }}
          />
          {targetKB && (
            <span
              className="absolute top-3 right-3 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider"
              style={{ backgroundColor: isCompliant ? "#16a34a" : "#dc2626" }}
            >
              {isCompliant ? "✓ Within Limit" : "⚠ Too Large"}
            </span>
          )}
          <div className="flex justify-between items-center mt-2">
            <span className="t-caption font-semibold" style={{ color: "var(--color-accent)" }}>
              {formatSize(outputSize)}
            </span>
            {targetKB && <span className="t-caption">Target: {targetKB} KB</span>}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={download} className="btn btn-primary flex-1" style={{ justifyContent: "center" }}>
          <i className="fa-solid fa-download" aria-hidden="true" />
          Download {outputFormat.toUpperCase()}
        </button>
        <button onClick={onReset} className="btn btn-secondary">
          Change Photo
        </button>
      </div>

      {/* WhatsApp share nudge */}
      <div
        id="whatsapp-share-nudge"
        style={{ display: "none", backgroundColor: "#f0fdf4", borderColor: "#86efac" }}
        className="items-center gap-3 rounded-xl p-4 border"
      >
        <i className="fa-brands fa-whatsapp" style={{ color: "#16a34a", fontSize: "20px" }} aria-hidden="true" />
        <div className="flex-grow">
          <p className="text-sm font-semibold" style={{ color: "#166534" }}>Apne dosto ko share karein!</p>
          <p className="t-caption">Unka bhi time bachao — free tool hai.</p>
        </div>
        <button
          onClick={() => {
            const text = encodeURIComponent(
              `Maine apna exam photo isse 10 second mein resize kiya — safe and free: ${window.location.href}`
            );
            window.open(`https://wa.me/?text=${text}`, "_blank");
          }}
          className="btn btn-sm"
          style={{ backgroundColor: "#16a34a", color: "#fff", borderColor: "#16a34a" }}
        >
          Share
        </button>
      </div>
    </div>
  );
}

/* ── Processing Spinner ─────────────────────────────────────────────── */
export function ProcessingSpinner({ step }: { step: string }) {
  return (
    <div
      className="flex items-center justify-center gap-2 py-4 rounded-xl border"
      style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
    >
      <i className="fa-solid fa-spinner animate-spin" style={{ color: "var(--color-accent)", fontSize: "14px" }} aria-hidden="true" />
      <span className="t-caption" style={{ fontWeight: 500 }}>Processing: {step}…</span>
    </div>
  );
}

/* ── Error Banner ───────────────────────────────────────────────────── */
export function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-center gap-3 rounded-xl p-4"
      style={{ fontSize: "0.875rem", color: "#dc2626", backgroundColor: "#fef2f2", border: "1px solid #fecaca" }}
    >
      <i className="fa-solid fa-circle-exclamation" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}

/* ── File Validator ─────────────────────────────────────────────────── */
export function validateImageFile(f: File): string | null {
  if (!f.type.startsWith("image/")) return "Sirf photos (JPG, PNG, WebP) supported hain.";
  if (f.size > 20 * 1024 * 1024) return "Photo bahut badi hai (max 20MB allowed).";
  return null;
}

/* ── Convolution Kernel Helper ──────────────────────────────────────── */
export function applyKernel(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  src: Uint8ClampedArray,
  kernel: number[]
) {
  const output = ctx.createImageData(w, h);
  const d = output.data;
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      let r = 0, g = 0, b = 0;
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const idx = ((y + ky) * w + (x + kx)) * 4;
          const k = kernel[(ky + 1) * 3 + (kx + 1)];
          r += src[idx] * k;
          g += src[idx + 1] * k;
          b += src[idx + 2] * k;
        }
      }
      const i = (y * w + x) * 4;
      d[i] = clamp(r);
      d[i + 1] = clamp(g);
      d[i + 2] = clamp(b);
      d[i + 3] = src[i + 3];
    }
  }
  ctx.putImageData(output, 0, 0);
}
