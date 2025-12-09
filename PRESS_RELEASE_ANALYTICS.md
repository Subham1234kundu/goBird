# Press Release Analytics Implementation

## Overview

I've implemented a comprehensive press release system with real-time Google Analytics tracking. Your press releases now display **real data from your database** and track visitor analytics.

## What's Been Implemented

### 1. Public Press Release Listing Page ([/pressRelease](app/pressRelease/page.tsx))
**Before:** Static/hardcoded press releases
**After:** Dynamic press releases fetched from Supabase database

**Features:**
- Fetches real press releases from your database
- Displays cover images, titles, categories, and descriptions
- Pagination (4 press releases per page)
- Loading skeleton for better UX
- Click "Read more" to view full press release
- Responsive design

### 2. Individual Press Release Detail Page ([/pressRelease/[id]](app/pressRelease/[id]/page.tsx))
**NEW:** Complete press release view page

**Features:**
- Full press release content display
- Cover image showcase
- Category badge
- Published date
- Share functionality (native share API or copy link)
- Back button to listing page
- Responsive design
- SEO-friendly structure

### 3. Admin Press Release Page ([/Admin/press-release](app/Admin/press-release/page.tsx))
**Added:** Analytics summary cards at the top

**Features:**
- **Total Press Releases** count
- **Total Views** (last 30 days from Google Analytics)
- **Total Users** who viewed press releases
- **Average Views Per Release**
- Auto-refreshes every 5 minutes

### 4. Press Release Analytics Detail Page ([/Admin/press-release/analytics/[id]](app/Admin/press-release/analytics/[id]/page.tsx))
**NEW:** Individual press release analytics dashboard

**Features:**
- **Summary Stats**: Total Views, Users, Sessions
- **Daily Views Chart**: Bar chart showing views over time
- **Device Breakdown**: Pie chart (Desktop, Mobile, Tablet)
- **Traffic Sources**: List with percentages (Google, Direct, Social Media, etc.)
- **30-day analytics period**
- Auto-refreshes every 5 minutes

## API Endpoints

### 1. Press Release Analytics Summary
```
GET /api/analytics/press-releases?days=30
```

**Response:**
```json
{
  "pressReleases": [
    {
      "id": "uuid",
      "title": "Press Release Title",
      "publishedDate": "2025-01-15",
      "views": 1250,
      "users": 890
    }
  ],
  "summary": {
    "totalPressReleases": 15,
    "totalViews": 18750,
    "totalUsers": 12500,
    "averageViewsPerRelease": 1250,
    "period": "30 days"
  }
}
```

### 2. Individual Press Release Analytics
```
GET /api/analytics/press-releases/[id]?days=30
```

**Response:**
```json
{
  "pressRelease": {
    "id": "uuid",
    "title": "Title",
    "category": "Product Launch",
    "description": "...",
    "publishedDate": "2025-01-15"
  },
  "analytics": {
    "period": "30 days",
    "totalViews": 1250,
    "totalUsers": 890,
    "totalSessions": 1100,
    "dailyViews": [
      { "date": "20250115", "views": 45, "users": 32 }
    ],
    "trafficSources": [
      { "source": "google", "sessions": 450, "percentage": "40.9" }
    ],
    "devices": [
      { "device": "desktop", "users": 534, "percentage": "60.0" }
    ]
  }
}
```

## How It Works

### Google Analytics Tracking

1. **Frontend Tracking** ([components/GoogleAnalytics.tsx](components/GoogleAnalytics.tsx))
   - Automatically tracks page views when users visit press release pages
   - Uses URL pattern: `/pressRelease/[id]`
   - Tracks via Google Analytics Measurement ID: `G-CKHFRBZLWK`

2. **Backend Analytics Fetching** (API Routes)
   - Uses Google Analytics Data API with service account
   - Filters page views by URL pattern containing `/pressRelease`
   - Extracts press release ID from URL to match analytics to specific releases
   - Combines data with press release info from Supabase

### URL Structure

- **Listing Page**: `/pressRelease`
- **Detail Page**: `/pressRelease/[id]` (e.g., `/pressRelease/123e4567-e89b-12d3-a456-426614174000`)
- **Admin Analytics**: `/Admin/press-release/analytics/[id]`

Google Analytics tracks these URLs, and the API routes extract the ID to provide per-release analytics.

## Components Created

1. **PressReleaseAnalyticsSummary.tsx**
   - Summary cards for admin press release page
   - Shows total releases, views, users, and average

2. **Individual Analytics Page**
   - Complete analytics dashboard for single press release
   - Charts for daily views, devices, and traffic sources

## Database Structure

The implementation uses your existing `press_releases` table in Supabase:

```sql
Table: press_releases
- id (uuid)
- title (text)
- category (text)
- description (text)
- content (text)
- cover_image_url (text)
- published_date (timestamp)
- created_at (timestamp)
- updated_at (timestamp)
```

## How to Use

### For Admin Users:

1. **View Overall Analytics**
   - Go to `/Admin/press-release`
   - See summary cards at the top showing total views and users
   - Create new press releases as usual

2. **View Individual Press Release Analytics**
   - Navigate to `/Admin/press-release/analytics/[press-release-id]`
   - See detailed analytics with charts and graphs
   - Monitor daily views, traffic sources, and device breakdown

### For Public Visitors:

1. **Browse Press Releases**
   - Visit `/pressRelease`
   - See all published press releases
   - Use pagination to browse

2. **Read Full Press Release**
   - Click "Read more" on any press release
   - View full content with images
   - Share the press release

## Analytics Data Flow

```
User visits /pressRelease/[id]
        ↓
Google Analytics tracks page view
        ↓
Data stored in Google Analytics
        ↓
Admin views analytics dashboard
        ↓
API fetches data from Google Analytics Data API
        ↓
Data combined with press release info from Supabase
        ↓
Charts and stats displayed in dashboard
```

## Features Summary

### Public Features
✅ Dynamic press release listing
✅ Individual press release detail pages
✅ Cover images and rich content display
✅ Pagination
✅ Share functionality
✅ Responsive design
✅ Loading states

### Admin Features
✅ Analytics summary on main page
✅ Individual press release analytics dashboard
✅ Real-time Google Analytics data
✅ Daily views chart
✅ Traffic sources breakdown
✅ Device analytics (Desktop/Mobile/Tablet)
✅ Auto-refresh every 5 minutes
✅ 30-day analytics period

### Analytics Metrics
✅ Total Views
✅ Unique Users
✅ Total Sessions
✅ Traffic Sources (Google, Direct, Social, etc.)
✅ Device Breakdown
✅ Daily Trends
✅ Percentage Changes

## Next Steps (Optional Enhancements)

- [ ] Add "View Analytics" button in press release table
- [ ] Export analytics data to CSV
- [ ] Email alerts for viral press releases
- [ ] Comparison between multiple press releases
- [ ] Geographic data (which countries are reading)
- [ ] Reading time analytics
- [ ] Social media share tracking
- [ ] Related press releases suggestions

## Troubleshooting

### Press Releases Not Showing
1. Check that press releases exist in Supabase `press_releases` table
2. Ensure `published_date` is set
3. Check browser console for errors

### Analytics Not Showing
1. Verify service account has access to GA4 property
2. Check that Google Analytics Data API is enabled
3. Ensure press release URLs are being tracked (visit a press release page)
4. Wait 24-48 hours for Google Analytics to populate historical data
5. Check API endpoint responses in browser DevTools → Network tab

### Images Not Loading
1. Verify `cover_image_url` is a valid URL
2. Check CORS settings if images are from external sources
3. Ensure images are properly uploaded to Supabase Storage

## Security

✅ Service account credentials stored server-side only
✅ API routes are server-side (Next.js API routes)
✅ No credentials exposed to frontend
✅ Supabase RLS (Row Level Security) recommended

## Performance

- Analytics data cached for 5 minutes (auto-refresh interval)
- Pagination limits to 4 press releases per page
- Lazy loading for images
- Optimized database queries

---

**Implementation Complete!** 🎉

Your press release system now has:
1. **Dynamic content** from your database
2. **Individual detail pages** for each press release
3. **Real-time analytics** from Google Analytics
4. **Professional analytics dashboard** for tracking performance

All press releases created by admin are automatically displayed on the public page and tracked in Google Analytics!
