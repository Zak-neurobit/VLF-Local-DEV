#!/bin/bash

# Start script for integrated VLF Website + HODOS development
echo "🚀 Starting Integrated VLF + HODOS Development Environment"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop."
    exit 1
fi

# Function to check if directory exists
check_directory() {
    if [ ! -d "$1" ]; then
        echo "❌ Directory not found: $1"
        echo "Please ensure HODOS is cloned at the correct location."
        exit 1
    fi
}

# Check HODOS directory
HODOS_DIR="../HODOS/HODOS"
check_directory "$HODOS_DIR"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update .env with your configuration values"
fi

# Add HODOS-specific environment variables if not present
if ! grep -q "HODOS_API_URL" .env; then
    echo "" >> .env
    echo "# HODOS Integration" >> .env
    echo "HODOS_API_URL=http://localhost:3001" >> .env
    echo "HODOS_API_KEY=your-hodos-api-key" >> .env
    echo "HODOS_WEBSOCKET_URL=ws://localhost:3001" >> .env
fi

# Menu for startup options
echo ""
echo "Select startup option:"
echo "1) Development - Separate terminals (recommended)"
echo "2) Docker Compose - All services containerized"
echo "3) Hybrid - VLF local, HODOS in Docker"
echo "4) Setup only - Install dependencies"
echo ""
read -p "Enter choice [1-4]: " choice

case $choice in
    1)
        echo "📦 Starting development environment..."
        echo ""
        echo "Open 3 terminal windows and run:"
        echo ""
        echo "Terminal 1 (VLF Website):"
        echo "  cd $(pwd)"
        echo "  npm install"
        echo "  npm run dev"
        echo ""
        echo "Terminal 2 (HODOS):"
        echo "  cd $(pwd)/$HODOS_DIR"
        echo "  npm install"
        echo "  npm run dev"
        echo ""
        echo "Terminal 3 (Shared Services):"
        echo "  cd $(pwd)"
        echo "  docker-compose -f docker-compose.integrated.yml up redis elasticsearch"
        echo ""
        echo "Then visit:"
        echo "  - VLF Website: http://localhost:3000"
        echo "  - HODOS API: http://localhost:3001"
        ;;
        
    2)
        echo "🐳 Starting with Docker Compose..."
        docker-compose -f docker-compose.integrated.yml up -d
        echo ""
        echo "✅ Services starting up..."
        echo "Waiting for services to be ready..."
        sleep 10
        echo ""
        echo "Services available at:"
        echo "  - VLF Website: http://localhost:3000"
        echo "  - HODOS API: http://localhost:3001"
        echo "  - PostgreSQL Admin: http://localhost:8080"
        echo "  - MongoDB Admin: http://localhost:8081"
        echo ""
        echo "View logs: docker-compose -f docker-compose.integrated.yml logs -f"
        ;;
        
    3)
        echo "🔄 Starting hybrid environment..."
        echo "Starting HODOS services in Docker..."
        cd $HODOS_DIR
        docker-compose up -d
        cd - > /dev/null
        echo ""
        echo "Now start VLF Website locally:"
        echo "  npm install && npm run dev"
        ;;
        
    4)
        echo "📦 Installing dependencies..."
        npm install
        cd $HODOS_DIR && npm install
        cd - > /dev/null
        echo "✅ Dependencies installed for both projects"
        ;;
        
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac

echo ""
echo "📚 Integration Documentation: HODOS-INTEGRATION-PLAN.md"
echo "🔧 Troubleshooting: INTEGRATION-GUIDE.md"