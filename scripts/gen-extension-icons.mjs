import { createCanvas } from "node:canvas";
import { writeFileSync } from "node:fs";

const sizes = [16, 48, 128];

for (const size of sizes) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // Blue background with rounded corners (approximate via fill)
  const r = size * 0.2;
  ctx.fillStyle = "#2563eb";
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.lineTo(size - r, 0);
  ctx.arcTo(size, 0, size, r, r);
  ctx.lineTo(size, size - r);
  ctx.arcTo(size, size, size - r, size, r);
  ctx.lineTo(r, size);
  ctx.arcTo(0, size, 0, size - r, r);
  ctx.lineTo(0, r);
  ctx.arcTo(0, 0, r, 0, r);
  ctx.closePath();
  ctx.fill();

  // White "S" letter
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${Math.round(size * 0.6)}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("S", size / 2, size / 2 + size * 0.03);

  const buf = canvas.toBuffer("image/png");
  writeFileSync(`extension/icons/icon-${size}.png`, buf);
  console.log(`icon-${size}.png written (${buf.length} bytes)`);
}
