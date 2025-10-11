'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"

const CustomSoftwareDevelopment = () => {
  const router = useRouter()

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <div className="bg-custom-bg w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto">
          <button
            onClick={() => router.back()}
            className="text-white mb-8 flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <span>&larr;</span> Back to Services
          </button>
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-6" style={{ fontWeight: 300 }}>
            Custom Software Development
          </h1>
          <p className="text-white text-lg sm:text-xl md:text-2xl font-light mb-8 w-full sm:w-[90%] md:w-[80%] lg:w-[70%]" style={{ fontWeight: 300 }}>
            Tailored solutions built to solve your unique business challenges
          </p>
        </div>
      </div>

      {/* Overview Section */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8" style={{ fontWeight: 300 }}>
            Build Software That Works for You
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6">
            Every business is unique, and off-the-shelf solutions don't always fit. At Grobird, we specialize in building custom software that perfectly aligns with your workflows, processes, and goals.
          </p>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            From web applications to mobile apps, from enterprise systems to APIs, we deliver scalable, secure, and maintainable software solutions that drive real business value.
          </p>
        </div>
      </div>

      {/* Services List */}
      <div className="w-full bg-gray-50 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-12" style={{ fontWeight: 300 }}>
            Our Development Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">Web Application Development</h3>
              <p className="text-gray-700 leading-relaxed">
                Build responsive, scalable web applications using modern frameworks like React, Next.js, and Node.js.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">Mobile App Development</h3>
              <p className="text-gray-700 leading-relaxed">
                Create native and cross-platform mobile applications for iOS and Android with seamless user experiences.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">Enterprise Software Solutions</h3>
              <p className="text-gray-700 leading-relaxed">
                Develop robust enterprise systems that streamline operations and improve organizational efficiency.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">API Development & Integration</h3>
              <p className="text-gray-700 leading-relaxed">
                Build secure APIs and integrate third-party services to extend your software capabilities.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">Legacy System Modernization</h3>
              <p className="text-gray-700 leading-relaxed">
                Transform outdated systems into modern, maintainable solutions without disrupting business operations.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">SaaS Development</h3>
              <p className="text-gray-700 leading-relaxed">
                Build multi-tenant SaaS platforms with subscription management, billing, and analytics.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack Section */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8" style={{ fontWeight: 300 }}>
            Technologies We Work With
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-12">
            We leverage cutting-edge technologies and proven frameworks to deliver high-quality software solutions.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="bg-gray-50 p-4 rounded text-center">
              <p className="font-medium">React</p>
            </div>
            <div className="bg-gray-50 p-4 rounded text-center">
              <p className="font-medium">Next.js</p>
            </div>
            <div className="bg-gray-50 p-4 rounded text-center">
              <p className="font-medium">Node.js</p>
            </div>
            <div className="bg-gray-50 p-4 rounded text-center">
              <p className="font-medium">Python</p>
            </div>
            <div className="bg-gray-50 p-4 rounded text-center">
              <p className="font-medium">TypeScript</p>
            </div>
            <div className="bg-gray-50 p-4 rounded text-center">
              <p className="font-medium">PostgreSQL</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8" style={{ fontWeight: 300 }}>
            Let's Build Something Great Together
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Have a software project in mind? Let's discuss how we can bring your vision to life with custom-built solutions.
          </p>
          <button className="bg-[#FF662A] text-white px-8 py-3 rounded-sm hover:bg-[#E55A25] transition-colors">
            Request a Proposal
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomSoftwareDevelopment
