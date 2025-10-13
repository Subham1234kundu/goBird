'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const ITConsulting = () => {
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

        <div ref={headerContentRef} className="flex flex-col w-full max-w-[1400px] mx-auto relative z-10">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight mb-8 mt-16 w-full sm:w-[90%] md:w-[85%] lg:w-[76%]" style={{ fontWeight: 300 }}>
            IT Consulting
          </h1>
          <p className="text-white font-light text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl w-full sm:w-[80%] md:w-[75%] lg:w-[65%]  leading-relaxed mb-8" style={{ fontWeight: 300 }}>
              From strategy to execution, Grobird helps you make smarter technology decisions, modernize your IT landscape, and unlock long-term efficiency and scalability.
          </p>

          <button className="text-black w-[50%] md:w-[30%]  lg:w-[20%] bg-white rounded-full p-2 px-3 lg:mb-2 text-sm">Talk to an IT Expert</button>

        </div>
      </div>


      {/* why choose */}
      <div className="flex flex-col my-8 md:my-12 lg:my-16 xl:my-20 mx-[3%] md:mx-[4%] lg:mx-[5%] xl:mx-[3%] gap-6 md:gap-8 lg:gap-10 xl:gap-12">
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-[#3B3B3D73] mb-4 md:mb-6 lg:mb-8">
          <p className="whitespace-nowrap">Why Choose <span className="text-[#000A1B]">Grobird for</span></p>
          <p className="text-[#000A1B]">IT Consulting</p>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 md:gap-10 lg:gap-12 xl:gap-14 w-full">
          <div className="flex flex-col gap-8 md:gap-12 lg:gap-16 xl:gap-24 w-full lg:w-[50%] xl:w-[40%] flex-1">
            <p className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl">Our team combines deep technical expertise with a user-first mindset, ensuring solutions that are intuitive, scalable, and future-ready. With an agile and transparent process, you're always in the loop, from idea to launch and beyond.</p>

            <div className="border-b border-[#8F9096] pb-6 md:pb-8 lg:pb-10">
              <p className="p-3 md:p-4 pl-4 md:pl-5 lg:pl-7 text-base md:text-lg lg:text-xl bg-[#dfe1ed] font-semibold rounded-sm text-[#0F1011]">Business-Driven, Not Tech-Driven</p>
            </div>

            <p className="text-[#000A1B] text-lg md:text-xl lg:text-xl xl:text-2xl font-semibold border-b border-[#8F9096] pb-6 md:pb-8 lg:pb-10 xl:pb-12">Secure & Compliant</p>

            <p className="text-[#000A1B] font-semibold border-b border-[#8F9096] pb-6 md:pb-8 lg:pb-10 xl:pb-12 text-lg md:text-xl lg:text-xl xl:text-2xl">Scalable & Future-Ready</p>
          </div>

          <div className="flex w-full lg:w-[45%] xl:w-[40%] items-center justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative w-full sm:w-[350px] md:w-[380px] lg:w-[380px] xl:w-[425px] h-[500px] sm:h-[600px] md:h-[650px] lg:h-[500px] xl:h-[800px]">
              <Image
                src="/Images/serviseImages/servemore/itchoose.jpg"
                alt="IT Consulting"
                width={425}
                height={800}
                className="w-full h-full object-cover rounded-xl"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-black opacity-40 rounded-xl"></div>
              <div className="absolute top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2 z-10">
                <Image
                  src="/Images/serviseImages/servemore/bird.png"
                  alt="Bird"
                  width={350}
                  height={350}
                  className="w-[180px] sm:w-[220px] md:w-[260px] lg:w-[280px] xl:w-[321px] h-auto"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* we build  */}
      <div className="flex flex-col lg:flex-row px-[3%] py-8 lg:py-0 lg:justify-between lg:items-center min-h-[600px] sm:min-h-[700px] md:min-h-[800px] lg:h-[1000px] w-full bg-custom-bg gap-8 lg:gap-0">
        <div className="flex gap-6 sm:gap-8 md:gap-10 lg:gap-12 flex-col w-full lg:w-[40%]">
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">What We Build</p>
          <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl">At Grobird, we create software that adapts to the way your business works not the other way around. From sleek web applications and engaging mobile apps to enterprise platforms and SaaS products, our solutions are built to solve real problems and deliver measurable results.</p>
          <button className="bg-white text-black rounded-full px-5 sm:px-6 md:px-7 py-2 w-fit text-xs sm:text-sm font-medium hover:bg-gray-100 transition-colors">
            Let's Build Your
          </button>
        </div>

        {/* slider div */}
        <div className="w-full lg:w-[55%] h-[400px] sm:h-[500px] md:h-[600px] lg:h-[70%]">
          <div
            className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto h-full"
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

            {/* Image 1 */}
            <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-7 flex-shrink-0 w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] xl:w-[380px]">
              <div className="relative w-full h-full">
                <Image
                  src="/Images/serviseImages/serve/s1.jpg"
                  alt="Web Applications"
                  fill
                  className="object-cover rounded-xl"
                  quality={90}
                />
              </div>
              <p className="text-white text-xs sm:text-sm md:text-base lg:text-xl xl:text-3xl" style={{ fontWeight: 400 }}>
                Web Applications
              </p>
            </div>

            {/* Image 2 */}
            <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-7 flex-shrink-0 w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] xl:w-[380px]">
              <div className="relative w-full h-full">
                <Image
                  src="/Images/serviseImages/serve/s2.jpg"
                  alt="Mobile Apps"
                  fill
                  className="object-cover rounded-xl"
                  quality={90}
                />
              </div>
              <p className="text-white text-xs sm:text-sm md:text-base lg:text-xl xl:text-3xl" style={{ fontWeight: 400 }}>
                Mobile Apps
              </p>
            </div>

            {/* Image 3 */}
            <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-7 flex-shrink-0 w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] xl:w-[380px]">
              <div className="relative w-full h-full">
                <Image
                  src="/Images/serviseImages/serve/s3.jpg"
                  alt="Enterprise Platforms"
                  fill
                  className="object-cover rounded-xl"
                  quality={90}
                />
              </div>
              <p className="text-white text-xs sm:text-sm md:text-base lg:text-xl xl:text-3xl" style={{ fontWeight: 400 }}>
                Enterprise Platforms
              </p>
            </div>

            {/* Image 4 */}
            <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-7 flex-shrink-0 w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] xl:w-[380px]">
              <div className="relative w-full h-full">
                <Image
                  src="/Images/serviseImages/serve/s4.jpg"
                  alt="SaaS Products"
                  fill
                  className="object-cover rounded-xl"
                  quality={90}
                />
              </div>
              <p className="text-white text-xs sm:text-sm md:text-base lg:text-xl xl:text-3xl" style={{ fontWeight: 400 }}>
                SaaS Products
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* market context */}
      <div className="w-full px-[3%] sm:px-[2%] pt-12 sm:pt-16 md:pt-20 lg:pt-28 pb-12 sm:pb-14 md:pb-16 lg:pb-20">
        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl mb-6 sm:mb-8 md:mb-12 lg:mb-32 mx-[2%] sm:m-[1%]">
          <span className="text-[#3B3B3D73]">Market Context &</span><br />
          <span className="text-[#000A1B]">Opportunity</span>
        </p>

        {/* White box - above image on mobile/tablet, overlapping on desktop */}
        <div className="lg:hidden bg-white p-4 mb-6 w-full">
          <p className="text-base sm:text-lg text-[#2D2C2C] leading-relaxed">
            The global IT consulting market is booming having reached approximately USD 103.2 billion in 2023, it is projected to nearly double to USD 181.8 billion by 2028, growing at a compound annual growth rate of around 12.0% over that period.
          </p>
        </div>

        <div className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
          <Image
            src="/Images/serviseImages/servemore/market/m1.jpg"
            alt="market"
            fill
            className="object-cover"
          />

          {/* Black tint overlay */}
          <div className="absolute inset-0 bg-black opacity-40"></div>

          {/* Market Projection text overlay - responsive positioning */}
          <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 lg:top-28 left-4 sm:left-6 md:left-8 lg:left-16 z-10 flex flex-col font-light text-white">
            <p className="text-sm sm:text-base md:text-base">Market Projection</p>
            <p className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl">USD 181.8 billion</p>
            <p className="text-sm sm:text-sm text-right">by 2028</p>
          </div>

          {/* Text overlay container - desktop only */}
          <div className="hidden lg:block absolute top-0 right-0 w-[35%] xl:w-[30%] bg-white p-4 z-10 transform -translate-y-[70%]">
            <p className="text-xl xl:text-2xl text-[#2D2C2C] leading-relaxed">
              The global IT consulting market is booming having reached approximately USD 103.2 billion in 2023, it is projected to nearly double to USD 181.8 billion by 2028, growing at a compound annual growth rate of around 12.0% over that period.
            </p>
          </div>
        </div>

        {/* Measurable Outcomes section */}
        <div className="flex px-4 sm:px-6 md:px-8 flex-col lg:flex-row justify-between items-start gap-6 sm:gap-8 lg:gap-4 mt-16 lg:mt-24">
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="text-[#3B3B3D73]">Measurable</span><br className="lg:hidden" />
            <span className="text-[#000A1B]"> Outcomes</span>
          </p>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#2D2C2C] leading-relaxed lg:max-w-[50%] mt-0 sm:mt-4 lg:mt-52">
            We focus on outcomes like faster time-to-market, reduced operational costs, improved user engagement, and increased revenue.
          </p>
        </div>



      </div>


        {/* Statistics row */}
        <div className="w-full items-center justify-center px-[3%]">
        <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start gap-8 sm:gap-4 md:gap-6 mt-12 lg:mt-16">
          <div className="flex flex-col items-start w-full sm:w-[48%] md:w-[23%]">
            <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#000A1B]">
              40<span className="font-normal">%</span>
            </p>
            <p className="text-xs sm:text-sm md:text-base text-[#000A1B] mt-2">
              improvement in user engagement
            </p>
          </div>

          <div className="flex flex-col items-start w-full sm:w-[48%] md:w-[23%]">
            <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#FE4C00]">
              75<span className="font-normal">%</span>
            </p>
            <p className="text-xs sm:text-sm md:text-base text-[#000A1B] mt-2">
              reduction in manual processes
            </p>
          </div>

          <div className="flex flex-col items-start w-full sm:w-[48%] md:w-[23%]">
            <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#000A1B] flex items-center gap-1">
              3<span className="text-2xl sm:text-3xl md:text-3xl font-extrabold">X</span>
            </p>
            <p className="text-xs sm:text-sm md:text-base text-[#000A1B] mt-2">
              Faster development cycles
            </p>
          </div>

          <div className="flex flex-col items-start w-full sm:w-[48%] md:w-[23%]">
            <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#FE4C00]">
              50<span className="font-normal">%</span>
            </p>
            <p className="text-xs sm:text-sm md:text-base text-[#000A1B] mt-2">
              reduction in operational costs
            </p>
          </div>
        </div>
        </div>

        {/* two box */}
        <div className="flex flex-col md:flex-row px-[3%] gap-4 md:gap-6 items-center justify-center my-16 lg:my-24">
          {/* First box - 30% width on desktop, full width on mobile */}
          <div className="w-full md:w-[30%] h-[400px] sm:h-[450px] md:h-[500px] lg:h-[575px] relative">
            <Image
              src="/Images/serviseImages/servemore/twoBox/tb1.png"
              alt="IT Consulting Box 1"
              fill
              className="object-cover rounded-lg"
              unoptimized
            />
          </div>

          {/* Second box - 70% width on desktop, full width on mobile */}
          <div className="w-full md:w-[70%] h-[400px] sm:h-[450px] md:h-[500px] lg:h-[575px] relative">
            <Image
              src="/Images/serviseImages/servemore/twoBox/tb2.jpg"
              alt="IT Consulting Box 2"
              fill
              className="object-cover rounded-lg"
              unoptimized
            />
          </div>
        </div>

        {/* Industries We Serve section */}
        <div className="flex px-4 sm:px-6 md:px-8 flex-col lg:flex-row justify-between items-start gap-6 sm:gap-8 lg:gap-4 my-16 lg:my-24">
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="text-[#3B3B3D73]">Industries</span><br className="lg:hidden" />
            <span className="text-[#000A1B]"> We Serve</span>
          </p>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#2D2C2C] leading-relaxed lg:max-w-[50%] pt-0 sm:pt-4 lg:pt-24">
            Every industry has its own challenges, and at Grobird we tailor software to meet those unique needs. From building engaging e-learning platforms for education to creating secure fintech solutions, our expertise spans across multiple domains.
          </p>
        </div>

        {/* Industries Slider */}
        <div className="w-full px-[3%] mb-16 lg:mb-24">
          <div
            className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-6 overflow-x-auto h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px]"
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

            {/* Industry 1 */}
            <div className="relative flex-shrink-0 w-[280px] sm:w-[350px] md:w-[420px] lg:w-[525px] h-full">
              <Image
                src="/Images/serviseImages/serve/s1.jpg"
                alt="Education"
                fill
                className="object-cover rounded-2xl"
                quality={90}
              />
              <p className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-5 md:right-5 text-white text-lg sm:text-xl md:text-2xl lg:text-3xl" style={{ fontWeight: 400 }}>
                Education
              </p>
            </div>

            {/* Industry 2 */}
            <div className="relative flex-shrink-0 w-[280px] sm:w-[350px] md:w-[420px] lg:w-[525px] h-full">
              <Image
                src="/Images/serviseImages/serve/s2.jpg"
                alt="Fintech"
                fill
                className="object-cover rounded-2xl"
                quality={90}
              />
              <p className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-5 md:right-5 text-white text-lg sm:text-xl md:text-2xl lg:text-3xl" style={{ fontWeight: 400 }}>
                Fintech
              </p>
            </div>

            {/* Industry 3 */}
            <div className="relative flex-shrink-0 w-[280px] sm:w-[350px] md:w-[420px] lg:w-[525px] h-full">
              <Image
                src="/Images/serviseImages/serve/s3.jpg"
                alt="Healthcare"
                fill
                className="object-cover rounded-2xl"
                quality={90}
              />
              <p className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-5 md:right-5 text-white text-lg sm:text-xl md:text-2xl lg:text-3xl" style={{ fontWeight: 400 }}>
                Healthcare
              </p>
            </div>

            {/* Industry 4 */}
            <div className="relative flex-shrink-0 w-[280px] sm:w-[350px] md:w-[420px] lg:w-[525px] h-full">
              <Image
                src="/Images/serviseImages/serve/s4.jpg"
                alt="Retail & E-commerce"
                fill
                className="object-cover rounded-2xl"
                quality={90}
              />
              <p className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-5 md:right-5 text-white text-lg sm:text-xl md:text-2xl lg:text-3xl" style={{ fontWeight: 400 }}>
                Retail & E-commerce
              </p>
            </div>
          </div>
        </div>

        {/* Footer Image */}
        <div className="w-full h-[520px] relative">
          <Image
            src="/Images/serviseImages/servemore/footerImage1.png"
            alt="Footer Image"
            fill
            className="object-cover grayscale"
            quality={90}
            unoptimized
          />

          {/* Content overlay in the middle */}
          <div className="absolute inset-0 flex items-center justify-between px-6 sm:px-10 md:px-16 lg:px-24">
            {/* Left side content */}
            <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 w-[70%]">
              <div className="flex items-baseline ">
                <div>
                <p className="text-7xl sm:text-8xl md:text-8xl lg:text-[10rem] xl:text-[12rem]  text-white">3X</p>
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white">Faster</p>                  
                </div>

              <p className="text-sm sm:text-base md:text-lg lg:text-4xl w-full text-white  ">
                Let's turn your IT challenges <br /> into opportunities.
              </p>
            </div>

            {/* Right side content */}
            <div className="flex flex-col items-end gap-4 sm:gap-6 md:gap-8">
              <p className="text-2xl  text-white text-right">
                Future-Ready IT Starts <br /> Here
              </p>
              <button className="bg-white text-black rounded-full px-6 sm:px-8 md:px-20 py-2  text-sm sm:text-base  font-medium hover:bg-gray-100 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>


    </div>
  )
}

export default ITConsulting
