"use client"
import Image from "next/image"
import FooterSimple from "@/app/components/FooterSimple"
import PaperBird3D from "@/components/PaperBird3D"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Header with 3D Element - Half Height */}
      <div
        className="w-full flex relative px-4 justify-center h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[600px]"
        style={{
          background: 'linear-gradient(to bottom, #010917 1%, #006BCB 85%, #ffffff 100%)'
        }}
      >
        {/* Boxes Image */}
        <div className="absolute top-[60px] left-0 w-full h-[40vh] z-0">
          <Image src="/Images/boxes.png" alt="Boxes" width={3000} height={1000} className="w-[90%] h-[120%] object-cover opacity-20" />
        </div>

        {/* Content */}
        <div className="flex flex-col items-center mt-8 sm:mt-10 md:mt-12 lg:mt-16 text-center w-full max-w-7xl relative z-50">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-4">
            Oops! Page Not Found (404)
          </h1>
          <p className="text-white font-light text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mb-6 px-4">
            Looks like the page you&apos;re searching for has taken a little detour
          </p>
     
        </div>

        {/* 3D Paper Birds */}
        <PaperBird3D />
      </div>

      {/* Footer */}
      <FooterSimple />
    </div>
  )
}
