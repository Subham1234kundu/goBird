'use client'

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface BuildItem {
  imageSrc: string
  title: string
}

interface WeBuildSectionProps {
  heading: string
  description: string
  buttonText: string
  items: BuildItem[]
  onButtonClick?: () => void
}

const WeBuildSection = ({
  heading,
  description,
  buttonText,
  items,
  onButtonClick
}: WeBuildSectionProps) => {
  const weBuildSectionRef = useRef<HTMLDivElement>(null)
  const weBuildItemsRef = useRef<HTMLDivElement[]>([])

  // We Build section scroll animation
  useEffect(() => {
    const section = weBuildSectionRef.current
    const itemsArray = weBuildItemsRef.current.filter(Boolean)

    if (section) {
      const headingElement = section.querySelector('p:first-child')
      const descriptionElement = section.querySelector('p:nth-child(2)')
      const button = section.querySelector('button')

      // Animate heading
      if (headingElement) {
        gsap.set(headingElement, { opacity: 0, y: 50 })
        gsap.to(headingElement, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true
          }
        })
      }

      // Animate description
      if (descriptionElement) {
        gsap.set(descriptionElement, { opacity: 0, y: 40 })
        gsap.to(descriptionElement, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true
          }
        })
      }

      // Animate button
      if (button) {
        gsap.set(button, { opacity: 0, scale: 0.8, y: 20 })
        gsap.to(button, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true
          }
        })
      }

      // Animate slider items
      if (itemsArray.length > 0) {
        itemsArray.forEach((item, index) => {
          gsap.set(item, { opacity: 0, x: -100, scale: 0.9 })
          gsap.to(item, {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            delay: 0.15 * index,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              once: true
            }
          })
        })
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={weBuildSectionRef} className="flex flex-col lg:flex-row px-[3%] py-8 lg:py-0 lg:justify-between lg:items-center min-h-[600px] sm:min-h-[700px] md:min-h-[800px] lg:h-[1000px] w-full bg-custom-bg gap-8 lg:gap-0">
      <div className="flex gap-6 sm:gap-8 md:gap-10 lg:gap-12 flex-col w-full lg:w-[40%]">
        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">{heading}</p>
        <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[32px]">{description}</p>
        <button
          onClick={onButtonClick}
          className="bg-white text-black rounded-full px-5 sm:px-6 md:px-7 py-2 w-fit text-[18px] font-medium hover:bg-gray-100 transition-colors"
        >
          {buttonText}
        </button>
      </div>

      {/* slider div */}
      <div className="w-full lg:w-[55%] h-[400px] sm:h-[500px] md:h-[600px] lg:h-[70%]">
        <div
          className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto h-full"
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

          {items.map((item, index) => (
            <div
              key={index}
              ref={el => { if (el) weBuildItemsRef.current[index] = el }}
              className="flex flex-col flex-shrink-0 w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] xl:w-[547px]"
            >
              <div className="relative w-full h-[300px] sm:h-[360px] md:h-[420px] lg:h-[480px] xl:h-[821px] mb-3 sm:mb-4 md:mb-5 lg:mb-7">
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  className="object-cover rounded-xl"
                  quality={90}
                />
              </div>
              <p className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[42px] leading-tight" style={{ fontWeight: 400 }}>
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WeBuildSection
