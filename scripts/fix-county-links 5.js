const fs = require('fs');
const path = require('path');

// Map of incorrect URLs to correct URLs
const urlMappings = {
  '/practice-areas/immigration-lawyer': '/practice-areas/immigration',
  '/practice-areas/personal-injury-attorney': '/practice-areas/personal-injury',
  '/practice-areas/workers-compensation-lawyer': '/practice-areas/workers-compensation',
  '/practice-areas/criminal-defense-attorney': '/practice-areas/criminal-defense',
  '/practice-areas/car-accident-lawyer': '/practice-areas/personal-injury/car-accidents'
};

// Directory containing county pages
const countiesDir = path.join(__dirname, '../src/app/locations/nc/counties');

// Function to fix URLs in a file
function fixUrlsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Replace each incorrect URL with the correct one
    for (const [oldUrl, newUrl] of Object.entries(urlMappings)) {
      if (content.includes(oldUrl)) {
        content = content.replace(new RegExp(oldUrl, 'g'), newUrl);
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed URLs in: ${path.relative(process.cwd(), filePath)}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Process all county directories
function processCounties() {
  console.log('🔧 Starting to fix county page URLs...\n');
  
  let totalFiles = 0;
  let fixedFiles = 0;

  const countyDirs = fs.readdirSync(countiesDir).filter(file => {
    return fs.statSync(path.join(countiesDir, file)).isDirectory();
  });

  for (const county of countyDirs) {
    const pagePath = path.join(countiesDir, county, 'page.tsx');
    if (fs.existsSync(pagePath)) {
      totalFiles++;
      if (fixUrlsInFile(pagePath)) {
        fixedFiles++;
      }
    }
  }

  console.log(`\n✨ Completed! Fixed ${fixedFiles} out of ${totalFiles} county pages.`);
}

// Run the script
processCounties();