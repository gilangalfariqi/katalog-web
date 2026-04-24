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
