import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';
import path from 'path';

const propertyId = process.env.GA_PROPERTY_ID || '442920183';

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: path.join(process.cwd(), 'lib', 'google-analytics-credentials.json'),
});

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
