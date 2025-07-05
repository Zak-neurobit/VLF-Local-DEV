# Direct Vercel Deployment Guide

This guide explains how to deploy the Vasquez Law Firm website directly to Vercel without relying on git push.

## Project Information

- **Project ID**: `prj_tlJJXr6A2jamXAQwAz2hPVciuScp`
- **Organization ID**: `team_ovuLTyYuuvgs2INJ1DelBxI4`
- **Production Domain**: https://www.vasquezlawnc.com

## Deployment Methods

### Method 1: Quick Deploy with Vercel CLI (Recommended)

The easiest way to deploy without git:

```bash
# Deploy to production
npm run deploy:trigger

# Or use the shell script directly
./scripts/deploy-direct.sh
```

This will:
1. Check if Vercel CLI is installed (install if needed)
2. Verify project is linked to Vercel
3. Deploy current state directly to Vercel
4. Bypass any git requirements with `--force` flag

### Method 2: Vercel API Deployment

For programmatic deployments using the Vercel API:

```bash
# First, get your Vercel token from https://vercel.com/account/tokens
export VERCEL_TOKEN=your-vercel-token

# Deploy using API
npm run deploy:api
```

### Method 3: Create a Deploy Hook

Create a webhook URL that can trigger deployments:

```bash
# Create deployment hook
VERCEL_TOKEN=your-token npm run deploy:hook
```

This creates a URL you can POST to anytime to trigger a deployment.

### Method 4: Manual Vercel CLI Commands

```bash
# Deploy to production (bypass git)
vercel --prod --force

# Create preview deployment
vercel --force

# Deploy with specific environment
vercel --force --env NODE_ENV=production
```

## Environment Variables

Vercel automatically uses environment variables configured in the dashboard. To update them:

1. Go to https://vercel.com/team_ovuLTyYuuvgs2INJ1DelBxI4/vasquez-law-website/settings/environment-variables
2. Add/update variables
3. Redeploy for changes to take effect

## Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All tests pass: `npm test`
- [ ] No linting errors: `npm run lint`
- [ ] Type checking passes: `npm run type-check`
- [ ] Build works locally: `npm run build`
- [ ] Environment variables are set in Vercel dashboard

## Deployment Scripts

### `scripts/deploy-direct.sh`
Interactive shell script that:
- Checks for Vercel CLI
- Verifies project linking
- Offers production/preview/dev deployment options
- Uses `--force` to bypass git

### `scripts/trigger-vercel-deployment.ts`
TypeScript deployment script with multiple options:
- `--cli`: Use Vercel CLI (default)
- `--api`: Use Vercel API (requires VERCEL_TOKEN)
- `--hook`: Create deployment webhook

## Troubleshooting

### "Project not linked" error
```bash
vercel link
# Follow prompts to link to existing project
```

### "No git repository" error
Use the `--force` flag:
```bash
vercel --prod --force
```

### API deployment fails
1. Ensure VERCEL_TOKEN is valid
2. Check token has proper permissions
3. Verify project/org IDs are correct

### Build fails on Vercel
1. Check build logs in Vercel dashboard
2. Ensure all environment variables are set
3. Verify `NODE_OPTIONS=--max-old-space-size=4096` is set in build env

## Monitoring Deployments

1. **Vercel Dashboard**: https://vercel.com/team_ovuLTyYuuvgs2INJ1DelBxI4/vasquez-law-website
2. **Deployment List**: Check recent deployments and their status
3. **Function Logs**: Monitor API routes and serverless functions
4. **Analytics**: Track performance and usage

## Post-Deployment

After deployment:

1. **Verify Production Site**: https://www.vasquezlawnc.com
2. **Test Critical Features**:
   - Contact forms
   - Chat widget
   - Phone click-to-call
   - Language switching
   - API endpoints
3. **Check Performance**: Run Lighthouse audit
4. **Monitor Errors**: Check Sentry dashboard

## Emergency Rollback

If deployment causes issues:

1. Go to Vercel dashboard
2. Find previous working deployment
3. Click "..." menu → "Promote to Production"
4. Previous version is instantly restored

## Automation Options

### GitHub Actions (without git push)
Create `.github/workflows/deploy.yml`:
```yaml
name: Manual Deploy
on:
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-args: '--prod --force'
```

### Cron Deployment
Add to crontab for scheduled deployments:
```bash
0 2 * * * cd /path/to/project && npm run deploy:trigger
```

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Support**: https://vercel.com/support
- **Status**: https://www.vercel-status.com