import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useWishlist() {
  const [wishlistIds, setWishlistIds] = useLocalStorage('katalog_wishlist', []);

  const toggleWishlist = useCallback((productId) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  }, [setWishlistIds]);

  const isInWishlist = useCallback((productId) => {
    return wishlistIds.includes(productId);
  }, [wishlistIds]);

  return {
    wishlistIds,
    toggleWishlist,
    isInWishlist
  };
}
