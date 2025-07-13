# SCHEMA MARKUP IMPLEMENTATION GUIDE

## 🚀 IMMEDIATE SCHEMA IMPLEMENTATIONS

### 1. ATTORNEY PAGES - Add Enhanced Attorney Schema

**File to update**: `/src/app/attorneys/[slug]/page.tsx`

```typescript
import Script from 'next/script';
import { generateEnhancedAttorneySchema } from '@/lib/seo/comprehensive-schema';

// In your attorney page component:
const attorneySchema = generateEnhancedAttorneySchema({
  name: attorney.name,
  slug: attorney.slug,
  jobTitle: attorney.title,
  image: attorney.image,
  email: attorney.email,
  education: attorney.education,
  knowsAbout: attorney.practiceAreas,
  memberOf: attorney.associations,
  award: attorney.awards,
  yearsExperience: attorney.experience,
  languages: ['English', 'Spanish'],
  barAdmissions: attorney.barAdmissions,
});

// Add before closing tag
<Script
  id="attorney-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(attorneySchema)
  }}
/>
```

### 2. PRACTICE AREA PAGES - Add Service & FAQ Schema

**Files to update**: All pages in `/src/app/practice-areas/`

```typescript
import { generateServiceSchema, generateEnhancedFAQSchema } from '@/lib/seo/comprehensive-schema';

const serviceSchema = generateServiceSchema({
  name: 'Immigration Law Services',
  description: 'Comprehensive immigration legal services...',
  provider: 'Vasquez Law Firm, PLLC',
  areaServed: ['North Carolina', 'South Carolina', 'Florida'],
  availableLanguages: ['English', 'Spanish'],
  url: 'https://www.vasquezlawnc.com/practice-areas/immigration',
  hasOfferCatalog: [
    { name: 'Green Card Applications', description: '...' },
    { name: 'Deportation Defense', description: '...' },
    // etc.
  ],
});

const faqSchema = generateEnhancedFAQSchema([
  {
    question: 'How long does it take to get a green card?',
    answer: 'The processing time for a green card varies...',
    category: 'Immigration Law',
  },
  // Add 5-10 FAQs per practice area
]);
```

### 3. LOCATION PAGES - Add Enhanced Local Business Schema

**Files to update**: All county and city pages

```typescript
import { generateEnhancedLocalBusinessSchema } from '@/lib/seo/comprehensive-schema';

const locationSchema = generateEnhancedLocalBusinessSchema({
  name: 'Vasquez Law Firm - Charlotte Office',
  address: {
    street: '4801 E Independence Blvd Suite 714',
    city: 'Charlotte',
    state: 'NC',
    zip: '28212',
  },
  phone: '+1-844-967-3536',
  geo: { lat: 35.2271, lng: -80.8431 },
  placeId: 'ChIJ_____', // Add real Google Place ID
  departments: [
    { name: 'Immigration Department', telephone: '+1-844-967-3536' },
    { name: 'Personal Injury Department', telephone: '+1-844-967-3536' },
  ],
  amenities: ['Wheelchair Accessible', 'Free Parking', 'Spanish Speaking Staff'],
  paymentAccepted: ['Cash', 'Check', 'Credit Card', 'Payment Plans'],
});
```

### 4. HOMEPAGE - Add WebSite, Organization & Review Schema

**File**: `/src/app/page.tsx`

```typescript
import {
  generateWebSiteSchema,
  organizationSchema,
  generateReviewSchema,
} from '@/lib/seo/comprehensive-schema';

const websiteSchema = generateWebSiteSchema();

const reviewsSchema = generateReviewSchema([
  {
    author: 'Maria G.',
    rating: 5,
    text: 'Best immigration lawyer in Charlotte! They helped me get my green card...',
    date: '2024-01-15',
    title: 'Life-changing legal help',
    source: 'Google Reviews',
  },
  // Add 10+ real reviews
]);

// Combine all homepage schemas
const homepageSchemas = [websiteSchema, organizationSchema, reviewsSchema];
```

### 5. CONTACT PAGE - Add ContactPage Schema

**File**: `/src/app/contact/page.tsx`

```typescript
import { generateContactPageSchema } from '@/lib/seo/comprehensive-schema';

const contactSchema = generateContactPageSchema();
```

### 6. ALL PAGES - Add BreadcrumbList Schema

**Component**: Create `/src/components/SEO/BreadcrumbSchema.tsx`

```typescript
import Script from 'next/script';
import { generateEnhancedBreadcrumbSchema } from '@/lib/seo/comprehensive-schema';

export function BreadcrumbSchema({ items }: { items: Array<{name: string, url: string}> }) {
  const schema = generateEnhancedBreadcrumbSchema(items);

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

## 📊 SCHEMA VALIDATION CHECKLIST

### Week 1 Implementation Priority:

- [ ] All 7 attorney pages have Attorney schema
- [ ] All 6 main practice areas have Service + FAQ schema
- [ ] Homepage has Organization + Review + WebSite schema
- [ ] All location pages have LocalBusiness schema
- [ ] BreadcrumbList on every page
- [ ] Contact page has ContactPage schema

### Week 2 Advanced Schemas:

- [ ] HowTo schema for "How to Apply for Green Card" page
- [ ] Event schema for free consultation events
- [ ] VideoObject schema for attorney introduction videos
- [ ] BlogPosting schema for all blog posts
- [ ] QAPage schema for specific legal questions
- [ ] CollectionPage schema for practice area hubs

## 🔍 TESTING YOUR SCHEMAS

1. **Google Rich Results Test**:

   - https://search.google.com/test/rich-results
   - Test each page type

2. **Schema Markup Validator**:

   - https://validator.schema.org/
   - Validate JSON-LD syntax

3. **Google Search Console**:
   - Monitor enhancement reports
   - Check for schema errors

## 💡 PRO TIPS FOR MAXIMUM IMPACT

1. **Use @id connections** - Link related schemas together:

   ```json
   "@id": "https://www.vasquezlawnc.com/#organization"
   ```

2. **Include images** in all schemas where possible

3. **Add Spanish language variants**:

   ```json
   "availableLanguage": ["English", "Spanish"]
   ```

4. **Update regularly** - Keep reviews, events, and content fresh

5. **Monitor competitors** - See what schemas they're using

## 🎯 EXPECTED RESULTS

- **Week 1**: Rich snippets start appearing
- **Week 2**: Featured snippets for FAQ content
- **Month 1**: Knowledge panel enhancements
- **Month 2**: Voice search improvements
- **Month 3**: Dominating SERP real estate

## 🚨 COMMON MISTAKES TO AVOID

1. **Don't duplicate** schemas on same page
2. **Don't use fake reviews** - Google will penalize
3. **Don't forget Spanish** schemas for /es/ pages
4. **Don't skip validation** - Invalid schema won't work
5. **Don't be generic** - Be specific with all properties

Remember: More schema = More SERP features = More clicks!
