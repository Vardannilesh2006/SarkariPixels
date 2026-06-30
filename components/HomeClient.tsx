"use client";

import { useEffect } from "react";

// HomeClient handles all client-side interactivity on the home page:
// - Theme toggle (icon swap + class on <html>)
// - Category sidebar filter (show/hide tool cards)
// - Search input (live filtering by title/description)
export default function HomeClient() {
  useEffect(() => {
    // ── Theme toggle ──────────────────────────────────────────────
    const themeBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");

    function applyTheme(dark: boolean) {
      document.documentElement.classList.toggle("dark", dark);
      localStorage.setItem("sp-theme", dark ? "dark" : "light");
      if (themeIcon) {
        themeIcon.className = dark
          ? "fa-solid fa-sun"
          : "fa-solid fa-moon";
        themeIcon.style.fontSize = "14px";
      }
    }

    // Sync icon with current state on mount
    applyTheme(document.documentElement.classList.contains("dark"));

    themeBtn?.addEventListener("click", () => {
      applyTheme(!document.documentElement.classList.contains("dark"));
    });

    // ── Category filter ───────────────────────────────────────────
    const catBtns = document.querySelectorAll<HTMLButtonElement>("button[data-category]");
    const toolCards = document.querySelectorAll<HTMLAnchorElement>("#tool-grid [data-category]");

    function filterCategory(cat: string) {
      catBtns.forEach((btn) => {
        const isActive = btn.dataset.category === cat;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-pressed", String(isActive));
      });
      toolCards.forEach((card) => {
        const show = cat === "all" || card.dataset.category === cat;
        // Use display: block (tool-card is a block-level <a>)
        (card as HTMLElement).style.display = show ? "block" : "none";
      });
    }

    catBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterCategory(btn.dataset.category || "all");
      });
    });

    // ── Search ────────────────────────────────────────────────────
    const searchInput = document.getElementById("tool-search") as HTMLInputElement | null;
    searchInput?.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase().trim();

      if (!query) {
        filterCategory("all");
        return;
      }

      // Clear active state from category buttons when searching
      catBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });

      toolCards.forEach((card) => {
        const title = card.dataset.title || "";
        const desc = card.querySelector("p")?.textContent?.toLowerCase() || "";
        const show = title.includes(query) || desc.includes(query);
        (card as HTMLElement).style.display = show ? "block" : "none";
      });
    });

    // Cleanup on unmount
    return () => {
      themeBtn?.replaceWith(themeBtn.cloneNode(true)); // remove listeners
    };
  }, []);

  return null;
}
