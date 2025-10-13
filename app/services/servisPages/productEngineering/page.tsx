'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const ProductEngineering = () => {
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
        {/* 9 boxes on the right side - #FF662AA8 gradient */}
        <div className="flex absolute right-0 top-0 h-full">
          <div ref={el => { if (el) headerBoxesRef.current[0] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #FF662AA8 40%, #000A1B 90%)', opacity: 0.05 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[1] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #FF662AA8 40%, #000A1B 85%)', opacity: 0.25 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[2] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #FF662AA8 40%, #000A1B 87%)', opacity: 0.4 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[3] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #FF662AA8 40%, #000A1B 90%)', opacity: 0.62 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[4] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #FF662AA8 40%, #000A1B 95%)', opacity: 0.7 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[5] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #FF662AA8 40%, #000A1B 95%)', opacity: 0.58 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[6] = el }} className="hidden sm:block h-full w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #FF662AA8 40%, #000A1B 95%)', opacity: 0.4 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[7] = el }} className="hidden md:block h-full w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #FF662AA8 40%, #000A1B 90%)', opacity: 0.3 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[8] = el }} className="hidden md:block h-full w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #FF662AA8 40%, #000A1B 85%)', opacity: 0.2 }}></div>
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
            Product Engineering
          </h1>
          <p className="text-white font-light text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl w-full sm:w-[80%] md:w-[75%] lg:w-[65%] leading-relaxed mb-8" style={{ fontWeight: 300 }}>
            Grobird helps businesses turn concepts into fully engineered products from design and development to testing and deployment.
          </p>

          <button className="text-black w-[50%] md:w-[35%] lg:w-[25%] bg-white rounded-full p-2 px-3 lg:mb-2 text-sm">Build Your Product with Us</button>
        </div>
      </div>

      {/* Overview Section */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8" style={{ fontWeight: 300 }}>
            Engineering Products That Scale
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6">
            Great products require more than just great code. At Grobird, we combine technical excellence with user-centered design, agile methodologies, and data-driven insights to build digital products that solve real problems and delight users.
          </p>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            Whether you're launching a new product, scaling an existing one, or pivoting to meet market demands, our product engineering team brings the expertise and experience to turn your vision into reality.
          </p>
        </div>
      </div>

      {/* Services List - 9 boxes with #FF662AA8 gradient and consistent height */}
      <div className="w-full bg-gray-50 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-12" style={{ fontWeight: 300 }}>
            Our Product Engineering Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div ref={el => { if (el) serviceBoxesRef.current[0] = el }} className="p-8 rounded-lg shadow-sm h-[280px] flex flex-col" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #FF662AA8 100%)' }}>
              <h3 className="text-2xl font-medium mb-4">Product Strategy & Discovery</h3>
              <p className="text-gray-700 leading-relaxed">
                Define your product vision, validate market fit, and create a roadmap for success through research and analysis.
              </p>
            </div>
            <div ref={el => { if (el) serviceBoxesRef.current[1] = el }} className="p-8 rounded-lg shadow-sm h-[280px] flex flex-col" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #FF662AA8 100%)' }}>
              <h3 className="text-2xl font-medium mb-4">UI/UX Design</h3>
              <p className="text-gray-700 leading-relaxed">
                Create intuitive, beautiful interfaces that provide exceptional user experiences and drive engagement.
              </p>
            </div>
            <div ref={el => { if (el) serviceBoxesRef.current[2] = el }} className="p-8 rounded-lg shadow-sm h-[280px] flex flex-col" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #FF662AA8 100%)' }}>
              <h3 className="text-2xl font-medium mb-4">MVP Development</h3>
              <p className="text-gray-700 leading-relaxed">
                Rapidly build and launch minimum viable products to test your ideas and gather user feedback.
              </p>
            </div>
            <div ref={el => { if (el) serviceBoxesRef.current[3] = el }} className="p-8 rounded-lg shadow-sm h-[280px] flex flex-col" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #FF662AA8 100%)' }}>
              <h3 className="text-2xl font-medium mb-4">Full-Stack Product Development</h3>
              <p className="text-gray-700 leading-relaxed">
                Build complete, production-ready products with scalable architecture and modern technology stacks.
              </p>
            </div>
            <div ref={el => { if (el) serviceBoxesRef.current[4] = el }} className="p-8 rounded-lg shadow-sm h-[280px] flex flex-col" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #FF662AA8 100%)' }}>
              <h3 className="text-2xl font-medium mb-4">Product Scaling & Optimization</h3>
              <p className="text-gray-700 leading-relaxed">
                Optimize performance, improve infrastructure, and scale your product to handle growing user demands.
              </p>
            </div>
            <div ref={el => { if (el) serviceBoxesRef.current[5] = el }} className="p-8 rounded-lg shadow-sm h-[280px] flex flex-col" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #FF662AA8 100%)' }}>
              <h3 className="text-2xl font-medium mb-4">Analytics & Insights</h3>
              <p className="text-gray-700 leading-relaxed">
                Implement analytics frameworks to track user behavior, measure KPIs, and drive data-informed decisions.
              </p>
            </div>
            <div ref={el => { if (el) serviceBoxesRef.current[6] = el }} className="p-8 rounded-lg shadow-sm h-[280px] flex flex-col" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #FF662AA8 100%)' }}>
              <h3 className="text-2xl font-medium mb-4">Product Maintenance & Support</h3>
              <p className="text-gray-700 leading-relaxed">
                Provide ongoing maintenance, bug fixes, and feature enhancements to keep your product running smoothly.
              </p>
            </div>
            <div ref={el => { if (el) serviceBoxesRef.current[7] = el }} className="p-8 rounded-lg shadow-sm h-[280px] flex flex-col" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #FF662AA8 100%)' }}>
              <h3 className="text-2xl font-medium mb-4">Quality Assurance & Testing</h3>
              <p className="text-gray-700 leading-relaxed">
                Ensure product quality with comprehensive testing strategies, automated tests, and continuous integration.
              </p>
            </div>
            <div ref={el => { if (el) serviceBoxesRef.current[8] = el }} className="p-8 rounded-lg shadow-sm h-[280px] flex flex-col" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #FF662AA8 100%)' }}>
              <h3 className="text-2xl font-medium mb-4">Product Modernization</h3>
              <p className="text-gray-700 leading-relaxed">
                Refresh and modernize existing products with new features, improved UX, and updated technology.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8" style={{ fontWeight: 300 }}>
            Our Product Development Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div>
              <div className="bg-[#FF662A] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-medium mb-3">Discovery</h3>
              <p className="text-gray-700">Research, ideation, and validation to define product requirements and goals.</p>
            </div>
            <div>
              <div className="bg-[#FF662A] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-medium mb-3">Design</h3>
              <p className="text-gray-700">Create wireframes, prototypes, and high-fidelity designs focused on user experience.</p>
            </div>
            <div>
              <div className="bg-[#FF662A] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-medium mb-3">Development</h3>
              <p className="text-gray-700">Build the product using agile methodologies with continuous feedback and iteration.</p>
            </div>
            <div>
              <div className="bg-[#FF662A] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                4
              </div>
              <h3 className="text-xl font-medium mb-3">Launch & Iterate</h3>
              <p className="text-gray-700">Deploy to production, gather user feedback, and continuously improve the product.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8" style={{ fontWeight: 300 }}>
            Let's Build Your Next Product
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Ready to bring your product idea to life? Let's discuss how we can help you build, launch, and scale a successful digital product.
          </p>
          <button className="bg-[#FF662A] text-white px-8 py-3 rounded-sm hover:bg-[#E55A25] transition-colors">
            Explore Product Engineering
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductEngineering
