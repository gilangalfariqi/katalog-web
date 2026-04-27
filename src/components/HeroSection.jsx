import React from 'react';
import { Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary-dark/40 to-background">
      {/* Premium ambient glow layers */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[500px] bg-accent/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-dark/15 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-secondary/40 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 text-center w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6 sm:mb-8 backdrop-blur-sm">
          <Sparkles size={16} />
          <span>Style That Evolves With You</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text mb-4 sm:mb-6 leading-tight animate-scale-in">
          Redefine Your Wardrobe with <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-accent">
            Nieuza Wear
          </span>
        </h1>
        
        <p className="text-sm sm:text-base md:text-lg text-soft max-w-2xl mx-auto leading-relaxed">
          Discover curated women's fashion that evolves with trends. Elegant, modern, and effortlessly stylish — crafted for the confident you.
        </p>
      </div>
    </section>
  );
}

