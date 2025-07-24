#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('📊 Analyzing page count in the project...\n');

// Count pages by directory
const countPages = (pattern, label) => {
  const files = glob.sync(pattern);
  console.log(`${label}: ${files.length} pages`);
  return files.length;
};

// Main analysis
let totalPages = 0;

// App directory pages
totalPages += countPages('src/app/**/page.tsx', '📄 Total page.tsx files');
console.log('');

// Breakdown by major sections
countPages('src/app/page.tsx', '🏠 Root page');
countPages('src/app/*/page.tsx', '📁 Top-level pages');
countPages('src/app/practice-areas/**/page.tsx', '⚖️  Practice area pages');
countPages('src/app/locations/**/page.tsx', '📍 English location pages');
countPages('src/app/es/**/page.tsx', '🇪🇸 Spanish pages total');
countPages('src/app/es/ubicaciones/**/page.tsx', '📍 Spanish location pages');
countPages('src/app/blog/**/page.tsx', '📝 Blog pages');
countPages('src/app/attorneys/**/page.tsx', '👥 Attorney pages');

console.log('\n🔍 Location breakdown:');
countPages('src/app/locations/nc/**/page.tsx', '  NC locations');
countPages('src/app/locations/fl/**/page.tsx', '  FL locations');

console.log('\n💡 Recommendations:');
console.log(`Total pages to generate: ${totalPages}`);

if (totalPages > 1000) {
  console.log(`
⚠️  WARNING: ${totalPages} pages is too many for static generation!

Recommended solutions:
1. Convert location pages to dynamic routes with ISR
2. Use generateStaticParams to limit pre-generated pages
3. Consider using a single [slug] route for all locations
4. Enable on-demand ISR for location pages

Example fix for location pages:
- Move from: /locations/nc/charlotte/page.tsx
- Move to: /locations/[state]/[city]/page.tsx
`);
}

// Check for patterns that could be consolidated
console.log('\n🔄 Consolidation opportunities:');
const ncServicePages = glob.sync('src/app/locations/nc/*-*/page.tsx');
if (ncServicePages.length > 0) {
  console.log(`Found ${ncServicePages.length} service-specific location pages that could be consolidated`);
  console.log('Example:', ncServicePages.slice(0, 3).join(', '));
}