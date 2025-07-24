# Winston Logger Setup Guide

## Overview

This project uses Winston for comprehensive logging on the server-side. Winston provides structured logging with multiple transports, log levels, and formatting options.

## Known Issues & Solutions

### Missing @dabh/diagnostics Error

If you encounter the error:
```
Error: Cannot find module '@dabh/diagnostics'
```

This is because Winston 3.x has peer dependencies that may not be automatically installed.

### Quick Fix

Run the following command:
```bash
npm run fix:winston
```

This will automatically install all required Winston dependencies.

### Manual Fix

If the automatic fix doesn't work, manually install the dependencies:

```bash
npm install @dabh/diagnostics@^2.0.2 @colors/colors@^1.6.0 logform@^2.7.0 winston-transport@^4.9.0 triple-beam@^1.3.0
```

### Complete Reinstall

For persistent issues, perform a clean install:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Diagnostic Tools

### Check Winston Status
```bash
npm run diagnose:winston
```

This will:
- Check all Winston dependencies
- Verify package.json entries
- Test Winston functionality
- Provide specific recommendations

### Fix Winston Dependencies
```bash
npm run fix:winston
```

This will:
- Detect missing dependencies
- Install them automatically
- Verify the installation

## How It Works

1. **Safe Winston Wrapper** (`src/lib/logger/winston-safe.ts`)
   - Safely loads Winston with error handling
   - Falls back to console logging if Winston fails
   - Prevents application crashes due to missing dependencies

2. **Main Logger** (`src/lib/logger/index.ts`)
   - Uses the safe wrapper to create loggers
   - Provides specialized loggers (API, Security, Performance, etc.)
   - Works on both server and client (different implementations)

3. **Automatic Fixes**
   - `postinstall` script runs after `npm install`
   - Ensures Winston dependencies are always present
   - Runs alongside Prisma generation

## Production Deployment

For production deployments:

1. All dependencies are explicitly listed in package.json
2. The postinstall script ensures proper setup
3. The safe wrapper prevents runtime errors

## Logging Best Practices

1. **Use appropriate log levels:**
   - `error`: For errors that need immediate attention
   - `warn`: For warnings and potential issues
   - `info`: For general information
   - `debug`: For debugging (development only)

2. **Use specialized loggers:**
   ```typescript
   import { apiLogger, securityLogger, performanceLogger } from '@/lib/logger';
   
   // API logging
   const requestId = apiLogger.request('/api/users', 'GET');
   apiLogger.response(requestId, 200, 125);
   
   // Security logging
   securityLogger.authenticationSuccess('oauth', userId);
   
   // Performance logging
   performanceLogger.slowOperation('database-query', 1500, 1000);
   ```

3. **Include context:**
   - Always include relevant metadata
   - Use request IDs for tracing
   - Include user IDs for user-specific issues

## Troubleshooting

### Issue: Winston works locally but not in production

**Solution:** Ensure all Winston dependencies are in `dependencies`, not `devDependencies`.

### Issue: Logs not appearing

**Check:**
1. Log level (development vs production)
2. Transport configuration
3. File permissions for log files

### Issue: Performance impact

**Solution:** 
- Use appropriate log levels
- Implement log sampling for high-traffic routes
- Use async transports for file logging

## Support

If you continue to experience issues:

1. Run `npm run diagnose:winston`
2. Check the output for specific errors
3. Follow the recommended fixes
4. If issues persist, check Node.js and npm versions