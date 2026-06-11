// --- MOCK EXAM SPECIFICATIONS DATABASE ---
const EXAM_SPECS_DB = {
  ssc: {
    name: "Staff Selection Commission (SSC)",
    photo: "3.5 cm x 4.5 cm | 20 KB to 50 KB | JPG Format",
    signature: "4.0 cm x 2.0 cm | 10 KB to 20 KB | JPG Format",
    generalRule: "White background. No caps, glasses or masks.",
    toolId: "ssc-photo"
  },
  upsc: {
    name: "Union Public Service Commission (UPSC)",
    photo: "350x350 px to 1000x1000 px | 20 KB to 300 KB | JPG Format",
    signature: "350x350 px to 1000x1000 px | 20 KB to 300 KB | JPG Format",
    generalRule: "White border at bottom with candidate name & date of photo stamp.",
    toolId: "upsc-photo-resize"
  },
  bpsc: {
    name: "Bihar Public Service Commission (BPSC)",
    photo: "250x327 px | Under 50 KB | JPG Format",
    signature: "100x250 px | Under 15 KB | black ink signature",
    generalRule: "Signature must be clear black ink on pure white background.",
    toolId: "ssc-photo"
  },
  bssc: {
    name: "Bihar Staff Selection Commission (BSSC)",
    photo: "3.5 cm x 4.5 cm | 20 KB to 50 KB | JPG Format",
    signature: "3.5 cm x 1.5 cm | 10 KB to 20 KB | JPG Format",
    generalRule: "Provide legible English and Hindi signature files.",
    toolId: "psc-photo"
  },
  pan: {
    name: "NSDL / UTI PAN Card Application",
    photo: "2.5 cm x 3.5 cm | 300 DPI | Under 50 KB | JPG Format",
    signature: "2.0 cm x 4.5 cm | 300 DPI | Under 50 KB | JPG Format",
    generalRule: "DPI density metadata must be locked exactly at 300.",
    toolId: "pan-card-resize"
  }
};

// --- 88 TOOLS COMPACT DECLARATION DATA ---
const TOOLS = [
  // 1. Most Used Tools (11)
  { id: "smart-resizer", category: "most-used", icon: "fa-up-right-and-down-left-from-center", title: "Smart Image Resizer", desc: "Resize photos and images online in pixels, inches, or mm. Instant results.", group: "universal-resize" },
  { id: "passport-maker", category: "most-used", icon: "fa-address-card", title: "Passport Photo Maker", desc: "Create printable multi-photo sheets.", group: "id-grid" },
  { id: "reduce-kb", category: "most-used", icon: "fa-compress-arrows-alt", title: "Reduce Image Size in KB", desc: "Compress image file footprint.", group: "compress", defaultKB: 50 },
  { id: "resize-pixel", category: "most-used", icon: "fa-up-right-and-down-left-from-center", title: "Resize Image Pixel", desc: "Scale dimensions in pixels.", group: "resize", defaultW: 800, defaultH: 600, unit: "px" },
  { id: "collage-maker", category: "most-used", icon: "fa-grip", title: "Photo Collage Maker", desc: "Combine photos into a collage grid.", group: "collage" },
  { id: "generate-signature", category: "most-used", icon: "fa-signature", title: "Generate Signature", desc: "Type/Draw digital signatures.", group: "signature" },
  { id: "increase-kb", category: "most-used", icon: "fa-expand-arrows-alt", title: "Increase Image Size In KB", desc: "Pads binary EXIF blocks with dummy bits.", group: "increase-compress" },
  { id: "photo-enhancer", category: "most-used", icon: "fa-wand-magic-sparkles", title: "AI Photo Enhancer", desc: "Adjust contrast and details.", group: "filter", filterType: "enhance" },
  { id: "resize-signature", category: "most-used", icon: "fa-pencil", title: "Resize Signature", desc: "Adjust signature sizes for forms.", group: "resize", defaultW: 400, defaultH: 200, unit: "px" },
  { id: "resize-cm", category: "most-used", icon: "fa-ruler", title: "Resize Image In Centimeter", desc: "Set size in centimeters.", group: "resize", defaultW: 3.5, defaultH: 4.5, unit: "cm" },
  { id: "resize-35-45", category: "most-used", icon: "fa-crop-simple", title: "Resize Image (3.5cm x 4.5cm)", desc: "Quick fit to 3.5 x 4.5 cm.", group: "resize", defaultW: 3.5, defaultH: 4.5, unit: "cm" },

  // 2. Basic Editing (18)
  { id: "blur-bg", category: "basic-edit", icon: "fa-image", title: "Blur Background", desc: "Soften details behind central portrait.", group: "filter", filterType: "blur-bg" },
  { id: "remove-bg", category: "basic-edit", icon: "fa-eraser", title: "Remove Background", desc: "Wipe paper shadows to white.", group: "filter", filterType: "remove-bg" },
  { id: "remove-object", category: "basic-edit", icon: "fa-brush", title: "Remove Object from Photo", desc: "Mask out details or ink stains.", group: "draw-mask" },
  { id: "add-name-dob", category: "basic-edit", icon: "fa-calendar-day", title: "Add Name & DOB on Photo", desc: "Overlay bottom strip with details.", group: "text-overlay", stampType: "name-dob" },
  { id: "rotate-image", category: "basic-edit", icon: "fa-rotate", title: "Rotate Image", desc: "Rotate orientation.", group: "rotate" },
  { id: "flip-image", category: "basic-edit", icon: "fa-arrows-left-right", title: "Flip Image", desc: "Mirror horizontal/vertical.", group: "flip" },
  { id: "watermark-image", category: "basic-edit", icon: "fa-copyright", title: "Watermark Images", desc: "Overlay copyright text.", group: "text-overlay", stampType: "watermark" },
  { id: "free-crop", category: "basic-edit", icon: "fa-crop", title: "Freehand Crop", desc: "Crop freely using boundaries.", group: "crop", aspect: NaN },
  { id: "circle-crop", category: "basic-edit", icon: "fa-circle-dot", title: "Circle Crop", desc: "Crop into clean circular form.", group: "crop", aspect: 1, cropStyle: "circle" },
  { id: "square-crop", category: "basic-edit", icon: "fa-square", title: "Square Crop", desc: "Crop to square aspect.", group: "crop", aspect: 1 },
  { id: "merge-photo-sig", category: "basic-edit", icon: "fa-grip-vertical", title: "Merge Photo & Signature", desc: "Combine photo/signature.", group: "merge" },
  { id: "join-images", category: "basic-edit", icon: "fa-object-group", title: "Join Multiple Images", desc: "Join multiple files together.", group: "join" },
  { id: "split-image", category: "basic-edit", icon: "fa-scissors", title: "Split Image", desc: "Split scans into halves.", group: "split" },
  { id: "color-picker", category: "basic-edit", icon: "fa-eye-dropper", title: "Image Color Picker", desc: "Extract pixel color code.", group: "color-picker" },
  { id: "edit-metadata", category: "basic-edit", icon: "fa-pen-to-square", title: "Edit Metadata", desc: "Set author and title headers.", group: "metadata", subGroup: "edit" },
  { id: "view-metadata", category: "basic-edit", icon: "fa-tags", title: "View Metadata", desc: "Show EXIF and DPI metadata.", group: "metadata", subGroup: "view" },
  { id: "remove-metadata", category: "basic-edit", icon: "fa-eye-slash", title: "Remove Metadata", desc: "Erase camera metadata tags.", group: "metadata", subGroup: "remove" },
  { id: "crop-png", category: "basic-edit", icon: "fa-file-image", title: "Crop PNG", desc: "Crop files with alpha transparency.", group: "crop", aspect: NaN, format: "image/png" },

  // 3. Blur, Pixlate and Special Effects (19)
  { id: "beautify", category: "effects", icon: "fa-face-smile", title: "Beautify Image", desc: "Smooth skin textures.", group: "filter", filterType: "beautify" },
  { id: "unblur", category: "effects", icon: "fa-compress", title: "Unblur Image", desc: "Sharpen text blur.", group: "filter", filterType: "sharpen" },
  { id: "blur-image", category: "effects", icon: "fa-circle-half-stroke", title: "Blur Image", desc: "Soften entire image pixels.", group: "filter", filterType: "blur" },
  { id: "blur-face", category: "effects", icon: "fa-ghost", title: "Blur Face", desc: "Mask center oval face.", group: "filter", filterType: "blur-face" },
  { id: "unblur-face", category: "effects", icon: "fa-face-viewfinder", title: "Unblur Face", desc: "Sharpen face region.", group: "filter", filterType: "unblur-face" },
  { id: "add-border", category: "effects", icon: "fa-border-all", title: "Add Border To Image", desc: "Paint solid border frame.", group: "draw-border", borderType: "normal" },
  { id: "pixelate", category: "effects", icon: "fa-table-cells", title: "Pixelate Image", desc: "Procedural pixel squares.", group: "filter", filterType: "pixelate" },
  { id: "pixelate-face", category: "effects", icon: "fa-qrcode", title: "Pixelate Face", desc: "Censor face with pixel blocks.", group: "filter", filterType: "pixelate-face" },
  { id: "censor-photo", category: "effects", icon: "fa-rectangle-ad", title: "Censor Photo", desc: "Censor zones with black bars.", group: "draw-mask", censorType: "black-bar" },
  { id: "motion-blur", category: "effects", icon: "fa-wind", title: "Motion Blur", desc: "Apply movement blur.", group: "filter", filterType: "motion-blur" },
  { id: "grayscale", category: "effects", icon: "fa-droplet-slash", title: "Grayscale Image", desc: "Remove color channels.", group: "filter", filterType: "grayscale" },
  { id: "black-white", category: "effects", icon: "fa-moon", title: "Black & White", desc: "High contrast binary threshold.", group: "filter", filterType: "threshold" },
  { id: "pixel-art", category: "effects", icon: "fa-gamepad", title: "Picture to Pixel Art", desc: "Convert photo to 8-bit style.", group: "filter", filterType: "pixel-art" },
  { id: "add-white-border", category: "effects", icon: "fa-square-plus", title: "Add White Border To Image", desc: "Overlay white borders.", group: "draw-border", borderType: "white" },
  { id: "ai-face", category: "effects", icon: "fa-robot", title: "AI Face Generator", desc: "Create random dummy face.", group: "ai-face" },
  { id: "blemish-remover", category: "effects", icon: "fa-circle-check", title: "Blemishes Remover", desc: "Clear spot blemishes.", group: "filter", filterType: "blemish" },
  { id: "retouch", category: "effects", icon: "fa-sparkles", title: "Retouch Image", desc: "Adjust lighting balance.", group: "filter", filterType: "retouch" },
  { id: "add-text", category: "effects", icon: "fa-t", title: "Add Text to Image", desc: "Write text overlays.", group: "text-overlay", stampType: "text" },
  { id: "add-logo", category: "effects", icon: "fa-file-shield", title: "Add Logo to Image", desc: "Draw logo overlays.", group: "logo-overlay" },

  // 4. DPI & Quality (4)
  { id: "increase-quality", category: "dpi-quality", icon: "fa-chart-line", title: "Increase Image Quality", desc: "Upscale resolution details.", group: "filter", filterType: "upscale" },
  { id: "convert-dpi", category: "dpi-quality", icon: "fa-print", title: "Convert DPI (200, 300, 600)", desc: "Modify DPI metadata resolution.", group: "dpi" },
  { id: "check-dpi", category: "dpi-quality", icon: "fa-info", title: "Check Image DPI", desc: "Verify current resolution tags.", group: "dpi-check" },
  { id: "super-res", category: "dpi-quality", icon: "fa-maximize", title: "Super Resolution", desc: "Upscale with sharp detailing.", group: "filter", filterType: "super-res" },

  // 5. Passport & ID Photo Sizes (9)
  { id: "pass-photo-sizes", category: "id-sizes", icon: "fa-address-card", title: "Passport Photo Maker", desc: "Grid sheets generator.", group: "id-grid" },
  { id: "resize-sign-6-2", category: "id-sizes", icon: "fa-signature", title: "Resize Sign 6cm x 2cm", desc: "Sign resizer (6x2cm at 300 DPI).", group: "resize", defaultW: 6, defaultH: 2, unit: "cm", dpi: 300 },
  { id: "resize-sign-35-45", category: "id-sizes", icon: "fa-crop-simple", title: "3.5cm x 4.5cm Signature", desc: "Resize signature to 3.5 x 4.5 cm.", group: "resize", defaultW: 3.5, defaultH: 4.5, unit: "cm" },
  { id: "resize-50-20", category: "id-sizes", icon: "fa-ruler-combined", title: "50mm x 20mm", desc: "Resize signature to 50x20 mm.", group: "resize", defaultW: 50, defaultH: 20, unit: "mm" },
  { id: "resize-35-45-mm", category: "id-sizes", icon: "fa-ruler-horizontal", title: "35mm x 45mm", desc: "Resize photo to 35x45 mm.", group: "resize", defaultW: 35, defaultH: 45, unit: "mm" },
  { id: "resize-2-2", category: "id-sizes", icon: "fa-id-badge", title: "2 x 2 Inch", desc: "Resize photo to 2x2 inches.", group: "resize", defaultW: 2, defaultH: 2, unit: "inch" },
  { id: "resize-3-4", category: "id-sizes", icon: "fa-rectangle-list", title: "3 x 4 Inch", desc: "Resize photo to 3x4 inches.", group: "resize", defaultW: 3, defaultH: 4, unit: "inch" },
  { id: "resize-4-6", category: "id-sizes", icon: "fa-images", title: "4 x 6 Inch", desc: "Resize photo to 4x6 inches.", group: "resize", defaultW: 4, defaultH: 6, unit: "inch" },
  { id: "resize-600-600", category: "id-sizes", icon: "fa-border-none", title: "600x600 Pixels", desc: "Scale photo to 600x600 px.", group: "resize", defaultW: 600, defaultH: 600, unit: "px" },

  // 6. General Compression (6)
  { id: "compress-general", category: "general-compress", icon: "fa-box-archive", title: "Image Compressor", desc: "Compress image sizes.", group: "compress", defaultKB: 50 },
  { id: "reduce-kb-general", category: "general-compress", icon: "fa-down-left-and-up-right-to-center", title: "Reduce Size in KB", desc: "Compress to custom KB bounds.", group: "compress", defaultKB: 20 },
  { id: "reduce-mb", category: "general-compress", icon: "fa-file-lines", title: "Reduce Size in MB", desc: "Compress MB down to target limits.", group: "compress", defaultKB: 1024 },
  { id: "jpg-to-kb", category: "general-compress", icon: "fa-arrow-down-short-wide", title: "JPG to KB", desc: "Fit JPG under custom limits.", group: "compress", defaultKB: 30 },
  { id: "convert-mb-to-kb", category: "general-compress", icon: "fa-calculator", title: "Convert MB to KB", desc: "Reduce MB files down to KB scale.", group: "compress", defaultKB: 100 },
  { id: "convert-kb-to-mb", category: "general-compress", icon: "fa-chart-pie", title: "Convert KB to MB", desc: "Pad files or upscale to MB bounds.", group: "compress", defaultKB: 2048 },

  // 7. Exact Target Sizes (16)
  { id: "compress-5", category: "target-sizes", icon: "fa-weight-hanging", title: "Compress to 5KB", desc: "Force file size under 5KB limit.", group: "compress", targetKB: 5 },
  { id: "compress-10", category: "target-sizes", icon: "fa-weight-hanging", title: "JPEG to 10KB", desc: "Force file size under 10KB limit.", group: "compress", targetKB: 10 },
  { id: "compress-15", category: "target-sizes", icon: "fa-weight-hanging", title: "Compress to 15KB", desc: "Force file size under 15KB limit.", group: "compress", targetKB: 15 },
  { id: "compress-20", category: "target-sizes", icon: "fa-weight-hanging", title: "Compress to 20KB", desc: "Force file size under 20KB limit.", group: "compress", targetKB: 20 },
  { id: "compress-20-50", category: "target-sizes", icon: "fa-weight-hanging", title: "Compress 20KB-50KB", desc: "Fits file size within 20-50KB.", group: "compress", targetKB: 35 },
  { id: "compress-25", category: "target-sizes", icon: "fa-weight-hanging", title: "JPEG to 25KB", desc: "Force file size under 25KB limit.", group: "compress", targetKB: 25 },
  { id: "compress-30", category: "target-sizes", icon: "fa-weight-hanging", title: "JPEG to 30KB", desc: "Force file size under 30KB limit.", group: "compress", targetKB: 30 },
  { id: "compress-40", category: "target-sizes", icon: "fa-weight-hanging", title: "JPEG to 40KB", desc: "Force file size under 40KB limit.", group: "compress", targetKB: 40 },
  { id: "compress-50", category: "target-sizes", icon: "fa-weight-hanging", title: "Compress to 50KB", desc: "Force file size under 50KB limit.", group: "compress", targetKB: 50 },
  { id: "compress-100", category: "target-sizes", icon: "fa-weight-hanging", title: "Compress to 100KB", desc: "Force file size under 100KB limit.", group: "compress", targetKB: 100 },
  { id: "compress-150", category: "target-sizes", icon: "fa-weight-hanging", title: "JPEG to 150KB", desc: "Force file size under 150KB limit.", group: "compress", targetKB: 150 },
  { id: "compress-200", category: "target-sizes", icon: "fa-weight-hanging", title: "Compress to 200KB", desc: "Force file size under 200KB limit.", group: "compress", targetKB: 200 },
  { id: "compress-300", category: "target-sizes", icon: "fa-weight-hanging", title: "JPEG to 300KB", desc: "Force file size under 300KB limit.", group: "compress", targetKB: 300 },
  { id: "compress-500", category: "target-sizes", icon: "fa-weight-hanging", title: "JPEG to 500KB", desc: "Force file size under 500KB limit.", group: "compress", targetKB: 500 },
  { id: "compress-1mb", category: "target-sizes", icon: "fa-weight-hanging", title: "Compress to 1MB", desc: "Force file size under 1MB limit.", group: "compress", targetKB: 1024 },
  { id: "compress-2mb", category: "target-sizes", icon: "fa-weight-hanging", title: "Compress to 2MB", desc: "Force file size under 2MB limit.", group: "compress", targetKB: 2048 },

  // 8. Resize Other Official Sizes (5)
  { id: "resize-a4", category: "official-sizes", icon: "fa-file-pdf", title: "A4 Size", desc: "Set size to standard A4 sheet dimensions.", group: "resize", defaultW: 21, defaultH: 29.7, unit: "cm" },
  { id: "ssc-photo", category: "official-sizes", icon: "fa-user-graduate", title: "SSC Photo Resize", desc: "Format photo to SSC specs (3.5x4.5cm).", group: "resize", defaultW: 3.5, defaultH: 4.5, unit: "cm", dpi: 300 },
  { id: "pan-card-resize", category: "official-sizes", icon: "fa-id-card-clip", title: "PAN Card", desc: "NSDL/UTI PAN size formatting.", group: "resize", defaultW: 2.5, defaultH: 3.5, unit: "cm", dpi: 300 },
  { id: "upsc-photo-resize", category: "official-sizes", icon: "fa-landmark", title: "UPSC Photo", desc: "Format photo to UPSC square specifications.", group: "resize", defaultW: 350, defaultH: 350, unit: "px", forceSquare: true },
  { id: "psc-photo", category: "official-sizes", icon: "fa-building-columns", title: "PSC Photo", desc: "Resize photo for state Public Service Commissions.", group: "resize", defaultW: 3.5, defaultH: 4.5, unit: "cm" }
];

// --- APPLICATION STATE ---
let currentCategory = "all";
let activeTool = null;
let uploadedFile = null;
let uploadedFileOriginalSize = 0;
let uploadedImageElement = null;
let cropperInstance = null;
let processedBlob = null;
let batchFiles = [];
let isDark = false;

// --- INTERACTIVE MOUSE GLOW ---
document.addEventListener('mousemove', (e) => {
  const glow = document.getElementById('bg-glow');
  if (glow) {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }
});

// --- SHARE APP ---
function shareApp() {
  if (navigator.share) {
    navigator.share({
      title: 'SarkariPixels - 100% Local Image Editor',
      text: 'Resize, crop, and compress photo/signatures completely in your browser offline!',
      url: window.location.href,
    }).catch(err => console.log(err));
  } else {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  }
}

// --- THEME SWITCHER ---
function toggleTheme() {
  isDark = !isDark;
  const html = document.documentElement;
  const themeIcon = document.getElementById('theme-icon');
  if (isDark) {
    html.classList.add('dark');
    themeIcon.className = "fa-solid fa-sun text-amber-500";
    document.body.style.background = "radial-gradient(circle at 10% 20%, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 1) 100%)";
    document.body.classList.add('text-slate-100');
    document.body.classList.remove('text-slate-800');
  } else {
    html.classList.remove('dark');
    themeIcon.className = "fa-solid fa-moon text-slate-500";
    document.body.style.background = "radial-gradient(circle at 10% 20%, rgba(15, 23, 42, 0.02) 0%, rgba(252, 231, 243, 0.25) 40%, rgba(255, 255, 255, 1) 100%)";
    document.body.classList.remove('text-slate-100');
    document.body.classList.add('text-slate-800');
  }
}

// --- ROUTER LOGIC ---
// --- CDN LIBRARIES MAP FOR LAZY LOADING ---
const CDN_LIBRARIES = {
  cropper: {
    js: "https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js",
    css: "https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css"
  },
  compression: {
    js: "https://cdn.jsdelivr.net/npm/browser-image-compression@2.0.2/dist/browser-image-compression.js"
  },
  piexif: {
    js: "https://cdn.jsdelivr.net/npm/piexifjs@1.0.6/piexif.js"
  },
  jszip: {
    js: "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"
  },
  heic: {
    js: "https://cdnjs.cloudflare.com/ajax/libs/heic2any/0.0.4/heic2any.min.js"
  }
};

const loadedLibraries = {};
function loadCDNLibrary(name) {
  if (loadedLibraries[name]) return loadedLibraries[name];
  
  loadedLibraries[name] = new Promise((resolve, reject) => {
    const lib = CDN_LIBRARIES[name];
    if (!lib) return reject(new Error("Unknown library: " + name));
    
    let cssPromise = Promise.resolve();
    if (lib.css) {
      cssPromise = new Promise((res, rej) => {
        if (document.querySelector(`link[href="${lib.css}"]`)) return res();
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = lib.css;
        link.onload = res;
        link.onerror = rej;
        document.head.appendChild(link);
      });
    }
    
    let jsPromise = new Promise((res, rej) => {
      if (document.querySelector(`script[src="${lib.js}"]`)) return res();
      const script = document.createElement('script');
      script.src = lib.js;
      script.onload = res;
      script.onerror = rej;
      document.head.appendChild(script);
    });
    
    Promise.all([cssPromise, jsPromise]).then(() => resolve()).catch(reject);
  });
  
  return loadedLibraries[name];
}

// --- DYNAMIC JSON-LD STRUCTURAL SCHEMA INJECTOR ---
function injectJsonLd(routeKey) {
  let schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SarkariPixels",
    "url": "https://formfit.app",
    "operatingSystem": "All",
    "applicationCategory": "Utility",
    "browserRequirements": "Requires JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };
  
  if (routeKey.startsWith('tool/')) {
    const toolId = routeKey.replace('tool/', '');
    const tool = TOOLS.find(t => t.id === toolId);
    if (tool) {
      schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": `${tool.title} - SarkariPixels`,
        "description": tool.desc,
        "url": `https://formfit.app/tool/${tool.id}`,
        "operatingSystem": "All",
        "applicationCategory": "Utility",
        "browserRequirements": "Requires JavaScript",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      };
    }
  }
  
  let script = document.getElementById('json-ld-schema');
  if (!script) {
    script = document.createElement('script');
    script.id = 'json-ld-schema';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema, null, 2);
}

// --- ROUTER LOGIC ---
function navigateTo(route) {
  const path = route === '' ? '/' : '/' + route;
  history.pushState(null, '', path);
  window.dispatchEvent(new Event('popstate'));
}

function handleRouting() {
  const path = window.location.pathname.substring(1);
  
  window.scrollTo(0, 0); // Snap viewport to top for SPA transitions
  
  cleanupCropper();
  uploadedFile = null;
  uploadedImageElement = null;
  processedBlob = null;
  batchFiles = [];
  document.getElementById('stats-original').innerText = "Original: - KB";
  document.getElementById('stats-output').innerText = "Output: - KB";
  document.getElementById('download-btn').disabled = true;
  document.getElementById('preview-image').src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23f8fafc'/><text x='50' y='55' font-family='sans-serif' font-size='10' fill='%2394a3b8' text-anchor='middle'>Ready to Preview</text></svg>";

  if (!path || path === '') {
    showHomeView();
    updateMeta('home');
  } else if (path.startsWith('tool/')) {
    const toolId = path.replace('tool/', '');
    const tool = TOOLS.find(t => t.id === toolId);
    if (tool) {
      showToolView(tool);
      updateMeta(`tool/${toolId}`);
    } else {
      navigateTo('');
      return;
    }
  } else if (path.startsWith('page/')) {
    const pageId = path.replace('page/', '');
    showLegalView(pageId);
    updateMeta(`page/${pageId}`);
  } else {
    navigateTo('');
    return;
  }
  
  injectJsonLd(path || 'home');
}

function updateMeta(routeKey) {
  let title = "SarkariPixels | Online Image Compressor, Resizer & Govt Exam Photo Editor";
  let desc = "Resize and compress photos or signatures for SSC, UPSC, BPSC, BSSC, and banking exams to exact KB & dimensions instantly. 100% free and client-side safe.";
  
  if (routeKey !== 'home') {
    if (routeKey.startsWith('tool/')) {
      const toolId = routeKey.replace('tool/', '');
      const tool = TOOLS.find(t => t.id === toolId);
      if (tool) {
        title = `${tool.title} - SarkariPixels Image Editor`;
        desc = `Use our 100% local ${tool.title} tool. ${tool.desc} Private, fast and web-compliant.`;
      }
    } else if (routeKey === 'page/privacy') {
      title = "Privacy Policy - SarkariPixels";
      desc = "SarkariPixels operates completely in your client browser. Zero server uploads.";
    } else if (routeKey === 'page/about') {
      title = "About Us & Terms - SarkariPixels";
      desc = "About SarkariPixels client-side canvas transformations and usage terms.";
    } else if (routeKey === 'page/sitemap') {
      title = "HTML Sitemap - SarkariPixels";
      desc = "Complete directory index of all 88 SarkariPixels tools and legal presets.";
    }
  }
  
  document.title = title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.content = desc;
  }
}

function showHomeView() {
  document.getElementById('hero-section').classList.remove('hidden');
  const viewHome = document.getElementById('view-home');
  viewHome.classList.remove('hidden', 'animate-slide-up');
  void viewHome.offsetWidth; // trigger reflow
  viewHome.classList.add('animate-slide-up');
  document.getElementById('view-tool').classList.add('hidden');
  document.getElementById('view-page').classList.add('hidden');
  
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active', 'text-indigo-600', 'bg-indigo-50/80');
    btn.classList.add('text-slate-600');
  });
  const activeDeskBtn = document.getElementById(`cat-${currentCategory}`);
  if (activeDeskBtn) {
    activeDeskBtn.classList.add('active', 'text-indigo-600', 'bg-indigo-50/80');
    activeDeskBtn.classList.remove('text-slate-600');
  }

  document.querySelectorAll('.category-btn-mob').forEach(btn => {
    btn.classList.remove('active', 'bg-indigo-50', 'border-indigo-200', 'text-indigo-700');
    btn.classList.add('bg-white', 'border-slate-200', 'text-slate-600');
  });
  const activeMobBtn = document.getElementById(`cat-${currentCategory}-mob`);
  if (activeMobBtn) {
    activeMobBtn.classList.add('active', 'bg-indigo-50', 'border-indigo-200', 'text-indigo-700');
    activeMobBtn.classList.remove('bg-white', 'border-slate-200', 'text-slate-600');
  }
  
  renderToolCards();
}

function renderToolCards(filterText = "") {
  const grid = document.getElementById('tools-grid');
  grid.innerHTML = "";
  
  let filtered = TOOLS;
  if (currentCategory !== "all") {
    filtered = filtered.filter(t => t.category === currentCategory);
  }
  
  if (filterText !== "") {
    const q = filterText.toLowerCase();
    filtered = filtered.filter(t => 
      t.title.toLowerCase().includes(q) || 
      t.desc.toLowerCase().includes(q)
    );
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-400 space-y-3 bg-white border border-dashed border-slate-200 rounded-2xl">
        <i class="fa-solid fa-face-frown text-4xl text-slate-300"></i>
        <p class="font-bold text-sm">No matching tools found. Try searching again.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(tool => {
    const card = document.createElement('div');
    card.className = "relative group cursor-pointer flex flex-col pt-3";
    card.onclick = () => navigateTo(`tool/${tool.id}`);
    
    card.innerHTML = `
      <div class="flex items-end">
        <span class="bg-white border-t border-l border-r border-slate-200 rounded-t-lg px-3 py-1 text-[9px] font-extrabold text-slate-400 uppercase tracking-widest translate-y-[1.5px] z-10 select-none">
          <i class="fa-solid ${tool.icon} mr-1 text-indigo-500"></i> ${tool.category.replace('-', ' ')}
        </span>
        <div class="flex-grow border-b border-slate-200 translate-y-[1.5px]"></div>
      </div>
      <div class="bg-white border border-slate-200 rounded-b-2xl rounded-tr-2xl p-5 shadow-sm group-hover:shadow-md group-hover:border-indigo-300 transition-all duration-300 transform group-hover:-translate-y-1 flex flex-col justify-between h-44">
        <div>
          <h3 class="font-extrabold text-slate-900 group-hover:text-indigo-600 transition-all text-base leading-tight">${tool.title}</h3>
          <p class="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">${tool.desc}</p>
        </div>
        <div class="flex items-center justify-between mt-4 border-t border-slate-50 pt-3 text-[11px] font-bold text-indigo-500 uppercase tracking-wider">
          <span>Launch Tool</span>
          <i class="fa-solid fa-chevron-right group-hover:translate-x-1 transition-transform"></i>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function selectCategory(category) {
  currentCategory = category;
  navigateTo('');
  showHomeView();
}

function handleSearch(val) {
  const statusDiv = document.getElementById('search-status');
  if (val.trim() !== "") {
    statusDiv.innerText = `Search results for: "${val}"`;
    statusDiv.classList.remove('hidden');
    currentCategory = "all";
    renderToolCards(val);
  } else {
    statusDiv.classList.add('hidden');
    renderToolCards();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
    const searchInput = document.getElementById('global-search');
    if (searchInput) {
      searchInput.value = "";
      handleSearch("");
    }
  }
});

function showToolView(tool) {
  activeTool = tool;
  document.getElementById('hero-section').classList.add('hidden');
  document.getElementById('view-home').classList.add('hidden');
  document.getElementById('view-page').classList.add('hidden');
  
  const toolView = document.getElementById('view-tool');
  toolView.classList.remove('hidden', 'animate-slide-up');
  void toolView.offsetWidth; // trigger reflow
  toolView.classList.add('animate-slide-up');
  
  document.getElementById('tool-view-title').innerText = tool.title;
  document.getElementById('tool-view-desc').innerText = tool.desc;
  document.getElementById('tool-view-icon').className = `fa-solid ${tool.icon}`;
  document.getElementById('tool-view-badge').innerText = tool.category.toUpperCase();
  document.getElementById('tool-guide-text').innerText = tool.desc;
  
  const fileContainer = document.getElementById('file-dropzone-container');
  const batchContainer = document.getElementById('batch-dropzone-container');
  if (tool.id === 'batch-resizer' || tool.id === 'batch-converter' || tool.id === 'lossless-optimizer' || tool.id === 'metadata-stripper') {
    fileContainer.classList.add('hidden');
    batchContainer.classList.remove('hidden');
  } else {
    fileContainer.classList.remove('hidden');
    batchContainer.classList.add('hidden');
  }
  
  renderToolControls(tool.id);
  
  const seoSection = document.getElementById('seo-landing-section');
  seoSection.innerHTML = `
    <div class="border-l-4 border-indigo-500 pl-4">
      <h2 class="text-xl font-extrabold text-slate-950 tracking-tight">${tool.title}</h2>
      <p class="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Help Documentation & Web Presets</p>
    </div>
    <div class="space-y-4 text-sm text-slate-600 leading-relaxed">
      <p>The ${tool.title} tool runs completely locally. Adjust parameters and download your parsed JPEG directly. Image data never reaches external servers.</p>
    </div>
  `;
  setupDrawMaskCanvas();
}

// --- DYNAMIC CONTROL PANEL RENDERER ---
function renderToolControls(toolId) {
  const panel = document.getElementById('tool-settings-panel');
  panel.innerHTML = "";
  
  const tool = TOOLS.find(t => t.id === toolId);
  if (!tool) return;
  
  let html = "";
  
  if (tool.group === 'compress') {
    const kbVal = tool.targetKB || tool.defaultKB || 50;
    html = `
      <div class="space-y-2">
        <label class="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Target Size (KB)</label>
        <div class="flex items-center gap-3">
          <input type="range" id="compress-kb-range" min="5" max="2048" value="${kbVal}" oninput="document.getElementById('compress-kb-num').value = this.value" class="flex-grow">
          <input type="number" id="compress-kb-num" min="5" max="2048" value="${kbVal}" oninput="document.getElementById('compress-kb-range').value = this.value" class="w-20 px-2 py-1 border border-slate-200 rounded-lg text-sm text-center">
        </div>
      </div>
    `;
  } else if (tool.group === 'increase-compress') {
    html = `
      <div class="space-y-2">
        <label class="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Target Minimum Size (KB)</label>
        <input type="number" id="increase-kb-val" value="100" min="20" max="5000" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none">
        <span class="text-[10px] text-slate-400 font-semibold block">Pads binary metadata structures to increase file weight without losing detail.</span>
      </div>
    `;
  } else if (tool.group === 'resize') {
    const unit = tool.unit || 'px';
    const wVal = tool.defaultW || 300;
    const hVal = tool.defaultH || 300;
    html = `
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <label class="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Width (${unit})</label>
          <input type="number" id="resize-w" value="${wVal}" step="any" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm">
        </div>
        <div class="space-y-2">
          <label class="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Height (${unit})</label>
          <input type="number" id="resize-h" value="${hVal}" step="any" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm">
        </div>
      </div>
      <div class="flex items-center gap-2 mt-2">
        <input type="checkbox" id="resize-lock" checked class="rounded">
        <label for="resize-lock" class="text-xs font-semibold text-slate-500">Lock Aspect Ratio</label>
      </div>
    `;
  } else if (tool.group === 'crop') {
    html = `
      <div class="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 text-xs text-indigo-900">
        Cropping box bounds mapped. Adjust handles in the preview viewport and hit process.
      </div>
    `;
  } else if (tool.group === 'filter') {
    let label = "Intensity";
    let min = 0, max = 100, val = 50;
    if (tool.filterType === 'blur' || tool.filterType === 'blur-bg' || tool.filterType === 'blur-face') {
      label = "Blur Radius (px)"; min = 0; max = 30; val = 8;
    } else if (tool.filterType === 'pixelate' || tool.filterType === 'pixel-art' || tool.filterType === 'pixelate-face') {
      label = "Block Size (px)"; min = 2; max = 50; val = 10;
    } else if (tool.filterType === 'sharpen') {
      label = "Sharpen Level"; min = 1; max = 5; val = 2;
    } else if (tool.filterType === 'threshold') {
      label = "B&W Threshold"; min = 50; max = 200; val = 128;
    } else if (tool.filterType === 'blemish') {
      label = "Soften Radius"; min = 1; max = 20; val = 5;
    }
    html = `
      <div class="space-y-2">
        <label class="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">${label}</label>
        <div class="flex items-center gap-3">
          <input type="range" id="filter-range" min="${min}" max="${max}" value="${val}" oninput="document.getElementById('filter-num').value = this.value" class="flex-grow">
          <input type="number" id="filter-num" min="${min}" max="${max}" value="${val}" oninput="document.getElementById('filter-range').value = this.value" class="w-16 px-2 py-1 border border-slate-200 rounded-lg text-sm text-center">
        </div>
      </div>
    `;
  } else if (tool.group === 'text-overlay') {
    if (tool.stampType === 'name-dob') {
      html = `
        <div class="space-y-2">
          <label class="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Candidate Name</label>
          <input type="text" id="stamp-name" value="RAHUL KUMAR" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm">
        </div>
        <div class="space-y-2">
          <label class="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Date / DOB</label>
          <input type="text" id="stamp-dob" value="${getTodayDateString()}" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm">
        </div>
      `;
    } else {
      html = `
        <div class="space-y-2">
          <label class="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Overlay Text</label>
          <input type="text" id="stamp-text" value="CONFIDENTIAL" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm">
        </div>
      `;
    }
  } else if (tool.group === 'draw-border') {
    html = `
      <div class="space-y-2">
        <label class="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Border Thickness (px)</label>
        <input type="number" id="border-thickness" value="10" min="1" max="100" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm">
      </div>
      <div class="space-y-2">
        <label class="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Border Color</label>
        <input type="color" id="border-color" value="#000000" class="w-full h-10 border border-slate-200 rounded-xl p-1 bg-white cursor-pointer">
      </div>
    `;
  } else if (tool.group === 'signature') {
    html = `
      <div class="space-y-3">
        <label class="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Signature Pad (Draw or Type)</label>
        <div class="border border-slate-200 rounded-xl bg-slate-50 p-2">
          <canvas id="sig-pad" class="border border-slate-200 rounded-lg bg-white cursor-crosshair w-full h-[120px] shadow-inner"></canvas>
          <div class="flex justify-between items-center mt-2">
            <span class="text-[10px] text-slate-400">Draw above with cursor/touch</span>
            <button type="button" onclick="clearSigPad()" class="px-2 py-0.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-[10px] font-bold transition-all">Clear</button>
          </div>
        </div>
        <div class="space-y-2">
          <label class="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Or Type Cursive Name</label>
          <input type="text" id="sig-type-name" placeholder="Type name to generate..." class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm">
        </div>
      </div>
    `;
  } else if (tool.group === 'collage' || tool.group === 'join') {
    html = `
      <div class="space-y-3">
        <label class="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Upload Secondary Images</label>
        <input type="file" id="secondary-files" multiple accept="image/*" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white">
        ${tool.group === 'join' ? `
        <div class="space-y-2 mt-2">
          <label class="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Join Direction</label>
          <select id="join-direction" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:outline-none">
            <option value="horizontal">Horizontal (Side-by-Side)</option>
            <option value="vertical">Vertical (Stacked)</option>
          </select>
        </div>
        ` : ''}
      </div>
    `;
  } else if (tool.group === 'merge') {
    html = `
      <div class="space-y-3">
        <label class="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Upload Signature Image</label>
        <input type="file" id="sig-merge-file" accept="image/*" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white">
        <select id="merge-layout" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:outline-none">
          <option value="vertical">Stacked (Photo on top, Sign below)</option>
          <option value="horizontal">Side-by-Side (Photo left, Sign right)</option>
        </select>
      </div>
    `;
  } else if (tool.group === 'split') {
    html = `
      <div class="space-y-2">
        <label class="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Split Direction</label>
        <select id="split-dir" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:outline-none">
          <option value="horizontal">Split Left/Right halves</option>
          <option value="vertical">Split Top/Bottom halves</option>
        </select>
      </div>
    `;
  } else if (tool.group === 'logo-overlay') {
    html = `
      <div class="space-y-3">
        <label class="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Upload Logo File</label>
        <input type="file" id="logo-file" accept="image/*" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white">
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-[10px] font-bold text-slate-400">Position</label>
            <select id="logo-pos" class="w-full px-2 py-1 border border-slate-200 rounded-lg text-xs bg-slate-50">
              <option value="top-left">Top Left</option>
              <option value="top-right">Top Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="bottom-right" selected>Bottom Right</option>
            </select>
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-400">Scale (%)</label>
            <input type="number" id="logo-scale" value="20" min="5" max="80" class="w-full px-2 py-1 border border-slate-200 rounded-lg text-xs">
          </div>
        </div>
      </div>
    `;
  } else if (tool.group === 'metadata') {
    if (tool.subGroup === 'edit') {
      html = `
        <div class="space-y-2">
          <label class="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Document Author</label>
          <input type="text" id="meta-author" value="SarkariPixels User" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm">
        </div>
        <div class="space-y-2">
          <label class="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Document Title</label>
          <input type="text" id="meta-title" value="Exam Document" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm">
        </div>
      `;
    } else if (tool.subGroup === 'view') {
      html = `
        <div class="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 text-xs text-indigo-900">
          Upload file. Click "Process Image" to retrieve metadata header info.
        </div>
      `;
    } else {
      html = `
        <div class="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900">
          Wipes camera metadata tags entirely upon saving.
        </div>
      `;
    }
  } else if (tool.group === 'dpi') {
    html = `
      <div class="space-y-2">
        <label class="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Select Target Resolution</label>
        <select id="target-dpi-val" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-slate-50">
          <option value="200">200 DPI (UPSC Signature)</option>
          <option value="300" selected>300 DPI (UPSC Photo/PAN)</option>
          <option value="600">600 DPI (High Res)</option>
        </select>
      </div>
    `;
  } else if (tool.group === 'dpi-check') {
    html = `
      <div class="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 text-xs text-indigo-900">
        Inspect density resolution values from image headers.
      </div>
    `;
  } else if (tool.group === 'id-grid') {
    html = `
      <div class="space-y-3">
        <div class="space-y-2">
          <label class="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Grid Count</label>
          <select id="pass-grid-size" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-slate-50">
            <option value="4">4 Photos</option>
            <option value="8" selected>8 Photos (Standard)</option>
            <option value="12">12 Photos</option>
          </select>
        </div>
        <div class="space-y-2">
          <label class="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Card Background</label>
          <select id="pass-bg" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-slate-50">
            <option value="white">White</option>
            <option value="blue">Blue</option>
          </select>
        </div>
      </div>
    `;
  } else if (tool.group === 'color-picker') {
    html = `
      <div class="space-y-3 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 text-xs text-indigo-900">
        <p><i class="fa-solid fa-eye-dropper text-indigo-600 mr-1"></i> Hover or click on the preview image to pick a pixel color.</p>
        <div class="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-slate-200 shadow-inner">
          <div id="picker-color-box" class="w-10 h-10 border border-slate-300 rounded-lg bg-white shadow-sm shrink-0"></div>
          <div class="flex-grow">
            <span id="picker-color-hex" class="font-black font-mono text-sm block text-slate-900">#FFFFFF</span>
            <span id="picker-color-rgb" class="font-semibold text-[10px] text-slate-400 block">rgb(255, 255, 255)</span>
          </div>
          <button type="button" onclick="copyPickedColor()" class="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-[10px] uppercase tracking-wide transition-all shadow-sm">Copy</button>
        </div>
      </div>
    `;
  } else if (tool.group === 'ai-face') {
    html = `
      <div class="space-y-2 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 text-xs text-indigo-900">
        Generates mock candidate portrait locally.
      </div>
    `;
  } else if (tool.group === 'draw-mask') {
    const isCensor = toolId === 'censor-photo';
    html = `
      <div class="space-y-4">
        <div class="space-y-2">
          <label class="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Brush Size</label>
          <div class="flex items-center gap-3">
            <input type="range" id="brush-size-range" min="2" max="50" value="15" oninput="document.getElementById('brush-size-num').value = this.value" class="flex-grow">
            <input type="number" id="brush-size-num" min="2" max="50" value="15" oninput="document.getElementById('brush-size-range').value = this.value" class="w-16 px-2 py-1 border border-slate-200 rounded-lg text-sm text-center">
          </div>
        </div>
        ${isCensor ? `
        <div class="space-y-2">
          <label class="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Censor Style</label>
          <select id="censor-style" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:outline-none">
            <option value="black">Solid Black Bar</option>
            <option value="pixelate">Pixelate Block</option>
            <option value="blur">Blur Oval/Box</option>
          </select>
        </div>
        ` : `
        <div class="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 text-xs text-indigo-900 leading-relaxed">
          <i class="fa-solid fa-paintbrush mr-1 text-indigo-500"></i> Brush over the object in the preview window above, then click <strong>Process Image</strong>.
        </div>
        `}
      </div>
    `;
  } else if (tool.group === 'universal-resize') {
    html = `
      <div class="space-y-4 animate-slide-up">
        <!-- Unit Tabs -->
        <div>
          <label class="block text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2">Select Unit</label>
          <div class="grid grid-cols-4 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button type="button" onclick="setUniversalUnit('px')" id="btn-unit-px" class="unit-tab-btn py-1.5 text-xs font-bold rounded-lg text-center bg-gradient-to-r from-indigo-600 to-pink-500 text-white shadow-sm transition-all">PX</button>
            <button type="button" onclick="setUniversalUnit('inch')" id="btn-unit-inch" class="unit-tab-btn py-1.5 text-xs font-bold rounded-lg text-center text-slate-500 hover:text-slate-700 transition-all">INCH</button>
            <button type="button" onclick="setUniversalUnit('cm')" id="btn-unit-cm" class="unit-tab-btn py-1.5 text-xs font-bold rounded-lg text-center text-slate-500 hover:text-slate-700 transition-all">CM</button>
            <button type="button" onclick="setUniversalUnit('mm')" id="btn-unit-mm" class="unit-tab-btn py-1.5 text-xs font-bold rounded-lg text-center text-slate-500 hover:text-slate-700 transition-all">MM</button>
          </div>
          <input type="hidden" id="universal-unit" value="px">
        </div>
        
        <!-- Dimensions Inputs -->
        <div class="grid grid-cols-2 gap-4">
          <div class="border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 rounded-xl p-3 bg-white transition-all relative">
            <label for="universal-w" class="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Width</label>
            <div class="flex items-center justify-between mt-1">
              <input type="number" id="universal-w" value="800" step="any" placeholder="Input width" class="w-full bg-transparent border-0 p-0 text-sm font-semibold text-slate-900 focus:ring-0 focus:outline-none placeholder-slate-400">
              <span id="unit-indicator-w" class="text-xs font-bold text-indigo-600 uppercase ml-2 select-none">PX</span>
            </div>
          </div>
          <div class="border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 rounded-xl p-3 bg-white transition-all relative">
            <label for="universal-h" class="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Height</label>
            <div class="flex items-center justify-between mt-1">
              <input type="number" id="universal-h" value="600" step="any" placeholder="Input height" class="w-full bg-transparent border-0 p-0 text-sm font-semibold text-slate-900 focus:ring-0 focus:outline-none placeholder-slate-400">
              <span id="unit-indicator-h" class="text-xs font-bold text-indigo-600 uppercase ml-2 select-none">PX</span>
            </div>
          </div>
        </div>
        
        <div class="flex items-center gap-2 mt-2">
          <input type="checkbox" id="universal-lock" checked class="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500">
          <label for="universal-lock" class="text-xs font-semibold text-slate-500 select-none">Lock Aspect Ratio</label>
        </div>
      </div>
    `;
  }
  
  panel.innerHTML = html;
  bindInputsAndDropzones();
  
  if (tool.group === 'signature') initSignaturePadEvents();
}

function bindInputsAndDropzones() {
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('tool-file-input');
  
  if (dropzone && fileInput) {
    dropzone.onclick = () => fileInput.click();
    fileInput.onchange = (e) => {
      if (e.target.files && e.target.files[0]) handleSingleUpload(e.target.files[0]);
    };
    dropzone.ondragover = (e) => {
      e.preventDefault();
      dropzone.classList.add('border-indigo-500', 'bg-indigo-50/10');
    };
    dropzone.ondragleave = () => dropzone.classList.remove('border-indigo-500', 'bg-indigo-50/10');
    dropzone.ondrop = (e) => {
      e.preventDefault();
      dropzone.classList.remove('border-indigo-500', 'bg-indigo-50/10');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) handleSingleUpload(e.dataTransfer.files[0]);
    };
  }

  const batchDropzone = document.getElementById('batch-dropzone');
  const batchFileInput = document.getElementById('batch-file-input');
  if (batchDropzone && batchFileInput) {
    batchDropzone.onclick = () => batchFileInput.click();
    batchFileInput.onchange = (e) => {
      if (e.target.files && e.target.files.length > 0) handleBatchUpload(e.target.files);
    };
  }
}

function handleSingleUpload(file) {
  cleanupCropper();
  document.getElementById('stats-original').innerText = `Original: ${Math.round(file.size / 1024)} KB`;
  uploadedFileOriginalSize = file.size;

  const nameLower = file.name.toLowerCase();
  if (nameLower.endsWith('.heic') || nameLower.endsWith('.heif')) {
    document.getElementById('loader-overlay').classList.remove('hidden');
    loadCDNLibrary('heic')
      .then(() => {
        heic2any({ blob: file, toType: 'image/jpeg' })
          .then(convertedBlob => {
            uploadedFile = new File([convertedBlob], "converted.jpg", { type: "image/jpeg" });
            loadImageToPreview(uploadedFile);
          })
          .catch(() => {
            alert("Conversion failed.");
            document.getElementById('loader-overlay').classList.add('hidden');
          });
      })
      .catch(err => {
        console.error("Failed to load heic2any library:", err);
        alert("Failed to load HEIC converter library.");
        document.getElementById('loader-overlay').classList.add('hidden');
      });
  } else {
    uploadedFile = file;
    loadImageToPreview(file);
  }
}

function handleBatchUpload(files) {
  batchFiles = Array.from(files).slice(0, 100);
  alert(`Loaded ${batchFiles.length} files. Click Process Image to compile.`);
  document.getElementById('stats-original').innerText = `Total files: ${batchFiles.length}`;
}

function loadImageToPreview(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const previewImg = document.getElementById('preview-image');
    previewImg.src = e.target.result;
    
    if (activeTool && activeTool.group === 'crop') {
      initCropper(e.target.result);
    } else {
      uploadedImageElement = new Image();
      uploadedImageElement.onload = () => {
        executeActiveTool(false);
        setupDrawMaskCanvas();
      };
      uploadedImageElement.src = e.target.result;
    }
    document.getElementById('download-btn').disabled = true;
    document.getElementById('loader-overlay').classList.add('hidden');
  };
  reader.readAsDataURL(file);
}

// --- SIGNATURE PAD DRAWER ---
let isDrawingSig = false;
let lastSigX = 0, lastSigY = 0;
function initSignaturePadEvents() {
  const canvas = document.getElementById('sig-pad');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  ctx.strokeStyle = '#0000ff';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  
  const getMousePos = (e) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height)
    };
  };
  
  const startDraw = (e) => {
    e.preventDefault();
    isDrawingSig = true;
    const pos = getMousePos(e);
    lastSigX = pos.x; lastSigY = pos.y;
  };
  
  const draw = (e) => {
    if (!isDrawingSig) return;
    e.preventDefault();
    const pos = getMousePos(e);
    ctx.beginPath();
    ctx.moveTo(lastSigX, lastSigY);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastSigX = pos.x; lastSigY = pos.y;
    debounceExecuteTool();
  };
  
  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', () => isDrawingSig = false);
  canvas.addEventListener('mouseleave', () => isDrawingSig = false);
  canvas.addEventListener('touchstart', startDraw, { passive: false });
  canvas.addEventListener('touchmove', draw, { passive: false });
  canvas.addEventListener('touchend', () => isDrawingSig = false);
  
  const typeInput = document.getElementById('sig-type-name');
  if (typeInput) {
    typeInput.addEventListener('input', () => debounceExecuteTool());
  }
}

function clearSigPad() {
  const canvas = document.getElementById('sig-pad');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    debounceExecuteTool();
  }
}

function initColorPickerEvents() {
  const previewImg = document.getElementById('preview-image');
  if (!previewImg) return;
  const handlePicker = (e) => {
    if (activeTool && activeTool.group === 'color-picker') {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = previewImg.naturalWidth || 300;
      canvas.height = previewImg.naturalHeight || 200;
      ctx.drawImage(previewImg, 0, 0);
      const rect = previewImg.getBoundingClientRect();
      const x = Math.floor(((e.clientX - rect.left) / rect.width) * canvas.width);
      const y = Math.floor(((e.clientY - rect.top) / rect.height) * canvas.height);
      try {
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const hex = "#" + ((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1).toUpperCase();
        document.getElementById('picker-color-box').style.backgroundColor = hex;
        document.getElementById('picker-color-hex').innerText = hex;
        document.getElementById('picker-color-rgb').innerText = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
      } catch(e) {}
    }
  };
  previewImg.addEventListener('mousemove', handlePicker);
  previewImg.addEventListener('click', handlePicker);
}

function initCropper(imageSrc) {
  document.getElementById('preview-image').classList.add('hidden');
  const cropperContainer = document.getElementById('cropper-container');
  const cropperTarget = document.getElementById('cropper-target');
  cropperTarget.src = imageSrc;
  cropperContainer.classList.remove('hidden');
  
  document.getElementById('loader-overlay').classList.remove('hidden');
  loadCDNLibrary('cropper')
    .then(() => {
      document.getElementById('loader-overlay').classList.add('hidden');
      if (cropperInstance) cropperInstance.destroy();
      setTimeout(() => {
        let aspect = NaN;
        if (activeTool && activeTool.aspect) aspect = activeTool.aspect;
        cropperInstance = new Cropper(cropperTarget, {
          aspectRatio: aspect,
          viewMode: 1,
          autoCropArea: 0.9,
          background: true
        });
      }, 50);
    })
    .catch(err => {
      console.error("Failed to load Cropper.js library:", err);
      alert("Failed to load Cropper editor library.");
      document.getElementById('loader-overlay').classList.add('hidden');
    });
}

function cleanupCropper() {
  if (cropperInstance) {
    cropperInstance.destroy();
    cropperInstance = null;
  }
  document.getElementById('cropper-container').classList.add('hidden');
  document.getElementById('preview-image').classList.remove('hidden');
}

// --- CENTRAL EXECUTION CORE ---
let debounceTimer = null;
function debounceExecuteTool() {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => executeActiveTool(false), 150);
}

async function executeActiveTool(isManual = false) {
  if (!activeTool) return;
  
  const libsToLoad = [];
  const grp = activeTool.group;
  
  if (activeTool.id === 'metadata-stripper') {
    libsToLoad.push('jszip', 'piexif');
  } else if (activeTool.id === 'batch-resizer' || activeTool.id === 'batch-converter' || activeTool.id === 'lossless-optimizer') {
    libsToLoad.push('jszip');
  } else if (grp === 'increase-compress' || grp === 'metadata' || grp === 'dpi' || grp === 'dpi-check' || grp === 'universal-resize') {
    libsToLoad.push('piexif');
  } else if (grp === 'resize' && activeTool.dpi) {
    libsToLoad.push('piexif');
  } else if (grp === 'crop') {
    libsToLoad.push('cropper');
  }
  
  if (libsToLoad.length > 0) {
    if (isManual) document.getElementById('loader-overlay').classList.remove('hidden');
    try {
      await Promise.all(libsToLoad.map(loadCDNLibrary));
    } catch (err) {
      console.error("Failed to load libraries: " + libsToLoad.join(', '), err);
      alert("Failed to load required editor libraries from CDN.");
      if (isManual) document.getElementById('loader-overlay').classList.add('hidden');
      return;
    }
  }

  if (activeTool.id === 'batch-resizer' || activeTool.id === 'batch-converter' || activeTool.id === 'lossless-optimizer' || activeTool.id === 'metadata-stripper') {
    if (batchFiles.length === 0) {
      if (isManual) alert("Please upload files first.");
      return;
    }
    processBatch();
    return;
  }

  if (!uploadedFile && activeTool.group !== 'signature' && activeTool.group !== 'ai-face') {
    if (isManual) alert("Please upload an image first.");
    return;
  }

  if (isManual) document.getElementById('loader-overlay').classList.remove('hidden');

  setTimeout(async () => {
    try {
      const grp = activeTool.group;
      if (grp === 'compress') {
        const target = activeTool.targetKB || parseInt(document.getElementById('compress-kb-num').value);
        await runCompress(target);
      } else if (grp === 'increase-compress') {
        const minVal = parseInt(document.getElementById('increase-kb-val').value);
        await runIncreaseCompress(minVal);
      } else if (grp === 'resize') {
        const w = parseFloat(document.getElementById('resize-w').value);
        const h = parseFloat(document.getElementById('resize-h').value);
        await runResize(w, h, activeTool.unit || 'px', activeTool.dpi || 72, activeTool.forceSquare || false);
      } else if (grp === 'universal-resize') {
        const unit = document.getElementById('universal-unit').value;
        const w = parseFloat(document.getElementById('universal-w').value);
        const h = parseFloat(document.getElementById('universal-h').value);
        await runResize(w, h, unit, 300, false);
      } else if (grp === 'crop') {
        await runImageCropper();
      } else if (grp === 'filter') {
        let intensity = 50;
        const range = document.getElementById('filter-range');
        if (range) intensity = parseInt(range.value);
        await runFilters(activeTool.filterType, intensity);
      } else if (grp === 'text-overlay') {
        await runTextOverlay();
      } else if (grp === 'draw-border') {
        await runDrawBorder();
      } else if (grp === 'signature') {
        await runSignatureEngine();
      } else if (grp === 'collage') {
        await runCollageEngine();
      } else if (grp === 'merge') {
        await runMergeEngine();
      } else if (grp === 'split') {
        await runSplitEngine();
      } else if (grp === 'logo-overlay') {
        await runLogoOverlay();
      } else if (grp === 'metadata') {
        await runMetadataEngine();
      } else if (grp === 'dpi') {
        await runDpiEngine();
      } else if (grp === 'dpi-check') {
        await runDpiCheckEngine();
      } else if (grp === 'id-grid') {
        await runPassportGenerator();
      } else if (grp === 'ai-face') {
        await runAiFaceGenerator();
      } else if (grp === 'rotate') {
        await applyRotation(90);
      } else if (grp === 'flip') {
        await applyFlip('h');
      } else if (grp === 'draw-mask') {
        await runDrawMaskEngine();
      } else if (grp === 'join') {
        await runJoinEngine();
      }
    } catch(e) {
      console.error(e);
      if (isManual) alert("Execution error occurred.");
    } finally {
      document.getElementById('loader-overlay').classList.add('hidden');
    }
  }, isManual ? 100 : 0);
}

// --- ENGINE ALGORITHMS ---
async function runCompress(targetKB) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = uploadedImageElement.naturalWidth;
  canvas.height = uploadedImageElement.naturalHeight;
  ctx.drawImage(uploadedImageElement, 0, 0);
  
  const res = await compressImageToKB(canvas, targetKB, 'image/jpeg');
  finalizeProcessedOutput(res.dataURI, res.sizeKB);
}

async function runIncreaseCompress(minKB) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = uploadedImageElement.naturalWidth;
  canvas.height = uploadedImageElement.naturalHeight;
  ctx.drawImage(uploadedImageElement, 0, 0);
  
  const baseURI = canvas.toDataURL('image/jpeg', 0.95);
  let exifObj = { "0th": {}, "Exif": {}, "GPS": {}, "1st": {}, "thumbnail": null };
  exifObj["0th"][piexif.ImageIFD.ImageDescription] = "x".repeat(minKB * 1024);
  const exifBytes = piexif.dump(exifObj);
  const finalURI = piexif.insert(exifBytes, baseURI);
  const blob = dataURIToBlob(finalURI);
  
  finalizeProcessedOutput(finalURI, Math.round(blob.size / 1024));
}

async function runResize(targetW, targetH, unit, dpi, forceSquare) {
  let wPx = targetW;
  let hPx = targetH;
  const scale = unit === 'cm' ? (dpi === 300 ? 118.11 : 37.79) : 
                unit === 'mm' ? (dpi === 300 ? 11.811 : 3.779) : 
                unit === 'inch' ? (dpi === 300 ? 300 : 96) : 1;
  wPx = Math.round(targetW * scale);
  hPx = Math.round(targetH * scale);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = wPx;
  canvas.height = hPx;
  
  if (forceSquare) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, wPx, hPx);
    const ratio = uploadedImageElement.naturalWidth / uploadedImageElement.naturalHeight;
    let dw = wPx, dh = hPx, dx = 0, dy = 0;
    if (ratio > 1) {
      dh = wPx / ratio; dy = (hPx - dh) / 2;
    } else {
      dw = hPx * ratio; dx = (wPx - dw) / 2;
    }
    ctx.drawImage(uploadedImageElement, dx, dy, dw, dh);
  } else {
    ctx.drawImage(uploadedImageElement, 0, 0, wPx, hPx);
  }
  
  let finalURI = canvas.toDataURL('image/jpeg', 0.9);
  if (dpi === 300) finalURI = changeDpiInExif(finalURI, 300);
  const blob = dataURIToBlob(finalURI);
  finalizeProcessedOutput(finalURI, Math.round(blob.size / 1024));
}

async function runFilters(filterType, intensity) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const w = uploadedImageElement.naturalWidth;
  const h = uploadedImageElement.naturalHeight;
  canvas.width = w;
  canvas.height = h;
  ctx.drawImage(uploadedImageElement, 0, 0);
  
  if (filterType === 'blur') {
    ctx.clearRect(0, 0, w, h);
    ctx.filter = `blur(${intensity/3}px)`;
    ctx.drawImage(uploadedImageElement, 0, 0);
  } else if (filterType === 'blur-bg') {
    ctx.clearRect(0, 0, w, h);
    ctx.filter = `blur(${intensity/3}px)`;
    ctx.drawImage(uploadedImageElement, 0, 0);
    ctx.filter = 'none';
    ctx.save();
    ctx.beginPath();
    ctx.arc(w/2, h/2 - 20, Math.min(w,h)*0.3, 0, Math.PI*2);
    ctx.clip();
    ctx.drawImage(uploadedImageElement, 0, 0);
    ctx.restore();
  } else if (filterType === 'blur-face') {
    ctx.save();
    ctx.beginPath();
    ctx.arc(w/2, h/2 - 20, Math.min(w,h)*0.25, 0, Math.PI*2);
    ctx.clip();
    ctx.filter = `blur(${intensity/3}px)`;
    ctx.drawImage(uploadedImageElement, 0, 0);
    ctx.restore();
  } else if (filterType === 'pixelate') {
    ctx.clearRect(0, 0, w, h);
    const size = Math.max(1, intensity / 2);
    const tempC = document.createElement('canvas');
    tempC.width = w / size; tempC.height = h / size;
    const tempCtx = tempC.getContext('2d');
    tempCtx.imageSmoothingEnabled = false;
    tempCtx.drawImage(uploadedImageElement, 0, 0, tempC.width, tempC.height);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tempC, 0, 0, tempC.width, tempC.height, 0, 0, w, h);
  } else if (filterType === 'pixelate-face') {
    const size = Math.max(1, intensity / 2);
    const tempC = document.createElement('canvas');
    tempC.width = w / size; tempC.height = h / size;
    const tempCtx = tempC.getContext('2d');
    tempCtx.imageSmoothingEnabled = false;
    tempCtx.drawImage(uploadedImageElement, 0, 0, tempC.width, tempC.height);
    ctx.save();
    ctx.beginPath();
    ctx.arc(w/2, h/2 - 20, Math.min(w,h)*0.25, 0, Math.PI*2);
    ctx.clip();
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tempC, 0, 0, tempC.width, tempC.height, 0, 0, w, h);
    ctx.restore();
  } else if (filterType === 'grayscale') {
    ctx.clearRect(0, 0, w, h);
    ctx.filter = 'grayscale(100%)';
    ctx.drawImage(uploadedImageElement, 0, 0);
  } else if (filterType === 'threshold') {
    ctx.clearRect(0, 0, w, h);
    ctx.filter = 'grayscale(100%) contrast(300%)';
    ctx.drawImage(uploadedImageElement, 0, 0);
  } else if (filterType === 'pixel-art') {
    ctx.clearRect(0, 0, w, h);
    const size = Math.max(8, intensity/2);
    const tempC = document.createElement('canvas');
    tempC.width = w / size; tempC.height = h / size;
    const tempCtx = tempC.getContext('2d');
    tempCtx.imageSmoothingEnabled = false;
    tempCtx.drawImage(uploadedImageElement, 0, 0, tempC.width, tempC.height);
    const imgData = tempCtx.getImageData(0, 0, tempC.width, tempC.height);
    const d = imgData.data;
    for (let i = 0; i < d.length; i += 4) {
      d[i] = Math.round(d[i]/64)*64;
      d[i+1] = Math.round(d[i+1]/64)*64;
      d[i+2] = Math.round(d[i+2]/64)*64;
    }
    tempCtx.putImageData(imgData, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tempC, 0, 0, tempC.width, tempC.height, 0, 0, w, h);
  } else if (filterType === 'enhance' || filterType === 'beautify' || filterType === 'retouch') {
    ctx.clearRect(0, 0, w, h);
    const factor = 100 + (intensity - 50) * 0.4;
    ctx.filter = `saturate(${factor}%) contrast(${factor}%) brightness(${100 + (intensity - 50)*0.1}%)`;
    ctx.drawImage(uploadedImageElement, 0, 0);
  } else if (filterType === 'remove-bg') {
    const imgData = ctx.getImageData(0, 0, w, h);
    const d = imgData.data;
    const tr = d[0], tg = d[1], tb = d[2];
    for (let i = 0; i < d.length; i += 4) {
      const diff = Math.sqrt(Math.pow(d[i]-tr, 2) + Math.pow(d[i+1]-tg, 2) + Math.pow(d[i+2]-tb, 2));
      if (diff < intensity) d[i+3] = 0;
    }
    ctx.putImageData(imgData, 0, 0);
  } else if (filterType === 'sharpen') {
    const lvl = intensity / 25;
    const sharpenKernel = [
       0, -lvl,  0,
      -lvl,  1 + 4*lvl, -lvl,
       0, -lvl,  0
    ];
    applyConvolutionFilter(canvas, sharpenKernel);
  } else if (filterType === 'unblur-face') {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = w; tempCanvas.height = h;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(canvas, 0, 0);
    const sharpenKernel = [
       0, -1.5,  0,
      -1.5,  7.0, -1.5,
       0, -1.5,  0
    ];
    applyConvolutionFilter(tempCanvas, sharpenKernel);
    ctx.save();
    ctx.beginPath();
    ctx.arc(w/2, h/2 - 20, Math.min(w,h)*0.25, 0, Math.PI*2);
    ctx.clip();
    ctx.drawImage(tempCanvas, 0, 0);
    ctx.restore();
  } else if (filterType === 'motion-blur') {
    const radius = Math.max(1, Math.round(intensity / 4));
    const imgData = ctx.getImageData(0, 0, w, h);
    const src = imgData.data;
    const output = ctx.createImageData(w, h);
    const dst = output.data;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let rSum = 0, gSum = 0, bSum = 0, count = 0;
        for (let dx = -radius; dx <= radius; dx++) {
          const nx = x + dx;
          if (nx >= 0 && nx < w) {
            const idx = (y * w + nx) * 4;
            rSum += src[idx];
            gSum += src[idx + 1];
            bSum += src[idx + 2];
            count++;
          }
        }
        const dstIdx = (y * w + x) * 4;
        dst[dstIdx] = Math.round(rSum / count);
        dst[dstIdx + 1] = Math.round(gSum / count);
        dst[dstIdx + 2] = Math.round(bSum / count);
        dst[dstIdx + 3] = src[dstIdx + 3];
      }
    }
    ctx.putImageData(output, 0, 0);
  } else if (filterType === 'upscale' || filterType === 'super-res') {
    const scaleFactor = 2;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = w * scaleFactor;
    tempCanvas.height = h * scaleFactor;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.imageSmoothingEnabled = true;
    tempCtx.imageSmoothingQuality = 'high';
    tempCtx.drawImage(canvas, 0, 0, w, h, 0, 0, w * scaleFactor, h * scaleFactor);
    const sharpenKernel = [
       0, -0.5,  0,
      -0.5,  3.0, -0.5,
       0, -0.5,  0
    ];
    applyConvolutionFilter(tempCanvas, sharpenKernel);
    canvas.width = w * scaleFactor;
    canvas.height = h * scaleFactor;
    ctx.drawImage(tempCanvas, 0, 0);
  }
  
  const finalURI = canvas.toDataURL(activeTool.format || 'image/jpeg', 0.9);
  const blob = dataURIToBlob(finalURI);
  finalizeProcessedOutput(finalURI, Math.round(blob.size / 1024));
}

async function runTextOverlay() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const w = uploadedImageElement.naturalWidth;
  const h = uploadedImageElement.naturalHeight;
  canvas.width = w; canvas.height = h;
  ctx.drawImage(uploadedImageElement, 0, 0);
  
  ctx.textAlign = 'center';
  if (activeTool.stampType === 'name-dob') {
    const name = document.getElementById('stamp-name').value.toUpperCase();
    const dob = document.getElementById('stamp-dob').value;
    const bandH = Math.round(h * 0.16);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, h - bandH, w, bandH);
    ctx.fillStyle = '#000000';
    ctx.font = `bold ${Math.round(bandH * 0.35)}px 'Outfit'`;
    ctx.fillText(name, w / 2, h - (bandH * 0.55));
    ctx.font = `500 ${Math.round(bandH * 0.28)}px 'Outfit'`;
    ctx.fillText(dob, w / 2, h - (bandH * 0.2));
  } else {
    const txt = document.getElementById('stamp-text') ? document.getElementById('stamp-text').value : 'WATERMARK';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = `bold ${Math.round(w * 0.07)}px 'Outfit'`;
    ctx.save();
    ctx.translate(w/2, h/2);
    ctx.rotate(-Math.PI / 6);
    ctx.fillText(txt, 0, 0);
    ctx.restore();
  }
  const finalURI = canvas.toDataURL('image/jpeg', 0.9);
  finalizeProcessedOutput(finalURI, Math.round(dataURIToBlob(finalURI).size / 1024));
}

async function runDrawBorder() {
  const thickness = parseInt(document.getElementById('border-thickness').value);
  const color = document.getElementById('border-color').value;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const w = uploadedImageElement.naturalWidth;
  const h = uploadedImageElement.naturalHeight;
  canvas.width = w; canvas.height = h;
  ctx.drawImage(uploadedImageElement, 0, 0);
  ctx.strokeStyle = activeTool.borderType === 'white' ? '#ffffff' : color;
  ctx.lineWidth = thickness * 2;
  ctx.strokeRect(0, 0, w, h);
  const finalURI = canvas.toDataURL('image/jpeg', 0.9);
  finalizeProcessedOutput(finalURI, Math.round(dataURIToBlob(finalURI).size / 1024));
}

async function runSignatureEngine() {
  const canvas = document.createElement('canvas');
  canvas.width = 600; canvas.height = 300;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 600, 300);
  
  const typeVal = document.getElementById('sig-type-name').value;
  if (typeVal.trim() !== '') {
    ctx.fillStyle = '#0000ff';
    ctx.font = "italic bold 44px 'Georgia', serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(typeVal, 300, 150);
  } else {
    const pad = document.getElementById('sig-pad');
    if (pad) ctx.drawImage(pad, 0, 0, 600, 300);
  }
  const finalURI = canvas.toDataURL('image/jpeg', 0.9);
  finalizeProcessedOutput(finalURI, Math.round(dataURIToBlob(finalURI).size / 1024));
}

async function runCollageEngine() {
  const filesInput = document.getElementById('secondary-files');
  const canvas = document.createElement('canvas');
  canvas.width = 800; canvas.height = 600;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 800, 600);
  ctx.drawImage(uploadedImageElement, 0, 0, 400, 600);

  if (filesInput.files && filesInput.files[0]) {
    const secImg = new Image();
    secImg.onload = () => {
      ctx.drawImage(secImg, 400, 0, 400, 600);
      const finalURI = canvas.toDataURL('image/jpeg', 0.9);
      finalizeProcessedOutput(finalURI, Math.round(dataURIToBlob(finalURI).size / 1024));
    };
    secImg.src = URL.createObjectURL(filesInput.files[0]);
  } else {
    const finalURI = canvas.toDataURL('image/jpeg', 0.9);
    finalizeProcessedOutput(finalURI, Math.round(dataURIToBlob(finalURI).size / 1024));
  }
}

async function runMergeEngine() {
  const filesInput = document.getElementById('sig-merge-file');
  const layout = document.getElementById('merge-layout').value;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (layout === 'vertical') {
    canvas.width = 400; canvas.height = 600;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, 400, 600);
    ctx.drawImage(uploadedImageElement, 0, 0, 400, 400);
  } else {
    canvas.width = 800; canvas.height = 400;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, 800, 400);
    ctx.drawImage(uploadedImageElement, 0, 0, 400, 400);
  }

  if (filesInput.files && filesInput.files[0]) {
    const secImg = new Image();
    secImg.onload = () => {
      if (layout === 'vertical') ctx.drawImage(secImg, 0, 400, 400, 200);
      else ctx.drawImage(secImg, 400, 100, 400, 200);
      const finalURI = canvas.toDataURL('image/jpeg', 0.9);
      finalizeProcessedOutput(finalURI, Math.round(dataURIToBlob(finalURI).size / 1024));
    };
    secImg.src = URL.createObjectURL(filesInput.files[0]);
  } else {
    const finalURI = canvas.toDataURL('image/jpeg', 0.9);
    finalizeProcessedOutput(finalURI, Math.round(dataURIToBlob(finalURI).size / 1024));
  }
}

async function runSplitEngine() {
  const dir = document.getElementById('split-dir').value;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const w = uploadedImageElement.naturalWidth;
  const h = uploadedImageElement.naturalHeight;
  
  if (dir === 'horizontal') {
    canvas.width = Math.round(w / 2); canvas.height = h;
    ctx.drawImage(uploadedImageElement, 0, 0, w/2, h, 0, 0, w/2, h);
  } else {
    canvas.width = w; canvas.height = Math.round(h / 2);
    ctx.drawImage(uploadedImageElement, 0, 0, w, h/2, 0, 0, w, h/2);
  }
  const finalURI = canvas.toDataURL('image/jpeg', 0.9);
  finalizeProcessedOutput(finalURI, Math.round(dataURIToBlob(finalURI).size / 1024));
}

async function runLogoOverlay() {
  const logoInput = document.getElementById('logo-file');
  const pos = document.getElementById('logo-pos').value;
  const scale = parseInt(document.getElementById('logo-scale').value) / 100;
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const w = uploadedImageElement.naturalWidth;
  const h = uploadedImageElement.naturalHeight;
  canvas.width = w; canvas.height = h;
  ctx.drawImage(uploadedImageElement, 0, 0);

  if (logoInput.files && logoInput.files[0]) {
    const logoImg = new Image();
    logoImg.onload = () => {
      const lw = w * scale;
      const lh = (logoImg.naturalHeight / logoImg.naturalWidth) * lw;
      let lx = 10, ly = 10;
      if (pos === 'top-right') { lx = w - lw - 10; }
      else if (pos === 'bottom-left') { ly = h - lh - 10; }
      else if (pos === 'bottom-right') { lx = w - lw - 10; ly = h - lh - 10; }
      
      ctx.drawImage(logoImg, lx, ly, lw, lh);
      const finalURI = canvas.toDataURL('image/jpeg', 0.9);
      finalizeProcessedOutput(finalURI, Math.round(dataURIToBlob(finalURI).size / 1024));
    };
    logoImg.src = URL.createObjectURL(logoInput.files[0]);
  } else {
    const finalURI = canvas.toDataURL('image/jpeg', 0.9);
    finalizeProcessedOutput(finalURI, Math.round(dataURIToBlob(finalURI).size / 1024));
  }
}

async function runMetadataEngine() {
  const sub = activeTool.subGroup;
  if (sub === 'view') {
    try {
      const data = piexif.load(uploadedImageElement.src);
      let logStr = "EXIF Headers Found:\n";
      if (data["0th"]) logStr += `Title: ${data["0th"][piexif.ImageIFD.ImageDescription] || 'None'}\n`;
      if (data["0th"]) logStr += `Software: ${data["0th"][piexif.ImageIFD.Software] || 'None'}\n`;
      if (data["0th"]) logStr += `XResolution: ${data["0th"][piexif.ImageIFD.XResolution] || 'None'}\n`;
      alert(logStr);
    } catch(e) { alert("No readable EXIF header tags."); }
  } else if (sub === 'edit') {
    const auth = document.getElementById('meta-author').value;
    const title = document.getElementById('meta-title').value;
    let exifObj = { "0th": {}, "Exif": {}, "GPS": {}, "1st": {}, "thumbnail": null };
    exifObj["0th"][piexif.ImageIFD.Artist] = auth;
    exifObj["0th"][piexif.ImageIFD.ImageDescription] = title;
    const exifBytes = piexif.dump(exifObj);
    const finalURI = piexif.insert(exifBytes, uploadedImageElement.src);
    finalizeProcessedOutput(finalURI, Math.round(dataURIToBlob(finalURI).size / 1024));
  } else {
    // remove
    const finalURI = piexif.remove(uploadedImageElement.src);
    finalizeProcessedOutput(finalURI, Math.round(dataURIToBlob(finalURI).size / 1024));
  }
}

async function runDpiEngine() {
  const dpi = parseInt(document.getElementById('target-dpi-val').value);
  const finalURI = changeDpiInExif(uploadedImageElement.src, dpi);
  finalizeProcessedOutput(finalURI, Math.round(dataURIToBlob(finalURI).size / 1024));
}

async function runDpiCheckEngine() {
  try {
    const data = piexif.load(uploadedImageElement.src);
    const xRes = data["0th"][piexif.ImageIFD.XResolution];
    const unit = data["0th"][piexif.ImageIFD.ResolutionUnit] === 3 ? 'cm' : 'inch';
    alert(`File Resolution: ${xRes ? xRes[0] : '72'} DPI (per ${unit})`);
  } catch(e) { alert("Default resolution is 72 DPI."); }
}

async function runPassportGenerator() {
  const copies = parseInt(document.getElementById('pass-grid-size').value);
  const bg = document.getElementById('pass-bg').value;
  const canvas = document.createElement('canvas');
  canvas.width = 1200; canvas.height = 800;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, 1200, 800);
  
  const photoW = 220, photoH = 280;
  const photoCanvas = document.createElement('canvas');
  photoCanvas.width = photoW; photoCanvas.height = photoH;
  const pCtx = photoCanvas.getContext('2d');
  pCtx.fillStyle = bg === 'blue' ? "#bae6fd" : "#ffffff";
  pCtx.fillRect(0, 0, photoW, photoH);
  pCtx.drawImage(uploadedImageElement, 0, 0, photoW, photoH);
  
  const gap = 40, startX = 60, startY = 80;
  for (let i = 0; i < copies; i++) {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const dx = startX + (col * (photoW + gap));
    const dy = startY + (row * (photoH + gap));
    ctx.drawImage(photoCanvas, dx, dy);
    ctx.strokeStyle = "#cbd5e1"; ctx.setLineDash([4, 4]);
    ctx.strokeRect(dx - 2, dy - 2, photoW + 4, photoH + 4);
  }
  const finalURI = canvas.toDataURL('image/jpeg', 0.9);
  finalizeProcessedOutput(finalURI, Math.round(dataURIToBlob(finalURI).size / 1024));
}

async function runAiFaceGenerator() {
  const canvas = document.createElement('canvas');
  canvas.width = 300; canvas.height = 400;
  const ctx = canvas.getContext('2d');
  
  // Paint procedural vector portrait sketch background
  ctx.fillStyle = '#bae6fd'; ctx.fillRect(0, 0, 300, 400);
  ctx.fillStyle = '#e2e8f0'; ctx.beginPath();
  ctx.arc(150, 260, 80, 0, Math.PI*2); ctx.fill(); // shoulders
  ctx.fillStyle = '#ffedd5'; ctx.beginPath();
  ctx.arc(150, 160, 60, 0, Math.PI*2); ctx.fill(); // face
  
  // Renders vector details
  ctx.fillStyle = '#1e293b';
  ctx.beginPath(); ctx.arc(130, 150, 6, 0, Math.PI*2); ctx.fill(); // eyes
  ctx.beginPath(); ctx.arc(170, 150, 6, 0, Math.PI*2); ctx.fill();
  ctx.strokeStyle = '#f97316'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(150, 175, 12, 0, Math.PI); ctx.stroke(); // mouth
  
  const finalURI = canvas.toDataURL('image/jpeg', 0.9);
  uploadedImageElement = new Image();
  uploadedImageElement.src = finalURI;
  finalizeProcessedOutput(finalURI, Math.round(dataURIToBlob(finalURI).size / 1024));
}

async function runImageCropper() {
  if (!cropperInstance) return;
  let cropped = cropperInstance.getCroppedCanvas();
  
  if (activeTool && activeTool.cropStyle === 'circle') {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = cropped.width;
    tempCanvas.height = cropped.height;
    const tempCtx = tempCanvas.getContext('2d');
    
    const format = activeTool.format || 'image/jpeg';
    if (format === 'image/png') {
      tempCtx.clearRect(0, 0, cropped.width, cropped.height);
    } else {
      tempCtx.fillStyle = '#ffffff';
      tempCtx.fillRect(0, 0, cropped.width, cropped.height);
    }
    
    tempCtx.save();
    tempCtx.beginPath();
    tempCtx.arc(cropped.width / 2, cropped.height / 2, Math.min(cropped.width, cropped.height) / 2, 0, Math.PI * 2);
    tempCtx.clip();
    tempCtx.drawImage(cropped, 0, 0);
    tempCtx.restore();
    cropped = tempCanvas;
  }
  
  const finalURI = cropped.toDataURL(activeTool.format || 'image/jpeg', 0.9);
  cleanupCropper();
  uploadedImageElement = new Image();
  uploadedImageElement.onload = () => {
    finalizeProcessedOutput(finalURI, Math.round(dataURIToBlob(finalURI).size / 1024));
  };
  uploadedImageElement.src = finalURI;
}

// --- UTILITY RUNNERS ---
function dataURIToBlob(dataURI) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
  return new Blob([ab], { type: mimeString });
}

function getTodayDateString() {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth()+1).padStart(2, '0');
  return `${dd}-${mm}-${d.getFullYear()}`;
}

function changeDpiInExif(dataURI, dpi) {
  let exifObj = {};
  try { exifObj = piexif.load(dataURI); } catch (e) {
    exifObj = { "0th": {}, "Exif": {}, "GPS": {}, "1st": {}, "thumbnail": null };
  }
  exifObj["0th"][piexif.ImageIFD.XResolution] = [dpi, 1];
  exifObj["0th"][piexif.ImageIFD.YResolution] = [dpi, 1];
  exifObj["0th"][piexif.ImageIFD.ResolutionUnit] = 2; // inches
  return piexif.insert(piexif.dump(exifObj), dataURI);
}

function compressImageToKB(canvasElement, targetKB, format = 'image/jpeg') {
  return new Promise((resolve) => {
    let minQ = 0.01, maxQ = 0.99, quality = 0.85;
    let bestURI = canvasElement.toDataURL(format, quality);
    let bestSize = Math.round(dataURIToBlob(bestURI).size / 1024);
    
    for (let i = 0; i < 9; i++) {
      const testURI = canvasElement.toDataURL(format, quality);
      const testSize = dataURIToBlob(testURI).size / 1024;
      if (testSize <= targetKB) {
        bestURI = testURI; bestSize = testSize; minQ = quality;
      } else {
        maxQ = quality;
      }
      quality = (minQ + maxQ) / 2;
    }
    resolve({ dataURI: bestURI, sizeKB: bestSize });
  });
}

function finalizeProcessedOutput(dataURI, sizeKB) {
  document.getElementById('preview-image').src = dataURI;
  document.getElementById('stats-output').innerText = `Output: ${sizeKB} KB`;
  processedBlob = dataURIToBlob(dataURI);
  document.getElementById('download-btn').disabled = false;
  setTimeout(setupDrawMaskCanvas, 150);
}

function downloadProcessedImage() {
  if (!processedBlob) return;
  const url = URL.createObjectURL(processedBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = activeTool && activeTool.category === 'batch' ? "batch_archive.zip" : `formfit_${activeTool.id}.jpg`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function applyRotation(deg) {
  if (!uploadedImageElement) return;
  document.getElementById('loader-overlay').classList.remove('hidden');
  setTimeout(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const w = uploadedImageElement.naturalWidth, h = uploadedImageElement.naturalHeight;
    if (deg === 90 || deg === 270) { canvas.width = h; canvas.height = w; }
    else { canvas.width = w; canvas.height = h; }
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.rotate((deg * Math.PI)/180);
    ctx.drawImage(uploadedImageElement, -w/2, -h/2);
    const out = canvas.toDataURL('image/jpeg', 0.9);
    uploadedImageElement = new Image();
    uploadedImageElement.src = out;
    finalizeProcessedOutput(out, Math.round(dataURIToBlob(out).size / 1024));
    document.getElementById('loader-overlay').classList.add('hidden');
  }, 50);
}

async function applyFlip(axis) {
  if (!uploadedImageElement) return;
  document.getElementById('loader-overlay').classList.remove('hidden');
  setTimeout(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const w = uploadedImageElement.naturalWidth, h = uploadedImageElement.naturalHeight;
    canvas.width = w; canvas.height = h;
    if (axis === 'h') { ctx.translate(w,0); ctx.scale(-1,1); }
    else { ctx.translate(0,h); ctx.scale(1,-1); }
    ctx.drawImage(uploadedImageElement, 0, 0);
    const out = canvas.toDataURL('image/jpeg', 0.9);
    uploadedImageElement = new Image();
    uploadedImageElement.src = out;
    finalizeProcessedOutput(out, Math.round(dataURIToBlob(out).size / 1024));
    document.getElementById('loader-overlay').classList.add('hidden');
  }, 50);
}

// --- BATCH ZIPPER ---
async function processBatch() {
  document.getElementById('loader-overlay').classList.remove('hidden');
  const zip = new JSZip();
  const promises = batchFiles.map((file, idx) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          
          let format = 'image/jpeg';
          let finalURI = canvas.toDataURL(format, 0.85);
          if (activeTool.id === 'metadata-stripper') {
            try { finalURI = piexif.remove(finalURI); } catch(e) {}
          }
          zip.file(`processed_${idx+1}.jpg`, dataURIToBlob(finalURI));
          resolve();
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  });

  await Promise.all(promises);
  zip.generateAsync({ type: "blob" }).then((content) => {
    processedBlob = content;
    document.getElementById('stats-output').innerText = `Batch ZIP: ${Math.round(content.size/1024)} KB`;
    document.getElementById('download-btn').disabled = false;
    document.getElementById('loader-overlay').classList.add('hidden');
    alert("Batch completed! Download ZIP archive.");
  });
}

// --- TRUST / LEGAL VIEWS ---
function showLegalView(pageId) {
  document.getElementById('hero-section').classList.add('hidden');
  document.getElementById('view-home').classList.add('hidden');
  document.getElementById('view-tool').classList.add('hidden');
  
  const legalView = document.getElementById('view-page');
  legalView.classList.remove('hidden', 'animate-slide-up');
  void legalView.offsetWidth; // trigger reflow
  legalView.classList.add('animate-slide-up');
  
  let html = "";
  if (pageId === 'privacy') {
    html = `
      <div class="space-y-6">
        <div class="border-l-4 border-indigo-500 pl-4 py-1">
          <h2 class="text-3xl font-black text-slate-900 tracking-tight">Privacy Policy</h2>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">100% Local & Device-Safe Processing</p>
        </div>
        
        <div class="space-y-4 text-sm text-slate-600 leading-relaxed font-medium">
          <p class="text-slate-400 text-xs font-bold">Last Updated: June 9, 2026</p>
          
          <p>At <strong>SarkariPixels</strong>, we prioritize the absolute security and privacy of your candidate data. This Privacy Policy details how our client-side platform processes your files, photos, and signatures during form-formatting procedures.</p>
          
          <div class="space-y-2 mt-4">
            <h3 class="font-extrabold text-slate-950 text-base">1. 100% Client-Side Architecture (No Uploads)</h3>
            <p>Unlike traditional online image resizers that upload your files to remote web servers, SarkariPixels uses a strict <strong>local processing model</strong>. All operations—including image cropping, dimensions resizing, file size compression (KB adjustment), takhti name overlays, and DPI metadata alterations—are executed inside your browser sandbox using the HTML5 Canvas API. Your files never travel across the internet.</p>
          </div>
          
          <div class="space-y-2 mt-4">
            <h3 class="font-extrabold text-slate-950 text-base">2. Zero Data Collection & Storage</h3>
            <p>Because processing runs entirely on your local device:</p>
            <ul class="list-disc list-inside pl-2 space-y-1 text-xs text-slate-500 font-semibold">
              <li>No photos, signatures, or personal documents are stored, logged, or cached on our servers.</li>
              <li>We do not collect candidate names, dates of birth, or any text inputted into the photo takhti (Name & DOB) overlays.</li>
              <li>We do not use tracking cookies or advertising scripts that compromise your privacy.</li>
            </ul>
          </div>
          
          <div class="space-y-2 mt-4">
            <h3 class="font-extrabold text-slate-950 text-base">3. Library Loading & Service Worker Safety</h3>
            <p>Our platform lazy-loads essential client-side libraries (like Cropper.js, JSZip, and piexif.js) dynamically from verified, high-performance CDNs on demand. These libraries execute locally within your browser sandbox. Additionally, our Service Worker caches these assets to ensure the app works 100% offline, guaranteeing your utility runs safely even when disconnected from the internet.</p>
          </div>

          <div class="space-y-2 mt-4">
            <h3 class="font-extrabold text-slate-950 text-base">4. Compliance with Exam Portals</h3>
            <p>Our zero-upload policy is designed to satisfy the strict data security standards of government exam portals (including UPSC, SSC, IBPS, NTA, and State PSCs). You can format sensitive identification documents without violating security directives.</p>
          </div>
        </div>
      </div>
    `;
  } else if (pageId === 'sitemap') {
    const categoriesMap = {
      "most-used": { name: "Most Used Tools", icon: "fa-star" },
      "basic-edit": { name: "Basic Editing", icon: "fa-wrench" },
      "effects": { name: "Blur, Pixlate and Special Effects", icon: "fa-wand-magic-sparkles" },
      "dpi-quality": { name: "DPI & Quality", icon: "fa-print" },
      "id-sizes": { name: "Passport & ID Photo Sizes", icon: "fa-id-card" },
      "general-compress": { name: "General Compression", icon: "fa-box-archive" },
      "target-sizes": { name: "Exact Target Sizes", icon: "fa-weight-hanging" },
      "official-sizes": { name: "Resize Other Official Sizes", icon: "fa-graduation-cap" }
    };
    let colsHtml = "";
    Object.keys(categoriesMap).forEach(catId => {
      const cat = categoriesMap[catId];
      const catTools = TOOLS.filter(t => t.category === catId);
      let listItems = "";
      catTools.forEach(t => {
        listItems += `<li><a href="/tool/${t.id}" class="hover:text-indigo-600 transition-all flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100 font-semibold"><span>${t.title}</span><i class="fa-solid fa-chevron-right text-[10px]"></i></a></li>`;
      });
      colsHtml += `
        <div class="space-y-3">
          <h3 class="font-extrabold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-1.5"><i class="fa-solid ${cat.icon} text-indigo-500 text-xs"></i> ${cat.name}</h3>
          <ul class="space-y-2 text-xs font-semibold text-slate-500">
            ${listItems}
          </ul>
        </div>
      `;
    });
    html = `
      <div class="space-y-6">
        <div class="border-l-4 border-indigo-500 pl-4 py-1">
          <h2 class="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5"><i class="fa-solid fa-sitemap text-indigo-500"></i> HTML Sitemap</h2>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Complete Directory of SarkariPixels Tools & Guidelines</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-sm pt-2">
          ${colsHtml}
        </div>
      </div>
    `;
  } else {
    html = `
      <div class="space-y-6">
        <div class="border-l-4 border-indigo-500 pl-4 py-1">
          <h2 class="text-3xl font-black text-slate-900 tracking-tight">About Us & Terms</h2>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Free, Private & Compliant Formatting Tools</p>
        </div>
        
        <div class="space-y-4 text-sm text-slate-600 leading-relaxed font-medium">
          <p><strong>SarkariPixels</strong> is a premium, browser-based utility platform built specifically for Indian competitive exam candidates. Our mission is to eliminate the frustration of application form rejection due to improperly formatted photographs, signatures, and marksheets.</p>
          
          <div class="space-y-2 mt-4">
            <h3 class="font-extrabold text-slate-950 text-base">Our Core Value Proposition</h3>
            <p>Government recruitment portals—such as SSC, UPSC, banking (IBPS, SBI), railway (RRB), and state commissions (BPSC, UPPSC, MPSC, etc.)—enforce strict specifications for uploaded images. These include exact width/height in centimeters, millimeters, or pixels, specific file size boundaries (e.g., between 20 KB and 50 KB), white backgrounds, and custom DPI density metadata (often 200 or 300 DPI). SarkariPixels provides 88 custom tools to help candidates achieve perfect compliance instantly.</p>
          </div>
          
          <div class="space-y-2 mt-4">
            <h3 class="font-extrabold text-slate-950 text-base">Terms of Service & Usage</h3>
            <p>By using SarkariPixels, you agree to the following terms:</p>
            <ul class="list-disc list-inside pl-2 space-y-1.5 text-xs text-slate-500 font-semibold">
              <li><strong>As-Is Utility:</strong> We provide formatting, resizing, cropping, and metadata tools on an "as-is" basis. Candidates are encouraged to verify that their finalized images align with official notification guidelines before uploading.</li>
              <li><strong>Zero Cost:</strong> The platform is completely free to use. There are no subscriptions, registration requirements, watermarks, or processing limitations.</li>
              <li><strong>No Liability:</strong> Since all code runs on your client machine and we have no access to your documents, SarkariPixels is not liable for application form rejections or errors resulting from user configuration or notification changes.</li>
            </ul>
          </div>

          <div class="space-y-2 mt-4">
            <h3 class="font-extrabold text-slate-950 text-base">Device Compatibility</h3>
            <p>SarkariPixels is fully responsive and optimized for mobile devices, tablets, and desktop computers.</p>
        </div>
      </div>
    `;
  }
  legalView.innerHTML = html;
}

// --- OPENROUTER CHATBOT AI INTEGRATION ---
let chatHistory = [];
const CHATBOT_SYSTEM_PROMPT = `You are the SarkariPixels AI Assistant. SarkariPixels is a 100% client-side web application that lets candidates format, crop, compress, and adjust DPI of photos & signatures for Govt Exams.
You have access to a database of exact exam specifications:
${JSON.stringify(EXAM_SPECS_DB, null, 2)}

Instructions:
1. If the user asks about an exam listed in the database, present its specs.
2. If they ask about another exam, use your knowledge to provide general specs and guide them.
3. Crucially: If a tool exists in SarkariPixels that can help them, suggest it. You MUST suggest a tool by printing exactly "[LAUNCH_TOOL: tool-id]" on its own line in your reply.
Available tool-ids:
- passport-maker (for Passport Photo Grid sheets)
- reduce-kb (for General target size compression)
- resize-pixel (for custom width/height in px)
- generate-signature (for drawing signature)
- increase-kb (for padding image size larger)
- rotate-image (for rotation)
- flip-image (for flipping)
- free-crop (for free-hand cropping)
- circle-crop (for circle cropping)
- square-crop (for square cropping)
- merge-photo-sig (for merging photo & signature stacked)
- add-name-dob (for adding Name and Birthdate to photo)
- convert-dpi (for DPI convert 200/300/600)
- check-dpi (for checking resolution)
- ssc-photo (for SSC resizer)
- pan-card-resize (for PAN card resizer)
- upsc-photo-resize (for UPSC resizer)
- smart-resizer (for Smart Image Resizer - PX, INCH, CM, MM)

Always answer politely and concisely. Try to respond in the language of the query (e.g. Hindi if asked in Hindi). Use standard markdown for list formatting.`;

function toggleChat() {
  const chatWindow = document.getElementById('chat-window');
  const isVisible = chatWindow.classList.contains('opacity-100');
  if (isVisible) {
    chatWindow.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
    chatWindow.classList.add('opacity-0', 'scale-90', 'pointer-events-none');
  } else {
    chatWindow.classList.add('opacity-100', 'scale-100', 'pointer-events-auto');
    chatWindow.classList.remove('opacity-0', 'scale-90', 'pointer-events-none');
    document.getElementById('chat-input').focus();
  }
}

function handleChatKey(e) {
  if (e.key === "Enter") sendChatMessage();
}

async function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const val = input.value.trim();
  if (val === "") return;
  
  appendMessage("user", val);
  chatHistory.push({ role: "user", content: val });
  input.value = "";
  
  const container = document.getElementById('chat-messages');
  const typingDiv = document.createElement('div');
  typingDiv.id = "chat-typing-indicator";
  typingDiv.className = "flex items-start gap-2";
  typingDiv.innerHTML = `
    <div class="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 font-bold text-[9px]">AI</div>
    <div class="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-2.5 shadow-sm text-slate-400 italic">
      <i class="fa-solid fa-circle-notch animate-spin mr-1"></i> Thinking...
    </div>
  `;
  container.appendChild(typingDiv);
  container.scrollTop = container.scrollHeight;
  
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: CHATBOT_SYSTEM_PROMPT },
          ...chatHistory
        ]
      })
    });
    
    const indicator = document.getElementById('chat-typing-indicator');
    if (indicator) indicator.remove();
    
    if (!response.ok) {
      let errMsg = `Server error (Status ${response.status})`;
      try {
        const errData = await response.json();
        if (errData && errData.error) errMsg = errData.error;
      } catch (e) {}
      throw new Error(errMsg);
    }
    
    const data = await response.json();
    const replyText = data.choices[0].message.content;
    
    appendBotMessage(replyText);
    chatHistory.push({ role: "assistant", content: replyText });
    
  } catch (err) {
    console.error(err);
    const indicator = document.getElementById('chat-typing-indicator');
    if (indicator) indicator.remove();
    
    let displayMsg = "Sorry, I had trouble connecting. Please check your internet connection.";
    if (err.message && err.message !== "API request failed" && !err.message.includes("Failed to fetch")) {
      displayMsg = `Error: ${err.message}`;
    }
    appendMessage("bot", displayMsg);
  }
}

function appendMessage(sender, text) {
  const container = document.getElementById('chat-messages');
  const msgDiv = document.createElement('div');
  msgDiv.className = "flex items-start gap-2 " + (sender === "user" ? "flex-row-reverse" : "");
  const avatar = sender === "user" ? "You" : "AI";
  const avatarBg = sender === "user" ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-700";
  const bubbleStyle = sender === "user" ? "bg-indigo-50 border-indigo-100 text-indigo-950 rounded-tr-none" : "bg-white border-slate-200 text-slate-700 rounded-tl-none";
  
  msgDiv.innerHTML = `
    <div class="w-6 h-6 rounded-full ${avatarBg} flex items-center justify-center shrink-0 font-bold text-[9px]">${avatar}</div>
    <div class="${bubbleStyle} border rounded-2xl p-2.5 shadow-sm leading-relaxed max-w-[80%] whitespace-pre-line">
      ${text}
    </div>
  `;
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

function appendBotMessage(text) {
  const container = document.getElementById('chat-messages');
  const msgDiv = document.createElement('div');
  msgDiv.className = "flex items-start gap-2";
  
  const toolRegex = /\[LAUNCH_TOOL:\s*([a-zA-Z0-9_-]+)\]/g;
  let parsedText = text.replace(toolRegex, (match, toolId) => {
    const tool = TOOLS.find(t => t.id === toolId.trim());
    if (tool) {
      return `<button onclick="navigateTo('tool/${tool.id}'); toggleChat();" class="pointer-events-auto mt-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-wide hover:bg-indigo-700 block transition-all shadow-sm"><i class="fa-solid fa-rocket mr-1"></i> Open ${tool.title}</button>`;
    }
    return "";
  });
  
  parsedText = parsedText
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-mono text-[10px]">$1</code>');
  
  msgDiv.innerHTML = `
    <div class="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 font-bold text-[9px]">AI</div>
    <div class="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-2.5 shadow-sm text-slate-700 leading-relaxed max-w-[80%] whitespace-pre-line">
      ${parsedText}
    </div>
  `;
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

// --- NEW HELPER ENGINES & UTILITIES ---

let isDrawingMask = false;
let lastMaskX = 0, lastMaskY = 0;

function setupDrawMaskCanvas() {
  const viewport = document.getElementById('preview-viewport');
  const img = document.getElementById('preview-image');
  if (!viewport || !img) return;

  let canvas = document.getElementById('draw-mask-canvas');
  
  if (activeTool && activeTool.group === 'draw-mask') {
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'draw-mask-canvas';
      canvas.className = "absolute pointer-events-auto cursor-crosshair z-10";
      viewport.appendChild(canvas);
      
      const startMaskDraw = (e) => {
        isDrawingMask = true;
        const pos = getCanvasMousePos(canvas, e);
        lastMaskX = pos.x; lastMaskY = pos.y;
      };
      
      const drawMask = (e) => {
        if (!isDrawingMask) return;
        const pos = getCanvasMousePos(canvas, e);
        const ctx = canvas.getContext('2d');
        const sizeInput = document.getElementById('brush-size-range');
        const brushSize = sizeInput ? parseInt(sizeInput.value) : 15;
        
        ctx.strokeStyle = "rgba(239, 68, 68, 0.5)"; // semi-transparent red brush
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(lastMaskX, lastMaskY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        lastMaskX = pos.x; lastMaskY = pos.y;
      };
      
      canvas.addEventListener('mousedown', startMaskDraw);
      canvas.addEventListener('mousemove', drawMask);
      canvas.addEventListener('mouseup', () => isDrawingMask = false);
      canvas.addEventListener('mouseleave', () => isDrawingMask = false);
      
      canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startMaskDraw(e);
      }, { passive: false });
      canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        drawMask(e);
      }, { passive: false });
      canvas.addEventListener('touchend', () => isDrawingMask = false);
    }
    
    // Position the canvas exactly over the image
    setTimeout(() => {
      canvas.style.display = "block";
      canvas.style.left = `${img.offsetLeft}px`;
      canvas.style.top = `${img.offsetTop}px`;
      canvas.width = img.offsetWidth;
      canvas.height = img.offsetHeight;
      
      // Clear canvas to start fresh
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 100);
  } else {
    if (canvas) canvas.style.display = "none";
  }
}

function getCanvasMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  const clientX = evt.touches && evt.touches[0] ? evt.touches[0].clientX : evt.clientX;
  const clientY = evt.touches && evt.touches[0] ? evt.touches[0].clientY : evt.clientY;
  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  };
}

async function runDrawMaskEngine() {
  const canvas = document.getElementById('draw-mask-canvas');
  if (!canvas || !uploadedImageElement) return;

  const originalW = uploadedImageElement.naturalWidth;
  const originalH = uploadedImageElement.naturalHeight;

  const fullMaskCanvas = document.createElement('canvas');
  fullMaskCanvas.width = originalW;
  fullMaskCanvas.height = originalH;
  const fmCtx = fullMaskCanvas.getContext('2d');
  fmCtx.drawImage(canvas, 0, 0, originalW, originalH);

  const imageCanvas = document.createElement('canvas');
  imageCanvas.width = originalW;
  imageCanvas.height = originalH;
  const imgCtx = imageCanvas.getContext('2d');
  imgCtx.drawImage(uploadedImageElement, 0, 0);

  const imgData = imgCtx.getImageData(0, 0, originalW, originalH);
  const maskData = fmCtx.getImageData(0, 0, originalW, originalH);

  const d = imgData.data;
  const m = maskData.data;

  const toolId = activeTool.id;

  if (toolId === 'remove-object') {
    const width = originalW;
    const height = originalH;
    let currentPixels = new Uint32Array(d.buffer);
    let tempPixels = new Uint32Array(width * height);
    tempPixels.set(currentPixels);
    
    const masked = new Uint8Array(width * height);
    for (let i = 0; i < width * height; i++) {
      masked[i] = m[i * 4 + 3] > 20 ? 1 : 0;
    }
    
    for (let pass = 0; pass < 5; pass++) {
      let changed = false;
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const idx = y * width + x;
          if (masked[idx]) {
            let rSum = 0, gSum = 0, bSum = 0, count = 0;
            const neighbors = [
              idx - 1, idx + 1,
              idx - width, idx + width,
              idx - width - 1, idx - width + 1,
              idx + width - 1, idx + width + 1
            ];
            for (let n = 0; n < neighbors.length; n++) {
              const nIdx = neighbors[n];
              if (!masked[nIdx]) {
                const color = currentPixels[nIdx];
                rSum += color & 0xFF;
                gSum += (color >> 8) & 0xFF;
                bSum += (color >> 16) & 0xFF;
                count++;
              }
            }
            if (count > 0) {
              const r = Math.round(rSum / count);
              const g = Math.round(gSum / count);
              const b = Math.round(bSum / count);
              tempPixels[idx] = 0xFF000000 | (b << 16) | (g << 8) | r;
              masked[idx] = 0;
              changed = true;
            }
          }
        }
      }
      currentPixels.set(tempPixels);
      if (!changed) break;
    }
  } else if (toolId === 'censor-photo') {
    const style = document.getElementById('censor-style') ? document.getElementById('censor-style').value : 'black';
    const width = originalW;
    const height = originalH;
    
    if (style === 'black') {
      for (let i = 0; i < width * height; i++) {
        if (m[i * 4 + 3] > 20) {
          d[i * 4] = 0;
          d[i * 4 + 1] = 0;
          d[i * 4 + 2] = 0;
          d[i * 4 + 3] = 255;
        }
      }
    } else if (style === 'pixelate') {
      const blockSize = 16;
      for (let y = 0; y < height; y += blockSize) {
        for (let x = 0; x < width; x += blockSize) {
          let hasMask = false;
          for (let by = 0; by < blockSize && y + by < height; by++) {
            for (let bx = 0; bx < blockSize && x + bx < width; bx++) {
              if (m[((y + by) * width + (x + bx)) * 4 + 3] > 20) {
                hasMask = true;
                break;
              }
            }
            if (hasMask) break;
          }
          
          if (hasMask) {
            let rSum = 0, gSum = 0, bSum = 0, count = 0;
            for (let by = 0; by < blockSize && y + by < height; by++) {
              for (let bx = 0; bx < blockSize && x + bx < width; bx++) {
                const idx = ((y + by) * width + (x + bx)) * 4;
                rSum += d[idx];
                gSum += d[idx + 1];
                bSum += d[idx + 2];
                count++;
              }
            }
            const r = Math.round(rSum / count);
            const g = Math.round(gSum / count);
            const b = Math.round(bSum / count);
            
            for (let by = 0; by < blockSize && y + by < height; by++) {
              for (let bx = 0; bx < blockSize && x + bx < width; bx++) {
                const idx = ((y + by) * width + (x + bx)) * 4;
                d[idx] = r;
                d[idx + 1] = g;
                d[idx + 2] = b;
              }
            }
          }
        }
      }
    } else if (style === 'blur') {
      const blurRadius = 8;
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = width; tempCanvas.height = height;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.filter = `blur(${blurRadius}px)`;
      tempCtx.drawImage(imageCanvas, 0, 0);
      const blurredData = tempCtx.getImageData(0, 0, width, height).data;
      
      for (let i = 0; i < width * height; i++) {
        if (m[i * 4 + 3] > 20) {
          d[i * 4] = blurredData[i * 4];
          d[i * 4 + 1] = blurredData[i * 4 + 1];
          d[i * 4 + 2] = blurredData[i * 4 + 2];
        }
      }
    }
  }

  imgCtx.putImageData(imgData, 0, 0);
  const finalURI = imageCanvas.toDataURL('image/jpeg', 0.9);
  
  uploadedImageElement = new Image();
  uploadedImageElement.onload = () => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    finalizeProcessedOutput(finalURI, Math.round(dataURIToBlob(finalURI).size / 1024));
  };
  uploadedImageElement.src = finalURI;
}

async function runJoinEngine() {
  const filesInput = document.getElementById('secondary-files');
  const dir = document.getElementById('join-direction') ? document.getElementById('join-direction').value : 'horizontal';
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!uploadedImageElement) return;

  const mainW = uploadedImageElement.naturalWidth;
  const mainH = uploadedImageElement.naturalHeight;

  if (filesInput.files && filesInput.files[0]) {
    const secImg = new Image();
    secImg.onload = () => {
      const secW = secImg.naturalWidth;
      const secH = secImg.naturalHeight;
      
      if (dir === 'horizontal') {
        const scaleSecW = (mainH / secH) * secW;
        canvas.width = mainW + scaleSecW;
        canvas.height = mainH;
        ctx.drawImage(uploadedImageElement, 0, 0, mainW, mainH);
        ctx.drawImage(secImg, mainW, 0, scaleSecW, mainH);
      } else {
        const scaleSecH = (mainW / secW) * secH;
        canvas.width = mainW;
        canvas.height = mainH + scaleSecH;
        ctx.drawImage(uploadedImageElement, 0, 0, mainW, mainH);
        ctx.drawImage(secImg, 0, mainH, mainW, scaleSecH);
      }
      
      const finalURI = canvas.toDataURL('image/jpeg', 0.9);
      finalizeProcessedOutput(finalURI, Math.round(dataURIToBlob(finalURI).size / 1024));
    };
    secImg.src = URL.createObjectURL(filesInput.files[0]);
  } else {
    canvas.width = mainW;
    canvas.height = mainH;
    ctx.drawImage(uploadedImageElement, 0, 0);
    const finalURI = canvas.toDataURL('image/jpeg', 0.9);
    finalizeProcessedOutput(finalURI, Math.round(dataURIToBlob(finalURI).size / 1024));
  }
}

function copyPickedColor() {
  const hex = document.getElementById('picker-color-hex').innerText;
  navigator.clipboard.writeText(hex);
  alert(`Color hex code ${hex} copied to clipboard!`);
}

function applyConvolutionFilter(canvas, kernel) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const imgData = ctx.getImageData(0, 0, w, h);
  const src = imgData.data;
  
  const output = ctx.createImageData(w, h);
  const dst = output.data;
  
  const side = Math.round(Math.sqrt(kernel.length));
  const halfSide = Math.floor(side / 2);
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const sy = y;
      const sx = x;
      const dstIdx = (y * w + x) * 4;
      
      let r = 0, g = 0, b = 0, a = 0;
      for (let cy = 0; cy < side; cy++) {
        for (let cx = 0; cx < side; cx++) {
          const scy = sy + cy - halfSide;
          const scx = sx + cx - halfSide;
          
          if (scy >= 0 && scy < h && scx >= 0 && scx < w) {
            const srcIdx = (scy * w + scx) * 4;
            const wt = kernel[cy * side + cx];
            r += src[srcIdx] * wt;
            g += src[srcIdx + 1] * wt;
            b += src[srcIdx + 2] * wt;
            a += src[srcIdx + 3] * wt;
          }
        }
      }
      
      dst[dstIdx] = Math.min(255, Math.max(0, r));
      dst[dstIdx + 1] = Math.min(255, Math.max(0, g));
      dst[dstIdx + 2] = Math.min(255, Math.max(0, b));
      dst[dstIdx + 3] = Math.min(255, Math.max(0, a));
    }
  }
  ctx.putImageData(output, 0, 0);
}

function initBlemishRemoverEvents() {
  const previewImg = document.getElementById('preview-image');
  if (!previewImg) return;
  
  const handleHeal = (e) => {
    if (activeTool && activeTool.filterType === 'blemish' && uploadedImageElement) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const w = uploadedImageElement.naturalWidth;
      const h = uploadedImageElement.naturalHeight;
      canvas.width = w; canvas.height = h;
      ctx.drawImage(uploadedImageElement, 0, 0);
      
      const rect = previewImg.getBoundingClientRect();
      const clickX = Math.floor(((e.clientX - rect.left) / rect.width) * w);
      const clickY = Math.floor(((e.clientY - rect.top) / rect.height) * h);
      
      const radiusInput = document.getElementById('filter-range');
      const radius = radiusInput ? parseInt(radiusInput.value) : 8;
      
      const imgData = ctx.getImageData(0, 0, w, h);
      const d = imgData.data;
      
      let rSum = 0, gSum = 0, bSum = 0, count = 0;
      const ringRadius = radius + 2;
      for (let angle = 0; angle < 360; angle += 15) {
        const rad = (angle * Math.PI) / 180;
        const rx = Math.round(clickX + ringRadius * Math.cos(rad));
        const ry = Math.round(clickY + ringRadius * Math.sin(rad));
        
        if (rx >= 0 && rx < w && ry >= 0 && ry < h) {
          const idx = (ry * w + rx) * 4;
          rSum += d[idx];
          gSum += d[idx + 1];
          bSum += d[idx + 2];
          count++;
        }
      }
      
      if (count > 0) {
        const rAvg = Math.round(rSum / count);
        const gAvg = Math.round(gSum / count);
        const bAvg = Math.round(bSum / count);
        
        for (let y = clickY - radius; y <= clickY + radius; y++) {
          for (let x = clickX - radius; x <= clickX + radius; x++) {
            if (x >= 0 && x < w && y >= 0 && y < h) {
              const dist = Math.sqrt((x - clickX) ** 2 + (y - clickY) ** 2);
              if (dist <= radius) {
                const idx = (y * w + x) * 4;
                const feather = 1 - (dist / radius);
                d[idx] = Math.round(d[idx] * (1 - feather) + rAvg * feather);
                d[idx + 1] = Math.round(d[idx + 1] * (1 - feather) + gAvg * feather);
                d[idx + 2] = Math.round(d[idx + 2] * (1 - feather) + bAvg * feather);
              }
            }
          }
        }
        
        ctx.putImageData(imgData, 0, 0);
        const finalURI = canvas.toDataURL('image/jpeg', 0.9);
        uploadedImageElement = new Image();
        uploadedImageElement.onload = () => {
          finalizeProcessedOutput(finalURI, Math.round(dataURIToBlob(finalURI).size / 1024));
        };
        uploadedImageElement.src = finalURI;
      }
    }
  };
  
  previewImg.addEventListener('click', handleHeal);
}

// --- APPLICATION STARTUP ---
window.addEventListener('popstate', handleRouting);

// Intercept all clean path links globally for SPA routing
document.addEventListener('click', (e) => {
  const target = e.target.closest('a');
  if (!target) return;
  
  const href = target.getAttribute('href');
  if (href && (href === '/' || href.startsWith('/tool/') || href.startsWith('/page/'))) {
    e.preventDefault();
    navigateTo(href === '/' ? '' : href.substring(1));
  }
});

window.addEventListener('load', () => {
  handleRouting();
  renderToolCards();
  initBlemishRemoverEvents();
  initColorPickerEvents();

  const settingsPanel = document.getElementById('tool-settings-panel');
  if (settingsPanel) {
    settingsPanel.addEventListener('input', (e) => {
      handleDimensionInput(e);
      debounceExecuteTool();
    });
    settingsPanel.addEventListener('change', () => executeActiveTool(false));
  }

  // Register Service Worker for offline PWA capabilities
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker registered successfully:', reg.scope))
      .catch(err => console.error('Service Worker registration failed:', err));
  }
});

// --- ASPECT RATIO LOCKING & UNIT CHANGING HELPERS ---
function setUniversalUnit(unit) {
  document.getElementById('universal-unit').value = unit;
  
  // Highlight active tab
  document.querySelectorAll('.unit-tab-btn').forEach(btn => {
    btn.className = "unit-tab-btn py-1.5 text-xs font-bold rounded-lg text-center text-slate-500 hover:text-slate-700 transition-all";
  });
  
  const activeBtn = document.getElementById(`btn-unit-${unit}`);
  if (activeBtn) {
    activeBtn.className = "unit-tab-btn py-1.5 text-xs font-bold rounded-lg text-center bg-gradient-to-r from-indigo-600 to-pink-500 text-white shadow-sm transition-all";
  }
  
  // Update unit text indicators
  document.getElementById('unit-indicator-w').innerText = unit.toUpperCase();
  document.getElementById('unit-indicator-h').innerText = unit.toUpperCase();
  
  // Update default values based on unit for better UX
  const wInput = document.getElementById('universal-w');
  const hInput = document.getElementById('universal-h');
  
  if (unit === 'px') {
    wInput.value = "800";
    hInput.value = "600";
  } else if (unit === 'inch') {
    wInput.value = "6";
    hInput.value = "4";
  } else if (unit === 'cm') {
    wInput.value = "15";
    hInput.value = "10";
  } else if (unit === 'mm') {
    wInput.value = "150";
    hInput.value = "100";
  }
  
  // Trigger automatic tool execution
  debounceExecuteTool();
}

function handleDimensionInput(e) {
  if (!uploadedImageElement) return;
  const originalRatio = uploadedImageElement.naturalWidth / uploadedImageElement.naturalHeight;
  
  if (e.target.id === 'resize-w') {
    const lock = document.getElementById('resize-lock');
    if (lock && lock.checked) {
      const w = parseFloat(e.target.value);
      if (!isNaN(w) && w > 0) {
        document.getElementById('resize-h').value = Math.round((w / originalRatio) * 100) / 100;
      }
    }
  } else if (e.target.id === 'resize-h') {
    const lock = document.getElementById('resize-lock');
    if (lock && lock.checked) {
      const h = parseFloat(e.target.value);
      if (!isNaN(h) && h > 0) {
        document.getElementById('resize-w').value = Math.round((h * originalRatio) * 100) / 100;
      }
    }
  } else if (e.target.id === 'universal-w') {
    const lock = document.getElementById('universal-lock');
    if (lock && lock.checked) {
      const w = parseFloat(e.target.value);
      if (!isNaN(w) && w > 0) {
        document.getElementById('universal-h').value = Math.round((w / originalRatio) * 100) / 100;
      }
    }
  } else if (e.target.id === 'universal-h') {
    const lock = document.getElementById('universal-lock');
    if (lock && lock.checked) {
      const h = parseFloat(e.target.value);
      if (!isNaN(h) && h > 0) {
        document.getElementById('universal-w').value = Math.round((h * originalRatio) * 100) / 100;
      }
    }
  }
}
