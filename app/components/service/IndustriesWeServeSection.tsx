'use client'

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface Industry {
  imageSrc: string
  name: string
}

interface IndustriesWeServeSectionProps {
  title: string
  titleHighlight: string
  description: string
  industries: Industry[]
}

const IndustriesWeServeSection = ({
  title,
  titleHighlight,
  description,
  industries
}: IndustriesWeServeSectionProps) => {
  const industriesRef = useRef<HTMLDivElement[]>([])

  // Industries slider scroll animation
  useEffect(() => {
    const items = industriesRef.current.filter(Boolean)

    if (items.length > 0) {
      items.forEach((item, index) => {
        gsap.set(item, { opacity: 0, x: -100, scale: 0.9 })
        gsap.to(item, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          delay: 0.15 * index,
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

  // Check if any text content is provided
  const hasTextContent = title || titleHighlight || description

  return (
    <>
      {/* Industries We Serve section - only render if text content exists */}
      {hasTextContent && (
        <div className="flex px-4 sm:px-6 md:px-8 flex-col lg:flex-row justify-between items-start gap-6 sm:gap-8 lg:gap-4 my-16 lg:my-24">
          {(title || titleHighlight) && (
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[64px] font-medium">
              {title && <span className="text-[#3B3B3D73]">{title}</span>}
              {title && titleHighlight && <br className="lg:hidden" />}
              {titleHighlight && <span className="text-[#000A1B]"> {titleHighlight}</span>}
            </p>
          )}
          {description && (
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[32px] text-[#2D2C2C] leading-relaxed lg:max-w-[50%] pt-0 sm:pt-4 lg:pt-24">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Industries Slider */}
      <div className="w-full px-[3%] mb-16 lg:mb-24">
        <div
          className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-6 overflow-x-auto h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[821px]"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {industries.map((industry, index) => (
            <div
              key={index}
              ref={el => { if (el) industriesRef.current[index] = el }}
              className="relative flex-shrink-0 w-[280px] sm:w-[350px] md:w-[420px] lg:w-[525px] xl:w-[547px] h-full"
            >
              <Image
                src={industry.imageSrc}
                alt={industry.name}
                fill
                className="object-cover rounded-2xl"
                quality={90}
              />
              <p className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-5 md:right-5 text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[42px]" style={{ fontWeight: 400 }}>
                {industry.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default IndustriesWeServeSection
