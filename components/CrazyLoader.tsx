"use client";

import { useEffect, useState } from "react";

const CrazyLoader = ({ progress }: { progress: number }) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (!mounted || !visible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white transition-opacity duration-1000 ${
        progress >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background with a more present, centered orange aura */}
      <div className="absolute inset-0 bg-[#fffcfb]" />
      
      {/* Primary Orange Depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF672B] opacity-[0.08] blur-[120px] rounded-full pointer-events-none" />
      
      {/* Core Orange Glow - specifically centered behind the bird */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#FF672B] opacity-[0.12] blur-[80px] rounded-full pointer-events-none" />

      <div className="relative flex flex-col items-center justify-center">
        {/* Bird Icon - Sits perfectly in the glow */}
        <div className="relative w-28 h-28 mb-10 flex items-center justify-center">
          <img 
            src="/Images/homeBird.png" 
            alt="Grobird Symbol" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Minimal Data Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center">
            <span className="text-xl font-bold text-[#FF672B] tracking-widest tabular-nums">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="w-40 h-[1.5px] bg-gray-100 relative overflow-hidden rounded-full">
            <div 
              className="absolute top-0 left-0 h-full bg-[#FF672B] transition-all duration-300 ease-out shadow-[0_0_8px_rgba(255,103,43,0.3)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <p className="text-[9px] uppercase tracking-[0.6em] text-gray-400 pl-[0.6em] font-bold">
            Taking Flight
          </p>
        </div>
      </div>
    </div>
  );
};

export default CrazyLoader;
