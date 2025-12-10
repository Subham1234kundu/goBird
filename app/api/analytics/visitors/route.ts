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
          name: 'newVsReturning',
        },
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
      ],
    });

    let newUsers = 0;
    let returningUsers = 0;

    response.rows?.forEach((row) => {
      const userType = row.dimensionValues?.[0]?.value || '';
      const count = parseInt(row.metricValues?.[0]?.value || '0');

      if (userType === 'new') {
        newUsers = count;
      } else if (userType === 'returning') {
        returningUsers = count;
      }
    });

    const totalUsers = newUsers + returningUsers;
    const newUserPercentage = totalUsers > 0 ? ((newUsers / totalUsers) * 100).toFixed(1) : '0';
    const returningUserPercentage = totalUsers > 0 ? ((returningUsers / totalUsers) * 100).toFixed(1) : '0';

    return NextResponse.json({
      totalUsers,
      newUsers,
      returningUsers,
      newUserPercentage,
      returningUserPercentage,
    });
  } catch (error) {
    console.error('Error fetching visitors data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visitors data' },
      { status: 500 }
    );
  }
}
