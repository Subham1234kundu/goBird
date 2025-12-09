"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
} from "recharts";

interface PressReleaseAnalytics {
    pressRelease: {
        id: string;
        title: string;
        category: string;
        description: string;
        publishedDate: string;
        createdAt: string;
    };
    analytics: {
        period: string;
        totalViews: number;
        totalUsers: number;
        totalSessions: number;
        dailyViews: Array<{
            date: string;
            views: number;
            users: number;
        }>;
        trafficSources: Array<{
            source: string;
            sessions: number;
            percentage: string;
        }>;
        devices: Array<{
            device: string;
            users: number;
            percentage: string;
        }>;
    };
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function PressReleaseAnalyticsPage({ params }: { params: Promise<{ id: string }> }) {
    const [analytics, setAnalytics] = useState<PressReleaseAnalytics | null>(null);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        params.then((resolvedParams) => {
            setId(resolvedParams.id);
        });
    }, [params]);

    useEffect(() => {
        if (!id) return;

        const fetchAnalytics = async () => {
            try {
                const response = await fetch(`/api/analytics/press-releases/${id}?days=30`);
                const data = await response.json();

                if (data.error) {
                    alert(data.error);
                    router.push('/Admin/press-release');
                    return;
                }

                setAnalytics(data);
            } catch (error) {
                console.error('Error fetching analytics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();

        // Refresh every 5 minutes
        const interval = setInterval(fetchAnalytics, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [id, router]);

    if (loading) {
        return (
            <div className="p-8">
                <div className="flex justify-center items-center h-96">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-[#FE4B00]"></div>
                </div>
            </div>
        );
    }

    if (!analytics) {
        return (
            <div className="p-8">
                <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
                    <p className="text-red-600">Failed to load analytics</p>
                </div>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const chartData = analytics.analytics.dailyViews.map((item) => ({
        date: formatDate(item.date),
        views: item.views,
        users: item.users,
    }));

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => router.push('/Admin/press-release')}
                    className="mb-4 text-sm text-[#FE4B00] hover:underline flex items-center gap-2"
                >
                    ← Back to Press Releases
                </button>
                <h1 className="text-2xl font-semibold text-[#121212]">{analytics.pressRelease.title}</h1>
                <p className="mt-2 text-sm text-[#637381]">
                    Analytics for the last {analytics.analytics.period}
                </p>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#DBEAFE] px-3 py-1 text-sm text-[#193CB8]">
                    {analytics.pressRelease.category}
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
                <div className="rounded-lg border border-[#E4E4E4] bg-white p-6">
                    <div className="text-sm font-medium text-[#637381] mb-1">Total Views</div>
                    <div className="text-3xl font-bold text-[#3B82F6]">
                        {analytics.analytics.totalViews.toLocaleString()}
                    </div>
                </div>
                <div className="rounded-lg border border-[#E4E4E4] bg-white p-6">
                    <div className="text-sm font-medium text-[#637381] mb-1">Total Users</div>
                    <div className="text-3xl font-bold text-[#10B981]">
                        {analytics.analytics.totalUsers.toLocaleString()}
                    </div>
                </div>
                <div className="rounded-lg border border-[#E4E4E4] bg-white p-6">
                    <div className="text-sm font-medium text-[#637381] mb-1">Total Sessions</div>
                    <div className="text-3xl font-bold text-[#F59E0B]">
                        {analytics.analytics.totalSessions.toLocaleString()}
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
                {/* Daily Views Chart */}
                <div className="rounded-lg border border-[#E4E4E4] bg-white p-6">
                    <h2 className="text-lg font-medium text-[#121212] mb-4">Daily Views</h2>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#6B6B6B", fontSize: 12 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#6B6B6B", fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#121212",
                                        color: "#fff",
                                        borderRadius: "8px",
                                        border: "none",
                                    }}
                                />
                                <Bar dataKey="views" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Device Breakdown */}
                <div className="rounded-lg border border-[#E4E4E4] bg-white p-6">
                    <h2 className="text-lg font-medium text-[#121212] mb-4">Device Breakdown</h2>
                    <div className="h-[300px] flex items-center justify-center">
                        {analytics.analytics.devices.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={analytics.analytics.devices}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={(entry) => `${entry.device}: ${entry.percentage}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="users"
                                    >
                                        {analytics.analytics.devices.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="text-gray-500">No device data available</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Traffic Sources */}
            <div className="rounded-lg border border-[#E4E4E4] bg-white p-6">
                <h2 className="text-lg font-medium text-[#121212] mb-4">Traffic Sources</h2>
                {analytics.analytics.trafficSources.length > 0 ? (
                    <div className="space-y-4">
                        {analytics.analytics.trafficSources.map((source, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-[#3D3D3D]">
                                            {source.source}
                                        </span>
                                        <span className="text-sm text-[#637381]">
                                            {source.sessions.toLocaleString()} sessions ({source.percentage}%)
                                        </span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-gray-200">
                                        <div
                                            className="h-full rounded-full bg-[#3B82F6]"
                                            style={{ width: `${source.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-8">No traffic source data available</div>
                )}
            </div>
        </div>
    );
}
