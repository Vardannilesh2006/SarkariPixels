"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { Tool } from "@/lib/tools-data";

interface Props {
  tool: Tool;
}

type ProcessingStep = "idle" | "reading" | "resizing" | "compressing" | "done" | "error";

export default function ToolEditor({ tool }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [originalSrc, setOriginalSrc] = useState<string | null>(null);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputSize, setOutputSize] = useState<number>(0);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [step, setStep] = useState<ProcessingStep>("idle");
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Settings
  const [targetKB, setTargetKB] = useState(tool.targetKB || tool.defaultKB || 50);
  const [width, setWidth] = useState(tool.defaultW || 800);
  const [height, setHeight] = useState(tool.defaultH || 600);
  const [unit, setUnit] = useState<"px" | "cm" | "mm" | "inch">(tool.unit || "px");
  const [quality] = useState(85);
  const [aspectRatio, setAspectRatio] = useState<number>(1.333); // default 4:3
  const [lockAspect, setLockAspect] = useState<boolean>(true);

  // User details for admit card preview simulation
  const [previewName] = useState("Rahul Sharma");
  const [previewRoll] = useState("2201048293");

  // Onboarding walkthrough tour state
  const [showTour, setShowTour] = useState(false);
  const [tourStep, setTourStep] = useState(1);

  // Check if first-time visitor
  useEffect(() => {
    if (typeof window !== "undefined") {
      const visited = localStorage.getItem("sp-visited-editor");
      if (!visited) {
        setShowTour(true);
      }
    }
  }, []);

  const dismissTour = () => {
    setShowTour(false);
    localStorage.setItem("sp-visited-editor", "true");
  };

  const nextTour = () => {
    if (tourStep < 3) {
      setTourStep(tourStep + 1);
    } else {
      dismissTour();
    }
  };

  function unitToPx(val: number, u: string): number {
    if (u === "px") return Math.round(val);
    const targetDPI = tool.dpi || 300;
    if (u === "cm") return Math.round((val / 2.54) * targetDPI);
    if (u === "mm") return Math.round((val / 25.4) * targetDPI);
    if (u === "inch") return Math.round(val * targetDPI);
    return Math.round(val);
  }

  const processImage = useCallback(
    async (imageFile: File) => {
      setError(null);
      setStep("reading");
      setOutputBlob(null);

      try {
        const src = await readFile(imageFile);
        setOriginalSrc(src);
        setOriginalSize(imageFile.size);

        const img = await loadImage(src);
        setAspectRatio(img.naturalWidth / img.naturalHeight);

        setStep("resizing");

        const canvas = canvasRef.current!;
        let targetW: number;
        let targetH: number;

        if (tool.group === "compress" || tool.group === "increase-compress") {
          // Compression tools — keep original dimensions
          targetW = img.naturalWidth;
          targetH = img.naturalHeight;
        } else if (tool.group === "resize" || tool.group === "universal-resize") {
          targetW = unitToPx(width, unit);
          targetH = unitToPx(height, unit);
        } else {
          targetW = img.naturalWidth;
          targetH = img.naturalHeight;
        }

        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext("2d")!;
        ctx.clearRect(0, 0, targetW, targetH);
        ctx.drawImage(img, 0, 0, targetW, targetH);

        // Apply filters based on group
        applyFilter(ctx, canvas, tool);

        setStep("compressing");

        // Compress to target KB
        let blob: Blob;
        if (
          tool.group === "compress" ||
          tool.group === "increase-compress" ||
          tool.targetKB ||
          tool.defaultKB
        ) {
          blob = await compressToKB(canvas, tool.targetKB || targetKB);
        } else {
          blob = await new Promise<Blob>((resolve) =>
            canvas.toBlob(
              (b) => resolve(b!),
              "image/jpeg",
              quality / 100
            )
          );
        }

        setOutputBlob(blob);
        setOutputSize(blob.size);
        setStep("done");
      } catch (e) {
        console.error(e);
        setError("Processing failed. Please check your image format.");
        setStep("error");
      }
    },
    [tool, width, height, unit, quality, targetKB]
  );

  // Auto-run processing when settings change
  useEffect(() => {
    if (file) {
      const timer = setTimeout(() => {
        processImage(file);
      }, 300); // 300ms debounce
      return () => clearTimeout(timer);
    }
  }, [file, width, height, unit, targetKB, quality, processImage]);

  function readFile(f: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(f);
    });
  }

  function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  async function compressToKB(
    canvas: HTMLCanvasElement,
    targetKBVal: number
  ): Promise<Blob> {
    const targetBytes = targetKBVal * 1024;
    let q = 0.9;
    let blob: Blob = await canvasToBlob(canvas, q);

    // Binary search for quality
    let lo = 0.01;
    let hi = 0.95;
    for (let i = 0; i < 20; i++) {
      q = (lo + hi) / 2;
      blob = await canvasToBlob(canvas, q);
      if (blob.size > targetBytes) hi = q;
      else lo = q;
      if (Math.abs(blob.size - targetBytes) < 1024) break;
    }
    return blob;
  }

  function canvasToBlob(canvas: HTMLCanvasElement, q: number): Promise<Blob> {
    return new Promise((resolve) =>
      canvas.toBlob((b) => resolve(b!), "image/jpeg", q)
    );
  }

  function applyFilter(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    t: Tool
  ) {
    if (!t.filterType) return;
    const { width: w, height: h } = canvas;
    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;

    switch (t.filterType) {
      case "grayscale":
        for (let i = 0; i < data.length; i += 4) {
          const avg = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          data[i] = data[i + 1] = data[i + 2] = avg;
        }
        ctx.putImageData(imageData, 0, 0);
        break;

      case "threshold":
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          const v = avg > 128 ? 255 : 0;
          data[i] = data[i + 1] = data[i + 2] = v;
        }
        ctx.putImageData(imageData, 0, 0);
        break;

      case "sharpen": {
        const kernel = [0, -1, 0, -1, 5, -1, 0, -1, 0];
        applyKernel(ctx, canvas, data, kernel, w, h);
        break;
      }

      case "blur": {
        const kernel = [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9];
        applyKernel(ctx, canvas, data, kernel, w, h);
        break;
      }

      case "enhance": {
        for (let i = 0; i < data.length; i += 4) {
          data[i] = clamp((data[i] - 128) * 1.2 + 138);
          data[i + 1] = clamp((data[i + 1] - 128) * 1.2 + 138);
          data[i + 2] = clamp((data[i + 2] - 128) * 1.2 + 138);
        }
        ctx.putImageData(imageData, 0, 0);
        break;
      }

      case "pixelate": {
        const blockSize = Math.max(4, Math.floor(w / 40));
        for (let y = 0; y < h; y += blockSize) {
          for (let x = 0; x < w; x += blockSize) {
            const idx = (y * w + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            for (let dy = 0; dy < blockSize && y + dy < h; dy++) {
              for (let dx = 0; dx < blockSize && x + dx < w; dx++) {
                const i2 = ((y + dy) * w + (x + dx)) * 4;
                data[i2] = r;
                data[i2 + 1] = g;
                data[i2 + 2] = b;
              }
            }
          }
        }
        ctx.putImageData(imageData, 0, 0);
        break;
      }
    }
  }

  function applyKernel(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    src: Uint8ClampedArray,
    kernel: number[],
    w: number,
    h: number
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

  function clamp(v: number) {
    return Math.max(0, Math.min(255, Math.round(v)));
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }

  function handleFile(f: File) {
    if (!f.type.startsWith("image/")) {
      setError("Sirf photos (JPG, PNG, WebP) supported hain.");
      return;
    }
    if (f.size > 20 * 1024 * 1024) {
      setError("Photo bahut badi hai (max 20MB allowed).");
      return;
    }
    setFile(f);
    processImage(f);
  }

  function download() {
    if (!outputBlob) return;
    const url = URL.createObjectURL(outputBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tool.id}_sarkaripixels.jpg`;
    a.click();
    URL.revokeObjectURL(url);

    // WhatsApp nudge show
    setTimeout(() => {
      const share = document.getElementById("whatsapp-share-nudge");
      if (share) share.style.display = "flex";
    }, 500);
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const isCompress = tool.group === "compress" || tool.group === "increase-compress";
  const isResize = tool.group === "resize" || tool.group === "universal-resize";

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (lockAspect && aspectRatio) {
      setHeight(Number((val / aspectRatio).toFixed(unit === "px" ? 0 : 2)));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (lockAspect && aspectRatio) {
      setWidth(Number((val * aspectRatio).toFixed(unit === "px" ? 0 : 2)));
    }
  };

  // Check if output is compliant with KB targets
  const targetBytesLimit = (tool.targetKB || targetKB) * 1024;
  const isCompliant = outputSize > 0 && outputSize <= targetBytesLimit;

  return (
    <div className="p-6 space-y-5">

      {/* ── Settings Panel (Always visible for edit flexibility) ──── */}
      {isResize && tool.group === "universal-resize" && (
        <div
          className="space-y-4 p-4 rounded-xl border"
          style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
        >
          <div>
            <label className="t-caption font-semibold uppercase tracking-wider block mb-2">Select Unit</label>
            <div
              className="grid grid-cols-4 p-1 rounded-lg"
              style={{ backgroundColor: "var(--color-border)" }}
            >
              {(["px", "inch", "cm", "mm"] as const).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => {
                    setUnit(u);
                    if (u === "px") {
                      setWidth(tool.defaultW || 800);
                      setHeight(tool.defaultH || 600);
                    } else if (u === "cm") {
                      setWidth(3.5);
                      setHeight(4.5);
                    } else if (u === "mm") {
                      setWidth(35);
                      setHeight(45);
                    } else {
                      setWidth(2);
                      setHeight(2);
                    }
                  }}
                  className="py-1.5 text-xs font-semibold rounded-md transition-colors"
                  style={{
                    backgroundColor: unit === u ? "var(--color-accent)" : "transparent",
                    color: unit === u ? "#fff" : "var(--color-muted)",
                  }}
                >
                  {u.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div
              className="rounded-lg p-3 border"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)" }}
            >
              <label
                className="t-caption uppercase tracking-wider block"
                style={{ fontWeight: 600 }}
              >
                Width
              </label>
              <div className="flex items-center justify-between mt-1">
                <input
                  type="number"
                  value={width}
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                  className="w-full bg-transparent border-0 p-0 text-sm font-semibold focus:ring-0 focus:outline-none"
                  style={{ color: "var(--color-text)" }}
                />
                <span className="text-xs font-bold uppercase" style={{ color: "var(--color-accent)" }}>{unit}</span>
              </div>
            </div>
            <div
              className="rounded-lg p-3 border"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)" }}
            >
              <label
                className="t-caption uppercase tracking-wider block"
                style={{ fontWeight: 600 }}
              >
                Height
              </label>
              <div className="flex items-center justify-between mt-1">
                <input
                  type="number"
                  value={height}
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                  className="w-full bg-transparent border-0 p-0 text-sm font-semibold focus:ring-0 focus:outline-none"
                  style={{ color: "var(--color-text)" }}
                />
                <span className="text-xs font-bold uppercase" style={{ color: "var(--color-accent)" }}>{unit}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="lock-aspect-editor"
              checked={lockAspect}
              onChange={(e) => setLockAspect(e.target.checked)}
              style={{ accentColor: "var(--color-accent)" }}
            />
            <label
              htmlFor="lock-aspect-editor"
              className="t-caption select-none"
              style={{ fontWeight: 500 }}
            >
              Lock Aspect Ratio
            </label>
          </div>
        </div>
      )}

      {((isResize && tool.group !== "universal-resize") || isCompress) && (
        <div
          className="flex flex-wrap gap-4 p-4 rounded-xl border"
          style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
        >
          {isCompress && (
            <div className="flex items-center gap-3">
              <label
                htmlFor="target-kb-input"
                className="t-caption font-semibold"
              >
                Target KB:
              </label>
              <input
                id="target-kb-input"
                type="number"
                value={targetKB}
                onChange={(e) => setTargetKB(Number(e.target.value))}
                min={1}
                max={5000}
                className="w-20 text-sm text-center border rounded-lg px-2 py-1.5 focus:outline-none"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-bg)",
                  color: "var(--color-text)",
                }}
              />
            </div>
          )}
          {isResize && tool.group !== "universal-resize" && (
            <>
              <div className="flex items-center gap-2">
                <label htmlFor="width-input" className="t-caption font-semibold">W ({unit}):</label>
                <input
                  id="width-input"
                  type="number"
                  value={width}
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                  className="w-16 text-sm text-center border rounded-lg px-1 py-1"
                  style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="height-input" className="t-caption font-semibold">H ({unit}):</label>
                <input
                  id="height-input"
                  type="number"
                  value={height}
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                  className="w-16 text-sm text-center border rounded-lg px-1 py-1"
                  style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
                />
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <input
                  type="checkbox"
                  id="lock-aspect-other"
                  checked={lockAspect}
                  onChange={(e) => setLockAspect(e.target.checked)}
                  style={{ accentColor: "var(--color-accent)" }}
                />
                <label htmlFor="lock-aspect-other" className="t-caption font-semibold select-none">Lock</label>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Drag & Drop Upload Zone ─────────────────────────────── */}
      {!file && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload image — drag and drop or click to browse"
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onClick={() => document.getElementById("file-input")?.click()}
          onKeyDown={(e) => e.key === "Enter" && document.getElementById("file-input")?.click()}
          className={`upload-zone flex flex-col items-center justify-center py-14 text-center select-none cursor-pointer${
            isDragOver ? " drag-over" : ""
          }`}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
            aria-hidden="true"
          >
            <i
              className="fa-solid fa-cloud-arrow-up"
              style={{ fontSize: "20px", color: "var(--color-accent)" }}
            />
          </div>
          <p
            className="text-sm font-semibold mb-1"
            style={{ color: "var(--color-text)" }}
          >
            Drag or Browse Image
          </p>
          <p className="t-caption">JPG, PNG, WebP · Max 20MB</p>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>
      )}

      {/* ── Processing indicator ─────────────────────────────────── */}
      {step !== "idle" && step !== "error" && step !== "done" && (
        <div
          className="flex items-center justify-center gap-2 py-4 rounded-xl border"
          style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
        >
          <i
            className="fa-solid fa-spinner animate-spin"
            style={{ color: "var(--color-accent)", fontSize: "14px" }}
            aria-hidden="true"
          />
          <span className="t-caption" style={{ fontWeight: 500 }}>Processing: {step}…</span>
        </div>
      )}

      {/* ── Error Banner ─────────────────────────────────────────── */}
      {error && (
        <div
          role="alert"
          className="flex items-center gap-3 rounded-xl p-4"
          style={{
            fontSize: "0.875rem",
            color: "#dc2626",
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
          }}
        >
          <i className="fa-solid fa-circle-exclamation" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      {/* ── Results Zone ────────────────────────────────────────── */}
      {step === "done" && outputBlob && originalSrc && (
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
              <div
                className="t-caption mt-2"
                aria-label={`Original file size: ${formatSize(originalSize)}`}
              >
                {formatSize(originalSize)}
              </div>
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
              {/* Compliance badge */}
              <span
                className="absolute top-3 right-3 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider"
                style={{ backgroundColor: isCompliant ? "#16a34a" : "#dc2626" }}
              >
                {isCompliant ? "✓ Within Limit" : "⚠ Too Large"}
              </span>
              <div className="flex justify-between items-center mt-2">
                <span
                  className="t-caption font-semibold"
                  style={{ color: "var(--color-accent)" }}
                  aria-label={`Output file size: ${formatSize(outputSize)}`}
                >
                  {formatSize(outputSize)}
                </span>
                <span className="t-caption">Target: {tool.targetKB || targetKB} KB</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={download}
              className="btn btn-primary flex-1"
              style={{ justifyContent: "center" }}
            >
              <i className="fa-solid fa-download" aria-hidden="true" />
              Download JPG
            </button>
            <button
              onClick={() => {
                setFile(null);
                setStep("idle");
                setOutputBlob(null);
                setError(null);
              }}
              className="btn btn-secondary"
            >
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
      )}
    </div>
  );
}
