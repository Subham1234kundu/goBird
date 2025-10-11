'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"

const CloudInfrastructure = () => {
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
            Cloud & Infrastructure
          </h1>
          <p className="text-white text-lg sm:text-xl md:text-2xl font-light mb-8 w-full sm:w-[90%] md:w-[80%] lg:w-[70%]" style={{ fontWeight: 300 }}>
            Scalable, secure, and reliable cloud solutions for modern businesses
          </p>
        </div>
      </div>

      {/* Overview Section */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8" style={{ fontWeight: 300 }}>
            Empower Your Business with Cloud Technology
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6">
            In today's digital world, cloud infrastructure is the backbone of agile, scalable businesses. At Grobird, we help you leverage the power of cloud computing to reduce costs, improve performance, and accelerate innovation.
          </p>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            From migration planning to ongoing management, our cloud experts ensure your infrastructure is optimized for performance, security, and cost-efficiency across AWS, Azure, Google Cloud, and more.
          </p>
        </div>
      </div>

      {/* Services List */}
      <div className="w-full bg-gray-50 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-12" style={{ fontWeight: 300 }}>
            Our Cloud Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">Cloud Migration</h3>
              <p className="text-gray-700 leading-relaxed">
                Seamlessly migrate your applications and data to the cloud with minimal downtime and maximum efficiency.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">Cloud Architecture Design</h3>
              <p className="text-gray-700 leading-relaxed">
                Design scalable, resilient cloud architectures tailored to your specific business requirements.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">Infrastructure as Code</h3>
              <p className="text-gray-700 leading-relaxed">
                Automate infrastructure provisioning and management with Terraform, CloudFormation, and other IaC tools.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">Container Orchestration</h3>
              <p className="text-gray-700 leading-relaxed">
                Deploy and manage containerized applications with Kubernetes, Docker, and other orchestration platforms.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">DevOps & CI/CD</h3>
              <p className="text-gray-700 leading-relaxed">
                Implement modern DevOps practices and automated CI/CD pipelines for faster, more reliable deployments.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">Cloud Security & Compliance</h3>
              <p className="text-gray-700 leading-relaxed">
                Protect your cloud infrastructure with enterprise-grade security measures and compliance frameworks.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">Cloud Cost Optimization</h3>
              <p className="text-gray-700 leading-relaxed">
                Reduce cloud spending while maintaining performance through intelligent resource management and optimization.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">Monitoring & Observability</h3>
              <p className="text-gray-700 leading-relaxed">
                Gain deep insights into your infrastructure with comprehensive monitoring, logging, and alerting solutions.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium mb-4">Disaster Recovery</h3>
              <p className="text-gray-700 leading-relaxed">
                Ensure business continuity with robust backup, recovery, and failover strategies.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cloud Providers Section */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8" style={{ fontWeight: 300 }}>
            Cloud Platforms We Support
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-12">
            We have deep expertise across all major cloud providers, helping you choose and leverage the right platform for your needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-medium mb-4">Amazon Web Services (AWS)</h3>
              <p className="text-gray-700">EC2, S3, Lambda, RDS, ECS, EKS, and more</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-medium mb-4">Microsoft Azure</h3>
              <p className="text-gray-700">Virtual Machines, Azure Functions, AKS, Cosmos DB, and more</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-medium mb-4">Google Cloud Platform</h3>
              <p className="text-gray-700">Compute Engine, Cloud Functions, GKE, BigQuery, and more</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8" style={{ fontWeight: 300 }}>
            Ready to Move to the Cloud?
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Let's discuss how cloud infrastructure can transform your business operations and drive growth.
          </p>
          <button className="bg-[#FF662A] text-white px-8 py-3 rounded-sm hover:bg-[#E55A25] transition-colors">
            See Cloud Services
          </button>
        </div>
      </div>
    </div>
  )
}

export default CloudInfrastructure
