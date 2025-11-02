'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface StylizedCloudProps {
  position: [number, number, number]
  scale?: number
  opacity?: number
  speed?: number
  color?: string
}

const StylizedCloud = ({ 
  position, 
  scale = 1, 
  opacity = 0.8, 
  speed = 0.1,
  color = '#ffffff'
}: StylizedCloudProps) => {
  const meshRef = useRef<THREE.Group>(null)
  
  // Create a stylized cloud using multiple soft spheres
  const cloudParts = useMemo(() => {
    // Create cloud puffs with varying sizes and positions
    const cloudData = [
      { pos: [0, 0, 0], scale: 1.5 },
      { pos: [1.2, 0.1, 0.2], scale: 1.2 },
      { pos: [-1.0, 0.05, 0.1], scale: 1.1 },
      { pos: [2.0, -0.2, -0.1], scale: 0.9 },
      { pos: [-1.8, -0.15, 0.15], scale: 0.85 },
      { pos: [0.5, 0.4, 0.1], scale: 0.95 },
      { pos: [-0.5, 0.35, -0.1], scale: 0.9 },
      { pos: [1.5, 0.3, -0.2], scale: 0.75 },
      { pos: [-1.3, 0.25, 0.2], scale: 0.8 },
    ]
    
    return cloudData
  }, [])

  // Animate the cloud with gentle movement
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      
      // Gentle floating and drifting
      meshRef.current.position.y = position[1] + Math.sin(time * speed) * 0.15
      meshRef.current.position.x = position[0] + Math.cos(time * speed * 0.7) * 0.2
      
      // Very subtle rotation for organic movement
      meshRef.current.rotation.y = Math.sin(time * speed * 0.3) * 0.03
      meshRef.current.rotation.z = Math.cos(time * speed * 0.4) * 0.02
      
      // Slight scale breathing effect
      const breathScale = scale + Math.sin(time * speed * 0.5) * 0.05
      meshRef.current.scale.set(breathScale, breathScale, breathScale)
    }
  })

  return (
    <group ref={meshRef} position={position} scale={scale}>
      {cloudParts.map((part, index) => (
        <mesh key={index} position={part.pos as [number, number, number]}>
          <sphereGeometry args={[part.scale, 12, 12]} />
          <meshStandardMaterial
            color={color}
            emissive="#cce7ff"
            emissiveIntensity={0.3}
            opacity={opacity * (0.8 + index * 0.02)}
            transparent
            depthWrite={false}
            roughness={1}
            metalness={0}
          />
        </mesh>
      ))}
    </group>
  )
}

export default StylizedCloud
