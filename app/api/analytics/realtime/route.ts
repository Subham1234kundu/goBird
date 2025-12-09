import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';
import path from 'path';

const propertyId = process.env.GA_PROPERTY_ID || '442920183';

// Initialize the Google Analytics Data API client
const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: path.join(process.cwd(), 'lib', 'google-analytics-credentials.json'),
});

export async function GET() {
  try {
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
      { error: 'Failed to fetch realtime data' },
      { status: 500 }
    );
  }
}
