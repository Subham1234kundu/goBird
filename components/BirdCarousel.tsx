'use client'

import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react'
import { Mesh, TextureLoader } from 'three'

const Bird = ({ index, radius, birdSize }: { index: number; radius: number; birdSize: number }) => {
  const meshRef = useRef<Mesh>(null)
  const [scrollY, setScrollY] = useState(0)
  const texture = useLoader(TextureLoader, '/Images/homeBird.png')
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime()
      const scrollFactor = scrollY * 0.01
      const angle = (index * Math.PI / 2) + (time * 0.3) + (scrollFactor * 0.5)
      
      // Birds come closer based on scroll and their index
      const scrollProgress = Math.min(scrollY / 800, 1)
      const birdScrollOffset = (index * 0.25) * scrollProgress
      const dynamicRadius = radius - (scrollProgress * 2) - birdScrollOffset
      
      meshRef.current.position.x = Math.cos(angle) * Math.max(dynamicRadius, 1)
      meshRef.current.position.z = Math.sin(angle) * Math.max(dynamicRadius, 1) + (birdScrollOffset * 2)
      meshRef.current.position.y = Math.sin(time * 0.5 + index) * 0.3 + (scrollProgress * index * 0.2)
      
      meshRef.current.rotation.z = Math.sin(angle) * 0.2
      
      // Scale birds slightly as they come closer
      const scale = 1 + (birdScrollOffset * 0.3)
      meshRef.current.scale.setScalar(scale)
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[birdSize, birdSize]} />
      <meshBasicMaterial map={texture} transparent alphaTest={0.1} />
    </mesh>
  )
}

const BirdCarousel = () => {
  const [viewport, setViewport] = useState({ radius: 4, birdSize: 1.5, cameraZ: 6, cameraY: 2, fov: 60 })

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth
      if (width < 640) {
        setViewport({ radius: 3.5, birdSize: 1.0, cameraZ: 4.5, cameraY: 1.5, fov: 75 })
      } else if (width < 1024) {
        setViewport({ radius: 4.2, birdSize: 1.0, cameraZ: 5.5, cameraY: 1.5, fov: 65 })
      } else if (width < 1440) {
        setViewport({ radius: 5.2, birdSize: 1.2, cameraZ: 6.2, cameraY: 2.5, fov: 62 })
      } else if (width < 1920) {
        setViewport({ radius: 6.0, birdSize: 1.1, cameraZ: 6.8, cameraY: 2.2, fov: 58 })
      } else {
        setViewport({ radius: 7.5, birdSize: 1.5, cameraZ: 8, cameraY: 2.5, fov: 55 })
      }
    }
    
    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [-0.5, viewport.cameraY, viewport.cameraZ], fov: viewport.fov }}>
        <ambientLight intensity={2} />
        
        {[0, 1, 2, 3].map((index) => (
          <Bird key={index} index={index} radius={viewport.radius} birdSize={viewport.birdSize} />
        ))}
      </Canvas>
    </div>
  )
}

export default BirdCarousel