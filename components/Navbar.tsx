"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const Navbar = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-custom-bg  text-white border-b-[0.5px] border-gray-700">
      <div className="flex items-stretch">
        <Link 
          href="/" 
          className="flex items-center border-r-[0.5px] border-gray-700 px-8 py-2"
          onClick={() => window.scrollTo(0, 0)}
        >
          <Image src="/Images/navLogo.png" alt="Logo" width={120} height={40} />
        </Link>
        
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
     {/* Mobile Menu - Full Screen Overlay */}

     {/* Mobile Menu - Full Screen Overlay */}
{isMenuOpen && (
  <div className="lg:hidden absolute inset-0 bg-black/90 backdrop-blur-sm z-50 min-h-screen">
    
    {/* Top bar */}
   <div className="flex items-stretch md:border-b-[0.5px] md:border-gray-700">

      <Link
        href="/"
        className="flex items-center md:border-r-[0.5px] md:border-gray-700 px-8 py-2"

        onClick={() => {
          setIsMenuOpen(false);
          window.scrollTo(0, 0);
        }}
      >
        <Image src="/Images/navLogo.png" alt="Logo" width={120} height={40} />
      </Link>

      <div className="flex items-center justify-end flex-1 px-4">
        <button
          onClick={() => setIsMenuOpen(false)}
          className="relative flex justify-center items-center w-10 h-10 bg-[#FF672C] rounded-full"
        >
          <span className="absolute w-6 h-0.5 bg-white rotate-45"></span>
          <span className="absolute w-6 h-0.5 bg-white -rotate-45"></span>
        </button>
      </div>
    </div>

    {/* Menu links start from top */}
    <div className="flex flex-col items-start space-y-8 text-2xl px-10 pt-12">

      <Link
        href="/"
        className={`${pathname === "/" ? "text-[#FF672C]" : ""}`}
        onClick={() => setIsMenuOpen(false)}
      >
        Home
      </Link>

      <Link
        href="/aboutUs"
        className={`${pathname === "/aboutUs" ? "text-[#FF672C]" : ""}`}
        onClick={() => setIsMenuOpen(false)}
      >
        About Us
      </Link>

      <Link
        href="/services"
        className={`${pathname === "/services" ? "text-[#FF672C]" : ""}`}
        onClick={() => setIsMenuOpen(false)}
      >
        Services
      </Link>

      <Link
        href="/insights"
        className={`${pathname === "/insights" ? "text-[#FF672C]" : ""}`}
        onClick={() => setIsMenuOpen(false)}
      >
        Insights
      </Link>

      <Link
        href="/pressRelease"
        className={`${pathname === "/pressRelease" ? "text-[#FF672C]" : ""}`}
        onClick={() => setIsMenuOpen(false)}
      >
        Press Release
      </Link>

      <Link
        href="/contact"
        className={`${pathname === "/contact" ? "text-[#FF672C]" : ""}`}
        onClick={() => setIsMenuOpen(false)}
      >
        Contact
      </Link>

    </div>
  </div>
)}


    </nav>
  )
}

export default Navbar
