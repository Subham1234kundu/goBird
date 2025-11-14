'use client'

import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"

const Footer = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Form submitted:', formData)
    // You can add your API call here
  }

  const navigationLinks = [
    { label: 'Services', path: '/services' },
    { label: 'Case Studies', path: '/case-studies' },
    { label: 'About', path: '/aboutUs' },
    { label: 'Blog', path: '/blog' },
    { label: 'Careers', path: '/careers' },
    { label: 'Contact', path: '/contact' }
  ]

  return (
    <>
      {/* Tell us vision / Contact Form */}
      <div className="flex flex-col mt-14 lg:flex-row min-h-[300px] lg:h-[520px]">
        <div className="w-full lg:w-[75%] bg-gradient-to-br from-[#F6F6F6] to-[#EAEAEA] p-6 sm:p-8 md:p-10 lg:p-12 xl:pl-16 flex flex-col justify-between">
          <div>
            <h3 className="text-[#000000] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[42px] font-medium mb-6 sm:mb-8 md:mb-10 lg:mb-14">
              Tell Us Your Vision, <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>Let&apos;s Make It Real
            </h3>
            <div className="flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                className="flex-1 bg-transparent border-b border-[#CACACA] pb-2 sm:pb-3 md:pb-4 text-xs sm:text-sm xl:text-[24px] text-[#000000] placeholder-[#000000] focus:outline-none focus:border-black"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="flex-1 bg-transparent border-b border-[#CACACA] pb-2 sm:pb-3 md:pb-4 text-xs sm:text-sm xl:text-[24px] text-[#000000] placeholder-[#000000] focus:outline-none focus:border-black"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="flex-1 bg-transparent border-b border-[#CACACA] pb-2 sm:pb-3 md:pb-4 text-xs sm:text-sm xl:text-[24px] text-[#000000] placeholder-[#000000] focus:outline-none focus:border-black"
              />
            </div>
            <input
              type="text"
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full bg-transparent border-b border-[#CACACA] pb-3 sm:pb-4 md:pb-6 text-xs sm:text-sm xl:text-[24px] text-[#000000] placeholder-[#000000] focus:outline-none focus:border-black"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-black text-white text-xs sm:text-sm xl:text-[18px] px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 rounded-full self-start mt-5 sm:mt-6 md:mt-8 hover:bg-gray-800 transition-colors"
          >
            Send Query
          </button>
        </div>
        <div className="w-full lg:w-[30%] h-56 sm:h-64 md:h-72 lg:h-[520px]">
          <Image
            src="/Images/vision.png"
            alt="Vision"
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Grobird Logo & Navigation */}
      <div className="relative pt-6 sm:pt-8 md:pt-10 pb-16 sm:pb-20 md:pb-24 lg:pb-16 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
        {/* Grobird Logo - Centered */}
        <div className="flex justify-center items-center mb-8 sm:mb-10 md:mb-0">
          <p className="text-black uppercase text-3xl sm:text-5xl md:text-7xl lg:text-[120px] xl:text-[269px] font-bold leading-none tracking-wider sm:tracking-widest text-center">
            GROBIRD
          </p>
        </div>

        {/* Navigation Links - Bottom Left on desktop, centered below logo on mobile */}
        <div className="md:absolute md:bottom-4 md:left-10 lg:left-16 xl:left-20 flex justify-center md:justify-start">
          <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 md:gap-3 lg:gap-4 max-w-xs sm:max-w-md md:max-w-none">
            {navigationLinks.map((link, index) => (
              <span
                key={index}
                onClick={() => router.push(link.path)}
                className="text-xs sm:text-sm text-black cursor-pointer hover:text-gray-600 transition-colors whitespace-nowrap"
              >
                {link.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row - Social Media Icons and Legal Links */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-4 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 border-t border-gray-200">
        {/* Social Media Icons */}
        <div className="flex gap-5 sm:gap-4 md:gap-5 items-center order-1 sm:order-none">
          <Image
            src="/Images/footer/linkedin.png"
            alt="LinkedIn"
            width={24}
            height={24}
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 object-contain cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => window.open('https://linkedin.com', '_blank')}
          />

          <Image
            src="/Images/footer/x.png"
            alt="X (Twitter)"
            width={24}
            height={24}
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 object-contain cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => window.open('https://x.com', '_blank')}
          />

          <Image
            src="/Images/footer/insta.png"
            alt="Instagram"
            width={24}
            height={24}
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 object-contain cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => window.open('https://instagram.com', '_blank')}
          />

          <Image
            src="/Images/footer/fb.png"
            alt="Facebook"
            width={24}
            height={24}
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 object-contain cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => window.open('https://facebook.com', '_blank')}
          />

          <Image
            src="/Images/footer/threds.png"
            alt="Threads"
            width={24}
            height={24}
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 object-contain cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => window.open('https://threads.net', '_blank')}
          />
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-4 md:gap-6 items-center text-xs sm:text-xs md:text-sm text-black order-2 sm:order-none">
          <span
            onClick={() => router.push('/privacy')}
            className="cursor-pointer hover:text-gray-600 transition-colors whitespace-nowrap"
          >
            Privacy
          </span>
          <span
            onClick={() => router.push('/terms')}
            className="cursor-pointer hover:text-gray-600 transition-colors whitespace-nowrap"
          >
            Terms of use
          </span>
          <span className="text-gray-600 whitespace-nowrap">
            Grobird © 2025
          </span>
        </div>
      </div>
    </>
  )
}

export default Footer
