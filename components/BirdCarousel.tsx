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
  
  useFrame(() => {
    if (meshRef.current) {
      const angle = (index * Math.PI / 2) + (scrollY * 0.005)
      
      meshRef.current.position.x = Math.cos(angle) * radius
      meshRef.current.position.z = Math.sin(angle) * radius
      meshRef.current.position.y = Math.sin(scrollY * 0.01 + index) * 0.3
      
      meshRef.current.rotation.z = Math.sin(angle) * 0.3
      
      meshRef.current.scale.setScalar(1)
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
        setViewport({ radius: 2.5, birdSize: 1.5, cameraZ: 4.5, cameraY: 1.5, fov: 75 })
      } else if (width < 1024) {
        setViewport({ radius: 3, birdSize: 1.4, cameraZ: 5.5, cameraY: 1.5, fov: 65 })
      } else if (width < 1536) {
        setViewport({ radius: 4, birdSize: 1.5, cameraZ: 6.7, cameraY: 3, fov: 60 })
      } else {
        setViewport({ radius: 5, birdSize: 1.8, cameraZ: 7, cameraY: 2, fov: 60 })
      }
    }
    
    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [-1.2, viewport.cameraY, viewport.cameraZ], fov: viewport.fov }}>
        <ambientLight intensity={2} />
        
        {[0, 1, 2, 3].map((index) => (
          <Bird key={index} index={index} radius={viewport.radius} birdSize={viewport.birdSize} />
        ))}
      </Canvas>
    </div>
  )
}

export default BirdCarousel