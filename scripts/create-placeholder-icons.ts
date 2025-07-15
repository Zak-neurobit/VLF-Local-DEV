import { promises as fs } from 'fs';
import path from 'path';

async function createPlaceholderIcons() {
  // Create a simple SVG icon
  const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#6B1F2E">
    <rect width="512" height="512" fill="#ffffff"/>
    <text x="256" y="256" text-anchor="middle" font-family="Arial, sans-serif" font-size="200" font-weight="bold" fill="#6B1F2E" dy=".3em">VLF</text>
  </svg>`;

  // Save SVG icon
  await fs.writeFile(path.join(process.cwd(), 'public/icons/icon.svg'), svgIcon);

  console.log('✅ Created placeholder SVG icon');

  // For now, we'll use the same SVG for different sizes
  // In production, you would generate proper PNG files
  const sizes = ['192x192', '512x512'];
  for (const size of sizes) {
    await fs.writeFile(path.join(process.cwd(), `public/icons/icon-${size}.svg`), svgIcon);
  }

  // Create placeholder favicon
  await fs.writeFile(path.join(process.cwd(), 'public/favicon.ico'), '');

  // Create apple touch icon
  await fs.writeFile(path.join(process.cwd(), 'public/apple-touch-icon.png'), '');

  console.log('✅ Created all placeholder icons');
}

createPlaceholderIcons().catch(console.error);
