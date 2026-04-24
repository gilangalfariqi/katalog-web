import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

const MAX_RECENT = 5;

export function useRecentlyViewed() {
  const [recentProducts, setRecentProducts] = useLocalStorage('katalog_recently_viewed', []);

  const addViewedProduct = useCallback((product) => {
    if (!product || !product.id) return;
    
    setRecentProducts((prev) => {
      // Remove if it already exists to avoid duplicates
      const filtered = prev.filter(p => p.id !== product.id);
      // Add to front
      const updated = [product, ...filtered];
      // Keep only max items
      return updated.slice(0, MAX_RECENT);
    });
  }, [setRecentProducts]);

  return {
    recentProducts,
    addViewedProduct
  };
}
