"use client";

import { useEffect, useState } from "react";

interface TrafficSource {
    source: string;
    sessions: number;
    percentage: string;
}

interface TrafficData {
    data: TrafficSource[];
    totalSessions: number;
}

interface TrafficSourcesListProps {
    dateFilter: string;
    customStartDate?: Date | null;
    customEndDate?: Date | null;
}

export default function TrafficSourcesList({ dateFilter, customStartDate, customEndDate }: TrafficSourcesListProps) {
    const [trafficData, setTrafficData] = useState<TrafficData | null>(null);
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

        const fetchTrafficData = async () => {
            try {
                const { startDate, endDate } = getDateRangeFromFilter();
                const startDateStr = startDate.toISOString().split('T')[0];
                const endDateStr = endDate.toISOString().split('T')[0];

                const response = await fetch(`/api/analytics/traffic-sources?startDate=${startDateStr}&endDate=${endDateStr}`);
                const data = await response.json();
                setTrafficData(data);
            } catch (error) {
                console.error('Error fetching traffic sources:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrafficData();

        // Refresh every 5 minutes
        const interval = setInterval(fetchTrafficData, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [dateFilter, customStartDate, customEndDate]);

    if (loading) {
        return (
            <div className="rounded-lg border border-[#E4E4E4] bg-white p-5 h-[400px] overflow-y-auto animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
                <div className="flex flex-col gap-6">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-full">
                            <div className="mb-2 flex items-center justify-between">
                                <div className="h-4 bg-gray-200 rounded w-24"></div>
                                <div className="h-4 bg-gray-200 rounded w-16"></div>
                            </div>
                            <div className="h-[5px] bg-gray-200 rounded-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const formatSourceName = (source: string) => {
        if (source === '(direct)') return 'Direct Traffic';
        if (source === 'google') return 'Google Search';
        if (source.includes('facebook')) return 'Facebook';
        if (source.includes('twitter')) return 'Twitter';
        if (source.includes('linkedin')) return 'LinkedIn';
        return source.charAt(0).toUpperCase() + source.slice(1);
    };

    return (
        <div className="rounded-lg border border-[#E4E4E4] bg-white p-5 h-[400px] overflow-y-auto">
            <h2 className="mb-6 text-[18px] font-medium text-[#000000B2]">Traffic Sources</h2>
            <div className="flex flex-col gap-6">
                {trafficData?.data.map((item, index) => (
                    <div key={index} className="w-full">
                        <div className="mb-2 flex items-center justify-between text-sm font-medium text-[#3D3D3D]">
                            <span>{formatSourceName(item.source)}</span>
                            <span>{item.sessions.toLocaleString()} ({item.percentage}%)</span>
                        </div>
                        <div className="h-[5px] w-full rounded-full bg-gray-200">
                            <div
                                className="h-full rounded-full bg-[#DB602D]"
                                style={{ width: `${item.percentage}%` }}
                            />
                        </div>
                    </div>
                ))}
                {(!trafficData || trafficData.data.length === 0) && (
                    <div className="text-center text-gray-500 py-8">
                        No traffic data available
                    </div>
                )}
            </div>
        </div>
    );
}
