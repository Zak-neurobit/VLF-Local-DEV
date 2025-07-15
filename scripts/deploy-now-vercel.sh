#!/bin/bash

# Ultra-quick Vercel deployment script
# Uses npx to avoid needing global Vercel CLI installation

echo "🚀 Deploying to Vercel Production..."
echo ""

# Deploy directly to production, bypassing git
npx vercel --prod --force --yes

echo ""
echo "✅ Deployment triggered!"
echo "🌐 Site: https://www.vasquezlawnc.com"