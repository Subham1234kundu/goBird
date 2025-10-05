'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import { Mesh, Vector3 } from 'three'
import { useTexture } from '@react-three/drei'

interface CloudProps {
  position: [number, number, number]
  scale: number
  opacity: number
  speed: number
  texture: string
}

const Cloud = ({ position, scale, opacity, speed, texture }: CloudProps) => {
  const meshRef = useRef<Mesh>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const cloudTexture = useTexture(texture)

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.1
      
      // Mouse scroll parallax effect
      meshRef.current.position.z = position[2] + scrollY * 0.001 * scale
      
      // Gentle rotation
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.02
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={[scale, scale * 0.6, 1]}>
      <planeGeometry args={[4, 2]} />
      <meshBasicMaterial 
        map={cloudTexture} 
        transparent 
        opacity={opacity}
        alphaTest={0.1}
      />
    </mesh>
  )
}

const CloudLayers3D = () => {
  const [viewport, setViewport] = useState({ fov: 75, cameraZ: 5 })
  
  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth
      if (width >= 1920) {
        setViewport({ fov: 65, cameraZ: 6 })
      } else if (width >= 1440) {
        setViewport({ fov: 72, cameraZ: 5.3 })
      } else if (width >= 1024) {
        setViewport({ fov: 75, cameraZ: 5 })
      } else {
        setViewport({ fov: 78, cameraZ: 4.8 })
      }
    }
    
    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  const [clouds, setClouds] = useState([
    { position: [-0.7, -1, -2.5], scale: 5, opacity: 0.4, speed: 0.3, texture: '/Images/clouds/c1.png' },
    { position: [-2.5, -0.6, -2], scale: 5, opacity: 1, speed: 0.4, texture: '/Images/clouds/c2.png' },
    { position: [0, -2.5, -0.5], scale: 4, opacity: 0.8, speed: 0.2, texture: '/Images/clouds/c3.png' },
    { position: [5.4, -0.2, 1.8], scale: 2, opacity: 0.4, speed: 0.35, texture: '/Images/clouds/c4.png' },
    { position: [-7, -0.5, -1.2], scale: 6, opacity: 0.3, speed: 1, texture: '/Images/clouds/c1.png' },
  ] as const)

  useEffect(() => {
    const updateClouds = () => {
      const width = window.innerWidth
      if (width < 640) {
        setClouds([
          { position: [-1.5, -2.3, -2], scale: 1, opacity: 0.4, speed: 0.3, texture: '/Images/clouds/c4.png' },
          { position: [1.5, 0, -2], scale: 3, opacity: 0.5, speed: 0.35, texture: '/Images/clouds/c1.png' },
          { position: [0, -3, -1], scale: 6, opacity: 1, speed: 0.4, texture: '/Images/clouds/c2.png' }
        ])
      } else {
        setClouds([
          { position: [-0.7, 0, -2.5], scale: 5, opacity: 0.4, speed: 0.3, texture: '/Images/clouds/c1.png' },
          { position: [-7.5, -4, -3], scale: 5, opacity: 0.9, speed: 0.4, texture: '/Images/clouds/c1.png' },
          { position: [0, -3.5, -0.5], scale: 4, opacity: 0.8, speed: 0.2, texture: '/Images/clouds/c3.png' },
          { position: [-8.8, 1.3, 1.8], scale: 5, opacity: 0.6, speed: 0.3, texture: '/Images/clouds/c4.png' },
     
        ])
      }
    }
    
    updateClouds()
    window.addEventListener('resize', updateClouds)
    return () => window.removeEventListener('resize', updateClouds)
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, viewport.cameraZ], fov: viewport.fov }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.8} />
        {clouds.map((cloud, index) => (
          <Cloud key={index} {...cloud} />
        ))}
      </Canvas>
    </div>
  )
}

export default CloudLayers3D