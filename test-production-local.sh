#!/bin/bash

echo "🧪 Testing Production Build Locally"
echo "==================================="
echo ""

# Check if production build exists
if [ ! -d ".next" ]; then
    echo "❌ Production build not found. Building now..."
    npm run build
    if [ $? -ne 0 ]; then
        echo "Build failed. Please fix errors and try again."
        exit 1
    fi
else
    echo "✓ Production build found"
fi

# Check environment
if [ ! -f ".env.production.local" ]; then
    echo "❌ .env.production.local not found"
    exit 1
fi

echo "✓ Environment file ready"

# Set up test database
echo ""
echo "→ Setting up test database..."
DATABASE_URL="file:./prod.db" npx prisma migrate deploy 2>/dev/null || {
    echo "Note: Using PostgreSQL. Make sure it's running locally."
}

echo ""
echo "🚀 Starting production server..."
echo "================================"
echo ""
echo "Server will start on: http://localhost:3000"
echo ""
echo "Test these endpoints:"
echo "  - Homepage: http://localhost:3000"
echo "  - Health: http://localhost:3000/api/health"
echo "  - Chat widget: Try the chat on homepage"
echo "  - HODOS integration: http://localhost:3000/api/hodos/health"
echo ""
echo "Press Ctrl+C to stop"
echo ""

# Start the production server
NODE_ENV=production node server.js