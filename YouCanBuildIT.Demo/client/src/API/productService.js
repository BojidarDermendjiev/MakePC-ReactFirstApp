import { serverUrl, serverEndpoints } from "../common/generic";
import { get, post, put, del } from "./requester";

export const getAllProducts = async () => {
  return await get(`${serverUrl}${serverEndpoints.getAllProducts}`);
};

export const getProductById = async (id) => {
  return await get(`${serverUrl}${serverEndpoints.getProductById(id)}`);
};

export const createProduct = async (productData) => {
  return await post(
    `${serverUrl}${serverEndpoints.createProduct}`,
    productData
  );
};

export const updateProduct = async (id, productData) => {
  return await put(
    `${serverUrl}${serverEndpoints.updateProduct(id)}`,
    productData
  );
};

export const deleteProduct = async (id) => {
  return await del(`${serverUrl}${serverEndpoints.deleteProduct(id)}`);
};

export const searchProducts = async (query) => {
  return await get(`${serverUrl}${serverEndpoints.searchProducts(query)}`);
};

export const getPagedProducts = async (page = 1, size = 10) => {
  return await get(
    `${serverUrl}${serverEndpoints.getPagedProducts(page, size)}`
  );
};

/**
 * Get filtered, sorted, and paginated products
 * @param {Object} params - Filter parameters
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.size - Page size (default: 10)
 * @param {number} params.categoryId - Filter by category ID
 * @param {number} params.brandId - Filter by brand ID
 * @param {string} params.condition - Filter by condition ('New' or 'Used')
 * @param {number} params.minPrice - Minimum price filter
 * @param {number} params.maxPrice - Maximum price filter
 * @param {string} params.search - Search query
 * @param {string} params.sortBy - Sort field ('price', 'name', 'stock')
 * @param {boolean} params.sortDesc - Sort descending (default: false)
 */
export const getFilteredProducts = async (params = {}) => {
  const defaultParams = { page: 1, size: 10 };
  const mergedParams = { ...defaultParams, ...params };
  return await get(
    `${serverUrl}${serverEndpoints.getFilteredProducts(mergedParams)}`
  );
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getPagedProducts,
  getFilteredProducts,
};
