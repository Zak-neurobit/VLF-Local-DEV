#!/bin/bash

echo "🚀 Starting Vasquez Law Firm Development Server"
echo "=============================================="

# Create a temporary node_modules symlink without the problematic directory
echo "Creating clean environment..."

# Move the problematic directory out of the way
if [ -d "node_modules/create-jest" ]; then
    mv node_modules/create-jest node_modules/create-jest.backup 2>/dev/null || true
fi

# Remove other problematic directories
rm -rf node_modules/.create-jest-* 2>/dev/null || true
rm -rf node_modules/.rollup-* 2>/dev/null || true
rm -rf node_modules/.iconv-lite-* 2>/dev/null || true

# Set environment variables to skip validations
export SKIP_ENV_VALIDATION=true
export NODE_ENV=development

# Try to start with npx
echo "Starting Next.js server on http://localhost:3000"
echo ""

# Use the specific version that was working before
npx next@14.2.30 dev -p 3000 --turbo