import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const toolsContent = fs.readFileSync(path.join(root, 'lib/tools-data.ts'), 'utf8');
const toolIds = Array.from(toolsContent.matchAll(/id:\s*["']([^"']+)["']/g), m => m[1]);

console.log('Valid Tool IDs count:', toolIds.length);

const broken = [];

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      scanDir(full);
    } else if (full.endsWith('.tsx') || full.endsWith('.ts') || full.endsWith('.mjs')) {
      const content = fs.readFileSync(full, 'utf8');
      const matches = Array.from(content.matchAll(/["']\/tool\/([^"'/]+)["']/g), m => m[1]);
      for (const m of matches) {
        if (!toolIds.includes(m)) {
          broken.push({ file: path.relative(root, full), link: `/tool/${m}` });
        }
      }
    }
  }
}

scanDir(path.join(root, 'app'));
scanDir(path.join(root, 'lib'));

console.log('\n--- Link Check Results ---');
if (broken.length === 0) {
  console.log('✅ Zero broken internal /tool/ links found!');
} else {
  console.log(`❌ Found ${broken.length} broken links:`);
  for (const b of broken) {
    console.log(`  File: ${b.file} -> Link: ${b.link}`);
  }
}
