"use client"
import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import InsightsSection from "@/app/components/service/InsightsSection"
import Footer from "@/app/components/Footer"

gsap.registerPlugin(ScrollTrigger)

const AboutUs = () => {
  const textRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLHeadingElement>(null)
  const boxesRef = useRef<HTMLImageElement>(null)
  const birdRef = useRef<HTMLImageElement>(null)
  const missionSectionRef = useRef<HTMLDivElement>(null)
  const missionBoxRef = useRef<HTMLDivElement>(null)
  const visionBoxRef = useRef<HTMLDivElement>(null)
  const testimonialRefs = useRef<HTMLDivElement[]>([])
  const storyHeadingRef = useRef<HTMLHeadingElement>(null)
  const storyContentRef = useRef<HTMLDivElement>(null)
  const storyImagesRef = useRef<HTMLImageElement[]>([])
  const moreThanServiceRef = useRef<HTMLDivElement>(null)
  const statsRefs = useRef<HTMLDivElement[]>([])
  const servicesHeadingRef = useRef<HTMLDivElement>(null)
  const servicesItemsRef = useRef<HTMLDivElement[]>([])
  const teamSectionRef = useRef<HTMLDivElement>(null)
  const teamHeadingRef = useRef<HTMLHeadingElement>(null)
  const teamMembersRef = useRef<HTMLDivElement[]>([])

  // Header initial animation
  useEffect(() => {
    if (headingRef.current) {
      gsap.set(headingRef.current, { opacity: 0, y: 60 })
      gsap.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.out'
      })
    }

    if (subheadingRef.current) {
      gsap.set(subheadingRef.current, { opacity: 0, y: 40 })
      gsap.to(subheadingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.6,
        ease: 'power2.out'
      })
    }

    if (boxesRef.current) {
      gsap.set(boxesRef.current, { opacity: 0, y: 80, scale: 0.9 })
      gsap.to(boxesRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        delay: 0.9,
        ease: 'power3.out'
      })
    }

    if (birdRef.current) {
      gsap.set(birdRef.current, { opacity: 0, scale: 0.8, rotation: -10 })
      gsap.to(birdRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.5,
        delay: 1.2,
        ease: 'power3.out'
      })
    }
  }, [])

  // Mission/Vision section scroll animation
  useEffect(() => {
    if (missionBoxRef.current && missionSectionRef.current) {
      gsap.set(missionBoxRef.current, { opacity: 0, x: -100, rotationY: -20 })
      gsap.to(missionBoxRef.current, {
        opacity: 1,
        x: 0,
        rotationY: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: missionSectionRef.current,
          start: 'top 70%',
          once: true
        }
      })
    }

    if (visionBoxRef.current && missionSectionRef.current) {
      gsap.set(visionBoxRef.current, { opacity: 0, x: 100, scale: 0.9 })
      gsap.to(visionBoxRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: missionSectionRef.current,
          start: 'top 70%',
          once: true
        }
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Testimonials staggered animation
  useEffect(() => {
    const testimonials = testimonialRefs.current.filter(Boolean)

    if (testimonials.length > 0) {
      testimonials.forEach((card, index) => {
        gsap.set(card, { opacity: 0, y: 80, scale: 0.9 })
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.15 * index,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: testimonials[0],
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

  // Our Story section animation
  useEffect(() => {
    if (storyHeadingRef.current) {
      gsap.set(storyHeadingRef.current, { opacity: 0, x: -80 })
      gsap.to(storyHeadingRef.current, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: storyHeadingRef.current,
          start: 'top 75%',
          once: true
        }
      })
    }

    if (storyContentRef.current) {
      const paragraphs = storyContentRef.current.querySelectorAll('p')
      paragraphs.forEach((p, index) => {
        gsap.set(p, { opacity: 0, y: 40 })
        gsap.to(p, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3 + (index * 0.15),
          ease: 'power2.out',
          scrollTrigger: {
            trigger: storyContentRef.current,
            start: 'top 75%',
            once: true
          }
        })
      })
    }

    const storyImages = storyImagesRef.current.filter(Boolean)
    if (storyImages.length > 0) {
      storyImages.forEach((img, index) => {
        gsap.set(img, { opacity: 0, scale: 0.85, y: 60 })
        gsap.to(img, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          delay: 0.2 * index,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: storyImages[0],
            start: 'top 80%',
            once: true
          }
        })
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // More than service section and stats animation
  useEffect(() => {
    if (moreThanServiceRef.current) {
      gsap.set(moreThanServiceRef.current, { opacity: 0, y: 50 })
      gsap.to(moreThanServiceRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: moreThanServiceRef.current,
          start: 'top 75%',
          once: true
        }
      })
    }

    const stats = statsRefs.current.filter(Boolean)
    if (stats.length > 0) {
      stats.forEach((stat, index) => {
        gsap.set(stat, { opacity: 0, scale: 0.8, y: 50 })
        gsap.to(stat, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          delay: 0.1 * index,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: stats[0],
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

  // Services section animation
  useEffect(() => {
    if (servicesHeadingRef.current) {
      gsap.set(servicesHeadingRef.current, { opacity: 0, y: 50 })
      gsap.to(servicesHeadingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: servicesHeadingRef.current,
          start: 'top 75%',
          once: true
        }
      })
    }

    const serviceItems = servicesItemsRef.current.filter(Boolean)
    if (serviceItems.length > 0) {
      serviceItems.forEach((item, index) => {
        gsap.set(item, { opacity: 0, x: -60 })
        gsap.to(item, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.1 * index,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: serviceItems[0],
            start: 'top 80%',
            once: true
          }
        })
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Team section animation
  useEffect(() => {
    if (teamHeadingRef.current) {
      gsap.set(teamHeadingRef.current, { opacity: 0, y: 60, scale: 0.95 })
      gsap.to(teamHeadingRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: teamSectionRef.current,
          start: 'top 70%',
          once: true
        }
      })
    }

    const teamMembers = teamMembersRef.current.filter(Boolean)
    if (teamMembers.length > 0) {
      teamMembers.forEach((member, index) => {
        gsap.set(member, { opacity: 0, y: 80, scale: 0.9 })
        gsap.to(member, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay: 0.15 * index,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: teamSectionRef.current,
            start: 'top 65%',
            once: true
          }
        })
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Scrolling text animation
  useEffect(() => {
    if (textRef.current) {
      gsap.to(textRef.current, {
        x: '-100%',
        duration: 10,
        ease: 'none',
        repeat: -1
      })
    }
  }, [])
  
  return (
    <div className="w-full overflow-x-hidden">
      <div>
        {/* heading */}
          <div className="bg-custom-bg w-full h-full
          px-4 sm:px-6 md:px-10 lg:px-16 xl:px-9 pt-6 sm:pt-8 md:pt-12 lg:pt-16 relative">
            <div className="flex flex-col w-full max-w-[1400px] mx-auto relative z-10">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-4 sm:gap-6 md:gap-8 lg:gap-12 ">
                <h1 ref={headingRef} className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light w-full lg:w-[60%] leading-tight">
                  We build <br /> technology that <br /> builds businesses
                </h1>
                <h3 ref={subheadingRef} className="text-white font-light text-xs sm:text-sm md:text-base lg:text-xl w-full lg:w-[35%] leading-relaxed ">
                  Whether you&apos;re rethinking IT infrastructure, building custom software, or scaling digital products we help you move with speed and confidence.
                </h3>
              </div>

              <div className="w-full relative aspect-[2/1] sm:aspect-[2.5/1] md:aspect-[3/1]">
                <Image ref={boxesRef} src="/Images/boxes.png" alt="Boxes" width={800} height={300} className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[120%] sm:w-[110%] md:w-full lg:w-full xl:w-full h-auto object-contain" />
                <Image ref={birdRef} src="/Images/orangeBird.png" alt="Orange Bird" width={900} height={500} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] h-auto z-20" />
              </div>
            </div>
          </div>

        {/* descp */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-4 sm:gap-6 md:gap-8 lg:gap-12 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-10 py-6 sm:py-8 md:py-12 lg:py-16  mx-auto ">
            <h2 className="text-[#000A1B]  text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium leading-tight w-full lg:w-[80%]">
              <span className="text-[#3B3B3D73]">Turning Bold Ideas</span> <br /> into Impactful <br /> Products
            </h2>
            <h3 className="text-[#000A1B]  text-lg sm:text-sm md:text-base lg:text-2xl lg:w-[25%] text-end">Our Mission / Vision</h3>
          </div>

        {/* vision boxes  */}
        <div ref={missionSectionRef} className="flex flex-col lg:flex-row gap-2 lg:gap-1 px-4 sm:px-4 md:px-8 lg:px-12 xl:px-14 pb-6 sm:pb-8 md:pb-12 lg:pb-2 mx-auto">
          {/* our blue */}
          <div ref={missionBoxRef} className="w-full lg:w-[37%] bg-gradient-to-br from-[#020B18] to-[#023362] rounded-lg p-4 sm:p-6 py-6 sm:py-7 text-white font-inter">
            <div className="mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">Our Mission</h3>
              <p className="text-sm sm:text-lg mb-4 sm:mb-6 leading-relaxed font-light">To empower businesses with technology that delivers measurable impact and long-term value.</p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">Our Vision</h3>
              <p className="text-sm sm:text-lg font-light leading-relaxed">A future where digital transformation is seamless, sustainable, and accessible to every business.</p>
            </div>

          </div>

          {/* vison black */}
          <div ref={visionBoxRef} className="w-full lg:w-[63%] relative rounded-lg overflow-hidden h-64 sm:h-80 lg:h-auto">
            <Image src="/Images/visonbackgroundblack.png" alt="Vision Background" width={600} height={200} className="w-full h-full object-cover" />
            <Image src="/Images/minibird.png" alt="Mini Bird" width={100} height={100} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 object-contain" />
            <p className="absolute bottom-4 sm:bottom-6 right-2 sm:right-4 text-white text-sm sm:text-xl font-inter font-light text-end opacity-42">From vision to velocity that&apos;s <br /> the Grobird way</p>
          </div>
          
        </div>
        
        {/* three boxes review  */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-1 px-4 sm:px-4 md:px-8 lg:px-12 xl:px-14 pb-6 sm:pb-8 md:pb-12 lg:pb-16 mx-auto">
          <div ref={el => { if (el) testimonialRefs.current[0] = el }} className="w-full md:w-1/3 h-auto md:h-80 bg-[#D3D3D347] rounded-lg p-4 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex gap-1 mb-4 sm:mb-7">
                <Image src="/Images/starblue.png" alt="Star" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
                <Image src="/Images/starblue.png" alt="Star" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
                <Image src="/Images/starblue.png" alt="Star" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
                <Image src="/Images/starblue.png" alt="Star" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
                <Image src="/Images/starblue.png" alt="Star" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              <p className="text-[#0B0B0B] text-sm sm:text-base font-medium leading-relaxed">Grobird turned our early-stage idea into a fully functional product within months. Their team felt like an extension of ours — fast, responsive, and genuinely invested in our success.</p>
            </div>
            <div className="mt-4">
              <p className="text-[#0B0B0B] text-sm sm:text-base font-semibold">Ankit Sharma</p>
              <p className="text-[#666666] text-xs">Founder, EdTech Startup</p>
            </div>
          </div>
          <div ref={el => { if (el) testimonialRefs.current[1] = el }} className="w-full md:w-1/3 h-auto md:h-80 bg-[#D3D3D347] rounded-lg p-4 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex gap-1 mb-4 sm:mb-7">
                <Image src="/Images/starblue.png" alt="Star" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
                <Image src="/Images/starblue.png" alt="Star" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
                <Image src="/Images/starblue.png" alt="Star" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
                <Image src="/Images/starblue.png" alt="Star" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
                <Image src="/Images/starblue.png" alt="Star" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              <p className="text-[#0B0B0B] text-sm sm:text-base font-medium leading-relaxed">What impressed us most was Grobird&apos;s ability to balance speed with quality. They helped us scale our platform without downtime, and their support didn&apos;t stop after launch.</p>
            </div>
            <div className="mt-4">
              <p className="text-[#0B0B0B] text-sm sm:text-base font-semibold">Ankit Sharma</p>
              <p className="text-[#666666] text-xs">Founder, EdTech Startup</p>
            </div>
          </div>
          <div ref={el => { if (el) testimonialRefs.current[2] = el }} className="w-full md:w-1/3 h-auto md:h-80 bg-[#D3D3D347] rounded-lg p-4 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex gap-1 mb-4 sm:mb-7">
                <Image src="/Images/starblue.png" alt="Star" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
                <Image src="/Images/starblue.png" alt="Star" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
                <Image src="/Images/starblue.png" alt="Star" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
                <Image src="/Images/starblue.png" alt="Star" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
                <Image src="/Images/starblue.png" alt="Star" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              <p className="text-[#0B0B0B] text-sm sm:text-base font-medium leading-relaxed">Partnering with Grobird gave us the confidence to dream bigger. Their expertise in product engineering and cloud solutions helped us grow faster than we imagined.</p>
            </div>
            <div className="mt-4">
              <p className="text-[#0B0B0B] text-sm sm:text-base font-semibold">Ankit Sharma</p>
              <p className="text-[#666666] text-xs">Founder, EdTech Startup</p>
            </div>
          </div>
        </div>

        {/* OUR STORY  */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-16 px-4 sm:px-4 md:px-8 lg:px-12 xl:px-14 pb-6 sm:pb-8 md:pb-12 lg:pb-2 mx-auto">
            <h2 ref={storyHeadingRef} className="text-[#000A1B] flex text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium leading-tight w-full lg:w-[30%]">
              <span className="text-[#3B3B3D73] mr-3">Our</span> <span className="text-[#000000]">Story</span>
            </h2>
            <div ref={storyContentRef} className="flex flex-col gap-6 sm:gap-8 w-full lg:w-[65%]">
              <p className="text-sm sm:text-base lg:text-xl">GroBird began with a simple belief — technology should not just solve problems, it should inspire growth. What started as a small team of passionate engineers and designers has now evolved into a full-scale digital partner trusted by businesses worldwide.</p>
              <p className="text-[#3D3D3DDB] text-sm sm:text-base lg:text-xl">Over the years, we&apos;ve delivered 100+ transformative projects, empowered 50+ global clients, and expanded our expertise across consulting, development, hosting, and design. But at the heart of every milestone lies one constant — our commitment to crafting human-centered solutions that create lasting impact.</p>
              <p className="text-[#3D3D3DDB] text-sm sm:text-base lg:text-xl">From our very first line of code to the innovative platforms we build today, GroBird has always been about more than technology. We are about people, ideas, and the journeys that shape them.</p>
            </div>
        </div>

          {/* our story boxes  */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-1 px-4 sm:px-3 md:px-4 lg:px-5 xl:px-8 pb-6 sm:py-6 md:py-9 lg:py-14 mx-auto items-center justify-center">
            <Image ref={el => { if (el) storyImagesRef.current[0] = el }} src="/Images/ourStory1.png" alt="Our Story 1" width={352} height={352} className="w-full sm:w-1/3 h-auto object-contain" />
            <Image ref={el => { if (el) storyImagesRef.current[1] = el }} src="/Images/ourStory2.png" alt="Our Story 2" width={352} height={352} className="w-full sm:w-1/3 h-auto object-contain" />
            <Image ref={el => { if (el) storyImagesRef.current[2] = el }} src="/Images/ourStory3.png" alt="Our Story 3" width={352} height={352} className="w-full sm:w-1/3 h-auto object-contain" />
          </div>

          {/* more than a service  */}
          <div ref={moreThanServiceRef} className="flex flex-col sm:flex-row gap-4 sm:gap-1 px-4 sm:px-5 md:px-7 lg:px-9 xl:px-12 pb-2 sm:pb-3 md:pb-4 lg:pb-6 mx-auto items-start sm:items-center justify-between pt-2">
            <h2 className="text-[#000A1B] flex flex-col text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium leading-tight w-full lg:w-[80%]">
              <span className="text-[#3B3B3D73]">More than a service</span>
               <span className="text-[#0B0B0B]">A strategic design </span>
               <span className="text-[#0B0B0B]">partner.</span>
            </h2>   
            <h3 className="text-[#000A1B] text-sm sm:text-base lg:text-2xl lg:w-[25%] text-start sm:text-end mt-1">Why Grobird?</h3>
          </div>
      
         {/* more than a servis boxes */}
         <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-2 px-4 sm:px-5 md:px-7 lg:px-9 xl:px-12 pb-2 sm:pb-3 md:pb-4 lg:pb-6 mx-auto pt-2">
            <Image ref={el => { if (el) statsRefs.current[0] = el }} src="/Images/morethanService.png" alt="More than Service" width={416} height={672} className="w-full md:row-span-2 h-auto object-contain" />
            <div ref={el => { if (el) statsRefs.current[1] = el }} className="bg-[#D3D3D347] rounded-lg flex flex-col justify-between p-6 sm:p-8 lg:p-10 items-start min-h-[120px]">
              <h3 className="flex text-3xl sm:text-4xl lg:text-5xl font-bold">10<span className="text-[#F95524]">x</span></h3>
              <p className="text-[#5A5A5A] text-xs sm:text-sm">Higher Client Retention</p>
            </div>
             <div ref={el => { if (el) statsRefs.current[2] = el }} className="bg-[#D3D3D347] rounded-lg flex flex-col justify-between p-6 sm:p-8 lg:p-10 items-start min-h-[120px]">
              <h3 className="flex text-3xl sm:text-4xl lg:text-5xl font-bold">200<span className="text-[#F95524]">+</span></h3>
              <p className="text-[#5A5A5A] text-xs sm:text-sm">Successfully delivered high-quality projects</p>
            </div>
            <div ref={el => { if (el) statsRefs.current[3] = el }} className="bg-[#D3D3D347] rounded-lg flex flex-col justify-between p-6 sm:p-8 lg:p-10 items-start min-h-[120px]">
              <h3 className="flex text-3xl sm:text-4xl lg:text-5xl font-bold">97<span className="text-[#F95524]">%</span></h3>
              <p className="text-[#5A5A5A] text-xs sm:text-sm">Client satisfaction based on surveys</p>
            </div>
            <div ref={el => { if (el) statsRefs.current[4] = el }} className="bg-[#D3D3D347] rounded-lg flex flex-col justify-between p-6 sm:p-8 lg:p-10 items-start min-h-[120px]">
              <h3 className="flex text-3xl sm:text-4xl lg:text-5xl font-bold">5<span className="text-[#F95524]">+</span></h3>
              <p className="text-[#5A5A5A] text-xs sm:text-sm">Continents Served</p>
            </div>
          </div>
         </div>

          {/* help  */}
          <div ref={servicesHeadingRef} className="flex flex-col sm:flex-row gap-4 sm:gap-1 px-4 sm:px-5 md:px-7 lg:px-9 xl:px-12 py-3 sm:py-5 md:py-8 lg:py-12 mx-auto items-start sm:items-center justify-between pt-2">
            <h2 className="text-[#000A1B] flex flex-col text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium leading-tight w-full lg:w-[80%]">
              <span className="text-[#3B3B3D73]">How We Help</span>
               <span className="text-[#0B0B0B]">Businesses Grow</span>
            </h2>   
            <h3 className="text-[#000A1B] text-sm sm:text-base lg:text-2xl lg:w-[25%] text-start sm:text-end mt-1">Services</h3>
          </div>

          {/* help points*/}
          <div className="w-full gap-1 px-4 sm:px-5 md:px-7 lg:px-9 xl:px-12 pb-3 sm:pb-5 md:pb-8 lg:pb-12 mx-auto flex flex-col pt-2">
            <div ref={el => { if (el) servicesItemsRef.current[0] = el }} className="flex flex-col lg:flex-row">
            <div className="border-y-1 border-y-[#dbdbdb] flex flex-row items-center gap-4 sm:gap-8 w-full lg:w-[60%] py-4 sm:py-7">
              <h3 className="text-[#C3C3C3]  sm:text-2xl lg:text-3xl">01.</h3>
              <h4 className="text-sm sm:text-base lg:text-lg font-medium">Custom Software Development</h4>
            </div>
            <p className="text-xs sm:text-sm mt-2 lg:mt-3 text-[#737373] w-full lg:w-[40%]">We design and build tailor-made software solutions that solve complex business challenges, improve efficiency</p>
            </div>
            <div ref={el => { if (el) servicesItemsRef.current[1] = el }} className="flex flex-col lg:flex-row">
            <div className="border-b-1 border-b-[#dbdbdb] flex flex-row items-center gap-4 sm:gap-8 w-full lg:w-[60%] py-4 sm:py-7">
              <h3 className="text-[#C3C3C3] sm:text-2xl lg:text-3xl">02.</h3>
              <h4 className="text-sm sm:text-base lg:text-lg font-medium">IT Consulting</h4>
            </div>
            <p className="text-xs sm:text-sm mt-2 lg:mt-3 text-[#737373] w-full lg:w-[40%]">Our experts guide you through technology strategy, digital transformation, and process optimization.</p>
            </div>
             <div ref={el => { if (el) servicesItemsRef.current[2] = el }} className="flex flex-col lg:flex-row">
            <div className="border-b-1 border-b-[#dbdbdb] flex flex-row items-center gap-4 sm:gap-8 w-full lg:w-[60%] py-4 sm:py-7">
              <h3 className="text-[#C3C3C3]  sm:text-2xl lg:text-3xl">03.</h3>
              <h4 className="text-sm sm:text-base lg:text-lg font-medium">Cloud & Infrastructure Services</h4>
            </div>
            <p className="text-xs sm:text-sm mt-2 lg:mt-3 text-[#737373] w-full lg:w-[40%]">From migration to management, we deliver scalable, secure, and cost-effective cloud infrastructure</p>
            </div>

             <div ref={el => { if (el) servicesItemsRef.current[3] = el }} className="flex flex-col lg:flex-row">
            <div className="flex flex-row items-center gap-4 sm:gap-8 w-full lg:w-[60%] py-4 sm:py-7">
              <h3 className="text-[#C3C3C3] text-lg sm:text-2xl lg:text-3xl">04.</h3>
              <h4 className="text-sm sm:text-base lg:text-lg font-medium">Product Engineering</h4>
            </div>
            <p className="text-xs sm:text-sm mt-2 lg:mt-3 text-[#737373] w-full lg:w-[40%]">End-to-end product design, development, and scaling from concept to launch so you can bring innovative ideas to market faster</p>
            </div>           
          </div>
          
          {/* Meet people */}
          <div ref={teamSectionRef} className="flex flex-col gap-8 px-4 sm:px-5 md:px-7 lg:px-9 xl:px-12 py-3 sm:py-5 md:py-8 lg:py-12 mx-auto item-center justify-center pt-2">
            <h2 ref={teamHeadingRef} className="text-[#000A1B] mb-5 text-center flex flex-col text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium leading-tight">
              <span className="text-[#3B3B3D73]">Meet the People</span>
               <span className="text-[#0B0B0B]">Behind Grobird</span>
            </h2>
            <div className="relative">
              <div className="block absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 sm:-translate-y-12 md:-translate-y-15 text-[#E0E0E094] text-2xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-[180px] font-semibold uppercase tracking-wider z-0 overflow-hidden w-screen">
                <div ref={textRef} className="whitespace-nowrap">
                  OUR TEAM OUR STORY OUR VISION OUR MISSION OUR TEAM OUR STORY OUR VISION OUR MISSION
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center relative z-10">
                <div ref={el => { if (el) teamMembersRef.current[0] = el }} className="flex flex-col items-center relative">
                  <Image src="/Images/people1.png" alt="Person 1" width={300} height={200} className="w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-cover rounded-lg" />

                  <div className="flex justify-between items-center w-60 sm:w-72 lg:w-80 mt-4">
                    <div>
                      <p className="text-[#0B0B0B] font-medium text-sm sm:text-base">Vaibhav Srivastava</p>
                      <p className="text-[#666666] text-xs sm:text-sm">Director</p>
                    </div>
                    <Image src="/Images/linkedin.png" alt="LinkedIn" width={12} height={12} className="w-3 h-3" />
                  </div>
                </div>
                <div ref={el => { if (el) teamMembersRef.current[1] = el }} className="flex flex-col items-center">
                  <Image src="/Images/people2.png" alt="Person 2" width={200} height={200} className="w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-cover rounded-lg" />
                  <div className="flex justify-between items-center w-60 sm:w-72 lg:w-80 mt-4">
                    <div>
                      <p className="text-[#0B0B0B] font-medium text-sm sm:text-base">Vaibhav Srivastava</p>
                      <p className="text-[#666666] text-xs sm:text-sm">Director</p>
                    </div>
                    <Image src="/Images/linkedin.png" alt="LinkedIn" width={12} height={12} className="w-3 h-3" />
                  </div>
                </div>
                <div ref={el => { if (el) teamMembersRef.current[2] = el }} className="flex flex-col items-center">
                  <Image src="/Images/people3.png" alt="Person 3" width={200} height={200} className="w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-cover rounded-lg" />
                  <div className="flex justify-between items-center w-60 sm:w-72 lg:w-80 mt-4">
                    <div>
                      <p className="text-[#0B0B0B] font-medium text-sm sm:text-base">Vaibhav Srivastava</p>
                      <p className="text-[#666666] text-xs sm:text-sm">Director</p>
                    </div>
                    <Image src="/Images/linkedin.png" alt="LinkedIn" width={12} height={12} className="w-3 h-3" />
                  </div>
                </div>
              </div>

            </div>
          </div>  

          {/* Insights */}
          <InsightsSection
            title="All"
            titleHighlight="Insights"
            buttonText="More articles"
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
                title: "The art of storytelling in branding and advertising",
                category: "Branding",
                date: "Mar 1, 2025",
                readTime: "8min read",
                imageAlt: "The art of storytelling in branding and advertising"
              },
              {
                imageSrc: "/Images/insights1.png",
                title: "The art of storytelling in branding and advertising",
                category: "Branding",
                date: "Mar 1, 2025",
                readTime: "8min read",
                imageAlt: "The art of storytelling in branding and advertising"
              }
            ]}
          />

          {/* Footer */}
          <Footer />
      </div>
  )
}

export default AboutUs