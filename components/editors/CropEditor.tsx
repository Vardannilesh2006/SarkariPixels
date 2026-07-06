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

export default function CropEditor({ tool }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [originalSrc, setOriginalSrc] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputSize, setOutputSize] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  // Crop coordinates (as percent of image size 0-100)
  const [cropBox, setCropBox] = useState({ x: 10, y: 10, w: 80, h: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragBoxStart, setDragBoxStart] = useState({ x: 0, y: 0 });
  
  const [error, setError] = useState<string | null>(null);
  const [cropped, setCropped] = useState(false);

  const isSquare = tool.aspect === 1;
  const isCircle = tool.cropStyle === "circle";
  const outputFormat = tool.format === "image/png" ? "png" : "jpg";

  const handleFileChange = (f: File) => {
    const valError = validateImageFile(f);
    if (valError) {
      setError(valError);
      return;
    }
    setFile(f);
    setCropped(false);
    readFile(f).then((src) => {
      setOriginalSrc(src);
      setOriginalSize(f.size);
      // Reset crop box
      setCropBox(isSquare ? { x: 10, y: 10, w: 60, h: 60 } : { x: 10, y: 10, w: 80, h: 80 });
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (cropped) return;
    setIsDragging(true);
    const rect = containerRef.current!.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setDragStart({ x, y });
    setDragBoxStart({ x: cropBox.x, y: cropBox.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || cropped) return;
    const rect = containerRef.current!.getBoundingClientRect();
    const currentX = ((e.clientX - rect.left) / rect.width) * 100;
    const currentY = ((e.clientY - rect.top) / rect.height) * 100;

    const dx = currentX - dragStart.x;
    const dy = currentY - dragStart.y;

    let newX = Math.max(0, Math.min(100 - cropBox.w, dragBoxStart.x + dx));
    let newY = Math.max(0, Math.min(100 - cropBox.h, dragBoxStart.y + dy));

    setCropBox((prev) => ({ ...prev, x: newX, y: newY }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleApplyCrop = async () => {
    if (!originalSrc) return;
    setError(null);
    try {
      const img = await loadImage(originalSrc);
      const canvas = document.createElement("canvas");
      
      const realX = (cropBox.x / 100) * img.naturalWidth;
      const realY = (cropBox.y / 100) * img.naturalHeight;
      const realW = (cropBox.w / 100) * img.naturalWidth;
      const realH = (cropBox.h / 100) * img.naturalHeight;

      canvas.width = realW;
      canvas.height = realH;
      const ctx = canvas.getContext("2d")!;

      if (isCircle) {
        ctx.beginPath();
        ctx.arc(realW / 2, realH / 2, Math.min(realW, realH) / 2, 0, 2 * Math.PI);
        ctx.clip();
      }

      ctx.drawImage(img, realX, realY, realW, realH, 0, 0, realW, realH);

      const mime = outputFormat === "png" ? "image/png" : "image/jpeg";
      const blob = await canvasToBlob(canvas, 0.9, mime);
      setOutputBlob(blob);
      setOutputSize(blob.size);
      setCropped(true);
    } catch (err) {
      console.error(err);
      setError("Failed to apply crop.");
    }
  };

  const handleReset = () => {
    setFile(null);
    setOriginalSrc(null);
    setOutputBlob(null);
    setCropped(false);
    setError(null);
  };

  return (
    <div className="p-6 space-y-5">
      {file && originalSrc && !cropped && (
        <div className="space-y-4">
          <div className="t-caption font-semibold uppercase tracking-wider">Drag overlay area to reposition crop target</div>
          
          <div 
            ref={containerRef}
            className="relative border overflow-hidden select-none cursor-move max-h-[300px] flex items-center justify-center bg-zinc-900 rounded-lg"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              ref={imageRef}
              src={originalSrc}
              alt="Crop editor preview"
              className="max-h-[300px] object-contain pointer-events-none"
            />
            {/* Dark Mask Overlay */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />
            
            {/* Highlighted Crop Area */}
            <div
              className={`absolute border-2 border-white pointer-events-none ${isCircle ? "rounded-full" : ""}`}
              style={{
                left: `${cropBox.x}%`,
                top: `${cropBox.y}%`,
                width: `${cropBox.w}%`,
                height: `${cropBox.h}%`,
                boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
              }}
            />
          </div>

          <div className="flex gap-3">
            <button onClick={handleApplyCrop} className="btn btn-primary flex-1 justify-center">
              <i className="fa-solid fa-crop" aria-hidden="true" /> Apply Crop
            </button>
            <button onClick={handleReset} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      )}

      {!file && <UploadZone tool={tool} onFile={handleFileChange} />}

      {error && <ErrorBanner message={error} />}

      {cropped && outputBlob && originalSrc && (
        <ResultPreview
          originalSrc={originalSrc}
          originalSize={originalSize}
          outputBlob={outputBlob}
          outputSize={outputSize}
          toolId={tool.id}
          outputFormat={outputFormat}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
