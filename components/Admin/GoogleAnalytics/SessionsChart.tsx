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
    { name: "5-10", value: 450 },
    { name: "5-10", value: 300 },
    { name: "5-10", value: 550 },
    { name: "5-10", value: 200 },
    { name: "5-10", value: 400 },
    { name: "5-10", value: 150 },
];

const CustomXAxisTick = ({ x, y, payload }: any) => {
    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="middle" fill="#6B6B6B" fontSize={12}>
                {payload.value}
            </text>
            <text x={0} y={0} dy={32} textAnchor="middle" fill="#6B6B6B" fontSize={12}>
                Mins
            </text>
        </g>
    );
};

export default function SessionsChart() {
    return (
        <div className="rounded-lg border border-[#E4E4E4] bg-white p-5 h-[400px]">
            <h2 className="mb-6 text-[18px] font-medium text-[#000000B2]">Sessions</h2>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barSize={20}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={<CustomXAxisTick />}
                            interval={0}
                            height={50}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#6B6B6B", fontSize: 12 }}
                            ticks={[0, 150, 300, 450, 600]}
                            domain={[0, 600]}
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
                            dataKey="value"
                            fill="#FFBD70"
                            radius={[4, 4, 4, 4]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
