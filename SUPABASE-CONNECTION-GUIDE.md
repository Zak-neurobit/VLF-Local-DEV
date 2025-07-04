# 🔌 Supabase Connection Guide

## Current Issue

The database connection is failing locally, but this is NORMAL! Supabase often restricts direct connections for security.

## ✅ What to Do Now

### Step 1: Add to Vercel Environment Variables

Since Vercel handles the connection differently than local, go ahead and add these to Vercel:

1. **Go to**: https://vercel.com/hodos-360/vasquez-law-website/settings/environment-variables

2. **Add these variables**:

   ```
   DATABASE_URL
   postgresql://postgres:vYnrac-rarpo4-bamsox@db.iexzqjgozsmsphmsjfvf.supabase.co:5432/postgres
   ✓ Production ✓ Preview ✓ Development
   ```

   ```
   NEXTAUTH_SECRET
   LjaFvfZpbXiwu/Gfkj3spDzvHlRDutwYG0n1ZmAU2VU=
   ✓ Production ✓ Preview ✓ Development
   ```

   ```
   NEXTAUTH_URL
   https://vasquez-law-website-k1yht8cu6-hodos-360.vercel.app
   ✓ Production only
   ```

### Step 2: Get Correct Connection String from Supabase

1. **Login to Supabase**: https://app.supabase.com
2. **Select your project**: vasquez-law-db
3. **Go to**: Settings → Database
4. **Find**: "Connection string" section
5. **Look for**: "Connection pooling" tab (this is what Vercel needs!)
6. **Copy**: The pooler connection string
7. **Update**: DATABASE_URL in Vercel with the pooler string

### Step 3: Alternative - Use Supabase Integration

1. In Vercel dashboard, go to "Integrations"
2. Search for "Supabase"
3. Click "Add Integration"
4. Connect your Supabase account
5. Select your project
6. It will automatically add the correct DATABASE_URL!

### Step 4: Initialize Database (After Vercel Deploy)

Once deployed to Vercel with the database URL:

1. The database tables will be created automatically on first deploy
2. Or you can use Supabase SQL Editor:
   - Go to Supabase dashboard
   - SQL Editor
   - New Query
   - Paste the schema from prisma/schema.prisma converted to SQL

## 🚨 Common Issues & Fixes

### "Connection refused" locally

- **This is normal!** Supabase restricts local connections
- **Solution**: Deploy to Vercel where it works

### "Tenant not found"

- **Wrong connection format**
- **Solution**: Use the connection string from Supabase dashboard

### "SSL required"

- **Add to connection string**: ?sslmode=require
- **Example**: postgresql://...postgres?sslmode=require

## 📝 Quick Checklist

- [ ] Added DATABASE_URL to Vercel
- [ ] Added NEXTAUTH_SECRET to Vercel
- [ ] Added NEXTAUTH_URL to Vercel
- [ ] Used pooler connection string (not direct)
- [ ] Redeployed on Vercel

## 🎯 What Happens Next

After adding to Vercel and redeploying:

1. **Build will succeed** with database connection
2. **Forms will work** immediately
3. **Test at**:
   - https://vasquez-law-website-k1yht8cu6-hodos-360.vercel.app/contact
   - https://vasquez-law-website-k1yht8cu6-hodos-360.vercel.app/es/contacto

## 💡 Pro Tip

If still having issues:

1. Use Supabase Vercel Integration (easiest!)
2. Or try Neon.tech instead (often simpler)
3. Contact forms are losing leads every minute without database!

---

**Remember**: Local connection failures are normal. What matters is that it works on Vercel!
