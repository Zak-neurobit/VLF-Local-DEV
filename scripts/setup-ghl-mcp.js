#!/usr/bin/env node

/**
 * Setup script for GoHighLevel MCP (Model Context Protocol) Server
 * This enables Claude to directly interact with your GHL account
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// Colors for console output
const colors = {
  green: text => `\x1b[32m${text}\x1b[0m`,
  yellow: text => `\x1b[33m${text}\x1b[0m`,
  blue: text => `\x1b[34m${text}\x1b[0m`,
  red: text => `\x1b[31m${text}\x1b[0m`,
  cyan: text => `\x1b[36m${text}\x1b[0m`,
};

console.log(colors.blue('\n🚀 GoHighLevel MCP Server Setup\n'));
console.log('This will configure Claude Desktop to connect directly to your GHL account.\n');

// Check for required environment variables
const envPath = path.join(process.cwd(), '.env.local');
let ghlApiKey = '';
let ghlLocationId = '';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const apiKeyMatch = envContent.match(/GHL_API_KEY=(.+)/);
  const locationIdMatch = envContent.match(/GHL_LOCATION_ID=(.+)/);

  if (apiKeyMatch) ghlApiKey = apiKeyMatch[1].trim();
  if (locationIdMatch) ghlLocationId = locationIdMatch[1].trim();
}

if (!ghlApiKey || !ghlLocationId) {
  console.log(colors.yellow('⚠️  GHL credentials not found in .env.local'));
  console.log('\nPlease ensure you have these variables set:');
  console.log('- GHL_API_KEY');
  console.log('- GHL_LOCATION_ID\n');
  console.log('You can get these from:');
  console.log('1. Log in to GoHighLevel');
  console.log('2. Go to Settings > API Keys');
  console.log('3. Copy your API Key');
  console.log('4. Go to Settings > Company to find Location ID\n');
  process.exit(1);
}

// Create MCP configuration
const mcpConfig = {
  mcpServers: {
    gohighlevel: {
      command: 'npx',
      args: ['-y', '@gohighlevel/mcp-server', ghlApiKey, ghlLocationId],
      env: {
        NODE_ENV: 'production',
      },
    },
  },
};

// Add to existing config if present
const configDir = path.join(os.homedir(), '.config', 'claude');
const configPath = path.join(configDir, 'claude_desktop_config.json');

// Ensure directory exists
if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true });
}

// Load existing config or create new
let existingConfig = {};
if (fs.existsSync(configPath)) {
  try {
    existingConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    console.log(colors.cyan('📄 Found existing Claude configuration'));
  } catch (error) {
    console.log(colors.yellow('⚠️  Existing config is invalid, creating new one'));
  }
}

// Merge configurations
const finalConfig = {
  ...existingConfig,
  mcpServers: {
    ...existingConfig.mcpServers,
    ...mcpConfig.mcpServers,
  },
};

// Write configuration
fs.writeFileSync(configPath, JSON.stringify(finalConfig, null, 2));
console.log(colors.green(`✅ Configuration written to: ${configPath}\n`));

// Display configuration summary
console.log(colors.blue('📋 Configuration Summary:\n'));
console.log(
  `API Key: ${ghlApiKey.substring(0, 10)}...${ghlApiKey.substring(ghlApiKey.length - 4)}`
);
console.log(`Location ID: ${ghlLocationId}\n`);

// Instructions
console.log(colors.blue('📚 Next Steps:\n'));
console.log('1. Restart Claude Desktop');
console.log('2. You should see "gohighlevel" in the MCP servers list');
console.log('3. Claude can now directly interact with your GHL account!\n');

console.log(colors.cyan('🎯 Available GHL Commands in Claude:\n'));
console.log('- Search and manage contacts');
console.log('- Create and update opportunities');
console.log('- Access calendars and appointments');
console.log('- Manage pipelines and workflows');
console.log('- Send messages and emails');
console.log('- Access custom fields and values\n');

console.log(colors.yellow('⚠️  Security Note:\n'));
console.log('Your GHL API key is stored locally in your Claude config.');
console.log('Never share your claude_desktop_config.json file!\n');

console.log(colors.green('✨ Setup complete! Restart Claude Desktop to activate.\n'));
