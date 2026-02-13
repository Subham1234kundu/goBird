'use client'

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

interface InsightItem {
  imageSrc: string
  title: string
  category: string
  date: string
  readTime: string
  imageAlt?: string
}

interface InsightsSectionProps {
  title: string
  titleHighlight: string
  buttonText?: string
  insights: InsightItem[]
  onButtonClick?: () => void
}

const InsightsSection = ({
  title,
  titleHighlight,
  buttonText = "More articles",
  insights,
  onButtonClick
}: InsightsSectionProps) => {
  const insightItemsRef = useRef<HTMLDivElement[]>([])

  // Insights scroll animation - disabled for Locomotive Scroll compatibility
  useEffect(() => {
    // Animation disabled to ensure visibility with Locomotive Scroll
    // Items will be visible immediately
  }, [])

  return (
    <div className="w-full bg-transparent">
  {/* Insights Header */}
  {(title || titleHighlight) && (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-1 px-4 sm:px-5 md:px-7 lg:px-9 xl:px-12 py-3 sm:py-5 md:py-8 lg:py-12 mx-auto items-start sm:items-center justify-between mt-7">
      <h2 className="text-[#000A1B] flex text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[64px] font-medium leading-tight w-full lg:w-[80%]">
        <span className="text-[#3B3B3D73] mr-3 text-[20px] sm:text-xl md:text-2xl lg:text-3xl xl:text-[64px] font-normal sm:font-medium">
          {title}
        </span>
        <span className="text-[#0B0B0B] text-[20px] sm:text-xl md:text-2xl lg:text-3xl xl:text-[64px] font-normal sm:font-medium">
          {titleHighlight}
        </span>
      </h2>
      
      {/* Mobile: Hide button, Desktop: Show button */}
      {buttonText && (
        <Button 
          onClick={onButtonClick} 
          className="hidden sm:flex self-start sm:self-auto xl:text-[16px] p-6 items-center gap-2"
        >
          {buttonText}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Button>
      )}
    </div>
  )}

  {/* Insights Side Scroll */}
  <div
    className="overflow-x-auto px-4 sm:px-5 md:px-7 lg:px-9 xl:px-12 pb-6 sm:pb-8 md:pb-12 lg:pb-16 mt-8"
    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
  >
    <style jsx>{`
      div::-webkit-scrollbar {
        display: none;
      }
    `}</style>

    {/* Scroll container */}
    <div className="flex gap-4 sm:gap-6 min-w-full snap-x snap-mandatory">
      {insights.map((insight, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) insightItemsRef.current[index] = el;
          }}
          className="flex flex-col w-full sm:w-[400px] lg:w-[600px] snap-start flex-shrink-0"
        >
          <div className="overflow-hidden">
            <Image
              src={insight.imageSrc}
              alt={insight.imageAlt || insight.title}
              width={600}
              height={388}
              className="w-full sm:w-[400px] lg:w-[500px] h-[220px] sm:h-[300px] lg:h-[388px] xl:h-[488px] xl:w-[600px] object-cover"
            />
          </div>

          <h3 className="text-[#0B0B0B] text-[18px] sm:text-lg lg:text-[32px] mt-3 sm:mt-4 text-start w-[90%] font-normal sm:font-normal">
            {insight.title}
          </h3>

          <p className="text-[#666666] text-[14px] sm:text-sm md:text-base mt-4 w-[90%] font-normal sm:font-normal">
            {insight.category} • {insight.date} • {insight.readTime}
          </p>

          <div className="relative w-[90%] mt-4">
            <p className="text-[#0B0B0B] text-[16px] sm:text-base font-light sm:font-normal">
              Read more
            </p>
            <div className="absolute bottom-0 left-0 w-16 sm:w-20 h-px bg-[#0B0B0B]"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
    </div>
  )
}

export default InsightsSection
