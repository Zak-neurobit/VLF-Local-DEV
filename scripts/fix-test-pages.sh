#!/bin/bash

# Script to fix color discrepancies in test pages
echo "🎨 Fixing color discrepancies in test and debug pages..."

# Find all test and debug pages
FILES=$(find src/app -name "page.tsx" -type f | grep -E "(test-|debug-)")

if [ -z "$FILES" ]; then
    echo "No test or debug pages found."
    exit 0
fi

echo "Found $(echo "$FILES" | wc -l) test/debug pages to check"
echo ""

# Process each file
for file in $FILES; do
    echo "Processing: $file"
    
    # Check if file contains light backgrounds
    if grep -q "bg-white\|bg-gray-50\|bg-gray-100" "$file"; then
        echo "  ⚠️  Found light backgrounds - fixing..."
        
        # Create backup
        cp "$file" "$file.bak"
        
        # Replace light colors with dark theme colors
        sed -i '' \
            -e 's/bg-white/bg-gray-900/g' \
            -e 's/bg-gray-50/bg-gray-900\/50/g' \
            -e 's/bg-gray-100/bg-gray-800/g' \
            -e 's/bg-gray-200/bg-gray-700/g' \
            -e 's/text-gray-900/text-white/g' \
            -e 's/text-gray-800/text-gray-100/g' \
            -e 's/text-gray-700/text-gray-200/g' \
            -e 's/text-gray-600/text-gray-300/g' \
            -e 's/border-gray-200/border-gray-700/g' \
            -e 's/border-gray-300/border-gray-600/g' \
            "$file"
        
        echo "  ✅ Fixed"
    else
        echo "  ✅ No light backgrounds found"
    fi
    echo ""
done

echo "✨ Done! All test pages now use dark theme colors."
echo ""
echo "Note: Backup files created with .bak extension"
echo "To restore: find src/app -name '*.tsx.bak' -exec sh -c 'mv "$1" "${1%.bak}"' _ {} \;"