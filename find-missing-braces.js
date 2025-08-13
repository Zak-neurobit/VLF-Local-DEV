const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Patterns to find missing closing braces
const patterns = [
  // Missing } after variable in JSX attributes
  /placeholder=\{[^}]+\s+className=/g,
  /value=\{[^}]+\s+onChange=/g,
  /onClick=\{[^}]+\s+className=/g,
  /onChange=\{[^}]+\s+className=/g,
  /onSubmit=\{[^}]+\s+className=/g,
  /href=\{[^}]+\s+className=/g,
  /src=\{[^}]+\s+alt=/g,
  /alt=\{[^}]+\s+className=/g,
  /title=\{[^}]+\s+className=/g,
  /aria-label=\{[^}]+\s+className=/g,
  
  // Missing } in any attribute before another attribute
  /\w+=\{[^}]+\s+\w+=/g,
  
  // Missing ) for function calls in attributes
  /className=\{cn\([^)]+\s+style=/g,
  /className=\{cn\([^)]+\s+onClick=/g,
  /className=\{cn\([^)]+\s+onChange=/g,
];

function findIssues(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const issues = [];
  
  lines.forEach((line, index) => {
    patterns.forEach(pattern => {
      if (pattern.test(line)) {
        // Check if it's not a false positive (might already have closing)
        const match = line.match(pattern);
        if (match) {
          match.forEach(m => {
            // Count opening and closing braces
            const openBraces = (m.match(/\{/g) || []).length;
            const closeBraces = (m.match(/\}/g) || []).length;
            const openParens = (m.match(/\(/g) || []).length;
            const closeParens = (m.match(/\)/g) || []).length;
            
            if (openBraces > closeBraces || openParens > closeParens) {
              issues.push({
                file: filePath,
                line: index + 1,
                content: line.trim(),
                pattern: pattern.source
              });
            }
          });
        }
      }
    });
  });
  
  return issues;
}

// Search for all TypeScript and JavaScript files
const files = glob.sync('src/**/*.{tsx,ts,jsx,js}', {
  ignore: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.next/**']
});

console.log(`Searching ${files.length} files for missing closing braces...`);

let allIssues = [];

files.forEach(file => {
  const issues = findIssues(file);
  if (issues.length > 0) {
    allIssues = allIssues.concat(issues);
  }
});

if (allIssues.length > 0) {
  console.log(`\nFound ${allIssues.length} potential issues:\n`);
  
  // Group by file
  const byFile = {};
  allIssues.forEach(issue => {
    if (!byFile[issue.file]) {
      byFile[issue.file] = [];
    }
    byFile[issue.file].push(issue);
  });
  
  Object.entries(byFile).forEach(([file, issues]) => {
    console.log(`\n${file}:`);
    issues.forEach(issue => {
      console.log(`  Line ${issue.line}: ${issue.content.substring(0, 80)}...`);
    });
  });
} else {
  console.log('\nNo missing closing braces found!');
}
