import React, { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Navbar({ onOpenCart }) {
  const { totals } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="container-max">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <img src="/nieuzaLogo-nobg.png" alt="Nieuza wear Logo" className="h-12 w-auto group-hover:scale-110 transition-transform duration-300" />
            <span className="text-2xl font-serif font-black text-brown-900 tracking-tight group-hover:text-primary transition-colors">
              Nieuza <span className="text-primary italic">wear</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            <a href="#new-arrivals" className="text-sm font-bold uppercase tracking-widest text-brown-400 hover:text-brown-900 transition-colors">
              New Arrivals
            </a>
            <a href="#collection" className="text-sm font-bold uppercase tracking-widest text-brown-400 hover:text-brown-900 transition-colors">
              Collection
            </a>
            <a href="#philosophy" className="text-sm font-bold uppercase tracking-widest text-brown-400 hover:text-brown-900 transition-colors">
              Philosophy
            </a>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCart}
              className="relative p-3 text-brown-900 hover:bg-beige-50 rounded-2xl transition-all group"
              aria-label="View bag"
            >
              <ShoppingBag size={24} className="group-hover:scale-110 transition-transform" />
              {totals.itemCount > 0 && (
                <span className="absolute top-2 right-2 w-5 h-5 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-lg ring-2 ring-white">
                  {totals.itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-3 text-brown-900 hover:bg-beige-50 rounded-2xl transition-all"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 transition-all duration-500 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <nav className="p-6 flex flex-col gap-6">
          <a href="#new-arrivals" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-serif font-black text-brown-900 border-b border-gray-50 pb-2">
            New Arrivals
          </a>
          <a href="#collection" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-serif font-black text-brown-900 border-b border-gray-50 pb-2">
            Collection
          </a>
          <a href="#philosophy" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-serif font-black text-brown-900 border-b border-gray-50 pb-2">
            Philosophy
          </a>
        </nav>
      </div>
    </header>
  );
}


