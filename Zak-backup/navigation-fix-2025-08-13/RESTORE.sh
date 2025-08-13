#!/bin/bash
# Restore navigation components to their original state
cp Zak-backup/navigation-fix-2025-08-13/index.tsx src/components/HomePage/
cp Zak-backup/navigation-fix-2025-08-13/NavigationProgress.tsx src/components/
cp Zak-backup/navigation-fix-2025-08-13/AttorneysPageContent.tsx src/components/
cp Zak-backup/navigation-fix-2025-08-13/AttorneyPageTemplate.tsx src/components/attorneys/
echo "✅ Navigation components restored!"