# Quick Setup Guide for Vasquez Law Firm Website

## 🚀 Fastest Way to Get Started

### Option 1: Use Free Cloud Services (Recommended)

1. **Database**: Sign up for a free PostgreSQL database

   - [Supabase](https://supabase.com) - Free tier with 500MB
   - [Neon](https://neon.tech) - Free tier with 3GB
   - [Railway](https://railway.app) - $5 credit free trial

2. **Redis** (Optional): Sign up for free Redis hosting

   - [Upstash](https://upstash.com) - Free tier with 10k commands/day
   - [Redis Cloud](https://redis.com/try-free/) - 30MB free

3. **Update your .env file**:

```bash
# Example with Supabase
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres"

# Example with Upstash Redis
REDIS_URL="redis://default:[YOUR-PASSWORD]@[YOUR-ENDPOINT].upstash.io:6379"
```

4. **Run setup**:

```bash
npm install
npx prisma db push
npm run dev
```

### Option 2: Local Development (Requires Docker)

1. **Install Docker Desktop**:

   - [Mac/Windows](https://www.docker.com/products/docker-desktop)
   - Linux: `curl -fsSL https://get.docker.com | sh`

2. **Start services**:

```bash
docker compose up -d
```

3. **Run setup**:

```bash
npm install
npx prisma db push
npm run dev
```

## 🔑 Required API Keys

Add these to your `.env` file for full functionality:

### Essential (for core features):

- `OPENAI_API_KEY` - AI chat and document analysis
- `DATABASE_URL` - PostgreSQL connection string

### Optional (for additional features):

- `GHL_API_KEY` - GoHighLevel CRM integration
- `TWILIO_ACCOUNT_SID` & `TWILIO_AUTH_TOKEN` - SMS notifications
- `SMTP_*` - Email notifications
- `SENTRY_DSN` - Error tracking

## 📝 Environment File Template

Create a `.env` file in the root directory:

```env
# Database (use cloud service URL)
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OpenAI (required for AI features)
OPENAI_API_KEY="sk-..."

# Redis (optional, for caching)
REDIS_URL="redis://..."

# Add other API keys as needed...
```

## 🎯 Quick Test

After setup, test that everything works:

1. Visit http://localhost:3000
2. Click the chat widget in bottom-right
3. Try asking: "What services do you offer?"

## 🚨 Common Issues

**Database connection failed**

- Ensure your DATABASE_URL is correct
- For cloud databases, check if IP is whitelisted

**Build errors**

- Run `npm install` to ensure all dependencies are installed
- Run `npx prisma generate` if you see Prisma errors

**Port already in use**

- Kill existing process: `lsof -ti:3000 | xargs kill -9`
- Or use different port: `PORT=3001 npm run dev`

## 🆘 Need Help?

- Check the [full documentation](./README.md)
- View [environment setup details](./VERCEL_ENV_SETUP.md)
- Open an issue on GitHub
