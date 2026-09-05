# SarkariPixels.online — Audit Fix Log

## Fix ID Tracking Table

| ID | Title | Status | Evidence / Notes |
|---|---|---|---|
| QW-01 | Standardize canonical host (www vs non-www) | Done | Centralized BASE_URL in lib/constants.ts sitewide; verified with `npm run check:canonicals`: 126/126 public pages use `https://www.sarkaripixels.online`, 0 non-www, 0 missing; next.config.ts host 301 redirects active. |
| QW-02 | Remove blanket "DPDP Act 2023 100% Compliant" badge | In Progress | Scanning and removing blanket compliance claims sitewide |
| QW-03 | Fix Privacy page "Zero Data Collection" heading | Not Started | |
| QW-04 | Rename/disclose "AI Photo Enhancer" | Not Started | |
| QW-05 | Remove static "0ms" processing badge | Not Started | |
| QW-06 | Add source links to exam-specs page | Not Started | |
| QW-07 | Soften "Every exam portal covered" claim | Not Started | |
| P0-01 | Confirm/fix SSR-CSR rendering via GSC | Not Started | |
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
