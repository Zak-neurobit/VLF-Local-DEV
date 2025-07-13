# Global Template System Guide

## Overview

This guide ensures consistent template usage across all pages in the VLF Website. We've identified that many pages (especially blog posts) are not using the template system, causing maintenance issues and inconsistent user experience.

## Current State Analysis

### 📊 Page Distribution

- **Total Pages**: 752
- **Blog Posts**: 78+ (mostly without templates ❌)
- **Practice Areas**: 65 pages (using templates ✅)
- **Locations**: 275 pages (mixed template usage)
- **Spanish Pages**: 229 pages (mixed template usage)
- **Near-Me Pages**: 81 pages (mostly without templates ❌)

### 🚨 Critical Issues

1. **Blog posts** are implementing their own layouts
2. **Code duplication** across hundreds of pages
3. **Inconsistent styling** and user experience
4. **Maintenance nightmare** with changes requiring updates to each page

## Template Architecture

### Core Templates Available

```typescript
// Main layout wrapper
import { MasterLayout } from '@/design-system/templates/MasterLayout';

// Page-specific templates
import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';
import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { AttorneyPageTemplate } from '@/components/templates/AttorneyPageTemplate';
import { NearMeLandingPageTemplate } from '@/components/templates/NearMeLandingPageTemplate';
import { EnhancedTemplates } from '@/components/templates/EnhancedTemplates';
```

### Template Hierarchy

```
MasterLayout (Global wrapper)
  └─> Page Templates (Type-specific)
       └─> Content Components (Page content)
```

## Implementation Guide

### 1. Blog Posts (Highest Priority)

#### Current State (BAD ❌)

```typescript
// Individual blog post implementing everything
export default function BlogPostPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Custom hero section */}
      {/* Custom navigation */}
      {/* Article content */}
      {/* Custom footer */}
    </div>
  );
}
```

#### Desired State (GOOD ✅)

```typescript
import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';

export default function BlogPostPage() {
  const post = {
    title: 'Your Blog Title',
    content: 'Your content here',
    author: { name: 'Author Name' },
    publishedAt: new Date(),
    // ... other blog data
  };

  return (
    <BlogPageTemplate
      posts={[]}
      categories={[]}
      isArticlePage={true}
      currentPost={post}
      relatedPosts={[]}
    />
  );
}
```

### 2. Practice Area Pages

#### Template Usage

```typescript
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export default function ImmigrationPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="Immigration Law"
      heroTitle="Immigration Attorneys"
      urgencyLevel="high"
      services={[...]}
      faqs={[...]}
      testimonials={[...]}
      language="en"
    />
  );
}
```

### 3. Location Pages

#### Template Usage

```typescript
import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';

export default function CharlottePage() {
  return (
    <LocationPageTemplate
      city="Charlotte"
      state="NC"
      heroTitle="Charlotte Immigration Lawyers"
      practiceAreas={[...]}
      attorneys={[...]}
      officeInfo={{...}}
      language="en"
    />
  );
}
```

### 4. Attorney Profile Pages

#### Template Usage

```typescript
import { AttorneyPageTemplate } from '@/components/templates/AttorneyPageTemplate';

export default function AttorneyPage() {
  return (
    <AttorneyPageTemplate
      name="William Vasquez"
      title="Managing Attorney"
      bio="..."
      practiceAreas={[...]}
      education={[...]}
      barAdmissions={[...]}
    />
  );
}
```

## Migration Strategy

### Phase 1: Analysis and Planning

```bash
# Analyze current template usage
npm run analyze-templates

# Generate migration plan
npm run template-migration-plan
```

### Phase 2: Automated Migration

```bash
# Dry run to see what would change
npm run migrate-templates --dry-run

# Perform actual migration
npm run migrate-templates --migrate

# Migrate specific page types
npm run migrate-templates --type=blog
npm run migrate-templates --type=location
```

### Phase 3: Manual Review

1. Review migrated pages for content accuracy
2. Update page-specific data
3. Test functionality
4. Commit in batches

### Phase 4: Enforcement

1. Add ESLint rules to enforce template usage
2. Update development guidelines
3. Create page generators using templates

## Template Selection Guide

| Page Type         | Template to Use                 | Key Props                           |
| ----------------- | ------------------------------- | ----------------------------------- |
| Blog Posts        | `BlogPageTemplate`              | `currentPost`, `isArticlePage=true` |
| Practice Areas    | `ModernPracticeAreaTemplateV2`  | `practiceArea`, `urgencyLevel`      |
| Location Pages    | `LocationPageTemplate`          | `city`, `state`, `officeInfo`       |
| Attorney Profiles | `AttorneyPageTemplate`          | `name`, `bio`, `practiceAreas`      |
| Near-Me SEO       | `NearMeLandingPageTemplate`     | `service`, `location`               |
| General Pages     | `MasterLayout` + custom content | `variant`, `showBreadcrumbs`        |

## Benefits of Global Template Usage

### 1. **Consistency**

- Uniform look and feel across all pages
- Consistent navigation and footer
- Standardized SEO implementation

### 2. **Maintainability**

- Single source of truth for layouts
- Easy global updates
- Reduced code duplication

### 3. **Performance**

- Shared component caching
- Optimized bundle sizes
- Better code splitting

### 4. **Developer Experience**

- Clear patterns to follow
- Faster page creation
- Less decision fatigue

## Common Patterns

### Adding Custom Sections

```typescript
<BlogPageTemplate {...props}>
  {/* Additional custom content can be passed as children */}
  <CustomSection />
</BlogPageTemplate>
```

### Multi-language Support

```typescript
<ModernPracticeAreaTemplateV2
  {...props}
  language={locale === 'es' ? 'es' : 'en'}
/>
```

### Dynamic Data Loading

```typescript
export default async function BlogPostPage({ params }) {
  const post = await fetchBlogPost(params.slug);

  return (
    <BlogPageTemplate
      currentPost={post}
      isArticlePage={true}
    />
  );
}
```

## Monitoring Compliance

### Automated Checks

```typescript
// scripts/check-template-usage.ts
async function checkTemplateCompliance() {
  const pages = await glob('src/app/**/page.tsx');
  const nonCompliant = [];

  for (const page of pages) {
    const content = await fs.readFile(page, 'utf-8');
    if (!hasValidTemplate(content)) {
      nonCompliant.push(page);
    }
  }

  if (nonCompliant.length > 0) {
    console.error('Pages without templates:', nonCompliant);
    process.exit(1);
  }
}
```

### CI/CD Integration

```yaml
# .github/workflows/template-check.yml
- name: Check Template Usage
  run: npm run check-template-compliance
```

## Next Steps

1. **Immediate Actions**

   - Run template analysis
   - Prioritize blog post migration
   - Create backup of current pages

2. **Short Term** (1-2 weeks)

   - Migrate all blog posts
   - Update near-me pages
   - Standardize location pages

3. **Long Term** (1 month)
   - Complete all page migrations
   - Implement enforcement rules
   - Create page generators

## Support

For questions about template usage:

- Check existing implementations in `/src/app/practice-areas/`
- Review template props in `/src/components/templates/`
- Contact the development team

---

Remember: **Every page should use a template**. No exceptions!
