import React, { useState } from 'react';
import { MessageCircle, Image as ImageIcon, Heart } from 'lucide-react';

export function ProductCard({ product, index = 0, onClick, onToggleWishlist, isWishlisted = false, whatsappNumber = '1234567890' }) {
  const [imageError, setImageError] = useState(false);
  
  const whatsappMessage = encodeURIComponent(`Saya tertarik dengan produk ${product.name} dengan harga ${product.formattedPrice}`);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const handleCardClick = () => {
    console.log(`[Analytics] Product clicked: ${product.name}`);
    if (onClick) onClick();
  };

  return (
    <div 
      className="group glass-panel rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 shadow-md hover:shadow-indigo-500/30 flex flex-col h-full animate-fade-in bg-slate-800/40 border border-slate-700/50 backdrop-blur-md cursor-pointer relative"
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={handleCardClick}
    >
      <div className="relative h-56 w-full overflow-hidden bg-slate-800/80 flex items-center justify-center">
        {product.image && !imageError ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <ImageIcon className="w-16 h-16 text-slate-600" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {product.badge && (
          <div className="absolute top-3 left-3 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-indigo-500/30 flex items-center gap-1 z-10 backdrop-blur-sm bg-opacity-90">
            {product.badge === 'Best Seller' && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
            )}
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleWishlist) onToggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full z-10 backdrop-blur-sm transition-all duration-300 ${
            isWishlisted 
              ? 'bg-rose-500/20 text-rose-500 hover:bg-rose-500/30' 
              : 'bg-slate-900/40 text-white/70 hover:bg-slate-900/60 hover:text-white'
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} className={isWishlisted ? "scale-110" : "scale-100"} />
        </button>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-50 mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
        
        <div className="mt-auto flex flex-col gap-4">
          <span className="text-xl font-extrabold text-indigo-400">{product.formattedPrice}</span>
          
          <a 
            href={whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl py-3 px-4 transition-all duration-300 shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
            aria-label={`Contact on WhatsApp about ${product.name}`}
          >
            <MessageCircle size={18} />
            <span>Order via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
