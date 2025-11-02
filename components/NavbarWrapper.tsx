'use client'

import dynamic from 'next/dynamic'

const Navbar = dynamic(() => import('./Navbar'), {
  ssr: false,
  loading: () => (
    <nav className="bg-custom-bg text-white border-b-[0.5px] border-gray-700">
      <div className="flex items-stretch">
        <div className="flex items-center border-r-[0.5px] border-gray-700 px-8 py-2">
          <div className="w-[120px] h-[40px] bg-gray-700 animate-pulse rounded"></div>
        </div>
        <div className="hidden lg:flex flex-1 justify-end">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-l-[0.5px] border-gray-700 px-4 flex flex-col justify-center min-w-[140px]">
              <div className="h-3 bg-gray-700 animate-pulse rounded mb-1"></div>
              <div className="h-4 bg-gray-700 animate-pulse rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
})

export default Navbar