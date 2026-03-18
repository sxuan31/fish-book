const fs = require('fs');
const path = require('path');
const axios = require('axios');

const SEAFOOD_DATA = [
  // --- 虾类 ---
  { id: 's1', name: '波士顿龙虾' },
  { id: 's2', name: '南美白对虾' },
  { id: 's3', name: '皮皮虾' },
  { id: 's4', name: '黑虎虾' },
  { id: 's5', name: '基围虾' },
  { id: 's6', name: '牡丹虾' },
  { id: 's7', name: '阿根廷红虾' },
  { id: 's8', name: '甜虾' },
  { id: 's9', name: '罗氏沼虾' },
  { id: 's10', name: '小龙虾' },
  { id: 's11', name: '斑节对虾' },
  { id: 's12', name: '樱花虾' },

  // --- 螃蟹 ---
  { id: 'c1', name: '大闸蟹' },
  { id: 'c2', name: '帝王蟹' },
  { id: 'c3', name: '梭子蟹' },
  { id: 'c4', name: '面包蟹' },
  { id: 'c5', name: '青蟹' },
  { id: 'c6', name: '珍宝蟹' },
  { id: 'c7', name: '雪蟹' },
  { id: 'c8', name: '椰子蟹' },
  { id: 'c9', name: '红毛蟹' },
  { id: 'c10', name: '兰花蟹' },
  { id: 'c11', name: '软壳蟹' },
  { id: 'c12', name: '蜘蛛蟹' },

  // --- 鱼类 ---
  { id: 'f1', name: '大黄鱼' },
  { id: 'f2', name: '三文鱼' },
  { id: 'f3', name: '石斑鱼' },
  { id: 'f4', name: '秋刀鱼' },
  { id: 'f5', name: '龙胆石斑' },
  { id: 'f6', name: '多宝鱼' },
  { id: 'f7', name: '银鳕鱼' },
  { id: 'f8', name: '海鲈鱼' },
  { id: 'f9', name: '金目鲷' },
  { id: 'f10', name: '带鱼' },
  { id: 'f11', name: '银鲳鱼' },
  { id: 'f12', name: '蓝点马鲛' },

  // --- 贝类 ---
  { id: 'sh1', name: '生蚝' },
  { id: 'sh2', name: '扇贝' },
  { id: 'sh3', name: '鲍鱼' },
  { id: 'sh4', name: '象拔蚌' },
  { id: 'sh5', name: '花甲' },
  { id: 'sh6', name: '贻贝' },
  { id: 'sh7', name: '文蛤' },
  { id: 'sh8', name: '蛏子王' },
  { id: 'sh9', name: '鸟贝' },
  { id: 'sh10', name: '章鱼' },
  { id: 'sh11', name: '鱿鱼' },
  { id: 'sh12', name: '墨鱼' },

  // --- 顶级珍品 ---
  { id: 'p1', name: '蓝鳍金枪鱼' },
  { id: 'p2', name: '大白鳇' },
  { id: 'p3', name: '海胆' },
  { id: 'p4', name: '野生大黄鱼' },
  { id: 'p5', name: '吉拉多生蚝' },
  { id: 'p6', name: '澳洲皇帝蟹' },
  { id: 'p7', name: '喜知次' },
  { id: 'p8', name: '蓝龙虾' },
  { id: 'p9', name: '阿拉斯加帝王蟹' },
  { id: 'p10', name: '花胶' },
  { id: 'p11', name: '马粪海胆' },
  { id: 'p12', name: '西班牙红虾' }
];

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

async function downloadImage(url, filepath) {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://baike.baidu.com/'
      }
    });

    return new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(filepath);
      response.data.pipe(writer);
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (err) {
    console.error(`Failed to download ${url}: ${err.message}`);
    return false;
  }
}

async function fetchImagesForKeyword(item) {
  try {
    const response = await axios.get(`https://baike.baidu.com/item/${encodeURIComponent(item.name)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0' },
      timeout: 5000
    });
    
    // Extract bcebos image URLs from the baike page
    const matches = response.data.match(/https:\/\/bkimg\.cdn\.bcebos\.com\/pic\/[a-f0-9]+/g);
    if (!matches) return [];
    
    // Deduplicate
    const uniqueMatches = [...new Set(matches)];
    
    // Make sure we get high-resolution variants by adding @w_800 or similar if needed, 
    // but baidu baike raw pic links are usually good enough.
    return uniqueMatches.slice(0, 3);
  } catch (err) {
    console.error(`Failed to scrape ${item.name}: ${err.message}`);
    return [];
  }
}

async function main() {
  const resultData = [];

  for (let i = 0; i < SEAFOOD_DATA.length; i++) {
    const item = SEAFOOD_DATA[i];
    console.log(`[${i+1}/${SEAFOOD_DATA.length}] Processing ${item.name}...`);
    
    let imgUrls = await fetchImagesForKeyword(item);
    
    // Fallback search to bing if baike failed to provide images
    if (imgUrls.length < 2) {
      try {
         const bingResponse = await axios.get(`https://cn.bing.com/images/search?q=${encodeURIComponent(item.name + ' 高清 海鲜 实拍')}`, {
             headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 5000
         });
         const bingMatches = bingResponse.data.match(/https:\/\/tse[0-9]-mm\.cn\.bing\.net\/th\?id=[a-zA-Z0-9_-]+/g);
         if (bingMatches) {
             const uniqueBing = [...new Set(bingMatches)];
             imgUrls = [...imgUrls, ...uniqueBing].slice(0, 3);
         }
      } catch (e) {
         console.log('Bing fallback failed');
      }
    }

    const downloadedPaths = [];
    for (let j = 0; j < Math.min(imgUrls.length, 3); j++) {
      const ext = '.jpg';
      const filename = `${item.id}_${j + 1}${ext}`;
      const filepath = path.join(IMAGES_DIR, filename);
      
      if (!fs.existsSync(filepath)) {
          await downloadImage(imgUrls[j], filepath);
      }
      
      // Store local public URL path
      downloadedPaths.push(`/images/${filename}`);
    }
    
    resultData.push({
      id: item.id,
      images: downloadedPaths.length > 0 ? downloadedPaths : ['/images/placeholder.jpg']
    });

    // Small delay to prevent rate limit
    await new Promise(res => setTimeout(res, 300));
  }

  // Update App.jsx with images array
  const appJsxPath = path.join(__dirname, '..', 'src', 'App.jsx');
  let appJsxContent = fs.readFileSync(appJsxPath, 'utf8');

  // Regex replacer for baikeImg logic when keys are JSON stringified (e.g. "id": "s1")
  for(const r of resultData) {
      // match "id": "s1" or id: 's1'
      const regex = new RegExp(`(["']?id["']?\\s*:\\s*["']${r.id}["'][\\s\\S]*?)(["']?baikeImg["']?\\s*:\\s*["']?[^"']+["']?)`, 'g');
      appJsxContent = appJsxContent.replace(regex, `$1"images": ${JSON.stringify(r.images)}, $2`);
  }
  
  // Create dummy placeholder just in case
  const placeholderPath = path.join(IMAGES_DIR, 'placeholder.jpg');
  if(!fs.existsSync(placeholderPath)) {
      await downloadImage('https://tse1-mm.cn.bing.net/th?q=seafood&w=800&h=600&c=7&rs=1&p=0', placeholderPath);
  }

  fs.writeFileSync(appJsxPath, appJsxContent, 'utf8');
  console.log('Done downloading 120+ images and updating App.jsx.');
}

main();
