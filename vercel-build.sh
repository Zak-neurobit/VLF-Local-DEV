#!/bin/bash

# Vercel build script with optimizations for large projects
echo "🚀 Starting optimized Vercel build..."

# Set environment variables for optimization
export NODE_OPTIONS="--max-old-space-size=8192"
export NEXT_TELEMETRY_DISABLED=1

# Skip validation during build to save time
export SKIP_ENV_VALIDATION=true

# Create a file to limit static generation
cat > temp-build-config.js << 'EOF'
// Temporary build configuration to limit static page generation
process.env.LIMIT_STATIC_GENERATION = 'true';
process.env.MAX_STATIC_PAGES = '50';
EOF

# Run the build with optimizations
echo "📦 Running optimized build..."
npm run build

# Clean up
rm -f temp-build-config.js

echo "✅ Build complete!"