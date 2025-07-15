# Vasquez Law Firm Website - Development Setup Guide

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

```bash
# Run the automated setup script
npm run setup:full-stack

# Or use ts-node directly
npx ts-node scripts/setup-full-stack.ts
```

This will guide you through setting up:

- PostgreSQL database
- Redis cache
- Environment variables
- API keys (optional)
- Initial database seed

### Option 2: Docker Setup

```bash
# Start all services with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Start with additional tools (pgAdmin, Redis Commander)
docker-compose --profile tools up -d
```

Access tools:

- pgAdmin: http://localhost:5050 (admin@vasquezlawnc.com / admin123)
- Redis Commander: http://localhost:8081

### Option 3: Manual Setup

1. **Install PostgreSQL**

   ```bash
   # macOS
   brew install postgresql
   brew services start postgresql

   # Ubuntu/Debian
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   sudo systemctl start postgresql
   ```

2. **Install Redis**

   ```bash
   # macOS
   brew install redis
   brew services start redis

   # Ubuntu/Debian
   sudo apt update
   sudo apt install redis-server
   sudo systemctl start redis
   ```

3. **Create Database**

   ```bash
   createdb vasquez_law_db
   ```

4. **Copy Environment Variables**

   ```bash
   cp .env.example .env.local
   ```

5. **Install Dependencies**

   ```bash
   npm install
   ```

6. **Run Migrations**

   ```bash
   npm run prisma:migrate
   ```

7. **Seed Database**
   ```bash
   npm run prisma:seed
   ```

## 🔧 Configuration

### Required Environment Variables

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/vasquez_law_db

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
BULL_REDIS_URL=redis://localhost:6379

# Authentication
NEXTAUTH_SECRET=generate-a-secret-here
JWT_SECRET=generate-another-secret
```

### Optional Services

#### AI Services

- **OpenAI**: For chat and content generation
- **Anthropic**: For advanced AI features
- **Retell**: For voice AI agents

#### Communication

- **Twilio**: SMS and voice calls
- **Resend**: Transactional emails

#### Payments

- **Stripe**: General payments
- **Authorize.Net**: Law firm payments
- **LawPay**: Legal-specific payments

#### Monitoring

- **Sentry**: Error tracking
- **Google Analytics**: Usage analytics

## 📦 Development Commands

```bash
# Start development server
npm run dev

# Run tests
npm test

# Run linting
npm run lint

# Type checking
npm run type-check

# Build for production
npm run build

# Start production server
npm start
```

## 🤖 AI Agents

Start the AI agents for content creation and monitoring:

```bash
# Start all agents
npm run agents:start

# Or start individually
npm run agent:competition-monitor
npm run agent:federal-register
npm run agent:court-listener
npm run agent:legal-blogger
npm run agent:social-media
```

## 🗄️ Database Management

```bash
# Generate Prisma client
npm run prisma:generate

# Create a new migration
npm run prisma:migrate

# Reset database
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio
```

## 🧪 Testing

```bash
# Unit tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# E2E tests (Playwright)
npm run test:e2e

# Visual regression tests
npm run test:visual
```

## 🐛 Troubleshooting

### Database Connection Issues

1. Check PostgreSQL is running:

   ```bash
   # macOS
   brew services list | grep postgresql

   # Linux
   sudo systemctl status postgresql

   # Docker
   docker ps | grep postgres
   ```

2. Verify connection:
   ```bash
   psql -U postgres -d vasquez_law_db -c "SELECT 1;"
   ```

### Redis Connection Issues

1. Check Redis is running:

   ```bash
   # macOS
   brew services list | grep redis

   # Linux
   sudo systemctl status redis

   # Docker
   docker ps | grep redis
   ```

2. Test connection:
   ```bash
   redis-cli ping
   ```

### Port Conflicts

If ports are already in use:

```bash
# Find process using port
lsof -i :5432  # PostgreSQL
lsof -i :6379  # Redis
lsof -i :3000  # Next.js

# Kill process
kill -9 <PID>
```

### Permission Issues

```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm

# Fix project permissions
sudo chown -R $(whoami) .
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🆘 Support

If you encounter issues:

1. Check the [troubleshooting guide](#-troubleshooting)
2. Review error logs in `logs/` directory
3. Check Docker logs: `docker-compose logs`
4. Create an issue with:
   - Error message
   - Steps to reproduce
   - Environment details (OS, Node version, etc.)
