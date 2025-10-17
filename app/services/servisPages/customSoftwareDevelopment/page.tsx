'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import WhyChooseSection from "@/app/components/service/WhyChooseSection"
import WeBuildSection from "@/app/components/service/WeBuildSection"
import MarketContextSection from "@/app/components/service/MarketContextSection"
import IndustriesWeServeSection from "@/app/components/service/IndustriesWeServeSection"
import TwoBoxSection from "@/app/components/service/TwoBoxSection"
import StatisticsRow from "@/app/components/service/StatisticsRow"
import DualTextSection from "@/app/components/service/DualTextSection"
import InsightsSection from "@/app/components/service/InsightsSection"
import FooterSimple from "@/app/components/FooterSimple"

gsap.registerPlugin(ScrollTrigger)

const CustomSoftwareDevelopment = () => {
  const router = useRouter()
  const headerBoxesRef = useRef<HTMLDivElement[]>([])
  const headerBirdRef = useRef<HTMLDivElement>(null)
  const headerContentRef = useRef<HTMLDivElement>(null)

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

      {/* Why Choose Section */}
      <WhyChooseSection
        title="Why Choose"
        titleHighlight=""
        subtitle="Grobird"
        items={[
          {
            text: "Our team combines deep technical expertise with a user-first mindset, ensuring solutions that are intuitive, scalable, and future-ready. With an agile and transparent process, you’re always in the loop, from idea to launch and beyond."
          },
          {
            text: "Built Around You, Not Templates",
            highlighted: true
          },
          {
            text: "Scalable by Design",
            highlighted: false
          },
          {
            text: "Agile & Transparent",
            highlighted: false
          },

        ]}
        imageSrc="/Images/serviseImages/customSoftware.jpg"
        imageAlt="Custom Software Development"
        overlayImageSrc="/Images/serviseImages/seviseBird.png"
        overlayImageAlt="Grobird Logo"
      />

      {/* We Build Section */}
      <WeBuildSection
        heading="What We Build"
        description="At Grobird, we create software that adapts to the way your business works not the other way around. From sleek web applications and engaging mobile apps to enterprise platforms and SaaS products, our solutions are built to solve real problems and deliver measurable results."
        buttonText="Let’s Build Your"
        items={[
          {
            imageSrc: "/Images/serviseImages/webApp.jpg",
            title: "Web Applications"
          },
          {
            imageSrc: "/Images/serviseImages/mobileApp.jpg",
            title: "Mobile Applications"
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
        onButtonClick={() => router.push('/portfolio')}
      />

      {/* Market Context Section */}
      <MarketContextSection
        title="Market Context &"
        titleHighlight="Opportunity"
        marketDescription="The global custom software development market is experiencing explosive growth, valued at $53.02 billion in 2025 and projected to reach $334.49 billion by 2034 at a 22.71% CAGR. This growth is driven by digital transformation initiatives, AI integration, and the need for tailored solutions"
        marketProjectionLabel="Market Projection"
        marketProjectionValue="$334.49 billion"
        marketProjectionYear=" by 2034"
        imageSrc="/Images/serviseImages/market.jpg"
        imageAlt="Custom Software Market"
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
            value: 50,
            suffix: '%',
            color: 'text-[#000A1B]',
            description: 'operational cost reduction'
          },
          {
            value: 75,
            suffix: '%',
            color: 'text-[#FE4C00]',
            description: 'reduction in manual processes'
          },
          {
            value: 3,
            suffix: 'X',
            color: 'text-[#000A1B]',
            description: 'faster development cycles'
          },
          {
            value: 6,
            suffix: ' mon',
            color: 'text-[#FE4C00]',
            description: 'Measurable ROI '
          }
        ]}
      />


      {/* Two Box Section */}
      <TwoBoxSection
        leftImageSrc="/Images/serviseImages/servemore/twoBox/tb1.png"
        leftImageAlt="IT Consulting Box 1"
        rightImageSrc="/Images/serviseImages/servemore/twoBox/tb2.jpg"
        rightImageAlt="IT Consulting Box 2"
      />

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
      <FooterSimple />

    </div>
  )
}

export default CustomSoftwareDevelopment
