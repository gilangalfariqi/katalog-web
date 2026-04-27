import React from 'react';
import { ProductCard } from './ProductCard';
import { History, Eye } from 'lucide-react';

export function RecentlyViewedSection({ products, loading, onProductClick, onToggleWishlist, wishlistIds }) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-soft border border-white/5 shadow-sm">
          <History size={20} />
        </div>
        <h2 className="text-2xl font-bold text-text">Terakhir Dilihat</h2>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {[...Array(4)].map((_, i) => (
            <div key={`recent-skeleton-${i}`} className="rounded-2xl overflow-hidden flex flex-col h-[420px] bg-surface border border-white/5 shadow-sm animate-pulse">
              <div className="w-full h-56 bg-surface-light"></div>
              <div className="p-5 flex flex-col gap-3 flex-grow">
                <div className="h-6 bg-surface-light rounded-md w-3/4 mb-2"></div>
                <div className="h-4 bg-surface-light rounded-md w-full"></div>
                <div className="h-4 bg-surface-light rounded-md w-5/6"></div>
                <div className="mt-auto flex flex-col gap-4">
                  <div className="h-8 bg-surface-light rounded-md w-1/3"></div>
                  <div className="h-12 w-full bg-surface-light rounded-xl"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : !products || products.length === 0 ? (
        <div className="py-16 text-center flex flex-col items-center justify-center bg-surface rounded-2xl border border-white/5 shadow-sm">
          <Eye size={48} className="text-soft/30 mb-4" />
          <h3 className="text-xl font-semibold text-soft mb-2">Belum ada produk dilihat</h3>
          <p className="text-muted max-w-sm">Jelajahi koleksi kami dan produk yang Anda lihat akan muncul di sini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {products.map((product, index) => (
            <div key={`recent-${product.id}`} className="transform scale-95 origin-left">
              <ProductCard
                product={product}
                index={index}
                onClick={() => onProductClick(product)}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.includes(product.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

