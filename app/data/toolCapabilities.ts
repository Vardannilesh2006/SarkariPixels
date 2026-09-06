/**
 * toolCapabilities.ts
 * Single source of truth defining the EXACT capabilities, limitations,
 * and how-to steps for every tool in SarkariPixels.
 *
 * Used for:
 * - Accurate HowTo schema generation
 * - Result preview validation disclosure
 * - Trust / credibility signals on tool pages
 */

export interface ToolCapability {
  /** Accepted input MIME types */
  inputFormats: string[];
  /** Output MIME types produced. Empty if viewer/comparator only. */
  outputFormats: string[];
  /** Exact 4-step how-to (displayed and used in HowTo schema) */
  howToSteps: [string, string, string, string];
  /** Known technical limitations to disclose */
  limitations: string[];
  /** true if any prompt/data is sent to an external API (LLM etc.) */
  isServerSide: boolean;
}

/**
 * Capabilities indexed by tool ID (matching tools-data.ts ids)
 */
export const TOOL_CAPABILITIES: Record<string, ToolCapability> = {
  "smart-resizer": {
    inputFormats: ["image/jpeg", "image/png", "image/webp"],
    outputFormats: ["image/jpeg"],
    howToSteps: [
      "Upload your photo by clicking or dragging into the upload zone.",
      "Enter the target dimensions in pixels, centimetres, or millimetres.",
      "Click Resize to process the image in your browser — no upload occurs.",
      "Preview the result and download the resized photo.",
    ],
    limitations: [
      "Output is always JPEG regardless of input format.",
      "EXIF metadata is stripped during Canvas resizing.",
    ],
    isServerSide: false,
  },
  "passport-maker": {
    inputFormats: ["image/jpeg", "image/png", "image/webp"],
    outputFormats: ["image/jpeg"],
    howToSteps: [
      "Upload your portrait photo (white background recommended).",
      "Select the passport size and number of prints per sheet.",
      "Click Generate to create the printable multi-photo sheet in your browser.",
      "Download the composite image and take it to a printer.",
    ],
    limitations: [
      "Face detection not included — manually crop face before uploading.",
      "Output is JPEG; minimum printer DPI is 300 for best results.",
    ],
    isServerSide: false,
  },
  "reduce-kb": {
    inputFormats: ["image/jpeg", "image/png"],
    outputFormats: ["image/jpeg"],
    howToSteps: [
      "Upload your photo and enter the target file size in KB.",
      "The tool calculates the optimal JPEG quality setting iteratively.",
      "Preview the compressed output and verify the file size.",
      "Download the result — ready for exam portal upload.",
    ],
    limitations: [
      "PNG inputs are converted to JPEG; transparency is lost.",
      "Extremely low KB targets (<5KB) may produce visibly degraded images.",
      "Actual byte size may vary ±1–2KB due to JPEG compression rounding.",
    ],
    isServerSide: false,
  },
  "compress-50": {
    inputFormats: ["image/jpeg", "image/png"],
    outputFormats: ["image/jpeg"],
    howToSteps: [
      "Upload your exam photo (JPEG or PNG).",
      "The tool automatically compresses it to under 50KB.",
      "Preview the output quality before downloading.",
      "Download and submit to the SSC, IBPS, or BPSC exam portal.",
    ],
    limitations: [
      "Photos with complex high-detail backgrounds may show visible compression artifacts at <30KB.",
      "Output is always JPEG.",
    ],
    isServerSide: false,
  },
  "compress-100": {
    inputFormats: ["image/jpeg", "image/png"],
    outputFormats: ["image/jpeg"],
    howToSteps: [
      "Upload your photo.",
      "The tool compresses to under 100KB using iterative JPEG quality reduction.",
      "Preview the result — 100KB allows high quality for passport photos.",
      "Download and upload to UPSC, RRB, or SBI portals.",
    ],
    limitations: ["Output is always JPEG.", "PNG transparency is not preserved."],
    isServerSide: false,
  },
  "compress-200": {
    inputFormats: ["image/jpeg", "image/png"],
    outputFormats: ["image/jpeg"],
    howToSteps: [
      "Upload your photo.",
      "Tool compresses to under 200KB at maximum achievable quality.",
      "Preview output.",
      "Download and upload to NTA, SSC, or Railway portals.",
    ],
    limitations: ["Output is JPEG.", "PNG transparency not preserved."],
    isServerSide: false,
  },
  "ssc-photo": {
    inputFormats: ["image/jpeg", "image/png"],
    outputFormats: ["image/jpeg"],
    howToSteps: [
      "Upload your passport-size portrait photo with white background.",
      "Tool auto-resizes to 413×531 pixels (3.5cm × 4.5cm at 300 DPI).",
      "Tool compresses to under 50KB JPEG.",
      "Download and upload to SSC CGL / CHSL / MTS portal.",
    ],
    limitations: [
      "SSC 2024–2026 OTR cycles require live webcam capture — this tool cannot replicate that.",
      "White background must be in the original photo; tool does not add backgrounds.",
    ],
    isServerSide: false,
  },
  "upsc-photo-resize": {
    inputFormats: ["image/jpeg", "image/png"],
    outputFormats: ["image/jpeg"],
    howToSteps: [
      "Upload your square portrait photo (white background, name+date stamp on bottom).",
      "Tool resizes to 350×350 pixels (square).",
      "Tool compresses to under 300KB JPEG.",
      "Download and upload to UPSC CSE online application portal.",
    ],
    limitations: [
      "UPSC requires a name/date stamp on the bottom of the photo — add this before uploading.",
      "Photo must have been taken within the last 10 days for UPSC CSE.",
      "Tool cannot add name/date stamps automatically.",
    ],
    isServerSide: false,
  },
  "resize-signature": {
    inputFormats: ["image/jpeg", "image/png"],
    outputFormats: ["image/jpeg"],
    howToSteps: [
      "Upload a scanned or photographed signature (black ink on white paper).",
      "Select target dimensions (e.g., IBPS: 140×60 px, SSC: 140×60 px).",
      "Tool resizes and compresses to target KB.",
      "Download and upload to the exam portal signature field.",
    ],
    limitations: [
      "Signature must already be on a white background.",
      "Tool does not remove backgrounds.",
    ],
    isServerSide: false,
  },
  "convert-dpi": {
    inputFormats: ["image/jpeg"],
    outputFormats: ["image/jpeg"],
    howToSteps: [
      "Upload your JPEG photo.",
      "Enter the target DPI (e.g., 200, 300, 600).",
      "Tool writes a JFIF APP0 header with the requested DPI density markers.",
      "Download — the file now reports the specified DPI to image readers.",
    ],
    limitations: [
      "DPI tags are metadata only — physical pixel count is not changed.",
      "Only JFIF APP0 DPI density markers are written; ICC profile DPI data is not modified.",
      "Some portals ignore embedded DPI tags and check only pixel dimensions.",
    ],
    isServerSide: false,
  },
};

/** Helper: get capability with fallback */
export function getCapability(toolId: string): ToolCapability | null {
  return TOOL_CAPABILITIES[toolId] ?? null;
}
