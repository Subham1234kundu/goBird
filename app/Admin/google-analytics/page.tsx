"use client";

import { useState } from "react";
import Image from "next/image";
import PageViewsChart from "@/components/Admin/Dashboard/PageViewsChart";
import VisitorsChart from "@/components/Admin/GoogleAnalytics/VisitorsChart";
import TrafficSourcesList from "@/components/Admin/GoogleAnalytics/TrafficSourcesList";
import SessionsChart from "@/components/Admin/GoogleAnalytics/SessionsChart";
import DateFilterModal from "@/components/Admin/Modals/DateFilterModal";
import DateRangeModal from "@/components/Admin/Modals/DateRangeModal";

export default function GoogleAnalytics() {
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showDateRangeModal, setShowDateRangeModal] = useState(false);
    const [dateFilter, setDateFilter] = useState("last7days");
    const [customStartDate, setCustomStartDate] = useState<Date | null>(null);
    const [customEndDate, setCustomEndDate] = useState<Date | null>(null);

    const getFilterLabel = () => {
        switch (dateFilter) {
            case "yesterday":
                return "Yesterday";
            case "last7days":
                return "Last 7 Days";
            case "last15days":
                return "Last 15 Days";
            case "last30days":
                return "Last 30 Days";
            case "custom":
                if (customStartDate && customEndDate) {
                    return `${customStartDate.toLocaleDateString('en-GB')} - ${customEndDate.toLocaleDateString('en-GB')}`;
                }
                return "Custom Range";
            default:
                return "Last 7 Days";
        }
    };

    const handleFilterSelect = (option: string) => {
        setDateFilter(option);
    };

    const handleCustomDateRange = () => {
        setShowDateRangeModal(true);
    };

    const handleDateRangeApply = (start: Date | null, end: Date | null) => {
        if (start || end) {
            setCustomStartDate(start);
            setCustomEndDate(end);
            setDateFilter("custom");
        }
    };

    return (
        <div className="p-8">
            <DateFilterModal
                isOpen={showFilterModal}
                onClose={() => setShowFilterModal(false)}
                onSelect={handleFilterSelect}
                onCustom={handleCustomDateRange}
                currentFilter={dateFilter}
            />
            <DateRangeModal
                isOpen={showDateRangeModal}
                onClose={() => setShowDateRangeModal(false)}
                onApply={handleDateRangeApply}
                initialStartDate={customStartDate}
                initialEndDate={customEndDate}
            />

            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-[#121212]">Google Analytics</h1>
                    <p className="mt-2 text-[#3D3D3D]">Real-time analytics and insights for your website.</p>
                </div>
                <button
                    onClick={() => setShowFilterModal(true)}
                    className="flex items-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-medium text-[#3D3D3D] hover:bg-gray-50"
                >
                    {getFilterLabel()}
                    <Image src="/Images/Admin/dashboardImage/arrwoDown.png" alt="Arrow" width={16} height={16} />
                </button>
            </div>

            <div className="flex flex-col gap-6">
                {/* First Row */}
                <div className="flex flex-col gap-6 lg:flex-row">
                    <div className="w-full lg:w-[65%]">
                        <PageViewsChart
                            dateFilter={dateFilter}
                            customStartDate={customStartDate}
                            customEndDate={customEndDate}
                        />
                    </div>
                    <div className="w-full lg:w-[35%]">
                        <VisitorsChart
                            dateFilter={dateFilter}
                            customStartDate={customStartDate}
                            customEndDate={customEndDate}
                        />
                    </div>
                </div>

                {/* Second Row */}
                <div className="flex flex-col gap-6 lg:flex-row">
                    <div className="w-full lg:w-[65%]">
                        <TrafficSourcesList
                            dateFilter={dateFilter}
                            customStartDate={customStartDate}
                            customEndDate={customEndDate}
                        />
                    </div>
                    <div className="w-full lg:w-[35%]">
                        <SessionsChart
                            dateFilter={dateFilter}
                            customStartDate={customStartDate}
                            customEndDate={customEndDate}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
