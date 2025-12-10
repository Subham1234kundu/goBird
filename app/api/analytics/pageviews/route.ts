import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';
import path from 'path';

const propertyId = process.env.GA_PROPERTY_ID || '442920183';

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: path.join(process.cwd(), 'lib', 'google-analytics-credentials.json'),
});

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
