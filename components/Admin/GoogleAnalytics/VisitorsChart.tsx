"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface VisitorsData {
    totalUsers: number;
    newUsers: number;
    returningUsers: number;
    newUserPercentage: string;
    returningUserPercentage: string;
}

export default function VisitorsChart() {
    const [visitorsData, setVisitorsData] = useState<VisitorsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVisitorsData = async () => {
            try {
                const response = await fetch('/api/analytics/visitors?days=7');
                const data = await response.json();
                setVisitorsData(data);
            } catch (error) {
                console.error('Error fetching visitors data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVisitorsData();

        // Refresh every 5 minutes
        const interval = setInterval(fetchVisitorsData, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const data = visitorsData ? [
        { name: "Returning Users", value: visitorsData.returningUsers, color: "#FA966C" },
        { name: "New Users", value: visitorsData.newUsers, color: "#DB602D" },
    ] : [];

    if (loading) {
        return (
            <div className="rounded-lg border border-[#E4E4E4] bg-white p-5 h-[400px] animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-24 mb-6"></div>
                <div className="h-[250px] flex items-center justify-center">
                    <div className="w-[200px] h-[200px] bg-gray-200 rounded-full"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-lg border border-[#E4E4E4] bg-white p-5 h-[400px]">
            <h2 className="mb-6 text-[18px] font-medium text-[#000000B2]">Visitors</h2>
            <div className="relative h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={100}
                            paddingAngle={0}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <div className="text-[24px] font-bold text-[#212B36]">
                        {visitorsData?.totalUsers.toLocaleString() || '0'}
                    </div>
                    <div className="text-[16px] text-[#637381]">Visitors</div>
                </div>
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center justify-center gap-8">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-[14px] text-[#636978]">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
