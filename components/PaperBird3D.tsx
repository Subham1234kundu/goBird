'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, Cloud } from '@react-three/drei'
import { useRef, useEffect, useState, useMemo } from 'react'
import { Group } from 'three'
import { SkeletonUtils } from 'three-stdlib'

// Hook to get responsive screen size
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

const PaperBirdModel = () => {
  const groupRef = useRef<Group>(null)
  const [scrollY, setScrollY] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [textFadeProgress, setTextFadeProgress] = useState(0)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)
  const { scene, animations } = useGLTF('/Animations/paperBird.glb')
  const { actions, mixer } = useAnimations(animations, groupRef)
  const { width } = useWindowSize()

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

      // Clear previous timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      // Set timeout to detect when scrolling stops
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    const handleLocomotiveScroll = (e: Event & { detail: number }) => {
      setScrollY(e.detail)
      setIsScrolling(true)

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    const handleTextFade = (e: CustomEvent<{ progress: number }>) => {
      setTextFadeProgress(e.detail.progress)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('locomotiveScroll', handleLocomotiveScroll as EventListener)
    window.addEventListener('heroTextFade', handleTextFade as EventListener)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('locomotiveScroll', handleLocomotiveScroll as EventListener)
      window.removeEventListener('heroTextFade', handleTextFade as EventListener)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [])

  useFrame(({ clock }, delta) => {
    if (groupRef.current && mixer) {
      const time = clock.getElapsedTime()

      // Only start bird flight after text is completely faded (progress > 0.95)
      const canFly = textFadeProgress > 0.95

      // Calculate smooth scroll progress - all birds fly together with no delay
      // Increased divisor from 1000 to 3000 for slower, smoother flight
      const rawProgress = canFly ? (scrollY / 3000) : 0
      const scrollProgress = Math.max(0, Math.min(rawProgress, 1))

      // Responsive positions based on screen width - Bird 1 (Left of screen middle)
      let startX = -0.2, startY = -1.8, startZ = 0.5
      let endX = 8.5, endY = 6, endZ = -10
      let baseScale = 0.82, scaleReduction = 0.65

      if (width < 640) { // Mobile
        startX = -0.3
        startY = 0.2
        startZ = 0.5
        endX = 3.5
        endY = 4.5
        endZ = -6
        baseScale = 0.55
        scaleReduction = 0.42
      } else if (width < 1024) { // Tablet
        startX = -0.4
        startY = 0.1
        startZ = 0.5
        endX = 5
        endY = 5.5
        endZ = -7
        baseScale = 0.65
        scaleReduction = 0.50
      } else if (width < 1440) { // Laptop
        startX = 0
        startY = -0.2
        startZ = 0.5
        endX = 7
        endY = 6
        endZ = -9
        baseScale = 0.70
        scaleReduction = 0.95
      } else if (width < 1920) { // Desktop (1440-1920)
        startX = -0.2
        startY = -0.8
        startZ = 0.5
        endX = 8.5
        endY = 6
        endZ = -10
        baseScale = 0.82
        scaleReduction = 0.65
      }

      // Interpolate position from start to end
      groupRef.current.position.x = startX + ((endX - startX) * scrollProgress)
      groupRef.current.position.y = startY + ((endY - startY) * scrollProgress)
      groupRef.current.position.z = startZ + ((endZ - startZ) * scrollProgress)

      // Subtle floating animation when not scrolling
      if (!isScrolling) {
        groupRef.current.position.y += Math.sin(time * 0.5) * 0.08
      }

      // Smaller size - scale down more as bird flies away
      const scale = Math.max(baseScale - (scrollProgress * scaleReduction), 0.18)
      groupRef.current.scale.set(scale, scale, scale)

      // Set opposite side angle view (-90 degrees rotation on Y axis)
      groupRef.current.rotation.y = -Math.PI / 2

      // Control animation: always keep playing (same as left bird)
      if (isScrolling) {
        mixer.timeScale = 2.5 // Increased animation speed when scrolling
      } else {
        mixer.timeScale = 1.5 // Normal animation speed when not scrolling
      }

      // Update the animation mixer
      mixer.update(delta)
    }
  })

  return <primitive ref={groupRef} object={scene} />
}

// Left Bird Model
const PaperBirdLeftModel = () => {
  const groupRef = useRef<Group>(null)
  const [scrollY, setScrollY] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [textFadeProgress, setTextFadeProgress] = useState(0)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)
  const { scene, animations } = useGLTF('/Animations/paperBird.glb')
  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { width } = useWindowSize()

  // Create animation mixer for the cloned scene
  const { actions, mixer } = useAnimations(animations, groupRef)

  useEffect(() => {
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

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    const handleLocomotiveScroll = (e: Event & { detail: number }) => {
      setScrollY(e.detail)
      setIsScrolling(true)

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    const handleTextFade = (e: CustomEvent<{ progress: number }>) => {
      setTextFadeProgress(e.detail.progress)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('locomotiveScroll', handleLocomotiveScroll as EventListener)
    window.addEventListener('heroTextFade', handleTextFade as EventListener)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('locomotiveScroll', handleLocomotiveScroll as EventListener)
      window.removeEventListener('heroTextFade', handleTextFade as EventListener)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [])

  useFrame(({ clock }, delta) => {
    if (groupRef.current && mixer) {
      const time = clock.getElapsedTime()

      // Only start bird flight after text is completely faded
      const canFly = textFadeProgress > 0.95

      // Calculate smooth scroll progress - all birds fly together with no delay
      // Increased divisor from 1000 to 3000 for slower, smoother flight
      const rawProgress = canFly ? (scrollY / 3000) : 0
      const scrollProgress = Math.max(0, Math.min(rawProgress, 1))

      // Responsive positions based on screen width - Bird 2 (Left-Middle)
      let startX = -2.5, startY = -2.8, startZ = 1.2
      let endX = 8.5, endY = 6, endZ = -10
      let baseScale = 0.88, scaleReduction = 0.72

      if (width < 640) { // Mobile
        startX = -1.8
        startY = -0.9
        startZ = 0.8
        endX = 3.5
        endY = 4.5
        endZ = -6
        baseScale = 0.60
        scaleReduction = 0.47
      } else if (width < 1024) { // Tablet
        startX = -2.0
        startY = -0.6
        startZ = 1.0
        endX = 5
        endY = 5.5
        endZ = -7
        baseScale = 0.70
        scaleReduction = 0.55
      } else if (width < 1440) { // Laptop
        startX = -2.8
        startY = -1.3
        startZ = 1.2
        endX = 7
        endY = 7.5
        endZ = -9
        baseScale = 0.88
        scaleReduction = 0.72
      } else if (width < 1920) { // Desktop (1440-1920)
        startX = -2.5
        startY = -1.8
        startZ = 1.2
        endX = 8.5
        endY = 6
        endZ = -10
        baseScale = 0.88
        scaleReduction = 0.72
      }

      groupRef.current.position.x = startX + ((endX - startX) * scrollProgress)
      groupRef.current.position.y = startY + ((endY - startY) * scrollProgress)
      groupRef.current.position.z = startZ + ((endZ - startZ) * scrollProgress)

      // Subtle floating animation when not scrolling (same as middle bird)
      if (!isScrolling) {
        groupRef.current.position.y += Math.sin(time * 0.5) * 0.08
      }

      // Scale down as bird flies away (same as middle bird)
      const scale = Math.max(baseScale - (scrollProgress * scaleReduction), 0.2)
      groupRef.current.scale.set(scale, scale, scale)

      // Rotate bird to face SAME direction as middle bird
      groupRef.current.rotation.y = -Math.PI / 2

      // Control animation: always keep playing
      if (isScrolling) {
        mixer.timeScale = 2.5 // Increased animation speed when scrolling
      } else {
        mixer.timeScale = 1.5 // Normal animation speed when not scrolling
      }

      // Manually update mixer for cloned scene
      mixer.update(delta)
    }
  })

  return <primitive ref={groupRef} object={clonedScene} />
}

// Bottom Bird Model
const PaperBirdBottomModel = () => {
  const groupRef = useRef<Group>(null)
  const [scrollY, setScrollY] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [textFadeProgress, setTextFadeProgress] = useState(0)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)
  const { scene, animations } = useGLTF('/Animations/paperBird.glb')
  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { width } = useWindowSize()
  const { actions, mixer } = useAnimations(animations, groupRef)

  useEffect(() => {
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

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    const handleLocomotiveScroll = (e: Event & { detail: number }) => {
      setScrollY(e.detail)
      setIsScrolling(true)

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    const handleTextFade = (e: CustomEvent<{ progress: number }>) => {
      setTextFadeProgress(e.detail.progress)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('locomotiveScroll', handleLocomotiveScroll as EventListener)
    window.addEventListener('heroTextFade', handleTextFade as EventListener)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('locomotiveScroll', handleLocomotiveScroll as EventListener)
      window.removeEventListener('heroTextFade', handleTextFade as EventListener)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [])

  useFrame(({ clock }, delta) => {
    if (groupRef.current && mixer) {
      const time = clock.getElapsedTime()

      // Only start bird flight after text is completely faded
      const canFly = textFadeProgress > 0.95

      // Calculate smooth scroll progress - all birds fly together with no delay
      // Increased divisor from 1000 to 3000 for slower, smoother flight
      const rawProgress = canFly ? (scrollY / 3000) : 0
      const scrollProgress = Math.max(0, Math.min(rawProgress, 1))

      // Responsive positions based on screen width - Bird 3 (Bottom-Center, largest)
      let startX = 0, startY = -5.4, startZ = 2.2
      let endX = 8.5, endY = 6, endZ = -10
      let baseScale = 1.0, scaleReduction = 0.80

      if (width < 640) { // Mobile
        startX = -0.4
        startY = -2.8
        startZ = 1.4
        endX = 3.5
        endY = 4.5
        endZ = -6
        baseScale = 0.68
        scaleReduction = 0.53
      } else if (width < 1024) { // Tablet
        startX = -0.2
        startY = -3.2
        startZ = 1.8
        endX = 5
        endY = 5.5
        endZ = -7
        baseScale = 0.80
        scaleReduction = 0.63
      } else if (width < 1440) { // Laptop
        startX = 0
        startY = -4.3
        startZ = 2.2
        endX = 7
        endY = 6
        endZ = -9
        baseScale = 1.0
        scaleReduction = 0.80
      } else if (width < 1920) { // Desktop (1440-1920)
        startX = 0
        startY = -4.3
        startZ = 2.2
        endX = 8.5
        endY = 6
        endZ = -10
        baseScale = 1.0
        scaleReduction = 0.80
      }

      groupRef.current.position.x = startX + ((endX - startX) * scrollProgress)
      groupRef.current.position.y = startY + ((endY - startY) * scrollProgress)
      groupRef.current.position.z = startZ + ((endZ - startZ) * scrollProgress)

      // Subtle floating animation when not scrolling
      if (!isScrolling) {
        groupRef.current.position.y += Math.sin(time * 0.5) * 0.08
      }

      // Bigger size - scale down less as bird flies away
      const scale = Math.max(baseScale - (scrollProgress * scaleReduction), 0.5)
      groupRef.current.scale.set(scale, scale, scale)

      // Rotate bird to face same direction
      groupRef.current.rotation.y = -Math.PI / 2

      // Control animation: slower speed
      if (isScrolling) {
        mixer.timeScale = 1.8
      } else {
        mixer.timeScale = 1.2
      }

      mixer.update(delta)
    }
  })

  return <primitive ref={groupRef} object={clonedScene} />
}

// Right Bird Model
const PaperBirdRightModel = () => {
  const groupRef = useRef<Group>(null)
  const [scrollY, setScrollY] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [textFadeProgress, setTextFadeProgress] = useState(0)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)
  const { scene, animations } = useGLTF('/Animations/paperBird.glb')
  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { width } = useWindowSize()
  const { actions, mixer } = useAnimations(animations, groupRef)

  useEffect(() => {
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

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    const handleLocomotiveScroll = (e: Event & { detail: number }) => {
      setScrollY(e.detail)
      setIsScrolling(true)

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    const handleTextFade = (e: CustomEvent<{ progress: number }>) => {
      setTextFadeProgress(e.detail.progress)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('locomotiveScroll', handleLocomotiveScroll as EventListener)
    window.addEventListener('heroTextFade', handleTextFade as EventListener)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('locomotiveScroll', handleLocomotiveScroll as EventListener)
      window.removeEventListener('heroTextFade', handleTextFade as EventListener)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [])

  useFrame(({ clock }, delta) => {
    if (groupRef.current && mixer) {
      const time = clock.getElapsedTime()

      // Only start bird flight after text is completely faded
      const canFly = textFadeProgress > 0.95

      // Calculate smooth scroll progress - all birds fly together with no delay
      // Increased divisor from 1000 to 3000 for slower, smoother flight
      const rawProgress = canFly ? (scrollY / 3000) : 0
      const scrollProgress = Math.max(0, Math.min(rawProgress, 1))

      // Responsive positions based on screen width - Bird 4 (Right-Bottom)
      let startX = 2.2, startY = -3.4, startZ = 1.3
      let endX = 8.5, endY = 6, endZ = -10
      let baseScale = 0.88, scaleReduction = 0.72

      if (width < 640) { // Mobile
        startX = 1.7
        startY = -1.2
        startZ = 0.9
        endX = 3.5
        endY = 4.5
        endZ = -6
        baseScale = 0.60
        scaleReduction = 0.7
      } else if (width < 1024) { // Tablet
        startX = 1.6
        startY = -1.4
        startZ = 1.0
        endX = 5
        endY = 5.5
        endZ = -7
        baseScale = 0.70
        scaleReduction = 0.55
      } else if (width < 1440) { // Laptop
        startX = 2.2
        startY = -2.3
        startZ = 1.3
        endX = 7
        endY = 6
        endZ = -9
        baseScale = 0.88
        scaleReduction = 0.72
      } else if (width < 1920) { // Desktop (1440-1920)
        startX = 2.2
        startY = -2.3
        startZ = 1.3
        endX = 8.5
        endY = 6
        endZ = -10
        baseScale = 0.88
        scaleReduction = 0.72
      }

      groupRef.current.position.x = startX + ((endX - startX) * scrollProgress)
      groupRef.current.position.y = startY + ((endY - startY) * scrollProgress)
      groupRef.current.position.z = startZ + ((endZ - startZ) * scrollProgress)

      // Subtle floating animation when not scrolling
      if (!isScrolling) {
        groupRef.current.position.y += Math.sin(time * 0.5) * 0.08
      }

      // Scale down as bird flies away
      const scale = Math.max(baseScale - (scrollProgress * scaleReduction), 0.2)
      groupRef.current.scale.set(scale, scale, scale)

      // Rotate bird to face same direction
      groupRef.current.rotation.y = -Math.PI / 2

      // Control animation: always keep playing
      if (isScrolling) {
        mixer.timeScale = 2.5
      } else {
        mixer.timeScale = 1.5
      }

      mixer.update(delta)
    }
  })

  return <primitive ref={groupRef} object={clonedScene} />
}

// Bottom Left Bird Model
const PaperBirdBottomLeftModel = () => {
  const groupRef = useRef<Group>(null)
  const [scrollY, setScrollY] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)
  const { scene, animations } = useGLTF('/Animations/paperBird.glb')
  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { width } = useWindowSize()
  const { actions, mixer } = useAnimations(animations, groupRef)

  useEffect(() => {
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

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    const handleLocomotiveScroll = (e: Event & { detail: number }) => {
      setScrollY(e.detail)
      setIsScrolling(true)

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('locomotiveScroll', handleLocomotiveScroll as EventListener)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('locomotiveScroll', handleLocomotiveScroll as EventListener)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [])

  useFrame(({ clock }, delta) => {
    if (groupRef.current && mixer) {
      const time = clock.getElapsedTime()

      // Calculate smooth scroll progress with delay (fifth bird - starts at 0.20)
      const rawProgress = (scrollY / 1000) - 0.20
      const scrollProgress = Math.max(0, Math.min(rawProgress, 1))

      // Responsive positions based on screen width - Bird 5 (Left-Bottom, far left)
      let startX = -4.2, startY = -2.3, startZ = 1.3
      let endX = 8.5, endY = 6, endZ = -10
      let baseScale = 0.88, scaleReduction = 0.72

      if (width < 640) { // Mobile
        startX = -2.6
        startY = -1.0
        startZ = 1.0
        endX = 4
        endY = 5
        endZ = -7
        baseScale = 0.68
        scaleReduction = 0.54
      } else if (width < 1024) { // Tablet
        startX = -3.4
        startY = -1.2
        startZ = 1.1
        endX = 5.5
        endY = 6.5
        endZ = -8
        baseScale = 0.78
        scaleReduction = 0.63
      } else if (width < 1440) { // Laptop
        startX = -4.2
        startY = -1.5
        startZ = 1.3
        endX = 7
        endY = 6
        endZ = -9
        baseScale = 0.88
        scaleReduction = 0.72
      }

      groupRef.current.position.x = startX + ((endX - startX) * scrollProgress)
      groupRef.current.position.y = startY + ((endY - startY) * scrollProgress)
      groupRef.current.position.z = startZ + ((endZ - startZ) * scrollProgress)

      // Subtle floating animation when not scrolling
      if (!isScrolling) {
        groupRef.current.position.y += Math.sin(time * 0.5) * 0.08
      }

      // Scale down as bird flies away
      const scale = Math.max(baseScale - (scrollProgress * scaleReduction), 0.2)
      groupRef.current.scale.set(scale, scale, scale)

      // Rotate bird to face same direction
      groupRef.current.rotation.y = -Math.PI / 2

      // Control animation
      if (isScrolling) {
        mixer.timeScale = 2.5
      } else {
        mixer.timeScale = 1.5
      }

      mixer.update(delta)
    }
  })

  return <primitive ref={groupRef} object={clonedScene} />
}

// 3D Cloud Component
const Cloud3D = ({ position, scale, speed = 0.5, opacity = 0.4 }: {
  position: [number, number, number],
  scale: number,
  speed?: number,
  opacity?: number
}) => {
  const cloudRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (cloudRef.current) {
      const time = clock.getElapsedTime()

      // Gentle floating animation
      cloudRef.current.position.y = position[1] + Math.sin(time * 0.3 * speed) * 0.3

      // Slow drift
      cloudRef.current.position.x = position[0] + Math.sin(time * 0.1 * speed) * 0.5
    }
  })

  return (
    <group ref={cloudRef} position={position} scale={scale}>
      <Cloud
        opacity={opacity}
        speed={0.2}
        segments={30}
        color="#ffffff"
      />
    </group>
  )
}

const PaperBird3D = () => {
  const [viewport, setViewport] = useState({ cameraZ: 6, cameraY: 0, fov: 60 })
  const { width } = useWindowSize()

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth
      if (width < 640) {
        setViewport({ cameraZ: 7, cameraY: -0.3, fov: 70 })
      } else if (width < 1024) {
        setViewport({ cameraZ: 6.5, cameraY: -0.2, fov: 65 })
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
    <div className="absolute inset-0 w-full h-full pointer-events-none z-[8]">
      <Canvas camera={{ position: [0, viewport.cameraY, viewport.cameraZ], fov: viewport.fov }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, 5, 5]} intensity={0.5} />

        {/* 3D Clouds - Background Layer */}
        <Cloud3D position={[0, -4, -8]} scale={0.9} speed={0.2} opacity={0.4} />
        <Cloud3D position={[-9, 2, -8]} scale={1.1} speed={0.45} opacity={0.2} />
        <Cloud3D position={[9, 0, -16]} scale={0.9} speed={0.35} opacity={0.05} />
        <Cloud3D position={[-1, 10, 50]} scale={1.8} speed={0.15} opacity={0.5} />

       

        {/* Premium flock formation - 4 birds on all screens */}
        <PaperBirdModel />            {/* Bird 1: Top-Center, starts immediately (0.00) */}
        <PaperBirdLeftModel />        {/* Bird 2: Left-Middle, starts at 0.05 */}
        <PaperBirdBottomModel />      {/* Bird 3: Bottom-Center (largest), starts at 0.20 */}
        <PaperBirdRightModel />       {/* Bird 4: Right-Bottom, starts at 0.20 */}
      </Canvas>
    </div>
  )
}

// Export the model component for use in other components
export { PaperBirdModel }
export default PaperBird3D
