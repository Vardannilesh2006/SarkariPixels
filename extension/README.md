# SarkariPixels Chrome Extension

A Manifest V3 Chrome extension that provides instant access to SarkariPixels — the free browser-based photo resizer for Indian government exam portals (SSC, UPSC, BPSC, RRB, IBPS, NTA).

## Features

- **Quick Launcher Popup:** 8 most-used tool links in one click
- **Zero Permissions:** No special browser permissions required
- **Privacy First:** Opens the main site — no data collection in the extension itself

## Files

```
extension/
├── manifest.json      # Manifest V3 extension config
├── popup.html         # Popup UI (300px wide quick launcher)
├── popup.js           # Dynamic tool link generator
├── icons/
│   ├── icon-16.png    # Toolbar icon
│   ├── icon-48.png    # Extension management page
│   └── icon-128.png   # Chrome Web Store listing
└── README.md          # This file
```

## Load Unpacked (Development)

1. Open Chrome → `chrome://extensions/`
2. Enable **Developer mode** (top-right toggle)
3. Click **Load unpacked**
4. Select the `extension/` folder
5. The SarkariPixels icon appears in the toolbar

## Before Chrome Web Store Submission

### Replace placeholder icons
The icons in `icons/` are minimal placeholders. Replace them with actual branded 16×16, 48×48, and 128×128 PNG icons (blue `#2563eb` background with white "S" letter).

### Update icons using the generator script
```bash
# Install canvas package first
npm install canvas --save-dev
# Then run the icon generator
node scripts/gen-extension-icons.mjs
```

### Chrome Web Store listing details
- **Category:** Productivity
- **Language:** English
- **Target keywords:** exam photo resizer, SSC photo tool, UPSC photo compress, government exam photo
- **Description (short):** Free photo resizer for Indian government exam portals. Resize and compress to exact SSC, UPSC, IBPS specs in one click.
- **Privacy policy URL:** https://www.sarkaripixels.online/page/privacy

### Publish steps
1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Pay the one-time \$5 developer registration fee
3. Click **Add new item** → Upload the `extension/` folder as a ZIP
4. Fill in the listing details above
5. Submit for review (typically 1–3 business days)

## SEO / Backlink Value

Publishing on the Chrome Web Store creates a high-DA backlink (chromewebstore.google.com DA: 98) pointing to sarkaripixels.online, which directly boosts domain authority and organic search rankings.
