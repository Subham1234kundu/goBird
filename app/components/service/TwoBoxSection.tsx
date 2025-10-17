'use client'

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface TwoBoxSectionProps {
  leftImageSrc: string
  leftImageAlt: string
  rightImageSrc: string
  rightImageAlt: string
}

const TwoBoxSection = ({
  leftImageSrc,
  leftImageAlt,
  rightImageSrc,
  rightImageAlt
}: TwoBoxSectionProps) => {
  const twoBoxRef = useRef<HTMLDivElement[]>([])

  // Two box section scroll animation
  useEffect(() => {
    const boxes = twoBoxRef.current.filter(Boolean)

    if (boxes.length > 0) {
      boxes.forEach((box, index) => {
        gsap.set(box, { opacity: 0, x: index === 0 ? -80 : 80, scale: 0.95 })
        gsap.to(box, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          delay: 0.2 * index,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: boxes[0],
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
    <div className="flex flex-col md:flex-row px-[3%] gap-4 md:gap-6 items-center justify-center my-16 lg:my-24">
      {/* First box - 30% width on desktop, full width on mobile */}
      <div
        ref={el => { if (el) twoBoxRef.current[0] = el }}
        className="w-full md:w-[30%] h-[400px] sm:h-[450px] md:h-[500px] lg:h-[575px] relative"
      >
        <Image
          src={leftImageSrc}
          alt={leftImageAlt}
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>

      {/* Second box - 70% width on desktop, full width on mobile */}
      <div
        ref={el => { if (el) twoBoxRef.current[1] = el }}
        className="w-full md:w-[70%] h-[400px] sm:h-[450px] md:h-[500px] lg:h-[575px] relative"
      >
        <Image
          src={rightImageSrc}
          alt={rightImageAlt}
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>
    </div>
  )
}

export default TwoBoxSection
