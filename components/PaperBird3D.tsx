'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, Cloud } from '@react-three/drei'
import { useRef, useEffect, useState, useMemo } from 'react'
import { Group } from 'three'
import * as THREE from 'three'
import { SkeletonUtils } from 'three-stdlib'

// Hook to get responsive screen size
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return mounted ? windowSize : { width: 1920, height: 1080 }
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

  // Clean up invalid texture references on load
  useEffect(() => {
    scene.traverse((child) => {
      if ('isMesh' in child && child.isMesh && 'material' in child) {
        const material = child.material as THREE.Material & { map?: THREE.Texture | null; normalMap?: THREE.Texture | null }
        // Remove invalid texture references that cause blob URL errors
        if (material.map) {
          const image = material.map.image
          if (!image || image instanceof Blob || (image && 'src' in image && typeof image.src === 'string' && image.src.startsWith('blob:'))) {
            material.map = null
          }
        }
        if (material.normalMap) {
          const image = material.normalMap.image
          if (!image || image instanceof Blob || (image && 'src' in image && typeof image.src === 'string' && image.src.startsWith('blob:'))) {
            material.normalMap = null
          }
        }
        material.needsUpdate = true
      }
    })
  }, [scene])

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

      // Bird 1 (Center-Lead) - No delay, leads the formation
      const birdDelay = 0
      const rawProgress = canFly ? Math.max(0, (scrollY - birdDelay) / 3000) : 0
      const scrollProgress = Math.max(0, Math.min(rawProgress, 1))

      // V-Formation: Bird 1 (Center-Lead, front of formation)
      let startX = 0, startY = -1.5, startZ = 2.5
      let endX = 6, endY = 8, endZ = -12
      let baseScale = 1.35, scaleReduction = 0.85

      if (width < 640) { // Mobile
        startX = 0
        startY = 0
        startZ = 1.8
        endX = 3
        endY = 5
        endZ = -8
        baseScale = 0.95
        scaleReduction = 0.65
      } else if (width < 1024) { // Tablet
        startX = 0
        startY = -0.5
        startZ = 2.0
        endX = 4.5
        endY = 6.5
        endZ = -9
        baseScale = 1.1
        scaleReduction = 0.72
      } else if (width < 1440) { // Laptop
        startX = 0
        startY = -1.0
        startZ = 2.2
        endX = 5.5
        endY = 7.5
        endZ = -10
        baseScale = 1.25
        scaleReduction = 0.78
      } else if (width < 1920) { // Desktop (1440-1920)
        startX = 0
        startY = -1.5
        startZ = 2.5
        endX = 6
        endY = 8
        endZ = -12
        baseScale = 1.35
        scaleReduction = 0.85
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

      // Cornering rotation - beak pointing toward top-right
      groupRef.current.rotation.y = Math.PI * 0.65 // 135° - angled toward right
      groupRef.current.rotation.x = -0.34 // Pitched up for upward flight
      groupRef.current.rotation.z = 0.2 // Slight roll for natural banking

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

  // Clean up invalid texture references on load
  useEffect(() => {
    clonedScene.traverse((child) => {
      if ('isMesh' in child && child.isMesh && 'material' in child) {
        const material = child.material as THREE.Material & { map?: THREE.Texture | null; normalMap?: THREE.Texture | null }
        // Remove invalid texture references that cause blob URL errors
        if (material.map) {
          const image = material.map.image
          if (!image || image instanceof Blob || (image && 'src' in image && typeof image.src === 'string' && image.src.startsWith('blob:'))) {
            material.map = null
          }
        }
        if (material.normalMap) {
          const image = material.normalMap.image
          if (!image || image instanceof Blob || (image && 'src' in image && typeof image.src === 'string' && image.src.startsWith('blob:'))) {
            material.normalMap = null
          }
        }
        material.needsUpdate = true
      }
    })
  }, [clonedScene])

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

      // Bird 2 (Left Wing) - Slight delay (150px scroll) for staggered effect
      const birdDelay = 150
      const rawProgress = canFly ? Math.max(0, (scrollY - birdDelay) / 3000) : 0
      const scrollProgress = Math.max(0, Math.min(rawProgress, 1))

      // V-Formation: Bird 2 (Left Wing, behind and to the left)
      let startX = -2.8, startY = -2.5, startZ = 1.8
      let endX = 3, endY = 7, endZ = -13
      let baseScale = 1.18, scaleReduction = 0.75

      if (width < 640) { // Mobile
        startX = -2.0
        startY = -1.0
        startZ = 1.3
        endX = 1
        endY = 4.2
        endZ = -9
        baseScale = 0.82
        scaleReduction = 0.58
      } else if (width < 1024) { // Tablet
        startX = -2.4
        startY = -1.6
        startZ = 1.5
        endX = 2
        endY = 5.5
        endZ = -10
        baseScale = 0.95
        scaleReduction = 0.65
      } else if (width < 1440) { // Laptop
        startX = -2.6
        startY = -2.0
        startZ = 1.7
        endX = 2.5
        endY = 6.5
        endZ = -11
        baseScale = 1.08
        scaleReduction = 0.70
      } else if (width < 1920) { // Desktop (1440-1920)
        startX = -2.8
        startY = -2.5
        startZ = 1.8
        endX = 3
        endY = 7
        endZ = -13
        baseScale = 1.18
        scaleReduction = 0.75
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

      // Cornering rotation - beak pointing toward top-right
      groupRef.current.rotation.y = Math.PI * 0.75 // 135° - angled toward right
      groupRef.current.rotation.x = -0.3 // Pitched up for upward flight
      groupRef.current.rotation.z = 0.1 // Slight roll for natural banking

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

  // Clean up invalid texture references on load
  useEffect(() => {
    clonedScene.traverse((child) => {
      if ('isMesh' in child && child.isMesh && 'material' in child) {
        const material = child.material as THREE.Material & { map?: THREE.Texture | null; normalMap?: THREE.Texture | null }
        // Remove invalid texture references that cause blob URL errors
        if (material.map) {
          const image = material.map.image
          if (!image || image instanceof Blob || (image && 'src' in image && typeof image.src === 'string' && image.src.startsWith('blob:'))) {
            material.map = null
          }
        }
        if (material.normalMap) {
          const image = material.normalMap.image
          if (!image || image instanceof Blob || (image && 'src' in image && typeof image.src === 'string' && image.src.startsWith('blob:'))) {
            material.normalMap = null
          }
        }
        material.needsUpdate = true
      }
    })
  }, [clonedScene])

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

      // Bird 3 (Bottom-Left Wing) - More delay (300px scroll) for sequential formation
      const birdDelay = 300
      const rawProgress = canFly ? Math.max(0, (scrollY - birdDelay) / 3000) : 0
      const scrollProgress = Math.max(0, Math.min(rawProgress, 1))

      // V-Formation: Bird 3 (Left Wing Back, furthest left and back)
      let startX = -4.5, startY = -3.8, startZ = 0.8
      let endX = 0, endY = 5.5, endZ = -15
      let baseScale = 1.05, scaleReduction = 0.68

      if (width < 640) { // Mobile
        startX = -3.2
        startY = -2.0
        startZ = 0.6
        endX = -1
        endY = 3.5
        endZ = -10
        baseScale = 0.72
        scaleReduction = 0.52
      } else if (width < 1024) { // Tablet
        startX = -3.8
        startY = -2.8
        startZ = 0.7
        endX = -0.5
        endY = 4.2
        endZ = -12
        baseScale = 0.85
        scaleReduction = 0.58
      } else if (width < 1440) { // Laptop
        startX = -4.2
        startY = -3.3
        startZ = 0.8
        endX = 0
        endY = 5
        endZ = -13
        baseScale = 0.95
        scaleReduction = 0.62
      } else if (width < 1920) { // Desktop (1440-1920)
        startX = -4.5
        startY = -3.8
        startZ = 0.8
        endX = 0
        endY = 5.5
        endZ = -15
        baseScale = 1.05
        scaleReduction = 0.68
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

      // Cornering rotation - beak pointing toward top-right
      groupRef.current.rotation.y = Math.PI * 0.75 // 135° - angled toward right
      groupRef.current.rotation.x = -0.25 // Pitched up for upward flight
      groupRef.current.rotation.z = 0.1 // Slight roll for natural banking

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

  // Clean up invalid texture references on load
  useEffect(() => {
    clonedScene.traverse((child) => {
      if ('isMesh' in child && child.isMesh && 'material' in child) {
        const material = child.material as THREE.Material & { map?: THREE.Texture | null; normalMap?: THREE.Texture | null }
        // Remove invalid texture references that cause blob URL errors
        if (material.map) {
          const image = material.map.image
          if (!image || image instanceof Blob || (image && 'src' in image && typeof image.src === 'string' && image.src.startsWith('blob:'))) {
            material.map = null
          }
        }
        if (material.normalMap) {
          const image = material.normalMap.image
          if (!image || image instanceof Blob || (image && 'src' in image && typeof image.src === 'string' && image.src.startsWith('blob:'))) {
            material.normalMap = null
          }
        }
        material.needsUpdate = true
      }
    })
  }, [clonedScene])

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

      // Bird 4 (Right Wing) - Balanced delay (450px scroll) for right side formation
      const birdDelay = 450
      const rawProgress = canFly ? Math.max(0, (scrollY - birdDelay) / 3000) : 0
      const scrollProgress = Math.max(0, Math.min(rawProgress, 1))

      // V-Formation: Bird 4 (Right Wing, behind and to the right)
      let startX = 2.8, startY = -2.5, startZ = 1.8
      let endX = 9, endY = 7, endZ = -13
      let baseScale = 1.18, scaleReduction = 0.75

      if (width < 640) { // Mobile
        startX = 2.0
        startY = -1.0
        startZ = 1.3
        endX = 5
        endY = 4.2
        endZ = -9
        baseScale = 0.82
        scaleReduction = 0.58
      } else if (width < 1024) { // Tablet
        startX = 2.4
        startY = -1.6
        startZ = 1.5
        endX = 7
        endY = 5.5
        endZ = -10
        baseScale = 0.95
        scaleReduction = 0.65
      } else if (width < 1440) { // Laptop
        startX = 2.6
        startY = -2.0
        startZ = 1.7
        endX = 8
        endY = 6.5
        endZ = -11
        baseScale = 1.08
        scaleReduction = 0.70
      } else if (width < 1920) { // Desktop (1440-1920)
        startX = 2.8
        startY = -2.5
        startZ = 1.8
        endX = 9
        endY = 7
        endZ = -13
        baseScale = 1.18
        scaleReduction = 0.75
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

      // Cornering rotation - beak pointing toward top-right
      groupRef.current.rotation.y = Math.PI * 0.75 // 135° - angled toward right
      groupRef.current.rotation.x = -0.3 // Pitched up for upward flight
      groupRef.current.rotation.z = -0.2 // More roll for outer wing position

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



        {/* Natural V-Formation - 4 birds flying together */}
        <PaperBirdModel />            {/* Bird 1: Lead Bird (front center) */}
        <PaperBirdLeftModel />        {/* Bird 2: Left Wing */}
        <PaperBirdBottomModel />      {/* Bird 3: Left Wing Back */}
        <PaperBirdRightModel />       {/* Bird 4: Right Wing */}
      </Canvas>
    </div>
  )
}

// Preload the GLTF model to prevent texture loading errors
useGLTF.preload('/Animations/paperBird.glb')

// Export the model component for use in other components
export { PaperBirdModel }
export default PaperBird3D
