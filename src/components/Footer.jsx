import React from 'react';
import { MessageCircle, Mail } from 'lucide-react';

export function Footer() {
  const whatsappNumber = '082174128947';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Halo%20Nieuza%20Wear!`;

  return (
    <footer
      id="contact"
      className="bg-[#3e2f25] text-white border-t border-white/10 py-16 px-6 relative overflow-hidden"
    >
      {/* Premium subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-[150px] bg-white/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* GRID SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-left">

          {/* LOGO */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <div className="flex items-center gap-3">
              <img 
                src="/nieuza1.png" 
                alt="Nieuza Wear" 
                className="h-13 w-auto object-contain"
              />
              <span className="text-lg font-serif font-bold text-white tracking-wide">Niueuza Wear</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Curated women's fashion that evolves with you. Elegant, modern,
              and effortlessly stylish — designed for the confident woman.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <h3 className="font-semibold text-white text-lg mb-2">
              Quick Links
            </h3>
            <a href="#" className="text-white/60 hover:text-white transition-all duration-300 hover:translate-x-1 text-sm w-fit">Home</a>
            <a href="#products" className="text-white/60 hover:text-white transition-all duration-300 hover:translate-x-1 text-sm w-fit">Collection</a>
            <a href="#" className="text-white/60 hover:text-white transition-all duration-300 hover:translate-x-1 text-sm w-fit">About Us</a>
            <a href="#" className="text-white/60 hover:text-white transition-all duration-300 hover:translate-x-1 text-sm w-fit">Terms & Conditions</a>
          </div>

          {/* CONTACT */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <h3 className="font-semibold text-white text-lg mb-2">
              Contact Us
            </h3>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white/70 hover:text-white group transition-colors w-fit"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300 border border-white/10 text-white">
                <MessageCircle size={18} />
              </div>
              <span className="text-sm">+62 821-7412-8947</span>
            </a>

            <a
              href="mailto:alfrq26@gmail.com"
              className="flex items-center gap-3 text-white/70 hover:text-white group transition-colors w-fit"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300 border border-white/10 text-white">
                <Mail size={18} />
              </div>
              <span className="text-sm">alfrq26@gmail.com</span>
            </a>
          </div>

        </div>

        {/* BOTTOM FOOTER */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-sm text-white/50">
          <p>© 2026 Niueuza Wear. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
