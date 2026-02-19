import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';

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

// Helper function to format GA date (YYYYMMDD) to ISO format (YYYY-MM-DD)
function formatGADate(gaDate: string): string {
  if (!gaDate || gaDate.length !== 8) return gaDate;
  const year = gaDate.substring(0, 4);
  const month = gaDate.substring(4, 6);
  const day = gaDate.substring(6, 8);
  return `${year}-${month}-${day}`;
}

export async function GET(request: Request) {
  try {
    // Check if analytics client is configured
    if (!analyticsDataClient) {
      console.error('Google Analytics credentials not configured');
      return NextResponse.json(
        {
          error: 'Analytics not configured',
          data: [],
          totalPageViews: 0,
          totalSessions: 0
        },
        { status: 200 }
      );
    }

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate') || '7daysAgo';
    const endDate = searchParams.get('endDate') || 'today';

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate,
          endDate,
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
          name: 'sessions',
        },
      ],
      orderBys: [
        {
          dimension: {
            dimensionName: 'date',
          },
        },
      ],
    });

    const data = response.rows?.map((row) => ({
      date: formatGADate(row.dimensionValues?.[0]?.value || ''),
      pageViews: parseInt(row.metricValues?.[0]?.value || '0'),
      sessions: parseInt(row.metricValues?.[1]?.value || '0'),
    })) || [];

    const totalPageViews = data.reduce((sum, item) => sum + item.pageViews, 0);
    const totalSessions = data.reduce((sum, item) => sum + item.sessions, 0);

    return NextResponse.json({
      data,
      totalPageViews,
      totalSessions,
    });
  } catch (error) {
    console.error('Error fetching pageviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pageviews' },
      { status: 500 }
    );
  }
}
