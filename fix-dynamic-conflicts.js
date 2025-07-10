const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all TypeScript files that might have the conflict
const pattern = '/Users/williamvasquez/Documents/VLF Website/src/app/**/*.{ts,tsx}';
const allFiles = glob.sync(pattern);

// Filter files that have both the dynamic import and export const dynamic
const filesToFix = allFiles.filter(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    return (
      content.includes("import dynamic from 'next/dynamic'") &&
      content.includes('export const dynamic = ')
    );
  } catch (error) {
    return false;
  }
});

console.log(`Found ${filesToFix.length} files with dynamic conflicts...\n`);

let successCount = 0;

filesToFix.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');

  console.log(
    `Processing: ${path.relative('/Users/williamvasquez/Documents/VLF Website', filePath)}`
  );

  // Replace the import statement
  content = content.replace(
    "import dynamic from 'next/dynamic';",
    "import dynamicImport from 'next/dynamic';"
  );

  // Replace all uses of dynamic() with dynamicImport()
  // Match the pattern: const SomeName = dynamic(...)
  content = content.replace(/const\s+(\w+)\s*=\s*dynamic\s*\(/g, 'const $1 = dynamicImport(');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('  ✓ Fixed dynamic conflict\n');
  successCount++;
});

console.log(`\n✅ Summary:`);
console.log(`  - Fixed: ${successCount} files`);
console.log(`  - Total: ${filesToFix.length} files`);
