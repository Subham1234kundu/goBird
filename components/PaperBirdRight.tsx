'use client'

import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'
import { Group } from 'three'

const PaperBirdRight = () => {
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

  useFrame(({ clock }, delta) => {
    if (groupRef.current && mixer) {
      const time = clock.getElapsedTime()

      // Calculate smooth scroll progress
      const scrollProgress = Math.min(scrollY / 1000, 1)

      // Adjusted positions to work with clouds
      // Start position: right side, positioned between clouds
      const startX = 2.5
      const startY = 1.5  // Raised slightly to be among clouds
      const startZ = 0

      // End position: flying up and away through clouds (opposite direction from left bird)
      const endX = 7
      const endY = 8
      const endZ = -10

      // Interpolate position from start to end
      groupRef.current.position.x = startX + ((endX - startX) * scrollProgress)
      groupRef.current.position.y = startY + ((endY - startY) * scrollProgress)
      groupRef.current.position.z = startZ + ((endZ - startZ) * scrollProgress)

      // Subtle floating animation when not scrolling (offset from left bird)
      if (!isScrolling) {
        groupRef.current.position.y += Math.sin(time * 0.5 + Math.PI) * 0.08
        // Add slight horizontal sway (opposite phase from left bird)
        groupRef.current.position.x += Math.cos(time * 0.3 + Math.PI) * 0.05
      }

      // Scale down as bird flies away
      const scale = Math.max(1.2 - (scrollProgress * 0.9), 0.3)
      groupRef.current.scale.set(scale, scale, scale)

      // Rotate bird to face right-upward direction
      groupRef.current.rotation.y = -Math.PI / 2 - (scrollProgress * 0.3)
      // Add slight banking during scroll (opposite from left bird)
      if (isScrolling) {
        groupRef.current.rotation.z = -Math.sin(time * 2) * 0.1
      }

      // Control animation: play on initial load and when scrolling
      if (isScrolling) {
        mixer.timeScale = 2.5 // Increased animation speed when scrolling
      } else if (!hasScrolled) {
        mixer.timeScale = 1.5 // Normal animation speed on initial load
      } else {
        mixer.timeScale = 0.8 // Slow animation after scrolling stops
      }

      // Update animation
      mixer.update(delta)
    }
  })

  return <primitive ref={groupRef} object={scene} />
}

// Preload the model
useGLTF.preload('/Animations/paperBird.glb')

export default PaperBirdRight
