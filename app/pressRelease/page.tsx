"use client"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import FooterSimple from "@/app/components/FooterSimple"
import PressReleaseMore from "@/app/components/PressReleaseMore"

const PressRelease = () => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [showPressReleaseMore, setShowPressReleaseMore] = useState(false)

  if (showPressReleaseMore) {
    return <PressReleaseMore />
  }

  return (
  <div className="overflow-x-hidden">
      {/* header */}
      <div className="bg-custom-bg w-full h-[250px] sm:h-[300px] md:h-[360px] flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-12 w-full max-w-7xl">
                  <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[82px] font-light w-full lg:w-[60%] leading-tight">
                    Press & <br /> Announcements
                  </h1>
                  <h3 className="text-white font-light text-sm sm:text-base md:text-lg lg:text-xl xl:text-[32px] w-full lg:w-[35%] leading-10">
                    Stay updated with the latest product launches, innovations, and milestones from Grobird
                  </h3>
          </div>
      </div>

      {/* descp */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-8 sm:py-10 md:py-12 lg:py-16 lg:pb-28 mx-auto max-w-7xl">
              <h2 className="text-[#000A1B] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[64px] font-medium leading-tight w-full lg:w-[75%]">
                <span className="text-[#3B3B3D73]">Grobird Press Releases</span> <br /> & Product <br /> Announcements
              </h2>
              <h3 className="text-[#000A1B] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[42px] lg:w-[25%] text-start lg:text-end mt-4 lg:mt-0">Our Stories</h3>
      </div>

      {/* 4 boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 pb-8 sm:pb-10 md:pb-12 lg:pb-16 mx-auto max-w-7xl">
        {currentPage === 1 && (
          <>
            <div className="flex flex-col w-full">
              <Image src="/Images/insights1.png" alt="The art of storytelling in branding and advertising" width={500} height={388} className="w-full h-[200px] sm:h-[300px] lg:h-[388px] object-cover" />
              <h3 className="text-[#0B0B0B] text-sm sm:text-lg lg:text-[32px] mt-3 sm:mt-4 text-start w-[90%]">The art of storytelling in branding and advertising</h3>
              <p className="text-[#666666] text-xs md:text-base mt-2 w-[90%]">Branding • Mar 1, 2025 • 8min read</p>
              <p className="text-[#212121] text-xs md:text-base mt-2 w-[90%]">The real estate industry is undergoing a significant transformation as eco-friendly homes gain popularity among buyers and developers alike. With increasing awareness of climate change and the need for sustainable livin</p>
              <div
                onClick={() => setShowPressReleaseMore(true)}
                className="flex items-center gap-2 bg-[#F4F4F4] p-2 w-fit mt-2 cursor-pointer hover:bg-[#E4E4E4] transition-colors"
              >
                <p className="text-[#0B0B0B] text-base">Read more</p>
                <Image src="/Images/readArrow.png" alt="Read Arrow" width={12} height={12} className="w-3 h-3" />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Image src="/Images/insights2.png" alt="The art of storytelling in branding and advertising" width={500} height={388} className="w-full h-[200px] sm:h-[300px] lg:h-[388px] object-cover" />
              <h3 className="text-[#0B0B0B] text-sm sm:text-lg lg:text-[32px] mt-3 sm:mt-4 text-start w-[90%]">The art of storytelling in branding and advertising</h3>
              <p className="text-[#666666] text-xs md:text-base mt-2 w-[90%]">Branding • Mar 1, 2025 • 8min read</p>
              <p className="text-[#212121] text-xs md:text-base mt-2 w-[90%]">The real estate industry is undergoing a significant transformation as eco-friendly homes gain popularity among buyers and developers alike. With increasing awareness of climate change and the need for sustainable livin</p>
              <div className="flex items-center gap-2 bg-[#F4F4F4] p-2 w-fit mt-2 cursor-pointer hover:bg-[#E4E4E4] transition-colors">
                <p className="text-[#0B0B0B] text-base">Read more</p>
                <Image src="/Images/readArrow.png" alt="Read Arrow" width={12} height={12} className="w-3 h-3" />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Image src="/Images/insights3.png" alt="The art of storytelling in branding and advertising" width={500} height={388} className="w-full h-[200px] sm:h-[300px] lg:h-[388px] object-cover" />
              <h3 className="text-[#0B0B0B] text-sm sm:text-lg lg:text-[32px] mt-3 sm:mt-4 text-start w-[90%]">The art of storytelling in branding and advertising</h3>
              <p className="text-[#666666] text-xs md:text-base mt-2 w-[90%]">Branding • Mar 1, 2025 • 8min read</p>
              <p className="text-[#212121] text-xs md:text-base mt-2 w-[90%]">The real estate industry is undergoing a significant transformation as eco-friendly homes gain popularity among buyers and developers alike. With increasing awareness of climate change and the need for sustainable livin</p>
              <div className="flex items-center gap-2 bg-[#F4F4F4] p-2 w-fit mt-2 cursor-pointer hover:bg-[#E4E4E4] transition-colors">
                <p className="text-[#0B0B0B] text-base">Read more</p>
                <Image src="/Images/readArrow.png" alt="Read Arrow" width={12} height={12} className="w-3 h-3" />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Image src="/Images/insights4.png" alt="The art of storytelling in branding and advertising" width={500} height={388} className="w-full h-[200px] sm:h-[300px] lg:h-[388px] object-cover" />
              <h3 className="text-[#0B0B0B] text-sm sm:text-lg lg:text-[32px] mt-3 sm:mt-4 text-start w-[90%]">The art of storytelling in branding and advertising</h3>
              <p className="text-[#666666] text-xs md:text-base mt-2 w-[90%]">Branding • Mar 1, 2025 • 8min read</p>
              <p className="text-[#212121] text-xs md:text-base mt-2 w-[90%]">The real estate industry is undergoing a significant transformation as eco-friendly homes gain popularity among buyers and developers alike. With increasing awareness of climate change and the need for sustainable livin</p>
              <div className="flex items-center gap-2 bg-[#F4F4F4] p-2 w-fit mt-2 cursor-pointer hover:bg-[#E4E4E4] transition-colors">
                <p className="text-[#0B0B0B] text-base">Read more</p>
                <Image src="/Images/readArrow.png" alt="Read Arrow" width={12} height={12} className="w-3 h-3" />
              </div>
            </div>
          </>
        )}
        {currentPage === 2 && (
          <>
            <div className="flex flex-col w-full">
              <Image src="/Images/insights1.png" alt="The art of storytelling in branding and advertising" width={500} height={388} className="w-full h-[200px] sm:h-[300px] lg:h-[388px] object-cover" />
              <h3 className="text-[#0B0B0B] text-sm sm:text-lg lg:text-[32px] mt-3 sm:mt-4 text-start w-[90%]">The art of storytelling in branding and advertising</h3>
              <p className="text-[#666666] text-xs md:text-base mt-2 w-[90%]">Branding • Mar 1, 2025 • 8min read</p>
              <p className="text-[#212121] text-xs md:text-base mt-2 w-[90%]">The real estate industry is undergoing a significant transformation as eco-friendly homes gain popularity among buyers and developers alike. With increasing awareness of climate change and the need for sustainable livin</p>
              <div className="flex items-center gap-2 bg-[#F4F4F4] p-2 w-fit mt-2 cursor-pointer hover:bg-[#E4E4E4] transition-colors">
                <p className="text-[#0B0B0B] text-base">Read more</p>
                <Image src="/Images/readArrow.png" alt="Read Arrow" width={12} height={12} className="w-3 h-3" />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Image src="/Images/insights2.png" alt="The art of storytelling in branding and advertising" width={500} height={388} className="w-full h-[200px] sm:h-[300px] lg:h-[388px] object-cover" />
              <h3 className="text-[#0B0B0B] text-sm sm:text-lg lg:text-[32px] mt-3 sm:mt-4 text-start w-[90%]">The art of storytelling in branding and advertising</h3>
              <p className="text-[#666666] text-xs md:text-base mt-2 w-[90%]">Branding • Mar 1, 2025 • 8min read</p>
              <p className="text-[#212121] text-xs md:text-base mt-2 w-[90%]">The real estate industry is undergoing a significant transformation as eco-friendly homes gain popularity among buyers and developers alike. With increasing awareness of climate change and the need for sustainable livin</p>
              <div className="flex items-center gap-2 bg-[#F4F4F4] p-2 w-fit mt-2 cursor-pointer hover:bg-[#E4E4E4] transition-colors">
                <p className="text-[#0B0B0B] text-base">Read more</p>
                <Image src="/Images/readArrow.png" alt="Read Arrow" width={12} height={12} className="w-3 h-3" />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Image src="/Images/insights3.png" alt="The art of storytelling in branding and advertising" width={500} height={388} className="w-full h-[200px] sm:h-[300px] lg:h-[388px] object-cover" />
              <h3 className="text-[#0B0B0B] text-sm sm:text-lg lg:text-[32px] mt-3 sm:mt-4 text-start w-[90%]">The art of storytelling in branding and advertising</h3>
              <p className="text-[#666666] text-xs md:text-base mt-2 w-[90%]">Branding • Mar 1, 2025 • 8min read</p>
              <p className="text-[#212121] text-xs md:text-base mt-2 w-[90%]">The real estate industry is undergoing a significant transformation as eco-friendly homes gain popularity among buyers and developers alike. With increasing awareness of climate change and the need for sustainable livin</p>
              <div className="flex items-center gap-2 bg-[#F4F4F4] p-2 w-fit mt-2 cursor-pointer hover:bg-[#E4E4E4] transition-colors">
                <p className="text-[#0B0B0B] text-base">Read more</p>
                <Image src="/Images/readArrow.png" alt="Read Arrow" width={12} height={12} className="w-3 h-3" />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Image src="/Images/insights4.png" alt="The art of storytelling in branding and advertising" width={500} height={388} className="w-full h-[200px] sm:h-[300px] lg:h-[388px] object-cover" />
              <h3 className="text-[#0B0B0B] text-sm sm:text-lg lg:text-[32px] mt-3 sm:mt-4 text-start w-[90%]">The art of storytelling in branding and advertising</h3>
              <p className="text-[#666666] text-xs md:text-base mt-2 w-[90%]">Branding • Mar 1, 2025 • 8min read</p>
              <p className="text-[#212121] text-xs md:text-base mt-2 w-[90%]">The real estate industry is undergoing a significant transformation as eco-friendly homes gain popularity among buyers and developers alike. With increasing awareness of climate change and the need for sustainable livin</p>
              <div className="flex items-center gap-2 bg-[#F4F4F4] p-2 w-fit mt-2 cursor-pointer hover:bg-[#E4E4E4] transition-colors">
                <p className="text-[#0B0B0B] text-base">Read more</p>
                <Image src="/Images/readArrow.png" alt="Read Arrow" width={12} height={12} className="w-3 h-3" />
              </div>
            </div>
          </>
        )}
        {currentPage === 3 && (
          <>
            <div className="flex flex-col w-full">
              <Image src="/Images/insights1.png" alt="The art of storytelling in branding and advertising" width={500} height={388} className="w-full h-[200px] sm:h-[300px] lg:h-[388px] object-cover" />
              <h3 className="text-[#0B0B0B] font-medium text-sm sm:text-lg lg:text-xl mt-3 sm:mt-4 text-start w-[90%]">The art of storytelling in branding and advertising</h3>
              <p className="text-[#666666] text-xs mt-2 w-[90%]">Branding • Mar 1, 2025 • 8min read</p>
              <p className="text-[#212121] text-xs mt-2 w-[90%]">The real estate industry is undergoing a significant transformation as eco-friendly homes gain popularity among buyers and developers alike. With increasing awareness of climate change and the need for sustainable livin</p>
              <div className="flex items-center gap-2 bg-[#F4F4F4] p-2 w-fit mt-2">
                <p className="text-[#0B0B0B] text-xs">Read more</p>
                <Image src="/Images/readArrow.png" alt="Read Arrow" width={12} height={12} className="w-3 h-3" />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Image src="/Images/insights2.png" alt="The art of storytelling in branding and advertising" width={500} height={388} className="w-full h-[200px] sm:h-[300px] lg:h-[388px] object-cover" />
              <h3 className="text-[#0B0B0B] font-medium text-sm sm:text-lg lg:text-xl mt-3 sm:mt-4 text-start w-[90%]">The art of storytelling in branding and advertising</h3>
              <p className="text-[#666666] text-xs mt-2 w-[90%]">Branding • Mar 1, 2025 • 8min read</p>
              <p className="text-[#212121] text-xs mt-2 w-[90%]">The real estate industry is undergoing a significant transformation as eco-friendly homes gain popularity among buyers and developers alike. With increasing awareness of climate change and the need for sustainable livin</p>
              <div className="flex items-center gap-2 bg-[#F4F4F4] p-2 w-fit mt-2">
                <p className="text-[#0B0B0B] text-sm">Read more</p>
                <Image src="/Images/readArrow.png" alt="Read Arrow" width={12} height={12} className="w-3 h-3" />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Image src="/Images/insights3.png" alt="The art of storytelling in branding and advertising" width={500} height={388} className="w-full h-[200px] sm:h-[300px] lg:h-[388px] object-cover" />
              <h3 className="text-[#0B0B0B] font-medium text-sm sm:text-lg lg:text-xl mt-3 sm:mt-4 text-start w-[90%]">The art of storytelling in branding and advertising</h3>
              <p className="text-[#666666] text-xs mt-2 w-[90%]">Branding • Mar 1, 2025 • 8min read</p>
              <p className="text-[#212121] text-xs mt-2 w-[90%]">The real estate industry is undergoing a significant transformation as eco-friendly homes gain popularity among buyers and developers alike. With increasing awareness of climate change and the need for sustainable livin</p>
              <div className="flex items-center gap-2 bg-[#F4F4F4] p-2 w-fit mt-2">
                <p className="text-[#0B0B0B] text-sm">Read more</p>
                <Image src="/Images/readArrow.png" alt="Read Arrow" width={12} height={12} className="w-3 h-3" />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Image src="/Images/insights4.png" alt="The art of storytelling in branding and advertising" width={500} height={388} className="w-full h-[200px] sm:h-[300px] lg:h-[388px] object-cover" />
              <h3 className="text-[#0B0B0B] font-medium text-sm sm:text-lg lg:text-xl mt-3 sm:mt-4 text-start w-[90%]">The art of storytelling in branding and advertising</h3>
              <p className="text-[#666666] text-xs mt-2 w-[90%]">Branding • Mar 1, 2025 • 8min read</p>
              <p className="text-[#212121] text-xs mt-2 w-[90%]">The real estate industry is undergoing a significant transformation as eco-friendly homes gain popularity among buyers and developers alike. With increasing awareness of climate change and the need for sustainable livin</p>
              <div className="flex items-center gap-2 bg-[#F4F4F4] p-2 w-fit mt-2">
                <p className="text-[#0B0B0B] text-sm">Read more</p>
                <Image src="/Images/readArrow.png" alt="Read Arrow" width={12} height={12} className="w-3 h-3" />
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-center gap-3 pb-12">
        <button
          onClick={() => setCurrentPage(1)}
          className={`w-8 h-8 xl:w-12 xl:h-12 flex items-center justify-center text-sm ${
            currentPage === 1 ? 'bg-black text-white' : 'text-[#212121] hover:bg-gray-100'
          }`}
        >
          1
        </button>
        <button
          onClick={() => setCurrentPage(2)}
          className={`w-8 h-8 xl:w-12 xl:h-12 flex items-center justify-center text-sm ${
            currentPage === 2 ? 'bg-black text-white' : 'text-[#212121] hover:bg-gray-100'
          }`}
        >
          2
        </button>
        <button
          onClick={() => setCurrentPage(3)}
          className={`w-8 h-8 xl:w-12 xl:h-12 flex items-center justify-center text-sm ${
            currentPage === 3 ? 'bg-black text-white' : 'text-[#212121] hover:bg-gray-100'
          }`}
        >
          3
        </button>
      </div>

      {/* contact */}
      <div className="relative w-full">
        <Image src="/Images/sidetruckbg.png" alt="Truck" width={400} height={200} className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover" />
        <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-8 lg:py-0">
          <div className="text-white text-center lg:text-left mb-6 lg:mb-0">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[42px] mb-2 leading-tight">Empowering Startups and <br /> Enterprises Alike – Join Us</h2>
          </div>
          <div className="text-white text-center lg:text-right">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[24px] font-light mb-6 lg:mb-8 leading-relaxed">Let&apos;s Build Software That <br /> Works for You</h3>
            <button 
              onClick={() => router.push('/contact')}
              className="bg-white border-2 border-white text-black px-8 sm:px-10 md:px-12 py-2 sm:py-2.5 rounded-full hover:bg-transparent hover:text-white transition-colors text-sm sm:text-base xl:text-[18px]"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>



      {/* Footer */}
      <FooterSimple />

    </div>
  )
}

export default PressRelease