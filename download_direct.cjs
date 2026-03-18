const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// 直接使用用户提供的 baikeImg URL 下载
const ITEMS = [
  { id: 'jiujie', urls: ['https://bkimg.cdn.bcebos.com/pic/a08b87d6277f9e2f465c40021630e924b899f36f'] },
  { id: 'scampi', urls: ['https://bkimg.cdn.bcebos.com/pic/9c16fdfaaf51f3de9c82806504eef01f3a29792a'] },
  { id: 'mozambique', urls: ['https://bkimg.cdn.bcebos.com/pic/f31fbe096b63f624458392578744ebf81a4c5148'] },
  { id: 'gazami', urls: ['https://bkimg.cdn.bcebos.com/pic/7aec54e736d12f2eb30939104fc2d5628535e58c'] },
  { id: 'spanner_crab', urls: ['https://bkimg.cdn.bcebos.com/pic/95eef01f3a292df5e0fe178229712c36afc3b3fc'] },
  { id: 'golden_crab', urls: ['https://bkimg.cdn.bcebos.com/pic/d1160924ab18972b2203923ee6cd7b899e510a9a'] },
  { id: 'leopard_grouper', urls: ['https://bkimg.cdn.bcebos.com/pic/e4dde71190ef76c61f23783a9d16fdfaaf516709'] },
  { id: 'mandarin_fish', urls: ['https://bkimg.cdn.bcebos.com/pic/8b82b9014a90f603730e620d3112b31bb051ed1c'] },
  { id: 'monkfish', urls: ['https://bkimg.cdn.bcebos.com/pic/14ce36d3d539b60098f9a942e150352ac75cb27e'] },
  { id: 'eel', urls: ['https://bkimg.cdn.bcebos.com/pic/80cb39dbb6fd526678254884aa18972bd407361a'] },
  { id: 'mackerel', urls: ['https://bkimg.cdn.bcebos.com/pic/b219ebc4b74543a96860d5b61e178a82b9011409'] },
  { id: 'pompano', urls: ['https://bkimg.cdn.bcebos.com/pic/bba1cd11728b47101833075dc0ced0fdfc032338'] },
  { id: 'crucian', urls: ['https://bkimg.cdn.bcebos.com/pic/f603918fa0ec08fa204ec13c59ee3d6d55fbda22'] },
  { id: 'grass_carp', urls: ['https://bkimg.cdn.bcebos.com/pic/0ff41bd5ad6eddc451da876139dbb6fd52663363'] },
  { id: 'stingray', urls: ['https://bkimg.cdn.bcebos.com/pic/4bed2e738bd4b31c26027a0f87d6277f9e2f7331'] },
  { id: 'barramundi', urls: ['https://bkimg.cdn.bcebos.com/pic/a08b87d6277f9e2f465c40021630e924b899f36f'] },
  { id: 'bighead_carp', urls: ['https://bkimg.cdn.bcebos.com/pic/d62a6059252dd42a78652496033b5bb5c9e11f7c'] },
  { id: 'mullet', urls: ['https://bkimg.cdn.bcebos.com/pic/42a98226cffc1e176657922d4a90f603738de902'] },
  { id: 'threadfin', urls: ['https://bkimg.cdn.bcebos.com/pic/3ac79f3df8dcd100d890f6b4738b4710b9122f3e'] },
  { id: 'abalone', urls: ['https://bkimg.cdn.bcebos.com/pic/572c11dfa9ec8a139e8020e4c703918fa1ecc0a3'] },
  { id: 'blood_clam', urls: ['https://bkimg.cdn.bcebos.com/pic/0df3d7ca7bcb0a4697926b486263f6246b60af5a'] },
  { id: 'napoleon_fish', urls: ['https://bkimg.cdn.bcebos.com/pic/a8d3fd1f4134970a256a27e09fcad1c8a7865d25'] },
  { id: 'australian_lobster', urls: ['https://bkimg.cdn.bcebos.com/pic/14ce36d3d539b60098f98761e150352ac75cb29c'] },
  { id: 'puffer_fish', urls: ['https://bkimg.cdn.bcebos.com/pic/730e0cf3d7ca7bcb0a46b0f7f2407263f6242e5a'] },
  { id: 'green_abalone', urls: ['https://bkimg.cdn.bcebos.com/pic/4bed2e738bd4b31c26027a0f87d6277f9e2f7331'] },
  { id: 'lobster_fra', urls: ['https://bkimg.cdn.bcebos.com/pic/14ce36d3d539b60064f77c68e350352ac75cb283'] },
];

const IMAGES_DIR = path.join(__dirname, 'public', 'images');

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://baike.baidu.com/'
      },
      timeout: 15000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        downloadFile(res.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      const ws = fs.createWriteStream(filepath);
      res.pipe(ws);
      ws.on('finish', () => {
        const size = fs.statSync(filepath).size;
        if (size < 2000) {
          fs.unlinkSync(filepath);
          resolve(false);
        } else {
          resolve(true);
        }
      });
      ws.on('error', () => resolve(false));
    }).on('error', () => resolve(false));
  });
}

async function main() {
  let ok = 0, fail = 0;
  for (const item of ITEMS) {
    const fp = path.join(IMAGES_DIR, `${item.id}_1.jpg`);
    if (fs.existsSync(fp) && fs.statSync(fp).size > 5000) {
      console.log(`${item.id}: already exists, skip`);
      ok++;
      continue;
    }
    const success = await downloadFile(item.urls[0], fp);
    if (success) {
      console.log(`${item.id}: OK (${fs.statSync(fp).size} bytes)`);
      ok++;
    } else {
      console.log(`${item.id}: FAILED`);
      fail++;
    }
    await new Promise(r => setTimeout(r, 300));
  }
  console.log(`\nDone: ${ok} ok, ${fail} failed`);
}

main();
