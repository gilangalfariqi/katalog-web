import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { SupabaseProductRepository } from '../../infrastructure/repositories/SupabaseProductRepository';
import { GetProductsByIdsUseCase } from '../../domain/usecases/ProductUseCases';

const MAX_RECENT = 5;
const STORAGE_KEY = 'katalog_recently_viewed_ids';

// Initialize instances outside the hook to avoid re-creation on every render
const repository = new SupabaseProductRepository();
const getProductsByIdsUseCase = new GetProductsByIdsUseCase(repository);

export function useRecentlyViewed() {
  const [recentIds, setRecentIds] = useLocalStorage(STORAGE_KEY, []);
  const [recentProducts, setRecentProducts] = useState([]);
  // Only show loading skeleton on the very first fetch; subsequent refreshes are silent
  const [loading, setLoading] = useState(() => recentIds.length > 0);
  const [error, setError] = useState(null);
  const hasLoadedOnce = useRef(false);

  // Sync recent products with Supabase whenever IDs change
  useEffect(() => {
    let cancelled = false;

    async function syncRecentProducts() {
      if (!recentIds || recentIds.length === 0) {
        setRecentProducts([]);
        setLoading(false);
        hasLoadedOnce.current = true;
        return;
      }

      // Show skeleton only on initial load — keep existing products visible on refresh
      if (!hasLoadedOnce.current) {
        setLoading(true);
      }

      try {
        setError(null);
        const validProducts = await getProductsByIdsUseCase.execute(recentIds);

        if (cancelled) return;

        // Maintain insertion order based on recentIds
        const productMap = new Map(validProducts.map(p => [p.id, p]));
        const orderedProducts = recentIds
          .map(id => productMap.get(id))
          .filter(Boolean);

        setRecentProducts(orderedProducts);

        // Prune localStorage if any products were deleted from the catalogue
        const validIds = orderedProducts.map(p => p.id);
        if (validIds.length !== recentIds.length) {
          setRecentIds(validIds);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to sync recently viewed products');
        }
      } finally {
        if (!cancelled) {
          hasLoadedOnce.current = true;
          setLoading(false);
        }
      }
    }

    syncRecentProducts();

    return () => {
      cancelled = true;
    };
  }, [recentIds, setRecentIds]); // setRecentIds is now stable (memoized in useLocalStorage)

  const addViewedProduct = useCallback((product) => {
    if (!product || !product.id) return;

    setRecentIds((prev) => {
      const filtered = prev.filter(id => id !== product.id);
      return [product.id, ...filtered].slice(0, MAX_RECENT);
    });
  }, [setRecentIds]);

  return {
    recentProducts,
    loading,
    error,
    addViewedProduct
  };
}
