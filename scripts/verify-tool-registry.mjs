import fs from 'fs';
import path from 'path';

console.log('====================================================');
console.log('🧪 VERIFYING P0-08: FOUNDATIONAL TOOL REGISTRY');
console.log('====================================================\n');

const appDir = path.join(process.cwd(), '.next/server/app');
const sitemapBodyPath = path.join(appDir, 'sitemap.xml.body');

// 1. Read tool registry from lib/toolRegistry.ts
const toolRegistryFile = fs.readFileSync(path.join(process.cwd(), 'lib/toolRegistry.ts'), 'utf8');
const toolsDataFile = fs.readFileSync(path.join(process.cwd(), 'lib/tools-data.ts'), 'utf8');

const toolIdMatches = [...toolsDataFile.matchAll(/id:\s*["']([^"']+)["']/g)].map(m => m[1]);
const uniqueToolIds = [...new Set(toolIdMatches)];
const registryCount = uniqueToolIds.length;

console.log(`1. Tool Registry count: ${registryCount} tools defined.`);

// 2. Read sitemap tool count
const sitemapXml = fs.readFileSync(sitemapBodyPath, 'utf8');
const sitemapToolUrls = [...sitemapXml.matchAll(/<loc>https:\/\/www\.sarkaripixels\.online\/tool\/([^<]+)<\/loc>/g)].map(m => m[1]);
console.log(`2. Sitemap tool URL count: ${sitemapToolUrls.length}`);

// 3. Read homepage HTML and check tool count
const homeHtml = fs.readFileSync(path.join(appDir, 'index.html'), 'utf8');
const homeMatch = homeHtml.match(/Browse\s+(\d+)\s+Tools/i);
const homeCount = homeMatch ? parseInt(homeMatch[1], 10) : null;
console.log(`3. Homepage browse button tool count: ${homeCount}`);

let errors = 0;

if (registryCount !== sitemapToolUrls.length) {
  console.error(`❌ Mismatch: Registry count (${registryCount}) != Sitemap tool count (${sitemapToolUrls.length})`);
  errors++;
} else {
  console.log(`✅ Registry count matches sitemap count (${registryCount})`);
}

if (registryCount !== homeCount) {
  console.error(`❌ Mismatch: Registry count (${registryCount}) != Homepage count (${homeCount})`);
  errors++;
} else {
  console.log(`✅ Registry count matches homepage count (${registryCount})`);
}

// 4. Verify generate-signature rendered HTML
const signatureHtmlPath = path.join(appDir, 'tool/generate-signature.html');
if (fs.existsSync(signatureHtmlPath)) {
  const sigHtml = fs.readFileSync(signatureHtmlPath, 'utf8');
  
  if (sigHtml.includes('Upload Photo') && sigHtml.includes('Set KB / Size')) {
    console.error(`❌ generate-signature still contains generic "Upload Photo → Set KB / Size" breadcrumb!`);
    errors++;
  } else {
    console.log(`✅ generate-signature does NOT show generic "Upload Photo → Set KB / Size" strip`);
  }

  if (sigHtml.includes('Type or Draw') && sigHtml.includes('Download Signature')) {
    console.log(`✅ generate-signature correctly displays signature-specific steps ("Type or Draw", "Download Signature")`);
  } else {
    console.error(`❌ generate-signature missing customized steps`);
    errors++;
  }

  if (sigHtml.includes('PNG (Transparent)')) {
    console.log(`✅ generate-signature outputs correct format: PNG (Transparent)`);
  } else {
    console.error(`❌ generate-signature missing PNG (Transparent) format specification`);
    errors++;
  }
} else {
  console.error(`❌ File not found: ${signatureHtmlPath}`);
  errors++;
}

// 5. Verify photo-enhancer rendered HTML
const enhancerHtmlPath = path.join(appDir, 'tool/photo-enhancer.html');
if (fs.existsSync(enhancerHtmlPath)) {
  const enhHtml = fs.readFileSync(enhancerHtmlPath, 'utf8');

  if (enhHtml.includes('Set KB / Size')) {
    console.error(`❌ photo-enhancer still contains generic "Set KB / Size" breadcrumb!`);
    errors++;
  } else {
    console.log(`✅ photo-enhancer does NOT show generic "Set KB / Size"`);
  }

  if (enhHtml.includes('Auto-Enhance Clarity')) {
    console.log(`✅ photo-enhancer correctly displays "Auto-Enhance Clarity" step`);
  } else {
    console.error(`❌ photo-enhancer missing "Auto-Enhance Clarity" step`);
    errors++;
  }

  if (enhHtml.includes('deterministic histogram equalization')) {
    console.log(`✅ photo-enhancer correctly displays tailored summary with deterministic enhancement disclosure`);
  } else {
    console.error(`❌ photo-enhancer missing tailored summary`);
    errors++;
  }
} else {
  console.error(`❌ File not found: ${enhancerHtmlPath}`);
  errors++;
}

console.log('\n====================================================');
console.log(`P0-08 AUDIT RESULT: ${errors === 0 ? '🎉 100% PASS' : '❌ FAILED'}`);
console.log('====================================================');

if (errors === 0) {
  process.exit(0);
} else {
  process.exit(1);
}
