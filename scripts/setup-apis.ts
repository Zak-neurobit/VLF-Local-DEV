#!/usr/bin/env node
import { execSync } from 'child_process';
import { existsSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import inquirer from 'inquirer';

// Use console colors instead of chalk for simplicity
const colors = {
  bold: (text: string) => `\x1b[1m${text}\x1b[0m`,
  blue: (text: string) => `\x1b[34m${text}\x1b[0m`,
  green: (text: string) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text: string) => `\x1b[33m${text}\x1b[0m`,
  red: (text: string) => `\x1b[31m${text}\x1b[0m`,
  gray: (text: string) => `\x1b[90m${text}\x1b[0m`,
};

const ENV_FILE = join(process.cwd(), '.env.local');
const ENV_EXAMPLE = join(process.cwd(), '.env.example');

interface APIConfig {
  name: string;
  required: boolean;
  envVars: {
    key: string;
    description: string;
    example?: string;
    sensitive?: boolean;
  }[];
  setupUrl?: string;
  docs?: string;
}

const API_CONFIGS: APIConfig[] = [
  {
    name: 'Database (PostgreSQL)',
    required: true,
    envVars: [
      {
        key: 'DATABASE_URL',
        description: 'PostgreSQL connection string',
        example: 'postgresql://postgres:password@localhost:5432/vasquez_law',
        sensitive: true
      }
    ],
    docs: 'https://www.postgresql.org/docs/'
  },
  {
    name: 'Authentication',
    required: true,
    envVars: [
      {
        key: 'NEXTAUTH_URL',
        description: 'Your website URL',
        example: 'https://www.vasquezlawfirm.com'
      },
      {
        key: 'NEXTAUTH_SECRET',
        description: 'Random secret (will be generated)',
        sensitive: true
      }
    ]
  },
  {
    name: 'OpenAI',
    required: true,
    envVars: [
      {
        key: 'OPENAI_API_KEY',
        description: 'OpenAI API key for chatbot',
        example: 'sk-...',
        sensitive: true
      }
    ],
    setupUrl: 'https://platform.openai.com/api-keys',
    docs: 'https://platform.openai.com/docs'
  },
  {
    name: 'GoHighLevel',
    required: true,
    envVars: [
      {
        key: 'GHL_API_KEY',
        description: 'GoHighLevel API key',
        sensitive: true
      },
      {
        key: 'GHL_LOCATION_ID',
        description: 'Your GHL location ID'
      },
      {
        key: 'GHL_CALENDAR_ID',
        description: 'Calendar ID for appointments'
      },
      {
        key: 'GHL_MAIN_PIPELINE_ID',
        description: 'Main sales pipeline ID'
      },
      {
        key: 'GHL_NEW_LEADS_STAGE_ID',
        description: 'New leads stage ID'
      },
      {
        key: 'GHL_DEFAULT_USER_ID',
        description: 'Default assignee user ID'
      }
    ],
    setupUrl: 'https://app.gohighlevel.com/settings/api-key',
    docs: 'https://help.gohighlevel.com/'
  },
  {
    name: 'Redis',
    required: false,
    envVars: [
      {
        key: 'REDIS_URL',
        description: 'Redis connection URL',
        example: 'redis://localhost:6379'
      },
      {
        key: 'MOCK_REDIS',
        description: 'Use mock Redis for development',
        example: 'false'
      }
    ]
  },
  {
    name: 'Email (SMTP)',
    required: false,
    envVars: [
      {
        key: 'EMAIL_FROM',
        description: 'From email address',
        example: 'info@vasquezlawnc.com'
      },
      {
        key: 'SMTP_HOST',
        description: 'SMTP server host',
        example: 'smtp.office365.com'
      },
      {
        key: 'SMTP_PORT',
        description: 'SMTP port',
        example: '587'
      },
      {
        key: 'SMTP_USER',
        description: 'SMTP username'
      },
      {
        key: 'SMTP_PASSWORD',
        description: 'SMTP password',
        sensitive: true
      }
    ]
  },
  {
    name: 'Google Maps',
    required: false,
    envVars: [
      {
        key: 'GOOGLE_MAPS_API_KEY',
        description: 'Google Maps API key',
        sensitive: true
      },
      {
        key: 'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY',
        description: 'Public Google Maps API key (same as above)',
        sensitive: true
      }
    ],
    setupUrl: 'https://console.cloud.google.com/apis/credentials',
    docs: 'https://developers.google.com/maps/documentation'
  }
];

async function main() {
  console.log(colors.bold(colors.blue('\n🚀 Vasquez Law Firm - API Setup Wizard\n')));
  
  // Check if .env.local exists
  if (!existsSync(ENV_FILE)) {
    console.log(colors.yellow('Creating .env.local from .env.example...'));
    const exampleContent = readFileSync(ENV_EXAMPLE, 'utf-8');
    writeFileSync(ENV_FILE, exampleContent);
    console.log(colors.green('✓ Created .env.local\n'));
  }
  
  // Read current env file
  let envContent = readFileSync(ENV_FILE, 'utf-8');
  const envLines = envContent.split('\n');
  const envMap = new Map<string, string>();
  
  // Parse existing values
  envLines.forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      envMap.set(match[1].trim(), match[2].trim());
    }
  });
  
  // Setup each API
  for (const api of API_CONFIGS) {
    console.log(colors.bold(`\n📋 ${api.name} ${api.required ? colors.red('(Required)') : colors.gray('(Optional)')}`));
    
    if (api.setupUrl) {
      console.log(colors.gray(`   Setup: ${api.setupUrl}`));
    }
    if (api.docs) {
      console.log(colors.gray(`   Docs: ${api.docs}`));
    }
    
    const { configure } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'configure',
        message: `Configure ${api.name}?`,
        default: api.required
      }
    ]);
    
    if (!configure) continue;
    
    for (const envVar of api.envVars) {
      const currentValue = envMap.get(envVar.key);
      const hasValue = currentValue && 
                      currentValue !== `your-${envVar.key.toLowerCase().replace(/_/g, '-')}` &&
                      !currentValue.includes('your-');
      
      if (hasValue) {
        console.log(colors.green(`   ✓ ${envVar.key} already configured`));
        continue;
      }
      
      // Special handling for NEXTAUTH_SECRET
      if (envVar.key === 'NEXTAUTH_SECRET') {
        const secret = execSync('openssl rand -base64 32').toString().trim();
        envMap.set(envVar.key, secret);
        console.log(colors.green(`   ✓ Generated ${envVar.key}`));
        continue;
      }
      
      const { value } = await inquirer.prompt([
        {
          type: envVar.sensitive ? 'password' : 'input',
          name: 'value',
          message: `   ${envVar.key}: ${envVar.description}`,
          default: envVar.example,
          validate: (input) => {
            if (api.required && !input) {
              return 'This field is required';
            }
            return true;
          }
        }
      ]);
      
      if (value) {
        envMap.set(envVar.key, value);
      }
    }
  }
  
  // Write updated env file
  console.log(colors.yellow('\n📝 Updating .env.local...'));
  
  const updatedLines = envLines.map(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      if (envMap.has(key)) {
        return `${key}=${envMap.get(key)}`;
      }
    }
    return line;
  });
  
  writeFileSync(ENV_FILE, updatedLines.join('\n'));
  console.log(colors.green('✓ Updated .env.local'));
  
  // Test configuration
  console.log(colors.bold(colors.blue('\n🧪 Testing configuration...\n')));
  
  try {
    execSync('npm run test:apis', { stdio: 'inherit' });
  } catch (error) {
    console.log(colors.yellow('\n⚠️  Some APIs may not be fully configured.'));
    console.log('Run "npm run test:apis" to test again.\n');
  }
  
  console.log(colors.bold(colors.green('\n✅ Setup complete!\n')));
  console.log('Next steps:');
  console.log('1. Review your .env.local file');
  console.log('2. Set up any missing campaign IDs in GoHighLevel');
  console.log('3. Run "npm run dev" to start the development server\n');
}

main().catch(error => {
  console.error(colors.red('Setup error:'), error);
  process.exit(1);
});