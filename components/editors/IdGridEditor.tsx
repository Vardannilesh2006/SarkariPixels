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

export default function IdGridEditor({ tool }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [originalSrc, setOriginalSrc] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputSize, setOutputSize] = useState<number>(0);

  const [copies, setCopies] = useState<number>(6);
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

      // Create 4x6 inch sheet at 300 DPI = 1200 x 1800 pixels
      const sheetW = 1200;
      const sheetH = 1800;

      const canvas = document.createElement("canvas");
      canvas.width = sheetW;
      canvas.height = sheetH;
      const ctx = canvas.getContext("2d")!;

      // Draw background white
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, sheetW, sheetH);

      // Each passport photo copy dimensions: 35mm x 45mm at 300 DPI
      // 35mm = 35 / 25.4 * 300 = 413 pixels
      // 45mm = 45 / 25.4 * 300 = 531 pixels
      const copyW = 413;
      const copyH = 531;

      // Arrange copies in a centered grid
      // Copies = 4, 6, or 8
      let cols = 2;
      let rows = 2;

      if (copies === 6) {
        cols = 2;
        rows = 3;
      } else if (copies === 8) {
        cols = 2;
        rows = 4;
      }

      const spacingX = 40;
      const spacingY = 40;

      const startX = (sheetW - (cols * copyW + (cols - 1) * spacingX)) / 2;
      const startY = (sheetH - (rows * copyH + (rows - 1) * spacingY)) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = startX + c * (copyW + spacingX);
          const y = startY + r * (copyH + spacingY);

          // Draw crop of photo centered in copy container (aspect crop)
          ctx.save();
          ctx.beginPath();
          ctx.rect(x, y, copyW, copyH);
          ctx.clip();

          // Border around each copy
          ctx.strokeStyle = "#dddddd";
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, copyW, copyH);

          const imgRatio = img.naturalWidth / img.naturalHeight;
          const copyRatio = copyW / copyH;

          let dw = copyW;
          let dh = copyH;
          let dx = x;
          let dy = y;

          if (imgRatio > copyRatio) {
            dw = copyH * imgRatio;
            dx = x - (dw - copyW) / 2;
          } else {
            dh = copyW / imgRatio;
            dy = y - (dh - copyH) / 2;
          }

          ctx.drawImage(img, dx, dy, dw, dh);

          // Subdued border line on crop boundary
          ctx.strokeStyle = "#eaeaea";
          ctx.strokeRect(x, y, copyW, copyH);

          ctx.restore();
        }
      }

      // Add small helper guidelines at bottom of sheet
      ctx.fillStyle = "#a1a1aa";
      ctx.font = "bold 24px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("SarkariPixels Passport Photo Sheet (4x6 Inch Print size)", sheetW / 2, sheetH - 40);

      const blob = await canvasToBlob(canvas, 0.95);
      setOutputBlob(blob);
      setOutputSize(blob.size);
    } catch (err) {
      console.error(err);
      setError("Grid generation failed.");
    } finally {
      setProcessing(false);
    }
  }, [file, originalSrc, copies]);

  useEffect(() => {
    if (file) {
      const timer = setTimeout(() => {
        processImage();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [file, copies, processImage]);

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
            <label className="text-xs font-semibold block mb-1">Copies on Sheet</label>
            <div className="flex gap-2">
              {[4, 6, 8].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setCopies(num)}
                  className={`btn py-1 px-4 text-xs ${copies === num ? "btn-primary" : "btn-secondary"}`}
                >
                  {num} Photos
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {!file && <UploadZone tool={tool} onFile={handleFileChange} />}

      {processing && <ProcessingSpinner step="generating sheet" />}

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
