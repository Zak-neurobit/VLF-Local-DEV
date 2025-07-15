# Google & Yelp Review API Integration Setup

This document provides comprehensive setup instructions for integrating Google Places API and Yelp Fusion API to display external reviews on the Vasquez Law Firm website.

## Overview

The review integration system fetches reviews from Google Places and Yelp, aggregates them with caching, and displays them alongside existing website testimonials.

### Features

- ✅ **Google Places API Integration** - Fetch Google reviews for all office locations
- ✅ **Yelp Fusion API Integration** - Fetch Yelp reviews for business listings
- ✅ **Review Aggregation** - Combine reviews from multiple sources with unified format
- ✅ **Caching System** - 1-hour cache to respect API rate limits and reduce costs
- ✅ **Error Handling** - Graceful fallbacks when APIs are unavailable
- ✅ **Rate Limiting** - Built-in delays to respect API limits
- ✅ **React Components** - Ready-to-use components for displaying reviews
- ✅ **API Endpoints** - RESTful endpoints for fetching review data
- ✅ **Demo Mode** - Test with sample data when APIs are not configured

## API Requirements & Setup

### 1. Google Places API

#### Requirements

- Google Cloud Console account
- Places API (New) enabled
- API key with proper restrictions

#### Setup Steps

1. **Enable the API**

   ```bash
   # Go to Google Cloud Console
   # Navigate to APIs & Services > Library
   # Search for "Places API (New)"
   # Click "Enable"
   ```

2. **Create API Key**

   ```bash
   # Go to APIs & Services > Credentials
   # Click "Create Credentials" > "API Key"
   # Copy the generated key
   ```

3. **Restrict the API Key** (Recommended)

   ```bash
   # Edit the API key
   # Under "API restrictions" select "Restrict key"
   # Add "Places API (New)"
   # Under "Application restrictions" add your domains
   ```

4. **Add to Environment Variables**
   ```bash
   GOOGLE_PLACES_API_KEY=your-google-places-api-key-here
   ```

#### Pricing (2024)

- **Basic Usage**: $0.032 per Place Details request
- **Text Search**: $0.032 per request
- **Free Tier**: $200 monthly credit (covers ~6,250 requests)
- **Rate Limits**: 1,000 requests per day (default)

### 2. Yelp Fusion API

#### Requirements

- Yelp Developer account
- Commercial use requires paid plan (no free tier as of 2024)

#### Setup Steps

1. **Create Yelp App**

   ```bash
   # Go to https://www.yelp.com/developers/v3/manage_app
   # Click "Create New App"
   # Fill in app details and agree to terms
   ```

2. **Get API Key**

   ```bash
   # After app creation, copy your API Key
   # Found in app dashboard under "API Key"
   ```

3. **Add to Environment Variables**
   ```bash
   YELP_API_KEY=your-yelp-api-key-here
   ```

#### Pricing (2024)

- **Trial**: 5,000 free API calls (30 days, evaluation only)
- **Starter**: $7.99 per 1,000 calls
- **Plus**: $9.99 per 1,000 calls (up to 3 reviews per business)
- **Enterprise**: $14.99 per 1,000 calls (up to 7 reviews per business)

**Important**: Yelp ended free commercial access in 2024. All production use requires a paid plan.

## Environment Configuration

### Complete Environment Variables

Add these to your `.env.local` file:

```bash
# Google Places API (for reviews)
GOOGLE_PLACES_API_KEY=your-google-places-api-key

# Yelp Fusion API (for reviews)
YELP_API_KEY=your-yelp-api-key

# Redis for caching (optional but recommended)
REDIS_URL=redis://localhost:6379
REDIS_HOST=localhost
REDIS_PORT=6379
```

### Security Best Practices

1. **API Key Restrictions**

   - Restrict Google API key to specific APIs and domains
   - Never commit API keys to version control
   - Use different keys for development and production

2. **Rate Limiting**

   - Built-in delays between requests (100ms Google, 200ms Yelp)
   - Caching reduces API calls
   - Monitor usage in API dashboards

3. **Error Handling**
   - Services gracefully handle missing API keys
   - Fallback to cached data or empty state
   - Comprehensive logging for debugging

## Usage

### API Endpoints

#### Get Reviews

```bash
GET /api/reviews
```

**Query Parameters:**

- `page` (number): Page number (default: 1)
- `limit` (number): Reviews per page (max: 50, default: 10)
- `source` (string): Filter by 'google' or 'yelp'
- `refresh` (boolean): Force refresh cache

**Response:**

```json
{
  "reviews": [...],
  "summary": {
    "totalReviews": 25,
    "averageRating": 4.8,
    "sourceBreakdown": {
      "google": 15,
      "yelp": 10
    },
    "ratingDistribution": {
      "1": 0, "2": 0, "3": 1, "4": 4, "5": 20
    }
  },
  "pagination": {
    "page": 1, "limit": 10, "total": 25, "totalPages": 3
  },
  "serviceStatus": {
    "google": true, "yelp": true, "anyAvailable": true
  }
}
```

#### Get Recent Reviews

```bash
GET /api/reviews/recent?days=30
```

#### Refresh Reviews

```bash
POST /api/reviews
Body: { "action": "refresh" }
```

#### Service Status

```bash
GET /api/reviews/status
```

#### Demo Data (for testing)

```bash
GET /api/reviews/demo
```

### React Components

#### ExternalReviews Component

```tsx
import ExternalReviews from '@/components/reviews/ExternalReviews';

<ExternalReviews maxReviews={6} showSummary={true} showRefresh={false} autoRefresh={false} />;
```

**Props:**

- `maxReviews` (number): Maximum reviews to display
- `showSummary` (boolean): Show summary statistics
- `showRefresh` (boolean): Show manual refresh button
- `autoRefresh` (boolean): Auto-refresh reviews
- `refreshInterval` (number): Auto-refresh interval in minutes

#### ReviewWidget Component

```tsx
import ReviewWidget from '@/components/reviews/ReviewWidget';

<ReviewWidget
  variant="compact" // or "full"
  showSource={true}
  maxReviews={3}
/>;
```

**Props:**

- `variant` ('compact' | 'full'): Display style
- `showSource` (boolean): Show review source breakdown
- `maxReviews` (number): Reviews to consider for summary

## Integration Examples

### Testimonials Page

```tsx
// Already integrated in /src/app/testimonials/page.tsx
import ExternalReviews from '@/components/reviews/ExternalReviews';
import ReviewWidget from '@/components/reviews/ReviewWidget';

// Summary widget
<ReviewWidget variant="full" showSource={true} />

// Full reviews display
<ExternalReviews
  maxReviews={6}
  showSummary={true}
  showRefresh={false}
/>
```

### Homepage Integration

```tsx
// Add to homepage for social proof
<ReviewWidget variant="compact" showSource={false} />
```

### Office Location Pages

```tsx
// Filter reviews by location
<ExternalReviews
  maxReviews={3}
  showSummary={false}
  // Add location filtering in future update
/>
```

## Caching Strategy

### Redis Cache

- **Key**: `vasquez-law-external-reviews`
- **TTL**: 3600 seconds (1 hour)
- **Fallback**: In-memory cache if Redis unavailable

### Cache Behavior

1. First request fetches from APIs and caches result
2. Subsequent requests serve from cache until expiry
3. Cache can be manually refreshed via API or admin action
4. Failed API calls don't overwrite existing cache

## Testing

### Demo Mode

```bash
# Test with sample data
curl http://localhost:3000/api/reviews/demo
```

### API Testing

```bash
# Test service status
curl http://localhost:3000/api/reviews/status

# Test reviews endpoint
curl http://localhost:3000/api/reviews?limit=5

# Force refresh
curl -X POST http://localhost:3000/api/reviews -d '{"action":"refresh"}' -H "Content-Type: application/json"
```

### Component Testing

1. Load `/testimonials` page
2. Check browser console for any errors
3. Verify reviews display correctly
4. Test with and without API keys configured

## Monitoring & Maintenance

### API Usage Monitoring

1. **Google Cloud Console**

   - Monitor API quotas and usage
   - Set up billing alerts
   - Review error rates

2. **Yelp Developer Dashboard**
   - Monitor API usage against plan limits
   - Track remaining quota
   - Review billing information

### Error Monitoring

- Check application logs for API errors
- Monitor cache hit/miss rates
- Track user experience impacts

### Regular Tasks

- [ ] Review API usage monthly
- [ ] Monitor costs and adjust caching if needed
- [ ] Update business listings if locations change
- [ ] Test API endpoints after deployments

## Troubleshooting

### Common Issues

#### "Google Places API key not found"

```bash
# Solution: Add to environment
GOOGLE_PLACES_API_KEY=your-key-here
```

#### "No place found for query"

- Business may not be listed on Google
- Try different search terms
- Verify business is publicly visible
- Check if place_id exists manually

#### "Yelp API error: 401 Unauthorized"

- Verify API key is correct
- Check if Yelp app is approved
- Ensure paid plan is active for commercial use

#### "Reviews unavailable"

- Check network connectivity
- Verify API keys are valid
- Review rate limiting logs
- Check service status endpoints

### Debugging Steps

1. **Check Service Status**

   ```bash
   curl http://localhost:3000/api/reviews/status
   ```

2. **Test Individual Services**

   ```bash
   # Check logs for specific error messages
   # Verify environment variables are loaded
   # Test API keys with simple requests
   ```

3. **Cache Issues**
   ```bash
   # Clear cache manually
   curl -X POST http://localhost:3000/api/reviews -d '{"action":"refresh"}'
   ```

## Future Enhancements

### Planned Features

- [ ] **Location-based filtering** - Filter reviews by office location
- [ ] **Review moderation** - Admin panel to manage displayed reviews
- [ ] **Additional sources** - Facebook, Avvo, Martindale-Hubbell
- [ ] **Sentiment analysis** - AI-powered review analysis
- [ ] **Review responses** - Display business responses to reviews
- [ ] **Schema markup** - Enhanced SEO with review structured data

### Performance Optimizations

- [ ] **Incremental updates** - Only fetch new reviews since last update
- [ ] **CDN caching** - Cache review images and data globally
- [ ] **Background jobs** - Async review fetching with job queue
- [ ] **Webhook integrations** - Real-time updates when new reviews arrive

## Support

For technical support with this integration:

1. **API Issues**: Check provider documentation (Google/Yelp)
2. **Code Issues**: Review component source code and logs
3. **Configuration**: Verify environment variables and API keys
4. **Performance**: Monitor cache hit rates and API usage

---

**Last Updated**: July 1, 2025  
**Version**: 1.0  
**Contact**: Development Team
