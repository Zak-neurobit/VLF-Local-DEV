#!/bin/bash

# Direct Vercel Deployment Script
# This bypasses git and deploys the current state directly to Vercel

set -e

echo "🚀 Direct Vercel Deployment (No Git Required)"
echo "============================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠ Vercel CLI not found. Installing...${NC}"
    npm i -g vercel
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Are you in the project root?${NC}"
    exit 1
fi

# Check if .vercel/project.json exists (project is linked)
if [ ! -f ".vercel/project.json" ]; then
    echo -e "${YELLOW}⚠ Project not linked to Vercel. Running vercel link...${NC}"
    vercel link
fi

# Show current status
echo -e "${BLUE}📊 Current Project Status:${NC}"
echo "Project ID: $(cat .vercel/project.json | grep projectId | cut -d'"' -f4)"
echo "Org ID: $(cat .vercel/project.json | grep orgId | cut -d'"' -f4)"
echo ""

# Ask for deployment type
echo "Choose deployment type:"
echo "1) Production deployment (main site)"
echo "2) Preview deployment (testing)"
echo "3) Development deployment (dev environment)"
read -p "Enter choice [1-3]: " deploy_type

case $deploy_type in
    1)
        echo -e "${GREEN}🚀 Deploying to PRODUCTION...${NC}"
        vercel --prod --force
        ;;
    2)
        echo -e "${BLUE}🔍 Creating preview deployment...${NC}"
        vercel --force
        ;;
    3)
        echo -e "${YELLOW}🛠️ Creating development deployment...${NC}"
        vercel --force --target development
        ;;
    *)
        echo -e "${RED}❌ Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✅ Deployment triggered successfully!${NC}"
echo ""
echo "📋 Next steps:"
echo "  - Check deployment progress in Vercel dashboard"
echo "  - Wait for deployment to complete (usually 2-5 minutes)"
echo "  - Test the deployed site thoroughly"
echo ""

# Show deployment URLs
echo "🌐 Deployment URLs:"
echo "  - Dashboard: https://vercel.com/team_ovuLTyYuuvgs2INJ1DelBxI4/vasquez-law-website"
echo "  - Production: https://www.vasquezlawnc.com"
echo "  - Preview: Check Vercel dashboard for preview URL"