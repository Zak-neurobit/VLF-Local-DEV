#!/bin/bash

# =============================================================================
# Vercel to GitHub Repository Connection Script
# =============================================================================
# This script will link your Vercel deployment to your GitHub repository
# and configure automatic deployments on push to main branch
# =============================================================================

set -e  # Exit on error

echo "🔗 Linking Vercel to GitHub Repository"
echo "====================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI is not installed!${NC}"
    echo ""
    echo "Installing Vercel CLI globally..."
    npm install -g vercel
    echo -e "${GREEN}✅ Vercel CLI installed${NC}"
fi

# Check if user is logged in to Vercel
echo ""
echo -e "${BLUE}📝 Checking Vercel authentication...${NC}"
vercel whoami || {
    echo -e "${YELLOW}⚠️  Not logged in to Vercel${NC}"
    echo "Please log in to Vercel:"
    vercel login
}

# Get project info
echo ""
echo -e "${BLUE}📁 Project Information:${NC}"
echo "Repository: https://github.com/quez2777/VLF-Website"
echo "Branch: main"
echo "Directory: $(pwd)"

# Initialize Vercel project if not already done
if [ ! -d ".vercel" ]; then
    echo ""
    echo -e "${YELLOW}⚠️  No .vercel directory found${NC}"
    echo "Initializing Vercel project..."
    
    # Create .vercel directory
    mkdir -p .vercel
    
    echo ""
    echo -e "${BLUE}🔧 Setting up Vercel project...${NC}"
    echo "Please follow these steps:"
    echo ""
    echo "1. Run: ${GREEN}vercel${NC}"
    echo "2. When asked 'Set up and deploy?' - Answer: ${GREEN}Y${NC}"
    echo "3. Which scope? - Select your account"
    echo "4. Link to existing project? - Answer: ${GREEN}N${NC} (if new) or ${GREEN}Y${NC} (if exists)"
    echo "5. Project name? - Enter: ${GREEN}vlf-website${NC} (or your existing project name)"
    echo "6. In which directory? - Press Enter (current directory)"
    echo "7. Want to override settings? - Answer: ${GREEN}N${NC}"
    echo ""
    echo "Press Enter when ready to continue..."
    read -r
    
    vercel
fi

# Link to GitHub repository
echo ""
echo -e "${BLUE}🔗 Linking to GitHub repository...${NC}"
echo ""
echo "To connect your Vercel project to GitHub:"
echo ""
echo "1. Go to: ${GREEN}https://vercel.com/dashboard${NC}"
echo "2. Find your project: ${GREEN}vlf-website${NC}"
echo "3. Go to Settings → Git"
echo "4. Click 'Connect Git Repository'"
echo "5. Select GitHub provider"
echo "6. Authorize Vercel to access your GitHub"
echo "7. Select repository: ${GREEN}quez2777/VLF-Website${NC}"
echo "8. Configure branch: ${GREEN}main${NC}"
echo ""
echo "Or use the direct link:"
echo "${GREEN}https://vercel.com/import/git?s=https://github.com/quez2777/VLF-Website${NC}"
echo ""

# Create deployment configuration
echo -e "${BLUE}📝 Creating deployment configuration...${NC}"

# Update vercel.json with git configuration
cat > vercel.json << 'EOF'
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["iad1"],
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "env": {
    "NODE_ENV": "production",
    "SKIP_ENV_VALIDATION": "false"
  },
  "build": {
    "env": {
      "NODE_OPTIONS": "--max-old-space-size=4096",
      "FORCE_REBUILD": "true",
      "SKIP_PRISMA_GENERATE": "false"
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "X-Requested-With, Content-Type, Authorization"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/sitemap.xml",
      "destination": "/api/sitemap"
    },
    {
      "source": "/robots.txt",
      "destination": "/api/robots"
    }
  ],
  "redirects": [
    {
      "source": "/es/blog/:slug",
      "destination": "/blog/:slug",
      "permanent": false
    }
  ],
  "git": {
    "deploymentEnabled": {
      "main": true
    }
  }
}
EOF

echo -e "${GREEN}✅ vercel.json updated${NC}"

# Create or update .vercelignore
echo ""
echo -e "${BLUE}📝 Creating .vercelignore...${NC}"
cat > .vercelignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/
.nyc_output
test-results/
playwright-report/
playwright/.cache/

# Next.js
.next/
out/

# Production
build/
dist/

# Misc
.DS_Store
*.pem
.vscode/
.idea/

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env
.env*.local
.env.development
.env.test
.env.production

# Vercel
.vercel

# TypeScript
*.tsbuildinfo

# Database
prisma/dev.db
prisma/dev.db-journal
*.db
*.sqlite

# Logs
logs/
*.log

# Temporary files
tmp/
temp/
*.tmp
*.temp

# Documentation
*.md
!README.md
docs/

# Scripts
scripts/test-*
scripts/*-test.*

# Backup files
*.bak
backup/
BACKUP_*/

# Import/Export data
content-import/
import-results/
export/

# Development files
*.todo
TODO
NOTES.md
EOF

echo -e "${GREEN}✅ .vercelignore created${NC}"

# Commit changes
echo ""
echo -e "${BLUE}💾 Committing configuration...${NC}"
git add vercel.json .vercelignore
git commit -m "chore: Configure Vercel deployment with GitHub integration" || echo "No changes to commit"

# Push to GitHub
echo ""
echo -e "${BLUE}📤 Pushing to GitHub...${NC}"
git push origin main

echo ""
echo -e "${GREEN}✨ Configuration complete!${NC}"
echo ""
echo "==================================="
echo "📋 Next Steps:"
echo "==================================="
echo ""
echo "1. ${YELLOW}Connect GitHub to Vercel:${NC}"
echo "   - Go to: https://vercel.com/dashboard"
echo "   - Find your project and go to Settings → Git"
echo "   - Connect to GitHub repository: quez2777/VLF-Website"
echo ""
echo "2. ${YELLOW}Configure Environment Variables:${NC}"
echo "   - Go to project Settings → Environment Variables"
echo "   - Add all required variables from .env.local"
echo ""
echo "3. ${YELLOW}Enable Automatic Deployments:${NC}"
echo "   - In Git settings, ensure 'main' branch is set for production"
echo "   - Enable automatic deployments on push"
echo ""
echo "4. ${YELLOW}Test the Connection:${NC}"
echo "   - Make a small change and push to main"
echo "   - Check Vercel dashboard for automatic deployment"
echo ""
echo "==================================="
echo ""
echo "📌 Useful Commands:"
echo "  - ${GREEN}vercel${NC} - Deploy manually"
echo "  - ${GREEN}vercel --prod${NC} - Deploy to production"
echo "  - ${GREEN}vercel env pull${NC} - Pull environment variables"
echo "  - ${GREEN}vercel logs${NC} - View deployment logs"
echo "  - ${GREEN}vercel domains${NC} - Manage domains"
echo ""
echo "🔗 Direct link to import:"
echo "${GREEN}https://vercel.com/import/git?s=https://github.com/quez2777/VLF-Website${NC}"
echo ""