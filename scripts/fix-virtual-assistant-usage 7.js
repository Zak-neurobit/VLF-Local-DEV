const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('Fixing VirtualAssistant usage in pages...\n');

// Find all page.tsx files
const files = glob.sync('src/app/**/page.tsx', {
  cwd: process.cwd(),
  ignore: ['**/node_modules/**'],
});

let fixedCount = 0;

files.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if file uses VoiceAssistant with onMessage
  if (content.includes('VoiceAssistant') && content.includes('onMessage=')) {
    console.log(`Fixing: ${file}`);

    // Replace the import
    content = content.replace(
      "import { VirtualAssistant as VoiceAssistant } from '@/components/VirtualAssistant';",
      "import { VirtualAssistantWrapper as VoiceAssistant } from '@/components/VirtualAssistant/VirtualAssistantWrapper';"
    );

    // Remove the onMessage prop
    content = content.replace(
      /<VoiceAssistant\s+language="(en|es)"\s+onMessage=\{[^}]+\}\s*\/>/g,
      '<VoiceAssistant language="$1" />'
    );

    fs.writeFileSync(filePath, content);
    fixedCount++;
  }
});

console.log(`\n✅ Fixed ${fixedCount} files`);

// Also fix any blog index pages
const blogFiles = glob.sync('src/app/**/indexet_blog/page.tsx', {
  cwd: process.cwd(),
  ignore: ['**/node_modules/**'],
});

blogFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('VoiceAssistant') && content.includes('onMessage=')) {
    console.log(`Fixing blog page: ${file}`);

    content = content.replace(
      "import { VirtualAssistant as VoiceAssistant } from '@/components/VirtualAssistant';",
      "import { VirtualAssistantWrapper as VoiceAssistant } from '@/components/VirtualAssistant/VirtualAssistantWrapper';"
    );

    content = content.replace(
      /<VoiceAssistant\s+language="(en|es)"\s+onMessage=\{[^}]+\}\s*\/>/g,
      '<VoiceAssistant language="$1" />'
    );

    fs.writeFileSync(filePath, content);
    fixedCount++;
  }
});

console.log(`Total files fixed: ${fixedCount}`);
