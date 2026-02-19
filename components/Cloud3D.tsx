'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CloudProps {
  position: [number, number, number]
  scale?: number
  opacity?: number
  speed?: number
}

const Cloud3D = ({ position, scale = 1, opacity = 0.9, speed = 0.1 }: CloudProps) => {
  const meshRef = useRef<THREE.Group>(null)
  
  // Create a more realistic cloud shape using multiple merged spheres
  const cloudGeometry = useMemo(() => {
    const geometries: THREE.BufferGeometry[] = []
    
    // Main body of the cloud
    geometries.push(new THREE.SphereGeometry(1.5, 16, 16))
    geometries.push(new THREE.SphereGeometry(1.2, 16, 16).translate(1.5, 0, 0))
    geometries.push(new THREE.SphereGeometry(1.0, 16, 16).translate(-1.2, 0, 0))
    geometries.push(new THREE.SphereGeometry(0.9, 16, 16).translate(0, 0.5, 0))
    geometries.push(new THREE.SphereGeometry(0.8, 16, 16).translate(2.2, -0.2, 0))
    geometries.push(new THREE.SphereGeometry(0.7, 16, 16).translate(-2, -0.1, 0))
    
    // Merge all geometries into one
    const mergedGeometry = new THREE.BufferGeometry()
    const positions: number[] = []
    const normals: number[] = []
    const uvs: number[] = []
    
    geometries.forEach(geo => {
      const pos = geo.attributes.position.array
      const norm = geo.attributes.normal.array
      const uv = geo.attributes.uv.array
      
      for (let i = 0; i < pos.length; i++) positions.push(pos[i])
      for (let i = 0; i < norm.length; i++) normals.push(norm[i])
      for (let i = 0; i < uv.length; i++) uvs.push(uv[i])
    })
    
    mergedGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    mergedGeometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
    mergedGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
    
    return mergedGeometry
  }, [])

  // Animate the cloud with subtle movement
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(time * speed) * 0.2
      meshRef.current.position.x = position[0] + Math.sin(time * speed * 0.5) * 0.3
      
      // Very subtle rotation
      meshRef.current.rotation.y = Math.sin(time * speed * 0.3) * 0.05
    }
  })

  return (
    <group ref={meshRef} position={position} scale={scale}>
      <mesh geometry={cloudGeometry}>
        <meshStandardMaterial
          color="#ffffff"
          emissive="#e8f4ff"
          emissiveIntensity={0.2}
          opacity={opacity}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

export default Cloud3D