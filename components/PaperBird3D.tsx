'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, Cloud } from '@react-three/drei'
import { useRef, useEffect, useState, useMemo, MutableRefObject } from 'react'
import { Group } from 'three'
import { SkeletonUtils } from 'three-stdlib'
import { useProgress } from '@react-three/drei'


interface BirdProps {
  width: number
  progressRef: MutableRefObject<number>
}

const PaperBirdModel = ({ width, progressRef }: BirdProps) => {
  const groupRef = useRef<Group>(null)
  const gltf = useGLTF('/Animations/paperBird.glb')

  const cleanedScene = useMemo(() => {
    const cloned = SkeletonUtils.clone(gltf.scene)
    return cloned
  }, [gltf.scene])

  const { actions: leadActions, mixer: leadMixer } = useAnimations(gltf.animations, groupRef)

  useEffect(() => {
    if (leadActions && Object.keys(leadActions).length > 0) {
      Object.values(leadActions).forEach((action) => {
        if (action) action.play()
      })
    }
  }, [leadActions])

  useFrame(({ clock }, delta) => {
    if (groupRef.current && leadMixer) {
      const time = clock.getElapsedTime()
      const progress = progressRef.current
      const canFly = progress > 0.2
      const flyProgress = canFly ? Math.min((progress - 0.2) / 0.8, 1) : 0

      let startX = 0, startY = -1.5, startZ = 2.5
      let endX = 5, endY = 3.5, endZ = -5
      let baseScale = 1.35, scaleReduction = 0.5

      if (width < 640) {
        startX = 0; startY = 0; startZ = 1.8; endX = 3.5; endY = 2.5; endZ = -3; baseScale = 0.95; scaleReduction = 0.4
      } else if (width < 1024) {
        startX = 0; startY = -0.5; startZ = 2.0; endX = 4; endY = 3; endZ = -4; baseScale = 1.1; scaleReduction = 0.45
      }

      groupRef.current.position.set(
        startX + ((endX - startX) * flyProgress),
        startY + ((endY - startY) * flyProgress),
        startZ + ((endZ - startZ) * flyProgress)
      )

      if (!canFly) {
        groupRef.current.position.y += Math.sin(time * 0.8) * 0.12
      }

      const flyScale = Math.max(baseScale - (flyProgress * scaleReduction), 0.25)
      groupRef.current.scale.set(flyScale, flyScale, flyScale)

      const targetRotationY = Math.PI * 0.55 + (flyProgress * 0.15)
      const targetRotationX = -0.2 - (flyProgress * 0.25)
      const targetRotationZ = 0.1 + (flyProgress * 0.15)

      groupRef.current.rotation.set(targetRotationX, targetRotationY, targetRotationZ)

      leadMixer.timeScale = canFly ? 2.8 : 1.3
      leadMixer.update(delta)
    }
  })

  return <primitive ref={groupRef} object={cleanedScene} />
}

const PaperBirdLeftModel = ({ width, progressRef }: BirdProps) => {
  const groupRef = useRef<Group>(null)
  const gltf = useGLTF('/Animations/paperBird.glb')

  const clonedScene = useMemo(() => {
    const cloned = SkeletonUtils.clone(gltf.scene)
    return cloned
  }, [gltf.scene])

  const { actions: leftActions, mixer: leftMixer } = useAnimations(gltf.animations, groupRef)

  useEffect(() => {
    if (leftActions && Object.keys(leftActions).length > 0) {
      Object.values(leftActions).forEach((action) => {
        if (action) action.play()
      })
    }
  }, [leftActions])

  useFrame(({ clock }, delta) => {
    if (groupRef.current && leftMixer) {
      const time = clock.getElapsedTime()
      const progress = progressRef.current
      const canAppear = progress > 0.1
      const canFly = progress > 0.2
      const appearProgress = canAppear ? Math.min((progress - 0.1) / 0.1, 1) : 0
      const flyProgress = canFly ? Math.min((progress - 0.2) / 0.8, 1) : 0

      let startX = -2.8, startY = -2.5, startZ = 1.8
      let endX = 3, endY = 2.8, endZ = -6
      let baseScale = 1.18, scaleReduction = 0.45

      if (width < 640) {
        startX = -2.0; startY = -1.0; startZ = 1.3; endX = 2; endY = 2; endZ = -4; baseScale = 0.82; scaleReduction = 0.35
      }

      groupRef.current.position.set(
        startX + ((endX - startX) * flyProgress),
        startY + ((endY - startY) * flyProgress),
        startZ + ((endZ - startZ) * flyProgress)
      )

      if (!canFly && canAppear) {
        groupRef.current.position.y += Math.sin(time * 0.8 + 0.5) * 0.12
      }

      const flyScale = Math.max(baseScale - (flyProgress * scaleReduction), 0.22)
      const finalScale = appearProgress * flyScale
      groupRef.current.scale.set(finalScale, finalScale, finalScale)

      const targetRotationY = Math.PI * 0.6 + (flyProgress * 0.15)
      const targetRotationX = -0.18 - (flyProgress * 0.22)
      const targetRotationZ = 0.08 + (flyProgress * 0.12)
      groupRef.current.rotation.set(targetRotationX, targetRotationY, targetRotationZ)

      leftMixer.timeScale = canFly ? 2.8 : 1.3
      leftMixer.update(delta)
    }
  })

  return <primitive ref={groupRef} object={clonedScene} />
}

const PaperBirdBottomModel = ({ width, progressRef }: BirdProps) => {
  const groupRef = useRef<Group>(null)
  const gltf = useGLTF('/Animations/paperBird.glb')

  const clonedScene = useMemo(() => {
    const cloned = SkeletonUtils.clone(gltf.scene)
    return cloned
  }, [gltf.scene])

  const { actions: bottomActions, mixer: bottomMixer } = useAnimations(gltf.animations, groupRef)

  useEffect(() => {
    if (bottomActions && Object.keys(bottomActions).length > 0) {
      Object.values(bottomActions).forEach((action) => {
        if (action) action.play()
      })
    }
  }, [bottomActions])

  useFrame(({ clock }, delta) => {
    if (groupRef.current && bottomMixer) {
      const time = clock.getElapsedTime()
      const progress = progressRef.current
      const canAppear = progress > 0.15
      const canFly = progress > 0.2
      const appearProgress = canAppear ? Math.min((progress - 0.15) / 0.05, 1) : 0
      const flyProgress = canFly ? Math.min((progress - 0.2) / 0.8, 1) : 0

      let startX = -4.5, startY = -3.8, startZ = 0.8
      let endX = 1.5, endY = 2.2, endZ = -7
      let baseScale = 1.05, scaleReduction = 0.4

      if (width < 640) {
        startX = -3.2; startY = -2.0; startZ = 0.6; endX = 0.5; endY = 1.5; endZ = -5; baseScale = 0.72; scaleReduction = 0.32
      }

      groupRef.current.position.set(
        startX + ((endX - startX) * flyProgress),
        startY + ((endY - startY) * flyProgress),
        startZ + ((endZ - startZ) * flyProgress)
      )

      if (!canFly && canAppear) {
        groupRef.current.position.y += Math.sin(time * 0.8 + 1) * 0.12
      }

      const flyScale = Math.max(baseScale - (flyProgress * scaleReduction), 0.2)
      const finalScale = appearProgress * flyScale
      groupRef.current.scale.set(finalScale, finalScale, finalScale)

      const targetRotationY = Math.PI * 0.62 + (flyProgress * 0.13)
      const targetRotationX = -0.16 - (flyProgress * 0.2)
      const targetRotationZ = 0.06 + (flyProgress * 0.1)
      groupRef.current.rotation.set(targetRotationX, targetRotationY, targetRotationZ)

      bottomMixer.timeScale = canFly ? 2.6 : 1.2
      bottomMixer.update(delta)
    }
  })

  return <primitive ref={groupRef} object={clonedScene} />
}

const PaperBirdRightModel = ({ width, progressRef }: BirdProps) => {
  const groupRef = useRef<Group>(null)
  const gltf = useGLTF('/Animations/paperBird.glb')

  const clonedScene = useMemo(() => {
    const cloned = SkeletonUtils.clone(gltf.scene)
    return cloned
  }, [gltf.scene])

  const { actions: rightActions, mixer: rightMixer } = useAnimations(gltf.animations, groupRef)

  useEffect(() => {
    if (rightActions && Object.keys(rightActions).length > 0) {
      Object.values(rightActions).forEach((action) => {
        if (action) action.play()
      })
    }
  }, [rightActions])

  useFrame(({ clock }, delta) => {
    if (groupRef.current && rightMixer) {
      const time = clock.getElapsedTime()
      const progress = progressRef.current
      const canAppear = progress > 0.18
      const canFly = progress > 0.2
      const appearProgress = canAppear ? Math.min((progress - 0.18) / 0.02, 1) : 0
      const flyProgress = canFly ? Math.min((progress - 0.2) / 0.8, 1) : 0

      let startX = 2.8, startY = -2.5, startZ = 1.8
      let endX = 7, endY = 2.8, endZ = -6
      let baseScale = 1.18, scaleReduction = 0.45

      if (width < 640) {
        startX = 2.0; startY = -1.0; startZ = 1.3; endX = 5; endY = 2; endZ = -4; baseScale = 0.82; scaleReduction = 0.35
      }

      groupRef.current.position.set(
        startX + ((endX - startX) * flyProgress),
        startY + ((endY - startY) * flyProgress),
        startZ + ((endZ - startZ) * flyProgress)
      )

      if (!canFly && canAppear) {
        groupRef.current.position.y += Math.sin(time * 0.8 + 1.5) * 0.12
      }

      const flyScale = Math.max(baseScale - (flyProgress * scaleReduction), 0.22)
      const finalScale = appearProgress * flyScale
      groupRef.current.scale.set(finalScale, finalScale, finalScale)

      const targetRotationY = Math.PI * 0.5 + (flyProgress * 0.15)
      const targetRotationX = -0.18 - (flyProgress * 0.22)
      const targetRotationZ = -0.08 - (flyProgress * 0.12)
      groupRef.current.rotation.set(targetRotationX, targetRotationY, targetRotationZ)

      rightMixer.timeScale = canFly ? 2.8 : 1.3
      rightMixer.update(delta)
    }
  })

  return <primitive ref={groupRef} object={clonedScene} />
}

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
      cloudRef.current.position.y = position[1] + Math.sin(time * 0.3 * speed) * 0.3
      cloudRef.current.position.x = position[0] + Math.sin(time * 0.1 * speed) * 0.5
    }
  })
  return (
    <group ref={cloudRef} position={position} scale={scale}>
      <Cloud opacity={opacity} speed={0.2} segments={30} color="#ffffff" />
    </group>
  )
}

const ProgressReporter = () => {
  const { progress } = useProgress()
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('assetLoadingProgress', { detail: { progress } }))
  }, [progress])
  return null
}

const PaperBird3D = () => {
  const [viewport, setViewport] = useState({ cameraZ: 6, cameraY: 0, fov: 60, width: 1920 })
  const progressRef = useRef(0)

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('assetLoadingProgress', { detail: { progress: 0 } }))
    const handleScrollUpdate = (e: CustomEvent<{ progress: number }>) => {
      progressRef.current = e.detail.progress
    }
    window.addEventListener('heroTextFade', handleScrollUpdate as EventListener)
    const updateViewport = () => {
      const width = window.innerWidth
      const base = { width, cameraZ: 6, cameraY: 0, fov: 60 }
      if (width < 640) setViewport({ ...base, cameraZ: 7, cameraY: -0.3, fov: 70 })
      else if (width < 1024) setViewport({ ...base, cameraZ: 6.5, cameraY: -0.2, fov: 65 })
      else if (width < 1440) setViewport({ ...base, cameraZ: 6, cameraY: 0, fov: 62 })
      else if (width < 1920) setViewport({ ...base, cameraZ: 5.5, cameraY: 0, fov: 58 })
      else setViewport({ ...base, cameraZ: 5, cameraY: 0, fov: 50 })
    }
    updateViewport(); window.addEventListener('resize', updateViewport)
    return () => {
      window.removeEventListener('resize', updateViewport)
      window.removeEventListener('heroTextFade', handleScrollUpdate as EventListener)
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-[8]">
      <Canvas camera={{ position: [0, viewport.cameraY, viewport.cameraZ], fov: viewport.fov }}>
        <ProgressReporter />
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, 5, 5]} intensity={0.5} />
        <Cloud3D position={[0, -4, -8]} scale={0.9} speed={0.2} opacity={0.4} />
        <Cloud3D position={[-9, 2, -8]} scale={1.1} speed={0.45} opacity={0.2} />
        <Cloud3D position={[9, 0, -16]} scale={0.9} speed={0.35} opacity={0.05} />
        <Cloud3D position={[-1, 10, 50]} scale={1.8} speed={0.15} opacity={0.5} />
        <PaperBirdModel width={viewport.width} progressRef={progressRef} />
        <PaperBirdLeftModel width={viewport.width} progressRef={progressRef} />
        <PaperBirdBottomModel width={viewport.width} progressRef={progressRef} />
        <PaperBirdRightModel width={viewport.width} progressRef={progressRef} />
      </Canvas>
    </div>
  )
}

useGLTF.preload('/Animations/paperBird.glb')
export { PaperBirdModel }
export default PaperBird3D
