"use client";

import { useState, useEffect, useCallback } from "react";
import type { Tool } from "@/lib/tools-data";
import {
  UploadZone,
  validateImageFile,
  readFile,
  loadImage,
  canvasToBlob,
  ErrorBanner,
  ResultPreview
} from "./shared";

interface Props {
  tool: Tool;
}

export default function CollageEditor({ tool }: Props) {
  const [layout, setLayout] = useState<string>("2x2");
  const [spacing, setSpacing] = useState<number>(4);
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  
  // Cell sources map
  const [cells, setCells] = useState<Record<number, string>>({});

  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputSize, setOutputSize] = useState<number>(0);
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Parse layout rows/cols
  const [cols, rows] = layout.split("x").map(Number);
  const totalCells = cols * rows;

  const handleCellFile = async (f: File, idx: number) => {
    const valErr = validateImageFile(f);
    if (valErr) { setError(valErr); return; }
    const src = await readFile(f);
    setCells((prev) => ({ ...prev, [idx]: src }));
  };

  const handleRemoveCell = (idx: number) => {
    setCells((prev) => {
      const next = { ...prev };
      delete next[idx];
      return next;
    });
  };

  const processImage = useCallback(async () => {
    // Check if at least one cell is filled
    const activeIndices = Object.keys(cells).map(Number);
    if (activeIndices.length === 0) {
      setOutputBlob(null);
      return;
    }
    setError(null);
    setProcessing(true);
    try {
      const canvas = document.createElement("canvas");
      // Set fixed resolution for standard output
      const cellW = 400;
      const cellH = 300;
      const totalW = cellW * cols + spacing * (cols - 1);
      const totalH = cellH * rows + spacing * (rows - 1);

      canvas.width = totalW;
      canvas.height = totalH;
      const ctx = canvas.getContext("2d")!;

      // Background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, totalW, totalH);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const x = c * (cellW + spacing);
          const y = r * (cellH + spacing);

          const src = cells[idx];
          if (src) {
            const img = await loadImage(src);
            
            // Draw image with aspect cover centering
            ctx.save();
            ctx.beginPath();
            ctx.rect(x, y, cellW, cellH);
            ctx.clip();

            const imgRatio = img.naturalWidth / img.naturalHeight;
            const cellRatio = cellW / cellH;

            let dw = cellW;
            let dh = cellH;
            let dx = x;
            let dy = y;

            if (imgRatio > cellRatio) {
              dw = cellH * imgRatio;
              dx = x - (dw - cellW) / 2;
            } else {
              dh = cellW / imgRatio;
              dy = y - (dh - cellH) / 2;
            }

            ctx.drawImage(img, dx, dy, dw, dh);
            ctx.restore();
          } else {
            // Empty cell placeholder
            ctx.fillStyle = "#e4e4e7";
            ctx.fillRect(x, y, cellW, cellH);
            ctx.fillStyle = "#a1a1aa";
            ctx.font = "14px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(`Empty Cell ${idx + 1}`, x + cellW / 2, y + cellH / 2);
          }
        }
      }

      const blob = await canvasToBlob(canvas, 0.85);
      setOutputBlob(blob);
      setOutputSize(blob.size);
    } catch (err) {
      console.error(err);
      setError("Collage processing failed.");
    } finally {
      setProcessing(false);
    }
  }, [cells, cols, rows, spacing, bgColor]);

  useEffect(() => {
    processImage();
  }, [cells, layout, spacing, bgColor, processImage]);

  const handleReset = () => {
    setCells({});
    setOutputBlob(null);
    setError(null);
  };

  return (
    <div className="p-6 space-y-5">
      {/* Settings */}
      <div
        className="space-y-4 p-4 rounded-xl border"
        style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label htmlFor="collage-layout-select" className="text-xs font-semibold block mb-1">Layout Grid</label>
            <select
              id="collage-layout-select"
              value={layout}
              onChange={(e) => { setLayout(e.target.value); setCells({}); }}
              className="w-full text-sm border rounded-lg px-2 py-1.5"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
            >
              <option value="2x1">2x1 Grid</option>
              <option value="1x2">1x2 Grid</option>
              <option value="2x2">2x2 Grid</option>
              <option value="3x1">3x1 Grid</option>
              <option value="1x3">1x3 Grid</option>
              <option value="2x3">2x3 Grid</option>
              <option value="3x2">3x2 Grid</option>
              <option value="3x3">3x3 Grid</option>
            </select>
          </div>
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>Spacing</span>
              <span>{spacing}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              value={spacing}
              onChange={(e) => setSpacing(Number(e.target.value))}
              className="w-full mt-2"
              style={{ accentColor: "var(--color-accent)" }}
            />
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="collage-bg-picker" className="text-xs font-semibold">Background Color:</label>
            <input
              id="collage-bg-picker"
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-10 h-10 border rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {Array.from({ length: totalCells }).map((_, idx) => {
          const src = cells[idx];
          return (
            <div key={idx} className="relative border rounded-xl p-2 bg-zinc-900 flex flex-col justify-center items-center min-h-[120px] text-center">
              {src ? (
                <>
                  <img src={src} alt={`Cell ${idx + 1}`} className="max-h-20 object-contain rounded" />
                  <button
                    onClick={() => handleRemoveCell(idx)}
                    className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]"
                  >
                    ✕
                  </button>
                  <span className="text-[10px] mt-2 text-white font-semibold">Cell {idx + 1}</span>
                </>
              ) : (
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <span className="text-[10px] text-zinc-400 font-semibold mb-1 block">Cell {idx + 1}</span>
                  <input
                    type="file"
                    accept="image/*"
                    id={`cell-input-${idx}`}
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleCellFile(e.target.files[0], idx)}
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById(`cell-input-${idx}`)?.click()}
                    className="btn btn-secondary py-1 px-2 text-[10px]"
                  >
                    Upload
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {processing && (
        <div className="text-center py-4 t-caption">Creating Collage Grid…</div>
      )}

      {error && <ErrorBanner message={error} />}

      {outputBlob && Object.keys(cells).length > 0 && !processing && (
        <ResultPreview
          originalSrc={cells[Object.keys(cells).map(Number)[0]]}
          originalSize={0}
          outputBlob={outputBlob}
          outputSize={outputSize}
          toolId={tool.id}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
