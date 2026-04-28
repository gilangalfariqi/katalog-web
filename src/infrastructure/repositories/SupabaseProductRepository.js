import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { Product } from '../../domain/models/Product';
import { supabase } from '../api/supabaseClient';

export class SupabaseProductRepository extends ProductRepository {
  async getProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw new Error(error.message || 'Failed to fetch products');

      console.log(data); // debug: verify rating, sold, review_count, discount fields from Supabase

      const products = (data || []).map(item => new Product(item));
      console.log('✅ [Repository] getProducts() - Fetched', products.length, 'products');
      console.log('📊 [Repository] Product Summary:', {
        total: products.length,
        featured: products.filter(p => p.is_featured).length,
        regular: products.filter(p => !p.is_featured).length,
        categories: [...new Set(products.map(p => p.category))].length,
      });

      return products;
    } catch (error) {
      console.error('❌ [Repository] getProducts error:', error);
      throw error;
    }
  }

  async searchProducts(query) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .ilike('name', `%${query}%`)
        .order('created_at', { ascending: false });

      if (error) throw new Error(error.message || 'Failed to search products');
      const products = (data || []).map(item => new Product(item));
      console.log('🔍 [Repository] searchProducts() - Found', products.length, 'products for query:', query);
      return products;
    } catch (error) {
      console.error('❌ [Repository] searchProducts error:', error);
      throw error;
    }
  }

  async getProductsByIds(ids) {
    try {
      if (!ids || ids.length === 0) return [];
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .in('id', ids);

      if (error) throw new Error(error.message || 'Failed to fetch products by IDs');
      const products = (data || []).map(item => new Product(item));
      console.log('🎯 [Repository] getProductsByIds() - Fetched', products.length, 'products');
      return products;
    } catch (error) {
      console.error('❌ [Repository] getProductsByIds error:', error);
      throw error;
    }
  }

  async getCategories() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('category');

      if (error) throw new Error(error.message || 'Failed to fetch categories');
      const unique = [...new Set((data || []).map(d => d.category).filter(Boolean))];
      const sorted = unique.sort();
      console.log('📂 [Repository] getCategories() - Found', sorted.length, 'categories:', sorted);
      return sorted;
    } catch (error) {
      console.error('❌ [Repository] getCategories error:', error);
      throw error;
    }
  }

  async getProductsByCategory(category) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) throw new Error(error.message || 'Failed to fetch products by category');
      const products = (data || []).map(item => new Product(item));
      console.log(`📂 [Repository] getProductsByCategory("${category}") - Fetched`, products.length, 'products');
      return products;
    } catch (error) {
      console.error('❌ [Repository] getProductsByCategory error:', error);
      throw error;
    }
  }
}
