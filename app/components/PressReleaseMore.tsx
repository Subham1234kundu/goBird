"use client"
import Image from "next/image"
import InsightsSection from "@/app/components/service/InsightsSection"
import FooterSimple from "@/app/components/FooterSimple"
import { useRouter } from "next/navigation"

const PressReleaseMore = () => {
  const router = useRouter()
  
  return (
    <div className="w-full min-h-screen">
      {/* Header */}
      <div className="w-full px-4 sm:px-6 md:px-10 pt-8 sm:pt-12 pb-8 flex flex-col items-center">
        <p className="text-base sm:text-xl text-center mb-4 sm:mb-6">PRESS RELEASE</p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-center mb-4 sm:mb-6 max-w-5xl px-2 ">
          Grobird Redesigns A2Y Consultants&apos; Website, Driving a 60% Faster User Experience
        </h1>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-7 text-xs sm:text-sm md:text-base" style={{ color: '#757575' }}>
          <span className="flex items-center gap-2">
            <Image src="/Images/mins.png" alt="" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
            4 Mins Read
          </span>
          <span className="flex items-center gap-2">
            <Image src="/Images/claendar.png" alt="" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
            Nov 29, 2024
          </span>
        </div>
        <div className="w-[85%] sm:w-[65%] h-[1px] mt-4 sm:mt-6 mx-auto" style={{ backgroundColor: '#E3E3E3' }}></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pb-12">
        <Image
          src="/Images/pressReleaseMore1.png"
          alt="Press Release"
          width={1000}
          height={400}
          className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover mb-6 sm:mb-8"
        />

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4">Introduction</h2>
        <p className="text-base sm:text-lg leading-relaxed">
          Grobird is proud to announce the successful design and development of the new official website for A2Y Consultants, a leading financial, tax, and legal advisory firm. The launch marks a significant step in strengthening A2Y&apos;s digital footprint, delivering a modern design, 60% faster page load times, and an intuitive navigation experience.
        </p>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg"> With consulting firms increasingly relying on digital presence to attract and serve clients, A2Y partnered with Grobird to create a platform that reflects its expertise and builds trust with both individuals and businesses.</p>

        {/* Key Achievements */}
        <div className="rounded-md p-6 sm:p-12 md:p-16 mt-8 sm:mt-12 md:mt-18 min-h-[400px] sm:min-h-[470px] relative overflow-hidden flex items-center flex-col justify-center" style={{ backgroundColor: '#0056D6' }}>
          <Image
            src="/Images/pressMoregredient.png"
            alt="Gradient"
            width={1200}
            height={600}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-auto object-contain"
          />
          <div className="relative z-10 mb-8 sm:mb-12 md:mb-16 flex justify-center px-4">
            <h3 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-center">Key Achievements of the Project:</h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-12 justify-center items-center relative z-10 w-full px-4">
            <div className="flex flex-col items-center">
              <h4 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-3 sm:mb-4">
                <span className="relative inline-block pb-2">
                  60
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-white"></span>
                </span>%
              </h4>
              <p className="text-white text-sm sm:text-base md:text-lg font-light text-center max-w-[200px]">Faster Load Speed ensuring smooth browsing</p>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-3 sm:mb-4">
                <span className="relative inline-block pb-2">
                  100
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-white"></span>
                </span>%
              </h4>
              <p className="text-white text-sm sm:text-base md:text-lg font-light text-center max-w-[200px]">Responsive Design across mobile, tablet, and desktop</p>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-3 sm:mb-4">
                <span className="relative inline-block pb-2">
                  85
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-white"></span>
                </span>%
              </h4>
              <p className="text-white text-sm sm:text-base md:text-lg font-light text-center max-w-[200px]">SEO that improved visibility in the first 2 weeks post-launch</p>
            </div>
          </div>
        </div>

        {/* About A2Y Consultants */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-8 sm:mt-12 md:mt-18 mb-3 sm:mb-4">About A2Y Consultants</h2>
        <p className="text-base sm:text-lg leading-relaxed mb-8 sm:mb-12">
          A2Y Consultants is a trusted partner for individuals and businesses, offering expert services in finance, tax, compliance, and legal advisory. With a commitment to excellence, A2Y helps clients navigate complex regulatory and financial landscapes with confidence.
        </p>

        {/* The Challenge */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4">The Challenge</h2>
        <p className="text-base sm:text-lg leading-relaxed mb-8 sm:mb-12 md:mb-18">
          A2Y Consultants needed a website that went beyond just presenting services. Their existing platform was limited in terms of design, speed, and user experience, which created friction for prospective clients. The goal was to deliver a professional, secure, and scalable website that not only informed but also engaged.
        </p>

        {/* The Solution */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4">The Solution</h2>
        <p className="text-base sm:text-lg leading-relaxed mb-3 sm:mb-4">
          Grobird&apos;s team applied a strategy-first approach, ensuring every design and technical decision aligned with A2Y&apos;s brand values and business objectives.
        </p>
        <p className="text-base sm:text-lg leading-relaxed mb-3 sm:mb-4">Key features of the new website include:</p>
        <ul className="list-disc pl-5 sm:pl-6 space-y-3 sm:space-y-4 md:space-y-6 mb-8 sm:mb-12 md:mb-16">
          <li className="text-base sm:text-lg leading-relaxed"><span className="font-medium">Modern UI/UX Design</span> – Professional and approachable layouts with intuitive navigation.</li>
          <li className="text-base sm:text-lg leading-relaxed"><span className="font-medium">100% Responsiveness</span> – Optimized for mobile, tablet, and desktop devices.</li>
          <li className="text-base sm:text-lg leading-relaxed"><span className="font-medium">Performance Optimization</span> – Page load times reduced by 60%, ensuring faster access.</li>
          <li className="text-base sm:text-lg leading-relaxed"><span className="font-medium">Structured Content Flow</span> – Improved readability and engagement with 40% better content accessibility.</li>
          <li className="text-base sm:text-lg leading-relaxed"><span className="font-medium">SEO Foundation</span> – Built with on-page optimization to boost visibility and ranking.</li>
          <li className="text-base sm:text-lg leading-relaxed"><span className="font-medium">Scalability &amp; Security</span> – Robust backend architecture to support future expansion.</li>
        </ul>

        {/* Press Release More Image 2 */}
        <Image
          src="/Images/pressReleaseMore2.png"
          alt="Press Release 2"
          width={1000}
          height={400}
          className="w-full h-auto object-cover mb-6 sm:mb-8"
        />

        {/* About Grobird */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4">About Grobird</h2>
        <p className="text-base sm:text-lg leading-relaxed">
          Grobird is a global technology solutions provider specializing in custom software development, IT consulting, cloud &amp; infrastructure, and product engineering. With a startup-first mindset, Grobird enables businesses across industries to build, scale, and succeed in the digital-first era.
        </p>
      </div>

\

      {/* Insights Section */}
      <InsightsSection
        title="More"
        titleHighlight="Stories"
        buttonText=""
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


            <div className="w-full py-12 sm:py-16 md:py-20">
              <div className="flex flex-col lg:flex-row items-stretch justify-between gap-0">
                <div className="flex flex-col justify-center items-start gap-6 sm:gap-8 lg:w-1/2 bg-[#F5F9FE] px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
                  <h2 className="text-[#000A1B] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium leading-tight">
                   Need a Tech Partner You Can Trust? 
                  </h2>
                  <button
                    className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-sm text-white text-sm sm:text-base"
                    style={{ backgroundColor: '#FF662A' }}
                  >
                    Get Started
                  </button>
                </div>
                <div className="lg:w-1/2 h-[250px] sm:h-[300px] lg:h-auto">
                  <Image
                    src="/Images/insightsfooter.png"
                    alt="Insights Footer"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

      {/* Footer */}
      <FooterSimple />
    </div>
  )
}

export default PressReleaseMore
