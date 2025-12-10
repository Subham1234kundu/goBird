"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/Admin/Dashboard/StatCard";
import RecentLeadsTable from "@/components/Admin/Dashboard/RecentLeadsTable";
import PageViewsChart from "@/components/Admin/Dashboard/PageViewsChart";
import TrafficSourcesChart from "@/components/Admin/Dashboard/TrafficSourcesChart";
import { supabase } from "@/lib/supabase";

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
                // Calculate dates for last 7 days and previous 7 days
                const now = new Date();
                const last7DaysStart = new Date(now);
                last7DaysStart.setDate(now.getDate() - 7);
                const last14DaysStart = new Date(now);
                last14DaysStart.setDate(now.getDate() - 14);

                // Fetch leads count for last 7 days
                const { count: currentLeadsCount } = await supabase
                    .from('leads')
                    .select('*', { count: 'exact', head: true })
                    .gte('created_at', last7DaysStart.toISOString());

                // Fetch leads count for previous 7 days  
                const { count: previousLeadsCount } = await supabase
                    .from('leads')
                    .select('*', { count: 'exact', head: true })
                    .gte('created_at', last14DaysStart.toISOString())
                    .lt('created_at', last7DaysStart.toISOString());

                // Fetch total press releases
                const { count: currentPressCount } = await supabase
                    .from('press_releases')
                    .select('*', { count: 'exact', head: true });

                // Fetch press releases count from 7 days ago for comparison
                const { count: previousPressCount } = await supabase
                    .from('press_releases')
                    .select('*', { count: 'exact', head: true })
                    .lt('created_at', last7DaysStart.toISOString());

                // Fetch page views data from API if available, otherwise use placeholder
                const pageViewsData = { current: 0, previous: 0 };
                try {
                    const response = await fetch('/api/analytics/pageviews?days=7');
                    const data = await response.json();
                    pageViewsData.current = data.totalPageViews || 0;

                    const prevResponse = await fetch('/api/analytics/pageviews?days=14');
                    const prevData = await prevResponse.json();
                    pageViewsData.previous = (prevData.totalPageViews || 0) - pageViewsData.current;
                } catch {
                    console.log('Page views API not available');
                }

                // Calculate changes and trends
                const calculateChange = (current: number, previous: number) => {
                    if (previous === 0) return { change: current > 0 ? '100' : '0', trend: current > 0 ? 'up' as const : 'down' as const };
                    const percentChange = ((current - previous) / previous) * 100;
                    return {
                        change: percentChange.toFixed(1),
                        trend: percentChange >= 0 ? 'up' as const : 'down' as const
                    };
                };

                const leadsChange = calculateChange(currentLeadsCount || 0, previousLeadsCount || 0);
                const pressChange = calculateChange(currentPressCount || 0, previousPressCount || 0);
                const viewsChange = calculateChange(pageViewsData.current, pageViewsData.previous);

                // Generate simple trend data
                const generateTrendData = (count: number) => {
                    const data = [];
                    const step = count / 7;
                    for (let i = 0; i < 7; i++) {
                        data.push(Math.round(step * i + Math.random() * step));
                    }
                    return data;
                };

                setStats({
                    leads: {
                        current: currentLeadsCount || 0,
                        change: leadsChange.change,
                        trend: leadsChange.trend,
                        data: generateTrendData(currentLeadsCount || 0)
                    },
                    pressReleases: {
                        current: currentPressCount || 0,
                        change: pressChange.change,
                        trend: pressChange.trend,
                        data: generateTrendData(currentPressCount || 0)
                    },
                    pageViews: {
                        current: pageViewsData.current,
                        change: viewsChange.change,
                        trend: viewsChange.trend,
                        data: generateTrendData(pageViewsData.current)
                    }
                });
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
                    <PageViewsChart dateFilter="last7days" />
                </div>
                <div>
                    <TrafficSourcesChart />
                </div>
            </div>
        </div>
    );
}
