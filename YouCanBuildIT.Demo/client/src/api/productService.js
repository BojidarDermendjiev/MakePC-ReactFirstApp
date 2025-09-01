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

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getPagedProducts,
};
