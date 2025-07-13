#!/bin/bash

# Quick Start CrewAI Agents - IMMEDIATE OPERATION
# This script starts all CrewAI agents and begins autonomous operation immediately

echo "🚀 STARTING CREWAI AUTONOMOUS AGENT SYSTEM"
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build TypeScript files if needed
echo "🔨 Building TypeScript files..."
npm run build:socket 2>/dev/null || echo "⚠️ Socket build skipped (not critical)"

# Start the CrewAI system
echo "🤖 Starting CrewAI Autonomous System..."
echo "This will:"
echo "  ✅ Initialize all 16+ AI agents"
echo "  ✅ Begin autonomous content generation"
echo "  ✅ Start SEO domination campaigns"
echo "  ✅ Monitor and respond to reviews"
echo "  ✅ Analyze competitors continuously"
echo "  ✅ Create social media content"
echo "  ✅ Generate blog posts automatically"
echo ""

# Export environment for TypeScript execution
export NODE_ENV=development
export TS_NODE_PROJECT=tsconfig.json

# Start the system
npm run crews:start

echo ""
echo "🎉 CrewAI System Started!"
echo "========================="
echo ""
echo "📊 Monitor the system at:"
echo "  Status:  http://localhost:3000/api/crews/status"
echo "  Logs:    http://localhost:3000/api/crews/logs"
echo "  Metrics: http://localhost:3000/api/crews/metrics"
echo "  Health:  http://localhost:3000/api/crews/health"
echo ""
echo "🚀 The agents are now working autonomously!"
echo "   Check the logs above to see real-time activity."
echo ""