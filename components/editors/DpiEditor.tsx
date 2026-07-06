"use client";

import { useState, useEffect, useCallback } from "react";
import type { Tool } from "@/lib/tools-data";
import {
  UploadZone,
  ResultPreview,
  ProcessingSpinner,
  ErrorBanner,
  validateImageFile,
  readFile,
  loadImage,
  canvasToBlob
} from "./shared";

interface Props {
  tool: Tool;
}

export default function DpiEditor({ tool }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [originalSrc, setOriginalSrc] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputSize, setOutputSize] = useState<number>(0);

  const [dpi, setDpi] = useState<number>(300);
  const [resizePixels, setResizePixels] = useState<boolean>(false);

  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (f: File) => {
    const valErr = validateImageFile(f);
    if (valErr) { setError(valErr); return; }
    setFile(f);
    readFile(f).then((src) => {
      setOriginalSrc(src);
      setOriginalSize(f.size);
    });
  };

  const processImage = useCallback(async () => {
    if (!file || !originalSrc) return;
    setError(null);
    setProcessing(true);
    try {
      const img = await loadImage(originalSrc);
      const canvas = document.createElement("canvas");
      
      let targetW = img.naturalWidth;
      let targetH = img.naturalHeight;

      if (resizePixels) {
        // Physical pixel scaling helper (e.g. upscaling to matches higher print DPI resolution grid)
        // Assume default baseline screen DPI was 72
        const scalingFrac = dpi / 72;
        targetW = Math.round(img.naturalWidth * scalingFrac);
        targetH = Math.round(img.naturalHeight * scalingFrac);
      }

      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, targetW, targetH);

      // Re-encode and inject DPI headers
      const blob = await canvasToBlob(canvas, 0.9);
      
      // Injecting DPI to JPEG requires editing the APP0 JFIF segment (bytes 13-17)
      // Standard canvas.toBlob outputs basic JFIF. We replace/set density fields.
      const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = reject;
        reader.readAsArrayBuffer(blob);
      });

      const view = new DataView(arrayBuffer);
      const uint8 = new Uint8Array(arrayBuffer);
      
      // Search for JFIF APP0 marker (FF E0)
      let offset = 0;
      let dpiInjected = false;

      while (offset < uint8.length - 10) {
        if (uint8[offset] === 0xff && uint8[offset + 1] === 0xe0) {
          // JFIF segment length is at offset + 2, + 4 is "JFIF\0"
          if (
            uint8[offset + 4] === 0x4a && // J
            uint8[offset + 5] === 0x46 && // F
            uint8[offset + 6] === 0x49 && // I
            uint8[offset + 7] === 0x46 // F
          ) {
            // density unit: 1 = dots per inch, 2 = dots per cm
            uint8[offset + 9] = 1; 
            // X density (2 bytes)
            view.setUint16(offset + 10, dpi, false);
            // Y density (2 bytes)
            view.setUint16(offset + 12, dpi, false);
            dpiInjected = true;
            break;
          }
        }
        offset++;
      }

      const outputFinalBlob = dpiInjected
        ? new Blob([arrayBuffer], { type: "image/jpeg" })
        : blob;

      setOutputBlob(outputFinalBlob);
      setOutputSize(outputFinalBlob.size);
    } catch (err) {
      console.error(err);
      setError("DPI adjustment failed.");
    } finally {
      setProcessing(false);
    }
  }, [file, originalSrc, dpi, resizePixels]);

  useEffect(() => {
    if (file) {
      const timer = setTimeout(() => {
        processImage();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [file, dpi, resizePixels, processImage]);

  const handleReset = () => {
    setFile(null);
    setOriginalSrc(null);
    setOutputBlob(null);
    setError(null);
  };

  return (
    <div className="p-6 space-y-5">
      {file && (
        <div
          className="space-y-4 p-4 rounded-xl border"
          style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
        >
          <div>
            <label className="text-xs font-semibold block mb-2">Target DPI Presets</label>
            <div className="flex flex-wrap gap-2">
              {[72, 96, 150, 200, 300, 600].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setDpi(num)}
                  className={`btn py-1.5 px-3 text-xs ${dpi === num ? "btn-primary" : "btn-secondary"}`}
                >
                  {num} DPI
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="custom-dpi-input" className="text-xs font-semibold block">Custom DPI:</label>
            <input
              id="custom-dpi-input"
              type="number"
              value={dpi}
              onChange={(e) => setDpi(Math.max(1, Number(e.target.value)))}
              className="w-20 text-sm border rounded-lg px-2 py-1 focus:outline-none"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="resize-pixels-chk"
              checked={resizePixels}
              onChange={(e) => setResizePixels(e.target.checked)}
              style={{ accentColor: "var(--color-accent)" }}
            />
            <label htmlFor="resize-pixels-chk" className="t-caption font-semibold select-none">
              Physically scale resolution pixels to match density ratio
            </label>
          </div>
        </div>
      )}

      {!file && <UploadZone tool={tool} onFile={handleFileChange} />}

      {processing && <ProcessingSpinner step="rewriting image density blocks" />}

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
