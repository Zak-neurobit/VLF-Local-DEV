# VLF Deployment Troubleshooting Guide

## Current Issues (July 4, 2025)

### 1. API Routes Returning Errors

- **Lead Validation**: 404/405 errors
- **Consultation/Appointment**: 500 errors
- **Main Site**: Working correctly ✅

### 2. Likely Causes

#### Database Connection Issues

The 500 errors suggest database connection problems. Check:

- [ ] DATABASE_URL environment variable in Vercel
- [ ] Prisma client generation in build
- [ ] Database SSL requirements

#### Environment Variables

Ensure ALL these are set in Vercel dashboard:

```
DATABASE_URL
GHL_API_KEY
GHL_LOCATION_ID
GHL_PIPELINE_ID
GHL_HOT_LEAD_CAMPAIGN_ID
GHL_WARM_LEAD_CAMPAIGN_ID
GHL_HOT_LEADS_STAGE_ID
GHL_WARM_LEADS_STAGE_ID
GHL_COLD_LEADS_STAGE_ID
GHL_INVALID_LEADS_STAGE_ID
OPENAI_API_KEY
MOCK_REDIS=true
```

### 3. Quick Fixes to Try

#### Option 1: Add Prisma Generate to Build

Update `package.json`:

```json
{
  "scripts": {
    "build": "prisma generate && next build"
  }
}
```

#### Option 2: Add postinstall Script

```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

#### Option 3: Check Database URL Format

PostgreSQL URL should be:

```
postgresql://user:password@host:port/database?sslmode=require
```

### 4. Debugging Steps

1. **Check Vercel Function Logs**

   ```bash
   vercel logs --follow
   ```

2. **Test Locally with Production ENV**

   ```bash
   npm run build
   npm start
   ```

3. **Verify Database Connection**
   ```bash
   npx prisma db push --skip-generate
   ```

### 5. Emergency Fixes

If API routes still fail:

1. **Simplify the Route** (Temporary)
   Create a test route without database:

   ```typescript
   export async function GET() {
     return NextResponse.json({ status: 'ok' });
   }
   ```

2. **Add Error Boundaries**
   Wrap database calls in try-catch with detailed logging

3. **Use Edge Runtime** (if needed)
   Add to route files:
   ```typescript
   export const runtime = 'edge';
   ```

### 6. Build Configuration

Ensure `vercel.json` includes:

```json
{
  "functions": {
    "src/app/api/agents/*/route.ts": {
      "maxDuration": 30
    }
  }
}
```

### 7. Next Steps

1. Check Vercel dashboard for:

   - Build logs
   - Function logs
   - Environment variables

2. If database issue:

   - Verify connection string
   - Check Prisma schema
   - Test with a simple query

3. If still failing:
   - Temporarily disable database calls
   - Add comprehensive logging
   - Deploy minimal version

## Contact for Help

- Vercel Support: https://vercel.com/support
- Check deployment at: https://vercel.com/[your-team]/vasquez-law-website
