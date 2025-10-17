'use client'

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ServiceFooterProps {
  imageSrc: string
  imageAlt: string
  largeText: string
  smallText: string
  description: string
  rightTitle: string
  buttonText: string
  onButtonClick?: () => void
}

const ServiceFooter = ({
  imageSrc,
  imageAlt,
  largeText,
  smallText,
  description,
  rightTitle,
  buttonText,
  onButtonClick
}: ServiceFooterProps) => {
  const footerSectionRef = useRef<HTMLDivElement>(null)

  // Footer section scroll animation
  useEffect(() => {
    const footer = footerSectionRef.current

    if (footer) {
      const largeTextElement = footer.querySelector('.footer-large-text')
      const descriptionElement = footer.querySelector('.footer-description')
      const rightContent = footer.querySelector('.footer-right-content')

      if (largeTextElement) {
        gsap.set(largeTextElement, { opacity: 0, x: -80 })
        gsap.to(largeTextElement, {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 70%',
            once: true
          }
        })
      }

      if (descriptionElement) {
        gsap.set(descriptionElement, { opacity: 0, y: 30 })
        gsap.to(descriptionElement, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 70%',
            once: true
          }
        })
      }

      if (rightContent) {
        gsap.set(rightContent, { opacity: 0, x: 80 })
        gsap.to(rightContent, {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer,
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
    <div ref={footerSectionRef} className="w-full h-[400px] sm:h-[450px] md:h-[520px] lg:h-[520px] relative">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover grayscale"
        quality={90}
        unoptimized
      />

      {/* Content overlay in the middle */}
      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-6 sm:py-8 md:py-0">
        {/* Left side content */}
        <div className="footer-large-text flex flex-col gap-2 sm:gap-3 md:gap-4 w-full md:w-[60%] lg:w-[70%]">
          <div className="flex items-baseline gap-2 sm:gap-3">
            <p className="text-5xl sm:text-6xl md:text-7xl lg:text-[10rem] xl:text-[12rem] text-white leading-none">
              {largeText}
            </p>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-white">
              {smallText}
            </p>
          </div>

          <p className="footer-description text-xs sm:text-sm md:text-base lg:text-2xl xl:text-4xl w-full text-white leading-relaxed">
            {description.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < description.split('\n').length - 1 && <br className="hidden sm:block" />}
              </span>
            ))}
          </p>
        </div>

        {/* Right side content */}
        <div className="footer-right-content flex flex-col items-center md:items-end gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-4 md:mt-0 w-full md:w-auto">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white text-center md:text-right">
            {rightTitle.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < rightTitle.split('\n').length - 1 && <br />}
              </span>
            ))}
          </p>
          <button
            onClick={onButtonClick}
            className="bg-white text-black rounded-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-2 text-xs sm:text-sm md:text-base font-medium hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceFooter
