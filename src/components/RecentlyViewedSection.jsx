import React from 'react';
import { ProductCard } from './ProductCard';
import { Clock, Eye } from 'lucide-react';

function RecentSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden flex flex-col h-[460px] bg-white border border-black/5 shadow-sm animate-pulse">
      <div className="w-full h-56 bg-gray-200" />
      <div className="p-5 flex flex-col gap-3 flex-grow">
        <div className="h-5 bg-gray-200 rounded-md w-3/4" />
        <div className="h-3.5 bg-gray-100 rounded-md w-36" />
        <div className="h-4 bg-gray-100 rounded-md w-full" />
        <div className="h-4 bg-gray-100 rounded-md w-5/6" />
        <div className="mt-auto flex flex-col gap-2.5">
          <div className="h-6 bg-gray-200 rounded-md w-1/3" />
          <div className="h-3.5 bg-gray-100 rounded-md w-24" />
          <div className="h-11 w-full bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function RecentlyViewedSection({ products, loading, onProductClick, onToggleWishlist, wishlistIds = [] }) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary border border-primary/20 shadow-sm shrink-0">
          <Clock size={18} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 leading-tight">Baru saja kamu lihat</h2>
          <p className="text-sm text-gray-500">Produk yang sudah kamu telusuri</p>
        </div>
      </div>

      <div className="h-px bg-primary/10 mb-8" />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <RecentSkeleton key={`recent-skeleton-${i}`} />
          ))}
        </div>
      ) : !products || products.length === 0 ? (
        <div className="py-14 text-center flex flex-col items-center justify-center bg-white/60 rounded-2xl border border-black/5">
          <Eye size={48} className="text-gray-300 mb-3" />
          <h3 className="text-lg font-semibold text-gray-600 mb-1">Belum ada produk dilihat</h3>
          <p className="text-sm text-gray-400 max-w-xs">
            Jelajahi koleksi kami — produk yang kamu lihat akan muncul di sini.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={`recent-${product.id}`}
              product={product}
              index={index}
              onClick={() => onProductClick(product)}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
