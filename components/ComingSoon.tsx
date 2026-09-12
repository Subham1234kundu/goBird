"use client";

import { useEffect, useState } from "react";

export default function ComingSoon() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020b17] px-6 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_35%),radial-gradient(circle_at_bottom,_rgba(249,115,22,0.18),_transparent_30%),linear-gradient(180deg,#020b17_0%,#07182b_100%)]" />

      {isLoading ? (
        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-cyan-400/30 border-t-cyan-400" />
          <p className="text-sm uppercase tracking-[0.5em] text-slate-300">Loading</p>
        </div>
      ) : (
        <div className="relative z-10 max-w-3xl text-center">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.6em] text-cyan-300">
            Grobird
          </p>

          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
            Coming Soon
          </h1>

          <p className="mt-6 text-base text-slate-300 sm:text-lg md:text-xl">
            We are preparing the launch experience. The site is currently hosted,
            but the full public release is not live yet.
          </p>

          <div className="mt-10 flex items-center justify-center gap-3 text-sm uppercase tracking-[0.28em] text-slate-300">
            <span className="h-2.5 w-2.5 rounded-full bg-orange-500 shadow-[0_0_18px_rgba(249,115,22,0.9)] animate-pulse" />
            <span>Launching soon</span>
          </div>
        </div>
      )}
    </main>
  );
}
