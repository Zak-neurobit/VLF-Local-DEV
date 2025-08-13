#!/bin/bash
# Restore attorney components to their original state
cp Zak-backup/attorney-optimization-2025-08-13/AttorneysPageContent.tsx src/components/
cp Zak-backup/attorney-optimization-2025-08-13/AttorneyPageTemplate.tsx src/components/attorneys/
echo "✅ Attorney components restored!"