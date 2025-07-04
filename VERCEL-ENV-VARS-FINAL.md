# 🚀 Final Vercel Environment Variables

## Add These to Vercel NOW

Go to: https://vercel.com/hodos-360/vasquez-law-website/settings/environment-variables

### 1. DATABASE_URL (Pooler Connection)

```
Key: DATABASE_URL
Value: postgresql://postgres.iexzqjgozsmsphmsjfvf:vYnrac-rarpo4-bamsox@aws-0-us-west-1.pooler.supabase.com:5432/postgres
Environment: ✓ Production ✓ Preview ✓ Development
```

### 2. NEXTAUTH_SECRET

```
Key: NEXTAUTH_SECRET
Value: LjaFvfZpbXiwu/Gfkj3spDzvHlRDutwYG0n1ZmAU2VU=
Environment: ✓ Production ✓ Preview ✓ Development
```

### 3. NEXTAUTH_URL

```
Key: NEXTAUTH_URL
Value: https://vasquez-law-website-k1yht8cu6-hodos-360.vercel.app
Environment: ✓ Production
```

## After Adding Variables:

1. **Redeploy**:

   - Go to Deployments tab
   - Click ⋮ on latest deployment
   - Select "Redeploy"
   - Confirm

2. **Database will auto-initialize** during build

3. **Test Forms** (after ~3 minutes):
   - https://vasquez-law-website-k1yht8cu6-hodos-360.vercel.app/contact
   - https://vasquez-law-website-k1yht8cu6-hodos-360.vercel.app/es/contacto

## ✅ This Pooler Connection:

- Works with Vercel's serverless architecture
- Handles connection pooling automatically
- Prevents connection limit errors
- Is the recommended method for Next.js apps

## 🎯 Success Indicators:

- Build completes without database errors
- Contact forms submit successfully
- Newsletter signup works
- No "connection refused" errors in logs

---

**Time to Complete**: 5 minutes
**Result**: Fully functional forms and lead capture!
