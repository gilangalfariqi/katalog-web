import React, { useState, useCallback, useEffect } from 'react';
import { HeroSection } from '../components/HeroSection';
import { SearchBar } from '../components/SearchBar';
import { ProductGrid } from '../components/ProductGrid';
import { ProductCard } from '../components/ProductCard';
import { ProductModal } from '../components/ProductModal';
import { useProducts } from '../presentation/hooks/useProducts';

export function CatalogPage({ onCartClick }) {
  const { products = [], categories = [], loading = false, loadingCategories = false, error = null, searchProducts, fetchByCategory } = useProducts() || {};

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const newArrivals = (products || []).slice(0, 6);

  useEffect(() => {
    let observer;
    const initObserver = () => {
      try {
        observer = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.05 });

        document.querySelectorAll('.reveal').forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight) {
            el.classList.add('active');
          } else {
            observer.observe(el);
          }
        });
      } catch (e) {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
      }
    };

    const timer = setTimeout(initObserver, 300);
    const fallbackTimer = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.active)').forEach(el => el.classList.add('active'));
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
      if (observer) observer.disconnect();
    };
  }, [products, loading]);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    if (fetchByCategory) fetchByCategory(category);
    const element = document.getElementById('collection');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }, [fetchByCategory]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <main className="flex flex-col min-h-screen bg-[#FDFCFB]">
      <HeroSection />

      {/* New Arrivals Slider */}
      <section id="new-arrivals" className="fluid-py overflow-hidden">
        <div className="container-max mb-12 flex items-end justify-between px-4 reveal">
          <div className="space-y-2">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Curated Selection</span>
            <h2 className="leading-tight text-3xl md:text-5xl">New Arrivals</h2>
          </div>
          <div className="hidden md:block">
            <p className="text-brown-400 text-sm font-medium italic">Swipe to explore →</p>
          </div>
        </div>

        <div className="flex gap-6 overflow-x-auto px-4 md:px-12 no-scrollbar cursor-grab active:cursor-grabbing reveal pb-10">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="min-w-[280px] md:min-w-[380px] h-[500px] bg-beige-100 animate-pulse rounded-3xl" />
            ))
          ) : (
            newArrivals.map((product, index) => (
              <div key={product.id || index} className="min-w-[280px] md:min-w-[380px] transition-transform duration-500 hover:scale-[1.02]">
                <ProductCard
                  product={product}
                  index={index}
                  onClick={() => handleProductClick(product)}
                />
              </div>
            ))
          )}
          <div className="min-w-[20px]" />
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="bg-brown-900 py-32 md:py-48 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary rounded-full blur-[120px]" />
        </div>

        <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-20 items-center px-4 md:px-8 relative z-10">
          <div className="space-y-10 reveal">
            <h2 className="text-white leading-tight text-4xl md:text-6xl lg:text-7xl">
              Timeless Elegance, <br /> Consciously <span className="text-primary italic">Crafted.</span>
            </h2>
            <div className="space-y-6 text-beige-100/70 text-lg md:text-xl font-light leading-relaxed max-w-xl">
              <p>At Nieuza, we focus on enduring style and intentional craftsmanship.</p>
              <p>Each piece is curated with focus on timeless design and superior quality fabrics.</p>
            </div>
          </div>

          <div className="relative reveal">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/5">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
                alt="Philosophy"
                className="w-full h-full object-cover grayscale-[0.3]"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary p-8 rounded-2xl shadow-luxury hidden md:block">
              <p className="text-brown-900 font-serif font-black text-2xl italic leading-tight">Since <br /> 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Section */}
      <section id="collection" className="fluid-py px-4 scroll-mt-20 reveal">
        <div className="container-max space-y-20">
          <div className="text-center space-y-10">
            <div className="space-y-2">
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">The Archive</span>
              <h2 className="leading-tight text-3xl md:text-5xl">Our Collection</h2>
            </div>
            <SearchBar
              onSearch={searchProducts}
              categories={['All', ...(categories || [])]}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryChange}
              loadingCategories={loadingCategories}
            />
          </div>

          <div className="flex flex-col gap-16">
            <div className="flex items-center justify-between border-b border-beige-100 pb-10">
              <h3 className="text-xl md:text-2xl font-serif font-black text-brown-900 capitalize italic">
                {selectedCategory === 'All' ? 'Full Archive' : selectedCategory}
              </h3>
              <p className="text-brown-400 text-xs md:text-sm font-black uppercase tracking-widest">
                {products.length} Designs
              </p>
            </div>

            <ProductGrid
              products={products}
              loading={loading}
              error={error}
              onProductClick={handleProductClick}
            />
          </div>
        </div>
      </section>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </main>
  );
}



