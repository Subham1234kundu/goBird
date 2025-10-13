'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const CustomSoftwareDevelopment = () => {
  const router = useRouter()
  const headerBoxesRef = useRef<HTMLDivElement[]>([])
  const headerBirdRef = useRef<HTMLDivElement>(null)
  const headerContentRef = useRef<HTMLDivElement>(null)
  const serviceBoxesRef = useRef<HTMLDivElement[]>([])

  // Header section initial animation - same as Services page
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
      const paragraphs = content.querySelectorAll('p')
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

      paragraphs.forEach((para, index) => {
        gsap.set(para, { opacity: 0, y: 40 })
        gsap.to(para, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 1.2 + (index * 0.2),
          ease: 'power2.out'
        })
      })

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

  // Service boxes scroll animation
  useEffect(() => {
    const boxes = serviceBoxesRef.current.filter(Boolean)

    if (boxes.length > 0) {
      boxes.forEach((box, index) => {
        gsap.set(box, { opacity: 0, y: 50, scale: 0.9 })
        gsap.to(box, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.1 * index,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: boxes[0],
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

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section - Same style as Services page */}
      <div className="bg-custom-bg w-full h-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-9 pt-6 sm:pt-8 md:pt-12 lg:pt-16 pb-16 relative">
        {/* 9 boxes on the right side - #93AAFC gradient */}
        <div className="flex absolute right-0 top-0 h-full">
          <div ref={el => { if (el) headerBoxesRef.current[0] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #93AAFC 40%, #000A1B 90%)', opacity: 0.05 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[1] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #93AAFC 40%, #000A1B 85%)', opacity: 0.25 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[2] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #93AAFC 40%, #000A1B 87%)', opacity: 0.4 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[3] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #93AAFC 40%, #000A1B 90%)', opacity: 0.62 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[4] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #93AAFC 40%, #000A1B 95%)', opacity: 0.7 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[5] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #93AAFC 40%, #000A1B 95%)', opacity: 0.58 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[6] = el }} className="hidden sm:block h-full w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #93AAFC 40%, #000A1B 95%)', opacity: 0.4 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[7] = el }} className="hidden md:block h-full w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #93AAFC 40%, #000A1B 90%)', opacity: 0.3 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[8] = el }} className="hidden md:block h-full w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #93AAFC 40%, #000A1B 85%)', opacity: 0.2 }}></div>
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

        <div ref={headerContentRef} className="flex flex-col w-full max-w-[1400px] mx-auto relative z-10">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight mb-8 mt-16 w-full sm:w-[90%] md:w-[85%] lg:w-[76%]" style={{ fontWeight: 300 }}>
            Custom Software Development
          </h1>
          <p className="text-white font-light text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl w-full sm:w-[80%] md:w-[75%] lg:w-[65%] leading-relaxed mb-8" style={{ fontWeight: 300 }}>
            At Grobird, we design and build tailored software solutions that solve your unique challenges. Whether you're launching a new product, modernizing legacy systems, or scaling your digital operations, we deliver technology that adapts to your vision.
          </p>

          <button className="text-black w-[50%] md:w-[30%] lg:w-[20%] bg-white rounded-full p-2 px-3 lg:mb-2 text-sm">Request a Proposal</button>
        </div>
      </div>

      {/* Overview Section */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8" style={{ fontWeight: 300 }}>
            Build Software That Works for You
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6">
            Every business is unique, and off-the-shelf solutions don't always fit. At Grobird, we specialize in building custom software that perfectly aligns with your workflows, processes, and goals.
          </p>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            From web applications to mobile apps, from enterprise systems to APIs, we deliver scalable, secure, and maintainable software solutions that drive real business value.
          </p>
        </div>
      </div>

      {/* Services List - 9 boxes with #93AAFC gradient and consistent height */}
      <div className="w-full bg-gray-50 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-12" style={{ fontWeight: 300 }}>
            Our Development Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div ref={el => { if (el) serviceBoxesRef.current[0] = el }} className="p-8 rounded-lg shadow-sm h-[280px] flex flex-col" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #93AAFC 100%)' }}>
              <h3 className="text-2xl font-medium mb-4">Web Application Development</h3>
              <p className="text-gray-700 leading-relaxed">
                Build responsive, scalable web applications using modern frameworks like React, Next.js, and Node.js.
              </p>
            </div>
            <div ref={el => { if (el) serviceBoxesRef.current[1] = el }} className="p-8 rounded-lg shadow-sm h-[280px] flex flex-col" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #93AAFC 100%)' }}>
              <h3 className="text-2xl font-medium mb-4">Mobile App Development</h3>
              <p className="text-gray-700 leading-relaxed">
                Create native and cross-platform mobile applications for iOS and Android with seamless user experiences.
              </p>
            </div>
            <div ref={el => { if (el) serviceBoxesRef.current[2] = el }} className="p-8 rounded-lg shadow-sm h-[280px] flex flex-col" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #93AAFC 100%)' }}>
              <h3 className="text-2xl font-medium mb-4">Enterprise Software Solutions</h3>
              <p className="text-gray-700 leading-relaxed">
                Develop robust enterprise systems that streamline operations and improve organizational efficiency.
              </p>
            </div>
            <div ref={el => { if (el) serviceBoxesRef.current[3] = el }} className="p-8 rounded-lg shadow-sm h-[280px] flex flex-col" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #93AAFC 100%)' }}>
              <h3 className="text-2xl font-medium mb-4">API Development & Integration</h3>
              <p className="text-gray-700 leading-relaxed">
                Build secure APIs and integrate third-party services to extend your software capabilities.
              </p>
            </div>
            <div ref={el => { if (el) serviceBoxesRef.current[4] = el }} className="p-8 rounded-lg shadow-sm h-[280px] flex flex-col" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #93AAFC 100%)' }}>
              <h3 className="text-2xl font-medium mb-4">Legacy System Modernization</h3>
              <p className="text-gray-700 leading-relaxed">
                Transform outdated systems into modern, maintainable solutions without disrupting business operations.
              </p>
            </div>
            <div ref={el => { if (el) serviceBoxesRef.current[5] = el }} className="p-8 rounded-lg shadow-sm h-[280px] flex flex-col" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #93AAFC 100%)' }}>
              <h3 className="text-2xl font-medium mb-4">SaaS Development</h3>
              <p className="text-gray-700 leading-relaxed">
                Build multi-tenant SaaS platforms with subscription management, billing, and analytics.
              </p>
            </div>
            <div ref={el => { if (el) serviceBoxesRef.current[6] = el }} className="p-8 rounded-lg shadow-sm h-[280px] flex flex-col" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #93AAFC 100%)' }}>
              <h3 className="text-2xl font-medium mb-4">E-Commerce Solutions</h3>
              <p className="text-gray-700 leading-relaxed">
                Create powerful online stores with payment processing, inventory management, and customer analytics.
              </p>
            </div>
            <div ref={el => { if (el) serviceBoxesRef.current[7] = el }} className="p-8 rounded-lg shadow-sm h-[280px] flex flex-col" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #93AAFC 100%)' }}>
              <h3 className="text-2xl font-medium mb-4">Custom CRM & ERP</h3>
              <p className="text-gray-700 leading-relaxed">
                Design tailored CRM and ERP systems that match your business processes and workflow requirements.
              </p>
            </div>
            <div ref={el => { if (el) serviceBoxesRef.current[8] = el }} className="p-8 rounded-lg shadow-sm h-[280px] flex flex-col" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #93AAFC 100%)' }}>
              <h3 className="text-2xl font-medium mb-4">DevOps & Automation</h3>
              <p className="text-gray-700 leading-relaxed">
                Streamline development workflows with CI/CD pipelines, automated testing, and infrastructure as code.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack Section */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8" style={{ fontWeight: 300 }}>
            Technologies We Work With
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-12">
            We leverage cutting-edge technologies and proven frameworks to deliver high-quality software solutions.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="bg-gray-50 p-4 rounded text-center">
              <p className="font-medium">React</p>
            </div>
            <div className="bg-gray-50 p-4 rounded text-center">
              <p className="font-medium">Next.js</p>
            </div>
            <div className="bg-gray-50 p-4 rounded text-center">
              <p className="font-medium">Node.js</p>
            </div>
            <div className="bg-gray-50 p-4 rounded text-center">
              <p className="font-medium">Python</p>
            </div>
            <div className="bg-gray-50 p-4 rounded text-center">
              <p className="font-medium">TypeScript</p>
            </div>
            <div className="bg-gray-50 p-4 rounded text-center">
              <p className="font-medium">PostgreSQL</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8" style={{ fontWeight: 300 }}>
            Let's Build Something Great Together
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Have a software project in mind? Let's discuss how we can bring your vision to life with custom-built solutions.
          </p>
          <button className="bg-[#FF662A] text-white px-8 py-3 rounded-sm hover:bg-[#E55A25] transition-colors">
            Request a Proposal
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomSoftwareDevelopment
