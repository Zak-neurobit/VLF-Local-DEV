# 🚀 Quick Guide: Migrate VLF Old Site Content

## Overview

This guide will help you extract, enhance, and migrate all content from your old Vasquez Law Firm website to the new modern site with improved SEO.

## Step 1: Extract Content from Old Site

```bash
node scripts/extract-old-site-content.js
```

This will:

- Extract all HTML content from the old site
- Convert to structured JSON format
- Preserve SEO metadata
- Save to `content-import/old-site/`

## Step 2: Enhance Content with SEO

```bash
node scripts/enhance-content-seo.js
```

This will:

- Add schema markup (Attorney, LegalService, LocalBusiness)
- Improve meta descriptions
- Add FAQ sections
- Generate SEO scores
- Save to `content-import/enhanced/`

## Step 3: Generate New Pages

```bash
node scripts/generate-enhanced-pages.js
```

This will:

- Create new Next.js pages from enhanced content
- Apply modern design
- Add interactive features
- Implement AI chat integration

## Step 4: Validate and Deploy

```bash
# Test locally
npm run dev

# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod
```

## 📊 What Gets Migrated

### Content Types:

- ✅ Attorney profiles (5 attorneys)
- ✅ Practice area pages (5 main + sub-pages)
- ✅ Location pages (6 offices)
- ✅ Blog posts (bilingual)
- ✅ Contact forms
- ✅ Spanish translations

### SEO Enhancements:

- ✅ Schema markup for all pages
- ✅ Optimized meta descriptions
- ✅ FAQ sections with schema
- ✅ Breadcrumb navigation
- ✅ Internal linking structure
- ✅ Image optimization with alt text

### Modern Features Added:

- ✅ AI-powered chat widget
- ✅ Voice agent integration
- ✅ GHL lead capture
- ✅ Mobile-first responsive design
- ✅ Performance optimizations
- ✅ Accessibility compliance

## 🎯 Expected Results

### Before Migration:

- Basic WordPress site
- Limited SEO optimization
- No schema markup
- Generic meta descriptions
- No AI features

### After Migration:

- Modern Next.js site
- Full SEO optimization
- Rich schema markup
- Custom meta descriptions
- AI chat & voice agents
- 95+ Lighthouse score

## ⚠️ Important Notes

1. **Backup First**: The migration doesn't modify the old site, but keep a backup
2. **Test Thoroughly**: Review all migrated content before going live
3. **301 Redirects**: Set up redirects from old URLs to new ones
4. **Update DNS**: Point domain to new Vercel deployment
5. **Monitor Analytics**: Track traffic during transition

## 🔧 Troubleshooting

### "Old site directory not found"

- Ensure the old site is at: `/Users/williamvasquez/Documents/vlf old site/www.vasquezlawnc.com/`

### "Module not found"

```bash
npm install
```

### "Permission denied"

```bash
chmod +x scripts/*.js
```

## 📈 Post-Migration Checklist

- [ ] All pages migrated successfully
- [ ] Forms working with GHL integration
- [ ] Spanish content properly translated
- [ ] Images optimized and loading
- [ ] Schema markup validates
- [ ] Mobile responsive tested
- [ ] Page speed < 3 seconds
- [ ] 301 redirects configured
- [ ] Google Search Console updated
- [ ] Analytics tracking migration

---

**Ready to start?** Run the first command above to begin the migration!
