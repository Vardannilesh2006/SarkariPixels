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
  // ── Most Used ────────────────────────────────────────────────────────────

  "smart-resizer": {
    metaTitle: "Smart Image Resizer — Resize in Pixels, CM, MM, Inches | SarkariPixels",
    metaDesc: "Free online image resizer. Enter exact pixel, centimeter, mm or inch dimensions. Perfect for SSC, UPSC, BPSC, RRB exam photo requirements. No upload needed.",
    h1: "Smart Image Resizer — Pixels, CM, MM & Inches",
    description: `Resize kisi bhi photo ya image ko apni exact manpasand dimensions mein — pixels, centimeters, millimeters, ya inches mein. Chahe SSC ka 3.5 × 4.5 cm ho, UPSC ka 350 × 350 px ho, ya koi bhi aur size — yeh tool seedha browser mein kaam karta hai, koi file upload nahi hoti.

Bahut se students ko resize karte waqt confusion hoti hai: inches chahiye ya cm? Portal ka error baar baar aata hai? Is tool mein aap switch kar sakte hain units ke beech bina quality khoye. Canvas API se processing hoti hai — zero server, 100% private.

Exam form apply karte waqt file size bhi matter karti hai. Resize ke baad agar KB limit cross ho rahi ho, toh neeche "Reduce Size in KB" tool bhi hai jo automatically compress karta hai.`,
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
    description: `Studio mein photo sheet banwane ki zaroorat nahi — yeh tool aapki koi bhi photo lekar usse passport size mein crop karta hai aur ek standard 4×6 inch printable sheet par 6-8 copies arrange karta hai.

Sirf ek achhi quality photo chahiye. Tool automatically face detect karta hai, white background par center karta hai, aur print-ready layout generate karta hai jo aap kisi bhi printer par ya photo lab mein print kara sakte hain.

India mein common use cases: SSC/UPSC/RRB form ke saath physical passport photos submit karna, driving license, ration card, bank account opening, aur school/college admissions.`,
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
    description: `Exam portal pe "file size exceeds limit" error aana bahut common frustration hai. SSC chahta hai max 50KB, BPSC max 50KB, IBPS max 50KB — aur aapki phone camera 3MB se 8MB ki photo khichti hai.

Yeh tool aapki photo ko exactly aapki di hui KB limit ke andar compress karta hai — automatically. Sirf target KB type karo (jaise 50), photo upload karo, aur tool iterative compression use karta hai to land exactly at or below your target.

Important: compression hamesha visual quality se trade-off hoti hai. 5KB pe photo blocky dikti hai. SSC ke liye 20-50KB ideal hai. 50KB se neeche jaana zaroorat ho toh hi karo.`,
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
      { q: "File kabhi server pe jaati hai kya?", a: "Bilkul nahi. Saari processing aapke browser mein hoti hai. No internet needed after page loads." },
    ],
    relatedTools: ["smart-resizer", "compress-50", "compress-20", "ssc-photo"],
  },

  "resize-pixel": {
    metaTitle: "Resize Image in Pixels — Set Exact Width & Height Online | SarkariPixels",
    metaDesc: "Resize any photo to exact pixel dimensions online. Free, instant, browser-based. Enter width & height in pixels for SSC, IBPS, UPSC portals.",
    h1: "Resize Image to Exact Pixel Dimensions",
    description: `Kuch exam portals pixels mein dimensions maangte hain — IBPS 200×230 px, UPSC 350×350 px, NTA NEET 100×120 px. Yeh tool seedha pixel value accept karta hai.

Width aur height dono type karo, aspect ratio lock karo ya free resize karo — canvas par turant result dikta hai. No guessing, no manual calculation.`,
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
    description: `Multiple photos ek grid mein combine karo — 2×1, 2×2, 3×1, ya custom layout. Documents, ID proofs, before/after images, ya koi bhi collage — sab browser mein hota hai.

Sarkari form mein photo aur signature dono ek saath submit karne wale tool "Merge Photo & Signature" tool use karein. Collage Maker general purpose hai.`,
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
    description: `Exam form mein signature upload karna hota hai lekin physical signature scan karna mushkil lag raha hai? Yeh tool do tarike se kaam karta hai:

**Type:** Apna naam likho, 10+ handwriting-style fonts mein se chunein, color select karo — 2 seconds mein ready.

**Draw:** Mouse ya touchscreen se apna actual signature draw karo — tablet users ke liye best option.

Output white background par clear signature — bilkul waise jaisa portals maangte hain. Transparent PNG bhi available hai.`,
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
    metaTitle: "Increase Image Size in KB — Add File Size Without Quality Loss | SarkariPixels",
    metaDesc: "Increase image KB size to meet minimum file size requirements for exam portals. EXIF padding technique. Free, browser-based.",
    h1: "Increase Image File Size in KB",
    description: `Kuch rare exam portals minimum file size bhi enforce karte hain — jaise "photo must be between 20KB and 50KB." Agar photo 8KB hai toh "too small" error aata hai.

Yeh tool harmless EXIF metadata blocks add karta hai file size badhaane ke liye — actual image quality ya dimensions nahi badte. Purely for portal compliance.

Note: Yeh tool tabhi use karo jab actually minimum size error aa raha ho. Normally compress karna hi kaam aata hai.`,
    howTo: [
      "Photo upload karein",
      "Target minimum KB enter karein",
      "Process karein",
      "Download — same image, larger file size",
    ],
    faqs: [
      { q: "Photo quality kharab hogi increase karne se?", a: "Nahi. Sirf invisible metadata blocks add hote hain." },
      { q: "Kab zaroorat padti hai size increase ki?", a: "Jab portal 'file too small' error de — jaise UPSC ka minimum 20KB requirement." },
      { q: "Kitna increase kar sakte hain?", a: "Reasonable range mein — 5KB se 500KB tak." },
    ],
    relatedTools: ["reduce-kb", "compress-20"],
  },

  "photo-enhancer": {
    metaTitle: "AI Photo Enhancer — Improve Contrast & Clarity Online | SarkariPixels",
    metaDesc: "Enhance dark or dull photos online. Auto-adjust brightness, contrast, and sharpness. Free browser-based tool. No upload needed.",
    h1: "AI Photo Enhancer — Auto Brightness & Contrast Fix",
    description: `Phone camera se dark ya flat photo aayi? Room lighting achi nahi thi? Yeh tool automatic contrast enhancement, brightness correction, aur sharpening apply karta hai.

Khas taur par useful jab photo thodi dark ho aur face clearly visible na ho — jo ID verification mein rejection cause karta hai. Processing browser mein hoti hai Canvas API se.`,
    howTo: [
      "Photo upload karein",
      "Auto-enhance click karein ya sliders manually adjust karein",
      "Before/after preview check karein",
      "Download karein",
    ],
    faqs: [
      { q: "Kya yeh truly 'AI' hai?", a: "Canvas-based smart filters use hote hain — histogram equalization aur adaptive sharpening. Deep learning nahi, lekin most cases mein kaafi effective hai." },
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
    description: `India ka sabse common exam photo size — 3.5 × 4.5 centimeters. SSC CGL, SSC CHSL, RRB NTPC, BPSC, BSSC, aur dozens of state PSCs — sab yahi size use karte hain.

Ek click mein resize — koi settings nahi, koi confusion nahi. Bas photo upload karo aur download karo. Output automatically 300 DPI pe set hoti hai print quality ke liye.`,
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
    metaTitle: "AI Face Generator — Random Dummy Face Creator | SarkariPixels",
    metaDesc: "Generate random AI dummy face photos online. Testing and placeholder use. Browser-based canvas generation.",
    h1: "AI Face Generator — Random Dummy Face",
    description: `Testing purposes ke liye random synthetic face generate karo. UI prototyping, placeholder photos, ya demo content ke liye — real person ki photo nahi.`,
    howTo: ["Generate click karo", "Ek random face create hoga", "Download karo ya regenerate karo"],
    faqs: [
      { q: "Kya yeh real person hai?", a: "Nahi. Completely synthetic, algorithmically generated face hai." },
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
    metaTitle: "Resize Signature 6cm × 2cm — 300 DPI | SarkariPixels",
    metaDesc: "Resize signature to 6cm × 2cm at 300 DPI. Common signature size for Indian government forms. Free, instant.",
    h1: "Resize Signature to 6cm × 2cm",
    description: `Signature ko 6 cm × 2 cm dimension mein resize karo, 300 DPI pe. Kuch government applications aur notarized documents yeh size require karte hain.`,
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
    metaTitle: "Compress to 5KB — Minimum Size Extreme Compression | SarkariPixels",
    metaDesc: "Compress image to 5KB. Extreme compression for very strict portals. Quality will be reduced significantly.",
    h1: "Compress to 5KB",
    description: `Photo ko 5KB tak compress karo. Yeh extreme compression hai — visible quality loss hogi. Sirf tabhi use karo jab portal strictly 5KB demand kare.`,
    howTo: ["Photo upload karein", "Compress to 5KB click karein", "Download karein"],
    faqs: [
      { q: "5KB pe quality kaisi hogi?", a: "Significantly reduced. Image blocky dikhegi lekin recognizable rahegi. Agar portal allow kare toh 10-20KB use karo better quality ke liye." },
    ],
    relatedTools: ["compress-10", "compress-20", "reduce-kb"],
  },

  "compress-10": {
    metaTitle: "Compress to 10KB — JPEG 10KB Compression | SarkariPixels",
    metaDesc: "Compress JPEG image to 10KB online. Strict size limit compression. Free, instant, browser-based.",
    h1: "JPEG to 10KB",
    description: `Photo ko exactly 10KB tak compress karo. Low size limit ke liye — some signature upload portals 10KB maximum enforce karte hain.`,
    howTo: ["Photo upload karein", "Compress to 10KB click karein", "Download karein"],
    faqs: [],
    relatedTools: ["compress-5", "compress-15", "compress-20"],
  },

  "compress-15": {
    metaTitle: "Compress to 15KB — Image Compression Online | SarkariPixels",
    metaDesc: "Compress image to under 15KB. For portals with 15KB file limit. Free, browser-based.",
    h1: "Compress to 15KB",
    description: `Image ko 15KB limit ke andar compress karo. Kuch signature portals 15KB maximum allow karte hain.`,
    howTo: ["Photo upload karein", "Compress to 15KB click karein", "Download karein"],
    faqs: [],
    relatedTools: ["compress-10", "compress-20"],
  },

  "compress-20": {
    metaTitle: "Compress to 20KB — Minimum SSC/BPSC Photo Size | SarkariPixels",
    metaDesc: "Compress image to 20KB. Minimum size for SSC and BPSC photos. Good quality at 20KB for passport photos.",
    h1: "Compress to 20KB",
    description: `20KB — SSC aur BPSC photo ka minimum required size. Agar photo bahut badi hai toh 20KB tak compress karo.`,
    howTo: ["Photo upload karein", "Compress to 20KB click karein", "Download karein"],
    faqs: [
      { q: "SSC photo 20KB minimum kyun?", a: "Portal rejects files jo too small hain — unreadable quality prevent karne ke liye." },
    ],
    relatedTools: ["compress-50", "ssc-photo", "reduce-kb"],
  },

  "compress-20-50": {
    metaTitle: "Compress Between 20KB-50KB — SSC BPSC Range | SarkariPixels",
    metaDesc: "Compress image to between 20KB and 50KB. Perfect range for SSC, BPSC, RRB exam photo upload.",
    h1: "Compress to 20KB–50KB Range",
    description: `SSC, BPSC, RRB — sabka sweet spot 20-50KB hai. Yeh tool automatically 35KB target pe compress karta hai — guaranteed 20-50KB range ke andar.`,
    howTo: ["Photo upload karein", "Compress click karein", "Auto-targets 35KB", "Download karein"],
    faqs: [],
    relatedTools: ["compress-20", "compress-50", "ssc-photo"],
  },

  "compress-25": {
    metaTitle: "Compress to 25KB — JPEG 25KB File Size | SarkariPixels",
    metaDesc: "Compress JPEG to exactly 25KB online. For portals with 25KB maximum. Free, instant.",
    h1: "JPEG to 25KB",
    description: `Photo ko 25KB limit ke andar compress karo. Kuch specialized portals 25KB maximum enforce karte hain.`,
    howTo: ["Photo upload karein", "Compress to 25KB click karein", "Download karein"],
    faqs: [],
    relatedTools: ["compress-20", "compress-30"],
  },

  "compress-30": {
    metaTitle: "Compress to 30KB — RRB Photo/Signature Size | SarkariPixels",
    metaDesc: "Compress image to 30KB. RRB signature requirement range. Free, instant browser compression.",
    h1: "JPEG to 30KB",
    description: `Photo ko 30KB tak compress karo — RRB signatures aur kuch other portals 30KB limit use karte hain.`,
    howTo: ["Photo upload karein", "Compress to 30KB click karein", "Download karein"],
    faqs: [],
    relatedTools: ["compress-25", "compress-40", "compress-50"],
  },

  "compress-40": {
    metaTitle: "Compress to 40KB — JPEG 40KB Online | SarkariPixels",
    metaDesc: "Compress JPEG image to 40KB online. Near maximum for many exam portals. Free, instant.",
    h1: "JPEG to 40KB",
    description: `Photo ko 40KB pe compress karo — 50KB maximum limit wale portals ke liye safe buffer ke saath.`,
    howTo: ["Photo upload karein", "Compress to 40KB click karein", "Download karein"],
    faqs: [],
    relatedTools: ["compress-30", "compress-50"],
  },

  "compress-50": {
    metaTitle: "Compress to 50KB — SSC IBPS Exam Photo Maximum | SarkariPixels",
    metaDesc: "Compress photo to under 50KB. SSC CGL, IBPS, RRB maximum photo size. Free, instant, browser-based.",
    h1: "Compress to 50KB — SSC/IBPS Maximum",
    description: `50KB — India ka sabse common exam photo maximum size. SSC CGL, SSC CHSL, IBPS PO, IBPS Clerk, RRB NTPC — sab ka max 50KB hai. One click, zero guesswork.`,
    howTo: ["Photo upload karein", "Compress to 50KB click karein", "Download karein"],
    faqs: [
      { q: "50KB compress karne ke baad photo reject hogi?", a: "Agar dimensions bhi sahi hain (3.5×4.5cm) aur background white hai, toh nahi hogi." },
    ],
    relatedTools: ["ssc-photo", "compress-20-50", "resize-35-45"],
  },

  "compress-100": {
    metaTitle: "Compress to 100KB — Moderate Compression Online | SarkariPixels",
    metaDesc: "Compress image to under 100KB. For portals with 100KB maximum. Good quality preserved. Free, instant.",
    h1: "Compress to 100KB",
    description: `100KB limit wale portals ke liye — IBPS SBI kuch times 100KB allow karte hain, kuch state portals bhi. Good quality maintained at this size.`,
    howTo: ["Photo upload karein", "Compress to 100KB click karein", "Download karein"],
    faqs: [],
    relatedTools: ["compress-50", "compress-150", "compress-200"],
  },

  "compress-150": {
    metaTitle: "Compress to 150KB — JPEG 150KB Online | SarkariPixels",
    metaDesc: "Compress JPEG image to 150KB online. Suitable for portals with 150-200KB limits. Free, instant.",
    h1: "JPEG to 150KB",
    description: `Photo ko 150KB limit ke andar compress karo — moderate size limit wale portals ke liye.`,
    howTo: ["Photo upload karein", "Compress to 150KB click karein", "Download karein"],
    faqs: [],
    relatedTools: ["compress-100", "compress-200"],
  },

  "compress-200": {
    metaTitle: "Compress to 200KB — NTA NEET JEE Photo Size | SarkariPixels",
    metaDesc: "Compress image to 200KB. NTA NEET and JEE maximum photo size. Good quality at 200KB. Free, instant.",
    h1: "Compress to 200KB — NTA NEET/JEE Size",
    description: `200KB — NTA exams (NEET, JEE, CUET) ka photo maximum size. Ample KB space deta hai achhi quality ke saath.`,
    howTo: ["Photo upload karein", "Compress to 200KB click karein", "Download karein"],
    faqs: [
      { q: "NEET photo size kya hai?", a: "NEET 2024: photo 10KB–200KB, JPEG format, 100×120 px minimum. 200KB tool se compress karo." },
    ],
    relatedTools: ["compress-100", "compress-300", "reduce-kb"],
  },

  "compress-300": {
    metaTitle: "Compress to 300KB — UPSC Photo Maximum Size | SarkariPixels",
    metaDesc: "Compress image to 300KB. UPSC maximum photo size. Excellent quality maintained. Free, instant.",
    h1: "Compress to 300KB — UPSC Maximum",
    description: `300KB — UPSC ka maximum allowed photo size. High quality compression — at 300KB achi quality milti hai.`,
    howTo: ["Photo upload karein", "Compress to 300KB click karein", "Download karein"],
    faqs: [
      { q: "UPSC photo ka maximum KB kya hai?", a: "UPSC allows 20KB minimum to 300KB maximum." },
    ],
    relatedTools: ["upsc-photo-resize", "resize-600-600", "compress-200"],
  },

  "compress-500": {
    metaTitle: "Compress to 500KB — Large Portal Upload Size | SarkariPixels",
    metaDesc: "Compress image to under 500KB. For portals allowing larger uploads. Excellent quality. Free, instant.",
    h1: "JPEG to 500KB",
    description: `Photo ko 500KB tak compress karo — kuch portals larger file sizes allow karte hain. Excellent visual quality at this size.`,
    howTo: ["Photo upload karein", "Compress to 500KB click karein", "Download karein"],
    faqs: [],
    relatedTools: ["compress-300", "compress-1mb"],
  },

  "compress-1mb": {
    metaTitle: "Compress to 1MB — Reduce Large Photos | SarkariPixels",
    metaDesc: "Compress image to under 1MB. Reduce phone camera photos. Email and web upload optimization. Free, instant.",
    h1: "Compress to 1MB",
    description: `1MB limit ke andar compress karo — email attachments, web uploads, ya specific portals ke liye. Phone camera 10MB+ photos ko 1MB tak laao.`,
    howTo: ["Photo upload karein", "Compress to 1MB click karein", "Download karein"],
    faqs: [],
    relatedTools: ["compress-2mb", "reduce-mb", "compress-500"],
  },

  "compress-2mb": {
    metaTitle: "Compress to 2MB — Large File Size Limit | SarkariPixels",
    metaDesc: "Compress image to under 2MB. Light compression for large portals and email. Free, instant.",
    h1: "Compress to 2MB",
    description: `2MB limit wale portals ke liye — minimal compression, excellent quality. Heavy phone photos compress karo lightly.`,
    howTo: ["Photo upload karein", "Compress to 2MB click karein", "Download karein"],
    faqs: [],
    relatedTools: ["compress-1mb", "reduce-mb"],
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
