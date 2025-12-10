"use client";

import Image from "next/image";
import { useState } from "react";
import PressReleaseTable from "@/components/Admin/PressRelease/PressReleaseTable";
import { useRouter } from "next/navigation";
import DateRangeModal from "@/components/Admin/Modals/DateRangeModal";

export default function PressRelease() {
    const router = useRouter();
    const [showDateRangeModal, setShowDateRangeModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const pressReleasesPerPage = 10;

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1); // Reset to page 1 on search
    };

    const handleDateRangeApply = (start: Date | null, end: Date | null) => {
        setStartDate(start);
        setEndDate(end);
        setCurrentPage(1); // Reset to page 1 on date filter
    };

    const formatDateRange = () => {
        if (!startDate) return "Select Date Range";
        if (!endDate) return startDate.toLocaleDateString('en-GB');
        return `${startDate.toLocaleDateString('en-GB')} - ${endDate.toLocaleDateString('en-GB')}`;
    };

    return (
        <div className="rounded-lg p-8">
            <DateRangeModal
                isOpen={showDateRangeModal}
                onClose={() => setShowDateRangeModal(false)}
                onApply={handleDateRangeApply}
                initialStartDate={startDate}
                initialEndDate={endDate}
            />
            <div className="mb-8 flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-[#121212]">Manage Press Releases</h1>
                    <p className="mt-2 text-[#3D3D3D]">Create, edit, and manage your press releases from your admin portal.</p>
                </div>
                <button
                    onClick={() => router.push('/Admin/press-release/create')}
                    className="rounded-sm bg-[#FE4B00] px-6 py-2.5 text-[14px] font-medium text-white hover:bg-[#E54300] transition-colors"
                >
                    Create New Release
                </button>
            </div>


            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Image src="/Images/Admin/dashboardImage/search.png" alt="Search" width={20} height={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for Press Release"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full rounded-sm border border-[#AFAFAF] py-2.5 pl-10 pr-4 text-sm placeholder-[#7E7D7D] focus:border-blue-500 focus:outline-none sm:w-[300px]"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowDateRangeModal(true)}
                        className="flex items-center gap-2 rounded-lg border border-[#E4E4E4] bg-white px-4 py-2.5 text-sm font-medium text-[#3D3D3D] hover:bg-gray-50"
                    >
                        <Image src="/Images/Admin/dashboardImage/calender.png" alt="Date" width={16} height={16} />
                        {formatDateRange()}
                        <Image src="/Images/Admin/dashboardImage/arrwoDown.png" alt="Arrow" width={16} height={16} />
                    </button>
                </div>
            </div>

            <PressReleaseTable
                currentPage={currentPage}
                pressReleasesPerPage={pressReleasesPerPage}
                searchQuery={searchQuery}
                startDate={startDate}
                endDate={endDate}
                onTotalCountChange={(total) => {
                    setTotalPages(Math.ceil(total / pressReleasesPerPage));
                }}
            />

            <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#333333]">
                    Page
                    <select
                        value={currentPage}
                        onChange={(e) => setCurrentPage(Number(e.target.value))}
                        className="flex h-[42px] w-[70px] items-center justify-between rounded border border-[#DCDCDC] px-2 cursor-pointer focus:outline-none focus:border-blue-500"
                    >
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                            <option key={pageNum} value={pageNum}>
                                {pageNum}
                            </option>
                        ))}
                    </select>
                    of {totalPages}
                </div>
                <div className="flex items-center gap-2">
                    {/* First page */}
                    <button
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className="rounded px-2 py-1 text-sm font-semibold text-[#333333] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {"<<"}
                    </button>

                    {/* Previous page */}
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="rounded px-2 py-1 text-sm font-semibold text-[#333333] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {"<"}
                    </button>

                    {/* Page numbers */}
                    {(() => {
                        const pages = [];
                        const showEllipsisStart = currentPage > 3;
                        const showEllipsisEnd = currentPage < totalPages - 2;

                        // Always show first page
                        if (totalPages >= 1) {
                            pages.push(
                                <button
                                    key={1}
                                    onClick={() => setCurrentPage(1)}
                                    className={`rounded px-3 py-1 text-sm font-semibold ${currentPage === 1
                                        ? "bg-black text-white"
                                        : "text-[#333333] hover:bg-gray-100"
                                        }`}
                                >
                                    1
                                </button>
                            );
                        }

                        // Ellipsis after first page
                        if (showEllipsisStart) {
                            pages.push(
                                <span key="ellipsis-start" className="px-1 text-sm font-semibold text-[#333333]">
                                    ...
                                </span>
                            );
                        }

                        // Pages around current page
                        const startPage = Math.max(2, currentPage - 1);
                        const endPage = Math.min(totalPages - 1, currentPage + 1);

                        for (let i = startPage; i <= endPage; i++) {
                            pages.push(
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i)}
                                    className={`rounded px-3 py-1 text-sm font-semibold ${currentPage === i
                                        ? "bg-black text-white"
                                        : "text-[#333333] hover:bg-gray-100"
                                        }`}
                                >
                                    {i}
                                </button>
                            );
                        }

                        // Ellipsis before last page
                        if (showEllipsisEnd) {
                            pages.push(
                                <span key="ellipsis-end" className="px-1 text-sm font-semibold text-[#333333]">
                                    ...
                                </span>
                            );
                        }

                        // Always show last page
                        if (totalPages > 1) {
                            pages.push(
                                <button
                                    key={totalPages}
                                    onClick={() => setCurrentPage(totalPages)}
                                    className={`rounded px-3 py-1 text-sm font-semibold ${currentPage === totalPages
                                        ? "bg-black text-white"
                                        : "text-[#333333] hover:bg-gray-100"
                                        }`}
                                >
                                    {totalPages}
                                </button>
                            );
                        }

                        return pages;
                    })()}

                    {/* Next page */}
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="rounded px-2 py-1 text-sm font-semibold text-[#333333] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {">"}
                    </button>

                    {/* Last page */}
                    <button
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="rounded px-2 py-1 text-sm font-semibold text-[#333333] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {">>"}
                    </button>
                </div>
            </div>
        </div>
    );
}
