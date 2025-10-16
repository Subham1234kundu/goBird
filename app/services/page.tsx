'use client'

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRouter } from "next/navigation"

gsap.registerPlugin(ScrollTrigger)

const Services = () => {
  const router = useRouter()
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement[]>([])
  const mediumImagesRef = useRef<HTMLDivElement[]>([])
  const textRef = useRef<HTMLDivElement[]>([])
  const boldMovesRef = useRef<HTMLDivElement[]>([])
  const boldMovesSectionRef = useRef<HTMLDivElement>(null)
  const boldMovesHeadingRef = useRef<HTMLDivElement>(null)
  const serveHeadingRef = useRef<HTMLDivElement>(null)
  const serveImagesRef = useRef<HTMLDivElement[]>([])
  const serveSectionRef = useRef<HTMLDivElement>(null)
  const roadmapSectionRef = useRef<HTMLDivElement>(null)
  const footerSectionRef = useRef<HTMLDivElement>(null)
  const headerBoxesRef = useRef<HTMLDivElement[]>([])
  const headerBirdRef = useRef<HTMLDivElement>(null)
  const headerContentRef = useRef<HTMLDivElement>(null)
  const askedItemsRef = useRef<HTMLDivElement[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const titles = [
    'IT Consulting',
    'Custom Software Development',
    'Cloud & Infrastructure',
    'Product Engineering'
  ]

  const routes = [
    '/services/servisPages/itConsulting',
    '/services/servisPages/customSoftwareDevelopment',
    '/services/servisPages/Cloud&Infrastructure',
    '/services/servisPages/productEngineering'
  ]

  const handleImageClick = (index: number) => {
    router.push(routes[index])
  }

  // Header section initial animation
  useEffect(() => {
    const boxes = headerBoxesRef.current.filter(Boolean)
    const bird = headerBirdRef.current
    const content = headerContentRef.current

    // Animate boxes from right with stagger
    if (boxes.length > 0) {
      boxes.forEach((box, index) => {
        gsap.set(box, { opacity: 0, x: 100 })
        gsap.to(box, {
          opacity: index === 0 ? 0.05 : index === 1 ? 0.25 : index === 2 ? 0.4 : index === 3 ? 0.62 : index === 4 ? 0.7 : index === 5 ? 0.58 : index === 6 ? 0.4 : index === 7 ? 0.3 : 0.2,
          x: 0,
          duration: 1,
          delay: 0.1 * index,
          ease: 'power3.out'
        })
      })
    }

    // Animate bird with rotation and fade
    if (bird) {
      gsap.set(bird, { opacity: 0, scale: 0.8, rotation: -20 })
      gsap.to(bird, {
        opacity: 0.20,
        scale: 1,
        rotation: 0,
        duration: 1.5,
        delay: 0.5,
        ease: 'power3.out'
      })
    }

    // Animate content
    if (content) {
      const heading = content.querySelector('h1')
      const subheading = content.querySelector('h3')
      const button = content.querySelector('button')

      if (heading) {
        gsap.set(heading, { opacity: 0, y: 60, scale: 0.95 })
        gsap.to(heading, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          delay: 0.8,
          ease: 'power3.out'
        })
      }

      if (subheading) {
        gsap.set(subheading, { opacity: 0, y: 40 })
        gsap.to(subheading, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 1.2,
          ease: 'power2.out'
        })
      }

      if (button) {
        gsap.set(button, { opacity: 0, scale: 0.8, y: 20 })
        gsap.to(button, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          delay: 1.6,
          ease: 'back.out(1.7)'
        })
      }
    }
  }, [])

  // Asked/FAQ section scroll-triggered animation
  useEffect(() => {
    const items = askedItemsRef.current.filter(Boolean)

    if (items.length > 0) {
      items.forEach((item, index) => {
        gsap.set(item, { opacity: 0, y: 30, scale: 0.95 })
        gsap.to(item, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: 0.08 * index,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: items[0],
            start: 'top 75%',
            once: true
          }
        })
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  useEffect(() => {
    const images = imagesRef.current.filter(Boolean)
    const mediumImages = mediumImagesRef.current.filter(Boolean)
    const texts = textRef.current.filter(Boolean)
    if (images.length === 0) return

    // Kill any existing animations to prevent conflicts
    gsap.killTweensOf([...images, ...mediumImages, ...texts])

    // Set initial state - all big images absolute positioned
    images.forEach((img, index) => {
      gsap.set(img, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: index === 0 ? 1 : 0,
        scale: index === 0 ? 1 : 1.05,
        force3D: true,
        transformOrigin: 'center center',
        backfaceVisibility: 'hidden',
        perspective: 1000
      })
    })

    // Set initial state - all medium images absolute positioned (hidden initially)
    mediumImages.forEach((img, index) => {
      gsap.set(img, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: index === 0 ? 0 : 0,
        scale: 0.92,
        y: 30,
        force3D: true,
        transformOrigin: 'center center',
        backfaceVisibility: 'hidden',
        perspective: 1000
      })
    })

    // Set initial state - all text elements
    texts.forEach((text) => {
      gsap.set(text, {
        position: 'absolute',
        opacity: 0,
        x: 50,
        force3D: true,
        backfaceVisibility: 'hidden'
      })
    })

    // Show first medium image after delay with entrance animation
    if (mediumImages[0]) {
      gsap.to(mediumImages[0], {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.4,
        delay: 0.6,
        ease: 'power4.out',
        force3D: true
      })
    }

    // Show first text after delay
    if (texts[0]) {
      gsap.to(texts[0], {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out',
        force3D: true
      })
    }

    // Store active animations to prevent overlaps
    let isAnimating = false

    // Auto-change images every 3.5 seconds with smooth professional transition
    const interval = setInterval(() => {
      if (isAnimating) return // Skip if animation is still running

      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length
        isAnimating = true

        // Create a timeline for coordinated animations
        const tl = gsap.timeline({
          onComplete: () => {
            isAnimating = false
          }
        })

        // Smooth crossfade with subtle zoom for big images
        tl.to(images[prevIndex], {
          opacity: 0,
          scale: 1.05,
          duration: 1.2,
          ease: 'power3.inOut',
          force3D: true
        }, 0)

        tl.to(images[nextIndex], {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          force3D: true
        }, 0)

        // Smooth fade, scale and slide transition for medium images
        if (mediumImages[prevIndex]) {
          tl.to(mediumImages[prevIndex], {
            opacity: 0,
            scale: 0.92,
            y: -30,
            duration: 1,
            ease: 'power3.inOut',
            force3D: true
          }, 0.1)
        }

        if (mediumImages[nextIndex]) {
          tl.to(mediumImages[nextIndex], {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            force3D: true
          }, 0.5)
        }

        // Smooth slide transition for text
        if (texts[prevIndex]) {
          tl.to(texts[prevIndex], {
            opacity: 0,
            x: -50,
            duration: 0.7,
            ease: 'power2.inOut',
            force3D: true
          }, 0.1)
        }

        if (texts[nextIndex]) {
          tl.to(texts[nextIndex], {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power2.out',
            force3D: true
          }, 0.6)
        }

        return nextIndex
      })
    }, 3500)

    return () => {
      clearInterval(interval)
      isAnimating = false
      // Kill all animations before cleanup
      gsap.killTweensOf([...images, ...mediumImages, ...texts])
      images.forEach(img => {
        gsap.set(img, { clearProps: 'all' })
      })
      mediumImages.forEach(img => {
        gsap.set(img, { clearProps: 'all' })
      })
      texts.forEach(text => {
        gsap.set(text, { clearProps: 'all' })
      })
    }
  }, [])

  // Bold Moves scroll-triggered animation
  useEffect(() => {
    const boldMoves = boldMovesRef.current.filter(Boolean)
    const section = boldMovesSectionRef.current
    const heading = boldMovesHeadingRef.current

    if (boldMoves.length === 0 || !section) return

    // Set initial state - hidden and slightly offset
    boldMoves.forEach((box) => {
      const image = box.querySelector('img')
      const textElements = box.querySelectorAll('p')
      const button = box.querySelector('button')

      gsap.set(box, {
        opacity: 0,
        y: 80,
        scale: 0.85,
        rotationY: -15
      })

      if (image) gsap.set(image, { scale: 1.3, opacity: 0 })
      textElements.forEach((text) => gsap.set(text, { opacity: 0, y: 30, x: -20 }))
      if (button) gsap.set(button, { opacity: 0, scale: 0.5, y: 20 })
    })

    // Animate heading first
    if (heading) {
      gsap.set(heading, { opacity: 0, y: 50 })
      gsap.to(heading, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: true
        }
      })
    }

    // Create scroll-triggered staggered entrance animation
    boldMoves.forEach((box, index) => {
      const image = box.querySelector('img')
      const textElements = box.querySelectorAll('p')
      const button = box.querySelector('button')

      // Timeline for coordinated animation with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          once: true
        },
        delay: 0.2 + (index * 0.12)
      })

      // Container animation - slide up with rotation
      tl.to(box, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 1,
        ease: 'power3.out'
      })

      // Image zoom in with fade
      if (image) {
        tl.to(image, {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out'
        }, '-=0.7')
      }

      // Text elements slide and fade in with stagger
      if (textElements.length > 0) {
        tl.to(textElements, {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out'
        }, '-=0.6')
      }

      // Button pop in with elastic bounce
      if (button) {
        tl.to(button, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: 'back.out(2)'
        }, '-=0.4')
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      gsap.killTweensOf(boldMoves)
    }
  }, [])

  // Serve section, Roadmap, and Footer scroll-triggered animations
  useEffect(() => {
    const serveHeading = serveHeadingRef.current
    const serveImages = serveImagesRef.current.filter(Boolean)
    const serveSection = serveSectionRef.current
    const roadmapSection = roadmapSectionRef.current
    const footerSection = footerSectionRef.current

    // Serve heading animation
    if (serveHeading && serveSection) {
      gsap.set(serveHeading, { opacity: 0, y: 50 })
      gsap.to(serveHeading, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: serveSection,
          start: 'top 70%',
          once: true
        }
      })
    }

    // Serve images staggered animation
    if (serveImages.length > 0 && serveSection) {
      serveImages.forEach((img) => {
        gsap.set(img, { opacity: 0, x: -100, scale: 0.9 })
      })

      serveImages.forEach((img, index) => {
        gsap.to(img, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          delay: 0.15 * index,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: serveSection,
            start: 'top 60%',
            once: true
          }
        })
      })
    }

    // Roadmap section animation
    if (roadmapSection) {
      const heading = roadmapSection.querySelector('.roadmap-heading')
      const button = roadmapSection.querySelector('button')

      if (heading) {
        gsap.set(heading, { opacity: 0, y: 60, scale: 0.9 })
        gsap.to(heading, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: roadmapSection,
            start: 'top 70%',
            once: true
          }
        })
      }

      if (button) {
        gsap.set(button, { opacity: 0, scale: 0.8, y: 20 })
        gsap.to(button, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: roadmapSection,
            start: 'top 70%',
            once: true
          }
        })
      }
    }

    // Footer section animation
    if (footerSection) {
      const quote = footerSection.querySelector('.footer-quote')
      const author = footerSection.querySelector('.footer-author')
      const playButton = footerSection.querySelector('.footer-play')

      if (quote) {
        gsap.set(quote, { opacity: 0, x: -80 })
        gsap.to(quote, {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerSection,
            start: 'top 70%',
            once: true
          }
        })
      }

      if (author) {
        gsap.set(author, { opacity: 0, y: 30 })
        gsap.to(author, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerSection,
            start: 'top 70%',
            once: true
          }
        })
      }

      if (playButton) {
        gsap.set(playButton, { opacity: 0, scale: 0.8 })
        gsap.to(playButton, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.6,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: footerSection,
            start: 'top 70%',
            once: true
          }
        })
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Mouse hover handlers for bold moves with text and button effects
  const handleMouseEnter = (element: HTMLDivElement) => {
    const image = element.querySelector('img')
    const textElements = element.querySelectorAll('p')
    const button = element.querySelector('button')

    // Container lift and scale with shadow
    gsap.to(element, {
      y: -12,
      scale: 1.03,
      boxShadow: '0 20px 60px #F4F4F45C',
      duration: 0.5,
      ease: 'power2.out'
    })

    // Image subtle zoom
    if (image) {
      gsap.to(image, {
        scale: 1.08,
        duration: 0.5,
        ease: 'power2.out'
      })
    }

    // Text subtle movement
    textElements.forEach((text, index) => {
      gsap.to(text, {
        y: -3,
        duration: 0.4,
        delay: index * 0.05,
        ease: 'power2.out'
      })
    })

    // Button scale and brightness
    if (button) {
      gsap.to(button, {
        scale: 1.08,
        duration: 0.3,
        ease: 'back.out(1.7)'
      })
    }
  }

  const handleMouseLeave = (element: HTMLDivElement) => {
    const image = element.querySelector('img')
    const textElements = element.querySelectorAll('p')
    const button = element.querySelector('button')

    // Return container to original state
    gsap.to(element, {
      y: 0,
      scale: 1,
      boxShadow: '0 0 0 rgba(0,0,0,0)',
      duration: 0.5,
      ease: 'power2.out'
    })

    // Image return to normal
    if (image) {
      gsap.to(image, {
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      })
    }

    // Text return
    textElements.forEach((text) => {
      gsap.to(text, {
        y: 0,
        duration: 0.4,
        ease: 'power2.out'
      })
    })

    // Button return
    if (button) {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  }

  return (
    <div className="w-full overflow-x-hidden">
      <div>
        {/* heading */}
        <div className="bg-custom-bg w-full h-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-9 pt-6 sm:pt-8 md:pt-12 lg:pt-16 relative">
          {/* 9 boxes on the right side */}
          <div className="flex absolute right-0 top-0 h-full">
            <div ref={el => { if (el) headerBoxesRef.current[0] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #FF662A 40%, #000A1B 30%)', opacity: 0.05 }}></div>
            <div ref={el => { if (el) headerBoxesRef.current[1] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #FF662A 25%, #000A1B 65%)', opacity: 0.2 }}></div>
            <div ref={el => { if (el) headerBoxesRef.current[2] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #FF662A 37%, #000A1B 70%)', opacity: 0.4 }}></div>
            <div ref={el => { if (el) headerBoxesRef.current[3] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #FF662A 40%, #000A1B 75%)', opacity: 0.52 }}></div>
            <div ref={el => { if (el) headerBoxesRef.current[4] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #FF662A 38%, #000A1B 73%)', opacity: 0.67 }}></div>
            <div ref={el => { if (el) headerBoxesRef.current[5] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #FF662A 35%, #000A1B 71%)', opacity: 0.72 }}></div>
            <div ref={el => { if (el) headerBoxesRef.current[6] = el }} className="hidden sm:block h-full w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #FF662A 30%, #000A1B 69%)', opacity: 0.49 }}></div>
            <div ref={el => { if (el) headerBoxesRef.current[7] = el }} className="hidden md:block h-full w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #FF662A 25%, #000A1B 65%)', opacity: 0.3 }}></div>
            <div ref={el => { if (el) headerBoxesRef.current[8] = el }} className="hidden md:block h-full w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #FF662A 10%, #000A1B 50%)', opacity: 0.2 }}></div>
          </div>

          {/* Service Bird Image - Right Top */}
          <div ref={headerBirdRef} className="absolute right-0 top-0 z-20" style={{ opacity: 0.20 }}>
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] 2xl:w-[36rem] 2xl:h-[36rem]">
              <Image
                src="/Images/serviseImages/seviseBird.png"
                alt="Service Bird"
                fill
                className="object-cover object-top-right"
              />
            </div>
          </div>

          <div ref={headerContentRef} className="flex flex-col w-full max-w-[1400px] mx-auto relative z-10 pb-16">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight mb-8 w-full sm:w-[90%] md:w-[85%] lg:w-[76%]" style={{ fontWeight: 300 }}>
              From strategy to execution, Grobird covers the full lifecycle of digital solutions.
            </h1>
            <h3 className="text-white font-light text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl w-full sm:w-[90%] md:w-[85%] lg:w-[75%] leading-relaxed">
              Whether you&apos;re rethinking IT infrastructure, building custom software, or scaling digital products — we help you move with speed and confidence.
            </h3>
            <button className="mt-12 sm:mt-16 md:mt-20 bg-white border border-white rounded-full text-black text-xs sm:text-sm px-8 sm:px-12 py-2 w-fit">
              View Products
            </button>
          </div>
        </div>

        {/* Startups Section */}
        <div className="w-full py-16 px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-black text-lg sm:text-xl md:text-2xl  text-center mb-8">
              The startups shaping tomorrow trust Grobird
            </h2>

            {/* Startup Company Images Row */}
            <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-14 overflow-x-auto pb-2">
              <div className="relative w-20 h-10 sm:w-24 sm:h-12 md:w-32 md:h-16 lg:w-36 lg:h-18 xl:w-40 xl:h-20 2xl:w-44 2xl:h-22 flex-shrink-0">
                <Image
                  src="/Images/startups/company1.png"
                  alt="Startup Company 1"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 128px, (max-width: 1280px) 144px, (max-width: 1536px) 160px, 176px"
                />
              </div>
              <div className="relative w-20 h-10 sm:w-24 sm:h-12 md:w-32 md:h-16 lg:w-36 lg:h-18 xl:w-40 xl:h-20 2xl:w-44 2xl:h-22 flex-shrink-0">
                <Image
                  src="/Images/startups/company2.png"
                  alt="Startup Company 2"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 128px, (max-width: 1280px) 144px, (max-width: 1536px) 160px, 176px"
                />
              </div>
              <div className="relative w-20 h-10 sm:w-24 sm:h-12 md:w-32 md:h-16 lg:w-36 lg:h-18 xl:w-40 xl:h-20 2xl:w-44 2xl:h-22 flex-shrink-0">
                <Image
                  src="/Images/startups/company3.png"
                  alt="Startup Company 3"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 128px, (max-width: 1280px) 144px, (max-width: 1536px) 160px, 176px"
                />
              </div>
              <div className="relative w-20 h-10 sm:w-24 sm:h-12 md:w-32 md:h-16 lg:w-36 lg:h-18 xl:w-40 xl:h-20 2xl:w-44 2xl:h-22 flex-shrink-0">
                <Image
                  src="/Images/startups/company4.png"
                  alt="Startup Company 4"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 128px, (max-width: 1280px) 144px, (max-width: 1536px) 160px, 176px"
                />
              </div>
              <div className="relative w-20 h-10 sm:w-24 sm:h-12 md:w-32 md:h-16 lg:w-36 lg:h-18 xl:w-40 xl:h-20 2xl:w-44 2xl:h-22 flex-shrink-0">
                <Image
                  src="/Images/startups/company5.png"
                  alt="Startup Company 5"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 128px, (max-width: 1280px) 144px, (max-width: 1536px) 160px, 176px"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Full-width auto-changing images section with absolute positioned medium images */}
        <div
          ref={imageContainerRef}
          className="relative w-full h-[600px] sm:h-[800px] md:h-[1000px] lg:h-[1200px] xl:h-[1400px] overflow-hidden cursor-pointer"
          onClick={() => handleImageClick(currentIndex)}
        >
          <div
            ref={el => { if (el) imagesRef.current[0] = el }}
            className="w-full h-full"
          >
              <Image
                src="/Images/srtviseImages/BigImage/b1.png"
                alt="Startup Image 1"
                fill
                className="object-cover"
                priority
                quality={90}
              />
            </div>
            <div
              ref={el => { if (el) imagesRef.current[1] = el }}
              className="w-full h-full"
            >
              <Image
                src="/Images/srtviseImages/BigImage/b2.png"
                alt="Startup Image 2"
                fill
                className="object-cover"
                quality={90}
              />
            </div>
            <div
              ref={el => { if (el) imagesRef.current[2] = el }}
              className="w-full h-full"
            >
              <Image
                src="/Images/srtviseImages/BigImage/b3.png"
                alt="Startup Image 3"
                fill
                className="object-cover"
                quality={90}
              />
            </div>
            <div
              ref={el => { if (el) imagesRef.current[3] = el }}
              className="w-full h-full"
            >
              <Image
                src="/Images/srtviseImages/BigImage/b4.png"
                alt="Startup Image 4"
                fill
                className="object-cover"
                quality={90}
              />
            </div>

          {/* M1, M2, M3, M4 Images - Absolutely positioned at 50% from top */}
          <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[94%] h-[250px] sm:h-[350px] md:h-[400px] lg:h-[520px]">
            {/* M1 Image */}
            <div
              ref={el => { if (el) mediumImagesRef.current[0] = el }}
              className="w-full h-full relative"
            >
              <Image
                src="/Images/srtviseImages/MediumImage/m1.png"
                alt="Service Image M1"
                fill
                className="object-cover"
                quality={90}
              />
              {/* Text overlay on M1 image */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 lg:top-8 lg:left-8 z-10 flex flex-col lg:flex-row text-white justify-between w-[94%] h-[93%] gap-4 lg:gap-0">
                <div className="mb-4 lg:mb-8 w-full lg:w-[65%]  ">
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-light mb-3 sm:mb-4 md:mb-5 lg:mb-7" style={{ fontWeight: 300 }}>
                    Strategic guidance for<br className="hidden sm:block" /> a digital-first world
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base font-light" style={{ fontWeight: 300 }}>
                    We help businesses define IT strategies, assess systems, and create roadmaps for transformation.
                  </p>
                </div>
                <div className="flex justify-start mb-10 lg:justify-end align-bottom flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5">
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 mt-1 bg-white rounded-full flex-shrink-0"></div>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl" style={{ fontWeight: 300 }}>IT Roadmaps & Strategy</p>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 mt-1 bg-white rounded-full flex-shrink-0"></div>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl" style={{ fontWeight: 300 }}>System Audits & Optimization</p>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 mt-1 bg-white rounded-full flex-shrink-0"></div>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl" style={{ fontWeight: 300 }}>Digital Transformation Guidance</p>
                  </div>

                </div>
              </div>
            </div>

            {/* M2 Image */}
            <div
              ref={el => { if (el) mediumImagesRef.current[1] = el }}
              className="w-full h-full"
            >
              <Image
                src="/Images/srtviseImages/MediumImage/m2.png"
                alt="Service Image M2"
                fill
                className="object-cover"
                quality={90}
              />
            </div>

            {/* M3 Image */}
            <div
              ref={el => { if (el) mediumImagesRef.current[2] = el }}
              className="w-full h-full"
            >
              <Image
                src="/Images/srtviseImages/MediumImage/m3.png"
                alt="Service Image M3"
                fill
                className="object-cover"
                quality={90}
              />
            </div>

            {/* M4 Image */}
            <div
              ref={el => { if (el) mediumImagesRef.current[3] = el }}
              className="w-full h-full"
            >
              <Image
                src="/Images/srtviseImages/MediumImage/m4.png"
                alt="Service Image M4"
                fill
                className="object-cover"
                quality={90}
              />
            </div>
          </div>

          {/* Text Labels - Absolutely positioned at top right */}
          <div className="absolute top-6 right-0 sm:top-8 md:top-12 lg:top-16 xl:top-20 z-20 w-[60%] sm:w-[55%] md:w-[50%] lg:w-[45%] pr-3 sm:pr-4 md:pr-6 lg:pr-8 xl:pr-10 flex flex-col items-end">
            {/* IT Consulting - 1st image */}
            <div
              ref={el => { if (el) textRef.current[0] = el }}
              className="text-white flex flex-col items-end absolute"
              style={{ opacity: 0 }}
            >
              <h2 className="text-base sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-light text-right mb-3 sm:mb-4 md:mb-5 text-black" style={{ fontWeight: 300 }}>
                {titles[0]}
              </h2>
              <button
                className="bg-white text-black text-[10px] sm:text-xs px-4 sm:px-5 md:px-7 py-1.5 sm:py-2 rounded-full whitespace-nowrap hover:bg-gray-100 transition-colors"
                onClick={(e) => { e.stopPropagation(); handleImageClick(0); }}
              >
                Book a Strategy Session
              </button>
            </div>

            {/* Custom Software Development - 2nd image */}
            <div
              ref={el => { if (el) textRef.current[1] = el }}
              className="text-white flex flex-col items-end absolute"
              style={{ opacity: 0 }}
            >
              <h2 className="text-base sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-light text-right mb-3 sm:mb-4 md:mb-5" style={{ fontWeight: 300 }}>
                {titles[1]}
              </h2>
              <button
                className="bg-white text-black text-[10px] sm:text-xs px-4 sm:px-5 md:px-7 py-1.5 sm:py-2 rounded-full whitespace-nowrap hover:bg-gray-100 transition-colors"
                onClick={(e) => { e.stopPropagation(); handleImageClick(1); }}
              >
                Request a Proposal
              </button>
            </div>

            {/* Cloud & Infrastructure - 3rd image */}
            <div
              ref={el => { if (el) textRef.current[2] = el }}
              className="text-white flex flex-col items-end absolute"
              style={{ opacity: 0 }}
            >
              <h2 className="text-base sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-light text-right mb-3 sm:mb-4 md:mb-5" style={{ fontWeight: 300 }}>
                {titles[2]}
              </h2>
              <button
                className="bg-white text-black text-[10px] sm:text-xs px-4 sm:px-5 md:px-7 py-1.5 sm:py-2 rounded-full whitespace-nowrap hover:bg-gray-100 transition-colors"
                onClick={(e) => { e.stopPropagation(); handleImageClick(2); }}
              >
                See Cloud Services
              </button>
            </div>

            {/* Product Engineering - 4th image */}
            <div
              ref={el => { if (el) textRef.current[3] = el }}
              className="text-white flex flex-col items-end absolute"
              style={{ opacity: 0 }}
            >
              <h2 className="text-base sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-light text-right mb-3 sm:mb-4 md:mb-5" style={{ fontWeight: 300 }}>
                {titles[3]}
              </h2>
              <button
                className="bg-white text-black text-[10px] sm:text-xs px-4 sm:px-5 md:px-7 py-1.5 sm:py-2 rounded-full whitespace-nowrap hover:bg-gray-100 transition-colors"
                onClick={(e) => { e.stopPropagation(); handleImageClick(3); }}
              >
                Explore Product Engineering
              </button>
            </div>
          </div>
        </div>

        {/* we serve */}
        <div ref={serveSectionRef} className="w-full items-center flex flex-col px-3 sm:px-4 md:px-8 lg:px-10">
          <div ref={serveHeadingRef} className="flex flex-col sm:flex-row justify-between items-start w-full  my-12 sm:my-16 md:my-20 gap-6 sm:gap-8">
            <div className="flex items-start text-2xl sm:text-3xl md:text-4xl font-medium text-black flex-col ">
              <p>Industries We</p>
              <p className="text-[#3B3B3D73]">Serve</p>
            </div>
            <p className="text-[#2D2C2C] text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed lg:w-[25%]">
              Every industry has its own challenges, and at Grobird we tailor software to meet those unique needs
            </p>
          </div>


        </div>

        {/* Horizontally scrollable images section - hidden scrollbar */}
        <div className=" mb-12 sm:mb-16 md:mb-20 pl-3 sm:pl-4 md:pl-8 lg:pl-10">
            <div
              className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              {/* Image 1 - Logistics */}
              <div ref={el => { if (el) serveImagesRef.current[0] = el }} className="relative flex-shrink-0 w-[280px] h-[600px] sm:w-[320px] sm:h-[700px] md:w-[350px] md:h-[800px] lg:w-[380px] lg:h-[850px]">
                <Image
                  src="/Images/serviseImages/serve/s1.jpg"
                  alt="Logistics"
                  fill
                  className="object-cover"
                  quality={90}
                />
                <p className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-5 md:right-5 text-white text-sm sm:text-base md:text-lg lg:text-xl" style={{ fontWeight: 400 }}>
                  Logistics
                </p>
              </div>

              {/* Image 2 - Travel & Hospitality */}
              <div ref={el => { if (el) serveImagesRef.current[1] = el }} className="relative flex-shrink-0 w-[280px] h-[600px] sm:w-[320px] sm:h-[700px] md:w-[350px] md:h-[800px] lg:w-[380px] lg:h-[850px]">
                <Image
                  src="/Images/serviseImages/serve/s2.jpg"
                  alt="Travel & Hospitality"
                  fill
                  className="object-cover"
                  quality={90}
                />
                <p className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-5 md:right-5 text-white text-sm sm:text-base md:text-lg lg:text-xl" style={{ fontWeight: 400 }}>
                  Travel & Hospitality
                </p>
              </div>

              {/* Image 3 - E-Commerce & Retail */}
              <div ref={el => { if (el) serveImagesRef.current[2] = el }} className="relative flex-shrink-0 w-[280px] h-[600px] sm:w-[320px] sm:h-[700px] md:w-[350px] md:h-[800px] lg:w-[380px] lg:h-[850px]">
                <Image
                  src="/Images/serviseImages/serve/s3.jpg"
                  alt="E-Commerce & Retail"
                  fill
                  className="object-cover"
                  quality={90}
                />
                <p className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-5 md:right-5 text-white text-sm sm:text-base md:text-lg lg:text-xl" style={{ fontWeight: 400 }}>
                  E-Commerce & Retail
                </p>
              </div>

              {/* Image 4 - Service */}
              <div ref={el => { if (el) serveImagesRef.current[3] = el }} className="relative flex-shrink-0 w-[280px] h-[600px] sm:w-[320px] sm:h-[700px] md:w-[350px] md:h-[800px] lg:w-[380px] lg:h-[850px]">
                <Image
                  src="/Images/serviseImages/serve/s4.jpg"
                  alt="Service"
                  fill
                  className="object-cover"
                  quality={90}
                />
                <p className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-5 md:right-5 text-white text-sm sm:text-base md:text-lg lg:text-xl" style={{ fontWeight: 400 }}>
                  Service
                </p>
              </div>
            </div>
        </div>

        {/* bold moves */}
        <div ref={boldMovesSectionRef} className="w-full items-center flex flex-col px-3 sm:px-4 md:px-8 lg:px-10">
          <div ref={boldMovesHeadingRef} className="flex flex-col sm:flex-row justify-between items-center w-full  my-12 sm:my-16 md:my-20 gap-6 sm:gap-8 ">
            <div className="flex items-start text-2xl sm:text-3xl md:text-4xl font-medium text-black flex-col gap-2 ">
              <p>Big Steps, Bold Moves </p>
              <p className="text-[#3B3B3D73]">Our Latest Releases</p>
            </div>
            <p className="text-[#2D2C2C] text-md sm:text-lg md:text-xl lg:text-2xl leading-relaxed ]">
              Press Releaseds
            </p>
          </div>

          <div className=" flex gap-5 items-center justify-center w-[90%] h-[700px] ">
            <div className="flex h-full items-center justify-center ">
              <div
                ref={el => { if (el) boldMovesRef.current[0] = el }}
                className="relative w-[220px] h-[400px] cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
                onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              >
                <Image
                  src="/Images/serviseImages/boldmoves/1bm.jpg"
                  alt="Bold Move 1"
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute bottom-8 left-3 right-3 flex flex-col gap-2">
                  <p className=" text-white text-xl">A2Y Consultants Website</p>
                  <button className="bg-white border border-gray-300 rounded-full text-black text-xs px-4 py-1.5 w-fit hover:bg-gray-100 transition-colors">
                    Read Release
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 h-full items-center justify-center ">
              <div
                ref={el => { if (el) boldMovesRef.current[1] = el }}
                className="relative w-[220px] h-[300px] cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
                onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              >
                <Image
                  src="/Images/serviseImages/boldmoves/2bm.jpg"
                  alt="Bold Move 2"
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-2">
                  <p className=" text-white text-xl">A2Y Consultants Website</p>
                  <button className="bg-white border border-gray-300 rounded-full text-black text-xs px-4 py-1.5 w-fit hover:bg-gray-100 transition-colors">
                    Read Release
                  </button>
                </div>
              </div>

              <div
                ref={el => { if (el) boldMovesRef.current[2] = el }}
                className="relative w-[220px] h-[250px] cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
                onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              >
                <Image
                  src="/Images/serviseImages/boldmoves/3bm.png"
                  alt="Bold Move 3"
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute top-5 left-3 right-3">
                  <p className="text-white text-5xl">92%</p>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-md uppercase">Product Adoption Rate</p>
                </div>
              </div>
            </div>

            <div className="flex h-full items-center justify-center ">
              <div
                ref={el => { if (el) boldMovesRef.current[3] = el }}
                className="relative w-[220px] h-[400px] cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
                onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              >
                <Image
                  src="/Images/serviseImages/boldmoves/4bm.jpg"
                  alt="Bold Move 4"
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute bottom-8 left-3 right-3 flex flex-col gap-2">
                  <p className=" text-white text-xl">AHMADYAR Website</p>
                  <button className="bg-white border border-gray-300 rounded-full text-black text-xs px-4 py-1.5 w-fit hover:bg-gray-100 transition-colors">
                    Read Release
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 h-full items-center justify-center ">
              <div
                ref={el => { if (el) boldMovesRef.current[4] = el }}
                className="relative w-[220px] h-[250px] cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
                onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              >
                <Image
                  src="/Images/serviseImages/boldmoves/5bm.png"
                  alt="Bold Move 5"
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute top-5 left-3 right-3">
                  <p className="text-white text-5xl">3X</p>
                </div>
                <div className="absolute bottom-8 left-3 right-2">
                  <p className="text-white text-md uppercase">Faster Go-to-Market</p>
                </div>
              </div>

              <div
                ref={el => { if (el) boldMovesRef.current[5] = el }}
                className="relative w-[220px] h-[300px] cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
                onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              >
                <Image
                  src="/Images/serviseImages/boldmoves/6bm.jpg"
                  alt="Bold Move 6"
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-2">
                  <p className=" text-white text-xl">A2Y Consultants Website</p>
                  <button className="bg-white border border-gray-300 rounded-full text-black text-xs px-4 py-1.5 w-fit hover:bg-gray-100 transition-colors">
                    Read Release
                  </button>
                </div>
              </div>
            </div>
          </div>

          


        </div>

        {/* Asked */}
        <div className="w-full bg-[#F4F4F4] py-24 items-start flex flex-col px-3 sm:px-4 md:px-8 lg:px-10 relative">
          {/* White gradient at top */}
          <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.8), transparent)' }}></div>

          <div className=" flex flex-col w-full px-10 items-center gap-4">


            <div ref={el => { if (el) askedItemsRef.current[0] = el }} className="border-[#68636352] rounded-md p-3 px-7 border-1 w-full flex items-center justify-between">
                <p className="text-[#111111]">What kind of teams use Relay?</p>
                <Image
                src="/Images/serviseImages/plus.png"
                alt="plus"
                width={25}
                height={25}
                />

            </div>


            <div ref={el => { if (el) askedItemsRef.current[1] = el }} className="border-[#68636352] rounded-md p-3 px-7 border-1 w-full flex items-center justify-between">
                <p className="text-[#111111]">Does Relay work with Slack and Microsoft Teams?</p>
                <Image
                src="/Images/serviseImages/plus.png"
                alt="plus"
                width={25}
                height={25}
                />

            </div>


            <div ref={el => { if (el) askedItemsRef.current[2] = el }} className="border-[#68636352] rounded-md p-3 px-7 border-1 w-full flex items-center justify-between">
                <p className="text-[#111111]">Is there a free trial?</p>
                <Image
                src="/Images/serviseImages/plus.png"
                alt="plus"
                width={25}
                height={25}
                />

            </div>

            <div ref={el => { if (el) askedItemsRef.current[3] = el }} className="border-[#68636352] rounded-md p-3 px-7 border-1 w-full flex items-center justify-between">
                <p className="text-[#111111]">Is my data secure?</p>
                <Image
                src="/Images/serviseImages/plus.png"
                alt="plus"
                width={25}
                height={25}
                />

            </div>

            <div ref={el => { if (el) askedItemsRef.current[4] = el }} className="border-[#68636352] rounded-md p-3 px-7 border-1 w-full flex items-center justify-between">
                <p className="text-[#111111]">Can I collaborate with my engineering team inside Relay?</p>
                <Image
                src="/Images/serviseImages/plus.png"
                alt="plus"
                width={25}
                height={25}
                />

            </div>

             <div ref={el => { if (el) askedItemsRef.current[5] = el }} className="border-[#68636352] rounded-md p-3 px-7 border-1 w-full flex items-center justify-between">
                <p className="text-[#111111]">Does Relay support multi-channel communication?</p>
                <Image
                src="/Images/serviseImages/plus.png"
                alt="plus"
                width={25}
                height={25}
                />

            </div>

            <div ref={el => { if (el) askedItemsRef.current[6] = el }} className="border-[#68636352] rounded-md p-3 px-7 border-1 w-full flex items-center justify-between">
                <p className="text-[#111111]">Can I customize how Relay works for my team?</p>
                <Image
                src="/Images/serviseImages/plus.png"
                alt="plus"
                width={25}
                height={25}
                />

            </div>

            
         
          </div>
        </div>

        
      {/* roadmap */}
      <div ref={roadmapSectionRef} className="w-full py-20 gap-8 items-start flex flex-col px-3 sm:px-4 md:px-8 lg:px-10">
        <div className="roadmap-heading flex items-start text-2xl sm:text-3xl md:text-5xl font-medium text-black flex-col gap-2 ">
              <p>Let's design the right technology </p>
              <p className="text-[#3B3B3D73]">roadmap for your business.</p>
        </div>

        <button className="bg-[#FF662A] p-2 px-4 rounded-sm  flex gap-2 items-start">
          <p className="text-white text-sm">Start a Conversation</p>

        </button>

      </div>

      {/* footer image */}
      <div ref={footerSectionRef} className="w-full relative ">
        <Image
          src="/Images/serviseImages/footer.jpg"
          alt="Roadmap Image"
          width={1920}
          height={200}
          className="object-cover w-full h-[800px]"
        />
        <div className="footer-quote absolute inset-0 flex items-center w-[50%] ml-[2%] mb-44 justify-start">
          <p className="text-4xl  md:text-5xl lg:text-3xl xl:text-3xl text-white text-start px-4 font-extralight ">
            "Looking for process improvements, <br /> we found a solution that <br /> transformed our entire data <br /> strategy. The depth of insights was <br /> remarkable."
          </p>
        </div>



          <div className="absolute inset-0 flex items-end mx-[3%] my-[1%]  justify-between">
            <p className="footer-author text-white text-xs ">
              Maya Singh <br /> Product Strategy Lead
            </p>

            <div className="footer-play flex items-center gap-2">
              <Image
              src="/Images/serviseImages/play.png"
              width={40}
              alt="video play"
              height={40}
              />
              <p className="text-white text-md">Watch video</p>
            </div>
          </div>
        

      </div>



      </div>
    </div>
  )
}

export default Services
