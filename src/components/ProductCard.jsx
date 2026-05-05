import React, { useState } from 'react';
import { ShoppingCart, Heart, Image as ImageIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export function ProductCard({
  product,
  index = 0,
  onClick,
}) {
  const [imageError, setImageError] = useState(false);
  const { addToCart, isInCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    showToast(`"${product.name}" added to bag`, 'success');
  };

  return (
    <article 
      className="group relative flex flex-col h-full cursor-pointer overflow-visible"
      onClick={() => onClick?.(product)}
    >
      {/* Background Decorative Element - Unique Touch */}
      <div className="absolute inset-0 bg-beige-50 rounded-3xl translate-y-4 translate-x-2 group-hover:translate-y-2 group-hover:translate-x-1 transition-all duration-500 -z-10 opacity-50" />
      
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-500 group-hover:shadow-2xl shine-effect">
        {product.image_url && !imageError ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            loading={index < 4 ? 'eager' : 'lazy'}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-beige-100">
            <ImageIcon size={40} className="text-brown-200" />
          </div>
        )}
        
        {/* Category Badge - Small & Elegant */}
        {product.category && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/80 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-brown-900 rounded-full border border-white/50">
              {product.category}
            </span>
          </div>
        )}

        {/* Quick Add Button - Floating Style */}
        <div className="absolute inset-x-3 bottom-3 transition-all duration-500 opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-6 lg:group-hover:opacity-100 lg:group-hover:translate-y-0">
          <button
            onClick={handleAddToCart}
            disabled={isInCart(product.id)}
            className="w-full bg-brown-900 text-white font-bold py-3.5 rounded-2xl shadow-2xl hover:bg-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-[10px] md:text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2"
          >
            <ShoppingCart size={14} />
            {isInCart(product.id) ? 'In Bag' : 'Add to Bag'}
          </button>
        </div>
      </div>

      {/* Content Area - Offset for Unique Look */}
      <div className="pt-6 px-2 flex flex-col flex-1 space-y-2">
        <div className="flex justify-between items-start gap-3">
          <h3 className="font-serif text-lg md:text-xl font-black text-brown-900 leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-brown-900 tracking-tighter">
              {product.formattedPrice}
            </span>
          </div>
          
          {/* Subtle Rating */}
          {product.rating > 0 && (
            <div className="flex items-center gap-1 bg-beige-100/50 px-2 py-1 rounded-lg">
              <span className="text-primary text-xs">★</span>
              <span className="text-[10px] font-black text-brown-900">
                {product.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

