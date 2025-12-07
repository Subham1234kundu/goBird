"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const data = [
    { date: "2 Jan", views: 300 },
    { date: "3 Jan", views: 220 },
    { date: "4 Jan", views: 170 },
    { date: "5 Jan", views: 200 },
    { date: "6 Jan", views: 280 },
    { date: "7 Jan", views: 250 },
    { date: "8 Jan", views: 100 },
    { date: "9 Jan", views: 180 },
    { date: "10 Jan", views: 300 },
    { date: "11 Jan", views: 150 },
    { date: "12 Jan", views: 240 },
];

export default function PageViewsChart() {
    return (
        <div className="rounded-lg border border-[#E4E4E4] bg-white p-5 h-[400px]">
            <h2 className="mb-6 text-[18px] font-medium text-[#000000B2]">Page Views</h2>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barSize={20}>
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
