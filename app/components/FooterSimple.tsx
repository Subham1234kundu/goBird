'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"

const FooterSimple = () => {
  const router = useRouter()

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
      {/* Grobird Logo & Navigation */}

      <div className="relative pt-6 sm:pt-8 md:pt-10 pb-16 sm:pb-20 md:pb-24 lg:pb-16 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">

  {/* Logo */}
<div className="flex justify-center items-center mb-8 sm:mb-10 md:mb-0 px-2 overflow-hidden">
  <p className="text-black uppercase text-[18vw] sm:text-5xl md:text-7xl lg:text-[120px] xl:text-[200px] font-bold leading-none tracking-normal sm:tracking-widest text-center w-full">
    GROBIRD
  </p>
</div>



  {/* Navigation */}
    <div className="md:absolute md:bottom-4 md:left-10 lg:left-16 xl:left-20 flex justify-center md:justify-start">

  {/* Mobile layout */}
  <div className="flex md:hidden justify-between items-start w-full max-w-md relative px-2">

    {/* Left links */}
    <div className="flex flex-col gap-2 text-[14px]">
      <span onClick={() => router.push('/services')} className="cursor-pointer hover:text-gray-600">
        Services
      </span>
      <span onClick={() => router.push('/case-studies')} className="cursor-pointer hover:text-gray-600">
        Case Studies
      </span>
      <span onClick={() => router.push('/aboutUs')} className="cursor-pointer hover:text-gray-600">
        About
      </span>
    </div>

    {/* Center vertical line */}
    <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-black opacity-30"></div>

    {/* Right links (fixed alignment) */}
    <div className="flex flex-col gap-2 text-[14px] items-start">
      <span onClick={() => router.push('/blog')} className="cursor-pointer hover:text-gray-600">
        Blog
      </span>
      <span onClick={() => router.push('/careers')} className="cursor-pointer hover:text-gray-600">
        Careers
      </span>
      <span onClick={() => router.push('/contact')} className="cursor-pointer hover:text-gray-600">
        Contact
      </span>
    </div>

  </div>

  {/* Desktop navigation unchanged */}
  <div className="hidden md:flex flex-wrap justify-start gap-3 lg:gap-4">
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
  <div className="flex gap-5 items-center order-1 sm:order-none">
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
  <div className="flex flex-wrap justify-center sm:justify-end gap-5 items-center text-[16px] sm:text-xs md:text-sm text-black order-2 sm:order-none">
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

export default FooterSimple
