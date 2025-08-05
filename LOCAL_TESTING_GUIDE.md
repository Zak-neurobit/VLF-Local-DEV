# Local Testing Guide - Vasquez Law Firm

## 🚀 Quick Start

### 1. Check System Status

```bash
node scripts/check-system-status.js
```

This will verify:

- Node.js version (18+)
- Required files present
- Database configuration
- API keys configured
- No Twilio references
- All features status

### 2. Run Comprehensive Test Suite

```bash
npm run test:local
```

This will:

- Start development server
- Test all 6,562+ pages for 404/500 errors
- Test all API endpoints
- Check static assets
- Verify performance
- Generate detailed report

### 3. Docker Testing (Optional)

```bash
npm run test:local:docker
```

Uses Docker for isolated testing environment.

## 📋 Available Test Commands

```bash
# System check
node scripts/check-system-status.js    # Verify environment

# Test commands
npm run test:local                      # Run full test suite
npm run test:local:docker              # Test with Docker
npm run test:comprehensive             # Alias for test:local

# Development with mocks
npm run mock:services                  # Start dev with mock services
npm run dev:docker                     # Start dev in Docker

# Individual test suites
npm run test                           # Unit tests
npm run test:e2e                       # E2E tests
npm run test:apis                      # API tests
npm run test:performance               # Performance tests
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` with:

```env
# Database (Required)
DATABASE_URL=your_neon_database_url

# Authentication (Required)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# OpenAI (Required)
OPENAI_API_KEY=your-key-here

# Google Maps (Required)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-key-here

# Optional Services (Use mocks if not provided)
RETELL_API_KEY=your-key-or-leave-empty
GHL_API_KEY=your-key-or-leave-empty

# Testing Configuration
USE_MOCKS=true                    # Use mock services
MOCK_REDIS=true                   # Use in-memory cache
```

### Mock Services

When `USE_MOCKS=true` or API keys are missing:

- **Retell AI**: Mock voice agent service
- **GoHighLevel**: Mock CRM/automation service
- **Redis**: Always uses MockRedis (in-memory)

## 📊 Test Results

After running tests, check:

- `test-results.log` - Detailed test output
- `test-report.json` - Structured test results

### Understanding Results

```
✅ Passed: All pages/APIs working correctly
❌ Failed: 404/500 errors found
⚠️ Warnings: Non-critical issues (slow pages, etc.)
```

## 🚨 Common Issues

### 1. Database Connection Failed

```bash
# Check DATABASE_URL is set correctly
# Ensure it includes ?sslmode=require for Neon
```

### 2. Missing API Keys

```bash
# Required: OPENAI_API_KEY, NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
# Optional: Others will use mocks
```

### 3. Port Already in Use

```bash
# Kill existing process on port 3000
lsof -ti:3000 | xargs kill -9
```

### 4. Memory Issues

```bash
# Increase Node memory
NODE_OPTIONS="--max-old-space-size=8192" npm run test:local
```

## 🎯 Testing Checklist

Before deployment, ensure:

- [ ] All pages load without 404/500 errors
- [ ] API endpoints respond correctly
- [ ] Static assets load properly
- [ ] Performance is acceptable (<3s load time)
- [ ] No console errors in browser
- [ ] WebSocket connections work
- [ ] AI features respond (chat, voice)
- [ ] News ticker updates
- [ ] Language switching works
- [ ] Forms submit correctly

## 🔄 Continuous Testing

For development:

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Start CrewAI agents
npm run crews:start

# Terminal 3: Start news monitor
npm run news:monitor

# Terminal 4: Run tests periodically
watch -n 300 npm run test:local
```

## 📈 Performance Targets

- Page Load: <3 seconds
- API Response: <500ms
- WebSocket Latency: <100ms
- Memory Usage: <2GB
- CPU Usage: <50%

## 🐛 Debugging

Enable debug logs:

```bash
DEBUG=* npm run test:local
```

Check specific components:

```bash
# Test only APIs
npm run test:apis

# Test only database
npm run test:db

# Test only Redis
npm run test:redis
```

## ✅ Ready for Production

When all tests pass:

1. No 404/500 errors
2. All APIs responding
3. Performance within limits
4. No memory leaks
5. All features working

You're ready to deploy to AWS!
