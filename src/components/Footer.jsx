import React from 'react';
import { MessageCircle, Mail } from 'lucide-react';

export function Footer() {
  const whatsappNumber = '082174128947';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Halo%20Nieuza!`;

  return (
    <footer id="contact" className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-20">
          {/* Brand */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <img src="/nieuzaLogo-nobg.png" alt="Nieuza wear Logo" className="h-12 w-auto" />
              <h2 className="text-3xl font-serif font-black text-brown-900 tracking-tight">Nieuza <span className="text-primary italic">wear</span></h2>
            </div>
            <p className="text-brown-400 text-lg font-light leading-relaxed max-w-sm">
              Crafting timeless elegance for the modern woman.
              Our collection is curated with intention and designed for confidence.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-beige-50 flex items-center justify-center text-brown-900 hover:bg-primary hover:text-white transition-all">
                <MessageCircle size={18} />
              </a>
              <a href="mailto:hello@nieuza.com" className="w-10 h-10 rounded-full bg-beige-50 flex items-center justify-center text-brown-900 hover:bg-primary hover:text-white transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-brown-900">Explore</h4>
            <nav className="flex flex-col gap-4">
              <a href="#new-arrivals" className="text-brown-400 hover:text-primary transition-colors text-sm font-medium">New Arrivals</a>
              <a href="#collection" className="text-brown-400 hover:text-primary transition-colors text-sm font-medium">Collection</a>
              <a href="#philosophy" className="text-brown-400 hover:text-primary transition-colors text-sm font-medium">Philosophy</a>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-brown-900">Support</h4>
            <nav className="flex flex-col gap-4">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-brown-400 hover:text-primary transition-colors text-sm font-medium">Contact WhatsApp</a>
              <a href="mailto:hello@nieuza.com" className="text-brown-400 hover:text-primary transition-colors text-sm font-medium">Email Us</a>
              <a href="#" className="text-brown-400 hover:text-primary transition-colors text-sm font-medium">Privacy Policy</a>
            </nav>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-brown-300 font-medium">
            © 2026 Nieuza wear. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-brown-300">
            <a href="#" className="hover:text-brown-900 transition-colors">Instagram</a>
            <a href="#" className="hover:text-brown-900 transition-colors">TikTok</a>
            <a href="#" className="hover:text-brown-900 transition-colors">Pinterest</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

