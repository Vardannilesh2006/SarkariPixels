"use client";

import React, { useState, useMemo } from "react";
import type { Tool } from "@/lib/tools-data";

interface Props {
  tool: Tool;
}

const EXAM_PRESETS = [
  { name: "Custom / Manual", min: 18, max: 30 },
  { name: "SSC CGL / CHSL (18 - 30 Yrs)", min: 18, max: 30 },
  { name: "UP Police Constable (18 - 25 Yrs)", min: 18, max: 25 },
  { name: "UPSC Civil Services (21 - 32 Yrs)", min: 21, max: 32 },
  { name: "IBPS / SBI Bank PO (20 - 30 Yrs)", min: 20, max: 30 },
  { name: "RRB Railway NTPC / Group D (18 - 33 Yrs)", min: 18, max: 33 },
  { name: "Defence NDA / CDS (16.5 - 24 Yrs)", min: 16.5, max: 24 },
  { name: "CTET / Teaching Exams (18 - 35 Yrs)", min: 18, max: 35 },
];

const CATEGORIES = [
  { label: "General / UR (No Relaxation)", value: "UR", relaxation: 0 },
  { label: "OBC (Non-Creamy Layer) — +3 Years", value: "OBC", relaxation: 3 },
  { label: "SC / ST — +5 Years", value: "SC_ST", relaxation: 5 },
  { label: "PwBD (General / EWS) — +10 Years", value: "PWBD_GEN", relaxation: 10 },
  { label: "PwBD (OBC-NCL) — +13 Years", value: "PWBD_OBC", relaxation: 13 },
  { label: "PwBD (SC / ST) — +15 Years", value: "PWBD_SC_ST", relaxation: 15 },
  { label: "Ex-Servicemen (ESM) — +3 Years", value: "ESM", relaxation: 3 },
];

export default function AgeCalculatorEditor({ tool }: Props) {
  const [dob, setDob] = useState<string>("2000-01-01");
  const [asOnDate, setAsOnDate] = useState<string>(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [category, setCategory] = useState<string>("UR");
  const [selectedPreset, setSelectedPreset] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  // Quick Cut-Off Presets
  const setQuickCutOff = (year: number, month: number, day: number) => {
    const m = String(month).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    setAsOnDate(`${year}-${m}-${d}`);
  };

  const calculation = useMemo(() => {
    if (!dob || !asOnDate) return null;

    const birth = new Date(dob);
    const target = new Date(asOnDate);

    if (isNaN(birth.getTime()) || isNaN(target.getTime())) return null;
    if (birth > target) {
      return { isFuture: true };
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Total counts
    const diffMs = target.getTime() - birth.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    // Relaxation logic
    const catObj = CATEGORIES.find((c) => c.value === category) || CATEGORIES[0];
    const relaxation = catObj.relaxation;
    const preset = EXAM_PRESETS[selectedPreset];
    const maxAllowedAgeWithRelaxation = preset.max + relaxation;

    const exactDecimalAge = years + months / 12 + days / 365.25;
    const isUnderAge = exactDecimalAge < preset.min;
    const isOverAge = exactDecimalAge > maxAllowedAgeWithRelaxation;
    const isEligible = !isUnderAge && !isOverAge;

    // Next Birthday calculation
    const currentYearBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    let nextBday = currentYearBirthday;
    if (currentYearBirthday < target) {
      nextBday = new Date(target.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysToNextBday = Math.ceil((nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    return {
      isFuture: false,
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      relaxation,
      categoryLabel: catObj.label,
      examName: preset.name,
      minAge: preset.min,
      maxAge: preset.max,
      maxAllowedAgeWithRelaxation,
      isUnderAge,
      isOverAge,
      isEligible,
      daysToNextBday,
    };
  }, [dob, asOnDate, category, selectedPreset]);

  const handleShareWhatsApp = () => {
    if (!calculation || calculation.isFuture) return;
    const text = encodeURIComponent(
      `⚡ *Sarkari Exam Age Calculator Result*\n\n` +
      `📅 *My Age as on ${asOnDate}:*\n` +
      `👉 *${calculation.years} Years, ${calculation.months} Months, ${calculation.days} Days*\n` +
      `🎯 *Category:* ${calculation.categoryLabel}\n` +
      `✅ *Eligibility:* ${calculation.isEligible ? "ELIGIBLE" : calculation.isOverAge ? "OVER AGE" : "UNDER AGE"}\n\n` +
      `Check your age & cutoff eligibility for free on SarkariPixels:\n` +
      `https://sarkaripixels.com/tool/sarkari-exam-age-calculator`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const handleCopySummary = () => {
    if (!calculation || calculation.isFuture) return;
    const text =
      `Sarkari Exam Age Calculator Result:\n` +
      `Age as on ${asOnDate}: ${calculation.years} Years, ${calculation.months} Months, ${calculation.days} Days\n` +
      `Category: ${calculation.categoryLabel}\n` +
      `Eligibility: ${calculation.isEligible ? "ELIGIBLE" : calculation.isOverAge ? "OVER AGE" : "UNDER AGE"}\n` +
      `https://sarkaripixels.com/tool/sarkari-exam-age-calculator`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header Info Banner */}
      <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 text-sm space-y-1">
        <p className="font-semibold text-blue-500 flex items-center gap-2">
          <span>⚡</span> Official Government Exam Cut-Off Age Checker
        </p>
        <p className="text-xs text-muted-foreground">
          Calculates exact age in Years, Months & Days as on notification cut-off date with official category age relaxations (OBC, SC/ST, PwBD, Ex-Servicemen).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Controls Card */}
        <div className="card p-5 rounded-2xl border space-y-5 bg-card text-card-foreground shadow-sm">
          <h3 className="font-bold text-base border-b pb-2">1. Enter Your Details</h3>

          {/* Date of Birth */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Date of Birth (DOB)
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border bg-background text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Age As On (Cut-off Date) */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Age as on Date (Cut-Off)
              </label>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setQuickCutOff(2026, 7, 1)}
                  className="text-[11px] px-2 py-0.5 rounded bg-muted hover:bg-muted/80 text-foreground transition-colors"
                >
                  01/07/26
                </button>
                <button
                  type="button"
                  onClick={() => setQuickCutOff(2026, 1, 1)}
                  className="text-[11px] px-2 py-0.5 rounded bg-muted hover:bg-muted/80 text-foreground transition-colors"
                >
                  01/01/26
                </button>
                <button
                  type="button"
                  onClick={() => setQuickCutOff(2026, 8, 1)}
                  className="text-[11px] px-2 py-0.5 rounded bg-muted hover:bg-muted/80 text-foreground transition-colors"
                >
                  01/08/26
                </button>
              </div>
            </div>
            <input
              type="date"
              value={asOnDate}
              onChange={(e) => setAsOnDate(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border bg-background text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Category Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Reservation Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border bg-background text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Target Exam Preset */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Select Exam Target (Optional)
            </label>
            <select
              value={selectedPreset}
              onChange={(e) => setSelectedPreset(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-lg border bg-background text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {EXAM_PRESETS.map((preset, idx) => (
                <option key={idx} value={idx}>
                  {preset.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Card */}
        <div className="card p-5 rounded-2xl border space-y-5 bg-card text-card-foreground shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base border-b pb-2">2. Calculation Results</h3>

            {calculation?.isFuture ? (
              <div className="p-4 rounded-xl bg-amber-500/10 text-amber-600 text-sm mt-4">
                ⚠️ Date of Birth cannot be later than the Cut-off date. Please select a valid past date.
              </div>
            ) : calculation ? (
              <div className="mt-4 space-y-4">
                {/* Highlight Primary Age */}
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-center space-y-1">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Your Age as on {asOnDate}
                  </p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-primary">
                    {calculation.years} <span className="text-sm font-normal text-foreground">Years</span>{" "}
                    {calculation.months} <span className="text-sm font-normal text-foreground">Months</span>{" "}
                    {calculation.days} <span className="text-sm font-normal text-foreground">Days</span>
                  </p>
                </div>

                {/* Eligibility Verdict Badge */}
                <div
                  className={`p-3 rounded-xl border flex items-center justify-between text-sm ${
                    calculation.isEligible
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                      : "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
                  }`}
                >
                  <span className="font-bold">
                    {calculation.isEligible
                      ? "✅ ELIGIBLE for this Exam"
                      : calculation.isOverAge
                      ? "❌ OVER AGE for this Exam"
                      : "⚠️ UNDER AGE for this Exam"}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-background/80 border">
                    Max: {calculation.maxAllowedAgeWithRelaxation} Yrs
                  </span>
                </div>

                {/* Granular Stats */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-muted/60 border">
                    <p className="text-muted-foreground">Total Months</p>
                    <p className="font-bold text-sm text-foreground">{calculation.totalMonths}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/60 border">
                    <p className="text-muted-foreground">Total Weeks</p>
                    <p className="font-bold text-sm text-foreground">{calculation.totalWeeks}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/60 border">
                    <p className="text-muted-foreground">Total Days</p>
                    <p className="font-bold text-sm text-foreground">{calculation.totalDays}</p>
                  </div>
                </div>

                {/* Next Birthday Notice */}
                <div className="text-xs text-muted-foreground bg-muted/40 p-2.5 rounded-lg border flex justify-between items-center">
                  <span>🎂 Next Birthday In:</span>
                  <span className="font-bold text-foreground">{calculation.daysToNextBday} Days</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground mt-4">Select dates to calculate age.</p>
            )}
          </div>

          {/* Social Viral Action Buttons */}
          {calculation && !calculation.isFuture && (
            <div className="pt-4 border-t space-y-2">
              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-sm"
              >
                <span>💬</span> Share Result on WhatsApp
              </button>
              <button
                type="button"
                onClick={handleCopySummary}
                className="w-full py-2 px-4 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-semibold text-xs flex items-center justify-center gap-2 transition-colors border"
              >
                <span>📋</span> {copied ? "Copied to Clipboard!" : "Copy Result Summary"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
