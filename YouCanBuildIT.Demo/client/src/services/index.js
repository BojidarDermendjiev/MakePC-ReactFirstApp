import ApiService from "./ApiService";
import { serverApiUrl, serverEndpoints } from "../common/generic";

/**
 * Product Service - handles all product-related API calls
 */
class ProductService extends ApiService {
  constructor() {
    super(`${serverApiUrl}${serverEndpoints.products || '/products'}`);
  }

  /**
   * Get products by category
   * @param {string} categoryId - Category ID
   * @returns {Promise<Array>}
   */
  async getByCategory(categoryId) {
    try {
      const response = await axiosInstance.get(`${this.baseUrl}/category/${categoryId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Search products by name
   * @param {string} query - Search query
   * @returns {Promise<Array>}
   */
  async search(query) {
    try {
      const response = await axiosInstance.get(`${this.baseUrl}/search`, {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

/**
 * Category Service - handles all category-related API calls
 */
class CategoryService extends ApiService {
  constructor() {
    super(`${serverApiUrl}${serverEndpoints.categories || '/categories'}`);
  }
}

/**
 * Brand Service - handles all brand-related API calls
 */
class BrandService extends ApiService {
  constructor() {
    super(`${serverApiUrl}${serverEndpoints.brands || '/brands'}`);
  }
}

/**
 * Order Service - handles all order-related API calls
 */
class OrderService extends ApiService {
  constructor() {
    super(`${serverApiUrl}${serverEndpoints.orders || '/orders'}`);
  }

  /**
   * Get orders for current user
   * @returns {Promise<Array>}
   */
  async getUserOrders() {
    try {
      const response = await axiosInstance.get(`${this.baseUrl}/user`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

/**
 * Basket Service - handles all basket-related API calls
 */
class BasketService extends ApiService {
  constructor() {
    super(`${serverApiUrl}${serverEndpoints.baskets || '/baskets'}`);
  }

  /**
   * Get user's current basket
   * @returns {Promise<Object>}
   */
  async getCurrentBasket() {
    try {
      const response = await axiosInstance.get(`${this.baseUrl}/current`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Add item to basket
   * @param {string} productId - Product ID
   * @param {number} quantity - Quantity to add
   * @returns {Promise<Object>}
   */
  async addItem(productId, quantity = 1) {
    try {
      const response = await axiosInstance.post(`${this.baseUrl}/items`, {
        productId,
        quantity
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Remove item from basket
   * @param {string} itemId - Item ID
   * @returns {Promise<void>}
   */
  async removeItem(itemId) {
    try {
      await axiosInstance.delete(`${this.baseUrl}/items/${itemId}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

/**
 * Review Service - handles all review-related API calls
 */
class ReviewService extends ApiService {
  constructor() {
    super(`${serverApiUrl}${serverEndpoints.reviews || '/reviews'}`);
  }

  /**
   * Get reviews for a product
   * @param {string} productId - Product ID
   * @returns {Promise<Array>}
   */
  async getByProduct(productId) {
    try {
      const response = await axiosInstance.get(`${this.baseUrl}/product/${productId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

// Export service instances
export const productService = new ProductService();
export const categoryService = new CategoryService();
export const brandService = new BrandService();
export const orderService = new OrderService();
export const basketService = new BasketService();
export const reviewService = new ReviewService();