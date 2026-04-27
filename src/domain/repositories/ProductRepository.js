/**
 * ProductRepository Interface
 * JavaScript doesn't have strict interfaces, so we throw errors if methods are not implemented.
 */
export class ProductRepository {
  async getProducts() {
    throw new Error('Method not implemented.');
  }

  async searchProducts(query) {
    throw new Error('Method not implemented.');
  }

  async getProductsByIds(ids) {
    throw new Error('Method not implemented.');
  }

  async getCategories() {
    throw new Error('Method not implemented.');
  }

  async getProductsByCategory(category) {
    throw new Error('Method not implemented.');
  }
}
