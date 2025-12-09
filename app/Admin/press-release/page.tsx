"use client";

import Image from "next/image";
import PressReleaseTable from "@/components/Admin/PressRelease/PressReleaseTable";
import PressReleaseAnalyticsSummary from "@/components/Admin/PressRelease/PressReleaseAnalyticsSummary";
import { useRouter } from "next/navigation";

export default function PressRelease() {
    const router = useRouter();
    return (
        <div className="rounded-lg p-8">
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

            <PressReleaseAnalyticsSummary />

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Image src="/Images/Admin/dashboardImage/search.png" alt="Search" width={20} height={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for Press Release"
                        className="w-full rounded-sm border border-[#AFAFAF] py-2.5 pl-10 pr-4 text-sm placeholder-[#7E7D7D] focus:border-blue-500 focus:outline-none sm:w-[300px]"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 rounded-lg border border-[#E4E4E4] bg-white px-4 py-2.5 text-sm font-medium text-[#3D3D3D] hover:bg-gray-50">
                        <Image src="/Images/Admin/dashboardImage/calender.png" alt="Date" width={16} height={16} />
                        Select Date Range
                        <Image src="/Images/Admin/dashboardImage/arrwoDown.png" alt="Arrow" width={16} height={16} />
                    </button>
                </div>
            </div>

            <PressReleaseTable />

            <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#333333]">
                    Page
                    <div className="flex h-[42px] w-[70px] items-center justify-between rounded border border-[#DCDCDC] px-2">
                        1
                        <Image src="/Images/Admin/dashboardImage/arrwoDown.png" alt="Arrow" width={16} height={16} />
                    </div>
                    of 10
                </div>
                <div className="flex items-center gap-2">
                    <button className="rounded px-2 py-1 text-sm font-semibold text-[#333333] hover:bg-gray-100">{"<<"}</button>
                    <button className="rounded px-2 py-1 text-sm font-semibold text-[#333333] hover:bg-gray-100">{"<"}</button>
                    <button className="rounded bg-black px-3 py-1 text-sm font-semibold text-white">1</button>
                    <button className="rounded px-3 py-1 text-sm font-semibold text-[#333333] hover:bg-gray-100">2</button>
                    <button className="rounded px-3 py-1 text-sm font-semibold text-[#333333] hover:bg-gray-100">3</button>
                    <span className="px-1 text-sm font-semibold text-[#333333]">...</span>
                    <button className="rounded px-3 py-1 text-sm font-semibold text-[#333333] hover:bg-gray-100">10</button>
                    <button className="rounded px-2 py-1 text-sm font-semibold text-[#333333] hover:bg-gray-100">{">"}</button>
                    <button className="rounded px-2 py-1 text-sm font-semibold text-[#333333] hover:bg-gray-100">{">>"}</button>
                </div>
            </div>
        </div>
    );
}
