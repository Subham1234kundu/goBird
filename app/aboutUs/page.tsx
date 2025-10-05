"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const AboutUs = () => {
  const textRef = useRef<HTMLDivElement>(null)
  
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
                <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light w-full lg:w-[60%] leading-tight">
                  We build <br /> technology that <br /> builds businesses
                </h1>
                <h3 className="text-white font-light text-xs sm:text-sm md:text-base lg:text-xl w-full lg:w-[35%] leading-relaxed ">
                  Whether you're rethinking IT infrastructure, building custom software, or scaling digital products we help you move with speed and confidence.
                </h3>
              </div>

              <div className="w-full relative aspect-[2/1] sm:aspect-[2.5/1] md:aspect-[3/1]">
                <Image src="/Images/boxes.png" alt="Boxes" width={800} height={300} className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[120%] sm:w-[110%] md:w-full lg:w-full xl:w-full h-auto object-contain" />
                <Image src="/Images/orangeBird.png" alt="Orange Bird" width={900} height={500} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] h-auto z-20" />
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
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-1 px-4 sm:px-4 md:px-8 lg:px-12 xl:px-14 pb-6 sm:pb-8 md:pb-12 lg:pb-2 mx-auto">
          {/* our blue */}
          <div className="w-full lg:w-[37%] bg-gradient-to-br from-[#020B18] to-[#023362] rounded-lg p-4 sm:p-6 py-6 sm:py-7 text-white font-inter">
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
          <div className="w-full lg:w-[63%] relative rounded-lg overflow-hidden h-64 sm:h-80 lg:h-auto">
            <Image src="/Images/visonbackgroundblack.png" alt="Vision Background" width={600} height={200} className="w-full h-full object-cover" />
            <Image src="/Images/minibird.png" alt="Mini Bird" width={100} height={100} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 object-contain" />
            <p className="absolute bottom-4 sm:bottom-6 right-2 sm:right-4 text-white text-sm sm:text-xl font-inter font-light text-end opacity-42">From vision to velocity that's <br /> the Grobird way</p>
          </div>
          
        </div>
        
        {/* three boxes review  */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-1 px-4 sm:px-4 md:px-8 lg:px-12 xl:px-14 pb-6 sm:pb-8 md:pb-12 lg:pb-16 mx-auto">
          <div className="w-full md:w-1/3 h-auto md:h-80 bg-[#D3D3D347] rounded-lg p-4 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex gap-1 mb-4 sm:mb-7">
                <Image src="/Images/starblue.png" alt="Star" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
                <Image src="/Images/starblue.png" alt="Star" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
                <Image src="/Images/starblue.png" alt="Star" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
                <Image src="/Images/starblue.png" alt="Star" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
                <Image src="/Images/starblue.png" alt="Star" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              <p className="text-[#0B0B0B] text-sm sm:text-base font-medium leading-relaxed">Grobird turned our early-stage idea into a fully functional product within months. Their team felt like an extension of ours fast, responsive, and genuinely invested in our success.</p>
            </div>
            <div className="mt-4">
              <p className="text-[#0B0B0B] text-sm sm:text-base font-semibold">Ankit Sharma</p>
              <p className="text-[#666666] text-xs">Founder, EdTech Startup</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 h-auto md:h-80 bg-[#D3D3D347] rounded-lg p-4 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex gap-1 mb-4 sm:mb-7">
                <Image src="/Images/starblue.png" alt="Star" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
                <Image src="/Images/starblue.png" alt="Star" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
                <Image src="/Images/starblue.png" alt="Star" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
                <Image src="/Images/starblue.png" alt="Star" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
                <Image src="/Images/starblue.png" alt="Star" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              <p className="text-[#0B0B0B] text-sm sm:text-base font-medium leading-relaxed">What impressed us most was Grobird's ability to balance speed with quality. They helped us scale our platform without downtime, and their support didn't stop after launch.</p>
            </div>
            <div className="mt-4">
              <p className="text-[#0B0B0B] text-sm sm:text-base font-semibold">Ankit Sharma</p>
              <p className="text-[#666666] text-xs">Founder, EdTech Startup</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 h-auto md:h-80 bg-[#D3D3D347] rounded-lg p-4 sm:p-6 flex flex-col justify-between">
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
            <h2 className="text-[#000A1B] flex text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium leading-tight w-full lg:w-[30%]">
              <span className="text-[#3B3B3D73] mr-3">Our</span> <span className="text-[#000000]">Story</span>
            </h2>
            <div className="flex flex-col gap-6 sm:gap-8 w-full lg:w-[65%]">
              <p className="text-sm sm:text-base lg:text-xl">GroBird began with a simple belief — technology should not just solve problems, it should inspire growth. What started as a small team of passionate engineers and designers has now evolved into a full-scale digital partner trusted by businesses worldwide.</p>
              <p className="text-[#3D3D3DDB] text-sm sm:text-base lg:text-xl">Over the years, we've delivered 100+ transformative projects, empowered 50+ global clients, and expanded our expertise across consulting, development, hosting, and design. But at the heart of every milestone lies one constant — our commitment to crafting human-centered solutions that create lasting impact.</p>
              <p className="text-[#3D3D3DDB] text-sm sm:text-base lg:text-xl">From our very first line of code to the innovative platforms we build today, GroBird has always been about more than technology. We are about people, ideas, and the journeys that shape them.</p>
            </div>
        </div>

          {/* our story boxes  */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-1 px-4 sm:px-3 md:px-4 lg:px-5 xl:px-8 pb-6 sm:py-6 md:py-9 lg:py-14 mx-auto items-center justify-center">
            <Image src="/Images/ourStory1.png" alt="Our Story 1" width={352} height={352} className="w-full sm:w-1/3 h-auto object-contain" />
            <Image src="/Images/ourStory2.png" alt="Our Story 2" width={352} height={352} className="w-full sm:w-1/3 h-auto object-contain" />
            <Image src="/Images/ourStory3.png" alt="Our Story 3" width={352} height={352} className="w-full sm:w-1/3 h-auto object-contain" />
          </div>

          {/* more than a service  */}  
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-1 px-4 sm:px-5 md:px-7 lg:px-9 xl:px-12 pb-2 sm:pb-3 md:pb-4 lg:pb-6 mx-auto items-start sm:items-center justify-between pt-2">
            <h2 className="text-[#000A1B] flex flex-col text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium leading-tight w-full lg:w-[80%]">
              <span className="text-[#3B3B3D73]">More than a service</span>
               <span className="text-[#0B0B0B]">A strategic design </span>
               <span className="text-[#0B0B0B]">partner.</span>
            </h2>   
            <h3 className="text-[#000A1B] text-sm sm:text-base lg:text-2xl lg:w-[25%] text-start sm:text-end mt-1">Why Grobird?</h3>
          </div>
      
         {/* more than a servis boxes */}
         <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-2 px-4 sm:px-5 md:px-7 lg:px-9 xl:px-12 pb-2 sm:pb-3 md:pb-4 lg:pb-6 mx-auto pt-2">
            <Image src="/Images/morethanService.png" alt="More than Service" width={416} height={672} className="w-full md:row-span-2 h-auto object-contain" />
            <div className="bg-[#D3D3D347] rounded-lg flex flex-col justify-between p-6 sm:p-8 lg:p-10 items-start min-h-[120px]">
              <h3 className="flex text-3xl sm:text-4xl lg:text-5xl font-bold">10<span className="text-[#F95524]">x</span></h3>
              <p className="text-[#5A5A5A] text-xs sm:text-sm">Higher Client Retention</p>
            </div>
             <div className="bg-[#D3D3D347] rounded-lg flex flex-col justify-between p-6 sm:p-8 lg:p-10 items-start min-h-[120px]">
              <h3 className="flex text-3xl sm:text-4xl lg:text-5xl font-bold">200<span className="text-[#F95524]">+</span></h3>
              <p className="text-[#5A5A5A] text-xs sm:text-sm">Successfully delivered high-quality projects</p>
            </div>
            <div className="bg-[#D3D3D347] rounded-lg flex flex-col justify-between p-6 sm:p-8 lg:p-10 items-start min-h-[120px]">
              <h3 className="flex text-3xl sm:text-4xl lg:text-5xl font-bold">97<span className="text-[#F95524]">%</span></h3>
              <p className="text-[#5A5A5A] text-xs sm:text-sm">Client satisfaction based on surveys</p>
            </div>
            <div className="bg-[#D3D3D347] rounded-lg flex flex-col justify-between p-6 sm:p-8 lg:p-10 items-start min-h-[120px]">
              <h3 className="flex text-3xl sm:text-4xl lg:text-5xl font-bold">5<span className="text-[#F95524]">+</span></h3>
              <p className="text-[#5A5A5A] text-xs sm:text-sm">Continents Served</p>
            </div>
          </div>
         </div>

          {/* help  */}  
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-1 px-4 sm:px-5 md:px-7 lg:px-9 xl:px-12 py-3 sm:py-5 md:py-8 lg:py-12 mx-auto items-start sm:items-center justify-between pt-2">
            <h2 className="text-[#000A1B] flex flex-col text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium leading-tight w-full lg:w-[80%]">
              <span className="text-[#3B3B3D73]">How We Help</span>
               <span className="text-[#0B0B0B]">Businesses Grow</span>
            </h2>   
            <h3 className="text-[#000A1B] text-sm sm:text-base lg:text-2xl lg:w-[25%] text-start sm:text-end mt-1">Services</h3>
          </div>

          {/* help points*/}
          <div className="w-full gap-1 px-4 sm:px-5 md:px-7 lg:px-9 xl:px-12 pb-3 sm:pb-5 md:pb-8 lg:pb-12 mx-auto flex flex-col pt-2">
            <div className="flex flex-col lg:flex-row">
            <div className="border-y-1 border-y-[#dbdbdb] flex flex-row items-center gap-4 sm:gap-8 w-full lg:w-[60%] py-4 sm:py-7">
              <h3 className="text-[#C3C3C3]  sm:text-2xl lg:text-3xl">01.</h3>
              <h4 className="text-sm sm:text-base lg:text-lg font-medium">Custom Software Development</h4>
            </div>
            <p className="text-xs sm:text-sm mt-2 lg:mt-3 text-[#737373] w-full lg:w-[40%]">We design and build tailor-made software solutions that solve complex business challenges, improve efficiency</p>
            </div>
            <div className="flex flex-col lg:flex-row">
            <div className="border-b-1 border-b-[#dbdbdb] flex flex-row items-center gap-4 sm:gap-8 w-full lg:w-[60%] py-4 sm:py-7">
              <h3 className="text-[#C3C3C3] sm:text-2xl lg:text-3xl">02.</h3>
              <h4 className="text-sm sm:text-base lg:text-lg font-medium">IT Consulting</h4>
            </div>
            <p className="text-xs sm:text-sm mt-2 lg:mt-3 text-[#737373] w-full lg:w-[40%]">Our experts guide you through technology strategy, digital transformation, and process optimization.</p>
            </div>
             <div className="flex flex-col lg:flex-row">
            <div className="border-b-1 border-b-[#dbdbdb] flex flex-row items-center gap-4 sm:gap-8 w-full lg:w-[60%] py-4 sm:py-7">
              <h3 className="text-[#C3C3C3]  sm:text-2xl lg:text-3xl">03.</h3>
              <h4 className="text-sm sm:text-base lg:text-lg font-medium">Cloud & Infrastructure Services</h4>
            </div>
            <p className="text-xs sm:text-sm mt-2 lg:mt-3 text-[#737373] w-full lg:w-[40%]">From migration to management, we deliver scalable, secure, and cost-effective cloud infrastructure</p>
            </div>

             <div className="flex flex-col lg:flex-row">
            <div className="flex flex-row items-center gap-4 sm:gap-8 w-full lg:w-[60%] py-4 sm:py-7">
              <h3 className="text-[#C3C3C3] text-lg sm:text-2xl lg:text-3xl">04.</h3>
              <h4 className="text-sm sm:text-base lg:text-lg font-medium">Product Engineering</h4>
            </div>
            <p className="text-xs sm:text-sm mt-2 lg:mt-3 text-[#737373] w-full lg:w-[40%]">End-to-end product design, development, and scaling from concept to launch so you can bring innovative ideas to market faster</p>
            </div>           
          </div>
          
          {/* Meet people */}
          <div className="flex flex-col gap-8 px-4 sm:px-5 md:px-7 lg:px-9 xl:px-12 py-3 sm:py-5 md:py-8 lg:py-12 mx-auto item-center justify-center pt-2">
            <h2 className="text-[#000A1B] mb-5 text-center flex flex-col text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium leading-tight">
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
                <div className="flex flex-col items-center relative">
                  <Image src="/Images/people1.png" alt="Person 1" width={300} height={200} className="w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-cover rounded-lg" />

                  <div className="flex justify-between items-center w-60 sm:w-72 lg:w-80 mt-4">
                    <div>
                      <p className="text-[#0B0B0B] font-medium text-sm sm:text-base">Vaibhav Srivastava</p>
                      <p className="text-[#666666] text-xs sm:text-sm">Director</p>
                    </div>
                    <Image src="/Images/linkedin.png" alt="LinkedIn" width={12} height={12} className="w-3 h-3" />
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/Images/people2.png" alt="Person 2" width={200} height={200} className="w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-cover rounded-lg" />
                  <div className="flex justify-between items-center w-60 sm:w-72 lg:w-80 mt-4">
                    <div>
                      <p className="text-[#0B0B0B] font-medium text-sm sm:text-base">Vaibhav Srivastava</p>
                      <p className="text-[#666666] text-xs sm:text-sm">Director</p>
                    </div>
                    <Image src="/Images/linkedin.png" alt="LinkedIn" width={12} height={12} className="w-3 h-3" />
                  </div>
                </div>
                <div className="flex flex-col items-center">
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
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-1 px-4 sm:px-5 md:px-7 lg:px-9 xl:px-12 py-3 sm:py-5 md:py-8 lg:py-12 mx-auto items-start sm:items-center justify-between mt-7">
            <h2 className="text-[#000A1B] flex text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium leading-tight w-full lg:w-[80%]">
              <span className="text-[#3B3B3D73] mr-3">All</span>
               <span className="text-[#0B0B0B]">Insights</span>
            </h2>   
            <Button className="self-start sm:self-auto">More articles</Button>
          </div>     
          {/* Insights side scroll  */}
          <div className="overflow-x-auto px-4 sm:px-5 md:px-7 lg:px-9 xl:px-12 pb-6 sm:pb-8 md:pb-12 lg:pb-16" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            <div className="flex gap-4 sm:gap-6 min-w-max">
              <div className="flex flex-col w-[280px] sm:w-[400px] lg:w-[500px]">
                <Image src="/Images/insights1.png" alt="The art of storytelling in branding and advertising" width={500} height={388} className="w-[280px] sm:w-[400px] lg:w-[500px] h-[200px] sm:h-[300px] lg:h-[388px] object-cover rounded-lg" />
                <h3 className="text-[#0B0B0B] font-medium text-sm sm:text-lg lg:text-xl mt-3 sm:mt-4 text-start w-[90%]">The art of storytelling in branding and advertising</h3>
                <p className="text-[#666666] text-xs mt-2 w-[90%]">Branding • Mar 1, 2025 • 8min read</p>
                <div className="relative w-[90%] mt-2">
                  <p className="text-[#0B0B0B] text-xs">Read more</p>
                  <div className="absolute bottom-0 left-0 w-16 sm:w-20 h-px bg-[#0B0B0B]"></div>
                </div>
              </div>
              <div className="flex flex-col w-[280px] sm:w-[400px] lg:w-[500px]">
                <Image src="/Images/insights2.png" alt="The art of storytelling in branding and advertising" width={500} height={388} className="w-[280px] sm:w-[400px] lg:w-[500px] h-[200px] sm:h-[300px] lg:h-[388px] object-cover rounded-lg" />
                <h3 className="text-[#0B0B0B] font-medium text-sm sm:text-lg lg:text-xl mt-3 sm:mt-4 text-start w-[90%]">The art of storytelling in branding and advertising</h3>
                <p className="text-[#666666] text-xs mt-2 w-[90%]">Branding • Mar 1, 2025 • 8min read</p>
                <div className="relative w-[90%] mt-2">
                  <p className="text-[#0B0B0B] text-xs">Read more</p>
                  <div className="absolute bottom-0 left-0 w-16 sm:w-20 h-px bg-[#0B0B0B]"></div>
                </div>
              </div>
              <div className="flex flex-col w-[280px] sm:w-[400px] lg:w-[500px]">
                <Image src="/Images/insights1.png" alt="The art of storytelling in branding and advertising" width={500} height={388} className="w-[280px] sm:w-[400px] lg:w-[500px] h-[200px] sm:h-[300px] lg:h-[388px] object-cover rounded-lg" />
                <h3 className="text-[#0B0B0B] font-medium text-sm sm:text-lg lg:text-xl mt-3 sm:mt-4 text-start w-[90%]">The art of storytelling in branding and advertising</h3>
                <p className="text-[#666666] text-xs mt-2 w-[90%]">Branding • Mar 1, 2025 • 8min read</p>
                <div className="relative w-[90%] mt-2">
                  <p className="text-[#0B0B0B] text-xs">Read more</p>
                  <div className="absolute bottom-0 left-0 w-16 sm:w-20 h-px bg-[#0B0B0B]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* tell us vision */}
          <div className="flex flex-col lg:flex-row min-h-[300px] lg:h-[441px]">
            <div className="w-full lg:w-[75%] bg-gradient-to-br from-[#F6F6F6] to-[#EAEAEA] p-6 sm:p-8 lg:p-10 lg:pl-12 flex flex-col justify-between">
              <div>
                <h3 className="text-[#000000] text-xl sm:text-2xl lg:text-4xl font-medium mb-8 sm:mb-10 lg:mb-14">Tell Us Your Vision, <br /> Let's Make It Real</h3>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-4 sm:mb-5">
                  <input type="text" placeholder="Your Name" className="flex-1 bg-transparent border-b border-[#CACACA] pb-3 sm:pb-4 text-xs sm:text-sm text-[#000000] placeholder-[#000000] focus:outline-none" />
                  <input type="email" placeholder="Email Address" className="flex-1 bg-transparent border-b border-[#CACACA] pb-3 sm:pb-4 text-xs sm:text-sm text-[#000000] placeholder-[#000000] focus:outline-none" />
                  <input type="tel" placeholder="Phone Number" className="flex-1 bg-transparent border-b border-[#CACACA] pb-3 sm:pb-4 text-xs sm:text-sm text-[#000000] placeholder-[#000000] focus:outline-none" />
                </div>
                <input type="text" placeholder="Message" className="w-full bg-transparent border-b border-[#CACACA] pb-4 sm:pb-6 text-xs sm:text-sm text-[#000000] placeholder-[#000000] focus:outline-none" />
              </div>
              <button className="bg-black text-white text-xs sm:text-sm px-4 sm:px-6 py-2 rounded-full self-start mt-6 sm:mt-8">Send Query</button>
            </div>
            <div className="w-full lg:w-[30%] h-48 lg:h-auto">
              <Image src="/Images/vision.png" alt="Vision" width={200} height={200} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* grobird logo */}
          <div className="flex flex-col items-center pt-3 pb-8 sm:pb-12">
            <p className="text-black uppercase text-4xl sm:text-6xl md:text-8xl lg:text-[120px] xl:text-[200px] font-bold leading-none tracking-widest text-center">GROBIRD</p>
            <div className="flex flex-wrap gap-2 sm:gap-4 justify-start mt-4 px-4">
              <span className="text-xs text-black">Services</span>
              <span className="text-xs text-black">Case Studies</span>
              <span className="text-xs text-black">About</span>
              <span className="text-xs text-black">Blog</span>
              <span className="text-xs text-black">Careers</span>
              <span className="text-xs text-black">Contact</span>
            </div>
          </div>
      </div>
  )
}

export default AboutUs