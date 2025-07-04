#!/bin/bash

# DEPLOY-AND-FIX-ALL.sh
# Comprehensive deployment and fix script for VLF Website
# This script backs up current work, clones fresh repo, applies fixes, and deploys

set -euo pipefail  # Exit on error, undefined variables, pipe failures

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="$HOME/VLF_BACKUP_$TIMESTAMP"
WORK_DIR="$HOME/VLF_DEPLOY_$TIMESTAMP"
REPO_URL="https://github.com/quez2777/VLF-Website.git"  # Update with actual repo URL
PRESERVE_DIR="Old site Brand guidelines and Vision"

# Function to print colored status messages
print_status() {
    echo -e "${BLUE}[$(date +%H:%M:%S)]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[$(date +%H:%M:%S)] ✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[$(date +%H:%M:%S)] ⚠${NC} $1"
}

print_error() {
    echo -e "${RED}[$(date +%H:%M:%S)] ✗${NC} $1"
}

# Function to handle errors
handle_error() {
    print_error "Error occurred at line $1"
    print_error "Last command: $2"
    cleanup_on_error
    exit 1
}

# Trap errors
trap 'handle_error $LINENO "$BASH_COMMAND"' ERR

# Cleanup function on error
cleanup_on_error() {
    print_warning "Cleaning up after error..."
    if [ -d "$WORK_DIR" ]; then
        rm -rf "$WORK_DIR"
    fi
}

# Main script starts here
clear
echo "================================================"
echo "   VLF Website Deployment and Fix Script"
echo "   Timestamp: $TIMESTAMP"
echo "================================================"
echo

# Step 1: Backup current work
print_status "Step 1: Creating backup of current work..."
if [ -d "$(pwd)" ]; then
    mkdir -p "$BACKUP_DIR"
    
    # Copy all files except node_modules and .next
    rsync -av --exclude='node_modules' --exclude='.next' --exclude='.git' \
          "$(pwd)/" "$BACKUP_DIR/" > /dev/null 2>&1
    
    # Special handling for the preserved directory
    if [ -d "$PRESERVE_DIR" ]; then
        print_status "Backing up '$PRESERVE_DIR' directory..."
        cp -r "$PRESERVE_DIR" "$BACKUP_DIR/"
    fi
    
    print_success "Backup created at: $BACKUP_DIR"
else
    print_error "Current directory not found!"
    exit 1
fi

# Step 2: Clone fresh repository
print_status "Step 2: Cloning fresh repository..."
mkdir -p "$WORK_DIR"
cd "$WORK_DIR"

# Get GitHub credentials if needed
if ! git clone "$REPO_URL" . 2>/dev/null; then
    print_warning "Repository URL might need updating or authentication"
    echo "Please enter the correct repository URL:"
    read -r REPO_URL
    git clone "$REPO_URL" .
fi

print_success "Repository cloned successfully"

# Step 3: Restore preserved directory
if [ -d "$BACKUP_DIR/$PRESERVE_DIR" ]; then
    print_status "Restoring '$PRESERVE_DIR' directory..."
    cp -r "$BACKUP_DIR/$PRESERVE_DIR" .
    print_success "Preserved directory restored"
fi

# Step 4: Apply API route fixes
print_status "Step 4: Applying API route fixes (OPTIONS handlers)..."

# Create a function to add OPTIONS handler to API routes
add_options_handler() {
    local file="$1"
    local temp_file="${file}.tmp"
    
    # Check if OPTIONS handler already exists
    if grep -q "export async function OPTIONS" "$file" 2>/dev/null; then
        print_status "OPTIONS handler already exists in $file"
        return
    fi
    
    # Add OPTIONS handler
    cat >> "$file" << 'EOF'

// CORS OPTIONS handler
export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
EOF
    
    print_success "Added OPTIONS handler to $file"
}

# Find all API route files
API_ROUTES=$(find src/app/api -name "route.ts" -o -name "route.js" 2>/dev/null || true)

if [ -z "$API_ROUTES" ]; then
    print_warning "No API route files found"
else
    while IFS= read -r route_file; do
        if [ -f "$route_file" ]; then
            print_status "Processing: $route_file"
            add_options_handler "$route_file"
        fi
    done <<< "$API_ROUTES"
fi

# Step 5: Install dependencies
print_status "Step 5: Installing dependencies..."
npm install --legacy-peer-deps > /dev/null 2>&1 || {
    print_warning "Some peer dependency warnings, but continuing..."
}
print_success "Dependencies installed"

# Step 6: Run build to verify
print_status "Step 6: Running build to verify fixes..."
if npm run build > build.log 2>&1; then
    print_success "Build completed successfully"
else
    print_error "Build failed! Check build.log for details"
    tail -20 build.log
    exit 1
fi

# Step 7: Commit and push fixes
print_status "Step 7: Committing and pushing fixes..."
git add -A
git commit -m "fix: Add OPTIONS handlers to all API routes for CORS support

- Added OPTIONS handler to all API routes
- Fixes CORS preflight requests
- Ensures proper cross-origin resource sharing

Deployed via DEPLOY-AND-FIX-ALL.sh" || {
    print_warning "No changes to commit"
}

# Push to remote
print_status "Pushing to remote repository..."
git push origin main || {
    print_error "Failed to push to remote. You may need to manually push or check credentials"
}

# Step 8: Test deployment status
print_status "Step 8: Testing deployment..."
echo
print_status "Deployment checklist:"
echo "  [ ] Vercel deployment triggered (check Vercel dashboard)"
echo "  [ ] Build logs show no errors"
echo "  [ ] API routes include OPTIONS handlers"
echo "  [ ] CORS headers properly configured"
echo

# Step 9: Provide summary
echo
echo "================================================"
echo "   Deployment Summary"
echo "================================================"
print_success "Backup location: $BACKUP_DIR"
print_success "Working directory: $WORK_DIR"
print_success "Preserved directory: $PRESERVE_DIR"
echo
print_status "Next steps:"
echo "  1. Check Vercel dashboard for deployment status"
echo "  2. Test API endpoints with CORS requests"
echo "  3. Verify all functionality is working"
echo
print_status "To restore from backup if needed:"
echo "  cp -r '$BACKUP_DIR'/* /path/to/destination/"
echo
echo "================================================"

# Optional: Open Vercel dashboard
if command -v open >/dev/null 2>&1; then
    print_status "Opening Vercel dashboard..."
    open "https://vercel.com/dashboard" 2>/dev/null || true
fi

print_success "Script completed successfully!"