import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-primary-dark/80 backdrop-blur-md border-b border-white/5 shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <img 
              src="/nieuza1.png" 
              alt="Nieuza Wear" 
              className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-lg"
            />
            <span className="text-xl font-serif font-bold bg-gradient-to-r from-white to-accent bg-clip-text text-transparent tracking-wide">Nieuza Wear</span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-soft">
            <a href="#" className="hover:text-accent transition-colors py-2 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-accent after:transition-all duration-300">Home</a>
            <a href="#products" className="hover:text-accent transition-colors py-2 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-accent after:transition-all duration-300">Collection</a>
            <a href="#contact" className="hover:text-accent transition-colors py-2 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-accent after:transition-all duration-300">Contact</a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="text-soft hover:text-text p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-background/95 backdrop-blur-xl border-b border-white/5 shadow-2xl animate-fade-in">
          <div className="px-4 pt-2 pb-6 flex flex-col gap-4">
            <a 
              href="#" 
              onClick={toggleMenu}
              className="text-base font-medium text-soft hover:text-accent hover:bg-surface/40 px-4 py-3 rounded-xl transition-colors"
            >
              Home
            </a>
            <a 
              href="#products" 
              onClick={toggleMenu}
              className="text-base font-medium text-soft hover:text-accent hover:bg-surface/40 px-4 py-3 rounded-xl transition-colors"
            >
              Collection
            </a>
            <a 
              href="#contact" 
              onClick={toggleMenu}
              className="text-base font-medium text-soft hover:text-accent hover:bg-surface/40 px-4 py-3 rounded-xl transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

