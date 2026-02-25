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

const ProductEngineering = () => {
  const router = useRouter()
  const headerBoxesRef = useRef<HTMLDivElement[]>([])
  const headerBirdRef = useRef<HTMLDivElement>(null)
  const headerContentRef = useRef<HTMLDivElement>(null)
  const serviceBoxesRef = useRef<HTMLDivElement[]>([])
  const customSectionRef = useRef<HTMLDivElement>(null)
  const customTextRef = useRef<HTMLDivElement>(null)
  const customImageRef = useRef<HTMLDivElement>(null)

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

  // Custom section animation
  useEffect(() => {
    if (customTextRef.current && customSectionRef.current) {
      gsap.set(customTextRef.current, { opacity: 0, x: -80 })
      gsap.to(customTextRef.current, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: customSectionRef.current,
          start: 'top 70%',
          once: true
        }
      })
    }

    if (customImageRef.current && customSectionRef.current) {
      gsap.set(customImageRef.current, { opacity: 0, x: 100, scale: 0.9 })
      gsap.to(customImageRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: customSectionRef.current,
          start: 'top 70%',
          once: true
        }
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section - Same style as Services page */}
      <div className="bg-custom-bg w-full h-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-18 pt-14 md:pt-18 lg:pt-42 lg:pb-16 relative">
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

        <div ref={headerContentRef} className="flex flex-col w-full max-w-[1400px] mx-auto relative z-10 pb-16">
          <style jsx>{`
            @media (max-width: 639px) {
              .product-engineering-title {
                /* Product Engineering */
                width: 336px !important;
                height: 85px !important;
                font-family: 'Geist', sans-serif !important;
                font-style: normal !important;
                font-weight: 200 !important;
                font-size: 42px !important;
                line-height: 55px !important;
                /* leading-trim and text-edge are draft CSS properties */
                color: #FFFFFF !important;
                
                /* Adapted 'display: flex' from Figma to block so <br/> works cleanly for text */
                display: block !important;
                
                /* Inside auto layout */
                flex: none !important;
                order: 0 !important;
                flex-grow: 0 !important;
              }
            }
          `}</style>
          <h1 className="product-engineering-title text-white text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-[82px] 2xl:text-7xl font-light leading-tight mb-8 lg:mb-12 w-full sm:w-[90%]" style={{ fontWeight: 300 }}>
            Product <br className="block sm:hidden" /> Engineering
          </h1>
          <h3 className="text-white font-light text-base sm:text-base md:text-md lg:text-md xl:text-[30px] 2xl:text-2xl w-full sm:w-[90%] md:w-[85%] lg:w-[75%] leading-[25px] sm:leading-10">
            Grobird helps businesses turn concepts into fully engineered products from design and development to testing and deployment.
          </h3>

          <button onClick={() => router.push('/contact')} className="mt-12 bg-white border border-white rounded-full text-black text-xs sm:text-sm xl:text-[18px] px-8 sm:px-12 py-2 w-fit">Build Your Product with Us</button>
        </div>
      </div>

      {/* Why Choose Section */}
      <WhyChooseSection
        title="Why Choose"
        titleHighlight="Grobird"
        subtitle="for Product Engineering"
        items={[
          {
            text: "Our team combines deep technical expertise with a user-first mindset, ensuring solutions that are intuitive, scalable, and future-ready. With an agile and transparent process, you’re always in the loop, from idea to launch and beyond."
          },
          {
            text: "End-to-End Product Development",
            highlighted: true
          },
          {
            text: "User-Centric Design",
            highlighted: false
          },
          {
            text: "Agile & Iterative Process",
            highlighted: false
          },

        ]}
        imageSrc="/Images/serviseImages/PE/choose.png"
        imageAlt="Product Engineering"
        overlayImageSrc="/Images/serviseImages/servemore/bird.png"
        overlayImageAlt="Service Bird"
      />

      {/* We Build Section */}
      <WeBuildSection
        heading="What We Build"
        description="At Grobird, we create software that adapts to the way your business works not the other way around. From sleek web applications and engaging mobile apps to enterprise platforms and SaaS products, our solutions are built to solve real problems and deliver measurable results."
        buttonText="Let’s Build Your"
        variant="it-consulting"
        items={[
          {
            imageSrc: "/Images/serviseImages/servemore/offer/PE/offer1.jpg",
            title: "UI/UX Design & Prototyping"
          },
          {
            imageSrc: "/Images/serviseImages/servemore/offer/PE/offer2.jpg",
            title: "Architecture & System Design"
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
        marketDescription="The global IT Product Engineering Services market is experiencing robust growth, projected to expand from approximately USD 1.26 trillion in 2024 to USD 1.81 trillion by 2030"
        marketProjectionLabel="Market Projection"
        marketProjectionValue="USD 1.81 trillion"
        marketProjectionYear=" by 2030"
        imageSrc="/Images/serviseImages/servemore/market/m4.jpg"
        imageAlt="Product Engineering Market"
        measurableTitle="Industries We"
        measurableTitleHighlight="Serve"
        measurableDescription="Grobird brings deep expertise across multiple industries, tailoring product engineering solutions to each sector’s unique challenges. From building interactive e-learning platforms for education to developing secure fintech applications, our team delivers products that drive efficiency, engagement, and growth."
      />


      {/* Industries We Serve Section */}
      <IndustriesWeServeSection
        title=""
        titleHighlight=""
        description=""
        mobileLayout="stack"
        autoScroll={false}
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
        description="With Grobird’s product engineering services, your ideas are converted into high-quality, scalable products that drive results."
      />

      {/* Statistics Row */}
      <StatisticsRow
        textAlign="center"
        statistics={[
          {
            value: 40,
            suffix: '%',
            color: 'text-[#000A1B]',
            description: 'operational cost reduction'
          },
          {
            value: 25,
            suffix: '%',
            color: 'text-[#FE4C00]',
            description: 'reduction in manual processes'
          },
          {
            value: 5,
            suffix: 'X',
            color: 'text-[#000A1B]',
            description: 'faster development cycles'
          },
          {
            value: 40,
            suffix: '%',
            color: 'text-[#FE4C00]',
            description: 'Measurable ROI '
          }
        ]}
      />

      {/* Insights Section */}
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

      {/* Custom Section Before Footer*/}
      <div ref={customSectionRef} className="w-full flex flex-col lg:flex-row items-center mt-10 sm:mt-16 lg:mt-20 mb-10 justify-between min-h-[400px] sm:min-h-[500px] lg:h-[600px]" style={{ backgroundColor: '#F5F9FE' }}>
        <div ref={customTextRef} className="flex flex-col gap-4 sm:gap-6 w-full lg:w-[40%] px-6 sm:px-10 md:px-16 lg:ml-2 py-8 lg:py-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-black">
            Accelerating Time-to-Market by 50% with Scalable Engineering
          </h2>
          <button onClick={() => router.push('/contact')} className="bg-black text-white rounded-full px-6 sm:px-8 py-2.5 sm:py-3 w-fit text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors">
            Connect Now!
          </button>
        </div>
        <div ref={customImageRef} className="w-full lg:w-[60%] h-[300px] sm:h-[400px] lg:h-full relative">
          <Image
            src="/Images/serviseImages/servemore/footer/f4.png"
            alt="Engineering"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Footer */}
      <FooterSimple />

    </div>
  )
}

export default ProductEngineering
