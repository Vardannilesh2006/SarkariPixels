"use client";

import { useEffect, useState } from "react";

/**
 * CookieBanner — GDPR/CCPA/DPDP-compliant consent bottom bar.
 *
 * Behaviour:
 * - Renders only on first visit (until user accepts or declines)
 * - Persists decision in localStorage (key: "sp-cookie-consent")
 * - On Accept: fires gtag consent update → analytics_storage: granted
 * - On Decline: fires gtag consent update → analytics_storage: denied
 * - GA4 consent mode must be initialized in denied state in layout.tsx
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sp-cookie-consent");
      if (!stored) {
        const t = setTimeout(() => setVisible(true), 600);
        return () => clearTimeout(t);
      }
      applyConsent(stored === "granted");
    } catch {
      setVisible(true);
    }
  }, []);

  function applyConsent(granted: boolean) {
    try {
      if (typeof window !== "undefined" && (window as Window & { gtag?: (...args: unknown[]) => void }).gtag) {
        (window as Window & { gtag?: (...args: unknown[]) => void }).gtag!("consent", "update", {
          analytics_storage: granted ? "granted" : "denied",
          ad_storage: granted ? "granted" : "denied",
          ad_user_data: granted ? "granted" : "denied",
          ad_personalization: granted ? "granted" : "denied",
        });
      }
    } catch { /* gtag not available */ }
  }

  function handleAccept() {
    try { localStorage.setItem("sp-cookie-consent", "granted"); } catch { /* ignore */ }
    applyConsent(true);
    setVisible(false);
  }

  function handleDecline() {
    try { localStorage.setItem("sp-cookie-consent", "denied"); } catch { /* ignore */ }
    applyConsent(false);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie consent">
      <div className="cookie-banner__inner">
        <div className="cookie-banner__text">
          <p>
            <strong>We use cookies</strong> for anonymous traffic analytics (Google Analytics) and ads to
            keep SarkariPixels free.{" "}
            <strong>Your photos are never uploaded</strong> — all processing stays on your device.{" "}
            <a href="/page/cookies" className="cookie-banner__link">Cookie Policy</a>
            {" · "}
            <a href="/page/privacy" className="cookie-banner__link">Privacy Policy</a>
          </p>
        </div>
        <div className="cookie-banner__actions">
          <button onClick={handleDecline} className="btn btn-secondary btn-sm" aria-label="Decline non-essential cookies">
            Decline
          </button>
          <button onClick={handleAccept} className="btn btn-primary btn-sm" aria-label="Accept cookies">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
