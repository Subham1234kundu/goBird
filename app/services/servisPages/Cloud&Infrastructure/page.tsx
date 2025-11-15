'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import StatisticsRow from "@/app/components/service/StatisticsRow"
import DualTextSection from "@/app/components/service/DualTextSection"
import IndustriesWeServeSection from "@/app/components/service/IndustriesWeServeSection"
import MarketContextSection from "@/app/components/service/MarketContextSection"
import WeBuildSection from "@/app/components/service/WeBuildSection"
import WhyChooseSection from "@/app/components/service/WhyChooseSection"
import InsightsSection from "@/app/components/service/InsightsSection"
import FooterSimple from "@/app/components/FooterSimple"

gsap.registerPlugin(ScrollTrigger)

const CloudInfrastructure = () => {
  const router = useRouter()
  const headerBoxesRef = useRef<HTMLDivElement[]>([])
  const headerBirdRef = useRef<HTMLDivElement>(null)
  const headerContentRef = useRef<HTMLDivElement>(null)
  const serviceBoxesRef = useRef<HTMLDivElement[]>([])
  const footerSectionRef = useRef<HTMLDivElement>(null)
  const footerImageRef = useRef<HTMLDivElement>(null)
  const footerBirdRef = useRef<HTMLDivElement>(null)
  const footerContentRef = useRef<HTMLDivElement>(null)

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

  // Footer section scroll animation
  useEffect(() => {
    const section = footerSectionRef.current
    const image = footerImageRef.current
    const bird = footerBirdRef.current
    const content = footerContentRef.current

    if (section) {
      // Animate left image
      if (image) {
        gsap.set(image, { opacity: 0, x: -100, scale: 0.8 })
        gsap.to(image, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true
          }
        })
      }

      // Animate bird background
      if (bird) {
        gsap.set(bird, { opacity: 0, x: 100 })
        gsap.to(bird, {
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true
          }
        })
      }

      // Animate content
      if (content) {
        const heading = content.querySelector('h2')
        const button = content.querySelector('button')

        if (heading) {
          gsap.set(heading, { opacity: 0, y: 50 })
          gsap.to(heading, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              once: true
            }
          })
        }

        if (button) {
          gsap.set(button, { opacity: 0, scale: 0.8, y: 30 })
          gsap.to(button, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            delay: 0.6,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              once: true
            }
          })
        }
      }
    }
  }, [])

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section - Same style as Services page */}
      <div className="bg-custom-bg w-full h-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-18 pt-14 md:pt-18 lg:pt-44 lg:pb-16 relative">
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

        <div ref={headerContentRef} className="flex flex-col w-full max-w-[1400px] mx-auto relative z-10 pb-16">
          <h1 className="text-white text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-[82px] 2xl:text-7xl font-light leading-tight mb-8 lg:mb-12 w-full sm:w-[90%]" style={{ fontWeight: 300 }}>
            Cloud & Infrastructure
          </h1>
          <h3 className="text-white font-light text-base sm:text-base md:text-md lg:text-md xl:text-[30px] 2xl:text-2xl w-full sm:w-[90%] md:w-[85%] lg:w-[75%] leading-10">
            Grobird helps businesses design, deploy, and manage cloud infrastructure that&apos;s secure, scalable, and cost-efficient enabling your teams to focus on innovation, not maintenance.
          </h3>

          <button onClick={() => router.push('/contact')} className="mt-12 bg-white border border-white rounded-full text-black text-xs sm:text-sm xl:text-[18px] px-8 sm:px-12 py-2 w-fit">Talk to a Cloud Expert</button>
        </div>
      </div>

      {/* Why Choose Section */}
      <WhyChooseSection
        title="Why Choose"
        titleHighlight="Grobird for"
        subtitle="Cloud & Infrastructure"
        items={[
          {
            text: "Our team combines deep technical expertise with a user-first mindset, ensuring solutions that are intuitive, scalable, and future-ready. With an agile and transparent process, you’re always in the loop, from idea to launch and beyond."
          },
          {
            text: "Optimized for Performance & Cost",
            highlighted: true
          },
          {
            text: "Secure & Compliant",
            highlighted: false
          },
          {
            text: "Scalable & Future-Ready",
            highlighted: false
          },

        ]}
        imageSrc="/Images/serviseImages/servemore/productchoose.png"
        imageAlt="Cloud Infrastructure"
        overlayImageSrc="/Images/serviseImages/servemore/bird.png"
        overlayImageAlt="Service Bird"
      />

      {/* We Build Section */}
      <WeBuildSection
        heading="What We Build"
        description="At Grobird, we create software that adapts to the way your business works not the other way around. From sleek web applications and engaging mobile apps to enterprise platforms and SaaS products, our solutions are built to solve real problems and deliver measurable results."
        buttonText="Let’s Build Your"
        items={[
          {
            imageSrc: "/Images/serviseImages/servemore/offer/cloud/offer1.jpg",
            title: "Cloud Strategy & Migration"
          },
          {
            imageSrc: "/Images/serviseImages/servemore/offer/cloud/offer2.jpg",
            title: "DevOps & CI/CD"
          },
          {
            imageSrc: "/Images/serviseImages/enterprise.jpg",
            title: "Enterprise Systems"
          },
          {
            imageSrc: "/Images/serviseImages/saas.jpg",
            title: "SaaS Platforms"
          },
          {
            imageSrc: "/Images/serviseImages/ecommerce.jpg",
            title: "E-Commerce Solutions"
          }
        ]}
        onButtonClick={() => router.push('/contact')}
      />

      {/* Market Context Section */}
      <MarketContextSection
        title="Market Context &"
        titleHighlight="Opportunity"
        marketDescription="The global cloud computing market is experiencing rapid expansion, with projections indicating a surge from USD 752 billion in 2024 to over USD 2.39 trillion by 2030, reflecting a robust CAGR of 20.4%"
        marketProjectionLabel="Market Projection"
        marketProjectionValue="USD 2.39 trillion"
        marketProjectionYear=" by 2030"
        imageSrc="/Images/serviseImages/servemore/market/m3.png"
        imageAlt="Cloud Infrastructure Market"
        measurableTitle="Industries We"
        measurableTitleHighlight="Serve"
        measurableDescription="Every industry has its own challenges, and at Grobird we tailor software to meet those unique needs. From building engaging e-learning platforms for education to creating secure fintech solutions, our expertise spans across multiple domains."
      />


      {/* Industries We Serve Section */}
      <IndustriesWeServeSection
        title=""
        titleHighlight=""
        description=""
        industries={[
          {
            imageSrc: "/Images/serviseImages/serve/s1.jpg",
            name: "Education"
          },
          {
            imageSrc: "/Images/serviseImages/serve/s2.jpg",
            name: "Fintech"
          },
          {
            imageSrc: "/Images/serviseImages/serve/s3.jpg",
            name: "Healthcare"
          },
          {
            imageSrc: "/Images/serviseImages/serve/s4.jpg",
            name: "Retail & E-commerce"
          }
        ]}
      />

      {/* Dual Text Section */}
      <DualTextSection
        title="Measurable"
        titleHighlight="Outcomes"
        description="We focus on outcomes like faster time-to-market, reduced operational costs, improved user engagement, and increased revenue."
      />
      
      {/* Statistics Row */}
      <StatisticsRow
        statistics={[
          {
            value: 40,
            suffix: '%',
            color: 'text-[#000A1B]',
            description: 'ROI after cloud migration'
          },
          {
            value: 35,
            suffix: '%',
            color: 'text-[#FE4C00]',
            description: 'services cost savings'
          },
          {
            value: 5,
            suffix: 'X',
            color: 'text-[#000A1B]',
            description: 'Faster deployment'
          },
          {
            value: 50,
            suffix: '%',
            color: 'text-[#FE4C00]',
            description: 'reduction in operational costs'
          }
        ]}
      />


          {/* Insights */}
          <InsightsSection
            title="All"
            titleHighlight="Insights"
            buttonText="More articles"
            onButtonClick={() => router.push('/insights')}
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

      {/* custom section before footer  */}
      <div ref={footerSectionRef} className="w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between min-h-[450px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[650px] xl:h-[700px] relative overflow-hidden" style={{ backgroundColor: '#FAFAFA' }}>
        {/* Bird Footer Image - Right Side */}
        <div ref={footerBirdRef} className="absolute right-0 inset-y-0 w-full opacity-30 sm:opacity-50 md:opacity-70 lg:opacity-100 sm:w-3/4 md:w-2/3 lg:w-1/2 h-full">
          <Image
            src="/Images/serviseImages/servemore/footer/birdFoot.png"
            alt="Bird Footer Background"
            fill
            className="object-contain object-right"
            priority
          />
        </div>

        {/* Left Box with f3 Image */}
        <div ref={footerImageRef} className="w-full lg:w-[45%] xl:w-[40%] flex items-center justify-center py-6 sm:py-8 md:py-10 lg:py-0 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0 relative z-10">
          <div className="relative w-full max-w-[220px] sm:max-w-[300px] md:max-w-[380px] lg:max-w-[450px] xl:max-w-[500px] h-[200px] sm:h-[270px] md:h-[340px] lg:h-[400px] xl:h-[450px]">
            <Image
              src="/Images/serviseImages/servemore/footer/f3.png"
              alt="Cloud Services"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Right Content */}
        <div ref={footerContentRef} className="w-full lg:w-[55%] xl:w-[60%] flex flex-col items-center lg:items-start justify-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-6 sm:py-8 md:py-10 lg:py-8 relative z-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-center lg:text-left mb-5 sm:mb-6 md:mb-7 lg:mb-8 leading-snug sm:leading-tight max-w-[90%] sm:max-w-full">
            Seamless, Secure, and <br className="hidden sm:block" />Scalable Cloud Tailored for <br className="hidden sm:block" /> Your Business
          </h2>
          <button onClick={() => router.push('/contact')} className="bg-[#FF662A] text-white px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium hover:opacity-90 transition-opacity">
            Talk to Our Cloud Experts
          </button>
        </div>
      </div>

      {/* Footer */}
      <FooterSimple />

    </div>
  )
}

export default CloudInfrastructure
