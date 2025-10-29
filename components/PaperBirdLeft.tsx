'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'
import { Group } from 'three'

const PaperBirdLeftModel = () => {
  const groupRef = useRef<Group>(null)
  const [scrollY, setScrollY] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)
  const { scene, animations } = useGLTF('/Animations/paperBird.glb')
  const { actions, mixer } = useAnimations(animations, groupRef)

  useEffect(() => {
    // Play all animations from the GLB file
    if (actions && Object.keys(actions).length > 0) {
      Object.values(actions).forEach((action) => {
        if (action) {
          action.play()
        }
      })
    }
  }, [actions])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setIsScrolling(true)
      setHasScrolled(true)

      // Clear previous timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      // Set timeout to detect when scrolling stops
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [])

  useFrame(({ clock }, _delta) => {
    if (groupRef.current && mixer) {
      const time = clock.getElapsedTime()

      // Calculate smooth scroll progress
      const scrollProgress = Math.min(scrollY / 1000, 1)

      // Start position: left side (more visible)
      const startX = -2.5
      const startY = 0
      const startZ = 0

      // End position: top LEFT corner (opposite of right bird)
      const endX = -6
      const endY = 6
      const endZ = -8

      // Interpolate position from start to end
      groupRef.current.position.x = startX + ((endX - startX) * scrollProgress)
      groupRef.current.position.y = startY + ((endY - startY) * scrollProgress)
      groupRef.current.position.z = startZ + ((endZ - startZ) * scrollProgress)

      // Subtle floating animation when not scrolling
      if (!isScrolling) {
        groupRef.current.position.y += Math.sin(time * 0.5) * 0.08
      }

      // Scale down as bird flies away
      const scale = Math.max(1.0 - (scrollProgress * 0.8), 0.2)
      groupRef.current.scale.set(scale, scale, scale)

      // Rotate bird to face left direction
      groupRef.current.rotation.y = Math.PI / 2

      // Control animation: play on initial load and when scrolling
      if (isScrolling) {
        mixer.timeScale = 2.5 // Increased animation speed when scrolling
      } else if (!hasScrolled) {
        mixer.timeScale = 1.5 // Normal animation speed on initial load
      } else {
        mixer.timeScale = 0 // Pause animation after scrolling stops
      }
    }
  })

  return <primitive ref={groupRef} object={scene} />
}

const PaperBirdLeft = () => {
  const [viewport, setViewport] = useState({ cameraZ: 6, cameraY: 0, fov: 60 })

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth
      if (width < 640) {
        setViewport({ cameraZ: 8, cameraY: 0, fov: 75 })
      } else if (width < 1024) {
        setViewport({ cameraZ: 7, cameraY: 0, fov: 65 })
      } else if (width < 1440) {
        setViewport({ cameraZ: 6, cameraY: 0, fov: 62 })
      } else if (width < 1920) {
        setViewport({ cameraZ: 5.5, cameraY: 0, fov: 58 })
      } else {
        setViewport({ cameraZ: 5, cameraY: 0, fov: 50 })
      }
    }

    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, viewport.cameraY, viewport.cameraZ], fov: viewport.fov }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, 5, 5]} intensity={0.5} />

        <PaperBirdLeftModel />
      </Canvas>
    </div>
  )
}

export default PaperBirdLeft
