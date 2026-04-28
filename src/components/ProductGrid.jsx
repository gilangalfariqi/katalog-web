import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ProductCard } from './ProductCard';
import { HeroProduct } from './HeroProduct';
import { PackageX, ChevronLeft, ChevronRight } from 'lucide-react';

function SkeletonCard({ delay = 0 }) {
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col h-[460px] bg-white border border-black/5 shadow-sm animate-pulse"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-full h-56 bg-gray-200" />
      <div className="p-5 flex flex-col gap-3 flex-grow">
        <div className="h-5 bg-gray-200 rounded-md w-3/4" />
        <div className="h-3.5 bg-gray-100 rounded-md w-40" />
        <div className="h-4 bg-gray-100 rounded-md w-full" />
        <div className="h-4 bg-gray-100 rounded-md w-5/6" />
        <div className="mt-auto flex flex-col gap-2.5">
          <div className="h-6 bg-gray-200 rounded-md w-1/3" />
          <div className="h-3.5 bg-gray-100 rounded-md w-28" />
          <div className="h-11 w-full bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ title, subtitle, accentColor = 'bg-primary' }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <span className={`w-1.5 h-8 rounded-full ${accentColor} shadow-md`} />
        <h3 className="text-2xl font-black text-gray-900">{title}</h3>
      </div>
      {subtitle && (
        <p className="text-sm text-gray-600 ml-5 font-medium">{subtitle}</p>
      )}
    </div>
  );
}

function ProductCarousel({ products, onProductClick, onToggleWishlist, wishlistIds }) {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const itemWidthRef = useRef(0);

  const updateScrollButtons = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 1
    );
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getItemWidth = () => {
      const width = container.clientWidth;
      if (window.innerWidth >= 1280) return width / 4;
      if (window.innerWidth >= 1024) return width / 3;
      if (window.innerWidth >= 640) return width / 2;
      return width;
    };

    const handleResize = () => {
      itemWidthRef.current = getItemWidth();
      updateScrollButtons();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let interval;
    const startAutoScroll = () => {
      interval = setInterval(() => {
        if (isPaused || !container) return;
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 1) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: itemWidthRef.current, behavior: 'smooth' });
        }
        setTimeout(updateScrollButtons, 350);
      }, 3000);
    };

    startAutoScroll();
    container.addEventListener('scroll', updateScrollButtons);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('scroll', updateScrollButtons);
    };
  }, [isPaused, updateScrollButtons]);

  const scroll = useCallback((direction) => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollBy({ left: direction * itemWidthRef.current, behavior: 'smooth' });
    setTimeout(updateScrollButtons, 350);
  }, [updateScrollButtons]);

  return (
    <div
      className="relative group/carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Left Arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll(-1)}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/95 backdrop-blur-sm rounded-full shadow-xl border border-gray-100 flex items-center justify-center text-gray-500 hover:text-primary hover:scale-110 transition-all duration-200 opacity-0 group-hover/carousel:opacity-100"
          aria-label="Produk sebelumnya"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Scroll Container */}
      <div
        ref={containerRef}
        className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>
        {products.map((product, index) => (
          <div
            key={product.id}
            className="snap-start flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
          >
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

      {/* Right Arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll(1)}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/95 backdrop-blur-sm rounded-full shadow-xl border border-gray-100 flex items-center justify-center text-gray-500 hover:text-primary hover:scale-110 transition-all duration-200 opacity-0 group-hover/carousel:opacity-100"
          aria-label="Produk selanjutnya"
        >
          <ChevronRight size={22} />
        </button>
      )}
    </div>
  );
}

export function ProductGrid({ products, loading, error, onProductClick, onToggleWishlist, wishlistIds = [] }) {
  // Debug logging
  useEffect(() => {
    if (products.length > 0) {
      console.log('📱 [ProductGrid] Received', products.length, 'products');
      console.log('📱 [ProductGrid] Breakdown:', {
        total: products.length,
        featured: products.filter(p => p.is_featured).length,
        regular: products.filter(p => !p.is_featured).length,
      });
    }
  }, [products]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <SkeletonCard key={i} delay={i * 80} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center bg-red-50 border border-red-100 rounded-2xl">
        <p className="text-red-500 font-medium mb-1">Gagal memuat produk.</p>
        <p className="text-sm text-gray-400">{error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center bg-white rounded-2xl border border-black/5 shadow-sm">
        <PackageX size={64} className="text-gray-200 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Produk tidak tersedia</h3>
        <p className="text-sm text-gray-400">Silakan cek kategori lain atau hapus filter pencarian.</p>
      </div>
    );
  }

  const heroProduct = products[0];
  const allProducts = products;

  console.log('📊 [ProductGrid] Layout breakdown:', {
    heroProduct: heroProduct ? 1 : 0,
    allProducts: allProducts.length,
    total: allProducts.length,
  });

  return (
    <div className="w-full flex flex-col gap-16">
      {/* ── Hero Product ── */}
      {heroProduct && (
        <div className="w-full">
          <HeroProduct
            product={heroProduct}
            onToggleWishlist={onToggleWishlist}
            isWishlisted={wishlistIds.includes(heroProduct.id)}
          />
        </div>
      )}

      {/* ── Semua Koleksi (carousel, 4 per row, auto-slide) ── */}
      {allProducts.length > 0 && (
        <div className="w-full bg-gradient-to-b from-amber-50/40 to-orange-50/20 rounded-3xl p-8 lg:p-12 border border-amber-100/40">
          <SectionHeading
            title="✨ Semua Koleksi"
            subtitle="Temukan gaya terbaikmu dengan koleksi lengkap kami"
            accentColor="bg-gradient-to-r from-primary to-blue-500"
          />
          <ProductCarousel
            products={allProducts}
            onProductClick={onProductClick}
            onToggleWishlist={onToggleWishlist}
            wishlistIds={wishlistIds}
          />
        </div>
      )}
    </div>
  );
}
