#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

async function fixImports() {
  // Fix ChatWidget imports
  const tsFiles = glob.sync('src/**/*.{ts,tsx}', { cwd: process.cwd() });

  for (const file of tsFiles) {
    try {
      const content = await fs.readFile(file, 'utf8');
      let modified = content;

      // Fix ChatWidget imports - the component exports as named export
      // No change needed for: import { ChatWidget } from '@/components/ChatWidget'
      // But we need to fix dynamic imports in layout.tsx
      if (file.includes('layout.tsx')) {
        modified = modified.replace(
          /import\('@\/components\/ChatWidget'\)\.then\(mod => mod\.ChatWidget\)/g,
          "import('@/components/ChatWidget/index')"
        );
      }

      // Fix VirtualAssistantWrapper imports
      modified = modified.replace(
        /import\s+(?:\{[^}]*\s*)?VirtualAssistantWrapper(?:\s*[^}]*)?\}\s+from\s+['"]@\/components\/VirtualAssistant['"];?/g,
        "import { VirtualAssistantWrapper } from '@/components/VirtualAssistant/VirtualAssistantWrapper';"
      );

      // Fix crypto import in middleware
      if (file.includes('middleware/security.ts')) {
        modified = modified.replace(
          /import crypto from 'crypto';/g,
          "import { webcrypto } from 'node:crypto';\nconst crypto = webcrypto as any;"
        );
      }

      if (modified !== content) {
        await fs.writeFile(file, modified, 'utf8');
        console.log(`Fixed imports in: ${file}`);
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }
}

fixImports().catch(console.error);
