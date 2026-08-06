// lib/analytics.ts
// GA4 Custom Event Tracking Helpers for SarkariPixels

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function logEvent(eventName: string, eventParams?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, eventParams);
  }
}

export function logPhotoUploaded(toolId: string, toolTitle: string, fileSizeKb: number, fileType: string) {
  logEvent("photo_uploaded", {
    tool_id: toolId,
    tool_title: toolTitle,
    file_size_kb: Math.round(fileSizeKb),
    file_type: fileType,
  });
}

export function logProcessingCompleted(toolId: string, toolTitle: string, durationMs: number) {
  logEvent("processing_completed", {
    tool_id: toolId,
    tool_title: toolTitle,
    processing_time_ms: durationMs,
  });
}

export function logPhotoDownloaded(toolId: string, toolTitle: string, outputSizeKb: number) {
  logEvent("photo_downloaded", {
    tool_id: toolId,
    tool_title: toolTitle,
    output_file_size_kb: Math.round(outputSizeKb),
  });
}

export function logToolError(toolId: string, toolTitle: string, errorMessage: string) {
  logEvent("tool_error", {
    tool_id: toolId,
    tool_title: toolTitle,
    error_message: errorMessage,
  });
}
