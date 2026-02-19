"use client";

import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

interface PageViewData {
    date: string;
    pageViews: number;
    sessions: number;
}

interface PageViewsResponse {
    data: PageViewData[];
    totalPageViews: number;
    totalSessions: number;
}

interface PageViewsChartProps {
    dateFilter: string;
    customStartDate?: Date | null;
    customEndDate?: Date | null;
}

export default function PageViewsChart({ dateFilter, customStartDate, customEndDate }: PageViewsChartProps) {
    const [pageViewsData, setPageViewsData] = useState<PageViewsResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getDateRangeFromFilter = () => {
            const now = new Date();
            let startDate: Date;
            let endDate = new Date(); // Today

            switch (dateFilter) {
                case "yesterday":
                    startDate = new Date(now);
                    startDate.setDate(now.getDate() - 1);
                    endDate = new Date(now);
                    endDate.setDate(now.getDate() - 1);
                    break;
                case "last7days":
                    startDate = new Date(now);
                    startDate.setDate(now.getDate() - 7);
                    break;
                case "last15days":
                    startDate = new Date(now);
                    startDate.setDate(now.getDate() - 15);
                    break;
                case "last30days":
                    startDate = new Date(now);
                    startDate.setDate(now.getDate() - 30);
                    break;
                case "custom":
                    if (customStartDate && customEndDate) {
                        startDate = customStartDate;
                        endDate = customEndDate;
                    } else {
                        startDate = new Date(now);
                        startDate.setDate(now.getDate() - 7);
                    }
                    break;
                default:
                    startDate = new Date(now);
                    startDate.setDate(now.getDate() - 7);
            }

            return { startDate, endDate };
        };

        const fetchPageViews = async () => {
            try {
                const { startDate, endDate } = getDateRangeFromFilter();
                const startDateStr = startDate.toISOString().split('T')[0];
                const endDateStr = endDate.toISOString().split('T')[0];

                const response = await fetch(`/api/analytics/pageviews?startDate=${startDateStr}&endDate=${endDateStr}`);
                const data = await response.json();

                // Check if the response has the expected data structure
                if (data && data.data && Array.isArray(data.data)) {
                    setPageViewsData(data);
                } else {
                    // Set empty data if API returns an error or unexpected structure
                    console.error('Invalid page views data:', data);
                    setPageViewsData({
                        data: [],
                        totalPageViews: 0,
                        totalSessions: 0
                    });
                }
            } catch (error) {
                console.error('Error fetching page views:', error);
                setPageViewsData({
                    data: [],
                    totalPageViews: 0,
                    totalSessions: 0
                });
            } finally {
                setLoading(false);
            }
        };

        fetchPageViews();

        // Refresh every 5 minutes
        const interval = setInterval(fetchPageViews, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [dateFilter, customStartDate, customEndDate]);

    if (loading) {
        // Fixed heights to prevent hydration mismatch
        const skeletonHeights = [45, 70, 55, 80, 60, 75, 50];
        return (
            <div className="rounded-lg border border-[#E4E4E4] bg-white p-5 h-[400px] animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-24 mb-6"></div>
                <div className="h-[300px] flex items-end gap-2">
                    {skeletonHeights.map((height, i) => (
                        <div key={i} className="flex-1 bg-gray-200 rounded" style={{ height: `${height}%` }}></div>
                    ))}
                </div>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const chartData = pageViewsData?.data.map((item) => ({
        date: formatDate(item.date),
        views: item.pageViews,
    })) || [];

    return (
        <div className="rounded-lg border border-[#E4E4E4] bg-white p-5 h-[400px]">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-[18px] font-medium text-[#000000B2]">Page Views</h2>
                <div className="text-sm text-[#637381]">
                    Total: {pageViewsData?.totalPageViews.toLocaleString() || 0}
                </div>
            </div>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barSize={20}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#6B6B6B", fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#6B6B6B", fontSize: 12 }}
                        />
                        <Tooltip
                            cursor={{ fill: "transparent" }}
                            contentStyle={{
                                backgroundColor: "#121212",
                                color: "#fff",
                                borderRadius: "8px",
                                border: "none",
                            }}
                            itemStyle={{ color: "#fff" }}
                        />
                        <Bar
                            dataKey="views"
                            fill="#FFBD70"
                            radius={[4, 4, 4, 4]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
