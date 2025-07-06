#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to escape entities in JSX
function escapeJSXEntities(content) {
  // Track if we're inside JSX text (between > and <)
  let result = '';
  let i = 0;
  let inJSX = false;
  let inJSXAttribute = false;
  let inString = false;
  let stringChar = null;
  let lastChar = '';
  
  while (i < content.length) {
    const char = content[i];
    const nextChar = content[i + 1] || '';
    
    // Handle string literals (don't escape inside them)
    if ((char === '"' || char === "'") && lastChar !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
        stringChar = null;
      }
    }
    
    // Track JSX context
    if (!inString) {
      if (char === '<' && nextChar !== ' ' && nextChar !== '=' && !inJSXAttribute) {
        inJSX = false;
      } else if (char === '>' && lastChar !== '=' && !inJSXAttribute) {
        inJSX = true;
      }
      
      // Track JSX attributes
      if (char === '=' && nextChar === '{') {
        inJSXAttribute = true;
      } else if (char === '}' && inJSXAttribute) {
        inJSXAttribute = false;
      }
    }
    
    // Escape entities only in JSX text content
    if (inJSX && !inString && !inJSXAttribute) {
      if (char === "'" && nextChar !== 's' && nextChar !== 't' && nextChar !== 'd' && nextChar !== 'l' && nextChar !== 'm') {
        // Don't escape contractions like it's, don't, etc.
        if (i > 0 && content[i - 1].match(/[a-zA-Z]/) && nextChar.match(/[a-zA-Z]/)) {
          result += '&apos;';
        } else {
          result += '&apos;';
        }
      } else if (char === '"') {
        result += '&quot;';
      } else {
        result += char;
      }
    } else {
      result += char;
    }
    
    lastChar = char;
    i++;
  }
  
  return result;
}

// Simple but effective approach - look for patterns in TSX/JSX files
function fixUnescapedEntities(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let fixed = content;
  
  // Match JSX text content between tags
  // This regex finds text between > and < that contains quotes or apostrophes
  fixed = fixed.replace(/>([^<]*)</g, (match, p1) => {
    // Skip if it's inside a code block or looks like JavaScript
    if (p1.includes('{') || p1.includes('}')) {
      return match;
    }
    
    // Replace apostrophes and quotes
    let escaped = p1;
    escaped = escaped.replace(/'/g, '&apos;');
    escaped = escaped.replace(/"/g, '&quot;');
    
    return `>${escaped}<`;
  });
  
  // Special handling for specific patterns found in the codebase
  // Handle cases like: <p>Some text with ' quote</p>
  fixed = fixed.replace(/(<[^>]+>)([^<{]*)'([^<{]*<)/g, '$1$2&apos;$3');
  fixed = fixed.replace(/(<[^>]+>)([^<{]*)"([^<{]*<)/g, '$1$2&quot;$3');
  
  // Handle multiline JSX text
  const lines = fixed.split('\n');
  let inJSXText = false;
  let processedLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Check if we're starting JSX text
    if (line.match(/>\s*[^<{]*['"]/)) {
      line = line.replace(/>(\s*)([^<{]*)/g, (match, spaces, text) => {
        let escaped = text;
        escaped = escaped.replace(/'/g, '&apos;');
        escaped = escaped.replace(/"/g, '&quot;');
        return `>${spaces}${escaped}`;
      });
    }
    
    // Handle lines that are continuation of JSX text
    if (inJSXText && !line.includes('<') && !line.includes('{')) {
      line = line.replace(/'/g, '&apos;');
      line = line.replace(/"/g, '&quot;');
    }
    
    // Track if we're in multiline JSX text
    if (line.includes('>') && !line.includes('<')) {
      inJSXText = true;
    } else if (line.includes('<')) {
      inJSXText = false;
    }
    
    processedLines.push(line);
  }
  
  fixed = processedLines.join('\n');
  
  // Only write if changes were made
  if (fixed !== content) {
    fs.writeFileSync(filePath, fixed, 'utf8');
    console.log(`Fixed: ${filePath}`);
    return true;
  }
  
  return false;
}

// Get all TSX and JSX files
const files = glob.sync('src/**/*.{tsx,jsx}', {
  cwd: process.cwd(),
  absolute: true
});

console.log(`Found ${files.length} files to check...`);

let fixedCount = 0;
files.forEach(file => {
  if (fixUnescapedEntities(file)) {
    fixedCount++;
  }
});

console.log(`\nFixed ${fixedCount} files with unescaped entities.`);