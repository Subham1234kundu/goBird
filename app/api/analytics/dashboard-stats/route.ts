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

export async function GET() {
  try {
    const supabase = getSupabaseClient();

    // Fetch page views from Google Analytics
    const [pageViewsResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: 'today',
        },
        {
          startDate: '14daysAgo',
          endDate: '7daysAgo',
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
      ],
    });

    // Process page views data
    const currentPeriodViews: number[] = [];
    const previousPeriodViews: number[] = [];

    pageViewsResponse.rows?.forEach((row) => {
      const dateRange = row.dimensionValues?.[0]?.value || '';
      const views = parseInt(row.metricValues?.[0]?.value || '0');

      if (dateRange >= '7daysAgo') {
        currentPeriodViews.push(views);
      } else {
        previousPeriodViews.push(views);
      }
    });

    const currentTotalViews = currentPeriodViews.reduce((a, b) => a + b, 0);
    const previousTotalViews = previousPeriodViews.reduce((a, b) => a + b, 0);
    const viewsChange = previousTotalViews > 0
      ? (((currentTotalViews - previousTotalViews) / previousTotalViews) * 100).toFixed(1)
      : '0';

    // Fetch leads from Supabase
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    const fourteenDaysAgo = new Date(today);
    fourteenDaysAgo.setDate(today.getDate() - 14);

    const { data: currentLeads } = await supabase
      .from('leads')
      .select('*')
      .gte('created_at', sevenDaysAgo.toISOString());

    const { data: previousLeads } = await supabase
      .from('leads')
      .select('*')
      .gte('created_at', fourteenDaysAgo.toISOString())
      .lt('created_at', sevenDaysAgo.toISOString());

    const currentLeadsCount = currentLeads?.length || 0;
    const previousLeadsCount = previousLeads?.length || 0;
    const leadsChange = previousLeadsCount > 0
      ? (((currentLeadsCount - previousLeadsCount) / previousLeadsCount) * 100).toFixed(1)
      : '0';

    // Fetch press releases from Supabase
    const { data: currentPressReleases } = await supabase
      .from('press_releases')
      .select('*')
      .gte('created_at', sevenDaysAgo.toISOString());

    const { data: previousPressReleases } = await supabase
      .from('press_releases')
      .select('*')
      .gte('created_at', fourteenDaysAgo.toISOString())
      .lt('created_at', sevenDaysAgo.toISOString());

    const currentPRCount = currentPressReleases?.length || 0;
    const previousPRCount = previousPressReleases?.length || 0;
    const prChange = previousPRCount > 0
      ? (((currentPRCount - previousPRCount) / previousPRCount) * 100).toFixed(1)
      : '0';

    // Get daily leads data for chart
    const leadsData: number[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);

      const { data: dailyLeads } = await supabase
        .from('leads')
        .select('*')
        .gte('created_at', date.toISOString())
        .lt('created_at', nextDate.toISOString());

      leadsData.push(dailyLeads?.length || 0);
    }

    // Get daily press releases data for chart
    const prData: number[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);

      const { data: dailyPR } = await supabase
        .from('press_releases')
        .select('*')
        .gte('created_at', date.toISOString())
        .lt('created_at', nextDate.toISOString());

      prData.push(dailyPR?.length || 0);
    }

    return NextResponse.json({
      leads: {
        current: currentLeadsCount,
        change: leadsChange,
        trend: parseFloat(leadsChange) >= 0 ? 'up' : 'down',
        data: leadsData,
      },
      pressReleases: {
        current: currentPRCount,
        change: prChange,
        trend: parseFloat(prChange) >= 0 ? 'up' : 'down',
        data: prData,
      },
      pageViews: {
        current: currentTotalViews,
        change: viewsChange,
        trend: parseFloat(viewsChange) >= 0 ? 'up' : 'down',
        data: currentPeriodViews,
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
