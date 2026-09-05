# SarkariPixels.online — Audit Fix Log

## Fix ID Tracking Table

| ID | Title | Status | Evidence / Notes |
|---|---|---|---|
| QW-01 | Standardize canonical host (www vs non-www) | Done | Centralized BASE_URL in lib/constants.ts sitewide; verified with `npm run check:canonicals`: 126/126 public pages use `https://www.sarkaripixels.online`, 0 non-www, 0 missing; next.config.ts host 301 redirects active. |
| QW-02 | Remove blanket "DPDP Act 2023 100% Compliant" badge | Done | Replaced sitewide with "Images are processed locally in your browser" / "Processed in Browser" (app/page.tsx, app/tool/[slug]/page.tsx, app/page/[id]/page.tsx); grep search confirms 0 instances of "100% Compliant" or unqualified "DPDP Act 2023 compliant" sitewide. |
| QW-03 | Fix Privacy page "Zero Data Collection" heading | Done | Renamed section in app/page/[id]/page.tsx to "Your Images Are Not Uploaded"; added structured "Website Analytics & Ads" table with Purpose, Data Processed, and Retention columns; verified 0 instances of "zero data collection" heading remaining sitewide. |
| QW-04 | Rename/disclose "AI Photo Enhancer" | Done | Renamed to "Smart Photo Enhancer" in lib/tools-data.ts and lib/tool-content.ts; FAQ clarifies deterministic Canvas histogram equalization/adaptive sharpening; verified 0 instances of "AI Photo Enhancer" remain sitewide. |
| QW-05 | Remove static "0ms" processing badge | Done | Replaced static "Processing HTML5 Canvas (0ms)" in app/tool/[slug]/page.tsx with "Runs locally in your browser"; grep verification confirms 0 static "0ms" claims sitewide. |
| QW-06 | Add source links to exam-specs page | Done | Added official sourceUrl and sourceLabel to all 8 exam boards in lib/exam-specs.ts; updated app/exam-specs/page.tsx and app/exam-specs/[exam]/page.tsx with clickable official portal notice links; verified 8/8 official URLs present in rendered HTML. |
| QW-07 | Soften "Every exam portal covered" claim | Done | Changed homepage trust badge to "Covers major exam and recruitment portals" and exam section copy to "major exam portals" (app/page.tsx); grep search verifies 0 unqualified "every portal" claims remain sitewide. |
| P0-01 | Confirm/fix SSR-CSR rendering via GSC | In Progress | Checking SSR/SSG output across tool routes |
| P0-02 | Full-site canonical crawl | Not Started | |
| P0-03 | GSC redirect/404 audit | Not Started | |
| P0-08 | Build tool registry (foundational) | Not Started | |
| P0-04 | Versioned exam-spec registry | Not Started | |
| P0-05 | Re-verify all 8 exam specs against official sources | Not Started | |
| P0-06 | Fix DPI badge accuracy | Not Started | |
| P0-07 | Increase-KB re-encoding risk disclosure | Not Started | |
| P1-01 | Workflow-specific page schemas | Not Started | |
| P1-02 | Pre-download validation checker | Not Started | |
| P1-03 | Consolidate near-duplicate target-KB pages | Not Started | |
| P1-04 | Reduce copy volume 40-60% | Not Started | |
| P1-05 | Strengthen About/Contact page | Not Started | |
| P2-01 | Publish tested browser/device matrix | Not Started | |
| P2-02 | Qualify "no internet needed" claim | Not Started | |
| P2-03 | Rewrite absolute-causal FAQ statements | Not Started | |
| T-01 | Fixture-based output/QA test suite | Not Started | |

## Discovered - out of scope
*(Items discovered outside this brief will be logged here)*
