const fs = require('fs');
const path = require('path');

// Add dynamic export to page files to prevent static generation
function addDynamicExport(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if dynamic export already exists
    if (content.includes("export const dynamic = 'force-dynamic'")) {
      return false;
    }

    // Add dynamic export at the beginning of the file after imports
    const importEndMatch = content.match(/^((?:import[^;]+;\s*)*)/m);
    if (importEndMatch) {
      const imports = importEndMatch[1];
      const restOfFile = content.slice(imports.length);
      content =
        imports +
        "\n// Temporarily force dynamic rendering to reduce build memory usage\nexport const dynamic = 'force-dynamic';\nexport const revalidate = 3600; // 1 hour cache\n" +
        restOfFile;
    } else {
      content =
        "// Temporarily force dynamic rendering to reduce build memory usage\nexport const dynamic = 'force-dynamic';\nexport const revalidate = 3600; // 1 hour cache\n\n" +
        content;
    }

    fs.writeFileSync(filePath, content);
    return true;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Directories to process
const dirsToProcess = ['src/app/practice-areas', 'src/app/es/areas-de-practica', 'src/app/near-me'];

let processedCount = 0;

dirsToProcess.forEach(dir => {
  const fullPath = path.join(__dirname, '..', dir);

  if (!fs.existsSync(fullPath)) {
    console.log(`Directory not found: ${dir}`);
    return;
  }

  // Find all page.tsx files recursively
  function processDirectory(dirPath) {
    const items = fs.readdirSync(dirPath);

    items.forEach(item => {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        processDirectory(itemPath);
      } else if (item === 'page.tsx') {
        if (addDynamicExport(itemPath)) {
          console.log(`✓ Added dynamic export to ${itemPath}`);
          processedCount++;
        }
      }
    });
  }

  processDirectory(fullPath);
});

console.log(`\nProcessed ${processedCount} files.`);
console.log('These pages will now be rendered dynamically, reducing build memory usage.');
