'use client'

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface DualTextSectionProps {
  title: string
  titleHighlight: string
  description: string
}

const DualTextSection = ({
  title,
  titleHighlight,
  description
}: DualTextSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)

  // Scroll animation
  useEffect(() => {
    const section = sectionRef.current

    if (section) {
      const titleElement = section.querySelector('.dual-text-title')
      const descriptionElement = section.querySelector('.dual-text-description')

      if (titleElement) {
        gsap.set(titleElement, { opacity: 0, y: 60 })
        gsap.to(titleElement, {
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

      if (descriptionElement) {
        gsap.set(descriptionElement, { opacity: 0, y: 40 })
        gsap.to(descriptionElement, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
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
    <div ref={sectionRef} className="flex px-4 sm:px-6 md:px-8 flex-col lg:flex-row justify-between items-start gap-3 sm:gap-8 lg:gap-4 my-16 lg:my-24">
      {/* Desktop/Tablet Title */}
      <p className="dual-text-title hidden sm:block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
        <span className="text-[#3B3B3D73]">{title}</span>
        <br className="lg:hidden" />
        <span className="text-[#000A1B]"> {titleHighlight}</span>
      </p>

      {/* Mobile Title */}
      <p className="dual-text-title sm:hidden text-[28px] leading-tight font-medium">
        <span className="text-[#000A1B]">{title}</span>
        <span className="text-[#8F9096] font-light"> {titleHighlight}</span>
      </p>

      {/* Desktop/Tablet Description */}
      <p className="dual-text-description hidden sm:block text-base sm:text-lg md:text-xl lg:text-2xl text-[#2D2C2C] leading-relaxed lg:max-w-[50%] pt-0 sm:pt-4 lg:pt-24">
        {description}
      </p>

      {/* Mobile Description */}
      <p className="dual-text-description sm:hidden text-[14px] text-[#2D2C2C] leading-[22px] font-normal">
        {description}
      </p>
    </div>
  )
}

export default DualTextSection
