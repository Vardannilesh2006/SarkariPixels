// scripts/verify-internet-claims.mjs
// Verification for P2-02: Qualify "no internet needed" claim
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

console.log('--- Verifying P2-02: Qualify "No Internet Needed" Claim ---');

let failures = 0;

// 1. Check lib/tool-content.ts
const toolContentPath = path.join(root, 'lib', 'tool-content.ts');
const toolContent = fs.readFileSync(toolContentPath, 'utf8');

if (toolContent.includes('No internet needed after page loads')) {
  console.error('FAIL: Found unqualified "No internet needed after page loads" in lib/tool-content.ts');
  failures++;
} else if (!toolContent.includes('Page load hone ke liye internet chahiye')) {
  console.error('FAIL: Missing qualified internet statement in lib/tool-content.ts');
  failures++;
} else {
  console.log('✓ reduce-kb FAQ properly qualifies initial internet load vs local device execution');
}

// 2. Check app/page/[id]/page.tsx
const aboutPagePath = path.join(root, 'app', 'page', '[id]', 'page.tsx');
const aboutPage = fs.readFileSync(aboutPagePath, 'utf8');

if (!aboutPage.includes('Once the page is loaded, core resizing and compression algorithms can execute even without an active data connection')) {
  console.error('FAIL: Missing qualified offline execution statement in app/page/[id]/page.tsx');
  failures++;
} else {
  console.log('✓ About page properly qualifies offline execution');
}

if (failures > 0) {
  console.error(`\nFAILED: ${failures} check(s) failed.`);
  process.exit(1);
}

console.log('\nPASS: All offline and no-internet claims are properly qualified with initial load disclosures!');
process.exit(0);
