/**
 * Image Optimization Script
 * Converts PNG/JPG images to WebP format with quality optimization
 * Run with: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync } from 'fs';

const ASSETS_DIR = './public/assets';
const QUALITY = {
    webp: 80,  // Good balance of quality vs size
    resize: {
        hero: { width: 1920, height: 1080 }, // Max hero size
        work: { width: 1200, height: 800 },  // Work images
        brands: { width: 400, height: 200 }, // Brand logos
    }
};

async function optimizeImage(inputPath, outputPath, options = {}) {
    try {
        const info = await sharp(inputPath).metadata();

        let pipeline = sharp(inputPath);

        // Resize if needed (maintain aspect ratio)
        if (options.maxWidth && info.width > options.maxWidth) {
            pipeline = pipeline.resize(options.maxWidth, null, {
                withoutEnlargement: true,
                fit: 'inside'
            });
        }

        // Convert to WebP
        await pipeline
            .webp({ quality: options.quality || QUALITY.webp })
            .toFile(outputPath);

        const originalSize = (await stat(inputPath)).size;
        const newSize = (await stat(outputPath)).size;
        const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);

        console.log(`✅ ${basename(inputPath)} → ${basename(outputPath)}`);
        console.log(`   ${(originalSize / 1024 / 1024).toFixed(2)} MB → ${(newSize / 1024).toFixed(0)} KB (${reduction}% reduction)`);

        return { originalSize, newSize, reduction };
    } catch (error) {
        console.error(`❌ Failed to optimize ${inputPath}:`, error.message);
        return null;
    }
}

async function processDirectory(dir, options = {}) {
    const entries = await readdir(dir, { withFileTypes: true });
    let totalOriginal = 0;
    let totalNew = 0;

    for (const entry of entries) {
        const fullPath = join(dir, entry.name);

        if (entry.isDirectory()) {
            const subResult = await processDirectory(fullPath, options);
            totalOriginal += subResult.totalOriginal;
            totalNew += subResult.totalNew;
        } else {
            const ext = extname(entry.name).toLowerCase();
            if (['.png', '.jpg', '.jpeg'].includes(ext)) {
                const outputPath = fullPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

                // Determine max width based on folder
                let maxWidth = 1920;
                if (fullPath.includes('brands')) maxWidth = 400;
                else if (fullPath.includes('work')) maxWidth = 1200;
                else if (fullPath.includes('hero')) maxWidth = 1920;

                const result = await optimizeImage(fullPath, outputPath, {
                    maxWidth,
                    quality: QUALITY.webp
                });

                if (result) {
                    totalOriginal += result.originalSize;
                    totalNew += result.newSize;
                }
            }
        }
    }

    return { totalOriginal, totalNew };
}

async function main() {
    console.log('🖼️  Starting image optimization...\n');

    if (!existsSync(ASSETS_DIR)) {
        console.error('❌ Assets directory not found:', ASSETS_DIR);
        process.exit(1);
    }

    const result = await processDirectory(ASSETS_DIR);

    console.log('\n📊 Summary:');
    console.log(`   Original: ${(result.totalOriginal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Optimized: ${(result.totalNew / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Total reduction: ${((1 - result.totalNew / result.totalOriginal) * 100).toFixed(1)}%`);
    console.log('\n✨ Done! Update your code to use .webp versions.');
}

main().catch(console.error);
