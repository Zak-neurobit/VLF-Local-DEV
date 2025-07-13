# Vasquez Law Firm Design System

## Design Philosophy

Each page type serves a distinct purpose and should have a unique visual identity while maintaining brand consistency.

## Page Type Design Specifications

### 1. **Home Page** - "The Digital Front Door"

**Purpose**: First impression, establish trust, guide to services
**Visual Identity**: Premium, modern, tech-forward

#### Design Elements:

- **Hero**: Full-screen animated gradient background with parallax effects
- **Header**: Transparent overlay that transitions to solid on scroll
- **Color Scheme**:
  - Primary gradient: Black → Deep burgundy → Gold accents
  - Animated color shifts for engagement
- **Typography**:
  - Hero headline: 6xl-7xl, black weight
  - Animated text effects (typewriter, fade-ins)
- **Unique Features**:
  - Virtual paralegal chatbot with pulsing indicator
  - Floating language toggle
  - Stats counter animations
  - Service cards with 3D hover effects
  - Video background option for hero
- **Layout**: Full-width sections with varying heights
- **Animations**: Maximum - parallax, fade, slide, scale effects

### 2. **Practice Area Pages** - "The Authority Pages"

**Purpose**: Demonstrate expertise, convert visitors to clients
**Visual Identity**: Professional, urgent, authoritative

#### Design Elements:

- **Hero**: Dark gradient with practice-specific imagery/icons
- **Header**: Solid header with breadcrumbs
- **Color Scheme**:
  - Background: Neutral-950 (near black)
  - Accent: Gold for CTAs and highlights
  - Urgency indicators: Red/Orange for time-sensitive matters
- **Typography**:
  - Headlines: 4xl-5xl, bold weight
  - Body: Larger for readability (lg)
- **Unique Features**:
  - Sticky "Get Help Now" bar
  - Expandable service cards
  - Success metrics dashboard
  - FAQ accordion
  - Related services sidebar
- **Layout**: 2/3 content, 1/3 sidebar on desktop
- **Animations**: Moderate - smooth transitions, hover effects

### 3. **Practice Area Sub-Pages** - "The Detail Pages"

**Purpose**: Specific service information, SEO targeting
**Visual Identity**: Clean, informative, conversion-focused

#### Design Elements:

- **Hero**: Compact hero with service-specific icon
- **Header**: Standard solid header
- **Color Scheme**:
  - Background: Dark theme OR light theme based on urgency
  - Urgent services (Criminal, DUI): Dark theme
  - Planning services (Estate, Business): Light theme
- **Typography**:
  - Headlines: 3xl-4xl
  - Structured content with clear hierarchy
- **Unique Features**:
  - Process timeline visualization
  - Pricing transparency section
  - Case results ticker
  - Document checklist
- **Layout**: Single column with floating TOC
- **Animations**: Minimal - focus on content

### 4. **Blog Pages** - "The Knowledge Hub"

**Purpose**: SEO, establish thought leadership, educate
**Visual Identity**: Readable, shareable, professional

#### Design Elements:

- **Hero**: Minimal hero with featured image
- **Header**: Standard header with blog navigation
- **Color Scheme**:
  - Background: White (único)
  - Accent: Blue (#188bf6) for links
  - Text: Dark gray for readability
- **Typography**:
  - Article headlines: 3xl-4xl
  - Body: Optimized for reading (prose class)
  - Serif option for article body
- **Unique Features**:
  - Reading progress bar
  - Floating share buttons
  - Author bio card
  - Related articles algorithm
  - Newsletter signup inline
- **Layout**: Central column with generous whitespace
- **Animations**: None in article body

### 5. **About Page** - "The Trust Builder"

**Purpose**: Build credibility, humanize the firm
**Visual Identity**: Warm, personal, accomplished

#### Design Elements:

- **Hero**: Team photo or office imagery
- **Header**: Standard header
- **Color Scheme**:
  - Background: Gradient from black to warm gray
  - Accent: Gold for achievements
  - Team photos add color variety
- **Typography**:
  - Story-telling focus
  - Quotes in italic/script
- **Unique Features**:
  - Interactive timeline
  - Team member cards with hover bios
  - Awards showcase carousel
  - Client testimonial videos
  - Office virtual tours
- **Layout**: Full-width story sections
- **Animations**: Scroll-triggered reveals

### 6. **Location/City Pages** - "The Local Landing"

**Purpose**: Local SEO, establish local presence
**Visual Identity**: Community-focused, accessible

#### Design Elements:

- **Hero**: City skyline or courthouse image
- **Header**: Standard header with location indicator
- **Color Scheme**:
  - Background: Light theme for approachability
  - Accent: Primary gold
  - Map integration colors
- **Typography**:
  - Local keywords emphasized
  - Address/contact prominent
- **Unique Features**:
  - Interactive map
  - Local courthouse directory
  - Parking information
  - Public transport guide
  - Local language preferences
- **Layout**: Information-dense but organized
- **Animations**: Map interactions only

### 7. **Contact Page** - "The Conversion Point"

**Purpose**: Convert visitors to leads
**Visual Identity**: Simple, urgent, accessible

#### Design Elements:

- **Hero**: Minimal or none - form is the hero
- **Header**: Standard header
- **Color Scheme**:
  - Background: Split screen - dark/light
  - Form: High contrast for accessibility
  - CTAs: Maximum contrast buttons
- **Typography**:
  - Large, clear form labels
  - Error messages in red
  - Success in green
- **Unique Features**:
  - Multi-step form option
  - Live chat integration
  - Appointment scheduler
  - Office hours display with timezone
  - Emergency contact prominent
- **Layout**: Form on left, contact info on right
- **Animations**: Form validation feedback

## Component Design Patterns

### Buttons

- **Primary CTA**: Gold background, black text, scale on hover
- **Secondary CTA**: Outline style, gold border
- **Emergency CTA**: Red background, white text, pulse animation
- **Chat CTA**: Floating with bubble animation

### Cards

- **Service Cards**: Glass morphism with gradient border
- **Team Cards**: Photo with overlay bio on hover
- **Blog Cards**: Clean with featured image
- **Testimonial Cards**: Quote style with client photo

### Navigation

- **Main Nav**: Horizontal with dropdowns
- **Mobile Nav**: Full-screen overlay with animations
- **Breadcrumbs**: Chevron separators
- **Language Toggle**: Flag icons or text

### Forms

- **Input Fields**: Dark theme with gold focus state
- **Validation**: Real-time with inline messages
- **Progress**: Multi-step with progress bar
- **Submit**: Loading state with spinner

## Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: 1024px - 1280px
- Wide: > 1280px

## Animation Guidelines

- **Duration**: 200ms for micro, 400ms for macro
- **Easing**: ease-out for entrances, ease-in for exits
- **Performance**: Use transform and opacity only
- **Accessibility**: Respect prefers-reduced-motion

## Color Palette

```scss
// Primary
$gold: #c9974d;
$gold-light: #d4a574;
$gold-dark: #b8864c;

// Secondary
$burgundy: #6b1f2e;
$burgundy-light: #8b2635;
$burgundy-dark: #4b1520;

// Neutral
$black: #000000;
$neutral-950: #0a0a0a;
$neutral-900: #171717;
$gray-800: #262626;
$gray-600: #525252;
$gray-400: #a3a3a3;
$gray-200: #e5e5e5;
$white: #ffffff;

// Semantic
$error: #dc2626;
$warning: #f59e0b;
$success: #10b981;
$info: #188bf6;
```

## Typography Scale

```scss
// Font Family
$font-primary: 'Inter', system-ui, sans-serif;
$font-heading: 'Poppins', sans-serif;
$font-mono: 'JetBrains Mono', monospace;

// Sizes
$text-xs: 0.75rem; // 12px
$text-sm: 0.875rem; // 14px
$text-base: 1rem; // 16px
$text-lg: 1.125rem; // 18px
$text-xl: 1.25rem; // 20px
$text-2xl: 1.5rem; // 24px
$text-3xl: 1.875rem; // 30px
$text-4xl: 2.25rem; // 36px
$text-5xl: 3rem; // 48px
$text-6xl: 3.75rem; // 60px
$text-7xl: 4.5rem; // 72px
```

## Implementation Priority

1. Update Home Page with new hero design
2. Standardize Practice Area pages with urgency-based themes
3. Create light theme variant for blog
4. Implement location page map features
5. Optimize contact page for conversions
6. Add animation library for consistent effects
