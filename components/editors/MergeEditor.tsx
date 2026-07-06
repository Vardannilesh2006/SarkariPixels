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

export default function MergeEditor({ tool }: Props) {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [sigFile, setSigFile] = useState<File | null>(null);

  const [photoSrc, setPhotoSrc] = useState<string | null>(null);
  const [sigSrc, setSigSrc] = useState<string | null>(null);
  const [photoSize, setPhotoSize] = useState<number>(0);

  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputSize, setOutputSize] = useState<number>(0);

  const [sigRatio, setSigRatio] = useState<number>(20); // sig is 20% of total height

  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePhotoFile = (f: File) => {
    const valErr = validateImageFile(f);
    if (valErr) { setError(valErr); return; }
    setPhotoFile(f);
    readFile(f).then((src) => {
      setPhotoSrc(src);
      setPhotoSize(f.size);
    });
  };

  const handleSigFile = (f: File) => {
    const valErr = validateImageFile(f);
    if (valErr) { setError(valErr); return; }
    setSigFile(f);
    readFile(f).then((src) => setSigSrc(src));
  };

  const processImage = useCallback(async () => {
    if (!photoFile || !sigFile || !photoSrc || !sigSrc) return;
    setError(null);
    setProcessing(true);
    try {
      const pImg = await loadImage(photoSrc);
      const sImg = await loadImage(sigSrc);

      const w = pImg.naturalWidth;
      const pHeight = pImg.naturalHeight;

      // Calculate total height: total = pHeight / (1 - sigRatioPercent)
      const sigRatioFrac = sigRatio / 100;
      const totalH = Math.floor(pHeight / (1 - sigRatioFrac));
      const sHeight = totalH - pHeight;

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = totalH;
      const ctx = canvas.getContext("2d")!;

      // Draw photo on top
      ctx.drawImage(pImg, 0, 0, w, pHeight);

      // Fill signature background band white
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, pHeight, w, sHeight);

      // Draw signature centered proportionally
      const targetSigH = sHeight * 0.9;
      const targetSigW = targetSigH * (sImg.naturalWidth / sImg.naturalHeight);
      
      const sigX = (w - targetSigW) / 2;
      const sigY = pHeight + (sHeight - targetSigH) / 2;

      ctx.drawImage(sImg, sigX, sigY, targetSigW, targetSigH);

      const blob = await canvasToBlob(canvas, 0.85);
      setOutputBlob(blob);
      setOutputSize(blob.size);
    } catch (err) {
      console.error(err);
      setError("Merging failed.");
    } finally {
      setProcessing(false);
    }
  }, [photoFile, sigFile, photoSrc, sigSrc, sigRatio]);

  useEffect(() => {
    if (photoFile && sigFile) {
      const timer = setTimeout(() => {
        processImage();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [photoFile, sigFile, sigRatio, processImage]);

  const handleReset = () => {
    setPhotoFile(null);
    setSigFile(null);
    setPhotoSrc(null);
    setSigSrc(null);
    setOutputBlob(null);
    setError(null);
  };

  return (
    <div className="p-6 space-y-5">
      {photoFile && sigFile && (
        <div
          className="space-y-2 p-4 rounded-xl border"
          style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
        >
          <div className="flex justify-between text-xs font-semibold">
            <span>Signature Band Ratio</span>
            <span>{sigRatio}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="35"
            value={sigRatio}
            onChange={(e) => setSigRatio(Number(e.target.value))}
            className="w-full"
            style={{ accentColor: "var(--color-accent)" }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {!photoSrc && (
          <UploadZone tool={tool} onFile={handlePhotoFile} label="1. Upload Photo Image" />
        )}
        {photoSrc && !sigSrc && (
          <UploadZone tool={tool} onFile={handleSigFile} label="2. Upload Signature Image" id="sig-file-input" />
        )}
      </div>

      {processing && <ProcessingSpinner step="merging files" />}

      {error && <ErrorBanner message={error} />}

      {outputBlob && photoSrc && !processing && (
        <ResultPreview
          originalSrc={photoSrc}
          originalSize={photoSize}
          outputBlob={outputBlob}
          outputSize={outputSize}
          toolId={tool.id}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
