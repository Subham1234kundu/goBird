import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const propertyId = process.env.GA_PROPERTY_ID || '442920183';

// Initialize Google Analytics client with environment variables
const getAnalyticsClient = () => {
  // Check if we're using a credentials file (local development)
  if (process.env.GA_CREDENTIALS_FILE) {
    return new BetaAnalyticsDataClient({
      keyFilename: process.env.GA_CREDENTIALS_FILE,
    });
  }

  // Use environment variables (production)
  if (process.env.GA_CLIENT_EMAIL && process.env.GA_PRIVATE_KEY) {
    return new BetaAnalyticsDataClient({
      credentials: {
        client_email: process.env.GA_CLIENT_EMAIL,
        private_key: process.env.GA_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
    });
  }

  // No credentials configured
  return null;
};

const analyticsDataClient = getAnalyticsClient();

// Initialize Supabase client function
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
  return createClient(supabaseUrl, supabaseKey);
}

export async function GET() {
  try {
    const supabase = getSupabaseClient();

    // Initialize default values
    let currentTotalViews = 0;
    let previousTotalViews = 0;
    const currentPeriodViews: number[] = [];

    // Fetch page views from Google Analytics if configured
    if (analyticsDataClient) {
      try {
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

        currentTotalViews = currentPeriodViews.reduce((a, b) => a + b, 0);
        previousTotalViews = previousPeriodViews.reduce((a, b) => a + b, 0);
      } catch (gaError) {
        console.error('Error fetching Google Analytics data:', gaError);
      }
    } else {
      console.error('Google Analytics credentials not configured');
    }

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
      {
        leads: {
          current: 0,
          change: '0',
          trend: 'up',
          data: [0, 0, 0, 0, 0, 0, 0],
        },
        pressReleases: {
          current: 0,
          change: '0',
          trend: 'up',
          data: [0, 0, 0, 0, 0, 0, 0],
        },
        pageViews: {
          current: 0,
          change: '0',
          trend: 'up',
          data: [0, 0, 0, 0, 0, 0, 0],
        },
      },
      { status: 200 }
    );
  }
}
