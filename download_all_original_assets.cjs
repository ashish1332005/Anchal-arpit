const fs = require('fs');
const https = require('https');
const path = require('path');

const assetsDir = path.join(__dirname, 'public', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const urls = {
  'welcomeslider.png': 'https://shreyanshandaditi.vercel.app/assets/welcomeslider-C8xNcQ6k.png',
  'envelope.png': 'https://shreyanshandaditi.vercel.app/assets/envelope-3-CmWx7DBD.png',
  'ganesh.png': 'https://shreyanshandaditi.vercel.app/assets/ganesh-BlstKMaz.png',
  'mahaveer.png': 'https://shreyanshandaditi.vercel.app/assets/mahaveer-D8i9KVjU.png',
  'wedding-song.mp3': 'https://shreyanshandaditi.vercel.app/assets/wedding-song-ChFhoKof.mp3',
  'datereveal-bg.png': 'https://shreyanshandaditi.vercel.app/assets/datereveal-bg-B_ZpgmG_.png',
  'vinayak-bg.png': 'https://shreyanshandaditi.vercel.app/assets/vinayakstaphna-bg-DAGC14Iw.png',
  'shreeganeshaynamh.png': 'https://shreyanshandaditi.vercel.app/assets/shreeganeshaynamh-DDPPH2SO.png',
  'kalash-bg.png': 'https://shreyanshandaditi.vercel.app/assets/kalash-bg-dLGND75C.png',
  'shubharambh.png': 'https://shreyanshandaditi.vercel.app/assets/shubharambh-BX7uNv0j.png',
  'carnival-bg.png': 'https://shreyanshandaditi.vercel.app/assets/carnival-1-bg-2gsG8Yvx.png',
  'sangeet-bg.png': 'https://shreyanshandaditi.vercel.app/assets/sangeet-2-bg-CJs-5aJq.png',
  'bhaatbharai-bg.png': 'https://shreyanshandaditi.vercel.app/assets/bhaatbharai-bg-CnPNSQSs.png',
  'welcomefeast-bg.png': 'https://shreyanshandaditi.vercel.app/assets/welcomefeast-bg-BT6VsUNa.png',
  'reception-bg.mp4': 'https://shreyanshandaditi.vercel.app/assets/reception-9-Fy-TsY.mp4',
  'directions-bg.png': 'https://shreyanshandaditi.vercel.app/assets/directions-bg-L-BY8P6x.png',
  'map.png': 'https://shreyanshandaditi.vercel.app/assets/map-foq-e4Pj.png',
  'rsvp-1-bg.png': 'https://shreyanshandaditi.vercel.app/assets/rsvp-1-bg-DuM3yeSA.png',
  'rsvp-2-bg.png': 'https://shreyanshandaditi.vercel.app/assets/rsvp-2-bg-CwHn7a7p.png',
  'footer-bg.png': 'https://shreyanshandaditi.vercel.app/assets/footer-1-bg-Bj_utZOU.png'
};

async function download(filename, url) {
  return new Promise((resolve) => {
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
  console.log("Starting full asset downloads...");
  for (const [filename, url] of Object.entries(urls)) {
    await download(filename, url);
  }
  console.log("All downloads completed!");
}

main();
