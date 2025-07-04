#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

async function fixChatWidgetProps() {
  console.log('Fixing ChatWidget props in all generated pages...\n');

  // Find all page.tsx files
  const files = glob.sync('src/app/**/page.tsx', {
    ignore: ['**/node_modules/**', '**/.next/**'],
  });

  let fixedCount = 0;

  for (const file of files) {
    try {
      let content = await fs.readFile(file, 'utf-8');
      let modified = false;

      // Fix ChatWidget props for attorney context
      if (content.includes('context="attorney"')) {
        content = content.replace(
          /<ChatWidget\s+context="attorney"\s+attorneyName="[^"]+"\s+practiceAreas=\{[^\}]+\}\s*\/>/g,
          '<ChatWidget \n        userId="attorney-page"\n        language="en"\n      />'
        );
        modified = true;
      }

      // Fix ChatWidget props for practice-area context
      if (content.includes('context="practice-area"')) {
        content = content.replace(
          /<ChatWidget\s+context="practice-area"[^>]+\/>/g,
          '<ChatWidget \n        userId="practice-area-page"\n        language="en"\n      />'
        );
        modified = true;
      }

      // Fix VirtualAssistant/VoiceAssistant props
      if (content.includes('enabled={true}')) {
        content = content.replace(
          /<VoiceAssistant\s+enabled=\{true\}\s+language="en"\s+context="[^"]+"\s*\/>/g,
          '<VoiceAssistant \n        language="en"\n      />'
        );
        content = content.replace(
          /<VirtualAssistant\s+enabled=\{true\}\s+language="en"\s+context="[^"]+"\s*\/>/g,
          '<VirtualAssistant \n        language="en"\n      />'
        );
        modified = true;
      }

      if (modified) {
        await fs.writeFile(file, content);
        console.log(`✅ Fixed: ${file}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Error fixing ${file}:`, error.message);
    }
  }

  console.log(`\n✨ Fixed ${fixedCount} files!`);
}

// Run the fix
fixChatWidgetProps().catch(console.error);
