'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, Cloud } from '@react-three/drei'
import { useRef, useEffect, useState, useMemo } from 'react'
import { Group } from 'three'
import { SkeletonUtils } from 'three-stdlib'


// Hook to get responsive screen size
const useWindowSize = () => {
  // Initialize with default values to prevent hydration mismatch
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 })

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
  const [textFadeProgress, setTextFadeProgress] = useState(0)
  const gltf = useGLTF('/Animations/paperBird.glb')

  // Clone the scene for this instance
  const cleanedScene = useMemo(() => {
    const cloned = SkeletonUtils.clone(gltf.scene)
    return cloned
  }, [gltf.scene])

  const { actions, mixer } = useAnimations(gltf.animations, groupRef)
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
    const handleTextFade = (e: CustomEvent<{ progress: number }>) => {
      setTextFadeProgress(e.detail.progress)
    }

    window.addEventListener('heroTextFade', handleTextFade as EventListener)

    return () => {
      window.removeEventListener('heroTextFade', handleTextFade as EventListener)
    }
  }, [])

  useFrame(({ clock }, delta) => {
    if (groupRef.current && mixer) {
      const time = clock.getElapsedTime()

      // Bird appears when user scrolls a bit (progress > 0.05)
      // Then starts flying when scrolling more (progress > 0.2)
      const canAppear = textFadeProgress > 0.05
      const canFly = textFadeProgress > 0.2

      // Lead bird - appears first, starts flying when text shrinks
      const appearProgress = Math.min(textFadeProgress / 0.15, 1) // 0 to 1 during first 0.15 progress
      const flyProgress = canFly ? Math.min((textFadeProgress - 0.2) / 0.8, 1) : 0 // 0 to 1 for flight

      // V-Formation: Bird 1 (Center-Lead) - Flies to top-right corner (stays closer)
      let startX = 0, startY = -1.5, startZ = 2.5
      let endX = 5, endY = 3.5, endZ = -5 // Top-right corner position (closer to viewer)
      let baseScale = 1.35, scaleReduction = 0.5 // Less shrinking

      if (width < 640) { // Mobile
        startX = 0
        startY = 0
        startZ = 1.8
        endX = 3.5
        endY = 2.5
        endZ = -3
        baseScale = 0.95
        scaleReduction = 0.4
      } else if (width < 1024) { // Tablet
        startX = 0
        startY = -0.5
        startZ = 2.0
        endX = 4
        endY = 3
        endZ = -4
        baseScale = 1.1
        scaleReduction = 0.45
      } else if (width < 1440) { // Laptop
        startX = 0
        startY = -1.0
        startZ = 2.2
        endX = 4.5
        endY = 3.2
        endZ = -4.5
        baseScale = 1.25
        scaleReduction = 0.48
      } else if (width < 1920) { // Desktop (1440-1920)
        startX = 0
        startY = -1.5
        startZ = 2.5
        endX = 5
        endY = 3.5
        endZ = -5
        baseScale = 1.35
        scaleReduction = 0.5
      }

      // Smooth appearance (fade in and scale up)
      const appearScale = canAppear ? appearProgress : 0

      // Position interpolation - fly to top-right
      groupRef.current.position.x = startX + ((endX - startX) * flyProgress)
      groupRef.current.position.y = startY + ((endY - startY) * flyProgress)
      groupRef.current.position.z = startZ + ((endZ - startZ) * flyProgress)

      // Subtle floating animation when not flying
      if (!canFly && canAppear) {
        groupRef.current.position.y += Math.sin(time * 0.8) * 0.12
      }

      // Scale: Appear first, then shrink as it flies away
      const flyScale = Math.max(baseScale - (flyProgress * scaleReduction), 0.25)
      const finalScale = appearScale * flyScale
      groupRef.current.scale.set(finalScale, finalScale, finalScale)

      // Rotation - smooth transition to flying toward top-right
      const targetRotationY = Math.PI * 0.55 + (flyProgress * 0.15)
      const targetRotationX = -0.2 - (flyProgress * 0.25)
      const targetRotationZ = 0.1 + (flyProgress * 0.15)

      groupRef.current.rotation.y = targetRotationY
      groupRef.current.rotation.x = targetRotationX
      groupRef.current.rotation.z = targetRotationZ

      // Animation speed based on flight state
      if (canFly) {
        mixer.timeScale = 2.8 // Fast wing flapping when flying
      } else {
        mixer.timeScale = 1.3 // Gentle flapping when appearing
      }

      mixer.update(delta)
    }
  })

  return <primitive ref={groupRef} object={cleanedScene} />
}

// Left Bird Model
const PaperBirdLeftModel = () => {
  const groupRef = useRef<Group>(null)
  const [textFadeProgress, setTextFadeProgress] = useState(0)
  const gltf = useGLTF('/Animations/paperBird.glb')
  const { width } = useWindowSize()

  // Clone the scene for this instance
  const clonedScene = useMemo(() => {
    const cloned = SkeletonUtils.clone(gltf.scene)
    return cloned
  }, [gltf.scene])

  const { actions, mixer } = useAnimations(gltf.animations, groupRef)

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
    const handleTextFade = (e: CustomEvent<{ progress: number }>) => {
      setTextFadeProgress(e.detail.progress)
    }

    window.addEventListener('heroTextFade', handleTextFade as EventListener)

    return () => {
      window.removeEventListener('heroTextFade', handleTextFade as EventListener)
    }
  }, [])

  useFrame(({ clock }, delta) => {
    if (groupRef.current && mixer) {
      const time = clock.getElapsedTime()

      // Bird 2 appears slightly after lead bird (progress > 0.1)
      // Starts flying with the lead bird (progress > 0.2)
      const canAppear = textFadeProgress > 0.1
      const canFly = textFadeProgress > 0.2

      const appearProgress = canAppear ? Math.min((textFadeProgress - 0.1) / 0.1, 1) : 0
      const flyProgress = canFly ? Math.min((textFadeProgress - 0.2) / 0.8, 1) : 0

      // V-Formation: Bird 2 (Left Wing) - Follows to top-right, slightly left of lead (stays closer)
      let startX = -2.8, startY = -2.5, startZ = 1.8
      let endX = 3, endY = 2.8, endZ = -6 // Top-right, slightly left and lower than lead (closer)
      let baseScale = 1.18, scaleReduction = 0.45

      if (width < 640) { // Mobile
        startX = -2.0
        startY = -1.0
        startZ = 1.3
        endX = 2
        endY = 2
        endZ = -4
        baseScale = 0.82
        scaleReduction = 0.35
      } else if (width < 1024) { // Tablet
        startX = -2.4
        startY = -1.6
        startZ = 1.5
        endX = 2.5
        endY = 2.3
        endZ = -5
        baseScale = 0.95
        scaleReduction = 0.38
      } else if (width < 1440) { // Laptop
        startX = -2.6
        startY = -2.0
        startZ = 1.7
        endX = 2.7
        endY = 2.5
        endZ = -5.5
        baseScale = 1.08
        scaleReduction = 0.42
      } else if (width < 1920) { // Desktop (1440-1920)
        startX = -2.8
        startY = -2.5
        startZ = 1.8
        endX = 3
        endY = 2.8
        endZ = -6
        baseScale = 1.18
        scaleReduction = 0.45
      }

      groupRef.current.position.x = startX + ((endX - startX) * flyProgress)
      groupRef.current.position.y = startY + ((endY - startY) * flyProgress)
      groupRef.current.position.z = startZ + ((endZ - startZ) * flyProgress)

      // Subtle floating when appearing but not flying yet
      if (!canFly && canAppear) {
        groupRef.current.position.y += Math.sin(time * 0.8 + 0.5) * 0.12
      }

      // Scale: Appear, then shrink as flying
      const flyScale = Math.max(baseScale - (flyProgress * scaleReduction), 0.22)
      const finalScale = appearProgress * flyScale
      groupRef.current.scale.set(finalScale, finalScale, finalScale)

      // Rotation toward top-right
      const targetRotationY = Math.PI * 0.6 + (flyProgress * 0.15)
      const targetRotationX = -0.18 - (flyProgress * 0.22)
      const targetRotationZ = 0.08 + (flyProgress * 0.12)

      groupRef.current.rotation.y = targetRotationY
      groupRef.current.rotation.x = targetRotationX
      groupRef.current.rotation.z = targetRotationZ

      // Animation speed
      if (canFly) {
        mixer.timeScale = 2.8
      } else {
        mixer.timeScale = 1.3
      }

      mixer.update(delta)
    }
  })

  return <primitive ref={groupRef} object={clonedScene} />
}

// Bottom Bird Model
const PaperBirdBottomModel = () => {
  const groupRef = useRef<Group>(null)
  const [textFadeProgress, setTextFadeProgress] = useState(0)
  const gltf = useGLTF('/Animations/paperBird.glb')
  const { width } = useWindowSize()

  // Clone the scene for this instance
  const clonedScene = useMemo(() => {
    const cloned = SkeletonUtils.clone(gltf.scene)
    return cloned
  }, [gltf.scene])

  const { actions, mixer } = useAnimations(gltf.animations, groupRef)

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
    const handleTextFade = (e: CustomEvent<{ progress: number }>) => {
      setTextFadeProgress(e.detail.progress)
    }

    window.addEventListener('heroTextFade', handleTextFade as EventListener)

    return () => {
      window.removeEventListener('heroTextFade', handleTextFade as EventListener)
    }
  }, [])

  useFrame(({ clock }, delta) => {
    if (groupRef.current && mixer) {
      const time = clock.getElapsedTime()

      // Bird 3 appears after bird 2 (progress > 0.15)
      // Starts flying with the flock (progress > 0.2)
      const canAppear = textFadeProgress > 0.15
      const canFly = textFadeProgress > 0.2

      const appearProgress = canAppear ? Math.min((textFadeProgress - 0.15) / 0.05, 1) : 0
      const flyProgress = canFly ? Math.min((textFadeProgress - 0.2) / 0.8, 1) : 0

      // V-Formation: Bird 3 (Left Wing Back) - Follows to top-right, behind left wing (stays closer)
      let startX = -4.5, startY = -3.8, startZ = 0.8
      let endX = 1.5, endY = 2.2, endZ = -7 // Top-right, further left and lower (closer)
      let baseScale = 1.05, scaleReduction = 0.4

      if (width < 640) { // Mobile
        startX = -3.2
        startY = -2.0
        startZ = 0.6
        endX = 0.5
        endY = 1.5
        endZ = -5
        baseScale = 0.72
        scaleReduction = 0.32
      } else if (width < 1024) { // Tablet
        startX = -3.8
        startY = -2.8
        startZ = 0.7
        endX = 1
        endY = 1.8
        endZ = -6
        baseScale = 0.85
        scaleReduction = 0.35
      } else if (width < 1440) { // Laptop
        startX = -4.2
        startY = -3.3
        startZ = 0.8
        endX = 1.2
        endY = 2
        endZ = -6.5
        baseScale = 0.95
        scaleReduction = 0.38
      } else if (width < 1920) { // Desktop (1440-1920)
        startX = -4.5
        startY = -3.8
        startZ = 0.8
        endX = 1.5
        endY = 2.2
        endZ = -7
        baseScale = 1.05
        scaleReduction = 0.4
      }

      groupRef.current.position.x = startX + ((endX - startX) * flyProgress)
      groupRef.current.position.y = startY + ((endY - startY) * flyProgress)
      groupRef.current.position.z = startZ + ((endZ - startZ) * flyProgress)

      // Subtle floating when appearing
      if (!canFly && canAppear) {
        groupRef.current.position.y += Math.sin(time * 0.8 + 1) * 0.12
      }

      // Scale: Appear, then shrink as flying
      const flyScale = Math.max(baseScale - (flyProgress * scaleReduction), 0.2)
      const finalScale = appearProgress * flyScale
      groupRef.current.scale.set(finalScale, finalScale, finalScale)

      // Rotation toward top-right
      const targetRotationY = Math.PI * 0.62 + (flyProgress * 0.13)
      const targetRotationX = -0.16 - (flyProgress * 0.2)
      const targetRotationZ = 0.06 + (flyProgress * 0.1)

      groupRef.current.rotation.y = targetRotationY
      groupRef.current.rotation.x = targetRotationX
      groupRef.current.rotation.z = targetRotationZ

      // Animation speed
      if (canFly) {
        mixer.timeScale = 2.6
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
  const [textFadeProgress, setTextFadeProgress] = useState(0)
  const gltf = useGLTF('/Animations/paperBird.glb')
  const { width } = useWindowSize()

  // Clone the scene for this instance
  const clonedScene = useMemo(() => {
    const cloned = SkeletonUtils.clone(gltf.scene)
    return cloned
  }, [gltf.scene])

  const { actions, mixer } = useAnimations(gltf.animations, groupRef)

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
    const handleTextFade = (e: CustomEvent<{ progress: number }>) => {
      setTextFadeProgress(e.detail.progress)
    }

    window.addEventListener('heroTextFade', handleTextFade as EventListener)

    return () => {
      window.removeEventListener('heroTextFade', handleTextFade as EventListener)
    }
  }, [])

  useFrame(({ clock }, delta) => {
    if (groupRef.current && mixer) {
      const time = clock.getElapsedTime()

      // Bird 4 appears last (progress > 0.18)
      // Starts flying with the flock (progress > 0.2)
      const canAppear = textFadeProgress > 0.18
      const canFly = textFadeProgress > 0.2

      const appearProgress = canAppear ? Math.min((textFadeProgress - 0.18) / 0.02, 1) : 0
      const flyProgress = canFly ? Math.min((textFadeProgress - 0.2) / 0.8, 1) : 0

      // V-Formation: Bird 4 (Right Wing) - Follows to top-right, right side of formation (stays closer)
      let startX = 2.8, startY = -2.5, startZ = 1.8
      let endX = 7, endY = 2.8, endZ = -6 // Top-right, to the right of lead (closer)
      let baseScale = 1.18, scaleReduction = 0.45

      if (width < 640) { // Mobile
        startX = 2.0
        startY = -1.0
        startZ = 1.3
        endX = 5
        endY = 2
        endZ = -4
        baseScale = 0.82
        scaleReduction = 0.35
      } else if (width < 1024) { // Tablet
        startX = 2.4
        startY = -1.6
        startZ = 1.5
        endX = 5.5
        endY = 2.3
        endZ = -5
        baseScale = 0.95
        scaleReduction = 0.38
      } else if (width < 1440) { // Laptop
        startX = 2.6
        startY = -2.0
        startZ = 1.7
        endX = 6.5
        endY = 2.5
        endZ = -5.5
        baseScale = 1.08
        scaleReduction = 0.42
      } else if (width < 1920) { // Desktop (1440-1920)
        startX = 2.8
        startY = -2.5
        startZ = 1.8
        endX = 7
        endY = 2.8
        endZ = -6
        baseScale = 1.18
        scaleReduction = 0.45
      }

      groupRef.current.position.x = startX + ((endX - startX) * flyProgress)
      groupRef.current.position.y = startY + ((endY - startY) * flyProgress)
      groupRef.current.position.z = startZ + ((endZ - startZ) * flyProgress)

      // Subtle floating when appearing
      if (!canFly && canAppear) {
        groupRef.current.position.y += Math.sin(time * 0.8 + 1.5) * 0.12
      }

      // Scale: Appear, then shrink as flying
      const flyScale = Math.max(baseScale - (flyProgress * scaleReduction), 0.22)
      const finalScale = appearProgress * flyScale
      groupRef.current.scale.set(finalScale, finalScale, finalScale)

      // Rotation toward top-right
      const targetRotationY = Math.PI * 0.5 + (flyProgress * 0.15)
      const targetRotationX = -0.18 - (flyProgress * 0.22)
      const targetRotationZ = -0.08 - (flyProgress * 0.12)

      groupRef.current.rotation.y = targetRotationY
      groupRef.current.rotation.x = targetRotationX
      groupRef.current.rotation.z = targetRotationZ

      // Animation speed
      if (canFly) {
        mixer.timeScale = 2.8
      } else {
        mixer.timeScale = 1.3
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
