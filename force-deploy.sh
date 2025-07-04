#!/bin/bash

echo "🚀 Force deploying to Vercel with latest changes..."
echo ""

cd /Users/williamvasquez/Documents/VLF-Website-fresh

# Ensure we're on the latest commit
git pull origin main

# Login to Vercel if needed
echo "📝 Checking Vercel login..."
npx vercel whoami || npx vercel login

# Force deploy without cache
echo ""
echo "🔄 Deploying to production (no cache)..."
npx vercel --prod --force --yes

echo ""
echo "✅ Deployment initiated!"
echo ""
echo "📋 Next steps:"
echo "1. Check the URL provided above"
echo "2. Clear your browser cache (Cmd+Shift+R)"
echo "3. Verify you're on the production deployment"