const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

console.log('🖼️  Optimizing images for better performance...');

async function optimizeImages() {
  const imagePatterns = ['public/**/*.{jpg,jpeg,png}', 'src/**/*.{jpg,jpeg,png}'];

  for (const pattern of imagePatterns) {
    const files = glob.sync(pattern);

    for (const file of files) {
      try {
        const stats = await fs.stat(file);
        if (stats.size < 10000) continue; // Skip small files

        const image = sharp(file);
        const metadata = await image.metadata();

        // Skip if already optimized
        if (file.includes('.optimized.')) continue;

        // Create optimized versions
        const ext = path.extname(file);
        const name = path.basename(file, ext);
        const dir = path.dirname(file);

        // Original format optimization
        await image
          .resize(metadata.width > 2000 ? 2000 : metadata.width, null, {
            withoutEnlargement: true,
          })
          .jpeg({ quality: 85, progressive: true })
          .toFile(path.join(dir, `${name}.optimized${ext}`));

        // WebP version
        await image
          .resize(metadata.width > 2000 ? 2000 : metadata.width, null, {
            withoutEnlargement: true,
          })
          .webp({ quality: 85 })
          .toFile(path.join(dir, `${name}.webp`));

        // AVIF version for modern browsers
        await image
          .resize(metadata.width > 2000 ? 2000 : metadata.width, null, {
            withoutEnlargement: true,
          })
          .avif({ quality: 80 })
          .toFile(path.join(dir, `${name}.avif`));

        const newStats = await fs.stat(path.join(dir, `${name}.optimized${ext}`));
        const savings = (((stats.size - newStats.size) / stats.size) * 100).toFixed(2);

        console.log(`✅ ${file} - Saved ${savings}%`);
      } catch (error) {
        console.error(`❌ Error optimizing ${file}:`, error.message);
      }
    }
  }
}

optimizeImages()
  .then(() => {
    console.log('✨ Image optimization complete!');
  })
  .catch(console.error);
