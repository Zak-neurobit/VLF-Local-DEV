# Trademark Usage Examples

## Import the constants

```typescript
import { TRADEMARK, BRAND } from '@/lib/constants/trademark';
```

## Usage in components

```tsx
// In a React component
<h1>{TRADEMARK.FULL}</h1>
<p>{TRADEMARK.ENGLISH}</p>

// In meta tags
<title>{BRAND.META_SUFFIX}</title>

// In content
<p>Call us at {TRADEMARK.PHONE}</p>
```

## Usage in JSON files

```json
{
  "hero": {
    "title": "YO PELEO POR TI™",
    "subtitle": "I FIGHT FOR YOU™"
  }
}
```
