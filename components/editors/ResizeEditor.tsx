"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Tool } from "@/lib/tools-data";
import {
  UploadZone,
  ResultPreview,
  ProcessingSpinner,
  ErrorBanner,
  validateImageFile,
  readFile,
  loadImage,
  unitToPx,
  canvasToBlob
} from "./shared";

interface Props {
  tool: Tool;
}

export default function ResizeEditor({ tool }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [originalSrc, setOriginalSrc] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputSize, setOutputSize] = useState<number>(0);

  const [width, setWidth] = useState<number>(tool.defaultW || 800);
  const [height, setHeight] = useState<number>(tool.defaultH || 600);
  const [unit, setUnit] = useState<"px" | "cm" | "mm" | "inch">(tool.unit || "px");
  const [dpi, setDpi] = useState<number>(tool.dpi || 300);
  const [lockAspect, setLockAspect] = useState<boolean>(true);
  const [aspectRatio, setAspectRatio] = useState<number>(1.333); // 4:3 default

  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isUniversal = tool.group === "universal-resize";

  const handleFileChange = async (f: File) => {
    const validationError = validateImageFile(f);
    if (validationError) {
      setError(validationError);
      return;
    }
    setFile(f);
    try {
      const src = await readFile(f);
      setOriginalSrc(src);
      setOriginalSize(f.size);
      const img = await loadImage(src);
      const aspect = img.naturalWidth / img.naturalHeight;
      setAspectRatio(aspect);

      // Initialize dimensions based on natural dimensions if no tool defaults
      if (!tool.defaultW) {
        if (unit === "px") {
          setWidth(img.naturalWidth);
          setHeight(img.naturalHeight);
        } else {
          // Convert px to unit
          const valW = Number((img.naturalWidth / dpi * (unit === "cm" ? 2.54 : unit === "mm" ? 25.4 : 1)).toFixed(2));
          const valH = Number((img.naturalHeight / dpi * (unit === "cm" ? 2.54 : unit === "mm" ? 25.4 : 1)).toFixed(2));
          setWidth(valW);
          setHeight(valH);
        }
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load image details.");
    }
  };

  const processImage = useCallback(async () => {
    if (!file) return;
    setError(null);
    setProcessing(true);
    try {
      const img = await loadImage(originalSrc!);
      const targetW = unitToPx(width, unit, dpi);
      const targetH = unitToPx(height, unit, dpi);

      const canvas = document.createElement("canvas");
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext("2d")!;
      
      // Paint background white (good for JPG transparency conversion)
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, targetW, targetH);
      
      ctx.drawImage(img, 0, 0, targetW, targetH);

      // Export at 85% quality or match tool target KB if specified
      const blob = await canvasToBlob(canvas, 0.85);
      setOutputBlob(blob);
      setOutputSize(blob.size);
    } catch (err) {
      console.error(err);
      setError("Processing failed.");
    } finally {
      setProcessing(false);
    }
  }, [file, originalSrc, width, height, unit, dpi]);

  useEffect(() => {
    if (file) {
      const timer = setTimeout(() => {
        processImage();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [file, width, height, unit, dpi, processImage]);

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

  const handleReset = () => {
    setFile(null);
    setOriginalSrc(null);
    setOutputBlob(null);
    setError(null);
  };

  return (
    <div className="p-6 space-y-5">
      {/* Settings Grid */}
      <div
        className="space-y-4 p-4 rounded-xl border"
        style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
      >
        {isUniversal && (
          <div>
            <label className="t-caption font-semibold uppercase tracking-wider block mb-2">Select Unit</label>
            <div className="grid grid-cols-4 p-1 rounded-lg" style={{ backgroundColor: "var(--color-border)" }}>
              {(["px", "inch", "cm", "mm"] as const).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => {
                    setUnit(u);
                    // Reset defaults for unit
                    if (u === "px") { setWidth(800); setHeight(600); }
                    else if (u === "cm") { setWidth(3.5); setHeight(4.5); }
                    else if (u === "mm") { setWidth(35); setHeight(45); }
                    else { setWidth(2); setHeight(2); }
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
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg p-3 border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)" }}>
            <label className="t-caption uppercase tracking-wider block font-semibold">Width</label>
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

          <div className="rounded-lg p-3 border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)" }}>
            <label className="t-caption uppercase tracking-wider block font-semibold">Height</label>
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

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="lock-aspect"
              checked={lockAspect}
              onChange={(e) => setLockAspect(e.target.checked)}
              style={{ accentColor: "var(--color-accent)" }}
            />
            <label htmlFor="lock-aspect" className="t-caption font-semibold select-none">
              Lock Aspect Ratio
            </label>
          </div>

          {!isUniversal && unit !== "px" && (
            <div className="flex items-center gap-2">
              <label htmlFor="dpi-input" className="t-caption font-semibold">Target DPI:</label>
              <input
                id="dpi-input"
                type="number"
                value={dpi}
                onChange={(e) => setDpi(Math.max(72, Number(e.target.value)))}
                className="w-16 text-sm text-center border rounded-lg px-1 py-1"
                style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
              />
            </div>
          )}
        </div>
      </div>

      {!file && <UploadZone tool={tool} onFile={handleFileChange} />}

      {processing && <ProcessingSpinner step="resizing" />}

      {error && <ErrorBanner message={error} />}

      {outputBlob && originalSrc && !processing && (
        <ResultPreview
          originalSrc={originalSrc}
          originalSize={originalSize}
          outputBlob={outputBlob}
          outputSize={outputSize}
          toolId={tool.id}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
