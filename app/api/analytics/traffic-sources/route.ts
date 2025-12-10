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

export async function GET(request: Request) {
  try {
    // Check if analytics client is configured
    if (!analyticsDataClient) {
      console.error('Google Analytics credentials not configured');
      return NextResponse.json(
        {
          error: 'Analytics not configured',
          data: [],
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
          name: 'sessionSource',
        },
      ],
      metrics: [
        {
          name: 'sessions',
        },
      ],
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

    const data = response.rows?.map((row) => ({
      source: row.dimensionValues?.[0]?.value || 'Unknown',
      sessions: parseInt(row.metricValues?.[0]?.value || '0'),
    })) || [];

    const totalSessions = data.reduce((sum, item) => sum + item.sessions, 0);

    const dataWithPercentage = data.map((item) => ({
      ...item,
      percentage: totalSessions > 0 ? ((item.sessions / totalSessions) * 100).toFixed(1) : '0',
    }));

    return NextResponse.json({
      data: dataWithPercentage,
      totalSessions,
    });
  } catch (error) {
    console.error('Error fetching traffic sources:', error);
    return NextResponse.json(
      { error: 'Failed to fetch traffic sources' },
      { status: 500 }
    );
  }
}
