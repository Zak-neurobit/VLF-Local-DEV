# Trademark Compliance Guide for Vasquez Law Firm

## Official Trademarks

### Primary Trademarks

- **YO PELEO™** - Must always include ™ symbol
- **YO PELEO POR TI™** - Must always include ™ symbol

### Usage Rules

1. **Always Include Trademark Symbol (™)**

   - Every instance of "YO PELEO™" or "YO PELEO POR TI™" must include the ™ symbol
   - This applies to all digital and print materials
   - No exceptions for headers, meta tags, or alt text

2. **Proper Formatting**

   - Correct: YO PELEO™
   - Correct: YO PELEO POR TI™
   - Incorrect: YO PELEO™
   - Incorrect: Yo Peleo™ (must be all caps)

3. **Context-Specific Usage**
   - Headers/Navigation: YO PELEO POR TI™
   - Meta titles: Include trademark in page titles
   - Alt text: "Vasquez Law Firm - YO PELEO POR TI™"
   - Body content: Use consistently throughout

## Implementation Checklist

### Website Components

- [ ] Header/Navigation
- [ ] Hero sections
- [ ] Footer
- [ ] Meta tags (title, description)
- [ ] Image alt text
- [ ] Schema markup
- [ ] Contact forms
- [ ] Email templates

### Content Areas

- [ ] Homepage
- [ ] Practice area pages
- [ ] Attorney profiles
- [ ] Blog posts
- [ ] Location pages
- [ ] About page
- [ ] Contact page

### Marketing Materials

- [ ] Social media profiles
- [ ] Email signatures
- [ ] Business cards
- [ ] Brochures
- [ ] Advertisements

## Common Mistakes to Avoid

1. **Missing Trademark Symbol**

   - Wrong: "YO PELEO POR TI™"
   - Right: "YO PELEO POR TI™"

2. **Incorrect Capitalization**

   - Wrong: "Yo Peleo Por Ti™"
   - Right: "YO PELEO POR TI™"

3. **Partial Usage**
   - Wrong: Using only "YO PELEO™" when space allows for full trademark
   - Right: Use "YO PELEO POR TI™" whenever possible

## Code Examples

### React/TypeScript

```typescript
// Constants file
export const TRADEMARK = {
  SHORT: 'YO PELEO™',
  FULL: 'YO PELEO POR TI™',
  ENGLISH: 'I FIGHT FOR YOU™'
};

// Usage in components
<h1>{TRADEMARK.FULL}</h1>
<meta name="description" content={`Vasquez Law Firm - ${TRADEMARK.FULL}`} />
```

### HTML

```html
<!-- Correct usage in HTML -->
<title>Vasquez Law Firm - YO PELEO POR TI™</title>
<h1>YO PELEO POR TI™</h1>
<img alt="Vasquez Law Firm - YO PELEO POR TI™" src="/logo.png" />
```

### JSON (for translations)

```json
{
  "common": {
    "trademark": "YO PELEO POR TI™",
    "trademarkShort": "YO PELEO™"
  }
}
```

## Enforcement Strategy

1. **Regular Audits**

   - Monthly review of all website content
   - Quarterly review of marketing materials
   - Annual comprehensive trademark audit

2. **Development Process**

   - Include trademark check in code review
   - Add linting rules for trademark usage
   - Create reusable constants for trademarks

3. **Training**
   - Educate all team members on proper usage
   - Include in onboarding materials
   - Regular reminders in team meetings

## Legal Considerations

- Trademark registration status: [To be confirmed]
- First use date: [To be documented]
- Geographic coverage: United States
- Classes of goods/services: Legal services

## Contact for Questions

For any questions about trademark usage:

- Legal Department: [Contact info]
- Marketing Team: [Contact info]
- Web Development: [Contact info]

---

_Last Updated: [Current Date]_
_Version: 1.0_
