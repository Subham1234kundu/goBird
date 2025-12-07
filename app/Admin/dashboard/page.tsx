"use client";

import StatCard from "@/components/Admin/Dashboard/StatCard";
import RecentLeadsTable from "@/components/Admin/Dashboard/RecentLeadsTable";
import PageViewsChart from "@/components/Admin/Dashboard/PageViewsChart";
import TrafficSourcesChart from "@/components/Admin/Dashboard/TrafficSourcesChart";

export default function Dashboard() {
    // Data approximated to match the visual curve in the image
    // Curve: Start low -> Bump up -> Dip to flat -> Step up -> Flat -> Steep rise
    const newLeadsData = [0, 350, 200, 200, 500, 500, 950];

    // Using similar curves for others for consistency, or variations if preferred
    const pressReleasesData = [10, 8, 12, 6, 8, 4, 5];

    const pageViewsData = [5000, 7000, 6000, 8000, 7500, 9000, 10000];

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="font-semibold text-[#121212] text-[26px]">Analytics Dashboard</h1>
                <p className="mt-2 text-[#3D3D3D] text-[15px]">
                    Unlock Actionable Insights: Track Performance and Boost Customer Engagement.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <StatCard
                    title="New Leads Today"
                    value="950"
                    percentage="11.4%"
                    trend="up"
                    data={newLeadsData}
                    color="#22C55E"
                />
                <StatCard
                    title="Total Press Releases"
                    value="5"
                    percentage="-11.4%"
                    trend="down"
                    data={pressReleasesData}
                    color="#EF4444"
                />
                <StatCard
                    title="Total Page Views"
                    value="10K+"
                    percentage="11.4%"
                    trend="up"
                    data={pageViewsData}
                    color="#22C55E"
                />
            </div>

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
