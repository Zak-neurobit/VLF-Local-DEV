#!/bin/bash

echo "🚀 Force deploying to Vercel production..."
echo "========================================"
echo ""

# Navigate to fresh repository
cd /Users/williamvasquez/Documents/VLF-Website-fresh

# Show current directory
echo "📁 Working directory: $(pwd)"
echo ""

# Pull latest changes
echo "📥 Pulling latest changes from GitHub..."
git pull origin main
echo ""

# Run force deployment
echo "🔄 Starting force deployment to production..."
echo "This will bypass all caches and create a fresh build."
echo ""

npx vercel --prod --force --yes

echo ""
echo "✅ Deployment command executed!"
echo ""
echo "📋 Post-deployment checklist:"
echo "1. Check the production URL provided above"
echo "2. Clear browser cache (Cmd+Shift+R)"
echo "3. Verify all features are working:"
echo "   - AI chat widget"
echo "   - Voice agents"
echo "   - Contact forms"
echo "   - Payment integration"
echo ""
echo "🔍 If you still see old content:"
echo "   - Check you're on the correct URL"
echo "   - Try incognito/private browsing"
echo "   - Check Vercel dashboard for deployment status"