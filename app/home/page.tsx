

import BirdCarousel from '../../components/BirdCarousel'
import CloudLayers3D from '../../components/CloudLayers3D'
import Image from 'next/image'

const Home = () => {
  return (
    <div>

      {/* header */}
      <div className="w-full h-[900px] sm:h-[1000px] md:h-[1000px] lg:h-[1150px] xl:h-[1200px] 2xl:h-[1500px] flex relative px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 justify-center overflow-hidden" style={{background: 'linear-gradient(to bottom, #010917 1%, #000 8%, #006BCB 90%, #ffffff 100%)'}}>

        {/* 3D Cloud Layers with Subtle Animation */}
        <CloudLayers3D />
        
        <div className="flex flex-col items-center mt-16 sm:mt-18 md:mt-16 lg:mt-18 xl:mt-14 2xl:mt-20 text-center w-full max-w-7xl 2xl:max-w-8xl relative z-10">
          <h1 className="text-white text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-light leading-snug sm:leading-tight mb-2 sm:mb-1 px-2">
            Transforming Ideas into <br className="hidden sm:block" /> Scalable Digital Solutions
          </h1>
          <p className="text-white font-thin text-base sm:text-base md:text-md lg:text-md xl:text-lg 2xl:text-2xl leading-relaxed max-w-4xl 2xl:max-w-6xl mb-6 sm:mb-7 xl:mb-8 2xl:mb-10 px-4">
            Grobird accelerates innovation through IT consulting, software <br className="hidden sm:block" /> development, and cloud solutions.
          </p>
          <div className="flex flex-row gap-3 sm:gap-4 items-center justify-center">
            <button className="bg-[#FF672C] text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-[#e55a24] transition-colors">
              Talk to Us
            </button>
            <button className="bg-white text-black px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-gray-100 transition-colors">
              Explore Services
            </button>
          </div>

          <div className="w-full relative aspect-[2/1] sm:aspect-[2.5/1] md:aspect-[3/1] xl:aspect-[3.2/1] 2xl:aspect-[4/1] mt-8 xl:mt-10 2xl:mt-12">
            <Image src="/Images/boxes.png" alt="Boxes" width={800} height={300} className="absolute bottom-50 left-1/2 -translate-x-1/2 w-[120%] sm:w-[110%] md:w-full lg:w-full xl:w-[95%] 2xl:w-[90%] h-full object-contain opacity-25" />
          </div>
        </div>
        
        {/* 3D Bird Carousel */}
        <BirdCarousel />
      </div>
    </div>
  )
}

export default Home
