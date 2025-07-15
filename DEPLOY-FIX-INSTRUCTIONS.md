# VLF Website Deployment and Fix Instructions

## Overview

The `DEPLOY-AND-FIX-ALL.sh` script automates the entire deployment process, including:

- Backing up current work
- Cloning a fresh repository
- Applying API route fixes (OPTIONS handlers)
- Committing and pushing changes
- Testing the deployment

## Prerequisites

1. Git installed and configured
2. GitHub access to the repository
3. Node.js and npm installed
4. Terminal/command line access

## Usage

### Basic Usage

```bash
./DEPLOY-AND-FIX-ALL.sh
```

### Step-by-Step Instructions

1. **Open Terminal**

   ```bash
   cd /Users/williamvasquez/Documents/VLF\ Website
   ```

2. **Run the Script**

   ```bash
   ./DEPLOY-AND-FIX-ALL.sh
   ```

3. **Follow the Prompts**

   - If prompted for repository URL, enter the correct GitHub repository URL
   - If prompted for credentials, enter your GitHub username and password/token

4. **Monitor Progress**
   The script will show colored status updates:
   - 🔵 Blue: Status updates
   - ✅ Green: Success messages
   - ⚠️ Yellow: Warnings
   - ❌ Red: Errors

## What the Script Does

### 1. Backup Current Work

- Creates timestamped backup in `~/VLF_BACKUP_[timestamp]`
- Preserves the "Old site Brand guidelines and Vision" directory
- Excludes node_modules and build files

### 2. Clone Fresh Repository

- Creates new working directory `~/VLF_DEPLOY_[timestamp]`
- Clones the latest code from GitHub
- Prompts for repository URL if needed

### 3. Restore Preserved Files

- Copies back the "Old site Brand guidelines and Vision" directory
- Maintains any other preserved content

### 4. Apply API Fixes

- Adds OPTIONS handlers to all API routes
- Ensures proper CORS support
- Checks for existing handlers to avoid duplicates

### 5. Build and Test

- Installs dependencies
- Runs build process
- Captures build logs

### 6. Commit and Push

- Commits all changes with descriptive message
- Pushes to remote repository
- Handles authentication if needed

### 7. Deployment Verification

- Provides checklist for manual verification
- Opens Vercel dashboard (on macOS)

## Important Notes

### Repository URL

Update the `REPO_URL` variable in the script:

```bash
REPO_URL="https://github.com/williamvassquezv/vlf-website.git"
```

### Preserved Directory

The script automatically preserves:

- "Old site Brand guidelines and Vision" directory
- Any other files you specify

### Error Handling

- Script stops on any error
- Automatic cleanup on failure
- Detailed error messages with line numbers

### Backup Recovery

If you need to restore from backup:

```bash
cp -r ~/VLF_BACKUP_[timestamp]/* /path/to/destination/
```

## Troubleshooting

### Permission Denied

```bash
chmod +x DEPLOY-AND-FIX-ALL.sh
```

### Git Authentication Failed

- Use personal access token instead of password
- Check repository URL is correct
- Ensure you have push access

### Build Failures

- Check `build.log` in the working directory
- Verify all dependencies are listed in package.json
- Check for TypeScript errors

### CORS Still Not Working

After deployment, verify:

1. OPTIONS handlers are in all API routes
2. Vercel deployment completed
3. Test with actual CORS requests

## Post-Deployment Checklist

- [ ] Vercel deployment shows success
- [ ] All API endpoints respond to OPTIONS
- [ ] CORS headers are present in responses
- [ ] Website loads without errors
- [ ] Chat functionality works
- [ ] Forms submit successfully

## Support

If issues persist:

1. Check backup at `~/VLF_BACKUP_[timestamp]`
2. Review logs in working directory
3. Manually verify API route changes
4. Check Vercel deployment logs

## Manual API Fix Example

If you need to manually add OPTIONS to a route:

```typescript
// In any src/app/api/*/route.ts file

// CORS OPTIONS handler
export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
```
