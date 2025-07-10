# Manual Link Testing Checklist

## 🚀 Quick Start

1. Open http://localhost:3000 in your browser
2. Follow this checklist to test all navigation

## ✅ Main Navigation Test

### Header Navigation (English):

- [ ] Click "Home" → Should go to homepage
- [ ] Click "About" → Should show About page
- [ ] Click "Practice Areas" → Dropdown should appear
  - [ ] Immigration → `/practice-areas/immigration`
  - [ ] Personal Injury → `/practice-areas/personal-injury`
  - [ ] Workers' Compensation → `/practice-areas/workers-compensation`
  - [ ] Criminal Defense → `/practice-areas/criminal-defense`
  - [ ] Family Law → `/practice-areas/family-law`
  - [ ] Traffic Violations → `/practice-areas/traffic-violations`
- [ ] Click "Attorneys" → Should show all attorneys
  - [ ] Click each attorney card → Should show attorney profile
- [ ] Click "Locations" → Dropdown should appear
  - [ ] Smithfield → `/locations/smithfield`
  - [ ] Raleigh → `/locations/raleigh`
  - [ ] Charlotte → `/locations/charlotte`
  - [ ] Orlando → `/locations/orlando`
- [ ] Click "Contact" → Should show contact form
- [ ] Click "Free Consultation" → Should show consultation page

### Language Switcher:

- [ ] Click "ES" button → Should switch to Spanish
- [ ] Verify URL changes to `/es`
- [ ] Click "EN" button → Should switch back to English

### Header Navigation (Spanish):

- [ ] Click "Inicio" → Should go to Spanish homepage
- [ ] Click "Acerca de" → `/es/acerca-de`
- [ ] Click "Áreas de Práctica" → Dropdown should appear
  - [ ] Inmigración → `/es/areas-de-practica/inmigracion`
  - [ ] Lesiones Personales → `/es/areas-de-practica/lesiones-personales`
  - [ ] Compensación Laboral → `/es/areas-de-practica/compensacion-laboral`
  - [ ] Defensa Criminal → `/es/areas-de-practica/defensa-criminal`
  - [ ] Derecho Familiar → `/es/areas-de-practica/derecho-familia`
  - [ ] Infracciones de Tránsito → `/es/areas-de-practica/infracciones-transito`
- [ ] Click "Abogados" → `/es/abogados`
- [ ] Click "Contacto" → `/es/contacto`

## 📍 Footer Links Test

### Practice Areas Section:

- [ ] Immigration Law
- [ ] Personal Injury
- [ ] Workers' Compensation
- [ ] Criminal Defense
- [ ] Family Law
- [ ] Traffic Violations

### Locations Section:

- [ ] Smithfield Office
- [ ] Raleigh Office
- [ ] Charlotte Office
- [ ] Orlando Office

### Resources Section:

- [ ] Blog
- [ ] Case Results
- [ ] Testimonials
- [ ] FAQ

### Company Section:

- [ ] About Us
- [ ] Our Team
- [ ] Privacy Policy
- [ ] Terms of Service

### Social Media Icons:

- [ ] Facebook (external link)
- [ ] Twitter (external link)
- [ ] LinkedIn (external link)
- [ ] Instagram (external link)

## 🎯 Special Pages Test

### Attorney Pages:

- [ ] William Vasquez → `/attorneys/william-vasquez`
- [ ] Adrianna Ingram → `/attorneys/adrianna-ingram`
- [ ] Christopher Afanador → `/attorneys/christopher-afanador`
- [ ] Jillian Baucom → `/attorneys/jillian-baucom`
- [ ] Kelly Vega → `/attorneys/kelly-vega`
- [ ] Mark Kelsey → `/attorneys/mark-kelsey`
- [ ] Rebecca Sommer → `/attorneys/rebecca-sommer`
- [ ] Roselyn V. Torrellas → `/attorneys/roselyn-v-torrellas`
- [ ] Judith Parkes → `/attorneys/judith-parkes`

### Blog:

- [ ] Main blog page → `/blog`
- [ ] Click on any blog post → Should open post
- [ ] Category links → Should filter by category

### Location-Specific Pages:

- [ ] Charlotte Immigration Lawyer → `/locations/nc/charlotte/immigration-lawyer`
- [ ] Raleigh Personal Injury Attorney → `/locations/nc/raleigh/personal-injury-attorney`

## 🔍 Common Issues to Check:

1. **404 Errors**: If you see a 404 page, note which link caused it
2. **Console Errors**: Open browser console (F12) and check for red errors
3. **Broken Images**: Look for missing images or broken image icons
4. **Mobile Menu**: Test navigation on mobile viewport (responsive)

## ✅ All Tests Passed?

If all checkboxes are marked, the navigation is working correctly!

If you find any broken links, please note:

- The exact link text clicked
- The URL it tried to go to
- The error message (if any)
