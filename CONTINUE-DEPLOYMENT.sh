#!/bin/bash

# Continue deployment script after fixing missing base.ts

set -e

WORK_DIR="$HOME/VLF_DEPLOY_20250704_074825"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}Continuing VLF deployment...${NC}"

cd "$WORK_DIR"

echo -e "${BLUE}Running build...${NC}"
if npm run build; then
    echo -e "${GREEN}✓ Build successful!${NC}"
else
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi

echo -e "${BLUE}Committing API fixes...${NC}"
git add -A
git commit -m "fix: Add OPTIONS handlers to all API routes for CORS support

- Add OPTIONS handler to every API route
- Fix 405 Method Not Allowed errors on Vercel
- Ensure proper CORS preflight request handling
- Add crewai base.ts file

This fixes the API endpoint issues on production deployment.

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"

echo -e "${BLUE}Pushing to GitHub...${NC}"
if git push origin main; then
    echo -e "${GREEN}✓ Successfully pushed to GitHub!${NC}"
else
    echo -e "${RED}✗ Push failed${NC}"
    exit 1
fi

echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}   Deployment Complete!${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Check Vercel deployment: https://vercel.com/dashboard"
echo "2. Test API endpoints after deployment completes"
echo "3. Your 'Old site Brand guidelines and Vision' directory is preserved in:"
echo "   /Users/williamvasquez/Documents/VLF Website/"
echo ""
echo -e "${BLUE}Test the deployment with:${NC}"
echo "curl https://vasquez-law-website.vercel.app/api/health"