'use client'

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface MarketContextSectionProps {
  title: string
  titleHighlight: string
  marketDescription: string
  marketProjectionLabel: string
  marketProjectionValue: string
  marketProjectionYear: string
  imageSrc: string
  imageAlt: string
  measurableTitle: string
  measurableTitleHighlight: string
  measurableDescription: string
}

const MarketContextSection = ({
  title,
  titleHighlight,
  marketDescription,
  marketProjectionLabel,
  marketProjectionValue,
  marketProjectionYear,
  imageSrc,
  imageAlt,
  measurableTitle,
  measurableTitleHighlight,
  measurableDescription
}: MarketContextSectionProps) => {
  const marketSectionRef = useRef<HTMLDivElement>(null)

  // Market section scroll animation
  useEffect(() => {
    const section = marketSectionRef.current

    if (section) {
      const heading = section.querySelector('p:first-child')
      const image = section.querySelector('.market-image')
      const overlayText = section.querySelector('.market-overlay-text')

      if (heading) {
        gsap.set(heading, { opacity: 0, y: 60 })
        gsap.to(heading, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true
          }
        })
      }

      if (image) {
        gsap.set(image, { opacity: 0, scale: 1.1 })
        gsap.to(image, {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: image,
            start: 'top 75%',
            once: true
          }
        })
      }

      if (overlayText) {
        gsap.set(overlayText, { opacity: 0, y: 40 })
        gsap.to(overlayText, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: image,
            start: 'top 75%',
            once: true
          }
        })
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={marketSectionRef} className="w-full px-[3%] sm:px-[2%] pt-18 sm:pt-24 md:pt-30 lg:pt-40 pb-12 sm:pb-14 md:pb-16 lg:pb-20">
      <p className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-[64px] font-medium mb-6 sm:mb-8 md:mb-12 lg:mb-32 mx-[2%] sm:m-[1%]">
        <span className="text-[#000000]">{title}</span><br />
        <span className="text-[#000A1B]">{titleHighlight}</span>
      </p>

      {/* White box - above image on mobile/tablet, overlapping on desktop */}
      <div className="lg:hidden bg-white p-4 mb-6 w-full">
        <p className="text-base sm:text-lg text-[#2D2C2C] leading-10">
          {marketDescription}
        </p>
      </div>

      <div className="market-image relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[558px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
        />

        {/* Black tint overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Market Projection text overlay - responsive positioning */}
        <div className="market-overlay-text absolute bottom-6 sm:bottom-8 md:bottom-10 lg:top-28 left-4 sm:left-6 md:left-8 lg:left-16 z-10 flex flex-col font-light text-white">
          <p className="text-sm sm:text-base md:text-base">{marketProjectionLabel}</p>
          <p className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl">{marketProjectionValue}</p>
          <p className="text-sm sm:text-sm text-right">{marketProjectionYear}</p>
        </div>

        {/* Text overlay container - desktop only */}
        <div className="hidden lg:block absolute top-0 right-0 w-[35%] xl:w-[33%] bg-white p-4 z-10 transform -translate-y-[70%]">
          <p className="text-xl xl:text-[32px] text-[#2D2C2C] leading-10">
            {marketDescription}
          </p>
        </div>
      </div>

      {/* Measurable Outcomes section */}
      <div className="flex px-4 sm:px-6 md:px-8 flex-col lg:flex-row justify-between items-start gap-6 sm:gap-8 lg:gap-4 mt-16 lg:mt-24">
        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-medium">
          <span className="text-[#3B3B3D73]">{measurableTitle}</span><br className="lg:hidden" />
          <span className="text-[#000A1B]"> {measurableTitleHighlight}</span>
        </p>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[32px] text-[#2D2C2C] leading-relaxed lg:max-w-[50%] mt-0 sm:mt-4 lg:mt-52">
          {measurableDescription}
        </p>
      </div>
    </div>
  )
}

export default MarketContextSection
