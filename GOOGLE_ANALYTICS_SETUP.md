# Google Analytics Integration Documentation

## Overview

This project integrates Google Analytics 4 (GA4) with real-time data fetching, displaying analytics on both the Dashboard and Google Analytics admin pages.

## Features

- **Real-time Active Users** - Live count of users currently on your website (updates every 30 seconds)
- **Page Views Analytics** - 7-day historical data with beautiful charts
- **Visitor Segmentation** - New vs Returning users with pie chart visualization
- **Traffic Sources** - Top traffic sources with session counts and percentages
- **Sessions Analytics** - Daily session breakdowns over the past week
- **Dashboard Integration** - Real-time stats for Leads, Press Releases, and Page Views

## Configuration

### Environment Variables

The following environment variables are configured in `.env.local`:

```env
NEXT_PUBLIC_GA_ID=G-CKHFRBZLWK
GA_PROPERTY_ID=442920183
```

- `NEXT_PUBLIC_GA_ID`: Your Google Analytics Measurement ID (visible in frontend)
- `GA_PROPERTY_ID`: Your GA4 Property ID (used for server-side data fetching)

### Service Account Setup

The Google Analytics service account credentials are stored in:
`lib/google-analytics-credentials.json`

**Service Account Email:** gaservice-account@grobird-main.iam.gserviceaccount.com

**Important:** Make sure this service account has the following permissions in your Google Analytics property:
1. Go to your GA4 Property → Admin → Property Access Management
2. Add the service account email with "Viewer" role

## API Endpoints

### 1. Real-time Active Users
**Endpoint:** `/api/analytics/realtime`
**Method:** GET
**Description:** Fetches the current number of active users on your website
**Refresh Rate:** Every 30 seconds

### 2. Page Views
**Endpoint:** `/api/analytics/pageviews?days=7`
**Method:** GET
**Parameters:**
- `days` (optional): Number of days to fetch (default: 7)

**Response:**
```json
{
  "data": [
    { "date": "20240101", "pageViews": 1250, "sessions": 850 }
  ],
  "totalPageViews": 8750,
  "totalSessions": 5800,
  "period": "7 days"
}
```

### 3. Visitors Data
**Endpoint:** `/api/analytics/visitors?days=7`
**Method:** GET
**Response:**
```json
{
  "totalUsers": 2548,
  "newUsers": 892,
  "returningUsers": 1656,
  "newUserPercentage": "35.0",
  "returningUserPercentage": "65.0"
}
```

### 4. Traffic Sources
**Endpoint:** `/api/analytics/traffic-sources?days=7`
**Method:** GET
**Response:**
```json
{
  "data": [
    { "source": "google", "sessions": 2500, "percentage": "45.5" }
  ],
  "totalSessions": 5500
}
```

### 5. Dashboard Stats
**Endpoint:** `/api/analytics/dashboard-stats`
**Method:** GET
**Description:** Comprehensive stats combining Google Analytics and Supabase data
**Response:**
```json
{
  "leads": {
    "current": 45,
    "change": "11.4",
    "trend": "up",
    "data": [5, 8, 12, 6, 8, 4, 2]
  },
  "pressReleases": {
    "current": 12,
    "change": "-5.2",
    "trend": "down",
    "data": [2, 1, 3, 2, 2, 1, 1]
  },
  "pageViews": {
    "current": 8750,
    "change": "22.1",
    "trend": "up",
    "data": [1200, 1450, 1100, 1300, 1250, 1200, 1250]
  }
}
```

## Components

### Dashboard Components

1. **StatCard** ([components/Admin/Dashboard/StatCard.tsx](components/Admin/Dashboard/StatCard.tsx))
   - Displays metric cards with sparkline charts
   - Shows percentage change and trend indicators
   - Updates every 5 minutes

2. **PageViewsChart** ([components/Admin/Dashboard/PageViewsChart.tsx](components/Admin/Dashboard/PageViewsChart.tsx))
   - Bar chart showing daily page views
   - Auto-refreshes every 5 minutes
   - Displays total page views

3. **TrafficSourcesChart** ([components/Admin/Dashboard/TrafficSourcesChart.tsx](components/Admin/Dashboard/TrafficSourcesChart.tsx))
   - Displays traffic distribution by source

### Google Analytics Components

1. **RealTimeActiveUsers** ([components/Admin/GoogleAnalytics/RealTimeActiveUsers.tsx](components/Admin/GoogleAnalytics/RealTimeActiveUsers.tsx))
   - Live indicator showing currently active users
   - Updates every 30 seconds
   - Green pulse animation for "live" effect

2. **VisitorsChart** ([components/Admin/GoogleAnalytics/VisitorsChart.tsx](components/Admin/GoogleAnalytics/VisitorsChart.tsx))
   - Donut chart showing new vs returning users
   - Auto-refreshes every 5 minutes

3. **TrafficSourcesList** ([components/Admin/GoogleAnalytics/TrafficSourcesList.tsx](components/Admin/GoogleAnalytics/TrafficSourcesList.tsx))
   - List view of top traffic sources
   - Progress bars showing percentage distribution
   - Auto-refreshes every 5 minutes

4. **SessionsChart** ([components/Admin/GoogleAnalytics/SessionsChart.tsx](components/Admin/GoogleAnalytics/SessionsChart.tsx))
   - Bar chart showing daily sessions
   - Auto-refreshes every 5 minutes

## Pages

### Admin Dashboard
**Route:** `/Admin/dashboard`
**Features:**
- Real-time leads tracking (from Supabase)
- Press releases count (from Supabase)
- Page views from Google Analytics
- 7-day trend comparisons with percentage changes
- Recent leads table
- Page views and traffic sources charts

### Google Analytics Page
**Route:** `/Admin/google-analytics`
**Features:**
- Real-time active users card
- Page views chart (7 days)
- Visitors breakdown (new vs returning)
- Traffic sources list with percentages
- Sessions chart

## Frontend Tracking

Google Analytics tracking is implemented via the `GoogleAnalytics` component in [components/GoogleAnalytics.tsx](components/GoogleAnalytics.tsx).

This component:
- Loads the Google Analytics script
- Tracks page views automatically on route changes
- Uses Next.js `usePathname` and `useSearchParams` hooks

The component is included in the root layout ([app/layout.tsx](app/layout.tsx)).

## Data Refresh Intervals

- **Real-time Active Users:** 30 seconds
- **All other metrics:** 5 minutes
- **Manual refresh:** Refresh the page

## Troubleshooting

### No data showing in charts

1. **Check Service Account Permissions:**
   - Ensure gaservice-account@grobird-main.iam.gserviceaccount.com has "Viewer" access in GA4
   - Go to GA4 Property → Admin → Property Access Management

2. **Verify Property ID:**
   - Confirm `GA_PROPERTY_ID=442920183` is correct
   - You can find this in GA4 Admin → Property Settings

3. **Check API responses:**
   - Open browser DevTools → Network tab
   - Look for `/api/analytics/*` requests
   - Check for any error messages in the response

4. **Verify credentials file:**
   - Ensure `lib/google-analytics-credentials.json` exists and is valid
   - The file should not be committed to git (add to .gitignore)

### "Failed to fetch" errors

- Check that the Google Analytics Data API is enabled in Google Cloud Console
- Verify the service account JSON file is in the correct location
- Check server logs for detailed error messages

### Data seems outdated

- Google Analytics data can have a delay of up to 24-48 hours for some metrics
- Real-time data should update within seconds
- Historical data (7-day views) updates approximately every 4 hours in GA4

## Security Notes

1. **Service Account File:** Never commit the credentials JSON file to version control
2. **Environment Variables:** Keep `.env.local` private and never expose publicly
3. **API Routes:** These are server-side only and don't expose credentials to the frontend
4. **Rate Limiting:** Consider implementing rate limiting on API routes in production

## Dependencies

```json
{
  "@google-analytics/data": "^4.x.x",
  "googleapis": "^latest",
  "chart.js": "^4.5.1",
  "react-chartjs-2": "^5.3.1",
  "recharts": "^3.5.1"
}
```

## Future Enhancements

- [ ] Add date range selector (Last 7/30/90 days)
- [ ] Export analytics data to CSV
- [ ] Custom event tracking
- [ ] Goal completion tracking
- [ ] A/B testing metrics
- [ ] Device and browser breakdown
- [ ] Geographic data visualization
- [ ] Conversion funnel analysis

## Support

For issues related to Google Analytics integration, check:
- [Google Analytics Data API Documentation](https://developers.google.com/analytics/devguides/reporting/data/v1)
- [GA4 Property Setup Guide](https://support.google.com/analytics/answer/9304153)
