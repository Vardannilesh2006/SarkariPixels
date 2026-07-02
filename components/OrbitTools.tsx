"use client";

// OrbitTools — Idea 4: 5 tool icons orbiting a center hub
// Pure CSS animation, no JS timer. Click any icon → tool page.
// On mobile (< 640px) → collapses to a flat horizontal chip row.

const ORBIT_TOOLS = [
  {
    href: "/tool/reduce-kb",
    icon: "fa-compress-alt",
    label: "Compress",
    spec: "Any KB",
    bg: "#eff6ff",
    color: "#2563eb",
  },
  {
    href: "/tool/ssc-photo",
    icon: "fa-user-graduate",
    label: "SSC Photo",
    spec: "3.5×4.5 cm",
    bg: "#fff7ed",
    color: "#ea580c",
  },
  {
    href: "/tool/passport-maker",
    icon: "fa-passport",
    label: "Passport",
    spec: "35×45 mm",
    bg: "#f0fdf4",
    color: "#16a34a",
  },
  {
    href: "/tool/upsc-photo-resize",
    icon: "fa-landmark",
    label: "UPSC Photo",
    spec: "350×350 px",
    bg: "#fefce8",
    color: "#ca8a04",
  },
  {
    href: "/tool/resize-signature",
    icon: "fa-signature",
    label: "Signature",
    spec: "≤ 30 KB",
    bg: "#fdf4ff",
    color: "#9333ea",
  },
  {
    href: "/tool/smart-resizer",
    icon: "fa-up-right-and-down-left-from-center",
    label: "Resize",
    spec: "px/cm/mm/in",
    bg: "#e0f2fe",
    color: "#0ea5e9",
  },
];

// Radius and item size
const R = 108;        // orbit radius px
const ITEM = 68;      // item box size px
const WRAP = 300;     // outer container size px

export default function OrbitTools() {
  return (
    <div className="orbit-outer" aria-label="Popular tools — click to open">
      {/* ── Desktop orbit ring ──────────────────────────────────── */}
      <div className="orbit-container" style={{ width: WRAP, height: WRAP }}>
        {/* Dashed ring visual */}
        <div
          className="orbit-ring-line"
          style={{
            width: R * 2,
            height: R * 2,
            left: WRAP / 2 - R,
            top: WRAP / 2 - R,
          }}
        />

        {/* Center hub */}
        <a
          href="#tools"
          className="orbit-hub"
          aria-label="Browse all tools"
          title="Browse all tools"
        >
          <span
            className="orbit-hub-icon"
            aria-hidden="true"
            style={{ fontSize: 22 }}
          >
            S
          </span>
          <span className="orbit-hub-label">All Tools</span>
        </a>

        {/* Orbit items — each has its own animation class */}
        {ORBIT_TOOLS.map((tool, i) => {
          // Place each item using CSS animation class sp-orbit-N
          const toolId = tool.href.split("/").pop();
          return (
            <a
              key={tool.href}
              href={tool.href}
              className={`orbit-item orbit-item-${i}`}
              aria-label={`${tool.label}: ${tool.spec}`}
              title={`${tool.label} — ${tool.spec}`}
            >
              <span
                className="orbit-item-icon"
                style={{ backgroundColor: tool.bg }}
              >
                <span
                  style={{
                    display: "block",
                    width: "18px",
                    height: "18px",
                    backgroundColor: tool.color,
                    WebkitMaskImage: `url(/icons/tools/${toolId}.svg)`,
                    maskImage: `url(/icons/tools/${toolId}.svg)`,
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                  }}
                  aria-hidden="true"
                />
              </span>
              <span className="orbit-item-name">{tool.label}</span>
            </a>
          );
        })}
      </div>

      {/* ── Mobile fallback — horizontal chip row ───────────────── */}
      <div className="orbit-mobile" role="list" aria-label="Popular tools">
        {ORBIT_TOOLS.map((tool) => {
          const toolId = tool.href.split("/").pop();
          return (
            <a
              key={tool.href}
              href={tool.href}
              className="orbit-chip"
              role="listitem"
              aria-label={`${tool.label}: ${tool.spec}`}
            >
              <span
                className="orbit-chip-icon"
                style={{ backgroundColor: tool.bg }}
                aria-hidden="true"
              >
                <span
                  style={{
                    display: "block",
                    width: "13px",
                    height: "13px",
                    backgroundColor: tool.color,
                    WebkitMaskImage: `url(/icons/tools/${toolId}.svg)`,
                    maskImage: `url(/icons/tools/${toolId}.svg)`,
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                  }}
                />
              </span>
              <span className="orbit-chip-text">
                <span className="orbit-chip-name">{tool.label}</span>
                <span className="orbit-chip-spec">{tool.spec}</span>
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
