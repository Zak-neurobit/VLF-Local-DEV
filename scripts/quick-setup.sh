#!/bin/bash

# Quick setup script for VLF Website development
# This script helps set up the development environment quickly

echo "🚀 Vasquez Law Firm Website - Quick Setup"
echo "========================================="

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from template..."
    cp .env.local.template .env.local
    echo "✅ .env.local created"
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env.local and add your OpenAI API key"
    echo "   Without OpenAI API key, the chat will show an error message"
    echo ""
else
    echo "✅ .env.local already exists"
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run prisma:generate

# Check if database is configured
if grep -q "postgresql://postgres:password@localhost:5432/vasquez_law" .env.local; then
    echo ""
    echo "⚠️  Database is using default configuration"
    echo "   The chat will work without a database, but some features may be limited"
    echo "   To set up a database, update DATABASE_URL in .env.local"
else
    echo "✅ Custom database configured"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start the development server:"
echo "  npm run dev:next"
echo ""
echo "The chat widget will appear in the bottom right corner of the page."
echo ""
echo "📋 Checklist:"
echo "  [ ] Add OpenAI API key to .env.local (required for chat)"
echo "  [ ] (Optional) Configure database in .env.local"
echo "  [ ] (Optional) Configure other services as needed"
echo ""

# Make the script executable
chmod +x scripts/quick-setup.sh