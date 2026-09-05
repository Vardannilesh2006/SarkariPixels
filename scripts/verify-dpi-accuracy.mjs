import fs from 'fs';
import path from 'path';

console.log('====================================================');
console.log('🔍 VERIFYING P0-06: DPI BADGE ACCURACY');
console.log('====================================================\n');

const appDir = path.join(process.cwd(), '.next/server/app/tool');

// 1. Check convert-dpi.html (which actually sets DPI metadata)
const convertDpiHtmlPath = path.join(appDir, 'convert-dpi.html');
let errors = 0;

if (fs.existsSync(convertDpiHtmlPath)) {
  const html = fs.readFileSync(convertDpiHtmlPath, 'utf8');
  if (html.includes('JFIF APP0 Tagged')) {
    console.log('✅ convert-dpi correctly renders "JFIF APP0 Tagged" badge');
  } else {
    console.error('❌ convert-dpi missing "JFIF APP0 Tagged" badge');
    errors++;
  }
  if (html.includes('200 / 300 / 600 DPI Embedded')) {
    console.log('✅ convert-dpi correctly specifies embedded DPI output format');
  } else {
    console.error('❌ convert-dpi missing embedded DPI output format description');
    errors++;
  }
} else {
  console.error('❌ convert-dpi.html does not exist');
  errors++;
}

// 2. Check tools that do NOT set DPI metadata
const nonDpiSample = ['compress-50', 'smart-resizer', 'generate-signature', 'photo-enhancer', 'reduce-kb'];

for (const slug of nonDpiSample) {
  const htmlPath = path.join(appDir, `${slug}.html`);
  if (fs.existsSync(htmlPath)) {
    const html = fs.readFileSync(htmlPath, 'utf8');
    if (html.includes('JFIF APP0 Tagged')) {
      console.error(`❌ ${slug} erroneously renders "JFIF APP0 Tagged" badge!`);
      errors++;
    } else {
      console.log(`✅ ${slug} does NOT claim JFIF APP0 DPI tagging`);
    }

    // Check Output Format block in HTML
    const outputFormatBlockMatch = html.match(/Output Format<\/span>[\s\S]*?<\/div>/);
    if (outputFormatBlockMatch) {
      const block = outputFormatBlockMatch[0];
      if (block.includes('(300 DPI)')) {
        console.error(`❌ ${slug} erroneously claims (300 DPI) in Output Format block: ${block}`);
        errors++;
      } else {
        console.log(`✅ ${slug} Output Format block accurately reflects true output without false DPI badge`);
      }
    }
  }
}

console.log('\n====================================================');
console.log(`P0-06 AUDIT RESULT: ${errors === 0 ? '🎉 100% PASS' : '❌ FAILED'}`);
console.log('====================================================');

if (errors === 0) {
  process.exit(0);
} else {
  process.exit(1);
}
