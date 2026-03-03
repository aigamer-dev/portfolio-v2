const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
const FILES = [
    'awards.json',
    'experience.json',
    'profile_info.json',
    'projects.json',
    'skills.json',
    'updates.json'
];

// Cloudflare R2 API Configuration
// We use the native Cloudflare API with the Bearer Token provided.
const ACCOUNT_ID = (process.env.R2_ACCOUNT_ID || '0b42275f58d5069c075c26006bc9360a').trim();
const BUCKET_NAME = (process.env.R2_BUCKET_NAME || 'portfolio-data').trim();
const API_TOKEN = (process.env.R2_API_TOKEN || process.env.R2_ACCESS_KEY_ID || '').trim();

async function downloadFile(filename) {
    const dest = path.join(DATA_DIR, filename);
    const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/r2/buckets/${BUCKET_NAME}/objects/${filename}`;

    try {
        console.log(`📡 Fetching ${filename} via R2 API...`);
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Status ${response.status}: ${errorText || response.statusText}`);
        }

        const buffer = await response.arrayBuffer();
        fs.writeFileSync(dest, Buffer.from(buffer));
        console.log(`✅ Downloaded ${filename}`);
    } catch (err) {
        console.error(`❌ Error details for ${filename}:`, err.message);
        throw err;
    }
}

async function main() {
    console.log(`🚀 Fetching data from Cloudflare R2 API...`);

    if (!API_TOKEN) {
        console.error('❌ R2 API Token missing in environment variables!');
        process.exit(1);
    }

    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    // Process files sequentially to avoid rate limiting and for cleaner logs
    for (const file of FILES) {
        try {
            await downloadFile(file);
        } catch (error) {
            console.error(`❌ Data sync failed for ${file}`);
            process.exit(1);
        }
    }

    console.log('✨ All data files synchronized!');
}

main();
