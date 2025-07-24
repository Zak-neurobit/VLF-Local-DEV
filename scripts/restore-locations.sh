#!/bin/bash

# Restore location pages after build
echo "🔄 Restoring location pages..."

# Remove placeholder
rm -rf src/app/locations

# Restore English locations
if [ -d ".locations-backup/locations" ]; then
  mv .locations-backup/locations src/app/
  echo "✅ Restored English locations"
fi

# Restore Spanish locations
if [ -d ".locations-backup/es/ubicaciones" ]; then
  mkdir -p src/app/es
  mv .locations-backup/es/ubicaciones src/app/es/
  echo "✅ Restored Spanish locations"
fi

# Clean up
rm -rf .locations-backup

echo "✅ Location pages restored successfully"