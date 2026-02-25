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
  autoScroll?: boolean
  mobileLayout?: 'scroll' | 'stack'
}

const IndustriesWeServeSection = ({
  title,
  titleHighlight,
  description,
  industries,
  autoScroll = false,
  mobileLayout = 'scroll'
}: IndustriesWeServeSectionProps) => {
  const industriesRef = useRef<HTMLDivElement[]>([])
  const scrollContainerRef = useRef<HTMLDivElement>(null)

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

  // Auto-scroll logic
  useEffect(() => {
    if (!autoScroll || mobileLayout === 'stack') return;

    const container = scrollContainerRef.current;
    if (!container) return;

    let intervalId: NodeJS.Timeout;
    let currentIndex = 0;

    const startAutoScroll = () => {
      intervalId = setInterval(() => {
        currentIndex++;

        // Calculate dynamic scroll step (item width + gap)
        // We get this from the first item if possible
        const firstItem = container.firstElementChild as HTMLElement;
        let scrollStep = 0;

        if (firstItem) {
          const style = window.getComputedStyle(container);
          const gap = parseFloat(style.gap) || 12; // Default to 12px if failure
          scrollStep = firstItem.offsetWidth + gap;
        } else {
          // Fallback if no items (unlikely)
          scrollStep = 300;
        }

        if (currentIndex >= industries.length) {
          currentIndex = 0;
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollTo({ left: currentIndex * scrollStep, behavior: 'smooth' });
        }
      }, 3000); // Change every 3 seconds
    };

    startAutoScroll();

    return () => clearInterval(intervalId);
  }, [autoScroll, mobileLayout, industries.length]);

  // Check if any text content is provided
  const hasTextContent = title || titleHighlight || description

  const isStack = mobileLayout === 'stack';

  return (
    <>
      {/* Industries We Serve section - only render if text content exists */}
      {hasTextContent && (
        <div className="flex px-4 sm:px-6 md:px-8 flex-col lg:flex-row justify-between items-start gap-3 sm:gap-8 lg:gap-4 my-16 lg:my-24">

          {/* Desktop/Tablet Title */}
          {(title || titleHighlight) && (
            <p className="hidden sm:block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[64px] font-medium">
              {title && <span className="text-[#3B3B3D73]">{title}</span>}
              {title && titleHighlight && <br className="lg:hidden" />}
              {titleHighlight && <span className="text-[#000A1B]"> {titleHighlight}</span>}
            </p>
          )}

          {/* Mobile Title */}
          {(title || titleHighlight) && (
            <p className="sm:hidden text-[28px] leading-tight font-medium">
              {title && <span className="text-[#000A1B]">{title}</span>}
              {titleHighlight && <span className="text-[#8F9096] font-light"> {titleHighlight}</span>}
            </p>
          )}

          {/* Desktop/Tablet Description */}
          {description && (
            <p className="hidden sm:block text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[32px] text-[#2D2C2C] leading-relaxed lg:max-w-[50%] pt-0 sm:pt-4 lg:pt-24">
              {description}
            </p>
          )}

          {/* Mobile Description */}
          {description && (
            <p className="sm:hidden text-[14px] text-[#2D2C2C] leading-[22px] font-normal">
              {description}
            </p>
          )}

        </div>
      )}

      {/* Industries Slider */}
      <div className="w-full px-[3%] mb-16 lg:mb-24">
        <div
          ref={scrollContainerRef}
          className={`flex ${isStack ? 'flex-col h-auto' : 'overflow-x-auto h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[821px]'} gap-3 sm:gap-4 md:gap-5 lg:gap-6`}
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
              className={`relative flex-shrink-0 ${isStack ? 'w-full h-[500px] sm:h-[600px] md:h-[700px]' : 'w-[280px] sm:w-[350px] md:w-[420px] lg:w-[525px] xl:w-[547px] h-full'}`}
            >
              <Image
                src={industry.imageSrc}
                alt={industry.name}
                fill
                className={`object-cover ${isStack ? 'rounded-none' : 'rounded-2xl'}`}
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
