// ProductManager.js

const fs = require('fs').promises;

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts(limit) {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      const products = JSON.parse(data) || [];

      if (limit) {
        return products.slice(0, limit);
      }

      return products;
    } catch (error) {
      throw new Error(`Error reading products: ${error.message}`);
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const product = products.find((p) => p.id === id);

      if (product) {
        return product;
      } else {
        throw new Error('Product not found.');
      }
    } catch (error) {
      throw new Error(`Error getting product by ID: ${error.message}`);
    }
  }
}

module.exports = ProductManager;
