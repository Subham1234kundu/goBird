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

export default function PageViewsChart() {
    const [pageViewsData, setPageViewsData] = useState<PageViewsResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPageViews = async () => {
            try {
                const response = await fetch('/api/analytics/pageviews?days=7');
                const data = await response.json();
                setPageViewsData(data);
            } catch (error) {
                console.error('Error fetching page views:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPageViews();

        // Refresh every 5 minutes
        const interval = setInterval(fetchPageViews, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="rounded-lg border border-[#E4E4E4] bg-white p-5 h-[400px] animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-24 mb-6"></div>
                <div className="h-[300px] flex items-end gap-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                        <div key={i} className="flex-1 bg-gray-200 rounded" style={{ height: `${Math.random() * 100}%` }}></div>
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
