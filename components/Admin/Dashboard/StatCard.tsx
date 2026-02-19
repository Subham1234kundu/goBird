"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    ScriptableContext,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useRef } from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

interface StatCardProps {
    title: string;
    value: string;
    percentage: string;
    trend: "up" | "down";
    data: number[];
    color: string;
}

export default function StatCard({
    title,
    value,
    percentage,
    trend,
    data,
    color,
}: StatCardProps) {
    const chartRef = useRef<ChartJS<"line"> | null>(null);

    const isPositive = trend === "up";
    const bgColor = isPositive ? "#DCFCE7" : "#FEE2E2";
    const textColor = isPositive ? "#16A34A" : "#DC2626";

    const createPattern = (ctx: CanvasRenderingContext2D): CanvasPattern | undefined => {
        const patternCanvas = document.createElement("canvas");
        const patternCtx = patternCanvas.getContext("2d");
        const width = 4; // Spacing between lines
        const height = 10;

        patternCanvas.width = width;
        patternCanvas.height = height;

        if (patternCtx) {
            patternCtx.beginPath();
            patternCtx.lineWidth = 2; // Thicker pattern lines
            patternCtx.strokeStyle = color;
            patternCtx.globalAlpha = 0.5; // Increased opacity
            patternCtx.moveTo(0, 0);
            patternCtx.lineTo(0, height);
            patternCtx.stroke();
        }

        return ctx.createPattern(patternCanvas, "repeat") || undefined;
    };

    const chartData = {
        labels: data.map(() => ""), // Empty labels
        datasets: [
            {
                data: data,
                borderColor: color,
                borderWidth: 3, // Thicker chart line
                pointRadius: 0, // Hide points
                fill: true,
                backgroundColor: (context: ScriptableContext<"line">) => {
                    const ctx = context.chart.ctx;
                    const pattern = createPattern(ctx);
                    return (pattern as unknown as string) || color;
                },
                tension: 0.4, // Smooth curve
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
                min: 0, // Start at 0
            },
        },
        layout: {
            padding: 0,
        },
        elements: {
            line: {
                tension: 0.4,
            },
        },
    };

    return (
        <div className="flex flex-col rounded-lg border border-[#DCDCDC] bg-white shadow-sm h-[240px] justify-between relative overflow-hidden">
            <div className="z-10 p-5">
                <h3 className="text-[15px] font-medium text-[#6B6B6B]">{title}</h3>
                <div className="mt-1">
                    <span className="text-[32px] font-semibold text-[#121212]">{value}</span>
                </div>
                <div
                    className="mt-1 inline-flex items-center gap-1 rounded px-1.5 py-0.5"
                    style={{ backgroundColor: bgColor }}
                >
                    <span className="text-xs font-medium" style={{ color: textColor }}>
                        {isPositive ? "↑" : "↓"} {percentage} vs Last 7 days
                    </span>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-[100px] w-full">
                <Line ref={chartRef} data={chartData} options={options} />
            </div>
        </div>
    );
}
