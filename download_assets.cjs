const fs = require('fs');
const https = require('https');
const path = require('path');

const assetsDir = path.join(__dirname, 'public', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const urls = {
  'wedding-song.mp3': 'https://shreyanshandaditi.vercel.app/assets/wedding-song-ChFhoKof.mp3',
  'reception-bg.mp4': 'https://shreyanshandaditi.vercel.app/assets/reception-9-Fy-TsY.mp4',
  'ganesh.png': 'https://shreyanshandaditi.vercel.app/assets/ganesh-BlstKMaz.png',
  'mahaveer.png': 'https://shreyanshandaditi.vercel.app/assets/mahaveer-D8i9KVjU.png',
  'shreeganeshaynamh.png': 'https://shreyanshandaditi.vercel.app/assets/shreeganeshaynamh-DDPPH2SO.png',
  'welcomeslider.png': 'https://shreyanshandaditi.vercel.app/assets/welcomeslider-C8xNcQ6k.png',
  'envelope.png': 'https://shreyanshandaditi.vercel.app/assets/envelope-3-CmWx7DBD.png',
  'sangeet-bg.png': 'https://shreyanshandaditi.vercel.app/assets/sangeet-2-bg-CJs-5aJq.png',
  'carnival-bg.png': 'https://shreyanshandaditi.vercel.app/assets/carnival-1-bg-2gsG8Yvx.png',
  'bhaatbharai-bg.png': 'https://shreyanshandaditi.vercel.app/assets/bhaatbharai-bg-CnPNSQSs.png',
  'kalash-bg.png': 'https://shreyanshandaditi.vercel.app/assets/kalash-bg-dLGND75C.png',
  'welcomefeast-bg.png': 'https://shreyanshandaditi.vercel.app/assets/welcomefeast-bg-BT6VsUNa.png',
  'vinayak-bg.png': 'https://shreyanshandaditi.vercel.app/assets/vinayakstaphna-bg-DAGC14Iw.png',
  'map.png': 'https://shreyanshandaditi.vercel.app/assets/map-foq-e4Pj.png'
};

async function download(filename, url) {
  return new Promise((resolve, reject) => {
    const dest = path.join(assetsDir, filename);
    const file = fs.createWriteStream(dest);
    https.get(url, response => {
      if (response.statusCode !== 200) {
        console.error(`Failed to download ${filename}: status ${response.statusCode}`);
        return resolve();
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', err => {
      console.error(`Error downloading ${filename}: ${err.message}`);
      resolve();
    });
  });
}

async function main() {
  console.log("Starting asset downloads...");
  for (const [filename, url] of Object.entries(urls)) {
    await download(filename, url);
  }
  console.log("All downloads completed!");
}

main();
