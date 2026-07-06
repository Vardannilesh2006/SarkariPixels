"use client";

import { useState, useRef, useEffect } from "react";
import type { Tool } from "@/lib/tools-data";
import {
  UploadZone,
  ResultPreview,
  ErrorBanner,
  validateImageFile,
  readFile,
  loadImage,
  canvasToBlob
} from "./shared";

interface Props {
  tool: Tool;
}

interface Point { x: number; y: number; }
interface Box { x: number; y: number; w: number; h: number; }

export default function DrawMaskEditor({ tool }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [originalSrc, setOriginalSrc] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputSize, setOutputSize] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(20);
  const [error, setError] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);

  // For remove-object: stroke paths
  const [strokes, setStrokes] = useState<Point[][]>([]);
  // For censor-photo: rectangular bounds
  const [censors, setCensors] = useState<Box[]>([]);
  const [activeRectStart, setActiveRectStart] = useState<Point | null>(null);

  const isRemove = tool.id === "remove-object";

  const handleFileChange = (f: File) => {
    const valErr = validateImageFile(f);
    if (valErr) { setError(valErr); return; }
    setFile(f);
    setApplied(false);
    setStrokes([]);
    setCensors([]);
    readFile(f).then((src) => {
      setOriginalSrc(src);
      setOriginalSize(f.size);
    });
  };

  // Redraw canvas content on change
  useEffect(() => {
    if (!originalSrc || !canvasRef.current || applied) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    
    loadImage(originalSrc).then((img) => {
      // Scale canvas down to container size for editing, but we process full resolution
      // For simplicity, let's set canvas size to match image dimensions
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);

      // Redraw actions
      if (isRemove) {
        ctx.fillStyle = "rgba(220, 38, 38, 0.4)"; // translucent red brush mask
        strokes.forEach((stroke) => {
          if (stroke.length < 2) return;
          ctx.beginPath();
          ctx.arc(stroke[0].x, stroke[0].y, brushSize / 2, 0, 2 * Math.PI);
          ctx.fill();
          
          ctx.beginPath();
          ctx.lineWidth = brushSize;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.strokeStyle = "rgba(220, 38, 38, 0.4)";
          ctx.moveTo(stroke[0].x, stroke[0].y);
          for (let i = 1; i < stroke.length; i++) {
            ctx.lineTo(stroke[i].x, stroke[i].y);
          }
          ctx.stroke();
        });
      } else {
        // Censor black bars
        ctx.fillStyle = "#000000";
        censors.forEach((box) => {
          ctx.fillRect(box.x, box.y, box.w, box.h);
        });
      }
    });
  }, [originalSrc, strokes, censors, brushSize, isRemove, applied]);

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (applied) return;
    setIsDrawing(true);
    const coord = getCanvasCoords(e);
    if (isRemove) {
      setStrokes((prev) => [...prev, [coord]]);
    } else {
      setActiveRectStart(coord);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || applied) return;
    const coord = getCanvasCoords(e);

    if (isRemove) {
      setStrokes((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last) {
          next[next.length - 1] = [...last, coord];
        }
        return next;
      });
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || applied) return;
    setIsDrawing(false);
    if (!isRemove && activeRectStart) {
      const end = getCanvasCoords(e);
      const box: Box = {
        x: Math.min(activeRectStart.x, end.x),
        y: Math.min(activeRectStart.y, end.y),
        w: Math.abs(end.x - activeRectStart.x),
        h: Math.abs(end.y - activeRectStart.y)
      };
      if (box.w > 5 && box.h > 5) {
        setCensors((prev) => [...prev, box]);
      }
      setActiveRectStart(null);
    }
  };

  const handleUndo = () => {
    if (isRemove) {
      setStrokes((prev) => prev.slice(0, -1));
    } else {
      setCensors((prev) => prev.slice(0, -1));
    }
  };

  const handleApply = async () => {
    if (!originalSrc || !canvasRef.current) return;
    setError(null);
    try {
      const img = await loadImage(originalSrc);
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);

      if (isRemove) {
        // Remove object: we approximate basic inpainting by filling painted strokes with local average pixels
        // Let's create mask helper
        const maskCanvas = document.createElement("canvas");
        maskCanvas.width = canvas.width;
        maskCanvas.height = canvas.height;
        const mCtx = maskCanvas.getContext("2d")!;
        mCtx.fillStyle = "#000000";
        mCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
        
        mCtx.strokeStyle = "#ffffff";
        mCtx.fillStyle = "#ffffff";
        mCtx.lineWidth = brushSize;
        mCtx.lineCap = "round";
        mCtx.lineJoin = "round";

        strokes.forEach((stroke) => {
          if (stroke.length < 2) return;
          mCtx.beginPath();
          mCtx.arc(stroke[0].x, stroke[0].y, brushSize / 2, 0, 2 * Math.PI);
          mCtx.fill();

          mCtx.beginPath();
          mCtx.moveTo(stroke[0].x, stroke[0].y);
          for (let i = 1; i < stroke.length; i++) {
            mCtx.lineTo(stroke[i].x, stroke[i].y);
          }
          mCtx.stroke();
        });

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const maskData = mCtx.getImageData(0, 0, canvas.width, canvas.height).data;
        const data = imgData.data;

        // Simple patch match or local average replacement for white pixels in mask
        const w = canvas.width;
        const h = canvas.height;
        const radius = Math.floor(brushSize / 2) + 2;

        for (let y = radius; y < h - radius; y++) {
          for (let x = radius; x < w - radius; x++) {
            const idx = (y * w + x) * 4;
            // White pixel in mask means it is painted
            if (maskData[idx] > 128) {
              let rSum = 0, gSum = 0, bSum = 0, count = 0;
              // Average from surrounding non-masked boundary pixels
              for (let dy = -radius; dy <= radius; dy++) {
                for (let dx = -radius; dx <= radius; dx++) {
                  const nIdx = ((y + dy) * w + (x + dx)) * 4;
                  if (maskData[nIdx] < 50) { // non masked neighbor
                    rSum += data[nIdx];
                    gSum += data[nIdx + 1];
                    bSum += data[nIdx + 2];
                    count++;
                  }
                }
              }
              if (count > 0) {
                data[idx] = rSum / count;
                data[idx + 1] = gSum / count;
                data[idx + 2] = bSum / count;
              }
            }
          }
        }
        ctx.putImageData(imgData, 0, 0);

      } else {
        // Censor photo: draw permanent black rects
        ctx.fillStyle = "#000000";
        censors.forEach((box) => {
          ctx.fillRect(box.x, box.y, box.w, box.h);
        });
      }

      const blob = await canvasToBlob(canvas, 0.85);
      setOutputBlob(blob);
      setOutputSize(blob.size);
      setApplied(true);
    } catch (err) {
      console.error(err);
      setError("Failed to apply mask edit.");
    }
  };

  const handleReset = () => {
    setFile(null);
    setOriginalSrc(null);
    setOutputBlob(null);
    setStrokes([]);
    setCensors([]);
    setApplied(false);
    setError(null);
  };

  return (
    <div className="p-6 space-y-5">
      {file && originalSrc && !applied && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="t-caption font-semibold">
              {isRemove ? "Paint to mask objects for erasure" : "Draw rectangular regions to censor"}
            </span>
            <div className="flex gap-2">
              <button onClick={handleUndo} className="btn btn-secondary py-1 text-xs">
                <i className="fa-solid fa-undo" aria-hidden="true" /> Undo
              </button>
            </div>
          </div>

          {isRemove && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span>Brush Size</span>
                <span>{brushSize}px</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-full"
                style={{ accentColor: "var(--color-accent)" }}
              />
            </div>
          )}

          <div className="flex justify-center border bg-zinc-950 p-2 rounded-xl">
            <canvas
              ref={canvasRef}
              className="max-h-[350px] object-contain cursor-crosshair max-w-full rounded-lg"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            />
          </div>

          <div className="flex gap-3">
            <button onClick={handleApply} className="btn btn-primary flex-1 justify-center">
              Apply Changes
            </button>
            <button onClick={handleReset} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      )}

      {!file && <UploadZone tool={tool} onFile={handleFileChange} />}

      {error && <ErrorBanner message={error} />}

      {applied && outputBlob && originalSrc && (
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
