import fs from 'fs';
import path from 'path';

console.log('====================================================');
console.log('🧪 VERIFYING P0-04 & P0-05: EXAM-SPEC REGISTRY');
console.log('====================================================\n');

const appDir = path.join(process.cwd(), '.next/server/app/exam-specs');
const examSpecsFile = fs.readFileSync(path.join(process.cwd(), 'lib/exam-specs.ts'), 'utf8');

const expectedKeys = ['ssc', 'upsc', 'bpsc', 'bssc', 'rrb', 'nta', 'ibps', 'pan'];
let errors = 0;

for (const key of expectedKeys) {
  const htmlPath = path.join(appDir, `${key}.html`);
  if (!fs.existsSync(htmlPath)) {
    console.error(`❌ HTML file missing for exam: ${key}`);
    errors++;
    continue;
  }

  const html = fs.readFileSync(htmlPath, 'utf8');

  // Verify Recruitment Cycle rendered
  if (!/Cycle:\s*(?:<!-- -->)?\s*2026-2027/.test(html)) {
    console.error(`❌ ${key}: missing "Cycle: 2026-2027" badge`);
    errors++;
  } else {
    console.log(`✅ ${key}: contains Cycle 2026-2027 badge`);
  }

  // Verify Checked date rendered
  if (!/Verified:\s*(?:<!-- -->)?\s*2026-07-01/.test(html)) {
    console.error(`❌ ${key}: missing "Verified: 2026-07-01" badge`);
    errors++;
  } else {
    console.log(`✅ ${key}: contains Verified: 2026-07-01 date badge`);
  }

  // Verify Next Review Due date rendered
  if (!/Next Review Due:\s*(?:<!-- -->)?\s*2026-10-01/.test(html)) {
    console.error(`❌ ${key}: missing "Next Review Due: 2026-10-01"`);
    errors++;
  } else {
    console.log(`✅ ${key}: contains Next Review Due: 2026-10-01`);
  }

  // Verify Official Notification link
  if (!html.includes('Official Portal Notification')) {
    console.error(`❌ ${key}: missing Official Portal Notification link`);
    errors++;
  } else {
    console.log(`✅ ${key}: contains Official Portal Notification link`);
  }

  // Verify Portal Exceptions box
  if (!html.includes('Important Portal Exceptions &amp; Rules') && !html.includes('Important Portal Exceptions & Rules')) {
    console.error(`❌ ${key}: missing Important Portal Exceptions section`);
    errors++;
  } else {
    console.log(`✅ ${key}: contains Important Portal Exceptions section`);
  }
}

// Hub page check
const hubHtmlPath = path.join(appDir, '../exam-specs.html');
if (fs.existsSync(hubHtmlPath)) {
  const hubHtml = fs.readFileSync(hubHtmlPath, 'utf8');
  if (/Cycle\s*(?:<!-- -->)?\s*2026-2027/.test(hubHtml) && /Checked:\s*(?:<!-- -->)?\s*2026-07-01/.test(hubHtml)) {
    console.log('✅ Exam specs hub page contains Cycle 2026-2027 and Checked dates');
  } else {
    console.error('❌ Exam specs hub page missing Cycle or Checked dates');
    errors++;
  }
}

console.log('\n====================================================');
console.log(`P0-04 & P0-05 AUDIT RESULT: ${errors === 0 ? '🎉 100% PASS' : '❌ FAILED'}`);
console.log('====================================================');

if (errors === 0) {
  process.exit(0);
} else {
  process.exit(1);
}
