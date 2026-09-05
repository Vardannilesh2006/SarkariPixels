import fs from 'fs';
import path from 'path';

console.log('====================================================');
console.log('🔍 VERIFYING P0-07: INCREASE-KB RE-ENCODING DISCLOSURE');
console.log('====================================================\n');

let errors = 0;

// 1. Verify CompressEditor.tsx code contains re-encoding disclosure
const editorPath = path.join(process.cwd(), 'components/editors/CompressEditor.tsx');
const editorCode = fs.readFileSync(editorPath, 'utf8');

if (editorCode.includes('Important Portal Re-Encoding Warning:')) {
  console.log('✅ CompressEditor.tsx contains "Important Portal Re-Encoding Warning" banner');
} else {
  console.error('❌ CompressEditor.tsx missing warning banner');
  errors++;
}

if (editorCode.includes('/tool/resize-pixel')) {
  console.log('✅ CompressEditor.tsx links directly to /tool/resize-pixel safe alternative');
} else {
  console.error('❌ CompressEditor.tsx missing link to /tool/resize-pixel');
  errors++;
}

// 2. Verify static rendered HTML for /tool/increase-kb
const htmlPath = path.join(process.cwd(), '.next/server/app/tool/increase-kb.html');
if (fs.existsSync(htmlPath)) {
  const html = fs.readFileSync(htmlPath, 'utf8');

  if (html.includes('auto-recompress') || html.includes('re-compress')) {
    console.log('✅ increase-kb page explicitly discloses portal re-compression risks');
  } else {
    console.error('❌ increase-kb page missing re-compression disclosure');
    errors++;
  }

  if (html.includes('Resize Image Pixel')) {
    console.log('✅ increase-kb page recommends Resize Image Pixel alternative');
  } else {
    console.error('❌ increase-kb page missing Resize Image Pixel recommendation');
    errors++;
  }

  if (html.includes('dummy padding bytes') || html.includes('dummy byte padding') || html.includes('padding bits')) {
    console.log('✅ increase-kb page accurately discloses the padding technique used');
  } else {
    console.error('❌ increase-kb page missing padding technique disclosure');
    errors++;
  }
} else {
  console.error(`❌ ${htmlPath} does not exist. Run next build first.`);
  errors++;
}

console.log('\n====================================================');
console.log(`P0-07 AUDIT RESULT: ${errors === 0 ? '🎉 100% PASS' : '❌ FAILED'}`);
console.log('====================================================');

if (errors === 0) {
  process.exit(0);
} else {
  process.exit(1);
}
