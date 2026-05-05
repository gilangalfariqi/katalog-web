import React from 'react';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  const scrollToCollection = () => {
    const element = document.getElementById('collection');
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToPhilosophy = () => {
    const element = document.getElementById('philosophy');
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-cream-50/50 -skew-x-12 translate-x-1/4 z-0 hidden lg:block" />

      <div className="container-max mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 py-12 md:py-20 lg:py-28">
          {/* Text Content */}
          <div className="w-full lg:w-3/5 space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs md:text-sm font-bold tracking-[0.2em] uppercase rounded-full">
                New Collection 2026
              </span>
              <h1 className="leading-[1.1] tracking-tight">
                Timeless <span className="text-primary italic">Elegance</span> <br className="hidden md:block" /> For Your Style
              </h1>
              <p className="text-lg md:text-xl text-brown-600 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Discover curated pieces designed for modern confidence.
                Experience intentional craftsmanship that transcends seasons.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={scrollToCollection}
                className="group relative px-8 py-5 bg-primary text-white text-lg font-bold rounded-2xl transition-all hover:shadow-luxury hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  Explore Collection
                  <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button
                onClick={scrollToPhilosophy}
                className="px-8 py-5 text-brown-900 text-lg font-bold hover:text-primary transition-colors"
              >
                View Lookbook
              </button>
            </div>

            {/* Trust Badges - Subtle */}
            <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 border-t border-gray-100">
              <div className="text-center lg:text-left">
                <p className="text-2xl font-black text-brown-900">5k+</p>
                <p className="text-xs text-brown-400 font-bold uppercase tracking-tighter">Happy Customers</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center lg:text-left">
                <p className="text-2xl font-black text-brown-900">100%</p>
                <p className="text-xs text-brown-400 font-bold uppercase tracking-tighter">Premium Quality</p>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="w-full lg:w-2/5 reveal">
            <div className="relative aspect-[4/5] md:aspect-[3/2] lg:aspect-[4/5] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl group">
              <img
                src="/nieuzaLogo.png"
                alt="Nieuza Featured Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop';
                }}
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2rem]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

