const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const NEW_ITEMS = [
  // 虾类新增
  { id: 'jiujie', name: '九节虾' },
  { id: 'scampi', name: '南极鳌虾' },
  { id: 'flower_lobster', name: '锦绣龙虾' },
  { id: 'mozambique', name: '莫桑比克对虾' },
  { id: 'rock_shrimp', name: '岩虾' },
  { id: 'river_prawn', name: '河虾' },
  { id: 'glass_shrimp', name: '玻璃虾' },
  // 蟹类新增
  { id: 'gazami', name: '三疣梭子蟹' },
  { id: 'spanner_crab', name: '旭蟹' },
  { id: 'blue_crab', name: '蓝蟹' },
  { id: 'stone_crab', name: '石蟹' },
  { id: 'spider_crab', name: '蜘蛛蟹' },
  { id: 'golden_crab', name: '黄金蟹' },
  // 鱼类新增
  { id: 'leopard_grouper', name: '东星斑' },
  { id: 'mandarin_fish', name: '鳜鱼' },
  { id: 'monkfish', name: '鮟鱇鱼' },
  { id: 'eel', name: '鳗鱼' },
  { id: 'mackerel', name: '马鲛鱼' },
  { id: 'pompano', name: '金鲳鱼' },
  { id: 'crucian', name: '鲫鱼' },
  { id: 'grass_carp', name: '草鱼' },
  { id: 'stingray', name: '鳐鱼' },
  { id: 'basa', name: '巴沙鱼' },
  { id: 'barramundi', name: '金目鲈' },
  { id: 'bighead_carp', name: '胖头鱼' },
  { id: 'mullet', name: '鲻鱼' },
  { id: 'threadfin', name: '马友鱼' },
  // 贝类新增
  { id: 'abalone', name: '鲍鱼' },
  { id: 'blood_clam', name: '血蚶' },
  { id: 'ark_shell', name: '赤贝' },
  // 名贵新增
  { id: 'napoleon_fish', name: '苏眉鱼' },
  { id: 'australian_lobster', name: '澳洲龙虾' },
  { id: 'puffer_fish', name: '河豚' },
  { id: 'green_abalone', name: '翡翠鲍' },
  { id: 'lobster_fra', name: '布列塔尼蓝龙虾' },
];

const IMAGES_DIR = path.join(__dirname, 'public', 'images');

function httpGet(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        ...headers
      },
      timeout: 10000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        httpGet(res.headers.location, headers).then(resolve).catch(reject);
        return;
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({ statusCode: res.statusCode, data: Buffer.concat(chunks) }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function downloadFile(url, filepath) {
  try {
    const res = await httpGet(url, { 'Referer': 'https://baike.baidu.com/' });
    if (res.statusCode === 200 && res.data.length > 5000) {
      fs.writeFileSync(filepath, res.data);
      return true;
    }
  } catch (e) { /* ignore */ }
  return false;
}

async function fetchBaikeImages(name) {
  try {
    const res = await httpGet(`https://baike.baidu.com/item/${encodeURIComponent(name)}`, {});
    const html = res.data.toString('utf8');
    const matches = html.match(/https:\/\/bkimg\.cdn\.bcebos\.com\/pic\/[a-f0-9]+/g);
    if (matches) {
      return [...new Set(matches)].slice(0, 3);
    }
  } catch (e) {
    console.log(`  Baike failed for ${name}: ${e.message}`);
  }
  return [];
}

async function fetchBingImages(name) {
  try {
    const q = encodeURIComponent(name + ' 高清 海鲜 实拍');
    const res = await httpGet(`https://cn.bing.com/images/search?q=${q}&first=1`, {});
    const html = res.data.toString('utf8');
    const matches = html.match(/https:\/\/tse[0-9]-mm\.cn\.bing\.net\/th\?id=[a-zA-Z0-9._%-]+/g);
    if (matches) {
      return [...new Set(matches)].slice(0, 3);
    }
  } catch (e) {
    console.log(`  Bing failed for ${name}: ${e.message}`);
  }
  return [];
}

async function main() {
  console.log(`Will download images for ${NEW_ITEMS.length} new items into ${IMAGES_DIR}`);
  const results = {};

  for (let i = 0; i < NEW_ITEMS.length; i++) {
    const item = NEW_ITEMS[i];
    console.log(`[${i+1}/${NEW_ITEMS.length}] ${item.name} (${item.id})...`);

    // Check if already downloaded
    const existing = [];
    for (let j = 1; j <= 3; j++) {
      const fp = path.join(IMAGES_DIR, `${item.id}_${j}.jpg`);
      if (fs.existsSync(fp) && fs.statSync(fp).size > 5000) {
        existing.push(`/images/${item.id}_${j}.jpg`);
      }
    }
    if (existing.length >= 2) {
      console.log(`  Already have ${existing.length} images, skipping.`);
      results[item.id] = existing;
      continue;
    }

    let urls = await fetchBaikeImages(item.name);
    if (urls.length < 2) {
      console.log(`  Baike got ${urls.length}, trying Bing...`);
      const bingUrls = await fetchBingImages(item.name);
      urls = [...urls, ...bingUrls].slice(0, 3);
    }

    const downloaded = [];
    for (let j = 0; j < Math.min(urls.length, 3); j++) {
      const filename = `${item.id}_${j+1}.jpg`;
      const filepath = path.join(IMAGES_DIR, filename);
      if (fs.existsSync(filepath) && fs.statSync(filepath).size > 5000) {
        downloaded.push(`/images/${filename}`);
        continue;
      }
      const ok = await downloadFile(urls[j], filepath);
      if (ok) {
        console.log(`  Downloaded ${filename} (${fs.statSync(filepath).size} bytes)`);
        downloaded.push(`/images/${filename}`);
      } else {
        console.log(`  Failed ${filename}`);
      }
    }

    results[item.id] = downloaded.length > 0 ? downloaded : [];
    console.log(`  Got ${downloaded.length} images`);

    // rate limit
    await new Promise(r => setTimeout(r, 400));
  }

  // Output LOCAL_IMAGE_MAP entries
  console.log('\n\n===== LOCAL_IMAGE_MAP entries to add =====');
  for (const [id, paths] of Object.entries(results)) {
    if (paths.length > 0) {
      console.log(`  ${id}: ${JSON.stringify(paths)},`);
    }
  }
  console.log('==========================================');
  console.log(`Done! Downloaded images for ${Object.keys(results).length} items.`);
}

main();
