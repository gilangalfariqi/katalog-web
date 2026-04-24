import React, { useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { SearchBar } from '../components/SearchBar';
import { ProductGrid } from '../components/ProductGrid';
import { ProductModal } from '../components/ProductModal';
import { RecentlyViewedSection } from '../components/RecentlyViewedSection';
import { useProducts } from '../presentation/hooks/useProducts';
import { useWishlist } from '../presentation/hooks/useWishlist';
import { useRecentlyViewed } from '../presentation/hooks/useRecentlyViewed';

export function CatalogPage() {
  const { products, loading, error, searchProducts } = useProducts();
  const { wishlistIds, toggleWishlist } = useWishlist();
  const { recentProducts, addViewedProduct } = useRecentlyViewed();
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Derive categories dynamically from products
  const categories = ['All', ...new Set(products.map(p => p.category))];

  // Apply frontend filter
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    addViewedProduct(product);
  };

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-8">
        <HeroSection />
        
        <div className="mb-12 sticky top-24 z-40">
          <SearchBar 
            onSearch={searchProducts} 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        <section id="products" className="scroll-mt-32">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Featured Collection</h2>
            <span className="text-sm font-medium text-slate-400 px-3 py-1 rounded-full bg-slate-800">
              {loading ? '...' : filteredProducts.length} items
            </span>
          </div>
          
          <ProductGrid 
            products={filteredProducts} 
            loading={loading} 
            error={error} 
            onProductClick={handleProductClick}
            onToggleWishlist={toggleWishlist}
            wishlistIds={wishlistIds}
          />
        </section>
      </main>

      {/* Recently Viewed */}
      <RecentlyViewedSection 
        products={recentProducts} 
        onProductClick={handleProductClick}
        onToggleWishlist={toggleWishlist}
        wishlistIds={wishlistIds}
      />

      {/* Product Detail Modal */}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </>
  );
}
