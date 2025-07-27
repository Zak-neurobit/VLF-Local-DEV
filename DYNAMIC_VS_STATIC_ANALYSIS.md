# Dynamic vs Static Pages Analysis

## Current Dynamic Rendering Usage

### Pages Using Dynamic Features

1. **Blog Pages** (`/blog/page.tsx`, `/es/blog/page.tsx`)
   - Uses `revalidate = 3600` (ISR with 1 hour revalidation)
   - Can be converted to full static with build-time generation

2. **Attorney Pages** (`/attorneys/[slug]/page.tsx`)
   - Uses `revalidate = 86400` (ISR with 24 hour revalidation)
   - Already has `generateStaticParams` for build-time generation
   - Can be fully static

3. **Catch-All Page** (`/[...catchAll]/page.tsx`)
   - Dynamic by nature for handling 404s and redirects
   - Has async `generateMetadata` using headers
   - Should remain dynamic for proper error handling

4. **Admin Pages** (various admin routes)
   - Require authentication and real-time data
   - Should remain dynamic

5. **Portal Pages** (`/portal/*`, `/dashboard/*`)
   - User-specific content
   - Should remain dynamic

## Missing Pages Causing 404 Errors

### Immigration Routes (Missing)

- `/practice-areas/immigration/family-based` ❌ (exists but might have routing issue)
- `/practice-areas/immigration/humanitarian` ❌ (not found)

### Workers Compensation Routes (Inconsistent Naming)

- `/practice-areas/workers-compensation/workplace-accidents` ✅ (exists)
- `/practice-areas/workers-compensation/repetitive-stress-injuries` ❌ (directory is "repetitive-stress-carpal-tunnel")
- `/practice-areas/workers-compensation/construction-injuries` ❌ (directory is "construction-site-injuries")
- `/practice-areas/workers-compensation/occupational-illness` ❌ (directory is "occupational-diseases")
- `/practice-areas/workers-compensation/third-party-claims` ❌ (directory is "third-party-injury-claims")
- `/practice-areas/workers-compensation/denied-claims` ❌ (not found)
- `/practice-areas/workers-compensation/return-to-work` ❌ (not found)
- `/practice-areas/workers-compensation/disability-benefits` ❌ (not found)

### Criminal Defense Routes (Missing)

- `/practice-areas/criminal-defense/white-collar-crimes` ❌ (sitemap shows "white-collar")

### Blog Route (Missing)

- `/blog/immigration-update-fy25-q3-data-due` ❌ (handled by catch-all redirect)

## Pages That Can Be Converted to Static

### High Priority (Currently Using ISR)

1. **Blog Pages**
   - Remove `revalidate` export
   - Add `generateStaticParams` if using dynamic segments
   - Build all blog posts at build time

2. **Attorney Pages**
   - Remove `revalidate` export
   - Already has `generateStaticParams`
   - Fully static generation possible

3. **Practice Area Pages**
   - Most are already static
   - Ensure all have proper metadata generation

### Medium Priority

1. **Location Pages** (`/locations/*`)
   - Currently static
   - Verify all location variations are generated

2. **About/Contact Pages**
   - Already static
   - No changes needed

## Recommendations

### 1. Fix Missing Routes

Create redirects in `[...catchAll]/page.tsx` for:

```typescript
const redirects: Record<string, string> = {
  // ... existing redirects

  // Workers Comp fixes
  'repetitive-stress-injuries':
    '/practice-areas/workers-compensation/repetitive-stress-carpal-tunnel',
  'construction-injuries': '/practice-areas/workers-compensation/construction-site-injuries',
  'occupational-illness': '/practice-areas/workers-compensation/occupational-diseases',
  'third-party-claims': '/practice-areas/workers-compensation/third-party-injury-claims',

  // Criminal Defense fix
  'white-collar-crimes': '/practice-areas/criminal-defense/white-collar',
};
```

### 2. Create Missing Pages

- `/practice-areas/immigration/humanitarian`
- `/practice-areas/workers-compensation/denied-claims`
- `/practice-areas/workers-compensation/return-to-work`
- `/practice-areas/workers-compensation/disability-benefits`

### 3. Convert to Full Static

1. Remove `revalidate` from blog pages
2. Remove `revalidate` from attorney pages
3. Ensure all dynamic segments use `generateStaticParams`

### 4. Keep Dynamic

- Admin routes
- Portal/Dashboard routes
- API routes
- Catch-all error handler

## Build Performance Impact

Converting these pages to full static will:

- Reduce server load
- Improve TTFB (Time to First Byte)
- Enable better CDN caching
- Reduce build times for subsequent deployments (no ISR regeneration)

## Next Steps

1. Update redirects for URL inconsistencies
2. Create missing practice area pages
3. Remove ISR from blog and attorney pages
4. Test build with full static generation
5. Monitor 404 errors after deployment
