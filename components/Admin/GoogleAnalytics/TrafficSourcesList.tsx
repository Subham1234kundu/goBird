"use client";

const trafficData = [
    { name: "Organic Search", value: "1,43,382" },
    { name: "Direct Traffic", value: "1,43,382" },
    { name: "Referral Traffic", value: "85,420" },
    { name: "Social Media", value: "45,120" },
    { name: "Paid Search (Ads)", value: "25,640" },
    { name: "Email Campaigns", value: "15,230" },
    { name: "Other Sources", value: "5,120" },
];

export default function TrafficSourcesList() {
    return (
        <div className="rounded-lg border border-[#E4E4E4] bg-white p-5 h-[400px] overflow-y-auto">
            <h2 className="mb-6 text-[18px] font-medium text-[#000000B2]">Traffic Sources</h2>
            <div className="flex flex-col gap-6">
                {trafficData.map((item, index) => (
                    <div key={index} className="w-full">
                        <div className="mb-2 flex items-center justify-between text-sm font-medium text-[#3D3D3D]">
                            <span>{item.name}</span>
                            <span>{item.value}</span>
                        </div>
                        <div className="h-[5px] w-full rounded-full bg-transparent">
                            <div
                                className="h-full rounded-full bg-[#DB602D]"
                                style={{ width: `${Math.max(10, 100 - index * 12)}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
