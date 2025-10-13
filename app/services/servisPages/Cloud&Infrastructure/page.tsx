'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const CloudInfrastructure = () => {
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
      <div className="bg-custom-bg w-full h-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-9 pt-6 sm:pt-8 md:pt-12 lg:pt-16 pb-16 relative flex items-center justify-center">
        {/* 9 boxes on the right side - #EDED4A gradient */}
        <div className="flex absolute right-0 top-0 h-full">
          <div ref={el => { if (el) headerBoxesRef.current[0] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #EDED4A 45%, #000A1B 100%)', opacity: 0.05 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[1] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #EDED4A 45%, #000A1B 100%)', opacity: 0.25 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[2] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #EDED4A 45%, #000A1B 100%)', opacity: 0.4 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[3] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #EDED4A 50%, #000A1B 100%)', opacity: 0.62 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[4] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #EDED4A 50%, #000A1B 100%)', opacity: 0.7 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[5] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #EDED4A 50%, #000A1B 100%)', opacity: 0.58 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[6] = el }} className="hidden sm:block h-full w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #EDED4A 45%, #000A1B 100%)', opacity: 0.4 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[7] = el }} className="hidden md:block h-full w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #EDED4A 45%, #000A1B 100%)', opacity: 0.3 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[8] = el }} className="hidden md:block h-full w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #EDED4A 45%, #000A1B 100%)', opacity: 0.2 }}></div>
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
            Cloud & Infrastructure
          </h1>
          <p className="text-white font-light text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl w-full sm:w-[80%] md:w-[75%] lg:w-[65%] leading-relaxed mb-8" style={{ fontWeight: 300 }}>
            Grobird helps businesses design, deploy, and manage cloud infrastructure that's secure, scalable, and cost-efficient enabling your teams to focus on innovation, not maintenance.
          </p>

          <button className="text-black w-[50%] md:w-[30%] lg:w-[25%] bg-white rounded-full p-2 px-3 lg:mb-2 text-sm">Talk to a Cloud Expert</button>
        </div>
      </div>

      {/* Overview Section */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8" style={{ fontWeight: 300 }}>
            Empower Your Business with Cloud Technology
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6">
            In today's digital world, cloud infrastructure is the backbone of agile, scalable businesses. At Grobird, we help you leverage the power of cloud computing to reduce costs, improve performance, and accelerate innovation.
          </p>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            From migration planning to ongoing management, our cloud experts ensure your infrastructure is optimized for performance, security, and cost-efficiency across AWS, Azure, Google Cloud, and more.
          </p>
        </div>
      </div>

      {/* Services List - 9 boxes with #EDED4A gradient and consistent height */}
      <div className="w-full bg-gray-50 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-12" style={{ fontWeight: 300 }}>
            Our Cloud Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div ref={el => { if (el) serviceBoxesRef.current[0] = el }} className="p-8 rounded-lg shadow-sm h-[280px] flex flex-col" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #EDED4A 100%)' }}>
              <h3 className="text-2xl font-medium mb-4">Cloud Migration</h3>
              <p className="text-gray-700 leading-relaxed">
                Seamlessly migrate your applications and data to the cloud with minimal downtime and maximum efficiency.
              </p>
            </div>
            <div ref={el => { if (el) serviceBoxesRef.current[1] = el }} className="p-8 rounded-lg shadow-sm h-[280px] flex flex-col" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #EDED4A 100%)' }}>
              <h3 className="text-2xl font-medium mb-4">Cloud Architecture Design</h3>
              <p className="text-gray-700 leading-relaxed">
                Design scalable, resilient cloud architectures tailored to your specific business requirements.
              </p>
            </div>
            <div ref={el => { if (el) serviceBoxesRef.current[2] = el }} className="p-8 rounded-lg shadow-sm h-[280px] flex flex-col" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #EDED4A 100%)' }}>
              <h3 className="text-2xl font-medium mb-4">Infrastructure as Code</h3>
              <p className="text-gray-700 leading-relaxed">
                Automate infrastructure provisioning and management with Terraform, CloudFormation, and other IaC tools.
              </p>
            </div>
            <div ref={el => { if (el) serviceBoxesRef.current[3] = el }} className="p-8 rounded-lg shadow-sm h-[280px] flex flex-col" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #EDED4A 100%)' }}>
              <h3 className="text-2xl font-medium mb-4">Container Orchestration</h3>
              <p className="text-gray-700 leading-relaxed">
                Deploy and manage containerized applications with Kubernetes, Docker, and other orchestration platforms.
              </p>
            </div>
            <div ref={el => { if (el) serviceBoxesRef.current[4] = el }} className="p-8 rounded-lg shadow-sm h-[280px] flex flex-col" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #EDED4A 100%)' }}>
              <h3 className="text-2xl font-medium mb-4">DevOps & CI/CD</h3>
              <p className="text-gray-700 leading-relaxed">
                Implement modern DevOps practices and automated CI/CD pipelines for faster, more reliable deployments.
              </p>
            </div>
            <div ref={el => { if (el) serviceBoxesRef.current[5] = el }} className="p-8 rounded-lg shadow-sm h-[280px] flex flex-col" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #EDED4A 100%)' }}>
              <h3 className="text-2xl font-medium mb-4">Cloud Security & Compliance</h3>
              <p className="text-gray-700 leading-relaxed">
                Protect your cloud infrastructure with enterprise-grade security measures and compliance frameworks.
              </p>
            </div>
            <div ref={el => { if (el) serviceBoxesRef.current[6] = el }} className="p-8 rounded-lg shadow-sm h-[280px] flex flex-col" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #EDED4A 100%)' }}>
              <h3 className="text-2xl font-medium mb-4">Cloud Cost Optimization</h3>
              <p className="text-gray-700 leading-relaxed">
                Reduce cloud spending while maintaining performance through intelligent resource management and optimization.
              </p>
            </div>
            <div ref={el => { if (el) serviceBoxesRef.current[7] = el }} className="p-8 rounded-lg shadow-sm h-[280px] flex flex-col" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #EDED4A 100%)' }}>
              <h3 className="text-2xl font-medium mb-4">Monitoring & Observability</h3>
              <p className="text-gray-700 leading-relaxed">
                Gain deep insights into your infrastructure with comprehensive monitoring, logging, and alerting solutions.
              </p>
            </div>
            <div ref={el => { if (el) serviceBoxesRef.current[8] = el }} className="p-8 rounded-lg shadow-sm h-[280px] flex flex-col" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #EDED4A 100%)' }}>
              <h3 className="text-2xl font-medium mb-4">Disaster Recovery</h3>
              <p className="text-gray-700 leading-relaxed">
                Ensure business continuity with robust backup, recovery, and failover strategies.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cloud Providers Section */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8" style={{ fontWeight: 300 }}>
            Cloud Platforms We Support
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-12">
            We have deep expertise across all major cloud providers, helping you choose and leverage the right platform for your needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-medium mb-4">Amazon Web Services (AWS)</h3>
              <p className="text-gray-700">EC2, S3, Lambda, RDS, ECS, EKS, and more</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-medium mb-4">Microsoft Azure</h3>
              <p className="text-gray-700">Virtual Machines, Azure Functions, AKS, Cosmos DB, and more</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-medium mb-4">Google Cloud Platform</h3>
              <p className="text-gray-700">Compute Engine, Cloud Functions, GKE, BigQuery, and more</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8" style={{ fontWeight: 300 }}>
            Ready to Move to the Cloud?
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Let's discuss how cloud infrastructure can transform your business operations and drive growth.
          </p>
          <button className="bg-[#FF662A] text-white px-8 py-3 rounded-sm hover:bg-[#E55A25] transition-colors">
            See Cloud Services
          </button>
        </div>
      </div>
    </div>
  )
}

export default CloudInfrastructure
