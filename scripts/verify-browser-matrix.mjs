// scripts/verify-browser-matrix.mjs
// Verification for P2-01: Publish tested browser/device matrix
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

console.log('--- Verifying P2-01: Tested Browser & Device Compatibility Matrix ---');

const aboutPagePath = path.join(root, 'app', 'page', '[id]', 'page.tsx');
if (!fs.existsSync(aboutPagePath)) {
  console.error('FAIL: app/page/[id]/page.tsx does not exist');
  process.exit(1);
}

const source = fs.readFileSync(aboutPagePath, 'utf8');

let failures = 0;

const requiredTerms = [
  'Tested Browser &amp; Device Compatibility Matrix',
  'Android 10+',
  'iOS / iPadOS 15+',
  'Windows 10/11',
  'macOS 12+',
  'Google Chrome Mobile',
  'Apple Safari Mobile',
  'Microsoft Edge',
  'Mozilla Firefox',
  'Canvas &amp; Blob Export',
  'Verified Compatible'
];

for (const term of requiredTerms) {
  if (!source.includes(term)) {
    console.error(`FAIL: Missing "${term}" in app/page/[id]/page.tsx`);
    failures++;
  } else {
    console.log(`✓ Found "${term}"`);
  }
}

if (failures > 0) {
  console.error(`\nFAILED: ${failures} check(s) failed.`);
  process.exit(1);
}

console.log('\nPASS: Tested browser & device compatibility matrix is published and verified!');
process.exit(0);
