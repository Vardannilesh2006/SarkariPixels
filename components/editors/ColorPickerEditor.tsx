"use client";

import { useState, useRef, useEffect } from "react";
import type { Tool } from "@/lib/tools-data";
import {
  UploadZone,
  validateImageFile,
  readFile,
  loadImage,
  ErrorBanner
} from "./shared";

interface Props {
  tool: Tool;
}

export default function ColorPickerEditor({ tool }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [originalSrc, setOriginalSrc] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [pickedColor, setPickedColor] = useState<{
    hex: string;
    rgb: string;
    hsl: string;
  } | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (f: File) => {
    const valErr = validateImageFile(f);
    if (valErr) { setError(valErr); return; }
    setFile(f);
    setPickedColor(null);
    readFile(f).then((src) => setOriginalSrc(src));
  };

  useEffect(() => {
    if (!originalSrc || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    loadImage(originalSrc).then((img) => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
    });
  }, [originalSrc]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    
    // Scale coords to match natural canvas width
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * canvas.width);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * canvas.height);

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];

    const hex = "#" + [r, g, b].map(x => {
      const hexStr = x.toString(16);
      return hexStr.length === 1 ? "0" + hexStr : hexStr;
    }).join("");

    const rgb = `rgb(${r}, ${g}, ${b})`;
    
    // Calculate HSL
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
        case gNorm: h = (bNorm - rNorm) / d + 2; break;
        case bNorm: h = (rNorm - gNorm) / d + 4; break;
      }
      h /= 6;
    }
    const hsl = `hsl(${Math.round(h * 360)}°, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;

    setPickedColor({ hex, rgb, hsl });
    setHistory((prev) => {
      const next = [hex, ...prev.filter(c => c !== hex)];
      return next.slice(0, 5);
    });
  };

  const handleReset = () => {
    setFile(null);
    setOriginalSrc(null);
    setPickedColor(null);
    setError(null);
  };

  return (
    <div className="p-6 space-y-5">
      {file && originalSrc && (
        <div className="space-y-4">
          <div className="t-caption font-semibold">Click or tap anywhere on the image to inspect pixel color codes</div>
          
          <div className="flex justify-center border bg-zinc-950 p-2 rounded-xl">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="max-h-[300px] object-contain cursor-crosshair max-w-full rounded-lg"
            />
          </div>

          {pickedColor && (
            <div
              className="p-4 rounded-xl border flex flex-col sm:flex-row gap-4 items-center"
              style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
            >
              <div
                className="w-16 h-16 rounded-xl border shadow-inner flex-shrink-0"
                style={{ backgroundColor: pickedColor.hex }}
              />
              <div className="flex-grow grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
                <div>
                  <span className="text-[10px] text-zinc-400 block uppercase font-semibold">HEX Code</span>
                  <span className="text-sm font-mono font-bold text-zinc-200">{pickedColor.hex.toUpperCase()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 block uppercase font-semibold">RGB Value</span>
                  <span className="text-sm font-mono font-bold text-zinc-200">{pickedColor.rgb}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 block uppercase font-semibold">HSL Value</span>
                  <span className="text-sm font-mono font-bold text-zinc-200">{pickedColor.hsl}</span>
                </div>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(pickedColor.hex)}
                className="btn btn-secondary py-1 text-xs px-3"
              >
                Copy HEX
              </button>
            </div>
          )}

          {history.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-zinc-400 block">Recent Picks</span>
              <div className="flex gap-2">
                {history.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setPickedColor({
                        hex: c,
                        rgb: "", // simplifications
                        hsl: ""
                      });
                    }}
                    className="w-8 h-8 rounded-lg border cursor-pointer hover:scale-105 transition-transform"
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ))}
              </div>
            </div>
          )}

          <button onClick={handleReset} className="btn btn-secondary w-full justify-center">
            Upload Another
          </button>
        </div>
      )}

      {!file && <UploadZone tool={tool} onFile={handleFileChange} />}

      {error && <ErrorBanner message={error} />}
    </div>
  );
}
