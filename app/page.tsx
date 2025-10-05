import BirdCarousel from "@/components/BirdCarousel"
import CloudLayers3D from "@/components/CloudLayers3D"

const Home = () => {
  return (
    <div>
      {/* header */}
      <div className="w-full h-[1000px] sm:h-[1100px] md:h-[1200px] lg:h-[1300px] flex relative px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 justify-center " style={{background: 'linear-gradient(to bottom, #010917 1%, #000 8%, #006BCB 85%, #ffffff 100%)'}}>
        
        <div className="flex flex-col items-center mt-10 sm:mt-14 md:mt-16 text-center w-full max-w-7xl ">
          <h1 className="text-white text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-6xl font-semibold leading-snug sm:leading-tight mb-2 sm:mb-1 px-2">
            Transforming Ideas into <br className="hidden sm:block" /> Scalable Digital Solutions
          </h1>
          <p className="text-white font-thin text-xs sm:text-base md:text-md lg:text-md leading-relaxed max-w-4xl mb-6 sm:mb-7 px-4">
            Grobird accelerates innovation through IT consulting, software <br className="hidden sm:block" /> development, and cloud solutions.
          </p>
          <div className="flex flex-row gap-3 sm:gap-4 items-center justify-center">
            <button className="bg-[#FF672C] text-white px-6 sm:px-9 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-[#e55a24] transition-colors">
              Talk to Us
            </button>
            <button className="bg-white text-black px-6 sm:px-8 py-1.5 sm:py-2 rounded-full text-xs hover:bg-gray-100 transition-colors">
              Explore Services
            </button>
          </div>
        </div>
        
        {/* 3D Clouds */}
        <CloudLayers3D />
        
        {/* 3D Bird Carousel */}
        <BirdCarousel />
      </div>
    </div>
  )
}

export default Home
