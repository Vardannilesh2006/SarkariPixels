"use client";

import { useEffect, useState } from "react";
import type { Tool } from "@/lib/tools-data";

// Import specialized editors
import CompressEditor from "@/components/editors/CompressEditor";
import ResizeEditor from "@/components/editors/ResizeEditor";
import FilterEditor from "@/components/editors/FilterEditor";
import CropEditor from "@/components/editors/CropEditor";
import RotateFlipEditor from "@/components/editors/RotateFlipEditor";
import BorderEditor from "@/components/editors/BorderEditor";
import TextOverlayEditor from "@/components/editors/TextOverlayEditor";
import LogoOverlayEditor from "@/components/editors/LogoOverlayEditor";
import DrawMaskEditor from "@/components/editors/DrawMaskEditor";
import MergeEditor from "@/components/editors/MergeEditor";
import JoinEditor from "@/components/editors/JoinEditor";
import SplitEditor from "@/components/editors/SplitEditor";
import SignatureEditor from "@/components/editors/SignatureEditor";
import CollageEditor from "@/components/editors/CollageEditor";
import IdGridEditor from "@/components/editors/IdGridEditor";
import MetadataEditor from "@/components/editors/MetadataEditor";
import DpiEditor from "@/components/editors/DpiEditor";
import DpiCheckEditor from "@/components/editors/DpiCheckEditor";
import ColorPickerEditor from "@/components/editors/ColorPickerEditor";
import AiFaceEditor from "@/components/editors/AiFaceEditor";

interface Props {
  tool: Tool;
}

export default function ToolEditor({ tool }: Props) {
  // Onboarding walkthrough tour state
  const [showTour, setShowTour] = useState(false);
  const [tourStep, setTourStep] = useState(1);

  // Check if first-time visitor
  useEffect(() => {
    if (typeof window !== "undefined") {
      const visited = localStorage.getItem("sp-visited-editor");
      if (!visited) {
        setShowTour(true);
      }
    }
  }, []);

  const dismissTour = () => {
    setShowTour(false);
    localStorage.setItem("sp-visited-editor", "true");
  };

  const nextTour = () => {
    if (tourStep < 3) {
      setTourStep(tourStep + 1);
    } else {
      dismissTour();
    }
  };

  // Render the appropriate editor component based on the tool's group
  const renderEditor = () => {
    const group = tool.group;

    switch (group) {
      case "compress":
      case "increase-compress":
        return <CompressEditor tool={tool} />;
      case "resize":
      case "universal-resize":
        return <ResizeEditor tool={tool} />;
      case "filter":
        return <FilterEditor tool={tool} />;
      case "crop":
        return <CropEditor tool={tool} />;
      case "rotate":
      case "flip":
        return <RotateFlipEditor tool={tool} />;
      case "draw-border":
        return <BorderEditor tool={tool} />;
      case "text-overlay":
        return <TextOverlayEditor tool={tool} />;
      case "logo-overlay":
        return <LogoOverlayEditor tool={tool} />;
      case "draw-mask":
        return <DrawMaskEditor tool={tool} />;
      case "merge":
        return <MergeEditor tool={tool} />;
      case "join":
        return <JoinEditor tool={tool} />;
      case "split":
        return <SplitEditor tool={tool} />;
      case "signature":
        return <SignatureEditor tool={tool} />;
      case "collage":
        return <CollageEditor tool={tool} />;
      case "id-grid":
        return <IdGridEditor tool={tool} />;
      case "metadata":
        return <MetadataEditor tool={tool} />;
      case "dpi":
        return <DpiEditor tool={tool} />;
      case "dpi-check":
        return <DpiCheckEditor tool={tool} />;
      case "color-picker":
        return <ColorPickerEditor tool={tool} />;
      case "ai-face":
        return <AiFaceEditor tool={tool} />;
      default:
        // Fallback editor for safety
        return <ResizeEditor tool={tool} />;
    }
  };

  return (
    <div className="relative">
      {/* ── Onboarding Walkthrough Tour Overlay ── */}
      {showTour && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Welcome Tour"
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
        >
          <div
            className="card p-6 max-w-sm w-full space-y-4 animate-scale-up"
            style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500">
                Step {tourStep} of 3
              </span>
              <button
                type="button"
                onClick={dismissTour}
                className="text-zinc-500 hover:text-zinc-300 text-xs font-semibold"
              >
                Skip
              </button>
            </div>

            {tourStep === 1 && (
              <div className="space-y-2">
                <h3 className="t-h3">100% Private Processing</h3>
                <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                  Aapki files hamare servers par kabhi upload nahi hotin. Sabhi operation aapke browser mein localized canvas API se hote hain.
                </p>
              </div>
            )}

            {tourStep === 2 && (
              <div className="space-y-2">
                <h3 className="t-h3">Precision Parameters</h3>
                <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                  Sarkari portal guidelines ke according Width, Height aur target file size (KB) set karein. Output automatically guidelines match karega.
                </p>
              </div>
            )}

            {tourStep === 3 && (
              <div className="space-y-2">
                <h3 className="t-h3">Instant Downloads</h3>
                <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                  Single click se processed files ko save karein. Background verification process ensure karega ki file guidelines fail na kare.
                </p>
              </div>
            )}

            <div className="flex justify-between items-center pt-2">
              <div className="flex gap-1">
                {[1, 2, 3].map((s) => (
                  <span
                    key={s}
                    className="w-1.5 h-1.5 rounded-full transition-all"
                    style={{
                      backgroundColor: tourStep === s ? "var(--color-accent)" : "var(--color-border)",
                      width: tourStep === s ? "12px" : "6px",
                    }}
                  />
                ))}
              </div>
              <button type="button" onClick={nextTour} className="btn btn-primary btn-sm px-4">
                {tourStep === 3 ? "Get Started" : "Next"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Render the selected Editor */}
      {renderEditor()}
    </div>
  );
}
