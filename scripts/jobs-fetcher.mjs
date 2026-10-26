#!/usr/bin/env node
// scripts/jobs-fetcher.mjs
// Automated background engine for scraping, filtering (>= 400 posts), and extracting photo/sig specs
// Sources: FreeJobAlert, SarkariResult, DSHelpingForever, OnlineUpdateSTM, and Direct Commission Portals

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const jobsFilePath = path.join(root, 'data/jobs.json');

const MIN_VACANCIES = 400;

console.log('====================================================');
console.log(' 🚀 SARKARIPIXELS AUTOMATED JOBS SYNC ENGINE');
console.log('====================================================');
console.log(`[Config] Min Vacancy Threshold : ${MIN_VACANCIES} posts`);
console.log(`[Config] Database Target       : ${jobsFilePath}`);

// Heuristic Master Spec Templates for parent boards
const BOARD_MASTER_SPECS = {
  railway: {
    category: 'railway',
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      widthPx: 320,
      heightPx: 412,
      minKB: 30,
      maxKB: 70,
      dpi: 300,
      format: 'JPG/JPEG',
      background: 'Plain white background only',
      notes: 'Passport size photo (35mm x 45mm), 30KB - 70KB JPEG. Frontal view showing full face with both ears visible. No caps or sunglasses.'
    },
    signature: {
      widthCm: 5.0,
      heightCm: 2.0,
      widthPx: 140,
      heightPx: 60,
      minKB: 30,
      maxKB: 70,
      dpi: 300,
      format: 'JPG/JPEG',
      inkColor: 'Black ink on plain white paper',
      notes: 'Sign in running handwriting with black ballpoint pen. Capital letter signatures will be rejected.'
    },
    rules: [
      'White background is mandatory for Railway recruitment photograph.',
      'Signature in BLOCK CAPITAL letters is strictly rejected by RRB AI screening.',
      'Photo must be taken within last 6 months with clear facial visibility.'
    ],
    primaryToolId: 'smart-resizer'
  },
  ssc: {
    category: 'ssc',
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      widthPx: 413,
      heightPx: 531,
      minKB: 20,
      maxKB: 50,
      dpi: 300,
      format: 'JPG/JPEG',
      background: 'White or very light grey background',
      notes: 'SSC standard 3.5cm x 4.5cm photo or live webcam capture. Both ears must be visible without cap or spectacles.'
    },
    signature: {
      widthCm: 4.0,
      heightCm: 2.0,
      widthPx: 140,
      heightPx: 60,
      minKB: 10,
      maxKB: 20,
      dpi: 200,
      format: 'JPG/JPEG',
      inkColor: 'Black or dark blue ballpoint pen',
      notes: 'Signature must be 4.0cm width x 2.0cm height with file size strictly between 10KB and 20KB.'
    },
    rules: [
      'SSC portal strictly rejects signature if size is less than 10KB or more than 20KB.',
      'Both ears must be clearly visible, looking directly at the camera with neutral expression.'
    ],
    primaryToolId: 'ssc-cgl-photo-resizer'
  },
  police: {
    category: 'police',
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      widthPx: 413,
      heightPx: 531,
      minKB: 20,
      maxKB: 50,
      dpi: 300,
      format: 'JPG/JPEG',
      background: 'Plain white or light grey background',
      notes: '3.5 cm x 4.5 cm with minimum 70% to 80% face coverage. Clear frontal view without shadow.'
    },
    signature: {
      widthCm: 3.5,
      heightCm: 1.5,
      widthPx: 140,
      heightPx: 60,
      minKB: 5,
      maxKB: 20,
      dpi: 200,
      format: 'JPG/JPEG',
      inkColor: 'Black ink on white paper',
      notes: '3.5cm x 1.5cm signature strictly between 5KB and 20KB.'
    },
    rules: [
      'Clear white or light grey background only.',
      'Signature must be in black ink on white paper; blue gel pen or blurry images cause rejection.'
    ],
    primaryToolId: 'smart-resizer'
  },
  banking: {
    category: 'banking',
    photo: {
      widthPx: 200,
      heightPx: 230,
      widthCm: 3.5,
      heightCm: 4.5,
      minKB: 20,
      maxKB: 50,
      dpi: 200,
      format: 'JPG/JPEG',
      background: 'Light or white background',
      notes: 'Dimensions 200 x 230 pixels, file size 20KB - 50KB. Neutral facial expression.'
    },
    signature: {
      widthPx: 140,
      heightPx: 60,
      widthCm: 3.5,
      heightCm: 1.5,
      minKB: 10,
      maxKB: 20,
      dpi: 200,
      format: 'JPG/JPEG',
      inkColor: 'Black ink pen on white paper',
      notes: 'Dimensions 140 x 60 pixels, file size 10KB - 20KB. Running handwriting only.'
    },
    rules: [
      'Banking portals strictly reject signatures in CAPITAL LETTERS.',
      'Left thumb impression and handwritten declaration are also required separately.'
    ],
    primaryToolId: 'signature-resizer-10-20kb'
  },
  teaching: {
    category: 'teaching',
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      widthPx: 413,
      heightPx: 531,
      minKB: 20,
      maxKB: 50,
      dpi: 300,
      format: 'JPG/JPEG',
      background: 'Plain white or off-white background',
      notes: 'Standard passport format 3.5 x 4.5 cm, recent photograph taken within 3 months.'
    },
    signature: {
      widthCm: 4.0,
      heightCm: 2.0,
      widthPx: 140,
      heightPx: 60,
      minKB: 10,
      maxKB: 20,
      dpi: 200,
      format: 'JPG/JPEG',
      inkColor: 'Black or blue ink on white paper',
      notes: 'Signature size 10KB to 20KB in running script.'
    },
    rules: [
      'Photograph must not have dark glasses, cap, or religious headgear covering face contours.',
      'Ensure clear signature scan with high contrast.'
    ],
    primaryToolId: 'smart-resizer'
  },
  'state-psc': {
    category: 'state-psc',
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      widthPx: 350,
      heightPx: 450,
      minKB: 20,
      maxKB: 50,
      dpi: 300,
      format: 'JPG/JPEG',
      background: 'Light or white background',
      notes: '3.5 x 4.5 cm with clear frontal lighting. File size 20KB to 50KB.'
    },
    signature: {
      widthCm: 3.5,
      heightCm: 1.5,
      widthPx: 140,
      heightPx: 60,
      minKB: 10,
      maxKB: 20,
      dpi: 200,
      format: 'JPG/JPEG',
      inkColor: 'Black ink on white background',
      notes: '140 x 60 pixels, file size 10KB - 20KB.'
    },
    rules: [
      'Check commission-specific guidelines for Hindi and English signature requirements.',
      'File format must strictly be JPEG/JPG.'
    ],
    primaryToolId: 'smart-resizer'
  }
};

function cleanText(str) {
  if (!str) return '';
  return str
    .replace(/&#8211;|&#8212;|&ndash;|&mdash;/g, '-')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function detectCategory(board, title) {
  const text = `${board} ${title}`.toLowerCase();
  if (text.includes('rrb') || text.includes('rrc') || text.includes('railway') || text.includes('loco pilot') || text.includes('station master')) {
    return 'railway';
  }
  if (text.includes('ssc') || text.includes('staff selection')) {
    return 'ssc';
  }
  if (text.includes('police') || text.includes('crpf') || text.includes('bsf') || text.includes('cisf') || text.includes('constable') || text.includes('sub inspector') || text.includes('si ') || text.includes('home guard') || text.includes('fireman') || text.includes('firefighter')) {
    return 'police';
  }
  if (text.includes('bank') || text.includes('ibps') || text.includes('sbi') || text.includes('pnb') || text.includes('uco') || text.includes('rbi')) {
    return 'banking';
  }
  if (text.includes('teacher') || text.includes('dsc') || text.includes('lecturer') || text.includes('school') || text.includes('oavs') || text.includes('upessc') || text.includes('tgt') || text.includes('pgt') || text.includes('shikshak')) {
    return 'teaching';
  }
  if (text.includes('psc') || text.includes('sssc') || text.includes('vyapam') || text.includes('ssb') || text.includes('court') || text.includes('high court') || text.includes('bssc') || text.includes('mpesb') || text.includes('gsssb') || text.includes('jkssb')) {
    return 'state-psc';
  }
  if (text.includes('post') || text.includes('dak sevak') || text.includes('gds')) {
    return 'postal';
  }
  return 'state-psc';
}

function generateCleanSlug(title) {
  const simplified = title
    .toLowerCase()
    .replace(/\b(sarkari|recruitment|online form|apply online|notification|last date today|form|vacancy|vacancies|posts?|\d{4,6})\b/gi, ' ')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 55);

  return `${simplified}-photo-signature-resizer`.replace(/-+/g, '-');
}

// Scrape live notifications from FreeJobAlert
async function fetchFreeJobAlert() {
  console.log('\n[1/3] Fetching live notifications from FreeJobAlert...');
  const results = [];
  try {
    const res = await fetch('https://www.freejobalert.com/latest-notifications/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
      },
      signal: AbortSignal.timeout(12000)
    });
    if (!res.ok) return results;
    const html = await res.text();
    const rowRegex = /<tr class="lattrbord[^"]*">([\s\S]*?)<\/tr>/gi;
    let match;

    while ((match = rowRegex.exec(html)) !== null) {
      const row = match[1];

      const boardMatch = row.match(/<td class="latcr">([\s\S]*?)<\/td>/i);
      const board = boardMatch ? cleanText(boardMatch[1]) : '';

      const postMatch = row.match(/<td class="latceb">([\s\S]*?)<\/td>/i);
      const postRaw = postMatch ? cleanText(postMatch[1]) : '';

      const dateMatch = row.match(/<td class="latclb">([\s\S]*?)<\/td>/i);
      const lastDate = dateMatch ? cleanText(dateMatch[1]) : '';

      const linkMatch = row.match(/href="([^"]+)"/i);
      const link = linkMatch ? linkMatch[1] : '';

      const vacMatch = postRaw.match(/(\d[\d,]*)\s*(?:Posts|Post|Vacancies)/i);
      if (vacMatch) {
        const vacancies = parseInt(vacMatch[1].replace(/,/g, ''), 10);
        if (vacancies >= MIN_VACANCIES) {
          const category = detectCategory(board, postRaw);
          let cleanPost = postRaw.replace(/-\s*\d[\d,]*\s*Posts?/i, '').trim();
          
          let title = '';
          if (cleanPost.toLowerCase().startsWith(board.toLowerCase())) {
            title = cleanPost;
          } else {
            title = `${board} ${cleanPost}`.trim();
          }

          results.push({
            title,
            board: board || 'Government Recruitment Commission',
            vacancies,
            category,
            lastDateToApply: lastDate || 'Check Notification',
            officialNotificationUrl: link || 'https://www.freejobalert.com',
            applyOnlineUrl: link || 'https://www.freejobalert.com'
          });
        }
      }
    }
    console.log(`[FreeJobAlert] Discovered ${results.length} recruitments meeting >= ${MIN_VACANCIES} vacancies.`);
  } catch (err) {
    console.warn(`[FreeJobAlert] Scrape skipped or timeout: ${err.message}`);
  }
  return results;
}

// Scrape live notifications from SarkariResult
async function fetchSarkariResult() {
  console.log('\n[2/3] Fetching latest announcements from SarkariResult...');
  const results = [];
  try {
    const res = await fetch('https://sarkariresult.com.cm/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      signal: AbortSignal.timeout(10000)
    });
    if (!res.ok) return results;
    const html = await res.text();

    const linkRegex = /<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
    let match;
    while ((match = linkRegex.exec(html)) !== null) {
      const link = match[1];
      const text = cleanText(match[2]);

      const vacMatch = text.match(/(\d[\d,]{3,})\s*(?:Post|Posts|Vacancy|Vacancies)/i);
      if (vacMatch) {
        const vacancies = parseInt(vacMatch[1].replace(/,/g, ''), 10);
        if (vacancies >= MIN_VACANCIES) {
          const cleanTitle = text.replace(/-\s*\d[\d,]*\s*Posts?/i, '').replace(/Online Form/i, 'Recruitment').trim();
          const category = detectCategory('', cleanTitle);

          results.push({
            title: cleanTitle,
            board: 'Government Recruitment Board',
            vacancies,
            category,
            lastDateToApply: 'Check Notification',
            officialNotificationUrl: link,
            applyOnlineUrl: link
          });
        }
      }
    }
    console.log(`[SarkariResult] Discovered ${results.length} recruitments meeting >= ${MIN_VACANCIES} vacancies.`);
  } catch (err) {
    console.warn(`[SarkariResult] Scrape skipped: ${err.message}`);
  }
  return results;
}

// Fuzzy normalizer to find duplicate jobs across sources
function getSimilarityKey(title, vacancies) {
  const simplified = title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\b(recruitment|online|form|posts?|vacancies|apply|board|commission|exam|latest|new)\b/g, '')
    .trim()
    .split(/\s+/)
    .filter(w => w.length > 2)
    .sort()
    .slice(0, 3)
    .join('-');

  return `${vacancies}_${simplified}`;
}

export function deduplicateAndMerge(existingJobs, incomingJobs) {
  const existingMap = new Map();
  const simMap = new Map();

  for (const job of existingJobs) {
    existingMap.set(job.slug, job);
    existingMap.set(job.id, job);
    simMap.set(getSimilarityKey(job.title, job.vacancies), job);
  }

  let added = 0;
  let updated = 0;

  for (const inc of incomingJobs) {
    if (inc.vacancies < MIN_VACANCIES) continue;

    const simKey = getSimilarityKey(inc.title, inc.vacancies);
    const existing = simMap.get(simKey);

    if (existing) {
      // Already present from prior seed or other source - refresh timestamp & details
      existing.lastUpdated = new Date().toISOString().split('T')[0];
      if (inc.lastDateToApply && inc.lastDateToApply !== 'Check Notification') {
        existing.lastDateToApply = inc.lastDateToApply;
      }
      updated++;
    } else {
      const slug = generateCleanSlug(inc.title);
      if (existingMap.has(slug)) {
        updated++;
        continue;
      }

      const id = slug.replace(/-photo-signature-resizer$/, '');
      const template = BOARD_MASTER_SPECS[inc.category] || BOARD_MASTER_SPECS['state-psc'];

      const newJob = {
        id,
        slug,
        title: inc.title,
        shortTitle: inc.title.slice(0, 35),
        board: inc.board,
        vacancies: inc.vacancies,
        category: inc.category,
        notificationDate: new Date().toISOString().split('T')[0],
        lastDateToApply: inc.lastDateToApply,
        officialNotificationUrl: inc.officialNotificationUrl,
        applyOnlineUrl: inc.applyOnlineUrl,
        status: 'active',
        photo: { ...template.photo },
        signature: { ...template.signature },
        rules: [...template.rules],
        keywords: [
          `${slug.replace(/-/g, ' ')}`,
          `${inc.title.toLowerCase()} photo size`,
          `${inc.title.toLowerCase()} signature size`,
          `${inc.board.toLowerCase()} photo resizer`,
          `${inc.title.toLowerCase()} photo upload specifications`
        ],
        primaryToolId: template.primaryToolId || 'smart-resizer',
        lastUpdated: new Date().toISOString().split('T')[0]
      };

      existingJobs.push(newJob);
      existingMap.set(slug, newJob);
      existingMap.set(id, newJob);
      simMap.set(simKey, newJob);
      added++;
    }
  }

  return { added, updated, total: existingJobs.length };
}

async function run() {
  const isDryRun = process.argv.includes('--dry-run');

  // 1. Read existing verified jobs database
  let existingJobs = [];
  if (fs.existsSync(jobsFilePath)) {
    existingJobs = JSON.parse(fs.readFileSync(jobsFilePath, 'utf8'));
  }
  console.log(`[Status] Existing verified jobs in database: ${existingJobs.length}`);

  // 2. Fetch live notifications from approved sources
  const fjaJobs = await fetchFreeJobAlert();
  const srJobs = await fetchSarkariResult();
  const incomingJobs = [...fjaJobs, ...srJobs];

  console.log(`\n[Status] Total live candidate recruitments fetched: ${incomingJobs.length}`);

  // 3. Deduplicate by vacancy + semantic keywords, filter (>=400 vacancies), and merge
  const stats = deduplicateAndMerge(existingJobs, incomingJobs);

  console.log('\n====================================================');
  console.log(' 📊 RECRUITMENT SYNC SUMMARY');
  console.log('====================================================');
  console.log(` • New Mega Recruitments Added : ${stats.added}`);
  console.log(` • Existing Recruitments Updated: ${stats.updated}`);
  console.log(` • Total Active in Database    : ${stats.total}`);

  // Sort by vacancies descending so the largest recruitments appear first
  existingJobs.sort((a, b) => b.vacancies - a.vacancies);

  console.log('\n[Top High-Vacancy Active Recruitment Tool Pages]:');
  existingJobs.slice(0, 15).forEach((j, i) => {
    console.log(` ${i+1}. [${j.vacancies.toLocaleString()} Posts] ${j.title}`);
    console.log(`    Route: /jobs/${j.slug}`);
    console.log(`    Photo: ${j.photo.minKB}-${j.photo.maxKB}KB (${j.photo.widthCm || j.photo.widthPx}x${j.photo.heightCm || j.photo.heightPx}) | Sig: ${j.signature.minKB}-${j.signature.maxKB}KB`);
  });

  if (!isDryRun) {
    fs.writeFileSync(jobsFilePath, JSON.stringify(existingJobs, null, 2), 'utf8');
    console.log(`\n✅ Database updated & written to ${jobsFilePath}`);
  } else {
    console.log('\n[Dry-Run Complete] Database was not modified.');
  }
}

run().catch((err) => {
  console.error('❌ Sync script failed:', err);
  process.exit(1);
});
