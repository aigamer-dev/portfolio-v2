const fs = require('fs');
const path = require('path');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');

const DATA_DIR = path.join(__dirname, '../data');
const FILES = [
    'awards.json',
    'experience.json',
    'profile_info.json',
    'projects.json',
    'skills.json',
    'updates.json'
];

// Cloudflare R2 Configuration
// All configuration should be provided via environment variables for security.
const endpoint = (process.env.R2_ENDPOINT || '').trim();
const bucketName = (process.env.R2_BUCKET_NAME || 'portfolio-data').trim();

console.log(`📍 Endpoint: ${endpoint}`);
console.log(`📦 Bucket: ${bucketName}`);
console.log(`🔑 Access Key ID length: ${process.env.R2_ACCESS_KEY_ID?.length || 0}`);
console.log(`🔑 Access Key ID prefix: ${process.env.R2_ACCESS_KEY_ID?.substring(0, 4)}...`);

const s3Client = new S3Client({
    region: 'auto',
    endpoint: endpoint,
    forcePathStyle: false, // Toggling to false (Virtual-hosted style) for R2
    credentials: {
        accessKeyId: (process.env.R2_ACCESS_KEY_ID || '').trim(),
        secretAccessKey: (process.env.R2_SECRET_ACCESS_KEY || '').trim(),
    },
});

async function downloadFile(filename) {
    const dest = path.join(DATA_DIR, filename);

    try {
        console.log(`📡 Fetching ${filename}...`);
        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: filename,
        });

        const response = await s3Client.send(command);
        const stream = response.Body;

        return new Promise((resolve, reject) => {
            const fileStream = fs.createWriteStream(dest);
            stream.pipe(fileStream);

            fileStream.on('finish', () => {
                fileStream.close();
                console.log(`✅ Downloaded ${filename}`);
                resolve();
            });

            fileStream.on('error', (err) => {
                fs.unlink(dest, () => { });
                reject(err);
            });
        });
    } catch (err) {
        console.error(`❌ Error details for ${filename}:`, err);
        throw new Error(`Failed to fetch ${filename}: ${err.message}`);
    }
}

async function main() {
    console.log(`🚀 Fetching data from Cloudflare R2 (Authenticated)...`);

    if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
        console.error('❌ R2 Credentials missing in environment variables!');
        process.exit(1);
    }

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
