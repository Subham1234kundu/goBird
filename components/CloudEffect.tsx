'use client'

import { useEffect, useRef } from 'react'

const CloudEffect = () => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const clouds = svg.querySelectorAll('.cloud-path')
    
    clouds.forEach((cloud, index) => {
      const animateCloud = () => {
        const duration = 25000 + (index * 3000)
        const delay = index * 4000
        
        setTimeout(() => {
          cloud.style.transform = `translateX(${window.innerWidth + 200}px)`
          cloud.style.transition = `transform ${duration}ms linear`
          
          setTimeout(() => {
            cloud.style.transform = 'translateX(-200px)'
            cloud.style.transition = 'none'
            setTimeout(animateCloud, 100)
          }, duration)
        }, delay)
      }
      
      animateCloud()
    })
  }, [])

  return (
    <div className="fixed bottom-0 left-0 w-full h-40 pointer-events-none z-10 overflow-hidden">
      <svg ref={svgRef} className="w-full h-full" viewBox="0 0 1200 160">
        <defs>
          <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
          </filter>
        </defs>
        
        <path 
          className="cloud-path" 
          d="M-200,120 Q-180,100 -150,105 Q-120,95 -90,100 Q-60,90 -30,95 Q0,85 30,90 Q60,80 90,85 Q120,75 150,80 Q180,70 210,75 Q240,80 270,85 Q300,90 330,95 L330,160 L-200,160 Z" 
          fill="rgba(255,255,255,0.9)" 
          filter="url(#blur)"
        />
        
        <path 
          className="cloud-path" 
          d="M-200,130 Q-170,110 -140,115 Q-110,105 -80,110 Q-50,100 -20,105 Q10,95 40,100 Q70,90 100,95 Q130,85 160,90 Q190,95 220,100 Q250,105 280,110 L280,160 L-200,160 Z" 
          fill="rgba(255,255,255,0.7)" 
          filter="url(#blur)"
        />
        
        <path 
          className="cloud-path" 
          d="M-200,140 Q-175,125 -145,130 Q-115,120 -85,125 Q-55,115 -25,120 Q5,110 35,115 Q65,105 95,110 Q125,100 155,105 Q185,110 215,115 L215,160 L-200,160 Z" 
          fill="rgba(255,255,255,0.5)" 
          filter="url(#blur)"
        />
        
        <path 
          className="cloud-path" 
          d="M-200,135 Q-160,115 -130,120 Q-100,110 -70,115 Q-40,105 -10,110 Q20,100 50,105 Q80,95 110,100 Q140,105 170,110 Q200,115 230,120 L230,160 L-200,160 Z" 
          fill="rgba(255,255,255,0.6)" 
          filter="url(#blur)"
        />
      </svg>
    </div>
  )
}

export default CloudEffect