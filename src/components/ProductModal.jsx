import React, { useEffect, useState } from 'react';
import { X, MessageCircle, Image as ImageIcon, Tag } from 'lucide-react';

export function ProductModal({ product, onClose, whatsappNumber = '082174128947' }) {
  const [imageError, setImageError] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = product ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  if (!product) return null;

  const whatsappMessage = encodeURIComponent(
    `Halo Nieuza Wear, saya tertarik dengan produk ${product.name} (${product.formattedPrice}). Apakah masih tersedia?`
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <>
      {/* Overlay — z-40, closes modal on click */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal wrapper — z-50, also closes on click outside the panel */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        onClick={onClose}
      >
        {/* Modal panel — stopPropagation prevents wrapper click from closing */}
        <div
          className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:grid md:grid-cols-2 animate-modal-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-product-title"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Close Button ── */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center bg-white hover:bg-gray-100 text-gray-500 hover:text-gray-900 rounded-full shadow-md border border-gray-200 transition-all duration-200"
            aria-label="Tutup modal"
          >
            <X size={18} />
          </button>

          {/* ── LEFT: Image ── */}
          <div className="relative w-full h-64 md:h-auto md:min-h-[500px] bg-gray-100 overflow-hidden flex items-center justify-center shrink-0">
            {product.image_url && !imageError ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <ImageIcon className="w-24 h-24 text-gray-300" />
            )}

            {/* Category badge */}
            {product.category && product.category !== 'All' && (
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                {product.category}
              </div>
            )}

            {/* Product badge */}
            {product.badge && (
              <div className="absolute top-4 right-14 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                {product.badge}
              </div>
            )}
          </div>

          {/* ── RIGHT: Details ── */}
          <div className="flex flex-col bg-white p-6 sm:p-8 overflow-y-auto">

            {/* Category tag */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                <Tag size={11} />
                {product.category || 'Fashion'}
              </span>
            </div>

            {/* Product name */}
            <h2
              id="modal-product-title"
              className="text-2xl font-semibold text-gray-900 leading-snug mb-3"
            >
              {product.name}
            </h2>

            {/* Price */}
            <p className="text-xl font-bold text-primary mb-6">
              {product.formattedPrice}
            </p>

            {/* Divider */}
            <div className="h-px bg-gray-100 mb-6" />

            {/* Description */}
            <div className="flex-grow mb-6">
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
                Deskripsi Produk
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {product.description || 'Tidak ada deskripsi detail untuk produk ini.'}
              </p>
            </div>

            {/* Shipping note */}
            <div className="flex items-start gap-2 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 mb-6 text-xs text-gray-500">
              <span className="mt-0.5">📦</span>
              <span>Pemesanan &amp; informasi ketersediaan stok langsung melalui WhatsApp.</span>
            </div>

            {/* Action buttons */}
            <div className="mt-auto pt-5 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-warm text-white font-semibold rounded-xl py-3.5 px-6 shadow-md transition-all duration-300 hover:shadow-lg hover:brightness-105 active:scale-[0.98]"
              >
                <MessageCircle size={20} />
                <span>Pesan via WhatsApp</span>
              </a>
              <button
                onClick={onClose}
                className="sm:w-auto px-6 py-3.5 rounded-xl font-medium text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all duration-200"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
