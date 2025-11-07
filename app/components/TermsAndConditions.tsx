"use client"
import Image from "next/image"
import FooterSimple from "@/app/components/FooterSimple"

const TermsAndConditions = () => {
  return (
    <div className="w-full min-h-screen">
      {/* Header with Gradient */}
      <div 
        className="w-full h-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-9 pt-6 sm:pt-8 md:pt-12 lg:pt-16 pb-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(to right, #010917, #003081)' }}
      >
        {/* Privacy Bird Image - Left Top */}
        <div className="absolute left-0 -top-10 sm:-top-24 md:-top-28 lg:-top-32 z-20" style={{ opacity: 0.20 }}>
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] 2xl:w-[36rem] 2xl:h-[36rem]">
            <Image
              src="/Images/privacyBird.png"
              alt="Privacy Bird"
              fill
              className="object-cover object-top-left"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full max-w-[1400px] mx-auto relative z-10 text-center">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight mb-7 " style={{ fontWeight: 300 }}>
            Terms &amp; Conditions
          </h1>
          <p className="text-white font-light text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-4xl leading-relaxed mb-8" style={{ fontWeight: 300 }}>
            Understand the guidelines that keep our platform secure, transparent, and beneficial for every user.
          </p>
        
        </div>
      </div>

      {/* Line under header */}
      <div className="w-full h-[2px]" style={{ backgroundColor: '#E3E3E3' }}></div>

      {/* Content Section */}
      <div className="w-[90%] sm:w-[85%] md:w-[75%] lg:w-[65%] mx-auto py-8 sm:py-12 md:py-16">
        <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-6">Last updated: <span className="text-black font-medium">29 Aug 2025</span></p>
        
        <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
          Welcome to Grobird. By accessing or using our website, services, and solutions, you agree to comply with and be bound by these Terms of Use. Please read them carefully. If you do not agree, you should not continue using our services.
        </p>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight mb-4 sm:mb-6 mt-12 sm:mt-16 md:mt-20">1. Acceptance of Terms</h2>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
          By accessing this website or using our services, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms of Use and our Privacy Policy.
        </p>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight mb-4 sm:mb-6 mt-12 sm:mt-16 md:mt-20">2. Eligibility</h2>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
          You must be at least 18 years old to use our services. By using our site, you represent and warrant that you meet this requirement.
        </p>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight mb-4 sm:mb-6 mt-12 sm:mt-16 md:mt-20">3. Use of Services</h2>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4">
          Our services and content are provided solely for business and informational purposes. You agree not to:
        </p>
        <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
          <li>• Misuse our services in any unlawful manner.</li>
          <li>• Copy, distribute, or modify any material without prior written consent from Grobird.</li>
          <li>• Engage in any activity that could damage or disrupt the functioning of our website or services.</li>
        </ul>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight mb-4 sm:mb-6 mt-12 sm:mt-16 md:mt-20">4. Intellectual Property</h2>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
          All content, trademarks, designs, logos, and materials displayed on this website are the exclusive property of Grobird or our partners. Unauthorized use, reproduction, or distribution is strictly prohibited.
        </p>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight mb-4 sm:mb-6 mt-12 sm:mt-16 md:mt-20">5. User Submissions</h2>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
          If you share feedback, suggestions, or content with us, you grant Grobird a non-exclusive, royalty-free, worldwide license to use such submissions to improve or promote our services.
        </p>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight mb-4 sm:mb-6 mt-12 sm:mt-16 md:mt-20">6. Third-Party Links</h2>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
          Our site may contain links to third-party websites. Grobird is not responsible for the availability, accuracy, or content of such external sites. Accessing third-party sites is at your own risk.
        </p>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight mb-4 sm:mb-6 mt-12 sm:mt-16 md:mt-20">7. Disclaimer of Warranties</h2>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
          Our services are provided "as is" and "as available." We make no warranties, express or implied, regarding accuracy, reliability, or suitability for a particular purpose.
        </p>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight mb-4 sm:mb-6 mt-12 sm:mt-16 md:mt-20">8. Limitation of Liability</h2>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
          To the maximum extent permitted by law, Grobird shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your use of our website or services.
        </p>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight mb-4 sm:mb-6 mt-12 sm:mt-16 md:mt-20">9. Indemnification</h2>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
          You agree to indemnify and hold Grobird, its employees, affiliates, and partners harmless from any claims, damages, liabilities, or expenses arising from your misuse of our services.
        </p>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight mb-4 sm:mb-6 mt-12 sm:mt-16 md:mt-20">10. Termination</h2>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
          We reserve the right to suspend or terminate your access to our services at our sole discretion, without notice, if you violate these Terms.
        </p>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight mb-4 sm:mb-6 mt-12 sm:mt-16 md:mt-20">11. Governing Law</h2>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
          These Terms shall be governed by and interpreted under the laws of [Insert Jurisdiction], without regard to its conflict of law principles.
        </p>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight mb-4 sm:mb-6 mt-12 sm:mt-16 md:mt-20">12. Contact Us</h2>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4">
          If you have any questions about these Terms, please contact us:
        </p>
        <div className="text-sm sm:text-base md:text-lg leading-relaxed space-y-2 mb-6 sm:mb-8">
          <p>📧 Email: <a href="mailto:inquiry@grobird.in" className="text-blue-600 hover:underline">inquiry@grobird.in</a></p>
          <p>📞 Phone: <a href="tel:+919170763968" className="text-blue-600 hover:underline">+91-9170763968</a></p>
          <p>📍 Address: 121,LA,US-121324</p>
        </div>
      </div>

      {/* Footer */}
      <FooterSimple />
    </div>
  )
}

export default TermsAndConditions
