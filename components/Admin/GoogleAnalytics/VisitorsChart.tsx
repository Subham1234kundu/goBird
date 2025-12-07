"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
    { name: "Returning Users", value: 65, color: "#FA966C" },
    { name: "New Users", value: 35, color: "#DB602D" },
];

export default function VisitorsChart() {
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
                    <div className="text-[24px] font-bold text-[#212B36]">2,548</div>
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
