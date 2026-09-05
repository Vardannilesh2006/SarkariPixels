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
console.log(`Found ${htmlFiles.length} HTML files.`);

let nonWwwCount = 0;
let missingCanonical = 0;
let validCount = 0;

for (const file of htmlFiles) {
  const isInternal = file.includes('_not-found') || file.includes('_global-error');
  if (isInternal) continue;

  const content = fs.readFileSync(file, 'utf8');
  const canonicalMatch = content.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ||
                         content.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  if (!canonicalMatch) {
    console.log('Missing canonical:', file);
    missingCanonical++;
  } else {
    const canonical = canonicalMatch[1];
    if (!canonical.startsWith('https://www.sarkaripixels.online')) {
      console.log('Non-www canonical found in:', file, '->', canonical);
      nonWwwCount++;
    } else {
      validCount++;
    }
  }
}

console.log(`RESULTS: Valid www canonicals: ${validCount}, Non-www: ${nonWwwCount}, Missing: ${missingCanonical}`);
if (nonWwwCount === 0 && missingCanonical === 0) {
  console.log('SUCCESS: 100% of public pages self-canonicalize to https://www.sarkaripixels.online');
  process.exit(0);
} else {
  process.exit(1);
}
