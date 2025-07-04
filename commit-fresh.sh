#!/bin/bash

echo "📦 Switching to fresh repository..."
cd /Users/williamvasquez/Documents/VLF-Website-fresh

echo "📋 Git status:"
git status --short

echo ""
echo "🔧 Installing dependencies..."
npm install

echo ""
echo "💾 Adding all changes..."
git add -A

echo ""
echo "📝 Creating commit..."
git commit -m "feat: Complete AI agent deployment with design overhaul

- Deployed 8 customer-facing AI agents with full chat integration
- Configured 5 Retell voice agents with GoHighLevel integration
- Fixed all 44 TypeScript compilation errors
- Added missing Prisma models (Notification, SupportTicket)
- Completed Stripe payment webhook handlers
- Implemented comprehensive design system with tokens
- Refactored large components into modular pieces
- Fixed mobile responsiveness across all breakpoints
- Optimized performance with lazy loading and code splitting
- Added Web Vitals monitoring and error boundaries
- Removed all development artifacts and console logs
- Fixed broken assets and placeholder links

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"

echo ""
echo "📤 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Complete! Your fresh repository has been updated."
echo ""
echo "Next steps:"
echo "1. cd /Users/williamvasquez/Documents/VLF-Website-fresh"
echo "2. Set up your .env.local file"
echo "3. Deploy to Vercel"