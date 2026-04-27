import React, { useEffect, useState } from 'react';
import { X, MessageCircle, Image as ImageIcon } from 'lucide-react';

export function ProductModal({ product, onClose, whatsappNumber = '082174128947' }) {
  const [imageError, setImageError] = useState(false);

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  if (!product) return null;

  const whatsappMessage = encodeURIComponent(`Hi Nieuza Wear, I'm interested in ${product.name} (${product.formattedPrice})`);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <>
      {/* Dark overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal wrapper */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative transition-all duration-300 animate-scale-in">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full shadow p-2 text-gray-900 hover:scale-110 transition"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 h-full">
            {/* Image Section */}
            <div className="bg-gray-100 flex items-center justify-center min-h-[300px] md:min-h-[500px]">
              {product.image_url && !imageError ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.target.src = '/fallback.png';
                    setImageError(true);
                  }}
                />
              ) : (
                <ImageIcon className="w-24 h-24 text-gray-300" />
              )}
            </div>

            {/* Content Section */}
            <div className="p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    Featured
                  </span>
                </div>

                <h2 className="text-2xl font-semibold text-gray-900 mb-4 leading-tight">
                  {product.name}
                </h2>

                <div className="text-xl font-bold text-primary mb-6">
                  {product.formattedPrice}
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Deskripsi</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {product.description || 'Tidak ada deskripsi detail untuk produk ini.'}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl py-3 px-6 transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
                >
                  <MessageCircle size={22} />
                  <span>Pesan via WhatsApp</span>
                </a>
                <button
                  onClick={onClose}
                  className="sm:w-auto px-6 py-3 rounded-xl font-semibold text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Kembali
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

