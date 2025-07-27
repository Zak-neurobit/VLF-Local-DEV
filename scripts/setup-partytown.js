const { join } = require('path');
const { cpSync, mkdirSync, existsSync, readdirSync } = require('fs');

function setupPartytown() {
  console.log('🚀 Setting up Partytown...');

  const partytownDir = join(__dirname, '..', 'node_modules', '@builder.io', 'partytown', 'lib');
  const publicPartytownDir = join(__dirname, '..', 'public', '~partytown');

  try {
    // Check if partytown is installed
    if (!existsSync(partytownDir)) {
      console.log('⚠️  Partytown not found in node_modules. Creating empty directory.');
      if (!existsSync(publicPartytownDir)) {
        mkdirSync(publicPartytownDir, { recursive: true });
      }
      console.log('✅ Partytown files copied to public directory');
      return;
    }
    // Ensure the public directory exists
    if (!existsSync(publicPartytownDir)) {
      mkdirSync(publicPartytownDir, { recursive: true });
    }

    // Copy Partytown files
    cpSync(partytownDir, publicPartytownDir, {
      filter: src => {
        // Don't copy debug files in production
        if (process.env.NODE_ENV === 'production' && src.includes('debug')) {
          return false;
        }
        return true;
      },
      recursive: true,
      force: true,
    });

    console.log('✅ Partytown files copied successfully to:', publicPartytownDir);

    // List copied files
    const files = readdirSync(publicPartytownDir);
    console.log('📁 Copied files:', files);
  } catch (err) {
    console.error('❌ Failed to copy Partytown files:', err);
    process.exit(1);
  }
}

// Run setup
setupPartytown();
