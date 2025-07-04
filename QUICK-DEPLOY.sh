#!/bin/bash

# Quick deployment script - commit and push current changes

echo "Quick VLF Deployment"
echo "==================="

# Add all changes except old site files
git add -A
git reset -- "Old site Brand guidelines and Vision"

# Commit
git commit -m "fix: Add OPTIONS handlers and crewai base module

- Add OPTIONS handlers to all API routes for CORS
- Add missing crewai/base.ts module
- Fix 405 Method Not Allowed errors
- Preserve old site files as untracked

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to main
echo "Pushing to GitHub..."
if git push origin HEAD:main --force-with-lease; then
    echo "✅ Successfully pushed!"
    echo ""
    echo "Vercel will automatically deploy from GitHub."
    echo "Check: https://vercel.com/dashboard"
else
    echo "❌ Push failed. You may need to pull first or resolve conflicts."
fi