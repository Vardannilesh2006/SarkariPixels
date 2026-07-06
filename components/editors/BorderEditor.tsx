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

export default function BorderEditor({ tool }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [originalSrc, setOriginalSrc] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputSize, setOutputSize] = useState<number>(0);

  const [borderWidth, setBorderWidth] = useState<number>(10);
  const [borderColor, setBorderColor] = useState<string>("#000000");
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isWhiteBorder = tool.borderType === "white";

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
      
      const newW = img.naturalWidth + borderWidth * 2;
      const newH = img.naturalHeight + borderWidth * 2;

      canvas.width = newW;
      canvas.height = newH;
      const ctx = canvas.getContext("2d")!;

      // Draw background border color
      ctx.fillStyle = isWhiteBorder ? "#ffffff" : borderColor;
      ctx.fillRect(0, 0, newW, newH);

      // Draw original image centered
      ctx.drawImage(img, borderWidth, borderWidth);

      const blob = await canvasToBlob(canvas, 0.85);
      setOutputBlob(blob);
      setOutputSize(blob.size);
    } catch (err) {
      console.error(err);
      setError("Processing failed.");
    } finally {
      setProcessing(false);
    }
  }, [file, originalSrc, borderWidth, borderColor, isWhiteBorder]);

  useEffect(() => {
    if (file) {
      const timer = setTimeout(() => {
        processImage();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [file, borderWidth, borderColor, processImage]);

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
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span>Border Width</span>
              <span>{borderWidth}px</span>
            </div>
            <input
              type="range"
              min="2"
              max="100"
              value={borderWidth}
              onChange={(e) => setBorderWidth(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: "var(--color-accent)" }}
            />
          </div>

          {!isWhiteBorder && (
            <div className="flex items-center gap-3">
              <label htmlFor="border-color-picker" className="t-caption font-semibold">Border Color:</label>
              <input
                id="border-color-picker"
                type="color"
                value={borderColor}
                onChange={(e) => setBorderColor(e.target.value)}
                className="w-10 h-10 border rounded cursor-pointer"
              />
            </div>
          )}
        </div>
      )}

      {!file && <UploadZone tool={tool} onFile={handleFileChange} />}

      {processing && <ProcessingSpinner step="drawing border" />}

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
