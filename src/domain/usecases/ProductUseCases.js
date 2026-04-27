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
 */
export class SearchProductsUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(query) {
    if (!query || query.trim() === '') {
      return await this.productRepository.getProducts();
    }
    return await this.productRepository.searchProducts(query);
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
 */
export class GetProductsByCategoryUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(category) {
    if (!category || category === 'All') {
      return await this.productRepository.getProducts();
    }
    return await this.productRepository.getProductsByCategory(category);
  }
}
