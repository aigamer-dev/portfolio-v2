const fs = require('fs');
const path = require('path');
const https = require('https');

const DATA_DIR = path.join(__dirname, '../data');
const FILES = [
    'awards.json',
    'experience.json',
    'profile_info.json',
    'projects.json',
    'skills.json',
    'updates.json'
];

// In a real private scenario, you would use @aws-sdk/client-s3 with your keys.
// For now, we fetch from the provided custom domain as the user indicated it's available.
const BASE_URL = process.env.R2_DATA_URL || 'https://portfolio-data.aigamer.dev';

async function downloadFile(filename) {
    const url = `${BASE_URL}/${filename}`;
    const dest = path.join(DATA_DIR, filename);

    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to fetch ${filename}: Status ${res.statusCode}`));
                return;
            }

            const fileStream = fs.createWriteStream(dest);
            res.pipe(fileStream);

            fileStream.on('finish', () => {
                fileStream.close();
                console.log(`✅ Downloaded ${filename}`);
                resolve();
            });

            fileStream.on('error', (err) => {
                fs.unlink(dest, () => { });
                reject(err);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

async function main() {
    console.log(`🚀 Fetching data from ${BASE_URL}...`);

    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    const tasks = FILES.map(file => downloadFile(file));

    try {
        await Promise.all(tasks);
        console.log('✨ All data files synchronized!');
    } catch (error) {
        console.error('❌ Data sync failed:', error.message);
        process.exit(1);
    }
}

main();
