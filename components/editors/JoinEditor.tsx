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

interface ImageItem {
  id: number;
  src: string;
  size: number;
  file: File;
}

export default function JoinEditor({ tool }: Props) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [direction, setDirection] = useState<"horizontal" | "vertical">("horizontal");
  const [spacing, setSpacing] = useState<number>(0);

  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputSize, setOutputSize] = useState<number>(0);

  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddFile = async (f: File) => {
    const valErr = validateImageFile(f);
    if (valErr) { setError(valErr); return; }
    if (images.length >= 5) {
      setError("Maximum 5 files joined allowed.");
      return;
    }
    const src = await readFile(f);
    const item: ImageItem = {
      id: Date.now() + Math.random(),
      src,
      size: f.size,
      file: f
    };
    setImages((prev) => [...prev, item]);
  };

  const handleRemove = (id: number) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const processImage = useCallback(async () => {
    if (images.length < 2) {
      setOutputBlob(null);
      return;
    }
    setError(null);
    setProcessing(true);
    try {
      const loadedImgs = await Promise.all(images.map((img) => loadImage(img.src)));
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      let totalW = 0;
      let totalH = 0;

      if (direction === "horizontal") {
        totalW = loadedImgs.reduce((sum, img) => sum + img.naturalWidth, 0) + spacing * (images.length - 1);
        totalH = Math.max(...loadedImgs.map((img) => img.naturalHeight));
      } else {
        totalW = Math.max(...loadedImgs.map((img) => img.naturalWidth));
        totalH = loadedImgs.reduce((sum, img) => sum + img.naturalHeight, 0) + spacing * (images.length - 1);
      }

      canvas.width = totalW;
      canvas.height = totalH;

      // Draw background white
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, totalW, totalH);

      let offset = 0;
      loadedImgs.forEach((img) => {
        if (direction === "horizontal") {
          ctx.drawImage(img, offset, 0);
          offset += img.naturalWidth + spacing;
        } else {
          ctx.drawImage(img, 0, offset);
          offset += img.naturalHeight + spacing;
        }
      });

      const blob = await canvasToBlob(canvas, 0.85);
      setOutputBlob(blob);
      setOutputSize(blob.size);
    } catch (err) {
      console.error(err);
      setError("Joining failed.");
    } finally {
      setProcessing(false);
    }
  }, [images, direction, spacing]);

  useEffect(() => {
    if (images.length >= 2) {
      const timer = setTimeout(() => {
        processImage();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [images, direction, spacing, processImage]);

  const handleReset = () => {
    setImages([]);
    setOutputBlob(null);
    setError(null);
  };

  return (
    <div className="p-6 space-y-5">
      <div
        className="space-y-4 p-4 rounded-xl border"
        style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
      >
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="text-xs font-semibold block mb-1">Direction</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDirection("horizontal")}
                className={`btn py-1 px-3 text-xs ${direction === "horizontal" ? "btn-primary" : "btn-secondary"}`}
              >
                Horizontal
              </button>
              <button
                type="button"
                onClick={() => setDirection("vertical")}
                className={`btn py-1 px-3 text-xs ${direction === "vertical" ? "btn-primary" : "btn-secondary"}`}
              >
                Vertical
              </button>
            </div>
          </div>
          <div className="flex-grow">
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>Spacing</span>
              <span>{spacing}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={spacing}
              onChange={(e) => setSpacing(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: "var(--color-accent)" }}
            />
          </div>
        </div>
      </div>

      {images.length < 5 && (
        <UploadZone tool={tool} onFile={handleAddFile} label={`Add Photo (${images.length}/5)`} />
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-5 gap-3">
          {images.map((img, idx) => (
            <div key={img.id} className="relative border rounded-lg p-2 bg-zinc-950">
              <img src={img.src} alt="thumbnail" className="h-16 w-full object-contain rounded" />
              <button
                onClick={() => handleRemove(img.id)}
                className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] hover:bg-red-700"
              >
                ✕
              </button>
              <span className="text-[10px] text-center block mt-1 text-white">Part {idx + 1}</span>
            </div>
          ))}
        </div>
      )}

      {processing && <ProcessingSpinner step="joining photos" />}

      {error && <ErrorBanner message={error} />}

      {outputBlob && images.length >= 2 && !processing && (
        <ResultPreview
          originalSrc={images[0].src}
          originalSize={images.reduce((sum, img) => sum + img.size, 0)}
          outputBlob={outputBlob}
          outputSize={outputSize}
          toolId={tool.id}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
