import React, { useState, useCallback } from 'react';
import { HeroSection } from '../components/HeroSection';
import { SearchBar } from '../components/SearchBar';
import { ProductGrid } from '../components/ProductGrid';
import { ProductModal } from '../components/ProductModal';
import { RecentlyViewedSection } from '../components/RecentlyViewedSection';
import { useProducts } from '../presentation/hooks/useProducts';
import { useWishlist } from '../presentation/hooks/useWishlist';
import { useRecentlyViewed } from '../presentation/hooks/useRecentlyViewed';

export function CatalogPage() {
  const { products, categories, loading, loadingCategories, error, searchProducts, fetchByCategory } = useProducts();
  const { wishlistIds, toggleWishlist } = useWishlist();
  const { recentProducts, loading: recentLoading, addViewedProduct } = useRecentlyViewed();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    fetchByCategory(category);
  }, [fetchByCategory]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    addViewedProduct(product);
  };

  return (
    <>
      {/* Hero Section — full-width edge-to-edge */}
      <HeroSection />

      <main className="w-full">
        {/* Search & Filter — centered container */}
        <section className="w-full py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 sticky top-24 z-30">
              <SearchBar
                onSearch={searchProducts}
                categories={['All', ...categories]}
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategoryChange}
                loadingCategories={loadingCategories}
              />
            </div>

            {/* Products Section */}
            <section id="products" className="scroll-mt-32">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-text">Koleksi Kami</h2>
                <span className="text-sm font-medium text-soft px-3 py-1 rounded-full bg-surface border border-white/5 shadow-sm">
                  {loading ? '...' : products.length} produk
                </span>
              </div>

              <ProductGrid
                products={products}
                loading={loading}
                error={error}
                onProductClick={handleProductClick}
                onToggleWishlist={toggleWishlist}
                wishlistIds={wishlistIds}
              />
            </section>
          </div>
        </section>
      </main>

      {/* Recently Viewed — full-width with centered container */}
      <section className="w-full border-t border-white/5 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <RecentlyViewedSection
            products={recentProducts}
            loading={recentLoading}
            onProductClick={handleProductClick}
            onToggleWishlist={toggleWishlist}
            wishlistIds={wishlistIds}
          />
        </div>
      </section>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}

