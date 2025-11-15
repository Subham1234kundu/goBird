'use client'

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRouter } from "next/navigation"
import WhyChooseSection from "@/app/components/service/WhyChooseSection"
import WeBuildSection from "@/app/components/service/WeBuildSection"
import MarketContextSection from "@/app/components/service/MarketContextSection"
import StatisticsRow from "@/app/components/service/StatisticsRow"
import TwoBoxSection from "@/app/components/service/TwoBoxSection"
import IndustriesWeServeSection from "@/app/components/service/IndustriesWeServeSection"
import ServiceFooter from "@/app/components/service/ServiceFooter"
import InsightsSection from "@/app/components/service/InsightsSection"
import FooterSimple from "@/app/components/FooterSimple"

gsap.registerPlugin(ScrollTrigger)

const ITConsulting = () => {
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
    }
  }, [])

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section - Same style as Services page */}
      <div className="bg-custom-bg w-full h-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-18 pt-14 md:pt-18 lg:pt-42 lg:pb-16 relative">
        {/* 9 boxes on the right side - same gradient as Services */}
        <div className="flex absolute right-0 top-0 h-full">
          <div ref={el => { if (el) headerBoxesRef.current[0] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #FFFFFF 40%, #000A1B 90%)', opacity: 0.05 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[1] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #FFFFFF 40%, #000A1B 85%)', opacity: 0.25 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[2] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #FFFFFF 40%, #000A1B 87%)', opacity: 0.4 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[3] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #FFFFFF 40%, #000A1B 90%)', opacity: 0.62 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[4] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #FFFFFF 40%, #000A1B 95%)', opacity: 0.64 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[5] = el }} className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #FFFFFF 40%, #000A1B 95%)', opacity: 0.58 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[6] = el }} className="hidden sm:block h-full w-[10vw] md:w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #FFFFFF 40%, #000A1B 95%)', opacity: 0.4 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[7] = el }} className="hidden md:block h-full w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #FFFFFF 40%, #000A1B 90%)', opacity: 0.3 }}></div>
          <div ref={el => { if (el) headerBoxesRef.current[8] = el }} className="hidden md:block h-full w-[8vw] lg:w-[7vw]" style={{ background: 'linear-gradient(to bottom, #FFFFFF 40%, #000A1B 85%)', opacity: 0.2 }}></div>
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
            IT Consulting
          </h1>
          <h3 className="text-white font-light text-base sm:text-base md:text-md lg:text-md xl:text-[30px] 2xl:text-2xl w-full sm:w-[90%] md:w-[85%] lg:w-[75%] leading-10">
            From strategy to execution, Grobird helps you make smarter technology decisions, modernize your IT landscape, and unlock long-term efficiency and scalability.
          </h3>

          <button onClick={() => router.push('/contact')} className="mt-12  bg-white border border-white rounded-full text-black text-xs sm:text-sm xl:text-[18px] px-8 sm:px-12 py-2 w-fit">Talk to an IT Expert</button>

        </div>
      </div>


      {/* Why Choose Section */}
      <WhyChooseSection
        title="Why Choose"
        titleHighlight="Grobird for"
        subtitle="IT Consulting"
        items={[
          {
            text: "Our team combines deep technical expertise with a user-first mindset, ensuring solutions that are intuitive, scalable, and future-ready. With an agile and transparent process, you're always in the loop, from idea to launch and beyond."
          },
          {
            text: "Business-Driven, Not Tech-Driven",
            highlighted: true
          },
          {
            text: "Secure & Compliant"
          },
          {
            text: "Scalable & Future-Ready"
          }
        ]}
        imageSrc="/Images/serviseImages/servemore/itchoose.jpg"
        imageAlt="IT Consulting"
        overlayImageSrc="/Images/serviseImages/servemore/bird.png"
        overlayImageAlt="Bird"
      />

      {/* We Build Section */}
      <WeBuildSection
        heading="What We Build"
        description="At Grobird, we create software that adapts to the way your business works not the other way around. From sleek web applications and engaging mobile apps to enterprise platforms and SaaS products, our solutions are built to solve real problems and deliver measurable results."
        buttonText="Let's Build Your"
        onButtonClick={() => router.push('/contact')}
        items={[
          {
            imageSrc: "/Images/serviseImages/serve/s1.jpg",
            title: "Web Applications"
          },
          {
            imageSrc: "/Images/serviseImages/serve/s2.jpg",
            title: "Mobile Apps"
          },
          {
            imageSrc: "/Images/serviseImages/serve/s3.jpg",
            title: "Enterprise Platforms"
          },
          {
            imageSrc: "/Images/serviseImages/serve/s4.jpg",
            title: "SaaS Products"
          }
        ]}
      />

      {/* Market Context Section */}
      <MarketContextSection
        title="Market Context &"
        titleHighlight="Opportunity"
        marketDescription="The global IT consulting market is booming having reached approximately USD 103.2 billion in 2023, it is projected to nearly double to USD 181.8 billion by 2028, growing at a compound annual growth rate of around 12.0% over that period."
        marketProjectionLabel="Market Projection"
        marketProjectionValue="USD 181.8 billion"
        marketProjectionYear="by 2028"
        imageSrc="/Images/serviseImages/servemore/market/m1.jpg"
        imageAlt="market"
        measurableTitle="Measurable"
        measurableTitleHighlight="Outcomes"
        measurableDescription="We focus on outcomes like faster time-to-market, reduced operational costs, improved user engagement, and increased revenue."
      />

      {/* Statistics Row */}
      <StatisticsRow
        statistics={[
          {
            value: 40,
            suffix: '%',
            color: 'text-[#000A1B]',
            description: 'improvement in user engagement'
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
            description: 'Faster development cycles'
          },
          {
            value: 50,
            suffix: '%',
            color: 'text-[#FE4C00]',
            description: 'reduction in operational costs'
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

      {/* Industries We Serve Section */}
      <IndustriesWeServeSection
        title="Industries"
        titleHighlight="We Serve"
        description="Every industry has its own challenges, and at Grobird we tailor software to meet those unique needs. From building engaging e-learning platforms for education to creating secure fintech solutions, our expertise spans across multiple domains."
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

      {/* Service Footer */}
      <ServiceFooter
        imageSrc="/Images/serviseImages/servemore/footerImage1.png"
        imageAlt="Footer Image"
        largeText="3X"
        smallText="Faster"
        description="Let's turn your IT challenges into opportunities."
        rightTitle="Future-Ready IT Starts\nHere"
        buttonText="Contact Us"
        onButtonClick={() => router.push('/contact')}
      />

      {/* Footer */}
      <FooterSimple />

    </div>
  )
}

export default ITConsulting
