# Vasquez Law Firm Design System

## Overview

This design system ensures consistent visual styling across the Vasquez Law Firm website. It defines colors, typography, spacing, and component patterns that align with the firm's brand identity.

## Design Tokens

All design tokens are defined in `/src/styles/design-tokens.ts` and are available as:

- TypeScript constants for use in JavaScript/TypeScript
- CSS variables for use in stylesheets
- Tailwind utility classes

## Color System

### Brand Colors

#### Primary (Gold)

- `primary-50` to `primary-950`: Full spectrum of gold shades
- `primary` (default): #C9974D - Used for primary actions and highlights
- `primary-400`: #D4A574 - Used for hover states
- `primary-600`: #B08740 - Used for active states

#### Secondary (Burgundy)

- `secondary-50` to `secondary-950`: Full spectrum of burgundy shades
- `secondary` (default): #6B1F2E - Used for secondary actions and branding
- `secondary-600`: #8B2635 - Used for hover states
- `secondary-800`: #551825 - Used for active states

#### Neutral

- `neutral-0` to `neutral-1000`: Complete grayscale palette
- `neutral-50`: Background colors
- `neutral-700`: Primary text
- `neutral-400`: Secondary text

#### Semantic Colors

- `success`: Green tones for positive feedback
- `warning`: Amber tones for warnings
- `error`: Red tones for errors
- `info`: Blue tones for information

### Usage Examples

```tsx
// Using Tailwind classes
<div className="bg-primary text-white">
<div className="text-secondary-700">
<div className="border-neutral-200">

// Using CSS variables
.custom-element {
  background-color: var(--color-gold-500);
  color: var(--color-burgundy-700);
}

// Using TypeScript constants
import { colors } from '@/styles/design-tokens';
const primaryColor = colors.brand.gold[500];
```

## Typography

### Font Families

- **Sans**: System font stack for body text
- **Serif**: Georgia for traditional legal content
- **Display**: Playfair Display for headings

### Font Sizes

- `text-xs` to `text-9xl`: Full range of sizes
- `text-base`: Default body text (1rem)
- `text-lg`: Emphasized body text
- `text-2xl` to `text-4xl`: Headings

### Font Weights

- `font-normal`: Regular text (400)
- `font-medium`: Slightly emphasized (500)
- `font-semibold`: Emphasized (600)
- `font-bold`: Strong emphasis (700)

## Spacing

Consistent spacing scale from 0 to 64 (0rem to 16rem):

- `spacing-1`: 0.25rem (4px)
- `spacing-2`: 0.5rem (8px)
- `spacing-4`: 1rem (16px) - Default spacing unit
- `spacing-8`: 2rem (32px)
- `spacing-16`: 4rem (64px)

## Components

### Button Component

```tsx
import { Button } from '@/components/ui/button';

// Primary button
<Button variant="primary">Schedule Consultation</Button>

// Secondary button
<Button variant="secondary">Learn More</Button>

// Outline button
<Button variant="outline">View Details</Button>

// With loading state
<Button loading>Processing...</Button>

// With icons
<Button leftIcon={<PhoneIcon />}>Call Now</Button>
```

### Link Component

```tsx
import { Link } from '@/components/ui/link';

// Default link
<Link href="/about">About Us</Link>

// Navigation link
<Link variant="nav" href="/services">Services</Link>

// Button-style link
<Link variant="button" href="/contact">Contact Us</Link>

// External link (automatically adds icon)
<Link href="https://example.com" external>External Resource</Link>
```

### Card Component

```tsx
import { Card, CardHeader, CardTitle, CardContent, FeatureCard, TestimonialCard } from '@/components/ui/card';

// Basic card
<Card>
  <CardHeader>
    <CardTitle>Immigration Services</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Comprehensive immigration law services...</p>
  </CardContent>
</Card>

// Feature card
<FeatureCard
  icon={<ScaleIcon />}
  title="Criminal Defense"
  description="Experienced criminal defense representation"
/>

// Testimonial card
<TestimonialCard
  quote="Excellent service and results"
  author="John Doe"
  role="Client"
  rating={5}
/>
```

## Best Practices

### Color Usage

1. **Never hardcode hex values** - Always use design tokens
2. **Maintain contrast** - Ensure WCAG AA compliance
3. **Be consistent** - Use the same color for the same purpose

### Responsive Design

1. Use Tailwind's responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`
2. Design mobile-first
3. Test on all breakpoints

### Accessibility

1. Use semantic HTML elements
2. Include proper ARIA labels
3. Ensure keyboard navigation works
4. Maintain color contrast ratios

### Performance

1. Use Tailwind's purge feature in production
2. Avoid inline styles
3. Leverage CSS variables for dynamic theming

## Migration Guide

To update components with hardcoded colors:

1. **Find hardcoded colors**:

   ```bash
   grep -r "#[0-9a-fA-F]\{6\}" src/components/
   ```

2. **Replace with design tokens**:

   - `#6B1F2E` → `secondary` or `secondary-700`
   - `#C9974D` → `primary` or `primary-500`
   - `#D4A574` → `primary-400`
   - `gray-XXX` → `neutral-XXX`

3. **Update imports**:
   ```tsx
   import { colors } from '@/styles/design-tokens';
   import { Button, Link, Card } from '@/components/ui';
   ```

## CSS Variables Reference

All design tokens are available as CSS variables:

- Colors: `--color-{name}-{shade}`
- Spacing: `--spacing-{size}`
- Typography: `--font-size-{size}`, `--font-weight-{weight}`
- Shadows: `--shadow-{size}`
- Border radius: `--radius-{size}`

Example:

```css
.custom-element {
  background-color: var(--color-primary-500);
  padding: var(--spacing-4);
  font-size: var(--font-size-lg);
  box-shadow: var(--shadow-md);
  border-radius: var(--radius-lg);
}
```
