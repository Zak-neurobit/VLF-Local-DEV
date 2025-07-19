# Development Server Troubleshooting Guide

## Current Issues

1. **Server starts but doesn't accept connections**
   - Next.js reports "Ready" but curl/browser can't connect
   - No process is listening on the reported port

2. **Worker thread errors (FIXED)**
   - Fixed by updating webpack config to handle pino logger properly

3. **TypeScript errors (FIXED)**
   - Fixed type assertions in GoHighLevel and Retell services
   - Fixed Google Maps namespace errors

## Recommended Solutions

### Option 1: Use Node.js LTS Version (Recommended)

Your current Node.js v22 is very new and may have compatibility issues.

```bash
# Install Node Version Manager (nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node.js LTS
nvm install --lts
nvm use --lts

# Verify version (should be v20.x.x)
node -v

# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Option 2: Check macOS Firewall Settings

```bash
# Check if firewall is blocking connections
sudo pfctl -s all | grep "block"

# Check System Preferences > Security & Privacy > Firewall
# Make sure Node.js is allowed to accept incoming connections
```

### Option 3: Use Docker (Most Reliable)

Create a Dockerfile for consistent environment:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

Then run:

```bash
docker build -t vlf-website .
docker run -p 3000:3000 vlf-website
```

### Option 4: Production Build Test

Since the build succeeds, try running the production build:

```bash
npm run build
npm start
```

## Immediate Workaround

For now, you can deploy to Vercel for testing:

```bash
npx vercel --prod
```

## Debug Commands

```bash
# Check what's blocking port 3000
lsof -i :3000

# Test basic Node.js server
node -e "require('http').createServer((req,res)=>{res.end('test')}).listen(3000,()=>console.log('Test server on 3000'))"

# Check Node.js network permissions
ls -la ~/Library/Application\ Support/com.apple.TCC/
```

## Next Steps

1. **Switch to Node.js LTS (v20)** - Most likely to solve the issue
2. **Test in Docker** - Provides consistent environment
3. **Deploy to Vercel** - Immediate way to see the site running
4. **Check macOS security settings** - Ensure Node.js can bind to ports

The codebase is now clean with all TypeScript errors fixed. The issue is environmental, not code-related.
