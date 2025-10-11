'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"

const ITConsulting = () => {
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
            <span>�</span> Back to Services
          </button>
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-6" style={{ fontWeight: 300 }}>
            IT Consulting
          </h1>
          <p className="text-white text-lg sm:text-xl md:text-2xl font-light mb-8 w-full sm:w-[90%] md:w-[80%] lg:w-[70%]" style={{ fontWeight: 300 }}>
            Strategic guidance for a digital-first world
          </p>
        </div>
      </div>

      {/* Overview Section */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8" style={{ fontWeight: 300 }}>
            Transforming Challenges into Opportunities
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6">
            At Grobird, we help businesses define IT strategies, assess systems, and create roadmaps for transformation. Our IT consulting services are designed to align technology with your business goals, ensuring you stay competitive in a rapidly evolving digital landscape.
          </p>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            Whether you're looking to optimize existing infrastructure, migrate to the cloud, or implement cutting-edge solutions, our team of experts is here to guide you every step of the way.
          </p>
        </div>
      </div>

      {/* Services List */}
      <div className="w-full bg-gray-50 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-12" style={{ fontWeight: 300 }}>
            Our IT Consulting Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">IT Roadmaps & Strategy</h3>
              <p className="text-gray-700 leading-relaxed">
                Develop comprehensive IT strategies that align with your business objectives and drive long-term success.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">System Audits & Optimization</h3>
              <p className="text-gray-700 leading-relaxed">
                Identify inefficiencies, security vulnerabilities, and optimization opportunities in your existing systems.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">Digital Transformation Guidance</h3>
              <p className="text-gray-700 leading-relaxed">
                Navigate the complexities of digital transformation with expert guidance and proven methodologies.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">Technology Assessment</h3>
              <p className="text-gray-700 leading-relaxed">
                Evaluate current technology stacks and recommend modern solutions that fit your needs and budget.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">Cloud Migration Strategy</h3>
              <p className="text-gray-700 leading-relaxed">
                Plan and execute seamless cloud migrations with minimal disruption to your business operations.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">IT Governance & Compliance</h3>
              <p className="text-gray-700 leading-relaxed">
                Ensure your IT practices meet industry standards and regulatory requirements.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8" style={{ fontWeight: 300 }}>
            Ready to Transform Your IT Strategy?
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Let's discuss how our IT consulting services can help your business achieve its digital transformation goals.
          </p>
          <button className="bg-[#FF662A] text-white px-8 py-3 rounded-sm hover:bg-[#E55A25] transition-colors">
            Book a Strategy Session
          </button>
        </div>
      </div>
    </div>
  )
}

export default ITConsulting
