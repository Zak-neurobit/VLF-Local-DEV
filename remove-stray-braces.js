const fs = require('fs');
const glob = require('glob');

function removeStrayBraces(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Remove stray } on lines that have only whitespace and }
  const lines = content.split('\n');
  const fixedLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Check if this line is just a stray closing brace
    if (trimmed === '}' && i + 1 < lines.length) {
      const nextLine = lines[i + 1];
      // If next line starts with className, style, onClick, etc., skip this line
      if (/^\s*(className|style|onClick|onChange|href|aria-label|placeholder|type|disabled|id)=/.test(nextLine)) {
        console.log(`Removing stray } at line ${i + 1} in ${filePath}`);
        continue; // Skip this line
      }
    }
    
    fixedLines.push(line);
  }
  
  content = fixedLines.join('\n');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  
  return false;
}

// Target files with known issues
const problemFiles = [
  'src/design-system/components/ConsistentHeader.tsx',
  'src/design-system/components/ConsistentHeader.old.tsx'
];

console.log('Removing stray braces from problem files...');

problemFiles.forEach(file => {
  try {
    if (fs.existsSync(file)) {
      if (removeStrayBraces(file)) {
        console.log(`Fixed: ${file}`);
      }
    }
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message);
  }
});

console.log('Done!');