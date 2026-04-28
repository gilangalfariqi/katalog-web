import React, { useState, useCallback, useEffect } from 'react';
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

  // Debug: Log products on mount and changes
  React.useEffect(() => {
    if (!loading && products.length > 0) {
      console.log('📄 [CatalogPage] Products loaded:', {
        total: products.length,
        featured: products.filter(p => p.is_featured).length,
        regular: products.filter(p => !p.is_featured).length,
        categories: [...new Set(products.map(p => p.category))],
      });
    }
  }, [products, loading]);

  const handleCategoryChange = useCallback((category) => {
    console.log('🔀 [CatalogPage] Category changed to:', category);
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

      <main className="w-full bg-gradient-to-b from-white via-white to-gray-50/30">
        {/* Search & Filter — centered container */}
        <section className="w-full py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Emotional Tagline */}
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Koleksi Fashion Terpercaya</p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Outfit yang Bikin Kamu Tampil Percaya Diri
              </h1>
              <p className="text-gray-600 text-lg">Temukan gaya terbaikmu dengan ribuan pilihan dari brand terpercaya</p>
            </div>

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

      {/* Recently Viewed — distinct background for visual separation */}
      <section className="w-full border-t border-gray-200 bg-gradient-to-b from-gray-50/60 to-gray-100/40">
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

