import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-700/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <span className="font-bold text-xl text-white">K</span>
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block group-hover:text-indigo-400 transition-colors">Katalog</span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#" className="hover:text-white hover:text-indigo-400 transition-colors py-2 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-500 after:transition-all">Home</a>
            <a href="#products" className="hover:text-white hover:text-indigo-400 transition-colors py-2 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-500 after:transition-all">Produk</a>
            <a href="#contact" className="hover:text-white hover:text-indigo-400 transition-colors py-2 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-500 after:transition-all">Kontak</a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="text-slate-300 hover:text-white p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl animate-fade-in">
          <div className="px-4 pt-2 pb-6 flex flex-col gap-4">
            <a 
              href="#" 
              onClick={toggleMenu}
              className="text-base font-medium text-slate-300 hover:text-indigo-400 hover:bg-slate-800/50 px-4 py-3 rounded-xl transition-colors"
            >
              Home
            </a>
            <a 
              href="#products" 
              onClick={toggleMenu}
              className="text-base font-medium text-slate-300 hover:text-indigo-400 hover:bg-slate-800/50 px-4 py-3 rounded-xl transition-colors"
            >
              Produk
            </a>
            <a 
              href="#contact" 
              onClick={toggleMenu}
              className="text-base font-medium text-slate-300 hover:text-indigo-400 hover:bg-slate-800/50 px-4 py-3 rounded-xl transition-colors"
            >
              Kontak
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
