# Performance Fix Restore Instructions

## Date: 2025-01-12
## Issue: Slow page transitions

### Changes Made
1. Removed framer-motion animations from components
2. Replaced with CSS transitions
3. Optimized dynamic imports
4. Simplified next.config.js

### Files Modified
- src/components/HomePage/index.tsx
- src/components/HomePage/ResultsShowcase.tsx
- src/components/ChatWidget/UnifiedModernChatbot.tsx
- src/components/Header/index.tsx
- src/components/Voice/RetellGlassmorphicClient.tsx
- src/components/Voice/VoiceCallModal.tsx
- next.config.js

### To Restore

Run these commands from the project root:

```bash
# Restore HomePage components
cp "Zak-backup/performance-fix-2025-01-12/components/HomePage-index.tsx" "src/components/HomePage/index.tsx"
cp "Zak-backup/performance-fix-2025-01-12/components/ResultsShowcase.tsx" "src/components/HomePage/ResultsShowcase.tsx"

# Restore ChatWidget
cp "Zak-backup/performance-fix-2025-01-12/components/UnifiedModernChatbot.tsx" "src/components/ChatWidget/UnifiedModernChatbot.tsx"

# Restore Header
cp "Zak-backup/performance-fix-2025-01-12/components/Header-index.tsx" "src/components/Header/index.tsx"

# Restore Voice components
cp "Zak-backup/performance-fix-2025-01-12/components/RetellGlassmorphicClient.tsx" "src/components/Voice/RetellGlassmorphicClient.tsx"
cp "Zak-backup/performance-fix-2025-01-12/components/VoiceCallModal.tsx" "src/components/Voice/VoiceCallModal.tsx"

# Restore config
cp "Zak-backup/performance-fix-2025-01-12/config/next.config.js" "next.config.js"

# Restart dev server
npm run dev
```

### Original Issue
Pages were taking several seconds to transition between routes due to:
- Heavy framer-motion animations
- Excessive dynamic imports
- Complex webpack configuration