#!/bin/bash

echo "🚀 Deploying fresh repository to Vercel production..."
echo ""
echo "Switching to: /Users/williamvasquez/Documents/VLF-Website-fresh"
cd /Users/williamvasquez/Documents/VLF-Website-fresh

echo ""
echo "📦 Current directory:"
pwd

echo ""
echo "🔍 Checking if node_modules exists..."
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies first..."
    npm install
fi

echo ""
echo "🏗️ Building project..."
npm run build

echo ""
echo "🚀 Deploying to Vercel production..."
npx vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Check the deployment URL provided above"
echo "2. Set environment variables in Vercel dashboard"
echo "3. Run database migrations if needed"