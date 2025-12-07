"use client";

import Image from "next/image";
import PageViewsChart from "@/components/Admin/Dashboard/PageViewsChart";
import VisitorsChart from "@/components/Admin/GoogleAnalytics/VisitorsChart";
import TrafficSourcesList from "@/components/Admin/GoogleAnalytics/TrafficSourcesList";
import SessionsChart from "@/components/Admin/GoogleAnalytics/SessionsChart";

export default function GoogleAnalytics() {
    return (
        <div className="p-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-[#121212]">Google Analysis</h1>
                    <p className="mt-2 text-[#3D3D3D]">View your Google Analytics data here.</p>
                </div>
                <button className="flex items-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-medium text-[#3D3D3D] hover:bg-gray-50">
                    Last 7 Days
                    <Image src="/Images/Admin/dashboardImage/arrwoDown.png" alt="Arrow" width={16} height={16} />
                </button>
            </div>

            <div className="flex flex-col gap-6">
                {/* First Row */}
                <div className="flex flex-col gap-6 lg:flex-row">
                    <div className="w-full lg:w-[65%]">
                        <PageViewsChart />
                    </div>
                    <div className="w-full lg:w-[35%]">
                        <VisitorsChart />
                    </div>
                </div>

                {/* Second Row */}
                <div className="flex flex-col gap-6 lg:flex-row">
                    <div className="w-full lg:w-[65%]">
                        <TrafficSourcesList />
                    </div>
                    <div className="w-full lg:w-[35%]">
                        <SessionsChart />
                    </div>
                </div>
            </div>
        </div>
    );
}
