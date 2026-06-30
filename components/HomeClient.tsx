"use client";

import { useEffect } from "react";

// HomeClient handles all client-side interactivity on the home page:
// - Theme toggle
// - Category filter
// - Search
// - Mouse glow effect
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
          ? "fa-solid fa-sun text-amber-400 text-sm"
          : "fa-solid fa-moon text-slate-500 text-sm";
      }
    }

    // Init theme icon based on current state
    const isDark = document.documentElement.classList.contains("dark");
    applyTheme(isDark);

    themeBtn?.addEventListener("click", () => {
      const current = document.documentElement.classList.contains("dark");
      applyTheme(!current);
    });

    // ── Category filter ───────────────────────────────────────────
    const catBtns = document.querySelectorAll<HTMLButtonElement>("button[data-category]");
    const toolCards = document.querySelectorAll<HTMLAnchorElement>("#tool-grid [data-category]");

    function filterCategory(cat: string) {
      catBtns.forEach((btn) => {
        const isActive = btn.dataset.category === cat;
        btn.classList.toggle("active", isActive);
      });
      toolCards.forEach((card) => {
        const show = cat === "all" || card.dataset.category === cat;
        card.style.display = show ? "" : "none";
      });
    }

    // Attach to sidebar buttons (buttons have data-category)
    document.querySelectorAll<HTMLButtonElement>("button[data-category]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const cat = btn.dataset.category || "all";
        filterCategory(cat);
      });
    });

    // ── Search ────────────────────────────────────────────────────
    const searchInput = document.getElementById("tool-search") as HTMLInputElement | null;
    searchInput?.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase().trim();

      if (!query) {
        // Reset to "all" view
        filterCategory("all");
        return;
      }

      // Reset category buttons
      catBtns.forEach((b) => b.classList.remove("active"));

      toolCards.forEach((card) => {
        const title = card.dataset.title || "";
        const desc = card.querySelector("p")?.textContent?.toLowerCase() || "";
        const match = title.includes(query) || desc.includes(query);
        card.style.display = match ? "" : "none";
      });
    });

    // ── Mouse glow (desktop only) ────────────────────────────────
    const glow = document.getElementById("bg-glow");
    if (glow && window.innerWidth >= 1024) {
      document.addEventListener("mousemove", (e) => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
      });
    }
  }, []);

  return null;
}
