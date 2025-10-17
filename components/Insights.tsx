import { Button } from "./ui/button";



export function Insights() {
    return
    (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-1 px-4 sm:px-5 md:px-7 lg:px-9 xl:px-12 py-3 sm:py-5 md:py-8 lg:py-12 mx-auto items-start sm:items-center justify-between mt-7">
            <h2 className="text-[#000A1B] flex text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium leading-tight w-full lg:w-[80%]">
              <span className="text-[#3B3B3D73] mr-3">All</span>
               <span className="text-[#0B0B0B]">Insights</span>
            </h2>   
            <Button className="self-start sm:self-auto">More articles</Button>
          </div> 
    )


}