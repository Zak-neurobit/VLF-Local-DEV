#!/bin/bash
# Restore duplicate components if needed

# Restore ' 2' suffix files
cp "Zak-backup/duplicate-cleanup-2025-08-13/AttorneysPageWrapper 2.tsx" src/components/
cp "Zak-backup/duplicate-cleanup-2025-08-13/ClientNavigation 2.tsx" src/components/
cp "Zak-backup/duplicate-cleanup-2025-08-13/FAQPageContent 2.tsx" src/components/
cp "Zak-backup/duplicate-cleanup-2025-08-13/HydrationSafeComponents 2.tsx" src/components/
cp "Zak-backup/duplicate-cleanup-2025-08-13/OptimizedPageWrapper 2.tsx" src/components/
cp "Zak-backup/duplicate-cleanup-2025-08-13/OptimizedNewsTicker 2.tsx" src/components/NewsTicker/
cp "Zak-backup/duplicate-cleanup-2025-08-13/SocialEmbeds 2.tsx" src/components/SocialMedia/
cp "Zak-backup/duplicate-cleanup-2025-08-13/SocialMediaHub 2.tsx" src/components/SocialMedia/
cp "Zak-backup/duplicate-cleanup-2025-08-13/safe-logger 2.ts" src/lib/
cp "Zak-backup/duplicate-cleanup-2025-08-13/sentry-wrapper 2.ts" src/lib/

# Restore hero components
cp Zak-backup/duplicate-cleanup-2025-08-13/HeroContent.tsx src/components/hero/
cp Zak-backup/duplicate-cleanup-2025-08-13/HeroScene.tsx src/components/hero/
cp Zak-backup/duplicate-cleanup-2025-08-13/OptimizedHeroContent.tsx src/components/hero/
cp Zak-backup/duplicate-cleanup-2025-08-13/OptimizedHeroScene.tsx src/components/hero/

# Restore test file
cp Zak-backup/duplicate-cleanup-2025-08-13/SimpleTest.tsx src/components/

# Restore backup folder
cp -r Zak-backup/duplicate-cleanup-2025-08-13/areas-de-practica.backup-for-netlify src/app/es/

echo "✅ Duplicate components restored!"