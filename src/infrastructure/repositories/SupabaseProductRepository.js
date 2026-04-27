import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { Product } from '../../domain/models/Product';
import { supabase } from '../api/supabaseClient';

export class SupabaseProductRepository extends ProductRepository {
  async getProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.error('Supabase fetch error:', error);
        throw new Error(error.message || 'Failed to fetch products from Supabase');
      }

      return data ? data.map(item => new Product(item)) : [];
    } catch (error) {
      console.error('Network or unexpected error during fetch:', error);
      throw error;
    }
  }

  async searchProducts(query) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .ilike('name', `%${query}%`)
        .order('id', { ascending: true });

      if (error) {
        console.error('Supabase search error:', error);
        throw new Error(error.message || 'Failed to search products in Supabase');
      }

      return data ? data.map(item => new Product(item)) : [];
    } catch (error) {
      console.error('Network or unexpected error during search:', error);
      throw error;
    }
  }

  async getProductsByIds(ids) {
    try {
      if (!ids || ids.length === 0) return [];
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .in('id', ids)
        .order('id', { ascending: true });

      if (error) {
        console.error('Supabase getProductsByIds error:', error);
        throw new Error(error.message || 'Failed to fetch products by IDs from Supabase');
      }

      return data ? data.map(item => new Product(item)) : [];
    } catch (error) {
      console.error('Network or unexpected error during getProductsByIds:', error);
      throw error;
    }
  }

  async getCategories() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('category');

      if (error) {
        console.error('Supabase getCategories error:', error);
        throw new Error(error.message || 'Failed to fetch categories from Supabase');
      }

      const uniqueCategories = [...new Set((data || []).map(d => d.category).filter(Boolean))];
      return uniqueCategories.sort();
    } catch (error) {
      console.error('Network or unexpected error during getCategories:', error);
      throw error;
    }
  }

  async getProductsByCategory(category) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('id', { ascending: true });

      if (error) {
        console.error('Supabase getProductsByCategory error:', error);
        throw new Error(error.message || 'Failed to fetch products by category from Supabase');
      }

      return data ? data.map(item => new Product(item)) : [];
    } catch (error) {
      console.error('Network or unexpected error during getProductsByCategory:', error);
      throw error;
    }
  }
}
