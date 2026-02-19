'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const CloudLayers = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <div 
        className="absolute w-full h-full"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <Image src="/Images/clouds/c1.png" alt="Cloud 1" width={1920} height={400} className="absolute top-[10%] left-0 w-full h-auto opacity-30" />
      </div>
      <div 
        className="absolute w-full h-full"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      >
        <Image src="/Images/clouds/c2.png" alt="Cloud 2" width={1920} height={400} className="absolute top-[25%] left-0 w-full h-auto opacity-40" />
      </div>
      <div 
        className="absolute w-full h-full"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <Image src="/Images/clouds/c3.png" alt="Cloud 3" width={1920} height={400} className="absolute top-[45%] left-0 w-full h-auto opacity-50" />
      </div>
      <div 
        className="absolute w-full h-full"
        style={{ transform: `translateY(${scrollY * 0.25}px)` }}
      >
        <Image src="/Images/clouds/c4.png" alt="Cloud 4" width={1920} height={400} className="absolute top-[65%] left-0 w-full h-auto opacity-40" />
      </div>
    </div>
  )
}

export default CloudLayers
