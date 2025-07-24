#!/bin/bash

# Kill any existing processes
killall node 2>/dev/null
lsof -ti:3000 | xargs kill -9 2>/dev/null

# Clear cache
rm -rf .next
rm -rf node_modules/.cache

# Set minimal environment
export NODE_ENV=development
export SKIP_ENV_VALIDATION=true

# Start Next.js with minimal config
echo "Starting Next.js development server..."
echo "Open http://localhost:3000 in your browser"
echo ""

npx next dev --hostname 0.0.0.0