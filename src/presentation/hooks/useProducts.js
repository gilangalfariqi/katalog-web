import { useState, useEffect, useCallback } from 'react';
import { SupabaseProductRepository } from '../../infrastructure/repositories/SupabaseProductRepository';
import { GetProductsUseCase, SearchProductsUseCase } from '../../domain/usecases/ProductUseCases';

// Initialize instances once or use a DI container in larger apps
const repository = new SupabaseProductRepository();
const getProductsUseCase = new GetProductsUseCase(repository);
const searchProductsUseCase = new SearchProductsUseCase(repository);

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProductsUseCase.execute();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchProducts = useCallback(async (query) => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchProductsUseCase.execute(query);
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to search products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    searchProducts,
    refresh: fetchProducts
  };
}
