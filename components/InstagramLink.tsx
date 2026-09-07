import React from "react";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/constants";

interface InstagramLinkProps {
  variant?: "icon" | "button" | "badge" | "footer-item";
  className?: string;
  showHandle?: boolean;
}

export function InstagramBadgeIcon({ size = 24 }: { size?: number }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "26%",
        background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
        color: "#ffffff",
        flexShrink: 0,
        boxShadow: "0 2px 6px rgba(220, 39, 67, 0.28)",
      }}
      aria-hidden="true"
    >
      <svg
        width={Math.round(size * 0.62)}
        height={Math.round(size * 0.62)}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    </span>
  );
}

export default function InstagramLink({
  variant = "icon",
  className = "",
  showHandle = false,
}: InstagramLinkProps) {
  if (variant === "button") {
    return (
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-[1.03] active:scale-[0.98] ${className}`}
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          color: "var(--color-text)",
        }}
        aria-label={`Follow SarkariPixels on Instagram (${INSTAGRAM_HANDLE})`}
        title={`Follow SarkariPixels on Instagram (${INSTAGRAM_HANDLE})`}
      >
        <InstagramBadgeIcon size={20} />
        <span>Instagram</span>
        {showHandle && (
          <span style={{ color: "var(--color-muted)", fontSize: "11px" }}>{INSTAGRAM_HANDLE}</span>
        )}
      </a>
    );
  }

  if (variant === "footer-item") {
    return (
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center gap-2 t-caption transition-colors ${className}`}
        style={{ color: "var(--color-muted)" }}
        aria-label={`Follow SarkariPixels on Instagram (${INSTAGRAM_HANDLE})`}
      >
        <InstagramBadgeIcon size={18} />
        <span className="group-hover:text-pink-600 transition-colors">
          Instagram {showHandle ? `(${INSTAGRAM_HANDLE})` : ""}
        </span>
      </a>
    );
  }

  // default: compact icon button for header/footer bar
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-lg transition-transform hover:scale-110 active:scale-95 ${className}`}
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "8px",
      }}
      aria-label={`Follow SarkariPixels on Instagram (${INSTAGRAM_HANDLE})`}
      title={`Follow us on Instagram: ${INSTAGRAM_HANDLE}`}
    >
      <InstagramBadgeIcon size={26} />
    </a>
  );
}
