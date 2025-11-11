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
      <div className="w-full h-full px-4 sm:px-6 md:px-10 pt-6 sm:pt-8 md:pt-12 lg:pt-16 relative" style={{ backgroundColor: '#000A1B' }}>
        <div className="flex flex-col w-full relative z-10 pb-16">
          <div className=" w-[80%]">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight mb-8 w-full sm:w-[90%] md:w-[85%] lg:w-[76%]" style={{ fontWeight: 300 }}>
            Ideas, trends, and lessons from the frontlines of tech
          </h1>
          <h3 className="text-white font-light text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl w-full sm:w-[90%] md:w-[85%] lg:w-[75%] leading-relaxed mb-12 sm:mb-16 md:mb-20">
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
            {/* Top Left Design Button */}
            <div className="absolute top-4 left-4 px-8 py-1 rounded-full" style={{ backgroundColor: '#F5F5F514' }}>
              <span className="text-white text-sm">Design</span>
            </div>
            {/* Bottom Text */}
            <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8" >
              <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-thin mb-2 sm:mb-3 md:mb-4">
                5 UX principles that drive <br className="hidden sm:block" /> conversions
              </h2>
              <div className="flex items-center justify-between gap-2 text-white text-xs sm:text-sm">
                <div className="flex items-center gap-1 sm:gap-2">
                <span>Mar 1, 2025</span>
                <span>•</span>
                <span>8 min read</span>
                </div>

                <span className="underline cursor-pointer" onClick={() => setShowInsightsMore(true)}>Read more</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Insights Grid */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-12 sm:py-16 md:py-20">
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
              <h3 className="text-[#0B0B0B] font-medium text-lg sm:text-xl lg:text-2xl mt-4 text-start w-[90%]">
                Building scalable cloud infrastructure for modern applications
              </h3>
              <p className="text-[#666666] text-sm mt-2 w-[90%]">
                Cloud • Feb 15, 2025 • 6 min read
              </p>
              <div className="relative w-[90%] mt-2">
                <p className="text-[#0B0B0B] text-sm underline cursor-pointer" onClick={() => setShowInsightsMore(true)}>Read more</p>
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
              <h3 className="text-[#0B0B0B] font-medium text-lg sm:text-xl lg:text-2xl mt-4 text-start w-[90%]">
                How AI is transforming software development workflows
              </h3>
              <p className="text-[#666666] text-sm mt-2 w-[90%]">
                Technology • Feb 10, 2025 • 7 min read
              </p>
              <div className="relative w-[90%] mt-2">
                <p className="text-[#0B0B0B] text-sm underline cursor-pointer" onClick={() => setShowInsightsMore(true)}>Read more</p>
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
              <h3 className="text-[#0B0B0B] font-medium text-lg sm:text-xl lg:text-2xl mt-4 text-start w-[90%]">
                Best practices for microservices architecture
              </h3>
              <p className="text-[#666666] text-sm mt-2 w-[90%]">
                Development • Feb 5, 2025 • 10 min read
              </p>
              <div className="relative w-[90%] mt-2">
                <p className="text-[#0B0B0B] text-sm underline cursor-pointer" onClick={() => setShowInsightsMore(true)}>Read more</p>
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
              <h3 className="text-[#0B0B0B] font-medium text-lg sm:text-xl lg:text-2xl mt-4 text-start w-[90%]">
                Designing user-centric mobile experiences
              </h3>
              <p className="text-[#666666] text-sm mt-2 w-[90%]">
                Design • Jan 28, 2025 • 5 min read
              </p>
              <div className="relative w-[90%] mt-2">
                <p className="text-[#0B0B0B] text-sm underline cursor-pointer" onClick={() => setShowInsightsMore(true)}>Read more</p>
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
              <h3 className="text-[#0B0B0B] font-medium text-lg sm:text-xl lg:text-2xl mt-4 text-start w-[90%]">
                Designing user-centric mobile experiences
              </h3>
              <p className="text-[#666666] text-sm mt-2 w-[90%]">
                Design • Jan 28, 2025 • 5 min read
              </p>
              <div className="relative w-[90%] mt-2">
                <p className="text-[#0B0B0B] text-sm underline cursor-pointer" onClick={() => setShowInsightsMore(true)}>Read more</p>
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
              <h3 className="text-[#0B0B0B] font-medium text-lg sm:text-xl lg:text-2xl mt-4 text-start w-[90%]">
                Designing user-centric mobile experiences
              </h3>
              <p className="text-[#666666] text-sm mt-2 w-[90%]">
                Design • Jan 28, 2025 • 5 min read
              </p>
              <div className="relative w-[90%] mt-2">
                <p className="text-[#0B0B0B] text-sm underline cursor-pointer" onClick={() => setShowInsightsMore(true)}>Read more</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 pb-12">
        <button
          onClick={() => setCurrentPage(1)}
          className={`w-8 h-8 flex items-center justify-center text-sm rounded ${
            currentPage === 1 ? 'bg-black text-white' : 'text-[#212121] hover:bg-gray-100'
          }`}
        >
          1
        </button>
        <button
          onClick={() => setCurrentPage(2)}
          className={`w-8 h-8 flex items-center justify-center text-sm rounded ${
            currentPage === 2 ? 'bg-black text-white' : 'text-[#212121] hover:bg-gray-100'
          }`}
        >
          2
        </button>
        <button
          onClick={() => setCurrentPage(3)}
          className={`w-8 h-8 flex items-center justify-center text-sm rounded ${
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
            <h2 className="text-[#000A1B] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
              Need a Tech Partner <br /> You Can Trust? Let&apos;s Chat
            </h2>
            <button
              onClick={() => router.push('/contact')}
              className="px-8 py-3 rounded-sm text-white text-sm sm:text-base hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#FF662A' }}
            >
              Get Started
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
