# How to Add Your Logo to Vasquez Law Website

## Step 1: Prepare Your Logo Files

### Recommended Logo Versions:

1. **Primary Logo** (full color) - `logo.png` or `logo.svg`
2. **White Logo** (for dark backgrounds) - `logo-white.png`
3. **Mobile Logo** (simplified/smaller) - `logo-mobile.png`
4. **Favicon** - `favicon.ico` (32x32px)

### Optimal Sizes:

- Desktop Logo: 200-300px width, 60-80px height
- Mobile Logo: 150px width, 40-50px height
- File size: Keep under 100KB for PNGs

## Step 2: Add Logo Files

Place your logo files in:

```
/public/images/logo.png
/public/images/logo-white.png
/public/images/logo-mobile.png
/public/favicon.ico
```

## Step 3: Update Header Component

### Option A: Logo with Text (Recommended)

```tsx
// In src/components/Header/index.tsx
<Link href="/" className="flex items-center space-x-3">
  <Image
    src="/images/logo.png"
    alt="Vasquez Law Firm Logo"
    width={50}
    height={50}
    className="h-12 w-auto"
    priority
  />
  <div>
    <h1 className="text-xl font-semibold text-gray-900">Vasquez Law Firm, PLLC</h1>
    <p className="text-sm text-[#188bf6] font-medium">YO PELEO POR TI™</p>
  </div>
</Link>
```

### Option B: Logo Only

```tsx
// In src/components/Header/index.tsx
<Link href="/" className="flex items-center">
  <Image
    src="/images/logo.png"
    alt="Vasquez Law Firm - YO PELEO POR TI™"
    width={200}
    height={60}
    className="h-14 w-auto"
    priority
  />
</Link>
```

### Option C: Responsive Logo (Desktop/Mobile)

```tsx
// In src/components/Header/index.tsx
<Link href="/" className="flex items-center">
  {/* Desktop Logo */}
  <Image
    src="/images/logo.png"
    alt="Vasquez Law Firm Logo"
    width={200}
    height={60}
    className="hidden sm:block h-14 w-auto"
    priority
  />
  {/* Mobile Logo */}
  <Image
    src="/images/logo-mobile.png"
    alt="Vasquez Law Firm Logo"
    width={150}
    height={40}
    className="sm:hidden h-10 w-auto"
    priority
  />
</Link>
```

## Step 4: Update Footer Logo

In `src/components/Footer/index.tsx`:

```tsx
<div>
  <Link href="/" className="inline-block mb-4">
    <Image
      src="/images/logo-white.png"
      alt="Vasquez Law Firm Logo"
      width={180}
      height={54}
      className="h-12 w-auto"
    />
  </Link>
  <p className="text-[#188bf6] font-semibold mb-4">{t.slogan}</p>
  <p className="text-gray-400 text-sm">
    {language === 'es'
      ? 'Más de 35 años de experiencia combinada luchando por los derechos de nuestros clientes.'
      : "Over 35 years of combined experience fighting for our clients' rights."}
  </p>
</div>
```

## Step 5: Add Favicon and Meta Images

In `src/app/layout.tsx`, the favicon is already configured:

```tsx
<link rel="icon" href="/favicon.ico" sizes="any" />
```

Add Open Graph image for social sharing:

1. Create a 1200x630px image
2. Save as `/public/og-image.jpg`
3. It's already referenced in the metadata

## Step 6: Logo Design Tips for Law Firms

### If You Need to Create a Logo:

1. **Professional Colors**: Stick to your brand colors (#188bf6 blue)
2. **Simple & Memorable**: Scales, gavel, or shield icons work well
3. **Include Firm Name**: "Vasquez Law Firm, PLLC"
4. **Tagline**: Consider including "YO PELEO POR TI™"

### Free Logo Tools:

- Canva (canva.com) - Has law firm templates
- LogoMakr (logomakr.com)
- Hatchful by Shopify

### Professional Options:

- Hire a designer on Fiverr/Upwork ($50-200)
- Use 99designs for logo contest ($299+)
- Local graphic designer ($500-2000)

## Example Implementation

After adding your logo file, uncomment and update in Header:

```tsx
<Link href="/" className="flex items-center">
  <Image
    src="/images/vasquez-law-logo.png"
    alt="Vasquez Law Firm - YO PELEO POR TI™"
    width={220}
    height={70}
    className="h-16 w-auto"
    priority
  />
</Link>
```

## Testing Your Logo

1. Check desktop view (should be clearly visible)
2. Check mobile view (not too large)
3. Test on both light and dark backgrounds
4. Verify it loads quickly (use WebP or optimized PNG)
5. Ensure alt text is descriptive for SEO

## Need Help?

If you need help implementing your logo or creating one, you can:

1. Share your logo file and I'll help implement it
2. Describe your vision and I'll suggest design options
3. Use the text-based logo for now and add an image later
