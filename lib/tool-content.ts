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
  "resize-image-to-passport-size": {
    metaTitle: "Resize Image to Passport Size Photo Online Free | ImResizer — Free Online Tool | SarkariPixels",
    metaDesc: "Use our free online resize image to passport size photo online free | imresizer tool. 100% client-side, zero file upload needed. Fast, high quality, and perfect for exam application forms.",
    h1: "Resize Image to Passport Size Photo Online Free | ImResizer Online Free",
    description: `Resize Image to Passport Size Photo Online Free | ImResizer tool allows you to process and optimize photos directly in your browser. All computations run 100% locally via HTML5 Canvas and Web APIs. Your confidential images never leave your computer or phone.`,
    howTo: [
      "Select your image file by clicking Upload or drag & drop",
      "Configure your desired dimensions or compression options",
      "Click Process to execute instant in-browser optimization",
      "Download your ready-to-use image instantly"
    ],
    faqs: [
      { q: "Is this Resize Image to Passport Size Photo Online Free | ImResizer tool completely free?", a: "Yes, it is 100% free with unlimited usage and zero registration required." },
      { q: "Are my files uploaded to your servers?", a: "No. All processing happens 100% locally in your web browser memory sandbox." },
      { q: "Can I use this on mobile devices?", a: "Yes, this tool works seamlessly on Android, iOS, Windows, and Mac browsers." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "resize-image-size-in-kb": {
    metaTitle: "Reduce Image Size in KB — Image Size Reducer | ImResizer — Free Online Tool | SarkariPixels",
    metaDesc: "Use our free online reduce image size in kb — image size reducer | imresizer tool. 100% client-side, zero file upload needed. Fast, high quality, and perfect for exam application forms.",
    h1: "Reduce Image Size in KB — Image Size Reducer | ImResizer Online Free",
    description: `Reduce Image Size in KB — Image Size Reducer | ImResizer tool allows you to process and optimize photos directly in your browser. All computations run 100% locally via HTML5 Canvas and Web APIs. Your confidential images never leave your computer or phone.`,
    howTo: [
      "Select your image file by clicking Upload or drag & drop",
      "Configure your desired dimensions or compression options",
      "Click Process to execute instant in-browser optimization",
      "Download your ready-to-use image instantly"
    ],
    faqs: [
      { q: "Is this Reduce Image Size in KB — Image Size Reducer | ImResizer tool completely free?", a: "Yes, it is 100% free with unlimited usage and zero registration required." },
      { q: "Are my files uploaded to your servers?", a: "No. All processing happens 100% locally in your web browser memory sandbox." },
      { q: "Can I use this on mobile devices?", a: "Yes, this tool works seamlessly on Android, iOS, Windows, and Mac browsers." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "image-tools": {
    metaTitle: "imresizer.com - All Your Image Tools in One Place — Free Online Tool | SarkariPixels",
    metaDesc: "Use our free online imresizer.com - all your image tools in one place tool. 100% client-side, zero file upload needed. Fast, high quality, and perfect for exam application forms.",
    h1: "imresizer.com - All Your Image Tools in One Place Online Free",
    description: `imresizer.com - All Your Image Tools in One Place tool allows you to process and optimize photos directly in your browser. All computations run 100% locally via HTML5 Canvas and Web APIs. Your confidential images never leave your computer or phone.`,
    howTo: [
      "Select your image file by clicking Upload or drag & drop",
      "Configure your desired dimensions or compression options",
      "Click Process to execute instant in-browser optimization",
      "Download your ready-to-use image instantly"
    ],
    faqs: [
      { q: "Is this imresizer.com - All Your Image Tools in One Place tool completely free?", a: "Yes, it is 100% free with unlimited usage and zero registration required." },
      { q: "Are my files uploaded to your servers?", a: "No. All processing happens 100% locally in your web browser memory sandbox." },
      { q: "Can I use this on mobile devices?", a: "Yes, this tool works seamlessly on Android, iOS, Windows, and Mac browsers." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "sarkari-result-photo-resizer": {
    metaTitle: "Sarkari Result Photo Resizer — Free Online Image Tool | SarkariPixels",
    metaDesc: "Free online Sarkari Result photo resizer for SSC, UPSC, IBPS, BPSC & all sarkari exam forms. Resize photo 3.5x4.5 cm & compress to 20-50KB with zero server upload.",
    h1: "Sarkari Result Photo & Signature Resizer Online",
    description: "Sarkari Result photo resizer specially engineered for Indian government exam applicants. Easily convert any phone photo or camera image into exact portal dimensions (pixels, cm, mm) and compress file size below 50KB or 20KB without quality loss. Supports searches: sarkari result photo resizer online, sarkari result tools image maker, sarkari exam photo size reducer.",
    howTo: [
      "Select your photo or signature file from your phone camera roll or PC",
      "Choose your exam preset (SSC CGL, UPSC, IBPS, RRB, PAN, etc.) or set custom dimensions",
      "Preview the pre-download portal validation checker to ensure size compliance",
      "Click Download to save your portal-ready JPG photo instantly"
    ],
    faqs: [
      { q: "Sarkari Result photo resizer use karna safe hai?", a: "Ha 100% safe hai. Aapki photo hamare server par upload nahi hoti — sabhi resizing aapke browser memory me 100% private hoti hai." },
      { q: "SSC CGL ke liye photo size kitna hona chahiye?", a: "SSC exams ke liye photo 3.5cm x 4.5cm (413x531 px) aur file size strictly 20KB se 50KB ke beech honi chahiye." }
    ],
    relatedTools: ["name-date-photo-generator", "signature-resizer-10-20kb", "smart-resizer"],
  },

  "name-date-photo-generator": {
    metaTitle: "Name & Date on Photo Generator — UPSC & SSC Online Tool | SarkariPixels",
    metaDesc: "Add applicant name and Date of Photo (DOP) on passport photo online for UPSC CSE, SSC & State PSC forms. White strip generator with live preview.",
    h1: "Name & Date on Photo Generator Online (UPSC & SSC)",
    description: "Easily generate passport size photos with Candidate Name and Date of Photo (DOP) printed on a clean white strip at the bottom. Mandatory requirement for UPSC CSE 10-day rule, SSC, and Railway exam online applications.",
    howTo: [
      "Upload your recent front-facing passport photograph",
      "Enter candidate Name and Date on Photo (DOP)",
      "Adjust font size and white banner strip position in real-time",
      "Download high-resolution passport photo with clear name & date stamp"
    ],
    faqs: [
      { q: "UPSC 10-day photo rule kya hai?", a: "UPSC mandatory rule ke mutabik photo online portal opening date se 10 din se purani nahi honi chahiye aur bottom pe candidate name aur photo date print hona chahiye." }
    ],
    relatedTools: ["sarkari-result-photo-resizer", "ssc-cgl-photo-resizer", "passport-maker"],
  },

  "signature-resizer-10-20kb": {
    metaTitle: "Signature Resizer 10KB to 20KB — IBPS, SSC & Bank Exams | SarkariPixels",
    metaDesc: "Resize and compress signature photo between 10KB to 20KB online for IBPS PO, Clerk, SSC CGL, RRB & bank forms. Convert dark photo to white background.",
    h1: "Signature Resizer 10KB to 20KB Online Free",
    description: "Dedicated signature resizer tool for IBPS PO/Clerk, SSC, SBI, and State PSC applications. Crops signature to 140x60 pixels (4.0cm x 2.0cm) and compresses file size strictly between 10KB and 20KB. Supports searches: signature resize 10 to 20 kb jpg format online, signature resize 10 to 20 kb width and height, signature resize 10 to 20 kb online free.",
    howTo: [
      "Upload signature photo taken from smartphone camera",
      "Use crop tool to select signature region clearly",
      "Apply 1-click Background Cleaner to remove dark camera shadow",
      "Download crisp signature image within 10KB-20KB limit"
    ],
    faqs: [
      { q: "Signature background white kaise karein?", a: "SarkariPixels Signature Cleaner tool camera shadow/grey tint ko remove karke background ko pure white aur signature ink ko deep black kar deta hai." }
    ],
    relatedTools: ["sarkari-result-photo-resizer", "name-date-photo-generator", "smart-resizer"],
  },

  "pan-card-photo-resizer-300dpi": {
    metaTitle: "PAN Card Photo Resizer 300 DPI — NSDL & UTI Online Tool | SarkariPixels",
    metaDesc: "Resize photo & signature for NSDL / UTI PAN card application at 300 DPI. Format photo to 2.5x3.5 cm (300 DPI) and signature to 2x4.5 cm under 20KB.",
    h1: "PAN Card Photo & Signature Resizer 300 DPI",
    description: "Format passport photo and signature images to exact NSDL and UTI PAN card application specifications (300 DPI, 2.5cm x 3.5cm photo, 2cm x 4.5cm signature, file size under 20KB). Supports searches: uti pan card photo and signature size online free, uti pan card photo and signature size converter, uti pan application photo signature size tool.",
    howTo: [
      "Upload photo or signature image",
      "Select PAN Card preset (300 DPI)",
      "Verify dimensions and file size under 20KB",
      "Download compliant JPEG file for NSDL/UTI portal upload"
    ],
    faqs: [
      { q: "PAN card ke liye photo ka DPI kitna hona chahiye?", a: "NSDL aur UTI PAN card portal par photo aur signature 300 DPI resolution me hone zaroori hain." }
    ],
    relatedTools: ["sarkari-result-photo-resizer", "signature-resizer-10-20kb", "reduce-kb"],
  },

  "ssc-cgl-photo-resizer": {
    metaTitle: "SSC CGL Photo Resizer 3.5 x 4.5 cm (20KB - 50KB) | SarkariPixels",
    metaDesc: "Format photo for SSC CGL, CHSL, MTS & GD online application. 3.5cm x 4.5cm dimensions (413x531 px) and 20KB to 50KB compression with zero quality loss.",
    h1: "SSC CGL Photo Resizer 3.5 x 4.5 cm Online",
    description: "Instant photo resizer for SSC CGL, CHSL, MTS, CPO, and Stenographer examinations. Auto-formats photo to 3.5cm x 4.5cm (413x531 pixels at 300 DPI) and compresses file size strictly between 20KB and 50KB.",
    howTo: [
      "Upload your passport photograph",
      "Verify face coverage (70-80% of photo area)",
      "Check file size indicator (must be between 20KB and 50KB)",
      "Click Download to save final SSC compliant JPG"
    ],
    faqs: [
      { q: "SSC form me photo reject kyun hoti hai?", a: "File size >50KB hone par, cap/chashma lene par, blurry photo hone par ya wrong background hone par SSC portal photo reject kar deta hai." }
    ],
    relatedTools: ["sarkari-result-photo-resizer", "name-date-photo-generator", "reduce-kb"],
  },
  "neet-exam-admit-card-photo-size": {
    metaTitle: "Neet Exam Admit Card Photo Size Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize neet exam admit card photo size online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Neet Exam Admit Card Photo Size Online Free",
    description: `Neet Exam Admit Card Photo Size utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "bpsc-photo-and-signature-size": {
    metaTitle: "Bpsc Photo And Signature Size Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize bpsc photo and signature size online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Bpsc Photo And Signature Size Online Free",
    description: `Bpsc Photo And Signature Size utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "bpsc-photo-size": {
    metaTitle: "Bpsc Photo Size Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize bpsc photo size online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Bpsc Photo Size Online Free",
    description: `Bpsc Photo Size utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "bpsc-photo-resizer": {
    metaTitle: "Bpsc Photo Resizer Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize bpsc photo resizer online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Bpsc Photo Resizer Online Free",
    description: `Bpsc Photo Resizer utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "photo-resize-20kb-to-200kb": {
    metaTitle: "Photo Resize 20Kb To 200Kb Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize photo resize 20kb to 200kb online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Photo Resize 20Kb To 200Kb Online Free",
    description: `Photo Resize 20Kb To 200Kb utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "photo-resize-20kb-to-50-kb": {
    metaTitle: "Photo Resize 20Kb To 50 Kb Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize photo resize 20kb to 50 kb online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Photo Resize 20Kb To 50 Kb Online Free",
    description: `Photo Resize 20Kb To 50 Kb utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "photo-resize-20kb-jpg": {
    metaTitle: "Photo Resize 20Kb Jpg Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize photo resize 20kb jpg online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Photo Resize 20Kb Jpg Online Free",
    description: `Photo Resize 20Kb Jpg utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "ibps-po-photo-resizer": {
    metaTitle: "Ibps Po Photo Resizer Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize ibps po photo resizer online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Ibps Po Photo Resizer Online Free",
    description: `Ibps Po Photo Resizer utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "sbi-po-photo-and-signature-size": {
    metaTitle: "Sbi Po Photo And Signature Size Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize sbi po photo and signature size online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Sbi Po Photo And Signature Size Online Free",
    description: `Sbi Po Photo And Signature Size utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "ibps-po-photo-and-signature-size": {
    metaTitle: "Ibps Po Photo And Signature Size Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize ibps po photo and signature size online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Ibps Po Photo And Signature Size Online Free",
    description: `Ibps Po Photo And Signature Size utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "rrb-photo-resizer-online": {
    metaTitle: "Rrb Photo Resizer Online Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize rrb photo resizer online online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Rrb Photo Resizer Online Online Free",
    description: `Rrb Photo Resizer Online utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "rrb-photo-resizer-140x60-pixels": {
    metaTitle: "Rrb Photo Resizer 140X60 Pixels Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize rrb photo resizer 140x60 pixels online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Rrb Photo Resizer 140X60 Pixels Online Free",
    description: `Rrb Photo Resizer 140X60 Pixels utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "rrb-photo-resizer": {
    metaTitle: "Rrb Photo Resizer Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize rrb photo resizer online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Rrb Photo Resizer Online Free",
    description: `Rrb Photo Resizer utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "sarkari-exam-photo-resizer": {
    metaTitle: "Sarkari Exam Photo Resizer Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize sarkari exam photo resizer online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Sarkari Exam Photo Resizer Online Free",
    description: `Sarkari Exam Photo Resizer utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "signature-resize-width-and-height-in-cm": {
    metaTitle: "Signature Resize Width And Height In Cm Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize signature resize width and height in cm online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Signature Resize Width And Height In Cm Online Free",
    description: `Signature Resize Width And Height In Cm utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "signature-resize-10-to-20-kb": {
    metaTitle: "Signature Resize 10 To 20 Kb Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize signature resize 10 to 20 kb online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Signature Resize 10 To 20 Kb Online Free",
    description: `Signature Resize 10 To 20 Kb utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "signature-resize-in-kb": {
    metaTitle: "Signature Resize In Kb Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize signature resize in kb online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Signature Resize In Kb Online Free",
    description: `Signature Resize In Kb utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "passport-photo-online-maker": {
    metaTitle: "Passport Photo Online Maker Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize passport photo online maker online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Passport Photo Online Maker Online Free",
    description: `Passport Photo Online Maker utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "passport-photo-online-delivery": {
    metaTitle: "Passport Photo Online Delivery Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize passport photo online delivery online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Passport Photo Online Delivery Online Free",
    description: `Passport Photo Online Delivery utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "passport-photo-online-free": {
    metaTitle: "Passport Photo Online Free Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize passport photo online free online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Passport Photo Online Free Online Free",
    description: `Passport Photo Online Free utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "ssc-photo-size": {
    metaTitle: "Ssc Photo Size Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize ssc photo size online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Ssc Photo Size Online Free",
    description: `Ssc Photo Size utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "ssc-photo-and-signature-size": {
    metaTitle: "Ssc Photo And Signature Size Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize ssc photo and signature size online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Ssc Photo And Signature Size Online Free",
    description: `Ssc Photo And Signature Size utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "ssc-photo-resizer": {
    metaTitle: "Ssc Photo Resizer Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize ssc photo resizer online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Ssc Photo Resizer Online Free",
    description: `Ssc Photo Resizer utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "upsc-photo-size": {
    metaTitle: "Upsc Photo Size Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize upsc photo size online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Upsc Photo Size Online Free",
    description: `Upsc Photo Size utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "guides/crop-signature-from-mobile-photo": {
    metaTitle: "Guides/Crop Signature From Mobile Photo Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize guides/crop signature from mobile photo online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Guides/Crop Signature From Mobile Photo Online Free",
    description: `Guides/Crop Signature From Mobile Photo utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "guides/remove-background-passport-photo": {
    metaTitle: "Guides/Remove Background Passport Photo Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize guides/remove background passport photo online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Guides/Remove Background Passport Photo Online Free",
    description: `Guides/Remove Background Passport Photo utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "guides/compress-image-to-20kb": {
    metaTitle: "Guides/Compress Image To 20Kb Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize guides/compress image to 20kb online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Guides/Compress Image To 20Kb Online Free",
    description: `Guides/Compress Image To 20Kb utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "guides/navy-airforce-photo-slate": {
    metaTitle: "Guides/Navy Airforce Photo Slate Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize guides/navy airforce photo slate online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Guides/Navy Airforce Photo Slate Online Free",
    description: `Guides/Navy Airforce Photo Slate utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "guides/convert-png-to-jpg-without-software": {
    metaTitle: "Guides/Convert Png To Jpg Without Software Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize guides/convert png to jpg without software online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Guides/Convert Png To Jpg Without Software Online Free",
    description: `Guides/Convert Png To Jpg Without Software utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "guides/resize-image-mobile-chrome": {
    metaTitle: "Guides/Resize Image Mobile Chrome Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize guides/resize image mobile chrome online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Guides/Resize Image Mobile Chrome Online Free",
    description: `Guides/Resize Image Mobile Chrome utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "guides/lic-aao-photo-requirements": {
    metaTitle: "Guides/Lic Aao Photo Requirements Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize guides/lic aao photo requirements online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Guides/Lic Aao Photo Requirements Online Free",
    description: `Guides/Lic Aao Photo Requirements utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "guides/sbi-clerk-photo-rejection": {
    metaTitle: "Guides/Sbi Clerk Photo Rejection Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize guides/sbi clerk photo rejection online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Guides/Sbi Clerk Photo Rejection Online Free",
    description: `Guides/Sbi Clerk Photo Rejection utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "guides/passport-photo-dimensions-cm-px": {
    metaTitle: "Guides/Passport Photo Dimensions Cm Px Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize guides/passport photo dimensions cm px online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Guides/Passport Photo Dimensions Cm Px Online Free",
    description: `Guides/Passport Photo Dimensions Cm Px utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "guides/photo-dpi-checker-online": {
    metaTitle: "Guides/Photo Dpi Checker Online Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize guides/photo dpi checker online online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Guides/Photo Dpi Checker Online Online Free",
    description: `Guides/Photo Dpi Checker Online utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "guides/signature-resize-10-20kb": {
    metaTitle: "Guides/Signature Resize 10 20Kb Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize guides/signature resize 10 20kb online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Guides/Signature Resize 10 20Kb Online Free",
    description: `Guides/Signature Resize 10 20Kb utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "guides/neet-photo-post-card-size": {
    metaTitle: "Guides/Neet Photo Post Card Size Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize guides/neet photo post card size online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Guides/Neet Photo Post Card Size Online Free",
    description: `Guides/Neet Photo Post Card Size utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "guides/bpsc-photo-signature-guide": {
    metaTitle: "Guides/Bpsc Photo Signature Guide Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize guides/bpsc photo signature guide online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Guides/Bpsc Photo Signature Guide Online Free",
    description: `Guides/Bpsc Photo Signature Guide utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "guides/rrb-ntpc-photo-size": {
    metaTitle: "Guides/Rrb Ntpc Photo Size Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize guides/rrb ntpc photo size online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Guides/Rrb Ntpc Photo Size Online Free",
    description: `Guides/Rrb Ntpc Photo Size utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "guides/bssc-inter-level-photo": {
    metaTitle: "Guides/Bssc Inter Level Photo Online for Govt Exams — Free & Fast | SarkariPixels",
    metaDesc: "Resize, compress, and optimize guides/bssc inter level photo online to exact KB and pixel specifications for SSC, UPSC, RRB, and State PSC recruitment portals.",
    h1: "Guides/Bssc Inter Level Photo Online Free",
    description: `Guides/Bssc Inter Level Photo utility engineered specifically for government job aspirants, cyber cafe operators, and students. Easily prepare document photos and signatures meeting strict official portal constraints (such as 3.5cm x 4.5cm or 20KB to 50KB limits). Built using client-side canvas algorithms to ensure high facial clarity, zero pixelation, and complete privacy with no file uploads to external servers.`,
    howTo: [
      "Upload your photo or signature by clicking the file selector or drag & drop",
      "Set your desired width, height, or maximum file size limit (KB)",
      "Preview the output in real-time to ensure facial features remain sharp",
      "Download your compliant image ready for immediate submission on exam portals"
    ],
    faqs: [
      { q: "What are the standard photo specifications for government recruitment exams?", a: "Most central and state recruitment boards (SSC, UPSC, RRB, IBPS) require recent passport photographs (3.5cm x 4.5cm) with a file size strictly between 20KB and 50KB." },
      { q: "Will using this tool lower the quality or readability of my photo?", a: "No. Our in-browser canvas utilizes advanced bi-cubic interpolation to downscale images smoothly while retaining crisp text and facial details." },
      { q: "Is it safe to process confidential documents on SarkariPixels?", a: "Yes, 100% safe. All computations occur within your device's browser memory. Your files are never uploaded to any remote server or stored anywhere." },
      { q: "Can I use this tool directly on an Android or iPhone device?", a: "Yes, our tools are fully responsive and optimized for mobile browsers, allowing you to crop and compress photos straight from your mobile camera roll." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "resize-image": {
    metaTitle: "Batch Photo Resizer Online for Govt Exams & Documents | SarkariPixels",
    metaDesc: "Resize multiple images and photos simultaneously to exact pixels, cm, or mm. 100% free, browser-based batch tool for SSC, UPSC, and State PSC application forms.",
    h1: "Batch Image Resizer Online Free",
    description: `Batch photo resizing utility built specifically for exam candidates, cyber cafe operators, and documentation specialists. Resize multiple photos at once to uniform dimensions (such as 3.5cm x 4.5cm or 350x450 px) while locking aspect ratio. Built using high-performance client-side canvas algorithms to preserve face sharpness, text readability on admit cards, and official government portal specifications with zero server upload.`,
    howTo: [
      "Select one or more photos by clicking Upload or dragging them into the workspace",
      "Set your desired width, height, and unit (pixels, cm, or mm)",
      "Toggle Aspect Ratio Lock to ensure photos don't stretch or distort",
      "Click Process to execute instant in-browser optimization and download all files"
    ],
    faqs: [
      { q: "What dimensions are commonly required for SSC and UPSC exam photos?", a: "Most central and state exam portals require passport-style photos with dimensions of 3.5 cm (width) x 4.5 cm (height), or approximately 350 x 450 pixels at 300 DPI." },
      { q: "Will resizing multiple images reduce the image quality?", a: "No. SarkariPixels uses bi-cubic canvas interpolation that maintains edge clarity and prevents pixelation even when downsizing photos." },
      { q: "Can I resize photos and signatures at the same time?", a: "Yes. You can process photos to 3.5x4.5cm and signatures to 4.0x2.0cm in separate batches within seconds." }
    ],
    relatedTools: ["smart-resizer", "reduce-kb", "passport-maker"],
  },

  "crop-image": {
    metaTitle: "Free Online Image Cropper for Passport & Govt Exam Forms | SarkariPixels",
    metaDesc: "Crop photos to exact passport (3.5x4.5cm), square (1:1), or custom aspect ratios for government exam portals. No file uploads, 100% secure in your browser.",
    h1: "Crop Image Online for Exam & Passport Photos",
    description: `Precision photo cropper designed for strict exam portal requirements. Remove background clutter, align face boundaries, and crop to exact aspect ratios required by SSC, UPSC, NTA, and State Public Service Commissions without downloading heavy software. All processing executes 100% in your local browser sandbox to keep your private ID photos safe.`,
    howTo: [
      "Upload your photo from your device storage or camera roll",
      "Drag the crop box to center your face (head should cover roughly 70-80% of frame)",
      "Select a preset aspect ratio (1:1, 3.5:4.5 passport, or custom)",
      "Click Crop to generate your perfectly aligned document photo instantly"
    ],
    faqs: [
      { q: "What is the correct face alignment rule for exam application photos?", a: "Official recruitment guidelines state that the candidate's face must occupy 70% to 80% of the photograph with both ears clearly visible and eyes looking directly into the camera." },
      { q: "Can I crop circular or oval profile photos?", a: "Yes. Our cropping tool supports standard rectangular crops for government forms as well as circular profile crops for online portal avatars." },
      { q: "Does cropping remove EXIF location metadata from my photo?", a: "Yes. Our canvas rendering cleanly exports a fresh image stream, stripping private GPS and device metadata automatically." }
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
      { q: "50KB se neeche compress karne par quality kharab hogi kya?", a: "Thodi visual quality compromise hoti hai, lekin 20–50KB range mein photo readable aur clear rehti hai. Dhyan rahe ki portals file size limit aur visual clarity (chehra bilkul saaf dikhna) dono criteria enforce karte hain." },
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
      { q: "Signature faint hone ka risk hai?", a: "Nahi, binary canvas compression ink contrast aur stroke definition preserve karti hai taaki signature clearly legible rahe." },
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
      { q: "35KB target kyun rakha gaya hai?", a: "35KB target 20KB minimum aur 50KB maximum ka safe mid-point hai, jo server-side byte calculation differences ke bavjood safe zone mein rehta hai." },
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
      { q: "50KB compress karne ke baad photo reject hogi?", a: "Agar dimensions official notification ke anusaar hain (jaise SSC ke liye 3.5×4.5cm), background plain white hai, aur facial features bilkul clear hain, toh photo official technical specs ko fully satisfy karegi." },
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
  "up-police-photo-resizer": {
    metaTitle: "UP Police Photo Size Resizer (20KB–50KB) & Signature (5–20KB) | SarkariPixels",
    metaDesc: "Resize photo and signature for UP Police Constable & SI recruitment portal. Formats 35x45mm (20-50KB) and signature (5-20KB) in JPG format with zero server upload.",
    h1: "UP Police Photo & Signature Resizer Online",
    description: "Dedicated online image formatting tool for Uttar Pradesh Police Recruitment & Promotion Board (UPPRPB). Automatically adjusts candidate photo to 3.5cm x 4.5cm (350x450 px) between 20KB and 50KB, and signature to 3.5cm x 1.5cm between 5KB and 20KB in strict compliance with official UP Police Constable and Sub-Inspector notification criteria. Supports searches: rrb photo and signature size converter online free, uppsc photo and signature resize online free, up police constable photo and signature size.",
    howTo: [
      "Select your passport photo or signature image from phone or PC",
      "The tool auto-applies UP Police 35x45mm dimensions and sets target file size",
      "Verify the 70% face coverage and plain white/light background preview",
      "Click Download to save portal-ready JPG files instantly"
    ],
    faqs: [
      { q: "UP Police Constable photo size kitna hona chahiye?", a: "UP Police recruitment me photo 3.5cm x 4.5cm (20KB se 50KB) aur signature 3.5cm x 1.5cm (5KB se 20KB) hona mandatory hai." },
      { q: "Kya UP Police photo me dono kaan dikhna zaroori hai?", a: "Haan, official notification ke mutabik candidate ke dono kaan saaf dikhne chahiye aur background plain light gray ya white hona chahiye." },
      { q: "Signature black ink me hona chahiye ya blue?", a: "Signature clean white unruled paper par black ink pen se hona chahiye." }
    ],
    relatedTools: ["signature-whitener", "name-date-dop-stamp", "compress-50", "signature-resizer-10-20kb"],
  },

  "ctet-photo-signature-resizer": {
    metaTitle: "CTET Photo & Signature Resizer (10KB–100KB) — CBSE Online Tool | SarkariPixels",
    metaDesc: "Free online photo and signature resizer for CBSE CTET 2026-2027 application forms. Compress photo between 10-100KB (3.5x4.5cm) and signature 3-30KB.",
    h1: "CTET Photo & Signature Resizer Online (CBSE)",
    description: "Format photo and signature images for Central Teacher Eligibility Test (CTET) conducted by CBSE. Ensures photo is scaled to 3.5 cm x 4.5 cm with file size between 10KB and 100KB, and signature to 3.5 cm x 1.5 cm between 3KB and 30KB. All conversions process locally in browser memory with zero data upload. Supports searches: ctet photo and signature size 2024 in pixel, ctet photo and signature size 2024 resize, ctet photo and signature size in pixels.",
    howTo: [
      "Upload your recent passport photograph or scanned signature",
      "Choose CTET Photo or CTET Signature preset",
      "Check that photo file size is within 10KB to 100KB limit",
      "Download compliant JPG file and upload to ctet.nic.in without error"
    ],
    faqs: [
      { q: "CTET exam me photo aur signature ka size kya hai?", a: "CTET portal par photo 10KB se 100KB (3.5x4.5cm) aur signature 3KB se 30KB (3.5x1.5cm) JPG format me mangi jaati hai." },
      { q: "Kya chashma laga kar CTET photo upload kar sakte hain?", a: "Dark spectacles ya sunglasses strictly prohibited hain. Clear eyesight glasses allowed hain agar flash reflection na ho." }
    ],
    relatedTools: ["compress-100", "signature-resizer-10-20kb", "signature-whitener"],
  },

  "upsssc-pet-photo-resizer": {
    metaTitle: "UPSSSC PET Photo Resizer Under 50KB & Signature Maker | SarkariPixels",
    metaDesc: "Format photo under 50KB and signature with candidate name below under 30KB for UPSSSC PET, Lekhpal, and VDO application forms.",
    h1: "UPSSSC PET Photo & Signature Resizer Online",
    description: "Format candidate photo and special dual signature for Uttar Pradesh Subordinate Services Selection Commission (UPSSSC PET, Lekhpal, Junior Assistant). Resizes colored photograph to 3.5cm x 4.5cm under 50KB, and accommodates UPSSSC's signature guideline requiring candidate's full name written below signature under 30KB. Supports searches: upsssc 50kb photo compressor, upsssc signature name maker, upsssc pet photo size.",
    howTo: [
      "Upload candidate passport photo or signature image",
      "Tool sets dimensions to 3.5x4.5 cm and compresses under 50KB",
      "Check preview for clear facial features and white background",
      "Download the validated JPG file ready for upsssc.gov.in"
    ],
    faqs: [
      { q: "UPSSSC signature me name likhna compulsory hai?", a: "Haan, UPSSSC portal par signature ke theek neeche candidate ka poora naam Hindi ya English me likhna anivarya hota hai." },
      { q: "Photo ka maximum size kitna hona chahiye?", a: "Photo maximum 50KB aur signature maximum 30KB JPG/JPEG format me hona chahiye." }
    ],
    relatedTools: ["up-police-photo-resizer", "compress-50", "signature-whitener"],
  },

  "mp-vyapam-template-generator": {
    metaTitle: "MPPEB Vyapam Profile Template Maker — Photo, Signature & Declaration | SarkariPixels",
    metaDesc: "Create 1-sheet combined MP ESB Vyapam Profile Template with Photo, Name & Date, Signature, and Declaration between 100KB and 200KB for MP exams.",
    h1: "MPPEB Vyapam Profile Template Maker Online",
    description: "Generate the mandatory single-page MP ESB (Vyapam) candidate profile template in one click. Combines candidate passport photo with Candidate Name and Date of Photo (DOP) printed, signature, and two-line self-declaration into one standardized image sheet strictly compressed between 100KB and 200KB. Supports searches: mp esb photo signature template maker, vyapam template format generator, vyapam profile pdf download.",
    howTo: [
      "Upload candidate photo and enter Candidate Name & Date of Photo",
      "Upload signature and handwritten declaration sample",
      "Tool automatically stitches them into official MPPEB template layout",
      "Download the complete template image strictly sized between 100KB-200KB"
    ],
    faqs: [
      { q: "Vyapam template ka size kitna hona chahiye?", a: "MP ESB Vyapam profile template ka total file size 100KB se 200KB ke beech hona chahiye." },
      { q: "Kya photo par name aur date hona zaroori hai?", a: "Haan, MPPEB ke niyamo ke mutabik photo ke bottom me candidate ka naam aur photo khichwane ki taareekh saaf print honi chahiye." }
    ],
    relatedTools: ["name-date-dop-stamp", "compress-200", "signature-whitener", "handwritten-declaration-compressor"],
  },

  "rajasthan-cet-photo-resizer": {
    metaTitle: "Rajasthan CET & RPSC Photo Resizer (50KB–100KB) | SarkariPixels",
    metaDesc: "Format photograph between 50KB-100KB and signature between 20KB-50KB for Rajasthan CET, RSMSSB Patwar, and RPSC recruitment portals.",
    h1: "Rajasthan CET & RPSC Photo & Signature Resizer",
    description: "Resize and compress images for Rajasthan Staff Selection Board (RSMSSB CET, Patwar, Junior Accountant) and RPSC exams. Sets photograph to 3.5cm x 4.5cm between 50KB and 100KB and signature between 20KB and 50KB, ensuring zero rejection on SSO Rajasthan portals. Supports searches: rajasthan cet photo signature size, signature compressor to 50kb free, signature compressor to 50kb jpg.",
    howTo: [
      "Upload your photo or signature",
      "Tool pre-selects Rajasthan CET standard dimensions",
      "Confirm photo is between 50KB-100KB and signature between 20KB-50KB",
      "Download the validated JPG file"
    ],
    faqs: [
      { q: "Rajasthan CET photo kitne KB ki honi chahiye?", a: "Rajasthan CET aur RSMSSB exams me photo strictly 50KB se 100KB ke beech honi chahiye." },
      { q: "Signature ka size kitna hota hai?", a: "Signature 20KB se 50KB ke beech JPG format me hona anivarya hai." }
    ],
    relatedTools: ["compress-100", "compress-50", "signature-whitener"],
  },

  "bihar-police-photo-resizer": {
    metaTitle: "Bihar Police CSBC Photo Resizer Under 50KB & Dual Signature Tool | SarkariPixels",
    metaDesc: "Format colored passport photo under 50KB and English & Hindi signatures under 25KB each for Bihar Police Constable and BPSSC SI applications.",
    h1: "Bihar Police & BSSC Photo & Signature Resizer",
    description: "Format candidate photographs and dual signatures for Bihar Central Selection Board of Constable (CSBC), BPSSC Sub-Inspector, and BSSC Inter Level exams. Crops colored photo to 3.5cm x 4.5cm under 50KB and formats both English and Hindi signatures under 25KB each. Supports searches: bssc inter level photo signature size, bihar ssc inter level signature size, how to resize signature for bis form.",
    howTo: [
      "Select photo or signature file",
      "Preset automatically configures 3.5x4.5cm dimensions under 50KB",
      "Format Hindi and English signatures under 25KB independently",
      "Download compliant images for csbc.bihar.gov.in"
    ],
    faqs: [
      { q: "Bihar Police me kitne signature upload hote hain?", a: "Bihar CSBC aur BSSC forms me do alag-alag signature upload hote hain — ek Hindi me aur ek English me (dono 25KB se kam)." },
      { q: "Photo ka background kaisa hona chahiye?", a: "Background plain white hona chahiye aur chehra seedha camera ke samne hona chahiye." }
    ],
    relatedTools: ["compress-50", "signature-whitener", "signature-resizer-10-20kb"],
  },

  "neet-postcard-photo-resizer": {
    metaTitle: "NEET Postcard Photo Resizer (4x6 Inch / 10x15 cm) Under 200KB | SarkariPixels",
    metaDesc: "Resize 4\"x6\" postcard photograph with white background, 80% face coverage, and Name & Date stamp for NTA NEET UG entrance exam.",
    h1: "NEET Postcard Photo Resizer (4x6 Inch / 10x15 cm)",
    description: "Dedicated formatting tool for the mandatory 4\"x6\" (10x15 cm) postcard size photograph required for NTA NEET UG online applications and admit card pasting. Crops image to standard postcard aspect ratio, embeds candidate Name and Date of Taking Photograph, and compresses file between 10KB and 200KB. Supports searches: nta neet application form 2024 post postcard size photo, neet passport size photo with name and date maker, neet admit card postcard size photo signature.",
    howTo: [
      "Upload high-resolution passport/portrait photo",
      "Enter Candidate Name and Date of Photo",
      "Tool crops image to exact 4x6 inch postcard ratio with bottom white bar",
      "Download compliant JPG under 200KB ready for exams.nta.ac.in/NEET"
    ],
    faqs: [
      { q: "NEET me postcard photo ka size kitna hota hai?", a: "NEET UG me postcard photo 4 inch x 6 inch (10 cm x 15 cm) aur file size 10KB se 200KB ke beech hona chahiye." },
      { q: "Kya postcard photo par name aur date likhna zaroori hai?", a: "Haan, NTA guidelines ke mutabik photo ke bottom me candidate ka naam aur photo khichne ki date clear honi chahiye." }
    ],
    relatedTools: ["name-date-dop-stamp", "compress-200", "left-thumb-impression-resizer"],
  },

  "left-thumb-impression-resizer": {
    metaTitle: "Left Thumb Impression (LTI) Resizer 10KB–20KB & 20KB–50KB | SarkariPixels",
    metaDesc: "Crop and compress left thumb impression image to exact 10KB-20KB or 20KB-50KB with contrast enhancement for SSC, RRB, and IBPS online forms.",
    h1: "Left Thumb Impression (LTI) Resizer Online",
    description: "Easily crop, enhance, and compress Left Thumb Impression (LTI) scans or phone photographs. Cleans paper background and boosts ridge line contrast for clear fingerprint identification while compressing strictly to 10KB-20KB (SSC/IBPS) or 20KB-50KB (RRB/State PSCs). Supports searches: ssc thumb impression resizer online, ssc signature resize online free, left thumb impression size 20kb.",
    howTo: [
      "Take a clear photo of your ink thumb impression on white paper and upload",
      "Crop tightly around the thumb impression ridges",
      "Select target size: 10KB-20KB or 20KB-50KB",
      "Download enhanced thumb impression JPG"
    ],
    faqs: [
      { q: "SSC aur IBPS me thumb impression ka size kitna mangte hain?", a: "IBPS me LTI 20KB se 50KB aur SSC/State forms me 10KB se 20KB ya 20KB se 50KB mangi jaati hai." },
      { q: "Impression blue ink se lagana chahiye ya black?", a: "Blue ya Black dono ink pad chalte hain, lekin plain white paper par bina kisi smudge ke saaf impression hona chahiye." }
    ],
    relatedTools: ["signature-whitener", "handwritten-declaration-compressor", "compress-50", "signature-resizer-10-20kb"],
  },

  "handwritten-declaration-compressor": {
    metaTitle: "Handwritten Declaration Compressor 50KB to 100KB — IBPS & SBI | SarkariPixels",
    metaDesc: "Compress handwritten self-declaration image strictly between 50KB and 100KB while keeping black ink handwriting razor sharp for IBPS PO, Clerk & SBI.",
    h1: "Handwritten Declaration Compressor (50KB–100KB)",
    description: "Compress scanned or photographed handwritten self-declaration notes for IBPS PO, Clerk, SO, and SBI recruitment. Employs adaptive edge preservation so text remains completely legible while compressing file size strictly inside the mandatory 50KB to 100KB portal window. Supports searches: ibps handwritten declaration resize online, ibps handwritten declaration resize 100kb, ibps handwritten declaration resize 20 kb.",
    howTo: [
      "Upload photo of your handwritten declaration written on white paper",
      "Crop out surrounding desk shadows or excess margins",
      "Tool automatically balances compression to keep file between 50KB and 100KB",
      "Download razor-sharp declaration JPG ready for portal upload"
    ],
    faqs: [
      { q: "IBPS handwritten declaration ka size kitna hota hai?", a: "IBPS aur SBI recruitment me declaration ka size strictly 50KB se 100KB ke beech JPG format me hona chahiye." },
      { q: "Kya declaration blue pen se likh sakte hain?", a: "Nahi, official rules ke mutabik declaration sirf aur sirf black ink pen se white paper par likhna mandatory hai." }
    ],
    relatedTools: ["left-thumb-impression-resizer", "compress-100", "signature-whitener"],
  },

  "certificate-image-compressor-100kb": {
    metaTitle: "Certificate Photo Compressor Under 100KB & 200KB | SarkariPixels",
    metaDesc: "Compress caste certificate, domicile, EWS certificate or marksheet JPG photo under 100KB or 200KB for state e-district and recruitment portals.",
    h1: "Certificate Photo Compressor Under 100KB & 200KB",
    description: "Compress scanned government documents, caste certificates (OBC-NCL, SC, ST), EWS certificates, domicile (niwas praman patra), and academic marksheets under 100KB or 200KB. Maintains text and seal clarity without blurring serial numbers or QR codes. Supports searches: reduce pdf size to 200kb without losing quality online, reduce image size to 200kb without losing quality, reduce photo size to 200kb online free.",
    howTo: [
      "Upload certificate image (JPG, PNG or photo from phone)",
      "Choose target size: Under 100KB or Under 200KB",
      "Preview document readability to ensure all text and signatures are crisp",
      "Download compressed certificate JPG for instant portal upload"
    ],
    faqs: [
      { q: "Certificate compress karne par stamp aur signature blur to nahi honge?", a: "Hamara smart compression algorithm text aur seal ke edges ko preserve karta hai taaki document 100% readable rahe." },
      { q: "State e-district portals me kitna size mangte hain?", a: "Zyadatar state portals (UP e-District, Bihar RTPS, MP e-District) me certificates 100KB se kam size me mangi jaati hain." }
    ],
    relatedTools: ["compress-100", "compress-200", "compress-500"],
  },

  "name-date-dop-stamp": {
    metaTitle: "Name & Date on Photo Generator (DOP Stamp) — SSC & State Exams | SarkariPixels",
    metaDesc: "Add candidate name and Date of Photo (DOP) on bottom white strip for SSC, UPSC 10-day rule, and MP Vyapam online applications.",
    h1: "Name & Date on Photo Generator (DOP Stamp)",
    description: "Add a crisp, standardized white name and date banner to the bottom of your passport photo. Formats Candidate Full Name and Date of Photograph (DOP) in compliant bold black typography conforming to UPSC 10-day notification rules, SSC requirements, and State Police guidelines. Supports searches: passport size photo maker with name and date online free, passport size photo with name and date online free, passport size photo with name and date online.",
    howTo: [
      "Upload passport photograph",
      "Type candidate Name and Date of Photo (DD/MM/YYYY)",
      "Customize white banner height and font size if needed",
      "Download compliant photo with printed name and date stamp"
    ],
    faqs: [
      { q: "Photo par date kitni purani ho sakti hai?", a: "Zyadatar exams me photo notification release hone ki date se 3 mahine se purani nahi honi chahiye (UPSC me 10 din ka rule hota hai)." },
      { q: "Date of Birth (DOB) likhna hota hai ya Date of Photo (DOP)?", a: "DOP (Date of Photograph) likhna hota hai, DOB nahi — jab tak notification me specific DOB na bola gaya ho." }
    ],
    relatedTools: ["name-date-photo-generator", "sarkari-result-photo-resizer", "neet-postcard-photo-resizer"],
  },

  "signature-whitener": {
    metaTitle: "Signature Background Whitener & Enhancer Online Free | SarkariPixels",
    metaDesc: "Remove yellow shadows and dirty paper background from phone photos. Converts signature into pure white paper with dark black ink for all exam portals.",
    h1: "Signature Background Whitener & Enhancer Online",
    description: "Convert dark, shadowed phone photos of signatures on paper into studio-grade pure white backgrounds with rich black ink. Fixes common rejection triggers caused by dim indoor lighting, yellowish paper tones, or desk shadows with zero cloud uploads. Supports searches: change signature background to white online free, white background signature maker online free, change signature background to white online.",
    howTo: [
      "Upload phone photo of signature on white paper",
      "The tool automatically applies threshold whitening to eliminate background shadows",
      "Adjust contrast slider if ink needs to be darker or bolder",
      "Download clean signature ready for any recruitment portal"
    ],
    faqs: [
      { q: "Kya mobile se kheenchi hui signature photo clean ho sakti hai?", a: "Haan, yeh tool shadows aur yellow tint ko 100% pure white me convert kar deta hai aur signature ink ko clear black banata hai." },
      { q: "Kya signature ka background transparent karna zaroori hai?", a: "Govt exam portals par pure white background mangte hain, transparent PNG upload karne par portal error de sakta hai." }
    ],
    relatedTools: ["signature-resizer-10-20kb", "left-thumb-impression-resizer", "compress-20"],
  },

  "ssc-live-webcam-photo-resizer": {
    metaTitle: "SSC Live Webcam Photo Resizer (3.5×4.5 cm, 20-50KB) | SarkariPixels",
    metaDesc: "Crop and resize live webcam photos for SSC OTR portals (CGL, CHSL, MTS, GD). Ensures 80% face coverage and white background compliance.",
    h1: "SSC Live Webcam Photo Resizer (3.5×4.5 cm)",
    description: "Format webcam capture photographs to the exact Staff Selection Commission (SSC) specifications: 3.5cm width × 4.5cm height, 20KB to 50KB file size, 300 DPI, and compliant frontal face composition without spectacles or caps. Supports searches: ssc otr webcam photo resize 20kb to 50kb, ssc live capture photo tool, ssc live webcam photo size.",
    howTo: [
      "Upload your captured webcam photo or selfie",
      "Crop to standard 3.5cm × 4.5cm passport ratio with 80% face coverage",
      "Automatic compression ensures file size stays between 20KB and 50KB",
      "Download compliant JPEG photo and upload to ssc.gov.in portal"
    ],
    faqs: [
      { q: "SSC new website par live webcam photo kyu mangte hain?", a: "SSC ne impersonation rokne ke liye live webcam photo compulsory kiya hai, jisme 80% face coverage aur clear white/plain background hona zaroori hai." },
      { q: "Kya webcam photo me chashma pehan sakte hain?", a: "Nahi, SSC guidelines ke mutabiq chashma (spectacles) aur cap strictly prohibited hain." }
    ],
    relatedTools: ["passport-photo-maker", "name-date-dop-stamp", "compress-50"],
  },

  "pan-card-photo-signature-resizer": {
    metaTitle: "PAN Card Photo & Signature Resizer (213×213 px, 300 DPI) | SarkariPixels",
    metaDesc: "Resize photo to 213×213 px (300 DPI, < 30KB) and signature to 400×200 px (< 30KB) for UTI and NSDL PAN card application portals.",
    h1: "PAN Card Photo & Signature Resizer Online",
    description: "Create pixel-perfect photos and signatures for UTIITSL and Protean (NSDL) PAN card portals. Generates exact 213 × 213 pixels, 300 DPI, under 30KB photo and 400 × 200 pixels, 600 DPI, under 30KB signature with zero quality loss. Supports searches: uti pan card photo and signature size online in pixels, pan card photo size 213 x 213 online free, uti nsdl pan photo and sign resize tool.",
    howTo: [
      "Upload passport photograph or signature image",
      "Select PAN Photo (213×213 px) or PAN Signature (400×200 px)",
      "Tool sets 300 DPI / 600 DPI metadata and compresses file under 30KB",
      "Download ready-to-upload JPEG file for NSDL or UTI portal"
    ],
    faqs: [
      { q: "UTI PAN card photo ke exact dimensions kya hain?", a: "UTIITSL portal par photo 213 x 213 pixels (300 DPI) aur 30KB se kam honi chahiye." },
      { q: "PAN card signature ka size kya hona chahiye?", a: "Signature 400 x 200 pixels, 600 DPI (ya 200 DPI) aur strictly 30KB se kam size me honi chahiye." }
    ],
    relatedTools: ["passport-photo-maker", "signature-resizer-govt-forms", "compress-30"],
  },

  "caste-ews-income-certificate-compressor": {
    metaTitle: "Caste, EWS & Income Certificate Compressor Under 100KB | SarkariPixels",
    metaDesc: "Compress scanned caste, EWS, domicile, and income certificates below 100KB or 200KB for State e-District and central scholarship portals.",
    h1: "Caste, EWS & Income Certificate Compressor",
    description: "Compress government-issued certificate images (Caste, Non-Creamy Layer, EWS, Domicile/Niwas, Income Certificate) strictly below 100KB or 200KB for state e-District portals, UP e-District, MP Lok Seva, and National Scholarship Portals. Supports searches: income certificate 100kb resize online, caste certificate compress 100kb, compress community certificate.",
    howTo: [
      "Upload certificate photo or scan (JPG, PNG)",
      "Set target size to 100KB or 200KB",
      "Check document preview to confirm registration number and QR code are legible",
      "Download compressed certificate for immediate online form submission"
    ],
    faqs: [
      { q: "Certificate compress karne ke baad QR code scan hoga?", a: "Haan, hamara high-fidelity compression text aur QR code clarity preserve karta hai taaki verification me koi dikkat na aaye." },
      { q: "e-District portal par kaun sa format accept hota hai?", a: "Zyadatar portals JPG/JPEG aur PDF format accept karte hain jinka size 100KB se kam hona chahiye." }
    ],
    relatedTools: ["compress-100", "compress-200", "compress-for-ssc-upsc"],
  },

  "aadhaar-card-mask-compressor": {
    metaTitle: "Mask Aadhaar Card & Compress Under 200KB Online | SarkariPixels",
    metaDesc: "Black out or blur the first 8 digits of your Aadhaar card for privacy and compress the document under 200KB for government job verification.",
    h1: "Mask Aadhaar Card & Compress Under 200KB",
    description: "Protect your personal privacy by masking the first 8 digits of your Aadhaar number (XXXX-XXXX-1234) before sharing copies for job applications. Complies with UIDAI guidelines and reduces document size below 200KB in your browser. Supports searches: mask aadhaar card download online pdf, mask aadhaar pvc card online apply, masked aadhaar card online check.",
    howTo: [
      "Upload Aadhaar card image or scan",
      "Use the mask cursor to black out or blur the first 8 digits of the Aadhaar number",
      "Adjust output size to under 200KB for exam portal uploads",
      "Download masked, privacy-safe Aadhaar card copy"
    ],
    faqs: [
      { q: "Masked Aadhaar card kya hota hai?", a: "Masked Aadhaar me shuru ke 8 digits chupaye (XXXX-XXXX) hote hain aur sirf aakhiri 4 digits dikhai dete hain, jo UIDAI dwara legally valid aur secure mana jata hai." },
      { q: "Kya sarkari forms me masked Aadhaar chalta hai?", a: "Haan, UIDAI ke advisory ke mutabiq identity verification ke liye masked Aadhaar dena sabse safe aur recommended hai." }
    ],
    relatedTools: ["blur-faces-photos", "compress-200", "signature-whitener"],
  },

  "voter-id-card-resizer": {
    metaTitle: "Voter ID Card Front & Back Joiner & Compressor (200KB) | SarkariPixels",
    metaDesc: "Join the front and back sides of your Voter ID (EPIC) card onto a single page and compress under 200KB for government exam verification.",
    h1: "Voter ID Card Front & Back Joiner Online",
    description: "Combine the front side and back side of your Voter ID card (EPIC) vertically or horizontally into a single clean sheet. Auto-compresses the combined document below 200KB for hassle-free online recruitment verification. Supports searches: voter id front back joiner online, join voter card front and back, epic card 200kb compressor.",
    howTo: [
      "Upload Front Side and Back Side of your Voter ID card",
      "Choose layout: Vertical (stacked) or Horizontal (side-by-side)",
      "Tool joins both sides seamlessly and optimizes file size under 200KB",
      "Download combined single-sheet Voter ID card"
    ],
    faqs: [
      { q: "Voter ID ke dono sides ko ek page par kaise laye?", a: "Is tool me Front aur Back dono photos upload karein, yeh automatically dono ko ek page par arrange karke 200KB ke andar compress kar deta hai." }
    ],
    relatedTools: ["join-two-images-vertically", "compress-200", "id-card-sheet-maker"],
  },

  "sarkari-exam-age-calculator": {
    metaTitle: "Sarkari Exam Age Calculator with Category Relaxation | SarkariPixels",
    metaDesc: "Calculate your exact age as on notification cut-off date with official category age relaxation (OBC +3 yrs, SC/ST +5 yrs, PwD +10 yrs).",
    h1: "Sarkari Exam Age Calculator Online",
    description: "Free official government exam age calculator. Accurately determines your exact age in Years, Months, and Days as on the notification cut-off date. Includes built-in reservation relaxation filters for OBC (+3 years), SC/ST (+5 years), PwBD (+10 to +15 years), and Ex-Servicemen with instant eligibility checks for SSC, UPSC, State Police, Railway, and Banking exams. Supports searches: ssc age calculator with category relaxation, age calculator as on date for govt exam, age calculator for government exam.",
    howTo: [
      "Enter your Date of Birth (DOB)",
      "Select Cut-Off Date from notification (e.g., 01/07/2026 or 01/01/2026)",
      "Select your Reservation Category (General, OBC, SC/ST, PwD)",
      "View exact calculated age, category relaxation applied, and instant eligibility status"
    ],
    faqs: [
      { q: "Sarkari exam me age calculate karne ki cut-off date kya hoti hai?", a: "Har exam notification me specific cut-off date hoti hai (jaise 1 January ya 1 July). Candidate ki age usi date par check ki jaati hai." },
      { q: "OBC aur SC/ST candidates ko kitni age relaxation milti hai?", a: "Central aur state exams me OBC (Non-Creamy Layer) ko 3 saal aur SC/ST candidates ko 5 saal ki upper age limit relaxation milti hai." }
    ],
    relatedTools: ["smart-resizer", "passport-photo-maker", "sarkari-result-photo-resizer"],
  },
};

// Get content for a tool, with graceful fallback for tools without specific content
export function getToolContent(toolId: string): ToolContent | null {
  return TOOL_CONTENT[toolId] || null;
}
