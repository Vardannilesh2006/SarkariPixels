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

export default function LogoOverlayEditor({ tool }: Props) {
  const [baseFile, setBaseFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  
  const [baseSrc, setBaseSrc] = useState<string | null>(null);
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [baseSize, setBaseSize] = useState<number>(0);

  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputSize, setOutputSize] = useState<number>(0);

  const [logoSizePercent, setLogoSizePercent] = useState<number>(20);
  const [opacity, setOpacity] = useState<number>(80);
  const [position, setPosition] = useState<string>("bottom-right");

  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleBaseFile = (f: File) => {
    const valErr = validateImageFile(f);
    if (valErr) { setError(valErr); return; }
    setBaseFile(f);
    readFile(f).then((src) => {
      setBaseSrc(src);
      setBaseSize(f.size);
    });
  };

  const handleLogoFile = (f: File) => {
    const valErr = validateImageFile(f);
    if (valErr) { setError(valErr); return; }
    setLogoFile(f);
    readFile(f).then((src) => setLogoSrc(src));
  };

  const processImage = useCallback(async () => {
    if (!baseFile || !logoFile || !baseSrc || !logoSrc) return;
    setError(null);
    setProcessing(true);
    try {
      const baseImg = await loadImage(baseSrc);
      const logoImg = await loadImage(logoSrc);

      const canvas = document.createElement("canvas");
      const w = baseImg.naturalWidth;
      const h = baseImg.naturalHeight;
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(baseImg, 0, 0);

      // Calculate logo size
      const targetLogoW = w * (logoSizePercent / 100);
      const targetLogoH = targetLogoW * (logoImg.naturalHeight / logoImg.naturalWidth);

      // Determine position coordinates
      let x = w - targetLogoW - 20;
      let y = h - targetLogoH - 20;
      const padding = 20;

      if (position.includes("left")) {
        x = padding;
      } else if (position.includes("right")) {
        x = w - targetLogoW - padding;
      } else {
        x = (w - targetLogoW) / 2;
      }

      if (position.includes("top")) {
        y = padding;
      } else if (position.includes("bottom")) {
        y = h - targetLogoH - padding;
      } else {
        y = (h - targetLogoH) / 2;
      }

      ctx.save();
      ctx.globalAlpha = opacity / 100;
      ctx.drawImage(logoImg, x, y, targetLogoW, targetLogoH);
      ctx.restore();

      const blob = await canvasToBlob(canvas, 0.85);
      setOutputBlob(blob);
      setOutputSize(blob.size);
    } catch (err) {
      console.error(err);
      setError("Overlay process failed.");
    } finally {
      setProcessing(false);
    }
  }, [baseFile, logoFile, baseSrc, logoSrc, logoSizePercent, opacity, position]);

  useEffect(() => {
    if (baseFile && logoFile) {
      const timer = setTimeout(() => {
        processImage();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [baseFile, logoFile, logoSizePercent, opacity, position, processImage]);

  const handleReset = () => {
    setBaseFile(null);
    setLogoFile(null);
    setBaseSrc(null);
    setLogoSrc(null);
    setOutputBlob(null);
    setError(null);
  };

  return (
    <div className="p-6 space-y-5">
      {baseFile && logoFile && (
        <div
          className="space-y-4 p-4 rounded-xl border"
          style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label htmlFor="logo-position-select" className="text-xs font-semibold block">Position</label>
              <select
                id="logo-position-select"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
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
              <div className="flex justify-between text-xs font-semibold">
                <span>Logo Size</span>
                <span>{logoSizePercent}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                value={logoSizePercent}
                onChange={(e) => setLogoSizePercent(Number(e.target.value))}
                className="w-full"
                style={{ accentColor: "var(--color-accent)" }}
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span>Opacity</span>
                <span>{opacity}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full"
                style={{ accentColor: "var(--color-accent)" }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {!baseFile && (
          <UploadZone tool={tool} onFile={handleBaseFile} label="1. Upload Base Image" />
        )}
        {baseFile && !logoFile && (
          <UploadZone tool={tool} onFile={handleLogoFile} label="2. Upload Logo Image" id="logo-file-input" />
        )}
      </div>

      {processing && <ProcessingSpinner step="compositing logo" />}

      {error && <ErrorBanner message={error} />}

      {outputBlob && baseSrc && !processing && (
        <ResultPreview
          originalSrc={baseSrc}
          originalSize={baseSize}
          outputBlob={outputBlob}
          outputSize={outputSize}
          toolId={tool.id}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
