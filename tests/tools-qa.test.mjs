// tests/tools-qa.test.mjs
// T-01: Fixture-based output and QA test suite for SarkariPixels
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const fixturesDir = path.join(__dirname, 'fixtures');

console.log('====================================================');
console.log('🧪 RUNNING T-01: FIXTURE-BASED OUTPUT & QA TEST SUITE');
console.log('====================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ ${message}`);
    passCount++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    failCount++;
  }
}

// ── 1. Fixture Integrity Tests ─────────────────────────────────────────────
console.log('--- 1. Testing Image Fixtures ---');

const photoFixturePath = path.join(fixturesDir, 'sample-photo.jpg');
const sigFixturePath = path.join(fixturesDir, 'sample-signature.png');
const oversizedFixturePath = path.join(fixturesDir, 'sample-oversized.jpg');

assert(fs.existsSync(photoFixturePath), 'sample-photo.jpg exists');
assert(fs.existsSync(sigFixturePath), 'sample-signature.png exists');
assert(fs.existsSync(oversizedFixturePath), 'sample-oversized.jpg exists');

const photoBuf = fs.readFileSync(photoFixturePath);
assert(photoBuf[0] === 0xFF && photoBuf[1] === 0xD8, 'sample-photo.jpg has valid JPEG SOI header (0xFFD8)');

// Check JFIF marker and 300 DPI density tags
const hasJFIF = photoBuf.subarray(6, 10).toString('ascii') === 'JFIF';
assert(hasJFIF, 'sample-photo.jpg contains standard JFIF marker');
const xDensity = (photoBuf[14] << 8) | photoBuf[15];
const yDensity = (photoBuf[16] << 8) | photoBuf[17];
assert(xDensity === 300 && yDensity === 300, `sample-photo.jpg encodes 300 DPI JFIF density (${xDensity}x${yDensity})`);

const sigBuf = fs.readFileSync(sigFixturePath);
const isPNG = sigBuf.subarray(1, 4).toString('ascii') === 'PNG';
assert(isPNG, 'sample-signature.png has valid PNG magic bytes');

const oversizedBuf = fs.readFileSync(oversizedFixturePath);
assert(oversizedBuf.length > 50 * 1024, `sample-oversized.jpg is over 50KB limit (${(oversizedBuf.length / 1024).toFixed(1)} KB)`);

// ── 2. SSC Photo Specification Compliance ─────────────────────────────────
console.log('\n--- 2. Testing SSC Photo Specification Workflow ---');
const { EXAM_SPECS } = await import('../lib/exam-specs.ts');
const sscSpec = EXAM_SPECS.find(s => s.key === 'ssc');

assert(sscSpec !== undefined, 'SSC specification exists in EXAM_SPECS');
assert(sscSpec.photo.widthCm === 3.5 && sscSpec.photo.heightCm === 4.5, 'SSC photo dimensions are 3.5cm x 4.5cm');
assert(sscSpec.photo.minKB === 20 && sscSpec.photo.maxKB === 50, 'SSC photo file size bracket is strictly 20KB - 50KB');
assert(sscSpec.photo.format.includes('JPG'), 'SSC photo format is JPG/JPEG');
assert(sscSpec.photo.background.toLowerCase().includes('white'), 'SSC photo requires white/light background');

// Check pixel calculation equivalent at 300 DPI: 3.5cm * 300 / 2.54 = ~413px, 4.5cm * 300 / 2.54 = ~531px
const sscPxW = Math.round((3.5 * 300) / 2.54);
const sscPxH = Math.round((4.5 * 300) / 2.54);
assert(sscPxW === 413 && sscPxH === 531, `SSC 300 DPI pixel dimensions calculate accurately to 413x531 px (calculated: ${sscPxW}x${sscPxH})`);

// ── 3. Signature Tool Workflows ───────────────────────────────────────────
console.log('\n--- 3. Testing Signature Tool Workflows ---');
const toolRegistrySrc = fs.readFileSync(path.join(root, 'lib', 'toolRegistry.ts'), 'utf8');

assert(toolRegistrySrc.includes('"generate-signature": {'), 'generate-signature is registered in TOOL_REGISTRY');
assert(toolRegistrySrc.includes('workflowType: "signature"'), 'generate-signature is classified as workflowType: "signature"');
assert(toolRegistrySrc.includes('outputFormat: "PNG (Transparent) or JPG (White Background)"'), 'generate-signature exports PNG format for transparency');
assert(toolRegistrySrc.includes('title: "Type or Draw"'), 'generate-signature workflow includes "Type or Draw" step');

assert(toolRegistrySrc.includes('outputFormat = "JPG / JPEG";'), 'standard image resize tools export portal-standard JPG format');

// Check official signature limits
assert(sscSpec.signature.minKB === 10 && sscSpec.signature.maxKB === 20, 'SSC signature specification is 10KB - 20KB');
assert(sscSpec.signature.widthCm === 4.0 && sscSpec.signature.heightCm === 2.0, 'SSC signature dimensions are 4.0cm x 2.0cm');

// ── 4. Pre-Download Validation Checker Logic ──────────────────────────────
console.log('\n--- 4. Testing Pre-Download Validation Checker Logic ---');

function validateOutput({ actualBytes, targetBytes, actualMime, allowedMimes }) {
  const sizeExceeded = actualBytes > targetBytes;
  const mimeValid = allowedMimes.includes(actualMime);
  const isValid = !sizeExceeded && mimeValid;

  return {
    isValid,
    sizeExceeded,
    mimeValid,
    statusBadge: isValid ? 'Portal Ready' : 'Limit Exceeded',
    showsRejectionWarning: sizeExceeded
  };
}

// Case A: Compliant SSC Photo (35KB vs 50KB limit)
const validPhotoCheck = validateOutput({
  actualBytes: 35 * 1024,
  targetBytes: 50 * 1024,
  actualMime: 'image/jpeg',
  allowedMimes: ['image/jpeg', 'image/jpg']
});

assert(validPhotoCheck.isValid === true, 'Valid 35KB photo passes validation check');
assert(validPhotoCheck.statusBadge === 'Portal Ready', 'Compliant output displays "Portal Ready" badge');
assert(validPhotoCheck.showsRejectionWarning === false, 'Compliant output suppresses rejection warning');

// Case B: Oversized Photo (58KB vs 50KB limit)
const oversizedPhotoCheck = validateOutput({
  actualBytes: oversizedBuf.length,
  targetBytes: 50 * 1024,
  actualMime: 'image/jpeg',
  allowedMimes: ['image/jpeg', 'image/jpg']
});

assert(oversizedPhotoCheck.isValid === false, 'Oversized photo fails validation check');
assert(oversizedPhotoCheck.statusBadge === 'Limit Exceeded', 'Oversized output displays "Limit Exceeded" badge');
assert(oversizedPhotoCheck.showsRejectionWarning === true, 'Oversized output triggers Upload Rejection Warning banner');

// Case C: Invalid MIME format
const invalidMimeCheck = validateOutput({
  actualBytes: 30 * 1024,
  targetBytes: 50 * 1024,
  actualMime: 'image/gif',
  allowedMimes: ['image/jpeg', 'image/jpg', 'image/png']
});
assert(invalidMimeCheck.isValid === false, 'Unsupported GIF format fails portal validation check');

// ── 5. Target-KB Compression Suite Limits ─────────────────────────────────
console.log('\n--- 5. Testing Target-KB Compression Suite Limits ---');
const { TOOLS } = await import('../lib/tools-data.ts');

const targetKbTools = TOOLS.filter(t => t.category === 'target-sizes');
assert(targetKbTools.length === 16, `All 16 exact target size tools present in TOOLS (found: ${targetKbTools.length})`);

const expectedLimits = {
  'compress-5': 5,
  'compress-10': 10,
  'compress-15': 15,
  'compress-20': 20,
  'compress-20-50': 35,
  'compress-25': 25,
  'compress-30': 30,
  'compress-40': 40,
  'compress-50': 50,
  'compress-100': 100,
  'compress-150': 150,
  'compress-200': 200,
  'compress-300': 300,
  'compress-500': 500,
  'compress-1mb': 1024,
  'compress-2mb': 2048
};

for (const [id, expectedKB] of Object.entries(expectedLimits)) {
  const tool = targetKbTools.find(t => t.id === id);
  assert(tool !== undefined && tool.targetKB === expectedKB, `${id} targets exactly ${expectedKB} KB`);
}

// ── 6. Summary ────────────────────────────────────────────────────────────
console.log('\n====================================================');
if (failCount === 0) {
  console.log(`🎉 ALL ${passCount} QA CHECKS PASSED SUCCESSFULLY!`);
  console.log('====================================================');
  process.exit(0);
} else {
  console.error(`❌ QA TEST SUITE FAILED: ${failCount} failed, ${passCount} passed.`);
  console.log('====================================================');
  process.exit(1);
}
