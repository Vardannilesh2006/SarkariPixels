#!/usr/bin/env node
/**
 * scripts/seo-ssr-regression-check.mjs
 *
 * SSR / crawlability regression guard for SarkariPixels.
 *
 * Checks 9 key URLs with:
 *   1. Raw HTML fetch (no JS — simulates Googlebot)
 *   2. Rendered DOM fetch (Playwright Chromium — simulates WRS)
 *
 * Fails (exit 1) if any check fails.
 * Prints a clear table of results to stdout.
 *
 * Usage:
 *   node scripts/seo-ssr-regression-check.mjs [--base-url https://www.sarkaripixels.online]
 *
 * In CI the base URL is passed via environment variable BASE_URL or --base-url flag.
 */

import { chromium } from "playwright";

// ── Configuration ────────────────────────────────────────────────────────────

const BASE_URL =
  process.argv.find((a) => a.startsWith("--base-url="))?.split("=")[1] ||
  process.env.BASE_URL ||
  "https://www.sarkaripixels.online";

const CANONICAL_HOST = "www.sarkaripixels.online";

/** Pages to check. path must start with /. */
const PAGES = [
  { path: "/", label: "Homepage" },
  { path: "/tool/ssc-photo", label: "SSC Photo Tool" },
  { path: "/tool/resize-signature", label: "Signature Resize Tool" },
  { path: "/tool/passport-maker", label: "Passport Maker Tool" },
  { path: "/tool/compress-50", label: "Compress to 50KB Tool" },
  { path: "/tool/compress-100", label: "Compress to 100KB Tool" },
  { path: "/exam-specs", label: "Exam Specs" },
  { path: "/guides", label: "Guides" },
  { path: "/page/about", label: "About Page" },
];

/** Thresholds — simple and explicit. Do not make these configurable. */
const THRESHOLDS = {
  minBodyTextLength: 500, // raw HTML body text must be at least this many chars
  minRenderedBodyLength: 200, // rendered DOM body text must be at least this many chars
};

/** Patterns that must NOT appear in raw HTML (regression signals). */
const FORBIDDEN_RAW_PATTERNS = [
  { pattern: /formfit\.app/i, reason: "Old wrong canonical domain (formfit.app) found" },
  { pattern: /Loading\.\.\.|Please wait|<noscript>\s*You need to enable JavaScript/i, reason: "SPA/CSR loading placeholder found in raw HTML" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Extract text content of a meta tag by attribute selector. */
function extractMeta(html, name) {
  const m =
    html.match(new RegExp(`<meta[^>]+name=["']${name}["'][^>]*content=["']([^"']+)["']`, "i")) ||
    html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]*name=["']${name}["']`, "i"));
  return m ? m[1].trim() : null;
}

/** Extract canonical href. */
function extractCanonical(html) {
  const m = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) ||
            html.match(/<link[^>]+href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  return m ? m[1].trim() : null;
}

/** Extract title tag content. */
function extractTitle(html) {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return m ? m[1].trim() : null;
}

/** Extract first H1 content. */
function extractH1(html) {
  const m = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  return m ? m[1].trim() : null;
}

/** Extract robots meta content. */
function extractRobotsMeta(html) {
  return extractMeta(html, "robots");
}

/** Approximate body text from raw HTML (strip tags). */
function approximateBodyText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Count occurrences of a regex in a string. */
function countMatches(str, re) {
  return (str.match(re) || []).length;
}

// ── Colour helpers (for terminal output) ─────────────────────────────────────

const C = {
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  reset: "\x1b[0m",
};

const PASS = C.green("✓ PASS");
const FAIL = C.red("✗ FAIL");

// ── Check logic ───────────────────────────────────────────────────────────────

/**
 * Run all raw-HTML checks for one page.
 * Returns { passed: boolean, failures: string[], warnings: string[], info: object }
 */
function checkRawHtml(html, path, label) {
  const failures = [];
  const warnings = [];

  const title = extractTitle(html);
  const h1 = extractH1(html);
  const description = extractMeta(html, "description");
  const canonical = extractCanonical(html);
  const robotsMeta = extractRobotsMeta(html);
  const bodyText = approximateBodyText(html);
  const bodyTextLength = bodyText.length;

  // 1. Title must exist and not be empty
  if (!title || title.length < 5) {
    failures.push(`Missing or too-short <title> (got: ${JSON.stringify(title)})`);
  }

  // 2. Duplicate title check
  const titleCount = countMatches(html, /<title[^>]*>/gi);
  if (titleCount > 1) {
    failures.push(`Duplicate <title> tags found: ${titleCount}`);
  }

  // 3. H1 must exist
  if (!h1) {
    failures.push("Missing <h1> in raw HTML");
  }

  // 4. Meta description must exist
  if (!description || description.length < 10) {
    failures.push(`Missing or too-short meta description (got: ${JSON.stringify(description)})`);
  }

  // 5. Canonical must exist and point to correct host
  if (!canonical) {
    failures.push("Missing canonical <link> tag");
  } else {
    let canonicalUrl;
    try {
      canonicalUrl = new URL(canonical);
    } catch {
      failures.push(`Canonical is not a valid URL: ${canonical}`);
    }
    if (canonicalUrl) {
      if (canonicalUrl.hostname !== CANONICAL_HOST) {
        failures.push(`Canonical points to wrong host: ${canonicalUrl.hostname} (expected: ${CANONICAL_HOST})`);
      }
      if (canonicalUrl.pathname !== path && path !== "/" && canonicalUrl.pathname !== path + "/") {
        warnings.push(`Canonical path mismatch: expected ${path}, got ${canonicalUrl.pathname}`);
      }
    }
  }

  // 6. Robots meta must not contain noindex on public pages
  if (robotsMeta && /noindex/i.test(robotsMeta)) {
    failures.push(`Unexpected noindex in robots meta: "${robotsMeta}"`);
  }

  // 7. Body text length
  if (bodyTextLength < THRESHOLDS.minBodyTextLength) {
    failures.push(
      `Raw HTML body text too short: ${bodyTextLength} chars (min: ${THRESHOLDS.minBodyTextLength}). Possible SSR/CSR gap or placeholder content.`
    );
  }

  // 8. Forbidden patterns
  for (const { pattern, reason } of FORBIDDEN_RAW_PATTERNS) {
    if (pattern.test(html)) {
      failures.push(reason);
    }
  }

  // 9. Duplicate canonical check
  const canonicalCount = countMatches(html, /rel=["']canonical["']/gi);
  if (canonicalCount > 1) {
    warnings.push(`Multiple canonical tags: ${canonicalCount}`);
  }

  return {
    passed: failures.length === 0,
    failures,
    warnings,
    info: { title, h1, description, canonical, robotsMeta, bodyTextLength },
  };
}

/**
 * Run rendered DOM checks for one page using Playwright page object.
 * Returns { passed: boolean, failures: string[], info: object }
 */
async function checkRenderedDom(page, url) {
  const failures = [];

  const h1 = await page.$eval("h1", (el) => el?.textContent?.trim() ?? null).catch(() => null);
  const title = await page.title().catch(() => null);
  const bodyText = await page.evaluate(
    () => document.body?.innerText?.replace(/\s+/g, " ").trim() ?? ""
  ).catch(() => "");

  if (!h1) {
    failures.push("Rendered DOM: Missing <h1>");
  }
  if (!title || title.length < 5) {
    failures.push(`Rendered DOM: Missing or short <title> (got: ${JSON.stringify(title)})`);
  }
  if (bodyText.length < THRESHOLDS.minRenderedBodyLength) {
    failures.push(
      `Rendered DOM: body text too short: ${bodyText.length} chars (min: ${THRESHOLDS.minRenderedBodyLength})`
    );
  }

  return {
    passed: failures.length === 0,
    failures,
    info: { h1, title, bodyTextLength: bodyText.length },
  };
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(C.bold(`\nSarkariPixels SSR / SEO Regression Check`));
  console.log(`Base URL : ${BASE_URL}`);
  console.log(`Pages    : ${PAGES.length}`);
  console.log(`Time     : ${new Date().toISOString()}\n`);

  const results = [];
  let overallFailed = false;

  // Launch Playwright browser once for all pages
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (compatible; SarkariPixelsSEOChecker/1.0; +https://www.sarkaripixels.online)",
  });

  for (const { path, label } of PAGES) {
    const url = `${BASE_URL}${path}`;
    const result = { label, path, url, rawPassed: false, renderedPassed: false, rawFailures: [], renderedFailures: [], rawWarnings: [], info: {} };

    process.stdout.write(`  Checking ${label} (${path})...`);

    // ── Raw HTML check ────────────────────────────────────────────────────────
    let rawHtml = "";
    try {
      const resp = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
          Accept: "text/html",
        },
        redirect: "follow",
      });
      if (!resp.ok) {
        result.rawFailures.push(`HTTP ${resp.status} ${resp.statusText}`);
      } else {
        rawHtml = await resp.text();
      }
    } catch (err) {
      result.rawFailures.push(`Fetch error: ${err.message}`);
    }

    if (rawHtml) {
      const rawCheck = checkRawHtml(rawHtml, path, label);
      result.rawPassed = rawCheck.passed;
      result.rawFailures.push(...rawCheck.failures);
      result.rawWarnings = rawCheck.warnings;
      result.info = rawCheck.info;
    }

    // ── Rendered DOM check ────────────────────────────────────────────────────
    try {
      const page = await context.newPage();
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
      // Wait briefly for hydration
      await page.waitForTimeout(1500);
      const renderedCheck = await checkRenderedDom(page, url);
      result.renderedPassed = renderedCheck.passed;
      result.renderedFailures = renderedCheck.failures;
      result.renderedInfo = renderedCheck.info;
      await page.close();
    } catch (err) {
      result.renderedPassed = false;
      result.renderedFailures.push(`Playwright error: ${err.message}`);
    }

    const allPassed = result.rawPassed && result.renderedPassed;
    if (!allPassed) overallFailed = true;

    process.stdout.write(` ${allPassed ? PASS : FAIL}\n`);
    results.push(result);
  }

  await context.close();
  await browser.close();

  // ── Print detailed report ─────────────────────────────────────────────────
  console.log(`\n${"─".repeat(72)}`);
  console.log(C.bold("Detailed Results"));
  console.log("─".repeat(72));

  for (const r of results) {
    const allPassed = r.rawPassed && r.renderedPassed;
    console.log(`\n${allPassed ? PASS : FAIL}  ${C.bold(r.label)} (${r.path})`);

    if (r.info.title) console.log(`     Title    : ${r.info.title}`);
    if (r.info.h1) console.log(`     H1       : ${r.info.h1}`);
    if (r.info.canonical) console.log(`     Canonical: ${r.info.canonical}`);
    if (r.info.bodyTextLength) console.log(`     Body     : ${r.info.bodyTextLength} chars`);

    for (const f of r.rawFailures) {
      console.log(`     ${C.red("RAW FAIL")}: ${f}`);
    }
    for (const w of r.rawWarnings) {
      console.log(`     ${C.yellow("RAW WARN")}: ${w}`);
    }
    for (const f of r.renderedFailures) {
      console.log(`     ${C.red("DOM FAIL")}: ${f}`);
    }
  }

  // ── Summary ───────────────────────────────────────────────────────────────
  console.log(`\n${"─".repeat(72)}`);
  const passed = results.filter((r) => r.rawPassed && r.renderedPassed).length;
  const failed = results.length - passed;

  if (overallFailed) {
    console.log(C.red(C.bold(`\n✗ ${failed} of ${results.length} pages FAILED. Fix issues above before merging.\n`)));
    process.exit(1);
  } else {
    console.log(C.green(C.bold(`\n✓ All ${results.length} pages passed SSR/SEO regression check.\n`)));
    process.exit(0);
  }
}

main().catch((err) => {
  console.error(C.red(`\nFatal error: ${err.message}`));
  console.error(err.stack);
  process.exit(1);
});
