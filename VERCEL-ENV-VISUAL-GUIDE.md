# 🖼️ Vercel Environment Variables - Visual Step-by-Step

## 📍 Step 1: Navigate to Environment Variables

```
Vercel Dashboard
│
├── Your Project Name (click here)
│   │
│   ├── 📊 Overview
│   ├── 🔄 Deployments
│   ├── 📊 Analytics
│   ├── 🗄️ Storage
│   └── ⚙️ Settings (CLICK THIS)
│       │
│       ├── General
│       ├── Domains
│       ├── Git
│       └── 🔐 Environment Variables (CLICK THIS)
```

## 📝 Step 2: Add New Variable Interface

When you click "Add New", you'll see:

```
┌─────────────────────────────────────────────┐
│ Add Environment Variable                     │
│                                             │
│ Key (name)                                  │
│ ┌─────────────────────────────────────┐    │
│ │ DATABASE_URL                        │    │
│ └─────────────────────────────────────┘    │
│                                             │
│ Value                                       │
│ ┌─────────────────────────────────────┐    │
│ │ postgresql://user:pass@host/db     │    │
│ └─────────────────────────────────────┘    │
│                                             │
│ Environments (check all that apply)         │
│ ☑️ Production                               │
│ ☑️ Preview                                  │
│ ☑️ Development                              │
│                                             │
│ [Save]                                      │
└─────────────────────────────────────────────┘
```

## 🗄️ Step 3: Vercel Storage Setup

### For Database (Postgres):

```
Storage Tab
│
└── Create Database
    │
    ├── Postgres (CLICK)
    ├── KV
    ├── Blob
    └── Edge Config

Then:
┌─────────────────────────────────────────────┐
│ Create Postgres Database                     │
│                                             │
│ Database Name                               │
│ ┌─────────────────────────────────────┐    │
│ │ vlf-database                        │    │
│ └─────────────────────────────────────┘    │
│                                             │
│ Region: US East (default)                   │
│                                             │
│ [Create]                                    │
└─────────────────────────────────────────────┘
```

### For Redis (KV):

```
Storage Tab
│
└── Create Database
    │
    └── KV (CLICK)

Then:
┌─────────────────────────────────────────────┐
│ Create KV Database                          │
│                                             │
│ Database Name                               │
│ ┌─────────────────────────────────────┐    │
│ │ vlf-cache                           │    │
│ └─────────────────────────────────────┘    │
│                                             │
│ [Create]                                    │
└─────────────────────────────────────────────┘
```

## 📋 Step 4: Copy Values From Services

### Example: SendGrid

```
SendGrid Dashboard
│
└── Settings
    └── API Keys
        └── Create API Key
            │
            Name: VLF Website
            Permissions: Full Access
            │
            ↓ Generates:
            SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Copy this to Vercel as:
SMTP_PASS = SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Example: Twilio Console

```
Twilio Console shows:
┌─────────────────────────────────────────────┐
│ Account Info                                │
│                                             │
│ ACCOUNT SID                                 │
│ ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  [Copy] │
│                                             │
│ AUTH TOKEN                                  │
│ ••••••••••••••••••••••••••••••••••  [Show] │
│                                             │
│ PHONE NUMBERS                               │
│ +1 (234) 567-8900                  [Copy]  │
└─────────────────────────────────────────────┘
```

## ✅ Step 5: Your Final Environment Variables List

After setup, your Vercel dashboard should show:

```
Environment Variables (18)
┌──────────────────────────┬─────────────┬────────────────┐
│ Name                     │ Value       │ Environments   │
├──────────────────────────┼─────────────┼────────────────┤
│ DATABASE_URL            │ ••••••••    │ 🟢 🟡 🔵      │
│ NEXTAUTH_SECRET         │ ••••••••    │ 🟢 🟡 🔵      │
│ NEXTAUTH_URL            │ https://... │ 🟢             │
│ REDIS_URL               │ ••••••••    │ 🟢 🟡 🔵      │
│ SMTP_HOST               │ smtp.sen... │ 🟢 🟡 🔵      │
│ SMTP_PORT               │ 587         │ 🟢 🟡 🔵      │
│ SMTP_USER               │ apikey      │ 🟢 🟡 🔵      │
│ SMTP_PASS               │ ••••••••    │ 🟢 🟡 🔵      │
│ TWILIO_ACCOUNT_SID      │ ••••••••    │ 🟢 🟡 🔵      │
│ TWILIO_AUTH_TOKEN       │ ••••••••    │ 🟢 🟡 🔵      │
│ TWILIO_PHONE_NUMBER     │ +1234567890 │ 🟢 🟡 🔵      │
│ OPENAI_API_KEY          │ ••••••••    │ 🟢 🟡 🔵      │
│ HODOS_API_URL           │ https://... │ 🟢 🟡 🔵      │
│ HODOS_API_KEY           │ ••••••••    │ 🟢 🟡 🔵      │
└──────────────────────────┴─────────────┴────────────────┘

Legend: 🟢 Production  🟡 Preview  🔵 Development
```

## 🔄 Step 6: Redeploy

```
Deployments Tab
│
└── Latest Deployment
    └── ⋮ (three dots menu)
        └── Redeploy
            │
            ┌─────────────────────────────────┐
            │ Redeploy to Production?         │
            │                                 │
            │ ○ Create new deployment         │
            │ ● Use existing Build Cache      │
            │                                 │
            │ [Cancel] [Redeploy]             │
            └─────────────────────────────────┘
```

## 🧪 Step 7: Verify Setup

Check build logs for environment variables:

```
Build Logs will show:
─────────────────────────────
15:42:31.123  Cloning github.com/youruser/vlf-website
15:42:32.456  Installing dependencies...
15:42:45.789  Detected 14 environment variables
15:42:45.790  Running "npm run build"
15:42:46.123  > prisma generate
15:42:47.456  ✓ Generated Prisma Client
15:42:48.789  > next build
...
15:43:12.345  ✓ Build successful!
─────────────────────────────
```

## 💡 Pro Tips

1. **Use Bulk Import**:

   ```
   Click "Import .env" to paste multiple variables:

   DATABASE_URL=postgresql://...
   NEXTAUTH_SECRET=k4P9Xn2rL8mQ1wZ5vT7yB3jH6fA0dS9g
   REDIS_URL=redis://...
   ```

2. **Preview Different Values**:

   - Production: Real services
   - Preview: Test services
   - Development: Local services

3. **Quick Test**:
   ```bash
   # After deploy, test with:
   curl https://your-app.vercel.app/api/health
   ```

Ready! Your environment is configured. 🎉
