#!/bin/bash

# =============================================================================
# Vercel Deployment Status Checker
# =============================================================================

echo "🔍 Checking Vercel Deployment Status"
echo "===================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check Vercel CLI
echo -e "${BLUE}1. Vercel CLI Status:${NC}"
if command -v vercel &> /dev/null; then
    echo -e "   ${GREEN}✅ Installed${NC}"
    echo -e "   Version: $(vercel --version)"
else
    echo -e "   ${RED}❌ Not installed${NC}"
    echo -e "   Run: npm install -g vercel"
fi

# Check Vercel Auth
echo ""
echo -e "${BLUE}2. Vercel Authentication:${NC}"
if vercel whoami &> /dev/null; then
    echo -e "   ${GREEN}✅ Logged in as: $(vercel whoami)${NC}"
else
    echo -e "   ${RED}❌ Not logged in${NC}"
    echo -e "   Run: vercel login"
fi

# Check Git Repository
echo ""
echo -e "${BLUE}3. Git Repository:${NC}"
if git remote get-url origin &> /dev/null; then
    echo -e "   ${GREEN}✅ Connected to: $(git remote get-url origin)${NC}"
    echo -e "   Current branch: $(git branch --show-current)"
else
    echo -e "   ${RED}❌ No git remote configured${NC}"
fi

# Check Vercel Project
echo ""
echo -e "${BLUE}4. Vercel Project:${NC}"
if [ -d ".vercel" ]; then
    echo -e "   ${GREEN}✅ .vercel directory exists${NC}"
    if [ -f ".vercel/project.json" ]; then
        echo -e "   Project ID: $(grep -o '"projectId":"[^"]*' .vercel/project.json | cut -d'"' -f4)"
        echo -e "   Org ID: $(grep -o '"orgId":"[^"]*' .vercel/project.json | cut -d'"' -f4)"
    fi
else
    echo -e "   ${YELLOW}⚠️  No .vercel directory found${NC}"
    echo -e "   Run: vercel to initialize"
fi

# Check vercel.json
echo ""
echo -e "${BLUE}5. Configuration Files:${NC}"
if [ -f "vercel.json" ]; then
    echo -e "   ${GREEN}✅ vercel.json exists${NC}"
else
    echo -e "   ${RED}❌ vercel.json not found${NC}"
fi

if [ -f ".vercelignore" ]; then
    echo -e "   ${GREEN}✅ .vercelignore exists${NC}"
else
    echo -e "   ${YELLOW}⚠️  .vercelignore not found${NC}"
fi

# Check Recent Deployments
echo ""
echo -e "${BLUE}6. Recent Deployments:${NC}"
if command -v vercel &> /dev/null && vercel whoami &> /dev/null; then
    echo -e "   Checking recent deployments..."
    vercel list --limit 3 2>/dev/null || echo -e "   ${YELLOW}No deployments found or not linked to project${NC}"
else
    echo -e "   ${YELLOW}Cannot check - Vercel CLI not configured${NC}"
fi

echo ""
echo "===================================="
echo ""

# Summary
echo -e "${BLUE}📊 Summary:${NC}"
echo ""

if [ -d ".vercel" ] && command -v vercel &> /dev/null && vercel whoami &> /dev/null; then
    echo -e "${GREEN}✅ Vercel is configured and ready${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Connect to GitHub in Vercel dashboard"
    echo "2. Configure environment variables"
    echo "3. Push to main branch to trigger deployment"
else
    echo -e "${YELLOW}⚠️  Vercel setup incomplete${NC}"
    echo ""
    echo "To complete setup:"
    echo "1. Run: ./link-vercel-to-github.sh"
    echo "2. Follow the prompts"
    echo "3. Connect GitHub in Vercel dashboard"
fi

echo ""
echo "📚 Documentation: https://vercel.com/docs"
echo "🔗 Dashboard: https://vercel.com/dashboard"
echo ""