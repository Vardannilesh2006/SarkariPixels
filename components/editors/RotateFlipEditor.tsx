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

export default function RotateFlipEditor({ tool }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [originalSrc, setOriginalSrc] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputSize, setOutputSize] = useState<number>(0);

  const [rotation, setRotation] = useState<number>(0); // degrees (0-360)
  const [flipH, setFlipH] = useState<boolean>(false);
  const [flipV, setFlipV] = useState<boolean>(false);

  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isRotateTool = tool.group === "rotate";
  const isFlipTool = tool.group === "flip";

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
      const ctx = canvas.getContext("2d")!;

      const rad = (rotation * Math.PI) / 180;
      
      // Calculate bounding box size after rotation
      const sin = Math.abs(Math.sin(rad));
      const cos = Math.abs(Math.cos(rad));
      const newW = img.naturalWidth * cos + img.naturalHeight * sin;
      const newH = img.naturalWidth * sin + img.naturalHeight * cos;

      canvas.width = newW;
      canvas.height = newH;

      // Translate context to center
      ctx.translate(newW / 2, newH / 2);
      
      // Apply flips
      const scaleX = flipH ? -1 : 1;
      const scaleY = flipV ? -1 : 1;
      ctx.scale(scaleX, scaleY);
      
      // Apply rotation
      ctx.rotate(rad);

      // Draw image centered
      ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

      const blob = await canvasToBlob(canvas, 0.85);
      setOutputBlob(blob);
      setOutputSize(blob.size);
    } catch (err) {
      console.error(err);
      setError("Processing failed.");
    } finally {
      setProcessing(false);
    }
  }, [file, originalSrc, rotation, flipH, flipV]);

  useEffect(() => {
    if (file) {
      const timer = setTimeout(() => {
        processImage();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [file, rotation, flipH, flipV, processImage]);

  const handleReset = () => {
    setFile(null);
    setOriginalSrc(null);
    setOutputBlob(null);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setError(null);
  };

  return (
    <div className="p-6 space-y-5">
      {file && (
        <div
          className="flex flex-wrap gap-4 p-4 rounded-xl border"
          style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
        >
          {isRotateTool && (
            <div className="w-full space-y-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setRotation((prev) => (prev + 90) % 360)}
                  className="btn btn-secondary flex-1 justify-center"
                >
                  <i className="fa-solid fa-rotate-right" aria-hidden="true" /> +90° CW
                </button>
                <button
                  type="button"
                  onClick={() => setRotation((prev) => (prev - 90 + 360) % 360)}
                  className="btn btn-secondary flex-1 justify-center"
                >
                  <i className="fa-solid fa-rotate-left" aria-hidden="true" /> -90° CCW
                </button>
                <button
                  type="button"
                  onClick={() => setRotation((prev) => (prev + 180) % 360)}
                  className="btn btn-secondary flex-1 justify-center"
                >
                  180°
                </button>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Custom Angle</span>
                  <span>{rotation}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: "var(--color-accent)" }}
                />
              </div>
            </div>
          )}

          {isFlipTool && (
            <div className="flex gap-3 w-full">
              <button
                type="button"
                onClick={() => setFlipH((prev) => !prev)}
                className={`btn flex-1 justify-center ${flipH ? "btn-primary" : "btn-secondary"}`}
              >
                <i className="fa-solid fa-arrows-left-right" aria-hidden="true" /> Horizontal Flip
              </button>
              <button
                type="button"
                onClick={() => setFlipV((prev) => !prev)}
                className={`btn flex-1 justify-center ${flipV ? "btn-primary" : "btn-secondary"}`}
              >
                <i className="fa-solid fa-arrows-up-down" aria-hidden="true" /> Vertical Flip
              </button>
            </div>
          )}
        </div>
      )}

      {!file && <UploadZone tool={tool} onFile={handleFileChange} />}

      {processing && <ProcessingSpinner step="rotating/flipping" />}

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
