# Google Maps Setup Guide

This guide explains how to set up and configure Google Maps for the Vasquez Law Firm website.

## Features Implemented

### 1. GoogleMap Component (`/src/components/GoogleMap.tsx`)

- Individual office location maps
- Interactive markers with info windows
- Responsive design
- Accessibility support
- Fallback for disabled JavaScript

### 2. AllOfficesMap Component (`/src/components/AllOfficesMap.tsx`)

- Shows all 4 office locations on a single map
- Numbered markers for each office
- Auto-fit bounds to show all locations
- Click markers to see office details

### 3. MiniMap Component (`/src/components/MiniMap.tsx`)

- Compact footer/header map
- Minimal UI for space efficiency
- Click markers to open office pages

### 4. Office Data Management (`/src/data/locations.ts`)

- Centralized office location data
- Coordinates for each office
- Consistent data structure

## Setup Instructions

### 1. Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API (optional, for enhanced features)
4. Create credentials (API Key)
5. Restrict the API key to your domain(s) for security

### 2. Configure Environment Variables

Add your API key to `.env.local`:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-actual-api-key-here
```

### 3. API Key Restrictions (Recommended)

In Google Cloud Console, restrict your API key:

**Application restrictions:**

- HTTP referrers
- Add: `localhost:3000/*` (development)
- Add: `yourdomain.com/*` (production)
- Add: `*.yourdomain.com/*` (subdomains)

**API restrictions:**

- Restrict key to specific APIs
- Select: Maps JavaScript API

### 4. Billing Setup

Google Maps requires a billing account, but includes:

- $200 monthly credit
- First 28,000 map loads free per month
- Typically sufficient for most law firm websites

## Current Implementation

### 1. Main Contact Page (`/src/app/contact/page.tsx`)

- Interactive map showing all 4 offices
- Office cards with contact details
- Responsive design for mobile

### 2. Individual Office Pages

- **Raleigh**: `/contact/raleigh-nc-office-location`
- **Smithfield**: `/contact/smithfield-office-location`
- **Orlando**: `/contact/orlando-fl-office-location`
- Each includes dedicated office map

### 3. Homepage Integration (`/src/components/HomePage/OfficeLocations.tsx`)

- Mini-map showing all locations
- Office cards with images
- Modern design with animations

### 4. Schema Markup

- Each office page includes proper LocalBusiness schema
- Includes GeoCoordinates for better SEO
- Maps enhance local SEO signals

## Office Locations

| Office         | Address                                                | Coordinates       |
| -------------- | ------------------------------------------------------ | ----------------- |
| **Smithfield** | 612 S Brightleaf Blvd, Smithfield, NC 27577            | 35.5085, -78.3394 |
| **Raleigh**    | 4426 Louisburg Road, Raleigh, NC 27616                 | 35.8438, -78.7206 |
| **Charlotte**  | 5701 Executive Center Dr, Ste 103, Charlotte, NC 28212 | 35.2271, -80.8431 |
| **Orlando**    | 1111 E Amelia Street, Orlando, FL 32803                | 28.5383, -81.3792 |

## Features

### ✅ Accessibility

- ARIA labels for screen readers
- Keyboard navigation support
- High contrast markers
- Alternative text descriptions

### ✅ Performance

- Lazy loading with `@googlemaps/js-api-loader`
- Error handling and fallbacks
- Minimal API calls
- Optimized marker icons

### ✅ Mobile Responsive

- Touch-friendly controls
- Responsive sizing
- Mobile-optimized info windows
- Swipe gestures supported

### ✅ SEO Optimized

- Structured data integration
- Fallback content for crawlers
- Local business schema markup
- Address consistency

### ✅ User Experience

- Loading states with spinners
- Error messages for failed loads
- Direct links to Google Maps
- One-click directions

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Chrome 60+

## Fallback Behavior

When JavaScript is disabled or maps fail to load:

1. Static office information displayed
2. Links to Google Maps for directions
3. Full contact details remain accessible
4. No broken layout or functionality

## Testing

### Development Testing

```bash
npm run dev
```

Visit: `http://localhost:3000/contact`

### Production Testing

```bash
npm run build
npm start
```

### Mobile Testing

- Use browser dev tools
- Test on actual devices
- Verify touch interactions

## Troubleshooting

### Common Issues

1. **"Google Maps API key is not configured"**

   - Check `.env.local` file exists
   - Verify `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set
   - Restart development server

2. **"Failed to load Google Maps"**

   - Check API key is valid
   - Verify billing is enabled
   - Check domain restrictions
   - Ensure Maps JavaScript API is enabled

3. **Maps not showing on mobile**
   - Check viewport meta tag
   - Verify responsive CSS
   - Test touch interactions

### Support Resources

- [Google Maps Documentation](https://developers.google.com/maps/documentation)
- [Maps JavaScript API Reference](https://developers.google.com/maps/documentation/javascript/reference)
- [Pricing Calculator](https://cloud.google.com/maps-platform/pricing)

## Future Enhancements

### Potential Additions

- Street View integration
- Real-time traffic data
- Driving directions widget
- Nearby points of interest
- Custom map styling
- Satellite/terrain view toggle

### Advanced Features

- Geolocation for nearest office
- Route optimization
- Public transit directions
- Parking information
- Office photos integration
