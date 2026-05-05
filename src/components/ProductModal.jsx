import React, { useEffect, useState } from 'react';
import { X, MessageCircle, Image as ImageIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

function StarRating({ rating, reviewCount }) {
  const full = Math.floor(rating);
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-yellow-400 text-sm leading-none tracking-tight select-none">
        {'★'.repeat(full)}{'☆'.repeat(5 - full)}
      </span>
      <span className="text-xs text-gray-800 font-bold">{rating.toFixed(1)}</span>
      <span className="text-xs text-gray-400">({reviewCount} ulasan)</span>
    </div>
  );
}

export function ProductModal({ product, onClose }) {
  const [imageError, setImageError] = useState(false);
  const { addToCart, isInCart } = useCart();
  const { showToast } = useToast();

  // ESC to close
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    showToast(`"${product.name}" added to bag`, 'success');
  };

  const waMessage = encodeURIComponent(
    `Halo Niueza, saya tertarik dengan "${product.name}" (${product.formattedPrice}). Apakah masih tersedia?`
  );
  const whatsappLink = `https://wa.me/082174128947?text=${waMessage}`;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-6 pointer-events-none">
        <article 
          className="relative w-full max-w-4xl max-h-[85vh] md:max-h-[80vh] bg-white rounded-2xl md:rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row pointer-events-auto animate-modal-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button - Minimalist */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 md:top-6 md:right-6 z-20 p-2 md:p-3 bg-white/90 backdrop-blur-md text-brown-900 rounded-full shadow-sm hover:bg-white transition-all duration-300 group active:scale-95"
          >
            <X size={18} className="md:w-5 md:h-5 group-hover:rotate-90 transition-transform duration-500" />
          </button>

          {/* Left: Image Section */}
          <div className="w-full md:w-5/12 h-60 sm:h-72 md:h-auto relative bg-beige-50 flex-shrink-0">
            {product.image_url && !imageError ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-contain"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-beige-100">
                <ImageIcon size={48} className="text-brown-200" />
              </div>
            )}
          </div>

          {/* Right: Content Section */}
          <div className="flex-1 flex flex-col min-h-0 bg-white">
            {/* Scrollable Details */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 md:p-12 custom-scrollbar">
              <div className="space-y-4 md:space-y-6">
                <div className="space-y-2 md:space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brown-400">
                    {product.category || 'Collection'}
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-serif font-black text-brown-900 leading-tight">
                    {product.name}
                  </h2>
                  <div className="flex items-baseline gap-3">
                    <span className="text-lg md:text-2xl font-black text-brown-900">
                      {product.formattedPrice}
                    </span>
                    {product.hasDiscount && product.originalPrice && (
                      <span className="text-sm md:text-lg text-brown-300 line-through">
                        {product.formattedOriginalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <div className="h-px bg-gray-50 w-full" />

                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-brown-300">Description</h4>
                  <p className="text-brown-500 text-xs md:text-base font-light leading-relaxed">
                    {product.description || 'Premium quality fashion piece, crafted with attention to detail and modern elegance. Perfect for creating effortless, timeless looks.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions Section */}
            <div className="p-5 md:p-10 pt-2 md:pt-4 bg-white border-t border-gray-50 md:border-none">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isInCart(product.id)}
                  className="w-full h-11 md:h-14 bg-brown-900 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 disabled:bg-gray-100 disabled:text-gray-400 active:scale-95 flex items-center justify-center"
                >
                  {isInCart(product.id) ? 'In Bag' : 'Add to Bag'}
                </button>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-11 md:h-14 flex items-center justify-center gap-2 border border-brown-900 text-brown-900 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-brown-900 hover:text-white transition-all duration-300 active:scale-95"
                >
                  <MessageCircle size={16} />
                  <span>Inquiry</span>
                </a>
              </div>
              <p className="text-center text-[9px] text-brown-300 mt-3 md:mt-4">
                Free shipping on orders over IDR 1.000.000
              </p>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
