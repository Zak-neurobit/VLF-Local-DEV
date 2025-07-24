#!/bin/bash

echo "Fixing logger imports..."

# Find all files that import from logger or pino-logger
find src -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) | while read file; do
  # Replace logger imports with safe-logger
  sed -i '' "s|from '@/lib/logger'|from '@/lib/safe-logger'|g" "$file"
  sed -i '' "s|from '@/lib/pino-logger'|from '@/lib/safe-logger'|g" "$file"
  sed -i '' "s|from '../logger'|from '../safe-logger'|g" "$file"
  sed -i '' "s|from './logger'|from './safe-logger'|g" "$file"
done

echo "Logger imports fixed!"