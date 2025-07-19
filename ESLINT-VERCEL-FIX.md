# ESLint Vercel Build Fix

## Problem

The Vercel build was failing with: `ESLint: Failed to load config 'next/core-web-vitals' to extend from`

## Root Cause

ESLint packages were in `devDependencies` instead of `dependencies`. Vercel by default only installs production dependencies during the build process, which meant `eslint-config-next` wasn't available.

## Solution Applied

### 1. Moved ESLint packages to dependencies

The following packages were moved from `devDependencies` to `dependencies`:

- `eslint@^8.56.0`
- `eslint-config-next@^14.2.30`
- `@typescript-eslint/eslint-plugin@^6.16.0`
- `@typescript-eslint/parser@^6.16.0`
- `eslint-config-prettier@^10.1.5`

### 2. Created vercel.json

Added a `vercel.json` file to ensure all dependencies are installed:

```json
{
  "installCommand": "npm install --production=false",
  "buildCommand": "npm run build",
  "framework": "nextjs"
}
```

### 3. Created fallback ESLint configuration

Created `.eslintrc.build.json` as a fallback that doesn't depend on Next.js specific configs.

## Files Modified

- `package.json` - Moved ESLint packages to dependencies
- `vercel.json` - Created to configure Vercel build
- `.eslintrc.build.json` - Created as fallback config
- `scripts/fix-eslint-deps.js` - Script to automate the fix
- `scripts/check-eslint-setup.js` - Script to verify setup
- `scripts/setup-eslint-for-build.js` - Script for dynamic config switching

## Verification Steps

1. Run `npm install` to update node_modules
2. Run `npm run lint` to verify ESLint works locally
3. Commit and push changes
4. Monitor Vercel build logs

## Alternative Solutions (if needed)

1. Set `VERCEL_INSTALL_COMMAND="npm install --production=false"` in Vercel environment variables
2. Use the `.eslintrc.build.json` by renaming it before build
3. Disable ESLint during builds with `eslint: { ignoreDuringBuilds: true }` in `next.config.js` (not recommended)

## Next Steps

1. Commit these changes
2. Push to trigger a new Vercel build
3. If the build still fails, check Vercel logs for any other missing dependencies
