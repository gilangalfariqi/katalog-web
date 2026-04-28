/**
 * GetProductsUseCase
 * Coordinates retrieving products from the repository.
 */
export class GetProductsUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute() {
    return await this.productRepository.getProducts();
  }
}

/**
 * SearchProductsUseCase
 * Coordinates searching products from the repository.
 *
 * CRITICAL: If query is empty, return ALL products (don't apply search filter).
 */
export class SearchProductsUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(query) {
    console.log('🔍 [UseCase] SearchProducts.execute() - query:', query);

    if (!query || query.trim() === '') {
      console.log('🔍 [UseCase] Query is empty - returning ALL products');
      const allProducts = await this.productRepository.getProducts();
      console.log(`✅ [UseCase] Returned ${allProducts.length} products (no search filter applied)`);
      return allProducts;
    }

    console.log(`🔍 [UseCase] Searching for: "${query}"`);
    const results = await this.productRepository.searchProducts(query);
    console.log(`✅ [UseCase] Search found ${results.length} products`);
    return results;
  }
}

/**
 * GetProductsByIdsUseCase
 * Coordinates retrieving specific products by IDs from the repository.
 */
export class GetProductsByIdsUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(ids) {
    if (!ids || ids.length === 0) return [];
    return await this.productRepository.getProductsByIds(ids);
  }
}

/**
 * GetCategoriesUseCase
 * Coordinates retrieving distinct categories from the repository.
 */
export class GetCategoriesUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute() {
    return await this.productRepository.getCategories();
  }
}

/**
 * GetProductsByCategoryUseCase
 * Coordinates retrieving products filtered by category from the repository.
 *
 * CRITICAL: If category is 'All', fetch ALL products without any category filter.
 * This ensures "Semua Koleksi" displays the complete product list.
 */
export class GetProductsByCategoryUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(category) {
    console.log(`🔀 [UseCase] GetProductsByCategory.execute("${category}")`);

    // CRITICAL: Handle 'All' category explicitly
    if (!category || category === 'All' || category === 'all') {
      console.log('🔀 [UseCase] Category is "All" - fetching ALL products without filter');
      const allProducts = await this.productRepository.getProducts();
      console.log(`✅ [UseCase] Fetched ALL ${allProducts.length} products`);
      return allProducts;
    }

    console.log(`🔀 [UseCase] Category is "${category}" - applying filter`);
    const filteredProducts = await this.productRepository.getProductsByCategory(category);
    console.log(`✅ [UseCase] Fetched ${filteredProducts.length} products for category "${category}"`);
    return filteredProducts;
  }
}
