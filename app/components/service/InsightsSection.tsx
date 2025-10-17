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

  // Insights scroll animation
  useEffect(() => {
    const items = insightItemsRef.current.filter(Boolean)

    if (items.length > 0) {
      items.forEach((item, index) => {
        gsap.set(item, { opacity: 0, x: -50, scale: 0.95 })
        gsap.to(item, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.1 * index,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: items[0],
            start: 'top 75%',
            once: true
          }
        })
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <>
      {/* Insights Header */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-1 px-4 sm:px-5 md:px-7 lg:px-9 xl:px-12 py-3 sm:py-5 md:py-8 lg:py-12 mx-auto items-start sm:items-center justify-between mt-7">
        <h2 className="text-[#000A1B] flex text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium leading-tight w-full lg:w-[80%]">
          <span className="text-[#3B3B3D73] mr-3">{title}</span>
          <span className="text-[#0B0B0B]">{titleHighlight}</span>
        </h2>
        {buttonText && (
          <Button onClick={onButtonClick} className="self-start sm:self-auto">
            {buttonText}
          </Button>
        )}
      </div>

      {/* Insights Side Scroll */}
      <div
        className="overflow-x-auto px-4 sm:px-5 md:px-7 lg:px-9 xl:px-12 pb-6 sm:pb-8 md:pb-12 lg:pb-16"
        style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <div className="flex gap-4 sm:gap-6 min-w-max">
          {insights.map((insight, index) => (
            <div
              key={index}
              ref={el => { if (el) insightItemsRef.current[index] = el }}
              className="flex flex-col w-[280px] sm:w-[400px] lg:w-[500px]"
            >
              <Image
                src={insight.imageSrc}
                alt={insight.imageAlt || insight.title}
                width={500}
                height={388}
                className="w-[280px] sm:w-[400px] lg:w-[500px] h-[200px] sm:h-[300px] lg:h-[388px] object-cover rounded-lg"
              />
              <h3 className="text-[#0B0B0B] font-medium text-sm sm:text-lg lg:text-xl mt-3 sm:mt-4 text-start w-[90%]">
                {insight.title}
              </h3>
              <p className="text-[#666666] text-xs mt-2 w-[90%]">
                {insight.category} • {insight.date} • {insight.readTime}
              </p>
              <div className="relative w-[90%] mt-2">
                <p className="text-[#0B0B0B] text-xs">Read more</p>
                <div className="absolute bottom-0 left-0 w-16 sm:w-20 h-px bg-[#0B0B0B]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default InsightsSection
