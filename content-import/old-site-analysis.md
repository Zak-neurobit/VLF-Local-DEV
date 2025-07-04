# Vasquez Law Firm Old Site Analysis

## Site Overview

- **Domain**: www.vasquezlawnc.com
- **Platform**: WordPress with Divi theme (v.4.25.1)
- **SEO Plugin**: Yoast SEO v25.0
- **Language Support**: English and Spanish (/es/)

## Directory Structure

### Main HTML Pages

1. **Homepage**: `/index.html`

   - Title: "Home - Vasquez Law Firm, PLLC"
   - Description: "Find experienced Raleigh, NC immigration lawyers to help with visas, green cards, citizenship, and more. Get expert legal guidance for your immigration needs today."

2. **Practice Areas**:

   - `/immigration/` - Immigration services (multiple sub-pages)
   - `/personal-injury/` - Personal injury services
   - `/criminal-defense/` - Criminal defense services
   - `/family-law/` - Family law services
   - `/workers-compensation-job-injury/` - Workers' compensation

3. **Attorney Pages**:

   - `/attorneys/` - Main attorneys page
   - Individual attorney pages exist
   - `/william-vasquez-attorney/`
   - `/judith-parkes/`

4. **Location Pages**:

   - `/raleigh-nc/`
   - `/charlotte-nc/`
   - `/smithfield-nc/`
   - `/durham-nc/`
   - `/winston-salem/`
   - `/orlando-fl/`

5. **Spanish Content** (`/es/`):

   - `/es/` - Spanish homepage
   - `/es/abogados.html` - Attorneys
   - `/es/areas-de-practica.html` - Practice areas
   - `/es/contacto.html` - Contact
   - `/es/blog.html` - Blog

6. **Other Important Pages**:
   - `/contact/`
   - `/blog/`
   - `/scholarship/`
   - `/media-info/`
   - `/resources.html`
   - `/sitemap.html`
   - `/privacy-policy.html`
   - `/disclaimer.html`

## Content Assets

### Images

Located in `/wp-content/uploads/`:

- Logo: `logo-1.png`
- Favicon: `favicon.png`
- Attorney photos (Will, Kelsey, Adrianna, Torrellas, Jillian)
- Location-specific images for each office
- Practice area images
- Badge/certification images (AILA, NCSB, etc.)

### CSS/JavaScript

- Divi theme styles
- Plugin styles (carousel, lightbox, etc.)
- Custom modifications in et-cache directory

## Key Features to Migrate

1. **Multi-language Support**: Full Spanish translations
2. **Location-Based Content**: 6 office locations
3. **Attorney Profiles**: At least 5 attorneys
4. **Practice Areas**: 5 main areas with sub-specialties
5. **Blog Content**: Multiple blog posts in English and Spanish
6. **Scholarship Program**: Dedicated scholarship page
7. **Contact Forms**: Lead capture functionality
8. **SEO Optimized**: Meta tags, structured data, canonical URLs

## Content Migration Priority

### High Priority

1. Attorney profiles and bios
2. Practice area descriptions
3. Location-specific content
4. Contact information
5. Spanish translations

### Medium Priority

1. Blog posts
2. Scholarship information
3. Legal resources
4. Media/press information

### Low Priority

1. Archived blog posts
2. Duplicate content variations
3. Redirected pages

## Technical Considerations

1. **URL Structure**: Preserve SEO-friendly URLs
2. **Meta Data**: Extract and preserve all SEO metadata
3. **Images**: Download and optimize all images
4. **Spanish Content**: Maintain separate Spanish pages
5. **Schema Markup**: Preserve structured data for local SEO

## Next Steps

1. Extract detailed content from each main page
2. Download and organize all image assets
3. Map old URLs to new site structure
4. Create content import scripts
5. Set up proper redirects for SEO preservation
