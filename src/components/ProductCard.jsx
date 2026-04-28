import React, { useState } from 'react';
import { MessageCircle, Image as ImageIcon, Heart } from 'lucide-react';

// ── Design Tokens ────────────────────────────────────────────────────────────

const CATEGORY_PALETTE = [
  'bg-stone-100 text-stone-600 border-stone-200',
  'bg-amber-50  text-amber-700 border-amber-200',
  'bg-rose-50   text-rose-600  border-rose-200',
  'bg-sky-50    text-sky-600   border-sky-200',
  'bg-violet-50 text-violet-600 border-violet-200',
  'bg-emerald-50 text-emerald-600 border-emerald-200',
];

const BADGE_CONFIG = {
  'Best Seller': { emoji: '🔥', bg: 'bg-gradient-to-r from-orange-500 to-red-500', animation: 'animate-pulse' },
  'New':         { emoji: '🆕', bg: 'bg-gradient-to-r from-emerald-500 to-teal-500', animation: 'animate-pulse' },
  'Trending':    { emoji: '⚡', bg: 'bg-gradient-to-r from-yellow-500 to-orange-500', animation: 'animate-pulse' },
  'Featured':    { emoji: '✨', bg: 'bg-gradient-to-r from-primary to-blue-500', animation: 'animate-pulse' },
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function getSeed(product) {
  const idChars = String(product.id || '').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return (product.name?.length || 0) + idChars;
}

function getDiscountPercent(product) {
  if (!product.hasDiscount || !product.originalPrice) return 0;
  return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
}

function categoryStyle(category) {
  if (!category || category === 'All' || category === 'Other') return '';
  const idx = [...category].reduce((a, c) => a + c.charCodeAt(0), 0) % CATEGORY_PALETTE.length;
  return CATEGORY_PALETTE[idx];
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ProductBadge({ badge }) {
  if (!badge) return null;
  const { emoji, bg, animation } = BADGE_CONFIG[badge] ?? { emoji: '', bg: 'bg-primary', animation: '' };
  return (
    <div className={`absolute top-3 right-12 z-10 ${bg} text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur-sm ${animation} uppercase tracking-wider`}>
      <span className="text-sm">{emoji}</span>
      <span>{badge}</span>
    </div>
  );
}

function StarRating({ product }) {
  const rating = product.rating;
  const full = Math.floor(rating);
  const reviewCount = product.review_count;
  return (
    <div className="flex items-center gap-2 bg-amber-50/60 px-2.5 py-1.5 rounded-lg">
      <span className="text-amber-400 text-sm leading-none tracking-tight select-none font-semibold">
        {'★'.repeat(full)}{'☆'.repeat(5 - full)}
      </span>
      <span className="text-xs font-bold text-gray-800">{rating.toFixed(1)}</span>
      <span className="text-xs text-gray-500">({reviewCount})</span>
    </div>
  );
}

function UrgencyText({ product }) {
  const sold = product.sold;
  if (product.is_featured) {
    return (
      <div className="px-2.5 py-1.5 bg-emerald-50 rounded-lg">
        <p className="text-xs text-emerald-700 font-bold flex items-center gap-1">
          ✅ Terjual {sold}+ bulan ini
        </p>
      </div>
    );
  }
  if (sold >= 100) {
    return (
      <div className="px-2.5 py-1.5 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-700 font-bold flex items-center gap-1">
          🚀 Trending - Terjual {sold}+
        </p>
      </div>
    );
  }
  if (sold < 30) {
    const stock = Math.max(3, 8 - Math.floor(sold / 5));
    return (
      <div className="px-2.5 py-1.5 bg-red-50 rounded-lg">
        <p className="text-xs text-red-700 font-bold flex items-center gap-1">
          ⚠️ Stok tersisa {stock}
        </p>
      </div>
    );
  }
  return (
    <div className="px-2.5 py-1.5 bg-orange-50 rounded-lg">
      <p className="text-xs text-orange-700 font-bold flex items-center gap-1">
        🔥 Terjual {sold}+
      </p>
    </div>
  );
}

function ProductCTA({ whatsappLink, productName }) {
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-orange-500 to-orange-600 hover:from-primary hover:via-orange-600 hover:to-orange-700 text-white font-bold rounded-xl py-3.5 px-4 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-orange-500/30 hover:scale-105 active:scale-95 text-sm"
      aria-label={`Pesan ${productName} via WhatsApp`}
    >
      <MessageCircle size={18} />
      <span>Pesan Sekarang</span>
    </a>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export function ProductCard({
  product,
  index = 0,
  onClick,
  onToggleWishlist,
  isWishlisted = false,
  whatsappNumber = '082174128947',
}) {
  const [imageError, setImageError] = useState(false);

  const waMessage = encodeURIComponent(
    `Halo Nieuza Wear, saya tertarik dengan produk "${product.name}" seharga ${product.formattedPrice}. Apakah masih tersedia?`
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${waMessage}`;

  return (
    <div
      className="group rounded-2xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-2xl hover:shadow-black/15 hover:-translate-y-2 hover:scale-[1.04] flex flex-col h-full animate-fade-in bg-white border border-black/5 cursor-pointer relative"
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={() => onClick?.()}
    >
      {/* ── Image ── */}
      <div className="relative h-56 w-full overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
        {product.image_url && !imageError ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <ImageIcon className="w-16 h-16 text-gray-300" />
        )}

        {/* Soft gradient overlay — always present, stronger on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-30 group-hover:opacity-70 transition-opacity duration-400 pointer-events-none" />

        {/* Category pill */}
        {product.category && product.category !== 'All' && product.category !== 'Other' && (
          <div className={`absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-sm z-10 ${categoryStyle(product.category)}`}>
            {product.category}
          </div>
        )}

        {/* Badge */}
        <ProductBadge badge={product.badge} />

        {/* Discount Badge */}
        {product.hasDiscount && (
          <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-red-500 to-red-600 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] shadow-lg uppercase tracking-wider">
            HEMAT {getDiscountPercent(product)}%
          </div>
        )}

        {/* Dynamic Discount Flag from Supabase */}
        {product.discount && (
          <div className="absolute bottom-3 left-3 z-10 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
            Diskon hari ini
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWishlist?.(product.id); }}
          className={`absolute bottom-3 right-3 p-2 rounded-full z-10 backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
            isWishlisted
              ? 'bg-rose-500/20 text-rose-500 hover:bg-rose-500/30'
              : 'bg-white/60 text-gray-500 hover:bg-white/90 hover:text-gray-800'
          }`}
          aria-label={isWishlisted ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
        >
          <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* ── Body ── */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Name */}
        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mb-2.5">
          <StarRating product={product} />
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-3 line-clamp-2 flex-grow leading-relaxed">
          {product.description}
        </p>

        <div className="mt-auto flex flex-col gap-2.5">
          {/* Price - Enhanced */}
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl font-black text-primary">
                {product.formattedPrice}
              </span>
              {product.hasDiscount && (
                <span className="text-sm text-gray-400 line-through font-medium">
                  {product.formattedOriginalPrice}
                </span>
              )}
            </div>
            {product.hasDiscount && (
              <span className="text-xs font-semibold text-emerald-600">✅ Diskon spesial tersedia</span>
            )}
          </div>

          {/* Urgency */}
          <UrgencyText product={product} />

          {/* CTA */}
          <ProductCTA whatsappLink={whatsappLink} productName={product.name} />
        </div>
      </div>
    </div>
  );
}
