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

type TextPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export default function TextOverlayEditor({ tool }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [originalSrc, setOriginalSrc] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputSize, setOutputSize] = useState<number>(0);

  // Settings for different stampTypes
  const [name, setName] = useState<string>("RAHUL SHARMA");
  const [dob, setDob] = useState<string>("DOB: 15/08/2001");
  const [text, setText] = useState<string>("CONFIDENTIAL");
  const [fontSize, setFontSize] = useState<number>(36);
  const [textColor, setTextColor] = useState<string>("#ff0000");
  const [opacity, setOpacity] = useState<number>(30); // for watermark
  const [position, setPosition] = useState<TextPosition>("bottom-center");

  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const stampType = tool.stampType || "text";

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
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;

      ctx.drawImage(img, 0, 0);

      const w = img.naturalWidth;
      const h = img.naturalHeight;

      if (stampType === "name-dob") {
        // Name & DOB bottom white band
        const bandHeight = Math.max(40, Math.floor(h * 0.15));
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, h - bandHeight, w, bandHeight);

        ctx.fillStyle = "#000000";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        const text1 = name.toUpperCase();
        const text2 = dob.toUpperCase();

        const fs1 = Math.max(12, Math.floor(bandHeight * 0.35));
        const fs2 = Math.max(10, Math.floor(bandHeight * 0.28));

        ctx.font = `bold ${fs1}px Arial, sans-serif`;
        ctx.fillText(text1, w / 2, h - bandHeight * 0.65);

        ctx.font = `bold ${fs2}px Arial, sans-serif`;
        ctx.fillText(text2, w / 2, h - bandHeight * 0.28);

      } else if (stampType === "watermark") {
        // Diagonal watermark repeats
        ctx.save();
        ctx.fillStyle = `rgba(128, 128, 128, ${opacity / 100})`;
        ctx.font = `bold ${fontSize}px Arial, sans-serif`;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        
        // Rotate and draw grid
        ctx.translate(w / 2, h / 2);
        ctx.rotate(-Math.PI / 6);
        ctx.translate(-w / 2, -h / 2);

        const stepX = Math.max(200, fontSize * 6);
        const stepY = Math.max(150, fontSize * 4);

        for (let x = -w; x < w * 2; x += stepX) {
          for (let y = -h; y < h * 2; y += stepY) {
            ctx.fillText(text, x, y);
          }
        }
        ctx.restore();

      } else {
        // Simple text overlay with alignment
        ctx.fillStyle = textColor;
        ctx.font = `${fontSize}px sans-serif`;
        ctx.textBaseline = "middle";

        let x = w / 2;
        let y = h / 2;
        const padding = fontSize;

        if (position.includes("left")) {
          ctx.textAlign = "left";
          x = padding;
        } else if (position.includes("right")) {
          ctx.textAlign = "right";
          x = w - padding;
        } else {
          ctx.textAlign = "center";
          x = w / 2;
        }

        if (position.includes("top")) {
          ctx.textBaseline = "top";
          y = padding;
        } else if (position.includes("bottom")) {
          ctx.textBaseline = "bottom";
          y = h - padding;
        } else {
          ctx.textBaseline = "middle";
          y = h / 2;
        }

        ctx.fillText(text, x, y);
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
  }, [file, originalSrc, stampType, name, dob, text, fontSize, textColor, opacity, position]);

  useEffect(() => {
    if (file) {
      const timer = setTimeout(() => {
        processImage();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [file, name, dob, text, fontSize, textColor, opacity, position, processImage]);

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
          {stampType === "name-dob" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="name-input" className="text-xs font-semibold block mb-1">Name</label>
                <input
                  id="name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-sm border rounded-lg px-3 py-1.5 focus:outline-none"
                  style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
                />
              </div>
              <div>
                <label htmlFor="dob-input" className="text-xs font-semibold block mb-1">Date of Birth</label>
                <input
                  id="dob-input"
                  type="text"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full text-sm border rounded-lg px-3 py-1.5 focus:outline-none"
                  style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
                />
              </div>
            </div>
          )}

          {stampType === "watermark" && (
            <div className="space-y-3">
              <div>
                <label htmlFor="watermark-input" className="text-xs font-semibold block mb-1">Watermark Text</label>
                <input
                  id="watermark-input"
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full text-sm border rounded-lg px-3 py-1.5 focus:outline-none"
                  style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Opacity</span>
                    <span>{opacity}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={opacity}
                    onChange={(e) => setOpacity(Number(e.target.value))}
                    className="w-full"
                    style={{ accentColor: "var(--color-accent)" }}
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Font Size</span>
                    <span>{fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="72"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full"
                    style={{ accentColor: "var(--color-accent)" }}
                  />
                </div>
              </div>
            </div>
          )}

          {stampType === "text" && (
            <div className="space-y-3">
              <div>
                <label htmlFor="text-overlay-input" className="text-xs font-semibold block mb-1">Text to Draw</label>
                <input
                  id="text-overlay-input"
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full text-sm border rounded-lg px-3 py-1.5 focus:outline-none"
                  style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label htmlFor="text-position-select" className="text-xs font-semibold block">Position</label>
                  <select
                    id="text-position-select"
                    value={position}
                    onChange={(e) => setPosition(e.target.value as TextPosition)}
                    className="w-full text-sm border rounded-lg px-2 py-1.5"
                    style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
                  >
                    <option value="top-left">Top Left</option>
                    <option value="top-center">Top Center</option>
                    <option value="top-right">Top Right</option>
                    <option value="center">Center</option>
                    <option value="bottom-left">Bottom Left</option>
                    <option value="bottom-center">Bottom Center</option>
                    <option value="bottom-right">Bottom Right</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label htmlFor="text-font-size-input" className="text-xs font-semibold block">Font Size ({fontSize}px)</label>
                  <input
                    id="text-font-size-input"
                    type="range"
                    min="12"
                    max="120"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full"
                    style={{ accentColor: "var(--color-accent)" }}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <label htmlFor="text-color-picker" className="text-xs font-semibold block">Color:</label>
                  <input
                    id="text-color-picker"
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-10 h-10 border rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {!file && <UploadZone tool={tool} onFile={handleFileChange} />}

      {processing && <ProcessingSpinner step="drawing text stamp" />}

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
