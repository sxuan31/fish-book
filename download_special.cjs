const fs = require('fs');
const path = require('path');
const https = require('https');

const ITEMS = [
  { id: 'ce1', q: '章鱼 八爪鱼 高清 实拍' },
  { id: 'ce2', q: '鱿鱼 海鲜 高清 实拍' },
  { id: 'ce3', q: '墨鱼 乌贼 高清' },
  { id: 'ce4', q: '望潮 小章鱼 高清 海鲜' },
  { id: 'ce5', q: '锁管 小管 海鲜 高清' },
  { id: 'ce6', q: '枪乌贼 透抽 高清' },
  { id: 'ec1', q: '辽刺参 海参 高清' },
  { id: 'ec2', q: '紫海胆 海鲜 高清' },
  { id: 'ec3', q: '马粪海胆 海鲜 高清' },
  { id: 'ec4', q: '海星 海产 高清' },
  { id: 'ec5', q: '梅花参 海参 高清' },
  { id: 'al1', q: '海带 昆布 海产 高清' },
  { id: 'al2', q: '紫菜 海产 高清' },
  { id: 'al3', q: '海葡萄 长茎葡萄蕨藻 高清' },
  { id: 'al4', q: '裙带菜 海鲜 高清' },
  { id: 'al5', q: '石花菜 海产 高清' },
  { id: 'al6', q: '龙须菜 海产 高清' },
];

const IMAGES_DIR = path.join(__dirname, 'public', 'images');

function httpsGet(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        ...headers
      },
      timeout: 10000
    }, (res) => {
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
    const url = `https://cn.bing.com/images/search?q=${encodeURIComponent(query)}&first=1&count=5`;
    const res = await httpsGet(url);
    const html = res.data.toString('utf8');
    const thumbs = html.match(/https?:\/\/tse\d+-mm\.cn\.bing\.net\/th[^\s"'<>]+/g) || [];
    return [...new Set(thumbs)].slice(0, 3);
  } catch (e) {
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
  } catch (e) { }
  return false;
}

async function main() {
  for (const item of ITEMS) {
    console.log(`Downloading ${item.id} (${item.q})...`);
    let urls = await searchBing(item.q);
    
    // 如果 Bing 没找到，随便弄点关键词再搜
    if (urls.length < 2) {
      urls = await searchBing(item.q.split(' ')[0] + ' 真实 高清');
    }
    
    let ok = 0;
    for (let j = 0; j < Math.min(urls.length, 3); j++) {
      const fp = path.join(IMAGES_DIR, `${item.id}_${j+1}.jpg`);
      if (fs.existsSync(fp) && fs.statSync(fp).size > 5000) {
        ok++;
        continue;
      }
      if (await downloadImage(urls[j], fp)) ok++;
    }
    
    console.log(`  -> Got ${ok} images`);
    await new Promise(r => setTimeout(r, 600));
  }
  
  console.log('\n\nLOCAL_IMAGE_MAP 补充内容：');
  for (const item of ITEMS) {
    const paths = [];
    for (let j = 1; j <= 3; j++) {
      const fp = path.join(IMAGES_DIR, `${item.id}_${j}.jpg`);
      if (fs.existsSync(fp) && fs.statSync(fp).size > 5000) {
        paths.push(`/images/${item.id}_${j}.jpg`);
      }
    }
    if (paths.length > 0) {
      console.log(`  ${item.id}: ${JSON.stringify(paths)},`);
    } else {
      console.log(`  // ${item.id} 下载失败`);
    }
  }
}

main();
