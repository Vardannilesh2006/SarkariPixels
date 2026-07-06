"use client";

import { useState, useEffect } from "react";
import type { Tool } from "@/lib/tools-data";
import { canvasToBlob } from "./shared";

interface Props {
  tool: Tool;
}

export default function AiFaceEditor({ tool }: Props) {
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);

  const handleGenerate = async () => {
    setProcessing(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 500;
      const ctx = canvas.getContext("2d")!;

      // 1. Draw solid background
      ctx.fillStyle = "#f4f4f5";
      ctx.fillRect(0, 0, 400, 500);

      // Random palette selection
      const skinTones = ["#ffdbac", "#f1c27d", "#e0ac69", "#c68642", "#8d5524"];
      const hairColors = ["#090806", "#2c1608", "#b55229", "#e4b869", "#7f7f7f"];
      const eyeColors = ["#2e536f", "#3d642d", "#1c1c1c", "#4a3728"];

      const skin = skinTones[Math.floor(Math.random() * skinTones.length)];
      const hair = hairColors[Math.floor(Math.random() * hairColors.length)];
      const eye = eyeColors[Math.floor(Math.random() * eyeColors.length)];

      // 2. Draw neck
      ctx.fillStyle = skin;
      ctx.fillRect(160, 280, 80, 100);
      ctx.fillStyle = "rgba(0,0,0,0.1)"; // shadow under chin
      ctx.fillRect(160, 280, 80, 20);

      // 3. Draw clothes (shoulders)
      ctx.fillStyle = `hsl(${Math.random() * 360}, 60%, 45%)`;
      ctx.beginPath();
      ctx.ellipse(200, 460, 160, 100, 0, 0, Math.PI, true);
      ctx.fill();

      // 4. Draw head oval
      ctx.fillStyle = skin;
      ctx.beginPath();
      ctx.ellipse(200, 220, 100, 120, 0, 0, 2 * Math.PI);
      ctx.fill();

      // 5. Draw ears
      ctx.fillStyle = skin;
      ctx.beginPath();
      ctx.arc(95, 220, 15, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(305, 220, 15, 0, 2 * Math.PI);
      ctx.fill();

      // 6. Draw Hair
      ctx.fillStyle = hair;
      const hairStyle = Math.floor(Math.random() * 3);
      if (hairStyle === 0) {
        // Short hair crop
        ctx.beginPath();
        ctx.arc(200, 180, 105, Math.PI, 2 * Math.PI);
        ctx.fill();
      } else if (hairStyle === 1) {
        // Fringe/bob
        ctx.beginPath();
        ctx.arc(200, 180, 105, Math.PI, 2 * Math.PI);
        ctx.fill();
        ctx.fillRect(95, 180, 210, 80);
      } else {
        // Spiky
        ctx.beginPath();
        ctx.arc(200, 180, 100, Math.PI, 2 * Math.PI);
        ctx.fill();
        for (let i = 110; i < 290; i += 20) {
          ctx.beginPath();
          ctx.moveTo(i, 110);
          ctx.lineTo(i + 10, 80);
          ctx.lineTo(i + 20, 110);
          ctx.fill();
        }
      }

      // 7. Draw eyes
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.ellipse(160, 210, 16, 10, 0, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(240, 210, 16, 10, 0, 0, 2 * Math.PI);
      ctx.fill();

      // Pupils
      ctx.fillStyle = eye;
      ctx.beginPath();
      ctx.arc(160, 210, 7, 0, 2 * Math.PI);
      ctx.arc(240, 210, 7, 0, 2 * Math.PI);
      ctx.fill();

      // Highlights
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(158, 208, 2, 0, 2 * Math.PI);
      ctx.arc(238, 208, 2, 0, 2 * Math.PI);
      ctx.fill();

      // 8. Eyebrows
      ctx.strokeStyle = hair;
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(160, 195, 20, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(240, 195, 20, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();

      // 9. Nose
      ctx.strokeStyle = "rgba(0,0,0,0.15)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(200, 205);
      ctx.lineTo(200, 245);
      ctx.lineTo(206, 245);
      ctx.stroke();

      // 10. Mouth
      ctx.strokeStyle = "#c64b4b";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.beginPath();
      const mouthY = 280;
      const expressions = ["smile", "neutral", "surprise"];
      const exp = expressions[Math.floor(Math.random() * expressions.length)];
      if (exp === "smile") {
        ctx.arc(200, mouthY - 10, 20, 0, Math.PI);
      } else if (exp === "surprise") {
        ctx.fillStyle = "#681e1e";
        ctx.beginPath();
        ctx.ellipse(200, mouthY, 10, 14, 0, 0, 2 * Math.PI);
        ctx.fill();
      } else {
        ctx.moveTo(185, mouthY);
        ctx.lineTo(215, mouthY);
        ctx.stroke();
      }

      // Add overlay signature watermark label
      ctx.fillStyle = "#a1a1aa";
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Generated Mock Face — SarkariPixels", 200, 490);

      const blob = await canvasToBlob(canvas, 0.95);
      const url = URL.createObjectURL(blob);
      
      setOutputBlob(blob);
      setOutputUrl(url);
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    handleGenerate();
  }, []);

  const handleDownload = () => {
    if (!outputBlob) return;
    const a = document.createElement("a");
    a.href = outputUrl!;
    a.download = "ai_face_sarkaripixels.jpg";
    a.click();
  };

  return (
    <div className="p-6 space-y-5 text-center">
      {processing && (
        <div className="py-12 t-caption font-semibold">Synthesizing procedural face vector tags…</div>
      )}

      {!processing && outputUrl && (
        <div className="space-y-4">
          <div className="flex justify-center border bg-zinc-950 p-2 rounded-xl">
            <img src={outputUrl} alt="AI face preview" className="max-h-[300px] object-contain rounded-lg" />
          </div>
          <div className="flex gap-3">
            <button onClick={handleDownload} className="btn btn-primary flex-1 justify-center">
              <i className="fa-solid fa-download" aria-hidden="true" /> Download Face
            </button>
            <button onClick={handleGenerate} className="btn btn-secondary">
              Regenerate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
