import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const propertyId = process.env.GA_PROPERTY_ID || '442920183';

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: path.join(process.cwd(), 'lib', 'google-analytics-credentials.json'),
});

// Initialize Supabase client function
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
  return createClient(supabaseUrl, supabaseKey);
}

export async function GET(request: Request) {
  try {
    const supabase = getSupabaseClient();
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');

    // Get all press releases from Supabase
    const { data: pressReleases, error: supabaseError } = await supabase
      .from('press_releases')
      .select('id, title, created_at, published_date')
      .order('created_at', { ascending: false });

    if (supabaseError) {
      throw new Error(`Supabase error: ${supabaseError.message}`);
    }

    // Fetch page views for press release pages from Google Analytics
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: `${days}daysAgo`,
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'pagePath',
        },
      ],
      metrics: [
        {
          name: 'screenPageViews',
        },
        {
          name: 'activeUsers',
        },
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'pagePath',
          stringFilter: {
            matchType: 'CONTAINS',
            value: '/pressRelease',
          },
        },
      },
    });

    // Map page views to press releases
    const pressReleaseViews = new Map<string, { views: number; users: number }>();

    response.rows?.forEach((row) => {
      const pagePath = row.dimensionValues?.[0]?.value || '';
      const views = parseInt(row.metricValues?.[0]?.value || '0');
      const users = parseInt(row.metricValues?.[1]?.value || '0');

      // Extract press release ID from path if it matches pattern
      // Assuming URL pattern: /pressRelease/[id] or /pressRelease?id=[id]
      const idMatch = pagePath.match(/pressRelease[\/\?].*?([a-f0-9-]{36})/i);
      if (idMatch) {
        const id = idMatch[1];
        const existing = pressReleaseViews.get(id) || { views: 0, users: 0 };
        pressReleaseViews.set(id, {
          views: existing.views + views,
          users: existing.users + users,
        });
      }
    });

    // Combine data
    const analyticsData = pressReleases?.map((pr) => {
      const analytics = pressReleaseViews.get(pr.id) || { views: 0, users: 0 };
      return {
        id: pr.id,
        title: pr.title,
        publishedDate: pr.published_date,
        createdAt: pr.created_at,
        views: analytics.views,
        users: analytics.users,
      };
    }) || [];

    // Calculate totals
    const totalViews = analyticsData.reduce((sum, item) => sum + item.views, 0);
    const totalUsers = analyticsData.reduce((sum, item) => sum + item.users, 0);
    const totalPressReleases = analyticsData.length;

    // Sort by views (most viewed first)
    analyticsData.sort((a, b) => b.views - a.views);

    return NextResponse.json({
      pressReleases: analyticsData,
      summary: {
        totalPressReleases,
        totalViews,
        totalUsers,
        averageViewsPerRelease: totalPressReleases > 0 ? Math.round(totalViews / totalPressReleases) : 0,
        period: `${days} days`,
      },
    });
  } catch (error) {
    console.error('Error fetching press release analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch press release analytics' },
      { status: 500 }
    );
  }
}
