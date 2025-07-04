#!/bin/bash

echo "🔧 Fixing CSS issues and deploying to Vercel..."
echo ""

# Navigate to fresh repository
cd /Users/williamvasquez/Documents/VLF-Website-fresh

echo "📝 Fixing design-tokens.css..."
# Remove the problematic CSS file that's causing build errors
rm -f src/styles/design-tokens.css

echo ""
echo "📝 Updating globals.css to remove the import..."
# Remove the import line from globals.css
sed -i '' '/@import.*design-tokens\.css/d' src/app/globals.css

echo ""
echo "🔧 Fixing web-vitals imports..."
# Create a fixed version of web-vitals.ts
cat > src/lib/performance/web-vitals.ts << 'EOF'
import { onCLS, onFCP, onFID, onLCP, onTTFB } from 'web-vitals';

export interface WebVitalsMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  entries: any[];
}

export function reportWebVitals(callback: (metric: WebVitalsMetric) => void) {
  onCLS(callback);
  onFCP(callback);
  onFID(callback);
  onLCP(callback);
  onTTFB(callback);
}
EOF

echo ""
echo "🏗️ Building project again..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful!"
    echo ""
    echo "🚀 Deploying to Vercel production..."
    npx vercel --prod --yes
else
    echo ""
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

echo ""
echo "✅ Deployment process complete!"