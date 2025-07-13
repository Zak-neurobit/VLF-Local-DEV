#!/bin/bash

# 🚀 CREWAI IMMEDIATE STARTUP SCRIPT
# This script gets the CrewAI agents working RIGHT NOW with zero configuration

set -e  # Exit on any error

echo "██████████████████████████████████████████████████████████████████"
echo "██                                                              ██"
echo "██  🚀 CREWAI AUTONOMOUS SYSTEM - IMMEDIATE STARTUP 🚀         ██"
echo "██                                                              ██"
echo "██  This will start 16+ AI agents working autonomously to:     ██"
echo "██  ✅ Generate blog content every 2 hours                     ██"
echo "██  ✅ Monitor and respond to reviews                          ██"
echo "██  ✅ Create social media content                             ██"
echo "██  ✅ Analyze competitors continuously                        ██"
echo "██  ✅ Optimize SEO and local search                           ██"
echo "██  ✅ Process legal inquiries                                 ██"
echo "██                                                              ██"
echo "██████████████████████████████████████████████████████████████████"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the VLF Website project root"
    echo "   Current directory: $(pwd)"
    echo "   Looking for: package.json"
    exit 1
fi

echo "📁 Working directory: $(pwd)"
echo "✅ package.json found"
echo ""

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version $NODE_VERSION detected. Please upgrade to Node.js 18+."
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm $(npm -v) detected"
echo ""

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

# Check for required environment variables
echo "🔍 Checking environment variables..."

ENV_FILE=".env.local"
if [ ! -f "$ENV_FILE" ]; then
    echo "⚠️  Warning: $ENV_FILE not found"
    echo "   Creating minimal environment file..."
    
    cat > "$ENV_FILE" << EOF
# CrewAI Environment Configuration
DATABASE_URL="postgresql://localhost:5432/vlf_website"
OPENAI_API_KEY="your_openai_key_here"
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY="your_google_places_key_here"
NODE_ENV="development"
EOF
    
    echo "✅ Created $ENV_FILE with default values"
    echo "   👆 You may need to update the API keys for full functionality"
else
    echo "✅ Environment file found"
fi

# Create logs directory
if [ ! -d "logs" ]; then
    mkdir -p logs
    echo "✅ Created logs directory"
else
    echo "✅ Logs directory exists"
fi

# Build TypeScript if needed
echo ""
echo "🔨 Building TypeScript files..."
if npm run build:socket 2>/dev/null; then
    echo "✅ TypeScript build successful"
else
    echo "⚠️  TypeScript build skipped (not critical for startup)"
fi

echo ""
echo "🤖 STARTING CREWAI AUTONOMOUS SYSTEM..."
echo "======================================"

# Ask user what they want to do
echo "Choose startup option:"
echo "1) 🎬 Demo Mode - See agents working immediately (recommended)"
echo "2) 🚀 Full System - Complete autonomous operation"
echo "3) 🌙 Background Mode - Run silently in background"
echo ""
read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🎬 Starting Demo Mode..."
        echo "This will show you the agents working in real-time!"
        echo ""
        npm run crews:demo
        echo ""
        echo "🎉 Demo complete! Now starting full system..."
        npm run crews:start
        ;;
    2)
        echo ""
        echo "🚀 Starting Full Autonomous System..."
        npm run crews:launch
        ;;
    3)
        echo ""
        echo "🌙 Starting Background Mode..."
        npm run crews:launch:background
        echo "✅ System started in background"
        echo "📊 Monitor at: http://localhost:3000/api/crews/status"
        echo "📋 View logs: tail -f logs/crews.log"
        ;;
    *)
        echo ""
        echo "🎬 Invalid choice, starting Demo Mode by default..."
        npm run crews:demo
        ;;
esac

echo ""
echo "████████████████████████████████████████████████████████████████"
echo "██                                                            ██"
echo "██  🎉 CREWAI SYSTEM OPERATIONAL! 🎉                         ██"
echo "██                                                            ██"
echo "██  Your agents are now working autonomously!                 ██"
echo "██                                                            ██"
echo "██  📊 Monitor Status:  http://localhost:3000/api/crews/status ██"
echo "██  📈 View Metrics:    http://localhost:3000/api/crews/metrics██"
echo "██  🏥 Check Health:    http://localhost:3000/api/crews/health ██"
echo "██  📋 View Logs:       http://localhost:3000/api/crews/logs   ██"
echo "██                                                            ██"
echo "██  The system will:                                          ██"
echo "██  ✅ Generate content every 2 hours                        ██"
echo "██  ✅ Monitor reviews every hour                             ██"
echo "██  ✅ Create social posts every 3 hours                     ██"
echo "██  ✅ Analyze competitors every 4 hours                     ██"
echo "██  ✅ Optimize SEO continuously                             ██"
echo "██                                                            ██"
echo "██  🚀 TOTAL AUTONOMOUS DOMINATION ACTIVATED! 🚀            ██"
echo "██                                                            ██"
echo "████████████████████████████████████████████████████████████████"
echo ""

# Provide next steps
echo "🎯 NEXT STEPS:"
echo "============="
echo ""
echo "1. 📊 Check the status dashboard to see agents working:"
echo "   Open: http://localhost:3000/api/crews/status"
echo ""
echo "2. 📈 Monitor performance metrics:"
echo "   Open: http://localhost:3000/api/crews/metrics"
echo ""
echo "3. 📋 View real-time activity logs:"
echo "   Open: http://localhost:3000/api/crews/logs"
echo ""
echo "4. 🔧 Manual control (if needed):"
echo "   Restart all agents: curl -X POST http://localhost:3000/api/crews/status -H 'Content-Type: application/json' -d '{\"action\": \"restart-all\"}'"
echo ""
echo "5. 🛑 Stop the system:"
echo "   Press Ctrl+C or run: pkill -f crewai"
echo ""
echo "🎉 Enjoy your autonomous AI workforce!"
echo ""