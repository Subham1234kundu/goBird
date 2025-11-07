"use client"
import Image from "next/image"
import FooterSimple from "@/app/components/FooterSimple"

const PrivacyPolicy = () => {
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
            Privacy Policy
          </h1>
          <p className="text-white font-light text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-4xl leading-relaxed mb-8" style={{ fontWeight: 300 }}>
            We're committed to safeguarding your personal information with transparency, security, and trust at every step
          </p>
        
        </div>
      </div>

      {/* Line under header */}
      <div className="w-full h-[2px]" style={{ backgroundColor: '#E3E3E3' }}></div>

      {/* Content Section */}
      <div className="w-[90%] sm:w-[85%] md:w-[75%] lg:w-[65%] mx-auto py-8 sm:py-12 md:py-16">
        <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-6">Last updated: <span className="text-black font-medium">29 Aug 2025</span></p>
        
        <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
          At Grobird, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your data when you interact with our website, products, and services.
        </p>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight mb-4 sm:mb-6 mt-12 sm:mt-16 md:mt-20">1. Information We Collect</h2>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4">
          We may collect the following types of information when you use our services:
        </p>
        <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
          <li>• Personal Information: Name, email address, phone number, company details, job title, etc. (when you fill out forms or contact us).</li>
          <li>• Technical Information: IP address, browser type, operating system, device details, and usage patterns.</li>
          <li>• Cookies &amp; Tracking Data: To improve user experience and analyze website traffic.</li>
        </ul>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight mb-4 sm:mb-6 mt-12 sm:mt-16 md:mt-20">2. How We Use Your Information</h2>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4">We use the collected data to:</p>
        <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
          <li>• Provide, operate, and improve our services.</li>
          <li>• Communicate with you about inquiries, support requests, or business opportunities.</li>
          <li>• Send marketing communications (only with your consent).</li>
          <li>• Analyze usage trends to improve website performance.</li>
          <li>• Ensure security, fraud prevention, and compliance with legal obligations.</li>
        </ul>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight mb-4 sm:mb-6 mt-12 sm:mt-16 md:mt-20">3. Data Sharing &amp; Disclosure</h2>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4">
          We do not sell or rent your data. We may share information only in these cases:
        </p>
        <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
          <li>• With trusted service providers: To help us deliver services (e.g., hosting, analytics, email).</li>
          <li>• For legal reasons: If required by law or to protect our legal rights.</li>
          <li>• Business transfers: If Grobird undergoes a merger, acquisition, or asset sale.</li>
        </ul>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight mb-4 sm:mb-6 mt-12 sm:mt-16 md:mt-20">4. Data Security</h2>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
          We implement strong technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight mb-4 sm:mb-6 mt-12 sm:mt-16 md:mt-20">5. Your Rights</h2>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4">
          Depending on your region, you may have the right to:
        </p>
        <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
          <li>• Access, update, or delete your personal information.</li>
          <li>• Opt out of marketing communications at any time.</li>
          <li>• Request restriction of data processing.</li>
          <li>• Request a copy of the information we hold about you.</li>
        </ul>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight mb-4 sm:mb-6 mt-12 sm:mt-16 md:mt-20">6. Cookies &amp; Tracking Technologies</h2>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4">We use cookies to:</p>
        <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
          <li>• Improve site navigation.</li>
          <li>• Analyze traffic and performance.</li>
          <li>• Personalize user experience.</li>
        </ul>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
          You can control or disable cookies through your browser settings.
        </p>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight mb-4 sm:mb-6 mt-12 sm:mt-16 md:mt-20">7. Third-Party Links</h2>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
          Our website may contain links to external websites. We are not responsible for the privacy practices of these third-party sites.
        </p>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight mb-4 sm:mb-6 mt-12 sm:mt-16 md:mt-20">8. Updates to this Policy</h2>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
          We may update this Privacy Policy periodically. Any changes will be posted on this page with the updated date.
        </p>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight mb-4 sm:mb-6 mt-12 sm:mt-16 md:mt-20">9. Contact Us</h2>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
          If you have any questions about this Privacy Policy or our data practices, please contact us at:
        </p>
      </div>

      {/* Footer */}
      <FooterSimple />
    </div>
  )
}

export default PrivacyPolicy
