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
    <div className="p-6 space-y-6 relative">
      {/* ── Walkthrough Tour ─────────────────────────────────────── */}
      {showTour && (
        <div className="bg-indigo-900 text-white rounded-2xl p-5 border border-indigo-700 animate-slide-up flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-300">Quick Walkthrough · Step {tourStep} of 3</span>
            <p className="text-sm font-bold">
              {tourStep === 1 && "1. Pehle settings pane mein size/target KB check karein."}
              {tourStep === 2 && "2. Apni image upload zone mein drop karein."}
              {tourStep === 3 && "3. Output verify hone ke baad high-res photo download karein."}
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button onClick={dismissTour} className="px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-indigo-800 transition-colors">Skip</button>
            <button onClick={nextTour} className="px-4 py-1.5 bg-indigo-500 rounded-lg text-xs font-bold hover:bg-indigo-600 transition-colors">
              {tourStep === 3 ? "Got It ✓" : "Next →"}
            </button>
          </div>
        </div>
      )}

      {/* ── Settings Panel (Always visible for edit flexibility) ──── */}
      {isResize && tool.group === "universal-resize" && (
        <div className="space-y-4 p-4 bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <div>
            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Select Unit</label>
            <div className="grid grid-cols-4 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800">
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
                  className={`py-1.5 text-xs font-bold rounded-lg text-center transition-all ${
                    unit === u
                      ? "bg-gradient-to-r from-indigo-600 to-pink-500 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                  }`}
                >
                  {u.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-indigo-500 rounded-xl p-3 bg-white dark:bg-slate-800/50 transition-all">
              <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Width</label>
              <div className="flex items-center justify-between mt-0.5">
                <input
                  type="number"
                  value={width}
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                  className="w-full bg-transparent border-0 p-0 text-sm font-semibold focus:ring-0 focus:outline-none"
                />
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">{unit}</span>
              </div>
            </div>
            <div className="border border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-indigo-500 rounded-xl p-3 bg-white dark:bg-slate-800/50 transition-all">
              <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Height</label>
              <div className="flex items-center justify-between mt-0.5">
                <input
                  type="number"
                  value={height}
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                  className="w-full bg-transparent border-0 p-0 text-sm font-semibold focus:ring-0 focus:outline-none"
                />
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">{unit}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="lock-aspect-editor"
              checked={lockAspect}
              onChange={(e) => setLockAspect(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="lock-aspect-editor" className="text-xs font-semibold text-slate-500 dark:text-slate-400 select-none">Aspect Ratio Lock</label>
          </div>
        </div>
      )}

      {((isResize && tool.group !== "universal-resize") || isCompress) && (
        <div className="flex flex-wrap gap-4 p-4 bg-slate-50/50 dark:bg-slate-900/40 rounded-2xl border border-slate-200 dark:border-slate-800">
          {isCompress && (
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Target KB:</span>
              <input
                type="number"
                value={targetKB}
                onChange={(e) => setTargetKB(Number(e.target.value))}
                min={1}
                max={5000}
                className="w-20 text-xs text-center border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          )}
          {isResize && tool.group !== "universal-resize" && (
            <>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">W ({unit}):</span>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                  className="w-16 text-xs text-center border border-slate-200 dark:border-slate-800 rounded-lg px-1 py-1"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">H ({unit}):</span>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                  className="w-16 text-xs text-center border border-slate-200 dark:border-slate-800 rounded-lg px-1 py-1"
                />
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <input
                  type="checkbox"
                  id="lock-aspect-other"
                  checked={lockAspect}
                  onChange={(e) => setLockAspect(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="lock-aspect-other" className="text-xs font-semibold text-slate-500 dark:text-slate-400 select-none">Lock</label>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Drag & Drop Upload Zone ─────────────────────────────── */}
      {!file && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onClick={() => document.getElementById("file-input")?.click()}
          className={`upload-zone flex flex-col items-center justify-center p-12 text-center select-none border-2 border-dashed ${
            isDragOver ? "border-orange-500 bg-orange-50/5" : "border-slate-200 dark:border-slate-800"
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/20 flex items-center justify-center mb-3">
            <i className="fa-solid fa-cloud-arrow-up text-xl text-orange-500" />
          </div>
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Drag or Browse Image</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">JPG, PNG, WebP · Max 20MB</p>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>
      )}

      {/* ── Processing step indicator ────────────────────────────── */}
      {step !== "idle" && step !== "error" && step !== "done" && (
        <div className="processing-steps text-xs flex justify-center py-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200/50 dark:border-slate-800">
          <i className="fa-solid fa-spinner animate-spin text-indigo-500 mr-2" />
          <span className="font-semibold text-slate-600 dark:text-slate-300">Processing: {step}...</span>
        </div>
      )}

      {/* ── Error Banner ─────────────────────────────────────────── */}
      {error && (
        <div className="flex items-center gap-3 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/10 border border-red-200 dark:border-red-900/50 rounded-xl p-4 animate-slide-up">
          <i className="fa-solid fa-circle-exclamation text-base" />
          <span>{error}</span>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      {/* ── Results Zone: Before/After & Admit Card Simulator ────── */}
      {step === "done" && outputBlob && originalSrc && (
        <div className="space-y-6 animate-slide-up">
          {/* Before/After Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/20 p-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-2">Original</span>
              <img src={originalSrc} alt="Original input" className="max-h-48 w-full object-contain rounded-lg bg-slate-50 dark:bg-slate-800" />
              <div className="text-[10px] font-mono text-slate-500 mt-2">Size: {formatSize(originalSize)}</div>
            </div>
            <div className="rounded-2xl border border-indigo-200 dark:border-indigo-950 bg-white dark:bg-slate-900/20 p-4 relative">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 block mb-2">Processed Output</span>
              <img src={URL.createObjectURL(outputBlob)} alt="Processed preview" className="max-h-48 w-full object-contain rounded-lg bg-slate-50 dark:bg-slate-800" />
              
              {/* Compliance Badge */}
              <div className="absolute top-4 right-4">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                  isCompliant
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}>
                  {isCompliant ? "Within Limit ✓" : "Size Exceeded ⚠"}
                </span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-bold">Size: {formatSize(outputSize)}</span>
                <span className="text-[10px] font-mono text-slate-400">Target: {tool.targetKB || targetKB} KB max</span>
              </div>
            </div>
          </div>

          {/* ── Signature Visual: Admit Card Simulator ────────────── */}
          <div className="admit-card-bg border border-slate-200 dark:border-slate-800 rounded-3xl p-5 relative overflow-hidden">
            <div className="absolute top-4 right-4 z-10 animate-stamp">
              <span className="inline-block border-2 border-green-500 text-green-500 dark:border-green-400 dark:text-green-400 font-black text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded rotate-12 bg-white dark:bg-[#131b2e]">
                {tool.id.replace("-", " ").toUpperCase()} VERIFIED
              </span>
            </div>

            <div className="text-center border-b border-dashed border-slate-200 dark:border-slate-800 pb-3 mb-4">
              <h3 className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest">ADMIT CARD LIVE SIMULATION</h3>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-24 h-32 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center relative overflow-hidden shrink-0">
                {tool.id.includes("signature") || tool.id.includes("sign") ? (
                  <>
                    <i className="fa-solid fa-user text-3xl text-slate-300 dark:text-slate-700" />
                    <span className="absolute bottom-1 text-[8px] text-slate-400 dark:text-slate-500 font-bold">PHOTO</span>
                  </>
                ) : (
                  <img src={URL.createObjectURL(outputBlob)} alt="Preview inside admit card" className="w-full h-full object-cover" />
                )}
              </div>
              <div className="flex-1 space-y-2 text-left">
                <div>
                  <span className="block text-[8px] text-slate-400 uppercase tracking-wider font-extrabold">CANDIDATE NAME</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{previewName}</span>
                </div>
                <div>
                  <span className="block text-[8px] text-slate-400 uppercase tracking-wider font-extrabold">ROLL NUMBER</span>
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200">{previewRoll}</span>
                </div>
                <div>
                  <span className="block text-[8px] text-slate-400 uppercase tracking-wider font-extrabold">VERIFICATION STATUS</span>
                  <span className={`text-[9px] font-bold uppercase tracking-wider ${isCompliant ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>
                    {isCompliant ? "✓ Fits portal requirement" : "⚠ Please check KB size settings"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="w-full h-12 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center relative overflow-hidden">
                {tool.id.includes("signature") || tool.id.includes("sign") ? (
                  <img src={URL.createObjectURL(outputBlob)} alt="Signature preview" className="h-full object-contain" />
                ) : (
                  <>
                    <i className="fa-solid fa-signature text-xl text-slate-200 dark:text-slate-700" />
                    <span className="absolute bottom-0.5 right-1.5 text-[7px] text-slate-400 dark:text-slate-500 font-extrabold tracking-wider">SIGNATURE</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Action Zone: Single obvious primary action button */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={download}
              className="w-full sm:flex-1 bg-gradient-to-r from-indigo-600 to-pink-500 text-white rounded-xl py-3.5 font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 shadow-md shadow-indigo-500/10"
            >
              <i className="fa-solid fa-download" /> Download JPG
            </button>
            <button
              onClick={() => {
                setFile(null);
                setStep("idle");
                setOutputBlob(null);
                setError(null);
              }}
              className="w-full sm:w-auto px-6 py-3.5 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-sm font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Reset — Change Photo
            </button>
          </div>

          {/* WhatsApp share nudge */}
          <div
            id="whatsapp-share-nudge"
            style={{ display: "none" }}
            className="items-center gap-3 bg-green-50 dark:bg-green-950/15 border border-green-200 dark:border-green-900/50 rounded-2xl p-4 animate-slide-up"
          >
            <i className="fa-brands fa-whatsapp text-green-600 text-xl" />
            <div className="flex-grow text-xs text-left">
              <p className="font-bold text-green-800 dark:text-green-300">Apne dosto ko share karein!</p>
              <p className="text-slate-500 dark:text-slate-400">Exam forms fill karne mein unka bhi time save ho.</p>
            </div>
            <button
              onClick={() => {
                const text = encodeURIComponent(
                  `Maine apna exam photo isse 10 second mein resize kiya — safe and free: ${window.location.href}`
                );
                window.open(`https://wa.me/?text=${text}`, "_blank");
              }}
              className="px-4 py-1.5 bg-green-500 text-white rounded-lg text-xs font-bold hover:bg-green-600 transition-colors"
            >
              Share
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
