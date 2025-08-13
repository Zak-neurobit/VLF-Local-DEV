#!/bin/bash
# Restore performance optimization changes
cp Zak-backup/performance-fix-2025-08-13/layout.tsx src/app/
cp Zak-backup/performance-fix-2025-08-13/NavigationProgress.tsx src/components/
cp Zak-backup/performance-fix-2025-08-13/ClientNavigation.tsx src/components/
cp Zak-backup/performance-fix-2025-08-13/UnifiedModernChatbot.tsx src/components/ChatWidget/
cp Zak-backup/performance-fix-2025-08-13/index.tsx src/components/HomePage/
echo "✅ Performance files restored!"