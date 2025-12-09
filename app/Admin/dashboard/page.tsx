"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/Admin/Dashboard/StatCard";
import RecentLeadsTable from "@/components/Admin/Dashboard/RecentLeadsTable";
import PageViewsChart from "@/components/Admin/Dashboard/PageViewsChart";
import TrafficSourcesChart from "@/components/Admin/Dashboard/TrafficSourcesChart";

interface DashboardStats {
    leads: {
        current: number;
        change: string;
        trend: 'up' | 'down';
        data: number[];
    };
    pressReleases: {
        current: number;
        change: string;
        trend: 'up' | 'down';
        data: number[];
    };
    pageViews: {
        current: number;
        change: string;
        trend: 'up' | 'down';
        data: number[];
    };
}

export default function Dashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/analytics/dashboard-stats');
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();

        // Refresh data every 5 minutes
        const interval = setInterval(fetchStats, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}K+`;
        }
        return num.toString();
    };

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="font-semibold text-[#121212] text-[26px]">Analytics Dashboard</h1>
                <p className="mt-2 text-[#3D3D3D] text-[15px]">
                    Unlock Actionable Insights: Track Performance and Boost Customer Engagement.
                </p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-[240px] rounded-lg border border-[#DCDCDC] bg-white animate-pulse" />
                    ))}
                </div>
            ) : stats ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <StatCard
                        title="New Leads (Last 7 Days)"
                        value={stats.leads.current.toString()}
                        percentage={`${stats.leads.change}%`}
                        trend={stats.leads.trend}
                        data={stats.leads.data}
                        color={stats.leads.trend === 'up' ? "#22C55E" : "#EF4444"}
                    />
                    <StatCard
                        title="Total Press Releases"
                        value={stats.pressReleases.current.toString()}
                        percentage={`${stats.pressReleases.change}%`}
                        trend={stats.pressReleases.trend}
                        data={stats.pressReleases.data}
                        color={stats.pressReleases.trend === 'up' ? "#22C55E" : "#EF4444"}
                    />
                    <StatCard
                        title="Total Page Views"
                        value={formatNumber(stats.pageViews.current)}
                        percentage={`${stats.pageViews.change}%`}
                        trend={stats.pageViews.trend}
                        data={stats.pageViews.data}
                        color={stats.pageViews.trend === 'up' ? "#22C55E" : "#EF4444"}
                    />
                </div>
            ) : null}

            <div className="mt-8">
                <RecentLeadsTable />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <PageViewsChart />
                </div>
                <div>
                    <TrafficSourcesChart />
                </div>
            </div>
        </div>
    );
}
