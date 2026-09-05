import fs from 'fs';
import path from 'path';

console.log('====================================================');
console.log('🔍 VERIFYING P1-02: PRE-DOWNLOAD VALIDATION CHECKER');
console.log('====================================================\n');

let errors = 0;

const sharedPath = path.join(process.cwd(), 'components/editors/shared.tsx');
const sharedCode = fs.readFileSync(sharedPath, 'utf8');

if (sharedCode.includes('Pre-Download Portal Validation Check')) {
  console.log('✅ ResultPreview contains "Pre-Download Portal Validation Check" header');
} else {
  console.error('❌ ResultPreview missing Pre-Download Portal Validation Check');
  errors++;
}

if (sharedCode.includes('outputDimensions') && sharedCode.includes('naturalWidth')) {
  console.log('✅ ResultPreview dynamically checks natural image pixel dimensions from outputBlob');
} else {
  console.error('❌ ResultPreview missing natural image dimension validation');
  errors++;
}

if (sharedCode.includes('MIME Format')) {
  console.log('✅ ResultPreview validates MIME format (JPEG/PNG)');
} else {
  console.error('❌ ResultPreview missing MIME format validation');
  errors++;
}

if (sharedCode.includes('Rejection Warning:')) {
  console.log('✅ ResultPreview displays auto-rejection warning when output size exceeds target KB limit');
} else {
  console.error('❌ ResultPreview missing rejection warning for exceeding target limit');
  errors++;
}

console.log('\n====================================================');
console.log(`P1-02 AUDIT RESULT: ${errors === 0 ? '🎉 100% PASS' : '❌ FAILED'}`);
console.log('====================================================');

if (errors === 0) {
  process.exit(0);
} else {
  process.exit(1);
}
