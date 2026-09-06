const TOOLS = [
  { label: "Compress to 50KB", url: "https://www.sarkaripixels.online/tool/compress-50" },
  { label: "Compress to 100KB", url: "https://www.sarkaripixels.online/tool/compress-100" },
  { label: "SSC Photo Size", url: "https://www.sarkaripixels.online/tool/ssc-photo" },
  { label: "UPSC Photo Resize", url: "https://www.sarkaripixels.online/tool/upsc-photo-resize" },
  { label: "Signature Resize", url: "https://www.sarkaripixels.online/tool/resize-signature" },
  { label: "Passport Photo Maker", url: "https://www.sarkaripixels.online/tool/passport-maker" },
  { label: "Smart Resizer", url: "https://www.sarkaripixels.online/tool/smart-resizer" },
  { label: "DPI Converter", url: "https://www.sarkaripixels.online/tool/convert-dpi" },
];

const container = document.getElementById("links");
TOOLS.forEach(({ label, url }) => {
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.className = "tool-link";
  a.innerHTML = `<span>${label}</span><span class="arrow">→</span>`;
  container.appendChild(a);
});
