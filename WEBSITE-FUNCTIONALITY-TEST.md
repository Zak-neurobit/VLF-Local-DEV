# 🧪 Website Functionality Test Checklist

## 🌐 Live URL: https://vasquez-law-website-mv8nbz1eo-hodos-360.vercel.app

## 1. Form Testing (CRITICAL - Test First!)

### English Contact Form

- [ ] Go to: https://vasquez-law-website-mv8nbz1eo-hodos-360.vercel.app/contact
- [ ] Fill out all fields:
  - Name: Test User
  - Email: test@example.com
  - Phone: 555-1234
  - Case Type: Immigration
  - Message: Test message
- [ ] Submit form
- [ ] ✅ Should see success message
- [ ] ❌ If error: Database not connected in Vercel

### Spanish Contact Form

- [ ] Go to: https://vasquez-law-website-mv8nbz1eo-hodos-360.vercel.app/es/contacto
- [ ] Fill out form in Spanish
- [ ] Submit
- [ ] ✅ Should see success message in Spanish

### Newsletter Signup

- [ ] Scroll to footer on any page
- [ ] Enter email: newsletter@test.com
- [ ] Click subscribe
- [ ] ✅ Should see confirmation

## 2. Language Testing

### Language Toggle

- [ ] Click "ES" in header
- [ ] ✅ All content should switch to Spanish
- [ ] Click "EN"
- [ ] ✅ All content should switch to English

### Spanish Pages

- [ ] /es - Homepage in Spanish
- [ ] /es/contacto - Contact in Spanish
- [ ] /es/abogados - Attorneys in Spanish
- [ ] /es/areas-de-practica - Practice areas in Spanish

## 3. Core Functionality

### Navigation

- [ ] Desktop menu works
- [ ] Mobile hamburger menu works
- [ ] All menu links go to correct pages
- [ ] Logo links to homepage

### Images

- [ ] William Vasquez headshot loads on homepage
- [ ] All attorney photos load
- [ ] No broken images

### Performance

- [ ] Pages load in <3 seconds
- [ ] No console errors (F12 to check)
- [ ] Mobile responsive (resize browser)

## 4. SEO & Technical

### Meta Tags

- [ ] View page source - has title tag
- [ ] Has meta description
- [ ] Has Open Graph tags

### Technical

- [ ] /sitemap.xml loads
- [ ] /robots.txt loads
- [ ] HTTPS certificate valid
- [ ] No mixed content warnings

## 5. Key Pages to Test

### Practice Areas

- [ ] /practice-areas/immigration
- [ ] /practice-areas/personal-injury
- [ ] /practice-areas/workers-compensation
- [ ] /practice-areas/criminal-defense
- [ ] /practice-areas/family-law

### Office Locations

- [ ] /raleigh-nc
- [ ] /charlotte-nc
- [ ] /durham-nc
- [ ] /orlando-fl

### About Pages

- [ ] /attorneys
- [ ] /about
- [ ] /blog

## 🚨 If Forms Don't Work:

1. **Check Vercel Environment Variables**:

   - DATABASE_URL is set correctly
   - NEXTAUTH_SECRET is set
   - NEXTAUTH_URL matches your domain

2. **Check Vercel Function Logs**:

   - Go to Vercel dashboard
   - Functions tab
   - Look for errors in /api/contact logs

3. **Common Fixes**:
   - Redeploy after adding env vars
   - Check DATABASE_URL has correct password
   - Ensure all env checkboxes selected

## ✅ Success Indicators:

- Forms submit without errors
- Data saves to Supabase database
- Email notifications sent (if configured)
- No console errors
- Fast page loads
- Proper language switching

## 📊 Next Steps After Testing:

1. **Google Search Console** - Submit site for indexing
2. **Google Analytics** - Track visitor behavior
3. **Google My Business** - Update with new website
4. **Monitor Forms** - Check Supabase for submissions
5. **Speed Test** - Run PageSpeed Insights

---

**Test Duration**: ~10 minutes
**Critical**: Test forms first - they're your lead capture!
