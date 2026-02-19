"use client";

import { useEffect, useState } from "react";

interface AnalyticsSummary {
    totalPressReleases: number;
    totalViews: number;
    totalUsers: number;
    averageViewsPerRelease: number;
}

export default function PressReleaseAnalyticsSummary() {
    const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await fetch('/api/analytics/press-releases?days=30');
                const data = await response.json();
                setSummary(data.summary);
            } catch (error) {
                console.error('Error fetching press release analytics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();

        // Refresh every 5 minutes
        const interval = setInterval(fetchSummary, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="rounded-lg border border-[#E4E4E4] bg-white p-5 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                        <div className="h-8 bg-gray-200 rounded w-16"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (!summary) return null;

    const stats = [
        {
            label: "Total Press Releases",
            value: summary.totalPressReleases,
            color: "#3B82F6",
        },
        {
            label: "Total Views (30 days)",
            value: summary.totalViews.toLocaleString(),
            color: "#10B981",
        },
        {
            label: "Total Users",
            value: summary.totalUsers.toLocaleString(),
            color: "#F59E0B",
        },
        {
            label: "Avg Views/Release",
            value: summary.averageViewsPerRelease.toLocaleString(),
            color: "#8B5CF6",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-4">
            {stats.map((stat, index) => (
                <div key={index} className="rounded-lg border border-[#E4E4E4] bg-white p-5">
                    <div className="text-sm font-medium text-[#637381] mb-1">
                        {stat.label}
                    </div>
                    <div className="text-2xl font-bold" style={{ color: stat.color }}>
                        {stat.value}
                    </div>
                </div>
            ))}
        </div>
    );
}
