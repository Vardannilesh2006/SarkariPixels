// scripts/verify-about-contact.mjs
// Verification for P1-05: Strengthen About/Contact page
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

console.log('--- Verifying P1-05: Strengthen About/Contact Page ---');

const aboutPagePath = path.join(root, 'app', 'page', '[id]', 'page.tsx');
if (!fs.existsSync(aboutPagePath)) {
  console.error('FAIL: app/page/[id]/page.tsx does not exist');
  process.exit(1);
}

const source = fs.readFileSync(aboutPagePath, 'utf8');

let failures = 0;

const requiredTerms = [
  'Editorial Verification',
  '90-Day Periodic Review Cycle',
  'Technical Architecture',
  'Candidate Support',
  'info@sarkaripixels.online',
  'editorial@sarkaripixels.online',
  'contactPoint'
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

console.log('\nPASS: About and Contact page is strengthened with governance, technical disclosures, and direct contact points!');
process.exit(0);
