# 🚀 Deploy Vasquez Law Firm Website - Quick Start

## Option 1: Deploy to Vercel (Recommended - 5 minutes)

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

### Step 2: Deploy

```bash
vercel --prod
```

When prompted:

- Set up and deploy: Y
- Which scope: Select your account
- Link to existing project: N
- Project name: vasquez-law-website
- Directory: ./
- Override settings: N

### Step 3: Add Environment Variables

After deployment, go to your Vercel dashboard:

1. Click on your project
2. Go to Settings → Environment Variables
3. Add these minimum variables:

```env
DATABASE_URL=your_postgres_url_here
NEXTAUTH_SECRET=generate_32_char_secret_here
NEXTAUTH_URL=https://your-vercel-url.vercel.app
NODE_ENV=production
```

To generate NEXTAUTH_SECRET:

```bash
openssl rand -base64 32
```

### Step 4: Configure Custom Domain (Optional)

In Vercel Dashboard:

1. Go to Settings → Domains
2. Add: vasquezlawnc.com
3. Add: www.vasquezlawnc.com
4. Update your DNS records as shown

---

## Option 2: Quick Database Setup

If you need a database quickly:

### Supabase (Free tier available)

1. Go to https://supabase.com
2. Create new project
3. Copy the connection string from Settings → Database
4. Use as DATABASE_URL

### Neon (Free tier available)

1. Go to https://neon.tech
2. Create new project
3. Copy the connection string
4. Use as DATABASE_URL

---

## Option 3: Deploy with Minimal Config

For the absolute quickest deployment with placeholder values:

```bash
# Create minimal .env.production
cat > .env.production << 'EOF'
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/vasquezlaw"
NEXTAUTH_SECRET="your-secret-key-at-least-32-characters-long-here"
NEXTAUTH_URL="https://vasquez-law-website.vercel.app"
NODE_ENV="production"
NEXT_PUBLIC_APP_URL="https://vasquez-law-website.vercel.app"
EOF

# Deploy
vercel --prod
```

**Note**: This will deploy but some features won't work without proper configuration.

---

## Post-Deployment (First Hour)

### 1. Test Core Features

- [ ] Homepage loads
- [ ] Navigation works
- [ ] Contact form displays
- [ ] Spanish version works

### 2. Add Optional Services (As Needed)

- [ ] Email configuration for contact forms
- [ ] Google Analytics for tracking
- [ ] Payment processing credentials
- [ ] SMS/Voice services

### 3. Submit to Search Engines

```bash
# After deployment, submit your sitemap
https://your-site.vercel.app/sitemap.xml
```

---

## 🎉 That's It!

Your site will be live at: https://[project-name].vercel.app

To add more features later, update environment variables in Vercel Dashboard.

**Need help?** Check DEPLOYMENT-GUIDE.md for detailed instructions.
