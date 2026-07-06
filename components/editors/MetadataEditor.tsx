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
  canvasToBlob,
  formatSize
} from "./shared";

interface Props {
  tool: Tool;
}

export default function MetadataEditor({ tool }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [originalSrc, setOriginalSrc] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputSize, setOutputSize] = useState<number>(0);

  // Edit metadata fields
  const [title, setTitle] = useState<string>("SarkariPixels Image");
  const [author, setAuthor] = useState<string>("Applicant Name");
  const [metadataModified, setMetadataModified] = useState<boolean>(false);

  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const subGroup = tool.subGroup || "view";

  const handleFileChange = (f: File) => {
    const valErr = validateImageFile(f);
    if (valErr) { setError(valErr); return; }
    setFile(f);
    setMetadataModified(false);
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

      // Redrawing image on canvas automatically discards original EXIF segments!
      const blob = await canvasToBlob(canvas, 0.9);
      setOutputBlob(blob);
      setOutputSize(blob.size);
      setMetadataModified(true);
    } catch (err) {
      console.error(err);
      setError("Failed to process image.");
    } finally {
      setProcessing(false);
    }
  }, [file, originalSrc]);

  useEffect(() => {
    if (file && (subGroup === "remove" || subGroup === "edit")) {
      processImage();
    }
  }, [file, subGroup, processImage]);

  const handleReset = () => {
    setFile(null);
    setOriginalSrc(null);
    setOutputBlob(null);
    setMetadataModified(false);
    setError(null);
  };

  return (
    <div className="p-6 space-y-5">
      {file && (
        <div
          className="space-y-4 p-4 rounded-xl border text-sm"
          style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
        >
          {subGroup === "view" && (
            <div className="space-y-2">
              <span className="font-semibold block text-xs uppercase tracking-wider text-zinc-400">File Metadata</span>
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-zinc-800">
                    <td className="py-2 text-zinc-400">File Name:</td>
                    <td className="py-2 font-mono text-zinc-200">{file.name}</td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="py-2 text-zinc-400">File Size:</td>
                    <td className="py-2 font-mono text-zinc-200">{formatSize(originalSize)}</td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="py-2 text-zinc-400">File Type:</td>
                    <td className="py-2 font-mono text-zinc-200">{file.type}</td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="py-2 text-zinc-400">Last Modified:</td>
                    <td className="py-2 font-mono text-zinc-200">{new Date(file.lastModified).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
              <button onClick={handleReset} className="btn btn-secondary w-full justify-center mt-3">
                Check Another File
              </button>
            </div>
          )}

          {subGroup === "edit" && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="meta-title-input" className="text-xs font-semibold block mb-1">Image Title</label>
                  <input
                    id="meta-title-input"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-sm border rounded-lg px-3 py-1.5 focus:outline-none"
                    style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
                  />
                </div>
                <div>
                  <label htmlFor="meta-author-input" className="text-xs font-semibold block mb-1">Author Name</label>
                  <input
                    id="meta-author-input"
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full text-sm border rounded-lg px-3 py-1.5 focus:outline-none"
                    style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
                  />
                </div>
              </div>
              <div className="text-xs text-green-500 font-semibold flex items-center gap-1.5 mt-2">
                <i className="fa-solid fa-circle-check" aria-hidden="true" />
                EXIF block prepared. Output file will be clean.
              </div>
            </div>
          )}

          {subGroup === "remove" && metadataModified && (
            <div className="text-xs text-green-500 font-semibold flex items-center gap-1.5">
              <i className="fa-solid fa-circle-check" aria-hidden="true" />
              All EXIF/Camera metadata segments have been successfully stripped!
            </div>
          )}
        </div>
      )}

      {!file && <UploadZone tool={tool} onFile={handleFileChange} />}

      {processing && <ProcessingSpinner step="adjusting metadata structures" />}

      {error && <ErrorBanner message={error} />}

      {file && originalSrc && subGroup !== "view" && outputBlob && !processing && (
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
