"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const Navbar = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-custom-bg text-white border-b-[0.5px] border-gray-700">
      <div className="flex items-stretch">
        <a 
          href="https://www.grobird.in" 
          className="flex items-center border-r-[0.5px] border-gray-700 px-8 py-2"
        >
          <Image src="/Images/navLogo.png" alt="Logo" width={120} height={40} />
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 justify-end">
          <Link href="/aboutUs" className={`hover:text-gray-300 border-l-[0.5px] border-gray-700 px-4 flex flex-col justify-center min-w-[140px] ${pathname === '/aboutUs' ? 'bg-gradient-to-br from-[#010917] to-[#006BCB]' : ''}`} onClick={() => window.scrollTo(0, 0)}>
            <span className="text-[10px] text-gray-400 mb-1">What we Believe</span>
            <div className="flex items-center justify-between">
              <span className="lg:text-xs xl:text-xs">About Us</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </div>
          </Link>
          <Link href="/services" className={`hover:text-gray-300 border-x-[0.5px] border-gray-700 px-4 flex flex-col justify-center min-w-[140px] ${pathname === '/services' ? 'bg-gradient-to-br from-[#010917] to-[#006BCB]' : ''}`} onClick={() => window.scrollTo(0, 0)}>
            <span className="text-[10px] text-gray-400 mb-1">What we Offer</span>
            <div className="flex items-center justify-between">
              <span className="lg:text-xs xl:text-xs">Services</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </div>
          </Link>
          <Link href="/insights" className={`hover:text-gray-300 border-r-[0.5px] border-gray-700 px-4 flex flex-col justify-center min-w-[140px] ${pathname === '/insights' ? 'bg-gradient-to-br from-[#010917] to-[#006BCB]' : ''}`} onClick={() => window.scrollTo(0, 0)}>
            <span className="text-[10px] text-gray-400 mb-1">Our Learnings</span>
            <div className="flex items-center justify-between">
              <span className="lg:text-xs xl:text-xs">Insights</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </div>
          </Link>
          <Link href="/pressRelease" className={`hover:text-gray-300 border-r-[0.5px] border-gray-700 px-4 flex flex-col justify-center min-w-[160px] ${pathname === '/pressRelease' ? 'bg-gradient-to-br from-[#010917] to-[#006BCB]' : ''}`} onClick={() => window.scrollTo(0, 0)}>
            <span className="text-[10px] text-gray-400 mb-1">What we Did</span>
            <div className="flex items-center justify-between">
              <span className="lg:text-xs xl:text-xs">Press Release</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </div>
          </Link>
          <Link href="/contact" className={`hover:text-gray-300 px-4 flex flex-col justify-center min-w-[140px] ${pathname === '/contact' ? 'bg-gradient-to-br from-[#010917] to-[#006BCB]' : ''}`} onClick={() => window.scrollTo(0, 0)}>
            <span className="text-[10px] text-gray-400 mb-1">Get in touch</span>
            <div className="flex items-center justify-between w-full">
              <span className="lg:text-xs xl:text-xs">Contact</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </div>
          </Link>
        </div>
        
        {/* Mobile Hamburger Menu */}
        <div className="lg:hidden flex items-center justify-end flex-1 px-4">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col justify-center items-center w-6 h-6 space-y-1"
          >
            <span className={`block w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu - Full Screen Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute inset-0 bg-black/80 backdrop-blur-sm z-50 min-h-screen">
          <div className="flex items-stretch border-b-[0.5px] border-gray-700">
            <a href="https://www.grobird.in" className="flex items-center border-r-[0.5px] border-gray-700 px-8 py-2">
              <Image src="/Images/navLogo.png" alt="Logo" width={120} height={40} />
            </a>
            <div className="flex items-center justify-end flex-1 px-4">
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="flex flex-col justify-center items-center w-6 h-6 space-y-1"
              >
                <span className="block w-6 h-0.5 bg-white rotate-45 translate-y-2"></span>
                <span className="block w-6 h-0.5 bg-white opacity-0"></span>
                <span className="block w-6 h-0.5 bg-white -rotate-45 -translate-y-2"></span>
              </button>
            </div>
          </div>
          <div className="flex flex-col h-full justify-center items-center space-y-8 text-2xl">
            <Link href="/aboutUs" className={`hover:text-gray-300 ${pathname === '/aboutUs' ? 'text-[#DC8563]' : ''}`} onClick={() => setIsMenuOpen(false)}>
              About Us
            </Link>
            <Link href="/services" className={`hover:text-gray-300 ${pathname === '/services' ? 'text-[#DC8563]' : ''}`} onClick={() => setIsMenuOpen(false)}>
              Services
            </Link>
            <Link href="/insights" className={`hover:text-gray-300 ${pathname === '/insights' ? 'text-[#DC8563]' : ''}`} onClick={() => setIsMenuOpen(false)}>
              Insights
            </Link>
            <Link href="/pressRelease" className={`hover:text-gray-300 ${pathname === '/pressRelease' ? 'text-[#DC8563]' : ''}`} onClick={() => setIsMenuOpen(false)}>
              Press Release
            </Link>
            <Link href="/contact" className={`hover:text-gray-300 ${pathname === '/contact' ? 'text-[#DC8563]' : ''}`} onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
