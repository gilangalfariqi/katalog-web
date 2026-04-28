import React, { useEffect, useState } from 'react';
import { X, MessageCircle, Image as ImageIcon, Tag } from 'lucide-react';

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

export function ProductModal({ product, onClose, whatsappNumber = '082174128947' }) {
  const [imageError, setImageError] = useState(false);

  // ESC to close
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = product ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [product]);

  if (!product) return null;

  const waMessage = encodeURIComponent(
    `Halo Nieuza Wear, saya tertarik dengan produk "${product.name}" seharga ${product.formattedPrice}. Apakah masih tersedia?`
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${waMessage}`;

  return (
    <>
      {/* Overlay — z-40 */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal wrapper — z-50, click outside closes */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        onClick={onClose}
      >
        {/* Panel — stop propagation so inner clicks don't close */}
        <div
          className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:grid md:grid-cols-2 animate-modal-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-product-title"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Close ── */}
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
            {product.category && product.category !== 'All' && product.category !== 'Other' && (
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                {product.category}
              </div>
            )}

            {/* Product badge */}
            {product.badge && (
              <div className={`absolute top-4 right-14 text-xs font-bold px-3 py-1.5 rounded-full shadow-md ${
                product.badge === 'Best Seller'
                  ? 'bg-amber-500 text-white'
                  : product.badge === 'New'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-primary text-white'
              }`}>
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

            {/* Name */}
            <h2
              id="modal-product-title"
              className="text-2xl font-semibold text-gray-900 leading-snug mb-2"
            >
              {product.name}
            </h2>

            {/* Rating & Sold */}
            <div className="mb-4 flex items-center gap-4">
              <StarRating rating={product.rating} reviewCount={product.review_count} />
              <span className="text-xs text-orange-600 font-semibold">🔥 Terjual {product.sold}+</span>
            </div>

            {/* Dynamic Discount Flag */}
            {product.discount && (
              <div className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full mb-4 inline-block">
                Diskon hari ini
              </div>
            )}

            {/* Price */}
            <div className="flex flex-col gap-0.5 mb-6">
              {product.hasDiscount && (
                <span className="text-sm text-gray-400 line-through">
                  {product.formattedOriginalPrice}
                </span>
              )}
              <span className="text-xl font-bold text-primary">
                {product.formattedPrice}
              </span>
            </div>

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
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mb-6 text-xs text-amber-700">
              <span className="mt-0.5 shrink-0">📦</span>
              <span>Pemesanan &amp; informasi ketersediaan stok dikonfirmasi langsung melalui WhatsApp.</span>
            </div>

            {/* Actions */}
            <div className="mt-auto pt-5 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl py-3.5 px-6 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <MessageCircle size={20} />
                <span>Pesan Sekarang</span>
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
