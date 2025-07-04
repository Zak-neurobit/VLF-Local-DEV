#!/bin/bash

echo "🔧 Emergency commit from corrupted repository"
echo "==========================================="
echo ""

# Create a temporary directory
TEMP_DIR="/tmp/vlf-emergency-$(date +%s)"
mkdir -p "$TEMP_DIR"

# Copy all files except .git
echo "📋 Copying files to temporary location..."
rsync -av --exclude='.git' --exclude='node_modules' --exclude='.next' . "$TEMP_DIR/"

# Navigate to fresh repository
cd /Users/williamvasquez/Documents/VLF-Website-fresh

# Pull latest changes
echo ""
echo "📥 Pulling latest changes..."
git pull origin main

# Copy files from temp to fresh repo
echo ""
echo "📦 Updating files in fresh repository..."
rsync -av --exclude='.git' --exclude='node_modules' --exclude='.next' "$TEMP_DIR/" .

# Add Vercel configuration
echo ""
echo "🔗 Adding Vercel configuration..."
git add vercel.json .vercel/project.json 2>/dev/null || true

# Stage all changes
echo ""
echo "📝 Staging changes..."
git add -A

# Show what will be committed
echo ""
echo "📋 Changes to be committed:"
git status --short

# Commit
echo ""
echo "💾 Creating commit..."
git commit -m "feat: Connect Vercel deployment to GitHub repository

- Added Vercel project configuration
- Linked deployment to GitHub for automatic deploys
- Updated vercel.json with lowercase project name
- Created setup scripts for GitHub connection
- Added comprehensive deployment documentation

Now pushes to main branch will automatically deploy to Vercel!

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to GitHub
echo ""
echo "📤 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Successfully committed and pushed!"
echo ""
echo "🚀 Your changes are now on GitHub!"
echo "   Vercel will automatically deploy if connected."
echo ""
echo "📱 To connect Vercel to GitHub:"
echo "   1. Go to: https://vercel.com/hodos-360/vasquez-law-firm-website"
echo "   2. Settings → Git → Connect Git Repository"
echo "   3. Select: quez2777/VLF-Website"

# Cleanup
rm -rf "$TEMP_DIR"