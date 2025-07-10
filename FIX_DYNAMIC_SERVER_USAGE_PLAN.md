# Dynamic Server Usage Fix Implementation Plan

## Overview
34 API routes need to be fixed by adding `export const dynamic = 'force-dynamic'` to handle dynamic server features properly.

## Grouped Routes by Directory

### Group 1: Admin & Monitoring Routes (5 routes)
- `/api/admin/cache/route.ts`
- `/api/agents/health/route.ts`
- `/api/agents/lead-validation/route.ts`
- `/api/agents/monitor/route.ts`
- `/api/dashboard/metrics/route.ts`

### Group 2: Analytics Routes (3 routes)
- `/api/analytics/blog-reading/route.ts`
- `/api/analytics/blog-share/route.ts`
- `/api/analytics/blog/route.ts`

### Group 3: Blog Routes (6 routes)
- `/api/blog/[slug]/route.ts`
- `/api/blog/import/route.ts`
- `/api/blog/latest/route.ts`
- `/api/blog/route.ts`
- `/api/blog/rss/route.ts`
- `/api/blog/sitemap/route.ts`

### Group 4: CrewAI Routes (8 routes)
- `/api/crewai/appointment-scheduling/route.ts`
- `/api/crewai/client-intake/route.ts`
- `/api/crewai/competitive-analysis/route.ts`
- `/api/crewai/document-analysis/route.ts`
- `/api/crewai/intake/route.ts`
- `/api/crewai/legal-consultation/route.ts`
- `/api/crewai/seo-blog-generation/route.ts`
- `/api/crewai/social-media-monitoring/route.ts`

### Group 5: Crew Management Routes (4 routes)
- `/api/crews/health/route.ts`
- `/api/crews/logs/route.ts`
- `/api/crews/metrics/route.ts`
- `/api/crews/status/route.ts`

### Group 6: Payment & Integration Routes (6 routes)
- `/api/payment/authorize-net/route.ts`
- `/api/payment/lawpay/route.ts`
- `/api/payments/route.ts`
- `/api/ghl/send-sms/route.ts`
- `/api/ghl/trigger-call/route.ts`
- `/api/retell/agents/route.ts`
- `/api/retell/phone-numbers/route.ts`

### Group 7: Other Routes (11 routes)
- `/api/auth/session/route.ts`
- `/api/cases/[caseId]/route.ts`
- `/api/cases/recent-wins/route.ts`
- `/api/cases/route.ts`
- `/api/chat/route.ts`
- `/api/contact/route.ts`
- `/api/content-factory/calendar/route.ts`
- `/api/content-factory/generate/route.ts`
- `/api/content-factory/performance/route.ts`
- `/api/leads/capture/route.ts`
- `/api/location/route.ts`
- `/api/newsletter/route.ts`
- `/api/resources/download/[resourceId]/route.ts`
- `/api/reviews/recent/route.ts`
- `/api/reviews/route.ts`
- `/api/seo-domination/agents/route.ts`
- `/api/seo-domination/route.ts`
- `/api/sitemap/route.ts`
- `/api/webhooks/ghl/route.ts`
- `/api/webhooks/retell/route.ts`
- `/api/webhooks/socket/route.ts`
- `/api/webhooks/stripe/route.ts`

## Implementation Steps

### Step 1: Create Automated Fix Script

```typescript
// scripts/fix-dynamic-server-usage.ts
import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import path from 'path';

const DYNAMIC_EXPORT = "export const dynamic = 'force-dynamic';\n";

async function fixDynamicServerUsage() {
  const routes = [
    // List all 34 routes here
  ];

  let fixedCount = 0;
  let errorCount = 0;

  for (const routePath of routes) {
    try {
      const fullPath = path.join(process.cwd(), routePath);
      let content = readFileSync(fullPath, 'utf-8');
      
      // Check if already has the export
      if (content.includes("export const dynamic")) {
        console.log(`✅ Already fixed: ${routePath}`);
        continue;
      }

      // Find the right place to insert (after imports)
      const importEndIndex = findLastImportIndex(content);
      
      if (importEndIndex === -1) {
        // No imports, add at the beginning
        content = DYNAMIC_EXPORT + '\n' + content;
      } else {
        // Add after imports
        const beforeImports = content.substring(0, importEndIndex);
        const afterImports = content.substring(importEndIndex);
        content = beforeImports + '\n' + DYNAMIC_EXPORT + afterImports;
      }

      writeFileSync(fullPath, content);
      console.log(`✅ Fixed: ${routePath}`);
      fixedCount++;
    } catch (error) {
      console.error(`❌ Error fixing ${routePath}:`, error);
      errorCount++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`✅ Fixed: ${fixedCount} files`);
  console.log(`❌ Errors: ${errorCount} files`);
}

function findLastImportIndex(content: string): number {
  const lines = content.split('\n');
  let lastImportIndex = -1;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('import ') || line.startsWith('export * from') || line.startsWith('export { ')) {
      lastImportIndex = content.indexOf('\n', content.indexOf(lines[i])) + 1;
    } else if (line !== '' && !line.startsWith('//')) {
      // First non-import, non-comment, non-empty line
      break;
    }
  }
  
  return lastImportIndex;
}

// Run the script
fixDynamicServerUsage().catch(console.error);
```

### Step 2: Manual Fix Pattern

For each route file, add this line after the imports:

```typescript
export const dynamic = 'force-dynamic';
```

Example transformation:

**Before:**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function GET(request: NextRequest) {
  // ... route logic
}
```

**After:**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // ... route logic
}
```

### Step 3: Routes Requiring Special Handling

1. **Authentication Routes** (`/api/auth/session/route.ts`)
   - Already has dynamic rendering configured
   - Verify it's working correctly

2. **Webhook Routes** (stripe, retell, ghl)
   - These should remain dynamic for real-time processing
   - Ensure proper signature verification

3. **Static Routes** (robots, sitemap)
   - Consider if these actually need dynamic rendering
   - May benefit from static generation instead

### Step 4: Testing Strategy

1. **Unit Testing**
   ```bash
   # Test each route group
   npm test -- --testPathPattern="api/admin"
   npm test -- --testPathPattern="api/analytics"
   # ... continue for each group
   ```

2. **Integration Testing**
   ```bash
   # Create test script to verify all routes
   npm run test:api-routes
   ```

3. **Build Verification**
   ```bash
   # Full build to catch any issues
   npm run build
   
   # Check for dynamic server usage warnings
   npm run build 2>&1 | grep -i "dynamic"
   ```

4. **Manual Testing Checklist**
   - [ ] Admin routes with authentication
   - [ ] Analytics tracking endpoints
   - [ ] Blog API with query parameters
   - [ ] CrewAI workflow endpoints
   - [ ] Payment processing routes
   - [ ] Webhook endpoints

### Step 5: Deployment Strategy

1. **Pre-deployment**
   - Run full test suite
   - Verify no build warnings
   - Check all routes locally

2. **Staged Deployment**
   - Deploy to staging environment first
   - Run smoke tests
   - Monitor for errors

3. **Production Deployment**
   - Deploy during low-traffic period
   - Monitor error rates
   - Be ready to rollback if needed

## Quick Reference

### Routes to Fix (Copy for script):
```javascript
const routes = [
  'src/app/api/admin/cache/route.ts',
  'src/app/api/agents/health/route.ts',
  'src/app/api/agents/lead-validation/route.ts',
  'src/app/api/agents/monitor/route.ts',
  'src/app/api/analytics/blog-reading/route.ts',
  'src/app/api/analytics/blog-share/route.ts',
  'src/app/api/analytics/blog/route.ts',
  'src/app/api/auth/session/route.ts',
  'src/app/api/blog/[slug]/route.ts',
  'src/app/api/blog/import/route.ts',
  'src/app/api/blog/latest/route.ts',
  'src/app/api/blog/route.ts',
  'src/app/api/blog/rss/route.ts',
  'src/app/api/blog/sitemap/route.ts',
  'src/app/api/cases/[caseId]/route.ts',
  'src/app/api/cases/recent-wins/route.ts',
  'src/app/api/cases/route.ts',
  'src/app/api/chat/route.ts',
  'src/app/api/contact/route.ts',
  'src/app/api/content-factory/calendar/route.ts',
  'src/app/api/content-factory/generate/route.ts',
  'src/app/api/content-factory/performance/route.ts',
  'src/app/api/crewai/appointment-scheduling/route.ts',
  'src/app/api/crewai/client-intake/route.ts',
  'src/app/api/crewai/competitive-analysis/route.ts',
  'src/app/api/crewai/document-analysis/route.ts',
  'src/app/api/crewai/intake/route.ts',
  'src/app/api/crewai/legal-consultation/route.ts',
  'src/app/api/crewai/seo-blog-generation/route.ts',
  'src/app/api/crewai/social-media-monitoring/route.ts',
  'src/app/api/crews/health/route.ts',
  'src/app/api/crews/logs/route.ts',
  'src/app/api/crews/metrics/route.ts',
  'src/app/api/crews/status/route.ts',
  'src/app/api/dashboard/metrics/route.ts',
  'src/app/api/ghl/send-sms/route.ts',
  'src/app/api/ghl/trigger-call/route.ts',
  'src/app/api/leads/capture/route.ts',
  'src/app/api/location/route.ts',
  'src/app/api/newsletter/route.ts',
  'src/app/api/payment/authorize-net/route.ts',
  'src/app/api/payment/lawpay/route.ts',
  'src/app/api/payments/route.ts',
  'src/app/api/resources/download/[resourceId]/route.ts',
  'src/app/api/retell/agents/route.ts',
  'src/app/api/retell/phone-numbers/route.ts',
  'src/app/api/reviews/recent/route.ts',
  'src/app/api/reviews/route.ts',
  'src/app/api/seo-domination/agents/route.ts',
  'src/app/api/seo-domination/route.ts',
  'src/app/api/sitemap/route.ts',
  'src/app/api/webhooks/ghl/route.ts',
  'src/app/api/webhooks/retell/route.ts',
  'src/app/api/webhooks/socket/route.ts',
  'src/app/api/webhooks/stripe/route.ts'
];
```

### Fix Command (one-liner for each file):
```bash
# Example for a single file
sed -i '' '/^import.*from/a\
\
export const dynamic = '\''force-dynamic'\'';
' src/app/api/admin/cache/route.ts
```

## Estimated Time

- Script creation and testing: 30 minutes
- Running automated fixes: 5 minutes
- Manual verification: 20 minutes
- Testing all routes: 30 minutes
- Total: ~1.5 hours

## Success Criteria

1. No more dynamic server usage warnings in build
2. All API routes function correctly
3. No performance degradation
4. All tests pass
5. No new errors in production logs