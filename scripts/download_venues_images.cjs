const fs = require('fs');
const path = require('path');
const https = require('https');

const VENUES_FILE = path.join(__dirname, '..', 'src', 'venuesData.js');
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images', 'venues');

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

function httpsGet(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*',
        ...headers
      },
      timeout: 15000
    };
    https.get(url, options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        httpsGet(res.headers.location, headers).then(resolve).catch(reject);
        return;
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, data: Buffer.concat(chunks) }));
    }).on('error', reject).on('timeout', function() { this.destroy(); reject(new Error('timeout')); });
  });
}

function extractVenues(content) {
  const venues = [];
  const regex = /id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*enName:\s*"([^"]+)",(.*?)city/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    venues.push({
      id: match[1],
      name: match[2],
      q: `${match[2]} 体育场 高清 图`
    });
  }
  return venues;
}

async function searchBing(query) {
  try {
    const url = `https://www.bing.com/images/search?q=${encodeURIComponent(query)}&first=1&count=5`;
    const res = await httpsGet(url);
    const html = res.data.toString('utf8');
    
    // Extract Bing thumbnail URLs
    const thumbs = html.match(/https?:\/\/tse\d+-mm\.cn\.bing\.net\/th[^\s"'<>]+/g) || [];
    // Also try murl (original image URLs)  
    const murls = html.match(/murl&quot;:&quot;(https?:\/\/[^&]+?)&quot;/g) || [];
    const origUrls = murls.map(m => {
      const match = m.match(/murl&quot;:&quot;(https?:\/\/[^&]+?)&quot;/);
      return match ? match[1] : null;
    }).filter(Boolean);
    
    const unique = [...new Set([...thumbs, ...origUrls])];
    return unique.slice(0, 3);
  } catch (e) {
    console.log(`  Bing search error: ${e.message}`);
    return [];
  }
}

async function downloadImage(url, filepath) {
  try {
    const res = await httpsGet(url);
    if (res.status === 200 && res.data.length > 5000) {
      fs.writeFileSync(filepath, res.data);
      return true;
    }
  } catch (e) { /* skip */ }
  return false;
}

async function main() {
  const content = fs.readFileSync(VENUES_FILE, 'utf8');
  const items = extractVenues(content);
  console.log(`Extracted ${items.length} venues.`);
  
  let totalOk = 0, totalFail = 0;
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    console.log(`[${i+1}/${items.length}] ${item.id} (${item.name})...`);
    
    // Skip if already have valid images
    const existing = path.join(IMAGES_DIR, `${item.id}_1.jpg`);
    if (fs.existsSync(existing) && fs.statSync(existing).size > 5000) {
      console.log(`  Already exists, skip`);
      totalOk++;
      continue;
    }
    
    const urls = await searchBing(item.q);
    if (urls.length === 0) {
      console.log(`  No URLs found`);
      totalFail++;
      continue;
    }
    
    let gotCount = 0;
    for (let j = 0; j < Math.min(urls.length, 3); j++) {
      const fp = path.join(IMAGES_DIR, `${item.id}_${j+1}.jpg`);
      const ok = await downloadImage(urls[j], fp);
      if (ok) {
        console.log(`  ${item.id}_${j+1}.jpg: ${fs.statSync(fp).size} bytes`);
        gotCount++;
      }
    }
    
    if (gotCount > 0) totalOk++;
    else totalFail++;
    
    await new Promise(r => setTimeout(r, 800)); // Be nice to Bing
  }
  
  console.log(`\nDone: ${totalOk} success, ${totalFail} failed`);
  
  // Print mapping for frontend
  console.log('\n=== VENUE_IMAGE_MAP ===');
  console.log('export const VENUE_IMAGE_MAP = {');
  for (const item of items) {
    const files = [];
    for (let j = 1; j <= 3; j++) {
      const fp = path.join(IMAGES_DIR, `${item.id}_${j}.jpg`);
      if (fs.existsSync(fp) && fs.statSync(fp).size > 5000) {
        files.push(`'/images/venues/${item.id}_${j}.jpg'`);
      }
    }
    if (files.length > 0) {
      console.log(`  ${item.id}: [${files.join(', ')}],`);
    } else {
      console.log(`  ${item.id}: [],`);
    }
  }
  console.log('};');
}

main();
