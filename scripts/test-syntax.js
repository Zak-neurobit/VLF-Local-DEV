// Test syntax fixing
const fs = require('fs').promises;

async function fixSyntax() {
  const path = require('path');
  const filePath = path.join(process.cwd(), 'vasquez-law-website/scripts/enhanced-seo-autoloop.js');

  let content = await fs.readFile(filePath, 'utf-8');

  // The entire agent code sections are wrapped in template literals
  // We need to escape the inner template literals properly

  // Fix the specific line
  content = content.replace(
    "blogPost: `/blog/${post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,",
    "blogPost: \\`/blog/\\${post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}\\`,"
  );

  // Check if we're inside a template literal for agent code
  console.log('Checking for template literal issues...');

  // Count backticks to see if they're balanced
  const backticks = content.match(/`/g) || [];
  console.log('Total backticks:', backticks.length);

  // Save the fixed file
  await fs.writeFile(filePath, content);
  console.log('File updated');
}

fixSyntax().catch(console.error);
