'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"

const ProductEngineering = () => {
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
            Product Engineering
          </h1>
          <p className="text-white text-lg sm:text-xl md:text-2xl font-light mb-8 w-full sm:w-[90%] md:w-[80%] lg:w-[70%]" style={{ fontWeight: 300 }}>
            From concept to launch, we build products that users love
          </p>
        </div>
      </div>

      {/* Overview Section */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8" style={{ fontWeight: 300 }}>
            Engineering Products That Scale
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6">
            Great products require more than just great code. At Grobird, we combine technical excellence with user-centered design, agile methodologies, and data-driven insights to build digital products that solve real problems and delight users.
          </p>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            Whether you're launching a new product, scaling an existing one, or pivoting to meet market demands, our product engineering team brings the expertise and experience to turn your vision into reality.
          </p>
        </div>
      </div>

      {/* Services List */}
      <div className="w-full bg-gray-50 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-12" style={{ fontWeight: 300 }}>
            Our Product Engineering Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">Product Strategy & Discovery</h3>
              <p className="text-gray-700 leading-relaxed">
                Define your product vision, validate market fit, and create a roadmap for success through research and analysis.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">UI/UX Design</h3>
              <p className="text-gray-700 leading-relaxed">
                Create intuitive, beautiful interfaces that provide exceptional user experiences and drive engagement.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">MVP Development</h3>
              <p className="text-gray-700 leading-relaxed">
                Rapidly build and launch minimum viable products to test your ideas and gather user feedback.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">Full-Stack Product Development</h3>
              <p className="text-gray-700 leading-relaxed">
                Build complete, production-ready products with scalable architecture and modern technology stacks.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">Product Scaling & Optimization</h3>
              <p className="text-gray-700 leading-relaxed">
                Optimize performance, improve infrastructure, and scale your product to handle growing user demands.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">Analytics & Insights</h3>
              <p className="text-gray-700 leading-relaxed">
                Implement analytics frameworks to track user behavior, measure KPIs, and drive data-informed decisions.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">Product Maintenance & Support</h3>
              <p className="text-gray-700 leading-relaxed">
                Provide ongoing maintenance, bug fixes, and feature enhancements to keep your product running smoothly.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">Quality Assurance & Testing</h3>
              <p className="text-gray-700 leading-relaxed">
                Ensure product quality with comprehensive testing strategies, automated tests, and continuous integration.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">Product Modernization</h3>
              <p className="text-gray-700 leading-relaxed">
                Refresh and modernize existing products with new features, improved UX, and updated technology.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8" style={{ fontWeight: 300 }}>
            Our Product Development Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div>
              <div className="bg-[#FF662A] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-medium mb-3">Discovery</h3>
              <p className="text-gray-700">Research, ideation, and validation to define product requirements and goals.</p>
            </div>
            <div>
              <div className="bg-[#FF662A] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-medium mb-3">Design</h3>
              <p className="text-gray-700">Create wireframes, prototypes, and high-fidelity designs focused on user experience.</p>
            </div>
            <div>
              <div className="bg-[#FF662A] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-medium mb-3">Development</h3>
              <p className="text-gray-700">Build the product using agile methodologies with continuous feedback and iteration.</p>
            </div>
            <div>
              <div className="bg-[#FF662A] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                4
              </div>
              <h3 className="text-xl font-medium mb-3">Launch & Iterate</h3>
              <p className="text-gray-700">Deploy to production, gather user feedback, and continuously improve the product.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8" style={{ fontWeight: 300 }}>
            Let's Build Your Next Product
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Ready to bring your product idea to life? Let's discuss how we can help you build, launch, and scale a successful digital product.
          </p>
          <button className="bg-[#FF662A] text-white px-8 py-3 rounded-sm hover:bg-[#E55A25] transition-colors">
            Explore Product Engineering
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductEngineering
