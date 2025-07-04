# Dark Mode Toggle Requirements Specification

**Generated**: 2024-01-15 15:45:00
**Status**: COMPLETE
**Ready for Implementation**: YES

## Executive Summary

Implement a dark mode toggle for the Vasquez Law Firm website that allows users to switch between light and dark themes. The toggle should provide instant visual feedback, persist user preferences across sessions, and maintain brand consistency in both themes.

## Functional Requirements

Based on 10 answered questions:

### User Interface (from Q1: YES)

- Provide a visual toggle control for theme switching
- Toggle should be easily discoverable and accessible

### Persistence (from Q2: YES)

- Save user's theme preference to localStorage
- Restore preference on subsequent visits
- Handle SSR without hydration mismatch

### Mobile Support (from Q3: YES - default)

- Ensure toggle works on all device sizes
- Maintain 44px minimum touch target
- Responsive positioning in navigation

### Instant Switching (from Q4: YES)

- Change theme without page reload
- Apply changes immediately to all components
- No flash of unstyled content (FOUC)

### Manual Control Only (from Q5: NO)

- Do not auto-detect system preferences
- User has full control over theme selection
- Default to light mode for new users

## Technical Requirements

### Use Existing Infrastructure (from Q1-detail: YES)

```typescript
// Utilize existing hook at src/hooks/useLocalStorage.ts
const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
```

### Navigation Placement (from Q2-detail: YES)

- Add toggle component to `src/components/Navigation/MainNav.tsx`
- Position in header alongside existing controls
- Maintain navigation component structure

### Custom Colors (from Q3-detail: YES)

Update `tailwind.config.js`:

```javascript
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6B1F2E',
          dark: '#8B2F3E', // Lighter for dark mode
        },
        background: {
          light: '#FFFFFF',
          dark: '#0F172A',
        },
      },
    },
  },
};
```

### No Code Block Styling (from Q4-detail: NO - default)

- No special handling required for code blocks
- Focus on standard UI components only

### Smooth Transitions (from Q5-detail: YES)

```css
/* Add to globals.css */
* {
  transition:
    background-color 300ms ease-in-out,
    color 300ms ease-in-out,
    border-color 300ms ease-in-out;
}
```

## Implementation Architecture

### 1. Theme Provider Component

```typescript
// src/providers/ThemeProvider.tsx
'use client';

import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}>({ theme: 'light', toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

### 2. Theme Toggle Component

```typescript
// src/components/ThemeToggle.tsx
'use client';

import { useTheme } from '@/providers/ThemeProvider';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
                 transition-colors duration-300"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <MoonIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      ) : (
        <SunIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      )}
    </button>
  );
}
```

### 3. Root Layout Integration

```typescript
// src/app/layout.tsx
import { ThemeProvider } from '@/providers/ThemeProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 4. Update Tailwind Classes

Convert existing classes to support dark mode:

- `bg-white` → `bg-white dark:bg-gray-900`
- `text-gray-900` → `text-gray-900 dark:text-gray-100`
- `border-gray-200` → `border-gray-200 dark:border-gray-700`
- `bg-primary` → `bg-primary dark:bg-primary-dark`

## Files to Modify

1. **Create New Files**:

   - `src/providers/ThemeProvider.tsx`
   - `src/components/ThemeToggle.tsx`

2. **Modify Existing Files**:
   - `src/app/layout.tsx` - Add ThemeProvider
   - `src/components/Navigation/MainNav.tsx` - Add ThemeToggle
   - `tailwind.config.js` - Enable class-based dark mode
   - `src/styles/globals.css` - Add transitions
   - All component files - Update color classes

## Testing Requirements

1. **Functional Tests**:

   - Toggle switches between themes
   - Preference persists on reload
   - No FOUC on initial load
   - Works on mobile devices

2. **Visual Tests**:

   - All components display correctly in both themes
   - Brand colors are visible and accessible
   - Transitions are smooth
   - No unstyled elements

3. **Edge Cases**:
   - Clear localStorage and verify defaults
   - Test with JavaScript disabled
   - Verify SSR compatibility

## Acceptance Criteria

- [ ] Users can toggle between light and dark themes
- [ ] Theme preference persists across sessions
- [ ] No flash of unstyled content on page load
- [ ] All UI elements properly styled in both themes
- [ ] Smooth transitions between themes
- [ ] Toggle is accessible on all device sizes
- [ ] Custom brand colors work in dark mode
- [ ] No console errors or warnings

## Notes

- Implementation estimated at 2-4 hours
- No breaking changes to existing functionality
- Follows established patterns in codebase
- Maintains accessibility standards
