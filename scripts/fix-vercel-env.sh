#!/bin/bash

# Script to fix Vercel environment variables
echo "🔧 Fixing Vercel Environment Variables..."

# Set the correct production URL
vercel env add NEXT_PUBLIC_APP_URL production <<< "https://www.vasquezlawnc.com"

# Remove the problematic localhost URL if it exists
vercel env rm NEXT_PUBLIC_APP_URL production 2>/dev/null || true

# Add the correct URL
echo "✅ Setting NEXT_PUBLIC_APP_URL to https://www.vasquezlawnc.com"
vercel env add NEXT_PUBLIC_APP_URL production <<< "https://www.vasquezlawnc.com"

# Also set it for preview environments
vercel env add NEXT_PUBLIC_APP_URL preview <<< "https://vasquez-law-website.vercel.app"

echo "✅ Environment variables updated!"
echo ""
echo "📝 Note: You may need to redeploy for changes to take effect."