# Template Migration Action Plan 🚀

## Current Status

- ✅ First batch of 10 files migrated successfully
- ✅ Template system is working correctly
- ⏳ 512 more files need migration

## How to Complete the Migration

### Step 1: Continue Batch Migration

Run the batch migration script repeatedly to process all files:

```bash
# Run the next batch of 10 files
npx tsx scripts/migrate-batch.ts

# Keep running until all files are migrated
# The script processes 10 files at a time to avoid errors
```

### Step 2: Review and Update Content

After migration, each file will have TODO comments that need to be addressed:

1. **Extract actual content** from the backup files
2. **Update practice areas** (immigration, personal-injury, etc.)
3. **Add proper tags** for SEO
4. **Set correct publish dates**
5. **Add related posts** for better navigation

### Step 3: Verify Template Usage

Check that pages are rendering correctly:

```bash
# Start development server
npm run dev

# Visit a migrated page
# e.g., http://localhost:3000/winston-salem
```

### Step 4: Clean Up

Once verified, remove backup files:

```bash
# Remove all backup files
find . -name "*.tsx.backup" -delete
```

## Quick Commands

### Migrate All Blog Posts (in batches)

```bash
# Run this multiple times until all are done
for i in {1..50}; do
  echo "Running batch $i..."
  npx tsx scripts/migrate-batch.ts
  sleep 2
done
```

### Check Migration Progress

```bash
# See how many files still need migration
npx tsx scripts/apply-templates-globally.ts --analyze
```

### Test a Single Page

```bash
# Run dev server and check specific page
npm run dev
# Visit: http://localhost:3000/[page-name]
```

## Priority Order

1. **Blog Posts** (191 files) - Highest impact
2. **Location Pages** (259 files) - SEO critical
3. **Near-Me Pages** (81 files) - Local SEO
4. **Practice Area Pages** (49 files) - Core services
5. **Other Pages** - Lower priority

## Benefits After Migration

- ✅ **Consistent design** across all pages
- ✅ **Easier maintenance** - update template once, affects all pages
- ✅ **Better SEO** - structured data and consistent markup
- ✅ **Improved performance** - shared components are cached
- ✅ **Reduced code size** - no more duplicate implementations

## Next Steps

1. Continue running `npx tsx scripts/migrate-batch.ts`
2. Update content in migrated files
3. Test pages in development
4. Deploy once satisfied

## Need Help?

- Check migrated examples in `/src/app/7-proven-strategies.../`
- Review template docs in `/docs/GLOBAL-TEMPLATE-SYSTEM.md`
- Original files are backed up as `.tsx.backup`
