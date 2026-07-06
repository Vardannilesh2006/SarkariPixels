"use client";

import { useState } from "react";
import type { Tool } from "@/lib/tools-data";
import {
  UploadZone,
  validateImageFile,
  readFile,
  formatSize,
  ErrorBanner
} from "./shared";

interface Props {
  tool: Tool;
}

export default function DpiCheckEditor({ tool }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [imgDetails, setImgDetails] = useState<{
    width: number;
    height: number;
    dpi: number;
    format: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (f: File) => {
    const valErr = validateImageFile(f);
    if (valErr) { setError(valErr); return; }
    setFile(f);
    setError(null);
    try {
      const src = await readFile(f);
      setImgSrc(src);

      // Parse DPI from file buffer directly
      const arrayBuffer = await f.arrayBuffer();
      const uint8 = new Uint8Array(arrayBuffer);
      const view = new DataView(arrayBuffer);
      let dpi = 72; // default screen fallback

      let offset = 0;
      while (offset < uint8.length - 10) {
        if (uint8[offset] === 0xff && uint8[offset + 1] === 0xe0) {
          if (
            uint8[offset + 4] === 0x4a && // J
            uint8[offset + 5] === 0x46 && // F
            uint8[offset + 6] === 0x49 && // I
            uint8[offset + 7] === 0x46 // F
          ) {
            const densityUnit = uint8[offset + 9]; // 1 = DPI, 2 = DPCM
            const xDensity = view.getUint16(offset + 10, false);
            if (densityUnit === 1) {
              dpi = xDensity;
            } else if (densityUnit === 2) {
              dpi = Math.round(xDensity * 2.54);
            }
            break;
          }
        }
        offset++;
      }

      // Load image to get width/height details
      const img = new Image();
      img.onload = () => {
        setImgDetails({
          width: img.naturalWidth,
          height: img.naturalHeight,
          dpi,
          format: f.type || "image/jpeg",
        });
      };
      img.src = src;
    } catch (err) {
      console.error(err);
      setError("Failed to inspect file.");
    }
  };

  const handleReset = () => {
    setFile(null);
    setImgSrc(null);
    setImgDetails(null);
    setError(null);
  };

  return (
    <div className="p-6 space-y-5">
      {file && imgDetails && (
        <div className="space-y-5">
          <div
            className="p-5 rounded-xl border text-sm space-y-3"
            style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
          >
            <span className="font-semibold block text-xs uppercase tracking-wider text-zinc-400">File Specification Analysis</span>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-zinc-400 block">Current DPI</span>
                <span className="text-xl font-bold text-green-500">{imgDetails.dpi} DPI</span>
              </div>
              <div>
                <span className="text-xs text-zinc-400 block">Dimensions</span>
                <span className="text-sm font-bold text-zinc-200">
                  {imgDetails.width} × {imgDetails.height} px
                  <span className="text-xs block font-normal text-zinc-400">
                    ({(imgDetails.width / imgDetails.dpi * 2.54).toFixed(1)} × {(imgDetails.height / imgDetails.dpi * 2.54).toFixed(1)} cm)
                  </span>
                </span>
              </div>
              <div>
                <span className="text-xs text-zinc-400 block">File Size</span>
                <span className="text-sm font-bold text-zinc-200">{formatSize(file.size)}</span>
              </div>
              <div>
                <span className="text-xs text-zinc-400 block">File Type</span>
                <span className="text-sm font-bold text-zinc-200 uppercase">{imgDetails.format.split("/")[1]}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800">
              <span className="text-xs text-zinc-400 block mb-1 font-semibold">Diagnostic Result</span>
              {imgDetails.dpi >= 300 ? (
                <div className="text-xs text-green-500 font-semibold flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-check" aria-hidden="true" />
                  Print specification standard (300+ DPI). Perfect for Indian Government Portals.
                </div>
              ) : (
                <div className="text-xs text-yellow-500 font-semibold flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-exclamation" aria-hidden="true" />
                  Low print resolution. Consider using Dpi Editor to upscale to 300 DPI.
                </div>
              )}
            </div>
          </div>

          <div className="border rounded-xl p-3 flex justify-center bg-zinc-950">
            <img src={imgSrc!} alt="Preview" className="max-h-56 object-contain rounded" />
          </div>

          <button onClick={handleReset} className="btn btn-secondary w-full justify-center">
            Verify Another File
          </button>
        </div>
      )}

      {!file && <UploadZone tool={tool} onFile={handleFileChange} />}

      {error && <ErrorBanner message={error} />}
    </div>
  );
}
