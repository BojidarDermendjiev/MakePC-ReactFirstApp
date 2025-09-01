import axiosInstance from "../API/axiosInstance";

/**
 * Generic API service class for handling CRUD operations
 */
class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * Get all items
   * @param {Object} params - Query parameters
   * @returns {Promise<Array>}
   */
  async getAll(params = {}) {
    try {
      const response = await axiosInstance.get(this.baseUrl, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get item by ID
   * @param {string|number} id - Item ID
   * @returns {Promise<Object>}
   */
  async getById(id) {
    try {
      const response = await axiosInstance.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Create new item
   * @param {Object} data - Item data
   * @returns {Promise<Object>}
   */
  async create(data) {
    try {
      const response = await axiosInstance.post(this.baseUrl, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Update existing item
   * @param {string|number} id - Item ID
   * @param {Object} data - Updated item data
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    try {
      const response = await axiosInstance.put(`${this.baseUrl}/${id}`, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Delete item
   * @param {string|number} id - Item ID
   * @returns {Promise<void>}
   */
  async delete(id) {
    try {
      await axiosInstance.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Handle API errors
   * @param {Error} error - The error object
   * @returns {Error} Formatted error
   */
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || error.response.statusText;
      return new Error(`API Error (${error.response.status}): ${message}`);
    } else if (error.request) {
      // Request was made but no response received
      return new Error('Network Error: Unable to reach the server');
    } else {
      // Something else happened
      return new Error(`Request Error: ${error.message}`);
    }
  }
}

export default ApiService;