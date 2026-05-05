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
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 lg:p-8 pointer-events-none">
        <article 
          className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row pointer-events-auto animate-modal-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-3 bg-white/80 backdrop-blur-md text-brown-900 rounded-full shadow-lg hover:bg-white transition-all group"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform" />
          </button>

          {/* Left: Image */}
          <div className="md:w-1/2 relative bg-beige-50">
            {product.image_url && !imageError ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-beige-100">
                <ImageIcon size={64} className="text-brown-200" />
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="md:w-1/2 flex flex-col p-8 md:p-12 lg:p-16 overflow-y-auto custom-scrollbar">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-block px-4 py-1 bg-beige-100 text-brown-400 text-xs font-bold uppercase tracking-widest rounded-full">
                  {product.category || 'Collection'}
                </span>
                <h2 className="text-4xl lg:text-5xl font-serif font-black text-brown-900 leading-tight">
                  {product.name}
                </h2>
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-black text-brown-900">
                    {product.formattedPrice}
                  </span>
                  {product.hasDiscount && product.originalPrice && (
                    <span className="text-xl text-brown-300 line-through font-medium">
                      {product.formattedOriginalPrice}
                    </span>
                  )}
                </div>
              </div>

              <div className="h-px bg-gray-100" />

              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-brown-900">Description</h4>
                <p className="text-brown-600 text-lg font-light leading-relaxed">
                  {product.description || 'Premium quality fashion piece, crafted with attention to detail and modern elegance. Perfect for creating effortless, timeless looks.'}
                </p>
              </div>

              {/* Actions */}
              <div className="pt-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={isInCart(product.id)}
                    className="w-full btn-primary disabled:bg-gray-400"
                  >
                    {isInCart(product.id) ? 'Added to Bag' : 'Add to Bag'}
                  </button>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 border-2 border-brown-900 text-brown-900 font-bold rounded-2xl hover:bg-brown-900 hover:text-white transition-all"
                  >
                    <MessageCircle size={20} />
                    <span>Inquiry</span>
                  </a>
                </div>
                <p className="text-center text-xs text-brown-300">
                  Free shipping on orders over IDR 1.000.000
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}

