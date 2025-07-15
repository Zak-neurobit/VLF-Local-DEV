# 🔧 Add Database to Vercel - Step by Step

## Your Database Info

- **Project ID**: iexzqjgozsmsphmsjfvf
- **Password**: vYnrac-rarpo4-bamsox

## Step 1: Add DATABASE_URL to Vercel

1. Go to: https://vercel.com/hodos-360/vasquez-law-website/settings/environment-variables

2. Click "Add New" and enter:

   ```
   Key: DATABASE_URL
   Value: postgresql://postgres:vYnrac-rarpo4-bamsox@db.iexzqjgozsmsphmsjfvf.supabase.co:5432/postgres
   Environment: ✓ Production ✓ Preview ✓ Development
   ```

3. Click "Save"

## Step 2: Add Authentication Variables

While still in Environment Variables, add these:

1. **NEXTAUTH_SECRET**:

   ```
   Key: NEXTAUTH_SECRET
   Value: LjaFvfZpbXiwu/Gfkj3spDzvHlRDutwYG0n1ZmAU2VU=
   Environment: ✓ Production ✓ Preview ✓ Development
   ```

2. **NEXTAUTH_URL**:
   ```
   Key: NEXTAUTH_URL
   Value: https://vasquez-law-website-k1yht8cu6-hodos-360.vercel.app
   Environment: ✓ Production
   ```

## Step 3: Redeploy

1. Go to the Deployments tab
2. Find your latest deployment
3. Click the ⋮ menu → "Redeploy"
4. Click "Redeploy" to confirm

## Alternative Connection Strings

If the main connection doesn't work, try these in Supabase dashboard:

### Option 1: Pooler Connection (Recommended for Vercel)

```
postgresql://postgres.iexzqjgozsmsphmsjfvf:vYnrac-rarpo4-bamsox@aws-0-us-east-1.pooler.supabase.com:5432/postgres
```

### Option 2: Direct Connection

```
postgresql://postgres:vYnrac-rarpo4-bamsox@db.iexzqjgozsmsphmsjfvf.supabase.co:5432/postgres
```

### Option 3: Connection Pooler (Port 6543)

```
postgresql://postgres:vYnrac-rarpo4-bamsox@db.iexzqjgozsmsphmsjfvf.supabase.co:6543/postgres?pgbouncer=true
```

## Troubleshooting

### If database connection fails:

1. **Check Supabase Dashboard**:

   - Go to your Supabase project
   - Settings → Database
   - Look for "Connection string" section
   - Try different connection methods

2. **Wait for Provisioning**:

   - New databases can take 2-5 minutes to fully provision
   - Try again in a few minutes

3. **Check Password**:

   - Make sure no special characters were changed
   - Password should be exactly: vYnrac-rarpo4-bamsox

4. **Use Pooler for Serverless**:
   - Vercel is serverless, so pooler connections work better
   - Use the pooler URL if direct connection fails

## Next Steps After Database Connected

1. **Initialize Schema** (we'll do this once connection works):

   ```bash
   npx prisma db push
   ```

2. **Test Forms**:

   - English: /contact
   - Spanish: /es/contacto
   - Newsletter in footer

3. **Monitor**:
   - Check Vercel logs for any errors
   - Verify form submissions save to database

---

**Important**: The database must be connected for forms to work. Without it, you're losing every lead that tries to contact you!
