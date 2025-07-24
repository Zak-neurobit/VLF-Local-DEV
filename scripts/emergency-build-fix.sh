#!/bin/bash

# Emergency build fix - temporarily move location pages to prevent static generation
echo "🚨 Emergency Build Fix - Temporarily moving location pages..."

# Create backup directory
mkdir -p .locations-backup

# Move location directories temporarily
if [ -d "src/app/locations" ]; then
  mv src/app/locations .locations-backup/
  echo "✅ Moved English locations"
fi

if [ -d "src/app/es/ubicaciones" ]; then
  mkdir -p .locations-backup/es
  mv src/app/es/ubicaciones .locations-backup/es/
  echo "✅ Moved Spanish locations"
fi

# Create placeholder pages
mkdir -p src/app/locations
cat > src/app/locations/page.tsx << 'EOF'
export default function LocationsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Our Locations</h1>
        <p className="text-gray-600">Location pages are being updated. Please contact us at 1-844-YO-PELEO.</p>
      </div>
    </div>
  );
}
EOF

echo "✅ Created placeholder page"
echo "📦 Ready for build - location pages temporarily disabled"