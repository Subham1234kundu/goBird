'use client'

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface Statistic {
  value: number
  suffix: string
  color: string
  description: string
}

interface StatisticsRowProps {
  statistics: Statistic[]
}

const StatisticsRow = ({ statistics }: StatisticsRowProps) => {
  const statisticsRef = useRef<HTMLDivElement[]>([])

  // Statistics counter animation - only numbers
  useEffect(() => {
    const stats = statisticsRef.current.filter(Boolean)

    if (stats.length > 0) {
      // Target values for each statistic
      const targetValues = statistics.map(stat => stat.value)

      stats.forEach((stat, index) => {
        const numberElement = stat.querySelector('p:first-child')

        // Animate number counter only
        if (numberElement) {
          const counterObj = { value: 0 }
          gsap.to(counterObj, {
            value: targetValues[index],
            duration: 2.5,
            delay: 0.2 * index,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stats[0],
              start: 'top 75%',
              once: true
            },
            onUpdate: () => {
              const currentValue = Math.floor(counterObj.value)
              // Find the text node (first child before the span)
              const textNodes = Array.from(numberElement.childNodes).filter(
                (node: ChildNode) => node.nodeType === Node.TEXT_NODE
              )
              if (textNodes.length > 0) {
                (textNodes[0] as Text).textContent = currentValue.toString()
              }
            }
          })
        }
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [statistics])

  return (
    <div className="w-full items-center justify-center px-[3%]">
      <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start gap-8 sm:gap-4 md:gap-6 mt-12 lg:mt-16">
        {statistics.map((stat, index) => (
          <div
            key={index}
            ref={el => { if (el) statisticsRef.current[index] = el }}
            className="flex flex-col items-start w-full sm:w-[48%] md:w-[23%]"
          >
            <p className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${stat.color} ${stat.suffix === 'X' ? 'flex items-center gap-1' : ''}`}>
              {stat.value}
              {stat.suffix === 'X' ? (
                <span className="text-2xl sm:text-3xl md:text-3xl font-extrabold">{stat.suffix}</span>
              ) : (
                <span className="font-normal">{stat.suffix}</span>
              )}
            </p>
            <p className="text-xs sm:text-sm md:text-base text-[#000A1B] mt-2">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatisticsRow
