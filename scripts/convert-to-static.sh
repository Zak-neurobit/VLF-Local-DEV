#!/bin/bash

# Convert edge runtime pages to static pages
# BUILD UP NOT DOWN - Convert pages to static for better performance

echo "Converting edge runtime pages to static..."

# Find all files with "export const runtime = 'edge'"
files=$(grep -r "export const runtime = 'edge'" src/app --include="*.tsx" --include="*.ts" -l)

count=0
for file in $files; do
    # Skip API routes - they need dynamic runtime
    if [[ $file == *"/api/"* ]]; then
        echo "Skipping API route: $file"
        continue
    fi
    
    # Skip admin/portal/dashboard pages - they need auth
    if [[ $file == *"/admin/"* ]] || [[ $file == *"/portal/"* ]] || [[ $file == *"/dashboard/"* ]]; then
        echo "Skipping protected route: $file"
        continue
    fi
    
    # Remove the runtime export
    sed -i '' "/export const runtime = 'edge';/d" "$file"
    
    echo "Converted to static: $file"
    ((count++))
done

echo "Converted $count pages to static rendering"