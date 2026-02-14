"use client"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import FooterSimple from "@/app/components/FooterSimple"
import InsightsMore from "@/app/components/InsightsMore"

const Insights = () => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [showInsightsMore, setShowInsightsMore] = useState(false)

  if (showInsightsMore) {
    return <InsightsMore />
  }

  return (
    <div className="w-full">


      {/* Header Section */}
      <div className="w-full h-full  sm:pt-8 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-18 relative pt-14 md:pt-18 lg:pt-24 " style={{ backgroundColor: '#000A1B' }}>
        <div className="flex flex-col w-full relative z-10 pb-16">

          <div className=" w-[80%] max-sm:w-full">
          <h1 className="text-white max-sm:text-[42px] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[82px] font-light leading-tight mb-8 w-full sm:w-[90%]" style={{ fontWeight: 300 }}>
            Ideas, trends, and <br /> lessons from the <br /> frontlines of tech
          </h1>
          <h3 className="text-white max-sm:text-[14px] max-sm:leading-[24px] font-light text-sm sm:text-base md:text-lg lg:text-xl xl:text-[32px] w-full sm:w-[90%]  leading-10 mb-12 sm:mb-16 md:mb-20">
            Our experts share deep dives, strategies, and stories from the world of IT consulting, design, and software development so you can stay ahead of the curve.
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
  {/* Design Button - Mobile: left-0 top-[15%] with ml-4 on span; Desktop: top-4 left-4 */}
  <div
    className="absolute top-4 left-4 max-sm:left-6 max-sm:top-[15%] px-8 py-1 rounded-full"
    style={{ backgroundColor: '#F5F5F514' }}
  >
    <span className="text-white max-sm:text-[16px] text-sm max-sm:ml-4 sm:ml-0">Design</span>
  </div>
  {/* Bottom Text Container - Mobile: centered vertically, pl-8; Desktop: positioned at bottom with old coordinates */}
  <div className="absolute max-sm:inset-0 max-sm:flex max-sm:flex-col max-sm:justify-center sm:bottom-4 sm:left-4 sm:right-4 md:bottom-6 md:left-6 md:right-6 lg:bottom-8 lg:left-8 lg:right-8">
    {/* Inner wrapper for mobile left padding */}
    <div className="max-sm:pl-8 sm:pl-0">
      {/* Headline */}
      <h2 className="text-white text-2xl max-sm:text-[32px] max-sm:font-light sm:text-3xl md:text-4xl lg:text-5xl xl:text-[64px] font-thin max-sm:mb-6 max-sm:leading-tight mb-2 sm:mb-3 md:mb-4">
        5 UX principles that drive <br className="hidden sm:inline" /> conversions
      </h2>
      {/* Metadata and Read More */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-white text-xs sm:text-sm md:text-base xl:text-[16px]">
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="max-sm:text-[16px]">Mar 1, 2025</span>
          <span>•</span>
          <span className="max-sm:text-[16px]">8 min read</span>
        </div>
        <span className="underline cursor-pointer max-sm:text-[18px]" onClick={() => setShowInsightsMore(true)}>Read more</span>
      </div>
    </div>
  </div>
        </div>

        </div>
      </div>

      {/* All Insights Header with Categories */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-18 pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8 md:pb-10">
  <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">
    {/* Left Side - All Insights */}
    <h2 className="text-[#0B0B0B] text-4xl sm:text-5xl md:text-6xl xl:text-[64px] font-normal max-sm:text-[32px]">
      All Insights
    </h2>

    {/* Right Side - Categories */}
    <div className="flex flex-wrap items-center max-sm:gap-[4px] gap-2 sm:gap-3 md:gap-4 text-black text-base sm:text-lg md:text-xl xl:text-[24px] font-light max-sm:font-normal">
      <span className="cursor-pointer hover:opacity-70 transition-opacity">Branding</span>
      <span className="text-[#666666]">|</span>
      <span className="cursor-pointer hover:opacity-70 transition-opacity">Technology</span>
      <span className="text-[#666666]">|</span>
      <span className="cursor-pointer hover:opacity-70 transition-opacity">Design</span>
      <span className="text-[#666666]">|</span>
      <span className="cursor-pointer hover:opacity-70 transition-opacity">Development</span>
    </div>
  </div>
      </div>

      {/* All Insights Grid */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 pb-12 sm:pb-16 md:pb-20">
        <div className="w-full max-w-[1400px] mx-auto">
          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
            {/* Insight 1 */}
            <div className="flex flex-col">
              <Image
                src="/Images/insights1.png"
                alt="Insight 1"
                width={500}
                height={488}
                className="w-full h-[488px] object-cover cursor-pointer"
                onClick={() => setShowInsightsMore(true)}
              />
              <h3 className="text-[#0B0B0B] text-sm sm:text-lg lg:text-[32px] mt-4 text-start w-[90%] max-sm:text-[18px]">
                Building scalable cloud infrastructure for modern applications
              </h3>
              <p className="text-[#666666] text-xs md:text-base mt-2 w-[90%] max-sm:text-[14px]">
                Cloud • Feb 15, 2025 • 6 min read
              </p>
              <div className="relative w-[90%] mt-2">
                <p className="text-[#0B0B0B] text-base cursor-pointer max-sm:text-[16px]" onClick={() => setShowInsightsMore(true)}>Read more</p>
                <div className="absolute bottom-0 left-0 w-16 sm:w-20 h-px bg-[#0B0B0B]"></div>
              </div>
            </div>

            {/* Insight 2 */}
            <div className="flex flex-col">
              <Image
                src="/Images/insights2.png"
                alt="Insight 2"
                width={500}
                height={488}
                className="w-full h-[488px] object-cover cursor-pointer"
                onClick={() => setShowInsightsMore(true)}
              />
              <h3 className="text-[#0B0B0B] text-sm sm:text-lg lg:text-[32px] mt-4 text-start w-[90%] max-sm:text-[18px]">
                How AI is transforming software development workflows
              </h3>
              <p className="text-[#666666] text-xs md:text-base mt-2 w-[90%] max-sm:text-[14px]">
                Technology • Feb 10, 2025 • 7 min read
              </p>
              <div className="relative w-[90%] mt-2">
                <p className="text-[#0B0B0B] text-base cursor-pointer max-sm:text-[16px]" onClick={() => setShowInsightsMore(true)}>Read more</p>
                <div className="absolute bottom-0 left-0 w-16 sm:w-20 h-px bg-[#0B0B0B]"></div>
              </div>
            </div>

            {/* Insight 3 */}
            <div className="flex flex-col">
              <Image
                src="/Images/insights3.png"
                alt="Insight 3"
                width={500}
                height={488}
                className="w-full h-[488px] object-cover cursor-pointer"
                onClick={() => setShowInsightsMore(true)}
              />
              <h3 className="text-[#0B0B0B] text-sm sm:text-lg lg:text-[32px] mt-4 text-start w-[90%] max-sm:text-[18px]">
                Best practices for microservices architecture
              </h3>
              <p className="text-[#666666] text-xs md:text-base mt-2 w-[90%] max-sm:text-[14px]">
                Development • Feb 5, 2025 • 10 min read
              </p>
              <div className="relative w-[90%] mt-2">
                <p className="text-[#0B0B0B] text-base cursor-pointer max-sm:text-[16px]" onClick={() => setShowInsightsMore(true)}>Read more</p>
                <div className="absolute bottom-0 left-0 w-16 sm:w-20 h-px bg-[#0B0B0B]"></div>
              </div>
            </div>

            {/* Insight 4 */}
            <div className="flex flex-col">
              <Image
                src="/Images/insights4.png"
                alt="Insight 4"
                width={500}
                height={488}
                className="w-full h-[488px] object-cover cursor-pointer"
                onClick={() => setShowInsightsMore(true)}
              />
              <h3 className="text-[#0B0B0B] text-sm sm:text-lg lg:text-[32px] mt-4 text-start w-[90%] max-sm:text-[18px]">
                Designing user-centric mobile experiences
              </h3>
              <p className="text-[#666666] text-xs md:text-base mt-2 w-[90%] max-sm:text-[14px]">
                Design • Jan 28, 2025 • 5 min read
              </p>
              <div className="relative w-[90%] mt-2">
                <p className="text-[#0B0B0B] text-base cursor-pointer max-sm:text-[16px]" onClick={() => setShowInsightsMore(true)}>Read more</p>
                <div className="absolute bottom-0 left-0 w-16 sm:w-20 h-px bg-[#0B0B0B]"></div>
              </div>
            </div>

            {/* Insight 5 */}
            <div className="flex flex-col">
              <Image
                src="/Images/insights1.png"
                alt="Insight 5"
                width={500}
                height={488}
                className="w-full h-[488px] object-cover cursor-pointer"
                onClick={() => setShowInsightsMore(true)}
              />
              <h3 className="text-[#0B0B0B] text-sm sm:text-lg lg:text-[32px] mt-4 text-start w-[90%] max-sm:text-[18px]">
                Designing user-centric mobile experiences
              </h3>
              <p className="text-[#666666] text-xs md:text-base mt-2 w-[90%] max-sm:text-[14px]">
                Design • Jan 28, 2025 • 5 min read
              </p>
              <div className="relative w-[90%] mt-2">
                <p className="text-[#0B0B0B] text-base cursor-pointer max-sm:text-[16px]" onClick={() => setShowInsightsMore(true)}>Read more</p>
                <div className="absolute bottom-0 left-0 w-16 sm:w-20 h-px bg-[#0B0B0B]"></div>
              </div>
            </div>


            {/* Insight 6 */}
            <div className="flex flex-col">
              <Image
                src="/Images/insights2.png"
                alt="Insight 6"
                width={500}
                height={488}
                className="w-full h-[488px] object-cover cursor-pointer"
                onClick={() => setShowInsightsMore(true)}
              />
              <h3 className="text-[#0B0B0B] text-sm sm:text-lg lg:text-[32px] mt-4 text-start w-[90%] max-sm:text-[18px]">
                Designing user-centric mobile experiences
              </h3>
              <p className="text-[#666666] text-xs md:text-base mt-2 w-[90%] max-sm:text-[14px]">
                Design • Jan 28, 2025 • 5 min read
              </p>
              <div className="relative w-[90%] mt-2">
                <p className="text-[#0B0B0B] text-base cursor-pointer max-sm:text-[16px]" onClick={() => setShowInsightsMore(true)}>Read more</p>
                <div className="absolute bottom-0 left-0 w-16 sm:w-20 h-px bg-[#0B0B0B]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 pb-12">
        <button
          onClick={() => setCurrentPage(1)}
          className={`w-8 h-8 xl:w-12 xl:h-12 flex items-center justify-center text-sm max-sm:text-[16px] ${
            currentPage === 1 ? 'bg-black text-white' : 'text-[#212121] hover:bg-gray-100'
          }`}
        >
          1
        </button>
        <button
          onClick={() => setCurrentPage(2)}
          className={`w-8 h-8 xl:w-12 xl:h-12 flex items-center justify-center text-sm max-sm:text-[16px] ${
            currentPage === 2 ? 'bg-black text-white' : 'text-[#212121] hover:bg-gray-100'
          }`}
        >
          2
        </button>
        <button
          onClick={() => setCurrentPage(3)}
          className={`w-8 h-8 xl:w-12 xl:h-12 flex items-center justify-center text-sm max-sm:text-[16px] ${
            currentPage === 3 ? 'bg-black text-white' : 'text-[#212121] hover:bg-gray-100'
          }`}
        >
          3
        </button>
      </div>

      {/* Call to Action Section */}
      <div className="w-full py-20 ">
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-0">
          <div className="flex flex-col justify-center items-start gap-8 lg:w-1/2 bg-[#F5F9FE] px-8 py-12 lg:px-12 lg:py-16">
            <h2 className="text-[#000A1B] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[64px] font-medium leading-tight max-sm:text-[24px] max-sm:font-medium">
              Need a Tech Partner <br /> You Can Trust?
            </h2>
           <button
  onClick={() => router.push('/contact')}
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
  )
}

export default Insights
