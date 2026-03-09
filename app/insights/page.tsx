"use client";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FooterSimple from "@/app/components/FooterSimple";
import InsightsMore from "@/app/components/InsightsMore";
import { getAllInsights } from "@/lib/services/insightService";
import type { Insight } from "@/lib/types/insight";
import { formatDate } from "@/lib/utils/dateFormatter";

function InsightsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const insightId = searchParams.get("id");
  
  const [currentPage, setCurrentPage] = useState(1);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const itemsPerPage = 4;

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch real-time data
  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      const { data, error } = await getAllInsights(1, 100);
      if (!error && data) {
        setInsights(data);
      }
      setLoading(false);
    };
    fetchInsights();
  }, []);

  // If there's an ID in the URL, show the detail page
  if (insightId) {
    return <InsightsMore insightId={insightId} />;
  }

  const totalPages = Math.ceil(insights.length / itemsPerPage);
  const displayedInsights = isMobile
    ? insights.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : insights;

  return (
    <div className="w-full">
      {/* Header Section */}
      <div
        className="w-full h-full sm:pt-8 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-18 relative pt-14 md:pt-18 lg:pt-24"
        style={{ backgroundColor: "#000A1B" }}
      >
        <div className="flex flex-col w-full relative z-10 pb-16">
          <div className="w-[80%] max-sm:w-full">
            <h1 className="text-white max-sm:text-[42px] max-sm:leading-[55px] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[82px] font-light leading-tight mb-8 w-full sm:w-[90%]">
              Insights on AI <br /> and Compliance Platforms
            </h1>
            <h3 className="text-white max-sm:text-[14px] max-sm:leading-[17px] font-light text-sm sm:text-base md:text-lg lg:text-xl xl:text-[32px] w-full sm:w-[90%] leading-10 mb-12 sm:mb-16 md:mb-20">
              Deep dives on AI governance, data protection, cloud and FinOps,
              platform modernization, and venture‑grade product building for
              regulated and high‑growth teams.
            </h3>
          </div>

          <div className="w-full relative">
            <Image
              src="/Images/InsightsHeader.jpg"
              alt="Insights Header"
              width={1200}
              height={600}
              className="w-full h-[500px] rounded-lg object-cover"
            />
            {insights.length > 0 && (
                <div className="absolute max-sm:inset-0 max-sm:flex max-sm:flex-col max-sm:justify-center sm:bottom-4 sm:left-4 sm:right-4 md:bottom-6 md:left-6 md:right-6 lg:bottom-8 lg:left-8 lg:right-8">
                  <div className="max-sm:pl-8 sm:pl-0 max-sm:space-y-12">
                    <h2 className="text-white max-sm:text-[32px] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[64px] font-thin max-sm:mb-6 mb-2">
                        {insights[0].title}
                    </h2>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-white text-xs sm:text-sm md:text-base">
                      <div className="flex items-center gap-2">
                        <span>{formatDate(insights[0].published_date)}</span>
                        <span>•</span>
                        <span>{insights[0].read_time || "8 min read"}</span>
                      </div>
                      <span
                        className="underline cursor-pointer"
                        onClick={() => router.push(`/insights?id=${insights[0].id}`)}
                      >
                        Read more
                      </span>
                    </div>
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>

      {/* All Insights */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-18 pt-12">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <h2 className="text-[#0B0B0B] text-4xl sm:text-5xl md:text-6xl xl:text-[64px] font-normal max-sm:text-[32px]">
            All Insights
          </h2>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 pb-12 pt-10">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {loading ? (
                [1,2,3,4].map(i => (
                    <div key={i} className="animate-pulse bg-gray-100 h-[400px] rounded-lg"></div>
                ))
            ) : displayedInsights.map((insight) => (
              <div key={insight.id} className="flex flex-col">
                <div 
                    className="relative w-full h-[488px] max-sm:h-[320px] cursor-pointer overflow-hidden rounded-lg mb-4"
                    onClick={() => router.push(`/insights?id=${insight.id}`)}
                >
                    {insight.cover_image_url ? (
                        <Image src={insight.cover_image_url} alt="" fill className="object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 font-light">
                            Featured Image
                        </div>
                    )}
                </div>
                <h3 className="text-[#0B0B0B] text-sm sm:text-lg lg:text-[32px] font-light mt-1">
                  {insight.title}
                </h3>
                <p className="text-[#666666] text-xs md:text-base mt-2 flex items-center gap-2">
                  {insight.category} <span>•</span> {formatDate(insight.published_date)} <span>•</span> {insight.read_time || "5 min read"}
                </p>
                <div className="mt-4">
                  <span
                    className="text-[#0B0B0B] text-base cursor-pointer border-b border-black pb-0.5"
                    onClick={() => router.push(`/insights?id=${insight.id}`)}
                  >
                    Read more
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
          <div className="flex justify-center gap-3 pb-20">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 flex items-center justify-center text-sm ${
                  currentPage === page ? "bg-black text-white" : "text-black border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
      )}

      {/* Footer Call to Action */}
      <div className="w-full py-20 bg-white">
        <div className="flex flex-col lg:flex-row items-stretch">
          <div className="flex flex-col justify-center items-start gap-8 lg:w-1/2 bg-[#F5F9FE] px-8 py-12 lg:px-16 lg:py-24">
            <h2 className="text-[#000A1B] text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-medium leading-tight">
              Design Your Governance‑Ready AI and Platform Roadmap
            </h2>
            <p className="text-lg text-gray-600 max-w-lg">
              Share a few details and Grobird’s team will recommend next steps tailored to your organization.
            </p>
            <button
              onClick={() => router.push("/contact")}
              className="px-10 py-3.5 rounded-full text-white text-lg bg-[#FE4B00] hover:bg-[#E54300] transition-colors"
            >
              Book Strategy Call
            </button>
          </div>
          <div className="lg:w-1/2 relative min-h-[400px]">
            <Image src="/Images/insightsfooter.png" alt="" fill className="object-cover" />
          </div>
        </div>
      </div>

      <FooterSimple />
    </div>
  );
}

export default function Insights() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center italic text-gray-400">Loading insights...</div>}>
      <InsightsContent />
    </Suspense>
  );
}
