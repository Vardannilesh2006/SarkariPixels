import fs from 'fs';
import path from 'path';

const appDir = path.join(process.cwd(), '.next/server/app');
const sitemapBodyPath = path.join(appDir, 'sitemap.xml.body');

console.log('====================================================');
console.log('🔍 SARKARIPIXELS: GSC REDIRECT & 404 INTEGRITY AUDIT');
console.log('====================================================\n');

// ── 1. Check all links inside app/not-found.tsx ──────────────────
const notFoundFile = fs.readFileSync(path.join(process.cwd(), 'app/not-found.tsx'), 'utf8');
const hrefMatches = [...notFoundFile.matchAll(/href(?:=|\s*:)\s*["']([^"']+)["']/g)].map(m => m[1]);

// Filter out external or duplicate links
const internalNotFoundLinks = [...new Set(hrefMatches.filter(href => href.startsWith('/')))];
console.log(`Checking ${internalNotFoundLinks.length} unique internal links in app/not-found.tsx...`);

let brokenNotFoundLinks = 0;
for (const href of internalNotFoundLinks) {
  let expectedFile = href === '/' ? path.join(appDir, 'index.html') : path.join(appDir, `${href}.html`);
  if (!fs.existsSync(expectedFile)) {
    console.error(`  ❌ BROKEN LINK in not-found.tsx: ${href} (Missing: ${expectedFile})`);
    brokenNotFoundLinks++;
  } else {
    console.log(`  ✅ 200 OK: ${href} -> ${path.relative(process.cwd(), expectedFile)}`);
  }
}

// ── 2. Check all URLs declared in compiled sitemap.xml ───────────
if (!fs.existsSync(sitemapBodyPath)) {
  console.error(`❌ sitemap.xml.body not found at ${sitemapBodyPath}. Please run next build first.`);
  process.exit(1);
}

const sitemapXml = fs.readFileSync(sitemapBodyPath, 'utf8');
const locMatches = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

console.log(`\nChecking ${locMatches.length} URLs in compiled sitemap.xml against static HTML build outputs...`);

let missingSitemapRoutes = 0;
const auditedSitemapResults = [];

for (const loc of locMatches) {
  const parsed = new URL(loc);
  const route = parsed.pathname;
  let file = route === '/' ? path.join(appDir, 'index.html') : path.join(appDir, `${route}.html`);
  
  if (!fs.existsSync(file)) {
    console.error(`  ❌ SITEMAP 404: ${loc} -> Missing file: ${file}`);
    missingSitemapRoutes++;
    auditedSitemapResults.push({ url: loc, status: 404, file });
  } else {
    auditedSitemapResults.push({ url: loc, status: 200, file });
  }
}

// ── 3. Check Redirects Configuration in next.config.ts ───────────
console.log('\nChecking 301 Redirect Rules in next.config.ts...');
const nextConfig = fs.readFileSync(path.join(process.cwd(), 'next.config.ts'), 'utf8');

const hasNonWwwRedirect = nextConfig.includes('sarkaripixels.online') && nextConfig.includes('https://www.sarkaripixels.online/:path*');
const hasPermanent301 = nextConfig.includes('permanent: true');

console.log(`  Non-www to www 301 redirect rule configured: ${hasNonWwwRedirect ? '✅ YES' : '❌ NO'}`);
console.log(`  Permanent flag (301) configured: ${hasPermanent301 ? '✅ YES' : '❌ NO'}`);

// ── 4. Summary & Exit ────────────────────────────────────────────
console.log('\n====================================================');
console.log('📊 AUDIT SUMMARY REPORT');
console.log('====================================================');
console.log(`Total 404-page links audited  : ${internalNotFoundLinks.length}`);
console.log(`Broken links in 404 page      : ${brokenNotFoundLinks}`);
console.log(`Total sitemap URLs audited    : ${locMatches.length}`);
console.log(`Sitemap URLs returning 404    : ${missingSitemapRoutes}`);
console.log(`Valid 200 OK static pages     : ${auditedSitemapResults.filter(r => r.status === 200).length} / ${locMatches.length}`);
console.log(`Host Redirects Configured     : ${hasNonWwwRedirect && hasPermanent301 ? 'PASS (301)' : 'FAIL'}`);

if (brokenNotFoundLinks === 0 && missingSitemapRoutes === 0 && hasNonWwwRedirect && hasPermanent301) {
  console.log('\n🎉 AUDIT RESULT: 100% PASS! 0 broken links in 404 page, 0 sitemap 404s, clean 200 OK across all routes.');
  process.exit(0);
} else {
  console.error('\n❌ AUDIT RESULT: FAILED! Issues found.');
  process.exit(1);
}
