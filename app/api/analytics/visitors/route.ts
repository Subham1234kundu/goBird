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
          totalUsers: 0,
          newUsers: 0,
          returningUsers: 0,
          newUserPercentage: '0',
          returningUserPercentage: '0',
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
      {
        totalUsers: 0,
        newUsers: 0,
        returningUsers: 0,
        newUserPercentage: '0',
        returningUserPercentage: '0',
      },
      { status: 200 }
    );
  }
}
