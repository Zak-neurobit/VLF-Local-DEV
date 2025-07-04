# VLF + HODOS Integrated Deployment Guide

## 🚀 Complete Deployment Solution

### Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Load Balancer                         │
│                 (AWS ALB / Nginx)                        │
└────────────────┬────────────────┬───────────────────────┘
                 │                │
      ┌──────────▼──────┐   ┌────▼──────────┐
      │  VLF Website    │   │ HODOS Platform │
      │  (Next.js)      │   │  (Node.js)     │
      │  Port 3000      │◄──┤  Port 3001     │
      └─────────┬───────┘   └────┬──────────┘
                │                │
      ┌─────────▼────────────────▼──────────┐
      │        Shared Services              │
      │  PostgreSQL | MongoDB | Redis       │
      └─────────────────────────────────────┘
```

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- Git
- Database access (PostgreSQL, MongoDB, Redis)

## Quick Start

### 1. Install Docker (macOS)

```bash
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Docker
brew install --cask docker

# Start Docker Desktop
open -a Docker
```

### 2. Clone and Setup

```bash
# Setup VLF Website
cd "/Users/williamvasquez/Documents/VLF Website/vasquez-law-website"
npm install

# Setup HODOS
cd /Users/williamvasquez/Documents/HODOS/HODOS
npm install
```

### 3. Environment Configuration

#### VLF Website (.env)

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/vlf"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
HODOS_API_URL="http://localhost:3001"
HODOS_API_KEY="shared-api-key"
```

#### HODOS (.env)

```env
MONGODB_URI="mongodb://localhost:27017/hodos"
REDIS_URL="redis://localhost:6379"
PORT=3001
VLF_WEBSITE_URL="http://localhost:3000"
VLF_API_KEY="shared-api-key"
```

## Development Deployment

### Using PM2 (Process Manager)

```bash
# Install PM2 globally
npm install -g pm2

# Create ecosystem file
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'vlf-website',
      cwd: '/Users/williamvasquez/Documents/VLF Website/vasquez-law-website',
      script: 'npm',
      args: 'run dev',
      env: {
        PORT: 3000,
        NODE_ENV: 'development'
      }
    },
    {
      name: 'hodos-platform',
      cwd: '/Users/williamvasquez/Documents/HODOS/HODOS',
      script: 'npm',
      args: 'run dev',
      env: {
        PORT: 3001,
        NODE_ENV: 'development'
      }
    }
  ]
};
EOF

# Start all services
pm2 start ecosystem.config.js

# View logs
pm2 logs

# Monitor
pm2 monit
```

## Production Deployment

### Option 1: Cloud Platform (Vercel + Railway)

#### Deploy VLF to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd "/Users/williamvasquez/Documents/VLF Website/vasquez-law-website"
vercel

# Set environment variables in Vercel dashboard
```

#### Deploy HODOS to Railway

```bash
# Install Railway CLI
brew install railway

# Deploy
cd /Users/williamvasquez/Documents/HODOS/HODOS
railway login
railway init
railway up
```

### Option 2: VPS Deployment (DigitalOcean/AWS EC2)

```bash
# SSH to your server
ssh user@your-server-ip

# Install dependencies
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
sudo usermod -aG docker $USER

# Clone repositories
git clone your-vlf-repo
git clone your-hodos-repo

# Use Docker Compose
docker-compose -f docker-compose.production.yml up -d
```

### Option 3: Kubernetes Deployment

```yaml
# k8s-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vlf-website
spec:
  replicas: 3
  selector:
    matchLabels:
      app: vlf-website
  template:
    metadata:
      labels:
        app: vlf-website
    spec:
      containers:
        - name: vlf-website
          image: your-registry/vlf-website:latest
          ports:
            - containerPort: 3000
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: vlf-secrets
                  key: database-url
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hodos-platform
spec:
  replicas: 2
  selector:
    matchLabels:
      app: hodos-platform
  template:
    metadata:
      labels:
        app: hodos-platform
    spec:
      containers:
        - name: hodos-platform
          image: your-registry/hodos-platform:latest
          ports:
            - containerPort: 3001
```

## Database Setup

### PostgreSQL (for VLF)

```bash
# Using Docker
docker run -d \
  --name vlf-postgres \
  -e POSTGRES_DB=vlf_website \
  -e POSTGRES_USER=vlf_user \
  -e POSTGRES_PASSWORD=secure_password \
  -p 5432:5432 \
  postgres:15-alpine

# Run migrations
cd "/Users/williamvasquez/Documents/VLF Website/vasquez-law-website"
npx prisma migrate deploy
```

### MongoDB (for HODOS)

```bash
# Using Docker
docker run -d \
  --name hodos-mongodb \
  -e MONGO_INITDB_DATABASE=hodos \
  -p 27017:27017 \
  mongo:7.0
```

### Redis (Shared)

```bash
docker run -d \
  --name shared-redis \
  -p 6379:6379 \
  redis:7-alpine
```

## CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Deploy to production
        run: |
          # Your deployment script
          ./scripts/deploy-production.sh
```

## Monitoring & Maintenance

### Health Checks

```bash
# Create health check script
cat > health-check.sh << 'EOF'
#!/bin/bash

# Check VLF
VLF_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/health)
echo "VLF Website: $VLF_STATUS"

# Check HODOS
HODOS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/health)
echo "HODOS Platform: $HODOS_STATUS"

# Check databases
pg_isready -h localhost -p 5432
mongosh --eval "db.adminCommand('ping')" --quiet
redis-cli ping
EOF

chmod +x health-check.sh
```

### Backup Strategy

```bash
# Automated backup script
cat > backup.sh << 'EOF'
#!/bin/bash

# Backup PostgreSQL
pg_dump vlf_website > backups/vlf_$(date +%Y%m%d).sql

# Backup MongoDB
mongodump --db hodos --out backups/hodos_$(date +%Y%m%d)

# Upload to S3
aws s3 sync backups/ s3://your-backup-bucket/
EOF
```

## SSL/TLS Setup

### Using Let's Encrypt

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificates
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Performance Optimization

### CDN Integration

- CloudFlare for static assets
- AWS CloudFront for global distribution

### Caching Strategy

- Redis for session management
- CDN for static files
- Database query caching

### Load Testing

```bash
# Using Apache Bench
ab -n 1000 -c 10 http://localhost:3000/

# Using k6
k6 run load-test.js
```

## Security Checklist

- [ ] Environment variables secured
- [ ] HTTPS enabled
- [ ] Rate limiting configured
- [ ] CORS properly set
- [ ] Input validation active
- [ ] SQL injection prevention
- [ ] XSS protection enabled
- [ ] Authentication working
- [ ] Regular security updates

## Troubleshooting

### Common Issues

1. **Port already in use**

   ```bash
   lsof -i :3000
   kill -9 <PID>
   ```

2. **Database connection failed**

   - Check connection strings
   - Verify database is running
   - Check firewall rules

3. **Memory issues**
   ```bash
   # Increase Node memory
   export NODE_OPTIONS="--max-old-space-size=4096"
   ```

## Support

- Documentation: `/docs`
- Issues: GitHub Issues
- Email: support@vasquezlaw.com

---

**Ready for Production!** 🎉

Both VLF Website and HODOS Platform are now fully integrated and ready for deployment.
