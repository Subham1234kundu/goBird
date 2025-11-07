"use client"

import PaperBird3D from "@/components/PaperBird3D"
import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import InsightsSection from "@/app/components/service/InsightsSection"
import FooterSimple from "./components/FooterSimple"
import { useRouter } from "next/navigation"

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  const router = useRouter()
  // Refs for all animated sections
  const heroHeadingRef = useRef<HTMLHeadingElement>(null)
  const heroDescRef = useRef<HTMLParagraphElement>(null)
  const heroButtonsRef = useRef<HTMLDivElement>(null)
  const heroSectionRef = useRef<HTMLDivElement>(null)
  const heroContentWrapperRef = useRef<HTMLDivElement>(null)
  const startupsHeadingRef = useRef<HTMLHeadingElement>(null)
  const startupLogosRef = useRef<HTMLDivElement>(null)
  const servicesHeadingRef = useRef<HTMLDivElement>(null)
  const itConsultingRef = useRef<HTMLDivElement>(null)
  const serviceItemsRef = useRef<(HTMLDivElement | null)[]>([])
  const developIdeaRef = useRef<HTMLDivElement>(null)
  const successHeadingRef = useRef<HTMLHeadingElement>(null)
  const statsCardsRef = useRef<HTMLDivElement>(null)
  const boldMovesHeadingRef = useRef<HTMLDivElement>(null)
  const boldMovesRef = useRef<(HTMLDivElement | null)[]>([])
  const testimonialsHeadingRef = useRef<HTMLDivElement>(null)
  const testimonialImageRef = useRef<HTMLDivElement>(null)
  const insightsHeadingRef = useRef<HTMLDivElement>(null)
  const faqHeadingRef = useRef<HTMLDivElement>(null)
  const faqItemsRef = useRef<(HTMLDivElement | null)[]>([])
  const ctaSectionRef = useRef<HTMLDivElement>(null)
  const ctaBirdRef = useRef<HTMLDivElement>(null)
  const ctaContentRef = useRef<HTMLDivElement>(null)
  const ctaCloudLeftRef = useRef<HTMLDivElement>(null)
  const ctaCloudRightRef = useRef<HTMLDivElement>(null)
  const ctaCloudBottomRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = (element: HTMLDivElement) => {
    gsap.to(element, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    })
  }

  const handleMouseLeave = (element: HTMLDivElement) => {
    gsap.to(element, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    })
  }

  useEffect(() => {
    // Kill existing ScrollTrigger animations only
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    
    // Reset all animated elements to initial visible state
    const resetElements = [
      heroHeadingRef.current,
      heroDescRef.current,
      startupsHeadingRef.current,
      developIdeaRef.current,
      successHeadingRef.current,
      statsCardsRef.current,
      boldMovesHeadingRef.current,
      testimonialsHeadingRef.current,
      testimonialImageRef.current,
      insightsHeadingRef.current
    ]
    
    resetElements.forEach(el => {
      if (el) gsap.set(el, { clearProps: "all" })
    })
    
    // Reset arrays of elements
    serviceItemsRef.current.forEach(el => {
      if (el) gsap.set(el, { clearProps: "all" })
    })
    
    boldMovesRef.current.forEach(el => {
      if (el) gsap.set(el, { clearProps: "all" })
    })
    
    faqItemsRef.current.forEach(el => {
      if (el) gsap.set(el, { clearProps: "all" })
    })
    
    if (heroButtonsRef.current) gsap.set(heroButtonsRef.current.children, { clearProps: "all" })
    if (heroContentWrapperRef.current) gsap.set(heroContentWrapperRef.current, { clearProps: "all" })
    if (startupLogosRef.current) gsap.set(startupLogosRef.current.children, { clearProps: "all" })
    
    // Ensure CTA section elements are always visible - set inline styles
    if (ctaBirdRef.current) {
      ctaBirdRef.current.style.opacity = '1'
      ctaBirdRef.current.style.visibility = 'visible'
    }
    if (ctaContentRef.current) {
      ctaContentRef.current.style.opacity = '1'
      ctaContentRef.current.style.visibility = 'visible'
      const children = ctaContentRef.current.querySelectorAll('*')
      children.forEach((child: Element) => {
        if (child instanceof HTMLElement) {
          child.style.opacity = '1'
          child.style.visibility = 'visible'
        }
      })
    }
    if (ctaCloudLeftRef.current) {
      ctaCloudLeftRef.current.style.opacity = '1'
      ctaCloudLeftRef.current.style.visibility = 'visible'
    }
    if (ctaCloudRightRef.current) {
      ctaCloudRightRef.current.style.opacity = '1'
      ctaCloudRightRef.current.style.visibility = 'visible'
    }
    if (ctaCloudBottomRef.current) {
      ctaCloudBottomRef.current.style.opacity = '1'
      ctaCloudBottomRef.current.style.visibility = 'visible'
    }

    // Hero Section Animations
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } })

    if (heroHeadingRef.current) {
      heroTl.from(heroHeadingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3
      })
    }

    if (heroDescRef.current) {
      heroTl.from(heroDescRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8
      }, "-=0.5")
    }

    if (heroButtonsRef.current) {
      heroTl.from(heroButtonsRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2
      }, "-=0.4")
    }

    // Hero Section Blur Effect on Scroll
    if (heroContentWrapperRef.current && heroSectionRef.current) {
      gsap.to(heroContentWrapperRef.current, {
        filter: "blur(10px)",
        opacity: 0.3,
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5
        }
      })
    }

    // Startups Section
    if (startupsHeadingRef.current) {
      gsap.from(startupsHeadingRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: startupsHeadingRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      })
    }

    if (startupLogosRef.current) {
      gsap.from(startupLogosRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: startupLogosRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      })
    }

    // Services Section - keep visible without animation
    if (servicesHeadingRef.current) {
      gsap.set(servicesHeadingRef.current, { opacity: 1, x: 0 })
    }

    // IT Consulting section - keep visible without animation
    if (itConsultingRef.current) {
      gsap.set(itConsultingRef.current, { opacity: 1, y: 0 })
    }

    // Service Items Stagger
    serviceItemsRef.current.forEach((item) => {
      if (item) {
        gsap.from(item, {
          x: -30,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        })
      }
    })

    // Develop Idea Image
    if (developIdeaRef.current) {
      gsap.from(developIdeaRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: developIdeaRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      })
    }

    // Success/Stats Section
    if (successHeadingRef.current) {
      gsap.from(successHeadingRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: successHeadingRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      })
    }

    if (statsCardsRef.current) {
      gsap.from(statsCardsRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: statsCardsRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      })

      // Animate stat numbers with counter effect
      const statNumbers = statsCardsRef.current.querySelectorAll('h1')
      statNumbers.forEach((stat) => {
        const text = stat.textContent || ''
        const numberMatch = text.match(/\d+/)

        if (numberMatch) {
          const targetNumber = parseInt(numberMatch[0])
          const suffix = text.match(/[+%x]/i)?.[0] || ''

          // Create a counter object
          const counter = { value: 0 }

          gsap.to(counter, {
            value: targetNumber,
            duration: 2,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: stat,
              start: "top 80%",
              toggleActions: "play none none reverse"
            },
            onUpdate: function() {
              const current = Math.ceil(counter.value)
              // Preserve the HTML structure with the colored span
              stat.innerHTML = `${current}<span class="text-[#FF662A]">${suffix}</span>`
            }
          })
        }
      })
    }

    // Bold Moves Section
    if (boldMovesHeadingRef.current) {
      gsap.from(boldMovesHeadingRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: boldMovesHeadingRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      })
    }

    // Bold Moves Cards Stagger
    boldMovesRef.current.forEach((card, index) => {
      if (card) {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        })
      }
    })

    // Testimonials Section
    if (testimonialsHeadingRef.current) {
      gsap.from(testimonialsHeadingRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: testimonialsHeadingRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      })
    }

    // Testimonial Image Parallax
    if (testimonialImageRef.current) {
      gsap.to(testimonialImageRef.current.querySelector('img'), {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: testimonialImageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      })
    }

    // Insights Section
    if (insightsHeadingRef.current) {
      gsap.from(insightsHeadingRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: insightsHeadingRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      })
    }

    // FAQ Section - keep visible without animation
    if (faqHeadingRef.current) {
      gsap.set(faqHeadingRef.current, { opacity: 1, y: 0 })
    }

    // FAQ Items animation removed - keeping FAQ heading always visible

    faqItemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.from(item, {
          x: -30,
          opacity: 0,
          duration: 0.6,
          delay: index * 0.05,
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        })
      }
    })

    // CTA Section - Bird with floating animation
    if (ctaBirdRef.current) {
      const birdImg = ctaBirdRef.current.querySelector('img')
      if (birdImg instanceof HTMLElement) {
        birdImg.style.opacity = '1'
        birdImg.style.visibility = 'visible'
      }

      // Continuous floating animation only
      gsap.to(birdImg, {
        y: -30,
        duration: 3.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      })

      // Subtle rotation animation
      gsap.to(birdImg, {
        rotation: 5,
        duration: 3.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      })
    }

    // CTA Content
    if (ctaContentRef.current) {
      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: ctaContentRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      })

      ctaTl.from(ctaContentRef.current.querySelector('h2'), {
        y: 50,
        opacity: 0,
        duration: 0.8
      })
      .from(ctaContentRef.current.querySelector('p'), {
        y: 30,
        opacity: 0,
        duration: 0.6
      }, "-=0.4")
      .from(ctaContentRef.current.querySelectorAll('button'), {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2
      }, "-=0.3")
    }

    // Cloud Animations - Smooth continuous loop without reset
    if (ctaCloudLeftRef.current) {
      // Left cloud - slide in from left
      gsap.from(ctaCloudLeftRef.current, {
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      })

      // Smooth continuous loop - goes to 90% and back seamlessly
      gsap.to(ctaCloudLeftRef.current, {
        y: -10.8,
        x: 18,
        duration: 7.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: "top 70%",
          toggleActions: "play pause resume pause"
        }
      })
    }

    if (ctaCloudRightRef.current) {
      // Right cloud - slide in from right
      gsap.from(ctaCloudRightRef.current, {
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      })

      // Smooth continuous loop - goes to 90% and back seamlessly
      gsap.to(ctaCloudRightRef.current, {
        y: -7.2,
        x: -13.5,
        duration: 9.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.5,
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: "top 70%",
          toggleActions: "play pause resume pause"
        }
      })
    }

    if (ctaCloudBottomRef.current) {
      // Bottom cloud - slide up from bottom
      gsap.from(ctaCloudBottomRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        delay: 0.4,
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      })

      // Smooth continuous loop - goes to 90% and back seamlessly
      gsap.to(ctaCloudBottomRef.current, {
        x: 18,
        duration: 11.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.8,
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: "top 70%",
          toggleActions: "play pause resume pause"
        }
      })
    }

    // Refresh ScrollTrigger after all animations are set up
    ScrollTrigger.refresh()

    // Cleanup
    return () => {
      // Kill all ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      
      // Kill all GSAP tweens
      gsap.killTweensOf("*")
    }
  }, [])

  return (
    <>
      <div style={{ width: '100%', minHeight: '100vh', fontFamily: 'Montserrat, -apple-system, BlinkMacSystemFont, sans-serif', overflowX: 'hidden' }}>
        {/* header */}
        <div
          ref={heroSectionRef}
          className="w-full flex relative px-4 justify-center h-[700px] sm:h-[800px] md:h-[900px] lg:h-[1000px] xl:h-[1200px] 2xl:h-[1400px] "
          style={{
            background: 'linear-gradient(to bottom, #010917 1%, #006BCB 85%, #ffffff 100%)'
          }}>
        {/* Image at the very top */}
        <div className="absolute top-[120px] left-0 w-full h-[50vh] z-0">
          <Image src="/Images/boxes.png" alt="Boxes" width={3000} height={1000} className="w-[90%] h-[120%] object-cover opacity-20" />
        </div>

        <div ref={heroContentWrapperRef} className="flex flex-col items-center mt-16 sm:mt-18 md:mt-16 lg:mt-18 xl:mt-14 2xl:mt-20 text-center w-full max-w-7xl 2xl:max-w-8xl relative z-10">
          <h1 ref={heroHeadingRef} className="text-white text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-7xl 2xl:text-7xl font-light leading-snug sm:leading-tight mb-2 sm:mb-1 px-2">
            Transforming Ideas into <br /> Scalable Digital Solutions
          </h1>
          <p ref={heroDescRef} className="text-white font-thin text-base sm:text-base md:text-md lg:text-md xl:text-lg 2xl:text-2xl leading-relaxed max-w-4xl 2xl:max-w-6xl mb-6 sm:mb-7 xl:mb-8 2xl:mb-10 px-4">
            Grobird accelerates innovation through IT consulting, software <br className="hidden sm:block" /> development, and cloud solutions.
          </p>
          <div ref={heroButtonsRef} className="flex flex-row gap-3 sm:gap-4 items-center justify-center">
            <button onClick={() => router.push('/contact')} className="bg-[#FF672C] text-white px-4 sm:px-6 lg:px-12 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-[#e55a24] transition-colors">
              Talk to Us
            </button>
            <button onClick={() => router.push('/services')} className="bg-white text-black px-4 sm:px-6 lg:px-12 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-gray-100 transition-colors">
              Explore Services
            </button>
          </div>
        </div>

        {/* 3D Paper Birds with Scroll Animation and 3D Clouds */}
        <PaperBird3D />
      </div>

        {/* Startups Section */}
        <div className="w-full py-16 px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="max-w-[1400px] mx-auto">
            <h2 ref={startupsHeadingRef} className="text-black text-lg sm:text-xl md:text-2xl text-center mb-8">
              The startups shaping tomorrow trust Grobird
            </h2>

            {/* Startup Company Images Row */}
            <div ref={startupLogosRef} className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-14">
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

        {/* 10x drive */}
        <div>
          <div className="flex flex-col gap-8 md:gap-12 lg:gap-16 xl:gap-20 mx-[4%] my-8 md:my-16 lg:my-20 xl:my-30">
            <div ref={servicesHeadingRef} className="flex flex-col md:flex-row justify-between items-start mb-4 md:mb-6 lg:mb-8 xl:mb-12 gap-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-[#000A1B] w-full md:w-[70%]">Driving <span className="text-[#FE4C00]">10x</span> client <br /> engagement and <span className="text-[#FE4C00]">40%</span> faster <br /> time-to-market </h1>

              <h3 className="text-2xl md:text-3xl lg:text-4xl text-[#000A1B] mt-0 md:mt-3">Services</h3>
            </div>

            <div ref={itConsultingRef} className="w-full min-h-[250px] md:min-h-[300px] lg:h-[350px] p-4 px-6 md:p-6 md:px-10 lg:p-8 lg:px-14 flex flex-col justify-between" style={{
              background: 'linear-gradient(to bottom, #020A18, #023362)'
            }}>

              <div className="flex flex-col gap-3 md:gap-4 lg:gap-5">
                <div className="text-white text-5xl md:text-6xl lg:text-7xl xl:text-8xl">01</div>
                <h3 className="text-white text-2xl md:text-3xl lg:text-[40px]">IT Consulting</h3>
                <div className="mt-2 flex justify-between items-end gap-4">
                  <p className="text-white/80 text-sm md:text-base lg:text-lg xl:text-xl font-light leading-relaxed">
                    Designed to help businesses navigate<br className="hidden md:block" />
                    the complexities of today&apos;s fast-paced
                  </p>
                  <Image src="/Images/arrow.png" alt="Arrow" width={60} height={60} className="object-contain w-10 h-10 md:w-12 md:h-12 lg:w-[60px] lg:h-[60px]" />
                </div>

              </div>
            </div>

            <div className="flex flex-col gap-12 md:gap-16 lg:gap-24 xl:gap-32 items-center px-4 md:px-8 lg:px-14 mb-6 md:mb-10 lg:mb-12 xl:mb-14">
              <div ref={el => { if (el) serviceItemsRef.current[0] = el }} className="w-full flex justify-between items-start gap-4">
                <p className="text-[#000000] text-xl md:text-2xl lg:text-3xl xl:text-[40px]">Custom Software Development</p>
                    <Image src="/Images/arrowBlack.png" alt="Arrow" width={60} height={60} className="object-contain w-10 h-10 md:w-12 md:h-12 lg:w-[60px] lg:h-[60px] flex-shrink-0" />

              </div>

              <div ref={el => { if (el) serviceItemsRef.current[1] = el }} className="w-full flex justify-between items-start gap-4">
                <p className="text-[#000000] text-xl md:text-2xl lg:text-3xl xl:text-[40px]">Cloud & Infrastructure</p>
                    <Image src="/Images/arrowBlack.png" alt="Arrow" width={60} height={60} className="object-contain w-10 h-10 md:w-12 md:h-12 lg:w-[60px] lg:h-[60px] flex-shrink-0" />

              </div>

              <div ref={el => { if (el) serviceItemsRef.current[2] = el }} className="w-full flex justify-between items-start gap-4">
                <p className="text-[#000000] text-xl md:text-2xl lg:text-3xl xl:text-[40px]">Product Engineering </p>
                    <Image src="/Images/arrowBlack.png" alt="Arrow" width={60} height={60} className="object-contain w-10 h-10 md:w-12 md:h-12 lg:w-[60px] lg:h-[60px] flex-shrink-0" />

              </div>

              <button 
                onClick={() => router.push('/services')}
                className="text-white bg-[#FF662A] px-6 py-3 mt-2 md:mt-4 lg:mt-5 xl:mt-7 text-sm md:text-base rounded-md hover:bg-[#e55a24] transition-colors"
              >
                View all services
              </button>

            </div>

            {/* Develop Idea Image */}
            <div ref={developIdeaRef} className="w-full h-full mb-8 md:mb-12 lg:mb-16">
              <Image src="/Images/developIdea.png" alt="Develop Idea" width={1920} height={1080} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* our success */}
        <div>
          <div className="mx-[4%]">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
              <h1 ref={successHeadingRef} className="text-[#0F1011] text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium w-full lg:w-auto">
                <span className="text-[#3B3B3D73]">Our Success, Quantified: <br /></span>Driving Growth,<br /> Innovation, and <br/> Scale
              </h1>


              <div ref={statsCardsRef} className="w-full lg:w-auto h-full bg-[#D3D3D347] flex flex-col gap-6 md:gap-8 lg:gap-12 p-4 md:p-5 lg:px-5">
                <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 lg:gap-8">
                  <div className="flex-col flex items-center justify-center gap-2 md:gap-3 w-full sm:w-[200px] md:w-[240px] lg:w-[280px] h-[140px] md:h-[160px] lg:h-[180px]">
                    <h1 className="text-[#060B13] text-3xl md:text-4xl lg:text-[41px] font-semibold">200<span className="text-[#FF662A]">+</span></h1>
                    <p className="text-[#363D4F] text-xs md:text-sm font-semibold text-center">On-time delivery rate</p>
                    <p className="text-[#363D4F] text-xs md:text-sm text-center">Projects delivered on schedule, every time</p>
                  </div>
                  <div className="flex-col flex items-center justify-center gap-2 md:gap-3 w-full sm:w-[200px] md:w-[240px] lg:w-[280px] h-[140px] md:h-[160px] lg:h-[180px]">
                    <h1 className="text-[#060B13] text-3xl md:text-4xl lg:text-[41px] font-semibold">10<span className="text-[#FF662A]">x</span></h1>
                    <p className="text-[#363D4F] text-xs md:text-sm font-semibold text-center">Higher Client Retention</p>
                    <p className="text-[#363D4F] text-xs md:text-sm text-center">Clients keep coming back for more</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 lg:gap-8">
                  <div className="flex-col flex items-center justify-center gap-2 md:gap-3 w-full sm:w-[200px] md:w-[240px] lg:w-[280px] h-[140px] md:h-[160px] lg:h-[180px]">
                    <h1 className="text-[#060B13] text-3xl md:text-4xl lg:text-[41px] font-semibold">97<span className="text-[#FF662A]">%</span></h1>
                    <p className="text-[#363D4F] text-xs md:text-sm font-semibold text-center">Client Satisfaction Rate</p>
                    <p className="text-[#363D4F] text-xs md:text-sm text-center">Ensuring every client is delighted</p>
                  </div>
                  <div className="flex-col flex items-center justify-center gap-2 md:gap-3 w-full sm:w-[200px] md:w-[240px] lg:w-[280px] h-[140px] md:h-[160px] lg:h-[180px]">
                    <h1 className="text-[#060B13] text-3xl md:text-4xl lg:text-[41px] font-semibold">5<span className="text-[#FF662A]">+</span></h1>
                    <p className="text-[#363D4F] text-xs md:text-sm font-semibold text-center">Continents Served</p>
                    <p className="text-[#363D4F] text-xs md:text-sm text-center">Delivering solutions across multiple<br />continents</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* bold moves */}
        <div>
          <div className="mx-[4%]">
            <div className="w-full items-center flex flex-col mt-8 md:mt-12 lg:mt-16 xl:mt-20 mb-6 md:mb-8 lg:mb-10 xl:mb-12">
              <div ref={boldMovesHeadingRef} className="flex flex-col sm:flex-row justify-between items-start w-full my-6 sm:my-8 md:my-12 lg:my-16 xl:my-20 gap-4 sm:gap-6 md:gap-8">
                <div className="flex items-start text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-medium text-black flex-col gap-2">
                  <p>Big Steps, Bold Moves</p>
                  <p className="text-[#3B3B3D73]">Our Latest Releases</p>
                </div>
                <p className="text-[#2D2C2C] text-md sm:text-lg md:text-xl lg:text-2xl xl:text-4xl leading-relaxed">
                  Press Releases
                </p>
              </div>

              <div className="flex gap-3 md:gap-4 lg:gap-5 items-center justify-start md:justify-center w-full md:w-[95%] lg:w-[90%] h-auto md:h-[500px] lg:h-[600px] xl:h-[700px] overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 px-4 md:px-0" style={{scrollbarWidth: 'thin'}}>
                <div className="flex h-[350px] md:h-full items-center justify-center flex-shrink-0">
                  <div
                    ref={el => { if (el) boldMovesRef.current[0] = el }}
                    className="relative w-[160px] md:w-[180px] lg:w-[200px] xl:w-[220px] h-[300px] md:h-[350px] lg:h-[380px] xl:h-[400px] cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
                    onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                  >
                    <Image
                      src="/Images/serviseImages/boldmoves/1bm.jpg"
                      alt="Bold Move 1"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-2 md:left-3 right-2 md:right-3 flex flex-col gap-1 md:gap-2">
                      <p className="text-white text-sm md:text-base lg:text-lg xl:text-xl">A2Y Consultants Website</p>
                      <button className="bg-white border border-gray-300 rounded-full text-black text-xs px-3 md:px-4 py-1 md:py-1.5 w-fit hover:bg-gray-100 transition-colors">
                        Read Release
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 md:gap-4 h-[350px] md:h-full items-center justify-center flex-shrink-0">
                  <div
                    ref={el => { if (el) boldMovesRef.current[1] = el }}
                    className="relative w-[160px] md:w-[180px] lg:w-[200px] xl:w-[220px] h-[220px] md:h-[250px] lg:h-[280px] xl:h-[300px] cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
                    onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                  >
                    <Image
                      src="/Images/serviseImages/boldmoves/2bm.jpg"
                      alt="Bold Move 2"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 right-2 md:right-3 flex flex-col gap-1 md:gap-2">
                      <p className="text-white text-sm md:text-base lg:text-lg xl:text-xl">A2Y Consultants Website</p>
                      <button className="bg-white border border-gray-300 rounded-full text-black text-xs px-3 md:px-4 py-1 md:py-1.5 w-fit hover:bg-gray-100 transition-colors">
                        Read Release
                      </button>
                    </div>
                  </div>

                  <div
                    ref={el => { if (el) boldMovesRef.current[2] = el }}
                    className="relative w-[160px] md:w-[180px] lg:w-[200px] xl:w-[220px] h-[180px] md:h-[200px] lg:h-[230px] xl:h-[250px] cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
                    onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                  >
                    <Image
                      src="/Images/serviseImages/boldmoves/3bm.png"
                      alt="Bold Move 3"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute top-3 md:top-4 lg:top-5 left-2 md:left-3 right-2 md:right-3">
                      <p className="text-white text-3xl md:text-4xl lg:text-5xl">92%</p>
                    </div>
                    <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 right-2 md:right-3">
                      <p className="text-white text-xs md:text-sm lg:text-md uppercase">Product Adoption Rate</p>
                    </div>
                  </div>
                </div>

                <div className="flex h-[350px] md:h-full items-center justify-center flex-shrink-0">
                  <div
                    ref={el => { if (el) boldMovesRef.current[3] = el }}
                    className="relative w-[160px] md:w-[180px] lg:w-[200px] xl:w-[220px] h-[300px] md:h-[350px] lg:h-[380px] xl:h-[400px] cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
                    onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                  >
                    <Image
                      src="/Images/serviseImages/boldmoves/4bm.jpg"
                      alt="Bold Move 4"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-2 md:left-3 right-2 md:right-3 flex flex-col gap-1 md:gap-2">
                      <p className="text-white text-sm md:text-base lg:text-lg xl:text-xl">AHMADYAR Website</p>
                      <button className="bg-white border border-gray-300 rounded-full text-black text-xs px-3 md:px-4 py-1 md:py-1.5 w-fit hover:bg-gray-100 transition-colors">
                        Read Release
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 md:gap-4 h-[350px] md:h-full items-center justify-center flex-shrink-0">
                  <div
                    ref={el => { if (el) boldMovesRef.current[4] = el }}
                    className="relative w-[160px] md:w-[180px] lg:w-[200px] xl:w-[220px] h-[180px] md:h-[200px] lg:h-[230px] xl:h-[250px] cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
                    onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                  >
                    <Image
                      src="/Images/serviseImages/boldmoves/5bm.png"
                      alt="Bold Move 5"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute top-3 md:top-4 lg:top-5 left-2 md:left-3 right-2 md:right-3">
                      <p className="text-white text-3xl md:text-4xl lg:text-5xl">3X</p>
                    </div>
                    <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-2 md:left-3 right-2">
                      <p className="text-white text-xs md:text-sm lg:text-md uppercase">Faster Go-to-Market</p>
                    </div>
                  </div>

                  <div
                    ref={el => { if (el) boldMovesRef.current[5] = el }}
                    className="relative w-[160px] md:w-[180px] lg:w-[200px] xl:w-[220px] h-[220px] md:h-[250px] lg:h-[280px] xl:h-[300px] cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
                    onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                  >
                    <Image
                      src="/Images/serviseImages/boldmoves/6bm.jpg"
                      alt="Bold Move 6"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 right-2 md:right-3 flex flex-col gap-1 md:gap-2">
                      <p className="text-white text-sm md:text-base lg:text-lg xl:text-xl">A2Y Consultants Website</p>
                      <button className="bg-white border border-gray-300 rounded-full text-black text-xs px-3 md:px-4 py-1 md:py-1.5 w-fit hover:bg-gray-100 transition-colors">
                        Read Release
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials Section */}
            <div ref={testimonialsHeadingRef} className="flex flex-col sm:flex-row justify-between items-start w-full my-8 sm:my-10 md:my-12 lg:my-16 xl:my-20 gap-4 sm:gap-6 md:gap-8">
                <div className="flex items-start text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-medium text-[#3B3B3D73] flex-col gap-2">
                  <p>98% client </p>
                  <p className="text-black">satisfaction rate</p>
                </div>
                <p className="text-[#2D2C2C] text-md sm:text-lg md:text-xl lg:text-2xl xl:text-4xl leading-relaxed">
                  Testimonials
                </p>
            </div>
          </div>
        </div>

          {/* Footer Section with Testimonial */}
          <div ref={testimonialImageRef} className="w-full relative mt-8 md:mt-12 lg:mt-16 xl:mt-20 mb-8 md:mb-12 lg:mb-16 xl:mb-24">
              <Image
                src="/Images/serviseImages/footer.jpg"
                alt="Roadmap Image"
                width={1920}
                height={200}
                className="object-cover w-full h-[400px] md:h-[600px] lg:h-[700px] xl:h-[800px]"
              />
              <div className="footer-quote absolute inset-0 flex items-center w-full md:w-[60%] lg:w-[50%] ml-[4%] md:ml-[2%] mb-20 md:mb-32 lg:mb-44 justify-start">
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl text-white text-start px-2 md:px-4 font-extralight leading-relaxed">
                  &ldquo;Looking for process improvements, <br className="hidden sm:block" /> we found a solution that <br className="hidden sm:block" /> transformed our entire data <br className="hidden sm:block" /> strategy. The depth of insights was <br className="hidden sm:block" /> remarkable.&rdquo;
                </p>
              </div>

              <div className="absolute inset-0 flex items-end mx-[4%] md:mx-[3%] my-[2%] md:my-[1%] justify-between">
                <p className="footer-author text-white text-[10px] md:text-xs">
                  Maya Singh <br /> Product Strategy Lead
                </p>

                <div className="footer-play flex items-center gap-1 md:gap-2">
                  <Image
                    src="/Images/serviseImages/play.png"
                    width={40}
                    height={40}
                    alt="video play"
                    className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
                  />
                  <p className="text-white text-xs md:text-sm lg:text-md">Watch video</p>
                </div>
              </div>
          </div>

          <div className="flex flex-col mx-[4%]">
            <div ref={insightsHeadingRef} className="flex flex-col sm:flex-row justify-between items-start w-full gap-4 sm:gap-6 md:gap-8 mt-8 md:mt-12 lg:mt-16 xl:mt-18">
                <div className="flex items-start text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-medium text-[#3B3B3D73] flex-col gap-2">
                  <p>Insights from Grobird</p>
                  <p className="text-black">Experts</p>
                </div>
                <p className="text-[#2D2C2C] text-md sm:text-lg md:text-xl lg:text-2xl xl:text-4xl leading-relaxed">
                  Blogs
                </p>
            </div>
          </div>

          {/* Insights Section */}
          <div>
          <InsightsSection
            title=""
            titleHighlight=""
            buttonText=""
            insights={[
              {
                imageSrc: "/Images/insights1.png",
                title: "The art of storytelling in branding and advertising",
                category: "Branding",
                date: "Mar 1, 2025",
                readTime: "8min read",
                imageAlt: "The art of storytelling in branding and advertising"
              },
              {
                imageSrc: "/Images/insights2.png",
                title: "Building scalable cloud infrastructure for modern businesses",
                category: "Technology",
                date: "Feb 28, 2025",
                readTime: "10min read",
                imageAlt: "Building scalable cloud infrastructure"
              },
              {
                imageSrc: "/Images/insights3.png",
                title: "Product engineering best practices for startups",
                category: "Development",
                date: "Feb 25, 2025",
                readTime: "12min read",
                imageAlt: "Product engineering best practices"
              }
            ]}
          />

          {/* More Articles Button */}
          <div className="flex justify-center items-center mx-[4%] mb-12 md:mb-16 lg:mb-20">
            <button 
              onClick={() => router.push('/insights')}
              className="bg-[#FF662A] text-white px-6 py-3 text-sm flex items-center gap-2 hover:bg-[#e55a24] transition-colors rounded-md"
            >
              More articles
              <Image src="/Images/arrow.png" alt="Arrow" width={20} height={20} className="object-contain" />
            </button>
          </div>
          </div>

          {/* question */}
          <div className="flex flex-col gap-12 md:gap-16 lg:gap-20 mx-[4%] mb-12 md:mb-16 lg:mb-20">
            <div ref={faqHeadingRef} className="flex flex-col lg:flex-row justify-between items-start w-full mt-12 md:mt-16 lg:mt-20 mb-5 gap-6 md:gap-8">
                <div className="flex w-full lg:w-[60%] items-start text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-medium text-[#3B3B3D73] flex-col gap-2">
                  <p>Frequently Asked</p>
                  <p className="text-black">Questions</p>
                </div>
                <p className="text-[#2D2C2C] text-sm md:text-base lg:text-lg w-full lg:w-[40%] xl:text-3xl leading-relaxed">
                From setup to security, here&apos;s everything you
                need to know before getting started.
                </p>
            </div>

            <div className="flex flex-col w-full px-2 md:px-6 lg:px-10 items-center gap-3 md:gap-4">
              <div ref={el => { if (el) faqItemsRef.current[0] = el }} className="border-[#68636352] rounded-md p-2 px-4 md:p-3 md:px-7 border-1 w-full flex items-center justify-between gap-4">
                <p className="text-[#111111] text-sm md:text-base">What kind of teams use Relay?</p>
                <Image
                  src="/Images/serviseImages/plus.png"
                  alt="plus"
                  width={25}
                  height={25}
                  className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
                />
              </div>

              <div ref={el => { if (el) faqItemsRef.current[1] = el }} className="border-[#68636352] rounded-md p-2 px-4 md:p-3 md:px-7 border-1 w-full flex items-center justify-between gap-4">
                <p className="text-[#111111] text-sm md:text-base">Does Relay work with Slack and Microsoft Teams?</p>
                <Image
                  src="/Images/serviseImages/plus.png"
                  alt="plus"
                  width={25}
                  height={25}
                  className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
                />
              </div>

              <div ref={el => { if (el) faqItemsRef.current[2] = el }} className="border-[#68636352] rounded-md p-2 px-4 md:p-3 md:px-7 border-1 w-full flex items-center justify-between gap-4">
                <p className="text-[#111111] text-sm md:text-base">Is there a free trial?</p>
                <Image
                  src="/Images/serviseImages/plus.png"
                  alt="plus"
                  width={25}
                  height={25}
                  className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
                />
              </div>

              <div ref={el => { if (el) faqItemsRef.current[3] = el }} className="border-[#68636352] rounded-md p-2 px-4 md:p-3 md:px-7 border-1 w-full flex items-center justify-between gap-4">
                <p className="text-[#111111] text-sm md:text-base">Is my data secure?</p>
                <Image
                  src="/Images/serviseImages/plus.png"
                  alt="plus"
                  width={25}
                  height={25}
                  className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
                />
              </div>

              <div ref={el => { if (el) faqItemsRef.current[4] = el }} className="border-[#68636352] rounded-md p-2 px-4 md:p-3 md:px-7 border-1 w-full flex items-center justify-between gap-4">
                <p className="text-[#111111] text-sm md:text-base">Can I collaborate with my engineering team inside Relay?</p>
                <Image
                  src="/Images/serviseImages/plus.png"
                  alt="plus"
                  width={25}
                  height={25}
                  className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
                />
              </div>

              <div ref={el => { if (el) faqItemsRef.current[5] = el }} className="border-[#68636352] rounded-md p-2 px-4 md:p-3 md:px-7 border-1 w-full flex items-center justify-between gap-4">
                <p className="text-[#111111] text-sm md:text-base">Does Relay support multi-channel communication?</p>
                <Image
                  src="/Images/serviseImages/plus.png"
                  alt="plus"
                  width={25}
                  height={25}
                  className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
                />
              </div>

              <div ref={el => { if (el) faqItemsRef.current[6] = el }} className="border-[#68636352] rounded-md p-2 px-4 md:p-3 md:px-7 border-1 w-full flex items-center justify-between gap-4">
                <p className="text-[#111111] text-sm md:text-base">Can I customize how Relay works for my team?</p>
                <Image
                  src="/Images/serviseImages/plus.png"
                  alt="plus"
                  width={25}
                  height={25}
                  className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
                />
              </div>
            </div>
          </div>

          {/* Gradient Box */}
          <div ref={ctaSectionRef} className="w-full h-[900px] sm:h-[1100px] md:h-[1400px] lg:h-[1700px] xl:h-[2180px] relative overflow-hidden" style={{
            background: 'linear-gradient(to bottom, #FFFFFF 5%, #FE4B00A1 92%, #FFFFFF 100%)'
          }}>
            {/* Bird Image Container */}
            <div ref={ctaBirdRef} className="absolute top-0 left-[5%] sm:left-[8%] md:left-[12%] lg:left-40 w-[90%] sm:w-[85%] md:w-full h-full flex items-start justify-center md:justify-start">
              <Image
                src="/Images/takeFlight.png"
                alt="Take Flight"
                width={1000}
                height={1200}
                className="w-full sm:w-[90%] md:w-[85%] h-[500px] sm:h-[650px] md:h-[850px] lg:h-[1050px] xl:h-[1250px] object-contain"
                priority
              />
            </div>

            {/* Content Section */}
            <div ref={ctaContentRef} className="absolute top-[480px] sm:top-[620px] md:top-[820px] lg:top-[1000px] xl:top-[1200px] left-1/2 md:left-3/5 -translate-x-1/2 flex flex-col items-center md:items-start text-center md:text-start px-4 sm:px-6 md:px-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full max-w-7xl">
              <h2 className="text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl font-light leading-tight sm:leading-snug md:leading-tight">
                Ideas take flight here
              </h2>
              <p className="text-black font-light text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-3xl leading-relaxed max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl">
                From concept to code, we transform bold visions into living digital experiences that soar.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 items-center mt-2 md:mt-4 w-full sm:w-auto">
                <button onClick={() => router.push('/contact')} className="bg-[#FF672C] text-white px-6 sm:px-8 lg:px-12 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm hover:bg-[#e55a24] transition-colors w-full sm:w-auto">
                  Talk to Us
                </button>
                <button onClick={() => router.push('/services')} className="bg-white text-black px-6 sm:px-8 lg:px-12 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm hover:bg-gray-100 transition-colors w-full sm:w-auto border border-gray-200">
                  Explore Services
                </button>
              </div>
            </div>

            {/* Cloud Image at Bottom */}
            <div ref={ctaCloudLeftRef} className="absolute -bottom-24 sm:-bottom-32 md:-bottom-48 lg:-bottom-70 xl:-bottom-90 -left-8 md:-left-16 lg:-left-24 w-[110%] md:w-[108%] lg:w-[106%] z-10" style={{ willChange: 'transform' }}>
              <Image
                src="/Images/clouds/c2.png"
                alt="Cloud"
                width={1200}
                height={300}
                className="w-full h-auto object-cover"
              />
            </div>
            <div ref={ctaCloudBottomRef} className="absolute -bottom-8 sm:-bottom-12 md:-bottom-16 lg:-bottom-20 -right-12 sm:-right-16 md:-right-24 lg:-right-50 z-10 opacity-30 sm:opacity-40 w-[65%] sm:w-[55%] md:w-auto" style={{ willChange: 'transform' }}>
              <Image
                src="/Images/clouds/c4.png"
                alt="Cloud"
                width={1000}
                height={200}
                className="w-full h-auto object-cover"
              />
            </div>

            <div ref={ctaCloudRightRef} className="absolute -bottom-24 sm:-bottom-32 md:-bottom-48 lg:-bottom-70 xl:-bottom-90 -right-8 md:-right-16 lg:-right-24 w-[110%] md:w-[108%] lg:w-[106%] z-10" style={{ willChange: 'transform' }}>
              <Image
                src="/Images/clouds/c2.png"
                alt="Cloud"
                width={1000}
                height={300}
                className="w-full h-auto object-cover scale-x-[-1]"
              />
            </div>
          </div>

          {/* Footer */}
          <div>
            <FooterSimple/>
          </div>

      </div>
    </>
  )
}

export default Home
