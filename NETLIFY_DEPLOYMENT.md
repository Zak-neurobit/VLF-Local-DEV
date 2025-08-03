# Netlify Deployment Guide

## Overview

This guide covers deploying the Vasquez Law Firm website to Netlify with all 6,562+ static pages.

## Why Netlify?

- **Memory**: Up to 36GB on Enterprise plans (vs Vercel's 16GB limit)
- **Build Time**: Up to 2 hours (vs Vercel's 45 minutes)
- **Static Sites**: Better handling of large static sites
- **Cost**: $19/month Pro plan includes everything needed

## Setup Instructions

### 1. Install Netlify CLI

```bash
npm install -g netlify-cli
```

### 2. Login to Netlify

```bash
netlify login
```

### 3. Create New Site

```bash
netlify init
```

Choose:

- Create & configure a new site
- Team: Your team name
- Site name: vasquez-law-firm (or your preference)

### 4. Configure Environment Variables

In Netlify dashboard (app.netlify.com):

1. Go to Site Settings > Environment Variables
2. Add all variables from `.env.local`:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_APP_URL`
   - `NEXT_PUBLIC_GA_ID`
   - `NEXT_PUBLIC_GTM_ID`
   - etc.

### 5. Deploy

```bash
# Manual deploy
netlify deploy --prod

# Or push to git (auto-deploys)
git push origin main
```

## Build Configuration

The `netlify.toml` file is configured with:

- **Build command**: `npm run build:netlify`
- **Publish directory**: `out`
- **Node version**: 22.11.0
- **Memory**: 32GB (NODE_OPTIONS)
- **Next.js Plugin**: Handles static export

## Build Process

1. Generates Prisma client
2. Sets up Partytown for web workers
3. Builds with 32GB memory allocation
4. Exports all pages as static HTML

## Monitoring Builds

1. Go to app.netlify.com
2. Click on your site
3. View "Deploys" tab
4. Click on any deploy for logs

## Troubleshooting

### Build Timeout

If build exceeds 2 hours:

- Contact Netlify support for extended timeout
- Or upgrade to Enterprise plan

### Memory Issues

If still hitting memory limits:

- Ensure using `build:netlify` command
- Check NODE_OPTIONS is set to 32GB
- Consider splitting build into chunks

### 404 Errors

All pages are pre-generated, so there should be no 404s. If you see any:

1. Check the build logs
2. Verify all pages were generated
3. Check `out` directory locally

## Performance Optimization

Netlify automatically provides:

- Global CDN
- Automatic HTTPS
- HTTP/2 push
- Instant cache invalidation
- Brotli compression

## Custom Domain

1. Go to Domain Settings
2. Add custom domain: vasquezlawnc.com
3. Configure DNS:
   - Add Netlify's nameservers
   - Or use CNAME/A records

## Forms

Netlify can handle form submissions:

1. Add `data-netlify="true"` to forms
2. View submissions in Netlify dashboard
3. Set up notifications

## Future Migration to AWS

When ready to migrate to AWS S3 + CloudFront:

1. Run preparation script:

   ```bash
   node scripts/prepare-aws-deployment.js
   ```

2. Follow instructions in the script output

3. Use terraform to set up infrastructure:
   ```bash
   cd terraform
   terraform init
   terraform apply
   ```

## Support

- Netlify Docs: https://docs.netlify.com
- Support: https://www.netlify.com/support/
- Community: https://answers.netlify.com/
