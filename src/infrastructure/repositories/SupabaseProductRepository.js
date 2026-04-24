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
}
