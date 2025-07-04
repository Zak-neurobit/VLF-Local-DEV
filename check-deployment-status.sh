#!/bin/bash

echo "🔍 Checking Vercel deployment status..."
echo "Job ID: q3KGkXNFU9jyhoigVi4w"
echo "Started at: $(date)"
echo ""

# Check if the site is responding
echo "📡 Checking site availability..."
if curl -s -I https://vasquez-law-website.vercel.app | grep -q "200"; then
    echo "✅ Site is responding"
else
    echo "⏳ Site may be building..."
fi

echo ""
echo "🔗 Monitor your deployment at:"
echo "   https://vercel.com/dashboard/vasquez-law-website"
echo ""
echo "📊 What to look for:"
echo "   - New deployment should appear at the top"
echo "   - Status: Building → Ready"
echo "   - Source: Latest commit (6b1183a)"
echo ""
echo "🎯 Once deployed, verify:"
echo "   1. Hero section loads without errors"
echo "   2. 'YO PELEO POR TI' title displays"
echo "   3. No console errors"
echo ""
echo "⏱️  Typical build time: 2-3 minutes"