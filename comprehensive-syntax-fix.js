const fs = require('fs');
const glob = require('glob');

function findSyntaxErrors(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const errors = [];
  
  lines.forEach((line, index) => {
    // Pattern 1: Template literal missing closing brace before attribute
    if (/\}`\s+(type|className|style|onClick|onChange|href|aria-label|id|placeholder|value)=/.test(line)) {
      errors.push({
        file: filePath,
        line: index + 1,
        pattern: 'Template literal missing closing brace',
        content: line.trim()
      });
    }
    
    // Pattern 2: Missing } in JSX attributes
    if (/\w+=\{[^}]+\s+(type|className|style|onClick|onChange|href|aria-label|id)=/.test(line)) {
      // Count braces to confirm it's actually missing
      const match = line.match(/\w+=\{[^}]+\s+\w+=/);
      if (match) {
        const openBraces = (match[0].match(/\{/g) || []).length;
        const closeBraces = (match[0].match(/\}/g) || []).length;
        if (openBraces > closeBraces) {
          errors.push({
            file: filePath,
            line: index + 1,
            pattern: 'Missing closing brace in JSX attribute',
            content: line.trim()
          });
        }
      }
    }
    
    // Pattern 3: Stray closing braces
    const trimmed = line.trim();
    if (trimmed === '}' && index + 1 < lines.length) {
      const nextLine = lines[index + 1];
      if (/^\s*(className|style|onClick|onChange|href|type|id)=/.test(nextLine)) {
        errors.push({
          file: filePath,
          line: index + 1,
          pattern: 'Stray closing brace',
          content: line.trim()
        });
      }
    }
    
    // Pattern 4: Missing closing parenthesis for cn() function
    if (/className=\{cn\([^)]+\s+(style|onClick|onChange|href)=/.test(line)) {
      errors.push({
        file: filePath,
        line: index + 1,
        pattern: 'Missing closing parenthesis for cn() function',
        content: line.trim()
      });
    }
  });
  
  return errors;
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let modified = false;
  
  // Fix template literal patterns
  content = content.replace(/\}`\s+(type|className|style|onClick|onChange|href|aria-label|id|placeholder|value)=/g, '}`}\n      $1=');
  
  // Fix missing closing braces in attributes
  const attributePatterns = [
    [/id=\{([^}]+)\s+(type|className|style)=/g, 'id={$1}\n      $2='],
    [/placeholder=\{([^}]+)\s+(className|value|onChange)=/g, 'placeholder={$1}\n      $2='],
    [/value=\{([^}]+)\s+(onChange|className|style)=/g, 'value={$1}\n      $2='],
    [/onClick=\{([^}]+)\s+(className|style|disabled)=/g, 'onClick={$1}\n      $2='],
    [/onChange=\{([^}]+)\s+(className|style|value)=/g, 'onChange={$1}\n      $2='],
    [/href=\{([^}]+)\s+(className|style|onClick)=/g, 'href={$1}\n      $2='],
    [/src=\{([^}]+)\s+(alt|className|style)=/g, 'src={$1}\n      $2='],
    [/alt=\{([^}]+)\s+(className|style)=/g, 'alt={$1}\n      $2='],
    [/title=\{([^}]+)\s+(className|style)=/g, 'title={$1}\n      $2='],
    [/className=\{cn\(([^)]+)\s+(style|onClick|onChange)=/g, 'className={cn($1)}\n      $2='],
  ];
  
  attributePatterns.forEach(([pattern, replacement]) => {
    const newContent = content.replace(pattern, replacement);
    if (newContent !== content) {
      content = newContent;
      modified = true;
    }
  });
  
  // Remove stray closing braces
  const lines = content.split('\n');
  const fixedLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    if (trimmed === '}' && i + 1 < lines.length) {
      const nextLine = lines[i + 1];
      if (/^\s*(className|style|onClick|onChange|href|type|id|aria-label|placeholder)=/.test(nextLine)) {
        console.log(`Removing stray } at line ${i + 1} in ${filePath}`);
        modified = true;
        continue; // Skip this line
      }
    }
    
    fixedLines.push(line);
  }
  
  if (modified) {
    content = fixedLines.join('\n');
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  
  return false;
}

// Get all TypeScript and JavaScript files
const files = glob.sync('src/**/*.{tsx,ts,jsx,js}', {
  ignore: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.next/**']
});

console.log(`Scanning ${files.length} files for syntax errors...`);

let totalErrors = 0;
const errorsByFile = {};

// First, find all errors
files.forEach(file => {
  const errors = findSyntaxErrors(file);
  if (errors.length > 0) {
    errorsByFile[file] = errors;
    totalErrors += errors.length;
  }
});

if (totalErrors > 0) {
  console.log(`\nFound ${totalErrors} potential syntax errors\n`);
  
  // Display errors
  Object.entries(errorsByFile).forEach(([file, errors]) => {
    console.log(`${file}:`);
    errors.forEach(error => {
      console.log(`  Line ${error.line}: ${error.pattern}`);
    });
  });
  
  console.log('\nAttempting to fix errors...\n');
  
  // Fix the files
  let fixedCount = 0;
  Object.keys(errorsByFile).forEach(file => {
    if (fixFile(file)) {
      fixedCount++;
      console.log(`Fixed: ${file}`);
    }
  });
  
  console.log(`\nFixed ${fixedCount} files`);
} else {
  console.log('\nNo syntax errors found!');
}
