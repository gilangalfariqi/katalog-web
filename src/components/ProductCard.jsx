import React, { useState } from 'react';
import { MessageCircle, Image as ImageIcon, Heart } from 'lucide-react';

const CATEGORY_STYLES = {
  'Daily Soft': 'bg-stone-100 text-stone-600 border-stone-200',
  'Chic Look': 'bg-amber-50 text-amber-700 border-amber-200',
  'Trending Now': 'bg-rose-50 text-rose-600 border-rose-200',
};

function getCategoryStyle(category) {
  return CATEGORY_STYLES[category] || 'bg-surface text-soft border-white/10';
}

function getFashionLabel(category) {
  if (!category || category === 'All') return null;
  // Map existing categories to fashion labels if possible
  const labelMap = {
    'Daily Soft': 'Daily Soft',
    'Chic Look': 'Chic Look',
    'Trending Now': 'Trending Now',
  };
  return labelMap[category] || category;
}

export function ProductCard({ product, index = 0, onClick, onToggleWishlist, isWishlisted = false, whatsappNumber = '082174128947' }) {
  const [imageError, setImageError] = useState(false);
  
  const whatsappMessage = encodeURIComponent(`Hi Niueuza Wear, I'm interested in ${product.name} (${product.formattedPrice})`);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const handleCardClick = () => {
    console.log(`[Analytics] Product clicked: ${product.name}`);
    if (onClick) onClick();
  };

  const fashionLabel = getFashionLabel(product.category);

  return (
    <div
      className="group rounded-2xl overflow-hidden hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-accent/10 flex flex-col h-full animate-fade-in bg-surface border border-white/5 cursor-pointer relative"
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={handleCardClick}
    >
      <div className="relative h-56 w-full overflow-hidden bg-surface-light flex items-center justify-center">
        {product.image_url && !imageError ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              e.target.src = '/fallback.png';
              setImageError(true);
            }}
          />
        ) : (
          <ImageIcon className="w-16 h-16 text-soft/40" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Label */}
        {fashionLabel && (
          <div className={`absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-sm z-10 ${getCategoryStyle(product.category)}`}>
            {fashionLabel}
          </div>
        )}
        
        {product.badge && (
          <div className="absolute top-3 right-12 bg-accent text-text text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-accent/30 flex items-center gap-1 z-10 backdrop-blur-sm bg-opacity-90">
            {product.badge === 'Best Seller' && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-text opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-text"></span>
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
              ? 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30' 
              : 'bg-background/40 text-soft/70 hover:bg-background/60 hover:text-text'
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} className={isWishlisted ? "scale-110" : "scale-100"} />
        </button>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-text mb-1 line-clamp-1 group-hover:text-accent transition-colors duration-300">{product.name}</h3>
        <p className="text-soft/80 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
        
        <div className="mt-auto flex flex-col gap-4">
          <span className="text-xl font-extrabold text-accent">{product.formattedPrice}</span>
          
          <a 
            href={whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary-light hover:to-accent text-white font-medium rounded-xl py-3 px-4 transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-accent/40 active:scale-[0.98]"
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

