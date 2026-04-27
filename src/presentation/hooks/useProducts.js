import { useState, useEffect, useCallback } from 'react';
import { SupabaseProductRepository } from '../../infrastructure/repositories/SupabaseProductRepository';
import { GetProductsUseCase, SearchProductsUseCase, GetCategoriesUseCase, GetProductsByCategoryUseCase } from '../../domain/usecases/ProductUseCases';

// Initialize instances once or use a DI container in larger apps
const repository = new SupabaseProductRepository();
const getProductsUseCase = new GetProductsUseCase(repository);
const searchProductsUseCase = new SearchProductsUseCase(repository);
const getCategoriesUseCase = new GetCategoriesUseCase(repository);
const getProductsByCategoryUseCase = new GetProductsByCategoryUseCase(repository);

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
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

  const fetchCategories = useCallback(async () => {
    try {
      setLoadingCategories(true);
      const data = await getCategoriesUseCase.execute();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    } finally {
      setLoadingCategories(false);
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

  const fetchByCategory = useCallback(async (category) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProductsByCategoryUseCase.execute(category);
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch products by category');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  return {
    products,
    categories,
    loading,
    loadingCategories,
    error,
    searchProducts,
    fetchByCategory,
    refresh: fetchProducts
  };
}
