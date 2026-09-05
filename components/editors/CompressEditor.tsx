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
  compressToTargetKB,
  canvasToBlob,
  formatSize
} from "./shared";

interface Props {
  tool: Tool;
}

export default function CompressEditor({ tool }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [originalSrc, setOriginalSrc] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputSize, setOutputSize] = useState<number>(0);
  const [targetKB, setTargetKB] = useState<number>(tool.targetKB || tool.defaultKB || 50);
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const processImage = useCallback(async (imageFile: File, currentTarget: number) => {
    setError(null);
    setProcessing(true);
    try {
      const src = await readFile(imageFile);
      setOriginalSrc(src);
      setOriginalSize(imageFile.size);

      const img = await loadImage(src);
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);

      let blob: Blob;
      if (tool.group === "increase-compress") {
        // For increasing KB size, we re-encode with high quality and pad with extra bytes if needed
        const targetBytes = currentTarget * 1024;
        let q = 0.95;
        let tempBlob = await canvasToBlob(canvas, q);

        if (tempBlob.size < targetBytes) {
          // Add binary padding at the end of the JPEG file (safe for standard viewers)
          const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as ArrayBuffer);
            reader.onerror = reject;
            reader.readAsArrayBuffer(tempBlob);
          });
          const originalBytes = new Uint8Array(arrayBuffer);
          const neededPadding = targetBytes - originalBytes.length;
          
          if (neededPadding > 0) {
            const paddedBytes = new Uint8Array(originalBytes.length + neededPadding);
            paddedBytes.set(originalBytes);
            // Fill padding with dummy text or zero bytes (e.g. comment segment bytes or trailing zeroes)
            for (let i = originalBytes.length; i < paddedBytes.length; i++) {
              paddedBytes[i] = 0; // Simple trailing padding
            }
            blob = new Blob([paddedBytes], { type: "image/jpeg" });
          } else {
            blob = tempBlob;
          }
        } else {
          blob = tempBlob;
        }
      } else {
        // Regular compression
        blob = await compressToTargetKB(canvas, currentTarget);
      }

      setOutputBlob(blob);
      setOutputSize(blob.size);
    } catch (err) {
      console.error(err);
      setError("Processing failed. Please check your image format.");
    } finally {
      setProcessing(false);
    }
  }, [tool]);

  useEffect(() => {
    if (file) {
      const timer = setTimeout(() => {
        processImage(file, targetKB);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [file, targetKB, processImage]);

  const handleFileChange = (f: File) => {
    const validationError = validateImageFile(f);
    if (validationError) {
      setError(validationError);
      return;
    }
    setFile(f);
  };

  const handleReset = () => {
    setFile(null);
    setOriginalSrc(null);
    setOutputBlob(null);
    setError(null);
  };

  return (
    <div className="p-6 space-y-5">
      <div
        className="flex flex-wrap gap-4 p-4 rounded-xl border"
        style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
      >
        <div className="flex items-center gap-3">
          <label htmlFor="target-kb-input" className="t-caption font-semibold">
            {tool.group === "increase-compress" ? "Minimum Target KB:" : "Target KB Limit:"}
          </label>
          <input
            id="target-kb-input"
            type="number"
            value={targetKB}
            onChange={(e) => setTargetKB(Math.max(1, Number(e.target.value)))}
            min={1}
            max={5000}
            className="w-24 text-sm text-center border rounded-lg px-2 py-1.5 focus:outline-none"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-bg)",
              color: "var(--color-text)",
            }}
          />
        </div>
      </div>

      {tool.group === "increase-compress" && (
        <div
          className="p-3.5 rounded-lg text-xs leading-relaxed border"
          style={{
            backgroundColor: "#fffbeb",
            borderColor: "#fde68a",
            color: "#92400e",
          }}
        >
          <div className="flex items-start gap-2">
            <i className="fa-solid fa-triangle-exclamation text-amber-600 mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              <strong className="block mb-1 text-amber-900 font-bold">
                Important Portal Re-Encoding Warning:
              </strong>
              Many government exam portals (such as SSC, UPSC, and state PSCs) automatically re-compress uploaded images on their servers. If an image was artificially padded with dummy bytes to increase its KB footprint, server-side re-compression will strip those padding bytes, causing the file to shrink back below the portal&apos;s minimum KB threshold.
              <div className="mt-2 text-amber-950 font-medium">
                💡 <strong>Safe Alternative:</strong> To genuinely increase file size without rejection risk, upscale physical pixel dimensions using our{" "}
                <a href="/tool/resize-pixel" className="underline font-bold hover:text-amber-800">
                  Resize Image Pixel tool
                </a>{" "}
                or use a higher-resolution camera capture.
              </div>
            </div>
          </div>
        </div>
      )}

      {!file && <UploadZone tool={tool} onFile={handleFileChange} />}

      {processing && <ProcessingSpinner step="compressing" />}

      {error && <ErrorBanner message={error} />}

      {outputBlob && originalSrc && !processing && (
        <ResultPreview
          originalSrc={originalSrc}
          originalSize={originalSize}
          outputBlob={outputBlob}
          outputSize={outputSize}
          toolId={tool.id}
          targetKB={targetKB}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
