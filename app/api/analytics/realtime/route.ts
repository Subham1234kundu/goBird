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

export async function GET() {
  try {
    // Check if analytics client is configured
    if (!analyticsDataClient) {
      console.error('Google Analytics credentials not configured');
      return NextResponse.json(
        {
          activeUsers: 0,
          timestamp: new Date().toISOString(),
        },
        { status: 200 }
      );
    }

    const [response] = await analyticsDataClient.runRealtimeReport({
      property: `properties/${propertyId}`,
      dimensions: [
        {
          name: 'unifiedScreenName',
        },
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
      ],
    });

    const activeUsers = response.rows?.reduce((sum, row) => {
      return sum + parseInt(row.metricValues?.[0]?.value || '0');
    }, 0) || 0;

    return NextResponse.json({
      activeUsers,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching realtime data:', error);
    return NextResponse.json(
      {
        activeUsers: 0,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  }
}
