import React, { useState } from 'react';
import { MessageCircle, Heart, Image as ImageIcon, Zap } from 'lucide-react';

export function HeroProduct({ product, onToggleWishlist, isWishlisted = false, whatsappNumber = '082174128947' }) {
  const [imageError, setImageError] = useState(false);

  if (!product) return null;

  const waMessage = encodeURIComponent(
    `Halo Nieuza Wear, saya tertarik dengan produk "${product.name}" seharga ${product.formattedPrice}. Apakah masih tersedia?`
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${waMessage}`;

  // Use dynamic data from Supabase with fallback
  const soldCount = product.sold;
  const reviewCount = product.review_count;
  const customersSeed = String(product.id || '').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const customersCount = 500 + (customersSeed % 1500);
  const discountPercent = product.hasDiscount ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="w-full rounded-3xl overflow-hidden bg-gradient-to-br from-white via-white to-orange-50/30 border border-orange-100/50 shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Section */}
        <div className="relative h-96 lg:h-auto min-h-96 overflow-hidden bg-gray-100 flex items-center justify-center group">
          {product.image_url && !imageError ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <ImageIcon className="w-24 h-24 text-gray-300" />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-20" />

          {/* Badge */}
          <div className="absolute top-6 left-6 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg animate-pulse">
            <span>🔥</span>
            <span>Best Seller</span>
          </div>

          {/* Discount Badge */}
          {product.hasDiscount && (
            <div className="absolute top-6 right-6 z-10 bg-red-500 text-white px-3.5 py-2 rounded-full font-bold text-sm shadow-lg">
              HEMAT {discountPercent}%
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist?.(product.id);
            }}
            className={`absolute bottom-6 right-6 p-3 rounded-full z-10 backdrop-blur-md transition-all duration-300 hover:scale-110 ${
              isWishlisted
                ? 'bg-rose-500/90 text-white shadow-lg'
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-rose-500 shadow-md'
            }`}
            aria-label="Tambah ke wishlist"
          >
            <Heart size={24} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          {/* Tagline */}
          <div className="mb-4">
            <span className="inline-block bg-orange-100 text-orange-700 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              ⭐ Koleksi Unggulan
            </span>
            <p className="text-sm text-gray-600 font-medium mb-2">Temukan gaya terbaikmu hari ini</p>
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {product.name}
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Trust Elements */}
          <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-white/60 rounded-2xl border border-white/80">
            <div className="flex items-center gap-2">
              <span className="text-xl">⭐</span>
              <div>
                <p className="font-bold text-gray-900">{product.rating.toFixed(1)}</p>
                <p className="text-xs text-gray-600">{reviewCount} ulasan</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🔥</span>
              <div>
                <p className="font-bold text-gray-900">{soldCount}+</p>
                <p className="text-xs text-gray-600">Terjual bulan ini</p>
              </div>
            </div>
            {/* <div className="flex items-center gap-2">
              <span className="text-xl">👥</span>
              <div>
                <p className="font-bold text-gray-900">{customersCount}+</p>
                <p className="text-xs text-gray-600">Pelanggan puas</p>
              </div>
            </div> */}
            <div className="flex items-center gap-2">
              <span className="text-xl">✅</span>
              <div>
                <p className="font-bold text-gray-900">Terjamin</p>
                <p className="text-xs text-gray-600">Kualitas terbaik</p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-8">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl font-black text-primary">
                {product.formattedPrice}
              </span>
              {product.hasDiscount && (
                <span className="text-xl text-gray-400 line-through">
                  {product.formattedOriginalPrice}
                </span>
              )}
            </div>
            <p className="text-sm text-emerald-600 font-semibold flex items-center gap-1">
              ✅ Diskon spesial hari ini!
            </p>
          </div>

          {/* Urgency Messages */}
          <div className="mb-8 space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-orange-600">
              <Zap size={16} />
              <span>Stok terbatas - pesan sekarang!</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
              <span>✅</span>
              <span>Pengiriman cepat ke seluruh Indonesia</span>
            </div>
          </div>

          {/* CTA Button */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary via-orange-500 to-orange-600 hover:from-primary hover:via-orange-600 hover:to-orange-700 text-white font-bold rounded-2xl py-4 px-6 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-orange-500/40 hover:scale-105 active:scale-95 text-lg"
          >
            <MessageCircle size={22} />
            <span>Pesan Sekarang - Hubungi WhatsApp 🔥</span>
          </a>

          {/* Micro Copy */}
          <p className="text-xs text-center text-gray-500 mt-4">
            Outfit yang bikin kamu tampil lebih percaya diri
          </p>
        </div>
      </div>
    </div>
  );
}
