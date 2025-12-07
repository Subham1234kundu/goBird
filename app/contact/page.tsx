"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import FooterSimple from "@/app/components/FooterSimple"

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const imagesRef = useRef<HTMLDivElement[]>([])
  const mediumImagesRef = useRef<HTMLDivElement[]>([])
  const textRef = useRef<HTMLDivElement[]>([])
  const [, setCurrentIndex] = useState(0)
  const headerTextRef = useRef<HTMLDivElement>(null)
  const startupsHeadingRef = useRef<HTMLHeadingElement>(null)
  const startupLogosRef = useRef<HTMLDivElement>(null)
  const contactFormRef = useRef<HTMLDivElement>(null)
  const contactInfoRef = useRef<HTMLDivElement>(null)
  const strategicPartnerRef = useRef<HTMLDivElement>(null)
  const statsRefs = useRef<HTMLDivElement[]>([])
  const faqHeadingRef = useRef<HTMLDivElement>(null)
  const faqItemsRef = useRef<HTMLDivElement[]>([])
  const ctaSectionRef = useRef<HTMLDivElement>(null)
  const statCounter1Ref = useRef<HTMLHeadingElement>(null)
  const statCounter2Ref = useRef<HTMLHeadingElement>(null)
  const statCounter3Ref = useRef<HTMLHeadingElement>(null)
  const statCounter4Ref = useRef<HTMLHeadingElement>(null)

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const images = imagesRef.current.filter(Boolean)
    const mediumImages = mediumImagesRef.current.filter(Boolean)
    const texts = textRef.current.filter(Boolean)
    if (images.length === 0) return

    gsap.killTweensOf([...images, ...mediumImages, ...texts])

    images.forEach((img, index) => {
      gsap.set(img, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: index === 0 ? 1 : 0,
        scale: index === 0 ? 1 : 1.05,
      })
    })

    mediumImages.forEach((img, index) => {
      gsap.set(img, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: index === 0 ? 0 : 0,
        scale: 0.92,
        y: 30,
      })
    })

    texts.forEach((text) => {
      gsap.set(text, {
        position: 'absolute',
        opacity: 0,
        x: 50,
      })
    })

    if (mediumImages[0]) {
      gsap.to(mediumImages[0], {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.4,
        delay: 0.6,
        ease: 'power4.out',
      })
    }

    if (texts[0]) {
      gsap.to(texts[0], {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out',
      })
    }

    let isAnimating = false

    const interval = setInterval(() => {
      if (isAnimating) return

      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length
        isAnimating = true

        const tl = gsap.timeline({
          onComplete: () => {
            isAnimating = false
          }
        })

        tl.to(images[prevIndex], {
          opacity: 0,
          scale: 1.05,
          duration: 1.2,
          ease: 'power3.inOut',
        }, 0)

        tl.to(images[nextIndex], {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.inOut',
        }, 0)

        if (mediumImages[prevIndex]) {
          tl.to(mediumImages[prevIndex], {
            opacity: 0,
            scale: 0.92,
            y: -30,
            duration: 1,
            ease: 'power3.inOut',
          }, 0.1)
        }

        if (mediumImages[nextIndex]) {
          tl.to(mediumImages[nextIndex], {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
          }, 0.5)
        }

        if (texts[prevIndex]) {
          tl.to(texts[prevIndex], {
            opacity: 0,
            x: -50,
            duration: 0.7,
            ease: 'power2.inOut',
          }, 0.1)
        }

        if (texts[nextIndex]) {
          tl.to(texts[nextIndex], {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power2.out',
          }, 0.6)
        }

        return nextIndex
      })
    }, 3500)

    return () => {
      clearInterval(interval)
      isAnimating = false
      gsap.killTweensOf([...images, ...mediumImages, ...texts])
    }
  }, [])

  useEffect(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    gsap.killTweensOf('*')

    if (headerTextRef.current) {
      gsap.set(headerTextRef.current.children, { opacity: 0, y: 60 })
      gsap.to(headerTextRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        delay: 0.3,
        ease: 'power3.out'
      })
    }

    if (startupsHeadingRef.current) {
      gsap.set(startupsHeadingRef.current, { opacity: 0, y: 30 })
      gsap.to(startupsHeadingRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: startupsHeadingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })
    }

    if (startupLogosRef.current) {
      gsap.set(startupLogosRef.current.children, { opacity: 0, y: 30 })
      gsap.to(startupLogosRef.current.children, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: startupLogosRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })
    }

    if (contactInfoRef.current) {
      gsap.set(contactInfoRef.current, { opacity: 0, x: -50 })
      gsap.to(contactInfoRef.current, {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: contactInfoRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      })
    }

    if (contactFormRef.current) {
      gsap.set(contactFormRef.current, { opacity: 0, x: 50 })
      gsap.to(contactFormRef.current, {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: contactFormRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      })
    }

    if (strategicPartnerRef.current) {
      gsap.set(strategicPartnerRef.current, { opacity: 0, y: 50 })
      gsap.to(strategicPartnerRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: strategicPartnerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      })
    }

    const stats = statsRefs.current.filter(Boolean)
    if (stats.length > 0) {
      stats.forEach((stat, index) => {
        gsap.set(stat, { opacity: 0, scale: 0.8, y: 50 })
        gsap.to(stat, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          delay: 0.1 * index,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: stats[0],
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        })
      })
    }

    if (faqHeadingRef.current) {
      gsap.set(faqHeadingRef.current, { opacity: 0, y: 50 })
      gsap.to(faqHeadingRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: faqHeadingRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      })
    }

    faqItemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.set(item, { opacity: 0, x: -30 })
        gsap.to(item, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.05,
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        })
      }
    })

    if (ctaSectionRef.current) {
      gsap.set(ctaSectionRef.current, { opacity: 0, y: 50 })
      gsap.to(ctaSectionRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      })
    }

    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      gsap.killTweensOf('*')
    }
  }, [])

  // Counter animation effect
  useEffect(() => {
    const counters = [
      { ref: statCounter1Ref, target: 10, suffix: 'x' },
      { ref: statCounter2Ref, target: 200, suffix: '+' },
      { ref: statCounter3Ref, target: 97, suffix: '%' },
      { ref: statCounter4Ref, target: 5, suffix: '+' }
    ]

    counters.forEach(({ ref, target, suffix }) => {
      if (ref.current && statsRefs.current[1]) {
        const counter = { value: 0 }

        gsap.to(counter, {
          value: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRefs.current[1],
            start: 'top 80%',
            once: true
          },
          onUpdate: () => {
            if (ref.current) {
              ref.current.innerHTML = `${Math.round(counter.value)}<span class="text-[#F95524]">${suffix}</span>`
            }
          }
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setError('All fields are required')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to submit form')
        setLoading(false)
        return
      }

      // Success - reset form
      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      })
      setLoading(false)

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSuccess(false)
      }, 5000)
    } catch (err: any) {
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="w-full h-[500px] sm:h-[600px] md:h-[640px] lg:h-[730px] flex items-start relative overflow-hidden" style={{ backgroundColor: '#000A1B' }}>
        {/* Contact Bird - Absolute positioned on right side */}
        <div className="absolute right-0 top-0 w-[400px] sm:w-[500px] md:w-[600px] lg:w-[700px] h-full">
          <Image
            src="/Images/contactBird.png"
            alt="Contact Bird"
            width={700}
            height={600}
            className="w-full h-full object-contain object-right-top"
          />
        </div>

        {/* Image */}
        <div className="h-full relative z-10 hidden sm:block">
          <Image
            src="/Images/leftTowerContact.png"
            alt="Contact Tower"
            width={70}
            height={700}
            className="h-full object-contain"
          />
        </div>

        {/* Text content */}
        <div ref={headerTextRef} className="flex-1 mt-8 sm:mt-12 md:mt-16 lg:mt-32 px-4 sm:px-6 md:px-0 relative z-10">
          <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[82px] 2xl:text-7xl font-light leading-tight mb-6 sm:mb-8 md:mb-12" style={{ fontWeight: 300 }}>
            92% of our clients return <br className="hidden sm:block" /> with new projects start <br className="hidden sm:block" /> your first today.
          </h1>
          <p className="text-white font-light text-xs sm:text-sm md:text-base lg:text-lg xl:text-[32px] 2xl:text-2xl leading-10">
            Whether you&apos;re exploring ideas, need a trusted tech <br className="hidden md:block" /> partner, or want to transform the way your business <br className="hidden md:block" /> works we&apos;re here to make it happen.
          </p>
        </div>
      </div>

      {/* Startups Section */}
      <div className="w-full py-16 px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <h2 ref={startupsHeadingRef} className="text-black text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-[28.75px] font-medium text-center mb-6 sm:mb-8 mt-14">
            The startups shaping tomorrow trust Grobird
          </h2>

          {/* Startup Company Images Row */}
          <div ref={startupLogosRef} className="flex justify-center items-center gap-2 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-16 2xl:gap-14">
            <div className="relative w-14 h-7 sm:w-24 sm:h-12 md:w-32 md:h-16 lg:w-36 lg:h-18 xl:w-40 xl:h-20 2xl:w-44 2xl:h-22 flex-shrink-0 border-l border-[#E9EBF1]">
              <Image
                src="/Images/startups/company1.png"
                alt="Startup Company 1"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 640px) 56px, (max-width: 768px) 96px, (max-width: 1024px) 128px, (max-width: 1280px) 144px, (max-width: 1536px) 160px, 176px"
              />
            </div>
            <div className="relative w-14 h-7 sm:w-24 sm:h-12 md:w-32 md:h-16 lg:w-36 lg:h-18 xl:w-40 xl:h-20 2xl:w-44 2xl:h-22 flex-shrink-0 border-l border-[#E9EBF1]">
              <Image
                src="/Images/startups/company2.png"
                alt="Startup Company 2"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 640px) 56px, (max-width: 768px) 96px, (max-width: 1024px) 128px, (max-width: 1280px) 144px, (max-width: 1536px) 160px, 176px"
              />
            </div>
            <div className="relative w-14 h-7 sm:w-24 sm:h-12 md:w-32 md:h-16 lg:w-36 lg:h-18 xl:w-40 xl:h-20 2xl:w-44 2xl:h-22 flex-shrink-0 border-l border-[#E9EBF1]">
              <Image
                src="/Images/startups/company3.png"
                alt="Startup Company 3"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 640px) 56px, (max-width: 768px) 96px, (max-width: 1024px) 128px, (max-width: 1280px) 144px, (max-width: 1536px) 160px, 176px"
              />
            </div>
            <div className="relative w-14 h-7 sm:w-24 sm:h-12 md:w-32 md:h-16 lg:w-36 lg:h-18 xl:w-40 xl:h-20 2xl:w-44 2xl:h-22 flex-shrink-0 border-l border-[#E9EBF1]">
              <Image
                src="/Images/startups/company4.png"
                alt="Startup Company 4"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 640px) 56px, (max-width: 768px) 96px, (max-width: 1024px) 128px, (max-width: 1280px) 144px, (max-width: 1536px) 160px, 176px"
              />
            </div>
            <div className="relative w-14 h-7 sm:w-24 sm:h-12 md:w-32 md:h-16 lg:w-36 lg:h-18 xl:w-40 xl:h-20 2xl:w-44 2xl:h-22 flex-shrink-0 border-l border-r border-[#E9EBF1]">
              <Image
                src="/Images/startups/company5.png"
                alt="Startup Company 5"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 640px) 56px, (max-width: 768px) 96px, (max-width: 1024px) 128px, (max-width: 1280px) 144px, (max-width: 1536px) 160px, 176px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-24 justify-between w-full">
            {/* Left Side - Contact Information */}
            <div ref={contactInfoRef} className="flex-1 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[64px] font-light leading-20 mb-8 sm:mb-10 md:mb-12" style={{ fontWeight: 300 }}>
                  We&apos;d love to hear from you. Drop us a message and our team will get back within 24 hours.
                </h2>

                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <h3 className="text-[#616161] text-base sm:text-lg md:text-xl xl:text-[24px] font-medium mb-2">Address:</h3>
                    <p className="text-sm sm:text-base md:text-lg xl:text-[30px] text-black">121, LA, US-121324</p>
                  </div>

                  <div>
                    <h3 className="text-[#616161] text-base sm:text-lg md:text-xl xl:text-[24px] font-medium mb-2">Email:</h3>
                    <p className="text-sm sm:text-base md:text-lg xl:text-[30px] text-black" >inquiry@grobird.in</p>
                  </div>

                  <div>
                    <h3 className="text-[#616161] text-base sm:text-lg md:text-xl xl:text-[24px] font-medium mb-2">Phone:</h3>
                    <p className="text-sm sm:text-base md:text-lg xl:text-[30px] text-black" >+91-9170763968</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div ref={contactFormRef} className="flex-1">
              <form onSubmit={handleSubmit} className="flex flex-col h-full gap-4 sm:gap-6 border rounded-lg p-4 sm:p-6 md:p-8" style={{ borderColor: '#B7B7B7' }}>
                {/* Error Message */}
                {error && (
                  <div className="rounded bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div className="rounded bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-600">
                    Thank you for contacting us! We will get back to you within 24 hours.
                  </div>
                )}

                <div>
                  <label className="block text-black text-sm sm:text-base md:text-lg xl:text-[18px] font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-md text-sm sm:text-base md:text-lg xl:text-[16px] focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50"
                    style={{ borderColor: '#B7B7B7' }}
                  />
                </div>

                <div>
                  <label className="block text-black text-sm sm:text-base md:text-lg xl:text-[18px] font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-md text-sm sm:text-base md:text-lg xl:text-[16px] focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50"
                    style={{ borderColor: '#B7B7B7' }}
                  />
                </div>

                <div>
                  <label className="block text-black text-sm sm:text-base md:text-lg xl:text-[18px] font-medium mb-2">Phone Number:</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-md text-sm sm:text-base md:text-lg xl:text-[16px] focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50"
                    style={{ borderColor: '#B7B7B7' }}
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-black text-sm sm:text-base md:text-lg xl:text-[18px] font-medium mb-2">Message:</label>
                  <textarea
                    name="message"
                    placeholder="Enter your message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full h-full px-3 sm:px-4 py-2 sm:py-3 border rounded-md text-sm sm:text-base md:text-lg xl:text-[16px] resize-none focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50"
                    style={{ borderColor: '#B7B7B7', minHeight: '150px' }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 sm:py-3 mt-4 sm:mt-8 md:mt-12 rounded-full text-white text-sm sm:text-base md:text-lg xl:text-[18px] font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#FE4B00' }}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Partner Section */}
          <div ref={strategicPartnerRef} className="flex flex-col sm:flex-row gap-4 sm:gap-2 px-4 sm:px-5 md:px-7 lg:px-9 xl:px-12 py-6 sm:py-8 md:py-10 lg:py-12 mx-auto items-start sm:items-center justify-between">
            <h2 className="text-[#000A1B] flex flex-col text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[64px] font-medium leading-tight w-full lg:w-[80%]">
              <span className="text-[#3B3B3D73]">More than a service</span>
               <span className="text-[#0B0B0B]">A strategic design<br className="hidden sm:block" />partner.</span>
            </h2>
         
          </div>

         {/* more than a service boxes */}
         <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-3 sm:gap-2 px-4 sm:px-5 md:px-7 lg:px-9 xl:px-12 pb-6 sm:pb-8 md:pb-10 lg:pb-12 mx-auto">
            <Image ref={el => { if (el) statsRefs.current[0] = el }} src="/Images/morethanService.png" alt="More than Service" width={416} height={672} className="w-full md:row-span-2 h-auto object-contain" />
            <div ref={el => { if (el) statsRefs.current[1] = el }} className="bg-[#D3D3D347] rounded-lg flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10 items-start min-h-[100px] sm:min-h-[120px]">
              <h3 ref={statCounter1Ref} className="flex text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold">0<span className="text-[#F95524]">x</span></h3>
              <p className="text-[#5A5A5A] text-xs sm:text-sm xl:text-[18px]">Higher Client Retention</p>
            </div>
             <div ref={el => { if (el) statsRefs.current[2] = el }} className="bg-[#D3D3D347] rounded-lg flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10 items-start min-h-[100px] sm:min-h-[120px]">
              <h3 ref={statCounter2Ref} className="flex text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold">0<span className="text-[#F95524]">+</span></h3>
              <p className="text-[#5A5A5A] text-xs sm:text-sm xl:text-[18px]">Successfully delivered high-quality projects</p>
            </div>
            <div ref={el => { if (el) statsRefs.current[3] = el }} className="bg-[#D3D3D347] rounded-lg flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10 items-start min-h-[100px] sm:min-h-[120px]">
              <h3 ref={statCounter3Ref} className="flex text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold">0<span className="text-[#F95524]">%</span></h3>
              <p className="text-[#5A5A5A] text-xs sm:text-sm xl:text-[18px]">Client satisfaction based on surveys</p>
            </div>
            <div ref={el => { if (el) statsRefs.current[4] = el }} className="bg-[#D3D3D347] rounded-lg flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10 items-start min-h-[100px] sm:min-h-[120px]">
              <h3 ref={statCounter4Ref} className="flex text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold">0<span className="text-[#F95524]">+</span></h3>
              <p className="text-[#5A5A5A] text-xs sm:text-sm xl:text-[18px]">Continents Served</p>
            </div>
          </div>

      {/* FAQ Section */}
      <div className="flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-16 px-4 sm:px-6 md:px-8 lg:px-[4%] py-10 sm:py-12 md:py-16 lg:py-20 my-6 sm:my-8 md:my-12 lg:my-16 " style={{
        background: 'linear-gradient(to bottom, #FFFFFF 0%, #F4F4F4 100%)'
      }}>
        <div ref={faqHeadingRef} className="flex flex-col lg:flex-row justify-between items-start w-full gap-4 sm:gap-6 md:gap-8">
          <div className="flex w-full lg:w-[60%] items-start text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[64px] font-medium text-[#3B3B3D73] flex-col gap-2 xl:pb-10">
            <p>Frequently Asked</p>
            <p className="text-black">Questions</p>
          </div>
          <p className="text-[#2D2C2C] text-xs sm:text-sm md:text-base lg:text-lg xl:text-[32px] w-full lg:w-[32%] leading-10">
            From setup to security, here&apos;s everything you need to know.
          </p>
        </div>

        <div className="flex flex-col w-full px-2 md:px-6 lg:px-10 items-center gap-3 md:gap-4">
          <div ref={el => { if (el) faqItemsRef.current[0] = el }} className="border-[#68636352] rounded-md p-2 px-4 md:p-3 md:px-7 border-1 w-full flex items-center justify-between gap-4">
            <p className="text-[#111111] text-sm md:text-base xl:text-[24px]">What kind of teams use Relay?</p>
            <Image
              src="/Images/serviseImages/plus.png"
              alt="plus"
              width={25}
              height={25}
              className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
            />
          </div>

          <div ref={el => { if (el) faqItemsRef.current[1] = el }} className="border-[#68636352] rounded-md p-2 px-4 md:p-3 md:px-7 border-1 w-full flex items-center justify-between gap-4">
            <p className="text-[#111111] text-sm md:text-base xl:text-[24px]">Does Relay work with Slack and Microsoft Teams?</p>
            <Image
              src="/Images/serviseImages/plus.png"
              alt="plus"
              width={25}
              height={25}
              className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
            />
          </div>

          <div ref={el => { if (el) faqItemsRef.current[2] = el }} className="border-[#68636352] rounded-md p-2 px-4 md:p-3 md:px-7 border-1 w-full flex items-center justify-between gap-4">
            <p className="text-[#111111] text-sm md:text-base xl:text-[24px]">Is there a free trial?</p>
            <Image
              src="/Images/serviseImages/plus.png"
              alt="plus"
              width={25}
              height={25}
              className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
            />
          </div>

          <div ref={el => { if (el) faqItemsRef.current[3] = el }} className="border-[#68636352] rounded-md p-2 px-4 md:p-3 md:px-7 border-1 w-full flex items-center justify-between gap-4">
            <p className="text-[#111111] text-sm md:text-base xl:text-[24px]">Is my data secure?</p>
            <Image
              src="/Images/serviseImages/plus.png"
              alt="plus"
              width={25}
              height={25}
              className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
            />
          </div>

          <div ref={el => { if (el) faqItemsRef.current[4] = el }} className="border-[#68636352] rounded-md p-2 px-4 md:p-3 md:px-7 border-1 w-full flex items-center justify-between gap-4">
            <p className="text-[#111111] text-sm md:text-base xl:text-[24px]">Can I collaborate with my engineering team inside Relay?</p>
            <Image
              src="/Images/serviseImages/plus.png"
              alt="plus"
              width={25}
              height={25}
              className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
            />
          </div>

          <div ref={el => { if (el) faqItemsRef.current[5] = el }} className="border-[#68636352] rounded-md p-2 px-4 md:p-3 md:px-7 border-1 w-full flex items-center justify-between gap-4">
            <p className="text-[#111111] text-sm md:text-base xl:text-[24px]">Does Relay support multi-channel communication?</p>
            <Image
              src="/Images/serviseImages/plus.png"
              alt="plus"
              width={25}
              height={25}
              className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
            />
          </div>

          <div ref={el => { if (el) faqItemsRef.current[6] = el }} className="border-[#68636352] rounded-md p-2 px-4 md:p-3 md:px-7 border-1 w-full flex items-center justify-between gap-4">
            <p className="text-[#111111] text-sm md:text-base xl:text-[24px]">Can I customize how Relay works for my team?</p>
            <Image
              src="/Images/serviseImages/plus.png"
              alt="plus"
              width={25}
              height={25}
              className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div ref={ctaSectionRef} className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-10 md:py-12 lg:py-16">
        <h2 className="text-black text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[42px] font-medium leading-tight text-center sm:text-left">
          Driving 30% Cost Reductions Through <br className="hidden lg:block" />Smarter IT Decisions
        </h2>
        <button className="bg-black text-white px-6 sm:px-8 py-2.5 rounded-full text-sm sm:text-base xl:text-[18px] hover:bg-gray-800 transition-colors whitespace-nowrap">
          Connect Now!
        </button>
      </div>

      {/* Footer Contact Image */}
      <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] relative">
        <Image
          src="/Images/footerContact.png"
          alt="Footer Contact"
          fill
          className="object-cover"
        />
      </div>

      {/* Footer */}
      <FooterSimple />

    </div>
  )
}

export default Contact
