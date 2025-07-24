# Vercel Environment Variables Setup

## Required Environment Variables for Production

Add these to your Vercel project settings (Settings → Environment Variables):

### Database
```
DATABASE_URL=your_production_database_url
```

### Redis (Optional - will use in-memory if not provided)
```
REDIS_URL=your_redis_url
```

### Authentication
```
NEXTAUTH_URL=https://www.vasquezlawnc.com
NEXTAUTH_SECRET=your_generated_secret
```

### API Keys
```
OPENAI_API_KEY=your_openai_api_key
GOOGLE_MAPS_API_KEY=your_google_maps_key
```

### Production Flags
```
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://www.vasquezlawnc.com
NEXT_PUBLIC_BASE_URL=https://www.vasquezlawnc.com
```

## Mock Mode (For Testing Without Services)
```
USE_MOCK_PRISMA=false
MOCK_REDIS=false
```

## Important Notes:

1. **Database**: If you don't have a production database yet, you can temporarily use `USE_MOCK_PRISMA=true`
2. **Redis**: Not required - the app will use in-memory caching if Redis is not available
3. **OpenAI**: Required for SEO automation features
4. **Authentication**: Generate NEXTAUTH_SECRET with `openssl rand -base64 32`

## Deployment Checklist:

- [ ] Add all required environment variables in Vercel dashboard
- [ ] Ensure production database is accessible from Vercel
- [ ] Verify domain settings point to Vercel
- [ ] Check build logs for any errors
EOF < /dev/null