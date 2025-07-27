#!/bin/bash

echo "Fixing duplicate MasterLayout issue across all templates..."

# Function to remove MasterLayout wrapper from a file
fix_template() {
    local file=$1
    echo "Processing: $file"
    
    if [ ! -f "$file" ]; then
        echo "File not found: $file"
        return
    fi
    
    # Create a backup
    cp "$file" "$file.backup"
    
    # Remove the import line for MasterLayout
    sed -i '' "/import.*MasterLayout.*from.*@\/design-system\/templates\/MasterLayout/d" "$file"
    
    # Replace opening MasterLayout tag with fragment
    sed -i '' 's/<MasterLayout[^>]*>/<>/g' "$file"
    
    # Replace closing MasterLayout tag with fragment
    sed -i '' 's/<\/MasterLayout>/<\/>/g' "$file"
    
    echo "Fixed: $file"
}

# Fix all the identified templates
echo "Fixing templates in src/components/templates..."
fix_template "src/components/templates/StandardizedPracticeAreaTemplate.tsx"
fix_template "src/components/templates/HomePageTemplate.tsx"
fix_template "src/components/templates/BlogPageTemplate.tsx"
fix_template "src/components/templates/CityPageTemplate.tsx"
fix_template "src/components/templates/LocationPageTemplate.tsx"
fix_template "src/components/templates/LocationServicePageTemplate.tsx"
fix_template "src/components/templates/ModernPracticeAreaTemplate.tsx"
fix_template "src/components/templates/ModernPracticeAreaTemplateV2.tsx"
fix_template "src/components/templates/ModernPracticeAreaTemplateV3.tsx"
fix_template "src/components/templates/NeighborhoodPageTemplate.tsx"
fix_template "src/components/templates/PracticeAreaTemplate.tsx"
fix_template "src/components/templates/SpanishLocationPageTemplate.tsx"

echo "Fixing components..."
fix_template "src/components/About/AboutPageClient.tsx"
fix_template "src/components/Scholarships/ScholarshipsPageClient.tsx"
fix_template "src/components/locations/LocationPageTemplate.tsx"

echo "All templates have been fixed!"
echo "Backup files created with .backup extension"