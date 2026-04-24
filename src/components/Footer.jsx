import React from 'react';
import { MessageCircle, Mail } from 'lucide-react';

export function Footer() {
  const whatsappNumber = '082174128947';
  const whatsappLink = `https://wa.me/${082174128947}?text=Halo%20Katalog!`;

  return (
    <footer id="contact" className="border-t border-slate-800 bg-slate-900/50 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[200px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand & Description */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <span className="font-bold text-lg text-white">K</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-white">Katalog</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Membawa pengalaman belanja premium ke ujung jari Anda. Kami mengkurasi produk-produk terbaik dengan kualitas terjamin untuk gaya hidup modern Anda.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-white text-lg mb-2">Tautan Cepat</h3>
            <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm w-fit">Beranda</a>
            <a href="#products" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm w-fit">Katalog Produk</a>
            <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm w-fit">Tentang Kami</a>
            <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm w-fit">Syarat & Ketentuan</a>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-white text-lg mb-2">Hubungi Kami</h3>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-slate-400 hover:text-white group transition-colors w-fit"
            >
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                <MessageCircle size={18} />
              </div>
              <span className="text-sm">+62 821-7412-8947</span>
            </a>

            <a
              href="alfrq26@gmail.com"
              className="flex items-center gap-3 text-slate-400 hover:text-white group transition-colors w-fit"
            >
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                <Mail size={18} />
              </div>
              <span className="text-sm">alfrq26@gmail.com</span>
            </a>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Katalog Web. Didesain dengan presisi.
          </p>
          <div className="flex gap-4 text-sm text-slate-600">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
