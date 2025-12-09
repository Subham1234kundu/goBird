"use client";

import { useEffect, useState } from "react";

interface RealtimeData {
    activeUsers: number;
    timestamp: string;
}

export default function RealTimeActiveUsers() {
    const [realtimeData, setRealtimeData] = useState<RealtimeData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRealtimeData = async () => {
            try {
                const response = await fetch('/api/analytics/realtime');
                const data = await response.json();
                setRealtimeData(data);
            } catch (error) {
                console.error('Error fetching realtime data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRealtimeData();

        // Refresh every 30 seconds for real-time data
        const interval = setInterval(fetchRealtimeData, 30 * 1000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="rounded-lg border border-[#E4E4E4] bg-white p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
                <div className="h-12 bg-gray-200 rounded w-24"></div>
            </div>
        );
    }

    return (
        <div className="rounded-lg border border-[#E4E4E4] bg-white p-6">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-[#637381]">Active Users Now</h3>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-[#637381]">Live</span>
                </div>
            </div>
            <div className="text-4xl font-bold text-[#121212]">
                {realtimeData?.activeUsers || 0}
            </div>
            <div className="text-xs text-[#9CA3AF] mt-1">
                Real-time active users on your site
            </div>
        </div>
    );
}
