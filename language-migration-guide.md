# Language Migration Guide - Vasquez Law Firm Website

## Overview

This guide provides step-by-step instructions for migrating the website to a properly separated bilingual architecture.

## Quick Start

### 1. Replace Middleware

```bash
# Backup current middleware
cp src/middleware.ts src/middleware.backup.ts

# Use enhanced middleware
cp src/middleware-enhanced.ts src/middleware.ts
```

### 2. Install i18n Dependencies

```bash
npm install i18next react-i18next i18next-browser-languagedetector
```

### 3. Initialize i18n

Add to your `app/layout.tsx`:

```tsx
import '@/lib/i18n';
```

## Migration Steps

### Step 1: Fix Location Pages

#### For each location page:

1. **Remove mixed language content**

   - Remove "Se habla español" or "Hablamos español"
   - Remove Spanish keywords from English meta tags
   - Use only English content

2. **Update the page structure**

   ```tsx
   // Old
   <p>Se habla español.</p>;

   // New - Use the template
   import { LocationPageTemplateFixed } from '@/components/locations/LocationPageTemplateFixed';

   export default function LocationPage() {
     return (
       <LocationPageTemplateFixed
         city="City Name"
         state="State"
         language="en"
         nearbyOffice={{
           name: 'Office Name',
           address: 'Address',
           phone: 'Phone',
         }}
       />
     );
   }
   ```

3. **Create Spanish version**
   - Create directory: `/es/ubicaciones/[state]/[city]/`
   - Copy the template and change language to "es"
   - Update metadata to Spanish

### Step 2: Fix Practice Area Pages

1. **Use language-aware components**

   ```tsx
   // Add language detection
   import { useLanguage } from '@/hooks/useLanguage';

   export default function PracticeAreaPage() {
     const { language } = useLanguage();
     // Use language for content
   }
   ```

2. **Remove inline Spanish phrases**
   - Keep content in one language per page
   - Exception: "YO PELEO POR TI™" (trademark)

### Step 3: Update Components

#### Header Component

Already supports language switching - no changes needed.

#### Footer Component

Already supports language switching - no changes needed.

#### Other Components

Add language prop and use translations:

```tsx
interface ComponentProps {
  language: 'en' | 'es';
}
```

### Step 4: Add Hreflang Tags

In your layout or page components:

```tsx
import { HreflangTags } from '@/components/HreflangTags';

// In component
<HreflangTags currentLanguage={language} />;
```

### Step 5: Update Metadata

#### English Pages

```tsx
export const metadata: Metadata = {
  title: 'English Title',
  description: 'English description',
  alternates: {
    languages: {
      'en-US': '/path',
      'es-ES': '/es/path',
    },
  },
};
```

#### Spanish Pages

```tsx
export const metadata: Metadata = {
  title: 'Título en Español',
  description: 'Descripción en español',
  alternates: {
    languages: {
      'en-US': '/path',
      'es-ES': '/es/path',
    },
  },
};
```

## URL Structure

### English (Default)

- `/` - Home
- `/practice-areas` - Practice Areas
- `/locations/nc/charlotte` - Location pages
- `/contact` - Contact

### Spanish

- `/es` - Inicio
- `/es/areas-de-practica` - Áreas de Práctica
- `/es/ubicaciones/nc/charlotte` - Páginas de ubicación
- `/es/contacto` - Contacto

## Content Guidelines

### English Pages

✅ DO:

- Use only English content
- Include "YO PELEO POR TI™" (trademark)
- Use English meta tags
- Link to Spanish version if available

❌ DON'T:

- Include "Se habla español"
- Mix Spanish phrases
- Use Spanish keywords in meta

### Spanish Pages

✅ DO:

- Use only Spanish content
- Include "YO PELEO POR TI™" (trademark)
- Use Spanish meta tags
- Link to English version

❌ DON'T:

- Mix English phrases (except trademark)
- Use English keywords in meta

## Testing Checklist

- [ ] Language switcher works correctly
- [ ] URLs redirect properly (/es routes for Spanish)
- [ ] No mixed language content on pages
- [ ] Hreflang tags are present
- [ ] Meta tags match page language
- [ ] Navigation updates with language
- [ ] Footer updates with language
- [ ] Forms work in both languages

## Common Pitfalls

1. **Forgetting to update meta tags** - Always update title, description, and keywords
2. **Hardcoding text** - Use translation files
3. **Missing Spanish pages** - Create redirects or show notice
4. **Incorrect hreflang** - Test with SEO tools
5. **Mixed content in components** - Pass language prop consistently

## Tools & Resources

### Translation Management

- i18next for runtime translations
- JSON files for static content
- Consider translation management system for scale

### SEO Validation

- Google Search Console for hreflang
- Schema markup validator
- Mobile-friendly test for both languages

### Development Tools

- Browser language switcher extensions
- React Developer Tools for state inspection
- Network tab to verify correct redirects

## Rollout Plan

### Phase 1: Core Pages (Week 1)

- Home page
- Practice area main pages
- Contact page
- Main navigation

### Phase 2: Location Pages (Week 2)

- All NC locations
- All FL locations
- Location template implementation

### Phase 3: Deep Pages (Week 3)

- Individual practice area pages
- Attorney pages
- Blog structure

### Phase 4: Polish (Week 4)

- SEO optimization
- Performance testing
- User acceptance testing
- Launch preparation
