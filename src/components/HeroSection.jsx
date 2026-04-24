import React from 'react';
import { Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="relative py-20 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8">
          <Sparkles size={16} />
          <span>Discover the Extraordinary</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
          Elevate Your Lifestyle with <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Premium Picks
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          Explore our curated catalog of high-quality products. Handpicked for excellence, designed to inspire, and delivered with care.
        </p>
      </div>
    </div>
  );
}
