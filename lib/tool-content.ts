// lib/tool-content.ts
// Per-tool unique SEO content: descriptions, FAQs, how-to steps, related tools.
// Used by SSR pages to generate unique content for all 88 tools.

export interface ToolFAQ {
  q: string;
  a: string;
}

export interface ToolContent {
  metaTitle: string;
  metaDesc: string; // 150-250 chars
  h1: string;
  description: string; // 150-250 words
  howTo: string[];
  faqs: ToolFAQ[];
  relatedTools: string[];
}

export const TOOL_CONTENT: Record<string, ToolContent> = {
  "resize-image": {
    metaTitle: "Resize multiple images at once! — Free Online Tool | SarkariPixels",
    metaDesc: "Use our free online resize multiple images at once! tool. 100% client-side, zero file upload needed. Fast, high quality, and perfect for exam application forms.",
    h1: "Resize multiple images at once! Online Free",
    description: `Resize multiple images at once! tool allows you to process and optimize photos directly in your browser. All computations run 100% locally via HTML5 Canvas and Web APIs. Your confidential images never leave your computer or phone.`,
    howTo: [
      "Select your image file by clicking Upload or drag & drop",
      "Configure your desired dimensions or compression options",
      "Click Process to execute instant in-browser optimization",
      "Download your ready-to-use image instantly"
    ],
    faqs: [
      { q: "Is this Resize multiple images at once! tool completely free?", a: "Yes, it is 100% free with unlimited usage and zero registration required." },
      { q: "Are my files uploaded to your servers?", a: "No. All processing happens 100% locally in your web browser memory sandbox." },
      { q: "Can I use this on mobile devices?", a: "Yes, this tool works seamlessly on Android, iOS, Windows, and Mac browsers." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "crop-image": {
    metaTitle: "Crop Image Online Free — Free Online Tool | SarkariPixels",
    metaDesc: "Use our free online crop image online free tool. 100% client-side, zero file upload needed. Fast, high quality, and perfect for exam application forms.",
    h1: "Crop Image Online Free Online Free",
    description: `Crop Image Online Free tool allows you to process and optimize photos directly in your browser. All computations run 100% locally via HTML5 Canvas and Web APIs. Your confidential images never leave your computer or phone.`,
    howTo: [
      "Select your image file by clicking Upload or drag & drop",
      "Configure your desired dimensions or compression options",
      "Click Process to execute instant in-browser optimization",
      "Download your ready-to-use image instantly"
    ],
    faqs: [
      { q: "Is this Crop Image Online Free tool completely free?", a: "Yes, it is 100% free with unlimited usage and zero registration required." },
      { q: "Are my files uploaded to your servers?", a: "No. All processing happens 100% locally in your web browser memory sandbox." },
      { q: "Can I use this on mobile devices?", a: "Yes, this tool works seamlessly on Android, iOS, Windows, and Mac browsers." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "compress-image": {
    metaTitle: "Compress Image Online Free — Free Online Tool | SarkariPixels",
    metaDesc: "Use our free online compress image online free tool. 100% client-side, zero file upload needed. Fast, high quality, and perfect for exam application forms.",
    h1: "Compress Image Online Free Online Free",
    description: `Compress Image Online Free tool allows you to process and optimize photos directly in your browser. All computations run 100% locally via HTML5 Canvas and Web APIs. Your confidential images never leave your computer or phone.`,
    howTo: [
      "Select your image file by clicking Upload or drag & drop",
      "Configure your desired dimensions or compression options",
      "Click Process to execute instant in-browser optimization",
      "Download your ready-to-use image instantly"
    ],
    faqs: [
      { q: "Is this Compress Image Online Free tool completely free?", a: "Yes, it is 100% free with unlimited usage and zero registration required." },
      { q: "Are my files uploaded to your servers?", a: "No. All processing happens 100% locally in your web browser memory sandbox." },
      { q: "Can I use this on mobile devices?", a: "Yes, this tool works seamlessly on Android, iOS, Windows, and Mac browsers." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  // ── Most Used ────────────────────────────────────────────────────────────

  "smart-resizer": {
    metaTitle: "Smart Image Resizer — Resize in Pixels, CM, MM, Inches | SarkariPixels",
    metaDesc: "Free online image resizer. Enter exact pixel, centimeter, mm or inch dimensions. Perfect for SSC, UPSC, BPSC, RRB exam photo requirements. No upload needed.",
    h1: "Smart Image Resizer — Pixels, CM, MM & Inches",
    description: `Resize photos to exact dimensions in pixels, centimeters, millimeters, or inches. Pre-configured for government exam standards including SSC (3.5 × 4.5 cm) and UPSC (350 × 350 px).

All processing executes locally in your browser memory via HTML5 Canvas — your photos are never uploaded to any server. Toggle between units with aspect ratio lock to prevent facial distortion.`,
    howTo: [
      "Apni photo drag karein ya 'Upload' button dabayein",
      "Units chunein — Pixels, CM, MM ya Inches",
      "Width aur Height type karein",
      "Aspect ratio lock/unlock karo (lock rakhne se photo stretch nahi hogi)",
      "'Resize' dabayein aur download karein",
    ],
    faqs: [
      { q: "SSC photo ke liye exact dimensions kya chahiye?", a: "SSC CGL/CHSL photo 3.5 cm × 4.5 cm (ya approximately 413 × 531 pixels at 300 DPI) honi chahiye, 20KB se 50KB ke beech, JPG format mein." },
      { q: "Resize karne se quality kharab hoti hai kya?", a: "Agar aap image bada kar rahe hain (upscale) toh thodi quality loss hogi, lekin downscale karne mein quality achi rehti hai. Hamesha original high-resolution photo use karo." },
      { q: "Kya HEIC iPhone photos support hain?", a: "Haan, modern browsers HEIC automatically convert kar lete hain. Agar problem aaye toh pehle phone se JPG mein convert karein." },
      { q: "Aspect ratio lock karna kab zaroori hai?", a: "ID photo resize karte waqt hamesha aspect ratio lock karo warna chehra stretch ho sakta hai aur form rejection ka risk hai." },
      { q: "8MP phone camera ki 5MB photo directly use kar sakta hun?", a: "Haan, yeh tool 20MB tak ki photos handle karta hai. Bas upload karo, dimensions set karo, aur download karo." },
    ],
    relatedTools: ["reduce-kb", "resize-35-45", "ssc-photo", "convert-dpi"],
  },

  "passport-maker": {
    metaTitle: "Passport Photo Maker — Printable 4x6 Grid Sheet | SarkariPixels",
    metaDesc: "Make printable passport photo sheets online. Drag photo, auto-crop to passport size, arrange 6-8 copies on a 4x6 print sheet. Free, no upload, instant download.",
    h1: "Passport Photo Maker — 4×6 Printable Sheet",
    description: `Generate printable 4×6 inch passport photo sheets with 6 to 8 copies arranged in an aligned grid. Centers and crops photos to official 3.5 × 4.5 cm passport proportions with white borders.

Download high-resolution print-ready files for physical submission in SSC, UPSC, state PSC, driving license, and bank verification forms. Processes 100% in-browser with zero server uploads.`,
    howTo: [
      "Photo upload karein (minimum 600×800 px recommended)",
      "Face area crop karein ya auto-detect use karein",
      "Copies ki quantity select karein (6 ya 8)",
      "Print size chunein (4×6 inch standard hai)",
      "PNG download karein aur print shop mein le jaayein",
    ],
    faqs: [
      { q: "Printer par directly print ho sakti hai kya?", a: "Haan, download ki gai PNG 4×6 inch print ready hai. Printer mein 'actual size' ya 'fit to page' option mat chunna — '4x6 photo paper' setting use karo." },
      { q: "Background white karna zaroori hai?", a: "SSC, UPSC, BPSC sabke liye white background mandatory hai. Agar aapki photo ka background white nahi hai toh 'Remove Background' tool pehle use karo." },
      { q: "Ek sheet mein kitni photos aati hain?", a: "Standard 4×6 inch sheet par 35mm×45mm size mein typically 6-8 passport photos aa jaati hain." },
      { q: "Photo resolution minimum kitna hona chahiye?", a: "Best results ke liye 800×1000 pixels ya zyada. WhatsApp-compressed images se print quality kharab hoti hai." },
      { q: "Studio-quality ke barabar result milega kya?", a: "Agar original photo achi quality mein hai aur clearly lit hai, toh haan. Dark ya blurry phone photos ka result unhi jaisa hoga." },
    ],
    relatedTools: ["reduce-kb", "remove-bg", "ssc-photo", "smart-resizer"],
  },

  "reduce-kb": {
    metaTitle: "Reduce Image Size in KB — Compress Photo Under 50KB | SarkariPixels",
    metaDesc: "Compress JPG/PNG to exact KB target. Set 20KB, 50KB, 100KB limit. Perfect for SSC, UPSC, IBPS exam portals. 100% browser-based, files never uploaded.",
    h1: "Reduce Image Size in KB — Target Any KB Limit",
    description: `Compress large camera photos to exact kilobyte limits required by recruitment portals (20KB, 50KB, 100KB).

Uses iterative client-side compression to hit target thresholds precisely without exceeding file size caps. Files remain strictly on your device with no cloud uploads.`,
    howTo: [
      "Photo upload karein (JPG, PNG, WebP)",
      "Target KB value enter karein (jaise 50 for SSC)",
      "Preview mein output quality check karein",
      "Satisfied ho toh download karein",
      "Agar zyada compress hogi toh original resize karke dobara try karo",
    ],
    faqs: [
      { q: "SSC photo ke liye kitne KB chahiye?", a: "SSC photo 20KB se 50KB ke beech honi chahiye, JPEG format mein. Signature 10KB se 20KB ke beech." },
      { q: "50KB se neeche compress karne par quality kharab hogi kya?", a: "Thodi hogi, lekin 20-50KB range mein compress karne par photo acceptable quality mein rehti hai. Form rejection photo quality se nahi, size se hota hai." },
      { q: "PNG compress hogi ya sirf JPG?", a: "PNG bhi compress hoti hai, lekin JPG mein convert karke better compression milti hai exam portals ke liye." },
      { q: "Phone se seedha upload kar sakta hun?", a: "Haan, mobile browser se seedha upload karo. Tool aapke phone par bhi kaam karta hai." },
      { q: "File kabhi server pe jaati hai kya?", a: "Bilkul nahi. Saari processing aapke browser memory mein hoti hai. Page load hone ke liye internet chahiye hota hai, lekin load hone ke baad photo processing bina internet ya data transfer ke aapke device par execute hoti hai." },
    ],
    relatedTools: ["smart-resizer", "compress-50", "compress-20", "ssc-photo"],
  },

  "resize-pixel": {
    metaTitle: "Resize Image in Pixels — Set Exact Width & Height Online | SarkariPixels",
    metaDesc: "Resize any photo to exact pixel dimensions online. Free, instant, browser-based. Enter width & height in pixels for SSC, IBPS, UPSC portals.",
    h1: "Resize Image to Exact Pixel Dimensions",
    description: `Scale images to exact pixel dimensions required by portals like IBPS (200 × 230 px), UPSC (350 × 350 px), and NTA NEET.

Supports aspect ratio locking to avoid facial distortion and provides instant canvas preview. Processes locally without uploading files.`,
    howTo: [
      "Photo upload karein",
      "Width pixels enter karein",
      "Height pixels enter karein",
      "Aspect ratio lock/unlock chunein",
      "Resize karein aur download karein",
    ],
    faqs: [
      { q: "IBPS photo ke liye exact pixels?", a: "IBPS PO/Clerk photo 200×230 pixels, 20-50KB JPG." },
      { q: "UPSC ka square format?", a: "UPSC minimum 350×350 pixels, maximum 1000×1000 pixels, 20-300KB." },
      { q: "Resize karne ke baad KB automatically kam hogi?", a: "Haan, small dimensions = smaller file. Lekin agar nahi hui toh Reduce KB tool use karo." },
      { q: "Pixels aur CM mein kya fark hai?", a: "1 cm ≈ 37.8 pixels at 96dpi, ya ≈ 118 pixels at 300dpi (print quality). Exam portals usually pixels specify karte hain." },
      { q: "Kya batch resize possible hai?", a: "Abhi single image resize hoti hai. Batch tool jald aayega." },
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "resize-cm"],
  },

  "collage-maker": {
    metaTitle: "Photo Collage Maker — Create Grid Collage Free Online | SarkariPixels",
    metaDesc: "Make photo collages online. Choose grid layout, drag and drop photos. Free, no signup, no upload. Download high-quality PNG/JPG collage.",
    h1: "Photo Collage Maker — Free Grid Layout Builder",
    description: `Combine multiple images into customizable grid layouts (2×1, 2×2, 3×1) for document verification and multi-page ID previews.

Adjust spacing, borders, and backgrounds entirely in-browser. For joint photo-and-signature exam submissions, use the dedicated Merge Photo & Signature tool.`,
    howTo: [
      "Grid layout chunein (2×1, 2×2, 3×2 etc.)",
      "Har cell mein photo drag karein ya click karein",
      "Spacing aur border adjust karein",
      "Background color chunein",
      "Download karein",
    ],
    faqs: [
      { q: "Kya passport photo grid banana possible hai?", a: "Haan! 2×3 grid select karo, ek photo 6 baar add karo — printable sheet ready." },
      { q: "Max kitni photos ek collage mein?", a: "Currently 9 photos tak (3×3 grid). Bade grids jald." },
      { q: "Output quality kaisi hogi?", a: "Input photos ki quality se determine hogi. Achhe photos → achha output." },
      { q: "Social media ke liye sizes hain?", a: "Custom dimensions set kar sakte ho — Instagram 1:1, Twitter 16:9 sab." },
    ],
    relatedTools: ["passport-maker", "merge-photo-sig", "join-images"],
  },

  "generate-signature": {
    metaTitle: "Generate Digital Signature — Type or Draw Online | SarkariPixels",
    metaDesc: "Create digital signature online by typing your name or drawing. Export as JPG/PNG for exam forms. Free, instant, no login needed.",
    h1: "Generate Digital Signature — Type or Draw",
    description: `Create clean digital signatures for exam applications via handwriting font typing or direct touchscreen/mouse drawing.

Exports high-contrast signatures on crisp white or transparent backgrounds conforming to SSC (4 × 2 cm) and state PSC portal standards. Runs entirely in your browser without storing signatures.`,
    howTo: [
      "'Type' ya 'Draw' tab chunein",
      "Naam type karein ya signature draw karein",
      "Font/color customize karein",
      "Size adjust karein (SSC: 4×2cm, BSSC: 3.5×1.5cm)",
      "Download karein JPG ya PNG mein",
    ],
    faqs: [
      { q: "SSC signature ka exact size?", a: "SSC signature 4.0cm × 2.0cm, 10-20KB, JPG format." },
      { q: "BSSC ke liye Hindi signature chahiye?", a: "Haan, BSSC aur kuch state exams Hindi signature bhi maangte hain. Is tool mein Hindi text type kar sakte ho." },
      { q: "Typed signature portal accept karega?", a: "Zyada tar portals karte hain jab tak clearly readable ho aur background white ho. Kuch portals specifically handwritten demand karte hain." },
      { q: "Transparent background export?", a: "Haan, PNG format mein transparent background option hai." },
    ],
    relatedTools: ["resize-signature", "merge-photo-sig", "reduce-kb"],
  },

  "increase-kb": {
    metaTitle: "Increase Image Size in KB — Add File Size Safely | SarkariPixels",
    metaDesc: "Increase image KB size to meet minimum file size requirements for exam portals. Understand re-encoding risks and safe pixel scaling methods. Free.",
    h1: "Increase Image File Size in KB",
    description: `Kuch exam portals minimum file size enforce karte hain — jaise "photo must be between 20KB and 50KB." Agar photo 8KB hai toh portal "file too small" error dekar upload reject kar deta hai.

Yeh tool dummy byte padding add karta hai file footprint badhaane ke liye bina image visual alter kiye.

Important Disclosure: Dhyan rahe ki kayi recruitment portals (jaise SSC aur state PSCs) image upload hone par server par auto-recompress karte hain. Agar photo sirf padding bits se badhayi gayi hai, toh portal compression un dummy bytes ko strip kar sakti hai aur photo wapas choti ho jayegi. Genuine file size increase ke liye hamara Resize Image Pixel tool use karke physical dimensions (pixels) ko upscale karein.`,
    howTo: [
      "Photo upload karein",
      "Target minimum KB enter karein (jaise 20KB ya 50KB)",
      "Process karein aur target file size preview dekhein",
      "Download karein — agar portal re-compress kare toh physical pixel scale tool use karein",
    ],
    faqs: [
      { q: "Kya portal padded KB image ko reject kar sakta hai?", a: "Haan, agar portal upload hone par server-side re-compression run karta hai, toh dummy padding bytes strip ho sakti hain aur size wapas minimum se kam ho sakta hai. Is risk se bachne ke liye physical pixel dimensions upscale karein (Resize Image Pixel tool)." },
      { q: "Photo quality kharab hogi increase karne se?", a: "Nahi. Original visual clarity preserve rehti hai." },
      { q: "Kab zaroorat padti hai size increase ki?", a: "Jab portal 'file too small' error de — jaise UPSC ya RRB ka minimum 20KB requirement." },
      { q: "Genuine size badhane ka sabse safe tarika kya hai?", a: "Resize Image Pixel tool use karke width aur height ko proportionately 10-20% bada dein, ya camera ki higher resolution wali photo select karein." },
    ],
    relatedTools: ["resize-pixel", "reduce-kb", "compress-20"],
  },

  "photo-enhancer": {
    metaTitle: "Smart Photo Enhancer — Improve Contrast & Clarity Online | SarkariPixels",
    metaDesc: "Enhance dark or dull photos online. Auto-adjust brightness, contrast, and sharpness with smart browser filters. Free, instant, zero upload.",
    h1: "Smart Photo Enhancer — Auto Brightness & Contrast Fix",
    description: `Phone camera se dark ya flat photo aayi? Room lighting achi nahi thi? Yeh tool automatic contrast enhancement, brightness correction, aur sharpening apply karta hai.

Khas taur par useful jab photo thodi dark ho aur face clearly visible na ho — jo ID verification mein rejection cause karta hai. Processing browser mein hoti hai Canvas API se.`,
    howTo: [
      "Photo upload karein",
      "Auto-enhance click karein ya sliders manually adjust karein",
      "Before/after preview check karein",
      "Download karein",
    ],
    faqs: [
      { q: "Kya yeh tool AI use karta hai?", a: "Nahi, yeh tool deterministic Canvas smart filters use karta hai — histogram equalization aur adaptive contrast sharpening. Deep learning model nahi hai, sabhi adjustments aapke browser mein localized algorithms se hote hain bina koi photo upload kiye." },
      { q: "Bahut dark photo theek hogi?", a: "Partially. Extreme underexposure ka perfect fix nahi hai. Decent result ke liye original mein kuch detail honi chahiye." },
      { q: "Enhance karne se file size badhegi?", a: "Thodi badh sakti hai. Reduce KB tool baad mein use karo agar zaroorat ho." },
    ],
    relatedTools: ["unblur", "retouch", "reduce-kb"],
  },

  "resize-signature": {
    metaTitle: "Resize Signature Image — Exact Size for Exam Forms | SarkariPixels",
    metaDesc: "Resize signature image to exact dimensions for SSC, BPSC, IBPS, UPSC online forms. Set pixels or cm. Free, instant, browser-based.",
    h1: "Resize Signature to Exact Exam Form Size",
    description: `Signature image already hai lekin portal exact dimensions maang raha hai? Yeh tool signature ko crop ya resize karta hai white background preserve karte hue.

SSC signature: 400×200 px ya 4×2 cm. BSSC: 350×150 px. IBPS: 140×60 px. Sab preset available hain ya custom size enter karo.`,
    howTo: [
      "Signature image upload karein",
      "Exam preset chunein ya custom dimensions",
      "Preview confirm karein",
      "JPG download karein",
    ],
    faqs: [
      { q: "SSC signature ka size?", a: "SSC ke liye signature 4.0cm × 2.0cm (approximately 472×236 px at 300 DPI), 10-20KB." },
      { q: "IBPS signature size?", a: "IBPS signature 140×60 pixels, 10-20KB, JPG." },
      { q: "Kya signature white background pe aani chahiye?", a: "Haan, sabhi exam portals white background demand karte hain. Original scan dark background pe ho toh Remove Background tool pehle use karo." },
    ],
    relatedTools: ["generate-signature", "reduce-kb", "merge-photo-sig"],
  },

  "resize-cm": {
    metaTitle: "Resize Image in Centimeters — Exact CM Dimensions Online | SarkariPixels",
    metaDesc: "Resize photo to exact centimeter dimensions for passport, SSC, UPSC, PAN card. Set DPI for print quality. Free, instant.",
    h1: "Resize Image in Centimeters",
    description: `Exam notifications mein aksar centimeters mein size mention hoti hai — "3.5 × 4.5 cm at 300 DPI." Is tool mein direct CM enter karo, DPI set karo, aur pixel conversion automatic hoti hai.

Print ke liye DPI matter karta hai — 300 DPI standard professional quality hai, 96 DPI screen ke liye okay hai.`,
    howTo: [
      "Photo upload karein",
      "Width aur Height CM mein enter karein",
      "DPI set karein (300 for print, 96 for screen)",
      "Resize karein aur download karein",
    ],
    faqs: [
      { q: "3.5 cm × 4.5 cm kitne pixels hain?", a: "At 300 DPI: 413 × 531 pixels. At 96 DPI: 132 × 170 pixels." },
      { q: "DPI change karne se file size badlegi?", a: "Nahi necessarily. DPI metadata change hota hai, actual pixels depend karte hain width/height values pe." },
      { q: "Kya sirf metadata DPI badal sakte hain?", a: "Haan, Convert DPI tool use karo agar sirf metadata badge karna ho." },
    ],
    relatedTools: ["resize-35-45", "convert-dpi", "ssc-photo", "smart-resizer"],
  },

  "resize-35-45": {
    metaTitle: "Resize to 3.5cm × 4.5cm — SSC UPSC RRB Passport Photo Size | SarkariPixels",
    metaDesc: "Instantly resize photo to 3.5cm × 4.5cm for SSC, RRB, BPSC, BSSC exams. Free one-click tool. Browser-based, no file upload.",
    h1: "Resize Photo to 3.5 × 4.5 cm (SSC/RRB Standard)",
    description: `Resize photos to the standard 3.5 × 4.5 cm proportion required by SSC (CGL, CHSL, MTS), RRB, BPSC, and state PSC portals.

Automatically scales dimensions to 413 × 531 pixels (equivalent to 300 DPI print clarity). To encode binary JFIF DPI tags into image metadata, use our dedicated Convert DPI tool.`,
    howTo: [
      "Apni photo upload karein",
      "'Resize to 3.5×4.5 cm' button dabayein",
      "Preview dekho — chehra centrally visible hona chahiye",
      "Download karein",
      "Agar KB limit cross ho, Reduce KB tool use karo",
    ],
    faqs: [
      { q: "SSC CGL photo ka exact size kya hai?", a: "SSC CGL photo: 3.5 cm × 4.5 cm, 20-50KB, JPG/JPEG format, white background." },
      { q: "Is size mein kitne pixels hain?", a: "At 300 DPI print quality: 413 × 531 pixels. Portal usually both accept karta hai." },
      { q: "RRB NTPC ke liye bhi same size?", a: "Haan, RRB ka photo requirement bhi 3.5×4.5cm hai." },
      { q: "Output automatically white background hogi?", a: "Photo ka original background preserve hoga. White background ke liye Remove Background tool pehle use karo." },
      { q: "Compress karne ki zaroorat padegi resize ke baad?", a: "Aksar padti hai. Agar output 50KB se zyada hai toh compress-50 tool use karo." },
    ],
    relatedTools: ["reduce-kb", "compress-50", "ssc-photo", "remove-bg"],
  },

  // ── Basic Editing ────────────────────────────────────────────────────────

  "blur-bg": {
    metaTitle: "Blur Background Online — Portrait Focus Effect | SarkariPixels",
    metaDesc: "Blur the background of any photo online. Keep face sharp, blur background. Free, instant, browser-based.",
    h1: "Blur Photo Background Online",
    description: `Portrait photo mein professional look chahiye? Background blur karo, face sharp rakho. Ek slider se intensity control hoti hai — light blur se heavy bokeh effect tak.

Exam ID photos ke liye typically background blur avoid karo — white background mandatory hai. Yeh tool profile photos, social media, aur general photography ke liye best hai.`,
    howTo: ["Photo upload karein", "Blur intensity slider adjust karein", "Preview check karein", "Download karein"],
    faqs: [
      { q: "Exam photo mein background blur use kar sakte hain?", a: "Nahi. Exam photos mein plain white background mandatory hai. Blur mat lagao — Remove Background tool use karo." },
      { q: "Face automatically detect hota hai?", a: "Basic detection hai. Best results: face photo ke center mein ho." },
    ],
    relatedTools: ["remove-bg", "photo-enhancer", "add-border"],
  },

  "remove-bg": {
    metaTitle: "Remove Background Online — White Background for Exam Photos | SarkariPixels",
    metaDesc: "Remove image background and replace with white. Perfect for SSC, UPSC, IBPS exam photos. Free, instant, browser-based Canvas processing.",
    h1: "Remove Background — Replace with White for Exam Photos",
    description: `Agar aapki photo ka background plain white nahi hai, toh remove/replace karna pad sakta hai. Yeh tool browser-based background removal karta hai — local processing, no cloud AI.

Note: Accurate background removal ke liye clear contrast chahiye between subject and background. Studio-quality green screen ya even lighting best results deti hai. Complex backgrounds ke liye manual touch-up shayad zaroorat ho.`,
    howTo: [
      "Photo upload karein",
      "Auto-remove background click karein",
      "White background preview dekho",
      "Manual touch-up karo agar zaroorat ho",
      "Download karein",
    ],
    faqs: [
      { q: "Accuracy kitni achhi hai?", a: "Simple backgrounds (grey, beige, outdoor solid) pe achha kaam karta hai. Busy backgrounds pe manual correction shayad chahiye." },
      { q: "Transparent background export ho sakta hai?", a: "Haan, PNG format mein transparent background available hai." },
      { q: "Kya yeh professional background removal tools jaisa hai?", a: "Browser-based limitations hain. Studio background removers better hain. Lekin exam photos ke liye — decent backgrounds par — kaafi achha kaam karta hai." },
    ],
    relatedTools: ["blur-bg", "passport-maker", "resize-35-45"],
  },

  "remove-object": {
    metaTitle: "Remove Object from Photo Online | SarkariPixels",
    metaDesc: "Remove unwanted objects, stickers, or marks from photos. Brush to select, fill with background. Free browser-based inpainting tool.",
    h1: "Remove Object or Mark from Photo",
    description: `Photo mein koi unwanted object, ink mark, ya sticker hai? Brush tool se select karo aur tool surrounding colors se fill karta hai. Basic inpainting — studio-quality results ke liye professional software better hai.`,
    howTo: ["Photo upload karein", "Brush size select karo", "Remove karne wala area paint karo", "Apply karo", "Download karein"],
    faqs: [
      { q: "Kya yeh ID photo ke daag/marks hata sakta hai?", a: "Chhote marks ke liye haan. Large areas ke liye quality compromise hogi." },
    ],
    relatedTools: ["remove-bg", "blemish-remover", "photo-enhancer"],
  },

  "add-name-dob": {
    metaTitle: "Add Name & DOB on Photo — UPSC Stamp | SarkariPixels",
    metaDesc: "Add candidate name and date of birth as text strip at bottom of photo. Required by UPSC and some state PSCs. Free, instant.",
    h1: "Add Name & DOB on Photo (UPSC Requirement)",
    description: `UPSC aur kuch state PSCs require karte hain ki photo ke neeche candidate ka naam aur photo ki date print ho. Yeh tool ek clean white strip add karta hai photo ke neeche mein candidate name aur date ke saath.

Font, size, aur spacing customize ho sakta hai. Output print-ready quality mein hoti hai.`,
    howTo: [
      "Photo upload karein",
      "Candidate name aur date enter karein",
      "Font size adjust karein",
      "Preview check karein — text clearly readable hona chahiye",
      "Download karein",
    ],
    faqs: [
      { q: "UPSC photo ki requirement kya hai?", a: "UPSC: white border at bottom with candidate name and date of photograph. Exact format notification mein check karo." },
      { q: "Date format kya use karein?", a: "DD/MM/YYYY format safe hai. Notification mein specify ho toh wahi follow karo." },
    ],
    relatedTools: ["resize-600-600", "upsc-photo-resize", "compress-300"],
  },

  "rotate-image": {
    metaTitle: "Rotate Image Online — 90°, 180°, 270° Free | SarkariPixels",
    metaDesc: "Rotate photos clockwise or anticlockwise online. Free instant tool. Fix sideways photos from phone camera.",
    h1: "Rotate Image Online",
    description: `Phone se khinchi photo sideways aa gayi? 90° ya 180° rotate karo instantly. Lossless rotation — image quality affect nahi hoti.`,
    howTo: ["Photo upload karein", "Rotate angle chunein (90°, 180°, 270°)", "Download karein"],
    faqs: [
      { q: "Rotation lossless hai?", a: "JPG rotation approximately lossless hai, PNG perfectly lossless." },
    ],
    relatedTools: ["flip-image", "free-crop", "smart-resizer"],
  },

  "flip-image": {
    metaTitle: "Flip Image Online — Mirror Horizontal or Vertical | SarkariPixels",
    metaDesc: "Flip or mirror photos online. Horizontal or vertical flip. Free, instant, browser-based.",
    h1: "Flip Image — Mirror Horizontal or Vertical",
    description: `Photo mirror karo — horizontally (left-right) ya vertically (top-bottom). Signature mirror correction ke liye bhi useful.`,
    howTo: ["Photo upload karein", "Horizontal ya Vertical flip chunein", "Download karein"],
    faqs: [
      { q: "Signature flip karna kab zaroorat?", a: "Jab scan se aayi signature mirror aaye — horizontal flip se correct ho jaati hai." },
    ],
    relatedTools: ["rotate-image", "smart-resizer"],
  },

  "watermark-image": {
    metaTitle: "Add Watermark to Image — Text or Logo Overlay | SarkariPixels",
    metaDesc: "Add transparent text watermark to photos online. Custom position, opacity, font. Free, browser-based.",
    h1: "Add Watermark to Image",
    description: `Photo par copyright text ya naam add karo. Position (center, corner), opacity, font size sab customize ho sakta hai.`,
    howTo: ["Photo upload karein", "Watermark text enter karein", "Position aur opacity set karein", "Download karein"],
    faqs: [
      { q: "Exam photos mein watermark lagana chahiye?", a: "Nahi! Exam ID photos mein koi watermark nahi hona chahiye. Yeh tool personal/professional photos ke liye hai." },
    ],
    relatedTools: ["add-text", "add-logo"],
  },

  "free-crop": {
    metaTitle: "Freehand Crop Image Online — Custom Crop Area | SarkariPixels",
    metaDesc: "Crop photos freely online. Drag crop handles to any size and position. Download cropped image instantly.",
    h1: "Freehand Crop Tool",
    description: `Photo ko kisi bhi custom area mein crop karo. Drag karo four corners ko — koi fixed aspect ratio nahi. Jab free crop chahiye tabhi yeh use karo; ID photos ke liye square ya preset ratio crop better hai.`,
    howTo: ["Photo upload karein", "Crop handles drag karo", "Apply karo", "Download karein"],
    faqs: [],
    relatedTools: ["square-crop", "circle-crop", "passport-maker"],
  },

  "circle-crop": {
    metaTitle: "Circle Crop Image Online — Round Photo Frame | SarkariPixels",
    metaDesc: "Crop photo into perfect circle online. Transparent PNG background. Profile photos, social media, avatars.",
    h1: "Circle Crop — Round Photo Frame",
    description: `Photo ko perfect circle mein crop karo. Output PNG mein transparent background ke saath — social media profiles, WhatsApp DP, aur decorative use ke liye.

Note: Exam ID photos ke liye circle crop mat use karo — rectangular format required hota hai.`,
    howTo: ["Photo upload karein", "Circle center position karo", "Crop karo", "PNG download karein"],
    faqs: [
      { q: "Exam photo ke liye use kar sakte hain?", a: "Nahi. Exam portals rectangular photos accept karte hain." },
    ],
    relatedTools: ["free-crop", "square-crop"],
  },

  "square-crop": {
    metaTitle: "Square Crop Image Online — 1:1 Aspect Ratio | SarkariPixels",
    metaDesc: "Crop image to perfect square online. Ideal for UPSC passport photos, Instagram, profile pictures. Free, instant.",
    h1: "Square Crop — 1:1 Aspect Ratio",
    description: `Photo ko perfect square mein crop karo — UPSC ka square format, Instagram posts, WhatsApp DP sab ke liye. UPSC ke liye crop ke baad UPSC Photo Resize tool use karo exact dimensions ke liye.`,
    howTo: ["Photo upload karein", "Square crop area position karo", "Apply karo", "Download karein"],
    faqs: [
      { q: "UPSC ke liye square crop zaroorat?", a: "Haan, UPSC square photo maangta hai. Crop ke baad UPSC Photo tool se resize aur compress karo." },
    ],
    relatedTools: ["upsc-photo-resize", "resize-600-600", "compress-300"],
  },

  "merge-photo-sig": {
    metaTitle: "Merge Photo & Signature — Combined Form Upload | SarkariPixels",
    metaDesc: "Merge candidate photo and signature side by side or stacked. Create combined image for offline forms. Free, browser-based.",
    h1: "Merge Photo & Signature for Form Submission",
    description: `Kuch offline forms ya institutions photo aur signature ek combined image mein maangte hain. Is tool mein dono ko side-by-side ya vertical stack mein merge karo.`,
    howTo: ["Photo upload karein", "Signature upload karein", "Layout chunein (side/stacked)", "Download karein"],
    faqs: [],
    relatedTools: ["generate-signature", "passport-maker"],
  },

  "join-images": {
    metaTitle: "Join Multiple Images — Stitch Photos Together Online | SarkariPixels",
    metaDesc: "Join multiple photos horizontally or vertically online. Create long image strips. Free, browser-based.",
    h1: "Join Multiple Images — Horizontal or Vertical Stitch",
    description: `Multiple photos ko ek strip mein join karo — horizontal ya vertical. Documents ke multiple pages ko ek image mein combine karne ke liye useful.`,
    howTo: ["Photos upload karein", "Orientation chunein", "Join karein", "Download karein"],
    faqs: [],
    relatedTools: ["collage-maker", "split-image"],
  },

  "split-image": {
    metaTitle: "Split Image Online — Cut Photo in Half | SarkariPixels",
    metaDesc: "Split scanned documents or photos into halves. Horizontal or vertical split. Free, browser-based.",
    h1: "Split Image — Cut in Half",
    description: `Ek scan mein do pages aa gaye? Photo ko horizontally ya vertically split karo do alag files mein.`,
    howTo: ["Photo upload karein", "Split direction chunein", "Split karo", "Dono parts download karein"],
    faqs: [],
    relatedTools: ["join-images", "free-crop"],
  },

  "color-picker": {
    metaTitle: "Image Color Picker — Get Hex Code from Photo | SarkariPixels",
    metaDesc: "Pick any color from an image. Get HEX, RGB, HSL values. Free online eyedropper tool.",
    h1: "Image Color Picker — Eyedropper Tool",
    description: `Photo mein kisi bhi pixel ka exact color code nikalo — HEX, RGB, HSL format mein. Design aur branding work ke liye useful.`,
    howTo: ["Photo upload karein", "Kisi bhi pixel par click karo", "Color code copy karo"],
    faqs: [],
    relatedTools: ["add-text", "add-border"],
  },

  "edit-metadata": {
    metaTitle: "Edit Image Metadata — Set Author, Title, DPI | SarkariPixels",
    metaDesc: "Edit EXIF metadata of images online. Set author name, title, DPI, copyright. Browser-based, no upload.",
    h1: "Edit Image Metadata — EXIF Editor",
    description: `Photo ka EXIF metadata edit karo — author name, title, DPI, copyright sab set kar sakte ho. PAN card applications ke liye DPI 300 set karna bhi isi se hota hai.`,
    howTo: ["Photo upload karein", "Fields fill karo", "Save karein", "Download karein"],
    faqs: [
      { q: "PAN card ke liye DPI 300 kaise set karein?", a: "Edit Metadata tool mein DPI field mein 300 enter karo. Ya Convert DPI tool use karo." },
    ],
    relatedTools: ["convert-dpi", "view-metadata", "remove-metadata"],
  },

  "view-metadata": {
    metaTitle: "View Image Metadata — Check EXIF & DPI | SarkariPixels",
    metaDesc: "View EXIF metadata, DPI, dimensions, camera info of any image. Free online EXIF viewer.",
    h1: "View Image Metadata & EXIF Info",
    description: `Photo ka EXIF data dekho — camera model, DPI, creation date, dimensions, GPS info (agar present ho). Privacy check ke liye bhi useful — share karne se pehle metadata dekh lo.`,
    howTo: ["Photo upload karein", "Metadata automatically display hoga"],
    faqs: [],
    relatedTools: ["remove-metadata", "edit-metadata", "convert-dpi", "check-dpi"],
  },

  "remove-metadata": {
    metaTitle: "Remove Image Metadata — Strip EXIF Data Privacy | SarkariPixels",
    metaDesc: "Remove all EXIF metadata from photos. Strip GPS location, camera info, timestamps. Privacy protection. Free, browser-based.",
    h1: "Remove Image Metadata — Privacy EXIF Strip",
    description: `Phone camera photos mein GPS location, camera serial number, aur personal info hidden hoti hai EXIF mein. Share karne se pehle metadata erase karo privacy ke liye.`,
    howTo: ["Photo upload karein", "Strip Metadata click karein", "Clean photo download karein"],
    faqs: [],
    relatedTools: ["view-metadata", "edit-metadata"],
  },

  "crop-png": {
    metaTitle: "Crop PNG with Transparency — Alpha Channel Preserved | SarkariPixels",
    metaDesc: "Crop PNG images while preserving transparency. Alpha channel maintained. Free, browser-based.",
    h1: "Crop PNG — Transparency Preserved",
    description: `PNG crop karo transparent background preserve karte hue. Alpha channel intact rehta hai — logos, watermarks, aur UI assets ke liye perfect.`,
    howTo: ["PNG upload karein", "Crop area select karo", "Download karein (PNG with transparency)"],
    faqs: [],
    relatedTools: ["free-crop", "circle-crop"],
  },

  // ── Effects ──────────────────────────────────────────────────────────────

  "beautify": {
    metaTitle: "Beautify Photo Online — Smooth Skin Face Retouch | SarkariPixels",
    metaDesc: "Beautify and smooth skin in photos online. Reduce blemishes, soften skin texture. Free, browser Canvas filters.",
    h1: "Beautify Photo — Skin Smoothing",
    description: `Photo mein skin smooth karo, minor blemishes reduce karo. Slider se intensity control — subtle se heavy beautification tak.`,
    howTo: ["Photo upload karein", "Beautify slider adjust karein", "Download karein"],
    faqs: [],
    relatedTools: ["blemish-remover", "retouch", "photo-enhancer"],
  },

  "unblur": {
    metaTitle: "Unblur Image Online — Sharpen Blurry Photos | SarkariPixels",
    metaDesc: "Sharpen and unblur photos online. Improve clarity of blurry text or faces. Free, browser-based Canvas sharpening.",
    h1: "Unblur Image — Sharpen Blurry Photos",
    description: `Slightly blurry ya out-of-focus photo ko sharpen karo. Unsharp mask algorithm use hota hai — Canvas-based, fast, private.

Note: Severely blurry photos fully recover nahi hoti. Moderate blur correction ke liye best.`,
    howTo: ["Photo upload karein", "Sharpness slider adjust karein", "Download karein"],
    faqs: [],
    relatedTools: ["photo-enhancer", "super-res", "increase-quality"],
  },

  "blur-image": {
    metaTitle: "Blur Entire Image Online — Gaussian Blur Effect | SarkariPixels",
    metaDesc: "Apply Gaussian blur to entire photo online. Artistic blur effect. Free, instant browser tool.",
    h1: "Blur Image — Full Gaussian Blur Effect",
    description: `Puri photo par blur apply karo — artistic effect ya privacy protection ke liye. Intensity slider se light blur se heavy blur tak control.`,
    howTo: ["Photo upload karein", "Blur intensity chunein", "Download karein"],
    faqs: [],
    relatedTools: ["blur-bg", "blur-face", "pixelate"],
  },

  "blur-face": {
    metaTitle: "Blur Face in Photo Online — Privacy Face Blur | SarkariPixels",
    metaDesc: "Blur face region in photos for privacy. Auto oval face blur. Free, browser-based tool.",
    h1: "Blur Face — Privacy Protection",
    description: `Photo mein face region blur karo privacy ke liye — social media posts, press photos ya documentation mein person ki identity protect karne ke liye.`,
    howTo: ["Photo upload karein", "Face region select karo", "Blur apply karo", "Download karein"],
    faqs: [],
    relatedTools: ["pixelate-face", "censor-photo", "blur-image"],
  },

  "unblur-face": {
    metaTitle: "Unblur Face in Photo — Sharpen Face Region | SarkariPixels",
    metaDesc: "Sharpen blurry face in photo online. Selective face sharpening. Free, browser-based.",
    h1: "Unblur Face — Selective Face Sharpening",
    description: `Face region specifically sharpen karo — background soft rehti hai, face detail improve hoti hai. Useful jab camera shake face ko blur kar de.`,
    howTo: ["Photo upload karein", "Face region paint karo", "Sharpen apply karo", "Download karein"],
    faqs: [],
    relatedTools: ["unblur", "beautify", "photo-enhancer"],
  },

  "add-border": {
    metaTitle: "Add Border to Image Online — Custom Color & Width | SarkariPixels",
    metaDesc: "Add colored border frame to photos online. Custom width, color, style. Free, instant browser tool.",
    h1: "Add Border to Image",
    description: `Photo ke around custom border add karo — solid color, width specify karo. Profile photos, certificates, aur presentation images ke liye.`,
    howTo: ["Photo upload karein", "Border width set karo", "Color chunein", "Download karein"],
    faqs: [],
    relatedTools: ["add-white-border", "add-text"],
  },

  "pixelate": {
    metaTitle: "Pixelate Image Online — Mosaic Pixel Art Effect | SarkariPixels",
    metaDesc: "Pixelate any photo online. Create mosaic or pixel art effect. Adjustable pixel block size. Free, browser-based.",
    h1: "Pixelate Image — Mosaic Effect",
    description: `Photo par mosaic pixelation effect lagao — artistic look ya privacy blur ke liye. Block size slider se fine to heavy pixelation control.`,
    howTo: ["Photo upload karein", "Pixel block size adjust karo", "Download karein"],
    faqs: [],
    relatedTools: ["pixelate-face", "blur-image", "pixel-art"],
  },

  "pixelate-face": {
    metaTitle: "Pixelate Face in Photo — Censor Face Online | SarkariPixels",
    metaDesc: "Pixelate or mosaic blur face in photo for privacy. Free, browser-based face censoring tool.",
    h1: "Pixelate Face — Privacy Censoring",
    description: `Face ko pixel blocks se censor karo. Social media, journalism, ya documentation mein person ki identity hide karne ke liye standard technique.`,
    howTo: ["Photo upload karein", "Face area select karo", "Pixelate apply karo", "Download karein"],
    faqs: [],
    relatedTools: ["blur-face", "censor-photo"],
  },

  "censor-photo": {
    metaTitle: "Censor Photo — Black Bar Redaction Tool | SarkariPixels",
    metaDesc: "Add black bars to censor sensitive areas in photos. Journalism and legal redaction tool. Free, browser-based.",
    h1: "Censor Photo — Black Bar Redaction",
    description: `Sensitive areas par black bars lagao — legal documents, press photos, aur privacy redaction ke liye. Brush karo aur solid black fill hoti hai.`,
    howTo: ["Photo upload karein", "Censor area paint karo", "Download karein"],
    faqs: [],
    relatedTools: ["blur-face", "pixelate-face"],
  },

  "motion-blur": {
    metaTitle: "Motion Blur Effect Online — Speed Blur Photo | SarkariPixels",
    metaDesc: "Add motion blur effect to photos online. Simulate speed or movement. Adjustable direction and intensity.",
    h1: "Motion Blur — Speed Effect",
    description: `Photo par directional motion blur add karo — speed feeling ya artistic effect ke liye. Direction aur intensity adjust karo.`,
    howTo: ["Photo upload karein", "Blur direction chunein", "Intensity set karo", "Download karein"],
    faqs: [],
    relatedTools: ["blur-image", "blur-bg"],
  },

  "grayscale": {
    metaTitle: "Grayscale Image Online — Convert to Black & White | SarkariPixels",
    metaDesc: "Convert photo to grayscale online. Remove all color channels. Free, instant, browser-based.",
    h1: "Grayscale Image — Remove Color",
    description: `Photo ke colors remove karo aur grayscale (50 shades of grey) mein convert karo. Classic photography look ya document scan conversion ke liye.`,
    howTo: ["Photo upload karein", "Grayscale apply karein", "Download karein"],
    faqs: [],
    relatedTools: ["black-white", "photo-enhancer"],
  },

  "black-white": {
    metaTitle: "Black & White Photo — High Contrast Threshold Effect | SarkariPixels",
    metaDesc: "Convert photo to pure black and white (binary threshold). Strong contrast B&W effect. Free, browser-based.",
    h1: "Black & White — High Contrast Effect",
    description: `Pure black aur white — grayscale nahi, binary threshold. Signature scan clarity improve karne ke liye ya graphic art effect ke liye useful.`,
    howTo: ["Photo upload karein", "Threshold slider adjust karo", "Download karein"],
    faqs: [
      { q: "Signature scan ke liye useful?", a: "Haan! Scan ki hui signature mein background noise remove karne ke liye threshold use karo — clean black signature on white milti hai." },
    ],
    relatedTools: ["grayscale", "unblur", "remove-bg"],
  },

  "pixel-art": {
    metaTitle: "Photo to Pixel Art — 8-bit Retro Style Online | SarkariPixels",
    metaDesc: "Convert photo to pixel art or retro 8-bit style online. Adjustable pixel size. Free, browser-based.",
    h1: "Photo to Pixel Art — Retro 8-bit Style",
    description: `Real photo ko pixelated 8-bit retro art mein convert karo. Fun social media content ya nostalgic aesthetic ke liye.`,
    howTo: ["Photo upload karein", "Pixel grid size chunein", "Convert karo", "Download karein"],
    faqs: [],
    relatedTools: ["pixelate", "grayscale"],
  },

  "add-white-border": {
    metaTitle: "Add White Border to Image — Frame Effect | SarkariPixels",
    metaDesc: "Add white border frame around photos online. Polaroid or print-ready look. Free, instant.",
    h1: "Add White Border to Image",
    description: `Photo ke around white border add karo — Polaroid style print look ya framing effect ke liye. Width customize karo.`,
    howTo: ["Photo upload karein", "Border width set karo", "Download karein"],
    faqs: [],
    relatedTools: ["add-border", "passport-maker"],
  },

  "ai-face": {
    metaTitle: "Dummy Face Avatar Generator — Procedural Face Creator | SarkariPixels",
    metaDesc: "Generate random procedural dummy face avatars online. Testing and placeholder use. Browser-based canvas generation.",
    h1: "Dummy Face Avatar Generator — Procedural Canvas Face",
    description: `Testing purposes ke liye random synthetic face avatar generate karo. UI prototyping, placeholder photos, ya demo content ke liye — real person ki photo nahi.`,
    howTo: ["Generate click karo", "Ek random avatar create hoga", "Download karo ya regenerate karo"],
    faqs: [
      { q: "Kya yeh real person hai?", a: "Nahi. Completely synthetic, procedural canvas drawing hai." },
    ],
    relatedTools: ["passport-maker", "photo-enhancer"],
  },

  "blemish-remover": {
    metaTitle: "Blemish Remover — Clear Skin Spot Remover | SarkariPixels",
    metaDesc: "Remove skin blemishes, spots and marks from photos online. Point-click spot healing. Free, browser-based.",
    h1: "Blemish Remover — Spot Healing",
    description: `Single blemishes, spots, ya small marks point-click se remove karo. Surrounding texture se blend hoti hai healing.`,
    howTo: ["Photo upload karein", "Blemish spot par click karo", "Auto-heal hoti hai", "Multiple spots ke liye repeat karo", "Download karein"],
    faqs: [],
    relatedTools: ["beautify", "retouch", "remove-object"],
  },

  "retouch": {
    metaTitle: "Retouch Image — Lighting & Balance Adjustment | SarkariPixels",
    metaDesc: "Retouch photos online. Adjust brightness, contrast, shadows, highlights. Free, browser-based photo editor.",
    h1: "Retouch Image — Lighting & Balance",
    description: `Photo ki lighting balance karo — brightness, contrast, shadows, highlights sab sliders se control. Professional retouching ke basic adjustments.`,
    howTo: ["Photo upload karein", "Sliders adjust karo", "Before/after compare karo", "Download karein"],
    faqs: [],
    relatedTools: ["photo-enhancer", "beautify", "unblur"],
  },

  "add-text": {
    metaTitle: "Add Text to Image Online — Custom Font & Color | SarkariPixels",
    metaDesc: "Add custom text overlay to photos online. Choose font, size, color, position. Free, browser-based tool.",
    h1: "Add Text to Image",
    description: `Photo par text overlay add karo — custom font, size, color, position. Captions, labels, ya name additions ke liye.`,
    howTo: ["Photo upload karein", "Text type karo", "Font aur color chunein", "Position drag karo", "Download karein"],
    faqs: [],
    relatedTools: ["add-name-dob", "watermark-image", "add-logo"],
  },

  "add-logo": {
    metaTitle: "Add Logo to Image Online — Overlay Branding | SarkariPixels",
    metaDesc: "Add logo or watermark image overlay to photos. Set position and opacity. Free, browser-based.",
    h1: "Add Logo to Image",
    description: `Photo par logo ya koi bhi image overlay karo — branding, watermarking ya composite images ke liye. Position aur opacity control.`,
    howTo: ["Base photo upload karein", "Logo image upload karein", "Position aur size adjust karo", "Opacity set karo", "Download karein"],
    faqs: [],
    relatedTools: ["watermark-image", "add-text"],
  },

  // ── DPI & Quality ────────────────────────────────────────────────────────

  "increase-quality": {
    metaTitle: "Increase Image Quality — Upscale Resolution Online | SarkariPixels",
    metaDesc: "Increase image quality and resolution online. Upscale small photos. Free, browser-based Canvas upscaling.",
    h1: "Increase Image Quality — Upscale",
    description: `Chhoti ya low-resolution photo ko upscale karo. Browser-based bicubic interpolation use hoti hai — professional AI upscalers jaisi quality nahi milegi, lekin moderate improvement hoga.`,
    howTo: ["Photo upload karein", "Scale factor chunein (2x, 4x)", "Process karo", "Download karein"],
    faqs: [],
    relatedTools: ["super-res", "unblur", "smart-resizer"],
  },

  "convert-dpi": {
    metaTitle: "Convert Image DPI — Set 200, 300, 600 DPI | SarkariPixels",
    metaDesc: "Change image DPI to 200, 300 or 600 for print and exam portals. PAN card, passport, SSC photo DPI fix. Free, browser-based.",
    h1: "Convert Image DPI — 200, 300, 600",
    description: `Photo ka DPI metadata change karo — 200, 300, ya 600. PAN card application ke liye 300 DPI mandatory hai.

Important: DPI metadata change karna actual pixels change nahi karta — sirf "print size" information badlti hai. Print karte waqt correct size ke liye yeh zaroorat padti hai.`,
    howTo: ["Photo upload karein", "Target DPI chunein (200/300/600)", "Convert karo", "Download karein"],
    faqs: [
      { q: "PAN card ke liye DPI kya set karein?", a: "PAN card application ke liye DPI 300 set karo." },
      { q: "DPI change se pixels badte hain?", a: "Nahi. Sirf metadata mein print resolution information badlti hai." },
      { q: "300 DPI pe print karne pe kaisi quality milegi?", a: "Photo resolution dependent hai. High-res photo + 300 DPI = professional print quality." },
    ],
    relatedTools: ["check-dpi", "pan-card-resize", "edit-metadata"],
  },

  "check-dpi": {
    metaTitle: "Check Image DPI Online — Verify Resolution | SarkariPixels",
    metaDesc: "Check image DPI and resolution online. Verify photo DPI before exam upload. Free, instant browser tool.",
    h1: "Check Image DPI — Verify Resolution",
    description: `Photo ka current DPI verify karo — exam upload se pehle confirm karo ki DPI requirements meet ho rahi hain. Dimensions, color mode, format sab bhi show hota hai.`,
    howTo: ["Photo upload karein", "DPI aur metadata instantly show hoga"],
    faqs: [
      { q: "Mere photo ka DPI kya hai?", a: "Photo upload karo — tool automatically DPI, dimensions aur format show karega." },
    ],
    relatedTools: ["convert-dpi", "view-metadata", "pan-card-resize"],
  },

  "super-res": {
    metaTitle: "Super Resolution — AI Upscale Image Quality | SarkariPixels",
    metaDesc: "Super resolution upscaling for photos online. Increase image size with detail enhancement. Free, browser-based.",
    h1: "Super Resolution — Upscale with Enhancement",
    description: `Advanced upscaling algorithm se photo ko 2x ya 4x bada karo detail preserve karte hue. Increase Quality tool se better output — slower processing.`,
    howTo: ["Photo upload karein", "Scale factor chunein", "Process karo (thoda time lagega)", "Download karein"],
    faqs: [],
    relatedTools: ["increase-quality", "unblur", "smart-resizer"],
  },

  // ── ID Sizes ─────────────────────────────────────────────────────────────

  "pass-photo-sizes": {
    metaTitle: "Passport Photo Sizes — All Formats Grid Sheet | SarkariPixels",
    metaDesc: "Create passport photo sheets in all standard sizes. 35x45mm, 2x2 inch, 3x4cm and more. Printable grid. Free.",
    h1: "Passport Photo — All Sizes Grid Sheet",
    description: `India aur international passport photo sizes sab ek jagah. 35×45mm (India), 2×2 inch (US), 35×35mm (UK) — jo bhi chahiye wo grid sheet banao.`,
    howTo: ["Photo upload karein", "Target size chunein", "Grid copies chunein", "Download karein"],
    faqs: [],
    relatedTools: ["passport-maker", "resize-35-45-mm", "resize-2-2"],
  },

  "resize-sign-6-2": {
    metaTitle: "Resize Signature 6cm × 2cm — 300 DPI Scale | SarkariPixels",
    metaDesc: "Resize signature to 6cm × 2cm (708 × 236 px equivalent to 300 DPI). Common signature size for Indian government forms. Free, instant.",
    h1: "Resize Signature to 6cm × 2cm",
    description: `Signature ko 6 cm × 2 cm dimension (708 × 236 px equivalent to 300 DPI print scale) mein resize karo. Agar portal explicit JFIF DPI header check karta hai toh hamara Convert DPI tool use karein.`,
    howTo: ["Signature upload karein", "Resize click karein", "Download karein"],
    faqs: [],
    relatedTools: ["resize-signature", "generate-signature", "reduce-kb"],
  },

  "resize-sign-35-45": {
    metaTitle: "Resize Signature 3.5cm × 4.5cm | SarkariPixels",
    metaDesc: "Resize signature to 3.5cm × 4.5cm online. Exact size for various government forms. Free, instant.",
    h1: "Resize Signature to 3.5cm × 4.5cm",
    description: `Signature ko 3.5 × 4.5 cm mein resize karo — kuch state PSC aur other government forms yeh non-standard signature size require karte hain.`,
    howTo: ["Signature upload karein", "Resize click karein", "Download karein"],
    faqs: [],
    relatedTools: ["resize-signature", "resize-35-45", "reduce-kb"],
  },

  "resize-50-20": {
    metaTitle: "Resize to 50mm × 20mm — Signature Size | SarkariPixels",
    metaDesc: "Resize photo or signature to 50mm × 20mm. Standard size for some bank and insurance forms. Free, instant.",
    h1: "Resize to 50mm × 20mm",
    description: `Photo ya signature ko 50 mm × 20 mm (5 cm × 2 cm) mein resize karo. Kuch banking aur insurance forms yeh dimension use karte hain.`,
    howTo: ["Image upload karein", "Resize click karein", "Download karein"],
    faqs: [],
    relatedTools: ["smart-resizer", "resize-cm"],
  },

  "resize-35-45-mm": {
    metaTitle: "Resize to 35mm × 45mm — Standard Passport Photo | SarkariPixels",
    metaDesc: "Resize photo to 35mm × 45mm. ISO/ICAO standard passport photo size. India, UK and most countries. Free, instant.",
    h1: "Resize to 35mm × 45mm — ISO Passport Standard",
    description: `35 mm × 45 mm — ISO/ICAO standard passport photo size jo India, UK aur zyada tar countries mein use hota hai. Yeh CM mein 3.5 × 4.5 cm ke equivalent hai.`,
    howTo: ["Photo upload karein", "Resize click karein", "Download karein"],
    faqs: [
      { q: "35mm × 45mm aur 3.5cm × 4.5cm same hai?", a: "Haan, exactly same size hai — sirf unit alag hai." },
    ],
    relatedTools: ["resize-35-45", "pass-photo-sizes", "passport-maker"],
  },

  "resize-2-2": {
    metaTitle: "Resize to 2 × 2 Inch — US Passport & Visa Photo | SarkariPixels",
    metaDesc: "Resize photo to 2x2 inch for US passport, visa, OCI card, Indian-American identity documents. Free, instant.",
    h1: "Resize to 2 × 2 Inch — US Passport Size",
    description: `2 × 2 inch (51 mm × 51 mm) — US passport, US visa applications, OCI card, aur US driver license ke liye required size. 300 DPI pe resize karta hai.`,
    howTo: ["Photo upload karein", "Resize click karein", "Download karein"],
    faqs: [
      { q: "OCI card ke liye bhi same size?", a: "Haan, OCI (Overseas Citizen of India) card ke liye 2×2 inch size hi required hai." },
    ],
    relatedTools: ["resize-3-4", "resize-4-6", "pass-photo-sizes"],
  },

  "resize-3-4": {
    metaTitle: "Resize to 3 × 4 Inch — ID Photo Size | SarkariPixels",
    metaDesc: "Resize photo to 3x4 inch. Common size for driving license photos in some countries and larger ID formats. Free, instant.",
    h1: "Resize to 3 × 4 Inch",
    description: `3 × 4 inch size — kuch countries mein driving license ya larger format ID documents ke liye use hota hai.`,
    howTo: ["Photo upload karein", "Resize click karein", "Download karein"],
    faqs: [],
    relatedTools: ["resize-2-2", "resize-4-6", "smart-resizer"],
  },

  "resize-4-6": {
    metaTitle: "Resize to 4 × 6 Inch — Standard Print Photo Size | SarkariPixels",
    metaDesc: "Resize image to 4x6 inch for standard photo printing. Passport sheet printing size. Free, instant.",
    h1: "Resize to 4 × 6 Inch — Print Size",
    description: `4 × 6 inch — standard photo print size jo zyatar photo labs use karte hain. Passport photo sheets print karne ke liye bhi yahi size use hoti hai.`,
    howTo: ["Photo upload karein", "Resize click karein", "Download karein"],
    faqs: [],
    relatedTools: ["passport-maker", "resize-2-2"],
  },

  "resize-600-600": {
    metaTitle: "Resize to 600 × 600 Pixels — Square Format | SarkariPixels",
    metaDesc: "Resize photo to exact 600x600 pixels. Square format for UPSC and other portals requiring square photos.",
    h1: "Resize to 600 × 600 Pixels",
    description: `Photo ko exact 600 × 600 pixels square mein resize karo. Kuch portals square photo specify karte hain aur 600px recommended size hai.`,
    howTo: ["Photo upload karein", "Resize click karein", "Download karein"],
    faqs: [
      { q: "UPSC ke liye minimum size kya hai?", a: "UPSC minimum 350×350 pixels, maximum 1000×1000 pixels. 600×600 safe choice hai." },
    ],
    relatedTools: ["upsc-photo-resize", "resize-pixel", "compress-300"],
  },

  // ── General Compression ──────────────────────────────────────────────────

  "compress-general": {
    metaTitle: "Image Compressor — Reduce Photo File Size Online | SarkariPixels",
    metaDesc: "Compress JPG, PNG images online. Reduce file size without visible quality loss. Free, instant, browser-based.",
    h1: "Image Compressor — Reduce File Size",
    description: `Kisi bhi photo ka file size reduce karo — JPG, PNG, WebP. Quality slider se balance control karo between compression aur visual quality. Exam form uploads, email attachments, website use — sab ke liye.`,
    howTo: ["Photo upload karein", "Quality slider adjust karo (default 80% recommended)", "Output size dekho", "Download karein"],
    faqs: [
      { q: "Quality setting kitni rakhen?", a: "80-85% quality most photos ke liye invisible hai with 40-60% size reduction. Exam photos ke liye 70-80% safe hai." },
    ],
    relatedTools: ["reduce-kb", "jpg-to-kb", "reduce-mb"],
  },

  "reduce-kb-general": {
    metaTitle: "Reduce Image Size in KB — Custom Target Compression | SarkariPixels",
    metaDesc: "Set exact KB target and compress image automatically. 20KB, 50KB, 100KB or any custom size. Free, browser-based.",
    h1: "Reduce Image Size to Custom KB Target",
    description: `Custom KB target set karo aur tool automatically compress karta hai exactly us limit tak. Same as Reduce KB tool in Most Used — accessible from General Compression category.`,
    howTo: ["Photo upload karein", "Target KB enter karo", "Compress karo", "Download karein"],
    faqs: [],
    relatedTools: ["compress-general", "jpg-to-kb"],
  },

  "reduce-mb": {
    metaTitle: "Reduce Image Size in MB — Compress Large Photos | SarkariPixels",
    metaDesc: "Compress large photos from MB to target size. Reduce 5MB, 10MB phone photos. Free, browser-based.",
    h1: "Reduce Image Size in MB",
    description: `Phone camera se aayi badi photos compress karo MB target se. 10MB → 1MB, 5MB → 500KB — custom MB target set karo.`,
    howTo: ["Photo upload karein", "Target MB enter karo", "Compress karo", "Download karein"],
    faqs: [],
    relatedTools: ["compress-general", "compress-1mb", "compress-2mb"],
  },

  "jpg-to-kb": {
    metaTitle: "JPG to KB — Compress JPEG to Exact KB Size | SarkariPixels",
    metaDesc: "Compress JPG/JPEG image to exact KB size. 30KB, 50KB, 100KB targets. Free, instant, browser-based.",
    h1: "JPG to KB — Exact JPEG Compression",
    description: `JPEG photo ko exact KB target tak compress karo. Format forcibly JPG output deta hai — maximum compatibility exam portals ke saath.`,
    howTo: ["JPG upload karein", "Target KB enter karo", "Compress karo", "Download karein"],
    faqs: [],
    relatedTools: ["reduce-kb", "compress-general"],
  },

  "convert-mb-to-kb": {
    metaTitle: "Convert MB to KB — Reduce Large Image to KB | SarkariPixels",
    metaDesc: "Convert large MB images down to KB range. Compress 2MB, 5MB photos to under 100KB. Free, browser-based.",
    h1: "Convert MB to KB — Reduce Large Images",
    description: `MB-sized photos ko KB range mein lao. Modern phone cameras 3-10MB photos produce karti hain — exam portals 50-300KB maangte hain. Yeh gap yeh tool bridge karta hai.`,
    howTo: ["Photo upload karein", "Target KB enter karo", "Convert karo", "Download karein"],
    faqs: [],
    relatedTools: ["reduce-mb", "compress-general", "reduce-kb"],
  },

  "convert-kb-to-mb": {
    metaTitle: "Convert KB to MB — Increase Image File Size | SarkariPixels",
    metaDesc: "Increase image file size from KB to MB range. Add EXIF padding. Rare use case for minimum size requirements.",
    h1: "Convert KB to MB — Increase File Size",
    description: `Very rare use case — jab portal minimum MB size enforce kare. Invisible EXIF metadata se file size badhai jaati hai.`,
    howTo: ["Photo upload karein", "Target MB enter karo", "Process karo", "Download karein"],
    faqs: [],
    relatedTools: ["increase-kb", "convert-mb-to-kb"],
  },

  // ── Exact Target Sizes ───────────────────────────────────────────────────

  "compress-5": {
    metaTitle: "Compress Image to 5KB — Ultra-Low Size Reduction | SarkariPixels",
    metaDesc: "Compress image file footprint down to 5KB for legacy government forms and low-bandwidth portals. 100% browser-based with instant visual quality preview.",
    h1: "Compress Image to 5KB Online Free",
    description: `Compress image files to strictly under 5KB. While modern central recruitment portals (SSC, UPSC) enforce higher minimum limits (typically 20KB), certain legacy state boards, scholarship forms, and regional portals still mandate extreme 5KB limits for thumbnails or mini-signatures.

Note on Quality: Compressing a photo to 5KB requires high quantization compression, which may soften fine lines. Always verify text and facial clarity in the preview before downloading.`,
    howTo: [
      "Select your image or signature file",
      "Click Process to execute localized in-browser compression to 5KB",
      "Inspect the live side-by-side preview to verify essential text legibility",
      "Download your 5KB JPEG file instantly",
    ],
    faqs: [
      { q: "5KB compression se image blur toh nahi hogi?", a: "5KB extreme compression hai, isliye fine details thodi soften hoti hain. SarkariPixels adaptive canvas scaling use karta hai taaki face ya signature recognizable rahe." },
      { q: "Konsi forms 5KB demand karti hain?", a: "Kuch older state scholarship portals, legacy railway apprentice slots, aur regional board admit card portals 5KB limit rakhte hain." },
    ],
    relatedTools: ["compress-10", "compress-20", "reduce-kb"],
  },

  "compress-10": {
    metaTitle: "Compress Image to 10KB — SSC & IBPS Signature Limit | SarkariPixels",
    metaDesc: "Compress signature and document scans to 10KB online. Exact size for SSC, IBPS, and state board signature uploads. Zero server upload, instant download.",
    h1: "Compress Image to 10KB (JPEG/JPG)",
    description: `Target exactly 10KB file footprint for online examination applications. 10KB is the authoritative minimum signature limit for major central examination portals including Staff Selection Commission (SSC CGL, CHSL, MTS) and Institute of Banking Personnel Selection (IBPS PO, Clerk).

All compression runs locally on your device via HTML5 Canvas, preserving dark ink contrast while eliminating extraneous metadata bloat.`,
    howTo: [
      "Upload your cropped signature or small photograph",
      "Verify target threshold is set to 10KB",
      "Review the Pre-Download Validation check to ensure file is under 10KB",
      "Download your portal-ready 10KB JPEG file",
    ],
    faqs: [
      { q: "SSC signature ke liye 10KB kyu required hai?", a: "SSC notifications ke mutabiq signature size strictly 10KB se 20KB ke beech honi chahiye. 10KB se kam hone par portal reject kar deta hai." },
      { q: "Signature background white rahega?", a: "Haan, compression sirf byte density optimize karti hai; background aur ink contrast intact rehte hain." },
    ],
    relatedTools: ["compress-15", "compress-20", "generate-signature"],
  },

  "compress-15": {
    metaTitle: "Compress Image to 15KB — BPSC Signature Limit | SarkariPixels",
    metaDesc: "Compress signature images under 15KB for BPSC and state competitive exam applications. Fast, client-side, privacy-first image optimizer.",
    h1: "Compress Image to 15KB Online",
    description: `Compress scanned signatures and document slips to strictly under 15KB. Bihar Public Service Commission (BPSC) specifically mandates an upper file limit of 15KB for Hindi and English signature uploads.

Using SarkariPixels, you achieve exact 15KB sizing in milliseconds without sending sensitive signatures across external networks.`,
    howTo: [
      "Select your signature image",
      "Automatic algorithm optimizes byte density to under 15KB",
      "Verify dimensions and size in the Pre-Download checklist",
      "Download portal-ready 15KB JPG",
    ],
    faqs: [
      { q: "BPSC signature limit kitni hoti hai?", a: "BPSC portal par Hindi aur English signature ka maximum file size strictly 15KB allow hota hai." },
      { q: "Signature faint hone ka risk hai?", a: "Nahi, binary canvas compression ink darkness preserve karti hai taaki portal rejection na ho." },
    ],
    relatedTools: ["compress-10", "compress-20", "resize-pixel"],
  },

  "compress-20": {
    metaTitle: "Compress to 20KB — Minimum SSC & UPSC Photo Size | SarkariPixels",
    metaDesc: "Compress passport photos and signatures to 20KB. Matches SSC, UPSC, and RRB portal minimum file size limits. Browser-based, no upload.",
    h1: "Compress Image to 20KB Online Free",
    description: `20KB represents the universal minimum threshold across major Indian recruitment portals. SSC, UPSC, RRB, and BPSC systems automatically flag and reject images below 20KB with 'File size too small' errors to prevent blurry or pixelated submissions.

Compressing to 20KB strikes the ideal equilibrium between sharp facial definition and small file footprint.`,
    howTo: [
      "Upload your passport-style photograph",
      "Tool automatically iterates quality factor to land at or just below 20KB",
      "Inspect the live portal compliance badge",
      "Download your verified 20KB JPEG file",
    ],
    faqs: [
      { q: "Portals minimum 20KB kyu demand karte hain?", a: "Taaki print admit card par photo clear dikhe aur facial recognition me verification fail na ho." },
      { q: "Agar photo pehle se 20KB se choti hai?", a: "Agar photo 20KB se kam hai toh hamara Increase Image Size in KB tool ya Resize Image Pixel use karke dimensions badhayein." },
    ],
    relatedTools: ["compress-50", "ssc-photo", "compress-20-50"],
  },

  "compress-20-50": {
    metaTitle: "Compress Image to 20KB–50KB — Universal Govt Exam Sweet Spot | SarkariPixels",
    metaDesc: "Automatically compress photos into the 20KB–50KB bracket required by SSC, RRB, and state PSC portals. Perfectly calibrated 35KB target.",
    h1: "Compress to 20KB–50KB Range (Universal Sweet Spot)",
    description: `The 20KB to 50KB range is India's most ubiquitous competitive exam specification. SSC CGL, SSC CHSL, RRB NTPC, BPSC CCE, and state police recruitment boards all mandate photos strictly inside this window.

This tool automatically targets 35KB — squarely in the middle of the acceptable bracket — guaranteeing zero risk of being either too large or too small.`,
    howTo: [
      "Upload your passport photograph",
      "Algorithm auto-calibrates to exactly ~35KB (inside the 20-50KB bracket)",
      "Verify 'Portal Ready' status in Pre-Download Validation Check",
      "Download compliant image",
    ],
    faqs: [
      { q: "35KB target kyun rakha gaya hai?", a: "35KB target 20KB minimum aur 50KB maximum ka exact safe center point hai, jo kisi bhi server analysis difference se reject nahi hota." },
      { q: "Konsi exams 20-50KB accept karti hain?", a: "SSC CGL, CHSL, MTS, GD, RRB NTPC, Group D, BPSC, aur adhiktar state PSCs." },
    ],
    relatedTools: ["compress-20", "compress-50", "ssc-photo"],
  },

  "compress-25": {
    metaTitle: "Compress to 25KB — Police & Postal Recruitment Size | SarkariPixels",
    metaDesc: "Compress image to 25KB online. Specific upper limit for state police recruitment and India Post GDS applications. Fast, client-side, free.",
    h1: "Compress Image to 25KB",
    description: `Compress photos and document scans to 25KB. While central portals permit up to 50KB, multiple state police recruitment boards (UP Police, MP Police) and India Post GDS cycles designate 25KB as their ceiling for photo uploads.

Maintain crisp facial contours and facial hair definitions while comfortably fitting within 25KB constraints.`,
    howTo: [
      "Upload photo or document scan",
      "Verify compression settings target 25KB",
      "Check live preview to ensure photo is clear and under limit",
      "Download your 25KB file",
    ],
    faqs: [
      { q: "25KB limit kahan use hoti hai?", a: "State police recruitment, postal GDS applications, aur kuch judicial district court form slots me." },
      { q: "Visual quality intact rahegi?", a: "Haan, 25KB standard 3.5×4.5cm passport photos ke liye kaafi sharp resolution provide karta hai." },
    ],
    relatedTools: ["compress-20", "compress-30", "compress-50"],
  },

  "compress-30": {
    metaTitle: "Compress to 30KB — RRB Signature & Document Limit | SarkariPixels",
    metaDesc: "Compress photos and signatures to under 30KB online. Exact specification for Railway Recruitment Board (RRB CEN) candidate signatures. Free.",
    h1: "Compress Image to 30KB (RRB Standard)",
    description: `Compress images and scanned signatures to 30KB. Railway Recruitment Boards (RRB ALP, Technician, NTPC, Group D) specifically stipulate that applicant signatures must be between 10KB and 30KB on white paper with dark ink.

Achieve crisp, non-smudged signature strokes verified against the 30KB cap.`,
    howTo: [
      "Upload your signature or document file",
      "Instant compression targets exactly 30KB maximum",
      "Review Pre-Download Validation Check",
      "Download your RRB-ready file",
    ],
    faqs: [
      { q: "RRB me signature ka format kya hota hai?", a: "RRB CEN notices ke according signature 10KB se 30KB ke beech honi chahiye JPG/JPEG format me." },
      { q: "Blue ya black ink chalega?", a: "Dono chalte hain, lekin black ink signature scanning ke baad zyada clear aati hai." },
    ],
    relatedTools: ["compress-20", "compress-50", "generate-signature"],
  },

  "compress-40": {
    metaTitle: "Compress to 40KB — Safe Buffer for 50KB Portals | SarkariPixels",
    metaDesc: "Compress photos to 40KB online. Provides a safe 10KB buffer for 50KB maximum portals like SSC, IBPS, and RRB. Prevents accidental over-size rejections.",
    h1: "Compress Image to 40KB (Buffer Safe)",
    description: `Compress photos to 40KB to provide a bulletproof buffer against strict 50KB portals. Many candidates compress right to 49.9KB, only to have portal servers report 50.1KB due to file header variations.

Targeting 40KB ensures you never cross the 50KB barrier while retaining top-tier visual clarity.`,
    howTo: [
      "Select your passport photo",
      "Tool sets compression threshold to 40KB",
      "Inspect side-by-side comparison",
      "Download your safe 40KB image",
    ],
    faqs: [
      { q: "40KB kyu recommend kiya jata hai?", a: "50KB max wale portals me 40KB compression 10KB ka safe buffer deta hai taaki portal server round-off me reject na kare." },
      { q: "Facial details blur hongi?", a: "Nahi, 40KB passport size photo ke liye optimal quality maintain karta hai." },
    ],
    relatedTools: ["compress-30", "compress-50", "reduce-kb"],
  },

  "compress-50": {
    metaTitle: "Compress to 50KB — SSC, IBPS & RRB Exam Photo Maximum | SarkariPixels",
    metaDesc: "Compress photo to under 50KB online. India's #1 exam photo standard for SSC CGL, CHSL, IBPS PO, Clerk, and RRB NTPC. 100% browser-based.",
    h1: "Compress to 50KB (Universal Exam Photo Maximum)",
    description: `50KB is the undisputed gold standard for Indian competitive recruitment portals. Staff Selection Commission (SSC), Institute of Banking Personnel Selection (IBPS), Railway Recruitment Board (RRB), and virtually every State Public Service Commission cap candidate passport photographs at exactly 50KB.

Our intelligent compressor delivers high-fidelity 3.5×4.5cm passport photos that sit safely under the 50KB ceiling with clean white backgrounds and zero upload to external servers.`,
    howTo: [
      "Upload your passport photograph",
      "Click Process or allow instant auto-compression to 50KB",
      "Verify 'Portal Ready' status in the Pre-Download checker",
      "Download your SSC/IBPS compliant 50KB JPEG",
    ],
    faqs: [
      { q: "50KB compress karne ke baad photo reject hogi?", a: "Agar dimensions sahi hain (3.5×4.5cm) aur background plain white ya light hai, toh bilkul reject nahi hogi." },
      { q: "SSC CGL ke liye kya yeh tool certified hai?", a: "SarkariPixels exact SSC 20-50KB standard follow karta hai client-side verification ke saath." },
    ],
    relatedTools: ["ssc-photo", "compress-20-50", "resize-35-45"],
  },

  "compress-100": {
    metaTitle: "Compress to 100KB — SBI PO & Handwritten Declaration Size | SarkariPixels",
    metaDesc: "Compress images and handwritten declarations to 100KB online. Matches SBI PO photo rules and IBPS declaration upload requirements. Free, instant.",
    h1: "Compress Image to 100KB Online",
    description: `Compress images, certificates, and handwritten declarations to 100KB. Banking recruitment portals like SBI PO allow photos up to 100KB, while IBPS mandates that candidate handwritten declarations must strictly be between 50KB and 100KB.

Maintain high text clarity for scanned declarations and sharp facial contrast for photos.`,
    howTo: [
      "Upload your handwritten declaration or photo",
      "Algorithm optimizes byte count to strictly under 100KB",
      "Verify text readability in preview",
      "Download your 100KB file",
    ],
    faqs: [
      { q: "IBPS handwritten declaration 100KB me kyu hoti hai?", a: "IBPS notification ke mutabiq handwritten declaration 50KB se 100KB ke beech honi chahiye taaki text perfectly readable rahe." },
      { q: "SBI PO photo limit kitni hai?", a: "SBI PO/Clerk applications me photo 100KB tak allow hoti hai." },
    ],
    relatedTools: ["compress-50", "compress-150", "compress-200"],
  },

  "compress-150": {
    metaTitle: "Compress to 150KB — State PSC & Judicial Form Size | SarkariPixels",
    metaDesc: "Compress photos and document scans to 150KB online. Exact fit for state judiciary, High Court, and municipal recruitment portals. Free.",
    h1: "Compress Image to 150KB (JPEG/JPG)",
    description: `Compress image files to under 150KB. Various High Court recruitment drives, state judicial service exams, and public sector undertaking (PSU) portals designate 150KB as their document and photo ceiling.

Retain vivid details and clear signature outlines while eliminating unneeded megabytes.`,
    howTo: [
      "Select your document or photo file",
      "Target is configured to 150KB",
      "Inspect the live Pre-Download compliance card",
      "Download compressed file",
    ],
    faqs: [
      { q: "150KB size kahan required hoti hai?", a: "High Court clerk/stenographer recruitments, state public sector companies, aur specialized university form slots me." },
      { q: "Kya document scan text legible rahega?", a: "Haan, 150KB standard A4 certificates ke text ko sharp aur readable banaye rakhta hai." },
    ],
    relatedTools: ["compress-100", "compress-200", "compress-300"],
  },

  "compress-200": {
    metaTitle: "Compress to 200KB — NTA NEET & JEE Photo Standard | SarkariPixels",
    metaDesc: "Compress photos to 200KB for NTA NEET, JEE Main, and CUET exam portals. Meets official 10KB–200KB bulletin specifications. 100% private.",
    h1: "Compress to 200KB (NTA NEET / JEE Standard)",
    description: `200KB is the official upper limit defined by the National Testing Agency (NTA) for premier national entrance exams including NEET-UG, JEE Main, and CUET. NTA bulletins explicitly prescribe photos between 10KB and 200KB.

Our in-browser compression keeps 80% facial coverage crisp with distinct ear visibility as mandated by NTA instructions.`,
    howTo: [
      "Upload your NEET / JEE passport photo",
      "Tool sets 200KB ceiling with high image quality preservation",
      "Review Pre-Download portal validation",
      "Download your NTA-ready 200KB JPEG",
    ],
    faqs: [
      { q: "NEET UG photo guidelines kya hain?", a: "NTA NEET 2026 guidelines ke anusar photo 10KB se 200KB honi chahiye, 80% face coverage ke saath aur dono kaan clearly visible hone chahiye." },
      { q: "NEET postcard photo (4x6) bhi 200KB me hoti hai?", a: "Haan, postcard size photograph bhi 10KB se 200KB bracket me upload hoti hai." },
    ],
    relatedTools: ["compress-100", "compress-300", "reduce-kb"],
  },

  "compress-300": {
    metaTitle: "Compress to 300KB — UPSC Photo & Signature Ceiling | SarkariPixels",
    metaDesc: "Compress photo and signature images to 300KB for UPSC Civil Services, NDA, and CDS online portals. Exact 20KB–300KB compliance. Free.",
    h1: "Compress to 300KB (UPSC Civil Services Maximum)",
    description: `300KB is the authoritative upper limit for Union Public Service Commission (UPSC) applications. The upsconline.nic.in portal accepts square photographs (350×350 to 1000×1000 pixels) and signatures within the 20KB to 300KB bracket.

Compressing to 300KB gives maximum visual fidelity for candidate name and photo-date imprint stamps at the bottom margin.`,
    howTo: [
      "Upload your square UPSC photograph or signature",
      "Compress comfortably within the 20KB-300KB threshold",
      "Verify candidate name and date stamp remain easily readable",
      "Download your UPSC-ready image",
    ],
    faqs: [
      { q: "UPSC photo ka maximum size kitna hai?", a: "UPSC online portal strictly 20KB minimum aur 300KB maximum allow karta hai." },
      { q: "Name aur date stamp blur toh nahi hoga?", a: "300KB generous limit hai; name aur date stamp text 100% sharp aur readable rehta hai." },
    ],
    relatedTools: ["upsc-photo-resize", "resize-600-600", "compress-200"],
  },

  "compress-500": {
    metaTitle: "Compress to 500KB — High-Resolution Document & Certificate Upload | SarkariPixels",
    metaDesc: "Compress certificates, marksheets, and identity scans to 500KB online. Perfect for college admissions and government document portals. Free.",
    h1: "Compress Image to 500KB",
    description: `Compress document scans, degree certificates, caste certificates, and marksheets to under 500KB. Government portals frequently allocate 500KB slots for supporting document verification.

Ensure official government stamps, signatures, and roll numbers remain flawlessly legible.`,
    howTo: [
      "Upload scanned document or marksheet photo",
      "Apply localized 500KB compression",
      "Zoom in on preview to confirm seals and text clarity",
      "Download optimized 500KB document",
    ],
    faqs: [
      { q: "500KB me certificate text clear dikhega?", a: "Haan, 500KB standard scan documents ke liye excellent resolution preserve karta hai bina text blur kiye." },
      { q: "PDF me convert karne se pehle use kar sakte hain?", a: "Haan, image ko 500KB compress karke PDF me convert karne par final PDF portal size limit ke andar rehti hai." },
    ],
    relatedTools: ["compress-300", "compress-1mb", "reduce-kb"],
  },

  "compress-1mb": {
    metaTitle: "Compress to 1MB — Large Photo & Scanned PDF Upload | SarkariPixels",
    metaDesc: "Compress large smartphone camera photos (5-15MB) down to 1MB online. Fast, browser-based, zero upload needed. Perfect for government portal document slots.",
    h1: "Compress Image to 1MB Online Free",
    description: `Compress modern smartphone camera photos (often 5MB to 15MB) down to under 1MB. Many state portals (such as OTR portals and state public service commissions) accept large document attachments up to 1MB.

Downscale excessive megabytes without losing clarity or sharpness in official seals and candidate portraits.`,
    howTo: [
      "Select high-resolution phone camera photo",
      "Tool executes smart downsampling to under 1MB",
      "Check Pre-Download Validation report",
      "Download lightweight 1MB image",
    ],
    faqs: [
      { q: "Phone camera photo 1MB me kaise laayein?", a: "SarkariPixels directly browser memory me photo load karke Canvas compression se 10MB photo ko 1MB me convert karta hai bina privacy breach ke." },
      { q: "1MB kahan accept hota hai?", a: "Central and state recruitment document slots, resume portals, aur university admission forms me." },
    ],
    relatedTools: ["compress-500", "compress-2mb", "reduce-mb"],
  },

  "compress-2mb": {
    metaTitle: "Compress to 2MB — Heavy Document & Portfolio Compression | SarkariPixels",
    metaDesc: "Compress heavy images down to 2MB online. Designed for maximum upload slots on government and institutional portals. Fast, client-side, zero upload.",
    h1: "Compress Image to 2MB",
    description: `Compress ultra-heavy camera captures and multi-certificate composites to under 2MB. 2MB is standard maximum ceiling for civil court, legal, and institutional portal uploads.

Retain original high-resolution DPI grids while shedding heavy uncompressed payload.`,
    howTo: [
      "Upload large image or composite certificate",
      "Confirm target limit is 2MB",
      "Verify file size in validation card",
      "Download optimized 2MB file",
    ],
    faqs: [
      { q: "2MB compression me visual quality loss hoti hai?", a: "Minimal se zero visual loss. 2MB bahut generous size hai isliye full visual richness retain hoti hai." },
      { q: "Kya heavy raw files support karta hai?", a: "JPG, PNG, aur WEBP standard camera formats fully supported hain." },
    ],
    relatedTools: ["compress-1mb", "reduce-mb", "compress-500"],
  },

  // ── Official Sizes ───────────────────────────────────────────────────────

  "resize-a4": {
    metaTitle: "Resize to A4 Size — Standard Paper Dimensions | SarkariPixels",
    metaDesc: "Resize image to A4 paper size (21cm × 29.7cm). Document scanning and printing standard. Free, instant.",
    h1: "Resize to A4 Size",
    description: `Photo ya document image ko A4 paper size (21 cm × 29.7 cm) mein resize karo. Document printing, certificate preparation, aur scan alignment ke liye.`,
    howTo: ["Image upload karein", "Resize to A4 click karein", "Download karein"],
    faqs: [
      { q: "A4 size kitne pixels mein hoti hai?", a: "At 300 DPI: 2480 × 3508 pixels. At 96 DPI: 794 × 1123 pixels." },
    ],
    relatedTools: ["smart-resizer", "resize-cm"],
  },

  "ssc-photo": {
    metaTitle: "SSC Photo Resize — 3.5×4.5cm 300 DPI 50KB | SarkariPixels",
    metaDesc: "Resize photo for SSC exam to exact specifications: 3.5cm × 4.5cm, 300 DPI, under 50KB, JPG format. One-click tool.",
    h1: "SSC Photo Resize — Complete Tool (3.5×4.5cm, 300 DPI, 50KB)",
    description: `SSC (Staff Selection Commission) ke liye complete photo preparation — ek hi tool mein resize, DPI set, aur compress sab:

- **Dimensions:** 3.5 cm × 4.5 cm (at 300 DPI = 413 × 531 pixels)
- **File size:** 20KB se 50KB ke beech
- **Format:** JPEG/JPG
- **Background:** White ya light colored
- **DPI:** 300

SSC CGL, SSC CHSL, SSC MTS, SSC GD — sab ke liye same requirement apply hoti hai.`,
    howTo: [
      "Apni passport size photo upload karein",
      "Preview mein chehra centrally visible hai check karo",
      "Tool auto-resize, auto-compress, aur DPI set karta hai",
      "Output 20-50KB ke beech hogi",
      "Download karo — portal pe direct upload karein",
    ],
    faqs: [
      { q: "SSC CGL 2024 photo size kya hai?", a: "3.5 cm × 4.5 cm, 20KB–50KB, JPG format, white background." },
      { q: "SSC MTS aur CGL ka same size hai?", a: "Haan, SSC ka standardized format sabhi exams ke liye same hai." },
      { q: "300 DPI mandatory hai?", a: "Print quality ke liye haan. Portal typically dimension aur KB enforce karta hai; DPI optional hai lekin best practice hai." },
      { q: "Glasses mein photo acceptable hai?", a: "Officially 'no glasses' rule hai SSC mein. Prescription glasses wale notification mein exception dekh sakte hain." },
      { q: "Photo kitne mahine purani acceptable hai?", a: "Recent photo (6 mahine ke andar). Old photo reject ho sakti hai interview stage pe." },
    ],
    relatedTools: ["resize-35-45", "compress-50", "compress-20-50", "generate-signature"],
  },

  "pan-card-resize": {
    metaTitle: "PAN Card Photo Resize — NSDL UTI 300 DPI 50KB | SarkariPixels",
    metaDesc: "Resize photo for PAN card application (NSDL/UTI). 2.5cm × 3.5cm, 300 DPI, under 50KB. One-click tool.",
    h1: "PAN Card Photo Resize — NSDL/UTI Specifications",
    description: `PAN card application ke liye correct photo format — NSDL aur UTI ke liye:

- **Photo:** 2.5 cm × 3.5 cm, 300 DPI, max 50KB, JPG
- **Signature:** 2.0 cm × 4.5 cm, 300 DPI, max 50KB, JPG
- **Background:** White

DPI metadata lock 300 pe — yeh PAN portal ki specific requirement hai.`,
    howTo: [
      "Photo upload karein",
      "Tool auto-resize to 2.5×3.5cm aur DPI 300 set karta hai",
      "KB check karo — should be under 50KB",
      "Download karein",
      "Signature ke liye Generate Signature tool use karo",
    ],
    faqs: [
      { q: "NSDL aur UTI ka same size hai?", a: "Haan, dono ke liye same photo specifications hain." },
      { q: "DPI 300 kaise verify karein?", a: "Check DPI tool use karo — photo upload karo aur DPI value automatically show hogi." },
      { q: "Signature image ka size?", a: "2.0 cm × 4.5 cm (approximately 236 × 531 pixels at 300 DPI), JPG, under 50KB." },
    ],
    relatedTools: ["convert-dpi", "check-dpi", "generate-signature", "compress-50"],
  },

  "upsc-photo-resize": {
    metaTitle: "UPSC Photo Resize — Square Format 350px 300KB | SarkariPixels",
    metaDesc: "Resize photo for UPSC IAS/IPS application. Square format, min 350px, max 300KB. Includes name and date stamp. One-click tool.",
    h1: "UPSC Photo Resize — Square Format with Name Stamp",
    description: `UPSC (Union Public Service Commission) ki specific photo requirements:

- **Format:** Square (1:1 ratio)
- **Dimensions:** 350px × 350px minimum, 1000px × 1000px maximum
- **File size:** 20KB minimum, 300KB maximum
- **Format:** JPEG
- **Background:** White
- **Special requirement:** White border at bottom with candidate name and date of photograph

Yeh tool square crop, resize, compress, aur name stamp — sab ek jagah handle karta hai.`,
    howTo: [
      "Photo upload karein",
      "Square crop karo (chehra center mein hona chahiye)",
      "Candidate name aur photo date enter karo",
      "Tool resize aur compress karta hai automatically",
      "Download karein",
    ],
    faqs: [
      { q: "UPSC photo mein glasses allowed hain?", a: "Haan, UPSC ne glasses ke baare mein strict restriction nahi di hai. Natural appearance maintain karo." },
      { q: "Name stamp kahan hona chahiye?", a: "Photo ke neeche ek white border strip mein, candidate ka naam aur photo ki date printed." },
      { q: "Color photo ya black & white?", a: "Color photo preferred. Recent notification check karo — specifications change ho sakti hain." },
      { q: "Signature ka size kya hai?", a: "UPSC signature bhi square format mein, same dimensions (350-1000px), same KB range (20-300KB)." },
    ],
    relatedTools: ["add-name-dob", "square-crop", "compress-300", "resize-600-600"],
  },

  "psc-photo": {
    metaTitle: "PSC Photo Resize — State Public Service Commission | SarkariPixels",
    metaDesc: "Resize photo for state PSC exams (UPPSC, MPSC, KPSC etc). Standard 3.5×4.5cm format. Free, instant.",
    h1: "PSC Photo Resize — State Public Service Commission",
    description: `State Public Service Commissions — UPPSC (Uttar Pradesh), MPSC (Maharashtra), KPSC (Karnataka), RPSC (Rajasthan), JPSC (Jharkhand) aur baaki state PSCs — zyada tar SSC jaisi requirements follow karte hain:

- **Dimensions:** 3.5 cm × 4.5 cm
- **File size:** Typically 20KB–50KB
- **Format:** JPEG
- **Background:** White

Specific state PSC notification zaroor check karo — kuch slight variations ho sakti hain. Lekin yeh tool standard format se start karne ke liye best hai.`,
    howTo: [
      "Photo upload karein",
      "Tool 3.5×4.5cm resize karta hai",
      "KB check karo (20-50KB range)",
      "Download karein",
      "Specific state PSC notification se verify karo",
    ],
    faqs: [
      { q: "UPPSC photo size?", a: "UPPSC: 3.5×4.5cm, 20-50KB, JPG, white background — SSC jaisi." },
      { q: "BPSC se alag hai?", a: "BPSC ka size 250×327 pixels (roughly 2.5×3.3cm at 254dpi) hai — PSC Photo tool se nahi, resize-pixel tool se karo." },
      { q: "State PSC ki exact requirements kahan milegi?", a: "Official state PSC website par notification download karo — requirements notification to notification vary karti hain." },
    ],
    relatedTools: ["ssc-photo", "resize-35-45", "compress-50"],
  },
};

// Get content for a tool, with graceful fallback for tools without specific content
export function getToolContent(toolId: string): ToolContent | null {
  return TOOL_CONTENT[toolId] || null;
}
