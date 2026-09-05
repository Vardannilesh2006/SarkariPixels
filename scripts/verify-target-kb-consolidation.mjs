// scripts/verify-target-kb-consolidation.mjs
// Automated verification for P1-03: Consolidate near-duplicate target-KB pages
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const TARGET_SIZE_TOOLS = [
  'compress-5',
  'compress-10',
  'compress-15',
  'compress-20',
  'compress-20-50',
  'compress-25',
  'compress-30',
  'compress-40',
  'compress-50',
  'compress-100',
  'compress-150',
  'compress-200',
  'compress-300',
  'compress-500',
  'compress-1mb',
  'compress-2mb'
];

console.log('--- Verifying P1-03: Consolidate Target-KB Pages ---');

// 1. Check tool-content.ts
const contentFilePath = path.join(root, 'lib', 'tool-content.ts');
if (!fs.existsSync(contentFilePath)) {
  console.error('FAIL: lib/tool-content.ts does not exist');
  process.exit(1);
}

// Dynamically import tool content
const { TOOL_CONTENT } = await import('../lib/tool-content.ts');

const descriptions = new Set();
let failures = 0;

for (const slug of TARGET_SIZE_TOOLS) {
  const data = TOOL_CONTENT[slug];
  if (!data) {
    console.error(`FAIL: Missing TOOL_CONTENT for ${slug}`);
    failures++;
    continue;
  }

  // Check description length
  if (!data.description || data.description.trim().length < 200) {
    console.error(`FAIL: ${slug} has thin/short description (${data.description?.length || 0} chars)`);
    failures++;
  }

  // Check description uniqueness
  if (descriptions.has(data.description.trim())) {
    console.error(`FAIL: Duplicate description found for ${slug}`);
    failures++;
  }
  descriptions.add(data.description.trim());

  // Check FAQs (at least 2 required)
  if (!data.faqs || data.faqs.length < 2) {
    console.error(`FAIL: ${slug} has insufficient FAQs (${data.faqs?.length || 0} FAQs, expected >= 2)`);
    failures++;
  } else {
    // Check FAQ questions and answers are non-empty
    for (const faq of data.faqs) {
      if (!faq.q || !faq.a || faq.q.length < 10 || faq.a.length < 20) {
        console.error(`FAIL: ${slug} has poor quality FAQ: "${faq.q}"`);
        failures++;
      }
    }
  }

  console.log(`✓ ${slug}: ${data.description.length} chars, ${data.faqs.length} FAQs`);
}

// 2. Check Target Size Switcher in tool page
const toolPagePath = path.join(root, 'app', 'tool', '[slug]', 'page.tsx');
const toolPageSrc = fs.readFileSync(toolPagePath, 'utf8');

if (!toolPageSrc.includes('Switch Target Size') || !toolPageSrc.includes('compress-10') || !toolPageSrc.includes('compress-50')) {
  console.error('FAIL: Target Size Switcher strip not found in app/tool/[slug]/page.tsx');
  failures++;
} else {
  console.log('✓ Target Size Quick-Switch Strip present in app/tool/[slug]/page.tsx');
}

if (failures > 0) {
  console.error(`\nFAILED: ${failures} check(s) failed.`);
  process.exit(1);
}

console.log('\nPASS: All 16 Target-KB pages have unique high-density content, valid FAQs, and cross-linking switcher!');
process.exit(0);
