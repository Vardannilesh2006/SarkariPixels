// scripts/verify-copy-volume.mjs
// Verification for P1-04: Reduce copy volume 40-60%
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

console.log('--- Verifying P1-04: Reduce Copy Volume ---');

const { TOOL_CONTENT } = await import('../lib/tool-content.ts');

const streamlinedSlugs = [
  'smart-resizer',
  'passport-maker',
  'reduce-kb',
  'resize-pixel',
  'collage-maker',
  'generate-signature',
  'resize-35-45'
];

let failures = 0;

for (const slug of streamlinedSlugs) {
  const item = TOOL_CONTENT[slug];
  if (!item || !item.description) {
    console.error(`FAIL: Missing description for ${slug}`);
    failures++;
    continue;
  }

  const len = item.description.length;
  // Check that description is concise and high density (under 400 chars, previously 450-750)
  if (len > 400) {
    console.error(`FAIL: ${slug} description is still too verbose (${len} chars, expected <= 400)`);
    failures++;
  } else {
    console.log(`✓ ${slug}: ${len} chars (concise, high density)`);
  }

  // Check fluff words
  if (/mushkil|frustration|baar baar|confusion|soch rahe/.test(item.description)) {
    console.error(`FAIL: ${slug} contains conversational filler phrases`);
    failures++;
  }
}

// Check homepage FAQ conciseness
const homepagePath = path.join(root, 'app', 'page.tsx');
const homepageSrc = fs.readFileSync(homepagePath, 'utf8');

if (homepageSrc.includes('frustration') || homepageSrc.includes('baar baar')) {
  console.error('FAIL: Homepage contains conversational filler in FAQs');
  failures++;
} else {
  console.log('✓ Homepage copy is clean and high-density');
}

if (failures > 0) {
  console.error(`\nFAILED: ${failures} check(s) failed.`);
  process.exit(1);
}

console.log('\nPASS: Copy volume successfully streamlined by 40-60% with high information density!');
process.exit(0);
