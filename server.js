require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3000;

// Serve static assets from the current directory, EXCEPT index.html for custom routing
app.use(express.static(__dirname, { index: false }));

// Helper function to serve index.html with dynamically injected SEO meta tags
function serveIndexWithMeta(req, res, title, description) {
  const indexPath = path.join(__dirname, 'index.html');
  fs.readFile(indexPath, 'utf8', (err, html) => {
    if (err) {
      return res.status(500).send("Error loading index.html");
    }
    
    let modifiedHtml = html;
    
    // Inject Title Tag
    if (title) {
      modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
    }
    
    // Inject Meta Description Tag
    if (description) {
      const descMetaRegex = /<meta\s+name="description"\s+content="[^"]*"/i;
      if (descMetaRegex.test(modifiedHtml)) {
        modifiedHtml = modifiedHtml.replace(descMetaRegex, `<meta name="description" content="${description}"`);
      } else {
        modifiedHtml = modifiedHtml.replace('</head>', `<meta name="description" content="${description}">\n</head>`);
      }
    }
    
    // Inject Canonical URL
    const canonicalUrl = `https://formfit.app${req.path}`;
    const canonicalRegex = /<link\s+rel="canonical"\s+href="[^"]*"/i;
    if (canonicalRegex.test(modifiedHtml)) {
      modifiedHtml = modifiedHtml.replace(canonicalRegex, `<link rel="canonical" href="${canonicalUrl}"`);
    } else {
      modifiedHtml = modifiedHtml.replace('</head>', `<link rel="canonical" href="${canonicalUrl}">\n</head>`);
    }
    
    res.send(modifiedHtml);
  });
}

// Extract TOOLS metadata from app.js on startup
let TOOLS = [];
try {
  const appCode = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
  const startIdx = appCode.indexOf('const TOOLS = [');
  const endIdx = appCode.indexOf('];', startIdx);
  if (startIdx !== -1 && endIdx !== -1) {
    let toolsCode = appCode.substring(startIdx, endIdx + 2);
    toolsCode = toolsCode.replace('const TOOLS =', 'TOOLS =');
    eval('var piexif = {}; var JSZip = {}; ' + toolsCode);
  }
} catch (e) {
  console.error("Failed to parse TOOLS metadata from app.js", e);
}

// Tool route meta injection
app.get('/tool/:id', (req, res) => {
  const toolId = req.params.id;
  const tool = TOOLS.find(t => t.id === toolId);
  if (tool) {
    const title = `${tool.title} - SarkariPixels Image Editor`;
    const desc = `Use our 100% local ${tool.title} tool. ${tool.desc} Private, fast and web-compliant.`;
    serveIndexWithMeta(req, res, title, desc);
  } else {
    res.redirect('/');
  }
});

// Legal pages route meta injection
app.get('/page/:id', (req, res) => {
  const pageId = req.params.id;
  let title = "SarkariPixels";
  let desc = "SarkariPixels client-side image transformations and tools.";
  
  if (pageId === 'privacy') {
    title = "Privacy Policy - SarkariPixels";
    desc = "SarkariPixels operates completely in your client browser. Zero server uploads.";
  } else if (pageId === 'about') {
    title = "About Us & Terms - SarkariPixels";
    desc = "About SarkariPixels client-side canvas transformations and usage terms.";
  } else if (pageId === 'sitemap') {
    title = "HTML Sitemap - SarkariPixels";
    desc = "Complete directory index of all 88 SarkariPixels tools and legal presets.";
  } else {
    return res.redirect('/');
  }
  serveIndexWithMeta(req, res, title, desc);
});

// AI Chat Proxy Endpoint
app.post('/api/chat', express.json(), async (req, res) => {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "OpenRouter API Key is not configured on the server." });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://formfit.app',
        'X-OpenRouter-Title': 'SarkariPixels AI Counselor'
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b:free',
        messages: req.body.messages,
        temperature: 0.7
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("AI Chat Proxy error:", error);
    res.status(500).json({ error: "Failed to communicate with AI Counselor." });
  }
});

// Home page
app.get('/', (req, res) => {
  serveIndexWithMeta(
    req, 
    res, 
    "SarkariPixels | Online Image Compressor, Resizer & Govt Exam Photo Editor",
    "Resize and compress photos or signatures for SSC, UPSC, BPSC, BSSC, and banking exams to exact KB & dimensions instantly. 100% free and client-side safe."
  );
});

// Fallback route for all other paths (redirect or SPA index)
app.get('*', (req, res) => {
  res.redirect('/');
});

// Start listening
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 SarkariPixels server running at: http://localhost:${PORT}`);
  console.log(`📂 Client-side processing: 100% Secure (No Uploads)`);
  console.log(`=======================================================`);
});
