// scripts/verify-causal-faqs.mjs
// Verification for P2-03: Rewrite absolute-causal FAQ statements
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

console.log('--- Verifying P2-03: Rewrite Absolute-Causal FAQ Statements ---');

const toolContentPath = path.join(root, 'lib', 'tool-content.ts');
const toolContent = fs.readFileSync(toolContentPath, 'utf8');

let failures = 0;

const forbiddenStatements = [
  'Form rejection photo quality se nahi, size se hota hai',
  'bilkul reject nahi hogi',
  'kisi bhi server analysis difference se reject nahi hota',
  'taaki portal rejection na ho'
];

for (const stmt of forbiddenStatements) {
  if (toolContent.includes(stmt)) {
    console.error(`FAIL: Found absolute-causal statement: "${stmt}"`);
    failures++;
  } else {
    console.log(`✓ Eliminated absolute claim: "${stmt.slice(0, 35)}..."`);
  }
}

// Verify balanced statements are present
const balancedStatements = [
  'portals file size limit aur visual clarity (chehra bilkul saaf dikhna) dono criteria enforce karte hain',
  'official technical specs ko fully satisfy karegi',
  'server-side byte calculation differences ke bavjood safe zone mein rehta hai',
  'signature clearly legible rahe'
];

for (const stmt of balancedStatements) {
  if (!toolContent.includes(stmt)) {
    console.error(`FAIL: Missing balanced statement: "${stmt}"`);
    failures++;
  } else {
    console.log(`✓ Found balanced guidance: "${stmt.slice(0, 35)}..."`);
  }
}

if (failures > 0) {
  console.error(`\nFAILED: ${failures} check(s) failed.`);
  process.exit(1);
}

console.log('\nPASS: All absolute-causal statements successfully rewritten to reflect official portal compliance standards!');
process.exit(0);
