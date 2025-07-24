#!/bin/bash

echo "🧹 Cleaning node_modules and package-lock.json..."
rm -rf node_modules package-lock.json

echo "📦 Installing dependencies..."
npm install

echo "✅ Installation complete!"
echo "You can now run: npm run dev"