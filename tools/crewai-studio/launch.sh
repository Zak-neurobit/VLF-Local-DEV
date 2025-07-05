#!/bin/bash

# VLF CrewAI-Studio Launch Script

echo "🚀 Launching VLF CrewAI-Studio..."

# Change to the script directory
cd "$(dirname "$0")"

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found. Please run setup.py first."
    exit 1
fi

# Activate virtual environment
echo "📦 Activating virtual environment..."
source venv/bin/activate

# Check if the main VLF website is running
echo "🔍 Checking if VLF website is running on port 3000..."
if ! curl -s http://localhost:3000/health > /dev/null 2>&1; then
    echo "⚠️  Warning: VLF website doesn't appear to be running on port 3000"
    echo "The CrewAI agents require the main website to be running."
    echo "Start the website with: npm run dev"
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Launch Gradio interface
echo "🌐 Starting Gradio interface..."
echo "📍 Access at: http://localhost:7860"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python gradio_interface.py