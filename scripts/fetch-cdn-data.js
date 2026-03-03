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

// Cloudflare R2 / Custom Domain S3 Configuration
const endpoint = "https://portfolio-data.aigamer.dev";
const bucketName = "portfolio-data";

const s3Client = new S3Client({
    region: 'auto',
    endpoint: endpoint,
    forcePathStyle: true,
    credentials: {
        accessKeyId: (process.env.R2_ACCESS_KEY_ID || '0b42275f58d5069c075c26006bc9360a').trim(),
        secretAccessKey: (process.env.R2_SECRET_ACCESS_KEY || 'a5eb7ece2c825aabe0a89b0a34982117fc46c0289a556d289298fe128c2716af').trim(),
    },
});

async function downloadFile(filename) {
    const dest = path.join(DATA_DIR, filename);

    try {
        console.log(`📡 Fetching ${filename} via S3 (Custom Domain)...`);
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
        console.error(`❌ Error details for ${filename}:`, err.message);
        throw err;
    }
}

async function main() {
    console.log(`🚀 Fetching data from ${endpoint}...`);

    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }

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
