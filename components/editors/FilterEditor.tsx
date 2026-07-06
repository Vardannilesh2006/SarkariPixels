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
  canvasToBlob,
  applyKernel,
  clamp
} from "./shared";

interface Props {
  tool: Tool;
}

export default function FilterEditor({ tool }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [originalSrc, setOriginalSrc] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputSize, setOutputSize] = useState<number>(0);
  const [intensity, setIntensity] = useState<number>(50);
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check if current filter type uses intensity slider
  const hasIntensity = [
    "blur",
    "pixelate",
    "beautify",
    "blemish",
    "blur-bg",
    "blur-face",
    "pixelate-face",
    "motion-blur"
  ].includes(tool.filterType || "");

  const handleFileChange = (f: File) => {
    const valError = validateImageFile(f);
    if (valError) {
      setError(valError);
      return;
    }
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
      let w = img.naturalWidth;
      let h = img.naturalHeight;

      // Upscale/Super-res modifies output size
      const isUpscale = tool.filterType === "upscale" || tool.filterType === "super-res";
      if (isUpscale) {
        w *= 2;
        h *= 2;
      }

      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, w, h);

      const fType = tool.filterType;
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;

      if (fType === "grayscale") {
        for (let i = 0; i < data.length; i += 4) {
          const avg = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          data[i] = data[i + 1] = data[i + 2] = avg;
        }
        ctx.putImageData(imgData, 0, 0);
      } else if (fType === "threshold") {
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          const v = avg > 128 ? 255 : 0;
          data[i] = data[i + 1] = data[i + 2] = v;
        }
        ctx.putImageData(imgData, 0, 0);
      } else if (fType === "sharpen" || fType === "unblur") {
        const kernel = [0, -1, 0, -1, 5, -1, 0, -1, 0];
        applyKernel(ctx, w, h, data, kernel);
      } else if (fType === "blur") {
        // Multi-pass blur depending on intensity
        const passes = Math.max(1, Math.floor(intensity / 10));
        const kernel = [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9];
        let currentData = new Uint8ClampedArray(data);
        for (let p = 0; p < passes; p++) {
          applyKernel(ctx, w, h, currentData, kernel);
          if (p < passes - 1) {
            currentData = ctx.getImageData(0, 0, w, h).data;
          }
        }
      } else if (fType === "enhance") {
        for (let i = 0; i < data.length; i += 4) {
          data[i] = clamp((data[i] - 128) * 1.2 + 138);
          data[i + 1] = clamp((data[i + 1] - 128) * 1.2 + 138);
          data[i + 2] = clamp((data[i + 2] - 128) * 1.2 + 138);
        }
        ctx.putImageData(imgData, 0, 0);
      } else if (fType === "pixelate") {
        const blockSize = Math.max(4, Math.floor((w * (intensity / 100)) / 20));
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
        ctx.putImageData(imgData, 0, 0);
      } else if (fType === "blur-bg") {
        // Blur bg keeps center sharp
        // 1. Create blurred copy
        const blurredCanvas = document.createElement("canvas");
        blurredCanvas.width = w;
        blurredCanvas.height = h;
        const bCtx = blurredCanvas.getContext("2d")!;
        bCtx.drawImage(img, 0, 0, w, h);
        const bData = bCtx.getImageData(0, 0, w, h).data;
        const passes = Math.max(2, Math.floor(intensity / 8));
        const kernel = [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9];
        let curData = new Uint8ClampedArray(bData);
        for (let p = 0; p < passes; p++) {
          applyKernel(bCtx, w, h, curData, kernel);
          if (p < passes - 1) curData = bCtx.getImageData(0, 0, w, h).data;
        }
        
        // 2. Draw blurred to main
        ctx.drawImage(blurredCanvas, 0, 0);

        // 3. Clip center rectangle and draw sharp image
        ctx.save();
        ctx.beginPath();
        const rx = w * 0.25;
        const ry = h * 0.25;
        const rw = w * 0.5;
        const rh = h * 0.5;
        ctx.rect(rx, ry, rw, rh);
        ctx.clip();
        ctx.drawImage(img, 0, 0, w, h);
        ctx.restore();
      } else if (fType === "blur-face" || fType === "unblur-face") {
        // Face area is oval in center
        const faceCanvas = document.createElement("canvas");
        faceCanvas.width = w;
        faceCanvas.height = h;
        const fCtx = faceCanvas.getContext("2d")!;
        fCtx.drawImage(img, 0, 0, w, h);

        if (fType === "blur-face") {
          const passes = Math.max(1, Math.floor(intensity / 10));
          const kernel = [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9];
          let curData = new Uint8ClampedArray(fCtx.getImageData(0, 0, w, h).data);
          for (let p = 0; p < passes; p++) {
            applyKernel(fCtx, w, h, curData, kernel);
            if (p < passes - 1) curData = fCtx.getImageData(0, 0, w, h).data;
          }
          // Draw oval overlay of blurred face
          ctx.save();
          ctx.beginPath();
          ctx.ellipse(w / 2, h * 0.45, w * 0.22, h * 0.3, 0, 0, 2 * Math.PI);
          ctx.clip();
          ctx.drawImage(faceCanvas, 0, 0);
          ctx.restore();
        } else {
          // unblur-face: sharpen center face
          const kernel = [0, -1, 0, -1, 5, -1, 0, -1, 0];
          applyKernel(fCtx, w, h, fCtx.getImageData(0, 0, w, h).data, kernel);
          ctx.save();
          ctx.beginPath();
          ctx.ellipse(w / 2, h * 0.45, w * 0.22, h * 0.3, 0, 0, 2 * Math.PI);
          ctx.clip();
          ctx.drawImage(faceCanvas, 0, 0);
          ctx.restore();
        }
      } else if (fType === "motion-blur") {
        const offset = Math.max(2, Math.floor(intensity / 5));
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            let r = 0, g = 0, b = 0, count = 0;
            for (let dx = 0; dx < offset && x + dx < w; dx++) {
              const idx = (y * w + (x + dx)) * 4;
              r += data[idx];
              g += data[idx + 1];
              b += data[idx + 2];
              count++;
            }
            const i = (y * w + x) * 4;
            data[i] = r / count;
            data[i + 1] = g / count;
            data[i + 2] = b / count;
          }
        }
        ctx.putImageData(imgData, 0, 0);
      } else if (fType === "pixelate-face") {
        const faceCanvas = document.createElement("canvas");
        faceCanvas.width = w;
        faceCanvas.height = h;
        const fCtx = faceCanvas.getContext("2d")!;
        fCtx.drawImage(img, 0, 0, w, h);
        const fData = fCtx.getImageData(0, 0, w, h);
        const fd = fData.data;

        const blockSize = Math.max(4, Math.floor((w * (intensity / 100)) / 15));
        for (let y = 0; y < h; y += blockSize) {
          for (let x = 0; x < w; x += blockSize) {
            const idx = (y * w + x) * 4;
            const r = fd[idx];
            const g = fd[idx + 1];
            const b = fd[idx + 2];
            for (let dy = 0; dy < blockSize && y + dy < h; dy++) {
              for (let dx = 0; dx < blockSize && x + dx < w; dx++) {
                const i2 = ((y + dy) * w + (x + dx)) * 4;
                fd[i2] = r;
                fd[i2 + 1] = g;
                fd[i2 + 2] = b;
              }
            }
          }
        }
        fCtx.putImageData(fData, 0, 0);
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(w / 2, h * 0.45, w * 0.22, h * 0.3, 0, 0, 2 * Math.PI);
        ctx.clip();
        ctx.drawImage(faceCanvas, 0, 0);
        ctx.restore();
      } else if (fType === "beautify") {
        // Beautify: Smooth skin by blending light blur with raw details, and boost brights
        const bCanvas = document.createElement("canvas");
        bCanvas.width = w;
        bCanvas.height = h;
        const bCtx = bCanvas.getContext("2d")!;
        bCtx.drawImage(img, 0, 0, w, h);
        // Apply 3x3 kernel
        const kernel = [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9];
        applyKernel(bCtx, w, h, bCtx.getImageData(0, 0, w, h).data, kernel);
        const bd = bCtx.getImageData(0, 0, w, h).data;

        // Blend 70% original, 30% blur, add slight brightness
        const strength = intensity / 100;
        for (let i = 0; i < data.length; i += 4) {
          data[i] = clamp(data[i] * (1 - strength) + bd[i] * strength + 8);
          data[i + 1] = clamp(data[i + 1] * (1 - strength) + bd[i + 1] * strength + 8);
          data[i + 2] = clamp(data[i + 2] * (1 - strength) + bd[i + 2] * strength + 8);
        }
        ctx.putImageData(imgData, 0, 0);
      } else if (fType === "blemish") {
        // Average neighborhoods of pixels that deviate significantly from neighbors
        const neighbor = Math.max(1, Math.floor(intensity / 20));
        const temp = new Uint8ClampedArray(data);
        for (let y = neighbor; y < h - neighbor; y++) {
          for (let x = neighbor; x < w - neighbor; x++) {
            const idx = (y * w + x) * 4;
            let sumR = 0, sumG = 0, sumB = 0, count = 0;
            for (let dy = -neighbor; dy <= neighbor; dy++) {
              for (let dx = -neighbor; dx <= neighbor; dx++) {
                const nIdx = ((y + dy) * w + (x + dx)) * 4;
                sumR += temp[nIdx];
                sumG += temp[nIdx + 1];
                sumB += temp[nIdx + 2];
                count++;
              }
            }
            const avgR = sumR / count;
            const avgG = sumG / count;
            const avgB = sumB / count;
            // If local pixel deviates a lot from surround, heal it towards surround average
            if (Math.abs(temp[idx] - avgR) > 25) {
              data[idx] = avgR;
              data[idx + 1] = avgG;
              data[idx + 2] = avgB;
            }
          }
        }
        ctx.putImageData(imgData, 0, 0);
      } else if (fType === "retouch") {
        for (let i = 0; i < data.length; i += 4) {
          // Boost contrast, brightness, saturation
          data[i] = clamp((data[i] - 128) * 1.1 + 138);
          data[i + 1] = clamp((data[i + 1] - 128) * 1.1 + 138);
          data[i + 2] = clamp((data[i + 2] - 128) * 1.1 + 138);
        }
        ctx.putImageData(imgData, 0, 0);
      } else if (fType === "super-res") {
        // Strong sharpening on 2x image
        const kernel = [0, -1, 0, -1, 6, -1, 0, -1, 0];
        applyKernel(ctx, w, h, data, kernel);
      } else if (fType === "pixel-art") {
        // Downscale then upscale back
        const tempCanvas = document.createElement("canvas");
        const tinyW = Math.max(16, Math.floor(w / 8));
        const tinyH = Math.max(16, Math.floor(h / 8));
        tempCanvas.width = tinyW;
        tempCanvas.height = tinyH;
        const tempCtx = tempCanvas.getContext("2d")!;
        tempCtx.drawImage(img, 0, 0, tinyW, tinyH);

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(tempCanvas, 0, 0, w, h);
      }

      const blob = await canvasToBlob(canvas, 0.85);
      setOutputBlob(blob);
      setOutputSize(blob.size);
    } catch (err) {
      console.error(err);
      setError("Processing failed.");
    } finally {
      setProcessing(false);
    }
  }, [file, originalSrc, tool.filterType, intensity]);

  useEffect(() => {
    if (file) {
      const timer = setTimeout(() => {
        processImage();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [file, intensity, processImage]);

  const handleReset = () => {
    setFile(null);
    setOriginalSrc(null);
    setOutputBlob(null);
    setError(null);
  };

  return (
    <div className="p-6 space-y-5">
      {hasIntensity && (
        <div
          className="space-y-2 p-4 rounded-xl border"
          style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
        >
          <div className="flex justify-between items-center">
            <label htmlFor="intensity-slider" className="t-caption font-semibold">Filter Intensity</label>
            <span className="text-xs font-bold" style={{ color: "var(--color-accent)" }}>{intensity}%</span>
          </div>
          <input
            id="intensity-slider"
            type="range"
            min="1"
            max="100"
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="w-full"
            style={{ accentColor: "var(--color-accent)" }}
          />
        </div>
      )}

      {!file && <UploadZone tool={tool} onFile={handleFileChange} />}

      {processing && <ProcessingSpinner step="applying filter" />}

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
