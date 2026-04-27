import React from 'react';
import { MessageCircle, Mail } from 'lucide-react';

export function Footer() {
  const whatsappNumber = '082174128947';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Halo%20Nieuza%20Wear!`;

  return (
    <footer
      id="contact"
      className="border-t border-black/5 bg-background pt-16 pb-8 relative overflow-hidden"
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[200px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* GRID SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* LOGO */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/nieuza1.png" 
                alt="Nieuza Wear" 
                className="h-13 w-auto object-contain"
              />
              <span className="text-lg font-serif font-bold bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent tracking-wide">Niueuza Wear</span>
            </div>
            <p className="text-soft text-sm leading-relaxed max-w-xs">
              Curated women's fashion that evolves with you. Elegant, modern,
              and effortlessly stylish — designed for the confident woman.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-text text-lg mb-2">
              Quick Links
            </h3>
            <a href="#" className="text-soft hover:text-accent transition-colors text-sm w-fit">Home</a>
            <a href="#products" className="text-soft hover:text-accent transition-colors text-sm w-fit">Collection</a>
            <a href="#" className="text-soft hover:text-accent transition-colors text-sm w-fit">About Us</a>
            <a href="#" className="text-soft hover:text-accent transition-colors text-sm w-fit">Terms & Conditions</a>
          </div>

          {/* CONTACT */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-text text-lg mb-2">
              Contact Us
            </h3>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-soft hover:text-text group transition-colors w-fit"
            >
              <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center group-hover:bg-accent transition-colors duration-300 border border-black/5">
                <MessageCircle size={18} />
              </div>
              <span className="text-sm">+62 821-7412-8947</span>
            </a>

            <a
              href="mailto:alfrq26@gmail.com"
              className="flex items-center gap-3 text-soft hover:text-text group transition-colors w-fit"
            >
              <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center group-hover:bg-accent transition-colors duration-300 border border-black/5">
                <Mail size={18} />
              </div>
              <span className="text-sm">alfrq26@gmail.com</span>
            </a>
          </div>

        </div>

        {/* BOTTOM FOOTER */}
        <div className="pt-8 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} Niueuza Wear. Designed with elegance.
          </p>

          <div className="flex gap-4 text-sm text-muted">
            <a href="#" className="hover:text-soft transition-colors">
              Privacy Policy
            </a>
            <span>&bull;</span>
            <a href="#" className="hover:text-soft transition-colors">
              Terms of Service
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
