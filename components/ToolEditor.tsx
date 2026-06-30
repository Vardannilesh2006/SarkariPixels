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
  const [sliderPos, setSliderPos] = useState(50);

  // Settings
  const [targetKB, setTargetKB] = useState(tool.targetKB || tool.defaultKB || 50);
  const [width, setWidth] = useState(tool.defaultW || 800);
  const [height, setHeight] = useState(tool.defaultH || 600);
  const [unit, setUnit] = useState<"px" | "cm" | "mm" | "inch">(tool.unit || "px");
  const [quality, setQuality] = useState(85);
  const [aspectRatio, setAspectRatio] = useState<number>(1.333); // default 4:3
  const [lockAspect, setLockAspect] = useState<boolean>(true);

  const DPI = 96;

  function unitToPx(val: number, u: string): number {
    if (u === "px") return Math.round(val);
    if (u === "cm") return Math.round((val / 2.54) * (tool.dpi || 300));
    if (u === "mm") return Math.round((val / 25.4) * (tool.dpi || 300));
    if (u === "inch") return Math.round(val * (tool.dpi || 300));
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
        setError("Processing mein error aaya. Dusri photo try karein.");
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
        // Contrast + brightness boost
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
      setError("Sirf image files supported hain (JPG, PNG, WebP, HEIC).");
      return;
    }
    if (f.size > 25 * 1024 * 1024) {
      setError("File 25MB se badi hai. Chhoti file use karein.");
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

    // WhatsApp share nudge after download
    setTimeout(() => {
      const share = document.getElementById("whatsapp-share-nudge");
      if (share) share.style.display = "flex";
    }, 500);

    // GA4 event
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "tool_download", {
        tool_id: tool.id,
        tool_name: tool.title,
        output_kb: Math.round(outputSize / 1024),
      });
    }
  }

  function whatsappShare() {
    const msg = encodeURIComponent(
      `Maine apna exam photo isse 10 second mein sahi size kiya — free hai, try karo: ${window.location.href}`
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank");
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

  return (
    <div className="p-5 space-y-4">
      {/* Settings Panel */}
      {isResize && tool.group === "universal-resize" && (
        <div className="space-y-4 animate-slide-up p-4 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl">
          {/* Unit Tabs */}
          <div>
            <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2">Select Unit</label>
            <div className="grid grid-cols-4 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              {(["px", "inch", "cm", "mm"] as const).map((u) => {
                const isActive = unit === u;
                return (
                  <button
                    key={u}
                    type="button"
                    onClick={() => {
                      setUnit(u);
                      // Convert width/height roughly
                      if (u === "px") {
                        setWidth(Math.round(tool.defaultW || 800));
                        setHeight(Math.round(tool.defaultH || 600));
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
                      isActive
                        ? "bg-gradient-to-r from-indigo-600 to-pink-500 text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    }`}
                  >
                    {u.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dimension Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 rounded-xl p-3 bg-white dark:bg-slate-800 transition-all relative">
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Width</label>
              <div className="flex items-center justify-between mt-1">
                <input
                  type="number"
                  value={width}
                  step="any"
                  placeholder="Width"
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                  className="w-full bg-transparent border-0 p-0 text-sm font-semibold text-slate-900 dark:text-white focus:ring-0 focus:outline-none placeholder-slate-400"
                />
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase ml-2 select-none">{unit}</span>
              </div>
            </div>
            <div className="border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 rounded-xl p-3 bg-white dark:bg-slate-800 transition-all relative">
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Height</label>
              <div className="flex items-center justify-between mt-1">
                <input
                  type="number"
                  value={height}
                  step="any"
                  placeholder="Height"
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                  className="w-full bg-transparent border-0 p-0 text-sm font-semibold text-slate-900 dark:text-white focus:ring-0 focus:outline-none placeholder-slate-400"
                />
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase ml-2 select-none">{unit}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="lock-aspect"
              checked={lockAspect}
              onChange={(e) => setLockAspect(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="lock-aspect" className="text-xs font-semibold text-slate-500 select-none">
              Lock Aspect Ratio
            </label>
          </div>
        </div>
      )}

      {/* Normal Resize and Compress Settings */}
      {((isResize && tool.group !== "universal-resize") || isCompress) && (
        <div className="flex flex-wrap gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700">
          {isCompress && (
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Target Size (KB):</label>
              <input
                type="number"
                value={targetKB}
                onChange={(e) => setTargetKB(Number(e.target.value))}
                min={1}
                max={5000}
                className="w-20 text-sm border border-slate-200 dark:border-slate-600 rounded-lg px-2 py-1.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          )}
          {isResize && tool.group !== "universal-resize" && (
            <>
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Width ({unit}):</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                  step={unit === "px" ? 1 : 0.1}
                  className="w-20 text-sm border border-slate-200 dark:border-slate-600 rounded-lg px-2 py-1.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Height ({unit}):</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                  step={unit === "px" ? 1 : 0.1}
                  className="w-20 text-sm border border-slate-200 dark:border-slate-600 rounded-lg px-2 py-1.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <input
                  type="checkbox"
                  id="lock-aspect-simple"
                  checked={lockAspect}
                  onChange={(e) => setLockAspect(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="lock-aspect-simple" className="text-xs font-semibold text-slate-500 select-none">
                  Lock Aspect
                </label>
              </div>
            </>
          )}
        </div>
      )}

      {/* Upload Zone */}
      {!file && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onClick={() => document.getElementById("file-input")?.click()}
          className={`upload-zone flex flex-col items-center justify-center p-10 text-center cursor-pointer select-none ${isDragOver ? "drag-over" : ""}`}
        >
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
            <i className="fa-solid fa-cloud-arrow-up text-2xl text-indigo-500" />
          </div>
          <p className="font-bold text-slate-700 dark:text-slate-200 mb-1">
            Photo drag karein ya click karein
          </p>
          <p className="text-xs text-slate-400">JPG, PNG, WebP, HEIC · Max 25MB</p>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>
      )}

      {/* Processing Steps */}
      {step !== "idle" && step !== "error" && (
        <div className="processing-steps text-xs py-2">
          {(["reading", "resizing", "compressing", "done"] as ProcessingStep[]).map((s, i) => {
            const labels: Record<string, string> = {
              reading: "Reading Image",
              resizing: "Processing",
              compressing: "Optimizing",
              done: "Done ✓",
            };
            const steps = ["reading", "resizing", "compressing", "done"];
            const currentIdx = steps.indexOf(step);
            const thisIdx = steps.indexOf(s);
            const cls =
              thisIdx < currentIdx
                ? "processing-step done"
                : thisIdx === currentIdx
                ? "processing-step active"
                : "processing-step text-slate-300 dark:text-slate-600";
            return (
              <span key={s} className={cls}>
                {i > 0 && <span className="mx-1 text-slate-300">→</span>}
                {labels[s]}
              </span>
            );
          })}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-xl p-3">
          <i className="fa-solid fa-circle-exclamation" />
          <span>{error}</span>
        </div>
      )}

      {/* Canvas (hidden — used for processing) */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Result */}
      {step === "done" && outputBlob && originalSrc && (
        <div className="space-y-4">
          {/* Before/After preview */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
              <div className="text-xs font-semibold text-slate-500 px-3 pt-2 pb-1">Before</div>
              <img
                src={originalSrc}
                alt="Original"
                className="w-full object-contain max-h-48"
              />
              <div className="text-xs text-slate-400 px-3 pb-2">{formatSize(originalSize)}</div>
            </div>
            <div className="rounded-xl overflow-hidden border border-indigo-300 dark:border-indigo-700 bg-slate-50 dark:bg-slate-800">
              <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 px-3 pt-2 pb-1">After</div>
              <img
                src={URL.createObjectURL(outputBlob)}
                alt="Processed"
                className="w-full object-contain max-h-48"
              />
              <div className="text-xs text-indigo-600 dark:text-indigo-400 px-3 pb-2 font-bold">
                {formatSize(outputSize)}
              </div>
            </div>
          </div>

          {/* Success message */}
          <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <i className="fa-solid fa-check text-white" />
            </div>
            <div>
              <p className="font-bold text-green-800 dark:text-green-300 text-sm">Output ready!</p>
              <p className="text-xs text-green-700 dark:text-green-400">
                {formatSize(outputSize)} — {originalSize > 0 ? `${Math.round((1 - outputSize / originalSize) * 100)}% size reduction` : "processed"}
                {tool.targetKB && outputSize <= tool.targetKB * 1024
                  ? ` · ${tool.targetKB}KB limit ke andar ✓`
                  : tool.defaultKB && outputSize <= tool.defaultKB * 1024
                  ? ` · ${tool.defaultKB}KB limit ke andar ✓`
                  : ""}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={download}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-xl py-3 font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <i className="fa-solid fa-download" />
              Download
            </button>
            <button
              onClick={() => { setFile(null); setStep("idle"); setOutputBlob(null); setError(null); }}
              className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <i className="fa-solid fa-rotate-left mr-1" />
              Reset
            </button>
          </div>

          {/* WhatsApp Share nudge (hidden initially, shown after download) */}
          <div
            id="whatsapp-share-nudge"
            style={{ display: "none" }}
            className="items-center gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4"
          >
            <i className="fa-brands fa-whatsapp text-green-600 text-xl" />
            <div className="flex-1 text-sm">
              <p className="font-semibold text-green-800 dark:text-green-300">
                Kaam aaya? Friends ko share karo!
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">
                Unhe bhi pata chale — exam photo ka tension khatam
              </p>
            </div>
            <button
              onClick={whatsappShare}
              className="flex-shrink-0 bg-green-500 hover:bg-green-600 text-white rounded-lg px-3 py-1.5 text-xs font-bold transition-colors"
            >
              Share
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
