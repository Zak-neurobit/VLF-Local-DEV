#!/bin/bash

# Function to convert directory name to proper component name
to_component_name() {
  local dir_name=$1
  # Convert kebab-case to PascalCase
  echo "$dir_name" | sed 's/-cerca-de-mi$/NearMe/' | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g' | sed 's/ //g'
}

# Process all incorrectly named client files
echo "Fixing client component names..."

find src/app/es/cerca-de-mi -name "*Client.tsx" -type f | while read client_file; do
  dir=$(dirname "$client_file")
  dir_name=$(basename "$dir")
  old_client_name=$(basename "$client_file" .tsx)
  
  # Skip if already properly named
  if [[ "$old_client_name" =~ ^[A-Z] ]]; then
    continue
  fi
  
  # Generate proper names
  component_base=$(to_component_name "$dir_name")
  new_client_name="${component_base}Client"
  new_client_file="${dir}/${new_client_name}.tsx"
  
  echo "Processing: $dir_name"
  echo "  Old: $old_client_name"
  echo "  New: $new_client_name"
  
  # Rename the file
  if [[ "$client_file" != "$new_client_file" ]]; then
    mv "$client_file" "$new_client_file"
  fi
  
  # Fix the function name inside the client file
  sed -i '' "s/export default function ${old_client_name}(/export default function ${new_client_name}(/" "$new_client_file"
  
  # Fix the import and usage in page.tsx
  page_file="${dir}/page.tsx"
  if [[ -f "$page_file" ]]; then
    sed -i '' "s/import ${old_client_name} from/import ${new_client_name} from/" "$page_file"
    sed -i '' "s/${old_client_name}/${new_client_name}/g" "$page_file"
    sed -i '' "s/export default function [a-z][^(]*(/export default function ${component_base}Page(/" "$page_file"
  fi
done

echo "All client components fixed!"