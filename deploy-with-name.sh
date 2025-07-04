#!/bin/bash

echo "🚀 Deploying to Vercel with correct project name..."
echo "================================================="
echo ""

cd /Users/williamvasquez/Documents/VLF-Website-fresh

echo "📁 Working directory: $(pwd)"
echo ""

# Deploy with explicit project name
echo "🔄 Deploying with project name: vasquez-law-firm"
echo ""

# First, try to link to existing project or create new one
npx vercel link --yes --project vasquez-law-firm || true

# Then deploy to production with force flag
npx vercel --prod --force --yes --name vasquez-law-firm

echo ""
echo "✅ Deployment initiated!"
echo ""
echo "🌐 Your site should be available at one of these URLs:"
echo "   - https://vasquez-law-firm.vercel.app"
echo "   - https://vasquez-law-website.vercel.app"
echo "   - Check the URL provided above"
echo ""
echo "📱 Features to verify:"
echo "   ✓ Modern hero with 3D effects"
echo "   ✓ AI chat widget (bottom right)"
echo "   ✓ Burgundy/gold color scheme"
echo "   ✓ All attorney pages"
echo "   ✓ Voice agent integration"
echo "   ✓ Contact forms"
echo "   ✓ Spanish language support"