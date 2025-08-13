const fs = require('fs');
const glob = require('glob');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Fix template literals missing closing brace before attributes
  // Look for patterns like: }` attribute= and change to }`} attribute=
  content = content.replace(/\}`\s+(aria-label|style|onClick|onChange|className|href|id|type|disabled|placeholder)=/g, '}`}\n                $1=');
  
  // Fix template literals in className with missing closing brace
  // Pattern: className={`...}`attribute= should be className={`...}`} attribute=
  content = content.replace(/className=\{`([^`]+)`\s+(aria-label|style|onClick|onChange|href|id|type|disabled)=/g, 'className={`$1`}\n                $2=');
  
  // Fix other attribute template literals
  content = content.replace(/(placeholder|value|title|alt|src)=\{`([^`]+)`\s+(className|style|onClick|onChange)=/g, '$1={`$2`}\n                $3=');
  
  // Fix stray closing braces in svg tags
  content = content.replace(/<svg\s*\}\s*className=/g, '<svg\n                          className=');
  
  // Fix news-ticker specific issue with cn() function
  content = content.replace(/\)\s+style=\{\{/g, ')}\n      style={{');
  
  // Fix MasterLayout stray brace
  content = content.replace(/<svg\s*\}\s*className=/g, '<svg\n                          className=');
  
  // Fix ConsistentFooter placeholder issue
  content = content.replace(/placeholder=\{t\.emailPlaceholder\s+className=/g, 'placeholder={t.emailPlaceholder}\n                className=');
  
  // Fix ConsistentHeader href issue  
  content = content.replace(/href=\{language === 'es' \? '\/es' : '\/' className=/g, "href={language === 'es' ? '/es' : '/'}\n              className=");
  
  // Fix any Link component href issues
  content = content.replace(/<Link\s+href=\{([^}]+)\s+className=/g, '<Link href={$1}\n              className=');
  
  // Fix Button component type issue
  content = content.replace(/type=\{type\s+onClick=/g, 'type={type}\n      onClick=');
  
  // Fix MiniMap style issue
  content = content.replace(/className=\{`relative \$\{className\}`\s+style=/g, 'className={`relative ${className}`}\n      style=');
  
  // Fix style={{ with missing closing
  content = content.replace(/style=\{\{\s*height,\s*width:\s*'100%'\s+className=/g, "style={{ height, width: '100%' }}\n        className=");
  
  // Fix TestimonialsSection onClick issues
  content = content.replace(/onClick=\{handlePrevious\s+className=/g, 'onClick={handlePrevious}\n              className=');
  content = content.replace(/onClick=\{handleNext\s+className=/g, 'onClick={handleNext}\n              className=');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  
  return false;
}

// Target specific problem files
const problemFiles = [
  'src/components/HomePage/PracticeAreasShowcase.tsx',
  'src/components/HomePage/TestimonialsSection.tsx',
  'src/components/MiniMap.tsx',
  'src/design-system/components/Button.tsx',
  'src/design-system/templates/MasterLayout.tsx',
  'src/components/ui/news-ticker.tsx',
  'src/design-system/components/ConsistentFooter.tsx',
  'src/design-system/components/ConsistentHeader.tsx'
];

console.log('Fixing template literal issues in problem files...');

problemFiles.forEach(file => {
  try {
    if (fs.existsSync(file)) {
      if (fixFile(file)) {
        console.log(`Fixed: ${file}`);
      }
    }
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message);
  }
});

console.log('Done!');
