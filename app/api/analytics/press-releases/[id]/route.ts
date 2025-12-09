import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const propertyId = process.env.GA_PROPERTY_ID || '442920183';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: path.join(process.cwd(), 'lib', 'google-analytics-credentials.json'),
});

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');

    // Get press release details from Supabase
    const { data: pressRelease, error: supabaseError } = await supabase
      .from('press_releases')
      .select('*')
      .eq('id', id)
      .single();

    if (supabaseError || !pressRelease) {
      return NextResponse.json(
        { error: 'Press release not found' },
        { status: 404 }
      );
    }

    // Fetch analytics data for this specific press release
    const [pageViewsResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: `${days}daysAgo`,
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'date',
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
            value: id,
          },
        },
      },
    });

    // Process daily views
    const dailyViews = pageViewsResponse.rows?.map((row) => ({
      date: row.dimensionValues?.[0]?.value || '',
      views: parseInt(row.metricValues?.[0]?.value || '0'),
      users: parseInt(row.metricValues?.[1]?.value || '0'),
    })) || [];

    // Calculate totals
    const totalViews = dailyViews.reduce((sum, day) => sum + day.views, 0);
    const totalUsers = dailyViews.reduce((sum, day) => sum + day.users, 0);

    // Fetch traffic sources for this press release
    const [trafficSourcesResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: `${days}daysAgo`,
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'sessionSource',
        },
      ],
      metrics: [
        {
          name: 'sessions',
        },
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'pagePath',
          stringFilter: {
            matchType: 'CONTAINS',
            value: id,
          },
        },
      },
      orderBys: [
        {
          metric: {
            metricName: 'sessions',
          },
          desc: true,
        },
      ],
      limit: 10,
    });

    const trafficSources = trafficSourcesResponse.rows?.map((row) => ({
      source: row.dimensionValues?.[0]?.value || 'Unknown',
      sessions: parseInt(row.metricValues?.[0]?.value || '0'),
    })) || [];

    const totalSessions = trafficSources.reduce((sum, source) => sum + source.sessions, 0);

    const trafficSourcesWithPercentage = trafficSources.map((source) => ({
      ...source,
      percentage: totalSessions > 0 ? ((source.sessions / totalSessions) * 100).toFixed(1) : '0',
    }));

    // Fetch device breakdown
    const [deviceResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: `${days}daysAgo`,
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'deviceCategory',
        },
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'pagePath',
          stringFilter: {
            matchType: 'CONTAINS',
            value: id,
          },
        },
      },
    });

    const devices = deviceResponse.rows?.map((row) => ({
      device: row.dimensionValues?.[0]?.value || 'Unknown',
      users: parseInt(row.metricValues?.[0]?.value || '0'),
    })) || [];

    const totalDeviceUsers = devices.reduce((sum, device) => sum + device.users, 0);

    const devicesWithPercentage = devices.map((device) => ({
      ...device,
      percentage: totalDeviceUsers > 0 ? ((device.users / totalDeviceUsers) * 100).toFixed(1) : '0',
    }));

    return NextResponse.json({
      pressRelease: {
        id: pressRelease.id,
        title: pressRelease.title,
        category: pressRelease.category,
        description: pressRelease.description,
        publishedDate: pressRelease.published_date,
        createdAt: pressRelease.created_at,
      },
      analytics: {
        period: `${days} days`,
        totalViews,
        totalUsers,
        totalSessions,
        dailyViews,
        trafficSources: trafficSourcesWithPercentage,
        devices: devicesWithPercentage,
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
