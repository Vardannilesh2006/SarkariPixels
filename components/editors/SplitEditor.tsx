"use client";

import { useState, useEffect, useCallback } from "react";
import type { Tool } from "@/lib/tools-data";
import {
  UploadZone,
  validateImageFile,
  readFile,
  loadImage,
  canvasToBlob,
  formatSize,
  ErrorBanner
} from "./shared";

interface Props {
  tool: Tool;
}

interface SplitPart {
  blob: Blob;
  size: number;
  url: string;
}

export default function SplitEditor({ tool }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [originalSrc, setOriginalSrc] = useState<string | null>(null);
  const [direction, setDirection] = useState<"horizontal" | "vertical">("vertical");
  const [parts, setParts] = useState<number>(2);

  const [splitParts, setSplitParts] = useState<SplitPart[]>([]);
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (f: File) => {
    const valErr = validateImageFile(f);
    if (valErr) { setError(valErr); return; }
    setFile(f);
    setSplitParts([]);
    readFile(f).then((src) => setOriginalSrc(src));
  };

  const handleSplit = async () => {
    if (!originalSrc) return;
    setError(null);
    setProcessing(true);
    try {
      const img = await loadImage(originalSrc);
      const w = img.naturalWidth;
      const h = img.naturalHeight;

      const results: SplitPart[] = [];

      for (let i = 0; i < parts; i++) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;

        let sx = 0, sy = 0, sWidth = w, sHeight = h;

        if (direction === "horizontal") {
          sWidth = Math.floor(w / parts);
          sx = i * sWidth;
          canvas.width = sWidth;
          canvas.height = h;
        } else {
          sHeight = Math.floor(h / parts);
          sy = i * sHeight;
          canvas.width = w;
          canvas.height = sHeight;
        }

        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight);
        const blob = await canvasToBlob(canvas, 0.9);
        results.push({
          blob,
          size: blob.size,
          url: URL.createObjectURL(blob),
        });
      }

      setSplitParts(results);
    } catch (err) {
      console.error(err);
      setError("Failed to split image.");
    } finally {
      setProcessing(false);
    }
  };

  const handleDownloadPart = (part: SplitPart, idx: number) => {
    const a = document.createElement("a");
    a.href = part.url;
    a.download = `${tool.id}_part_${idx + 1}.jpg`;
    a.click();
  };

  const handleReset = () => {
    setFile(null);
    setOriginalSrc(null);
    setSplitParts([]);
    setError(null);
  };

  return (
    <div className="p-6 space-y-5">
      {file && originalSrc && splitParts.length === 0 && (
        <div
          className="space-y-4 p-4 rounded-xl border"
          style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
        >
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label className="text-xs font-semibold block mb-1">Split Direction</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setDirection("vertical")}
                  className={`btn py-1 px-3 text-xs ${direction === "vertical" ? "btn-primary" : "btn-secondary"}`}
                >
                  Vertical Lines
                </button>
                <button
                  type="button"
                  onClick={() => setDirection("horizontal")}
                  className={`btn py-1 px-3 text-xs ${direction === "horizontal" ? "btn-primary" : "btn-secondary"}`}
                >
                  Horizontal Lines
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1">Number of Parts</label>
              <div className="flex gap-2">
                {[2, 3, 4].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setParts(num)}
                    className={`btn py-1 px-3 text-xs ${parts === num ? "btn-primary" : "btn-secondary"}`}
                  >
                    {num} Parts
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSplit} className="btn btn-primary flex-1 justify-center">
              Split Image
            </button>
            <button onClick={handleReset} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      )}

      {!file && <UploadZone tool={tool} onFile={handleFileChange} />}

      {processing && (
        <div className="text-center py-4 t-caption">Splitting Image…</div>
      )}

      {error && <ErrorBanner message={error} />}

      {splitParts.length > 0 && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {splitParts.map((part, idx) => (
              <div key={idx} className="rounded-xl border p-3 bg-zinc-950 text-center">
                <span className="text-xs font-bold text-white block mb-2">Part {idx + 1}</span>
                <img
                  src={part.url}
                  alt={`Part ${idx + 1}`}
                  className="max-h-32 object-contain mx-auto rounded"
                />
                <div className="text-[10px] text-zinc-400 my-2">{formatSize(part.size)}</div>
                <button
                  onClick={() => handleDownloadPart(part, idx)}
                  className="btn btn-sm btn-primary w-full justify-center"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
          <button onClick={handleReset} className="btn btn-secondary w-full justify-center">
            Upload Another
          </button>
        </div>
      )}
    </div>
  );
}
