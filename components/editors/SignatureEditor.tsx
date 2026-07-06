"use client";

import { useState, useRef, useEffect } from "react";
import type { Tool } from "@/lib/tools-data";
import { canvasToBlob } from "./shared";

interface Props {
  tool: Tool;
}

export default function SignatureEditor({ tool }: Props) {
  const [tab, setTab] = useState<"type" | "draw">("type");
  
  // Type states
  const [name, setName] = useState<string>("Rahul Sharma");
  const [font, setFont] = useState<string>("Dancing Script");
  const [inkColor, setInkColor] = useState<string>("#1a237e");
  const [fontSize, setFontSize] = useState<number>(36);
  const [isTransparent, setIsTransparent] = useState<boolean>(false);

  // Draw states
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState<string>("#000000");
  const [brushWidth, setBrushWidth] = useState<number>(3);

  // Load custom cursive fonts in page head
  useEffect(() => {
    if (typeof document !== "undefined") {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Caveat&family=Dancing+Script&family=Great+Vibes&family=Pacifico&family=Satisfy&display=swap";
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, []);

  const handleClearDraw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  // Initialize drawing canvas background to white
  useEffect(() => {
    if (tab === "draw" && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [tab]);

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>): { x: number; y: number } => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const coord = getCanvasCoords(e);
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = brushColor;
    ctx.moveTo(coord.x, coord.y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const coord = getCanvasCoords(e);
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.lineTo(coord.x, coord.y);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleDownload = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 200;
    const ctx = canvas.getContext("2d")!;

    if (tab === "type") {
      if (!isTransparent) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 400, 200);
      }
      ctx.fillStyle = inkColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `${fontSize}px "${font}", cursive`;
      ctx.fillText(name, 200, 100);
    } else {
      // Draw tab: copy from the drawing canvas
      const drawCanvas = canvasRef.current!;
      ctx.drawImage(drawCanvas, 0, 0);
    }

    const mime = isTransparent ? "image/png" : "image/jpeg";
    const ext = isTransparent ? "png" : "jpg";
    const blob = await canvasToBlob(canvas, 0.95, mime);

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `signature_sarkaripixels.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-5">
      {/* Tabs */}
      <div className="flex rounded-lg p-1 bg-zinc-800" style={{ backgroundColor: "var(--color-surface)" }}>
        <button
          onClick={() => setTab("type")}
          className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${tab === "type" ? "bg-blue-600 text-white" : "text-zinc-400"}`}
        >
          Type Signature
        </button>
        <button
          onClick={() => setTab("draw")}
          className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${tab === "draw" ? "bg-blue-600 text-white" : "text-zinc-400"}`}
        >
          Draw Signature
        </button>
      </div>

      {tab === "type" && (
        <div
          className="space-y-4 p-4 rounded-xl border"
          style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
        >
          <div>
            <label htmlFor="signature-name-input" className="text-xs font-semibold block mb-1">Your Name</label>
            <input
              id="signature-name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-sm border rounded-lg px-3 py-1.5 focus:outline-none"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label htmlFor="signature-font-select" className="text-xs font-semibold block mb-1">Font Style</label>
              <select
                id="signature-font-select"
                value={font}
                onChange={(e) => setFont(e.target.value)}
                className="w-full text-sm border rounded-lg px-2 py-1.5"
                style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
              >
                <option value="Dancing Script">Dancing Script</option>
                <option value="Great Vibes">Great Vibes</option>
                <option value="Satisfy">Satisfy</option>
                <option value="Pacifico">Pacifico</option>
                <option value="Caveat">Caveat</option>
              </select>
            </div>
            <div>
              <label htmlFor="signature-font-size" className="text-xs font-semibold block mb-1">Font Size</label>
              <input
                id="signature-font-size"
                type="range"
                min="24"
                max="64"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full mt-2"
                style={{ accentColor: "var(--color-accent)" }}
              />
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="signature-color-picker" className="text-xs font-semibold">Ink Color:</label>
              <input
                id="signature-color-picker"
                type="color"
                value={inkColor}
                onChange={(e) => setInkColor(e.target.value)}
                className="w-10 h-10 border rounded cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="trans-bg-chk"
              checked={isTransparent}
              onChange={(e) => setIsTransparent(e.target.checked)}
              style={{ accentColor: "var(--color-accent)" }}
            />
            <label htmlFor="trans-bg-chk" className="t-caption font-semibold select-none">Transparent Background (PNG)</label>
          </div>

          {/* Type Preview Pad */}
          <div
            className="border-2 border-dashed rounded-lg p-6 text-center select-none flex items-center justify-center min-h-[140px]"
            style={{
              backgroundColor: isTransparent ? "transparent" : "#ffffff",
              color: inkColor,
              borderColor: "var(--color-border)",
              fontFamily: `"${font}", cursive`,
              fontSize: `${fontSize}px`,
            }}
          >
            {name || "Preview"}
          </div>
        </div>
      )}

      {tab === "draw" && (
        <div
          className="space-y-4 p-4 rounded-xl border"
          style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
        >
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label htmlFor="sig-brush-width" className="text-xs font-semibold">Width:</label>
                <input
                  id="sig-brush-width"
                  type="range"
                  min="1"
                  max="10"
                  value={brushWidth}
                  onChange={(e) => setBrushWidth(Number(e.target.value))}
                  className="w-24"
                  style={{ accentColor: "var(--color-accent)" }}
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="sig-brush-color" className="text-xs font-semibold">Color:</label>
                <input
                  id="sig-brush-color"
                  type="color"
                  value={brushColor}
                  onChange={(e) => setBrushColor(e.target.value)}
                  className="w-8 h-8 border rounded cursor-pointer"
                />
              </div>
            </div>
            <button onClick={handleClearDraw} className="btn btn-secondary py-1 text-xs">
              Clear Drawing
            </button>
          </div>

          {/* Draw Canvas */}
          <div className="flex justify-center bg-zinc-950 p-2 rounded-xl">
            <canvas
              ref={canvasRef}
              width={400}
              height={200}
              className="border bg-white cursor-crosshair rounded-lg"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
          </div>
        </div>
      )}

      <button onClick={handleDownload} className="btn btn-primary w-full justify-center">
        Download Signature
      </button>
    </div>
  );
}
