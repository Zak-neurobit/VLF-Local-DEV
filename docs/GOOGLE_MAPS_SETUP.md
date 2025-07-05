# Google Maps Setup Guide

## Overview

The Vasquez Law Firm website uses Google Maps to display office locations on various pages. This guide explains how to set up and configure the Google Maps API.

## Current Status

- **Google Maps components are implemented** in:
  - `/src/components/GoogleMap.tsx` - Individual office map display
  - `/src/components/AllOfficesMap.tsx` - All offices overview map
  - `/src/components/MiniMap.tsx` - Compact map for homepage

- **Environment configuration** is handled in:
  - `/src/lib/env-config.ts` - Service configuration management
  - `/src/lib/google-maps-config.ts` - Google Maps specific helpers

## Setup Instructions

### 1. Get a Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Maps JavaScript API**
4. Go to "Credentials" and create an API Key
5. (Optional but recommended) Restrict the API key to your domain

### 2. Configure Environment Variables

Add your API key to your environment files:

```bash
# .env.local
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-actual-api-key-here
```

### 3. Verify Configuration

Run the API setup script to verify your configuration:

```bash
npm run setup:apis
```

Or use the dedicated Google Maps setup script:

```bash
node scripts/setup-google-maps.js
```

## Where Maps Are Used

1. **Contact Page** (`/contact`)
   - Uses `AllOfficesMap` component to show all office locations

2. **Individual Office Pages**
   - `/contact/charlotte-nc-office-location`
   - `/contact/raleigh-nc-office-location`
   - `/contact/smithfield-office-location`
   - `/contact/orlando-fl-office-location`
   - Each uses `GoogleMap` component for specific office

3. **Homepage Office Locations Section**
   - Uses `MiniMap` component for a compact overview

## Fallback Behavior

When Google Maps is not configured or fails to load:

1. **Graceful Degradation**: Maps show static fallback content with:
   - Office addresses
   - Phone numbers
   - "View on Google Maps" links
   - Office hours

2. **Error Messages**: Clear user-friendly messages explain the issue

3. **No Breaking**: The site continues to function normally

## Troubleshooting

### Maps Not Showing

1. Check browser console for errors
2. Verify API key is set correctly:
   ```bash
   echo $NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
   ```
3. Ensure Maps JavaScript API is enabled in Google Cloud Console
4. Check API key restrictions (if any)

### Common Issues

- **"Google Maps is not configured"**: API key is missing or invalid
- **"Failed to load Google Maps"**: Network issue or API error
- **Blank maps**: Check browser console for specific errors

### Testing

1. Start development server:
   ```bash
   npm run dev
   ```

2. Visit pages with maps:
   - http://localhost:3000/contact
   - http://localhost:3000/contact/charlotte-nc-office-location
   - http://localhost:3000 (scroll to Office Locations)

## Security Notes

- Always use `NEXT_PUBLIC_` prefix for client-side environment variables
- Restrict API keys to specific domains in production
- Monitor usage in Google Cloud Console to prevent abuse

## Support

For issues with Google Maps setup:
1. Check this documentation
2. Review error messages in browser console
3. Verify API key configuration
4. Contact technical support if needed