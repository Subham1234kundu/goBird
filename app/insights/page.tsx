"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FooterSimple from "@/app/components/FooterSimple";
import InsightsMore from "@/app/components/InsightsMore";

const Insights = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [showInsightsMore, setShowInsightsMore] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Insights data array
  const insightsData = [
    {
      id: 1,
      image: "/Images/insights1.png",
      title: "Building scalable cloud infrastructure for modern applications",
      category: "Cloud",
      date: "Feb 15, 2025",
      readTime: "6 min read",
    },
    {
      id: 2,
      image: "/Images/insights2.png",
      title: "How AI is transforming software development workflows",
      category: "Technology",
      date: "Feb 10, 2025",
      readTime: "7 min read",
    },
    {
      id: 3,
      image: "/Images/insights3.png",
      title: "Best practices for microservices architecture",
      category: "Development",
      date: "Feb 5, 2025",
      readTime: "10 min read",
    },
    {
      id: 4,
      image: "/Images/insights4.png",
      title: "Designing user-centric mobile experiences",
      category: "Design",
      date: "Jan 28, 2025",
      readTime: "5 min read",
    },
    {
      id: 5,
      image: "/Images/insights1.png",
      title: "Designing user-centric mobile experiences",
      category: "Design",
      date: "Jan 28, 2025",
      readTime: "5 min read",
    },
    {
      id: 6,
      image: "/Images/insights2.png",
      title: "Designing user-centric mobile experiences",
      category: "Design",
      date: "Jan 28, 2025",
      readTime: "5 min read",
    },
  ];

  // 👇 Changed from 5 to 4
  const itemsPerPage = 4;
  const totalPages = Math.ceil(insightsData.length / itemsPerPage);

  // Show only 4 items on mobile, all on desktop
  const displayedInsights = isMobile
    ? insightsData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : insightsData;

  if (showInsightsMore) {
    return <InsightsMore />;
  }

  return (
    <div className="w-full">
      {/* Header Section */}
      <div
        className="w-full h-full sm:pt-8 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-18 relative pt-14 md:pt-18 lg:pt-24"
        style={{ backgroundColor: "#000A1B" }}
      >
        <div className="flex flex-col w-full relative z-10 pb-16">
          {/* Heading + subheading */}
          <div className="w-[80%] max-sm:w-full">
            <h1
              className="
                text-white
                max-sm:text-[42px] max-sm:w-[394px] max-sm:h-[140px] max-sm:leading-[55px]
                max-sm:flex max-sm:items-center max-sm:[leading-trim:both] max-sm:[text-edge:cap]
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[82px] font-light
                leading-tight mb-8 w-full sm:w-[90%]
              "
            >
              Ideas, trends, and <br /> lessons from the <br /> frontlines of
              tech
            </h1>
            <h3
              className="
                text-white
                max-sm:text-[14px] max-sm:leading-[17px] max-sm:tracking-[-0.01em]
                max-sm:w-[362px] max-sm:h-[44px]
                max-sm:flex max-sm:items-center max-sm:[leading-trim:both] max-sm:[text-edge:cap]
                font-light text-sm sm:text-base md:text-lg lg:text-xl xl:text-[32px]
                w-full sm:w-[90%] leading-10 mb-12 sm:mb-16 md:mb-20
              "
            >
              Our experts share deep dives, strategies, and stories from the
              world of IT consulting, design, and software development so you
              can stay ahead of the curve.
            </h3>
          </div>

          {/* Image section */}
          <div className="w-full relative">
            <Image
              src="/Images/InsightsHeader.jpg"
              alt="Insights Header"
              width={1200}
              height={600}
              className="w-full h-[500px] rounded-lg object-cover"
            />
            {/* Design Button */}
            <div
              className="
                absolute top-4 left-4 max-sm:left-6 max-sm:top-[15%]
                px-8 py-1 rounded-full bg-[rgba(245,245,245,0.08)]
                max-sm:px-0 max-sm:py-0 max-sm:w-[127.92px] max-sm:h-[32px]
                max-sm:border max-sm:border-black/15
                max-sm:flex max-sm:items-center max-sm:justify-center
              "
            >
              <span className="text-white max-sm:text-[16px] text-sm">
                Design
              </span>
            </div>

            {/* Bottom Text Container */}
            <div className="absolute max-sm:inset-0 max-sm:flex max-sm:flex-col max-sm:justify-center sm:bottom-4 sm:left-4 sm:right-4 md:bottom-6 md:left-6 md:right-6 lg:bottom-8 lg:left-8 lg:right-8">
              <div className="max-sm:pl-8 sm:pl-0 max-sm:space-y-12">
                <h2
                  className="
                    text-white
                    max-sm:w-[279px] max-sm:h-[100px]
                    max-sm:font-['Montserrat'] max-sm:font-extralight
                    max-sm:text-[32px] max-sm:leading-[39px] max-sm:tracking-[-0.01em]
                    max-sm:flex max-sm:items-center max-sm:[leading-trim:both] max-sm:[text-edge:cap]
                    max-sm:mt-28
                    text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[64px] font-thin
                    max-sm:mb-6 max-sm:leading-tight mb-2 sm:mb-3 md:mb-4
                  "
                >
                  5 UX principles that drive <br className="hidden sm:inline" />{" "}
                  conversions
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-white text-xs sm:text-sm md:text-base xl:text-[16px]">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="max-sm:w-[76px] max-sm:h-[24px] max-sm:font-['Montserrat'] max-sm:font-normal max-sm:text-[14px] max-sm:leading-[24px] max-sm:flex max-sm:items-center">
                      Mar 1, 2025
                    </span>
                    <span className="sm:inline max-sm:hidden">•</span>
                    <span className="max-sm:inline-block sm:hidden w-[6px] h-[6px] bg-white rounded-full"></span>
                    <span className="max-sm:w-[76px] max-sm:h-[24px] max-sm:font-['Montserrat'] max-sm:font-normal max-sm:text-[14px] max-sm:leading-[24px] max-sm:flex max-sm:items-center">
                      8 min read
                    </span>
                  </div>
                  <span
                    className="underline cursor-pointer max-sm:text-[18px]"
                    onClick={() => setShowInsightsMore(true)}
                  >
                    Read more
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Insights Header with Categories */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-18 pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8 md:pb-10">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">
          <h2 className="text-[#0B0B0B] text-4xl sm:text-5xl md:text-6xl xl:text-[64px] font-normal max-sm:text-[32px]">
            All Insights
          </h2>
          <div className="flex flex-wrap items-center max-sm:gap-[4px] gap-2 sm:gap-3 md:gap-4 text-black text-base sm:text-lg md:text-xl xl:text-[24px] font-light max-sm:font-normal">
            <span className="cursor-pointer hover:opacity-70 transition-opacity">
              Branding
            </span>
            <span className="text-[#666666]">|</span>
            <span className="cursor-pointer hover:opacity-70 transition-opacity">
              Technology
            </span>
            <span className="text-[#666666]">|</span>
            <span className="cursor-pointer hover:opacity-70 transition-opacity">
              Design
            </span>
            <span className="text-[#666666]">|</span>
            <span className="cursor-pointer hover:opacity-70 transition-opacity">
              Development
            </span>
          </div>
        </div>
      </div>

      {/* All Insights Grid - Dynamic */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 pb-12 sm:pb-16 md:pb-20">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
            {displayedInsights.map((insight) => (
              <div key={insight.id} className="flex flex-col">
                <Image
                  src={insight.image}
                  alt={`Insight ${insight.id}`}
                  width={500}
                  height={488}
                  className="w-full h-[488px] max-sm:h-[320px] object-cover cursor-pointer"
                  onClick={() => setShowInsightsMore(true)}
                />
                <h3 className="text-[#0B0B0B] text-sm sm:text-lg lg:text-[32px] mt-4 text-start w-[90%] max-sm:w-full max-sm:pl-0 max-sm:font-['Montserrat'] max-sm:font-normal max-sm:text-[18px] max-sm:leading-[22px] max-sm:text-[#000A1B]">
                  {insight.title}
                </h3>
                <p className="text-[#666666] text-xs md:text-base mt-2 w-[90%] max-sm:text-[#000A1B] max-sm:font-['Montserrat'] max-sm:font-normal max-sm:text-[14px] max-sm:leading-[24px] max-sm:flex max-sm:items-center max-sm:gap-x-[0.8rem] max-sm:flex-wrap">
                  {insight.category}
                  {/* Dot 1 – hidden on mobile, shown on desktop */}
                  <span className="sm:inline max-sm:hidden">•</span>
                  {/* Circle for mobile */}
                  <span className="max-sm:inline-block sm:hidden w-[6px] h-[6px] bg-[#000A1B] rounded-full flex-shrink-0"></span>
                  {insight.date}
                  {/* Dot 2 */}
                  <span className="sm:inline max-sm:hidden">•</span>
                  <span className="max-sm:inline-block sm:hidden w-[6px] h-[6px] bg-[#000A1B] rounded-full flex-shrink-0"></span>
                  {insight.readTime}
                </p>
                <div className="relative w-[90%] mt-2">
                  <p
                    className="text-[#0B0B0B] text-base cursor-pointer max-sm:text-[16px] max-sm:w-[93.67px] max-sm:h-[27px] max-sm:inline-block"
                    onClick={() => setShowInsightsMore(true)}
                  >
                    Read more
                  </p>
                  <div className="absolute bottom-0 left-0 w-16 sm:w-20 h-px bg-[#0B0B0B] max-sm:w-[93.67px]"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination - Dynamic */}
      <div className="flex justify-center gap-3 pb-12">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 xl:w-12 xl:h-12 flex items-center justify-center text-sm max-sm:text-[16px] ${
              currentPage === page
                ? "bg-black text-white"
                : "text-[#212121] hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Call to Action Section */}
      <div className="w-full py-20">
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-0">
          <div className="flex flex-col justify-center items-start gap-8 lg:w-1/2 bg-[#F5F9FE] px-8 py-12 lg:px-12 lg:py-16">
            <h2 className="text-[#000A1B] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[64px] font-medium leading-tight max-sm:text-[24px] max-sm:font-medium">
              Need a Tech Partner <br /> You Can Trust?
            </h2>
            <button
              onClick={() => router.push("/contact")}
              className="px-10 py-2 rounded-full text-white text-sm sm:text-base md:text-[18px] hover:opacity-90 transition-opacity max-sm:text-[18px] bg-[#FF662A] max-sm:bg-black"
            >
              Let&apos;s Chat
            </button>
          </div>
          <div className="lg:w-1/2">
            <Image
              src="/Images/insightsfooter.png"
              alt="Insights Footer"
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <FooterSimple />
    </div>
  );
};

export default Insights;
