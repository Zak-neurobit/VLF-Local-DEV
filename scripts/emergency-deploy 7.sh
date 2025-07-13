#!/bin/bash

echo "🚨 EMERGENCY VERCEL DEPLOYMENT"
echo "=============================="
echo ""
echo "This script adds minimal environment variables and deploys immediately."
echo ""

# Add critical environment variables
echo "📝 Adding NEXTAUTH_SECRET..."
echo "Yjxy6CNFFK4A54y7q93/MNQDd+ItBz0HvSnlBPHV0T4=" | npx vercel env add NEXTAUTH_SECRET production

echo "📝 Adding mock/disable flags..."
echo "true" | npx vercel env add MOCK_REDIS production
echo "true" | npx vercel env add DISABLE_RETELL production
echo "true" | npx vercel env add DISABLE_EMAIL_SERVICE production
echo "true" | npx vercel env add SKIP_ENV_VALIDATION production

echo ""
echo "🚀 Deploying to production..."
npx vercel --prod --force --yes

echo ""
echo "✅ Deployment triggered!"
echo "Monitor at: https://vercel.com/hodos-360/vlf-website"