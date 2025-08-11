# Aurora Effect for Hero Section

## What Was Added
- Beautiful animated Aurora effect using WebGL (OGL library)
- Smooth gradient transitions using Vasquez Law Firm brand colors
- Performance-optimized with lazy loading
- Easy toggle mechanism

## Brand Colors Used
- Start: `#6B1F2E` (Burgundy)
- Middle: `#C9974D` (Gold)
- End: `#8B2635` (Darker Burgundy)

## How to Toggle Aurora Effect

### Method 1: Environment Variable (Recommended)
Add to your `.env.local` file:
```
NEXT_PUBLIC_ENABLE_AURORA=true   # Enable Aurora
NEXT_PUBLIC_ENABLE_AURORA=false  # Disable Aurora
```

### Method 2: Component Prop
```tsx
<ModernHero language="en" enableAurora={true} />  // Enable
<ModernHero language="en" enableAurora={false} /> // Disable
```

### Method 3: Code Toggle
Edit `src/components/hero/ModernHero.tsx`:
```tsx
const ENABLE_AURORA = true;  // or false
```

## Files Created/Modified
1. `src/components/effects/Aurora.tsx` - Aurora effect component
2. `src/components/effects/Aurora.css` - Aurora styling
3. `src/components/hero/ModernHero.tsx` - Updated hero with Aurora

## How to Restore Original
Run the restore script:
```bash
cd Zak-backup/hero-aurora-2025-08-10
./restore.bat
```

Or manually copy:
```bash
cp Zak-backup/hero-aurora-2025-08-10/ModernHero.original.tsx src/components/hero/ModernHero.tsx
```

## Performance Notes
- Aurora uses WebGL for smooth performance
- Lazy loaded to not impact initial page load
- Respects prefers-reduced-motion for accessibility
- Automatically adjusts opacity for dark mode