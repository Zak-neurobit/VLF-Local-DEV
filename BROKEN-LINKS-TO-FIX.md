# Broken Links to Fix - Action List

## Spanish Navigation Links (MainNav.tsx - Lines 173-197)

**BROKEN → CORRECT**

```
/es/areas-de-practica/lesiones-personales/accidentes-auto
→ /es/areas-de-practica/lesiones-personales/accidentes-de-auto

/es/areas-de-practica/lesiones-personales/accidentes-camion
→ /es/areas-de-practica/lesiones-personales/accidentes-de-camion

/es/areas-de-practica/lesiones-personales/accidentes-motocicleta
→ /es/areas-de-practica/lesiones-personales/accidentes-de-motocicleta (CHECK IF EXISTS)

/es/areas-de-practica/lesiones-personales/accidentes-peatones
→ /es/areas-de-practica/lesiones-personales/accidentes-de-peatones (CHECK IF EXISTS)

/es/areas-de-practica/lesiones-personales/responsabilidad-locales
→ /es/areas-de-practica/lesiones-personales/responsabilidad-de-locales

/es/areas-de-practica/lesiones-personales/conductor-ebrio
→ /es/areas-de-practica/lesiones-personales/conductor-ebrio (CHECK IF EXISTS)
```

## English Practice Area Duplicates

**Choose ONE pattern and redirect the other:**

1. **Car Accidents**

   - Keep: `/practice-areas/personal-injury/car-auto-accidents`
   - Remove: `/practice-areas/personal-injury/car-accidents`

2. **Drunk Driving**

   - Keep: `/practice-areas/personal-injury/drunk-driver-liability`
   - Remove: `/practice-areas/personal-injury/drunk-driver-accidents`

3. **Pedestrian Accidents**
   - Keep: `/practice-areas/personal-injury/pedestrian-hit-by-car`
   - Remove: `/practice-areas/personal-injury/pedestrian-accidents`

## Non-Existent Location Service Pages

These links are being generated but pages don't exist:

```
/locations/nc/charlotte/immigration
/locations/nc/charlotte/personal-injury
/locations/nc/charlotte/criminal-defense
/locations/nc/charlotte/workers-compensation
```

**Solution:** Either create these pages OR update the link generation logic to point to:

```
/locations/nc/charlotte#immigration
/locations/nc/charlotte#personal-injury
etc.
```

## Files That Need Link Updates

### 1. MainNav.tsx (src/components/Navigation/MainNav.tsx)

- Fix all Spanish navigation links (lines 173-197)

### 2. Internal Linking Mesh (src/lib/seo/internal-linking-mesh.ts)

- Update practice area slugs to match actual pages
- Fix location service link generation (lines 110-111)

### 3. County Pages (100+ files)

All county pages have links to non-existent paths:

- They link to `/practice-areas/personal-injury/car-accidents`
- Should link to `/practice-areas/personal-injury/car-auto-accidents`

### 4. MegaFooterLinks.tsx

- Verify all footer links match actual pages

## Quick Fix Script

Create a script to batch update all broken links:

```bash
# Fix Spanish navigation links
find . -name "*.tsx" -exec sed -i '' 's|/accidentes-auto|/accidentes-de-auto|g' {} +
find . -name "*.tsx" -exec sed -i '' 's|/accidentes-camion|/accidentes-de-camion|g' {} +
find . -name "*.tsx" -exec sed -i '' 's|/responsabilidad-locales|/responsabilidad-de-locales|g' {} +

# Fix English car accidents links
find . -name "*.tsx" -exec sed -i '' 's|/car-accidents"|/car-auto-accidents"|g' {} +
```

## Validation Checklist

After fixes:

- [ ] All Spanish navigation links work
- [ ] No duplicate practice area pages
- [ ] All county pages link to correct URLs
- [ ] Footer links all resolve
- [ ] Near-me pages have incoming links
- [ ] Run link checker to verify no 404s
