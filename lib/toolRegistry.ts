// lib/toolRegistry.ts
// Foundational, typed single source of truth for all SarkariPixels tool capabilities,
// input/output specifications, workflow steps, and SEO metadata.

import { TOOLS, Tool, ToolCategory } from "./tools-data";

export type WorkflowType =
  | "resize"
  | "compress"
  | "signature"
  | "enhance"
  | "convert"
  | "crop"
  | "effect"
  | "id-sheet"
  | "metadata"
  | "utility"
  | "general";

export interface ToolStep {
  step: number;
  title: string;
}

export interface ToolRegistryItem {
  toolId: string;
  name: string;
  category: ToolCategory;
  workflowType: WorkflowType;
  acceptedInputs: string[];
  outputFormat: string;
  setsDPI: boolean;
  summary: string;
  steps: ToolStep[];
}

// Special custom configurations for tools that diverge from standard resize/compress
const CUSTOM_TOOL_METADATA: Record<string, Partial<ToolRegistryItem>> = {
  "generate-signature": {
    workflowType: "signature",
    acceptedInputs: ["Direct Text Input", "Touch / Stylus Drawing"],
    outputFormat: "PNG (Transparent) or JPG (White Background)",
    setsDPI: false,
    summary:
      "Generate or draw digital signatures directly in your browser. Create transparent PNG or crisp white-background signatures sized for government exam forms without uploading files.",
    steps: [
      { step: 1, title: "Type or Draw" },
      { step: 2, title: "Adjust Ink & Dimensions" },
      { step: 3, title: "Download Signature" },
    ],
  },
  "photo-enhancer": {
    workflowType: "enhance",
    acceptedInputs: ["JPG", "PNG", "WEBP"],
    outputFormat: "JPG (High Quality)",
    setsDPI: false,
    summary:
      "Enhance photo clarity directly in your browser using deterministic histogram equalization and adaptive sharpening to meet portal clarity guidelines without server uploads.",
    steps: [
      { step: 1, title: "Upload Photo" },
      { step: 2, title: "Auto-Enhance Clarity" },
      { step: 3, title: "Download Enhanced JPG" },
    ],
  },
  "increase-kb": {
    workflowType: "compress",
    acceptedInputs: ["JPG", "JPEG", "PNG"],
    outputFormat: "JPG (Padded Bytes)",
    setsDPI: false,
    summary:
      "Increase image file size in KB via padding to satisfy recruitment portal minimum limits. Discloses server-side re-compression stripping risks and recommends physical pixel upscaling via Resize Image Pixel for permanent compliance.",
    steps: [
      { step: 1, title: "Upload Image" },
      { step: 2, title: "Set Minimum KB" },
      { step: 3, title: "Download Padded JPG" },
    ],
  },
  "check-dpi": {
    workflowType: "utility",
    acceptedInputs: ["JPG", "JPEG"],
    outputFormat: "Diagnostic Report (No Download)",
    setsDPI: false,
    summary:
      "Inspect JFIF header metadata of your JPG image in-browser to verify exact DPI (dots per inch) resolution requirements before exam submission.",
    steps: [
      { step: 1, title: "Upload Image" },
      { step: 2, title: "Read JFIF Header" },
      { step: 3, title: "Verify DPI Value" },
    ],
  },
  "convert-dpi": {
    workflowType: "convert",
    acceptedInputs: ["JPG", "JPEG"],
    outputFormat: "JPG (200 / 300 / 600 DPI Embedded)",
    setsDPI: true,
    summary:
      "Convert and embed custom DPI (dots per inch) density into JPEG JFIF APP0 headers in-browser to pass strict government portal DPI validation checks.",
    steps: [
      { step: 1, title: "Upload JPG" },
      { step: 2, title: "Select Target DPI" },
      { step: 3, title: "Download DPI-Tagged JPG" },
    ],
  },
  "passport-maker": {
    workflowType: "id-sheet",
    acceptedInputs: ["JPG", "PNG", "WEBP"],
    outputFormat: "JPG (Printable Grid Sheet)",
    setsDPI: false,
    summary:
      "Generate printable passport photo sheets (4x6, A4, or custom grids) in-browser with automatic cutting borders for printing at photo studios or home printers.",
    steps: [
      { step: 1, title: "Upload Passport Photo" },
      { step: 2, title: "Choose Grid & Page Size" },
      { step: 3, title: "Download Print Sheet" },
    ],
  },
  "pass-photo-sizes": {
    workflowType: "id-sheet",
    acceptedInputs: ["JPG", "PNG", "WEBP"],
    outputFormat: "JPG (Printable Grid Sheet)",
    setsDPI: false,
    summary:
      "Configure and generate standard government passport photo sheets with pre-configured slot dimensions in your browser.",
    steps: [
      { step: 1, title: "Upload Passport Photo" },
      { step: 2, title: "Select Photo Standard" },
      { step: 3, title: "Download Sheet" },
    ],
  },
  "collage-maker": {
    workflowType: "utility",
    acceptedInputs: ["JPG", "PNG", "WEBP"],
    outputFormat: "JPG Grid",
    setsDPI: false,
    summary:
      "Combine multiple photos or certificates into structured grids directly in your browser without uploading files.",
    steps: [
      { step: 1, title: "Upload Images" },
      { step: 2, title: "Select Grid Layout" },
      { step: 3, title: "Download Collage" },
    ],
  },
  "color-picker": {
    workflowType: "utility",
    acceptedInputs: ["JPG", "PNG", "WEBP"],
    outputFormat: "HEX / RGB Color Codes",
    setsDPI: false,
    summary:
      "Inspect and sample exact HEX, RGB, and HSL color values from any photo or document scan locally in your browser.",
    steps: [
      { step: 1, title: "Upload Image" },
      { step: 2, title: "Click on Pixels" },
      { step: 3, title: "Copy Color Codes" },
    ],
  },
  "remove-metadata": {
    workflowType: "metadata",
    acceptedInputs: ["JPG", "PNG", "WEBP"],
    outputFormat: "Clean JPG (No EXIF)",
    setsDPI: false,
    summary:
      "Strip EXIF metadata, GPS locations, camera parameters, and device timestamps locally in-browser to ensure complete privacy before portal upload.",
    steps: [
      { step: 1, title: "Upload Image" },
      { step: 2, title: "Strip EXIF & GPS" },
      { step: 3, title: "Download Clean Image" },
    ],
  },
  "ai-face": {
    workflowType: "utility",
    acceptedInputs: ["Browser Generation (No Input)"],
    outputFormat: "PNG / JPG Avatar",
    setsDPI: false,
    summary:
      "Generate procedural sample dummy face avatars for layout testing and placeholder form filling directly in your browser.",
    steps: [
      { step: 1, title: "Select Style" },
      { step: 2, title: "Generate Avatar" },
      { step: 3, title: "Download Image" },
    ],
  },
};

function buildRegistryItem(tool: Tool): ToolRegistryItem {
  const custom = CUSTOM_TOOL_METADATA[tool.id];
  if (custom) {
    return {
      toolId: tool.id,
      name: tool.title,
      category: tool.category,
      workflowType: custom.workflowType || "general",
      acceptedInputs: custom.acceptedInputs || ["JPG", "PNG", "WEBP"],
      outputFormat: custom.outputFormat || "JPG / JPEG",
      setsDPI: custom.setsDPI ?? false,
      summary: custom.summary || `${tool.title}: ${tool.desc}`,
      steps: custom.steps || [
        { step: 1, title: "Upload Image" },
        { step: 2, title: "Process" },
        { step: 3, title: "Download" },
      ],
    };
  }

  // Determine workflow by group / category
  let workflowType: WorkflowType = "general";
  let acceptedInputs = ["JPG", "PNG", "WEBP"];
  let outputFormat = "JPG / JPEG";
  let setsDPI = false;
  let steps: ToolStep[] = [
    { step: 1, title: "Upload Photo" },
    { step: 2, title: "Configure Settings" },
    { step: 3, title: "Download Result" },
  ];
  let summary = `${tool.title} allows you to process and optimize photos directly in your browser with zero file upload.`;

  if (tool.group === "compress" || tool.category === "target-sizes" || tool.category === "general-compress") {
    workflowType = "compress";
    const targetKbText = tool.targetKB ? `${tool.targetKB}KB` : tool.defaultKB ? `${tool.defaultKB}KB` : "specified target KB";
    summary = `In-browser image compressor configured to compress images to ${targetKbText} for Indian competitive recruitment portals (SSC, UPSC, BPSC, RRB, IBPS) without server uploads.`;
    steps = [
      { step: 1, title: "Upload Photo" },
      { step: 2, title: "Set Target KB" },
      { step: 3, title: "Download Compressed JPG" },
    ];
  } else if (tool.group === "crop" || tool.id.includes("crop")) {
    workflowType = "crop";
    outputFormat = tool.id === "crop-png" ? "PNG" : "JPG / JPEG";
    summary = `Crop photos or scanned documents to exact aspect ratios or recruitment requirements locally in your browser.`;
    steps = [
      { step: 1, title: "Upload Photo" },
      { step: 2, title: "Adjust Crop Box" },
      { step: 3, title: "Download Cropped Image" },
    ];
  } else if (tool.group === "resize" || tool.group === "universal-resize" || tool.category === "official-sizes" || tool.category === "id-sizes") {
    workflowType = "resize";
    const dimText = tool.defaultW && tool.defaultH ? `${tool.defaultW}x${tool.defaultH} ${tool.unit || "px"}` : "official dimensions";
    summary = `Scale and resize photos or signatures to ${dimText} in your browser to meet strict recruitment application guidelines.`;
    steps = [
      { step: 1, title: "Upload Photo" },
      { step: 2, title: "Set Dimensions" },
      { step: 3, title: "Download Resized JPG" },
    ];
  } else if (tool.category === "effects" || tool.group === "filter" || tool.group === "draw-mask" || tool.group === "draw-border") {
    workflowType = "effect";
    summary = `Apply ${tool.title.toLowerCase()} adjustments to your photos locally on your device via HTML5 Canvas with complete privacy.`;
    steps = [
      { step: 1, title: "Upload Photo" },
      { step: 2, title: "Adjust Effect" },
      { step: 3, title: "Download Image" },
    ];
  }

  return {
    toolId: tool.id,
    name: tool.title,
    category: tool.category,
    workflowType,
    acceptedInputs,
    outputFormat,
    setsDPI,
    summary,
    steps,
  };
}

export const TOOL_REGISTRY: ToolRegistryItem[] = TOOLS.map(buildRegistryItem);

export const TOOL_REGISTRY_MAP: Record<string, ToolRegistryItem> = Object.fromEntries(
  TOOL_REGISTRY.map((item) => [item.toolId, item])
);

export const TOTAL_TOOLS_COUNT = TOOL_REGISTRY.length;

export function getToolRegistryEntry(toolId: string): ToolRegistryItem | undefined {
  return TOOL_REGISTRY_MAP[toolId];
}
