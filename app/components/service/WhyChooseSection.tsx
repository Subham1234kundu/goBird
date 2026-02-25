'use client'

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface WhyChooseItem {
  text: string
  highlighted?: boolean
}

interface WhyChooseSectionProps {
  title: string
  titleHighlight: string
  subtitle: string
  items: WhyChooseItem[]
  imageSrc: string
  imageAlt: string
  overlayImageSrc?: string
  overlayImageAlt?: string
}

const WhyChooseSection = ({
  title,
  titleHighlight,
  subtitle,
  items,
  imageSrc,
  imageAlt,
  overlayImageSrc,
  overlayImageAlt
}: WhyChooseSectionProps) => {
  const whyChooseSectionRef = useRef<HTMLDivElement>(null)
  const whyChooseImageRef = useRef<HTMLDivElement>(null)
  const whyChooseTextRef = useRef<HTMLDivElement>(null)
  const whyChooseItemsRef = useRef<HTMLDivElement[]>([])

  // Why Choose section scroll animation
  useEffect(() => {
    const section = whyChooseSectionRef.current
    const image = whyChooseImageRef.current
    const textHeading = whyChooseTextRef.current
    const itemsArray = whyChooseItemsRef.current.filter(Boolean)

    if (section) {
      // Animate heading
      if (textHeading) {
        const heading = textHeading.querySelector('div')
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
      }

      // Animate items with stagger
      if (itemsArray.length > 0) {
        itemsArray.forEach((item, index) => {
          gsap.set(item, { opacity: 0, x: -80, scale: 0.95 })
          gsap.to(item, {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            delay: 0.5 + (index * 0.15),
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              once: true
            }
          })
        })
      }

      // Animate image with scale and rotation
      if (image) {
        gsap.set(image, { opacity: 0, scale: 0.85, rotationY: -15 })
        gsap.to(image, {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          delay: 0.3,
          ease: 'power3.out',
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
    <div ref={whyChooseSectionRef} className="flex flex-col my-8 md:my-12 lg:my-16 xl:my-20 mx-[3%] md:mx-[4%] lg:mx-[5%] xl:mx-[3%] gap-6 md:gap-8 lg:gap-10 xl:gap-12">
      <div ref={whyChooseTextRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-[64px] text-[#3B3B3D73] font-medium mb-4 md:mb-6 lg:mb-8">
        <style jsx>{`
          @media (max-width: 639px) {
            .mobile-why-choose-heading {
              width: 398px !important;
              max-width: 100% !important;
              height: auto !important;
              min-height: 78px !important;
              font-family: 'Montserrat', sans-serif !important;
              font-style: normal !important;
              font-weight: 500 !important;
              font-size: 32px !important;
              line-height: 39px !important;
              display: flex !important;
              flex-direction: column !important;
              align-items: flex-start !important;
              justify-content: center !important;
              color: rgba(59, 59, 61, 0.45) !important;
              flex: none !important;
              order: 0 !important;
              align-self: stretch !important;
              flex-grow: 0 !important;
            }
            .mobile-why-choose-heading p {
              white-space: normal !important;
              font-size: 32px !important;
              line-height: 39px !important;
            }
          }
        `}</style>
        <div className="mobile-why-choose-heading w-full">
          <p className="whitespace-nowrap sm:whitespace-normal">{title} <span className="text-[#000A1B]">{titleHighlight}</span></p>
          <p className="text-[#000A1B]">{subtitle}</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start justify-between gap-8 md:gap-10 lg:gap-12 xl:gap-14 w-full">
        <div className="flex flex-col gap-8 md:gap-12 lg:gap-16 xl:gap-24 w-full lg:w-[50%] xl:w-[40%] flex-1">
          {items.map((item, index) => {
            // First item - regular paragraph text
            if (index === 0) {
              return (
                <p
                  key={index}
                  ref={el => { if (el) whyChooseItemsRef.current[index] = el }}
                  className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-[32px] text-center sm:text-left"
                >
                  {item.text}
                </p>
              )
            }

            // Highlighted item with background
            if (item.highlighted) {
              return (
                <div
                  key={index}
                  ref={el => { if (el) whyChooseItemsRef.current[index] = el }}
                  className="border-b border-[#8F9096] pb-6 md:pb-8 lg:pb-10"
                >
                  <p className="p-3 md:p-4 pl-4 md:pl-5 lg:pl-7 text-base md:text-lg lg:text-xl xl:text-[32px] bg-[#dfe1ed] font-semibold rounded-sm text-[#0F1011] text-center sm:text-left">
                    {item.text}
                  </p>
                </div>
              )
            }

            // Regular items with border
            return (
              <p
                key={index}
                ref={el => { if (el) whyChooseItemsRef.current[index] = el }}
                className="text-[#000A1B] text-lg md:text-xl lg:text-xl xl:text-[32px] font-semibold border-b border-[#8F9096] pb-6 md:pb-8 lg:pb-10 xl:pb-12 text-center sm:text-left"
              >
                {item.text}
              </p>
            )
          })}
        </div>

        <div ref={whyChooseImageRef} className="hidden sm:flex w-full lg:w-[45%] xl:w-[40%] items-center justify-center lg:justify-end mt-8 lg:mt-0">
          <div className="relative w-full sm:w-[350px] md:w-[380px] lg:w-[380px] xl:w-[425px] h-[500px] sm:h-[600px] md:h-[650px] lg:h-[500px] xl:h-[800px]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={425}
              height={800}
              className="w-full h-full object-cover rounded-xl"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-black opacity-40 rounded-xl"></div>
            {overlayImageSrc && (
              <div className="absolute top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2 z-10">
                <Image
                  src={overlayImageSrc}
                  alt={overlayImageAlt || "Overlay"}
                  width={350}
                  height={350}
                  className="w-[180px] sm:w-[220px] md:w-[260px] lg:w-[280px] xl:w-[321px] h-auto"
                  priority
                  unoptimized
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhyChooseSection
