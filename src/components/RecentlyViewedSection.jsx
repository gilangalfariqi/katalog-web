import React from 'react';
import { ProductCard } from './ProductCard';
import { History } from 'lucide-react';

export function RecentlyViewedSection({ products, onProductClick, onToggleWishlist, wishlistIds }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="border-t border-slate-800/50 pt-16 mt-16 mb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400">
          <History size={20} />
        </div>
        <h2 className="text-2xl font-bold text-white">Terakhir Dilihat</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 opacity-80 hover:opacity-100 transition-opacity duration-300">
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
    </section>
  );
}
