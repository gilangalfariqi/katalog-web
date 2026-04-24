import React, { useEffect, useState } from 'react';
import { X, MessageCircle, Image as ImageIcon } from 'lucide-react';

export function ProductModal({ product, onClose, whatsappNumber = '1234567890' }) {
  const [imageError, setImageError] = useState(false);
  
  // Close on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!product) return null;

  const whatsappMessage = encodeURIComponent(`Saya tertarik dengan produk ${product.name} dengan harga ${product.formattedPrice}`);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700/50 rounded-3xl shadow-2xl flex flex-col md:flex-row animate-fade-in">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-900/50 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full backdrop-blur-md transition-colors"
        >
          <X size={24} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 min-h-[300px] md:min-h-[500px] bg-slate-800 flex items-center justify-center relative">
          {product.image && !imageError ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover absolute inset-0"
              onError={() => setImageError(true)}
            />
          ) : (
            <ImageIcon className="w-24 h-24 text-slate-600" />
          )}
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col">
          <div className="mb-2 flex items-center gap-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/30">
              Featured
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
            {product.name}
          </h2>
          
          <div className="text-3xl font-black text-indigo-400 mb-8">
            {product.formattedPrice}
          </div>

          <div className="prose prose-invert prose-slate mb-8 flex-grow">
            <h3 className="text-lg font-semibold text-slate-200 mb-2">Description</h3>
            <p className="text-slate-400 leading-relaxed">
              {product.description || 'No detailed description available for this product.'}
            </p>
          </div>

          <div className="mt-auto pt-8 border-t border-slate-800 flex flex-col sm:flex-row gap-4">
            <a 
              href={whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl py-4 px-6 transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 active:scale-[0.98]"
            >
              <MessageCircle size={22} />
              <span>Pesan via WhatsApp</span>
            </a>
            <button 
              onClick={onClose}
              className="sm:w-auto px-6 py-4 rounded-xl font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
