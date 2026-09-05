import fs from 'fs';
import path from 'path';

console.log('====================================================');
console.log('🔍 VERIFYING P1-01: WORKFLOW-SPECIFIC SCHEMAS');
console.log('====================================================\n');

const appDir = path.join(process.cwd(), '.next/server/app/tool');

function extractSchemas(html) {
  const matches = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  return matches.map(m => {
    try {
      return JSON.parse(m[1]);
    } catch (e) {
      return null;
    }
  }).filter(Boolean);
}

let errors = 0;

// Test 1: Signature tool schema
const sigHtmlPath = path.join(appDir, 'generate-signature.html');
if (fs.existsSync(sigHtmlPath)) {
  const sigSchemas = extractSchemas(fs.readFileSync(sigHtmlPath, 'utf8'));
  const swSchema = sigSchemas.find(s => s['@type'] && s['@type'].includes('SoftwareApplication'));
  const howToSchema = sigSchemas.find(s => s['@type'] === 'HowTo');

  if (swSchema && swSchema.applicationCategory === 'DesignApplication') {
    console.log('✅ generate-signature schema has workflow applicationCategory: DesignApplication');
  } else {
    console.error(`❌ generate-signature wrong applicationCategory: ${swSchema?.applicationCategory}`);
    errors++;
  }

  if (howToSchema && howToSchema.step && howToSchema.step.some(st => st.name.includes('Type or Draw'))) {
    console.log('✅ generate-signature HowTo schema includes custom "Type or Draw" step');
  } else {
    console.error('❌ generate-signature HowTo schema missing custom steps');
    errors++;
  }
} else {
  console.error('❌ generate-signature.html missing');
  errors++;
}

// Test 2: Enhancer tool schema
const enhHtmlPath = path.join(appDir, 'photo-enhancer.html');
if (fs.existsSync(enhHtmlPath)) {
  const enhSchemas = extractSchemas(fs.readFileSync(enhHtmlPath, 'utf8'));
  const swSchema = enhSchemas.find(s => s['@type'] && s['@type'].includes('SoftwareApplication'));
  const howToSchema = enhSchemas.find(s => s['@type'] === 'HowTo');

  if (swSchema && swSchema.applicationCategory === 'PhotoApplication') {
    console.log('✅ photo-enhancer schema has workflow applicationCategory: PhotoApplication');
  } else {
    console.error(`❌ photo-enhancer wrong applicationCategory: ${swSchema?.applicationCategory}`);
    errors++;
  }

  if (howToSchema && howToSchema.step && howToSchema.step.length > 0) {
    console.log(`✅ photo-enhancer has valid HowTo schema with ${howToSchema.step.length} steps`);
  } else {
    console.error('❌ photo-enhancer missing HowTo schema');
    errors++;
  }
} else {
  console.error('❌ photo-enhancer.html missing');
  errors++;
}

// Test 3: Convert DPI tool schema
const dpiHtmlPath = path.join(appDir, 'convert-dpi.html');
if (fs.existsSync(dpiHtmlPath)) {
  const dpiSchemas = extractSchemas(fs.readFileSync(dpiHtmlPath, 'utf8'));
  const swSchema = dpiSchemas.find(s => s['@type'] && s['@type'].includes('SoftwareApplication'));

  if (swSchema && swSchema.applicationCategory === 'UtilitiesApplication') {
    console.log('✅ convert-dpi schema has workflow applicationCategory: UtilitiesApplication');
  } else {
    console.error(`❌ convert-dpi wrong applicationCategory: ${swSchema?.applicationCategory}`);
    errors++;
  }

  if (swSchema && swSchema.featureList && swSchema.featureList.some(f => f.includes('300 DPI JFIF'))) {
    console.log('✅ convert-dpi SoftwareApplication schema features embed 300 DPI JFIF capability');
  } else {
    console.error('❌ convert-dpi missing 300 DPI JFIF capability in featureList');
    errors++;
  }
} else {
  console.error('❌ convert-dpi.html missing');
  errors++;
}

// Test 4: Sample across 10 random tools to guarantee 100% valid JSON-LD schemas
const sampleSlugs = ['compress-50', 'smart-resizer', 'passport-maker', 'ssc-photo', 'reduce-kb', 'crop-image', 'resize-image', 'compress-image', 'upsc-photo-resize', 'remove-metadata'];
let validHowToCount = 0;

for (const slug of sampleSlugs) {
  const fPath = path.join(appDir, `${slug}.html`);
  if (fs.existsSync(fPath)) {
    const schemas = extractSchemas(fs.readFileSync(fPath, 'utf8'));
    const howTo = schemas.find(s => s['@type'] === 'HowTo');
    const sw = schemas.find(s => s['@type'] && s['@type'].includes('SoftwareApplication'));
    if (howTo && sw) {
      validHowToCount++;
    }
  }
}

console.log(`✅ Sample verification: ${validHowToCount}/${sampleSlugs.length} tools possess both SoftwareApplication and HowTo schemas`);

if (validHowToCount !== sampleSlugs.length) {
  errors++;
}

console.log('\n====================================================');
console.log(`P1-01 AUDIT RESULT: ${errors === 0 ? '🎉 100% PASS' : '❌ FAILED'}`);
console.log('====================================================');

if (errors === 0) {
  process.exit(0);
} else {
  process.exit(1);
}
