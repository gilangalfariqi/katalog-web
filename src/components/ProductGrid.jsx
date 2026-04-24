import React from 'react';
import { ProductCard } from './ProductCard';
import { PackageX } from 'lucide-react';

export function ProductGrid({ products, loading, error, onProductClick, onToggleWishlist, wishlistIds = [] }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="glass-panel rounded-2xl overflow-hidden flex flex-col h-[420px] bg-slate-800/20 border border-slate-700/30 animate-pulse" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="w-full h-56 bg-slate-700/50"></div>
            <div className="p-5 flex flex-col gap-3 flex-grow">
              <div className="h-6 bg-slate-700/60 rounded-md w-3/4 mb-2"></div>
              <div className="h-4 bg-slate-700/40 rounded-md w-full"></div>
              <div className="h-4 bg-slate-700/40 rounded-md w-5/6"></div>
              <div className="mt-auto flex flex-col gap-4">
                <div className="h-8 bg-slate-700/60 rounded-md w-1/3"></div>
                <div className="h-12 w-full bg-indigo-500/20 rounded-xl"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center glass-panel rounded-2xl border-red-500/20">
        <p className="text-red-400 mb-2">Oops! Something went wrong.</p>
        <p className="text-slate-400 text-sm">{error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center glass-panel rounded-2xl border-slate-700/50">
        <PackageX size={64} className="text-slate-600 mb-4" />
        <h3 className="text-xl font-semibold text-slate-300 mb-2">No products found</h3>
        <p className="text-slate-500">Try adjusting your search query.</p>
      </div>
    );
  }

  const featuredProducts = products.filter(p => p.badge === 'Featured');
  const normalProducts = products.filter(p => p.badge !== 'Featured');

  return (
    <div className="flex flex-col gap-12">
      {/* Featured Section */}
      {featuredProducts.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-indigo-300 mb-6 flex items-center gap-2">
            <span className="w-8 h-px bg-indigo-500/50"></span>
            Featured Highlights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index} 
                onClick={() => onProductClick(product)} 
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.includes(product.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Standard Grid */}
      {normalProducts.length > 0 && (
        <div>
          {featuredProducts.length > 0 && (
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-slate-700"></span>
              All Products
            </h3>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {normalProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index} 
                onClick={() => onProductClick(product)} 
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.includes(product.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
