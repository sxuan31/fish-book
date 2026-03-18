const fs = require('fs');
const https = require('https');

const fixes = [
  { id: 'ce5', url: 'https://bkimg.cdn.bcebos.com/pic/0dd7912397dda144ad34bd6584e0c0a20df431add659' }, // 锁管 
  { id: 'ce6', url: 'https://bkimg.cdn.bcebos.com/pic/5243fbf2b2119313b07ecc7752671bd7912397ddc955' } // 枪乌贼
];

fixes.forEach(item => {
  https.get(item.url, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  }, res => {
    if (res.statusCode === 200) {
      res.pipe(fs.createWriteStream(`public/images/${item.id}_1.jpg`));
    }
  });
});
console.log("ce5: ['/images/ce5_1.jpg']");
console.log("ce6: ['/images/ce6_1.jpg']");
