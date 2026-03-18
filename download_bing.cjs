const fs = require('fs');
const path = require('path');
const https = require('https');

// 未成功下载的品类 - 使用 Bing 图片搜索下载
const ITEMS = [
  { id: 'jiujie', q: '九节虾 海鲜 高清' },
  { id: 'scampi', q: '南极鳌虾 刺身 高清' },
  { id: 'mozambique', q: '莫桑比克对虾 红虾 高清' },
  { id: 'gazami', q: '三疣梭子蟹 海蟹 高清' },
  { id: 'spanner_crab', q: '旭蟹 海鲜 高清' },
  { id: 'golden_crab', q: '黄金蟹 海蟹 高清' },
  { id: 'leopard_grouper', q: '东星斑 石斑鱼 高清' },
  { id: 'mandarin_fish', q: '鳜鱼 高清' },
  { id: 'monkfish', q: '鮟鱇鱼 高清' },
  { id: 'eel', q: '日本鳗鱼 蒲烧 高清' },
  { id: 'mackerel', q: '马鲛鱼 鲅鱼 高清' },
  { id: 'pompano', q: '金鲳鱼 高清' },
  { id: 'crucian', q: '鲫鱼 高清' },
  { id: 'grass_carp', q: '草鱼 青鱼 高清' },
  { id: 'stingray', q: '鳐鱼 魟鱼 高清' },
  { id: 'barramundi', q: '金目鲈 盲曹 高清' },
  { id: 'bighead_carp', q: '胖头鱼 鳙鱼 高清' },
  { id: 'mullet', q: '鲻鱼 乌头 高清' },
  { id: 'threadfin', q: '马友鱼 午鱼 高清' },
  { id: 'abalone', q: '鲍鱼 高清' },
  { id: 'blood_clam', q: '血蚶 高清' },
  { id: 'napoleon_fish', q: '苏眉鱼 拿破仑鱼 高清' },
  { id: 'australian_lobster', q: '澳洲龙虾 澳龙 高清' },
  { id: 'puffer_fish', q: '河豚 高清' },
  { id: 'green_abalone', q: '翡翠鲍鱼 greenlip abalone' },
  { id: 'lobster_fra', q: '布列塔尼蓝龙虾 blue lobster' },
];

const IMAGES_DIR = path.join(__dirname, 'public', 'images');

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
    
    // Prefer thumbnails as they're more reliable
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
  let totalOk = 0, totalFail = 0;
  
  for (let i = 0; i < ITEMS.length; i++) {
    const item = ITEMS[i];
    console.log(`[${i+1}/${ITEMS.length}] ${item.id} (${item.q})...`);
    
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
    for (let j = 0; j < Math.min(urls.length, 2); j++) {
      const fp = path.join(IMAGES_DIR, `${item.id}_${j+1}.jpg`);
      const ok = await downloadImage(urls[j], fp);
      if (ok) {
        console.log(`  ${item.id}_${j+1}.jpg: ${fs.statSync(fp).size} bytes`);
        gotCount++;
      }
    }
    
    if (gotCount > 0) totalOk++;
    else totalFail++;
    
    await new Promise(r => setTimeout(r, 500));
  }
  
  console.log(`\nDone: ${totalOk} success, ${totalFail} failed`);
  
  // Print results
  console.log('\n=== Results ===');
  for (const item of ITEMS) {
    const files = [];
    for (let j = 1; j <= 3; j++) {
      const fp = path.join(IMAGES_DIR, `${item.id}_${j}.jpg`);
      if (fs.existsSync(fp) && fs.statSync(fp).size > 5000) {
        files.push(`/images/${item.id}_${j}.jpg`);
      }
    }
    console.log(`${item.id}: ${files.length > 0 ? files.join(', ') : 'NONE'}`);
  }
}

main();
