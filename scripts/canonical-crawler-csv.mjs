import fs from 'fs';
import path from 'path';

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(full));
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const appDir = path.join(process.cwd(), '.next/server/app');
const htmlFiles = getHtmlFiles(appDir);

const EXPECTED_HOST = 'www.sarkaripixels.online';
const EXPECTED_ORIGIN = `https://${EXPECTED_HOST}`;

const csvRows = [
  ['URL Path', 'Resolved Canonical', 'Self-Canonicalizing', 'Canonical Host', 'Foreign Domain', 'Status'].join(',')
];

let total = 0;
let passed = 0;
let foreignCount = 0;
let nonSelfCount = 0;

for (const file of htmlFiles) {
  if (file.includes('_not-found') || file.includes('_global-error')) continue;

  const relPath = path.relative(appDir, file).replace(/\\/g, '/').replace(/\.html$/, '');
  let urlPath = '/' + relPath;
  if (urlPath === '/index') urlPath = '/';

  const expectedCanonical = urlPath === '/' ? EXPECTED_ORIGIN : `${EXPECTED_ORIGIN}${urlPath}`;

  const html = fs.readFileSync(file, 'utf8');
  const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ||
                         html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);

  total++;
  const actualCanonical = canonicalMatch ? canonicalMatch[1] : 'NONE';
  let host = 'UNKNOWN';
  let isForeign = 'No';

  try {
    const parsed = new URL(actualCanonical);
    host = parsed.host;
    if (host !== EXPECTED_HOST) {
      isForeign = 'YES';
      foreignCount++;
    }
  } catch (e) {
    isForeign = 'INVALID';
  }

  const isSelf = actualCanonical === expectedCanonical ? 'Yes' : 'No';
  if (isSelf !== 'Yes') {
    nonSelfCount++;
  } else {
    passed++;
  }

  csvRows.push([
    `"${urlPath}"`,
    `"${actualCanonical}"`,
    `"${isSelf}"`,
    `"${host}"`,
    `"${isForeign}"`,
    isSelf === 'Yes' && isForeign === 'No' ? '200 OK' : 'ISSUE'
  ].join(','));
}

const csvContent = csvRows.join('\n');
const outputPath = path.join(process.cwd(), 'canonical-crawl-export.csv');
fs.writeFileSync(outputPath, csvContent, 'utf8');

console.log(`\n=== CANONICAL CRAWL AUDIT REPORT ===`);
console.log(`Total Pages Audited : ${total}`);
console.log(`Self-Canonicalizing  : ${passed} / ${total}`);
console.log(`Foreign Domains      : ${foreignCount} (0 expected)`);
console.log(`Non-Self Canonical   : ${nonSelfCount} (0 expected)`);
console.log(`CSV Report Exported  : ${outputPath}`);

if (passed === total && foreignCount === 0 && nonSelfCount === 0) {
  console.log(`\nSUCCESS: 100% of pages self-canonicalize to https://${EXPECTED_HOST} with 0 foreign domains!`);
  process.exit(0);
} else {
  console.error(`\nFAILED: Found canonical anomalies.`);
  process.exit(1);
}
