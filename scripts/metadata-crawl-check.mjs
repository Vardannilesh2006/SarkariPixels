#!/usr/bin/env node
/**
 * scripts/metadata-crawl-check.mjs
 *
 * Manual metadata consistency audit for SarkariPixels.
 *
 * Fetches all URLs in sitemap.xml and checks each page for:
 *   - HTTP status code
 *   - <title> (present, unique)
 *   - meta description (present)
 *   - canonical URL (correct host)
 *   - <h1> (present)
 *   - robots meta (no unexpected noindex)
 *
 * Outputs a summary table to stdout and writes a JSON report file.
 *
 * Usage:
 *   node scripts/metadata-crawl-check.mjs [--base-url https://www.sarkaripixels.online] [--concurrency 5]
 *
 * Output: metadata-crawl-report.json in project root.
 */

import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const BASE_URL =
  process.argv.find((a) => a.startsWith("--base-url="))?.split("=")[1] ||
  process.env.BASE_URL ||
  "https://www.sarkaripixels.online";

const CONCURRENCY = parseInt(
  process.argv.find((a) => a.startsWith("--concurrency="))?.split("=")[1] || "5",
  10
);

const CANONICAL_HOST = "www.sarkaripixels.online";
const OUTPUT_FILE = join(__dirname, "..", "metadata-crawl-report.json");

// ── Helpers ───────────────────────────────────────────────────────────────────

function extractMeta(html, name) {
  const m =
    html.match(new RegExp(`<meta[^>]+name=["']${name}["'][^>]*content=["']([^"']+)["']`, "i")) ||
    html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]*name=["']${name}["']`, "i"));
  return m ? m[1].trim() : null;
}

function extractCanonical(html) {
  const m =
    html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) ||
    html.match(/<link[^>]+href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  return m ? m[1].trim() : null;
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return m ? m[1].trim() : null;
}

function extractH1(html) {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return m ? m[1].replace(/<[^>]+>/g, "").trim() : null;
}

function extractAllTitles(html) {
  return (html.match(/<title[^>]*>/gi) || []).length;
}

function extractAllCanonicals(html) {
  return (html.match(/rel=["']canonical["']/gi) || []).length;
}

// ── Fetch sitemap ─────────────────────────────────────────────────────────────

async function fetchSitemapUrls(sitemapUrl) {
  const resp = await fetch(sitemapUrl);
  if (!resp.ok) throw new Error(`Sitemap fetch failed: ${resp.status} ${resp.statusText}`);
  const xml = await resp.text();
  const urls = [];
  const locRegex = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = locRegex.exec(xml)) !== null) {
    urls.push(m[1].trim());
  }
  return urls;
}

// ── Check one URL ─────────────────────────────────────────────────────────────

async function checkUrl(url) {
  const result = {
    url,
    status: null,
    title: null,
    titleCount: 0,
    description: null,
    canonical: null,
    canonicalCount: 0,
    canonicalHost: null,
    h1: null,
    robotsMeta: null,
    issues: [],
  };

  let html = "";
  try {
    const resp = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; SPMetaCrawler/1.0; +https://www.sarkaripixels.online)",
        Accept: "text/html",
      },
      redirect: "follow",
    });
    result.status = resp.status;
    if (!resp.ok) {
      result.issues.push(`HTTP ${resp.status}`);
      return result;
    }
    html = await resp.text();
  } catch (err) {
    result.issues.push(`Fetch error: ${err.message}`);
    return result;
  }

  result.title = extractTitle(html);
  result.titleCount = extractAllTitles(html);
  result.description = extractMeta(html, "description");
  result.canonical = extractCanonical(html);
  result.canonicalCount = extractAllCanonicals(html);
  result.h1 = extractH1(html);
  result.robotsMeta = extractMeta(html, "robots");

  if (result.canonical) {
    try {
      result.canonicalHost = new URL(result.canonical).hostname;
    } catch {
      result.canonicalHost = null;
    }
  }

  // Issues
  if (!result.title || result.title.length < 5) result.issues.push("MISSING_TITLE");
  if (result.titleCount > 1) result.issues.push(`DUPLICATE_TITLE(${result.titleCount})`);
  if (!result.description || result.description.length < 10) result.issues.push("MISSING_DESCRIPTION");
  if (!result.canonical) result.issues.push("MISSING_CANONICAL");
  if (result.canonical && result.canonicalHost !== CANONICAL_HOST)
    result.issues.push(`WRONG_CANONICAL_HOST(${result.canonicalHost})`);
  if (result.canonicalCount > 1) result.issues.push(`DUPLICATE_CANONICAL(${result.canonicalCount})`);
  if (!result.h1) result.issues.push("MISSING_H1");
  if (result.robotsMeta && /noindex/i.test(result.robotsMeta))
    result.issues.push(`NOINDEX(${result.robotsMeta})`);
  if (/formfit\.app/i.test(html)) result.issues.push("FORMFIT_APP_FOUND");

  return result;
}

// ── Concurrency pool ──────────────────────────────────────────────────────────

async function runPool(tasks, concurrency) {
  const results = [];
  const queue = [...tasks];
  const running = [];

  async function runNext() {
    if (queue.length === 0) return;
    const task = queue.shift();
    const promise = task().then((r) => {
      results.push(r);
      running.splice(running.indexOf(promise), 1);
    });
    running.push(promise);
    if (running.length < concurrency && queue.length > 0) {
      await runNext();
    }
    await promise;
    if (queue.length > 0) await runNext();
  }

  const starters = Array.from({ length: Math.min(concurrency, tasks.length) }, () => runNext());
  await Promise.all(starters);
  return results;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const sitemapUrl = `${BASE_URL}/sitemap.xml`;
  console.log(`\nSarkariPixels Metadata Crawl Check`);
  console.log(`Base URL   : ${BASE_URL}`);
  console.log(`Sitemap    : ${sitemapUrl}`);
  console.log(`Concurrency: ${CONCURRENCY}\n`);

  let urls;
  try {
    urls = await fetchSitemapUrls(sitemapUrl);
    console.log(`Found ${urls.length} URLs in sitemap\n`);
  } catch (err) {
    console.error(`Failed to fetch sitemap: ${err.message}`);
    process.exit(1);
  }

  const tasks = urls.map((url, i) => async () => {
    process.stdout.write(`\r  Checking ${i + 1}/${urls.length} ...`);
    return checkUrl(url);
  });

  const results = await runPool(tasks, CONCURRENCY);
  console.log("\n");

  // Sort: failures first
  results.sort((a, b) => b.issues.length - a.issues.length);

  // ── Stats ─────────────────────────────────────────────────────────────────
  const withIssues = results.filter((r) => r.issues.length > 0);
  const missingTitle = results.filter((r) => r.issues.includes("MISSING_TITLE"));
  const missingDesc = results.filter((r) => r.issues.includes("MISSING_DESCRIPTION"));
  const missingH1 = results.filter((r) => r.issues.includes("MISSING_H1"));
  const missingCanonical = results.filter((r) => r.issues.includes("MISSING_CANONICAL"));
  const wrongCanonical = results.filter((r) =>
    r.issues.some((i) => i.startsWith("WRONG_CANONICAL_HOST"))
  );
  const noindexPages = results.filter((r) => r.issues.some((i) => i.startsWith("NOINDEX")));
  const formfitPages = results.filter((r) => r.issues.includes("FORMFIT_APP_FOUND"));

  console.log("── Summary ──────────────────────────────────────────────────────────");
  console.log(`  Total URLs checked   : ${results.length}`);
  console.log(`  Pages with issues    : ${withIssues.length}`);
  console.log(`  Missing title        : ${missingTitle.length}`);
  console.log(`  Missing description  : ${missingDesc.length}`);
  console.log(`  Missing H1           : ${missingH1.length}`);
  console.log(`  Missing canonical    : ${missingCanonical.length}`);
  console.log(`  Wrong canonical host : ${wrongCanonical.length}`);
  console.log(`  Unexpected noindex   : ${noindexPages.length}`);
  console.log(`  formfit.app refs     : ${formfitPages.length}`);
  console.log("");

  if (withIssues.length > 0) {
    console.log("── Pages with Issues ────────────────────────────────────────────────");
    for (const r of withIssues.slice(0, 30)) {
      console.log(`  [${r.issues.join(", ")}]`);
      console.log(`    ${r.url}`);
      if (r.title) console.log(`    Title: ${r.title}`);
      if (r.canonical) console.log(`    Canonical: ${r.canonical}`);
      console.log("");
    }
    if (withIssues.length > 30) {
      console.log(`  ... and ${withIssues.length - 30} more (see JSON report)\n`);
    }
  }

  // Write JSON report
  writeFileSync(OUTPUT_FILE, JSON.stringify({ generatedAt: new Date().toISOString(), baseUrl: BASE_URL, totalChecked: results.length, summary: { withIssues: withIssues.length, missingTitle: missingTitle.length, missingDescription: missingDesc.length, missingH1: missingH1.length, missingCanonical: missingCanonical.length, wrongCanonicalHost: wrongCanonical.length, unexpectedNoindex: noindexPages.length, formfitAppRefs: formfitPages.length }, results }, null, 2));
  console.log(`JSON report written to: ${OUTPUT_FILE}\n`);

  if (withIssues.length > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main().catch((err) => {
  console.error(`Fatal: ${err.message}`);
  process.exit(1);
});
